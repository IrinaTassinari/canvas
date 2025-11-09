// avatar-toggle.js

const image = document.getElementById("avatar");

image.addEventListener("click", function () {
  if (image.src.match("./images/santa.png")) {
    image.src = "./images/reindeer.png";
  } else if (image.src.match("./images/reindeer.png")) {
    image.src = "./images/bear.png";
  } else if (image.src.match("./images/bear.png")) {
    image.src = "./images/cookie.png";
  } else if(image.src.match("./images/cookie.png")){
    image.src = "./images/snowman.png"
  }else if (image.src.match("./images/snowman.png")){
    image.src = "./images/frog-prince.png"
  }else if(image.src.match("./images/frog-prince.png")){
    image.src = "./images/angry.png"
  }else if(image.src.match("./images/angry.png")){
    image.src = "./images/smile.png"
  }else {
    image.src = "./images/santa.png";
  }
});