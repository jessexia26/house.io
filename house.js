        // 初始化场景、摄像机和渲染器
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // 创建一个光源
        var light = new THREE.PointLight(0xFFFFFF);
        light.position.set(10, 50, 50);
        scene.add(light);

        // 创建 Collada 加载器
        var loader = new THREE.ColladaLoader();
        loader.load('./model/house.dae', function (collada) {
            var dae = collada.scene;
            dae.scale.set(1, 1, 1); // 根据需要调整比例

            // 加载纹理
            var textureLoader = new THREE.TextureLoader();
            dae.traverse(function (child) {
                if (child.isMesh) {
                    console.log(material.map.name)
                    var material = child.material;
                    if (material.map) {
                        var texturePath = './texture/' + material.map.name;
                        material.map = textureLoader.load(texturePath);
                        material.needsUpdate = true;
                    }
                }
            });

            scene.add(dae);

            // 渲染循环
            var animate = function () {
                requestAnimationFrame(animate);
                dae.rotation.y += 0.01; // 添加旋转动画
                renderer.render(scene, camera);
            };
            animate();
        });

        camera.position.z = 5;