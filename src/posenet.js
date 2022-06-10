import "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";

let net;
const minConfidence = 0.5;

export class Posenet {
  constructor() {}

  async setup(video) {
    net = await posenet.load({
      inputResolution: {
        width: video.videoWidth,
        height: video.videoHeight
      }
    });
    return net;
  }

  async getInstance() {
    if (net) {
      return net;
    }
    net = await this.setup();
    return net;
  }

  async getKeypoints(video) {
    const poses = await net.estimatePoses(video, {
      decodingMethod: "single-person"
    });
    const { keypoints } = poses[0];
    return keypoints;
  }
}
