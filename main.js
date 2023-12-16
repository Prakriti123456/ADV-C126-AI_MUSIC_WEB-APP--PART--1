song2 = "";
song1 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftW = 0;
scorerightW = 0;
song1_status = "";
song2_status = "";

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
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
    if (scoreleftW > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if (song1_status == false) {
            song1.play();
            document.getElementById("song").innerHTML = "song1";

        }
    }
    if (scorerightW > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song1.stop();
        if (song2_status == false) {
            song2.play();
            document.getElementById("song").innerHTML = "song2";

        }
    }
}
function play() {
    song.play();
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scorerightW = results[0].pose.keypoints[10].score;
        scoreleftW = results[0].pose.keypoints[9].score;
        console.log("score left Wrist = " + scoreleftW);
        console.log("score Right Wrist = " + scorerightW);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY)

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY)
    }
}



