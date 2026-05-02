"use client";
import { useEffect, useRef } from "react";

const StarBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Primary background (ultra dark navy)
  const bgColor = "#020b09";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const stars: any[] = [];
    const density = 100;

    // 🌌 Updated color palette (teal / emerald theme)
    const starColors = [
      "#d1fae5", // soft mint highlight
      "#a7f3d0",
      "#6ee7b7",
      "#34d399",
      "#10b981", // emerald-500
      "#84cc16", // lime-400
      "#173b31", // medium teal
      "#1C3F35",
      "#0D261C",
      "#05100B",
    ];

    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const createStars = () => {
      stars.length = 0;

      for (let i = 0; i < density; i++) {
        const size = Math.random() * 2 + 0.5;

        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          baseSize: size,
          alpha: Math.random() * 0.7 + 0.3,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          driftX: (Math.random() - 0.5) * 0.5,
          driftY: (Math.random() - 0.5) * 0.5,
          pulseSpeed: Math.random() * 0.01 + 0.005,
          pulseSize: Math.random() * 0.5 + 0.5,
        });
      }
    };

    createStars();

    function animate() {
      if (!canvas || !ctx) return;

      // 🌌 Base background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 🌿 Subtle teal overlay for depth
      ctx.fillStyle = "#0D261C";
      ctx.globalAlpha = 0.15;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;

      time += 0.01;

      stars.forEach((star) => {
        // Pulsing effect
        const pulse =
          Math.sin(time * star.pulseSpeed) * star.pulseSize * 0.5 + 1;
        star.size = star.baseSize * pulse;

        // Twinkle
        star.alpha += (Math.random() - 0.5) * star.twinkleSpeed;
        star.alpha = Math.min(Math.max(star.alpha, 0.3), 1);

        // Drift
        star.x += star.driftX;
        star.y += star.driftY;

        // Wrap around screen
        if (star.x < -10) star.x = canvas.width + 10;
        if (star.x > canvas.width + 10) star.x = -10;
        if (star.y < -10) star.y = canvas.height + 10;
        if (star.y > canvas.height + 10) star.y = -10;

        // 🌟 Glow layer (teal fade)
        ctx.globalAlpha = star.alpha * 0.5;

        const gradient = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          star.size * 2,
        );

        gradient.addColorStop(0, star.color);
        gradient.addColorStop(1, "rgba(16, 185, 129, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // ⭐ Core star
        ctx.globalAlpha = star.alpha;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 0.7, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    const animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      resizeCanvas();
      createStars();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full"
      style={{ zIndex: -1 }}
    />
  );
};

export default StarBackground;