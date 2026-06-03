# Noah Habteab — Bewerbungswebseite

Persönliche Portfolio-Website für Bewerbungen als Mediamatiker EFZ.

## Projektstruktur

```
index.html   — Gesamte HTML-Struktur
style.css    — Alle Styles (kein Framework, reines CSS)
script.js    — Gesamte JS-Logik (kein Framework)
img/         — Alle Bilder (.webp)
Videos/      — Projektvideos (.mp4)
Dokumente/   — PDFs für Download (CV, Zeugnisse etc.)
```

## Sections (in Reihenfolge)

1. **Hero** — Name, Buttons, Portraitfoto
2. **Portfolio** (`#portfolio`) — Mosaic-Grid mit 12 Foto/Video-Projekten, Filter (Alle / Fotografie / Video)
3. **Photo Scroll** — Horizontale Auto-Scroll Slideshow mit 11 Bildern
4. **Graphic Design** (`#design`) — 3 Design-Cards (Year Of, ODF Cover, Travis Scott)
5. **Über mich** (`#about`) — Foto, Ausbildung, Mentalität, Vision, Skills
6. **Hobbys** (`#hobbys`)
7. **Milestones** (`#milestones`)
8. **Unterlagen** (`#unterlagen`) — 4 PDFs zum Download
9. **Kontakt** (`#contact`)

## Wichtige Design-Entscheidungen

- **Kein Custom Cursor** — nativer Browser-Cursor, kein `cursor: none`
- **Kein Tilt/Magnetic-Effekt auf Buttons** — stattdessen `scale(1.05)` auf Hover
- **Unterlagen-Zeilen** — `scale(1.02)` auf Hover, kein Tilt
- **Kein Hover-Overlay für Projekttexte** — Text erscheint nur beim Klick in der Lightbox

## Lightbox-System

Beim Klick auf ein Projekt öffnet sich die Lightbox mit:
- Bild oder Video **links**
- Beschreibungstext **rechts**, linksbündig, vertikal mittig
- Kein Titel sichtbar (`lb-caption` ist `display:none`)
- Text in `lb-desc` kommt aus `data-desc` Attribut des Elements

Relevante IDs: `#lightbox`, `#lb-img`, `#lb-video`, `#lb-desc`

## Projekttexte (data-desc)

Jedes klickbare Element hat ein `data-desc` Attribut mit dem Beschreibungstext.

**Stil der Texte:**
- Persönliche Erzählung in einfachem Deutsch (Noahs eigene Stimme)
- Einleitungssatz der den Leser reinholt
- Jonathan Ive Präzision: kurze Sätze, bewusste Aussagen, "Das war die Entscheidung"
- Keine Gedankenstriche (–)
- Keine Querverweise auf andere Bilder by name
- Fachbegriffe variieren: Blickführung, Bildstruktur, Geometrie, Sogwirkung, Fluchtlinien, Diagonalen (nicht immer "Linienführung" oder "Tunnelsicht")

**Slideshow-Items** haben zusätzlich `data-title` für den Lightbox-Titel.

## CSS-Variablen (aus style.css)

```css
--font-d: 'Bebas Neue'     /* Display / Headlines */
--font-b: 'Inter'          /* Body */
--ease: cubic-bezier(.25,.46,.45,.94)
--black: #080808
--white: #f5f5f0
--gray: #888
--gray-2: #555
--border: rgba(255,255,255,.08)
--border-2: rgba(255,255,255,.18)
```

## JS-Module (in script.js, alle IIFEs)

- **Grain** — Film-Noise Canvas Effekt
- **Preloader** — Ladebalken
- **Nav** — Scrolled-State + Mobile Burger
- **3D Tilt** — Nur auf `.tilt` Elementen (Mosaic-Cards, Design-Cards, About-Foto, Hob-Items)
- **Portfolio Filter** — `.pf-btn` filtert Mosaic nach `data-c`
- **Lightbox** — Öffnet bei Klick auf `.mc`, `.dsgn-card`, `.ps-item img`; zeigt `data-desc`
- **Photo Scroll** — Auto-Scroll + manuelle Prev/Next Buttons
- **Reveal** — IntersectionObserver für `.rv` Elemente
- **Skill Bars** — Animiert beim Einblenden
- **Count Up** — Zahlen-Animation

## Was noch offen sein könnte

- Texte für einzelne Projekte können jederzeit in den `data-desc` Attributen angepasst werden
- Responsive Verhalten auf Mobile getestet (Lightbox stackt vertikal unter 768px)
