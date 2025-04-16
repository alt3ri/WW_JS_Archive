"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueSkillTargetBeam = void 0);
const UE = require("ue"),
  FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil"),
  GameplayCueBeamCommonItem_1 = require("./CommonItem/GameplayCueBeamCommonItem"),
  GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueSkillTargetBeam extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments),
      (this.u$o = void 0),
      (this.v$o = void 0),
      (this.dLl = void 0),
      (this.xzi = void 0),
      (this.ITl = void 0),
      (this.ZQl = void 0);
  }
  OnInit() {
    (this.u$o = FNameUtil_1.FNameUtil.GetDynamicFName(this.CueConfig.Socket)),
      (this.dLl = new UE.VectorDouble(
        this.CueConfig.Location.X,
        this.CueConfig.Location.Y,
        this.CueConfig.Location.Z,
      )),
      (this.xzi = new UE.VectorDouble(
        this.CueConfig.Rotation.X,
        this.CueConfig.Rotation.Y,
        this.CueConfig.Rotation.Z,
      )),
      (this.ITl = this.ActorInternal.D_GetTransform().TransformPositionNoScale(
        this.dLl,
      ));
  }
  OnTick(t) {
    var i = this.u$o
      ? this.ActorInternal.Mesh.D_GetSocketLocation(this.u$o)
      : this.ActorInternal.D_K2_GetActorLocation();
    let e = void 0,
      s = "";
    var h,
      a = this.EntityHandle.Entity.GetComponent(32),
      m = this.EntityHandle.Entity.GetComponent(3);
    (s =
      a && m?.IsAutonomousProxy
        ? ((e = a.GetCurrentTarget()), a.GetCurrentTargetSocketName())
        : ((m = this.EntityHandle.Entity.GetComponent(39)),
          (e = m.SkillTarget),
          m.SkillTargetSocket)),
      e &&
        (s
          ? ((m = (a = e.Entity.GetComponent(3)).Actor.Mesh.D_GetSocketLocation(
              FNameUtil_1.FNameUtil.GetDynamicFName(s),
            )),
            (h = a.ActorQuat),
            (a = a.ActorScale),
            this.ZQl
              ? (this.ZQl.SetLocation(m),
                this.ZQl.SetRotation(h),
                this.ZQl.SetScale3D(a))
              : (this.ZQl = new UE.TransformDouble(h, m, a)),
            (this.ITl = this.ZQl.TransformPositionNoScale(this.xzi)))
          : ((h = e.Entity.GetComponent(1)),
            (this.ITl = h.ActorTransform.TransformPositionNoScale(this.xzi)))),
      this.v$o.Tick([i, this.ITl], t);
  }
  OnCreate() {
    this.v$o = GameplayCueBeamCommonItem_1.GameplayCueBeamCommonItem.Spawn(
      this.ActorInternal,
      this.CueConfig.Path,
    );
  }
  OnDestroy() {
    this.v$o.Destroy();
  }
  OnEnable() {
    this.v$o.GetOwner().SetActorHiddenInGame(!1);
  }
  OnDisable() {
    this.v$o.GetOwner().SetActorHiddenInGame(!0);
  }
}
exports.GameplayCueSkillTargetBeam = GameplayCueSkillTargetBeam;
//# sourceMappingURL=GameplayCueSkillTargetBeam.js.map
