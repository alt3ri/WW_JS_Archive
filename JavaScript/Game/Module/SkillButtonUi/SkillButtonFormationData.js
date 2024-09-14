"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillButtonFormationData = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SkillButtonTypeFormationData_1 = require("./SkillButtonTypeFormationData"),
  FOLLOWER_ID = 658700001;
class SkillButtonFormationData {
  constructor() {
    (this.mEa = new Map()), (this.VRn = !1), (this.QRn = void 0);
  }
  Init() {}
  Clear() {
    for (const t of this.mEa.values()) t.Clear();
  }
  GetSkillButtonTypeFormationData(t) {
    let a = this.mEa.get(t);
    return (
      a ||
        ((a =
          new SkillButtonTypeFormationData_1.SkillButtonTypeFormationData()),
        this.mEa.set(t, a)),
      a
    );
  }
  RefreshOnFollowerAimStateChange(t) {
    t !== this.VRn &&
      ((this.VRn = t) &&
      ModelManager_1.ModelManager.BattleUiModel?.FormationData?.GetFollowerEntityHandle()
        ?.PbDataId === FOLLOWER_ID
        ? (this.QRn || (this.QRn = this.XRn("SP_IconT35")),
          this.dEa(7, this.QRn, 210020))
        : this.dEa(7, void 0, 0),
      ModelManager_1.ModelManager.SkillButtonUiModel?.GetCurSkillButtonFollowerEntityData()?.SetEnable(
        t,
      ));
  }
  dEa(t, a, e = 0) {
    var o = this.GetSkillButtonTypeFormationData(t);
    (o.SkillIconPath !== a || o.EnableSkillId !== e) &&
      ((o.SkillIconPath = a),
      (o.EnableSkillId = e),
      (a =
        ModelManager_1.ModelManager.SkillButtonUiModel?.GetCurSkillButtonEntityData())) &&
      a.RefreshSkillTexturePath(t);
  }
  XRn(t) {
    return ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
  }
}
exports.SkillButtonFormationData = SkillButtonFormationData;
//# sourceMappingURL=SkillButtonFormationData.js.map
