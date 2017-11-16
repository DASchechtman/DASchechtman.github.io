
// this is an array, think of arrays as variables
// that hold a list of values
// you get access to those values via it's index
// for example
// img_src[0] = 'tree1.jpg'
// img_src[1] = 'tree2.jpg'
// img_src[2] = 'tree3.jpg'
// note: array index start at 0, so for example if you
// want to get the first element in an arrays
// you would type array_var[0] aka array_var[(element place in array) - 1]
var img_src = ["tree1.jpg", "tree2.jpg", "tree3.jpg"]

// variable that holds a number
var count = 0

// this is a function.
// think of this as a set of sub instructions
// a program can use

// for example I can write out instructions for you to make a sandwich
// 1.) get bread
// 2.) get peanut butter
// 3.) get jelly
// 4.) take one slice and spread peanut butter on it
// 5.) take the other slice and spread jelly on it
// 6.) press both slices to together

// or I can say make a PB&J sandwich, and you would follow the above steps
// automatically

function switchImg(){
  // adds 1 to count
  // so count will now equal 1
  count++

  // makes sure we access an element
  // within the array
  // since there are only three elements in
  // img_src, if count = 4, and i try to access img_src[count-1]
  // i'd get an error because as shown above, indices 0-2 are
  // the only valid indexes to get an element from
  if(count == 3){
    count = 0
  }

  // gets the image tag from the html doc, and
  // edits the source image to a new one
  document.getElementById('picture').src = img_src[count]
}

// this will call the above function every 2 seconds
var t = setInterval(switchImg, 2000)
