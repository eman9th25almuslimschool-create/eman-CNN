// Page navigation
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('active'));
  if (page === 'home') document.querySelector('.nav-link').classList.add('active');
  window.scrollTo({top:0, behavior:'smooth'});
}

// Category tabs
function switchCat(id, el) {
  document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.cat-content').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('cat-' + id).classList.add('active');
}

// Search toggle
function toggleSearch() {
  const sb = document.getElementById('searchBar');
  sb.classList.toggle('open');
  if (sb.classList.contains('open')) {
    document.getElementById('searchInput').focus();
  }
}

// Dark mode
let isDark = false;
function toggleTheme() {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  document.getElementById('themeBtn').textContent = isDark ? '☀️' : '🌙';
}

// Poll voting
let voted = false;
function vote(el, pct) {
  if (voted) return;
  voted = true;
  document.querySelectorAll('.poll-opt').forEach(o => {
    o.style.cursor = 'default';
  });
  el.classList.add('voted');
  el.querySelector('.poll-pct').style.color = 'var(--red)';
  el.querySelector('.poll-pct').style.fontWeight = '900';
}

// Live updates ticker — add new entry every 30s
let liveCount = 4;
const liveHeadlines = [
  {time:'11:02', title:'وزیر داخلہ کا پریس کانفرنس — نئے سیکیورٹی اقدامات', body:'ملک بھر میں سیکیورٹی بڑھائی جائے گی'},
  {time:'11:15', title:'روپے کی قدر میں مزید بہتری — 276 پر آ گیا', body:'زرمبادلہ ذخائر میں اضافہ'},
  {time:'11:28', title:'پی ایس ایل — آج کا میچ لاہور میں شام 7 بجے', body:'قلندرز بمقابلہ سلطانز — فائنل'},
];
let lhIdx = 0;

setInterval(() => {
  if (lhIdx >= liveHeadlines.length) return;
  const h = liveHeadlines[lhIdx++];
  const feed = document.getElementById('live-feed');
  const entry = document.createElement('div');
  entry.className = 'live-entry';
  entry.onclick = () => showPage('article');
  entry.innerHTML = `
    <div class="live-time" style="color:var(--red);">${h.time}</div>
    <div class="live-dot-line"><div class="live-circle"></div></div>
    <div class="live-entry-body"><h4><span class="live-new">نیا</span>${h.title}</h4><p>${h.body}</p></div>
  `;
  entry.style.opacity = '0';
  entry.style.transform = 'translateY(-10px)';
  feed.insertBefore(entry, feed.firstChild);
  requestAnimationFrame(() => {
    entry.style.transition = 'opacity 0.5s, transform 0.5s';
    entry.style.opacity = '1';
    entry.style.transform = 'translateY(0)';
  });
}, 30000);
