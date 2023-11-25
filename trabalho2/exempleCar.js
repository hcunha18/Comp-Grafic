import * as THREE from "three";
import { ConvexGeometry } from "../build/jsm/geometries/ConvexGeometry.js";
import {
  createGroundPlane,
} from "../libs/util/util.js";
import { Object3D, Scene, Vector3 } from "../build/three.module.js";

export {
  carroceria,
  torus,
  torus1,
  torus2,
  torus3,
  heixo_dianteiro,
  Aro,
  Aro1,
  Aro2,
  Aro3,
  Aro4,
  Aro5,
  Aro6,
  Aro7,
};

// var light = initDefaultSpotlight(scene, new THREE.Vector3(25, 30, 20)); // Use default light

let colormap = 	new THREE.TextureLoader().load("../assets/textures/displacement/Stylized_blocks_001_basecolor.jpg");
let normalmap = new THREE.TextureLoader().load("../assets/textures/displacement/Stylized_blocks_001_normal.jpg");
let dispmap = 	new THREE.TextureLoader().load("../assets/textures/displacement/Stylized_blocks_001_height.png");

let colormap1 = 	new THREE.TextureLoader().load("../assets/textures/teto.jpg");
let colormap3 = 	new THREE.TextureLoader().load("../assets/textures/darkcement.jpg");
let texturaVidro = 	new THREE.TextureLoader().load("../assets/textures/glass1.png");

var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.lookAt(0, 0, 0);
camera.position.set(5, 15, 40);
camera.up.set(0, 1, 0);

var groundPlane = createGroundPlane(40, 35); // width and height
groundPlane.rotateX(THREE.MathUtils.degToRad(-90));

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(20);
axesHelper.visible = false;
axesHelper.translateY(0.1);

// Object Material
var objectMaterial = new THREE.MeshPhongMaterial({
  // color: "#898989",
  transparent: true,
  map: colormap3,
  normalMap: colormap3,
	displacementScale: 100,
});

// INICIO

// este mateterial já foi definido para as rodas, falta apenas modificar as cores
var objectMaterial1 = new THREE.MeshLambertMaterial({
  color: "#1C1C1C",
  opacity: 1,
  transparent: true,
  map: colormap,
	normalMap: normalmap,
	displacementMap: dispmap,
	displacementScale: 0.1,
});

// var objectMaterial1 = new THREE.MeshLambertMaterial({
//   color: "#1C1C1C",
//   opacity: 1,
//   transparent: true,
//   map: colormap,
// 	normalMap: normalmap,
// 	displacementMap: dispmap,
// 	displacementScale: 0.1    ,
// });

// DETALHE RODA, AINDA N IMPLEMENTADO
const geometry = new THREE.BoxGeometry(1.6, 0.1, 0.3);
const material = new THREE.MeshLambertMaterial({ color: "#808080" });
const Aro = new THREE.Mesh(geometry, material);
Aro.rotateX(THREE.MathUtils.degToRad(-90));
Aro.rotateY(THREE.MathUtils.degToRad(-90));
// Aro.rotateZ(THREE.MathUtils.degToRad(-10));
Aro.position.set(4.75, 1.5, 8.5);
const Aro1 = new THREE.Mesh(geometry, material);
Aro1.rotateX(THREE.MathUtils.degToRad(-90));
Aro1.position.set(4.75, 1.5, 8.5);

const Aro2 = new THREE.Mesh(geometry, material);
Aro2.rotateX(THREE.MathUtils.degToRad(-90));
Aro2.position.set(4.75, 1.5, -0.5);

const Aro3 = new THREE.Mesh(geometry, material);
Aro3.rotateX(THREE.MathUtils.degToRad(-90));
Aro3.rotateY(THREE.MathUtils.degToRad(-90));
Aro3.position.set(4.75, 1.5, -0.5);

const Aro4 = new THREE.Mesh(geometry, material);
Aro4.rotateX(THREE.MathUtils.degToRad(-90));
Aro4.position.set(-4.5, 1.5, -0.5);

const Aro5 = new THREE.Mesh(geometry, material);
Aro5.rotateX(THREE.MathUtils.degToRad(-90));
Aro5.rotateY(THREE.MathUtils.degToRad(-90));
Aro5.position.set(-4.5, 1.5, -0.5);

const Aro6 = new THREE.Mesh(geometry, material);
Aro6.rotateX(THREE.MathUtils.degToRad(-90));
Aro6.position.set(-4.5, 1.5, 8.5);

const Aro7 = new THREE.Mesh(geometry, material);
Aro7.rotateX(THREE.MathUtils.degToRad(-90));
Aro7.rotateY(THREE.MathUtils.degToRad(-90));
Aro7.position.set(-4.5, 1.5, 8.5);

const geometriaTorus = new THREE.TorusGeometry(1, 0.6, 13, 30);
const geometria_preenchimento_roda_dianteira = new THREE.CylinderGeometry(
  1.1,
  1.1,
  0.9,
  5
);
const geometria_preenchimento_roda_dianteira1 = new THREE.CylinderGeometry(
  0.3,
  0.3,
  8,
  32
);
const heixo_dianteiro = new Object3D();
const heixo_traseiro = new Object3D();

const torus = new THREE.Mesh(geometriaTorus, objectMaterial1);
const torus1 = new THREE.Mesh(geometriaTorus, objectMaterial1);
const torus2 = new THREE.Mesh(geometriaTorus, objectMaterial1);
const torus3 = new THREE.Mesh(geometriaTorus, objectMaterial1);
// RODA DIANTEIRA
torus.position.set(4.75, 1.5, 8);
// scene.add(torus);
torus1.position.set(4.75, 1.5, 0);
// scene.add(torus1);
heixo_dianteiro.add(torus1);
heixo_dianteiro.add(torus);

// RODA TRASEIRA
torus2.position.set(-4.5, 1.5, 8);
// scene.add(torus2);
torus3.position.set(-4.5, 1.5, 0);
// scene.add(torus3);
heixo_traseiro.add(torus2);
heixo_traseiro.add(torus3);
// RODA DIANTEIRA
const cilindro_interno = new THREE.Mesh(
  geometria_preenchimento_roda_dianteira,
  objectMaterial1
);
const cilindro_interno1 = new THREE.Mesh(
  geometria_preenchimento_roda_dianteira,
  objectMaterial1
);
// RODA TRASEIRA
const cilindro_interno2 = new THREE.Mesh(
  geometria_preenchimento_roda_dianteira,
  objectMaterial1
);
const cilindro_interno3 = new THREE.Mesh(
  geometria_preenchimento_roda_dianteira,
  objectMaterial1
);

cilindro_interno.rotateX(THREE.MathUtils.degToRad(-90));
cilindro_interno1.rotateX(THREE.MathUtils.degToRad(-90));
cilindro_interno2.rotateX(THREE.MathUtils.degToRad(-90));
cilindro_interno3.rotateX(THREE.MathUtils.degToRad(-90));

cilindro_interno.position.set(4.75, 1.5, 8);
// scene.add(cilindro_interno);
cilindro_interno1.position.set(4.75, 1.5, 0);
// scene.add(cilindro_interno1);
cilindro_interno2.position.set(-4.5, 1.5, 8);
// scene.add(cilindro_interno2);
cilindro_interno3.position.set(-4.5, 1.5, 0);
// scene.add(cilindro_interno3);
heixo_dianteiro.add(cilindro_interno);
heixo_dianteiro.add(cilindro_interno1);
heixo_traseiro.add(cilindro_interno2);
heixo_traseiro.add(cilindro_interno3);
// criação eixo central
const heixo_dianteiro_central = new THREE.Mesh(
  geometria_preenchimento_roda_dianteira1,
  objectMaterial1
);
const heixo_dianteiro_central1 = new THREE.Mesh(
  geometria_preenchimento_roda_dianteira1,
  objectMaterial1
);
heixo_dianteiro_central.rotateX(THREE.MathUtils.degToRad(-90));
heixo_dianteiro_central1.rotateX(THREE.MathUtils.degToRad(-90));
heixo_dianteiro_central.position.set(4.75, 1.5, 4);
heixo_dianteiro_central1.position.set(-4.5, 1.5, 4);
heixo_dianteiro.add(heixo_dianteiro_central);
// scene.add(heixo_dianteiro_central1);
// scene.add(heixo_traseiro);
// scene.add(heixo_dianteiro);

heixo_dianteiro.add(Aro);
heixo_dianteiro.add(Aro1);
heixo_dianteiro.add(Aro2);
heixo_dianteiro.add(Aro3);

heixo_traseiro.add(Aro4);
heixo_traseiro.add(Aro5);
heixo_traseiro.add(Aro6);
heixo_traseiro.add(Aro7);

//----------------------------------
// Create Convex Geometry
//----------------------------------
var numPoints = 30;



// Global variables to be removed from memory each interaction
var pointCloud = null;
//  var spGroup = null;
var convexGeometry = null;
var convexGeometry1 = null;
var carroceria = null;

// Create convex object the first time

// gerar pontos de um objeto convexo
function generatePoints(numberOfPoints) {
  var points = [];
  //   base inferior
  var X = 7.8;
  var Y = 1.6;
  var Z = 8;
  points.push(new THREE.Vector3(X, Y, Z));
  X = -7.8;
  Y = 1.6;
  Z = 8;
  points.push(new THREE.Vector3(X, Y, Z));
  X = 7.8;
  Y = 1.6;
  Z = 0;
  points.push(new THREE.Vector3(X, Y, Z));
  X = -7.8;
  Y = 1.6;
  Z = 0;
  points.push(new THREE.Vector3(X, Y, Z));
  X = 8.8;
  Y = 1.6;
  (Z = 7), 5;
  points.push(new THREE.Vector3(X, Y, Z));

  X = 8.8;
  Y = 1.6;
  (Z = 1), 5;
  points.push(new THREE.Vector3(X, Y, Z));

  //   base superior
  X = 8;
  Y = 3.6;
  Z = 8;
  points.push(new THREE.Vector3(X, Y, Z));
  X = -8;
  Y = 3.6;
  Z = 8;
  points.push(new THREE.Vector3(X, Y, Z));
  X = 8;
  Y = 3.6;
  Z = 0;
  points.push(new THREE.Vector3(X, Y, Z));
  X = -8;
  Y = 3.6;
  Z = 0;
  points.push(new THREE.Vector3(X, Y, Z));
  X = 9;
  Y = 3.6;
  (Z = 7), 5;
  points.push(new THREE.Vector3(X, Y, Z));

  X = 9;
  Y = 3.6;
  (Z = 1), 5;
  points.push(new THREE.Vector3(X, Y, Z));

  //
  X = 1;
  Y = 5.6;
  (Z = 1), 5;
  points.push(new THREE.Vector3(X, Y, Z));
  X = 1;
  Y = 5.6;
  (Z = 7), 5;
  points.push(new THREE.Vector3(X, Y, Z));

  var material = new THREE.MeshPhongMaterial({ color: "rgb(255,255,0)" });

  pointCloud = new THREE.Object3D();
  points.forEach(function (point) {
    var spGeom = new THREE.SphereGeometry(0.2);
    var spMesh = new THREE.Mesh(spGeom, material);
    spMesh.position.set(point.x, point.y, point.z);
    pointCloud.add(spMesh);
  });

  // scene.add(pointCloud);

  return points;
}
// função para gerar a parte da frente do topo
function generatePoints_topo_frente(numberOfPoints) {
  var points = [];
  var X = 8;
  var Y = 6.6;
  var Z = 8;
  points.push(new THREE.Vector3(X, Y, Z));
  X = 8;
  Y = 6.6;
  Z = 0;
  points.push(new THREE.Vector3(X, Y, Z));
  X = 9;
  Y = 6.6;
  (Z = 7), 5;
  points.push(new THREE.Vector3(X, Y, Z));
  X = 9;
  Y = 6.6;
  (Z = 1), 5;
  points.push(new THREE.Vector3(X, Y, Z));
  X = 1;
  Y = 8.6;
  (Z = 1), 5;
  points.push(new THREE.Vector3(X, Y, Z));
  X = 1;
  Y = 8.6;
  (Z = 7), 5;
  points.push(new THREE.Vector3(X, Y, Z));
  X = 1;
  Y = 7;
  Z = 0;
  points.push(new THREE.Vector3(X, Y, Z));
  X = 1;
  Y = 7;
  Z = 8;
  points.push(new THREE.Vector3(X, Y, Z));

  var material = new THREE.MeshPhongMaterial({ color: "rgb(255,255,0)"});

  pointCloud = new THREE.Object3D();
  points.forEach(function (point) {
    var spGeom = new THREE.SphereGeometry(0.2);
    var spMesh = new THREE.Mesh(spGeom, material);
    spMesh.position.set(point.x, point.y, point.z);
    pointCloud.add(spMesh);
  });

  // scene.add(pointCloud);

  return points;
}
var convexGeometryfrente = null;
var frente_topo_carro = null;

function createConvex_topo_frente() {
  if (convexGeometryfrente) convexGeometryfrente.dispose();

  // First, create the point vector to be used by the convex hull algorithm
  var Pontos = generatePoints_topo_frente(numPoints);

  // Then, build the convex geometry with the generated points
  convexGeometryfrente = new ConvexGeometry(Pontos);

  frente_topo_carro = new THREE.Mesh(convexGeometryfrente, objectMaterial);
  // scene.add(frente_topo_carro);
}
createConvex_topo_frente();
generatePoints_topo_frente();

// vidro
const geometryVidro = new THREE.BoxGeometry(5, 5, 0.2);
const materialVidro = new THREE.MeshPhongMaterial({ color: "#3c3c3c", 
map: texturaVidro,
displacementScale: 1 });
var vidro = new THREE.Mesh(geometryVidro, materialVidro);
vidro.position.set(4.5, 4.7, 4);
vidro.rotateX(THREE.MathUtils.degToRad(-90));
vidro.rotateY(THREE.MathUtils.degToRad(15));
var objectVidro = new THREE.Object3D();
objectVidro.add(vidro);

// farol dianteiro
const geometryFarol = new THREE.BoxGeometry(0.5, 0.2, 6);
let colormap2 = 	new THREE.TextureLoader().load("../assets/textures/intertravado.jpg");
const materialFarol = new THREE.MeshPhongMaterial({color: "#F0F8FF",  map: colormap2,
displacementScale: 0.1, });
var farol = new THREE.Mesh(geometryFarol, materialFarol);
farol.position.set(8.8, 3.5, 4);
var objectFarol = new THREE.Object3D();
objectFarol.add(farol);

// farol traseiro
const geometryFarol2 = new THREE.BoxGeometry(0.5, 0.2, 7.9);
const materialFarol2 = new THREE.MeshPhongMaterial({ color: "#f0d046",  map: colormap2,
displacementScale: 10, });
var farol2 = new THREE.Mesh(geometryFarol2, materialFarol2);
farol2.position.set(-7.8, 3.5, 4);
var objectFarol2 = new THREE.Object3D();
objectFarol2.add(farol2);

//parachoque baixo traseiro
const geometryParachoque = new THREE.BoxGeometry(1.8, 0.3, 8.5);
const materialParachoque = new THREE.MeshPhongMaterial({ color: "#03000f" , map: colormap1,
displacementScale: 1,});
var parachoque = new THREE.Mesh(geometryParachoque, materialParachoque);
parachoque.position.set(-7, 1.5, 4);
var objectparachoque = new THREE.Object3D();
objectparachoque.add(parachoque);

// parachoque traseiro \
const geometryParachoque2 = new THREE.BoxGeometry(2, 0.3, 8.5);
var parachoque2 = new THREE.Mesh(geometryParachoque2, materialParachoque);
parachoque2.position.set(-6, 2.5, 4);
parachoque2.rotateZ(THREE.MathUtils.degToRad(70));
var objectparachoque2 = new THREE.Object3D();
objectparachoque2.add(parachoque2);
// parachoque traseiro ___
const geometryParachoque3 = new THREE.BoxGeometry(2.6, 0.3, 8.5);
var parachoque3 = new THREE.Mesh(geometryParachoque3, materialParachoque);
parachoque3.position.set(-4.5, 3.35, 4);
var objectparachoque3 = new THREE.Object3D();
objectparachoque3.add(parachoque3);
// parachoque traseiro /
var parachoque4 = new THREE.Mesh(geometryParachoque2, materialParachoque);
parachoque4.position.set(-3, 2.5, 4);
parachoque4.rotateZ(THREE.MathUtils.degToRad(-70));
var objectparachoque4 = new THREE.Object3D();
objectparachoque4.add(parachoque4);
//parachoque meio _____
const geometryParachoque5 = new THREE.BoxGeometry(5.8, 0.3, 8.5);
var parachoque5 = new THREE.Mesh(geometryParachoque5, materialParachoque);
parachoque5.position.set(0.1, 1.5, 4);
var objectparachoque5 = new THREE.Object3D();
objectparachoque5.add(parachoque5);

// parachoque dianteiro \
var parachoque6 = new THREE.Mesh(geometryParachoque2, materialParachoque);
parachoque6.position.set(3.2, 2.5, 4);
parachoque6.rotateZ(THREE.MathUtils.degToRad(70));
var objectparachoque6 = new THREE.Object3D();
objectparachoque6.add(parachoque6);
// parachoque dianteiro ___
var parachoque7 = new THREE.Mesh(geometryParachoque3, materialParachoque);
parachoque7.position.set(4.75, 3.35, 4);
var objectparachoque7 = new THREE.Object3D();
objectparachoque7.add(parachoque7);
// parachoque dianteiro /
var parachoque8 = new THREE.Mesh(geometryParachoque2, materialParachoque);
parachoque8.position.set(6.3, 2.5, 4);
parachoque8.rotateZ(THREE.MathUtils.degToRad(-70));
var objectparachoque8 = new THREE.Object3D();
objectparachoque8.add(parachoque8);
//parachoque frente
const geometryParachoque9 = new THREE.BoxGeometry(1.3, 0.3, 8.5);
var parachoque9 = new THREE.Mesh(geometryParachoque9, materialParachoque);
parachoque9.position.set(7.1, 1.5, 4);
var objectparachoque9 = new THREE.Object3D();
objectparachoque9.add(parachoque9);
//parachoque frente
const geometryParachoque10 = new THREE.BoxGeometry(0.2, 0.3, 6);
var parachoque10 = new THREE.Mesh(geometryParachoque10, materialParachoque);
parachoque10.position.set(8.8, 1.5, 4);
var objectparachoque10 = new THREE.Object3D();
objectparachoque10.add(parachoque10);
//parachoque frente
const geometryParachoque11 = new THREE.BoxGeometry(0.2, 0.3, 1.7);
var parachoque11 = new THREE.Mesh(geometryParachoque11, materialParachoque);
parachoque11.position.set(8.26, 1.5, 0.45);
parachoque11.rotateY(THREE.MathUtils.degToRad(45));
var objectparachoque11 = new THREE.Object3D();
objectparachoque11.add(parachoque11);
//parachoque frente
var parachoque12 = new THREE.Mesh(geometryParachoque11, materialParachoque);
parachoque12.position.set(8.26, 1.5, 7.55);
parachoque12.rotateY(THREE.MathUtils.degToRad(-45));
var objectparachoque12 = new THREE.Object3D();
objectparachoque12.add(parachoque12);
//parte preta frente
const geometryParachoque13 = new THREE.BoxGeometry(2.5, 2, 8.1);
var parachoque13 = new THREE.Mesh(geometryParachoque13, materialParachoque);
parachoque13.position.set(4.8, 2.5, 4);
var objectparachoque13 = new THREE.Object3D();
objectparachoque13.add(parachoque13);
//parte preta tras
const geometryParachoque14 = new THREE.BoxGeometry(2.5, 2, 8.5);
var parachoque14 = new THREE.Mesh(geometryParachoque13, materialParachoque);
parachoque14.position.set(-4.5, 2.5, 4);
var objectparachoque14 = new THREE.Object3D();
objectparachoque14.add(parachoque14);
// parte preta tras \
const geometryParachoque15 = new THREE.BoxGeometry(2, 0.3, 8.1);
var parachoque15 = new THREE.Mesh(geometryParachoque15, materialParachoque);
parachoque15.position.set(-5.8, 2.5, 4);
parachoque15.rotateZ(THREE.MathUtils.degToRad(70));
var objectparachoque15 = new THREE.Object3D();
objectparachoque15.add(parachoque15);

// parte preta frente \
var parachoque16 = new THREE.Mesh(geometryParachoque15, materialParachoque);
parachoque16.position.set(3.4, 2.5, 4);
parachoque16.rotateZ(THREE.MathUtils.degToRad(70));
var objectparachoque16 = new THREE.Object3D();
objectparachoque16.add(parachoque16);

// parte preta tras /
var parachoque17 = new THREE.Mesh(geometryParachoque15, materialParachoque);
parachoque17.position.set(-3.2, 2.5, 4);
parachoque17.rotateZ(THREE.MathUtils.degToRad(-70));
var objectparachoque17 = new THREE.Object3D();
objectparachoque17.add(parachoque17);

// parte preta frente /
var parachoque18 = new THREE.Mesh(geometryParachoque15, materialParachoque);
parachoque18.position.set(6.1, 2.5, 4);
parachoque18.rotateZ(THREE.MathUtils.degToRad(-70));
var objectparachoque18 = new THREE.Object3D();
objectparachoque18.add(parachoque18);

// gerar objeto convexo a partir dessa estrutura
function updateConvexObject() {
  // As the object is updated when changing number of Points
  // it's useful to remove the previous object from memory (if it exists)
  if (convexGeometry) convexGeometry.dispose();
  if (convexGeometry1) convexGeometry1.dispose();

  // First, create the point vector to be used by the convex hull algorithm
  var localPoints = generatePoints(numPoints);

  // Then, build the convex geometry with the generated points
  convexGeometry = new ConvexGeometry(localPoints);

  carroceria = new THREE.Mesh(convexGeometry, objectMaterial);
  // Object = Carroceria
  carroceria.add(heixo_dianteiro);
  carroceria.add(heixo_traseiro);
  carroceria.add(objectVidro);
  carroceria.add(objectFarol);
  carroceria.add(objectFarol2);
  carroceria.add(objectparachoque);
  carroceria.add(objectparachoque2);
  carroceria.add(objectparachoque3);
  carroceria.add(objectparachoque4);
  carroceria.add(objectparachoque5);
  carroceria.add(objectparachoque6);
  carroceria.add(objectparachoque7);
  carroceria.add(objectparachoque8);
  carroceria.add(objectparachoque9);
  carroceria.add(objectparachoque10);
  carroceria.add(objectparachoque11);
  carroceria.add(objectparachoque12);
  carroceria.add(objectparachoque13);
  carroceria.add(objectparachoque14);
  carroceria.add(objectparachoque15);
  carroceria.add(objectparachoque16);
  carroceria.add(objectparachoque17);
  carroceria.add(objectparachoque18);

}

updateConvexObject();
carroceria.scale.set(0.5, 0.5, 0.5);
