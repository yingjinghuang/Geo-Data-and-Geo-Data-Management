const weeks = [
  ['Geodata in the Wild', 'What counts as geodata in the real world, and what do we need to know before using it?'],
  ['Vector Data: Geometry and CRS', 'How can discrete geographic phenomena be represented as vector features, and why do coordinates need a CRS?'],
  ['Raster Data: Grids, Georeferencing and Metadata', 'How can sampled fields and imagery become georeferenced raster data?'],
  ['Relating Heterogeneous Geodata', 'How do we decide when records or vector features from different sources meaningfully correspond?'],
  ['Integrating Different Spatial Supports', 'How can grids, points and zones be related without losing spatial meaning?'],
  ['Midterm exam', 'Individual mastery of the foundations from Weeks 1–5.'],
  ['Geodata standards and interoperability', 'How can different systems agree on the structure and meaning of geodata?'],
  ['File-based geodata storage', 'How should the same logical geodata be packaged for different uses?'],
  ['Spatial databases and SQL', 'When do related geodata become easier to manage as tables, relationships and queries rather than loose files?'],
  ['Reproducible geodata management', 'What makes geodata and a geodata workflow trustworthy, traceable and reusable?'],
  ['Final Project Presentations', 'How can a team communicate and defend a coherent GeoData project?']
];

document.head.insertAdjacentHTML('beforeend', '<link rel="icon" href="img/favicon.svg" type="image/svg+xml">');

const weekContent = document.getElementById('weekContent');
if (weekContent) {
  const number = Number(document.body.dataset.week);
  const summary = weeks[number - 1];
  document.title = `Week ${number}: ${summary[0]} · Geo-Data 2026W`;
  weekContent.innerHTML = `
    <header class="hero">
      <h1>Week ${number}: ${summary[0]}</h1>
      <p>${summary[1]}</p>
    </header>
    <h2>Week Content</h2>
    <div class="callout"><strong>To be updated.</strong> Detailed lecture content, lab materials, and weekly checkpoint information will be published later.</div>
  `;
}

const nav = document.getElementById('weekNav');
if (nav) {
  const current = document.body.dataset.week;
  const hiddenWeeks = new Set([6, 11]);
  nav.innerHTML = weeks.map((week, index) => {
    const number = index + 1;
    if (hiddenWeeks.has(number)) return '';
    return `<a href="week${number}.html" class="${current == number ? 'active' : ''}"><span>W${number}</span>${week[0]}</a>`;
  }).join('');
}
const sidebarNav = document.querySelector('#sidebar nav');
if (sidebarNav && !document.querySelector('.project-nav-added')) {
  const page = document.body.dataset.page || '';
  sidebarNav.insertAdjacentHTML('beforeend', `<div class="project-nav-added"><div class="nav-title nav-project-title">Course Project</div><div class="week-nav"><a href="project-proposal.html" class="${page === 'project-proposal' ? 'active' : ''}"><span>PP</span>Project Proposal</a><a href="final-project.html" class="${page === 'final-project' ? 'active' : ''}"><span>FP</span>Final Project</a></div></div>`);
}
if (weekContent && !weekContent.querySelector('.footer')) weekContent.insertAdjacentHTML('beforeend','<footer class="footer">Geo-Data and Geo-Data Management · University of Vienna · 2026W</footer>');

const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) root.dataset.theme = savedTheme;

function updateThemeIcon() {
  if (themeToggle) themeToggle.textContent = root.dataset.theme === 'dark' ? '☀' : '☾';
}
updateThemeIcon();
themeToggle?.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', root.dataset.theme);
  updateThemeIcon();
});

const sidebar = document.getElementById('sidebar');
const backdrop = document.getElementById('backdrop');
document.getElementById('menuToggle')?.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  backdrop.classList.toggle('show');
});
backdrop?.addEventListener('click', () => {
  sidebar.classList.remove('open');
  backdrop.classList.remove('show');
});