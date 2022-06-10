const minConfidence = 0.5;
const color = "blue";

export class Canvas {
  constructor(width, height) {
    this.canvas = this.setup(width, height);
    this.context = this.canvas.getContext("2d");
  }

  setup(width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.style.border = "1px solid black";
    document.body.appendChild(canvas);
    return canvas;
  }

  drawVideo(video) {
    const scale = Math.min(
      this.canvas.height / video.videoHeight,
      this.canvas.width / video.videoWidth
    );
    var vidW = video.videoWidth;
    const offset = (vidW * scale - this.canvas.width) / 2;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.drawImage(
      video,
      0 - offset,
      0,
      vidW * scale,
      this.canvas.height
    );
  }

  drawKeypoints(keypoints) {
    for (let i = 0; i < keypoints.length; i++) {
      const keypoint = keypoints[i];

      if (keypoint.score < minConfidence) {
        continue;
      }

      const { y, x } = keypoint.position;
      this.context.beginPath();
      this.context.arc(x, y, 3, 0, 2 * Math.PI);
      this.context.fillStyle = color;
      this.context.fill();
    }
  }
}
