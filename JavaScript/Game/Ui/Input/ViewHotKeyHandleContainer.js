"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ViewHotKeyHandleContainer = void 0);
class ViewHotKeyHandleContainer {
  constructor() {
    this.iIa = new Map();
  }
  Add(t) {
    var o,
      e = t.ViewName;
    e && ((o = this.iIa.get(e)) ? o.push(t) : this.iIa.set(e, [t]));
  }
  Remove(t) {
    var o,
      e = t.ViewName;
    !e ||
      !(e = this.iIa.get(e)) ||
      (o = e.indexOf(t)) < 0 ||
      (t.Destroy(), e.splice(o, 1));
  }
  Clear() {
    for (const t of this.iIa.values()) for (const o of t) o.Destroy();
    this.iIa.clear();
  }
  Get(t) {
    return this.iIa.get(t);
  }
  GetAll() {
    let t = [];
    for (const o of this.iIa.values()) t = t.concat(o);
    return t;
  }
  ForEach(t) {
    for (const o of this.iIa.values()) for (const e of o) t(e);
  }
}
exports.ViewHotKeyHandleContainer = ViewHotKeyHandleContainer;
//# sourceMappingURL=ViewHotKeyHandleContainer.js.map
