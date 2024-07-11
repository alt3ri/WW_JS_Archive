"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  GlobalData_1 = require("../../../GlobalData"),
  CharacterController_1 = require("../../../NewWorld/Character/CharacterController");
class TsDecoratorDistance extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments),
      (this.Distance = 0),
      (this.CompareType = 0),
      (this.IsInitTsVariables = !1),
      (this.TsDistance = 0),
      (this.TsCompareType = 0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsDistance = this.Distance),
      (this.TsCompareType = this.CompareType));
  }
  PerformConditionCheckAI(r, e) {
    var t = r.AiController;
    if (t) {
      this.InitTsVariables();
      var t = t.CharActorComp,
        s = t.Entity.CheckGetComponent(48);
      if (0 !== s.RoleId) {
        var i =
          CharacterController_1.CharacterController.GetCharacterActorComponentById(
            s.RoleId,
          );
        if (!i)
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "BehaviorTree",
                6,
                "主人已经被销毁",
                ["EntityId", s?.Entity.Id],
                ["Self", t.Actor.GetName()],
              ),
            !1
          );
        var a = UE.Vector.DistSquared(i.ActorLocation, t.ActorLocation);
        switch (this.TsCompareType) {
          case 0:
            if (a === this.TsDistance * this.TsDistance) return !0;
            break;
          case 1:
            if (a < this.TsDistance * this.TsDistance) return !0;
            break;
          case 2:
            if (a > this.TsDistance * this.TsDistance) return !0;
        }
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          r.GetClass().GetName(),
        ]);
    return !1;
  }
}
exports.default = TsDecoratorDistance;
//# sourceMappingURL=TsDecoratorDistance.js.map
