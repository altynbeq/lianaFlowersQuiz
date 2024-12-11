import React, { useRef, useEffect } from 'react';
import './BlossomScene.css';

const BlossomScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    class Petal {
      el: HTMLElement;
      customClass: string;
      x: number;
      y: number;
      z: number;
      xSpeedVariation: number;
      ySpeed: number;
      rotation: { axis: string; value: number; speed: number; x: number };

      constructor(config: { customClass?: string }) {
        this.customClass = config.customClass || '';
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.xSpeedVariation = 0;
        this.ySpeed = 0;
        this.rotation = { axis: 'X', value: 0, speed: 0, x: 0 };
        this.el = document.createElement('div');
        this.el.className = `petal ${this.customClass}`;
        this.el.style.position = 'absolute';
        this.el.style.backfaceVisibility = 'visible';
      }
    }

    class BlossomScene {
      container: HTMLElement;
      numPetals: number;
      petalsTypes: Petal[];
      gravity: number;
      windMaxSpeed: number;
      windMagnitude: number;
      windDuration: number;
      width: number;
      height: number;
      timer: number;
      placeholder: HTMLElement;
      petals: Petal[];

      constructor(config: { id: string; petalsTypes: Petal[]; numPetals?: number; gravity?: number; windMaxSpeed?: number }) {
        const container = document.getElementById(config.id);
        if (!container) throw new Error(`[id] provided was not found in document`);
        this.container = container;
        this.placeholder = document.createElement('div');
        this.petals = [];
        this.numPetals = config.numPetals || 75; // Reduced number of petals by 25%
        this.petalsTypes = config.petalsTypes;
        this.gravity = config.gravity || 0.5;
        this.windMaxSpeed = config.windMaxSpeed || 2;
        this.windMagnitude = 0.2;
        this.windDuration = 0;
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.timer = 0;

        this.container.style.overflow = 'hidden';
        this.placeholder.style.transformStyle = 'preserve-3d';
        this.placeholder.style.width = `${this.width}px`;
        this.placeholder.style.height = `${this.height}px`;
        this.container.appendChild(this.placeholder);
        this.createPetals();
        requestAnimationFrame(this.updateFrame.bind(this));
      }

      resetPetal(petal: Petal) {
        petal.x = Math.random() * this.width;
        petal.y = -Math.random() * this.height;
        petal.z = Math.random() * 200;
        petal.rotation.speed = Math.random() * 5;
        petal.rotation.axis = ['X', 'Y', 'Z'][Math.floor(Math.random() * 3)];
        petal.rotation.x = Math.random() * 360 - 180;
        petal.xSpeedVariation = Math.random() * 0.5 - 0.25;
        petal.ySpeed = 0.5 + Math.random() * this.gravity;
        return petal;
      }

      calculateWindSpeed(t: number, y: number) {
        const a = (this.windMagnitude / 2) * ((this.height - y) / this.height);
        return a * Math.sin((2 * Math.PI * t) / this.windDuration) - a / 2;
      }

      updatePetal(petal: Petal) {
        const petalWindSpeed = this.calculateWindSpeed(this.timer, petal.y);
        petal.x -= petalWindSpeed + petal.xSpeedVariation;
        petal.y += petal.ySpeed;
        petal.rotation.value += petal.rotation.speed;
        const transform = `translateX(${petal.x}px) translateY(${petal.y}px) translateZ(${petal.z}px) rotate${petal.rotation.axis}(${petal.rotation.value}deg)`;
        petal.el.style.transform = transform;
        if (petal.x < -10 || petal.y > this.height + 10) this.resetPetal(petal);
      }

      updateWind() {
        this.windMagnitude = Math.random() * this.windMaxSpeed;
        this.windDuration = this.windMagnitude * 100 + 100;
      }

      createPetals() {
        for (let i = 0; i < this.numPetals; i++) {
          const type = this.petalsTypes[Math.floor(Math.random() * this.petalsTypes.length)];
          const petal = new Petal({ customClass: type.customClass });
          this.resetPetal(petal);
          this.petals.push(petal);
          this.placeholder.appendChild(petal.el);
        }
      }

      updateFrame() {
        if (this.timer === this.windDuration) {
          this.updateWind();
          this.timer = 0;
        }
        this.petals.forEach((petal) => this.updatePetal(petal));
        this.timer++;
        requestAnimationFrame(this.updateFrame.bind(this));
      }
    }

    const petalsTypes = [
      new Petal({ customClass: 'petal-style1' }),
      new Petal({ customClass: 'petal-style2' }),
      new Petal({ customClass: 'petal-style3' }),
      new Petal({ customClass: 'petal-style4' }),
    ];

    if (containerRef.current) {
      new BlossomScene({
        id: containerRef.current.id,
        petalsTypes,
      });
    }
  }, []);

  return <div id="blossom_container" ref={containerRef}></div>;
};

export default BlossomScene;
