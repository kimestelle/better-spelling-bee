export interface Puzzle { id: string; letters: string[]; center: string; words: string[] }
export interface Letter { id: string; letter: string }
export const MAX_LETTERS = 24;
export function scoreWord(word: string): number {
  if (word.length === 4) return 1;
  if (new Set(word).size === 7) return 14;
  return word.length;
}
export function checkWord(raw: string, puzzle: Puzzle, found: string[]) {
  const word = raw.toLowerCase().trim();
  if (word.length < 4) return { word, valid: false, message: 'Too short! Use at least 4 letters.' };
  if (!word.includes(puzzle.center)) return { word, valid: false, message: 'Missing the white letter!' };
  if (![...word].every(letter => puzzle.letters.includes(letter))) return { word, valid: false, message: 'Use only the pond letters.' };
  if (!puzzle.words.includes(word)) return { word, valid: false, message: 'Not in the word list.' };
  if (found.includes(word)) return { word, valid: false, message: 'Already found!' };
  return { word, valid: true, message: new Set(word).size === 7 ? 'PANGRAM! +14' : `Quack-tastic! +${scoreWord(word)}` };
}
export function restoreWords(raw: string | null, puzzle: Puzzle): string[] {
  try {
    const parsed: unknown = JSON.parse(raw || '[]');
    return Array.isArray(parsed) ? [...new Set(parsed.filter((w): w is string => typeof w === 'string' && puzzle.words.includes(w)))] : [];
  } catch { return []; }
}
export function dailyIndex(date: string, count: number): number {
  return Math.floor(Date.parse(`${date}T00:00:00Z`) / 86400000) % count;
}
export function nextPuzzleIndex(current: number, count: number, random = Math.random()): number {
  return count < 2 ? current : (current + 1 + Math.floor(random * (count - 1))) % count;
}
export interface Rect { left: number; right: number; top: number; bottom: number }
export function contains(rect: Rect, x: number, y: number) {
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}
// Decide insertion using the current layout, including wrapped rows and resized screens.
export function insertionIndex(rects: Rect[], x: number, y: number) {
  const index = rects.findIndex(r => y < r.top || (y <= r.bottom && x < (r.left + r.right) / 2));
  return index < 0 ? rects.length : index;
}
export function applyDrop(items: Letter[], item: Letter, fromTray: boolean, index: number | null): Letter[] {
  if (index === null) return fromTray ? items.filter(i => i.id !== item.id) : items;
  if (!fromTray && items.length >= MAX_LETTERS) return items;
  const result = items.filter(i => i.id !== item.id);
  result.splice(Math.max(0, Math.min(index, result.length)), 0, item);
  return result;
}
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/${path}`;
