import * as BABYLON from '@babylonjs/core'

import './index.sass'

var coffeeMachineTag = 0
var coffeeMachineMesh = []
var coffeeMachine
var baseRoom

if (BABYLON.Engine.isSupported()) {
  //Initialize canvas element
  var canvas = document.getElementById('container') as HTMLCanvasElement
  //Initialize game engine
  var engine = new BABYLON.Engine(canvas, true)
  //Initialize the scene
  var scene = new BABYLON.Scene(engine)

  var createScene = function () {
    // create a basic BJS Scene object
    var scene = new BABYLON.Scene(engine)

    // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
    var camera = new BABYLON.FreeCamera(
      'camera1',
      new BABYLON.Vector3(0, 5, -10),
      scene
    )

    // target the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero())

    // attach the camera to the canvas
    camera.attachControl(canvas, false)

    // create a basic light, aiming 0,1,0 - meaning, to the sky
    var light = new BABYLON.HemisphericLight(
      'light1',
      new BABYLON.Vector3(0, 1, 0),
      scene
    )

    var room = BABYLON.SceneLoader.ImportMesh(
      '',
      'assets/',
      'room.babylon',
      scene,
      function (meshes) {
        baseRoom = meshes
        scene.createDefaultCameraOrLight(true, true, true)
        scene.createDefaultEnvironment()
      }
    )

    var coffeeMachine = BABYLON.SceneLoader.ImportMesh(
      '',
      'assets/coffeeMachine/',
      'nespresso-pixie-coffee-maker-threekit-dphil-clone.babylon',
      scene,
      function (meshes) {
        for (i = 0; i < meshes.length; i++) {
          meshes[i].isVisible = false
          meshes[i].scaling = new BABYLON.Vector3(0.01, 0.01, 0.01)
          meshes[i].position = new BABYLON.Vector3(0.2, 0, 0.3)
          // meshes[i].addRotation(Math.PI/2, 0, 0).addRotation(0, Math.PI/2, 0).addRotation(0, 0, Math.PI/2);
          coffeeMachineMesh.push(meshes[i])
        }
      }
    )

    var people = BABYLON.SceneLoader.ImportMesh(
      '',
      'assets/mei-posed-001-babylon/',
      'mei-posed-001.babylon',
      scene,
      function (meshes) {
        for (i = 0; i < meshes.length; i++) {
          meshes[i].isVisible = true
        }
      }
    )

    return scene
  }

  var scene = createScene()

  scene.onBeforeRenderObservable.add(function () {
    if (coffeeMachineTag == 1) {
      // if(coffeeMachine){
      //   for(var i in coffeeMachine){
      //     coffeeMachine[i].isVisible = true;
      //   }
      // }
      coffeeMachineMesh.forEach(mesh => {
        mesh.isVisible = true
        //mesh.position = new BABYLON.Vector3(1, 1, 1);
      })
    }
  })

  scene.registerAfterRender(function () {
    if (baseRoom && coffeeMachineMesh) {
      coffeeMachineMesh.forEach(mesh => {
        mesh.parent = baseRoom[13]
      })
    }
  })

  //var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene)
  // run the render loop
  var i = 0
  engine.runRenderLoop(function () {
    scene.render()

    // if (i < 5) {
    //   i++
    // }
    // if (i == 5) {
    //   scene.meshes.forEach(item => console.log(item.name,item.scaling))
    //   i++
    // }
  })

  // the canvas/window resize event handler
  window.addEventListener('resize', function () {
    engine.resize()
  })
}

// const app = document.getElementById('app')

// const button = document.createElement('button')

// button.style.position = 'absolute'
// button.style.top = '0'
// button.style.left = '0'

// button.innerHTML = '点我一下'

// button.addEventListener('click', e => {
//   setInterval(() => {
//     axios.get('http://localhost:8081/api/channelInfos').then(res => {
//       res.data.forEach(item => {
//         if (item.name == 'coffeeMachine') {
//           coffeeMachineTag = 1
//         } else if (item.name == 'people') {
//         }
//       })
//     })
//   }, 3000)
// })

// app.appendChild(button)
