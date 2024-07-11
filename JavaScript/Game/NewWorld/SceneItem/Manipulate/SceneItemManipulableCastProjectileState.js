"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemManipulatableCastProjectileState = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const CameraController_1 = require("../../../Camera/CameraController");
const Global_1 = require("../../../Global");
const SceneItemManipulableCastState_1 = require("./SceneItemManipulableCastState");
class SceneItemManipulatableCastProjectileState extends SceneItemManipulableCastState_1.SceneItemManipulableCastState {
  constructor(t, e) {
    super(t, e),
      (this.Wrr = void 0),
      (this.Krr = void 0),
      (this.Qrr = 0),
      (this.hYo = 0),
      (this.Xrr = Vector_1.Vector.Create()),
      (this.$rr = Vector_1.Vector.Create()),
      (this.StateType = "BeCastingFree");
  }
  OnEnter() {
    super.OnEnter(),
      this.Yrr(),
      (this.Qrr = this.SceneItem.ManipulateBaseConfig.抛物瞄准模式初速度),
      (this.hYo = 0),
      (this.Xrr = Vector_1.Vector.Create(this.SceneItem.LastHoldingLocation));
  }
  OnTick(t) {
    (t = this.Qrr * t),
      (this.hYo += t),
      (t = this.Wrr.GetLocationAtDistanceAlongSpline(this.hYo, 1));
    return (
      this.SceneItem.ActorComp.SetActorLocation(t),
      this.hYo >= this.Wrr.GetSplineLength() &&
        (this.SceneItem.CurrentState = this.SceneItem.ResetState),
      (this.SceneItem.ActorComp.PhysicsMode = 3),
      (this.$rr = Vector_1.Vector.Create()),
      this.SceneItem.ActorComp.ActorLocationProxy.Subtraction(
        this.Xrr,
        this.$rr,
      ),
      this.$rr.Normalize(),
      (this.Xrr = Vector_1.Vector.Create(
        this.SceneItem.ActorComp.ActorLocation,
      )),
      !0
    );
  }
  OnExit() {
    super.OnExit(),
      this.SceneItem.ActorComp.GetPrimitiveComponent().SetPhysicsLinearVelocity(
        this.$rr.MultiplyEqual(this.Qrr).ToUeVector(),
      ),
      this.Krr?.IsValid() &&
        (ActorSystem_1.ActorSystem.Put(this.Krr),
        (this.Krr = void 0),
        (this.Wrr = void 0));
  }
  Yrr() {
    const t = this.SceneItem.ManipulateBaseConfig;
    const i = this.SceneItem.LastHoldingLocation.ToUeVector();
    const e = Vector_1.Vector.Create(0, 0, 0);
    var s = CameraController_1.CameraController.CameraRotator;
    var s =
      ((s.Pitch += t.抛物瞄准模式仰角),
      s.Vector(e),
      e.Normalize(),
      e.MultiplyEqual(t.抛物瞄准模式初速度),
      (0, puerts_1.$ref)(void 0));
    const r = (0, puerts_1.$ref)(void 0);
    const h = (0, puerts_1.$ref)(void 0);
    const o = UE.NewArray(UE.Actor);
    const a =
      (o.Add(this.SceneItem.ActorComp.Owner),
      o.Add(Global_1.Global.BaseCharacter.CharacterActorComponent.Owner),
      UE.NewArray(UE.BuiltinByte));
    const l =
      (a.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic),
      a.Add(QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster),
      a.Add(QueryTypeDefine_1.KuroObjectTypeQuery.Destructible),
      UE.GameplayStatics.Blueprint_PredictProjectilePath_ByObjectType(
        this.SceneItem.ActorComp.Owner,
        s,
        r,
        h,
        i,
        e.ToUeVector(),
        !0,
        this.SceneItem.ManipulateBaseConfig.抛物瞄准射线检测半径,
        a,
        !1,
        o,
        this.SceneItem?.ManipulateBaseConfig?.抛物瞄准射线Debug ? 2 : 0,
        5,
        10,
        10,
        t.抛物瞄准模式重力加速度,
      ),
      (0, puerts_1.$unref)(r));
    for (let e = 0; e < l.Num(); e++) {
      let t = l.Get(e);
      (t = t.op_Subtraction(i)), l.Set(e, t);
    }
    (this.Krr = ActorSystem_1.ActorSystem.Get(
      UE.BP_BasePathLine_C.StaticClass(),
      MathUtils_1.MathUtils.DefaultTransform,
    )),
      this.Krr.K2_SetActorLocation(i, !1, void 0, !0),
      (this.Wrr = this.Krr.GetComponentByClass(
        UE.SplineComponent.StaticClass(),
      )),
      this.Wrr.SetSplinePoints(l, 0, !0);
  }
}
exports.SceneItemManipulatableCastProjectileState =
  SceneItemManipulatableCastProjectileState;
// # sourceMappingURL=SceneItemManipulableCastProjectileState.js.map
