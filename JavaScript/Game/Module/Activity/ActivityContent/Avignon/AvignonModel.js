"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AvignonModel = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  AvignonProtocolData_1 = require("./Data/AvignonProtocolData"),
  AVIGNON_RED_DOT_CACHE_KEY = 100;
class AvignonModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.fcc = void 0);
  }
  OnInit() {
    return (this.fcc = new AvignonProtocolData_1.AvignonProtocolData()), !0;
  }
  AvignonInfoUpdate(e) {
    for (const n of this.wja()) {
      var t = n;
      e.T$s && t.UpdateTask(e.T$s), e.Gsc && t.UnlockStage(e.Gsc);
    }
    var o = this.GetAvignonActivityId();
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RefreshCommonActivityRedDot,
      o,
    );
  }
  UpdateTaskRewardStatus(e) {
    for (const o of this.wja()) {
      o.TaskRewardGot(e);
      var t = this.GetAvignonActivityId();
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        t,
      );
    }
  }
  ReadRedDot() {
    var e = this.GetAvignonActivityId();
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
      e,
      AVIGNON_RED_DOT_CACHE_KEY,
      0,
      0,
      1,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        e,
      );
  }
  SaveNewStageFlag(e) {
    var t;
    this.GetAvignonStageInfo(e)?.HasNewStageFlag() &&
      ((t = this.GetAvignonActivityId()),
      ModelManager_1.ModelManager.ActivityModel.SaveActivityData(t, e, 0, 0, 1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        t,
      ));
  }
  CheckRedDot() {
    var e = this.GetAvignonActivityId();
    if (
      0 ===
      ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
        e,
        0,
        AVIGNON_RED_DOT_CACHE_KEY,
        0,
        0,
      )
    )
      return !0;
    for (const t of this.GetAvignonAllStagesId())
      if (this.GetAvignonStageInfo(t)?.HasNewStageFlag()) return !0;
    return !1;
  }
  GetAvigonoProtocolData() {
    return this.fcc;
  }
  GetAvignonStageInfo(e) {
    return this.fcc?.GetStageInfo(e);
  }
  GetAvignonAllStagesId() {
    return this.fcc.GetAllStagesId();
  }
  GetAvignonActivityName() {
    return this.fcc.GetTitle();
  }
  GetAvignonActivityId() {
    return this.fcc.Id;
  }
  wja() {
    return ModelManager_1.ModelManager.ActivityModel.GetCurrentActivitiesByType(
      Protocol_1.Aki.Protocol.uks.Proto_Avignon,
    );
  }
}
exports.AvignonModel = AvignonModel;
//# sourceMappingURL=AvignonModel.js.map
