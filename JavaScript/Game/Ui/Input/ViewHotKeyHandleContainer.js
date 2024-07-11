"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ViewHotKeyHandleContainer = void 0);
class ViewHotKeyHandleContainer {
  constructor() {
    this.OMa = new Map();
  }
  Add(t) {
    var o,
      e = t.ViewName;
    e && ((o = this.OMa.get(e)) ? o.push(t) : this.OMa.set(e, [t]));
  }
  Remove(t) {
    var o,
      e = t.ViewName;
    !e ||
      !(e = this.OMa.get(e)) ||
      (o = e.indexOf(t)) < 0 ||
      (t.Destroy(), e.splice(o, 1));
  }
  Clear() {
    for (const t of this.OMa.values()) for (const o of t) o.Destroy();
    this.OMa.clear();
  }
  Get(t) {
    return this.OMa.get(t);
  }
  GetAll() {
    let t = [];
    for (const o of this.OMa.values()) t = t.concat(o);
    return t;
  }
  ForEach(t) {
    for (const o of this.OMa.values()) for (const e of o) t(e);
  }
}
exports.ViewHotKeyHandleContainer = ViewHotKeyHandleContainer;
//# sourceMappingURL=ViewHotKeyHandleContainer.js.map
