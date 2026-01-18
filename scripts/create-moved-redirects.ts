import fs from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';

const DIST_DIR = path.resolve(process.cwd(), '.vitepress/dist');

const redirects = {
  '日本/北海道/景點/大沼國定公園': '日本/北海道/函館/景點/大沼國定公園',
  '日本/北海道/景點/北海道神宮': '日本/北海道/札幌/景點/北海道神宮',
  '日本/北海道/景點/函館山': '日本/北海道/函館/景點/函館山',
};

function ensureDistDirExists() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error(`Error: Dist directory not found at ${DIST_DIR}. Please run build first.`);
    process.exit(1);
  }
}

function injectRedirectMeta(content: string, targetUrl: string): string {
  const $ = cheerio.load(content);
  const existingMeta = $('meta[http-equiv="refresh"]');
  
  if (existingMeta.length > 0) {
    existingMeta.attr('content', `0; url=${targetUrl}`);
  } else {
    $('head').prepend(`<meta http-equiv="refresh" content="0; url=${targetUrl}">`);
  }
  
  return $.html();
}

function createRedirectFile(oldPath: string, newPath: string) {
  const sourceHtmlPath = path.join(DIST_DIR, `${newPath}.html`);
  const destHtmlPath = path.join(DIST_DIR, `${oldPath}.html`);
  const targetUrl = '/' + newPath;

  if (!fs.existsSync(sourceHtmlPath)) {
    console.warn(`Warning: Target build file not found: ${sourceHtmlPath} (for redirect ${oldPath})`);
    return;
  }

  try {
    const content = fs.readFileSync(sourceHtmlPath, 'utf-8');
    const newContent = injectRedirectMeta(content, targetUrl);

    const destDir = path.dirname(destHtmlPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    fs.writeFileSync(destHtmlPath, newContent);
    console.log(`Created redirect: ${oldPath}.html -> ${targetUrl}`);
  } catch (err) {
    console.error(`Failed to create redirect for ${oldPath}:`, err);
  }
}

async function run() {
  ensureDistDirExists();

  for (const [oldPath, newPath] of Object.entries(redirects)) {
    createRedirectFile(oldPath, newPath);
  }
}

run();
