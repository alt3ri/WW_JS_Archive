"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiDecorator = void 0);
const LevelAiNode_1 = require("./LevelAiNode");
class LevelAiDecorator extends LevelAiNode_1.LevelAiNode {
  constructor() {
    super(...arguments),
      (this.InverseCondition = !1),
      (this.NotifyExecutionStart = !0),
      (this.NotifyExecutionFinish = !0),
      (this.CheckConditionOnPlanEnter = !0),
      (this.CheckConditionOnPlanRecheck = !0),
      (this.CheckConditionOnTick = !1),
      (this.Params = void 0),
      (this.pIe = 1);
  }
  Serialize(t, e, i, s) {
    super.Serialize(t, e, i), (this.Params = s);
  }
  GetWorldStateProxy(t) {
    return t === 0
      ? this.CharacterPlanComponent.WorldStateProxy
      : this.CharacterPlanComponent.WorldState;
  }
  WrappedExecutionStart() {
    this.NotifyExecutionStart && this.OnExecutionStart();
  }
  WrappedExecutionFinish(t) {
    this.NotifyExecutionFinish && this.OnExecutionFinish(t);
  }
  WrappedCheckCondition(t) {
    let e = 1;
    let i;
    return (
      this.vIe(t)
        ? ((i = this.CheckCondition(t)),
          (i = this.InverseCondition ? !i : i),
          (e = i ? 1 : 0),
          (this.pIe = e),
          this.PrintDescription("Check Condition", ["CheckResult", e]))
        : t === 2 && (e = this.pIe),
      e
    );
  }
  vIe(t) {
    switch (t) {
      case 0:
        return this.CheckConditionOnPlanEnter;
      case 1:
        return this.CheckConditionOnPlanRecheck;
      case 2:
        return this.CheckConditionOnTick;
      default:
        return !1;
    }
  }
  NotifyEventBasedCondition(t) {
    var t = this.InverseCondition ? !t : t;
    const e =
      ((this.pIe = t ? 1 : 0),
      this.CharacterPlanComponent.FindActiveDecoratorInfo(this));
    return !!e && e.PlanInstance.NotifyEventBasedDecoratorCondition(this, t);
  }
  OnExecutionStart() {}
  OnExecutionFinish(t) {}
  CheckCondition(t) {
    return !0;
  }
}
exports.LevelAiDecorator = LevelAiDecorator;
// # sourceMappingURL=LevelAiDecorator.js.map
