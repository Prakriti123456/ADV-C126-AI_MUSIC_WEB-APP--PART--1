song2 = "";
song1 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftW = 0;
song1_status = "";
song2_status = "";

function preload() {
    song = loadSound("music.mp3");
    song1 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(500, 450);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}


function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    if (scoreleftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if (song2_status == false) {
            song2.play();
            document.getElementById("song").innerHTML = "song2"

        }
    }
}
function play() {
    song.play();
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        scoreleftW = results[0].pose.keypoints[9].score;
        console.log("score left Wrist = " + scoreleftW);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY)

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY)
    }
}



