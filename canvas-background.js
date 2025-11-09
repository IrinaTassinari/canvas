// // canvas-background.js

// первый вариант c setInterval и звездами

// (() => {
//   // gets a reference to the HTML <canvas> element
//   const canvas = document.getElementById("canvas-background");

//   // get the rendering context for the canvas
//   const context = canvas.getContext("2d");

//   // get document's width and height
//   const width = window.innerWidth;
//   const height = window.innerHeight;

//   // set background to be fullscreen
//   canvas.width = width;
//   canvas.height = height;

//   const numOfStars = 50;

//   // helper function for generating random numbers between two values
//   const random = (min, max) => Math.random() * (max - min) + min;

//   const drawBackground = () => {
//     // The inner circle is at x=0, y=0, with radius=height
//     // The outer circle is at x=0, y=0, with radius=width
//     const gradient = context.createRadialGradient(0, 0, height, 0, 0, width);
//     // offset and color
//     gradient.addColorStop(0, "#002D62");
//     gradient.addColorStop(0.5, "#0066b2");
//     gradient.addColorStop(1, "#6699CC");

//     // make canvas the color of gradient
//     context.fillStyle = gradient;
//     // place its top-left corner at (0, 0), and
//     // and give it a size of "width" wide by "height" tall.
//     context.fillRect(0, 0, width, height);
//   };

//   const drawForeground = () => {
//     context.fillStyle = "#13274F";
//     context.fillRect(0, height * 0.95, width, height);

//     context.fillStyle = "#002D62";
//     context.fillRect(0, height * 0.955, width, height);
//   };


//It will create 50 stars in the view, at random positions, with random sizes, but not below half of the screen. height * 0.5 is responsible for it. To avoid getting stars drawn to the edge of the screen, a padding of 25px should be added. Notice the first argument in both random functions is 25.
//   const drawStars = () => {
//     let countOfStars = numOfStars;

//     context.fillStyle = "#E6E6FA";

//     while (countOfStars--) {
//       const x = random(25, width - 50);
//       const y = random(25, height * 0.5);
//       const size = random(1, 4);

//       context.fillRect(x, y, size, size);
//     }
//   };

// //   drawBackground();
// //   drawForeground();
// //   drawStars();

// const animateStars = () => {
//   drawBackground();
//   drawForeground();
//   drawStars();
// };

// // первый вызов сразу
// animateStars();

// // обновляем каждые 2 секунды (2000 миллисекунд)
// setInterval(animateStars, 1000);

// })();


//второй вариант со снежинками
// wrap your code in an IIFE (Immediately Invoked Function Expression)
(() => {
  const canvas = document.getElementById("canvas-background");
  const context = canvas.getContext("2d");

  // get document's width and height
  const width = window.innerWidth;
  const height = window.innerHeight;

  // set background to be fullscreen
  canvas.width = width;
  canvas.height = height;

  const numOfStars = 500; //they had become snowflakes
  // helper function for generating random numbers between two values
  const random = (min, max) => Math.random() * (max - min) + min;

  // создаём массив звёзд
  const stars = Array.from({ length: numOfStars }, () => ({
    x: random(0, width),
    y: random(0, height * 0.5),
    size: random(1, 3),
    speed: random(0.1, 0.5) // скорость "падения"
  }));

  const drawBackground = () => {
    // The inner circle is at x=0, y=0, with radius=height
    // The outer circle is at x=0, y=0, with radius=width
    const gradient = context.createRadialGradient(0, 0, height, 0, 0, width);
    // The .createRadialGradient() method is specified by six parameters, three defining the gradient's start circle, and three defining the end circle. A radial CanvasGradient initialized with the two specified circles will be returned.
    // createRadialGradient(x0, y0, r0, x1, y1, r1)

    // offset and color
    gradient.addColorStop(0, "#002D62");
    gradient.addColorStop(0.5, "#0066b2");
    gradient.addColorStop(1, "#6699CC");
    //addColorStop(offset, color) добавляет «точку» градиента:
    // offset — число от 0 до 1, позиция вдоль градиента (0 — начало, 1 — конец).
    // color — CSS-строка цвета (hex, rgba, etc.).
    // В твоём случае:
    // в 0 (начало) цвет #002D62 (тёмно-синий),
    // в середине 0.5 — #0066b2,
    // на краю 1 — #6699CC (светлый голубой).
    // Интерполяция между этими стопами даёт плавный переход тёмный → средний → светлый.

    // make canvas the color of gradient
    context.fillStyle = gradient;
    //Свойство fillStyle принимает либо строку цвета, либо объект CanvasGradient (то, что мы создали).После присвоения все операции заливки (fillRect, fill()) будут использовать этот градиент.

    // place its top-left corner at (0, 0), and
    // and give it a size of "width" wide by "height" tall.
    context.fillRect(0, 0, width, height);
  };

  const drawForeground = () => {
    context.fillStyle = "#13274F";
    context.fillRect(0, height * 0.95, width, height);
    context.fillStyle = "#002D62";
    context.fillRect(0, height * 0.955, width, height);
  };

  const drawStars = () => {
    context.fillStyle = "#E6E6FA";
    stars.forEach(star => {
      context.fillRect(star.x, star.y, star.size, star.size);
      star.y += star.speed; // двигаем вниз

      // если звезда вышла за нижнюю границу — возвращаем наверх
      if (star.y > height * 0.9) {
        star.y = random(0, height * 0.9);
        star.x = random(0, width);
      }
    });
  };

  const animate = () => {
    drawBackground();
    drawForeground();
    drawStars();
    requestAnimationFrame(animate); // рекурсивный вызов для плавной анимации
  };

  animate();
})();






// const canvas = document.getElementById('canvas-background')
// const context = canvas.getContext('2d')
// Каждый <canvas> — это просто “холст”, но чтобы рисовать на нём, нужно получить контекст рисования.
// getContext('2d') — создаёт 2D-контекст для рисования (двумерная графика).

// get document's width and height
// const width = window.innerWidth
// const height = window.innerHeight
// Эти две строки получают размеры окна браузера:
// window.innerWidth → ширина окна (в пикселях)
// window.innerHeight → высота окна
// Например:
// width = 1920
// height = 1080
// если экран — Full HD.

// set background to be fullscreen
// canvas.width = width
// canvas.height = height
// Здесь устанавливаются размеры самого canvas — во весь экран, используя значения, полученные выше.

// wrap your code in an IIFE (Immediately Invoked Function Expression)