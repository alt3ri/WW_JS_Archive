"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityLongShanData = void 0);
const LongShanStageAll_1 = require("../../../../../Core/Define/ConfigQuery/LongShanStageAll"),
  LongShanTaskById_1 = require("../../../../../Core/Define/ConfigQuery/LongShanTaskById"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityData_1 = require("../../ActivityData"),
  LongShanStageInfo_1 = require("./LongShanStageInfo");
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
      var t = e.Nps?.lMs?.find((e) => e.J4n === n.Id);
      t &&
        ((t = new LongShanStageInfo_1.LongShanStageInfo(t)),
        this.ROe.set(n.Id, t));
    }
  }
  UpdateStage(e) {
    for (const r of e) {
      var t = r.J4n,
        n = this.ROe.get(t),
        a = new LongShanStageInfo_1.LongShanStageInfo(r);
      this.ROe.set(r.J4n, a), n && this.OnStageInfoChange(t, n, a);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LongShanUpdate),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.Id,
      );
  }
  OnStageInfoChange(e, t, n) {
    for (var [a, r] of t.TaskInfoMap) {
      var i = n.TaskInfoMap.get(a);
      i && this.OnStageTaskInfoChange(a, r, i);
    }
  }
  OnStageTaskInfoChange(e, t, n) {
    !t.sMs &&
      n.sMs &&
      0 < (t = LongShanTaskById_1.configLongShanTaskById.GetConfig(e).JumpId) &&
      8 ===
        (n =
          ConfigManager_1.ConfigManager.SkipInterfaceConfig.GetAccessPathConfig(
            t,
          )).SkipName &&
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
    var t,
      e = this.GetStageInfoById(e);
    return e
      ? ((t = e.nMs.filter((e) => e.aMs).length),
        Math.ceil((t / e.nMs.length) * 100))
      : 0;
  }
  CheckStageRed(e) {
    e = this.GetStageInfoById(e);
    return !!e && 0 <= e.nMs.findIndex((e) => e.sMs && !e.aMs);
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
//# sourceMappingURL=ActivityLongShanData.js.map
