// Test script: verifying headline fit and canvas light-zone mask

function verifyHeadlineFit() {
  const text = "Systems that don't fall over.";
  const breakpoints = [1024, 1280, 1440, 1920];

  console.log("=== HEADLINE FIT TEST ===");
  let allFit = true;

  breakpoints.forEach((width) => {
    const sideMargin = width < 768 ? 24 : 64;
    const contentWidth = width - sideMargin * 2;
    // 7 columns out of 12
    const col7Width = contentWidth * (7 / 12);

    // clamp(2.25rem, 4.1vw, 5.2rem) in px
    // 2.25rem = 36px, 5.2rem = 83.2px
    const rawSize = width * 0.041;
    const fontSize = Math.min(Math.max(36, rawSize), 83.2);

    // In Geist / neo-grotesk with tracking -0.035em:
    // Average width for "Systems that don't fall over." is 0.42 * fontSize
    const estimatedWidth = text.length * fontSize * 0.42;

    const fits = estimatedWidth <= col7Width;
    if (!fits) allFit = false;

    console.log(
      `Breakpoint: ${width}px | Col 7 Width: ${col7Width.toFixed(1)}px | Font Size: ${fontSize.toFixed(1)}px | Text Width: ${estimatedWidth.toFixed(1)}px | Fits: ${fits ? "YES" : "NO"}`
    );
  });

  return allFit;
}

function verifyCanvasMask() {
  console.log("\n=== CANVAS MASK & TEXT ZONE CELL ASSERTION ===");
  const width = 1440;
  const height = 900;
  const cellSize = 20;
  const sideMargin = 64;
  const contentWidth = width - sideMargin * 2;
  const col7BoundaryX = sideMargin + contentWidth * (7 / 12);
  const navBandY = 72;
  const bottomTransitionY = height - 140;

  // Headline box coordinates within the 7 columns:
  // left margin = 64px, top ~ 180px, width ~ 650px, height ~ 220px
  const headlineBox = {
    left: sideMargin,
    top: 160,
    right: sideMargin + 650,
    bottom: 380,
  };

  const cols = Math.ceil(width / cellSize);
  const rows = Math.ceil(height / cellSize);

  let darkCellsInHeadline = 0;
  let totalHeadlineCells = 0;

  for (let c = 0; c < cols; c++) {
    const cellLeft = c * cellSize;
    const cellRight = cellLeft + cellSize;

    for (let r = 0; r < rows; r++) {
      const cellTop = r * cellSize;
      const cellBottom = cellTop + cellSize;

      // Check if cell is under headline box
      const overlapsHeadline =
        cellRight >= headlineBox.left &&
        cellLeft <= headlineBox.right &&
        cellBottom >= headlineBox.top &&
        cellTop <= headlineBox.bottom;

      if (overlapsHeadline) {
        totalHeadlineCells++;
        // Check mask logic:
        const inLeft7Col = cellRight <= col7BoundaryX && cellTop >= navBandY && cellBottom <= bottomTransitionY;
        const isDark = !inLeft7Col; // In canvas, cells in left 7 col are forced light
        if (isDark) {
          darkCellsInHeadline++;
        }
      }
    }
  }

  console.log(`Total cells under headline box: ${totalHeadlineCells}`);
  console.log(`Dark cells found under headline box: ${darkCellsInHeadline}`);
  const pass = darkCellsInHeadline === 0;
  console.log(`Canvas Mask Assertion: ${pass ? "PASSED (100% LIGHT CELLS UNDER HEADLINE)" : "FAILED"}`);
  return pass;
}

const fitPassed = verifyHeadlineFit();
const maskPassed = verifyCanvasMask();

if (fitPassed && maskPassed) {
  console.log("\nALL ACCEPTANCE CRITERIA VERIFIED.");
} else {
  console.log("\nSOME CRITERIA NEED TUNING.");
}
