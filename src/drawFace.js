export const drawFace = (context, keypoints) => {
  drawEyes(context, keypoints);
  drawNose(context, keypoints);
  drawShoulders(context, keypoints);
  drawArms(context, keypoints);
};

const drawEyes = (context, keypoints) => {
  const leftEye = keypoints.find((point) => point.part === "leftEye");
  const rightEye = keypoints.find((point) => point.part === "rightEye");

  context.beginPath();
  context.arc(leftEye.position.x, leftEye.position.y, 10, 0, 2 * Math.PI);
  context.stroke();

  context.beginPath();
  context.arc(rightEye.position.x, rightEye.position.y, 10, 0, 2 * Math.PI);
  context.stroke();

  context.beginPath();
  context.arc(leftEye.position.x, leftEye.position.y + 5, 5, 0, 2 * Math.PI);
  context.fill();

  context.beginPath();
  context.arc(rightEye.position.x, rightEye.position.y + 5, 5, 0, 2 * Math.PI);
  context.fill();
};

const drawNose = (context, keypoints) => {
  const nose = keypoints.find((point) => point.part === "nose");

  context.beginPath();
  context.moveTo(nose.position.x - 10, nose.position.y);
  context.lineTo(nose.position.x + 10, nose.position.y);
  context.lineTo(nose.position.x, nose.position.y - 30);
  context.closePath();

  // the outline
  context.lineWidth = 2;
  context.strokeStyle = "#666666";
  context.stroke();

  // the fill color
  context.fillStyle = "#FFCC00";
  context.fill();
};

const drawShoulders = (context, keypoints) => {
  const rightShoulder = keypoints.find(
    (point) => point.part === "rightShoulder"
  );
  const leftShoulder = keypoints.find((point) => point.part === "leftShoulder");

  context.beginPath();
  context.moveTo(leftShoulder.position.x, leftShoulder.position.y);
  context.lineTo(rightShoulder.position.x, rightShoulder.position.y);
  context.closePath();

  context.lineWidth = 20;
  context.strokeStyle = "#666666";
  context.stroke();
};

const drawArms = (context, keypoints) => {
  const rightShoulder = keypoints.find(
    (point) => point.part === "rightShoulder"
  );
  const rightElbow = keypoints.find((point) => point.part === "rightElbow");
  const rightWrist = keypoints.find((point) => point.part === "rightWrist");
  const leftShoulder = keypoints.find((point) => point.part === "leftShoulder");
  const leftElbow = keypoints.find((point) => point.part === "leftElbow");
  const leftWrist = keypoints.find((point) => point.part === "leftWrist");

  // draw right
  context.lineWidth = 10;
  context.strokeStyle = "#666666";
  context.beginPath();
  context.moveTo(rightShoulder.position.x, rightShoulder.position.y);
  if (rightElbow.score > 0.5) {
    context.lineTo(rightElbow.position.x, rightElbow.position.y);
  }
  if (rightWrist.score > 0.5) {
    context.lineTo(rightWrist.position.x, rightWrist.position.y);
  }
  context.stroke();

  context.beginPath();
  context.moveTo(leftShoulder.position.x, leftShoulder.position.y);
  if (leftElbow.score > 0.5) {
    context.lineTo(leftElbow.position.x, leftElbow.position.y);
  }
  if (leftWrist.score > 0.5) {
    context.lineTo(leftWrist.position.x, leftWrist.position.y);
  }

  context.lineWidth = 20;
  context.strokeStyle = "red";
  context.stroke();

  //   throw new Error();
};
