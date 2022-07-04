status = "";
objects = [];
song = "";
function preload()
{
    song = loadSound("alarm.mp3")
}
function setup()
{
    canvas = createCanvas(700 , 500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    cocossd_model = ml5.objectDetector('cocossd' , modelLoaded)
}
function modelLoaded()
{
    console.log("THE MODEL HAS BEEN LOADED")
    status = true;
    cocossd_model.detect(video , gotResults)
}
function gotResults(error , results)
{
    if(error)
    {
        console.log(error)
    }
    else
    {
        console.log(results)
        objects = results
    }
}
function draw()
{
    image(video , 0 , 0 , 700 , 500)
    if(status != "")
    {
        for(i=0;i < objects.length;i++)
        {
            document.getElementById("status_result").innerHTML = "Objects Detected";
            percentage = floor(objects[i].confidence * 100)
            fill("red")
            text(objects[i].label + " " + percentage + "%" , objects[i].x , objects[i].y)
            noFill()
            stroke("red")
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height)
            if(objects[0].label == "person")
            {
                document.getElementById("object_result").innerHTML = "Baby Found"
                song.stop()
            }
            if(objects[0].label != "person" || objects.lenght == 0 )
            {
                document.getElementById("object_result").innerHTML = "Baby not found"
                song.play()
            }
        }
    }
}