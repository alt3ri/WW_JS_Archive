"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemManipulatableCastProjectileState = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
  QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  CameraController_1 = require("../../../Camera/CameraController"),
  Global_1 = require("../../../Global"),
  SceneItemManipulableCastState_1 = require("./SceneItemManipulableCastState");
class SceneItemManipulatableCastProjectileState extends SceneItemManipulableCastState_1.SceneItemManipulableCastState {
  constructor(t, e) {
    super(t, e),
      (this.Vnr = void 0),
      (this.Hnr = void 0),
      (this.jnr = 0),
      (this.nJo = 0),
      (this.Wnr = Vector_1.Vector.Create()),
      (this.Knr = Vector_1.Vector.Create()),
      (this.StateType = "BeCastingFree");
  }
  OnEnter() {
    super.OnEnter(),
      this.Qnr(),
      (this.jnr = this.SceneItem.ManipulateBaseConfig.抛物瞄准模式初速度),
      (this.nJo = 0),
      (this.Wnr = Vector_1.Vector.Create(this.SceneItem.LastHoldingLocation));
  }
  OnTick(t) {
    (t = this.jnr * t),
      (this.nJo += t),
      (t = this.Vnr.GetLocationAtDistanceAlongSpline(this.nJo, 1));
    return (
      this.SceneItem.ActorComp.SetActorLocation(t),
      this.nJo >= this.Vnr.GetSplineLength() &&
        (this.SceneItem.CurrentState = this.SceneItem.ResetState),
      (this.SceneItem.ActorComp.PhysicsMode = 3),
      (this.Knr = Vector_1.Vector.Create()),
      this.SceneItem.ActorComp.ActorLocationProxy.Subtraction(
        this.Wnr,
        this.Knr,
      ),
      this.Knr.Normalize(),
      (this.Wnr = Vector_1.Vector.Create(
        this.SceneItem.ActorComp.ActorLocation,
      )),
      !0
    );
  }
  OnExit() {
    super.OnExit(),
      this.SceneItem.ActorComp.GetPrimitiveComponent().SetPhysicsLinearVelocity(
        this.Knr.MultiplyEqual(this.jnr).ToUeVector(),
      ),
      this.Hnr?.IsValid() &&
        (ActorSystem_1.ActorSystem.Put(this.Hnr),
        (this.Hnr = void 0),
        (this.Vnr = void 0));
  }
  Qnr() {
    var t = this.SceneItem.ManipulateBaseConfig,
      i = this.SceneItem.LastHoldingLocation.ToUeVector(),
      e = Vector_1.Vector.Create(0, 0, 0),
      s = CameraController_1.CameraController.CameraRotator,
      s =
        ((s.Pitch += t.抛物瞄准模式仰角),
        s.Vector(e),
        e.Normalize(),
        e.MultiplyEqual(t.抛物瞄准模式初速度),
        (0, puerts_1.$ref)(void 0)),
      r = (0, puerts_1.$ref)(void 0),
      h = (0, puerts_1.$ref)(void 0),
      o = UE.NewArray(UE.Actor),
      a =
        (o.Add(this.SceneItem.ActorComp.Owner),
        o.Add(Global_1.Global.BaseCharacter.CharacterActorComponent.Owner),
        UE.NewArray(UE.BuiltinByte)),
      l =
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
    (this.Hnr = ActorSystem_1.ActorSystem.Get(
      UE.BP_BasePathLine_C.StaticClass(),
      MathUtils_1.MathUtils.DefaultTransform,
    )),
      this.Hnr.K2_SetActorLocation(i, !1, void 0, !0),
      (this.Vnr = this.Hnr.GetComponentByClass(
        UE.SplineComponent.StaticClass(),
      )),
      this.Vnr.SetSplinePoints(l, 0, !0);
  }
}
exports.SceneItemManipulatableCastProjectileState =
  SceneItemManipulatableCastProjectileState;
//# sourceMappingURL=SceneItemManipulableCastProjectileState.js.map
