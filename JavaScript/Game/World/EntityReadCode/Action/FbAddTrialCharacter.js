"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAddTrialCharacter = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActiveRange_1 = require("./FbActiveRange"),
  FbCharacterGroupNew_1 = require("./FbCharacterGroupNew");
class FbAddTrialCharacter {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.USh = !1),
      (this.DSh = 0),
      (this.NSh = !1),
      (this.VSh = void 0),
      (this.wSh = !1),
      (this.PSh = void 0),
      (this._Eh = !1),
      (this.cEh = !1),
      (this.uEh = !1),
      (this.dEh = !1),
      (this.mEh = !1),
      (this.CEh = !1),
      (this.gEh = !1),
      (this.fEh = void 0),
      (this.pEh = !1),
      (this.vEh = !1),
      (this.Zch = !1),
      (this.euh = void 0);
  }
  static Create(t) {
    if (t) return new FbAddTrialCharacter(t);
  }
  get CharacterId() {
    return (
      this.USh ||
        ((this.USh = !0), (this.DSh = this.FbDataInternal.characterId())),
      this.DSh
    );
  }
  get CharacterGroup() {
    if (!this.NSh) {
      (this.NSh = !0), (this.VSh = new Array());
      var i = this.FbDataInternal.characterGroupLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.VSh.push(this.FbDataInternal.characterGroup(t));
    }
    return this.VSh;
  }
  get CharacterGroupNew() {
    if (!this.wSh) {
      (this.wSh = !0), (this.PSh = new Array());
      var i = this.FbDataInternal.characterGroupNewLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.characterGroupNew(
            t,
            new fb_action_1.CharacterGroupNew(),
          );
          this.PSh.push(FbCharacterGroupNew_1.FbCharacterGroupNew.Create(s));
        }
    }
    return this.PSh;
  }
  get AutoChange() {
    return (
      this._Eh ||
        ((this._Eh = !0), (this.cEh = this.FbDataInternal.autoChange())),
      this.cEh
    );
  }
  get CreateTempTeam() {
    return (
      this.uEh ||
        ((this.uEh = !0), (this.dEh = this.FbDataInternal.createTempTeam())),
      this.dEh
    );
  }
  get CreateAiCharacter() {
    return (
      this.mEh ||
        ((this.mEh = !0), (this.CEh = this.FbDataInternal.createAiCharacter())),
      this.CEh
    );
  }
  get ActiveRange() {
    return (
      this.gEh ||
        ((this.gEh = !0),
        (this.fEh = FbActiveRange_1.FbActiveRange.Create(
          this.FbDataInternal.activeRange(),
        ))),
      this.fEh
    );
  }
  get EnableMapAndTeleport() {
    return (
      this.pEh ||
        ((this.pEh = !0),
        (this.vEh = this.FbDataInternal.enableMapAndTeleport())),
      this.vEh
    );
  }
  get DungeonList() {
    if (!this.Zch) {
      (this.Zch = !0), (this.euh = new Array());
      var i = this.FbDataInternal.dungeonListLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.euh.push(this.FbDataInternal.dungeonList(t));
    }
    return this.euh;
  }
}
exports.FbAddTrialCharacter = FbAddTrialCharacter;
//# sourceMappingURL=FbAddTrialCharacter.js.map
