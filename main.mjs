import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xff1493, 1 );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const poi = new THREE.ShaderMaterial( {

	uniforms: {

		time: { value: 1.0 },
		resolution: { value: new THREE.Vector2() }

	},

	vertexShader: document.getElementById( 'vertexShader' ).textContent,

	fragmentShader: document.getElementById( 'fragmentShader' ).textContent

} );

const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
hemiLight.position.set( 0, 200, 0 );
scene.add( hemiLight );

const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const controls = new OrbitControls( camera, renderer.domElement );

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 20, 100 );
controls.update();

camera.position.z = 5;

var avi = null;
var sk = null;
const loader = new FBXLoader();
loader.load( 'data/meshtest.fbx', function ( ob ) {
    sk = new THREE.SkeletonHelper( ob );
    sk.visible = true;
    scene.add( sk ); 
    scene.add( ob );
    avi = ob;
    gui_pannle();
    }
)

function animate() {
	requestAnimationFrame( animate );

	//cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
    controls.update();
	renderer.render( scene, camera );
}
var f_avi = null
function gui_pannle(){
    var op = {
        "id": x => {},
        "name": x => {}
    }

    const panel = new GUI( { width: 310 } );
    const f_debug = panel.addFolder( 'debug' );
    const f_info = f_debug.addFolder( 'info' );
    f_avi = panel.addFolder( 'avi' );
    //--------------------------------------
    f_info.add(op, "name").name("name: " + jsondata2["name"]);
    f_info.add(op, "id").name("id: " + jsondata2["id"]);
    f_debug.add(sk, "visible");
    //folder2.add(avi.children[2], "visible");
    //-----------------------------------
    //
    console.log(avi_data)
    console.log("rawr")
    for (i in avi_data){
        f_avi.add(avi_data, i)
    }
    f_debug.open()
    f_info.open();
    f_avi.open();
}

var socket = io();
var avi_info = [];
var avi_data = {};
socket.on('change', function(data) {
    avi_info = data;
    // to do remove all content first
    for (var i in avi_info){
        avi_data[avi_info[i][2]] = [true, avi_info[i][3]]
    }
    for (var i in avi_data){
        f_avi.add(avi_data[i], 0).name(i).onChange(((p, v) => {
            socket.emit("osc_call", p, v)
        }).bind(this, avi_data[i][1]))
    }

});
socket.on('update_osc', function(path, val) {

});

renderer.domElement.addEventListener("click", onclick, true);
var selectedObject;
var raycaster = new THREE.Raycaster();
function onclick(event) {
var mouse = new THREE.Vector2();
mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
console.log(mouse)
raycaster.setFromCamera(mouse, camera);
var intersects = raycaster.intersectObjects(avi.children, true); //array
console.log(intersects)
if (intersects.length > 0) {
selectedObject = intersects[0];
console.log(selectedObject);
} }


animate();