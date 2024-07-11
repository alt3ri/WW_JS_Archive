"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../GlobalData");
const CharacterController_1 = require("../../../NewWorld/Character/CharacterController");
const BlackboardController_1 = require("../../../World/Controller/BlackboardController");
class TsDecoratorActorsLocation extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments),
      (this.KeyActorA = ""),
      (this.KeyActorB = ""),
      (this.DistanceRange = void 0),
      (this.AngleRange = void 0),
      (this.HeightRange = void 0),
      (this.IsInitTsVariables = !1),
      (this.TsKeyActorA = ""),
      (this.TsKeyActorB = ""),
      (this.TsDistanceRange = void 0),
      (this.TsAngleRange = void 0),
      (this.TsHeightRange = void 0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsKeyActorA = this.KeyActorA),
      (this.TsKeyActorB = this.KeyActorB),
      (this.TsDistanceRange = new MathUtils_1.FastUeFloatRange(
        this.DistanceRange,
      )),
      (this.TsAngleRange = new MathUtils_1.FastUeFloatRange(this.AngleRange)),
      (this.TsHeightRange = new MathUtils_1.FastUeFloatRange(
        this.HeightRange,
      )));
  }
  PerformConditionCheckAI(t, r) {
    const e = t.AiController;
    if (!e)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            t.GetClass().GetName(),
          ]),
        !1
      );
    this.InitTsVariables();
    let i = e.CharActorComp;
    const o = i.Entity.Id;
    let s = i;
    if (this.TsKeyActorA) {
      i = BlackboardController_1.BlackboardController.GetEntityIdByEntity(
        o,
        this.TsKeyActorA,
      );
      if (!i)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "BehaviorTree",
              6,
              "不存在BlackboardKey",
              ["Key", this.TsKeyActorA],
              ["AI", t.GetName()],
            ),
          !1
        );
      var a =
        CharacterController_1.CharacterController.GetCharacterActorComponentById(
          i,
        );
      if (!a)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("BehaviorTree", 6, "不存在Entity", ["Id", i]),
          !1
        );
      s = a;
    }
    let h = e.AiHateList.GetCurrentTarget()?.Entity?.GetComponent(2);
    if (this.TsKeyActorB) {
      i = BlackboardController_1.BlackboardController.GetEntityIdByEntity(
        o,
        this.TsKeyActorB,
      );
      if (!i)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "BehaviorTree",
              6,
              "不存在BlackboardKey",
              ["Key", this.TsKeyActorB],
              ["AI", t.GetName()],
            ),
          !1
        );
      a = EntitySystem_1.EntitySystem.GetComponent(i, 2);
      if (!a)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("BehaviorTree", 6, "不存在Entity", ["Id", i]),
          !1
        );
      h = a;
    }
    if (!h) return !1;
    let l = void 0;
    return (
      (l = (0, RegisterComponent_1.isComponentInstance)(h, 3)
        ? h.FloorLocation
        : h.ActorLocationProxy),
      MathUtils_1.MathUtils.LocationInFastUeRange(
        s.FloorLocation,
        s.ActorRotationProxy,
        l,
        s.ScaledRadius + h.ScaledRadius,
        this.TsDistanceRange,
        this.TsAngleRange,
        this.TsHeightRange,
      )
    );
  }
}
exports.default = TsDecoratorActorsLocation;
// # sourceMappingURL=TsDecoratorActorsLocation.js.map
