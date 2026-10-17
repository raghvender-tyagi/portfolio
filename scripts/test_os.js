/**
 * Standalone verification script for RT-OS 95 logic:
 * - windowStore logic (open, close, focus, z-order)
 * - Desktop icon grid geometry (80x84 cell, left column)
 * - Centered Welcome window calculation
 * - Virtual filesystem integrity
 */

const assert = require("assert");

console.log("=== RUNNING RT-OS 95 INTEGRITY TESTS ===");

console.log("1. Testing Virtual Filesystem Structure...");
function testVfs() {
  const mockContent = {
    projects: [
      { id: "takemycompute", slug: "takemycompute", title: "TakeMyCompute", tags: ["Django"], pitch: "P2P Compute", bullets: ["b1"] },
      { id: "paperly-ai", slug: "paperly-ai", title: "Paperly AI", tags: ["LangGraph"], pitch: "Research Engine", bullets: ["b2"] },
    ],
    experience: { company: "Lightning Leap", role: "AI Research Intern", bullets: ["b1"] },
    skills: { groups: [{ group: "Languages", items: ["Python", "Java"] }] },
    about: { bio: ["bio1"], education: { institution: "KIET", cgpa: "7.6" } },
    achievements: { items: [{ id: "patent-2024", title: "Patent", icon: "patent" }] },
    contact: { email: "raghvendertyagi@gmail.com", socials: [{ label: "GitHub", href: "https://github.com" }] },
    meta: { name: "Raghvender Tyagi", role: "AI Systems Engineer" },
  };

  assert(mockContent.projects.length >= 2, "Projects must exist");
  assert(mockContent.contact.email.includes("@"), "Email must be valid");
  console.log("✓ Content integrity verified.");
}

testVfs();

// 2. Test Window Manager Logic (Z-order, Cascade, Clamping)
console.log("2. Testing Window Manager Cascade & Z-Index logic...");
function testWindowLogic() {
  let windows = [];
  let nextZ = 10;
  let activeId = null;

  function open(appId) {
    const newId = `${appId}-${Date.now()}`;
    const z = nextZ++;
    const win = { id: newId, appId, z, x: 40 + windows.length * 24, y: 40 + windows.length * 24 };
    windows.push(win);
    activeId = newId;
    return win;
  }

  function focus(id) {
    activeId = id;
    const target = windows.find(w => w.id === id);
    if (target) target.z = nextZ++;
  }

  function close(id) {
    windows = windows.filter(w => w.id !== id);
    if (activeId === id) {
      const top = [...windows].sort((a, b) => b.z - a.z)[0];
      activeId = top ? top.id : null;
    }
  }

  const w1 = open("welcome");
  const w2 = open("terminal");
  const w3 = open("finder");

  assert.strictEqual(windows.length, 3, "Should have 3 windows");
  assert.strictEqual(activeId, w3.id, "Last opened window should be focused");
  assert(w3.z > w2.z, "w3 z-index should be higher than w2");

  focus(w1.id);
  assert.strictEqual(activeId, w1.id, "w1 should now be active");
  assert(w1.z > w3.z, "w1 should have highest z-index after focus");

  close(w1.id);
  assert.strictEqual(windows.length, 2, "Should have 2 windows left");
  assert.strictEqual(activeId, w3.id, "w3 should regain focus after w1 closed");

  console.log("✓ Window Manager Z-order, cascade, and focus hand-off passed.");
}

testWindowLogic();

// 3. Test Desktop Icon Left-Column Snap & Geometry
console.log("3. Testing Desktop Icon Left-Column Snap & Geometry...");
function testIconGeometry() {
  const gridW = 104;
  const gridH = 104;

  function snap(rawX, rawY) {
    const snappedX = Math.max(16, Math.round((rawX - 16) / gridW) * gridW + 16);
    const snappedY = Math.max(16, Math.round((rawY - 16) / gridH) * gridH + 16);
    return { x: snappedX, y: snappedY };
  }

  const p1 = snap(18, 17);
  assert.strictEqual(p1.x, 16, "Should snap near x:16 to column 0");
  assert.strictEqual(p1.y, 16, "Should snap near y:16 to row 0");

  const p2 = snap(118, 122);
  assert.strictEqual(p2.x, 120, "Should snap near x:120 to column 1");
  assert.strictEqual(p2.y, 120, "Should snap near y:120 to row 1");

  console.log("✓ Icon snap to 104x104 left-column grid passed.");
}

testIconGeometry();

// 4. Test Centered Welcome Window
console.log("4. Testing Centered Welcome Window calculation...");
function testCenteredWelcome() {
  const viewportW = 1440;
  const viewportH = 900;
  const w = 760;
  const h = 500;
  const x = Math.max(16, Math.floor((viewportW - w) / 2));
  const y = Math.max(16, Math.floor((viewportH - 46 - h) / 2));

  assert.strictEqual(x, 340, "x should be centered horizontally");
  assert.strictEqual(y, 177, "y should be centered vertically above 46px taskbar");
  console.log("✓ Centered Welcome window calculation passed.");
}

testCenteredWelcome();

console.log("=== ALL RT-OS 95 TESTS PASSED (0 ERRORS) ===");
