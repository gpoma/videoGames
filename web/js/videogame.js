if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container;

var camera, scene, renderer;

var video, texture, material, mesh;

var composer;

var mouseX = 0;
var mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var   material;

init();
animate();

function init() {

  container = document.createElement( 'div' );
  document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 500;

  scene = new THREE.Scene();
  var loader = new THREE.TextureLoader();
  var light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 0.5, 2, 1 ).normalize();
  scene.add( light );

  renderer = new THREE.WebGLRenderer( { antialias: false } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  video = document.getElementById( 'video_00' );
  video.setAttribute('autoplay',true);

  texture = new THREE.VideoTexture( video );
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.format = THREE.RGBFormat;
  texture.needsUpdate = true;

  var geometry, xsize, ysize;

  xsize = 350 ;
  ysize = 280 ;
  zsize = 50 ;

  var parameters = { color: 0xffffff, map: texture };

  material = new THREE.MeshLambertMaterial( parameters );

  geometry = new THREE.BoxGeometry( xsize, ysize, zsize );

  change_uvs( geometry, 1, 1, 0.1, 0 );

    mesh = new THREE.Mesh( geometry, material );

    mesh.position.x = 0;
    mesh.position.y = 0;
    mesh.position.z = 0;

    mesh.scale.x = mesh.scale.y = mesh.scale.z = 1;

    scene.add( mesh );

  renderer.autoClear = false;

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );

  // postprocessing

  var renderModel = new THREE.RenderPass( scene, camera );
  var effectBloom = new THREE.BloomPass( 1.3 );
  var effectCopy = new THREE.ShaderPass( THREE.CopyShader );

  effectCopy.renderToScreen = true;

  composer = new THREE.EffectComposer( renderer );

  composer.addPass( renderModel );
  composer.addPass( effectBloom );
  composer.addPass( effectCopy );

  //

  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
  composer.reset();

}

function change_uvs( geometry, unitx, unity, offsetx, offsety ) {

  var faceVertexUvs = geometry.faceVertexUvs[ 0 ];
  console.log(faceVertexUvs.length);
  for ( var i = 0; i < faceVertexUvs.length; i ++ ) {

    var uvs = faceVertexUvs[ i ];

    for ( var j = 0; j < uvs.length; j ++ ) {

      var uv = uvs[ j ];

     uv.x = ( uv.x + offsetx ) * unitx;
     uv.y = ( uv.y + offsety ) * unity;

    }

  }

}


function onDocumentMouseMove(event) {

  mouseX = ( event.clientX - windowHalfX );
  mouseY = ( event.clientY - windowHalfY ) * 0.3;

}

//

function animate() {

  requestAnimationFrame( animate );

  render();

}

var h, counter = 1;

function render() {

  var time = Date.now() * 0.0005;

  camera.position.x += ( mouseX - camera.position.x ) * 0.04;
  camera.position.y += ( - mouseY - camera.position.y ) * 0.04;

  camera.lookAt( scene.position );
  renderer.clear();
  composer.render();

}

function changeVideo(i){
  video_01 = document.getElementById( 'video_'+i );
  video_01.pause();
  video_01.currentTime = 0;
  video_01.setAttribute('autoplay',true);
  video_01.play();

  texture = new THREE.VideoTexture( video_01 );
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.format = THREE.RGBFormat;
  var parameters = { color: 0xffffff, map: texture };
  material = new THREE.MeshLambertMaterial( parameters );

  mesh.material.map = texture;
  mesh.material.needsUpdate = true;

}

$(document).keypress(function(e) {
  var code = e.keyCode || e.which;
  console.log(code);
  switch (code) {
      case 97:
      video.pause();
      video.currentTime = 0;
      video.removeAttribute('autoplay');
      changeVideo("01");

      break;
      case 122:
        changeVideo("02");
      break;
      case 101:
        changeVideo("03");
      break;
      case 114:
        changeVideo("04");
      break;
      case 116:
        changeVideo("05");
      break;
      case 121:
        changeVideo("06");
      break;
      case 117:
        changeVideo("07");
      break;
      case 105:
        changeVideo("08");
      break;
      case 111:
        changeVideo("09");
      break;
      case 112:
        changeVideo("10");
      break;
      case 113:
        changeVideo("11");
      break;
      case 115:
        changeVideo("12");
      break;
      case 100:
        changeVideo("13");
      break;
      case 102:
        changeVideo("14");
      break;
      case 103:
        changeVideo("15");
      break;

      case 104:
        changeVideo("16");
      break;

      case 106:
        changeVideo("17");
      break;

      case 107:
        changeVideo("18");
      break;

      videos = [103,104,106];
      for(i in videos){
        changeVideo(videos[code])
      }
  }
});
