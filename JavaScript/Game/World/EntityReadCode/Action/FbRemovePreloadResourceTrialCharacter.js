"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRemovePreloadResourceTrialCharacter = void 0);
class FbRemovePreloadResourceTrialCharacter {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.NSh = !1),
      (this.VSh = void 0);
  }
  static Create(e) {
    if (e) return new FbRemovePreloadResourceTrialCharacter(e);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get CharacterGroup() {
    if (!this.NSh) {
      (this.NSh = !0), (this.VSh = new Array());
      var t = this.FbDataInternal.characterGroupLength();
      if (t)
        for (let e = 0; e < t; ++e)
          this.VSh.push(this.FbDataInternal.characterGroup(e));
    }
    return this.VSh;
  }
}
exports.FbRemovePreloadResourceTrialCharacter =
  FbRemovePreloadResourceTrialCharacter;
//# sourceMappingURL=FbRemovePreloadResourceTrialCharacter.js.map
