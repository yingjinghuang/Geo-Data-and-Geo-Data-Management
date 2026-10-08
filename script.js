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
  const weekOneContent = `
    <header class="hero">
      <h1>Week 1: Geodata in the Wild</h1>
      <p>What counts as geodata in the real world, and what do we need to know before using it?</p>
    </header>

    <div class="core-question">
      <strong>Core idea</strong><br>
      Geodata is a broad family of data with spatial meaning. This week we look across different sources and forms of geodata before focusing on particular representations in later weeks.
    </div>

    <h2>What we will do</h2>
    <div class="card-grid">
      <div class="card">
        <h3>Geodata in the Wild</h3>
        <p>Explore examples including OpenStreetMap, remote-sensing imagery, street-level imagery, LiDAR and point clouds, GPS trajectories, and city open data.</p>
      </div>
      <div class="card">
        <h3>Understand four different layers</h3>
        <p>Separate <strong>source</strong>, <strong>information type</strong>, <strong>representation</strong>, and <strong>storage &amp; access</strong> instead of treating them as one flat list of “data types.”</p>
      </div>
      <div class="card">
        <h3>Learn how to inspect unfamiliar geodata</h3>
        <p>Ask what one observation represents, where its spatial meaning lives, what time and source information are available, what the fields mean, and what may be missing.</p>
      </div>
      <div class="card">
        <h3>Start working in Jupyter</h3>
        <p>Use the course Jupyter environment to acquire, load, inspect, and visualize several different forms of geodata.</p>
      </div>
    </div>

    <h2>A useful framework</h2>
    <div class="meta-grid">
      <div class="meta-card"><strong>Source</strong><span>Where and how did the data originate?</span></div>
      <div class="meta-card"><strong>Information type</strong><span>What information about the world is actually recorded?</span></div>
      <div class="meta-card"><strong>Representation</strong><span>How is geographic meaning encoded computationally?</span></div>
    </div>
    <div class="callout">
      <strong>Storage &amp; access</strong><br>
      How is the information packaged, stored, or retrieved — for example as a file, database, API, service, or cloud resource?
    </div>

    <h2>Key takeaways</h2>
    <ul>
      <li>Geodata is not the same thing as a map, a file format, or a single data model.</li>
      <li>One dataset can combine several kinds of information and can be described at several abstraction levels.</li>
      <li>Vector and raster are foundational spatial representations, but they are not the whole geodata landscape.</li>
      <li>Understanding the source and observation process is part of understanding the data.</li>
      <li>A logical dataset is different from the file, database, API, or service used to store or access it.</li>
    </ul>

    <h2>Lecture slides &amp; lab notebook</h2>
    <div class="card-grid">
      <div class="card">
        <h3>Week 1 lecture slides</h3>
        <p>40-slide course introduction and geodata overview (PDF).</p>
        <p><a class="resource" href="slides/Week1_Introduction.pdf" target="_blank" rel="noopener">View / download slides (PDF) ↗</a></p>
      </div>
      <div class="card">
        <h3>Week 1 lab notebook</h3>
        <p>Acquire, load and visualize vector, raster, trajectory and point-cloud data.</p>
        <p><a class="resource" href="notebooks/Week1_geodata_inventory.ipynb" download>Download notebook (.ipynb) ↓</a></p>
      </div>
    </div>
    <p class="muted">Open the notebook using the IT_Geo kernel in JupyterHub. Moodle is used for checkpoint submissions.</p>

    <h2>Lab: Acquire, load, and visualize geodata</h2>
    <p>In the first lab we repeat the same simple workflow across four examples:</p>
    <div class="card-grid">
      <div class="card"><h3>Vector polygons</h3><p>Load geographic features represented by polygon geometries and make a simple map.</p></div>
      <div class="card"><h3>Raster imagery</h3><p>Open gridded image data and inspect how its values are displayed spatially.</p></div>
      <div class="card"><h3>Trajectory data</h3><p>Work with ordered locations through space and time.</p></div>
      <div class="card"><h3>3D point cloud</h3><p>Inspect a set of x, y, z observations representing three-dimensional structure.</p></div>
    </div>
    <div class="callout">
      <strong>Lab workflow:</strong> acquire → load → inspect → visualize. The goal is not to memorize Python syntax, but to see how different geodata look once they are opened and inspected.
    </div>

    <h2>Checkpoint</h2>
    <p>Choose one of the four data forms, change one parameter, rerun the visualization, and write a few short notes explaining what you changed and what happened. Save the notebook with the outputs visible and submit the completed <code>.ipynb</code> file through Moodle by the end of the day.</p>
  `;

  weekContent.innerHTML = number === 1 ? weekOneContent : `
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