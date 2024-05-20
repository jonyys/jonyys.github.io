import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.145.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.145.0/examples/jsm/loaders/GLTFLoader.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    if (!container) {
        console.error('Container element not found');
        return;
    }

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(3, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(40, 5, 5);

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
    loader.load('Models/ForumStrawberry/scene.gltf', function (gltf) {
        model = gltf.scene;
        model.position.set(0, 0, 0);
        scene.add(model);
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

        animate();
    }, undefined, function (error) {
        console.error('An error happened', error);
    });

    function animate() {
        requestAnimationFrame(animate);
        if (model) {
            model.rotation.y += 0;
        }
        renderer.render(scene, camera);
    }

    window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function changeColor() {
        const colorValues = [];
        for (let i = 4; i <= 12; i++) {
            const colorPicker = document.getElementById(`colorPicker${i}`);
            if (colorPicker) {
                colorValues.push(colorPicker.value);
            } else {
                console.error(`Color picker ${i} not found.`);
                return;
            }
        }

        if (model) {
            model.traverse((child) => {
                if (child.isMesh && child.material) {
                    for (let i = 0; i < 9; i++) {
                        if (child.name === `Object_${4 + i}`) {
                            child.material.color.set(colorValues[i]);
                        }
                    }
                }
            });
        }

        renderer.render(scene, camera);
    }

    for (let i = 4; i <= 12; i++) {
        const picker = document.getElementById(`colorPicker${i}`);
        if (picker) {
            picker.addEventListener('input', changeColor);
        } else {
            console.error(`Failed to set listener for colorPicker${i}, element not found.`);
        }
    }
});