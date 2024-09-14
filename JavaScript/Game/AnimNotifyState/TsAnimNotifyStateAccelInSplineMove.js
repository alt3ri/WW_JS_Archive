"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  SplineMoveComponent_1 = require("../NewWorld/Common/Component/SplineMoveComponent");
class TsAnimNotifyStateAccelInSplineMove extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.AddSpeedMap = void 0);
  }
  K2_NotifyTick(t, e, i) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) return !1;
    var n = t.GetEntityNoBlueprint();
    if (!n?.Valid) return !1;
    n = n.GetComponent(98);
    if (!n?.Active) return !1;
    if ("PathLine" !== n.CurrentSplineMoveType) return !1;
    n = t.CharacterActorComponent;
    if (!n) return !1;
    if (
      (TsAnimNotifyStateAccelInSplineMove.Initialize(),
      this.InitializeSelf(),
      n.Entity.GetComponent(163)?.HasKuroRootMotion)
    ) {
      var o = n.Entity.GetComponent(164);
      if (!o) return !1;
      let e = this.AddSpeedMap.get(t);
      return (e ||
        ((e = Vector_1.Vector.Create(0, 0, 0)), this.AddSpeedMap.set(t, e)),
      TsAnimNotifyStateAccelInSplineMove.CurrentSpeed.DeepCopy(e),
      this.CalculateNewSpeed(e, n, i, t))
        ? (TsAnimNotifyStateAccelInSplineMove.CurrentSpeed.Addition(
            e,
            TsAnimNotifyStateAccelInSplineMove.TmpVector,
          ),
          TsAnimNotifyStateAccelInSplineMove.TmpVector.MultiplyEqual(i / 2),
          o.MoveCharacter(
            TsAnimNotifyStateAccelInSplineMove.TmpVector,
            i,
            "ANSAccelInSplineMove",
          ),
          n.ActorVelocityProxy.Addition(
            e,
            TsAnimNotifyStateAccelInSplineMove.TmpVector,
          ),
          (t.CharacterMovement.Velocity =
            TsAnimNotifyStateAccelInSplineMove.TmpVector.ToUeVector()),
          !0)
        : !1;
    }
    return (
      this.AddSpeedMap.delete(t),
      TsAnimNotifyStateAccelInSplineMove.CurrentSpeed.FromUeVector(
        t.CharacterMovement.Velocity,
      ),
      !!this.CalculateNewSpeed(
        TsAnimNotifyStateAccelInSplineMove.CurrentSpeed,
        n,
        i,
        t,
      ) &&
        ((t.CharacterMovement.Velocity =
          TsAnimNotifyStateAccelInSplineMove.CurrentSpeed.ToUeVector()),
        !0)
    );
  }
  K2_NotifyEnd(e, t) {
    e = e.GetOwner();
    return e && this.AddSpeedMap?.delete(e), !0;
  }
  CalculateNewSpeed(e, t, i, n) {
    if (t.InputDirectProxy.IsNearlyZero())
      return (
        (o = e.SizeSquared2D()) > MathUtils_1.MathUtils.SmallNumber &&
          ((o = Math.sqrt(o)),
          (o =
            Math.max(
              0,
              o -
                SplineMoveComponent_1.SplineMoveComponent.SplineMoveConfig
                  .AnsAccel *
                  i,
            ) / o),
          (e.X *= o),
          (e.Y *= o)),
        !0
      );
    t.InputDirectProxy.Multiply(
      SplineMoveComponent_1.SplineMoveComponent.SplineMoveConfig.AnsAccel * i,
      TsAnimNotifyStateAccelInSplineMove.TmpVector,
    ),
      e.AdditionEqual(TsAnimNotifyStateAccelInSplineMove.TmpVector);
    var o = MathUtils_1.MathUtils.Square(
        SplineMoveComponent_1.SplineMoveComponent.SplineMoveConfig.MaxFlySpeed,
      ),
      t = e.SizeSquared2D();
    return (
      o < t && ((i = Math.sqrt(o / t)), (e.X *= i), (e.Y *= i)),
      !e.ContainsNaN() ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Movement",
            6,
            "TsAnimNotifyStateAccelInSplineMove Nan Speed",
            ["target", e],
            ["OwnerVelocity", n.CharacterMovement.Velocity],
            ["newSizeSquared", t],
            ["maxSpeedSquared", o],
          ),
        !1)
    );
  }
  static Initialize() {
    TsAnimNotifyStateAccelInSplineMove.CurrentSpeed ||
      ((TsAnimNotifyStateAccelInSplineMove.CurrentSpeed =
        Vector_1.Vector.Create()),
      (TsAnimNotifyStateAccelInSplineMove.TmpVector =
        Vector_1.Vector.Create()));
  }
  InitializeSelf() {
    this.AddSpeedMap || (this.AddSpeedMap = new Map());
  }
}
(TsAnimNotifyStateAccelInSplineMove.CurrentSpeed = void 0),
  (TsAnimNotifyStateAccelInSplineMove.TmpVector = void 0),
  (exports.default = TsAnimNotifyStateAccelInSplineMove);
//# sourceMappingURL=TsAnimNotifyStateAccelInSplineMove.js.map
