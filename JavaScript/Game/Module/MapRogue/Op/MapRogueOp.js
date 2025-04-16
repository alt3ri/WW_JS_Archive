"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRogueOp = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class MapRogueOp {
  constructor() {
    (this.IncId = -1),
      (this.Data = void 0),
      (this.ExecuteInMapView = !0),
      (this.ExecuteByMapView = !1),
      (this.CurrentStep = -1),
      (this.OpExecuteClientId = 0);
  }
  Update(t, e) {
    (this.Data = t), (this.IncId = this.Data.w5n), this.OnUpdate(e);
  }
  ToString() {
    return `IncId:${this.IncId} Type:${this.Data.iac} Step:` + this.CurrentStep;
  }
  get IsFinished() {
    return this.CurrentStep > this.StepSize;
  }
  get IsStartExecute() {
    return 0 <= this.CurrentStep;
  }
  BattleStateUpdate(t, e) {
    this.OnBattleStateUpdate(t, e);
  }
  StartExecute(t) {
    -1 === this.CurrentStep &&
      this.OnBeforeStartExecuteCheck(t) &&
      ((this.CurrentStep = 0), this.OnStartExecute(t));
  }
  Execute(t, e) {
    this.IsFinished ||
      (this.CurrentStep++,
      this.CurrentStep > this.StepSize
        ? this.$ne(t, e)
        : (this.OnExecute(t), e?.(!0)));
  }
  Delete(t) {
    this.OnDelete(t);
  }
  $ne(t, e) {
    this.OnFinish(t), this.ExecuteOp(e);
  }
  ExecuteOp(t) {
    ControllerHolder_1.ControllerHolder.MapRogueController.RequestExecuteOp(
      this.IncId,
      this.OpExecuteClientId,
      t,
    );
  }
  OnUpdate(t) {}
  OnBattleStateUpdate(t, e) {}
  OnStartExecute(t) {}
  OnExecute(t) {}
  OnFinish(t) {}
  OnDelete(t) {}
  OnBeforeStartExecuteCheck(t) {
    return !0;
  }
}
exports.MapRogueOp = MapRogueOp;
//# sourceMappingURL=MapRogueOp.js.map
