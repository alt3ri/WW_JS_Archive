"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletLogicForceController = void 0);
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  CharacterUnifiedStateTypes_1 = require("../../Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  CustomMovementDefine_1 = require("../../Character/Common/Component/Move/CustomMovementDefine"),
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
      (this.S7o = i.GetComponent(155)),
      (this.y7o = new Map()),
      (this.I7o = new Map()),
      (this.NeedTick = !0),
      (this.g7o = this.h7o.ConstantForce),
      (this.p7o = this.h7o.IsLaunching),
      (this.T7o = 0 < this.LogicController.WorkHaveTag.GameplayTags.Num()),
      (this.XIa = this.LogicController.ImmuneStopDuration);
  }
  OnInit() {
    this.L7o();
  }
  L7o() {
    this.g7o &&
      ((this.f7o = Vector_1.Vector.Create(
        this.h7o.TowardsBullet
          ? this.S7o.ActorUpProxy
          : Vector_1.Vector.UpVector,
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
        !i || (this.T7o && !i.GetComponent(190).HasAnyTag(e)) || this.R7o(i);
    } else
      for (var [s] of this.a7o.CollisionInfo.CharacterEntityMap)
        !s || (this.T7o && !s.GetComponent(190).HasAnyTag(e)) || this.U7o(s);
  }
  U7o(t) {
    var i,
      e,
      s,
      h = t.GetComponent(164);
    !h?.Valid ||
      h.CharacterWeight > this.h7o.LimitWeight ||
      ((s = t.GetComponent(3).ActorLocationProxy),
      (e = Vector_1.Vector.Dist(this.S7o.ActorLocationProxy, s)) >
        this.h7o.OuterRadius) ||
      e < this.h7o.InnerRadius ||
      this.h7o.OuterRadius <= 0 ||
      ((i = Math.max(MIN_WEIGHT, h.CharacterWeight) - WEIGHT_COEFFICIENT),
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
      (s = h.SetAddMoveWorld(i.ToUeVector(), MOVE_TIME, void 0, s)),
      this.y7o.set(t, s),
      0 < this.XIa &&
        (e = t.GetComponent(53)) &&
        !e.IsImmuneTimeScaleEffect() &&
        e.AddImmuneTimeScaleEffectTimer(
          this.XIa * CommonDefine_1.MILLIONSECOND_PER_SECOND,
        ));
  }
  R7o(s) {
    var h = s.GetComponent(161),
      o = s.GetComponent(164);
    if (h?.Valid && o?.Valid) {
      let i = CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_GLIDE;
      if (this.p7o)
        (h.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Air &&
          h.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Other) ||
          o.CharacterMovement.SetMovementMode(3),
          (i = void 0);
      else {
        if (h.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Glide)
          return void this.v7o.add(s);
        this.M7o.has(s) && o.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy);
      }
      let e = this.y7o.get(s);
      var h = s.GetComponent(3),
        h =
          this.S7o.ActorLocationProxy.Z +
          this.a7o.Size.Z -
          h.ActorLocation.Z -
          h.ScaledHalfHeight;
      if (this.h7o.HaveTopArea && h < this.h7o.TopAreaHeight)
        0 < h &&
          (this.E7o.Set(0, 0, -o.CharacterMovement.Velocity.Z),
          (e = o.SetAddMoveWorld(
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
            this.E7o.Set(0, 0, 230),
            (h = this.h7o.IsResetOnLast
              ? BulletLogicForceController.A7o.get(this.h7o.Group)
              : this.I7o.get(s)),
            (h = o.SetAddMoveWorld(this.E7o.ToUeVector(), t, void 0, h, i)),
            this.h7o.IsResetOnLast
              ? BulletLogicForceController.A7o.set(this.h7o.Group, h)
              : this.I7o.set(s, h))
          : (t = MOVE_TIME),
          (e = this.h7o.IsResetOnLast
            ? BulletLogicForceController.P7o.get(this.h7o.Group)
            : this.y7o.get(s)),
          (e = o.SetAddMoveWorld(
            this.f7o.ToUeVector(),
            t,
            this.h7o.ContinueTimeCurve ?? void 0,
            e,
            i,
          )),
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
