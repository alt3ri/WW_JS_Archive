"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPreloadTrialCharacterForSkill = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbCharacterGroupNew_1 = require("./FbCharacterGroupNew");
class FbPreloadTrialCharacterForSkill {
  constructor(r) {
    (this.FbDataInternal = r),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.wSh = !1),
      (this.PSh = void 0);
  }
  static Create(r) {
    if (r) return new FbPreloadTrialCharacterForSkill(r);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get CharacterGroupNew() {
    if (!this.wSh) {
      (this.wSh = !0), (this.PSh = new Array());
      var t = this.FbDataInternal.characterGroupNewLength();
      if (t)
        for (let r = 0; r < t; ++r) {
          var e = this.FbDataInternal.characterGroupNew(
            r,
            new fb_action_1.CharacterGroupNew(),
          );
          this.PSh.push(FbCharacterGroupNew_1.FbCharacterGroupNew.Create(e));
        }
    }
    return this.PSh;
  }
}
exports.FbPreloadTrialCharacterForSkill = FbPreloadTrialCharacterForSkill;
//# sourceMappingURL=FbPreloadTrialCharacterForSkill.js.map
