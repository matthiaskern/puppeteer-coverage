const puppeteer = require('puppeteer');
const cTable = require('console.table');

const url = process.argv[2];

const percentage = (a, b) => {
  const val = a / b * 100;
  return isNaN(val) ? '--' : `${val.toFixed(2)}%`;
};

function processCoverage(coverageName, coverage) {
  return coverage.reduce(coverageReducer, {
    measurement: coverageName,
    total: 0,
    used: 0
  });
}

function coverageReducer(entryAccumulation, currentEntry) {
  const total = entryAccumulation.total + currentEntry.text.length;

  let used = entryAccumulation.used;
  for (const range of currentEntry.ranges) {
    used += range.end - range.start - 1;
  }

  return { ...entryAccumulation, total, used };
}

async function runCoverage(browser) {
  const page = await browser.newPage();
  const { coverage } = page;

  // Enable both JavaScript and CSS coverage
  await Promise.all([coverage.startJSCoverage(), coverage.startCSSCoverage()]);

  // Navigate to page
  await page.goto(url);

  // Disable both JavaScript and CSS coverage
  const [jsCoverage, cssCoverage] = await Promise.all([
    coverage.stopJSCoverage(),
    coverage.stopCSSCoverage()
  ]);

  // sum up coverages
  const jsStats = processCoverage('js', jsCoverage);
  const cssStats = processCoverage('css', cssCoverage);
  const totalStats = {
    measurement: 'total',
    total: jsStats.total + cssStats.total,
    used: jsStats.used + cssStats.used
  };

  jsStats.percentage = percentage(jsStats.used, jsStats.total);
  cssStats.percentage = percentage(cssStats.used, cssStats.total);
  totalStats.percentage = percentage(totalStats.used, totalStats.total);

  console.log();
  console.table([jsStats, cssStats, totalStats]);

  await browser.close();
}

puppeteer
  .launch()
  .then(runCoverage)
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
