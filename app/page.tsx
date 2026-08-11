"use client";

import { FormEvent, useEffect, useState } from "react";

// Target Wedding Date (Adjustable)
const WEDDING_DATE = new Date("2027-07-22T17:00:00+02:00").getTime();

// Red SVG Line Art Components matching video
function DancingCoupleSVG() {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M40 30c5-5 12-5 15 0 3 5 3 12-2 18L40 60l-13-12c-5-6-5-13-2-18 3-5 10-5 15 0z" fill="var(--red-crimson)" opacity="0.3" />
      <path d="M50 20c-3 0-5 3-5 6s2 6 5 6 5-3 5-6-2-6-5-6z" fill="currentColor" />
      <path d="M50 32v25m0 0l-8 18m8-18l10 18" strokeLinecap="round" />
      <path d="M42 40c4 4 12 4 16 0" strokeLinecap="round" />
      <path d="M62 18c-3 0-5 3-5 6s2 6 5 6 5-3 5-6-2-6-5-6z" fill="currentColor" />
      <path d="M62 30c-4 8-8 16-12 25m12-25l8 12" strokeLinecap="round" />
      <circle cx="30" cy="25" r="3" fill="var(--red-bright)" opacity="0.6" />
      <circle cx="70" cy="25" r="2" fill="var(--red-bright)" opacity="0.6" />
      <path d="M25 45c2-2 5-2 7 0M70 45c2-2 5-2 7 0" stroke="var(--red-bright)" strokeWidth="1" />
    </svg>
  );
}

function CathedralSVG() {
  return (
    <svg viewBox="0 0 120 120">
      <path d="M60 10v20M50 20h20" strokeLinecap="round" />
      <path d="M60 30L35 55v55h50V55L60 30z" strokeLinejoin="round" />
      <path d="M50 110V85a10 10 0 0120 0v25" />
      <circle cx="60" cy="65" r="10" />
      <path d="M25 70l10-15v55H25V70zM85 70l10-15v55H85V70z" />
      <path d="M15 110h90" strokeLinecap="round" />
    </svg>
  );
}

function PalaceSVG() {
  return (
    <svg viewBox="0 0 120 120">
      <path d="M10 100h100M20 100V60l40-20 40 20v40" strokeLinejoin="round" />
      <path d="M30 60V45l30-15 30 15v15" />
      <path d="M60 15v15M53 22h14" />
      <path d="M50 100V80a10 10 0 0120 0v20" />
      <rect x="30" y="70" width="12" height="15" rx="2" />
      <rect x="78" y="70" width="12" height="15" rx="2" />
      <path d="M10 110h100" />
    </svg>
  );
}

function ChampagnePyramidSVG() {
  return (
    <svg viewBox="0 0 120 120">
      {/* Top Glass */}
      <path d="M52 25h16l-8 16zM60 41v12M52 53h16" />
      {/* Row 2 */}
      <path d="M36 55h16l-8 16zM44 71v12M36 83h16" />
      <path d="M68 55h16l-8 16zM76 71v12M68 83h16" />
      {/* Base */}
      <path d="M20 85h80" strokeDasharray="2 2" />
      <circle cx="60" cy="20" r="2" fill="var(--gold-accent)" />
      <circle cx="44" cy="50" r="1.5" fill="var(--gold-accent)" />
      <circle cx="76" cy="50" r="1.5" fill="var(--gold-accent)" />
    </svg>
  );
}

function BanquetTableSVG() {
  return (
    <svg viewBox="0 0 160 100">
      <path d="M20 70h120M30 70v25M130 70v25" strokeWidth="2" />
      {/* Table Arch & Cloth */}
      <path d="M20 70c0 10 30 15 60 15s60-5 60-15" fill="var(--rose-soft)" opacity="0.4" />
      {/* Candelabra */}
      <path d="M80 40v30M70 48h20M70 48v-8M90 48v-8" />
      <circle cx="80" cy="35" r="3" fill="var(--red-bright)" />
      <circle cx="70" cy="37" r="2.5" fill="var(--red-bright)" />
      <circle cx="90" cy="37" r="2.5" fill="var(--red-bright)" />
      {/* Plates */}
      <ellipse cx="45" cy="68" rx="10" ry="4" />
      <ellipse cx="115" cy="68" rx="10" ry="4" />
      {/* Glasses */}
      <path d="M32 60l3 8h-6zM125 60l3 8h-6z" />
    </svg>
  );
}

function VintageCarSVG() {
  return (
    <svg viewBox="0 0 160 90">
      {/* Car Body */}
      <path d="M25 55c0-15 15-25 35-25h40c20 0 35 10 35 25v15H25V55z" strokeWidth="1.5" />
      <path d="M40 30l10-15h60l10 15" strokeWidth="1.5" />
      {/* Wheels */}
      <circle cx="45" cy="70" r="12" strokeWidth="2" />
      <circle cx="45" cy="70" r="5" fill="currentColor" />
      <circle cx="115" cy="70" r="12" strokeWidth="2" />
      <circle cx="115" cy="70" r="5" fill="currentColor" />
      {/* Just Married Sign */}
      <rect x="60" y="55" width="40" height="15" rx="3" fill="var(--rose-soft)" stroke="var(--gold-accent)" />
      <text x="80" y="65" fontSize="6" textAnchor="middle" fill="var(--red-deep)" fontWeight="bold">JUST MARRIED</text>
      {/* Cans trailing */}
      <path d="M25 70c-8 5-15 4-20 8M20 78ellipse" strokeDasharray="2 2" />
      <circle cx="5" cy="78" r="2" fill="var(--gold-accent)" />
      <circle cx="10" cy="81" r="2" fill="var(--red-bright)" />
    </svg>
  );
}

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [sound, setSound] = useState(false);
  const [attending, setAttending] = useState<boolean | null>(true);
  const [sent, setSent] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("1");
  const [songRequest, setSongRequest] = useState("");

  const [time, setTime] = useState({
    days: "000",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, WEDDING_DATE - Date.now());
      setTime({
        days: String(Math.floor(diff / 86400000)).padStart(3, "0"),
        hours: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0"),
        minutes: String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0"),
        seconds: String(Math.floor((diff % 60000) / 1000)).padStart(2, "0"),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenEnvelope = () => {
    setOpening(true);
    // Play romantic chime audio sound effect if web audio API available
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.8); // C6
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch (e) {}

    setTimeout(() => {
      setOpened(true);
    }, 900);
  };

  const handleSubmitRSVP = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="site-shell">
      {/* Top Floating Controls Bar */}
      <div className="top-controls">
        {!opened && (
          <button className="pill-btn" onClick={() => setOpened(true)}>
            Passer <span>→</span>
          </button>
        )}
        <button className="pill-btn" onClick={() => setSound(!sound)}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18V5l11-2v13M6 21a3 3 0 100-6 3 3 0 000 6zM17 19a3 3 0 100-6 3 3 0 000 6z" />
          </svg>
          <span>{sound ? "Musique ON" : "Musique OFF"}</span>
        </button>
      </div>

      <div className="invitation-container">
        {/* INTERACTIVE OPENING ENVELOPE SCREEN */}
        {!opened && (
          <section className={`envelope-overlay ${opening ? "opening" : ""}`}>
            <div className="envelope-body">
              <div className="envelope-flap-top" />
              <div className="envelope-card-inside">
                <div style={{ fontFamily: "'Great Vibes', cursive", fontSize: "36px", color: "var(--red-crimson)" }}>
                  David & Marta
                </div>
                <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold-accent)", marginTop: "4px" }}>
                  Invitation de Mariage
                </div>
              </div>

              {/* Pulsing Red Wax Seal Button */}
              <button className="wax-seal-btn" onClick={handleOpenEnvelope} aria-label="Ouvrir l'invitation">
                <svg viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span>Ouvrir</span>
              </button>
            </div>
          </section>
        )}

        {/* 1. HERO INVITATION CARD (DARK CRIMSON BACKDROP) */}
        <section className="section-panel hero-section">
          <div className="hearts-bg-pattern" />

          <div className="hero-monogram">D & M</div>
          <div className="hero-subtitle">Wedding Invitation</div>

          {/* High Fashion Couple Portrait */}
          <div className="hero-frame">
            <img src="/images/hero_couple.jpg" alt="David & Marta Couple Portrait" />
          </div>

          <h1 className="hero-title">
            <span>David</span>
            <i>&</i>
            <span>Marta</span>
          </h1>

          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "16px", color: "var(--rose-blush)", maxWidth: "300px", margin: "0 0 16px 0" }}>
            Together with their families, request the pleasure of your company at the celebration of their marriage
          </p>

          <div className="hero-date">JEUDI 22 JUILLET 2027</div>
        </section>

        {/* 2. COUNTDOWN SECTION (SOFT PINK WITH TRANSLUCENT HEARTS OPACITY < 1) */}
        <section className="section-panel countdown-section">
          <div className="hearts-bg-pattern" />

          <span className="section-tag">Compte à rebours</span>
          <h2 className="section-heading">COUNTDOWN TO THE BIG DAY</h2>

          <div className="countdown-grid">
            <div className="countdown-box">
              <strong>{time.days}</strong>
              <span>JOURS</span>
            </div>
            <div className="countdown-box">
              <strong>{time.hours}</strong>
              <span>HEURES</span>
            </div>
            <div className="countdown-box">
              <strong>{time.minutes}</strong>
              <span>MINUTES</span>
            </div>
            <div className="countdown-box">
              <strong>{time.seconds}</strong>
              <span>SECONDES</span>
            </div>
          </div>

          {/* Red Silhouette Dancing Couple Illustration */}
          <div className="silhouette-illustration">
            <DancingCoupleSVG />
          </div>

          <p className="romantic-quote">
            “With great joy and hearts full of love, we invite you to be part of our most special day. Your presence will make this moment even more unforgettable.”
          </p>
        </section>

        {/* 3. VENUE & LOCATIONS (RED LINE ART CATHEDRAL & PALACE) */}
        <section className="section-panel venue-section">
          <span className="section-tag">Lieux de célébration</span>
          <h2 className="section-heading">Cérémonie & Réception</h2>

          {/* Ceremony Card */}
          <div className="venue-card">
            <span className="venue-tag">CÉRÉMONIE</span>
            <h3 className="venue-title">Cathédrale de Maria</h3>
            <div className="venue-time">🕒 17:00 PM</div>
            <div className="venue-illustration-box">
              <CathedralSVG />
            </div>
            <p style={{ fontSize: "12px", color: "#666", marginBottom: "12px" }}>
              Cátedral de Maria Santísima, Plaza Principal 12
            </p>
            <a
              href="https://maps.google.com/?q=Catedral+de+Maria"
              target="_blank"
              rel="noreferrer"
              className="venue-btn"
            >
              📍 Open in Google Maps
            </a>
          </div>

          {/* Reception Card */}
          <div className="venue-card">
            <span className="venue-tag">RÉCEPTION</span>
            <h3 className="venue-title">Esplanade Hotel Palace</h3>
            <div className="venue-time">🥂 19:00 PM</div>
            <div className="venue-illustration-box">
              <PalaceSVG />
            </div>
            <p style={{ fontSize: "12px", color: "#666", marginBottom: "12px" }}>
              Esplanade Hotel & Gardens, Lake Side Drive 40
            </p>
            <a
              href="https://maps.google.com/?q=Esplanade+Hotel"
              target="_blank"
              rel="noreferrer"
              className="venue-btn"
            >
              📍 Open in Google Maps
            </a>
          </div>
        </section>

        {/* 4. PROGRAM OF THE DAY (RED CIRCULAR ICON BADGES) */}
        <section className="section-panel program-section">
          <span className="section-tag">Ce qui vous attend</span>
          <h2 className="section-heading">Program of the Day</h2>

          <div className="program-timeline">
            {/* Item 1 */}
            <div className="program-item">
              <div className="program-icon-badge">
                <svg viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <div className="program-details">
                <small>17:00 PM</small>
                <h4>Ceremony</h4>
              </div>
            </div>

            {/* Item 2 */}
            <div className="program-item">
              <div className="program-icon-badge">
                <svg viewBox="0 0 24 24">
                  <path d="M8 22h8M12 17v5M5 3h14l-7 8z" />
                </svg>
              </div>
              <div className="program-details">
                <small>18:30 PM</small>
                <h4>Cocktails & Appetizers</h4>
              </div>
            </div>

            {/* Item 3 */}
            <div className="program-item">
              <div className="program-icon-badge">
                <svg viewBox="0 0 24 24">
                  <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
                </svg>
              </div>
              <div className="program-details">
                <small>20:00 PM</small>
                <h4>Gala Dinner</h4>
              </div>
            </div>

            {/* Item 4 */}
            <div className="program-item">
              <div className="program-icon-badge">
                <svg viewBox="0 0 24 24">
                  <path d="M9 18V5l11-2v13M6 21a3 3 0 100-6 3 3 0 000 6zM17 19a3 3 0 100-6 3 3 0 000 6z" />
                </svg>
              </div>
              <div className="program-details">
                <small>22:30 PM</small>
                <h4>Fiesta & Dance Floor</h4>
              </div>
            </div>
          </div>
        </section>

        {/* 5. RSVP SECTION (CHAMPAGNE TOWER & RED BUTTONS) */}
        <section className="section-panel rsvp-section">
          <span className="section-tag" style={{ color: "var(--gold-light)" }}>Votre réponse</span>
          <h2 className="section-heading" style={{ color: "#ffffff" }}>CONFIRM ATTENDANCE</h2>

          <p style={{ fontSize: "13px", color: "var(--rose-blush)", marginBottom: "16px" }}>
            David & Marta would love to know if you'll join our celebration!
          </p>

          <div className="champagne-illustration">
            <ChampagnePyramidSVG />
          </div>

          {sent ? (
            <div style={{ background: "rgba(255,255,255,0.15)", border: "1px solid var(--gold-accent)", padding: "24px", borderRadius: "18px", width: "100%", textAlign: "center" }}>
              <div style={{ fontSize: "40px", color: "var(--gold-accent)" }}>❤️</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", margin: "8px 0" }}>Merci beaucoup !</h3>
              <p style={{ fontSize: "14px", color: "var(--rose-blush)" }}>
                Votre réponse a bien été enregistrée.<br />Nous avons hâte de vous retrouver !
              </p>
              <button
                onClick={() => setSent(false)}
                style={{ background: "none", border: "0", color: "var(--gold-accent)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", marginTop: "12px", cursor: "pointer", textDecoration: "underline" }}
              >
                Modifier ma réponse
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitRSVP} className="rsvp-form">
              <label>Nom & Prénom</label>
              <input
                required
                type="text"
                placeholder="Votre nom complet"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
              />

              <label>Serez-vous présent ?</label>
              <div className="attendance-toggle">
                <button
                  type="button"
                  className={`attendance-btn ${attending === true ? "active" : ""}`}
                  onClick={() => setAttending(true)}
                >
                  Will be there ❤️
                </button>
                <button
                  type="button"
                  className={`attendance-btn ${attending === false ? "active" : ""}`}
                  onClick={() => setAttending(false)}
                >
                  Will miss it 💔
                </button>
              </div>

              {attending && (
                <>
                  <label>Nombre d'invités</label>
                  <select value={guestCount} onChange={(e) => setGuestCount(e.target.value)}>
                    <option value="1">1 Personne</option>
                    <option value="2">2 Personnes</option>
                    <option value="3">3 Personnes</option>
                    <option value="4">4 Personnes</option>
                  </select>

                  <label>Chanson préférée (pour la piste de danse)</label>
                  <input
                    type="text"
                    placeholder="Titre de votre chanson..."
                    value={songRequest}
                    onChange={(e) => setSongRequest(e.target.value)}
                  />
                </>
              )}

              <button type="submit" className="submit-rsvp-btn">
                Envoyer ma réponse ❤️
              </button>
            </form>
          )}
        </section>

        {/* 6. SAVE THE DATE & SHARE SECTION */}
        <section className="section-panel share-section">
          <span className="section-tag">Enregistrer & Partager</span>
          <h2 className="section-heading">Let's Celebrate Together</h2>

          <div className="action-buttons-row">
            <a
              href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mariage+de+David+%26+Marta&dates=20270722T150000Z/20270722T230000Z&details=C%C3%A9r%C3%A9monie+et+R%C3%A9ception"
              target="_blank"
              rel="noreferrer"
              className="action-btn"
            >
              📅 ADD TO CALENDAR
            </a>
            <a
              href="https://api.whatsapp.com/send?text=Rejoignez-nous%20pour%20le%20mariage%20de%20David%20%26%20Marta%20!"
              target="_blank"
              rel="noreferrer"
              className="action-btn"
            >
              💬 SHARE ON WHATSAPP
            </a>
          </div>

          <div className="table-illustration-box">
            <BanquetTableSVG />
          </div>

          {/* Photo Gallery & Upload Section */}
          <div style={{ width: "100%", background: "var(--rose-soft)", borderRadius: "20px", padding: "20px", marginTop: "16px" }}>
            <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "var(--red-deep)", margin: "0 0 6px 0" }}>
              📸 Photo & Video Album
            </h4>
            <p style={{ fontSize: "11px", color: "#666", margin: 0 }}>
              Shared photo gallery for all guests. Photo upload opens on the event day!
            </p>
          </div>
        </section>

        {/* 7. FOOTER WITH RIDEAU DE PETALES & VINTAGE CAR */}
        <footer className="section-panel footer-section">
          <div className="petals-curtain" />

          <div className="footer-names">David & Marta</div>
          <div className="footer-date">22 JUILLET 2027</div>

          <div className="vintage-car-box">
            <VintageCarSVG />
          </div>

          <small style={{ fontSize: "11px", fontStyle: "italic", opacity: "0.7" }}>
            Made with love ❤️
          </small>
        </footer>
      </div>
    </main>
  );
}

