/* ===== js/app.js ===== */
/*
 * app.js — Composition root. The only file that runs anything on load.
 */

(async function init(){
  await loadData();
  // restore the place from the browser history entry (page reload), or start it
  const restored = stackFromHistoryState(history.state);
  if(restored){ navStack = restored; }
  else { try{ history.replaceState({ pkb: 1, stack: navStack }, ''); }catch(e){} }
  // preload photos for elements currently reachable is unnecessary; load lazily on open.
  // preload thumbnails for elements view we might land on (departments view doesn't need them)
  render();
})();
