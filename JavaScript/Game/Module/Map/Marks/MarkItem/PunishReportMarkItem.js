"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PunishReportMarkItem = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  PunishReportMarkItemView_1 = require("../MarkItemView/PunishReportMarkItemView"),
  ConfigMarkItem_1 = require("./ConfigMarkItem");
class PunishReportMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  constructor(e, t, r, n, i, o = 1) {
    super(e, t, r, n, i, o),
      (this.XZa = void 0),
      (this.bir = () => {
        this.XZa = this.GetPunishReportTarget();
      });
  }
  OnCreateView() {
    this.InnerView = new PunishReportMarkItemView_1.PunishReportMarkItemView(
      this,
    );
  }
  Initialize() {
    super.Initialize(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnReceivePlayerVar,
        this.bir,
      );
  }
  OnDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnReceivePlayerVar,
      this.bir,
    ),
      super.OnDestroy();
  }
  GetPunishMarkState() {
    this.XZa || (this.XZa = this.GetPunishReportTarget());
    let e = 1;
    for (const t of this.XZa.States) 1 !== t && (e = 0);
    return e;
  }
  IsPunishReportFinish() {
    return 1 === this.GetPunishMarkState();
  }
  CanGetReward() {
    let e = 0;
    var t = this.GetPunishReportTarget();
    for (const r of t.States) 1 === r && (e += 1);
    return e > t.GetBoxNum;
  }
  GetPunishReportTarget() {
    var e = { States: [], ConditionTxtIds: [], GetBoxNum: 0 },
      t = this.MarkConfig.EntityConfigId,
      r = ConfigManager_1.ConfigManager.WorldMapConfig.GetPunishReportConfig(t);
    if (void 0 === r)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Map", 64, "[地图系统]->讨伐报告标记获取配置失败", [
          "levelPlayId",
          t,
        ]);
    else {
      for (const o of [
        ModelManager_1.ModelManager.WorldModel.WorldStateBooleanMap.get(
          r.Cond1Key,
        ),
        ModelManager_1.ModelManager.WorldModel.WorldStateBooleanMap.get(
          r.Cond2ey,
        ),
        ModelManager_1.ModelManager.WorldModel.WorldStateBooleanMap.get(
          r.Cond3Key,
        ),
      ])
        o ? e.States.push(1) : e.States.push(0);
      var t = r.CondDescription1,
        n = r.CondDescription2,
        i = r.CondDescription3,
        t =
          (e.ConditionTxtIds.push(t),
          e.ConditionTxtIds.push(n),
          e.ConditionTxtIds.push(i),
          ModelManager_1.ModelManager.WorldModel.WorldStateMap.get(
            r.GetBoxKey,
          ) ?? 0);
      e.GetBoxNum = t;
    }
    return e;
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
