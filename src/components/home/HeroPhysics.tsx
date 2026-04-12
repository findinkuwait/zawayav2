'use client';

import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

export default function HeroPhysics() {
    const sceneRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const renderRef = useRef<Matter.Render | null>(null);

    useEffect(() => {
        if (!sceneRef.current) return;

        // Module aliases
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            World = Matter.World,
            Bodies = Matter.Bodies,
            Events = Matter.Events;

        // Create engine
        const engine = Engine.create({
            gravity: { x: 0, y: 0, scale: 0 } // Zero gravity for floating effect
        });
        engineRef.current = engine;
        const world = engine.world;

        const width = window.innerWidth;
        const height = window.innerHeight;

        // Create renderer
        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width,
                height,
                background: 'transparent',
                wireframes: false,
                pixelRatio: window.devicePixelRatio
            }
        });
        renderRef.current = render;

        // Create floating elegant particles
        const particles: Matter.Body[] = [];
        const numParticles = width < 768 ? 15 : 25;

        // Map to store custom rendering data for shapes that matter-js can't draw natively
        const customShapes = new Map<number, { type: string, w: number, h: number, color: string, opacity: number }>();

        for (let i = 0; i < numParticles; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;

            // Randomize shape type: 0 = thin line, 1 = frame, 2 = arch
            const shapeType = Math.floor(Math.random() * 3);
            const color = Math.random() > 0.7 ? '#E2DFDA' : '#3A3A3A';
            const opacity = Math.random() * 0.08 + 0.04;

            const options = {
                frictionAir: 0.015, // Smooth, slow drift
                restitution: 0.8,
                angle: Math.random() * Math.PI * 2,
            };

            let particle;

            if (shapeType === 0) {
                // Thin line
                const length = Math.random() * 60 + 40;
                particle = Bodies.rectangle(x, y, length, 1.5, {
                    ...options,
                    render: { fillStyle: color, opacity }
                });
            } else if (shapeType === 1) {
                // Geometric frame (hollow polygon or rectangle)
                const size = Math.random() * 30 + 20;
                const sides = Math.random() > 0.5 ? 4 : 6; // Square or Hexagon
                particle = Bodies.polygon(x, y, sides, size, {
                    ...options,
                    render: {
                        fillStyle: 'transparent',
                        strokeStyle: color,
                        lineWidth: 1.5,
                        opacity
                    }
                });
            } else {
                // Arch
                const w = Math.random() * 20 + 20;
                const h = w * 1.5;
                particle = Bodies.rectangle(x, y, w, h, {
                    ...options,
                    render: { visible: false } // We will draw this manually
                });
                customShapes.set(particle.id, { type: 'arch', w, h, color, opacity });
            }

            // Give them a tiny initial velocity and spin to start drift
            Matter.Body.setVelocity(particle, {
                x: (Math.random() - 0.5) * 1.5,
                y: (Math.random() - 0.5) * 1.5
            });
            Matter.Body.setAngularVelocity(particle, (Math.random() - 0.5) * 0.02);

            particles.push(particle);
        }

        World.add(world, particles);

        // Custom Arch Rendering
        Events.on(render, 'afterRender', () => {
            const ctx = render.context;
            particles.forEach(body => {
                const shapeData = customShapes.get(body.id);
                if (shapeData && shapeData.type === 'arch') {
                    ctx.save();
                    ctx.translate(body.position.x, body.position.y);
                    ctx.rotate(body.angle);
                    ctx.globalAlpha = shapeData.opacity;
                    ctx.strokeStyle = shapeData.color;
                    ctx.lineWidth = 1.5;

                    const w = shapeData.w;
                    const h = shapeData.h;

                    ctx.beginPath();
                    // Draw arch: straight lines on sides, semi-circle on top
                    ctx.moveTo(-w / 2, h / 2);
                    ctx.lineTo(-w / 2, -h / 4);
                    // arc(x, y, radius, startAngle, endAngle)
                    ctx.arc(0, -h / 4, w / 2, Math.PI, 0);
                    ctx.lineTo(w / 2, h / 2);
                    ctx.stroke();

                    ctx.restore();
                }
            });
        });

        // Add mouse repulsion interaction
        let lastMousePos = { x: width / 2, y: height / 2 };

        const handleMouseMove = (e: MouseEvent) => {
            const mousePos = { x: e.clientX, y: e.clientY };

            // Calculate mouse velocity for force
            const velocity = {
                x: mousePos.x - lastMousePos.x,
                y: mousePos.y - lastMousePos.y
            };

            lastMousePos = mousePos;

            // Apply slight repulsion force to particles near mouse
            particles.forEach(body => {
                const dx = body.position.x - mousePos.x;
                const dy = body.position.y - mousePos.y;
                const distanceSq = dx * dx + dy * dy;

                // If particle is close to mouse (radius ~200px)
                if (distanceSq < 40000) {
                    const forceMagnitude = 0.00003; // Gentle force
                    const force = {
                        x: (dx / Math.sqrt(distanceSq)) * forceMagnitude + (velocity.x * 0.000005),
                        y: (dy / Math.sqrt(distanceSq)) * forceMagnitude + (velocity.y * 0.000005)
                    };
                    Matter.Body.applyForce(body, body.position, force);
                }
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Run the engine and renderer
        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        // Handle Window Resize
        const handleResize = () => {
            render.canvas.width = window.innerWidth;
            render.canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        // Wrap bounds logic inside beforeUpdate event
        Events.on(engine, 'beforeUpdate', () => {
            particles.forEach(body => {
                const w = window.innerWidth;
                const h = window.innerHeight;
                if (body.position.x > w + 100) Matter.Body.setPosition(body, { x: -100, y: body.position.y });
                if (body.position.x < -100) Matter.Body.setPosition(body, { x: w + 100, y: body.position.y });
                if (body.position.y > h + 100) Matter.Body.setPosition(body, { x: body.position.x, y: -100 });
                if (body.position.y < -100) Matter.Body.setPosition(body, { x: body.position.x, y: h + 100 });
            });
        });

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            Render.stop(render);
            Runner.stop(runner);
            if (engineRef.current) World.clear(engineRef.current.world, false);
            if (engineRef.current) Engine.clear(engineRef.current);
            if (render.canvas) render.canvas.remove();
        };
    }, []);

    return (
        <div
            ref={sceneRef}
            className="absolute inset-0 z-0 pointer-events-none opacity-40"
            aria-hidden="true"
        />
    );
}
