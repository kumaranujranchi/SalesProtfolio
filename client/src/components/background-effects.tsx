import { useEffect, useState } from "react";

interface Cloud {
  id: number;
  size: number;
  top: number;
  delay: number;
}

interface RainDrop {
  id: number;
  left: number;
  delay: number;
  duration: number;
}

export function BackgroundClouds() {
  const [clouds, setClouds] = useState<Cloud[]>([]);

  useEffect(() => {
    const cloudArray: Cloud[] = [];
    for (let i = 0; i < 6; i++) {
      cloudArray.push({
        id: i,
        size: Math.random() * 60 + 40, // 40-100px
        top: Math.random() * 80 + 10, // 10-90% from top
        delay: Math.random() * 20, // 0-20s delay
      });
    }
    setClouds(cloudArray);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="cloud"
          style={{
            width: `${cloud.size}px`,
            height: `${cloud.size * 0.6}px`,
            top: `${cloud.top}%`,
            animationDelay: `${cloud.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function RainEffect() {
  const [rainDrops, setRainDrops] = useState<RainDrop[]>([]);

  useEffect(() => {
    const rainArray: RainDrop[] = [];
    for (let i = 0; i < 50; i++) {
      rainArray.push({
        id: i,
        left: Math.random() * 100, // 0-100% from left
        delay: Math.random() * 2, // 0-2s delay
        duration: Math.random() * 0.5 + 0.8, // 0.8-1.3s duration
      });
    }
    setRainDrops(rainArray);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {rainDrops.map((drop) => (
        <div
          key={drop.id}
          className="rain"
          style={{
            left: `${drop.left}%`,
            animationDelay: `${drop.delay}s`,
            animationDuration: `${drop.duration}s`,
          }}
        />
      ))}
    </div>
  );
}