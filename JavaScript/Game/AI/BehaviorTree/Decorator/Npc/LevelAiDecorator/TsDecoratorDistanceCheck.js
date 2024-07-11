"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  Global_1 = require("../../../../../Global"),
  GlobalData_1 = require("../../../../../GlobalData"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  SELF_TOKEN_ID = -1,
  PLAYER_TOKEN_ID = -2;
class TsDecoratorDistanceCheck extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments),
      (this.CheckType = 0),
      (this.SourcePbDataId = 0),
      (this.TargetPbDataId = 0),
      (this.Distance = 0),
      (this.IgnoreZ = !1),
      (this.IsInitTsVariables = !1),
      (this.TsCheckType = 0),
      (this.TsSourcePbDataId = 0),
      (this.TsTargetPbDataId = 0),
      (this.TsDistance = 0),
      (this.TsIgnoreZ = !1);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsCheckType = this.CheckType),
      (this.TsSourcePbDataId = this.SourcePbDataId),
      (this.TsTargetPbDataId = this.TargetPbDataId),
      (this.TsDistance = this.Distance),
      (this.TsIgnoreZ = this.IgnoreZ));
  }
  PerformConditionCheckAI(t, e) {
    var r = t.AiController;
    if (!r)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            t.GetClass().GetName(),
          ]),
        !1
      );
    this.InitTsVariables();
    (t = this.GetActorCompByConfig(this.TsSourcePbDataId, r)),
      (r = this.GetActorCompByConfig(this.TsTargetPbDataId, r));
    if (!t || !r) return !1;
    var s = this.TsIgnoreZ
      ? Vector_1.Vector.Dist2D(t.ActorLocationProxy, r.ActorLocationProxy)
      : Vector_1.Vector.Dist(t.ActorLocationProxy, r.ActorLocationProxy);
    switch (this.TsCheckType) {
      case 0:
        return s === this.TsDistance;
      case 1:
        return s !== this.TsDistance;
      case 2:
        return s < this.TsDistance;
      case 3:
        return s <= this.TsDistance;
      case 4:
        return s > this.TsDistance;
      case 5:
        return s >= this.TsDistance;
      default:
        return !1;
    }
  }
  GetActorCompByConfig(t, e) {
    switch (t) {
      case 0:
        return;
      case SELF_TOKEN_ID:
        return e?.CharActorComp;
      case PLAYER_TOKEN_ID:
        return Global_1.Global.BaseCharacter?.CharacterActorComponent;
      default:
        return ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
          this.TsTargetPbDataId,
        )?.Entity?.GetComponent(1);
    }
  }
}
exports.default = TsDecoratorDistanceCheck;
//# sourceMappingURL=TsDecoratorDistanceCheck.js.map
