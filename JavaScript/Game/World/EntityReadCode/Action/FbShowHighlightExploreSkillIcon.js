"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbShowHighlightExploreSkillIcon = void 0);
class FbShowHighlightExploreSkillIcon {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.sbh = !1),
      (this.abh = 0),
      (this.I_h = !1),
      (this.y6o = 0),
      (this.UAh = !1),
      (this.DAh = !1);
  }
  static Create(t) {
    if (t) return new FbShowHighlightExploreSkillIcon(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get SkillType() {
    return (
      this.sbh ||
        ((this.sbh = !0), (this.abh = this.FbDataInternal.skillType())),
      this.abh
    );
  }
  get Duration() {
    return (
      this.I_h ||
        ((this.I_h = !0), (this.y6o = this.FbDataInternal.duration())),
      this.y6o
    );
  }
  get IsSwitchBack() {
    return (
      this.UAh ||
        ((this.UAh = !0), (this.DAh = this.FbDataInternal.isSwitchBack())),
      this.DAh
    );
  }
}
exports.FbShowHighlightExploreSkillIcon = FbShowHighlightExploreSkillIcon;
//# sourceMappingURL=FbShowHighlightExploreSkillIcon.js.map
