"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbLevelAIState = void 0);
const UnionLevelAIBehaviourHelper_1 = require("./UnionLevelAIBehaviourHelper"),
  FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbLevelAIState {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Q_h = !1),
      (this.K_h = 0),
      (this.ewh = !1),
      (this.twh = void 0),
      (this.f_h = !1),
      (this.X6o = void 0),
      (this.iwh = !1),
      (this.rwh = void 0);
  }
  static Create(t) {
    if (t) return new FbLevelAIState(t);
  }
  get StateId() {
    return (
      this.Q_h || ((this.Q_h = !0), (this.K_h = this.FbDataInternal.stateId())),
      this.K_h
    );
  }
  get StateName() {
    return (
      this.ewh ||
        ((this.ewh = !0), (this.twh = this.FbDataInternal.stateName())),
      this.twh
    );
  }
  get Condition() {
    return (
      this.f_h ||
        ((this.f_h = !0),
        (this.X6o = FbConditionGroup_1.FbConditionGroup.Create(
          this.FbDataInternal.condition(),
        ))),
      this.X6o
    );
  }
  get Behaviour() {
    var t, i;
    return (
      !this.iwh &&
        ((this.iwh = !0),
        (t = this.FbDataInternal.behaviourType()),
        (i =
          UnionLevelAIBehaviourHelper_1.UnionLevelAIBehaviourHelper.GetUnionLevelAIBehaviourObject(
            t,
          ))) &&
        (this.rwh =
          UnionLevelAIBehaviourHelper_1.UnionLevelAIBehaviourHelper.ReadUnionLevelAIBehaviour(
            t,
            this.FbDataInternal.behaviour(i),
          )),
      this.rwh
    );
  }
}
exports.FbLevelAIState = FbLevelAIState;
//# sourceMappingURL=FbLevelAIState.js.map
