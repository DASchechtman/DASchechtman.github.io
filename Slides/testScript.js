var img_src = ["tree1.jpg", "tree2.jpg", "tree3.jpg"]
var count = 0
function switchImg(){
  count++
  document.getElementById('picture').src = img_src[count%img_src.length]
  console.log('working')
}
var t = window.setInterval(switchImg, 2000)
