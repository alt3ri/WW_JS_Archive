"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  AnimalStateMachineComponent_1 = require("../../../../NewWorld/Character/Animal/Component/AnimalStateMachineComponent"),
  ServerGmController_1 = require("../../../../World/Controller/ServerGmController"),
  TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase");
class TsTaskSwitchAnimalState extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.State = 0),
      (this.ReceiveExecuteTime = -0),
      (this.WaitTime = -0);
  }
  ReceiveExecuteAI(e, t) {
    var r = e.AiController;
    r
      ? ((r = r.CharActorComp.Entity.GetComponent(14)),
        ServerGmController_1.ServerGmController.AnimalDebug &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "AI",
            6,
            "AnimalDebug SwitchAnimalState",
            ["Tree", this.TreeAsset?.GetName()],
            ["CurrentState", r.CurrentState()],
            ["TargetState", this.State],
          ),
        r.CurrentState() === this.State
          ? this.FinishExecute(!0)
          : (r.SwitchState(
              AnimalStateMachineComponent_1.AnimalStateMachineComponent.GetTsState(
                this.State,
              ),
            ),
            (this.WaitTime = r.GetWaitTime()),
            (this.ReceiveExecuteTime = Time_1.Time.WorldTimeSeconds)))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 30, "错误的Controller类型", [
            "Type",
            e.GetClass().GetName(),
          ]),
        this.FinishExecute(!1));
  }
  ReceiveTickAI(e, t, r) {
    var i = e.AiController;
    i
      ? this.ReceiveExecuteTime + this.WaitTime <
          Time_1.Time.WorldTimeSeconds &&
        ((i = i.CharActorComp.Entity.GetComponent(14)).SwitchState(
          AnimalStateMachineComponent_1.AnimalStateMachineComponent.GetTsState(
            0,
          ),
        ),
        ServerGmController_1.ServerGmController.AnimalDebug &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "AI",
            6,
            "AnimalDebug SwitchAnimalState2",
            ["Tree", this.TreeAsset?.GetName()],
            ["CurrentState", i.CurrentState()],
          ),
        this.FinishExecute(!0))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 30, "错误的Controller类型", [
            "Type",
            e.GetClass().GetName(),
          ]),
        this.FinishExecute(!1));
  }
  ReceiveAbortAI(e, t) {
    e = e.AiController;
    e &&
      e.CharActorComp?.Entity?.GetComponent(14)?.SwitchState(
        AnimalStateMachineComponent_1.AnimalStateMachineComponent.GetTsState(0),
      ),
      this.FinishAbort();
  }
}
exports.default = TsTaskSwitchAnimalState;
//# sourceMappingURL=TsTaskSwitchAnimalState.js.map
