import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.y = 15;
camera.position.z = 6;
camera.target = new THREE.Vector3(0, 0, 0);
camera.lookAt(camera.target);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0xf0f0f0);
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

function shuffleArray(arr) {
  let curIndex = arr.length;
  let randomIndex, temp;
  while (curIndex !== 0) {
    randomIndex = Math.floor(Math.random() * curIndex);
    curIndex -= 1;
    temp = arr[curIndex];
    arr[curIndex] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
  return arr;
}

function getPoints() {
  const arr = [];
  const numCols = 10;
  const numRows = 10;
  const startPos = {
    x: -6.5,
    z: -6.5,
  };
  const spacing = 1.5;
  let x, y, z;
  for (let i = 0; i < numCols; i += 1) {
    for (let j = 0; j < numRows; j += 1) {
      x = startPos.x + i * spacing;
      y = THREE.MathUtils.randFloatSpread(spacing * 7);
      z = startPos.z + j * spacing;
      arr.push({ x, y, z });
    }
  }
  return shuffleArray(arr);
}

function createThingFrom(points) {
  const geo = new THREE.BufferGeometry();
  const vertexPositions = [];
  const vertexColors = [];
  const cMult = 0.1;
  points.forEach((p) => {
    const { x, y, z } = p;
    vertexPositions.push(x, y, z);
    vertexColors.push(x * cMult, y * cMult, z * cMult);
  });

  geo.setAttribute( "position", new THREE.Float32BufferAttribute(vertexPositions, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(vertexColors, 3));
  const mat = new THREE.MeshBasicMaterial({
    vertexColors: true,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5,
  });
  const mesh = new THREE.Mesh(geo, mat);
  function update () {
    mesh.rotation.y += 0.001;
    mesh.rotation.x += 0.0005;
  }
  return { mesh, update };
}

const points = getPoints();
const thing = createThingFrom(points);
scene.add(thing.mesh);

function animate() {
  requestAnimationFrame(animate);
  thing.update();
  renderer.render(scene, camera);
}

animate();

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize, false);