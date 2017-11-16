var img_src = ["img/tree1.jpg", "img/tree2.jpg", "img/tree3.jpg"]
var count = 0


function switchImg(){
  count++

  document.getElementById('picture').src = img_src[count%img_src.length]
}


var t = setInterval(switchImg, 5000)
