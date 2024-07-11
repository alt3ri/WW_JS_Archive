"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityLongShanData = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
const LongShanStageAll_1 = require("../../../../../Core/Define/ConfigQuery/LongShanStageAll");
const LongShanTaskById_1 = require("../../../../../Core/Define/ConfigQuery/LongShanTaskById");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
const LongShanStageInfo_1 = require("./LongShanStageInfo");
class ActivityLongShanData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments), (this.StageIds = void 0), (this.ROe = void 0);
  }
  PhraseEx(e) {
    this.ROe?.clear(), (this.ROe = this.ROe ?? new Map()), (this.StageIds = []);
    for (const n of LongShanStageAll_1.configLongShanStageAll.GetConfigList(
      this.Id,
    )) {
      this.StageIds.push(n.Id);
      let t = e.y0s?.W0s?.find((e) => e.Ekn === n.Id);
      t
        ? ((t = new LongShanStageInfo_1.LongShanStageInfo(t)),
          this.ROe.set(n.Id, t))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Activity", 44, "龙山活动服务器数据与配表不符", [
            "id",
            n.Id,
          ]);
    }
  }
  UpdateStage(e) {
    for (const r of e) {
      const t = r.Ekn;
      const n = this.ROe.get(t);
      const a = new LongShanStageInfo_1.LongShanStageInfo(r);
      this.ROe.set(r.Ekn, a), n && this.OnStageInfoChange(t, n, a);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LongShanUpdate),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.Id,
      );
  }
  OnStageInfoChange(e, t, n) {
    for (const [a, r] of t.TaskInfoMap) {
      const o = n.TaskInfoMap.get(a);
      o && this.OnStageTaskInfoChange(a, r, o);
    }
  }
  OnStageTaskInfoChange(e, t, n) {
    !t.$0s &&
      n.$0s &&
      (t = LongShanTaskById_1.configLongShanTaskById.GetConfig(e).JumpId) > 0 &&
      (n =
        ConfigManager_1.ConfigManager.SkipInterfaceConfig.GetAccessPathConfig(
          t,
        )).SkipName === 8 &&
      ((e = Number(n.Val1)),
      ModelManager_1.ModelManager.MapModel?.RemoveMapMarksByConfigId(7, e));
  }
  NeedSelfControlFirstRedPoint() {
    return !1;
  }
  GetStageIndex(e) {
    return this.StageIds.indexOf(e);
  }
  GetStageInfoById(e) {
    return this.ROe?.get(e)?.ProtoStageInfo;
  }
  GetProgress(e) {
    let t;
    var e = this.GetStageInfoById(e);
    return e
      ? ((t = e.V0s.filter((e) => e.H0s).length),
        Math.ceil((t / e.V0s.length) * 100))
      : 0;
  }
  CheckStageRed(e) {
    e = this.GetStageInfoById(e);
    return !!e && e.V0s.findIndex((e) => e.$0s && !e.H0s) >= 0;
  }
  CheckAnyStageRed() {
    if (this.StageIds)
      for (const e of this.StageIds) if (this.CheckStageRed(e)) return !0;
    return !1;
  }
  GetExDataRedPointShowState() {
    return this.CheckAnyStageRed();
  }
}
exports.ActivityLongShanData = ActivityLongShanData;
// # sourceMappingURL=ActivityLongShanData.js.map
