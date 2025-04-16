"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../../../Core/Common/Log"),
  GlobalData_1 = require("../../../../../GlobalData"),
  BehaviorTreeDefines_1 = require("../../../../../LevelGamePlay/LevelAi/BehaviorTree/BehaviorTreeDefines"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  TsAiController_1 = require("../../../../Controller/TsAiController"),
  TsTaskAbortImmediatelyBase_1 = require("../../TsTaskAbortImmediatelyBase");
class TsTaskPatrolWithEvents extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.UseLastMoveIndex = !1),
      (this.StartWithNearestPoint = !1),
      (this.SplineId = 0),
      (this.PatrolComp = void 0),
      (this.IsInitTsVariables = !1),
      (this.TsStartWithNearestPoint = !1),
      (this.TsSplineId = 0);
  }
  Constructor() {
    super.Constructor(),
      (this.PatrolComp = void 0),
      (this.IsInitTsVariables = !1),
      (this.TsStartWithNearestPoint = !1),
      (this.TsSplineId = 0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsStartWithNearestPoint = this.StartWithNearestPoint),
      (this.TsSplineId = this.SplineId));
  }
  ReceiveExecuteAI(e, t) {
    this.InitTsVariables();
    var r = e.AiController;
    if (r) {
      const s = r.CharAiDesignComp.Entity,
        i = ((this.PatrolComp = s.GetComponent(47)), this.TsSplineId),
        o = s.GetComponent(47);
      o &&
        (o.HasPatrolRecord(this.TsSplineId)
          ? o.ResumePatrol(this.TsSplineId, "PatrolWithEvents")
          : ((r = {
              DebugMode: !1,
              UseNearestPoint: this.TsStartWithNearestPoint,
              ReturnFalseWhenNavigationFailed: !1,
              OnTriggerActionsHandle: () => {
                var e = o.GetLastPointRawIndex(),
                  e =
                    BehaviorTreeDefines_1.BehaviorTreeDefines.GetPatrolActionStateName(
                      i,
                      e,
                    );
                ControllerHolder_1.ControllerHolder.BlackboardController.SetStringValueByEntity(
                  s.Id,
                  BehaviorTreeDefines_1.BehaviorTreeDefines
                    .BehaviorTreePatrolStateName,
                  e,
                );
              },
              OnPatrolEndHandle: (e) => {
                ControllerHolder_1.ControllerHolder.BlackboardController.SetStringValueByEntity(
                  s.Id,
                  BehaviorTreeDefines_1.BehaviorTreeDefines
                    .BehaviorTreePatrolStateName,
                  BehaviorTreeDefines_1.BehaviorTreeDefines.PatrolFinishName,
                ),
                  this.Finish(1 === e);
              },
            }),
            o.StartPatrol(this.TsSplineId, r)));
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          e.GetClass().GetName(),
        ]),
        this.FinishExecute(!1);
  }
  OnAbort() {
    this.PatrolComp.PausePatrol(this.TsSplineId, "PatrolWithEvents");
  }
  OnClear() {
    this.AIOwner instanceof TsAiController_1.default &&
      (this.PatrolComp = void 0);
  }
}
exports.default = TsTaskPatrolWithEvents;
//# sourceMappingURL=TsTaskPatrolWithEvents.js.map
