"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  GlobalData_1 = require("../../../GlobalData"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class TsDecoratorGeCheck extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments),
      (this.BlackboardKeyTarget = ""),
      (this.Checks = void 0),
      (this.Logic = 0),
      (this.IsInitTsVariables = !1),
      (this.TsBlackboardKeyTarget = ""),
      (this.TsChecks = void 0),
      (this.TsLogic = void 0);
  }
  Constructor() {
    (this.IsInitTsVariables = !1),
      (this.TsBlackboardKeyTarget = ""),
      (this.TsChecks = void 0),
      (this.TsLogic = void 0);
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || GlobalData_1.GlobalData.IsPlayInEditor) {
      (this.IsInitTsVariables = !0),
        (this.TsBlackboardKeyTarget = this.BlackboardKeyTarget),
        (this.TsChecks = new Map());
      var t = this.Checks.Num();
      if (0 < t)
        for (let r = 0; r < t; r++) {
          var e = this.Checks.GetKey(r),
            i = this.Checks.Get(e);
          this.TsChecks.set(e, i);
        }
      this.TsLogic = this.Logic;
    }
  }
  PerformConditionCheckAI(r, t) {
    var e = r.AiController;
    if (!e)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            r.GetClass().GetName(),
          ]),
        !1
      );
    this.InitTsVariables();
    let i = e.CharActorComp;
    if (this.TsBlackboardKeyTarget) {
      r =
        ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(
          e.CharAiDesignComp.Entity.Id,
          this.TsBlackboardKeyTarget,
        );
      if (!r) return !1;
      e =
        ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(
          r,
        );
      if (!e) return !1;
      i = e;
    }
    var o = i.Entity.CheckGetComponent(172);
    if (!o) return !1;
    if (1 === this.TsLogic) {
      for (var [s, h] of this.TsChecks)
        if (0 < o.GetBuffTotalStackById(Number(s)) === h) return !0;
      return !1;
    }
    for (let r = 0; r < this.Checks.Num(); ++r) {
      var l = this.Checks.GetKey(r),
        a = this.Checks.Get(l);
      if (0 < o.GetBuffTotalStackById(Number(l)) !== a) return !1;
    }
    return !0;
  }
}
exports.default = TsDecoratorGeCheck;
//# sourceMappingURL=TsDecoratorGeCheck.js.map
