// import { drawFace } from "./drawFace";
import { Posenet } from "./posenet";
import { ThreeJS } from "./three";

import "./styles.css";
import {
  cartesianToPolar,
  getCartesianOfPoints,
  getDistanceXandY
} from "./math/helpers";
import { Canvas } from "./canvas";

import { getPointWithLeastDifference } from "./utils";

const params = {
  width: 300,
  height: 250
};

const faceBase = {
  rightEye: null,
  leftEye: null,
  nose: null,
  rightEyeToNose: null,
  leftEyeToNose: null,
  leftEyeToRightEye: null
};

let monkeyEnabled = true;

let threeRenderer;

let context;
let video, canvas;
const scale = 1;
const color = "blue";
const minConfidence = 0.5;

const setup = async (video) => {
  const posenet = new Posenet();
  await posenet.setup(video);
  video.play();
};

const doYourThing = async (video) => {
  const posenet = new Posenet();
  const keypoints = await posenet.getKeypoints(video);
  // canvas.drawVideo(video);
  // canvas.drawKeypoints(keypoints);
  const nose = keypoints.find((point) => point.part === "nose");
  if (!faceBase.nose) {
    faceBase.nose = nose;
  }
  const leftEye = keypoints.find((point) => point.part === "leftEye");
  const rightEye = keypoints.find((point) => point.part === "rightEye");
  const rightEar = keypoints.find((point) => point.part === "rightEar");
  const leftEar = keypoints.find((point) => point.part === "leftEar");

  const noseToRightEye = {
    ...getCartesianOfPoints(nose.position, rightEye.position)
  };

  const noseToLeftEye = {
    ...getCartesianOfPoints(nose.position, leftEye.position)
  };

  const noseToEyeLine = {
    ...getCartesianOfPoints(nose.position, {
      x: nose.position.x,
      y: (leftEye.position.y + rightEye.position.y) / 2
    })
  };

  const noseToRightEar = {
    ...getCartesianOfPoints(nose.position, rightEar.position)
  };

  const noseToLeftEar = {
    ...getCartesianOfPoints(nose.position, leftEar.position)
  };

  // throw new Error();

  if (!faceBase.defaultNoseToLeftEye) {
    faceBase.defaultNoseToLeftEye = {
      ...noseToLeftEye
    };
    faceBase.defaultNoseToRightEye = {
      ...noseToRightEye
    };
    faceBase.defaultnoseToEyeLine = {
      ...noseToEyeLine
    };
    faceBase.defaultNoseToRightEar = {
      ...noseToRightEar
    };
    faceBase.defaultNoseToLeftEar = {
      ...noseToLeftEar
    };
  }

  const {
    defaultNoseToLeftEye,
    defaultNoseToRightEye,
    defaultnoseToEyeLine,
    defaultNoseToLeftEar,
    defaultNoseToRightEar
  } = faceBase;
  const tiltAngle = noseToEyeLine.angle - defaultnoseToEyeLine.angle;

  let updateObj = {};
  // LEFT
  if (
    defaultNoseToLeftEye.angle > noseToLeftEye.angle &&
    defaultNoseToRightEye.angle > noseToRightEye.angle
  ) {
    updateObj.y = defaultNoseToLeftEye.angle - noseToLeftEye.angle;
  }

  // RIGHT

  if (
    defaultNoseToLeftEye.angle < noseToLeftEye.angle &&
    defaultNoseToRightEye.angle < noseToRightEye.angle
  ) {
    updateObj.y = defaultNoseToRightEye.angle - noseToRightEye.angle;
  }

  // HEAD TILT
  if (rightEar && leftEar) {
    // need to get the value that is least different because ear position jumps as head tilts
    const angle = getPointWithLeastDifference(
      defaultNoseToRightEar.angle - noseToRightEar.angle,
      defaultNoseToLeftEar.angle - noseToLeftEar.angle
    );

    updateObj.x = angle;
  } else if (leftEar) {
    updateObj.x = defaultNoseToLeftEar.angle - noseToLeftEar.angle;
  } else {
    updateObj.x = defaultNoseToRightEar.angle - noseToRightEar.angle;
  }

  if (monkeyEnabled) {
    threeRenderer.update(updateObj);
  } else {
    canvas.drawVideo(video);
    canvas.drawKeypoints(keypoints);
  }
};

const app = async () => {
  video = document.createElement("video");
  video.crossOrigin = "anonymous";
  video.width = params.width;
  video.height = params.height;
  video.src = "/moving.mov";
  video.loop = true;
  video.muted = true;

  // const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  // video.srcObject = stream;
  video.onloadedmetadata = async () => {
    // video.play();

    document.body.appendChild(video);
    if (monkeyEnabled) {
      threeRenderer = new ThreeJS();
    } else {
      canvas = new Canvas(600, 500);
    }

    await setup(video);

    const tick = async () => {
      await doYourThing(video);
      window.requestAnimationFrame(() => {
        tick();
      });
    };
    tick();
  };
};

app();

export function drawSegment([ay, ax], [by, bx], color, scale, ctx) {
  ctx.beginPath();
  ctx.moveTo(ax * 1, ay * 1);
  ctx.lineTo(bx * 1, by * 1);
  ctx.lineWidth = 2;
  ctx.strokeStyle = color;
  ctx.stroke();
}
