"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

// Target Wedding Date (Adjustable)
const WEDDING_DATE = new Date("2027-07-22T17:00:00+02:00").getTime();

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [sound, setSound] = useState(true); // Calm music enabled by default
  const [attending, setAttending] = useState<boolean | null>(true);
  const [sent, setSent] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("1");
  const [songRequest, setSongRequest] = useState("");
  const [message, setMessage] = useState("");

  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);
  const timerRef = useRef<any>(null);

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

  // Soft Calm Romantic Music Synthesizer
  const startRomanticMusic = () => {
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return;

      if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
        audioCtxRef.current = new AudioCtxClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      if (isPlayingRef.current) return;
      isPlayingRef.current = true;

      const romanticChords = [
        [261.63, 329.63, 392.00, 523.25], // C Major
        [220.00, 261.63, 329.63, 440.00], // A Minor
        [174.61, 220.00, 261.63, 349.23], // F Major
        [196.00, 246.94, 293.66, 392.00], // G Major
      ];

      let chordIndex = 0;

      const playChordSequence = () => {
        if (!isPlayingRef.current || !audioCtxRef.current) return;
        const currentCtx = audioCtxRef.current;
        if (currentCtx.state === "closed") return;

        if (currentCtx.state === "suspended") {
          currentCtx.resume().catch(() => {});
        }

        const chord = romanticChords[chordIndex % romanticChords.length];
        const now = currentCtx.currentTime;

        chord.forEach((freq, i) => {
          try {
            const osc = currentCtx.createOscillator();
            const gain = currentCtx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, now + i * 0.35);

            gain.gain.setValueAtTime(0.001, now + i * 0.35);
            gain.gain.exponentialRampToValueAtTime(0.06, now + i * 0.35 + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.35 + 2.4);

            osc.connect(gain);
            gain.connect(currentCtx.destination);

            osc.start(now + i * 0.35);
            osc.stop(now + i * 0.35 + 2.5);
          } catch (e) {}
        });

        chordIndex++;
        timerRef.current = setTimeout(playChordSequence, 2800);
      };

      playChordSequence();
    } catch (e) {}
  };

  const stopRomanticMusic = () => {
    isPlayingRef.current = false;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
      try {
        audioCtxRef.current.suspend();
      } catch (e) {}
    }
  };

  useEffect(() => {
    if (sound) {
      startRomanticMusic();
    } else {
      stopRomanticMusic();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [sound]);

  const handleOpenEnvelope = () => {
    setOpening(true);
    setSound(true);
    startRomanticMusic();

    // Opening sound chime
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtxClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.8);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch (e) {}

    setTimeout(() => {
      setOpened(true);
    }, 2700);
  };

  const toggleSound = () => {
    if (!sound) {
      setSound(true);
      startRomanticMusic();
    } else {
      setSound(false);
      stopRomanticMusic();
    }
  };

  const handleSubmitRSVP = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="site-shell">
      {/* Floating Bottom-Right Circular Music Button with Equalizer Bars */}
      <button
        className={`floating-audio-btn ${sound ? "playing" : ""}`}
        onClick={toggleSound}
        aria-label="Musique"
        title={sound ? "Musique calme activée (Cliquer pour couper)" : "Activer la musique calme"}
      >
        <div className="audio-bars">
          <span />
          <span />
          <span />
        </div>
      </button>

      <div className="invitation-container">
        {/* INTERACTIVE OPENING ENVELOPE SCREEN */}
        {!opened && (
          <section className={`envelope-overlay ${opening ? "opening" : ""}`}>
            <div className="envelope-wrapper">
              <div className="envelope-body">
                <div className="envelope-flap-top" />
                <div className="envelope-card-inside">
                  <div style={{ fontFamily: "'Great Vibes', cursive", fontSize: "36px", color: "var(--red-crimson)" }}>
                    Mohamed & Mayssen
                  </div>
                  <div style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--silver-accent)", marginTop: "4px", fontWeight: "600" }}>
                    Invitation de Mariage
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--red-deep)", marginTop: "12px", fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif" }}>
                    Ont la joie de vous inviter à célébrer leur union
                  </div>
                  <div style={{ fontSize: "11px", fontWeight: "600", color: "var(--red-crimson)", marginTop: "8px" }}>
                    22 JUILLET 2027 • HÔTEL SHERATON TUNIS
                  </div>
                </div>
                <div className="envelope-pocket-front" />

                {/* Pulsing Red Wax Seal Button with Silver Accents */}
                <button className="wax-seal-btn" onClick={handleOpenEnvelope} aria-label="Ouvrir l'invitation">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span>Ouvrir</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* 1. HERO INVITATION CARD (MOHAMED & MAYSSEN) */}
        <section className="section-panel hero-section">
          <div className="hearts-bg-pattern" />

          <div className="hero-monogram">M & M</div>
          <div className="hero-subtitle">Invitation de Mariage</div>

          {/* High Fashion Couple Portrait */}
          <div className="hero-frame">
            <img src="/images/hero_couple.jpg" alt="Mohamed & Mayssen Portrait de Couple" />
          </div>

          <h1 className="hero-title">
            <span>Mohamed</span>
            <i>&</i>
            <span>Mayssen</span>
          </h1>

          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "16px", color: "var(--rose-blush)", maxWidth: "320px", margin: "0 0 16px 0" }}>
            Avec la bénédiction de leurs familles, ont l'honneur et le plaisir de vous inviter à la célébration de leur mariage
          </p>

          <div className="hero-date">JEUDI 22 JUILLET 2027</div>
        </section>

        {/* 2. COUNTDOWN SECTION */}
        <section className="section-panel countdown-section">
          <div className="hearts-bg-pattern" />

          <span className="section-tag">Compte à rebours</span>
          <h2 className="section-heading">EN ATTENDANT LE GRAND JOUR</h2>

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

          <p className="romantic-quote">
            « C'est avec une immense joie et le cœur rempli d'amour que nous vous invitons à partager le plus beau jour de notre vie. Votre présence rendra cet instant précieux et inoubliable. »
          </p>
        </section>

        {/* 3. VENUE & LOCATIONS (HOTEL SHERATON TUNIS - ORIGINAL HIGH-RES PHOTO) */}
        <section className="section-panel venue-section">
          <span className="section-tag">Lieu de la célébration</span>
          <h2 className="section-heading">Lieu du Mariage</h2>

          {/* Hotel Sheraton Tunis Card */}
          <div className="venue-card">
            <span className="venue-tag">CÉRÉMONIE & RÉCEPTION</span>
            <h3 className="venue-title">Hôtel Sheraton Tunis</h3>
            <div className="venue-time">À partir de 17:00 PM</div>
            
            {/* Real Original High-Resolution Photo of Hotel Sheraton Tunis */}
            <div className="venue-image-frame">
              <img src="/images/sheraton_tunis.jpg" alt="Hôtel Sheraton Tunis" />
            </div>

            <p style={{ fontSize: "13px", color: "var(--red-deep)", fontWeight: "600", margin: "14px 0 4px 0" }}>
              Avenue de la Ligue Arabe, Le Belvédère, Tunis
            </p>
            <p style={{ fontSize: "12px", color: "#666", marginBottom: "16px" }}>
              Rejoignez-nous pour la cérémonie suivie du cocktail d'accueil et du dîner de gala dans la grande salle de réception de l'Hôtel Sheraton Tunis.
            </p>
            <a
              href="https://maps.google.com/?q=Hotel+Sheraton+Tunis"
              target="_blank"
              rel="noreferrer"
              className="venue-btn"
            >
              Ouvrir dans Google Maps
            </a>
          </div>
        </section>

        {/* 4. PROGRAM OF THE DAY */}
        <section className="section-panel program-section">
          <span className="section-tag">Le programme</span>
          <h2 className="section-heading">Programme de la Journée</h2>

          <div className="program-timeline">
            {/* Item 1 */}
            <div className="program-item">
              <div className="program-icon-badge">
                <svg viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <div className="program-details">
                <small>17:00</small>
                <h4>Cérémonie d'Accueil</h4>
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
                <small>18:30</small>
                <h4>Cocktail & Vin d'Honneur</h4>
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
                <small>20:00</small>
                <h4>Dîner de Gala</h4>
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
                <small>22:30</small>
                <h4>Soirée Dansante & Festivités</h4>
              </div>
            </div>
          </div>
        </section>

        {/* 5. RSVP SECTION */}
        <section className="section-panel rsvp-section">
          <span className="section-tag" style={{ color: "var(--silver-light)" }}>Votre réponse</span>
          <h2 className="section-heading" style={{ color: "#ffffff" }}>CONFIRMER VOTRE PRÉSENCE</h2>

          <p style={{ fontSize: "13px", color: "var(--rose-blush)", marginBottom: "20px" }}>
            Mohamed & Mayssen ont hâte de célébrer ce moment magique avec vous ! Merci de nous répondre avant le 1er Juin 2027.
          </p>

          {sent ? (
            <div style={{ background: "rgba(255,255,255,0.15)", border: "1px solid var(--silver-accent)", padding: "24px", borderRadius: "18px", width: "100%", textAlign: "center" }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", margin: "8px 0" }}>Merci beaucoup !</h3>
              <p style={{ fontSize: "14px", color: "var(--rose-blush)" }}>
                Votre réponse a bien été enregistrée.<br />Nous avons très hâte de vous retrouver !
              </p>
              <button
                onClick={() => setSent(false)}
                style={{ background: "none", border: "0", color: "var(--silver-accent)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", marginTop: "12px", cursor: "pointer", textDecoration: "underline" }}
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
                placeholder="Entrez votre nom complet"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
              />

              <label>Serez-vous présent(e) ?</label>
              <div className="attendance-toggle">
                <button
                  type="button"
                  className={`attendance-btn ${attending === true ? "active" : ""}`}
                  onClick={() => setAttending(true)}
                >
                  PRÉSENT(E) AVEC JOIE
                </button>
                <button
                  type="button"
                  className={`attendance-btn ${attending === false ? "active" : ""}`}
                  onClick={() => setAttending(false)}
                >
                  ABSENT(E) AVEC REGRET
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

                  <label>Un mot doux pour les mariés / Remarques</label>
                  <textarea
                    rows={3}
                    placeholder="Laissez un message pour Mohamed & Mayssen..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />

                  <label>Une chanson pour vous faire danser ?</label>
                  <input
                    type="text"
                    placeholder="Titre de votre chanson préférée..."
                    value={songRequest}
                    onChange={(e) => setSongRequest(e.target.value)}
                  />
                </>
              )}

              <button type="submit" className="submit-rsvp-btn">
                CONFIRMER MA PRÉSENCE
              </button>
            </form>
          )}
        </section>

        {/* 6. SAVE THE DATE & SHARE SECTION */}
        <section className="section-panel share-section">
          <span className="section-tag">Enregistrer & Partager</span>
          <h2 className="section-heading">Célébrons Ensemble</h2>

          <div className="action-buttons-row">
            <a
              href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mariage+de+Mohamed+%26+Mayssen&dates=20270722T150000Z/20270722T230000Z&details=C%C3%A9r%C3%A9monie+et+R%C3%A9ception+H%C3%B4tel+Sheraton+Tunis"
              target="_blank"
              rel="noreferrer"
              className="action-btn"
            >
              AJOUTER AU CALENDRIER
            </a>
            <a
              href="https://api.whatsapp.com/send?text=Rejoignez-nous%20pour%20le%20mariage%20de%20Mohamed%20%26%20Mayssen%20à%20l'Hôtel%20Sheraton%20Tunis%20!"
              target="_blank"
              rel="noreferrer"
              className="action-btn"
            >
              PARTAGER SUR WHATSAPP
            </a>
          </div>

          {/* Photo Gallery & Upload Section */}
          <div style={{ width: "100%", background: "var(--rose-soft)", borderRadius: "20px", padding: "24px 20px", border: "1px solid rgba(217, 27, 62, 0.15)", textAlign: "center" }}>
            <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "var(--red-deep)", margin: "0 0 6px 0" }}>
              Album Photo & Vidéo
            </h4>
            <p style={{ fontSize: "12px", color: "#666", margin: 0, lineHeight: "1.5" }}>
              Galerie partagée pour tous nos invités. Le dépôt et le partage des photos ouvriront le jour du mariage !
            </p>
          </div>
        </section>

        {/* 7. LUXURY RED & SILVER FOOTER */}
        <footer className="section-panel footer-section">
          <div className="petals-curtain" />

          <div className="footer-monogram">M & M</div>
          <div className="footer-message">MERCI DE CÉLÉBRER CE MOMENT MAGIQUE AVEC NOUS</div>
          <div className="footer-date">22 JUILLET 2027 • HÔTEL SHERATON TUNIS</div>

          <small style={{ fontSize: "11px", fontStyle: "italic", opacity: "0.8", marginTop: "16px" }}>
            Mohamed & Mayssen
          </small>
        </footer>
      </div>
    </main>
  );
}
