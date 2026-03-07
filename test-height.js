const { JSDOM } = require("jsdom");
const fs = require('fs');

const css = fs.readFileSync('styles.css', 'utf8');

const html = `
<!DOCTYPE html>
<html>
<head><style>${css}</style></head>
<body>
  <div class="level-tile current" data-level="1">
    <div class="lt-top">
      <div class="lt-number">A</div>
    </div>
    <div class="lt-body">
      <div class="lt-title">Level 1</div>
      <div class="lt-subtitle">Level 1 subtitle with some text that might wrap properly? No wait.</div>
    </div>
    <div class="lt-bottom">
      <div class="lt-stars"><span class="lt-star earned">★</span></div>
    </div>
  </div>
</body>
</html>
`;

const jsdom = new JSDOM(html);
const el = jsdom.window.document.querySelector('.level-tile');
console.log('We cannot get computed height well without full styling engine, but we can sum margins and paddings.');
