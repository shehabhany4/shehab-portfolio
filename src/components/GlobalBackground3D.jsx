import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeContext";

/**
 * GlobalBackground3D
 * ───────────────────
 * ✅ خلفية للموقع كله — fixed position
 * ✅ بتتغير مع light/dark mode أوتوماتيك
 * ✅ Parallax مع الماوس
 * ✅ Auto-pause لو الـ tab مش active
 * ✅ بدون أي library — Canvas 2D فقط
 */
const GlobalBackground3D = () => {
  const { theme } = useTheme();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const isDark = theme === "dark";

    // ── ألوان من CSS variables ───────────────────────────────────
    const cssVars = getComputedStyle(document.documentElement);
    const PRIMARY = cssVars.getPropertyValue("--accent-primary").trim() || (isDark ? "#6c63ff" : "#452bf0");
    const HELLO   = cssVars.getPropertyValue("--accent-hello").trim()   || (isDark ? "#a78bfa" : "#7c3aed");

    const hexToRgb = (hex) => {
      const c = hex.replace(/\s/g, "");
      if (!c.startsWith("#") || c.length < 7) return "108,99,255";
      return [
        parseInt(c.slice(1, 3), 16),
        parseInt(c.slice(3, 5), 16),
        parseInt(c.slice(5, 7), 16),
      ].join(",");
    };

    const C_PRIMARY = hexToRgb(PRIMARY);
    const C_HELLO   = hexToRgb(HELLO);

    // ── Resize ───────────────────────────────────────────────────
    let W, H;
    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // ── Mouse / Touch ────────────────────────────────────────────
    let mx = 0, my = 0;
    const onMove = (e) => {
      const src = e.touches?.[0] ?? e;
      mx = src.clientX / window.innerWidth  - 0.5;
      my = src.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove",  onMove, { passive: true });

    // ── Visibility API ────────────────────────────────────────────
    let paused = false;
    const onVis = () => { paused = document.hidden; };
    document.addEventListener("visibilitychange", onVis);

    // ── Config حسب الجهاز ────────────────────────────────────────
    const isMobile   = window.innerWidth < 600;
    const COUNT      = isMobile ? 60 : 130;
    const STAR_COUNT = isMobile ? 120 : 250;
    const MAX_DIST   = isMobile ? 0.10 : 0.13;   // relative units
    const MAX_DIST_SQ = MAX_DIST * MAX_DIST;
    const LINE_ALPHA  = isDark ? 0.18 : 0.10;

    const COLORS = [C_PRIMARY, C_HELLO, isDark ? "180,180,255" : "100,80,200"];

    // ── Particles ────────────────────────────────────────────────
    const particles = Array.from({ length: COUNT }, () => ({
      x:     Math.random(),
      y:     Math.random(),
      z:     0.2 + Math.random() * 0.8,
      vy:    0.00008 + Math.random() * 0.00014,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: isDark ? 0.40 + Math.random() * 0.45
                    : 0.18 + Math.random() * 0.28,
    }));

    // ── Stars ─────────────────────────────────────────────────────
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x:  Math.random(),
      y:  Math.random(),
      r:  0.3 + Math.random() * 0.9,
      a:  isDark ? 0.25 + Math.random() * 0.45
                 : 0.05 + Math.random() * 0.12,
      tw: Math.random() * Math.PI * 2,
    }));

    // ── Animation ─────────────────────────────────────────────────
    let frameId, t = 0;

    const draw = () => {
      frameId = requestAnimationFrame(draw);
      if (paused) return;
      t += 0.016;

      ctx.clearRect(0, 0, W, H);

      // Stars
      const starColor = isDark ? "200,200,255" : "100,80,200";
      stars.forEach((s) => {
        const a = s.a * (0.7 + 0.3 * Math.sin(s.tw + t * 1.3));
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starColor},${a})`;
        ctx.fill();
      });

      // Particles
      particles.forEach((p) => {
        p.y -= p.vy;
        if (p.y < -0.02) p.y = 1.02;

        const px = (p.x + mx * p.z * 0.06) * W;
        const py = (p.y + my * p.z * 0.04) * H;

        ctx.beginPath();
        ctx.arc(px, py, 1.2 + p.z * 2.0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
      });

      // Lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dSq = dx * dx + dy * dy;
          if (dSq < MAX_DIST_SQ) {
            const op = LINE_ALPHA * (1 - dSq / MAX_DIST_SQ);
            ctx.beginPath();
            ctx.moveTo((a.x + mx * a.z * 0.06) * W, (a.y + my * a.z * 0.04) * H);
            ctx.lineTo((b.x + mx * b.z * 0.06) * W, (b.y + my * b.z * 0.04) * H);
            ctx.strokeStyle = `rgba(${a.color},${op})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Vignette
      const fog = ctx.createRadialGradient(
        W * (0.5 + mx * 0.03), H * (0.5 + my * 0.03), 0,
        W / 2, H / 2, Math.max(W, H) * 0.75
      );
      fog.addColorStop(0, "rgba(0,0,0,0)");
      fog.addColorStop(1, isDark ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.55)");
      ctx.fillStyle = fog;
      ctx.fillRect(0, 0, W, H);
    };

    draw();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove",  onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",       // ← fixed مش absolute — يغطي الموقع كله
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
};

export default GlobalBackground3D;