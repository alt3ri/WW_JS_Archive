"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemManipulableAdsorbedState = void 0);
const puerts_1 = require("puerts"),
  Log_1 = require("../../../../Core/Common/Log"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  SceneItemManipulableBaseState_1 = require("./SceneItemManipulableBaseState");
class SceneItemManipulableAdsorbedState extends SceneItemManipulableBaseState_1.SceneItemManipulableBaseState {
  constructor() {
    super(...arguments),
      (this.gU = !1),
      (this.IVs = void 0),
      (this.TVs = 0),
      (this.LVs = 0),
      (this.Lpi = !0),
      (this.esr = Vector_1.Vector.Create()),
      (this.DVs = Vector_1.Vector.Create()),
      (this.AVs = Vector_1.Vector.Create()),
      (this.tsr = Rotator_1.Rotator.Create()),
      (this.UVs = Rotator_1.Rotator.Create()),
      (this.RVs = Rotator_1.Rotator.Create());
  }
  OnEnter() {
    this.SceneItem.ClearCastDestroyTimer(),
      this.SceneItem.TryAddTagById(1370513573),
      (this.SceneItem.IsCanBeHeld = !0),
      this.OpenPhysicsSplit(),
      (this.PropComp.IsMoving = !1),
      FNameUtil_1.FNameUtil.IsNothing(
        this.SceneItem.ManipulateBaseConfig.待机状态碰撞预设,
      ) ||
        this.SceneItem.ActorComp.GetPrimitiveComponent().SetCollisionProfileName(
          this.SceneItem.ManipulateBaseConfig.待机状态碰撞预设,
        ),
      this.gU ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneItem",
            31,
            "被控物进入被吸附状态之前未初始化吸附配置",
            ["PbDataId", this.SceneItem?.ActorComp?.CreatureData.GetPbDataId()],
          )),
      (this.SceneItem.ForceMoving = !0),
      this.SceneItem.ResetForceDisplace(),
      (this.SceneItem.ActorComp.PhysicsMode = 0),
      (this.LVs = 0),
      (this.Lpi = !0),
      this.tsr.DeepCopy(this.SceneItem.ActorComp.ActorRotation);
  }
  OnExit() {
    super.OnExit(), (this.SceneItem.ForceMoving = !1), (this.gU = !1);
  }
  OnTick(t) {
    this.Lpi &&
      (this.esr.DeepCopy(this.SceneItem.ActorComp.ActorLocationProxy),
      (this.Lpi = !1)),
      (this.LVs += t),
      (this.LVs = Math.min(this.LVs, this.TVs));
    t = this.IVs.GetFloatValue(this.LVs / this.TVs);
    return (
      Vector_1.Vector.Lerp(this.esr, this.DVs, t, this.AVs),
      Rotator_1.Rotator.Lerp(this.tsr, this.UVs, t, this.RVs),
      this.SceneItem.ActorComp.SetActorLocationAndRotation(
        this.AVs.ToUeVector(),
        this.RVs.ToUeRotator(),
        "[SceneItemOutletComponent.EntityMoveTickHandle]",
      ),
      this.LVs >= this.TVs &&
        (this.Jnr(), this.SceneItem?.SetState(10, "AdsorbState over time")),
      !0
    );
  }
  InitAdsorptionConfig(t, i, s) {
    var e;
    (this.gU = !0),
      (this.IVs = t) &&
        ((e = (0, puerts_1.$ref)(0)),
        t.GetTimeRange(void 0, e),
        (this.TVs = (0, puerts_1.$unref)(e))),
      this.DVs.DeepCopy(i),
      this.UVs.DeepCopy(s);
  }
  Jnr() {
    (this.SceneItem.ActivatedOutlet = this.SceneItem.TargetOutletComponent),
      (this.SceneItem.ActivatedOutlet.EntityInSocket = this.SceneItem),
      this.SceneItem.RequestAttachToOutlet();
  }
}
exports.SceneItemManipulableAdsorbedState = SceneItemManipulableAdsorbedState;
//# sourceMappingURL=SceneItemManipulableAdsorbedState.js.map
