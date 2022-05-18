noseX = 0;
noseY = 0;
leftWristX = 0;
rightWristX = 0;
difference = 0;
yes = "";

function setup() {
  video = createCapture(VIDEO);
  video.size(550,550);
  video.position(200,140);

  canvas = createCanvas(450,450);
  canvas.position(800,187);

  poseNet = ml5.poseNet(video,modelLoaded);
  poseNet.on('pose',gotPoses);
}

function modelLoaded() {
  console.log("PoseNet is initialized");
}

function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);
    noseX = results[0].pose.nose.x;
    noseY = results[0].pose.nose.y;
    leftWristX = results[0].pose.leftWrist.x;
    rightWristX = results[0].pose.rightWrist.x;
    difference = floor(leftWristX - rightWristX);
    console.log("left wrist x = " + leftWristX + " right wrist x = " + rightWristX + " difference = " + difference);
    console.log("nose x = " + noseX + " nose y = " + noseY);
  }
}

function draw() {
  yes = document.getElementById('hi').value;
  background('lightblue');
  fill('white');
  text(yes,noseX,noseY);
  textSize(difference);
  document.getElementById('changethis').innerHTML="The size of the text is " + difference + "px";
}