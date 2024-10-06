const cvs=document.getElementById("pong")
const ctx=cvs.getContext("2d")
cvs.height=document.body.offsetHeight-10
cvs.width=document.body.offsetWidth
const user={
  x:0,
  y:cvs.height/2-100/2,
  width:10,
  height:100,
  color:"white",
  score:0
}
const ball={
  x:cvs.width/2,
  y:cvs.height/2,
  raduis:20,
  speed:5,
  color:"white",
  velocityX:5,
  velocityY:5,
}
const net={
  x:cvs.width/2-1,
  y:0,
  width:2,
  height:10,
  color:"white"
}
function drawNet(){
  for(let i=0;i<=cvs.height;i+=15){
  drawRect(net.x,net.y+i,net.width,net.height,net.color)
  }
}
const com={
  x:cvs.width-10,
  y:cvs.height/2-100/2,
  width:10,
  height:100,
  color:"white",
  score:0
}
function drawRect(x,y,w,h,color){
ctx.fillStyle=color
ctx.fillRect(x,y,w,h)
}
drawRect(0,0,cvs.width,cvs.height,"black")
function drawCircle(x,y,r,color){
ctx.fillStyle=color
ctx.beginPath()
ctx.arc(x,y,r,0,Math.PI*2,false)
ctx.closePath()
ctx.fill()
}
cvs.addEventListener("mousemove",movePaddle)
function movePaddle(evt){
let rect=cvs.getBoundingClientRect()
user.y=evt.clientY-rect.top-user.height/2
}
function drawText(text,x,y,color){
ctx.fillStyle=color
ctx.font="40px fantasy"
ctx.fillText(text,x,y)
}
function collision(ball,p){
ball.top=ball.y-ball.raduis
ball.bottom=ball.y+ball.raduis
ball.left=ball.x-ball.raduis
ball.right=ball.x+ball.raduis
p.top=p.y
p.bottom=p.y+p.height
p.left=p.x
p.right=p.x+p.width
return ball.right>p.left&&ball.bottom>p.top&&ball.left<ball.top<p.bottom
}
function resetBall(){
  ball.x=cvs.width/2
  ball.y=cvs.height/2
  ball.speed=5
  ball.velocityX= -ball.velocityX
}
function update(){
  let comLevel=0.1
ball.x+=ball.velocityX
ball.y+=ball.velocityY
com.y+=(ball.y-(com.y+com.height/2))*comLevel
if(ball.y+ball.raduis>cvs.height||ball.y-ball.raduis<0){
  ball.velocityY= -ball.velocityY
}
let player=ball.x<cvs.width/2?user:com
if(collision(ball,player)){
let collidePoint=ball.y-player.y+player.height/2
collidePoint=collidePoint/(player.height/2)
let angleRad=collidePoint*Math.PI/4
let direction=(ball.x<cvs.width/2)?1:-1
ball.velocityX=direction* ball.speed*Math.cos(angleRad)
ball.velocityY=ball.speed*Mapth.sin(angleRad)
ball.speed+=0.1
}
if(ball.x-ball.raduis<0){
  com.score++
  resetBall()
}
else if(ball.x+ball.raduis>cvs.width){
user.score++
resetBall()
}
}

function render(){
drawRect(0,0,cvs.width,cvs.height,"black")
drawNet()
drawText(user.score,cvs.width/4,cvs.height/5,"white")
drawCircle(ball.x,ball.y,ball.raduis,ball.color)
drawText(com.score,3*cvs.width/4,cvs.height/5,"white")
drawRect(user.x,user.y,user.width,user.height,user.color)
drawRect(com.x,com.y,com.width,com.height,com.color)

}
function game(){
  
  update()
  render()
}
framePerSecond=50
setInterval(game,1000/framePerSecond)