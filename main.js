Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
        console.log(data_uri);
    });
}
console.log('ml5 version:',ml5.versiion);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/X1fYbTrSM/model.json',modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    var prediction_1="";
    var prediction_2="";
    speak_data_1 = "The first prediction is "+prediction_1;
    speak_data_2 = "And the second prediction is "+prediction_2;
    speak_data="You have successfully captured the image. The image is processed in the teachable machine model.";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById("captured_image");
    speak();
    classifier.classify(img,gotResult);
}

function gotResult(error , results){
    if(error){
        console.log(error);
    }else{
        console.log(results);

    }
}