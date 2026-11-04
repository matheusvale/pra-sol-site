// Run from the site folder after adding a work to portfolio-data.js.
const fs = require('node:fs');
const vm = require('node:vm');
const works = vm.runInNewContext(fs.readFileSync('portfolio-data.js', 'utf8') + '\nPRASOL_WORKS;');
const escape = value => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const cards = works.map(work => {
  const {id, name, description, photos, tone, category} = work;
  for (const photo of photos) {
    for (const suffix of ['', '-card']) {
      if (!fs.existsSync(`assets/images/ambientadas/peca-${photo}${suffix}.webp`)) throw new Error(`Missing photo: ${photo}${suffix}`);
    }
  }
  return `          <article class="work-card" data-category="${escape(category)}">
            <button class="work-image stage-${escape(tone)}" type="button" data-work="${escape(id)}" aria-label="Ver fotos do trabalho ${escape(name)}">
              <img src="assets/images/ambientadas/peca-${photos[0]}-card.webp" width="800" height="533" alt="${category === 'bones' ? 'Boné' : 'Viseira'} produzido pela PraSol para ${escape(name)}" loading="lazy" decoding="async">
              <span class="work-count">Explorar <span aria-hidden="true">↗</span></span>
            </button>
            <div class="work-info"><h3><button type="button" data-work="${escape(id)}">${escape(name)}</button></h3><p>${escape(description)}</p></div>
          </article>`;
}).join('\n');
let html = fs.readFileSync('index.html', 'utf8');
const gridStart = html.indexOf('<div class="works-grid">') + '<div class="works-grid">'.length;
const gridEnd = html.indexOf('\n        </div>', gridStart);
if (gridStart < '<div class="works-grid">'.length || gridEnd < gridStart) throw new Error('Portfolio grid not found');
html = html.slice(0, gridStart) + '\n' + cards + html.slice(gridEnd);
html = html.replace(/(<p class="sr-only" data-work-status aria-live="polite">).*?(<\/p>)/, `$1${works.length} trabalhos$2`);
fs.writeFileSync('index.html', html);
console.log(`${works.length} trabalhos sincronizados.`);
