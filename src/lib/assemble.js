// Scroll paytida "yig'ilish" animatsiyasi uchun yordamchi (stillar: global.css, skript: BaseLayout.astro).
// Element data-assemble="left|right|up|down|zoom" bilan belgilanadi: shu tomondan kelib o'z joyiga tushadi.
// Ekranga birga kirgan elementlar navbatma-navbat (stagger) yig'iladi, kechikishni skript o'zi qo'yadi.

/**
 * Grid ichidagi elementning kelish tomoni: chap ustun chapdan, o'ng ustun o'ngdan, o'rtadagilar pastdan.
 * columns — kompyuterdagi ustunlar soni (telefonda chap/o'ng avtomatik "pastdan" ga almashadi).
 * @param {number} index
 * @param {number} columns
 */
export function gridSide(index, columns) {
  if (columns < 2) return 'up';
  const column = index % columns;
  if (column === 0) return 'left';
  if (column === columns - 1) return 'right';
  return 'up';
}
