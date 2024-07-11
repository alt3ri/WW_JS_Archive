"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletLogicForceController = void 0);
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
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
      (this.v9o = !1),
      (this.M9o = void 0),
      (this.S9o = !1),
      (this.E9o = new Set()),
      (this.y9o = new Set()),
      (this.I9o = Vector_1.Vector.Create()),
      (this.u9o = t),
      (this._9o = i.GetBulletInfo()),
      (this.T9o = i.GetComponent(152)),
      (this.L9o = new Map()),
      (this.D9o = new Map()),
      (this.NeedTick = !0),
      (this.v9o = this.u9o.ConstantForce),
      (this.S9o = this.u9o.IsLaunching),
      (this.R9o = 0 < this.LogicController.WorkHaveTag.GameplayTags.Num());
  }
  OnInit() {
    this.U9o();
  }
  U9o() {
    this.v9o &&
      ((this.M9o = Vector_1.Vector.Create(
        this.u9o.TowardsBullet
          ? this.T9o.ActorUpProxy
          : Vector_1.Vector.UpVector,
      )),
      this.M9o.MultiplyEqual(this.u9o.ForceBase));
  }
  Update(t) {
    super.Update(t), this.A9o();
  }
  BulletLogicAction() {
    this.u9o.ConstantForce && this.A9o();
  }
  A9o() {
    var t,
      i,
      e = GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(
        this.LogicController.WorkHaveTag,
      );
    if (this.v9o) {
      this.S9o ||
        ((t = this.E9o),
        (this.E9o = this.y9o),
        (this.y9o = t),
        this.E9o.clear());
      for ([i] of this._9o.CollisionInfo.CharacterEntityMap)
        !i || (this.R9o && !i.GetComponent(185).HasAnyTag(e)) || this.P9o(i);
    } else
      for (var [s] of this._9o.CollisionInfo.CharacterEntityMap)
        !s || (this.R9o && !s.GetComponent(185).HasAnyTag(e)) || this.x9o(s);
  }
  x9o(t) {
    var i,
      e,
      s,
      h = t.GetComponent(161);
    !h?.Valid ||
      h.CharacterWeight > this.u9o.LimitWeight ||
      ((s = t.GetComponent(3).ActorLocationProxy),
      (i = Vector_1.Vector.Dist(this.T9o.ActorLocationProxy, s)) >
        this.u9o.OuterRadius) ||
      i < this.u9o.InnerRadius ||
      this.u9o.OuterRadius <= 0 ||
      ((e = Math.max(MIN_WEIGHT, h.CharacterWeight) - WEIGHT_COEFFICIENT),
      (i =
        ((Math.exp(
          -(
            (i / this.u9o.OuterRadius) *
            this.u9o.ForceDampingRatio *
            FORCE_DAMPING_RATIO
          ),
        ) *
          this.u9o.ForceBase *
          FORCE_RATIO) /
          (e * e)) *
        LENGTH_CONVERSION),
      (e = Vector_1.Vector.Create(this.T9o.ActorLocation)).SubtractionEqual(s),
      e.Normalize(TOLERANCE),
      e.MultiplyEqual(i),
      (s = this.L9o.get(t)),
      (s = h.SetAddMoveWorld(e.ToUeVector(), MOVE_TIME, void 0, s)),
      this.L9o.set(t, s));
  }
  P9o(s) {
    var h = s.GetComponent(158),
      o = s.GetComponent(161);
    if (h?.Valid && o?.Valid) {
      let i = CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_GLIDE;
      if (this.S9o)
        (h.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Air &&
          h.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Other) ||
          o.CharacterMovement.SetMovementMode(3),
          (i = void 0);
      else {
        if (h.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Glide)
          return void this.E9o.add(s);
        this.y9o.has(s) && o.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy);
      }
      let e = this.L9o.get(s);
      var h = s.GetComponent(3),
        h =
          this.T9o.ActorLocationProxy.Z +
          this._9o.Size.Z -
          h.ActorLocation.Z -
          h.ScaledHalfHeight;
      if (this.u9o.HaveTopArea && h < this.u9o.TopAreaHeight)
        0 < h &&
          (this.I9o.Set(0, 0, -o.CharacterMovement.Velocity.Z),
          (e = o.SetAddMoveWorld(
            this.I9o.ToUeVector(),
            MOVE_TIME,
            this.u9o.ContinueTimeCurve ?? void 0,
            e,
          )),
          this.L9o.set(s, e));
      else {
        let t = 0;
        this.u9o.TowardsBullet
          ? ((t = this.u9o.ContinueTime),
            this.I9o.Set(0, 0, 230),
            (h = this.u9o.IsResetOnLast
              ? BulletLogicForceController.w9o.get(this.u9o.Group)
              : this.D9o.get(s)),
            (h = o.SetAddMoveWorld(this.I9o.ToUeVector(), t, void 0, h, i)),
            this.u9o.IsResetOnLast
              ? BulletLogicForceController.w9o.set(this.u9o.Group, h)
              : this.D9o.set(s, h))
          : (t = MOVE_TIME),
          (e = this.u9o.IsResetOnLast
            ? BulletLogicForceController.B9o.get(this.u9o.Group)
            : this.L9o.get(s)),
          (e = o.SetAddMoveWorld(
            this.M9o.ToUeVector(),
            t,
            this.u9o.ContinueTimeCurve ?? void 0,
            e,
            i,
          )),
          this.u9o.IsResetOnLast
            ? BulletLogicForceController.B9o.set(this.u9o.Group, e)
            : this.L9o.set(s, e);
      }
    }
  }
}
((exports.BulletLogicForceController = BulletLogicForceController).B9o =
  new Map()),
  (BulletLogicForceController.w9o = new Map());
//# sourceMappingURL=BulletLogicForceController.js.map
