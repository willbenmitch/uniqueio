const mongoose = require('mongoose');
const Image = require('../models/images');
const keys = require('../keys');
const rp = require('request-promise');
const filter = require('../filter');

module.exports = () => {
    Image.find({}, (err, images) => {
        if (err) {
            console.log('reached here');
            console.log(err);
        } else if (images.length === 0) {
            const imagesToSeed = [
                {src: "/images/seeds/WDFT - Aja Servais.jpg"},
                {src: "/images/seeds/WDFT - Alex Presman.jpg"},
                {src: "/images/seeds/WDFT - Andrew Lee.jpg"},
                {src: "/images/seeds/WDFT - Angelique Lazarus.jpg"},
                {src: "/images/seeds/WDFT - Barbara Skrela.jpg"},
                {src: "/images/seeds/WDFT - Ben Mitchell.jpg"},
                {src: "/images/seeds/WDFT - Carlos Rodirigues.jpg"},
                {src: "/images/seeds/WDFT - Connor Offutt.jpg"},
                {src: "/images/seeds/WDFT - Daniel Chung.jpg"},
                {src: "/images/seeds/WDFT - David Kajpust.jpg"},
                {src: "/images/seeds/WDFT - Eduardo Luna.jpg"},
                {src: "/images/seeds/WDFT - Feerass Ellid.jpg"},
                {src: "/images/seeds/WDFT - Gerry Wong.jpg"},
                {src: "/images/seeds/WDFT - Graeme Tilley.jpg"},
                {src: "/images/seeds/WDFT - Haoyu Wang.jpg"},
                {src: "/images/seeds/WDFT - Jon Hill.jpg"},
                {src: "/images/seeds/WDFT - Justin Bansal.jpg"},
                {src: "/images/seeds/WDFT - Matt Fuller.jpg"},
                {src: "/images/seeds/WDFT - Michael Carroll.jpg"},
                {src: "/images/seeds/WDFT - Sarmilan Somasundaram.jpg"},
                {src: "/images/seeds/WDFT - Scott Peacock.jpg"},
                {src: "/images/seeds/WDFT - Sean Burke.jpg"},
                {src: "/images/seeds/WDFT - Shanta Nathwani.jpg"},
                {src: "/images/seeds/WDFT - Shaolan Narine.jpg"}
            ];
            imagesToSeed.forEach((image, i) => {
                setTimeout(() => {
                    let key = keys.msAPI;
                    let rpOptions = {
                        method: "POST",
                        uri: 'https://eastus2.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=true&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise',
                        body: {
                            url: 'http://b08d5953.ngrok.io'+(image.src)
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
                            console.log(image.src);
                            console.log("Face not found");
                        } else {
                            image.data = msData;
                            console.log(image);
                            image.cssFilter = filter(msData);
                            console.log(image);
                        }
                    })
                    .catch(err => {
                        console.log('reached');
                        console.log(err);
                    });
                }, i*3000)
                
            });
            setTimeout(() => {
                console.log(imagesToSeed);
                Image.collection.insert(imagesToSeed, (err, images) => {
                    // console.log(images);
                });
            }, 120000)
        }
    })
}