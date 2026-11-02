# Kahaani Class — how to build one chapter lesson

You are building ONE chapter of the Kahaani Class app: an animated, voice-narrated **story lesson** (an HTML page) plus a **quiz & sample-paper pack** (JSON), for an Indian NCERT textbook chapter. Quality bar: the existing published lessons. Study them before you write anything.

Work ONLY inside `/home/user/kahaani/chapters/<ID>/` (create it). Never edit anything else under `/home/user/kahaani/` (template/, build.js, check.js, parts/, ref/ are shared by other agents working in parallel).

## 1. Read first (mandatory)

1. The textbook chapter text: `/home/user/kahaani/ncert/<code>.txt` (from `pdftotext -layout`). The PDF is next to it; to see a figure, render pages: `pdftoppm -png -r 60 -f N -l N file.pdf /tmp/<ID>-p` then view the PNG.
2. The gold-standard example lesson, split in parts:
   - `/home/user/kahaani/parts/g7-maths-104.data.js` — the chapter data (BOOK constants + `CHAPTERS.push({...})`). Note how EVERY section, in-text question, "Figure it Out", "Try This", "Math Talk" of the textbook chapter is covered, in textbook order, with `ref` pointing to the page/question.
   - `/home/user/kahaani/parts/g7-maths-104.chap.js` — that chapter's own code: custom simulations (`SIM_DEF.xxx = {...}`), a 3D sim built with `make3D`, an animated background scene (`SCENES.xxx`), and the guide character SVG (`GUIDES.xxx`).
   - Also skim `/home/user/kahaani/parts/g2-maths-04.data.js` + `.chap.js` (a Class 2 lesson, simpler language) and `/home/user/kahaani/parts/g7-maths-101.chap.js` (geometry sims).
3. The engine (read to know the exact APIs; do not copy it): `/home/user/kahaani/template/engA.js` (visual kinds `V()`, built-in `SIM_DEF` sims, `mountSim` API, `make3D` helper, `GUIDES`, `SCENES`) and `/home/user/kahaani/template/tail.js` (step flow, scoring, answer checking, notebook / summary / answer key pages).

## 2. Files you must produce in `chapters/<ID>/`

### meta.json
```json
{ "title": "<BOOK_TITLE, the story title>", "desc": "Animated story lessons for <Book> Grade <g>, Chapter <n>: <Chapter title>.", "lang": "en" }
```
(`lang` is `"hi"` for Hindi/Sanskrit books.)

### data.js
Must start exactly with `const BOOK_TITLE = ` and contain:
```js
const BOOK_TITLE = "<Story title, e.g. 'Kachhu and the Moon Rocket'>";
const GRADE = "7";
const BOOK = { ...given in your task... };
const CHAPTERS = [];
CHAPTERS.push({ no, title, story, intro, theme:{scene,guide,guideName,unit,doneStamp,badge}, people:{...}, cases:[...], summary:[[head,text],...] });
```
- `no` = the chapter number shown to students (the textbook's number). `title` = the exact textbook chapter title.
- `theme`: `scene`/`guide` are names you register in chap.js; `unit` is what a part is called in your story (e.g. "Countdown", "Platform", "Stall"); `doneStamp` e.g. "SYSTEM GO"; `badge` the certificate title.
- `people`: the textbook's own characters (use their names), as `{ "<prefix>_name": {name, skin, hair: short|long|curly|bun|turban, bg, shirt, acc?} }`. Indian skin tones.
- `cases`: **at most 8 parts** (fewer if the chapter is short; merge small sections), following the textbook's sections in order. Each case: `{title, sec:"<n.m Section name>", icon:"<inline <svg viewBox='0 0 48 48'>…</svg>>", brief, steps:[…]}`.
- `steps` (aim for 8–14 per case; the whole chapter about 80–100 steps). Step kinds:
  - `t:"s"` story/teaching step: `{t:"s", who, say, note, xs:[…explanation lines…], v, xa?}` — `note` is the notebook key idea; `xs` are 3–5 short lines read aloud one by one; `xa[i]` (optional) drives the sim in sync with `xs[i]`: `{set:{param:value}}`, `{show:"readKey,readKey"|"all"|"none"}`, `{hl:"partName"}`, or `null`.
  - `t:"m"` multiple choice: `{t:"m", who, say, q, o:[4 options], a:<index>, h:"hint", xs:[step-by-step explanation], ref:"In-text question, p. 67", v, xa?}`. Spread correct answers over A–D. Distractors must be the real mistakes students make.
  - `t:"n"` numeric answer: `{t:"n", …, q, ans:<number>, u?:"unit", pre?:"₹", tol?, h, xs, ref, v}`.
  - `t:"x"` hands-on challenge: `{t:"x", …, q, goal:{param:value}, goalTol?, h, xs, ref, v:{k:"sim", sim, p:{…, slider:"param1,param2"}}}` — the student moves sliders to reach `goal`. Every goal key must be a slider, and the goal value must lie on the slider's range/step (`rng` in the sim).
  - `t:"o"` open task (Draw / Construct / Discuss / Explain / Activity / Project / Think): `{t:"o", kind, …, q, xs:[model answer lines], ref, v}`.
  - `who` = `"guide"` or a key of `people`. `say` = what the character says (natural, warm, story voice, 1–3 sentences). Fractions are written `[3/10]` (rendered as stacked fractions and read aloud). Use `×`, `÷`, `−` characters.
- Almost every step should have a visual `v`. Prefer your own sims `{k:"sim", sim:"<prefix>_name", p:{…}}`; also usable: `{k:"table", head, rows, cap}`, `{k:"lines", l:[…]}`, `{k:"svg", svg:"<svg…>", cap}`, `{k:"bar"…}`, `{k:"bars"…}`, `{k:"grid", n}`, and the built-in sims in engA.js (`hundred, fracbar, partof, change, shop, compound, discounts, mix, balance`).
- `summary`: 6–9 `[heading, one-paragraph explanation]` pairs of the chapter's big ideas.
- COVER THE WHOLE CHAPTER: every section, every in-text question, every exercise question ("Figure it Out", "Try This", "Math Talk", "Let us…", activities, puzzles). A question with a single answer becomes `m`/`n`/`x`; a question asking to draw/explain/discuss/project becomes `o` with a model answer. Put the textbook reference in `ref`.

### chap.js
Exactly one IIFE: starts with `(function(){` and ends with `})();`. Inside, register (with a unique prefix for this chapter, e.g. `k7m1_` for class 7 maths ch 1; the task gives it):
- **5 custom 2D sims** `SIM_DEF.<prefix>_x = { def, rng, lab, reads, draw(D,P,sh,hl){ return {svg, reads} } }` — animated SVG that teaches the actual concept (number lines, place-value boards, balance scales, geometry constructions with angles, circuits, particle models, maps, timelines…). `D` = animated (tweened) values, `P` = target values, `sh` = Set of shown reads, `hl` = highlighted part (mark parts with `data-part` and add `class="hl"` when `hl===part`). Keep every drawing inside its viewBox, readable at phone width, using the CSS colour variables (`var(--mari)`, `--rani`, `--teal`, `--sky`, `--ink`, `--muted`, `--manila`, `--night`…).
- **1 3D sim** using `make3D(stage, opts)` (`init(stage,I)` returning `{update(D,P,sh,hl), dispose()}`, plus `readouts(P,sh)`), like `v4g7c4_*` in the example. Three.js r128 is global `THREE`.
- `SCENES.<prefix>_<world> = function(t){…}` — an animated canvas background for your story world, drawing on `bctx` (see `drawMela` in engA.js and the example scene). Must end with `if(!RM) requestAnimationFrame(drawBg);`.
- `GUIDES.<prefix>_<guide> = () => \`<svg class="guide …" viewBox="0 0 120 130">…</svg>\`` — your guide character (an Indian animal/object with personality).
- Nothing else global: no `const` outside the IIFE, no network, no external images, fonts or libraries.

### content.json (quiz + sample papers)
```json
{ "grade": 7, "chapter": <chapter column number>, "n": <chapter number shown>, "title": "<textbook chapter title>", "book": "<book label from your task>",
  "quiz": [ {"q":"…","o":["…","…","…","…"],"a":0,"why":"one-line reason"} ×10 ],
  "papers": [ {"title":"Sample Paper 1","marks":30,"minutes":40,"sections":[
      {"name":"Section A — Multiple choice","each":1,"qs":[{"q":"…","o":[4],"a":1,"ans":"why it is right"} ×6]},
      {"name":"Section B — Very short answer","each":2,"qs":[{"q":"…","ans":"model answer with (1 mark) splits"} ×4]},
      {"name":"Section C — Short answer","each":3,"qs":[… ×2]},
      {"name":"Section D — Long answer / case based","each":5,"qs":[… ×2]} ]} ×5 ] }
```
(Use the paper pattern your task gives; the one above is for Classes 6–8.) All 5 papers different; questions in CBSE style, tied to this chapter; model answers show working and mark splits. Quiz answers spread over a=0..3.

## 3. Check, look, fix — until clean

```bash
cd /home/user/kahaani
node check.js <ID>            # static checks + headless play-through of every step; must print PASS
node shoot.js <ID> 1:1 1:3 4:2 # screenshots of chosen case:step → dist/<ID>-c1-s1.png …  (view them!)
```
- `check.js` must PASS (ignore nothing it reports). It also writes `dist/<ID>.png`.
- View screenshots of at most 5 steps covering every sim you wrote (including the 3D ones and the hands-on challenges after `xa` runs). Fix anything clipped, overlapping, unreadable, empty or ugly. Text inside SVGs must not overflow.
- Verify mathematically/factually EVERY answer (`a`, `ans`, `goal`, quiz, paper answers) against the textbook. Wrong answers are the worst possible defect.

## 3b. Never give the answer away
For every question step (`m`, `n`, `x`), the visual shown BEFORE the student answers must not display the answer: start the sim with `show:"none"` (or only the reads that are givens), keep result labels as "?", and reveal the answer through `xa` in the explanation (`xa:[{show:"all"},…]`). Check this in your screenshots.

## 4. Language & tone
- Classes 1–5: very simple words, short sentences. Classes 6–8: clear, friendly, precise. Use Indian names, places, festivals, food, money (₹) as the textbook does.
- Facts must match the NCERT chapter. Do not invent textbook page numbers — take them from the text (page numbers appear in the .txt).
- Hindi/Sanskrit books: write all student-facing text in that language (Devanagari); `lang:"hi"` in meta and `BOOK.lang:"hi"`.

## 5. When done
Reply with: the ID, check.js result line, number of cases/steps/questions, list of sims, and anything from the chapter you could not cover (should be nothing).
