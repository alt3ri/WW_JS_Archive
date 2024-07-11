"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  GlobalData_1 = require("../../../../GlobalData"),
  BlackboardController_1 = require("../../../../World/Controller/BlackboardController"),
  TsAiController_1 = require("../../../Controller/TsAiController");
class TsDecoratorPlayerImpactCheck extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments),
      (this.BlackboardKey = "玩家冲撞"),
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
      r instanceof TsAiController_1.default &&
      (this.InitTsVariables(),
      this.IsCollected ||
        ((e = r.AiController.NpcDecision) &&
          ((this.IsCollected = !0), (e.CheckPlayerImpact = !0))),
      !!(e = r.AiController.CharActorComp)) &&
      ((r = e.Entity.Id),
      1 ===
        BlackboardController_1.BlackboardController.GetIntValueByEntity(
          r,
          this.TsBlackboardKey,
        ))
    );
  }
}
exports.default = TsDecoratorPlayerImpactCheck;
//# sourceMappingURL=TsDecoratorPlayerImpactCheck.js.map
