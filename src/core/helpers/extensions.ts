// String utils

function lowerCase(this: string) {
  return this.toLowerCase();
}

function upperCase(this: string) {
  return this.toUpperCase();
}

function camelCase(this: string) {
  let str: string = this.replaceAccents();
  str = str.removeNonWord()
    .replace(/-/g, ' ') // convert all hyphens to spaces
    .replace(/\s[a-z]/g, (s) => s.upperCase()) // convert first char of each word to UPPERCASE
    .replace(/\s+/g, '') // remove spaces
    .replace(/^[A-Z]/g, (s) => s.lowerCase()); // convert first char to lowercase
  return str;
}

function unCamelCase(this: string) {
  let str = this;
  str = str.replace(/([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g, '$1 $2');
  str = str.toLowerCase(); // add space between camelCase text
  return str;
}

/**
 * UPPERCASE first char of each word.
 */
function properCase(this: string) {
  return this.lowerCase().replace(/^\w|\s\w/g, (str) => str.upperCase());
}

/**
 * camelCase + UPPERCASE first char
 */
function pascalCase(this: string) {
  return this.camelCase().replace(/^[a-z]/, (str) => str.upperCase());
}

/**
 * UPPERCASE first char of each sentence and lowercase other chars.
 */
function sentenceCase(this: string) {
  // Replace first char of each sentence (new line or after '.\s+') to
  // UPPERCASE
  return this.lowerCase().replace(/(^\w)|\.\s+(\w)/gm, (str) => str.upperCase());
}

/**
 * Convert to lower case, remove accents, remove non-word chars and
 * replace spaces with the specified delimeter.
 * Does not split camelCase text.
 */
function slugify(this: string, delimeter?: string): string {
  if (delimeter == null) {
    delimeter = '-';
  }

  let str: string;
  str = this.replaceAccents();
  str = str.removeNonWord();
  str = str.trim() // should come after removeNonWord
    .replace(/ +/g, delimeter) // replace spaces with delimeter
    .toLowerCase();

  return str;
}

/**
 * Replaces spaces with hyphens, split camelCase text, remove non-word chars, remove accents and convert to lower case.
 */
function hyphenate(this: string) {
  const str = this.unCamelCase();
  return str.slugify('-');
}

/**
 * Replaces hyphens with spaces. (only hyphens between word chars)
 */
function unhyphenate(this: string) {
  return this.replace(/(\w)(-)(\w)/g, '$1 $3');
}

/**
 * Replaces spaces with underscores, split camelCase text, remove
 * non-word chars, remove accents and convert to lower case.
 */
function underscore(this: string) {
  const str = this.unCamelCase();
  return str.slugify('_');
}

/**
 * Remove non-word chars.
 */
function removeNonWord(this: string) {
  return this.replace(/[^0-9a-zA-Z\xC0-\xFF \-]/g, '');
}

/**
 * Convert line-breaks from DOS/MAC to a single standard (UNIX by default)
 */
function normalizeLineBreaks(this: string, lineEnd?: string) {
  lineEnd = lineEnd || '\n';

  return this
    .replace(/\r\n/g, lineEnd) // DOS
    .replace(/\r/g, lineEnd)   // Mac
    .replace(/\n/g, lineEnd);  // Unix
}

/**
 * Replaces all accented chars with regular ones
 */
function replaceAccents(this: string) {
  let str: string = this;
  // verifies if the String has accents and replace them
  if (this.search(/[\xC0-\xFF]/g) > -1) {
    str = str
      .replace(/[\xC0-\xC5]/g, 'A')
      .replace(/[\xC6]/g, 'AE')
      .replace(/[\xC7]/g, 'C')
      .replace(/[\xC8-\xCB]/g, 'E')
      .replace(/[\xCC-\xCF]/g, 'I')
      .replace(/[\xD0]/g, 'D')
      .replace(/[\xD1]/g, 'N')
      .replace(/[\xD2-\xD6\xD8]/g, 'O')
      .replace(/[\xD9-\xDC]/g, 'U')
      .replace(/[\xDD]/g, 'Y')
      .replace(/[\xDE]/g, 'P')
      .replace(/[\xE0-\xE5]/g, 'a')
      .replace(/[\xE6]/g, 'ae')
      .replace(/[\xE7]/g, 'c')
      .replace(/[\xE8-\xEB]/g, 'e')
      .replace(/[\xEC-\xEF]/g, 'i')
      .replace(/[\xF1]/g, 'n')
      .replace(/[\xF2-\xF6\xF8]/g, 'o')
      .replace(/[\xF9-\xFC]/g, 'u')
      .replace(/[\xFE]/g, 'p')
      .replace(/[\xFD\xFF]/g, 'y');
  }

  return str;
}

/**
 * Searches for a given substring
 */
function contains(this: string, substring: string, fromIndex: number) {
  return this.indexOf(substring, fromIndex) !== -1;
}

/**
 * Truncate string at full words.
 */
function crop(this: string, maxChars: number, append: string) {
  return this.truncate(maxChars, append, true);
}

/**
 * Escape RegExp string chars.
 */
function escapeRegExp(this: string) {
  const ESCAPE_CHARS = /[\\.+*?^$\[\](){}\/'#]/g;
  return this.replace(ESCAPE_CHARS, '\\$&');
}

/**
 * Escapes a string for insertion into HTML.
 */
function escapeHtml(this: string) {
  return this
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;');
}

/**
 * Unescapes HTML special chars
 */
function unescapeHtml(this: string) {
  return this
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, '\'')
    .replace(/&quot;/g, '"');
}

/**
 * Escape string into unicode sequences
 */
function escapeUnicode(this: string, shouldEscapePrintable: boolean = true) {
  return this.replace(/[\s\S]/g, (ch) => {
    // skip printable ASCII chars if we should not escape them
    if (!shouldEscapePrintable && (/[\x20-\x7E]/).test(ch)) {
      return ch;
    }
    // we use "000" and slice(-4) for brevity, need to pad zeros,
    // unicode escape always have 4 chars after "\u"
    return '\\u' + ('000' + ch.charCodeAt(0).toString(16)).slice(-4);
  });
}

/**
 * Remove HTML tags from string.
 */
function stripHtmlTags(this: string) {
  return this.replace(/<[^>]*>/g, '');
}

/**
 * Remove non-printable ASCII chars
 */
function removeNonASCII(this: string) {
  // Matches non-printable ASCII chars -
  // http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters
  return this.replace(/[^\x20-\x7E]/g, '');
}

/**
 * String interpolation
 */
function interpolate(template, replacements, syntax) {
  const stache = /{{(\w+)}}/g; // mustache-like

  const replaceFn = (match, prop) => (prop in replacements) ? replacements[prop] : '';

  return template.replace(syntax || stache, replaceFn);
}

/**
 * Pad string with `char` if its' length is smaller than `minLen`
 */
function rpad(this: string, minLen, ch) {
  ch = ch || ' ';
  return (this.length < minLen) ? this + ch.repeat(minLen - this.length) : this;
}

/**
 * Pad string with `char` if its' length is smaller than `minLen`
 */
function lpad(this: string, minLen: number, ch: string) {
  ch = ch || ' ';

  return ((this.length < minLen)
    ? ch.repeat(minLen - this.length) + this : this);
}

/**
 * Repeat string n times
 */
function repeat(this: string, n: number) {
  return (new Array(n + 1)).join(this);
}

/**
 * Limit number of chars.
 */
function truncate(this: string, maxChars, append, onlyFullWords) {
  append = append || '...';
  maxChars = onlyFullWords ? maxChars + 1 : maxChars;

  let str = this.trim();
  if (this.length <= maxChars) {
    return this;
  }
  str = str.substr(0, maxChars - append.length);
  // crop at last space or remove trailing whitespace
  str = onlyFullWords ? str.substr(0, str.lastIndexOf(' ')) : str.trim();
  return str + append;
}

let WHITE_SPACES = [
  ' ', '\n', '\r', '\t', '\f', '\v', '\u00A0', '\u1680', '\u180E',
  '\u2000', '\u2001', '\u2002', '\u2003', '\u2004', '\u2005', '\u2006',
  '\u2007', '\u2008', '\u2009', '\u200A', '\u2028', '\u2029', '\u202F',
  '\u205F', '\u3000',
];

/**
 * Remove chars from beginning of string.
 */
function ltrim(this: string, chars?: string[]): string {
  chars = chars || WHITE_SPACES;

  let start = 0;
  const len = this.length;
  const charLen = chars.length;
  let found = true;
  let i;
  let c;

  while (found && start < len) {
    found = false;
    i = -1;
    c = this.charAt(start);

    while (++i < charLen) {
      if (c === chars[i]) {
        found = true;
        start++;
        break;
      }
    }
  }

  return (start >= len) ? '' : this.substr(start, len);
}

/**
 * Remove chars from end of string.
 */
function rtrim(this: string, chars?: string[]): string {
  chars = chars || WHITE_SPACES;

  let end = this.length - 1;
  const charLen = chars.length;
  let found = true;
  let i;
  let c;

  while (found && end >= 0) {
    found = false;
    i = -1;
    c = this.charAt(end);

    while (++i < charLen) {
      if (c === chars[i]) {
        found = true;
        end--;
        break;
      }
    }
  }

  return (end >= 0) ? this.substring(0, end + 1) : '';
}

/**
 * Remove white-spaces from beginning and end of string.
 */
function trim(this: string, chars?: string[]) {
  chars = chars || WHITE_SPACES;
  return this.rtrim(chars).ltrim(chars);
}

/**
 * Capture all capital letters following a word boundary (in case the
 * input is in all caps)
 */
function abbreviate(this: string) {
  return this.match(/\b([A-Z])/g).join('');
}

interface String {
  pascalCase(this: string): string;

  lowerCase(this: string): string;

  upperCase(this: string): string;

  camelCase(this: string): string;

  unCamelCase(this: string): string;

  properCase(this: string): string;

  sentenceCase(this: string): string;

  slugify(this: string, delimiter?: string): string;

  hyphenate(this: string): string;

  unHyphenate(this: string): string;

  underscore(this: string): string;

  removeNonWord(this: string): string;

  normalizeLineBreaks(this: string, lineEnd?: string): string;

  replaceAccents(this: string): string;

  contains(this: string, subString: string, fromIndex: number): boolean;

  crop(this: string, maxChars: number, append: string): string;

  escapeRegExp(this: string): string;

  escapeHtml(this: string): string;

  unescapeHtml(this: string): string;

  escapeUnicode(this: string, shouldEscapePrintable: boolean): string;

  stripHtmlTags(this: string): string;

  removeNonASCII(this: string): string;

  interpolate(template, replacements, syntax): string;

  rpad(this: string, minLen, ch): string;

  lpad(this: string, minLen, ch);

  repeat(this: string, n);

  truncate(this: string, maxChars, append, onlyFullWords);

  ltrim(this: string, chars);

  rtrim(this: string, chars);

  trim(this: string, chars?: string[]);

  abbreviate(this: string): string;
}

String.prototype.pascalCase = pascalCase;
String.prototype.lowerCase = lowerCase;
String.prototype.upperCase = upperCase;
String.prototype.camelCase = camelCase;
String.prototype.unCamelCase = unCamelCase;
String.prototype.properCase = properCase;
String.prototype.sentenceCase = sentenceCase;
String.prototype.slugify = slugify;
String.prototype.hyphenate = hyphenate;
String.prototype.unHyphenate = unhyphenate;
String.prototype.underscore = underscore;
String.prototype.removeNonWord = removeNonWord;
String.prototype.normalizeLineBreaks = normalizeLineBreaks;
String.prototype.replaceAccents = replaceAccents;
String.prototype.contains = contains;
String.prototype.crop = crop;
String.prototype.escapeRegExp = escapeRegExp;
String.prototype.escapeHtml = escapeHtml;
String.prototype.unescapeHtml = unescapeHtml;
String.prototype.escapeUnicode = escapeUnicode;
String.prototype.stripHtmlTags = stripHtmlTags;
String.prototype.removeNonASCII = removeNonASCII;
String.prototype.interpolate = interpolate;
String.prototype.rpad = rpad;
String.prototype.lpad = lpad;
String.prototype.repeat = repeat;
String.prototype.truncate = truncate;
String.prototype.ltrim = ltrim;
String.prototype.rtrim = rtrim;
String.prototype.trim = trim;
String.prototype.abbreviate = abbreviate;
