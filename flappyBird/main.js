const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;
let flag = true;
let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gamespeed = 2;
const gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop("0.4", "#fff");
gradient.addColorStop("0.5", "#000");
gradient.addColorStop("0.55", "#4040ff");
gradient.addColorStop("0.6", "#000");
gradient.addColorStop("0.65", "#fff");

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //ctx.fillRect(10, canvas.height - 90, 50, 50);
  handlleObstacle();
  handleParticles();
  bird.update();
  bird.draw();
  ctx.fillStyle = gradient;
  ctx.font = "90px Georgia";
  ctx.strokeText(score, 450, 70);
  ctx.fillText(score, 450, 70);

  handleCollision();
  if (handleCollision()) return;
  requestAnimationFrame(animate);
  angle += 0.12;
  hue++;
  frame++;
}

animate();

window.addEventListener("keydown", function (e) {
  if (e.code === "Space") spacePressed = true;
});

window.addEventListener("keyup", function (e) {
  if (e.code === "Space") spacePressed = false;
});

const bang = new Image();
bang.src = "bang.png";
function handleCollision() {
  for (var i = 0; i < obstaclesArray.length; i++) {
    if (
      bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
      bird.x + bird.width > obstaclesArray[i].x &&
      ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) ||
        (bird.y > canvas.height - obstaclesArray[i].bottom &&
          bird.y + bird.height < canvas.height))
    ) {
      ctx.drawImage(bang, bird.x, bird.y, 50, 50);
      ctx.font = "40px sans-serif";
      ctx.fillStyle = "Red";
      ctx.fillText(
        "Game Over, Your Score is " + score,
        50,
        canvas.height / 2 - 10
      );
      
      if(flag){
        setHighScore();
        flag=false;
      }
      
      displayHighScore();
      myreplay();

      return true;
    }
  }
}

function setUser()
{
 let s1=document.getElementById("namePlayer").value;
 window.localStorage.setItem('key25',s1);
}

let bts = document.querySelector('#replay');

bts.addEventListener('click', ()=>{
 console.log("method trigred...");
 setUser();
 window.location.reload();
})




function setHighScore(){

  var data = JSON.parse(window.localStorage.getItem('temp'));
  let inputVal = document.getElementById("namePlayer").value;
 
  if(data==null){
   var _json = {};
   
   _json["score"] = [{"name":" ","score": 0}];
   _json["score"][0]["name"] = inputVal;
   _json["score"][0]["score"] = score;
   window.localStorage.setItem('temp', JSON.stringify(_json));
   console.log(_json);
   console.log('First time');
  }else{
   
   var _newObj = {"name": " ", "score" : 0};
   _newObj["score"] = score;
   _newObj["name"] = inputVal;
   data["score"].push(_newObj);
  
   window.localStorage.setItem('temp', JSON.stringify(data));
 
  }
 
 }
 
 function displayHighScore(){

  let str=window.localStorage.getItem('key25');
  if(str!=null)
  document.getElementById("namePlayer").value = str;
  
   
 
   var data = JSON.parse(window.localStorage.getItem('temp'));
   
   console.log(data);
 
  
   
   var tab=`<tr bgcolor="#5D6D7E">
   <th style="padding:8px";> <h3>  Name of player  <h3/> </th>
   <th style="padding:8px";><h3>  Score of player <h3/> </th>
 </tr>`;
   
   if(data!=null){
     console.log(data);
 
     var sc= data.score;
 
     sc.sort(function(a, b){
       return b.score - a.score;
     });
   
   for (let r of data.score) {
 
     
     
        tab += `<tr>
           <td>${r.name} </td>
           <td>${r.score}</td>
 
             </tr>`;
   
   }
           }
   document.getElementById("customers").innerHTML = tab;
 
 
 }
 displayHighScore();

 function myreplay() {
  var x = document.getElementById("replay");
  if (x.style.display === "none") {
    x.style.display = "block";
  }
}


