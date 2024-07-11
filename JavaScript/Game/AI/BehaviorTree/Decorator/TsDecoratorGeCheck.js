"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const CharacterController_1 = require("../../../NewWorld/Character/CharacterController");
const BlackboardController_1 = require("../../../World/Controller/BlackboardController");
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
      const t = this.Checks.Num();
      if (t > 0)
        for (let r = 0; r < t; r++) {
          const e = this.Checks.GetKey(r);
          const o = this.Checks.Get(e);
          this.TsChecks.set(e, o);
        }
      this.TsLogic = this.Logic;
    }
  }
  PerformConditionCheckAI(r, t) {
    let e = r.AiController;
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
    const i = o.Entity.CheckGetComponent(157);
    if (!i) return !1;
    if (this.TsLogic === 1) {
      for (const [s, a] of this.TsChecks)
        if (i.GetBuffTotalStackById(s) > 0 === a) return !0;
      return !1;
    }
    for (let r = 0; r < this.Checks.Num(); ++r) {
      const h = this.Checks.GetKey(r);
      const l = this.Checks.Get(h);
      if (i.GetBuffTotalStackById(h) > 0 !== l) return !1;
    }
    return !0;
  }
}
exports.default = TsDecoratorGeCheck;
// # sourceMappingURL=TsDecoratorGeCheck.js.map
