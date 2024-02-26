import * as THREE from 'three';
import './style.css';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//Scene
const scene = new THREE.Scene();

//Creating Donut
const resolution = 200;
const geometry = new THREE.TorusGeometry(3, 1.5, 200, 200)// const material = new THREE.MeshStandardMaterial({ color: "#00ff83" , roughness: .5, metalness: .2});
const geometry2 = new THREE.SphereGeometry(3, 32, 32);
let savedLinks = [
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/044af924-3964-4328-b96c-1fb2ef48c485/dbr4tgs-1e48ec7d-ebf9-4677-84e0-15fcffa8f7bf.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA0NGFmOTI0LTM5NjQtNDMyOC1iOTZjLTFmYjJlZjQ4YzQ4NVwvZGJyNHRncy0xZTQ4ZWM3ZC1lYmY5LTQ2NzctODRlMC0xNWZjZmZhOGY3YmYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Q-Rkx93uwhnJ0vHNOzBlY5-BEcN1fNqIzmsL9gxQfJo",
    "https://generations.krea.ai/images/be0b235e-9a53-4789-b735-20ce43ff62bb.webp",
    "https://t4.ftcdn.net/jpg/00/80/70/29/360_F_80702927_FhNtSKQib9jPEem2z3xC8ANG0uqYyBk3.jpg",
    "https://www.shutterstock.com/image-illustration/abstract-black-white-lines-art-600nw-1716477298.jpg",
    "https://t4.ftcdn.net/jpg/04/43/18/67/360_F_443186712_DNJoCbUlLfAyBozDGS8buHdqDn8cgt3N.jpg",
    "https://as2.ftcdn.net/v2/jpg/03/74/43/45/1000_F_374434586_WYizDJCJhPeRwyHPUACSMAyQyGNBuEKG.jpg",
    "https://t3.ftcdn.net/jpg/01/00/14/64/360_F_100146497_A3XOehSzMX2WmdqdNHYKfiuKClz5pLDp.jpg",
    ]

let link = savedLinks[Math.floor(Math.random() * savedLinks.length)];

let loader = new THREE.TextureLoader();
const material = new THREE.MeshPhongMaterial({
    color: 0xffc670,
    flatShading: true,
    shininess: 100,

    displacementMap: loader.load(link),
    displacementScale: 0,

});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

//Light
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(0, 10, 10);
light.intensity = 200;
const ambientLight = new THREE.AmbientLight(0xffffff, .5);
scene.add(light);
scene.add(ambientLight);

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);


//Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);


//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;

controls.autoRotate = true;
controls.autoRotateSpeed = 6;
controls.rotateSpeed = 1;


//Resize
window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
});

const ischecked = false;
//checkbox event listener
document.getElementById("displacement").addEventListener("click", checkboxBehavior);
function checkboxBehavior() {
    var checkBox = document.getElementById("displacement");
    if (checkBox.checked == true) {
        //Displacement Map
        gsap.to(material, { displacementScale: 1 })
    } else {
        //recalculate random link for every checkbox click
        let newlink = savedLinks[Math.floor(Math.random() * savedLinks.length)];
        //wait until the material is updated to change the displacement map
        gsap.to(material, { 
            displacementScale: 0,
            duration: 1,
            onComplete: () => {
              material.displacementMap = loader.load(newlink);
            }
        });
    }
}

// Get slider element  
const slider = document.getElementById("myRange");
//make slider invisible
slider.style.display = "none";



// Raycaster 
const raycaster = new THREE.Raycaster();

// Mouse vector 
const mouse = new THREE.Vector2();

// Bind mouse move event
window.addEventListener('mousemove', onMouseMove);

function onMouseMove(event) {
    // Update the mouse variable
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

const loop = () => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        // Hovered
        // Grow it 50% in size
        gsap.to(mesh.scale, { x: 1.5, y: 1.5, z: 1.5 });
        //title fade out
        gsap.to(".title", { y: 0, opacity: 0 })




    }
    else {
        // Not hovered
        // Shrink it back down
        gsap.to(mesh.scale, { x: 1, y: 1, z: 1 });
        // Title fade in
        gsap.to(".title", { y: 0, opacity: 1 })

    }
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);

};
loop();


//Timeline Magic
const tl = gsap.timeline({ defaults: { duration: 1 } });
tl.fromTo(mesh.scale, { z: 0, y: 0, x: 0 }, { z: 1, y: 1, x: 1 });
tl.fromTo("nav", { y: -50, opacity: 0 }, { y: 0, opacity: 1 });
tl.fromTo(".title", { opacity: 0 }, { opacity: 1 },);

//Mouse animation color
let mouseDown = false;
let rgb = [];
window.addEventListener("mousedown", () => { mouseDown = true; });
window.addEventListener("mouseup", () => { mouseDown = false; });

//Animate on window hover

// window.addEventListener("mouseover", (e) => { 
//     gsap.to(mesh.scale, {x: 1.5, y: 1.5, z: 1.5});
//     gsap.to(".title", {y: 0, opacity: 0});
// });
// window.addEventListener("mouseout", () => { 
//     gsap.to(mesh.scale, {x: 1, y: 1, z: 1}),
//     gsap.to(".title", {y: 0, opacity: 1});
//     mesh.material.color = new THREE.Color('cyan')
// });



window.addEventListener("mousemove", (e) => {
    if (mouseDown) {
        rgb = [
            Math.round((e.pageX / sizes.width) * 255),
            Math.round((e.pageY / sizes.height) * 255),
            150

        ];
        //Animate
        let num = e.pageX / sizes.width;
        let num2 = e.pageY / sizes.height;
        //gsap.to(mesh.scale, {x: num*2, y: num2*2, z: 1, duration: 0.7})
        gsap.to(mesh.material.color, { r: rgb[0] / 255, g: rgb[1] / 255, b: rgb[2] / 255, duration: 0.7 })
    }
});
