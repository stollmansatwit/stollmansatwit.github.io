import * as THREE from 'three';
import './style.css';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//Scene
const scene = new THREE.Scene();

//Creating Sphere
const resolution = 200;
const geometry = new THREE.TorusGeometry(3, 1.5, 200, 200)// const material = new THREE.MeshStandardMaterial({ color: "#00ff83" , roughness: .5, metalness: .2});
const geometry2 = new THREE.SphereGeometry(3, 32, 32);

let link = "https://as2.ftcdn.net/v2/jpg/00/80/70/29/1000_F_80702927_FhNtSKQib9jPEem2z3xC8ANG0uqYyBk3.jpg"
const material = new THREE.MeshPhongMaterial({
    color: 0xffc670,
    flatShading: true,
    shininess: 100,

    displacementMap: new THREE.TextureLoader().load(link),
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
document.getElementById("displacement").addEventListener("click", myFunction);
function myFunction() {
    var checkBox = document.getElementById("displacement");
    if (checkBox.checked == true) {
        //Displacement Map
        gsap.to(material, { displacementScale: 1 })
    } else {
        //No Displacement Map
        gsap.to(material, { displacementScale: 0 })
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
