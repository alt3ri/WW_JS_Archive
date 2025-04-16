"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletLogicForceController = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  CharacterUnifiedStateTypes_1 = require("../../Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  CustomMovementDefine_1 = require("../../Character/Common/Component/Move/CustomMovementDefine"),
  BulletPool_1 = require("../Model/BulletPool"),
  BulletLogicController_1 = require("./BulletLogicController"),
  WEIGHT_COEFFICIENT = 14,
  TOLERANCE = 1e-5,
  FORCE_DAMPING_RATIO = 0.5,
  MOVE_TIME = 0.1,
  FORCE_RATIO = 5e3,
  MIN_WEIGHT = 50,
  LENGTH_CONVERSION = 100;
class BulletLogicForceController extends BulletLogicController_1.BulletLogicController {
  constructor(t, i) {
    super(t, i),
      (this.g7o = !1),
      (this.f7o = void 0),
      (this.p7o = !1),
      (this.v7o = new Set()),
      (this.M7o = new Set()),
      (this.E7o = Vector_1.Vector.Create()),
      (this.h7o = t),
      (this.a7o = i.GetBulletInfo()),
      (this.S7o = i.GetComponent(167)),
      (this.y7o = new Map()),
      (this.I7o = new Map()),
      (this.NeedTick = !0),
      (this.g7o = this.h7o.ConstantForce),
      (this.p7o = this.h7o.IsLaunching),
      (this.T7o = 0 < this.LogicController.WorkHaveTag.GameplayTags.Num()),
      (this.KIa = this.LogicController.ImmuneStopDuration);
  }
  OnInit() {
    this.L7o();
  }
  L7o() {
    var t;
    this.g7o &&
      ((t = this.a7o.AttackerMoveComp?.IsStandardGravity ?? !0),
      (this.f7o = t
        ? Vector_1.Vector.Create(
            this.h7o.TowardsBullet
              ? this.S7o.ActorUpProxy
              : Vector_1.Vector.UpVector,
          )
        : Vector_1.Vector.Create(
            this.h7o.TowardsBullet
              ? this.S7o.ActorUpProxy
              : this.a7o.AttackerMoveComp.GravityUp,
          )),
      this.f7o.MultiplyEqual(this.h7o.ForceBase));
  }
  Update(t) {
    super.Update(t), this.D7o();
  }
  BulletLogicAction() {
    this.h7o.ConstantForce && this.D7o();
  }
  D7o() {
    var t,
      i,
      e = GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(
        this.LogicController.WorkHaveTag,
      );
    if (this.g7o) {
      this.p7o ||
        ((t = this.v7o),
        (this.v7o = this.M7o),
        (this.M7o = t),
        this.v7o.clear());
      for ([i] of this.a7o.CollisionInfo.CharacterEntityMap)
        !i || (this.T7o && !i.GetComponent(203).HasAnyTag(e)) || this.R7o(i);
    } else
      for (var [s] of this.a7o.CollisionInfo.CharacterEntityMap)
        !s || (this.T7o && !s.GetComponent(203).HasAnyTag(e)) || this.U7o(s);
  }
  U7o(t) {
    var i,
      e,
      s,
      o = t.GetComponent(176);
    !o?.Valid ||
      o.CharacterWeight > this.h7o.LimitWeight ||
      ((s = t.GetComponent(3).ActorLocationProxy),
      (e = Vector_1.Vector.Dist(this.S7o.ActorLocationProxy, s)) >
        this.h7o.OuterRadius) ||
      e < this.h7o.InnerRadius ||
      this.h7o.OuterRadius <= 0 ||
      ((i = Math.max(MIN_WEIGHT, o.CharacterWeight) - WEIGHT_COEFFICIENT),
      (e =
        ((Math.exp(
          -(
            (e / this.h7o.OuterRadius) *
            this.h7o.ForceDampingRatio *
            FORCE_DAMPING_RATIO
          ),
        ) *
          this.h7o.ForceBase *
          FORCE_RATIO) /
          (i * i)) *
        LENGTH_CONVERSION),
      (i = Vector_1.Vector.Create(this.S7o.ActorLocation)).SubtractionEqual(s),
      i.Normalize(TOLERANCE),
      i.MultiplyEqual(e),
      (s = this.y7o.get(t)),
      (s = o.SetAddMoveWorld(i.ToUeVector(), MOVE_TIME, void 0, s)),
      this.y7o.set(t, s),
      0 < this.KIa &&
        (e = t.GetComponent(60)) &&
        !e.IsImmuneTimeScaleEffect() &&
        e.AddImmuneTimeScaleEffectTimer(
          this.KIa * CommonDefine_1.MILLIONSECOND_PER_SECOND,
        ));
  }
  R7o(s) {
    var o = s.GetComponent(173),
      h = s.GetComponent(176);
    if (o?.Valid && h?.Valid) {
      let i = CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_GLIDE;
      if (this.p7o)
        (o.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Air &&
          o.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Other) ||
          h.ActorComp?.Actor.KuroSetMovementMode({
            Mode: 3,
            Context: "[BulletLogicForceController.TowardsConstantForce]",
          }),
          (i = void 0);
      else {
        if (o.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Glide)
          return void this.v7o.add(s);
        this.M7o.has(s) && h.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy);
      }
      let e = this.y7o.get(s);
      var o = s.GetComponent(3),
        r = this.a7o.AttackerMoveComp?.IsStandardGravity ?? !0;
      let t = 0;
      r
        ? (t = this.S7o.ActorLocationProxy.Z - o.ActorLocationProxy.Z)
        : ((l = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
            this.S7o.ActorLocationProxy,
          ),
          l.SubtractionEqual(o.ActorLocationProxy),
          (t = Vector_1.Vector.DotProduct(
            l,
            this.a7o.AttackerMoveComp.GravityUp,
          )),
          BulletPool_1.BulletPool.RecycleVector(l)),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Bullet", 20, "角色到子弹的高度差", ["Dist", t]);
      var l = t - o.ScaledHalfHeight + this.a7o.Size.Z;
      if (this.h7o.HaveTopArea && l < this.h7o.TopAreaHeight)
        0 < l &&
          (r
            ? this.E7o.Set(0, 0, -h.CharacterMovement.Velocity.Z)
            : ((o = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
                h.CharacterMovement.Velocity,
              ),
              (l = -Vector_1.Vector.DotProduct(
                o,
                this.a7o.AttackerMoveComp.GravityUp,
              )),
              BulletPool_1.BulletPool.RecycleVector(o),
              this.a7o.AttackerMoveComp.GravityUp.Multiply(l, this.E7o)),
          (e = h.SetAddMoveWorld(
            this.E7o.ToUeVector(),
            MOVE_TIME,
            this.h7o.ContinueTimeCurve ?? void 0,
            e,
          )),
          this.y7o.set(s, e));
      else {
        let t = 0;
        this.h7o.TowardsBullet
          ? ((t = this.h7o.ContinueTime),
            r
              ? this.E7o.Set(0, 0, 230)
              : this.a7o.AttackerMoveComp.GravityUp.Multiply(230, this.E7o),
            (o = this.h7o.IsResetOnLast
              ? BulletLogicForceController.A7o.get(this.h7o.Group)
              : this.I7o.get(s)),
            (o = h.SetAddMoveWorld(this.E7o.ToUeVector(), t, void 0, o, i)),
            this.h7o.IsResetOnLast
              ? BulletLogicForceController.A7o.set(this.h7o.Group, o)
              : this.I7o.set(s, o))
          : (t = MOVE_TIME),
          (e = this.h7o.IsResetOnLast
            ? BulletLogicForceController.P7o.get(this.h7o.Group)
            : this.y7o.get(s)),
          (e = h.SetAddMoveWorld(
            this.f7o.ToUeVector(),
            t,
            this.h7o.ContinueTimeCurve ?? void 0,
            e,
            i,
          )),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Bullet", 20, "AddMoveWorld", ["Speed", this.f7o]),
          this.h7o.IsResetOnLast
            ? BulletLogicForceController.P7o.set(this.h7o.Group, e)
            : this.y7o.set(s, e);
      }
    }
  }
}
((exports.BulletLogicForceController = BulletLogicForceController).P7o =
  new Map()),
  (BulletLogicForceController.A7o = new Map());
//# sourceMappingURL=BulletLogicForceController.js.map
