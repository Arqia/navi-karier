import HeroWidget from './components/HeroWidget';

export default function HomePage() {
  return (
    <main>
      <section
        id="hero"
        style={{
          padding: '160px 0 100px',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -200,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 800,
            height: 800,
            background: 'radial-gradient(circle, var(--glow) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div className="container">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              borderRadius: 999,
              border: '1px solid var(--border-2)',
              background: 'var(--bg-2)',
              fontSize: '0.8rem',
              color: 'var(--ink-2)',
              marginBottom: 32,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                background: 'var(--green)',
                borderRadius: '50%',
              }}
            />
            <span>Digdaya &times; Hackathon 2026 &mdash; BI &times; OJK</span>
          </div>

          <h1
            className="gradient-text"
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              margin: '0 auto 24px',
              maxWidth: 900,
            }}
          >
            Dari tebakan
            <br />
            jadi data.
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--ink-2)',
              maxWidth: 600,
              margin: '0 auto 40px',
              lineHeight: 1.7,
            }}
          >
            NaviKarier menghitung gap antara skill kamu dan standar industri &mdash;
            matematis, bukan tebakan. Dalam 5 menit kamu tahu skill mana yang harus
            diprioritaskan.
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 12,
              marginBottom: 64,
            }}
          >
            <a href="#features" className="btn btn-primary">
              Analisa Sekarang &rarr;
            </a>
            <a href="#features" className="btn btn-ghost">
              Pelajari Lebih
            </a>
          </div>

          <HeroWidget />
        </div>
      </section>

      <section
        id="features"
        style={{
          padding: 'clamp(80px, 12vw, 140px) 0',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 64px' }}>
            <span className="mono">Fitur</span>
            <h2
              className="gradient-text"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                margin: '16px 0',
                letterSpacing: '-0.025em',
              }}
            >
              Bukan tebakan. Kalkulasi.
            </h2>
            <p style={{ color: 'var(--ink-2)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Tiga komponen yang membuat NaviKarier berbeda dari skill test biasa.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 20,
            }}
          >
            <article className="card">
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: 'var(--bg-3)',
                  border: '1px solid var(--border-2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                  fontSize: '1.2rem',
                }}
              >
                &#x1F4CA;
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '0 0 10px' }}>
                Skill Gap Analysis
              </h3>
              <p style={{ color: 'var(--ink-2)', margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>
                Upload CV atau input skill manual. Sistem hitung gap vs. standar industri
                secara matematis.
              </p>
            </article>
            <article className="card">
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: 'var(--bg-3)',
                  border: '1px solid var(--border-2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                  fontSize: '1.2rem',
                }}
              >
                &#x1F4CD;
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '0 0 10px' }}>
                Learning Path
              </h3>
              <p style={{ color: 'var(--ink-2)', margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>
                Roadmap belajar diprioritaskan by impact &mdash; bukan by popularitas
                course.
              </p>
            </article>
            <article className="card">
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: 'var(--bg-3)',
                  border: '1px solid var(--border-2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                  fontSize: '1.2rem',
                }}
              >
                &#x1F3AF;
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '0 0 10px' }}>
                Industry Benchmark
              </h3>
              <p style={{ color: 'var(--ink-2)', margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>
                Data dari 12 role, 5+ industri, dikurasi dari job listings real Indonesia.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
