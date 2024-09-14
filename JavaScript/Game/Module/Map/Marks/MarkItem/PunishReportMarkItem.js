"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PunishReportMarkItem = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  PunishReportMarkItemView_1 = require("../MarkItemView/PunishReportMarkItemView"),
  ConfigMarkItem_1 = require("./ConfigMarkItem");
class PunishReportMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  constructor(e, r, t, o, a, n = 1) {
    super(e, r, t, o, a, n);
  }
  OnCreateView() {
    this.InnerView = new PunishReportMarkItemView_1.PunishReportMarkItemView(
      this,
    );
  }
  GetPunishMarkState() {
    let e = 1;
    for (const r of this.GetPunishReportTarget().States) 2 !== r && (e = 0);
    return e;
  }
  IsPunishReportClaim() {
    return 1 === this.GetPunishMarkState();
  }
  CanGetReward() {
    let e = 0;
    var r = this.GetPunishReportTarget();
    for (const t of r.States) 1 === t && (e += 1);
    return e > r.GetBoxNum;
  }
  GetPunishReportTarget() {
    var r = { States: [], ConditionTxtIds: [], GetBoxNum: 0 },
      e = this.MarkConfig.EntityConfigId,
      t = ConfigManager_1.ConfigManager.WorldMapConfig.GetPunishReportConfig(e);
    if (void 0 === t)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Map", 64, "[地图系统]->讨伐报告标记获取配置失败", [
          "levelPlayId",
          e,
        ]);
    else {
      for (const n of [
        ModelManager_1.ModelManager.WorldModel.WorldStateBooleanMap.get(
          t.Cond1Key,
        ),
        ModelManager_1.ModelManager.WorldModel.WorldStateBooleanMap.get(
          t.Cond2ey,
        ),
        ModelManager_1.ModelManager.WorldModel.WorldStateBooleanMap.get(
          t.Cond3Key,
        ),
      ])
        n ? r.States.push(1) : r.States.push(0);
      var e = t.CondDescription1,
        o = t.CondDescription2,
        a = t.CondDescription3,
        e =
          (r.ConditionTxtIds.push(e),
          r.ConditionTxtIds.push(o),
          r.ConditionTxtIds.push(a),
          ModelManager_1.ModelManager.WorldModel.WorldStateMap.get(
            t.GetBoxKey,
          ) ?? 0);
      r.GetBoxNum = e;
      for (let e = 0; e < r.States.length; ++e)
        r.GetBoxNum > e && (r.States[e] = 2);
    }
    return r;
  }
  InitIcon() {
    this.UpdateIconPath();
  }
  UpdateIconPath() {
    this.IconPath = this.MarkConfig.UnlockMarkPic;
  }
}
exports.PunishReportMarkItem = PunishReportMarkItem;
//# sourceMappingURL=PunishReportMarkItem.js.map
