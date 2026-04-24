import { useState, useEffect, useRef } from 'react';
import {
  Code2, Globe, Database, Layers, Map, BarChart3,
  ExternalLink, Github, Linkedin, Mail, Phone,
  ChevronDown, Menu, X, Star, Zap, Shield,
  Award, BookOpen, Briefcase, User, Download,
  ArrowRight, CheckCircle, Terminal, Coffee,
  MessageSquare, Send, MapPin
} from 'lucide-react';

/* ============================================================
   DATA
=============================================================== */
const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const SKILLS = [
  {
    category: 'Frontend',
    icon: <Globe size={20} />,
    color: '#6366f1',
    items: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'HTML', 'CSS'],
  },
  {
    category: 'Business Analyst',
    icon: <Database size={20} />,
    color: '#22d3ee',
    items: ['User acceptance testing', 'Use case diagram', 'Sistem requirement specification'],
  },
  {
    category: 'System Analyst',
    icon: <Database size={20} />,
    color: '#22d3ee',
    items: ['Microsoft Office', 'microsoft visio', 'microsoft excel', 'Draw.io', 'PostgreSQL', 'MySQL', 'REST API', 'JWT Auth'],
  },
  {
    category: 'GIS Engineer',
    icon: <Map size={20} />,
    color: '#ec4899',
    items: ['Leaflet.js', 'Google Earth Engine', 'GeoServer', 'PostGIS', 'QGIS', 'Python', 'ArcGIS'],
  },
  {
    category: 'Ui/Ux',
    icon: <Terminal size={20} />,
    color: '#10b981',
    items: ['Canva', 'Figma', 'Adobe Photoshop', 'Corel Draw', 'Adobe Illustrator'],
  },
];

const PROJECTS = [
  {
    title: 'Pola Distribusi Spasial & Dasymatrich Mapping Kota Depok',
    desc: 'Project analisis Urban Sprawl di Kota Depok menggunakan pengolahan data spasial dan citra satelit. Menghasilkan peta interaktif perubahan lahan terbangun berbasis indeks NDBI serta analisis dinamika badan air menggunakan MNDWI. Output utama berupa visualisasi tematik, peta sebaran pertumbuhan wilayah, serta laporan analitik untuk mendukung evaluasi perkembangan kota dan perencanaan tata ruang.',
    tags: ['Python', 'Java script', 'Arcgis', 'Google Earth Engine'],
    color: '#6366f1',
    icon: <Map size={24} />,
    stars: 128,
    demo: '#',
    repo: '#',
    featured: true,
  },
  {
    title: 'Sistem Informasi Manajemen',
    desc: 'SIMRS berbasis web lengkap dengan modul pasien, dokter, antrian, farmasi, dan laporan keuangan terintegrasi.',
    tags: ['Next.js', 'PostgreSQL', 'Prisma', 'TypeScript'],
    color: '#22d3ee',
    icon: <BarChart3 size={24} />,
    stars: 94,
    demo: '#',
    repo: '#',
    featured: true,
  },
  {
    title: 'E-Commerce Platform',
    desc: 'Platform belanja online full-stack dengan fitur keranjang, pembayaran gateway, dashboard admin, dan laporan penjualan.',
    tags: ['React', 'Express', 'MySQL', 'Midtrans'],
    color: '#ec4899',
    icon: <Layers size={24} />,
    stars: 76,
    demo: '#',
    repo: '#',
    featured: false,
  },
  {
    title: 'Real-Time Analytics',
    desc: 'Dashboard analitik real-time dengan WebSocket, visualisasi chart interaktif, dan notifikasi alert berbasis threshold.',
    tags: ['React', 'Socket.io', 'Redis', 'Chart.js'],
    color: '#10b981',
    icon: <Zap size={24} />,
    stars: 61,
    demo: '#',
    repo: '#',
    featured: false,
  },
  {
    title: 'School Management System',
    desc: 'Sistem informasi akademik sekolah dengan PPDB online, absensi digital, raport elektronik, dan portal orang tua.',
    tags: ['Node.js', 'Express', 'SQLite', 'HTML/CSS'],
    color: '#f59e0b',
    icon: <BookOpen size={24} />,
    stars: 53,
    demo: '#',
    repo: '#',
    featured: false,
  },
  {
    title: 'Portfolio CMS',
    desc: 'CMS headless untuk mengelola konten portfolio secara dinamis dengan editor WYSIWYG dan deployment otomatis.',
    tags: ['React', 'Strapi', 'GraphQL', 'Vercel'],
    color: '#8b5cf6',
    icon: <Code2 size={24} />,
    stars: 47,
    demo: '#',
    repo: '#',
    featured: false,
  },
];

const EXPERIENCE = [
  {
    role: 'Frontend Developer - Internship',
    company: 'PT. Inawebsolution',
    period: 'Jan 2025 – Apr 2025',
    description: 'Mengembangkan dashboard GIS interaktif berbasis React + MapLibre, membangun komponen UI reusable, mengintegrasikan REST API, serta mengoptimalkan performa render peta dengan teknik lazy-loading dan tile caching.',
    highlights: ['GIS Dashboard', 'REST API Integration', 'React Components', 'Performance Optimization'],
    color: '#6366f1',
  },
  {
    role: 'Fullstack Developer - Freelance',
    company: 'Self-Employed',
    period: '2023 – Sekarang',
    description: 'Membangun berbagai aplikasi web full-stack untuk klien lokal, mulai dari sistem informasi, website profil perusahaan, hingga platform e-commerce dengan integrasi payment gateway.',
    highlights: ['Full-Stack Development', 'Client Management', 'E-Commerce', 'Payment Gateway'],
    color: '#22d3ee',
  },
  {
    role: 'Web Developer - Volunteer',
    company: 'Open Source Community',
    period: '2022 – 2023',
    description: 'Berkontribusi dalam proyek open-source lokal, membangun tool bantu untuk komunitas developer Indonesia, dan aktif mentoring junior developer.',
    highlights: ['Open Source', 'Mentoring', 'Community Building', 'Documentation'],
    color: '#10b981',
  },
];

const STATS = [
  { value: '15+', label: 'Projects Completed', icon: <Briefcase size={20} /> },
  { value: '8+', label: 'Happy Clients', icon: <Star size={20} /> },
  { value: '2+', label: 'Years Experience', icon: <Award size={20} /> },
  { value: '99%', label: 'Client Satisfaction', icon: <CheckCircle size={20} /> },
];

/* ============================================================
   HOOKS
=============================================================== */
function useIntersectionObserver(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        obs.unobserve(el);
      }
    }, { threshold: 0.15, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, isVisible];
}

/* ============================================================
   SUB-COMPONENTS
=============================================================== */

/* ----- Cursor Glow ----- */
function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <div style={{
      position: 'fixed',
      top: pos.y - 200,
      left: pos.x - 200,
      width: 400,
      height: 400,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
      pointerEvents: 'none',
      zIndex: 0,
      transition: 'top 0.15s ease, left 0.15s ease',
    }} />
  );
}

/* ----- Blob ----- */
function Blob({ style }) {
  return (
    <div style={{
      position: 'absolute',
      borderRadius: '50%',
      filter: 'blur(80px)',
      opacity: 0.15,
      animation: 'blob 12s ease-in-out infinite',
      ...style,
    }} />
  );
}

/* ----- Section Header ----- */
function SectionHeader({ label, title, subtitle }) {
  const [ref, visible] = useIntersectionObserver();
  return (
    <div ref={ref} style={{
      textAlign: 'center',
      marginBottom: '3.5rem',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1)',
    }}>
      <span style={{
        display: 'inline-block',
        padding: '0.35rem 1rem',
        borderRadius: '999px',
        background: 'rgba(99,102,241,0.12)',
        border: '1px solid rgba(99,102,241,0.3)',
        color: '#6366f1',
        fontSize: '0.8rem',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        marginBottom: '0.75rem',
        fontFamily: 'var(--font-mono)',
      }}>{label}</span>
      <h2 style={{
        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
        fontWeight: 800,
        lineHeight: 1.2,
        background: 'linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '0.75rem',
      }}>{title}</h2>
      {subtitle && (
        <p style={{ color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto', fontSize: '1.05rem' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ----- Navbar ----- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setActive(href);
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        padding: '0 2rem',
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled
          ? 'rgba(10, 10, 15, 0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.4s ease',
      }}>
        {/* Logo */}
        <a href="#home" style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          fontSize: '1.25rem',
          color: '#fff',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <span style={{
            width: 32, height: 32,
            background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.85rem',
            fontWeight: 800,
          }}>F</span>
          <span>fauza<span style={{ color: '#6366f1' }}>nurhakim</span></span>
        </a>

        {/* Desktop Links */}
        <ul style={{
          display: 'flex',
          gap: '0.25rem',
          listStyle: 'none',
          alignItems: 'center',
        }} className="nav-desktop">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => handleNav(link.href)}
                style={{
                  padding: '0.45rem 0.9rem',
                  borderRadius: '8px',
                  color: active === link.href ? '#fff' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  background: active === link.href
                    ? 'rgba(99,102,241,0.2)'
                    : 'transparent',
                  border: active === link.href
                    ? '1px solid rgba(99,102,241,0.4)'
                    : '1px solid transparent',
                  transition: 'all 0.2s ease',
                }}
              >{link.label}</a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href="#contact" className="nav-cta" style={{
          padding: '0.5rem 1.2rem',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
          color: '#fff',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '0.9rem',
          boxShadow: '0 4px 15px rgba(99,102,241,0.3)',
          transition: 'all 0.2s ease',
          border: 'none',
        }}>Hire Me</a>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            padding: '0.5rem',
          }}
          className="nav-hamburger"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '68px', left: 0, right: 0,
          zIndex: 999,
          background: 'rgba(10,10,15,0.97)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '1rem 2rem 2rem',
          animation: 'fadeIn 0.2s ease',
        }}>
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleNav(link.href)}
              style={{
                display: 'block',
                padding: '0.8rem 0',
                color: active === link.href ? '#6366f1' : 'var(--text-secondary)',
                textDecoration: 'none',
                fontWeight: 500,
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >{link.label}</a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}

/* ----- Hero ----- */
function Hero() {
  const [typed, setTyped] = useState('');
  const roles = ['Software Engineer', 'GIS Specialist', 'Business Analyst', 'System Analyst', 'UI/UX Designer'];
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    let i = 0;
    let current = roles[roleIdx];
    let forward = true;
    const interval = setInterval(() => {
      if (forward) {
        i++;
        setTyped(current.slice(0, i));
        if (i === current.length) {
          forward = false;
          setTimeout(() => { }, 1500);
        }
      } else {
        i--;
        setTyped(current.slice(0, i));
        if (i === 0) {
          forward = true;
          setRoleIdx(prev => (prev + 1) % roles.length);
          current = roles[(roleIdx + 1) % roles.length];
        }
      }
    }, 80);
    return () => clearInterval(interval);
  }, [roleIdx]);

  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6rem 2rem 4rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <Blob style={{ top: '-10%', left: '-5%', width: 600, height: 600, background: '#6366f1' }} />
      <Blob style={{ bottom: '-10%', right: '-5%', width: 500, height: 500, background: '#22d3ee', animationDelay: '4s' }} />
      <Blob style={{ top: '40%', left: '50%', width: 300, height: 300, background: '#ec4899', animationDelay: '8s' }} />

      <div style={{
        maxWidth: '900px',
        width: '100%',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        animation: 'fadeUp 1s ease forwards',
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 1rem',
          borderRadius: '999px',
          background: 'rgba(16,185,129,0.1)',
          border: '1px solid rgba(16,185,129,0.3)',
          color: '#10b981',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '1.5rem',
        }}>
          <span style={{
            width: 8, height: 8,
            borderRadius: '50%',
            background: '#10b981',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }} />
          Available for Work
        </div>

        {/* Name */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 7vw, 5rem)',
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: '1rem',
        }}>
          <span style={{
            background: 'var(--gradient-hero)',
            backgroundSize: '200% 200%',
            animation: 'gradient-shift 4s ease infinite',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>Fauza Nurhakim</span>
          <br />
          <span style={{ color: 'var(--text-primary)' }}>Ar Rafei</span>
        </h1>

        {/* Typed role */}
        <div style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
          color: 'var(--text-secondary)',
          marginBottom: '1.75rem',
          height: '2rem',
          fontFamily: 'var(--font-mono)',
        }}>
          <span>{typed}</span>
          <span style={{
            display: 'inline-block',
            width: 2,
            height: '1.2em',
            background: '#6366f1',
            marginLeft: 3,
            verticalAlign: 'text-bottom',
            animation: 'pulse-glow 1s ease-in-out infinite',
          }} />
        </div>

        {/* Description */}
        <p style={{
          fontSize: '1.1rem',
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          margin: '0 auto 2.5rem',
          lineHeight: 1.8,
        }}>
          Membangun aplikasi web modern yang elegan, performatif, dan berdampak.
          Spesialis dalam <strong style={{ color: '#6366f1' }}>GIS Dashboard</strong> dan{' '}
          <strong style={{ color: '#22d3ee' }}>Sistem Informasi Spasial</strong>.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <a
            href="#projects"
            style={{
              padding: '0.85rem 2rem',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 8px 30px rgba(99,102,241,0.35)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(99,102,241,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(99,102,241,0.35)'; }}
          >
            View Projects <ArrowRight size={18} />
          </a>
          <a
            href="#contact"
            style={{
              padding: '0.85rem 2rem',
              borderRadius: '12px',
              background: 'transparent',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: '1px solid rgba(255,255,255,0.15)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'; e.currentTarget.style.background = 'rgba(99,102,241,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'transparent'; }}
          >
            <Download size={18} /> Download CV
          </a>
        </div>

        {/* Social Links */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          {[
            { icon: <Github size={20} />, href: 'https://github.com', label: 'GitHub' },
            { icon: <Linkedin size={20} />, href: 'https://linkedin.com', label: 'LinkedIn' },
            { icon: <Mail size={20} />, href: 'mailto:fauza@example.com', label: 'Email' },
          ].map(s => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              style={{
                width: 44, height: 44,
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'; e.currentTarget.style.background = 'rgba(99,102,241,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '-3rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.25rem',
          color: 'var(--text-muted)',
          fontSize: '0.75rem',
          animation: 'float 3s ease-in-out infinite',
        }}>
          <span>Scroll down</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </section>
  );
}

/* ----- Stats ----- */
function Stats() {
  const [ref, visible] = useIntersectionObserver();
  return (
    <section ref={ref} style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1.5rem',
      }}>
        {STATS.map((s, i) => (
          <div key={i} style={{
            padding: '1.75rem',
            borderRadius: '16px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            textAlign: 'center',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: `all 0.6s cubic-bezier(0.4,0,0.2,1) ${i * 0.1}s`,
          }}>
            <div style={{ color: '#6366f1', display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
              {s.icon}
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{s.value}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ----- About ----- */
function About() {
  const [ref, visible] = useIntersectionObserver();
  return (
    <section id="about" style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <SectionHeader label="// about me" title="Siapa Saya?" />
      <div ref={ref} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '3rem',
        alignItems: 'center',
      }}>
        {/* Visual card */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(-40px)',
          transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1)',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <div style={{
            position: 'relative',
            width: 280,
            height: 280,
          }}>
            {/* Profile placeholder */}
            <div style={{
              width: 280, height: 280,
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(34,211,238,0.1) 100%)',
              border: '1px solid rgba(99,102,241,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '7rem',
              animation: 'float 6s ease-in-out infinite',
            }}>
              👨‍💻
            </div>
            {/* Floating badge */}
            <div style={{
              position: 'absolute',
              bottom: -16, right: -16,
              padding: '0.75rem 1.25rem',
              borderRadius: '14px',
              background: 'rgba(10,10,15,0.9)',
              border: '1px solid rgba(99,102,241,0.4)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
            }}>
              <div style={{ color: '#6366f1', fontWeight: 700, fontSize: '0.9rem' }}>2+ Years</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Experience</div>
            </div>
            <div style={{
              position: 'absolute',
              top: -16, left: -16,
              padding: '0.75rem',
              borderRadius: '14px',
              background: 'rgba(10,10,15,0.9)',
              border: '1px solid rgba(34,211,238,0.4)',
              backdropFilter: 'blur(10px)',
            }}>
              <Coffee size={20} style={{ color: '#22d3ee' }} />
            </div>
          </div>
        </div>

        {/* Text */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(40px)',
          transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1) 0.2s',
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>
            Fauza Nurhakim Ar Rafei
          </h3>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: '#6366f1',
            marginBottom: '1.25rem',
            padding: '0.35rem 0.75rem',
            background: 'rgba(99,102,241,0.08)',
            borderRadius: '6px',
            display: 'inline-block',
          }}>
            Software Engineer & GIS Specialist
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: '1rem' }}>
            Saya adalah lulusan Teknik Informatika (Geospatial Information Technology) Universitas Ibn Khaldun Bogor dengan pengalaman dalam pengolahan data spasial (GIS) dan analisis sistem. Memiliki keahlian dalam pemetaan digital, analisis citra satelit, serta pengelolaan data untuk mendukung pengambilan keputusan. Berpengalaman mengerjakan proyek analisis Urban Sprawl di Kota Depok menggunakan NDBI dan MNDWI, serta pernah bekerja sebagai Asistensi GIS dan Admin Logistik yang terbiasa menangani pencatatan stok, pengadaan, dan distribusi. Saya senang memecahkan masalah kompleks melalui analisis yang kuat, pengolahan data yang rapi, dan solusi kerja yang efisien.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: '1.75rem' }}>
            Saat tidak mengerjakan proyek IT dan GIS, saya juga pernah aktif sebagai freelance Admin Logistik, membantu pengelolaan data stok, pencatatan barang masuk-keluar, serta mendukung kelancaran proses distribusi. Pengalaman ini memperkuat kemampuan saya dalam manajemen data, ketelitian, dan koordinasi operasional.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {[
              { icon: <MapPin size={14} />, text: 'Bandung, Indonesia' },
              { icon: <Coffee size={14} />, text: 'Open to Remote' },
              { icon: <BookOpen size={14} />, text: 'Always Learning' },
            ].map((item, i) => (
              <span key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                background: 'rgba(255,255,255,0.04)',
                padding: '0.4rem 0.9rem',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.07)',
              }}>
                {item.icon} {item.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----- Skills ----- */
function Skills() {
  return (
    <section id="skills" style={{
      padding: '6rem 2rem',
      background: 'linear-gradient(180deg, transparent, rgba(99,102,241,0.03), transparent)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionHeader
          label="// tech stack"
          title="Skills & Technologies"
          subtitle="Teknologi yang saya gunakan untuk membangun produk digital yang luar biasa."
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
          gap: '1.5rem',
        }}>
          {SKILLS.map((skill, i) => {
            const [ref, visible] = useIntersectionObserver(); // eslint-disable-line
            return (
              <div
                key={i}
                ref={ref}
                style={{
                  padding: '1.75rem',
                  borderRadius: '20px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s cubic-bezier(0.4,0,0.2,1) ${i * 0.1}s`,
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${skill.color}40`;
                  e.currentTarget.style.background = `${skill.color}08`;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 12px 40px ${skill.color}15`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  e.currentTarget.style.transform = visible ? 'translateY(0)' : 'translateY(30px)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.25rem',
                }}>
                  <div style={{
                    width: 40, height: 40,
                    borderRadius: '10px',
                    background: `${skill.color}15`,
                    border: `1px solid ${skill.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: skill.color,
                  }}>
                    {skill.icon}
                  </div>
                  <h3 style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>{skill.category}</h3>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {skill.items.map(item => (
                    <span key={item} style={{
                      padding: '0.3rem 0.75rem',
                      borderRadius: '6px',
                      background: `${skill.color}10`,
                      border: `1px solid ${skill.color}20`,
                      color: skill.color,
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      fontFamily: 'var(--font-mono)',
                    }}>{item}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ----- Projects ----- */
function Projects() {
  const [filter, setFilter] = useState('all');

  const featured = PROJECTS.filter(p => p.featured);
  const others = PROJECTS.filter(p => !p.featured);

  return (
    <section id="projects" style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <SectionHeader
        label="// my work"
        title="Featured Projects"
        subtitle="Koleksi proyek terbaik yang menunjukkan kemampuan teknis dan kreativitas saya."
      />

      {/* Featured */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem',
      }}>
        {featured.map((p, i) => (
          <ProjectCard key={i} project={p} featured />
        ))}
      </div>

      <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', marginBottom: '1.5rem' }}>
        Other Projects
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.25rem',
      }}>
        {others.map((p, i) => (
          <ProjectCard key={i} project={p} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project: p, featured }) {
  const [ref, visible] = useIntersectionObserver();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: featured ? '2rem' : '1.5rem',
        borderRadius: '20px',
        background: hovered ? `${p.color}08` : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? p.color + '40' : 'rgba(255,255,255,0.07)'}`,
        transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
        transform: hovered ? 'translateY(-6px)' : visible ? 'translateY(0)' : 'translateY(30px)',
        opacity: visible ? 1 : 0,
        boxShadow: hovered ? `0 20px 60px ${p.color}15` : 'none',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top gradient accent */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 3,
        background: `linear-gradient(90deg, ${p.color}, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{
          width: 44, height: 44,
          borderRadius: '12px',
          background: `${p.color}15`,
          border: `1px solid ${p.color}30`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: p.color,
        }}>
          {p.icon}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <a href={p.repo} aria-label="GitHub" style={{
            color: 'var(--text-muted)',
            transition: 'color 0.2s',
            textDecoration: 'none',
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          ><Github size={18} /></a>
          <a href={p.demo} aria-label="Demo" style={{
            color: 'var(--text-muted)',
            transition: 'color 0.2s',
            textDecoration: 'none',
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          ><ExternalLink size={18} /></a>
        </div>
      </div>

      <h3 style={{
        fontWeight: 700,
        color: '#fff',
        fontSize: featured ? '1.2rem' : '1rem',
        marginBottom: '0.5rem',
      }}>{p.title}</h3>

      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '0.875rem',
        lineHeight: 1.7,
        marginBottom: '1.25rem',
      }}>{p.desc}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem' }}>
        {p.tags.map(tag => (
          <span key={tag} style={{
            padding: '0.25rem 0.65rem',
            borderRadius: '6px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'var(--text-secondary)',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
          }}>{tag}</span>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        <Star size={13} />
        <span>{p.stars}</span>
      </div>
    </div>
  );
}

/* ----- Experience ----- */
function Experience() {
  return (
    <section id="experience" style={{
      padding: '6rem 2rem',
      background: 'linear-gradient(180deg, transparent, rgba(34,211,238,0.02), transparent)',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <SectionHeader
          label="// my journey"
          title="Experience"
          subtitle="Perjalanan profesional saya dalam dunia pengembangan perangkat lunak."
        />
        <div style={{ position: 'relative' }}>
          {/* Timeline line */}
          <div style={{
            position: 'absolute',
            left: 20,
            top: 0, bottom: 0,
            width: 2,
            background: 'linear-gradient(180deg, #6366f1, #22d3ee, transparent)',
            opacity: 0.3,
          }} />

          {EXPERIENCE.map((exp, i) => {
            const [ref, visible] = useIntersectionObserver(); // eslint-disable-line
            return (
              <div
                key={i}
                ref={ref}
                style={{
                  display: 'flex',
                  gap: '2rem',
                  marginBottom: '2.5rem',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateX(0)' : 'translateX(-30px)',
                  transition: `all 0.7s cubic-bezier(0.4,0,0.2,1) ${i * 0.15}s`,
                }}
              >
                {/* Dot */}
                <div style={{
                  width: 42, height: 42,
                  borderRadius: '50%',
                  background: `${exp.color}15`,
                  border: `2px solid ${exp.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 1,
                  boxShadow: `0 0 20px ${exp.color}30`,
                }}>
                  <Briefcase size={16} style={{ color: exp.color }} />
                </div>

                {/* Content */}
                <div style={{
                  flex: 1,
                  padding: '1.5rem',
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontWeight: 700, color: '#fff', fontSize: '1.05rem' }}>{exp.role}</h3>
                    <span style={{
                      fontSize: '0.78rem',
                      color: exp.color,
                      fontFamily: 'var(--font-mono)',
                      background: `${exp.color}12`,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px',
                      border: `1px solid ${exp.color}25`,
                    }}>{exp.period}</span>
                  </div>
                  <p style={{ color: exp.color, fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                    {exp.company}
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                    {exp.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {exp.highlights.map(h => (
                      <span key={h} style={{
                        padding: '0.25rem 0.65rem',
                        borderRadius: '6px',
                        background: `${exp.color}10`,
                        border: `1px solid ${exp.color}20`,
                        color: exp.color,
                        fontSize: '0.75rem',
                        fontWeight: 500,
                      }}>{h}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ----- Contact ----- */
function Contact() {
  const [ref, visible] = useIntersectionObserver();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" style={{
      padding: '6rem 2rem',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      <SectionHeader
        label="// get in touch"
        title="Mari Berkolaborasi"
        subtitle="Punya proyek menarik? Saya siap membantu mewujudkan ide Anda menjadi kenyataan."
      />

      <div ref={ref} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2.5rem',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1)',
      }}>
        {/* Info */}
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>
            Hubungi Saya
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Jangan ragu untuk menghubungi saya kapan saja. Saya selalu terbuka untuk mendiskusikan proyek baru, peluang kreatif, atau sekadar berbagi ide.
          </p>
          {[
            { icon: <Mail size={18} />, label: 'Email', value: 'fauza@example.com', color: '#6366f1' },
            { icon: <Phone size={18} />, label: 'Phone', value: '+62 812 3456 7890', color: '#22d3ee' },
            { icon: <MapPin size={18} />, label: 'Location', value: 'Bandung, Jawa Barat', color: '#ec4899' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              marginBottom: '1.25rem',
            }}>
              <div style={{
                width: 44, height: 44,
                borderRadius: '12px',
                background: `${item.color}12`,
                border: `1px solid ${item.color}25`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: item.color,
                flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>{item.label}</div>
                <div style={{ color: '#fff', fontWeight: 500, fontSize: '0.9rem' }}>{item.value}</div>
              </div>
            </div>
          ))}

          {/* Social */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            {[
              { icon: <Github size={20} />, href: 'https://github.com', label: 'GitHub' },
              { icon: <Linkedin size={20} />, href: 'https://linkedin.com', label: 'LinkedIn' },
              { icon: <MessageSquare size={20} />, href: '#', label: 'Chat' },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                style={{
                  width: 44, height: 44,
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'; e.currentTarget.style.background = 'rgba(99,102,241,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          padding: '2rem',
          borderRadius: '20px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          {sent && (
            <div style={{
              padding: '0.85rem 1.25rem',
              borderRadius: '10px',
              background: 'rgba(16,185,129,0.12)',
              border: '1px solid rgba(16,185,129,0.3)',
              color: '#10b981',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              animation: 'fadeIn 0.3s ease',
            }}>
              <CheckCircle size={18} /> Pesan terkirim! Saya akan segera membalas.
            </div>
          )}

          {[
            { id: 'name', label: 'Nama Lengkap', type: 'text', placeholder: 'John Doe' },
            { id: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' },
          ].map(f => (
            <div key={f.id}>
              <label htmlFor={`contact-${f.id}`} style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: '0.4rem',
              }}>{f.label}</label>
              <input
                id={`contact-${f.id}`}
                type={f.type}
                placeholder={f.placeholder}
                value={form[f.id]}
                onChange={e => setForm(prev => ({ ...prev, [f.id]: e.target.value }))}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  fontFamily: 'var(--font-body)',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
          ))}

          <div>
            <label htmlFor="contact-message" style={{
              display: 'block',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              marginBottom: '0.4rem',
            }}>Pesan</label>
            <textarea
              id="contact-message"
              rows={5}
              placeholder="Ceritakan tentang proyek Anda..."
              value={form.message}
              onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none',
                resize: 'vertical',
                transition: 'border-color 0.2s',
                fontFamily: 'var(--font-body)',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '0.85rem 2rem',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              color: '#fff',
              border: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 8px 30px rgba(99,102,241,0.3)',
              transition: 'all 0.2s ease',
              fontFamily: 'var(--font-body)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(99,102,241,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(99,102,241,0.3)'; }}
          >
            <Send size={18} /> Kirim Pesan
          </button>
        </form>
      </div>
    </section>
  );
}

/* ----- Footer ----- */
function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '2rem',
      textAlign: 'center',
      color: 'var(--text-muted)',
      fontSize: '0.85rem',
    }}>
      <p>
        Dibuat dengan ❤️ oleh{' '}
        <strong style={{ color: '#6366f1' }}>Fauza Nurhakim Ar Rafei</strong>{' '}
        — {new Date().getFullYear()}
      </p>
      <p style={{ marginTop: '0.35rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
        React + Vite + Lucide Icons
      </p>
    </footer>
  );
}

/* ============================================================
   MAIN COMPONENT
=============================================================== */
export default function Portfolio() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
