img = "";
status = "";
objects = [];
   
function preload(){
    song = "Alarm Alarm Alarm.mp3"
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start(){
    Object_Detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model is Loaded");
    status = true;
}

function gotResult(error, results){
if(error)
{
    console.log(results);
}
else
{
console.log(results);
objects = results;
}
}



function draw()
{
    image(video, 0, 0, 380, 380);
    
  if(status != "")
 {
    r = random(255);
    g = random(255);
    b = random(255);
    Object_Detector.detect(video, gotResult);

    for (i = 0; i < objects.length; i++)
    {  
        document.getElementById("status").innerHTML = "Status : BABY Detected";
        song.pause();
        fill(r,g,b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " "+ percent + "%",  objects[i].x +15, objects[i].y +15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }

 }

 if(objects.length < 0)
 {
    document.getElementById("status").innerHTML = "Status : BABY not detcted";
    song.play();
 }
}