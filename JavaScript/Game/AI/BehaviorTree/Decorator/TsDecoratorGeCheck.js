"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  GlobalData_1 = require("../../../GlobalData"),
  CharacterController_1 = require("../../../NewWorld/Character/CharacterController"),
  BlackboardController_1 = require("../../../World/Controller/BlackboardController");
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
  InitTsVariables() {
    if (!this.IsInitTsVariables || GlobalData_1.GlobalData.IsPlayInEditor) {
      (this.IsInitTsVariables = !0),
        (this.TsBlackboardKeyTarget = this.BlackboardKeyTarget),
        (this.TsChecks = new Map());
      var t = this.Checks.Num();
      if (0 < t)
        for (let r = 0; r < t; r++) {
          var e = this.Checks.GetKey(r),
            o = this.Checks.Get(e);
          this.TsChecks.set(e, o);
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
    let o = e.CharActorComp;
    if (this.TsBlackboardKeyTarget) {
      r = BlackboardController_1.BlackboardController.GetEntityIdByEntity(
        e.CharAiDesignComp.Entity.Id,
        this.TsBlackboardKeyTarget,
      );
      if (!r) return !1;
      e =
        CharacterController_1.CharacterController.GetCharacterActorComponentById(
          r,
        );
      if (!e) return !1;
      o = e;
    }
    var i = o.Entity.CheckGetComponent(160);
    if (!i) return !1;
    if (1 === this.TsLogic) {
      for (var [s, a] of this.TsChecks)
        if (0 < i.GetBuffTotalStackById(s) === a) return !0;
      return !1;
    }
    for (let r = 0; r < this.Checks.Num(); ++r) {
      var h = this.Checks.GetKey(r),
        l = this.Checks.Get(h);
      if (0 < i.GetBuffTotalStackById(h) !== l) return !1;
    }
    return !0;
  }
}
exports.default = TsDecoratorGeCheck;
//# sourceMappingURL=TsDecoratorGeCheck.js.map
