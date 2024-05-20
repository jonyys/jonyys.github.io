import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { GLTFLoader } from 'GLTFLoader';

const container = document.getElementById('container');
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = null;

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 85);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(0, 0, 100);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

let model;

const loader = new GLTFLoader();
loader.load('Models/andromeda/scene.gltf', function (gltf) {
    model = gltf.scene;
    model.position.set(0, 0, 0);
    scene.add(model);
    model.position.x -= 10;
    model.position.y -= 5;
    animate();

    model.traverse((child) => {
        if (child.isMesh && child.material && child.material.color) {
            const colorHex = '#' + child.material.color.getHexString();
            const inputElement = document.getElementById(`colorPicker${child.name.split('_')[1]}`);
            if (inputElement) {
                inputElement.value = colorHex;
            }
        }
    });
});


function animate() {
    requestAnimationFrame(animate);
    if (model) {
        model.rotation.y += 0;
    }
    renderer.render(scene, camera);
}

window.addEventListener('resize', function () {
    console.log("Resizing...");
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    console.log(`New dimensions: ${width} x ${height}`);
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});


function changeColor() {
    const colorValues = [];
    for (let i = 2; i <= 14; i++) {
        colorValues.push(document.getElementById(`colorPicker${i}`).value);
    }

    if (model) {
        model.traverse((child) => {
            if (child.isMesh && child.material) {
                for (let i = 0; i < 13; i++) {
                    if (child.name === `Object_${2 + i}`) {
                        child.material.color.set(colorValues[i]);
                    }
                }
            }
        });
    }

    renderer.render(scene, camera);
}

for (let i = 2; i <= 14; i++) {
    document.getElementById(`colorPicker${i}`).addEventListener('input', changeColor);
}
