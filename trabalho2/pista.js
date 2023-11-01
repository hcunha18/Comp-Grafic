import * as THREE from "../build/three.module.js";
export {
  createPista,
  checkpoint,
  checkpoint2,
  checkpoint3,
  reducVeloc,
  voltas,
  reduction,
  posicaoPista1,
  posicaoPista2,
  posicaoPista3,
  posicaoPista4,
  setasPista3,
  setasPista4
};


function Graus_radianos(anguloGraus) {
  var radianos = anguloGraus * (Math.PI / 180);
  return radianos;
}

function setasPista3(pista) {
  const geometry = new THREE.CylinderGeometry(3, 3, 0.2, 3);
  const material = new THREE.MeshBasicMaterial({ color: "BLACK" });
  const triangulo = new THREE.Mesh(geometry, material);
  pista.add(triangulo);
  triangulo.position.set(100, 0, -60);
  triangulo.rotateY(Graus_radianos(90));
  const triangulo2 = new THREE.Mesh(geometry, material);
  pista.add(triangulo2);
  triangulo2.position.set(140, 0, -60);
  triangulo2.rotateY(Graus_radianos(90));
  const triangulo3 = new THREE.Mesh(geometry, material);
  pista.add(triangulo3);
  triangulo3.position.set(180, 0, -100);
  triangulo3.rotateY(Graus_radianos(180));
  const triangulo4 = new THREE.Mesh(geometry, material);
  pista.add(triangulo4);
  triangulo4.position.set(180, 0, -140);
  triangulo4.rotateY(Graus_radianos(180));
}

function setasPista4(pista) {
  const geometry = new THREE.CylinderGeometry(3, 3, 0.2, 3);
  const material = new THREE.MeshBasicMaterial({ color: "BLACK" });
  const triangulo = new THREE.Mesh(geometry, material);
  pista.add(triangulo);
  triangulo.position.set(80, 0, -60);
  triangulo.rotateY(Graus_radianos(90));
  const triangulo2 = new THREE.Mesh(geometry, material);
  pista.add(triangulo2);
  triangulo2.position.set(60, 0, -40);
  const triangulo3 = new THREE.Mesh(geometry, material);
  pista.add(triangulo3);
  triangulo3.position.set(240, 0, 10);
  const triangulo4 = new THREE.Mesh(geometry, material);
  pista.add(triangulo4);
  triangulo4.position.set(240, 0, 50);
}

function reducVeloc(vet,position) {
  let i=0;
 
  for(i=0; i<vet.length;i++){
    if(
      (position.z <= (vet[i][2] + 15) &&
      position.z >= (vet[i][2] - 15) &&
      position.x <= (vet[i][0] + 15) &&
      position.x >= (vet[i][0] -15)) ||(
      position.z <= 15 &&
      position.z >= -15 &&
      position.x <= 15 &&
      position.x >= -15)
    ){
      reduction = false;
      break
    }
    else{
      reduction = true;
    }
  }
  };

let voltas = 0;
var reduction = false;
let posicaoPista1 = [
  [0, 0, -30],
  [0, 0, -60],
  [0, 0, 30],
  [0, 0, 60],
  [30, 0, -60],
  [60, 0, -60],
  [90, 0, -60],
  [120, 0, -60],
  [120, 0, 0],
  [120, 0, -30],
  [120, 0, -60],
  [120, 0, 30],
  [120, 0, 60],
  [30, 0, 60],
  [60, 0, 60],
  [90, 0, 60],
  [120, 0, 60],
];
let posicaoPista2 = [
  [0, 0, -30],
  [0, 0, -60],
  [0, 0, 30],
  [0, 0, 60],
  [30, 0, -60],
  [60, 0, -60],
  [90, 0, -60],
  [120, 0, -60],
  [120, 0, 0],
  [120, 0, -30],
  [120, 0, -60],
  [90, 0, 0],
  [30, 0, 60],
  [60, 0, 60],
  [60, 0, 30],
  [60, 0, 0],
];
let posicaoPista3 = [
  [0, 0, -30],
  [0, 0, -60],
  [0, 0, 30],
  [0, 0, 60],
  [30, 0, -60],
  [60, 0, -60],
  [90, 0, -60],
  [120, 0, -60],
  [120, 0, 0],
  [120, 0, -30],
  [120, 0, -60],
  [120, 0, 30],
  [120, 0, 60],
  [30, 0, 60],
  [60, 0, 60],
  [90, 0, 60],
  [120, 0, 60],
  [120, 0, -60],
  [150, 0, -60],
  [180, 0, -60],
  [210, 0, -120],
  [240, 0, -120],
  [180, 0, -90],
  [180, 0, -120],
  [240, 0, -150],
  [240, 0, -180],
  [120, 0, -90],
  [120, 0, -120],
  [150, 0, -120],
  [180, 0, -150],
  [180, 0, -180],
  [210, 0, -180],
];
let posicaoPista4 = [
  [0, 0, -30],
  [0, 0, -60],
  [0, 0, 30],
  [0, 0, 60],
  [0, 0, 90],
  [30, 0, 90],
  [60, 0, 90],
  [90, 0, 90],
  [90, 0, 120],
  [90, 0, 150],
  [120, 0, 150],
  [150, 0, 150],
  [180, 0, 150],
  [210, 0, 150],
  [30, 0, -60],
  [60, 0, -60],
  [90, 0, -60],
  [120, 0, -60],
  [150, 0, -60],
  [180, 0, -60],
  [210, 0, -60],
  [240, 0, -60],
  [240, 0, -30],
  [240, 0, 0],
  [240, 0, 30],
  [240, 0, 60],
  [240, 0, 90],
  [240, 0, 120],
  [240, 0, 150],
  [60, 0, 0],
  [60, 0, -30],
  [60, 0, 30],
  [90, 0, 30],
  [120, 0, 30],
  [150, 0, 30],
  [180, 0, 30],
  [210, 0, 30],
];

function createPista(vet, pista) {
  let posicaoLargada1 = [
    [-10, 0, 10],
    [-10, 0, -10],
    [10, 0, 10],
    [10, 0, -10],
    [0, 0, 0],
  ];
  let posicaoLargada2 = [
    [0, 0, -10],
    [0, 0, 10],
    [-10, 0, 0],
    [10, 0, 0],
  ];
  let geometry1 = new THREE.BoxGeometry(10, 0, 10);
  let material1 = new THREE.MeshBasicMaterial({ color: "black" });
  let material2 = new THREE.MeshBasicMaterial({ color: "white" });
  let largada1 = [];
  let largada2 = [];

  let j = 0;
  while (j < posicaoLargada1.length) {
    largada1[j] = new THREE.Mesh(geometry1, material1);
    largada1[j].position.set(
      posicaoLargada1[j][0],
      posicaoLargada1[j][1],
      posicaoLargada1[j][2],
    );
    pista.add(largada1[j]);
    j++;
  }
  let k = 0;
  while (k < posicaoLargada2.length) {
    largada2[k] = new THREE.Mesh(geometry1, material2);
    largada2[k].position.set(
      posicaoLargada2[k][0],
      posicaoLargada2[k][1],
      posicaoLargada2[k][2],
    );
    pista.add(largada2[k]);
    k++;
  }

  let i = 0;
  let cube = [];
  let geometry = new THREE.BoxGeometry(30, 0, 30);
  let material = new THREE.MeshBasicMaterial({ color: 0Xffffff });

  while (i < vet.length) {
    cube[i] = new THREE.Mesh(geometry, material);
    cube[i].position.set(vet[i][0], vet[i][1], vet[i][2]);
    cube[i].receiveShadow = true;
    pista.add(cube[i]);
    i++;
  }
}


// Adição do código da pista

let primeiroCheckPoint = false;
let segundoCheckPoint = false;
let terceiroCheckPoint = false;

function checkpoint(position) {
  if (
    position.x > -15 &&
    position.x < 15 &&
    position.z < -45 &&
    position.z > -75
  ) {
    primeiroCheckPoint = true;
  }
  if (
    position.x > 105 &&
    position.x < 135 &&
    position.z < -45 &&
    position.z > -75 &&
    primeiroCheckPoint == true
  ) {
    segundoCheckPoint = true;
  }
  if (
    position.x > -15 &&
    position.x < 15 &&
    position.z < 75 &&
    position.z > 45 &&
    segundoCheckPoint == true
  ) {
    terceiroCheckPoint = true;
  }
  if (
    position.x > -15 &&
    position.x < 15 &&
    position.z < -15 &&
    terceiroCheckPoint == true
  ) {
    primeiroCheckPoint = false;
    segundoCheckPoint = false;
    terceiroCheckPoint = false;
    voltas += 1;
  }
}

function checkpoint2(position) {
  if (
    position.x > 165 &&
    position.x < 195 &&
    position.z < -45 &&
    position.z > -75
  ) {
    primeiroCheckPoint = true;
  }
  if (
    position.x > 165 &&
    position.x < 195 &&
    position.z > -195 &&
    position.z < -165 &&
    primeiroCheckPoint == true
  ) {
    segundoCheckPoint = true;
  }
  if (
    position.x > 105 &&
    position.x < 135 &&
    position.z < 75 &&
    position.z > 45 &&
    segundoCheckPoint == true
  ) {
    terceiroCheckPoint = true;
  }
  if (
    position.x > -15 &&
    position.x < 15 &&
    position.z < -15 &&
    terceiroCheckPoint == true
  ) {
    primeiroCheckPoint = false;
    segundoCheckPoint = false;
    terceiroCheckPoint = false;
    voltas += 1;
  }
}

function checkpoint3(position) {
  if (
    position.x > 225 &&
    position.x < 255 &&
    position.z < 165 &&
    position.z > 135
  ) {
    primeiroCheckPoint = true;
  }
  if (
    position.x > 75 &&
    position.x < 105 &&
    position.z > 135 &&
    position.z < 165 &&
    primeiroCheckPoint == true
  ) {
    segundoCheckPoint = true;
  }
  if (
    position.x > -15 &&
    position.x < 15 &&
    position.z < 105 &&
    position.z > 75 &&
    segundoCheckPoint == true
  ) {
    terceiroCheckPoint = true;
  }
  if (
    position.x > -15 &&
    position.x < 15 &&
    position.z < -15 &&
    terceiroCheckPoint == true
  ) {
    primeiroCheckPoint = false;
    segundoCheckPoint = false;
    terceiroCheckPoint = false;
    voltas += 1;
  }
}

function volta(position) {
  checkpoint(position);
}
