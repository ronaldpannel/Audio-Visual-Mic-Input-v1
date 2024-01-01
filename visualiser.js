/**@type{HTMLCanvasElement} */

function main() {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  ctx.globalCompositeOperation = "difference";

  class Bar {
    constructor(x, y, width, height, color, index) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
      this.index = index;
    }
    update(micInput) {
      const sound = micInput * 1000;
      // this.height =  micInput * 1000
      if (sound > this.height) {
        this.height = sound;
      } else {
        this.height -= this.height * 0.03;
      }
    }
    draw(context) {
      context.strokeStyle = this.color;
      context.fillStyle = this.color;
      context.save();

      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate(this.index * 31);
      // context.strokeRect(0, 0, this.width, this.height * .10)
      context.fillRect(0, 0, this.width, this.height);
      context.beginPath();
      context.arc(this.x / 2, this.y / 2, this.height / 20, 0, Math.PI * 2);
      context.stroke();
      context.fill();

      context.restore();
    }
  }
  const microphone = new Microphone();
  let bars = [];
  let barWidth = canvas.width / 64;
  function createBars() {
    for (let i = 0; i < 64; i++) {
      let color = "rgba(159,150,150,1)";
      // let color = 'hsl(' + i * 20 + ', 100%, 50%)'
      //  bars.push(new Bar(i * barWidth,canvas.height / 2, 1, 20, color, i))
      bars.push(new Bar(i * barWidth, i * 6, i, i * 3, color, i));
    }
  }
  createBars();

  function animate() {
    if (microphone.initialized) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Generate Audio samples from microphone
      const samples = microphone.getSamples();
      //animate bars based on sample
      bars.forEach(function (bar, i) {
        bar.update(samples[i]);
        bar.draw(ctx);
      });
    }

    requestAnimationFrame(animate);
  }
  animate();
} //main function end
