import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, FileText, Mail, MousePointer2, Play, Sparkles } from 'lucide-react'
import './style.css'

const offers = [
  {
    title: 'Vitrine premium',
    price: '1 490 €+',
    copy: 'Une page sobre qui se construit autour d’une promesse claire, d’un visuel fort et d’un formulaire utile.',
    points: ['Animation signature', 'Copywriting clair', 'Mobile parfait'],
  },
  {
    title: 'Pack conversion',
    price: '2 900 €+',
    copy: 'Un site complet avec sections métier, preuves, FAQ, formulaire et parcours de contact pensé pour vendre.',
    points: ['5 à 7 sections', 'Formulaire intelligent', 'SEO local'],
  },
  {
    title: 'Signature sobre',
    price: 'Sur devis',
    copy: 'Direction artistique minimaliste : mouvement, silence visuel, hiérarchie nette et interactions premium.',
    points: ['Motion design', 'Animations scroll', 'Identité premium'],
  },
]

const cases = [
  ['Cabinet conseil IA', '+41%', 'demandes qualifiées'],
  ['Architecte intérieur', '3.2s', 'temps pour comprendre l’offre'],
  ['Coach haut de gamme', 'x2', 'clics vers rendez-vous'],
  ['Clinique esthétique', '24/7', 'formulaire + qualification'],
]

function BuildAnimation() {
  return (
    <div className="build-stage" aria-label="Animation d'une page web qui se construit toute seule">
      <div className="stage-glow" />
      <div className="empty-page">
        <FileText />
        <span>page vierge</span>
      </div>

      <div className="browser-window">
        <div className="browser-top">
          <i /><i /><i />
          <div className="url-bar">signal-studio.fr</div>
        </div>
        <div className="site-surface">
          <div className="line nav-line" />
          <div className="hero-build">
            <div className="copy-build">
              <div className="line title-line one" />
              <div className="line title-line two" />
              <div className="line text-line" />
              <div className="button-build" />
            </div>
            <div className="visual-build">
              <div className="photo-ring" />
              <div className="photo-card a" />
              <div className="photo-card b" />
              <div className="photo-card c" />
            </div>
          </div>
          <div className="grid-build">
            <div /><div /><div />
          </div>
        </div>
      </div>

      <div className="cursor-build"><MousePointer2 /></div>
      <div className="code-pill one">hero()</div>
      <div className="code-pill two">cta ✓</div>
      <div className="code-pill three">responsive</div>
    </div>
  )
}

function App() {
  const [leadStatus, setLeadStatus] = useState('Recevoir le mini-audit')
  return <main className="page">
    <nav className="nav">
      <a className="brand" href="#top"><FileText /> Signal Studio</a>
      <div className="nav-links"><a href="#offres">Offres</a><a href="#methode">Méthode</a><a href="#contact">Contact</a></div>
      <a className="nav-cta" href="#contact">Audit gratuit</a>
    </nav>

    <section id="top" className="hero">
      <div className="aurora a" /><div className="aurora b" /><div className="noise" />
      <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75 }}>
        <span className="kicker"><Sparkles /> Animation “page qui se fabrique”</span>
        <h1>Une page blanche qui devient un site premium, toute seule.</h1>
        <p>Au lieu d’un objet 3D random : une animation sobre où le navigateur apparaît, les blocs se dessinent, le CTA arrive, puis le site prend forme comme dans une vidéo de fabrication.</p>
        <div className="hero-actions"><a className="button primary" href="#contact">Demander ma version <ArrowRight /></a><a className="button ghost" href="#demo"><Play /> Voir la construction</a></div>
        <div className="proof"><span><CheckCircle2 /> Sobre</span><span><CheckCircle2 /> Compréhensible</span><span><CheckCircle2 /> Effet premium</span></div>
      </motion.div>
      <motion.div id="demo" className="hero-visual" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .9, delay: .12 }}>
        <BuildAnimation />
      </motion.div>
    </section>

    <section className="strip">
      <span>Pas une animation gadget</span><span>•</span><b>elle montre le service vendu</b><span>•</span><span>création, structure, conversion</span>
    </section>

    <section id="offres" className="offers">
      <div className="section-head"><p className="eyebrow">Monétisable</p><h2>Le mouvement explique la valeur.</h2><p>Le visiteur comprend immédiatement que tu fabriques un site clair, moderne et orienté contact.</p></div>
      <div className="offer-grid">
        {offers.map((offer, i) => <motion.article className="offer" key={offer.title} whileHover={{ y: -8, rotate: i === 1 ? 0 : i ? 1.2 : -1.2 }}>
          <small>0{i + 1}</small><strong>{offer.price}</strong><h3>{offer.title}</h3><p>{offer.copy}</p><ul>{offer.points.map(p => <li key={p}><CheckCircle2 /> {p}</li>)}</ul>
        </motion.article>)}
      </div>
    </section>

    <section id="methode" className="method">
      <div><p className="eyebrow">Méthode</p><h2>Une animation utile, pas juste jolie.</h2></div>
      <div className="steps">
        <article><span>01</span><h3>Page vierge</h3><p>Le client voit d’abord une page simple, comme un pictogramme de document.</p></article>
        <article><span>02</span><h3>Construction</h3><p>Navigation, titre, visuel, cartes et bouton se placent progressivement.</p></article>
        <article><span>03</span><h3>Conversion</h3><p>Le résultat final montre directement un site prêt à prendre des demandes.</p></article>
      </div>
    </section>

    <section className="cases">
      <div className="ticker">{[...cases, ...cases].map(([name, stat, label], i) => <div className="case" key={`${name}-${i}`}><b>{stat}</b><span>{name}</span><small>{label}</small></div>)}</div>
    </section>

    <section id="contact" className="contact">
      <div className="contact-copy"><p className="eyebrow">Prêt à montrer</p><h2>Formulaire vitrine, pas juste une maquette.</h2><p>Le visiteur peut laisser son projet, son budget et son email. Le bouton réagit pour montrer que la page est interactive.</p></div>
      <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
        <label>Type d’activité<input placeholder="Ex : architecte, coach, garage premium…" /></label>
        <label>Budget estimé<select defaultValue=""><option value="" disabled>Choisir une option</option><option>Moins de 1 500 €</option><option>1 500–3 000 €</option><option>3 000–5 000 €</option><option>5 000 €+</option></select></label>
        <label>Email<input type="email" placeholder="vous@email.fr" /></label>
        <button onClick={() => setLeadStatus('Demande pré-validée ✓')}><Mail /> {leadStatus}</button>
      </form>
    </section>
  </main>
}

createRoot(document.getElementById('root')).render(<App />)
