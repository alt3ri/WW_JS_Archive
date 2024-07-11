"use strict";
var CharacterGlideComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, _) {
      var h,
        o = arguments.length,
        r =
          o < 3
            ? e
            : null === _
              ? (_ = Object.getOwnPropertyDescriptor(e, i))
              : _;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(t, e, i, _);
      else
        for (var n = t.length - 1; 0 <= n; n--)
          (h = t[n]) &&
            (r = (o < 3 ? h(r) : 3 < o ? h(e, i, r) : h(e, i)) || r);
      return 3 < o && r && Object.defineProperty(e, i, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterGlideComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Quat_1 = require("../../../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  CustomMovementDefine_1 = require("./Move/CustomMovementDefine"),
  FLYING_GRAVITY = 15,
  FLYING_FRICTION = 0.1,
  FLYING_DECELERATION = 0.068,
  FLYING_ACCELERATOR = 55,
  FLYING_MAX_SPEED = 650,
  FLYING_MAX_FALLING_SPEED = 250,
  SOAR_MAX_NORMAL_ANGLE = 45,
  SOAR_NORMAL_SPEED = 80,
  SOAR_AIRFRICTION = 0.1,
  SOAR_AERODYNAMICS = 5,
  SOAR_ROTATE_SPEED = 80,
  SOAR_TURN_SPEED_SQR_THRESHOLD = 1e4,
  SOAR_PITCH_MIN = 20,
  SOAR_PITCH_MAX = 90,
  SOAR_PITCH_AVERAGE = (SOAR_PITCH_MIN + SOAR_PITCH_MAX) / 2,
  SOAR_INPUT_MIN_SPEED = 500,
  SOAR_INPUT_MAX_SPEED = 1e3,
  soarGravity = new UE.Vector(0, 0, -2e3),
  SOAR_NORMAL_SPEED_NO_INPUT_ROLL = 45,
  SOAR_NORMAL_SPEED_NO_INPUT_PTICH = 10,
  DEBUG_DRAW = !1,
  redColor = new UE.LinearColor(1, 0, 0, 1),
  greenColor = new UE.LinearColor(0, 1, 0, 1);
let CharacterGlideComponent =
  (CharacterGlideComponent_1 = class CharacterGlideComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.nXt = void 0),
        (this.s3o = void 0),
        (this._Vr = void 0),
        (this.Xte = void 0),
        (this.oRe = void 0),
        (this.uVr = void 0),
        (this.cVr = Vector_1.Vector.Create()),
        (this.mVr = Vector_1.Vector.Create()),
        (this.dVr = Quat_1.Quat.Create()),
        (this.CVr = Vector_1.Vector.Create()),
        (this.gVr = !1),
        (this.fVr = 0),
        (this.pVr = (t) => {
          this.Xte?.HasTag(921953316)
            ? this.s3o.CharacterMovement.KuroFlying(
                t,
                0,
                FLYING_FRICTION,
                FLYING_DECELERATION,
                FLYING_ACCELERATOR,
                FLYING_MAX_SPEED,
                FLYING_MAX_FALLING_SPEED,
              )
            : this.s3o.CharacterMovement.KuroFlying(
                t,
                FLYING_GRAVITY,
                FLYING_FRICTION,
                FLYING_DECELERATION,
                FLYING_ACCELERATOR,
                FLYING_MAX_SPEED,
                FLYING_MAX_FALLING_SPEED,
              );
        }),
        (this.vVr = (t) => {
          var e, i, _;
          this.nXt &&
            this.s3o &&
            (e = this.s3o.CharacterMovement) &&
            (this.CalculateSoarQuat(),
            this.dVr.RotateVector(
              Vector_1.Vector.UpVectorProxy,
              CharacterGlideComponent_1.Lz,
            ),
            (i = this.oRe?.HasKuroRootMotion),
            (_ = !this.nXt.InputDirectProxy.IsZero()),
            this.gVr
              ? this.s3o.Speed > SOAR_INPUT_MAX_SPEED && (this.gVr = !1)
              : this.fVr < Time_1.Time.Frame &&
                !i &&
                this.s3o.Speed < SOAR_INPUT_MIN_SPEED &&
                (this.gVr = !0),
            i
              ? this.dVr.RotateVector(Vector_1.Vector.UpVectorProxy, this.mVr)
              : this.gVr || !_
                ? (this.nXt.ActorQuatProxy.Inverse(
                    CharacterGlideComponent_1.az,
                  ),
                  CharacterGlideComponent_1.az.RotateVector(
                    this.mVr,
                    CharacterGlideComponent_1.Lz,
                  ),
                  (i =
                    Math.atan2(
                      CharacterGlideComponent_1.Lz.Y,
                      CharacterGlideComponent_1.Lz.Z,
                    ) * MathUtils_1.MathUtils.RadToDeg),
                  (_ =
                    Math.atan2(
                      Math.sqrt(
                        MathUtils_1.MathUtils.Square(
                          CharacterGlideComponent_1.Lz.Z,
                        ) +
                          MathUtils_1.MathUtils.Square(
                            CharacterGlideComponent_1.Lz.Y,
                          ),
                      ),
                      CharacterGlideComponent_1.Lz.X,
                    ) * MathUtils_1.MathUtils.RadToDeg),
                  (i =
                    MathUtils_1.MathUtils.InterpConstantTo(
                      i,
                      0,
                      t,
                      SOAR_NORMAL_SPEED_NO_INPUT_ROLL,
                    ) * MathUtils_1.MathUtils.DegToRad),
                  (_ =
                    MathUtils_1.MathUtils.InterpConstantTo(
                      _,
                      SOAR_PITCH_MIN,
                      t,
                      SOAR_NORMAL_SPEED_NO_INPUT_PTICH,
                    ) * MathUtils_1.MathUtils.DegToRad),
                  (CharacterGlideComponent_1.Lz.X = Math.cos(_)),
                  (_ = Math.sin(_)),
                  (CharacterGlideComponent_1.Lz.Y = _ * Math.sin(i)),
                  (CharacterGlideComponent_1.Lz.Z = _ * Math.cos(i)),
                  this.nXt.ActorQuatProxy.RotateVector(
                    CharacterGlideComponent_1.Lz,
                    this.mVr,
                  ))
                : (this.cVr.DeepCopy(this.nXt.InputDirectProxy),
                  this.cVr.Normalize(),
                  (_ = this.cVr.Y * SOAR_ROTATE_SPEED * t),
                  CharacterGlideComponent_1.Gue.Set(0, _, 0),
                  this.nXt.AddActorLocalRotation(
                    CharacterGlideComponent_1.Gue.ToUeRotator(),
                  ),
                  CharacterGlideComponent_1.Gue.Quaternion(
                    CharacterGlideComponent_1.az,
                  ),
                  CharacterGlideComponent_1.az.Multiply(this.dVr, this.dVr),
                  CharacterGlideComponent_1.Lz.DeepCopy(
                    this.nXt.ActorVelocityProxy,
                  ),
                  CharacterGlideComponent_1.az.RotateVector(
                    CharacterGlideComponent_1.Lz,
                    CharacterGlideComponent_1.Lz,
                  ),
                  (e.Velocity = CharacterGlideComponent_1.Lz.ToUeVector()),
                  CharacterGlideComponent_1.az.RotateVector(this.mVr, this.mVr),
                  (i =
                    this.cVr.X *
                    SOAR_MAX_NORMAL_ANGLE *
                    MathUtils_1.MathUtils.DegToRad),
                  (this.CVr.X = Math.sin(i)),
                  (this.CVr.Y = 0),
                  (this.CVr.Z = Math.cos(i)),
                  this.dVr.RotateVector(this.CVr, this.CVr),
                  this.dVr.RotateVector(
                    Vector_1.Vector.UpVectorProxy,
                    CharacterGlideComponent_1.Lz,
                  ),
                  this.MVr(this.CVr),
                  (_ = SOAR_NORMAL_SPEED * t),
                  Vector_1.Vector.DirectLerp(this.mVr, this.CVr, _, this.mVr)),
            this.dVr.Inverse(CharacterGlideComponent_1.az),
            CharacterGlideComponent_1.az.RotateVector(
              this.mVr,
              CharacterGlideComponent_1.Lz,
            ),
            CharacterGlideComponent_1.Lz.Z < 0 &&
              ((CharacterGlideComponent_1.Lz.X =
                -CharacterGlideComponent_1.Lz.X),
              (CharacterGlideComponent_1.Lz.Y =
                -CharacterGlideComponent_1.Lz.Y),
              this.dVr.RotateVector(CharacterGlideComponent_1.Lz, this.mVr)),
            DEBUG_DRAW &&
              (this.nXt.ActorLocationProxy.Addition(
                this.nXt.ActorVelocityProxy,
                CharacterGlideComponent_1.Lz,
              ),
              UE.KismetSystemLibrary.DrawDebugArrow(
                this.nXt.Actor,
                this.nXt.ActorLocationProxy.ToUeVector(),
                CharacterGlideComponent_1.Lz.ToUeVector(),
                100,
                redColor,
                void 0,
                10,
              ),
              this.mVr.Multiply(100, CharacterGlideComponent_1.Lz),
              CharacterGlideComponent_1.Lz.AdditionEqual(
                this.nXt.ActorLocationProxy,
              ),
              UE.KismetSystemLibrary.DrawDebugArrow(
                this.nXt.Actor,
                this.nXt.ActorLocationProxy.ToUeVector(),
                CharacterGlideComponent_1.Lz.ToUeVector(),
                100,
                greenColor,
                void 0,
                10,
              )),
            CharacterGlideComponent_1.Lz.Z < 0 &&
              ((CharacterGlideComponent_1.Lz.Z = 0),
              CharacterGlideComponent_1.Lz.Normalize() ||
                CharacterGlideComponent_1.Lz.DeepCopy(
                  this.nXt.ActorForwardProxy,
                )),
            UE.KuroMovementBPLibrary.KuroSoar(
              t,
              e,
              SOAR_AIRFRICTION,
              SOAR_AERODYNAMICS,
              soarGravity,
              this.mVr.ToUeVector(),
            ) || this.ExitSoarState(),
            this.nXt.ResetAllCachedTime());
        }),
        (this.OnStateInherit = (t, e, i) => {
          t?.Valid &&
            (t = t.GetComponent(50))?.Valid &&
            0 === e &&
            !i &&
            (this.mVr.DeepCopy(t.mVr),
            this.dVr.DeepCopy(t.dVr),
            this.CVr.DeepCopy(t.CVr),
            (this.gVr = t.gVr));
        }),
        (this.SVr = (t, e) => {
          this._Vr?.SetParaglidingIsAscent(e);
        });
    }
    OnStart() {
      return (
        (this.nXt = this.Entity.CheckGetComponent(3)),
        (this.s3o = this.Entity.CheckGetComponent(161)),
        (this._Vr = this.Entity.CheckGetComponent(69)),
        (this.Xte = this.Entity.CheckGetComponent(185)),
        (this.oRe = this.Entity.CheckGetComponent(160)),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CustomMoveGlide,
          this.pVr,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CustomMoveSoar,
          this.vVr,
        ),
        (this.uVr = this.Xte.ListenForTagAddOrRemove(-1819043374, this.SVr)),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.OnStateInherit,
        ),
        !0
      );
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CustomMoveGlide,
          this.pVr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CustomMoveSoar,
          this.vVr,
        ),
        this.uVr.EndTask(),
        (this.uVr = void 0),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.OnStateInherit,
        ),
        !0
      );
    }
    EnterGlideState() {
      this.s3o.CharacterMovement.SetMovementMode(
        6,
        CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_GLIDE,
      );
    }
    ExitGlideState() {
      this.s3o.CharacterMovement.SetMovementMode(3, 0);
    }
    EnterSoarState() {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Test", 6, "EnterSoarState", ["Entity", this.Entity.Id]),
        this.s3o.CharacterMovement.SetMovementMode(
          6,
          CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SOAR,
        ),
        this.nXt.ClearInput(),
        this.CalculateSoarQuat(),
        this.dVr.RotateVector(Vector_1.Vector.UpVectorProxy, this.mVr),
        (this.gVr = !1),
        (this.fVr = Time_1.Time.Frame);
    }
    ExitSoarState() {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Test", 6, "ExitSoarState", ["Entity", this.Entity.Id]),
        this.s3o.CharacterMovement.SetMovementMode(3, 0);
    }
    CalculateSoarQuat() {
      var t;
      this.nXt.ActorVelocityProxy.IsNearlyZero()
        ? this.dVr.DeepCopy(this.nXt.ActorQuatProxy)
        : (t = this.nXt.ActorVelocityProxy).SizeSquared2D() <
            SOAR_TURN_SPEED_SQR_THRESHOLD
          ? (CharacterGlideComponent_1.Lz.DeepCopy(this.nXt.ActorForwardProxy),
            0 < t.Z && CharacterGlideComponent_1.Lz.MultiplyEqual(-1),
            MathUtils_1.MathUtils.LookRotationForwardFirst(
              t,
              CharacterGlideComponent_1.Lz,
              this.dVr,
            ))
          : MathUtils_1.MathUtils.LookRotationForwardFirst(
              t,
              Vector_1.Vector.UpVectorProxy,
              this.dVr,
            );
    }
    MVr(t) {
      var e, i;
      this.nXt &&
        ((i = t.DotProduct(this.nXt.ActorForwardProxy)),
        (e = t.DotProduct(Vector_1.Vector.UpVectorProxy)),
        ((e = Math.atan2(e, i) * MathUtils_1.MathUtils.RadToDeg) >=
          SOAR_PITCH_MIN &&
          e <= SOAR_PITCH_MAX) ||
          ((i =
            ((MathUtils_1.MathUtils.WrapAngle(e - SOAR_PITCH_AVERAGE) < 0
              ? SOAR_PITCH_MIN
              : SOAR_PITCH_MAX) -
              e) *
            MathUtils_1.MathUtils.DegToRad),
          CharacterGlideComponent_1.Lz.Set(Math.cos(i), 0, Math.sin(i)),
          this.nXt.ActorQuatProxy.RotateVector(
            CharacterGlideComponent_1.Lz,
            CharacterGlideComponent_1.Lz,
          ),
          Quat_1.Quat.FindBetween(
            this.nXt.ActorForwardProxy,
            CharacterGlideComponent_1.Lz,
            CharacterGlideComponent_1.az,
          ),
          CharacterGlideComponent_1.az.RotateVector(t, t)));
    }
  });
(CharacterGlideComponent.Lz = Vector_1.Vector.Create()),
  (CharacterGlideComponent.Gue = Rotator_1.Rotator.Create()),
  (CharacterGlideComponent.az = Quat_1.Quat.Create()),
  (CharacterGlideComponent = CharacterGlideComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(50)],
      CharacterGlideComponent,
    )),
  (exports.CharacterGlideComponent = CharacterGlideComponent);
//# sourceMappingURL=CharacterGlideComponent.js.map
