AFRAME.registerComponent("roll-ball",{

    init : function(){
        this.rollBall();
    },
    rollBall : function(){
        window.addEventListener("keydown",(e)=>{

            if(e.key === "z"){

    
            var ball = document.createElement("a-entity");
            ball.setAttribute("gltf-model", "./assets/bowling_ball/scene.gltf");

            ball.setAttribute("scale",{ x : 0.014, y : 0.014, z : 0.014});

            var cam = document.querySelector("#camera");
          
            var pos = cam.getAttribute("position")

       

          ball.setAttribute("position", { x: 0, y: 1.35,z: 0 });
      

          var camera = document.querySelector("#camera").object3D;



          var direction = new THREE.Vector3();
          camera.getWorldDirection(direction);

          ball.setAttribute("velocity", direction.multiplyScalar(-2));
          
          var scene = document.querySelector("#scene");

          ball.setAttribute("dynamic-body", {
            shape: "sphere",
            mass: "5",
          });
         
          window.addEventListener("collide", this.collide);

          scene.appendChild(ball)
    }
        });
    },

    collide : function(e){
        var element = e.detail.target.el;
        var elementHit = e.detail.body.el;

        if (elementHit.id.includes("pin")){

            var impulse = new CANNON.Vec3(0,1,-15);
            var worldPoint = new CANNON.Vec3().copy(
              elementHit.getAttribute("position")
            );
      
            elementHit.body.applyForce(impulse, worldPoint);

              window.removeEventListener("collide",this.collide);

              var scene = document.querySelector("#scene");
              scene.removeChild(element);
        }


    }
   
})


