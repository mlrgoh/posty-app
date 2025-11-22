const express = require('express');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const app = express();
const PORT = process.env.PORT || 3000;

const postsDir = path.join(__dirname, 'posts');
const viewsDir = path.join(__dirname, 'views');

if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true });

app.set('view engine', 'ejs');
app.set('views', viewsDir);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

function slugify(str) {
  return String(str)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function listPosts() {
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
  const posts = files.map(fname => {
    const full = path.join(postsDir, fname);
    const stat = fs.statSync(full);
    const slug = path.basename(fname, '.md');
    let title = slug;
    try {
      const head = fs.readFileSync(full, 'utf8').slice(0, 2000);
      const m = head.match(/^#\s+(.+)$/m);
      if (m) title = m[1].trim();
    } catch (e) {}
    return { fname, slug, title, mtime: stat.mtime };
  });
  posts.sort((a,b) => b.mtime - a.mtime);
  return posts;
}

app.get('/', (req, res) => {
  const posts = listPosts();
  res.render('index', { posts });
});

app.get('/posts/:slug', (req, res) => {
  const slug = req.params.slug;
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
  const match = files.find(f => path.basename(f, '.md') === slug);
  if (!match) return res.status(404).send('Post not found');
  const content = fs.readFileSync(path.join(postsDir, match), 'utf8');
  const html = marked.parse(content);
  // extract title
  const m = content.match(/^#\s+(.+)$/m);
  const title = m ? m[1].trim() : slug;
  res.render('post', { title, html, slug });
});

app.get('/new', (req, res) => {
  res.render('new');
});

app.post('/new', (req, res) => {
  const title = (req.body.title || '').trim();
  const body = (req.body.content || '').trim();
  const safeTitle = title || 'untitled';
  const slug = slugify(safeTitle) || String(Date.now());
  const filename = `${Date.now()}-${slug}.md`;
  const toWrite = `# ${safeTitle}\n\n${body}\n`;
  fs.writeFileSync(path.join(postsDir, filename), toWrite, 'utf8');
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Posty app listening on http://localhost:${PORT}`);
});