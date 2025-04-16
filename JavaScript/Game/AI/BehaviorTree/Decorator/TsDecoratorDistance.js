"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  GlobalData_1 = require("../../../GlobalData"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class TsDecoratorDistance extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments),
      (this.Distance = 0),
      (this.CompareType = 0),
      (this.IsInitTsVariables = !1),
      (this.TsDistance = 0),
      (this.TsCompareType = 0);
  }
  Constructor() {
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
  PerformConditionCheckAI(e, r) {
    var t = e.AiController;
    if (t) {
      this.InitTsVariables();
      var t = t.CharActorComp,
        s = t.Entity.CheckGetComponent(0),
        s = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
          s.GetSummonerId(),
        );
      if (0 !== s) {
        s =
          ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(
            s,
          );
        if (!s)
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "BehaviorTree",
                6,
                "主人已经被销毁",
                ["EntityId", t?.Entity.Id],
                ["Self", t.Actor.GetName()],
              ),
            !1
          );
        var i = UE.VectorDouble.DistSquared(s.ActorLocation, t.ActorLocation);
        switch (this.TsCompareType) {
          case 0:
            if (i === this.TsDistance * this.TsDistance) return !0;
            break;
          case 1:
            if (i < this.TsDistance * this.TsDistance) return !0;
            break;
          case 2:
            if (i > this.TsDistance * this.TsDistance) return !0;
        }
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          e.GetClass().GetName(),
        ]);
    return !1;
  }
}
exports.default = TsDecoratorDistance;
//# sourceMappingURL=TsDecoratorDistance.js.map
