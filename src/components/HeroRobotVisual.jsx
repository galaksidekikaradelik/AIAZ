import { useEffect, useRef } from "react";
import bodyImg from "../assets/robot-body.webp";
import bodyGlowImg from "../assets/robot-body-glow.webp";
import headImg from "../assets/robot-head.webp";
import headGlowImg from "../assets/robot-head-glow.webp";

const NATIVE_W = 692;
const NATIVE_H = 1510;

const HEAD = {
  x: 243, 
  y: 0,
  w: 209,
  h: 244,
  pivotX: 104, 
  pivotY: 216,
};

const HEAD_CENTER_X = HEAD.x + HEAD.w / 2;
const HEAD_CENTER_Y = 120;

const pct = (v, total) => `${(v / total) * 100}%`;
const clamp = (v, lim = 1) => Math.max(-lim, Math.min(lim, v));

const layer = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  userSelect: "none",
  pointerEvents: "none",
  display: "block",
};

function HeroRobotVisual() {
  const stageRef = useRef(null);
  const bodyRef = useRef(null);
  const headRef = useRef(null);
  const bodyGlowRef = useRef(null);
  const headGlowRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    const bodyEl = bodyRef.current;
    const headEl = headRef.current;
    const bodyGlow = bodyGlowRef.current;
    const headGlow = headGlowRef.current;
    if (!stage || !bodyEl || !headEl) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const pointer = { x: null, y: null };
    // hamarlaşdırılmış cari vəziyyət
    const cur = { hx: 0, hy: 0, bx: 0, by: 0, idle: 1 };

    let raf = 0;
    let running = false;
    let visible = true;
    let last = performance.now();

    const apply = (w, hx, hy, bx, by, t, activity) => {
      const breath = Math.sin(t * 1.3);

      bodyEl.style.transform =
        `perspective(${w * 2.4}px) ` +
        `translateX(${bx * w * 0.012}px) ` +
        `rotateY(${bx * 7}deg) rotateX(${-by * 2}deg) ` +
        `scale(${1 + breath * 0.0025})`;

      headEl.style.transform =
        `perspective(${w * 1.1}px) ` +
        `translate3d(${hx * w * 0.008}px, ${hy * w * 0.005}px, 0) ` +
        `rotateZ(${hx * 3.5}deg) ` +
        `rotateY(${hx * 26}deg) ` +
        `rotateX(${-hy * 15}deg)`;

      const pulse = Math.sin(t * 1.7);
      if (bodyGlow) {
        bodyGlow.style.opacity = String(
          Math.min(1, 0.55 + pulse * 0.18 + activity * 0.2)
        );
      }
      if (headGlow) {
        headGlow.style.opacity = String(
          Math.min(1, 0.62 + pulse * 0.2 + activity * 0.3)
        );
      }
    };

    if (reduceMotion) {
      const rect = stage.getBoundingClientRect();
      apply(rect.width, 0, 0, 0, 0, 0, 0.3);
      return;
    }

    const tick = (now) => {
      if (!visible) {
        running = false;
        return;
      }

      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const t = now / 1000;
      const rect = stage.getBoundingClientRect();

      let tx = 0;
      let ty = 0;

      if (pointer.x !== null) {
        const hcx = rect.left + (rect.width * HEAD_CENTER_X) / NATIVE_W;
        const hcy = rect.top + (rect.height * HEAD_CENTER_Y) / NATIVE_H;
        tx = clamp((pointer.x - hcx) / Math.max(300, window.innerWidth * 0.3));
        ty = clamp(
          (pointer.y - hcy) / Math.max(220, window.innerHeight * 0.35)
        );
      }

      const kHead = 1 - Math.exp(-dt * 7);
      const kBody = 1 - Math.exp(-dt * 3.5);
      const kIdle = 1 - Math.exp(-dt * 1.5);

      cur.hx += (tx - cur.hx) * kHead;
      cur.hy += (ty - cur.hy) * kHead;
      cur.bx += (tx - cur.bx) * kBody;
      cur.by += (ty - cur.by) * kBody;
      cur.idle += ((pointer.x === null ? 1 : 0) - cur.idle) * kIdle;

      const hx = cur.hx + cur.idle * 0.32 * Math.sin(t * 0.5);
      const hy = cur.hy + cur.idle * 0.1 * Math.sin(t * 0.37 + 1);

      const activity = Math.min(1, Math.hypot(cur.hx, cur.hy));
      apply(rect.width, hx, hy, cur.bx, cur.by, t, activity);

      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onLeave = () => {
      pointer.x = null;
      pointer.y = null;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
      },
      { threshold: 0 }
    );
    io.observe(stage);

    start();

    return () => {
      cancelAnimationFrame(raf);
      running = false;
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      role="img"
      aria-label="Süni intellekt robotu"
      style={{
        position: "relative",
        margin: "0 auto",
        aspectRatio: `${NATIVE_W} / ${NATIVE_H}`,
        width: `min(100%, calc(min(78vh, 780px) * ${NATIVE_W / NATIVE_H}))`,
      }}
    >
      <div
        ref={bodyRef}
        style={{
          ...layer,
          transformOrigin: "50% 90%",
          willChange: "transform",
        }}
      >
        <img src={bodyImg} alt="" draggable={false} style={layer} />
        <img
          ref={bodyGlowRef}
          src={bodyGlowImg}
          alt=""
          draggable={false}
          style={{ ...layer, opacity: 0.6 }}
        />

        <div
          ref={headRef}
          style={{
            position: "absolute",
            left: pct(HEAD.x, NATIVE_W),
            top: pct(HEAD.y, NATIVE_H),
            width: pct(HEAD.w, NATIVE_W),
            height: pct(HEAD.h, NATIVE_H),
            transformOrigin: `${(HEAD.pivotX / HEAD.w) * 100}% ${
              (HEAD.pivotY / HEAD.h) * 100
            }%`,
            willChange: "transform",
            pointerEvents: "none",
          }}
        >
          <img src={headImg} alt="" draggable={false} style={layer} />
          <img
            ref={headGlowRef}
            src={headGlowImg}
            alt=""
            draggable={false}
            style={{ ...layer, opacity: 0.65 }}
          />
        </div>
      </div>
    </div>
  );
}

export default HeroRobotVisual;