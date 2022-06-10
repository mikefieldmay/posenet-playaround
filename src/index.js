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

let threeRenderer;

let context;
let video, canvas;
const scale = 1;
const color = "blue";
const minConfidence = 0.5;

const setup = async (video) => {
  const posenet = new Posenet();
  await posenet.setup(video);
  canvas = new Canvas(600, 500);
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

  const noseToRightEye = {
    ...getCartesianOfPoints(nose.position, rightEye.position)
  };

  const noseToLeftEye = {
    ...getCartesianOfPoints(nose.position, leftEye.position)
  };

  const noseToForehead = {
    ...getCartesianOfPoints(nose.position, {
      x: (leftEye.position.x + rightEye.position.x) / 2,
      y: (leftEye.position.y + rightEye.position.y) / 2
    })
  };

  if (!faceBase.defaultNoseToLeftEye) {
    faceBase.defaultNoseToLeftEye = {
      ...noseToLeftEye
    };
    faceBase.defaultNoseToRightEye = {
      ...noseToRightEye
    };
    faceBase.defaultNoseToForehead = {
      ...noseToForehead
    };
  }

  const { defaultNoseToLeftEye, defaultNoseToRightEye, defaultNoseToForehead } =
    faceBase;
  const tiltAngle = noseToForehead.angle - defaultNoseToForehead.angle;

  let updateObj = {};
  // LEFT
  if (
    defaultNoseToLeftEye.angle > noseToLeftEye.angle &&
    defaultNoseToRightEye.angle > noseToRightEye.angle
  ) {
    updateObj.y = defaultNoseToLeftEye.angle - noseToLeftEye.angle;
    // y: defaultNoseToLeftEye.angle - noseToLeftEye.angle
  }

  // RIGHT

  if (
    defaultNoseToLeftEye.angle < noseToLeftEye.angle &&
    defaultNoseToRightEye.angle < noseToRightEye.angle
  ) {
    updateObj.y = defaultNoseToRightEye.angle - noseToRightEye.angle;

    // y: defaultNoseToRightEye.angle - noseToRightEye.angle
  }
  // console.log(
  //   "WHAT IS THIS",
  //   noseToForehead.angle - defaultNoseToForehead.angle
  // );
  // if (tiltAngle < 100 && tiltAngle > -100) {
  updateObj.x = defaultNoseToForehead.angle - noseToForehead.angle;
  // }
  threeRenderer.update(updateObj);
};

const app = async () => {
  video = document.createElement("video");
  video.crossOrigin = "anonymous";
  video.width = params.width;
  video.height = params.height;

  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
  video.onloadedmetadata = async () => {
    video.play();

    document.body.appendChild(video);
    threeRenderer = new ThreeJS();

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
