# Noah Habteab — Bewerbungswebseite

Persönliche Portfolio-Website für Bewerbungen als Mediamatiker EFZ.

## Projektstruktur

```
index.html   — Gesamte HTML-Struktur
style.css    — Alle Styles (kein Framework, reines CSS)
script.js    — Gesamte JS-Logik (kein Framework)
img/         — Alle Bilder (.webp, .png)
Videos/      — Noch vorhandene lokale Videos (Short_film.mp4 kann gelöscht werden)
Dokumente/   — PDFs für Download (CV, Zeugnisse etc.)
```

## Sections (in Reihenfolge)

1. **Hero** — Name, Buttons, Portraitfoto
2. **Bewerbungsvideo** (`#bewerbungsvideo`) — YouTube-Embed (ID: `1E68z3HI1n0`), 16:9, max-width 1200px
3. **Portfolio** (`#portfolio`) — Mosaic-Grid mit 12 Foto/Video-Projekten, Filter (Alle / Fotografie / Video)
4. **Photo Scroll** — Horizontale Auto-Scroll Slideshow mit 11 Bildern
5. **Graphic Design** (`#design`) — 3 Design-Cards (Year Of, ODF Cover, Travis Scott)
6. **Über mich** (`#about`) — Foto, Ausbildung, Mentalität, Vision, Skills
7. **Hobbys** (`#hobbys`)
8. **Milestones** (`#milestones`)
9. **Unterlagen** (`#unterlagen`) — 5 PDFs zum Download
10. **Kontakt** (`#contact`)

## Wichtige Design-Entscheidungen

- **Kein Custom Cursor** — nativer Browser-Cursor, kein `cursor: none`
- **Kein Tilt/Magnetic-Effekt auf Buttons** — stattdessen `scale(1.05)` auf Hover
- **Unterlagen-Zeilen** — `scale(1.02)` auf Hover, kein Tilt
- **Kein Hover-Overlay für Projekttexte** — Text erscheint nur beim Klick in der Lightbox

## Video-Karten im Mosaic-Grid

Videos wurden aus Speichergründen auf YouTube hochgeladen. Es gibt drei Typen von Video-Cards:

### 1. YouTube Embed (Lightbox-Iframe)
Attribut: `data-youtube="VIDEO_ID"` + optional `data-aspect="9/16"` (für Shorts, Standard ist 16:9)
- Klick öffnet Lightbox mit `<iframe>` und YouTube-Player
- Beispiel: **Short Film** (`data-youtube="_mA1FNUbbEI"`, `data-aspect="9/16"`)
- Thumbnail: eigenes Bild `img/Thumbnail_Kurz-Film.png`

### 2. YouTube Direktlink (öffnet neues Tab)
Attribut: `data-yt-url="https://youtu.be/..."` 
- Klick öffnet YouTube direkt im neuen Tab (kein Embed)
- Nötig wenn Video Copyright-Sperre hat und nicht einbettbar ist
- Hover zeigt `.mc-yt-hint` Text "Auf YouTube ansehen ↗" unter dem Titel
- Beispiel: **Eritrea Tour** (`data-yt-url="https://youtu.be/agjLJVQoxNE"`)
- Thumbnail: eigenes Bild `img/Thumbnail-Eritrea.png`

### 3. Lokales Video (veraltet, nicht mehr verwendet)
Attribut: `data-video="Videos/datei.mp4"`
- Spielt Video direkt in der Lightbox ab

## Lightbox-System

Beim Klick auf ein Projekt öffnet sich die Lightbox mit:
- Bild, Video oder YouTube-Iframe **links**
- Beschreibungstext **rechts**, linksbündig, vertikal mittig
- Kein Titel sichtbar (`lb-caption` ist `display:none`)
- Text in `lb-desc` kommt aus `data-desc` Attribut des Elements

Relevante IDs: `#lightbox`, `#lb-img`, `#lb-video`, `#lb-iframe`, `#lb-desc`

**Lightbox-Logik (JS):** Priorität beim Klick auf `.mc[data-c="video"]`:
1. `data-yt-url` → `window.open(url, '_blank')` (kein Lightbox)
2. `data-youtube` → `showYoutube()` mit Iframe
3. `data-video` → `showVideo()` mit lokalem Video

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
- **Lightbox** — Öffnet bei Klick auf `.mc`, `.dsgn-card`, `.ps-item img`; unterstützt Bilder, lokale Videos und YouTube-Iframes
- **Photo Scroll** — Auto-Scroll + manuelle Prev/Next Buttons
- **Reveal** — IntersectionObserver für `.rv` Elemente
- **Skill Bars** — Animiert beim Einblenden
- **Count Up** — Zahlen-Animation

## Bewerbungsvideo-Section

- YouTube-Embed (kein lokales Video), ID: `1E68z3HI1n0`
- CSS-Klassen: `.bv-section`, `.bv-player-wrap`, `.bv-ratio`
- `.bv-ratio` nutzt `aspect-ratio: 16/9` und `box-shadow` als subtiler Glow-Border
- Iframe-Wrapper statt `<video>`-Tag

## Domain & Meta-Tags

- Domain: **noah-habteab.ch** — DNS/Hosting eingerichtet (Stand: Juni 2026)
- Meta-Tags in `<head>` vorhanden:
  - `<meta name="description">` — SEO-Beschreibung
  - `<link rel="canonical" href="https://noah-habteab.ch">`
  - Open Graph: `og:type`, `og:url`, `og:title`, `og:description`, `og:image`

## Deeplinks

Deeplinks funktionieren über URL-Hash. Beim Seitenaufruf sucht JS nach `[data-id="hash"]` und löst automatisch einen Klick aus (öffnet Lightbox oder scrollt zur Section).

**Sections (scrollen nur):**
| URL | Ziel |
|---|---|
| `/#bewerbungsvideo` | Bewerbungsvideo-Section |
| `/#portfolio` | Portfolio-Grid |
| `/#design` | Graphic Design |
| `/#about` | Über mich |
| `/#hobbys` | Hobbys |
| `/#milestones` | Milestones |
| `/#unterlagen` | Unterlagen |
| `/#contact` | Kontakt |

**Lightbox-Deeplinks (öffnen direkt die Lightbox):**
| URL | Element |
|---|---|
| `/#year-of` | Design-Card: Year Of |
| `/#odf-cover` | Design-Card: ODF Cover |
| `/#travis-scott` | Design-Card: Travis Scott |
| `/#ale-cartier-fans` | Mosaic-Foto: Ale Cartier Fans |
| `/#giulio-denken` | Photo Scroll: Giulio Denken |
| `/#kleider-cold` | Photo Scroll: Kleider Cold |
| `/#lana-baseballschlaeger` | Photo Scroll: Lana Baseballschläger |
| `/#white-boy-verzoegert` | Photo Scroll: White Boy Verzögert |
| `/#boy-glasse` | Photo Scroll: Boy Glasse |

**Neue Lightbox-Deeplinks hinzufügen:** `data-id="slug"` am Element setzen — der JS-Deeplink-Handler in der Lightbox-IIFE erledigt den Rest automatisch. Bei `.ps-item` immer nur zur ersten Instanz (nicht dem Duplikat für den Loop).

## Dokumente (Dokumente/)

| Datei | HTML-Link |
|---|---|
| `CV_Noah-Habteab.pdf` | Lebenslauf |
| `UEK-Noten_Noah-Habteab.pdf` | ÜK Noten |
| `Zeugnis.pdf` | Zeugnis |
| `Bildungsberichte.pdf` | Bildungsbericht |
| `PDF_Portfolio.pdf` | PDF Portfolio |

## Was noch offen sein könnte

- Texte für einzelne Projekte können jederzeit in den `data-desc` Attributen angepasst werden
- Responsive Verhalten auf Mobile getestet (Lightbox stackt vertikal unter 768px)
- `Videos/Short_film.mp4` kann lokal gelöscht werden (läuft jetzt über YouTube)
- `Videos/Eritrea_Recap.mp4` kann lokal gelöscht werden (läuft jetzt über YouTube)
- DNS und Hosting für noah-habteab.ch ist eingerichtet (Stand: Juni 2026)
