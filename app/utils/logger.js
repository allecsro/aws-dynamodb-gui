/* eslint no-bitwise: ["error", { "allow": ["<<", "&"] }] */
/* eslint operator-assignment: ["error", "never"] */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint no-console: ["error", { allow: ["warn", "error", "info", "log", "debug"] }] */
/* eslint guard-for-in: "error" */

/**
 * Converts a text to a HSL color
 * @param text
 * @returns {string}
 */
const textToHSL = (text) => {
  let h = 0;
  for (let i = 0; i < text.length; i++) {
    h = text.charCodeAt(i) + ((h << 5) - h);
    h = h & h; // Convert to 32bit integer
  }
  return `hsl(${h % 360},100%,30%)`;
};

const output = (level, text, colorMarker, colorText) => {
  switch (level) {
    case 'INFO':
      console.info(text, colorMarker, colorText);
      break;
    case 'DEBUG':
      console.debug(text, colorMarker, colorText);
      break;
    case 'ERROR':
      console.error(text, colorMarker, colorText);
      break;
    case 'WARN':
      console.warn(text, colorMarker, colorText);
      break;
    default:
      console.log(text, colorMarker, colorText);
  }
};

const log = (level, text, name, params) => {
  if (window.console && window.console.log) {
    let txt = text;
    if (params) {
      for (let i = 0; i < params.length; i++) {
        txt = txt.replace('{}', params[i]);
      }
    }

    if (level) {
      const color = textToHSL(level);
      const LVL = `%c${level}%c (${name}) ${txt}`;
      const BGR = `background-color: ${color}; color: #fff`;
      const COL = `color: ${color}`;
      output(level, LVL, BGR, COL);
    } else {
      window.console.log(`%c${level}%c (${name}) ${txt}`);
    }
  }
};

export default class Logger {

  constructor(name) {
    this.name = name;
  }

  debug (msg, ...params) {
    if (window.DEBUG) log('DEBUG', msg, this.name, params);
  }

  info (msg, ...params) {
    log('INFO', msg, this.name, params);
  }

  error (msg, e, ...params) {
    log('ERROR', msg, this.name, params);
  }

  warn(msg, ...params) {
    log('WARN', msg, this.name, params);
  }

  trace (msg, ...params) {
    log('TRACE', msg, this.name, params);
  }
}
