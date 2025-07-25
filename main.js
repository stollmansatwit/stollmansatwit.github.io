import * as THREE from 'three';
import '/style.css';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Global variables
let threeJsInitialized = false;

// Check if screen is large enough for 3D rendering
function isScreenLargeEnough() {
    return window.innerWidth >= 300;
}

// Only initialize Three.js if screen is large enough
if (isScreenLargeEnough()) {
    threeJsInitialized = true;
    //Scene
    const scene = new THREE.Scene();



//Creating Donut
let resolution = 32; // Start with lower resolution for better performance
let geometry = new THREE.TorusGeometry(3, 1.5, resolution, resolution); // torus
let geometry2 = new THREE.SphereGeometry(3, resolution, resolution); // sphere
let geometry3 = new THREE.BoxGeometry(3, 3, 3, resolution, resolution); // cube
let geometry4 = new THREE.SphereGeometry(3, resolution, resolution).scale(2, 1, 1); // ellipsoid
let savedLinks = [
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/044af924-3964-4328-b96c-1fb2ef48c485/dbr4tgs-1e48ec7d-ebf9-4677-84e0-15fcffa8f7bf.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA0NGFmOTI0LTM5NjQtNDMyOC1iOTZjLTFmYjJlZjQ4YzQ4NVwvZGJyNHRncy0xZTQ4ZWM3ZC1lYmY5LTQ2NzctODRlMC0xNWZjZmZhOGY3YmYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Q-Rkx93uwhnJ0vHNOzBlY5-BEcN1fNqIzmsL9gxQfJo",
    "https://t4.ftcdn.net/jpg/00/80/70/29/360_F_80702927_FhNtSKQib9jPEem2z3xC8ANG0uqYyBk3.jpg",
    "https://www.shutterstock.com/image-illustration/abstract-black-white-lines-art-600nw-1716477298.jpg",
    "https://t4.ftcdn.net/jpg/04/43/18/67/360_F_443186712_DNJoCbUlLfAyBozDGS8buHdqDn8cgt3N.jpg",
    "https://as2.ftcdn.net/v2/jpg/03/74/43/45/1000_F_374434586_WYizDJCJhPeRwyHPUACSMAyQyGNBuEKG.jpg",
    "https://t3.ftcdn.net/jpg/01/00/14/64/360_F_100146497_A3XOehSzMX2WmdqdNHYKfiuKClz5pLDp.jpg",
    "https://media.istockphoto.com/id/1325685263/photo/4k-black-and-white-organic-polygon-shape-background.jpg?s=612x612&w=0&k=20&c=EXTB0-0SGBmMfYAX4U84v9TCKNC8_lG4IJoaXlsomoE=",
    "https://media.istockphoto.com/id/973897096/photo/abstract-curves-parametric-curved-lines-and-shapes-4k-seamless-background.jpg?s=612x612&w=0&k=20&c=E4AVFVJxxpfZfrwt8m5Io0ZOGA2EljGnkw7gHq77vpk=",
    "https://media.istockphoto.com/id/1269606281/photo/jagged-rock-ambient-occlusion-map-texture-grayscale-ao-map.jpg?s=612x612&w=0&k=20&c=hFVOekZ4UBdl-V94_pGjKxgiWX-YqsmGSfnXxD-h6wY=",
    "https://media.istockphoto.com/id/1421682971/vector/honeycomb-style-pixelated-word-map-good-for-3d-texture-bump-or-displacement-map-can-be-used.jpg?s=612x612&w=0&k=20&c=AClr9e69YR8R92TFPqpzu6qYx2bhEJ9opcZq2khqNio=",
    "https://www.shutterstock.com/shutterstock/videos/1069022458/thumb/1.jpg?ip=x480",
    "https://miro.medium.com/v2/resize:fit:1400/1*3MDbIv2XHGzJyHnrgXOftA.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmXzTo_JEViaIk_khlCALYKjPAHwfhRRMe1Q&s",
    "/GreyscaleCells.png",
    "/EdgeDistances.png",
    "/DM1.jpeg",
    "/DM2.jpeg",
    "/DM3s.jpeg",
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

let mesh = new THREE.Mesh(geometry, material);
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
const renderer = new THREE.WebGLRenderer({ 
    canvas,
    antialias: false,
    alpha: false,
    preserveDrawingBuffer: false,
    powerPreference: "default"
});
renderer.setClearColor(0x000000, 1.0);
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(1); // Force pixel ratio to 1 for better performance
renderer.render(scene, camera);

// Handle WebGL context loss
canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    console.log('WebGL context lost');
});

canvas.addEventListener('webglcontextrestored', () => {
    console.log('WebGL context restored');
    // Reinitialize if needed
});


//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;

controls.autoRotate = true;
controls.autoRotateSpeed = 6;
controls.rotateSpeed = 1;


//Resize - optimized with debouncing
let resizeTimeout;
window.addEventListener("resize", () => {
    if (!isScreenLargeEnough()) {
        return; // Don't update if screen is too small
    }
    
    // Debounce resize events for better performance
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(1);
        renderer.render(scene, camera); // Force a render after resize
    }, 100);
});


//Checkboxes
const ischecked = false;
//checkbox event listener
document.getElementById("displacement").addEventListener("click", displacementCheckboxBehavior);
function displacementCheckboxBehavior() {
    var checkBox = document.getElementById("displacement");
    var aarushCheckBox = document.getElementById("aarush");
    if (checkBox.checked == true) {
        //Uncheck aarush checkbox to ensure mutual exclusivity
        aarushCheckBox.checked = false;
        
        // Check if aarush was previously checked
        if (material.displacementScale > 0) {
            // Aarush was active, so animate down first, then back up with new texture
            gsap.to(material, { 
                displacementScale: 0,
                onComplete: () => {
                    // Generate new random texture and animate back up
                    let newlink = savedLinks[Math.floor(Math.random() * savedLinks.length)];
                    material.displacementMap = loader.load(newlink);
                    gsap.to(material, { displacementScale: 1 });
                }
            });
        } else {
            // Generate new random texture and animate back up
            let newlink = savedLinks[Math.floor(Math.random() * savedLinks.length)];
            material.displacementMap = loader.load(newlink);
            // No previous displacement, just animate up
            gsap.to(material, { displacementScale: 1 })
        }
    } else {
        //recalculate random link for every checkbox click
        let newlink = savedLinks[Math.floor(Math.random() * savedLinks.length)];
        //wait until the material is updated to change the displacement map
        gsap.to(material, { 
            displacementScale: 0,
            onComplete: () => {
              material.displacementMap = loader.load(newlink);
            }
        });
    }
}

//checkbox event listener
document.getElementById("aarush").addEventListener("click", aarushCheckboxBehavior);
function aarushCheckboxBehavior() {
    var checkBox = document.getElementById("aarush");
    var checkBox2 = document.getElementById("displacement");
    if (checkBox.checked == true) {
        //Uncheck displacement checkbox
        checkBox2.checked = false;
        
        // Check if displacement was previously active
        if (material.displacementScale > 0) {
            // Displacement was active, animate down first, then back up with Aarush texture
            gsap.to(material, { 
                displacementScale: 0,
                onComplete: () => {
                    material.displacementMap = loader.load("/Aarush_Pointing_Smiling.png");
                    gsap.to(material, { displacementScale: 1 });
                }
            });
        } else {
            // No previous displacement, just load texture and animate up
            material.displacementMap = loader.load("/Aarush_Pointing_Smiling.png");
            gsap.to(material, { displacementScale: 1 });
        }
    } else {
        //When unchecked, set displacement scale back to 0
        gsap.to(material, { displacementScale: 0 })
    }
}


//checkbox event listener for wireframe
document.getElementById("wireframe").addEventListener("click", checkboxBehavior2);
function checkboxBehavior2() {
    var checkBox = document.getElementById("wireframe");
    if (checkBox.checked == true) {
        //Wireframe
        material.wireframe = true;
    } else {
        material.wireframe = false;
    }
}


//checkbox event listener for zoom
document.getElementById("zoom").addEventListener("click", checkboxBehavior3);
function checkboxBehavior3() {
    var checkBox = document.getElementById("zoom");
    if (checkBox.checked == true) {
        //Camera zoom
        controls.enableZoom = true;
    } else {
        controls.enableZoom = false;
    }
}

//checkbox event listener for sphere
document.getElementById("sphere").addEventListener("click", checkboxBehavior4);
function checkboxBehavior4() {
  var checkBox = document.getElementById("sphere");
  var cubeCheckBox = document.getElementById("cube");
  var ellipsoidCheckBox = document.getElementById("ellipsoid");
  if (checkBox.checked == true) {
    // Uncheck cube and ellipsoid checkbox
    cubeCheckBox.checked = false;
    ellipsoidCheckBox.checked = false;
    //Sphere
    scene.remove(mesh);
    mesh = new THREE.Mesh(geometry2, material);
    scene.add(mesh);
  } else {
    scene.remove(mesh);
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  }
}

//checkbox event listener for cube
document.getElementById("cube").addEventListener("click", checkboxBehavior5);
function checkboxBehavior5() {
  var checkBox = document.getElementById("cube");
  var sphereCheckBox = document.getElementById("sphere");
  var ellipsoidCheckBox = document.getElementById("ellipsoid");
  if (checkBox.checked == true) {
    // Uncheck sphere and elipsoid checkbox
    sphereCheckBox.checked = false;
    ellipsoidCheckBox.checked = false;
    //Cube
    scene.remove(mesh);
    mesh = new THREE.Mesh(geometry3, material);
    scene.add(mesh);
  } else {
    scene.remove(mesh);
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  }
}

document.getElementById("ellipsoid").addEventListener("click", checkboxBehavior6);
function checkboxBehavior6() {
  var checkBox = document.getElementById("ellipsoid");
  var sphereCheckBox = document.getElementById("sphere");
  var cubeCheckBox = document.getElementById("cube");
  if (checkBox.checked == true) {
    // Uncheck sphere and elipsoid checkbox
    sphereCheckBox.checked = false;
    cubeCheckBox.checked = false;
    //Cube
    scene.remove(mesh);
    mesh = new THREE.Mesh(geometry4, material);
    scene.add(mesh);
  } else {
    scene.remove(mesh);
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  }
}


// Get slider element  
const slider = document.getElementById("myRange");
// Make slider visible for resolution control
slider.style.display = "block";

// Add resolution slider functionality
slider.addEventListener("input", function() {
    const newResolution = parseInt(this.value);
    updateGeometryResolution(newResolution);
});

// Function to update geometry resolution
function updateGeometryResolution(newRes) {
    // Store current mesh material
    const currentMaterial = mesh.material;
    
    // Remove current mesh
    scene.remove(mesh);
    
    // Create new geometries with updated resolution
    const newGeometry = new THREE.TorusGeometry(3, 1.5, newRes, newRes); // torus
    const newGeometry2 = new THREE.SphereGeometry(3, newRes, newRes); // sphere
    const newGeometry3 = new THREE.BoxGeometry(3, 3, 3, newRes, newRes); // cube
    const newGeometry4 = new THREE.SphereGeometry(3, newRes, newRes).scale(2, 1, 1); // ellipsoid
    
    // Update global geometry variables
    geometry.dispose(); // Clean up old geometry
    geometry2.dispose();
    geometry3.dispose();
    geometry4.dispose();
    
    // Replace with new geometries
    geometry = newGeometry;
    geometry2 = newGeometry2;
    geometry3 = newGeometry3;
    geometry4 = newGeometry4;
    
    // Determine which geometry to use based on current checkboxes
    let activeGeometry = geometry; // Default to torus
    
    if (document.getElementById("sphere").checked) {
        activeGeometry = geometry2;
    } else if (document.getElementById("cube").checked) {
        activeGeometry = geometry3;
    } else if (document.getElementById("ellipsoid").checked) {
        activeGeometry = geometry4;
    }
    
    // Create new mesh with updated geometry
    mesh = new THREE.Mesh(activeGeometry, currentMaterial);
    scene.add(mesh);
    
    // Update resolution display
    updateResolutionDisplay(newRes);
}

// Function to update resolution display
function updateResolutionDisplay(resolution) {
    // Find or create resolution display element
    let display = document.getElementById("resolution-display");
    if (!display) {
        display = document.createElement("div");
        display.id = "resolution-display";
        display.style.color = "white";
        display.style.fontSize = "12px";
        display.style.marginTop = "5px";
        
        // Add it after the slider
        const sliderContainer = slider.parentElement;
        sliderContainer.appendChild(display);
    }
    
    // Calculate approximate vertex count
    const vertexCount = resolution * resolution;
    display.textContent = `Resolution: ${resolution} (~${vertexCount.toLocaleString()} vertices)`;
}

// Initialize resolution display
updateResolutionDisplay(32);



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
window.addEventListener("touchstart", handleTouchStart, false);
window.addEventListener("touchmove", handleTouchMove, false);
window.addEventListener("touchend", handleTouchEnd, false);


function handleTouchStart(event) {
  mouseDown = true;
  updateRGBAndAnimate(event.touches[0]);
}

function handleTouchMove(event) {
  if (mouseDown) {
    updateRGBAndAnimate(event.touches[0]);
  }
}

function handleTouchEnd(event) {
  mouseDown = false;
}

function updateRGBAndAnimate(touch) {
  const touchX = touch.clientX;
  const touchY = touch.clientY;

  const rgb = [
    Math.round((touchX / sizes.width) * 255),
    Math.round((touchY / sizes.height) * 255),
    150,
  ];

  const num = touchX / sizes.width;
  const num2 = touchY / sizes.height;

  gsap.to(mesh.material.color, {
    r: rgb[0] / 255,
    g: rgb[1] / 255,
    b: rgb[2] / 255,
    duration: 0.7,
  });
}

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
        updateRGBAndAnimate(e);
    }
});

} // End of screen size check

// Optimized global resize handler
let globalResizeTimeout;

window.addEventListener("resize", () => {
    clearTimeout(globalResizeTimeout);
    globalResizeTimeout = setTimeout(() => {
        const screenLargeEnough = isScreenLargeEnough();
        
        if (!screenLargeEnough) {
            // Screen became too small
            return;
        }
        
        // Check if Three.js was never initialized due to small initial screen size
        if (screenLargeEnough && !threeJsInitialized) {
            // Force a page reload to initialize Three.js
            window.location.reload();
            return;
        }
        
        // Only update Three.js sizes if it's initialized (screen is large enough)
        if (typeof sizes !== 'undefined' && typeof camera !== 'undefined' && typeof renderer !== 'undefined') {
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;

            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();

            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(1);
            renderer.render(scene, camera); // Force a render after resize
        }
    }, 100);
});
