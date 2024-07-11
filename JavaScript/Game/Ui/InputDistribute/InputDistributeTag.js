"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputDistributeTag = void 0);
class InputDistributeTag {
  constructor(t, e) {
    (this.Gmr = new Set()), (this.Nmr = t);
    let s = (this.Omr = e);
    for (; s; ) {
      var r = s.TagName;
      this.Gmr.add(r), (s = s.ParentTag);
    }
  }
  get TagName() {
    return this.Nmr;
  }
  get ParentTag() {
    return this.Omr;
  }
  MatchTag(t, e = !1) {
    return this.Nmr === t || (!e && this.Gmr.has(t));
  }
}
exports.InputDistributeTag = InputDistributeTag;
//# sourceMappingURL=InputDistributeTag.js.map
