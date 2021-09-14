/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/packs/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/frontend/packs/about.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/frontend/packs/about.js":
/*!*************************************!*\
  !*** ./app/frontend/packs/about.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

//===================================================== Create a WebGL renderer
var renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas"),
  powerPreference: "high-performance"
});
renderer.setSize(window.innerWidth, window.innerHeight); //===================================================== Create an empty scene

var scene = new THREE.Scene(); //===================================================== Create a perpsective camera

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.001, 1000);
camera.position.z = 400; //===================================================== resize

window.addEventListener("resize", function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}); //===================================================== Array of points

var points = [[68.5, 185.5], [1, 262.5], [270.9, 281.9], [345.5, 212.8], [178, 155.7], [240.3, 72.3], [153.4, 0.6], [52.6, 53.3], [68.5, 185.5]]; //===================================================== Convert the array of points into vertices

for (var i = 0; i < points.length; i++) {
  var x = points[i][0];
  var y = 0;
  var z = points[i][1];
  points[i] = new THREE.Vector3(x, y, z);
} //===================================================== Create a path from the points


var path = new THREE.CatmullRomCurve3(points); //===================================================== Create the tube geometry from the path

var sides = 3;
var geometry = new THREE.TubeGeometry(path, 300, 4, sides, true); //===================================================== Basic material

var material = new THREE.MeshBasicMaterial({
  side: THREE.BackSide,
  map: new THREE.TextureLoader().load('https://raw.githubusercontent.com/baronwatts/images/master/map5.png')
});
material.map.wrapS = THREE.RepeatWrapping;
material.map.wrapT = THREE.RepeatWrapping;
material.map.repeat.set(10, 1); //===================================================== Create a mesh

var tube = new THREE.Mesh(geometry, material);
tube.matrixAutoUpdate = false; //wont be moving so no need to update

scene.add(tube); //===================================================== Create a point light in our scene

var light = new THREE.PointLight(new THREE.Color("white"), 1, 100);
scene.add(light); //===================================================== Animate

var percentage = 0;

function animate() {
  percentage += 0.0005;
  var p1 = path.getPointAt(percentage % 1);
  var p2 = path.getPointAt((percentage + 0.03) % 1);
  camera.position.set(p1.x, p1.y, p1.z);
  camera.lookAt(p2);
  light.position.set(p2.x, p2.y, p2.z); //Render the scene

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

/***/ })

/******/ });
//# sourceMappingURL=about-83eda7a21127d2bddf42.js.map