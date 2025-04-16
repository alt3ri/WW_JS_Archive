"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAttributeComponent = void 0);
const UnionFightMusicsSwitchTypeHelper_1 = require("./UnionFightMusicsSwitchTypeHelper"),
  UnionWorldLevelBonusHelper_1 = require("./UnionWorldLevelBonusHelper");
class FbAttributeComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.owh = !1),
      (this.nwh = 0),
      (this.swh = !1),
      (this.awh = 0),
      (this.hwh = !1),
      (this.lwh = 0),
      (this.Muh = !1),
      (this.jGi = 0),
      (this.gy1 = !1),
      (this.Cy1 = 0),
      (this._wh = !1),
      (this.cwh = 0),
      (this.uwh = !1),
      (this.dwh = 0),
      (this.mwh = !1),
      (this.Cwh = 0),
      (this.gwh = !1),
      (this.fwh = void 0),
      (this.pwh = !1),
      (this.vwh = void 0),
      (this.pbh = !1),
      (this.vbh = void 0),
      (this.ywh = !1),
      (this.Swh = void 0);
  }
  static Create(t) {
    if (t) return new FbAttributeComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get PropertyId() {
    return (
      this.owh ||
        ((this.owh = !0), (this.nwh = this.FbDataInternal.propertyId())),
      this.nwh
    );
  }
  get MonsterPropExtraRateId() {
    return (
      this.swh ||
        ((this.swh = !0),
        (this.awh = this.FbDataInternal.monsterPropExtraRateId())),
      this.awh
    );
  }
  get MonsterPropGrowthId() {
    return (
      this.hwh ||
        ((this.hwh = !0),
        (this.lwh = this.FbDataInternal.monsterPropGrowthId())),
      this.lwh
    );
  }
  get Level() {
    return (
      this.Muh || ((this.Muh = !0), (this.jGi = this.FbDataInternal.level())),
      this.jGi
    );
  }
  get MoraleLevel() {
    return (
      this.gy1 ||
        ((this.gy1 = !0), (this.Cy1 = this.FbDataInternal.moraleLevel())),
      this.Cy1
    );
  }
  get RageModeId() {
    return (
      this._wh ||
        ((this._wh = !0), (this.cwh = this.FbDataInternal.rageModeId())),
      this.cwh
    );
  }
  get HardnessModeId() {
    return (
      this.uwh ||
        ((this.uwh = !0), (this.dwh = this.FbDataInternal.hardnessModeId())),
      this.dwh
    );
  }
  get WorldLevelBonusId() {
    return (
      this.mwh ||
        ((this.mwh = !0), (this.Cwh = this.FbDataInternal.worldLevelBonusId())),
      this.Cwh
    );
  }
  get FightMusics() {
    var t, i;
    return (
      !this.gwh &&
        ((this.gwh = !0),
        (t = this.FbDataInternal.fightMusicsType()),
        (i =
          UnionFightMusicsSwitchTypeHelper_1.UnionFightMusicsSwitchTypeHelper.GetUnionFightMusicsSwitchTypeObject(
            t,
          ))) &&
        (this.fwh =
          UnionFightMusicsSwitchTypeHelper_1.UnionFightMusicsSwitchTypeHelper.ReadUnionFightMusicsSwitchType(
            t,
            this.FbDataInternal.fightMusics(i),
          )),
      this.fwh
    );
  }
  get FightMusic() {
    return (
      this.pwh ||
        ((this.pwh = !0), (this.vwh = this.FbDataInternal.fightMusic())),
      this.vwh
    );
  }
  get AppendBuffIds() {
    if (!this.pbh) {
      (this.pbh = !0), (this.vbh = new Array());
      var i = this.FbDataInternal.appendBuffIdsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.vbh.push(Number(this.FbDataInternal.appendBuffIds(t) ?? 0));
    }
    return this.vbh;
  }
  get WorldLevelBonusType() {
    var t, i;
    return (
      !this.ywh &&
        ((this.ywh = !0),
        (t = this.FbDataInternal.worldLevelBonusTypeType()),
        (i =
          UnionWorldLevelBonusHelper_1.UnionWorldLevelBonusHelper.GetUnionWorldLevelBonusObject(
            t,
          ))) &&
        (this.Swh =
          UnionWorldLevelBonusHelper_1.UnionWorldLevelBonusHelper.ReadUnionWorldLevelBonus(
            t,
            this.FbDataInternal.worldLevelBonusType(i),
          )),
      this.Swh
    );
  }
}
exports.FbAttributeComponent = FbAttributeComponent;
//# sourceMappingURL=FbAttributeComponent.js.map
