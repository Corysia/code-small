import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { Scene, Engine, FreeCamera, Vector3, HemisphericLight, MeshBuilder, StandardMaterial, Texture } from '@babylonjs/core';

export class StandardMaterials {

    canvas: HTMLCanvasElement;
    scene: Scene;
    engine: Engine;

    // App constructor
    constructor() {
        console.log('App')
        this.canvas = this.createCanvas();

        this.engine = new Engine(this.canvas, true);
        this.scene = this.createScene();
        this.handleResize();
        this.enableInspector();
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    // Create the canvas element
    createCanvas(): HTMLCanvasElement {
        console.log('createCanvas')
        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);
        return canvas;
    }

    // Create the scene
    createScene(): Scene {
        console.log('createScene')
        const scene = new Scene(this.engine);
        const camera: FreeCamera = new FreeCamera('camera', new Vector3(0, 5, -10), scene);
        camera.setTarget(Vector3.Zero()); // look at the scene origin
        camera.attachControl(this.canvas, true);

        const hemiLight: HemisphericLight = new HemisphericLight('hemiLight', new Vector3(0, 1, 0), scene);
        hemiLight.intensity = 0.5;

        const ground = MeshBuilder.CreateGround('ground', { width: 10, height: 10 }, scene);
        ground.material = this.createGroundMaterial();

        const ball = MeshBuilder.CreateSphere('ball', { diameter: 1 }, scene);
        ball.material = this.createBallMaterial();
        ball.position.y = 1;

        return scene;
    }

    // Handle browser resize
    handleResize() {
        console.log('handleResize')
        window.addEventListener("resize", () => {
            console.log("resizing");
            if (this.engine)
                this.engine.resize();
        });
    }

    // Enable the inspector
    enableInspector() {
        console.log('enableInspector')
        window.addEventListener("keydown", (ev) => {
            // Ctrl+Shift+Alt+I
            // NOTE: Ctrl+Shift+I is reserved by the browser
            // Mac users need to use keyCode.
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
                if (this.scene.debugLayer.isVisible()) {
                    this.scene.debugLayer.hide();
                } else {
                    this.scene.debugLayer.show();
                }
            }
        });
    }

    createGroundMaterial(): StandardMaterial {
        const groundMat = new StandardMaterial("groundMat", this.scene);
        const uvScale = 4;
        const texArray: Texture[] = [];

        const diffuseTex = new Texture("./textures/stone/cobblestone_05_diff_1k.jpg", this.scene);
        groundMat.diffuseTexture = diffuseTex;
        texArray.push(diffuseTex);

        const normalTex = new Texture("./textures/stone/cobblestone_05_nor_gl_1k.jpg", this.scene);

        groundMat.bumpTexture = normalTex;
        groundMat.invertNormalMapX = true;
        groundMat.invertNormalMapY = true;
        texArray.push(normalTex);

        const aoTex = new Texture("./textures/stone/cobblestone_05_ao_1k.jpg", this.scene);
        groundMat.ambientTexture = aoTex;
        texArray.push(aoTex);

        const specTex = new Texture("./textures/stone/cobblestone_05_spec_1k.jpg", this.scene);
        groundMat.specularTexture = specTex;

        texArray.push(specTex);

        texArray.forEach((tex) => {
            tex.uScale = uvScale;
            tex.vScale = uvScale;
        });

        return groundMat;
    }

    createBallMaterial(): StandardMaterial {
        const ballMat = new StandardMaterial("ballMat", this.scene);
        const uvScale = 1;
        const texArray: Texture[] = [];

        const diffuseTex = new Texture("./textures/metal/metal_plate_diff_1k.jpg", this.scene);
        ballMat.diffuseTexture = diffuseTex;
        texArray.push(diffuseTex);

        const normalTex = new Texture("./textures/metal/metal_plate_nor_gl_1k.jpg", this.scene);
        ballMat.bumpTexture = normalTex;
        ballMat.invertNormalMapX = true;
        ballMat.invertNormalMapY = true;
        texArray.push(normalTex);

        const aoTex = new Texture("./textures/metal/metal_plate_ao_1k.jpg", this.scene);
        ballMat.ambientTexture = aoTex;
        texArray.push(aoTex);

        const specTex = new Texture("./textures/metal/metal_plate_spec_1k.jpg", this.scene);
        ballMat.specularTexture = specTex;
        ballMat.specularPower = 10;
        texArray.push(specTex);

        texArray.forEach((tex) => {
            tex.uScale = uvScale;
            tex.vScale = uvScale;
        });

        return ballMat;
    }
}
