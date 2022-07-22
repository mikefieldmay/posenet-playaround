import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

/**
 * Renderer
 */

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

export class ThreeJS {
  constructor() {
    this.renderer = null;
    this.model = null;
    this.camera = null;
    this.scene = new THREE.Scene();
    this.gltfLoader = new GLTFLoader();
    this.clock = new THREE.Clock();

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    this.scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);
    this.setup();
  }

  setup() {
    const canvas = document.getElementById("canvas");
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas
    });
    this.renderer.setSize(sizes.width, sizes.height);
    this.renderer.setClearColor("blue");

    this.camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 3);

    this.gltfLoader.load("monkey.glb", (gltf) => {
      console.log("HERE", gltf);
      this.model = gltf.scene;
      this.scene.add(gltf.scene);
    });
  }

  loadModel() {}

  update(angles) {
    // if (this.model) {
    //   if (angles.x) {
    //     this.model.rotation.x = angles.x * (Math.PI / 180);
    //   }
    //   if (angles.y) {
    //     this.model.rotation.y = angles.y * (Math.PI / 180);
    //   }
    // console.log(angleInRadians);
    // console.log(this.model.rotation);
    new TWEEN.Tween(this.model.rotation)
      .to(
        {
          x: angles.x ? angles.x * (Math.PI / 180) : 0,
          y: angles.y ? angles.y * (Math.PI / 180) : 0
        },
        0.5
      )
      .start();

    TWEEN.update();
    // console.log("time", this.clock.getElapsedTime());

    this.renderer.render(this.scene, this.camera);
  }
}
