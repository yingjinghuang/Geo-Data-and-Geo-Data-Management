const weeks = [
  ['What makes data geodata?', 'What makes data geodata, and what context is required to interpret it reliably?'],
  ['Vector representation and CRS', 'How do we represent discrete geographic phenomena, and how does a CRS give coordinates meaning?'],
  ['Raster representation and georeferencing', 'How does a raster turn a sampled field into located geodata?'],
  ['Vector data integration', 'When two vector datasets are combined, what exactly counts as a valid match?'],
  ['Raster and vector–raster integration', 'How do we establish spatial correspondence when integrating rasters with rasters or vectors?'],
  ['Midterm exam', 'Individual mastery of the foundations from Weeks 1–5.'],
  ['Geodata standards and interoperability', 'How can different systems agree on the structure and meaning of geodata?'],
  ['File-based geodata storage', 'How should the same logical geodata be packaged for different uses?'],
  ['Spatial databases and SQL', 'When do related geodata become easier to manage as tables, relationships and queries rather than loose files?'],
  ['Reproducible geodata management', 'What makes geodata and a geodata workflow trustworthy, traceable and reusable?'],
  ['Final Project Presentations', 'How can a team communicate and defend a coherent GeoData project?']
];

document.head.insertAdjacentHTML('beforeend', '<link rel="icon" href="img/favicon.svg" type="image/svg+xml">');

const weekDetails = [
  {part:'Phase 1 · Understand', output:'Geodata inventory with explicit context', concepts:['Data + spatial meaning + context','Location, attributes, time, source and metadata','Dataset vs file vs database; precision vs accuracy'], lab:'Build a small geodata inventory and compare coordinate records by their meaning, reference, source and context.', checkpoint:'A geodata inventory, precision/context comparison and a short reflection on responsible reuse.', tools:'pandas · Jupyter Notebook'},
  {part:'Phase 2 · Represent', output:'Vector features with justified geometry and CRS', concepts:['Representation as a modelling decision','Point, LineString and Polygon + geometry/attribute feature model','Geographic vs projected CRS; set_crs vs to_crs; measurement units'], lab:'Create simple Vienna geometries, inspect a GeoDataFrame, transform CRS and interpret distance or area in appropriate units.', checkpoint:'A GeoDataFrame, before/after CRS comparison, one projected measurement and a short CRS explanation.', tools:'Shapely · GeoPandas · pyproj'},
  {part:'Phase 2 · Represent', output:'Georeferenced raster with inspected profile', concepts:['Grid/cell values versus geographic location','Transform, CRS, resolution, extent and NoData','Row/column ↔ coordinate correspondence'], lab:'Turn a small NumPy array into a georeferenced GeoTIFF, reopen it and inspect the spatial context that locates its cells.', checkpoint:'A raster profile, one row/column-to-coordinate example and a short explanation of why an array alone is not located geodata.', tools:'NumPy · Rasterio'},
  {part:'Phase 3 · Integrate', output:'Verified attribute and spatial matches', concepts:['Matching rules, keys and expected output grain','Cardinality, unmatched records and duplicate matches','Spatial predicates, direction and boundary cases'], lab:'Run one key-based join and one point-in-polygon spatial join, then verify row counts and known cases.', checkpoint:'One attribute join, one spatial join, a verification table and a short explanation of how a successful join can still be wrong.', tools:'pandas · GeoPandas · Shapely'},
  {part:'Phase 3 · Integrate', output:'Small, verified raster integration examples', concepts:['Raster alignment and spatial correspondence','Raster–raster integration with explicit NoData rules','Vector–raster links through point sampling or zonal statistics'], lab:'Diagnose alignment, create one raster–raster result and complete one vector–raster pathway with a manual verification.', checkpoint:'Alignment diagnosis, one raster–raster result, one vector–raster result, one manual verification and a short failure explanation.', tools:'NumPy · Rasterio · GeoPandas'},
  {exam:true, part:'Assessment', range:'Weeks 1–5', abilities:['Interpret vector and raster representations','Read geometry, raster profiles and CRS information','Reason about matching, integration and expected output grain','Use simple calculations and verification evidence to judge results'], types:['Multiple-choice questions','Simple calculations and table reading','Geometry and raster interpretation','CRS and integration judgement'], advice:'Review the weekly core questions, toy examples and lab checkpoints. Focus on what an input represents, what an operation changes and what evidence would verify the result.'},
  {part:'Phase 4 · Exchange, Store & Query', output:'Interoperability diagnosis using WKT, CRS and GeoTIFF examples', concepts:['Shared models, encodings, identifiers and operation semantics','Technical, syntactic and semantic interoperability','Conformance ≠ correctness ≠ fitness for use'], lab:'Round-trip geometry through WKT, compare geometry and CRS descriptions, inspect GeoTIFF context and classify interoperability failures.', checkpoint:'A WKT round trip, metadata inspection, failure classification and a short structure-versus-meaning explanation.', tools:'Shapely · Rasterio', projectNote:'Final project launch and team formation. Course topics are resources, not a checklist.'},
  {part:'Phase 4 · Exchange, Store & Query', output:'Round-trip format comparison and use-case recommendation', concepts:['Logical dataset vs physical representation','Shapefile, GeoJSON, GeoPackage and GeoParquet trade-offs','Write → read back → compare expected invariants'], lab:'Write one source dataset to several formats, read each back and compare geometry, schema/types, CRS, nulls/text and file organisation.', checkpoint:'A storage/file-count table, a round-trip comparison, one preservation/mismatch example and one recommendation with a limitation.', tools:'GeoPandas · pyarrow', projectNote:'Team Project Proposal due this week — 20% of the course grade.'},
  {part:'Phase 4 · Exchange, Store & Query', output:'Small relational/spatial database with verified queries', concepts:['Schema, grain, primary/foreign keys and relationships','SQL as a way to ask repeatable questions','JOIN, spatial predicates, output grain and persistence'], lab:'Create related tables, run representative basic/relationship/spatial queries and close/reopen the database to verify persistence.', checkpoint:'A schema/relationship view, representative queries, a persistence check and a short reflection on when database structure helps.', tools:'DuckDB / SQLite · SQL · Shapely', projectNote:'Project development checkpoint: review bottlenecks, evidence and minimum viable scope.'},
  {part:'Phase 5 · Trust & Reuse', output:'Representative trust/reuse evidence package', concepts:['Metadata/source context and quality/validation','Provenance/lineage and reproducibility/portability','Limitations, responsible reuse and FAIR as a review lens'], lab:'Audit a runnable-but-bad workflow: diagnose evidence gaps, add selected checks and provenance, run one rerun/persistence test and state a limitation/reuse condition.', checkpoint:'One metadata record, selected quality checks, one provenance record, one reproducibility/persistence check and one limitation + reuse note.', tools:'Python · Jupyter · GeoPandas', projectNote:'Use the Week 10 audit lenses selectively on your project; there is no compulsory project pipeline.'},
  {presentation:true, part:'Assessment · Final Project', assessment:'Final project · 30%', format:'Approx. 8 minutes + short Q&A', focus:['Project objective and why it is a GeoData project','The key GeoData issue(s) or decision(s) that mattered','What the team actually did and what evidence supports the result','One important limitation, failure, uncertainty or trade-off','Each member’s contribution and understanding'], package:['Notebook/scripts or other implementation material where relevant','Dataset/database/derived outputs where relevant','Figures, maps, comparison tables, query outputs or other evidence','Concise README/project note and acquisition/reuse instructions where relevant','Short contribution statement'], note:'Projects may go broad or deep. Course topics are resources, not a checklist, and different project types may submit different artifact packages.'}
];

const weekContent = document.getElementById('weekContent');
if (weekContent) {
  const number = Number(document.body.dataset.week);
  const summary = weeks[number - 1];
  const detail = weekDetails[number - 1];
  document.title = `Week ${number}: ${summary[0]} · Geo-Data 2026W`;
  const header = `<header class="hero"><div class="eyebrow">${detail.part}</div><h1>Week ${number}: ${summary[0]}</h1><p>${summary[1]}</p></header>`;
  if (detail.exam) {
    weekContent.innerHTML = header + `<div class="meta-grid"><div class="meta-card"><strong>Assessment</strong>Midterm exam · 40%</div><div class="meta-card"><strong>Coverage</strong>${detail.range}</div><div class="meta-card"><strong>Emphasis</strong>Understanding and application</div></div><h2>What the exam assesses</h2><ul>${detail.abilities.map(x=>`<li>${x}</li>`).join('')}</ul><h2>Question types</h2><ul>${detail.types.map(x=>`<li>${x}</li>`).join('')}</ul><div class="callout"><strong>Preparation</strong><br>${detail.advice}</div><p class="muted">The exact exam time, room and permitted materials will be announced on Moodle.</p>`;
  } else if (detail.presentation) {
    weekContent.innerHTML = header + `<div class="meta-grid"><div class="meta-card"><strong>Assessment</strong>${detail.assessment}</div><div class="meta-card"><strong>Format</strong>${detail.format}</div><div class="meta-card"><strong>Class format</strong>Team presentation + Q&A</div></div><h2>Presentation focus</h2><ul>${detail.focus.map(x=>`<li>${x}</li>`).join('')}</ul><h2>Project package</h2><ul>${detail.package.map(x=>`<li>${x}</li>`).join('')}</ul><div class="callout"><strong>Project principle</strong><br>${detail.note}</div><p class="muted">Exact presentation timing, order and Moodle upload instructions will be announced separately.</p>`;
  } else {
    const projectBlock = detail.projectNote ? `<h2>Project timeline</h2><div class="callout">${detail.projectNote}</div>` : '';
    weekContent.innerHTML = header + `<div class="core-question"><strong>This week’s question</strong><br>${summary[1]}</div><div class="meta-grid"><div class="meta-card"><strong>Main output</strong>${detail.output}</div><div class="meta-card"><strong>Environment</strong>${detail.tools}</div><div class="meta-card"><strong>Class format</strong>Concept + guided lab + task</div></div><h2>Learning focus</h2><ul>${detail.concepts.map(x=>`<li>${x}</li>`).join('')}</ul><h2>Lecture and lab</h2><p>${detail.lab}</p><p>The session uses hand-checkable examples and guided notebook work. Keep enough intermediate evidence visible to explain important decisions and verify results.</p><h2>Participation checkpoint</h2><div class="callout">${detail.checkpoint}<br><span class="muted">Keep the result in this week’s <code>.ipynb</code>. Representative evidence and clear reasoning matter more than completion volume.</span></div>${projectBlock}<h2>Materials</h2><span class="resource">Slides · coming soon</span><span class="resource">Notebook · coming soon</span><span class="resource">Data · coming soon</span><p class="muted">Core lab data will be provided or cached so the session does not depend on a live API or fast internet connection.</p>`;
  }
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