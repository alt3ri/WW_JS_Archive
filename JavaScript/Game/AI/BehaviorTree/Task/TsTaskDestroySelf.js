"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  Global_1 = require("../../../Global"),
  GlobalData_1 = require("../../../GlobalData"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskDestroySelf extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.IsPause = !1),
      (this.IsInitTsVariables = !1),
      (this.TsIsPause = !1);
  }
  Constructor() {
    super.Constructor(), (this.IsInitTsVariables = !1), (this.TsIsPause = !1);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0), (this.TsIsPause = this.IsPause));
  }
  ReceiveExecuteAI(e, s) {
    this.InitTsVariables();
    const r = e.AiController;
    var t, o;
    r
      ? ((t = r.CharActorComp),
        (o = r.CharActorComp.Entity.GetComponent(46)),
        this.TsIsPause
          ? (o?.DisableAi("玩家主控权"),
            t.CreatureData.GetEntityType() ===
              Protocol_1.Aki.Protocol.kks.Proto_Player &&
              TimerSystem_1.TimerSystem.Next((e) => {
                var s = r.CharActorComp,
                  t = r.CharActorComp.Entity;
                t.GetComponent(46) &&
                  (Global_1.Global.CharacterController.Possess(s.Actor),
                  (s = t.GetComponent(176)) && s.StopMove(!1),
                  (s = t.GetComponent(61)).ClearMoveVectorCache(),
                  s.SetActive(!0));
              }))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("BehaviorTree", 29, "已废弃的行为树任务节点", [
              "Type",
              e.GetClass().GetName(),
            ]),
        this.FinishExecute(!0))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            e.GetClass().GetName(),
          ]),
        this.FinishExecute(!1));
  }
}
exports.default = TsTaskDestroySelf;
//# sourceMappingURL=TsTaskDestroySelf.js.map
