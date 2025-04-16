"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSceneItemPatrol = void 0);
const UnionSceneItemAiPatrolTypeHelper_1 = require("./UnionSceneItemAiPatrolTypeHelper"),
  FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbSceneItemPatrol {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.bYh = !1),
      (this.LYh = void 0),
      (this.AYh = !1),
      (this.xYh = void 0),
      (this.RYh = !1),
      (this.wYh = !1),
      (this.PYh = !1),
      (this.UYh = void 0);
  }
  static Create(t) {
    if (t) return new FbSceneItemPatrol(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get EnableCondition() {
    return (
      this.bYh ||
        ((this.bYh = !0),
        (this.LYh = FbConditionGroup_1.FbConditionGroup.Create(
          this.FbDataInternal.enableCondition(),
        ))),
      this.LYh
    );
  }
  get DisableCondition() {
    return (
      this.AYh ||
        ((this.AYh = !0),
        (this.xYh = FbConditionGroup_1.FbConditionGroup.Create(
          this.FbDataInternal.disableCondition(),
        ))),
      this.xYh
    );
  }
  get HideWhenDisable() {
    return (
      this.RYh ||
        ((this.RYh = !0), (this.wYh = this.FbDataInternal.hideWhenDisable())),
      this.wYh
    );
  }
  get PatrolType() {
    var t, i;
    return (
      !this.PYh &&
        ((this.PYh = !0),
        (t = this.FbDataInternal.patrolTypeType()),
        (i =
          UnionSceneItemAiPatrolTypeHelper_1.UnionSceneItemAiPatrolTypeHelper.GetUnionSceneItemAiPatrolTypeObject(
            t,
          ))) &&
        (this.UYh =
          UnionSceneItemAiPatrolTypeHelper_1.UnionSceneItemAiPatrolTypeHelper.ReadUnionSceneItemAiPatrolType(
            t,
            this.FbDataInternal.patrolType(i),
          )),
      this.UYh
    );
  }
}
exports.FbSceneItemPatrol = FbSceneItemPatrol;
//# sourceMappingURL=FbSceneItemPatrol.js.map
