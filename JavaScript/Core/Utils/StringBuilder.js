"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StringBuilder = void 0);
const DEFAULT_SIZE = 16;
class StringBuilder {
  constructor(...t) {
    (this.kz = new Array(DEFAULT_SIZE)), t.length > 0 && this.Append(...t);
  }
  get Store() {
    return this.kz;
  }
  Append(...t) {
    for (const r of t)
      typeof r === "string"
        ? this.kz.push(r)
        : r instanceof Array
          ? this.kz.push(...r)
          : r instanceof StringBuilder
            ? this.kz.push(...r.Store)
            : this.kz.push(r);
  }
  RemoveLast(r) {
    for (let t = 0; t < r; ++t) this.kz.pop();
  }
  ToString() {
    return this.kz.join("");
  }
  Clear() {
    this.kz.length = 0;
  }
}
exports.StringBuilder = StringBuilder;
// # sourceMappingURL=StringBuilder.js.map
