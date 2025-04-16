"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbHideHighlightExploreSkillIcon = void 0);
class FbHideHighlightExploreSkillIcon {
  constructor(i) {
    (this.FbDataInternal = i), (this.u_h = !1), (this.f8o = void 0);
  }
  static Create(i) {
    if (i) return new FbHideHighlightExploreSkillIcon(i);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
}
exports.FbHideHighlightExploreSkillIcon = FbHideHighlightExploreSkillIcon;
//# sourceMappingURL=FbHideHighlightExploreSkillIcon.js.map
