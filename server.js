const   express = require('express'),
        request = require('request'),
        rp = require('request-promise'),
        app = express(),
        bodyParser = require('body-parser'),
        mongoose = require('mongoose'),
        base64Img = require('base64-img'),
        keys = require('./keys'),
        Image = require('./models/images'),
        filter = require('./filter'),
        fs = require('fs'),
        seedImages = require('./seeds/image-seed'),
        path = require('path');
        
        mongoose.Promise = global.Promise;

app.set('port', (process.env.PORT || 80));

// ALLOW ACCESS TO API
app.use((req,res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
    next();
});
// USE PUBLIC DIRECTORY
if (process.env.NODE_ENV === "production") {
    app.use(express.static(__dirname+'/build'));
} else {
    app.use(express.static(__dirname+'/public'));
}

// SET BODY PARSING
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MONGOOSE CONNECTION
const uriString =   process.env.MONGOLAB_COBALT_URI ||
                    "mongodb://localhost/data/db";

mongoose.connect(uriString);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Connected to db")
});

seedImages();

// ROUTE HANDLERS
app.get('/loadImages', (req, res) => {
    Image.find({}).then(images => res.json(images));
});

app.get('/like/:id', (req, res) => {
    Image.findById(req.params.id, (err, image) => {
        console.log('reached')
        image.likes += 1;
        image.save().then((update) => {
            res.send(update);
        })
    })
})

app.post('/newImage', (req, res) => {
    let imageData = req.body.data;
    let newImage = new Image({
    });
    newImage.src="/images/image"+newImage.id+".jpg";
    newImage.save()
    .then(savedImage => {
        base64Img.img(imageData, "./public/images/", `image${savedImage.id}`, (err) => {
            if (err) console.log(err)
            res.send(savedImage);
        });
    })
});

app.get('/filteredImage/:id', (req, res) => {
    console.log(req.params.id);
    Image.findById(req.params.id, (err, image) => {
        let key = keys.msAPI;
        let rpOptions = {
            method: "POST",
            uri: 'https://eastus2.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=true&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise',
            body: {
                url: 'https://uniqueio.herokuapp.com/images/image'+(image.id)+'.jpg'
            },
            json: true,
            headers: {
                'Content-type': 'application/json',
                [key.key] : [key.value]
            }
        }
        rp(rpOptions).then((msData) => {
            console.log(msData);
            if (msData.length === 0) {
                image.remove();
                res.send("Face not found");
            } else {
                image.data = msData;
                image.cssFilter = filter(msData);
                image.likes = 0;
                image.save().then((updatedImage) => {
                    console.log(updatedImage);
                    res.send(updatedImage);
                })
            }
        })
        .catch(err => {
            console.log(err);
        });
    });     
});

app.get('*', function (req, res) {
    res.sendFile(path.resolve((__dirname + '/build/index.html')));
});

app.post('*', function(req, res) => {
    req.sendFile(path.resolve(((__dirname + 'build/index.html')));
});

// LISTEN FOR REQUESTS
app.listen(app.get('port'), () => {
    console.log('Server listening on '+app.get('port') );
});