"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PunishReportMarkItem = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  MapLogger_1 = require("../../Misc/MapLogger"),
  PunishReportMarkItemView_1 = require("../MarkItemView/PunishReportMarkItemView"),
  ConfigMarkItem_1 = require("./ConfigMarkItem");
class PunishReportMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  constructor(e, t, r, i, n, s = 1) {
    super(e, t, r, i, n, s),
      (this.nlh = void 0),
      (this.bir = () => {
        (this.nlh = this.GetPunishReportTarget()), this.yn_();
      });
  }
  GetMarkItemViewType() {
    return 19;
  }
  CreateView() {
    return new PunishReportMarkItemView_1.PunishReportMarkItemView(this);
  }
  OnInitialize() {
    super.OnInitialize(),
      this.yn_(),
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
    this.nlh || (this.nlh = this.GetPunishReportTarget());
    let e = 1;
    for (const t of this.nlh.States) 1 !== t && (e = 0);
    return e;
  }
  IsPunishReportFinish() {
    return 1 === this.GetPunishMarkState();
  }
  yn_() {
    var e = this.GetPunishMarkState();
    this.MarkItemEntity.GetComponent(10).GamePlayState = 1 === e ? 2 : 0;
  }
  CanGetReward() {
    let e = 0;
    var t = this.GetPunishReportTarget();
    for (const r of t.States) 1 === r && (e += 1);
    return e > t.GetBoxNum;
  }
  GetPunishReportTarget() {
    var e = { States: [], ConditionTxtIds: [], GetBoxNum: 0 },
      t = this.MarkConfig.RelativeId,
      r = ConfigManager_1.ConfigManager.WorldMapConfig.GetPunishReportConfig(t);
    if (void 0 === r)
      MapLogger_1.MapLogger.ErrorOnce(
        t,
        63,
        "[地图系统]->讨伐报告标记获取配置失败",
        ["levelPlayId", t],
      );
    else {
      for (const s of [
        ModelManager_1.ModelManager.WorldModel.GetWorldStateGeneric(r.Cond1Key),
        ModelManager_1.ModelManager.WorldModel.GetWorldStateGeneric(r.Cond2ey),
        ModelManager_1.ModelManager.WorldModel.GetWorldStateGeneric(r.Cond3Key),
      ])
        s ? e.States.push(1) : e.States.push(0);
      var t = r.CondDescription1,
        i = r.CondDescription2,
        n = r.CondDescription3,
        t =
          (e.ConditionTxtIds.push(t),
          e.ConditionTxtIds.push(i),
          e.ConditionTxtIds.push(n),
          ModelManager_1.ModelManager.WorldModel.GetWorldStateGeneric(
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
  GamePlayIsFinish() {
    return this.IsPunishReportFinish();
  }
}
exports.PunishReportMarkItem = PunishReportMarkItem;
//# sourceMappingURL=PunishReportMarkItem.js.map
