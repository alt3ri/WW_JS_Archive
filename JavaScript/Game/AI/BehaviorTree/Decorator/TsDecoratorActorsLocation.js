"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  GlobalData_1 = require("../../../GlobalData"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder");
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
  Constructor() {
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
  PerformConditionCheckAI(t, i) {
    var e = t.AiController;
    if (!e)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            t.GetClass().GetName(),
          ]),
        !1
      );
    this.InitTsVariables();
    var r = e.CharActorComp,
      o = r.Entity.Id;
    let s = r;
    if (this.TsKeyActorA) {
      r =
        ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(
          o,
          this.TsKeyActorA,
        );
      if (!r)
        return (
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "BehaviorTree",
              6,
              "不存在BlackboardKey",
              ["Key", this.TsKeyActorA],
              ["AI", t.GetName()],
            ),
          !1
        );
      var h =
        ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(
          r,
        );
      if (!h)
        return (
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("BehaviorTree", 6, "不存在Entity", ["Id", r]),
          !1
        );
      s = h;
    }
    let n = e.AiHateList.GetCurrentTarget()?.Entity?.GetComponent(2);
    if (this.TsKeyActorB) {
      r =
        ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(
          o,
          this.TsKeyActorB,
        );
      if (!r)
        return (
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "BehaviorTree",
              6,
              "不存在BlackboardKey",
              ["Key", this.TsKeyActorB],
              ["AI", t.GetName()],
            ),
          !1
        );
      h = EntitySystem_1.EntitySystem.GetComponent(r, 2);
      if (!h)
        return (
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("BehaviorTree", 6, "不存在Entity", ["Id", r]),
          !1
        );
      n = h;
    }
    if (!n) return !1;
    let l = void 0;
    return (
      (l = (0, RegisterComponent_1.isComponentInstance)(n, 3)
        ? n.FloorLocation
        : n.ActorLocationProxy),
      MathUtils_1.MathUtils.LocationInFastUeRange(
        s.FloorLocation,
        s.ActorRotationProxy,
        l,
        s.ScaledRadius + n.ScaledRadius,
        this.TsDistanceRange,
        this.TsAngleRange,
        this.TsHeightRange,
      )
    );
  }
}
exports.default = TsDecoratorActorsLocation;
//# sourceMappingURL=TsDecoratorActorsLocation.js.map
