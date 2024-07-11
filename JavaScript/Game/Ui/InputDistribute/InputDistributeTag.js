"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputDistributeTag = void 0);
class InputDistributeTag {
  constructor(t, e) {
    (this.bdr = new Set()), (this.qdr = t);
    let s = (this.Gdr = e);
    for (; s; ) {
      var r = s.TagName;
      this.bdr.add(r), (s = s.ParentTag);
    }
  }
  get TagName() {
    return this.qdr;
  }
  get ParentTag() {
    return this.Gdr;
  }
  MatchTag(t, e = !1) {
    return this.qdr === t || (!e && this.bdr.has(t));
  }
}
exports.InputDistributeTag = InputDistributeTag;
//# sourceMappingURL=InputDistributeTag.js.map
