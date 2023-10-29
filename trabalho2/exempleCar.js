import * as THREE from  'three';
import Stats from '../build/jsm/libs/stats.module.js';
import {TrackballControls} from '../build/jsm/controls/TrackballControls.js';
import {ConvexGeometry} from '../build/jsm/geometries/ConvexGeometry.js';
import {initRenderer, 
        initDefaultSpotlight,
        createGroundPlane,
        onWindowResize, 
        lightFollowingCamera} from "../libs/util/util.js";
import { Object3D, Scene, Vector3 } from '../build/three.module.js';

var scene = new THREE.Scene();    // Create main scene
var stats = new Stats();          // To show FPS information        
var light = initDefaultSpotlight(scene, new THREE.Vector3(25, 30, 20)); // Use default light
var renderer = initRenderer();    // View function in util/utils
  renderer.setClearColor("rgb(30, 30, 30)");
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.lookAt(0, 0, 0);
  camera.position.set(5,15,40);
  camera.up.set( 0, 1, 0 );


var followCamera = false; // Controls if light will follow camera

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls( camera, renderer.domElement );

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

var groundPlane = createGroundPlane(40, 35); // width and height
  groundPlane.rotateX(THREE.MathUtils.degToRad(-90));
scene.add(groundPlane);

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper( 20 );
  axesHelper.visible = false;
  axesHelper.translateY(0.1);
scene.add( axesHelper );

var objColor = "rgb(255, 0, 0)";
var objOpacity = 0.5;

// Object Material
var objectMaterial = new THREE.MeshPhongMaterial({
  color: objColor,
  opacity: objOpacity,
  transparent: true});  


// INICIO

// este mateterial já foi definido para as rodas, falta apenas modificar as cores
var objectMaterial1 = new THREE.MeshLambertMaterial({
  color: "#898989",
  opacity: 1,
  transparent: true});

// DETALHE RODA, AINDA N IMPLEMENTADO 
// const geometry = new THREE.BoxGeometry( 0.8, 0.1, 0.3 ); 
// const material = new THREE.MeshBasicMaterial( {color: 0x000000} ); 
// const cube = new THREE.Mesh( geometry, material );
// cube.rotateX(THREE.MathUtils.degToRad(-90));
// cube.rotateY(THREE.MathUtils.degToRad(-90));
// cube.rotateZ(THREE.MathUtils.degToRad(-10));
// cube.position.set(4.75,2,8.5);
// scene.add(cube);

const geometriaTorus = new THREE.TorusGeometry(1, 0.6, 13, 30);
const geometria_preenchimento_roda_dianteira = new THREE.CylinderGeometry(1.1, 1.1, 0.9, 5);
const geometria_preenchimento_roda_dianteira1 = new THREE.CylinderGeometry(0.3, 0.3, 8, 32);
// const geometria_preenchimento_roda_dianteira2 = new THREE.CylinderGeometry(0.9, 0.9, 0.9, 5);
const heixo_dianteiro = new Object3D();
const heixo_traseiro = new Object3D();

function criarRodas(){
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

  const cilindro_interno = new THREE.Mesh(geometria_preenchimento_roda_dianteira, objectMaterial1);
  const cilindro_interno1 = new THREE.Mesh(geometria_preenchimento_roda_dianteira, objectMaterial1);
  const cilindro_interno2 = new THREE.Mesh(geometria_preenchimento_roda_dianteira, objectMaterial1);
  const cilindro_interno3 = new THREE.Mesh(geometria_preenchimento_roda_dianteira, objectMaterial1);
  
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
  const heixo_dianteiro_central = new THREE.Mesh(geometria_preenchimento_roda_dianteira1, objectMaterial1);
  const heixo_dianteiro_central1 = new THREE.Mesh(geometria_preenchimento_roda_dianteira1, objectMaterial1);

  heixo_dianteiro_central.rotateX(THREE.MathUtils.degToRad(-90));
  heixo_dianteiro_central1.rotateX(THREE.MathUtils.degToRad(-90));

  heixo_dianteiro_central.position.set(4.75, 1.5, 4)
  heixo_dianteiro_central1.position.set(-4.5, 1.5, 4)
  heixo_dianteiro.add(heixo_dianteiro_central);
  heixo_dianteiro.add(heixo_dianteiro_central1);

  // scene.add(heixo_dianteiro_central1);

  scene.add(heixo_traseiro);
  scene.add(heixo_dianteiro);

}

criarRodas();




//----------------------------------
// Create Convex Geometry
//----------------------------------
var numPoints = 30;

var sphereGeom = new THREE.SphereGeometry(0.2); // Sphere to represent points
var sphereMaterial = new THREE.MeshPhongMaterial({color:"rgb(255,255,0)"});

// Global variables to be removed from memory each interaction
var pointCloud = null;
//  var spGroup = null;
var points = null;
var objectSize = 10;
var convexGeometry = null;
var convexGeometry1 = null;
var object = null;
var pointCloudVisibility = true;
var objectVisibility = true;
var castShadow = true;

// Create convex object the first time
updateConvexObject();

render();
// gerar pontos de um objeto convexo 
function generatePoints(numberOfPoints)
{
  var points = [];
//   base inferior
  var X = 8;
  var Y = 2; 
  var Z = 8;
  points.push(new THREE.Vector3(X, Y, Z));
  X = -8;
  Y = 2;
  Z = 8;
  points.push(new THREE.Vector3(X, Y, Z));
  X = 8;
  Y = 2;
  Z = 0;
  points.push(new THREE.Vector3(X, Y, Z));
  X = -8;
  Y = 2;
  Z = 0;
  points.push(new THREE.Vector3(X, Y, Z));
  X = 9;
  Y = 2;
  Z = 7,5;
  points.push(new THREE.Vector3(X, Y, Z));

  X = 9;
  Y = 2;
  Z = 1,5;
  points.push(new THREE.Vector3(X, Y, Z));

//   base superior
  X = 8;
  Y = 4; 
  Z = 8;
  points.push(new THREE.Vector3(X, Y, Z));
  X = -8;
  Y = 4;
  Z = 8;
  points.push(new THREE.Vector3(X, Y, Z));
  X = 8;
  Y = 4;
  Z = 0;
  points.push(new THREE.Vector3(X, Y, Z));
  X = -8;
  Y = 4;
  Z = 0;
  points.push(new THREE.Vector3(X, Y, Z));
  X = 9;
  Y = 4;
  Z = 7,5;
  points.push(new THREE.Vector3(X, Y, Z));

  X = 9;
  Y = 4;
  Z = 1,5;
  points.push(new THREE.Vector3(X, Y, Z));

// 
  X = 1;
  Y = 6;
  Z = 1,5;
  points.push(new THREE.Vector3(X, Y, Z));
  X = 1;
  Y = 6;
  Z = 7,5;
  points.push(new THREE.Vector3(X, Y, Z));


  var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,0)"});

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
function generatePoints_topo_frente(numberOfPoints)
{
  var points = [];
  var X = 8;
  var Y = 7; 
  var Z = 8;
  points.push(new THREE.Vector3(X, Y, Z));
  X = 8;
  Y = 7;
  Z = 0;
  points.push(new THREE.Vector3(X, Y, Z));
  X = 9;
  Y = 7;
  Z = 7,5;
  points.push(new THREE.Vector3(X, Y, Z));
  X = 9;
  Y = 7;
  Z = 1,5;
  points.push(new THREE.Vector3(X, Y, Z));
  X = 1;
  Y = 9;
  Z = 1,5;
  points.push(new THREE.Vector3(X, Y, Z));
  X = 1;
  Y = 9;
  Z = 7,5;
  points.push(new THREE.Vector3(X, Y, Z));
  X = 1;
  Y = 7.4;
  Z = 0;
  points.push(new THREE.Vector3(X, Y, Z));
  X = 1;
  Y = 7.4;
  Z = 8;
  points.push(new THREE.Vector3(X, Y, Z));

  var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,0)"});

  pointCloud = new THREE.Object3D();
  points.forEach(function (point) {
    var spGeom = new THREE.SphereGeometry(0.2);
    var spMesh = new THREE.Mesh(spGeom, material);
    spMesh.position.set(point.x, point.y, point.z);
    pointCloud.add(spMesh);
  });

  scene.add(pointCloud);

  return points;
}
var convexGeometryfrente = null;
var frente_topo_carro = null;

function createConvex_topo_frente(){
  if(frente_topo_carro) scene.remove(frente_topo_carro);
  if(pointCloud) scene.remove(pointCloud);
  if(convexGeometryfrente) convexGeometryfrente.dispose();
  

  // First, create the point vector to be used by the convex hull algorithm
  var Pontos = generatePoints_topo_frente(numPoints);

  // Then, build the convex geometry with the generated points
  convexGeometryfrente = new ConvexGeometry(Pontos);


  frente_topo_carro = new THREE.Mesh(convexGeometryfrente, objectMaterial);
  scene.add(frente_topo_carro);
}
createConvex_topo_frente();
generatePoints_topo_frente();





// esse função é utilizada para juntar todos as partes do topo
function generatePoints_topo(numberOfPoints)
{
  var points = [];
  var X = 8;
  var Y = 7; 
  var Z = 8;
  points.push(new THREE.Vector3(X, Y, Z));
  X = -8;
  Y = 7.9;
  Z = 8;
  points.push(new THREE.Vector3(X, Y, Z));
  X = 8;
  Y = 7;
  Z = 0;
  points.push(new THREE.Vector3(X, Y, Z));
  X = -8;
  Y = 7.9;
  Z = 0;
  points.push(new THREE.Vector3(X, Y, Z));
  X = 9;
  Y = 7;
  Z = 7,5;
  points.push(new THREE.Vector3(X, Y, Z));

  X = 9;
  Y = 7;
  Z = 1,5;
  points.push(new THREE.Vector3(X, Y, Z));

  X = 1;
  Y = 9;
  Z = 1,5;
  points.push(new THREE.Vector3(X, Y, Z));
  X = 1;
  Y = 9;
  Z = 7,5;
  points.push(new THREE.Vector3(X, Y, Z));

  var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,0)"});

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






generatePoints_topo();


// gerar objeto convexo a partir dessa estrutura 
function updateConvexObject( )
{
  // As the object is updated when changing number of Points
  // it's useful to remove the previous object from memory (if it exists)
  if(object) scene.remove(object);
  if(pointCloud) scene.remove(pointCloud);
  if(convexGeometry) convexGeometry.dispose();
  if(convexGeometry1) convexGeometry1.dispose();
  

  // First, create the point vector to be used by the convex hull algorithm
  var localPoints = generatePoints(numPoints);
  var localPoints1 = generatePoints_topo(numPoints);

  // Then, build the convex geometry with the generated points
  convexGeometry = new ConvexGeometry(localPoints);

  convexGeometry1 = new ConvexGeometry(localPoints1);

  object = new THREE.Mesh(convexGeometry, objectMaterial);
  const object1 = new THREE.Mesh(convexGeometry1, objectMaterial);
  scene.add(object);
  // scene.add(object1); 

  // Uncomment to view debug information of the renderer
  //console.log(renderer.info);
}

function criar_carro(){





}

criar_carro();


function render()
{
  stats.update();
  trackballControls.update();
  if(followCamera)
      lightFollowingCamera(light, camera) // Makes light follow the camera
  else
      light.position.set(5,15,40);
  requestAnimationFrame(render);
  renderer.render(scene, camera)
}