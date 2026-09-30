"""Verify production HTML, navigation, assets, and live HTTP responses."""
from html.parser import HTMLParser
from html import unescape
from pathlib import Path
from urllib.request import urlopen
from hashlib import sha256
import sys

ROOT = Path(__file__).resolve().parents[1]
PAGES = ['index', 'about', 'amr', 'nexcube', 'hexapod', 'mini-agv', 'printed-lens', 'merc', 'hand-gesture']

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.tags = []
        self.feed(text)
    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))

base = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:4173'
assets = set()
for i, slug in enumerate(PAGES):
    name = slug + '.html'
    text = (ROOT / 'dist' / name).read_text(encoding='utf-8')
    page = Page(text)
    assert sum(t == 'h1' for t, a in page.tags) == 1, name
    current = [a for t, a in page.tags if a.get('aria-current') == 'page']
    assert len(current) == 1 and current[0]['href'] == './' + name, name
    for rel, offset in [('prev', -1), ('next', 1)]:
        link = next(a for t, a in page.tags if a.get('rel') == rel)
        assert link['href'] == './' + PAGES[(i + offset) % 9] + '.html', name
    if i >= 2:
        assert sum(t == 'dt' for t, a in page.tags) == 3, name
        assert 'Engineering Approach' in text and 'Results &amp; Achievements' in text
        assert 'Main Tools' in text and 'Evidence limits' in text
        sections = [a for t, a in page.tags if t == 'article' and 'case-section' in a.get('class', '')]
        assert 2 <= len(sections) <= 4, name
    assert 'currently unavailable' not in text and 'not yet verified' not in text, name
    if i == 0:
        assert any(t == 'a' and a.get('href') == './about.html' for t, a in page.tags)
        for destination in ['tel:+84375255155', 'mailto:huyhuzg@gmail.com', 'https://github.com/HryHung', 'https://www.linkedin.com/in/hung-le-huy-09823627b/']:
            assert any(t == 'a' and a.get('href') == destination for t, a in page.tags), destination
        cv = next(a for t, a in page.tags if t == 'a' and 'download' in a)
        with urlopen(base + '/' + cv['href'].lstrip('./')) as response:
            downloaded = response.read()
            assert response.headers.get_content_type() == 'application/pdf'
        original = (ROOT / 'asset/file/CV_LeHuyHung.pdf').read_bytes()
        assert downloaded.startswith(b'%PDF-') and sha256(downloaded).digest() == sha256(original).digest()
        print('PASS CV download: PDF content type and exact SHA-256 match to original')
    if i == 1:
        for phrase in ['May 2024', 'Feb 2025', 'Jun 2025', 'Sep 2025', 'May 2025', 'New Product Development Engineer Intern', 'Senior Member &amp; Mentor', 'TOEIC 820']:
            assert unescape(phrase) in unescape(text), (name, phrase)
    assert any(t == 'meta' and a.get('name') == 'description' and a.get('content') for t, a in page.tags)
    assert any(t == 'title' for t, a in page.tags)
    for destination in PAGES:
        assert any(t == 'a' and a.get('href') == './' + destination + '.html' for t, a in page.tags), (name, destination)
    for t, a in page.tags:
        if t == 'img' and a.get('src'):
            decorative = 'home-backdrop' in a.get('class', '') and a.get('alt') == ''
            assert (a.get('alt') or decorative) and a.get('width') and a.get('height'), (name, a)
        for key in ['src', 'href']:
            value = a.get(key, '')
            if not value or value.startswith(('http', '#', 'tel:', 'mailto:')):
                continue
            file = ROOT / 'dist' / value.lstrip('./')
            assert file.is_file(), (name, value)
            assets.add('/' + value.lstrip('./'))
    with urlopen(base + '/' + name) as response:
        assert response.status == 200
        assert '<h1' in response.read().decode()
    print('PASS', name, 'direct HTTP, metadata, navigation, image references')
for asset in assets:
    with urlopen(base + asset) as response:
        assert response.status == 200
print(f'PASS {len(assets)} linked production resources over HTTP')
print('Browser layout, console, keyboard and touch tests require a connected browser; not covered here.')
