// src/components/HeartParticles.tsx
import React, { useEffect, useRef, useState } from 'react';
import '@/style/components/Spinner.scss';

interface Particle {
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    initialX: number;
    initialY: number;
}

const Spinner: React.FC = () => {
    const [particles, setParticles] = useState<Particle[]>([]);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const heartPointsRef = useRef<{ x: number; y: number }[]>([]); // Use a ref to store heart points

    // Parametric heart equation function for more precise heart shape
    const generateHeartPoints = (amount: number, width: number, height: number) => {
        const points: { x: number, y: number }[] = [];

        for (let i = 0; i < amount; i++) {
            const t = (i / amount) * Math.PI * 2; // Iterate in parametric space
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);

            points.push({
                x: (x * 30) + width / 2,   // Adjust the scaling and positioning
                y: (-y * 30) + height / 3, // Negative to flip vertically
            });
        }
        return points;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = canvas.width = window.innerWidth * 2;
        const height = canvas.height = window.innerHeight * 2;

        // Increase the number of heart-shaped points using the parametric equation
        const heartPoints = generateHeartPoints(8000, width, height);
        heartPointsRef.current = heartPoints;
        const totalParticles = 12000;

        const generatedParticles = Array.from({ length: totalParticles }, () => {
            const randomX = Math.random() * width;
            const randomY = Math.random() * height;

            return {
                x: randomX,
                y: randomY,
                targetX: 0,
                targetY: 0,
                initialX: randomX,
                initialY: randomY,
            };
        });

        generatedParticles.forEach((particle, index) => {
            const target = heartPoints[index % heartPoints.length];
            particle.targetX = target.x;
            particle.targetY = target.y;
        });

        setParticles(generatedParticles);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let progress = 0;
        const duration = 1500; // Duration of animation (1.5 seconds)

        const animateParticles = (timestamp: number) => {
            const elapsed = timestamp - progress;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                // Animation to heart shape
                const dx = (particle.targetX - particle.x) * 0.03; // Slower movement
                const dy = (particle.targetY - particle.y) * 0.05;
                particle.x += dx;
                particle.y += dy;

                // Drawing particles
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = '#FF69B4'; // Pink particle color
                ctx.fill();
            });

            if (elapsed < duration) {
                requestAnimationFrame(animateParticles);
            } else {
                particles.forEach((particle, index) => {
                    const target = heartPointsRef.current[index % heartPointsRef.current.length];
                    particle.x = particle.initialX;
                    particle.y = particle.initialY;
                    particle.targetX = target.x;
                    particle.targetY = target.y;
                });

                progress = timestamp;
                requestAnimationFrame(animateParticles);
            }
        };

        requestAnimationFrame(animateParticles);
    }, [particles]);

    return (
        <>
            <div className="spinner">
                <canvas ref={canvasRef} className="heart-particles-canvas"></canvas>
            </div>
        </>
    )
};

export default Spinner;
