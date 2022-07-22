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

/**
 * leftEyeToNose: {angle: -53.3, distance: 48.663313803221186}
noseToForehead: {angle: 82.7, distance: 39.574244103433216}
noseToLeftEye: {angle: -53.3, distance: 48.663313803221186}
noseToRightEye: {angle: 45.2, distance: 55.619657265233855}
rightEyeToNose: {angle: 45.2, distance: 55.619657265233855}
 */

/**
 * leftEyeToNose: {angle: 66.7, distance: 34.819368106304665}
noseToForehead: {angle: 42.8, distance: 47.00668655784177}
noseToLeftEye: {angle: 66.7, distance: 34.819368106304665}
noseToRightEye: {angle: 30, distance: 63.76983614079411}
rightEyeToNose: {angle: 30, distance: 63.76983614079411}
 */
