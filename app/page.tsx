"use client";

import { FormEvent, useEffect, useState } from "react";

const target = new Date("2026-08-30T16:30:00+02:00").getTime();

function Icon({ name }: { name: "calendar" | "pin" | "music" | "arrow" }) {
  const paths = {
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    music: <><path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></>,
    arrow: <path d="m6 9 6 6 6-6" />,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [sound, setSound] = useState(false);
  const [attending, setAttending] = useState(true);
  const [sent, setSent] = useState(false);
  const [time, setTime] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });

  useEffect(() => {
    const tick = () => {
      const d = Math.max(0, target - Date.now());
      setTime({
        days: String(Math.floor(d / 86400000)).padStart(2, "0"),
        hours: String(Math.floor((d % 86400000) / 3600000)).padStart(2, "0"),
        minutes: String(Math.floor((d % 3600000) / 60000)).padStart(2, "0"),
        seconds: String(Math.floor((d % 60000) / 1000)).padStart(2, "0"),
      });
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);

  function submit(e: FormEvent) { e.preventDefault(); setSent(true); }

  return (
    <main className="site-shell">
      <div className={`invitation ${opened ? "is-open" : ""}`}>
        {!opened && (
          <section className="envelope" aria-label="Ouvrir l’invitation">
            <div className="envelope-paper"><span>M</span><i>&</i><span>A</span></div>
            <div className="envelope-flap" />
            <button className="seal" onClick={() => setOpened(true)} aria-label="Ouvrir l’invitation">
              <b>M&A</b><small>Toucher pour ouvrir</small>
            </button>
          </section>
        )}

        <button className={`sound ${sound ? "playing" : ""}`} onClick={() => setSound(!sound)} aria-label="Activer ou couper la musique">
          <Icon name="music" /><span>{sound ? "ON" : "OFF"}</span>
        </button>

        <section className="hero panel">
          <div className="petal petal-a"/><div className="petal petal-b"/><div className="petal petal-c"/>
          <p className="eyebrow">The wedding invitation of</p>
          <div className="monogram">M <em>&</em> A</div>
          <h1><span>Maximilian</span><i>&</i><span>Aurora</span></h1>
          <p className="date-line">30 · 08 · 2026</p>
          <p className="intro">Two hearts, one promise,<br/>a lifetime together.</p>
          <a className="scroll-cue" href="#story"><span>Découvrir</span><Icon name="arrow" /></a>
        </section>

        <section className="story cream-section" id="story">
          <p className="chapter">Notre histoire</p>
          <h2>Nous nous<br/><i>disons oui</i></h2>
          <div className="ornament"><span>❧</span></div>
          <p>Entourés de nos familles, nous avons la joie de vous inviter à célébrer notre union et à partager cette journée inoubliable.</p>
          <blockquote>“Love is composed of a single soul<br/>inhabiting two bodies.”</blockquote>
        </section>

        <section className="details red-section">
          <p className="chapter light">Le grand jour</p>
          <h2>Rendez-vous<br/><i>à Cernobbio</i></h2>
          <div className="event-card">
            <div className="event-icon"><Icon name="calendar" /></div>
            <div><small>Quand</small><strong>Dimanche 30 août 2026</strong><span>Cérémonie à 16 h 30</span></div>
          </div>
          <div className="event-card">
            <div className="event-icon"><Icon name="pin" /></div>
            <div><small>Où</small><strong>Villa d’Este, Lac de Côme</strong><span>Via Regina 40, Cernobbio, Italie</span></div>
          </div>
          <a className="outline-button" href="https://maps.google.com/?q=Villa+d%27Este+Cernobbio" target="_blank" rel="noreferrer">Voir l’itinéraire <span>↗</span></a>
        </section>

        <section className="countdown cream-section">
          <p className="chapter">Avant de célébrer</p><h2>Chaque seconde<br/><i>nous rapproche</i></h2>
          <div className="timer">
            {Object.entries(time).map(([label, value]) => <div key={label}><strong>{value}</strong><span>{{days:"jours",hours:"heures",minutes:"minutes",seconds:"secondes"}[label as keyof typeof time]}</span></div>)}
          </div>
          <a className="red-button" href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mariage+de+Maximilian+%26+Aurora&dates=20260830T143000Z/20260830T223000Z&location=Villa+d%27Este%2C+Cernobbio%2C+Italie" target="_blank" rel="noreferrer">Ajouter au calendrier</a>
        </section>

        <section className="rsvp red-section">
          <p className="chapter light">Votre réponse</p><h2>Serez-vous<br/><i>des nôtres ?</i></h2>
          {sent ? <div className="thanks"><span>♥</span><h3>Merci !</h3><p>Votre réponse a bien été préparée.<br/>Nous avons hâte de célébrer avec vous.</p><button onClick={() => setSent(false)}>Modifier ma réponse</button></div> :
          <form onSubmit={submit}>
            <label>Nom complet<input required placeholder="Votre nom" /></label>
            <div className="attendance" role="group" aria-label="Présence">
              <button type="button" className={attending ? "active" : ""} onClick={() => setAttending(true)}>Avec plaisir</button>
              <button type="button" className={!attending ? "active" : ""} onClick={() => setAttending(false)}>À regret</button>
            </div>
            {attending && <label>Nombre d’invités<select defaultValue="1"><option>1</option><option>2</option><option>3</option><option>4</option></select></label>}
            <label>Un petit mot<textarea rows={3} placeholder="Allergies, message, chanson préférée…" /></label>
            <button className="submit" type="submit">Envoyer ma réponse <span>→</span></button>
          </form>}
        </section>

        <footer><div className="footer-mark">M <i>&</i> A</div><p>30 août 2026 · Lac de Côme</p><small>Made with love</small></footer>
      </div>
    </main>
  );
}
