import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroCanvas({ className }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x03040a, 0.28);

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 2.6, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambient);

    const dir = new THREE.DirectionalLight(0xffffff, 0.6);
    dir.position.set(5, 8, 2);
    dir.castShadow = true;
    scene.add(dir);

    // ground
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.MeshStandardMaterial({ color: 0x041018, metalness: 0.1, roughness: 0.6 }));
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    ground.receiveShadow = true;
    scene.add(ground);

    // buildings
    const group = new THREE.Group();
    for (let i = 0; i < 12; i++) {
      const x = (i % 4) * 1.6 - 2.4;
      const z = Math.floor(i / 4) * 1.6 - 1.6;
      const h = 0.6 + Math.random() * 1.6;
      const geom = new THREE.BoxGeometry(0.9, h, 0.9);
      const mat = new THREE.MeshStandardMaterial({ color: i % 2 ? 0x00d1ff : 0xb86bff, metalness: 0.6, roughness: 0.2 });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(x, h / 2, z);
      mesh.castShadow = true;
      group.add(mesh);
    }
    group.position.y = -0.6;
    scene.add(group);

    const light = new THREE.PointLight(0x66f0ff, 1.2, 8);
    light.position.set(3.2, 2.2, 0);
    light.castShadow = true;
    scene.add(light);

    let raf = null;
    const clock = new THREE.Clock();
    function animate() {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      group.rotation.y = Math.sin(t / 12) * 0.06;
      light.position.x = Math.cos(t / 2) * 3.2;
      light.position.z = Math.sin(t / 2) * 3.2;
      renderer.render(scene, camera);
    }

    animate();

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={className || 'hero-canvas-wrap'} />;
}
