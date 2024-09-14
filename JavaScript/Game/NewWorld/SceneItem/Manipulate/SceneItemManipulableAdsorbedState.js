"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemManipulableAdsorbedState = void 0);
const puerts_1 = require("puerts"),
  Log_1 = require("../../../../Core/Common/Log"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  SceneItemManipulableBaseState_1 = require("./SceneItemManipulableBaseState");
class SceneItemManipulableAdsorbedState extends SceneItemManipulableBaseState_1.SceneItemManipulableBaseState {
  constructor(t) {
    super(t),
      (this.gU = !1),
      (this.IVs = void 0),
      (this.TVs = 0),
      (this.LVs = 0),
      (this.esr = Vector_1.Vector.Create()),
      (this.DVs = Vector_1.Vector.Create()),
      (this.AVs = Vector_1.Vector.Create()),
      (this.tsr = Rotator_1.Rotator.Create()),
      (this.UVs = Rotator_1.Rotator.Create()),
      (this.RVs = Rotator_1.Rotator.Create()),
      (this.StateType = "BeAdsorbed");
  }
  OnEnter() {
    this.gU ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "SceneItem",
          32,
          "被控物进入被吸附状态之前未初始化吸附配置",
          ["PbDataId", this.SceneItem?.ActorComp?.CreatureData.GetPbDataId()],
        )),
      (this.SceneItem.ForceMoving = !0),
      this.SceneItem.ResetForceDisplace(),
      (this.SceneItem.ActorComp.PhysicsMode = 0),
      (this.LVs = 0),
      this.esr.DeepCopy(this.SceneItem.ActorComp.ActorLocation),
      this.tsr.DeepCopy(this.SceneItem.ActorComp.ActorRotation);
  }
  OnExit() {
    super.OnExit(), (this.SceneItem.ForceMoving = !1), (this.gU = !1);
  }
  OnTick(t) {
    (this.LVs += t), (this.LVs = Math.min(this.LVs, this.TVs));
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
        (this.Jnr(),
        (this.SceneItem.CurrentState = this.SceneItem.MatchOutletState)),
      !0
    );
  }
  InitAdsorptionConfig(t, e, s) {
    var i;
    (this.gU = !0),
      (this.IVs = t) &&
        ((i = (0, puerts_1.$ref)(0)),
        t.GetTimeRange(void 0, i),
        (this.TVs = (0, puerts_1.$unref)(i))),
      this.DVs.DeepCopy(e),
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
