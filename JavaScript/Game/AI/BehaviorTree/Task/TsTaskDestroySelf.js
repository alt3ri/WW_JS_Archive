"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskDestroySelf extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.IsPause = !1),
      (this.IsInitTsVariables = !1),
      (this.TsIsPause = !1);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0), (this.TsIsPause = this.IsPause));
  }
  ReceiveExecuteAI(e, s) {
    this.InitTsVariables();
    const r = e.AiController;
    let o, t;
    r
      ? ((o = r.CharActorComp),
        (t = r.CharActorComp.Entity.GetComponent(38)),
        this.TsIsPause
          ? (t?.DisableAi("玩家主控权"),
            o.CreatureData.GetEntityType() ===
              Protocol_1.Aki.Protocol.HBs.Proto_Player &&
              TimerSystem_1.TimerSystem.Next((e) => {
                let s = r.CharActorComp;
                const o = r.CharActorComp.Entity;
                o.GetComponent(38) &&
                  (Global_1.Global.CharacterController.Possess(s.Actor),
                  (s = o.GetComponent(161)) && s.StopMove(!1),
                  (s = o.GetComponent(52)).ClearMoveVectorCache(),
                  s.SetActive(!0));
              }))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("BehaviorTree", 30, "已废弃的行为树任务节点", [
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
// # sourceMappingURL=TsTaskDestroySelf.js.map
