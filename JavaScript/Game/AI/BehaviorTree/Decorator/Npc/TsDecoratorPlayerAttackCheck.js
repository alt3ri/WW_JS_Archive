"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  GlobalData_1 = require("../../../../GlobalData"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  TsAiController_1 = require("../../../Controller/TsAiController");
class TsDecoratorPlayerAttackCheck extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments),
      (this.BlackboardKey = "玩家攻击"),
      (this.IsCollected = !1),
      (this.IsInitTsVariables = !1),
      (this.TsBlackboardKey = "");
  }
  Constructor() {
    (this.IsCollected = !1),
      (this.IsInitTsVariables = !1),
      (this.TsBlackboardKey = "");
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsBlackboardKey = this.BlackboardKey));
  }
  PerformConditionCheckAI(r, t) {
    var e;
    return (
      this.InitTsVariables(),
      r instanceof TsAiController_1.default &&
        (this.IsCollected ||
          ((e = r.AiController.NpcDecision) &&
            ((this.IsCollected = !0), (e.CheckPlayerAttack = !0))),
        !!(e = r.AiController.CharActorComp)) &&
        ((r = e.Entity.Id),
        1 ===
          ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(
            r,
            this.TsBlackboardKey,
          ))
    );
  }
}
exports.default = TsDecoratorPlayerAttackCheck;
//# sourceMappingURL=TsDecoratorPlayerAttackCheck.js.map
