"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineTransition = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
class AiStateMachineTransition {
  constructor(t, i) {
    (this.Conditions = void 0),
      (this.HasTaskFinishCondition = !1),
      (this.Node = t),
      (this.From = t.Owner.GetNodeData(i.From)?.Uuid),
      (this.To = t.Owner.GetNodeData(i.To)?.Uuid),
      (this.TransitionPredictionType = i.TransitionPredictionType),
      (this.Weight = i.Weight),
      (this.ConditionDatas = i.Conditions),
      (this.Condition =
        ModelManager_1.ModelManager.AiStateMachineModel.AiStateMachineFactory.CreateCondition(
          this,
          i.Conditions[0],
          0,
        )),
      (this.HasTaskFinishCondition = this.Condition.HasTaskFinishCondition);
  }
  Enter() {
    this.Condition.Enter();
  }
  Exit() {
    this.Condition.Exit();
  }
  Tick() {
    this.Condition.Tick();
  }
  CheckPredictionCondition() {
    return (
      !!(
        (1 === this.TransitionPredictionType &&
          this.Node.ActorComponent.IsAutonomousProxy) ||
        2 === this.TransitionPredictionType
      ) && this.Condition.Result
    );
  }
  CanPrediction() {
    return (
      (1 === this.TransitionPredictionType &&
        this.Node.ActorComponent.IsAutonomousProxy) ||
      2 === this.TransitionPredictionType
    );
  }
  GetResult() {
    return this.Condition.Result;
  }
  HandleServerDebugInfo(t) {
    this.Condition.HandleServerDebugInfo(t);
  }
  Clear() {
    this.Condition.Clear(),
      (this.Node = void 0),
      (this.ConditionDatas = void 0),
      (this.Condition = void 0),
      (this.Conditions = void 0);
  }
}
exports.AiStateMachineTransition = AiStateMachineTransition;
//# sourceMappingURL=AiStateMachineTransition.js.map
