"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ViewHotKeyHandleContainer = void 0);
class ViewHotKeyHandleContainer {
  constructor() {
    this.eIa = new Map();
  }
  Add(t) {
    var o,
      e = t.ViewName;
    e && ((o = this.eIa.get(e)) ? o.push(t) : this.eIa.set(e, [t]));
  }
  Remove(t) {
    var o,
      e = t.ViewName;
    !e ||
      !(e = this.eIa.get(e)) ||
      (o = e.indexOf(t)) < 0 ||
      (t.Destroy(), e.splice(o, 1));
  }
  Clear() {
    for (const t of this.eIa.values()) for (const o of t) o.Destroy();
    this.eIa.clear();
  }
  Get(t) {
    return this.eIa.get(t);
  }
  GetAll() {
    let t = [];
    for (const o of this.eIa.values()) t = t.concat(o);
    return t;
  }
  ForEach(t) {
    for (const o of this.eIa.values()) for (const e of o) t(e);
  }
}
exports.ViewHotKeyHandleContainer = ViewHotKeyHandleContainer;
//# sourceMappingURL=ViewHotKeyHandleContainer.js.map
