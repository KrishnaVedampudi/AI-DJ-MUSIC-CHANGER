faded = "";
hptheme = "";
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
function preload()
{
   faded = loadSound('faded.mp3');
   hptheme = loadSound('hp theme.mp3');
   
}
function setup()
{
    canvas = createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded () {
    console.log('Pose Net is initialized');
}
function gotPoses(results)
{
    if(results.length > 0)
    {          
        console.log(results);        
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(results);        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = "+leftWristX+"Left Wrist Y = "+leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;        
        console.log("Right Wrist X = "+rightWristX+"Right Wrist Y = "+rightWristY);
    }    
}
function draw()
{
    image(video, 0, 0, 500, 500);
    fill("red");
    stroke("red");
    var fded = faded.isPlaying();
    var theme = hptheme.isPlaying();

    if(scoreLeftWrist > 0.4 && theme == false)
    {
        circle(leftWristX, leftWristY, 20);
        faded.stop();       
        if(fded == false)
        {
            hptheme.play();
            document.getElementById('song_name').innerHTML = 'Harry Potter Theme Song(Original Version) is playing now';        }
    }
    if(scoreRightWrist > 0.4 && fded == false)
    {
        circle(rightWristX, rightWristY, 20);
        hptheme.stop(); 
    
        if(theme == false)
        {
            faded.play();
            document.getElementById('song_name').innerHTML = 'Faded Song(Original Version) is playing now';    
        }
        
    }
    
}
