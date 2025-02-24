document.addEventListener("DOMContentLoaded", function () {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_time: { value: 0.0 }
    };

    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: `
            void main() {
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            #ifdef GL_ES
            precision mediump float;
            #endif
            uniform vec2 u_resolution;
            uniform float u_time;
            void main() {
                vec2 p = gl_FragCoord.xy / u_resolution.xy;
                float color = 0.5 + 0.5 * sin(u_time + p.x * 10.0);
                gl_FragColor = vec4(color, color, color, 1.0);
            }
        `
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    camera.position.z = 1;

    function animate() {
        requestAnimationFrame(animate);
        uniforms.u_time.value += 0.05;
        renderer.render(scene, camera);
    }
    animate();
});