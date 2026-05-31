'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Skill = {
  id: string;
  name: string;
  level: number;
  threshold: number;
  weight: number;
};

const INITIAL: Skill[] = [
  { id: 'react', name: 'React / Frontend', level: 35, threshold: 70, weight: 0.3 },
  { id: 'sql', name: 'SQL & Data', level: 20, threshold: 60, weight: 0.25 },
  { id: 'comm', name: 'Communication', level: 55, threshold: 75, weight: 0.25 },
  { id: 'problem', name: 'Problem Solving', level: 45, threshold: 80, weight: 0.2 },
];

function calcReadiness(skills: Skill[]) {
  return (
    skills.reduce((acc, s) => {
      const r = Math.min(s.level / s.threshold, 1);
      return acc + r * s.weight;
    }, 0) * 100
  );
}

function statusFor(score: number) {
  if (score >= 80) return 'Siap melamar';
  if (score >= 60) return 'Hampir siap';
  if (score >= 40) return 'Perlu pengembangan';
  return 'Banyak gap terbuka';
}

function fillFor(ratio: number) {
  if (ratio >= 1) return 'var(--green)';
  if (ratio >= 0.75) return 'var(--amber)';
  return 'var(--red)';
}

export default function HeroWidget() {
  const [skills, setSkills] = useState<Skill[]>(INITIAL);
  const [displayScore, setDisplayScore] = useState(0);
  const targetRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const score = useMemo(() => calcReadiness(skills), [skills]);
  targetRef.current = score;

  useEffect(() => {
    const tick = () => {
      setDisplayScore((d) => {
        const diff = targetRef.current - d;
        if (Math.abs(diff) < 0.05) return targetRef.current;
        return d + diff * 0.18;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const setLevel = useCallback((id: string, level: number) => {
    setSkills((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, level: Math.max(0, Math.min(100, level)) }
          : s,
      ),
    );
  }, []);

  return (
    <div
      aria-label="Interactive skill gap meter"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-2)',
        borderRadius: 'var(--radius-xl)',
        padding: 32,
        boxShadow: '0 0 0 1px var(--border), 0 24px 48px -12px rgba(0,0,0,0.5)',
        position: 'relative',
        overflow: 'hidden',
        maxWidth: 900,
        margin: '0 auto',
        textAlign: 'left',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg, var(--red), var(--amber), var(--green))',
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: 16,
          marginBottom: 28,
          paddingBottom: 20,
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div>
          <span className="mono">Industry Readiness Score</span>
          <div
            style={{
              fontSize: 'clamp(2.6rem, 6vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              display: 'inline-flex',
              alignItems: 'baseline',
              gap: 4,
              marginTop: 8,
            }}
          >
            <span>{Math.round(displayScore)}</span>
            <sup style={{ fontSize: '1rem', color: 'var(--ink-3)', fontWeight: 400 }}>%</sup>
          </div>
        </div>
        <div
          style={{
            fontSize: '0.85rem',
            color: 'var(--ink-2)',
            textAlign: 'right',
            maxWidth: 140,
          }}
        >
          {statusFor(score)}
        </div>
      </div>

      {skills.map((s) => (
        <SkillRow key={s.id} skill={s} onChange={(v) => setLevel(s.id, v)} />
      ))}

      <a
        href="#features"
        className="btn btn-primary"
        style={{ marginTop: 24, width: '100%', justifyContent: 'center' }}
      >
        Analisa CV Kamu Sepenuhnya &rarr;
      </a>
    </div>
  );
}

function SkillRow({
  skill,
  onChange,
}: {
  skill: Skill;
  onChange: (v: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const ratio = skill.level / skill.threshold;
  const diff = Math.round(skill.level - skill.threshold);

  const setFromClientX = useCallback(
    (clientX: number) => {
      const t = trackRef.current;
      if (!t) return;
      const r = t.getBoundingClientRect();
      const pct = ((clientX - r.left) / r.width) * 100;
      onChange(pct);
    },
    [onChange],
  );

  useEffect(() => {
    const move = (e: MouseEvent | TouchEvent) => {
      if (!draggingRef.current) return;
      const x =
        'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      setFromClientX(x);
      if ('touches' in e) e.preventDefault();
    };
    const up = () => {
      draggingRef.current = false;
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('touchend', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', up);
    };
  }, [setFromClientX]);

  const onDown = (clientX: number) => {
    draggingRef.current = true;
    document.body.style.userSelect = 'none';
    setFromClientX(clientX);
  };

  return (
    <div
      style={{
        padding: '16px 0',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 12,
          gap: 12,
        }}
      >
        <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>
          {skill.name}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--ink-3)',
          }}
        >
          {Math.round(skill.level)} / {skill.threshold}
        </span>
      </div>

      <div
        ref={trackRef}
        onMouseDown={(e) => onDown(e.clientX)}
        onTouchStart={(e) => onDown(e.touches[0].clientX)}
        style={{
          position: 'relative',
          height: 32,
          background: 'var(--bg-3)',
          borderRadius: 999,
          cursor: 'pointer',
          touchAction: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: `${skill.level}%`,
            borderRadius: 999,
            background: fillFor(ratio),
            transition: 'background 240ms ease',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: -4,
            bottom: -4,
            left: `${skill.threshold}%`,
            width: 2,
            background: 'var(--ink)',
            opacity: 0.3,
          }}
        />
        <button
          role="slider"
          aria-label={`${skill.name} level`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(skill.level)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
              onChange(skill.level + 2);
              e.preventDefault();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
              onChange(skill.level - 2);
              e.preventDefault();
            } else if (e.key === 'Home') {
              onChange(0);
            } else if (e.key === 'End') {
              onChange(100);
            }
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: `${skill.level}%`,
            transform: 'translate(-50%, -50%)',
            width: 28,
            height: 28,
            background: 'var(--ink)',
            border: '2px solid var(--bg-card)',
            borderRadius: '50%',
            cursor: 'grab',
            zIndex: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: 8,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: 'var(--ink-3)',
          letterSpacing: '0.1em',
        }}
      >
        GAP{' '}
        <b style={{ color: 'var(--ink)', fontWeight: 500, marginLeft: 4 }}>
          {diff >= 0 ? '+' : ''}
          {diff}
        </b>
      </div>
    </div>
  );
}
