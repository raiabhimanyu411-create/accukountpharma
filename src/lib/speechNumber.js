// Parses a spoken quantity ("twenty four", "vingt-quatre", "24 units") into a number, or NaN.
export function speechNumber(s, lang) {
  const numeric = String(s)
    .trim()
    .match(/^(\d+(?:[,.]\d+)?)\s*(?:units?|unités?)?$/i)
  if (numeric) return Number(numeric[1].replace(',', '.'))
  const norm = String(s)
    .toLowerCase()
    .replace(/[-–]/g, ' ')
    .replace(/[^a-zàâéèêëîïôùûüç\s]/g, '')
    .replace(/\b(?:units?|unités?)\b/g, '')
    .replace(/\bvingts\b/g, 'vingt')
    .replace(/\bcents\b/g, 'cent')
    .replace(/\bet\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (lang === 'fr') {
    const small = [
      'zéro',
      'un',
      'deux',
      'trois',
      'quatre',
      'cinq',
      'six',
      'sept',
      'huit',
      'neuf',
      'dix',
      'onze',
      'douze',
      'treize',
      'quatorze',
      'quinze',
      'seize',
    ]
    const words = (n) =>
      n <= 16
        ? small[n]
        : n < 20
          ? 'dix ' + small[n - 10]
          : n < 70
            ? ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante'][Math.floor(n / 10)] +
              (n % 10 ? ' ' + small[n % 10] : '')
            : n < 80
              ? 'soixante ' + words(n - 60)
              : 'quatre vingt' + (n % 80 ? ' ' + words(n - 80) : '')
    const lookup = new Map(Array.from({ length: 100 }, (_, n) => [words(n), n]))
    lookup.set('une', 1)
    const under1000 = (str) => {
      if (lookup.has(str)) return lookup.get(str)
      const parts = str.split(' cent')
      if (str === 'cent') return 100
      if (str.startsWith('cent ')) {
        const tail = str.slice(5)
        return lookup.has(tail) ? 100 + lookup.get(tail) : NaN
      }
      if (parts.length !== 2) return NaN
      const hundreds = lookup.get(parts[0]),
        tail = parts[1].trim()
      if (!(hundreds >= 2 && hundreds <= 9) || (tail && !lookup.has(tail))) return NaN
      return hundreds * 100 + (tail ? lookup.get(tail) : 0)
    }
    const parts = norm.split('mille')
    if (parts.length === 1) return under1000(norm)
    if (parts.length !== 2) return NaN
    const hi = parts[0].trim() ? under1000(parts[0].trim()) : 1,
      lo = parts[1].trim() ? under1000(parts[1].trim()) : 0
    return Number.isFinite(hi) && Number.isFinite(lo) ? hi * 1000 + lo : NaN
  }
  const dict = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    eleven: 11,
    twelve: 12,
    thirteen: 13,
    fourteen: 14,
    fifteen: 15,
    sixteen: 16,
    seventeen: 17,
    eighteen: 18,
    nineteen: 19,
    twenty: 20,
    thirty: 30,
    forty: 40,
    fifty: 50,
    sixty: 60,
    seventy: 70,
    eighty: 80,
    ninety: 90,
  }
  let total = 0,
    part = 0,
    known = false
  for (const w of norm.split(/\s+/).filter((x) => x !== 'and')) {
    if (w in dict) {
      part += dict[w]
      known = true
    } else if (w === 'hundred') {
      part = (part || 1) * 100
      known = true
    } else if (w === 'thousand') {
      total += (part || 1) * 1000
      part = 0
      known = true
    } else return NaN
  }
  return known ? total + part : NaN
}
