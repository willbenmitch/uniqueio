// const imageData = require('./saved-data/image0.json');

const filter = (data) => {
    let cssFilter = [   
                        // blur(bounding(data[0].faceAttributes.blur.value, 0.01, 0.5)),
                        brightness(bounding(data[0].faceAttributes.smile, .5, 1)),
                        // contrast(bounding(data[0].faceAttributes.noise.value, 0.2, 300)),
                        grayScale(bounding(data[0].faceAttributes.emotion.neutral/6, 0, 0.3)),
                        hueRotate(bounding(hueValue(data[0].faceAttributes.hair.hairColor), 0, 360)),
                        saturate(bounding(saturateValue(data[0].faceLandmarks), 80, 1000))
                        // sepia(bounding(sepiaValue(data[0].faceLandmarks), 0, 100))
                    ]
    return cssFilter;
}

// console.log(filter(imageData));

function bounding(value, lowerBound, upperBound) {
    if (value === undefined || value === null) {
        return (upperBound / lowerBound);
    } else if (value < lowerBound) {
        return lowerBound;
    } else if (value > upperBound ) {
        return upperBound;
    } else {
        return value;
    }
}

function blur(value) {
    let output = (1 / (value * 100));
    return "blur("+output+"px)";
}

function brightness(value) {
    let output = (150 * value);
    return "brightness("+output+"%)";
}

function contrast(value) {
    let output = (200 * value);
    return "contrast("+output+"%)";
}

function grayScale(value) {
    let output = (100 * value)
    return "grayscale("+output+"%)";
}

function hueValue(data) {
    let colourIndex = {
        brown: 0,
        black: 70,
        other: 140,
        gray: 210,
        red: 280,
        blond: 360
    };
    let hueData = data.sort((a, b) => b.confidence - a.confidence).slice(0,2);
    let output = hueData.reduce((acc, color) => {
        let thisColor = color.color;
        return acc + (color.confidence * colourIndex[thisColor]);
    }, 0)
    return output;
}

function hueRotate(value) {
    return "hue-rotate("+value+"deg)";
}

function saturateValue(data) {
    let mouthDistance = data.mouthRight.x - data.mouthLeft.x;
    console.log(mouthDistance);
    let mouthHeight = data.mouthLeft.y - data.mouthRight.y;
    console.log(mouthHeight);
    let mouthVolume = mouthDistance * mouthHeight;
    console.log(mouthVolume);
    return (Math.abs(mouthVolume) / (100));
}

function saturate(value) {
    return "saturate("+value+"%)";
}

function sepiaValue(data){
    let eyeDistance = data.pupilRight.x - data.pupilLeft.x;
    console.log(eyeDistance);
    return (eyeDistance/2);
}

function sepia(value) {
    return "sepia("+value+"%)";
}

module.exports = filter;