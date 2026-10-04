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

const weekDetails = [
  {part:'Read / Interpret', output:'Geodata Source Inventory', concepts:['Geodata in the wild: OSM, official open data, imagery, GPS, geotagged media, LiDAR, transit feeds and gazetteers','Source ≠ modality ≠ representation ≠ storage / access','Inspection routine: Unit · Space · Time · Source · Meaning · Missingness','Dataset as a logical collection; file / database / API / service as storage or access mechanisms'], lab:'After a short Jupyter onboarding, inspect several small geodata examples and build a source inventory.', checkpoint:'Complete the inventory for at least four examples, classify one example through the four layers, and write a short reflection on what you would need to know before using it in an analysis.', tools:'pandas · Jupyter Notebook'},
  {part:'Represent', output:'Vector features with justified geometry and CRS', concepts:['Vector as a foundational representation for discrete geographic objects and boundaries','Point, LineString and Polygon + geometry/attribute feature model','Geographic vs projected CRS; set_crs vs to_crs; measurement units'], lab:'Create and inspect vector features, transform CRS and interpret a projected measurement.', checkpoint:'A GeoDataFrame, before/after CRS comparison, one projected measurement and a short representation explanation.', tools:'Shapely · GeoPandas · pyproj'},
  {part:'Represent', output:'Georeferenced raster with inspected profile', concepts:['Raster as a foundational representation for sampled fields and imagery','Grid/cell values versus geographic location','Transform, CRS, resolution, extent and NoData','Observation context can include acquisition time, bands and sensor metadata'], lab:'Create a small georeferenced raster and inspect the spatial context that locates its cells.', checkpoint:'A raster profile, one row/column-to-coordinate example and a short interpretation.', tools:'NumPy · Rasterio'},
  {part:'Relate / Integrate', output:'Verified record and feature matches', concepts:['Heterogeneous geodata as a matching problem','Shared keys, expected output grain and cardinality','Spatial predicates, direction and boundary cases','Verification through unmatched records, duplicates and known cases'], lab:'Run one key-based join and one spatial join, then verify the matches.', checkpoint:'One attribute join, one spatial join, a verification table and a short matching explanation.', tools:'pandas · GeoPandas · Shapely'},
  {part:'Relate / Integrate', output:'Verified raster and vector–raster integration examples', concepts:['Spatial correspondence across grids, points and zones','Raster alignment: CRS, resolution, extent, origin / transform and NoData','Mosaic and simple cell-wise operations','Point sampling or zonal statistics'], lab:'Diagnose alignment, create a raster–raster result and complete one vector–raster pathway.', checkpoint:'Alignment diagnosis, one raster–raster result, one vector–raster result and one manual verification.', tools:'NumPy · Rasterio · GeoPandas'},
  {exam:true, part:'Assessment', range:'Weeks 1–5', abilities:['Read unfamiliar geodata using the Week 1 inspection questions','Interpret vector and raster representations and CRS/georeferencing information','Reason about matching, integration and expected output grain','Use verification evidence to judge results'], types:['Multiple-choice questions','Simple calculations and table reading','Geometry and raster interpretation','CRS and integration judgement'], advice:'Review the weekly core questions, examples and lab checkpoints.'},
  {part:'Exchange, Store & Query', output:'Interoperability diagnosis using representative encodings and metadata', concepts:['Shared models, encodings, identifiers and operation semantics','Technical, syntactic and semantic interoperability','WKT/WKB, CRS definitions and GeoTIFF metadata','Conformance ≠ correctness ≠ fitness for use'], lab:'Round-trip geometry, compare CRS descriptions, inspect GeoTIFF context and classify failures.', checkpoint:'A round trip, metadata inspection, failure classification and a short explanation.', tools:'Shapely · Rasterio', projectNote:'Final project launch and team formation. Project forms are open; course topics are resources, not a checklist.'},
  {part:'Exchange, Store & Query', output:'Round-trip format comparison and use-case recommendation', concepts:['Logical dataset vs physical representation','Representative vector/raster formats and trade-offs','Write → read back → compare expected invariants'], lab:'Write one source dataset to several formats, read each back and compare preservation.', checkpoint:'A round-trip comparison, one mismatch example and one recommendation with a limitation.', tools:'GeoPandas · pyarrow', projectNote:'Team Project Proposal due this week — 20% of the course grade.'},
  {part:'Exchange, Store & Query', output:'Small relational/spatial database with verified queries', concepts:['Schema, grain, primary/foreign keys and relationships','SQL as repeatable questions','JOIN, spatial predicates and output grain','Persistence and verification'], lab:'Create related tables, run representative queries and verify persistence.', checkpoint:'A schema/relationship view, representative queries, a persistence check and a short reflection.', tools:'DuckDB / SQLite · SQL · Shapely', projectNote:'Project development checkpoint: review bottlenecks, evidence and minimum viable scope.'},
  {part:'Trust / Reuse', output:'Representative trust/reuse evidence package', concepts:['Metadata/source context and quality/validation','Provenance/lineage and reproducibility/portability','Limitations, responsible reuse and FAIR as a review lens','Source/modalities can carry different temporal coverage, bias, licences and uncertainty'], lab:'Audit a runnable-but-bad workflow, add selected checks and provenance, and state a limitation/reuse condition.', checkpoint:'Metadata, selected checks, provenance, one reproducibility/persistence check and one limitation + reuse note.', tools:'Python · Jupyter · GeoPandas', projectNote:'Use the Week 10 audit lenses selectively on your project; there is no compulsory project pipeline.'},
  {presentation:true, part:'Assessment · Final Project', assessment:'Final project · 30%', format:'Team presentation + short Q&A', focus:['Project objective and why it is a GeoData project','The GeoData problem, decision or question that mattered most','What the team built, investigated, compared, evaluated or extended','What evidence supports the answer, solution, comparison or finding','One important limitation, failure, uncertainty or trade-off','Each member’s contribution and understanding'], package:['The project output appropriate to the work: database, dataset, benchmark, workflow, analysis, prototype or empirical finding','Implementation material where relevant','Figures, maps, comparison tables, query outputs or other evidence','Concise documentation / README and reuse or acquisition notes where relevant','Short contribution statement'], note:'The final project is open-ended in form but GeoData-centred in reasoning. The presentation is one part of communicating and defending the broader project, not the project itself.'}
];

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