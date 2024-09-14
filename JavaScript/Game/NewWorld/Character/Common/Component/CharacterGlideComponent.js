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
        (this.n$t = void 0),
        (this.o4o = void 0),
        (this.H5r = void 0),
        (this.Xte = void 0),
        (this.oRe = void 0),
        (this.j5r = void 0),
        (this.W5r = Vector_1.Vector.Create()),
        (this.K5r = Vector_1.Vector.Create()),
        (this.Q5r = Quat_1.Quat.Create()),
        (this.X5r = Vector_1.Vector.Create()),
        (this.$5r = !1),
        (this.Y5r = 0),
        (this.J5r = (t) => {
          this.Xte?.HasTag(921953316)
            ? this.o4o.CharacterMovement.KuroFlying(
                t,
                0,
                FLYING_FRICTION,
                FLYING_DECELERATION,
                FLYING_ACCELERATOR,
                FLYING_MAX_SPEED,
                FLYING_MAX_FALLING_SPEED,
              )
            : this.o4o.CharacterMovement.KuroFlying(
                t,
                FLYING_GRAVITY,
                FLYING_FRICTION,
                FLYING_DECELERATION,
                FLYING_ACCELERATOR,
                FLYING_MAX_SPEED,
                FLYING_MAX_FALLING_SPEED,
              );
        }),
        (this.z5r = (t) => {
          var e, i, _;
          this.n$t &&
            this.o4o &&
            (e = this.o4o.CharacterMovement) &&
            (this.CalculateSoarQuat(),
            this.Q5r.RotateVector(
              Vector_1.Vector.UpVectorProxy,
              CharacterGlideComponent_1.Lz,
            ),
            (i = this.oRe?.HasKuroRootMotion),
            (_ = !this.n$t.InputDirectProxy.IsZero()),
            this.$5r
              ? this.o4o.Speed > SOAR_INPUT_MAX_SPEED && (this.$5r = !1)
              : this.Y5r < Time_1.Time.Frame &&
                !i &&
                this.o4o.Speed < SOAR_INPUT_MIN_SPEED &&
                (this.$5r = !0),
            i
              ? this.Q5r.RotateVector(Vector_1.Vector.UpVectorProxy, this.K5r)
              : this.$5r || !_
                ? (this.n$t.ActorQuatProxy.Inverse(
                    CharacterGlideComponent_1.az,
                  ),
                  CharacterGlideComponent_1.az.RotateVector(
                    this.K5r,
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
                  this.n$t.ActorQuatProxy.RotateVector(
                    CharacterGlideComponent_1.Lz,
                    this.K5r,
                  ))
                : (this.W5r.DeepCopy(this.n$t.InputDirectProxy),
                  this.W5r.Normalize(),
                  (_ = this.W5r.Y * SOAR_ROTATE_SPEED * t),
                  CharacterGlideComponent_1.Gue.Set(0, _, 0),
                  this.n$t.AddActorLocalRotation(
                    CharacterGlideComponent_1.Gue.ToUeRotator(),
                  ),
                  CharacterGlideComponent_1.Gue.Quaternion(
                    CharacterGlideComponent_1.az,
                  ),
                  CharacterGlideComponent_1.az.Multiply(this.Q5r, this.Q5r),
                  CharacterGlideComponent_1.Lz.DeepCopy(
                    this.n$t.ActorVelocityProxy,
                  ),
                  CharacterGlideComponent_1.az.RotateVector(
                    CharacterGlideComponent_1.Lz,
                    CharacterGlideComponent_1.Lz,
                  ),
                  (e.Velocity = CharacterGlideComponent_1.Lz.ToUeVector()),
                  CharacterGlideComponent_1.az.RotateVector(this.K5r, this.K5r),
                  (i =
                    this.W5r.X *
                    SOAR_MAX_NORMAL_ANGLE *
                    MathUtils_1.MathUtils.DegToRad),
                  (this.X5r.X = Math.sin(i)),
                  (this.X5r.Y = 0),
                  (this.X5r.Z = Math.cos(i)),
                  this.Q5r.RotateVector(this.X5r, this.X5r),
                  this.Q5r.RotateVector(
                    Vector_1.Vector.UpVectorProxy,
                    CharacterGlideComponent_1.Lz,
                  ),
                  this.Z5r(this.X5r),
                  (_ = SOAR_NORMAL_SPEED * t),
                  Vector_1.Vector.DirectLerp(this.K5r, this.X5r, _, this.K5r)),
            this.Q5r.Inverse(CharacterGlideComponent_1.az),
            CharacterGlideComponent_1.az.RotateVector(
              this.K5r,
              CharacterGlideComponent_1.Lz,
            ),
            CharacterGlideComponent_1.Lz.Z < 0 &&
              ((CharacterGlideComponent_1.Lz.X =
                -CharacterGlideComponent_1.Lz.X),
              (CharacterGlideComponent_1.Lz.Y =
                -CharacterGlideComponent_1.Lz.Y),
              this.Q5r.RotateVector(CharacterGlideComponent_1.Lz, this.K5r)),
            DEBUG_DRAW &&
              (this.n$t.ActorLocationProxy.Addition(
                this.n$t.ActorVelocityProxy,
                CharacterGlideComponent_1.Lz,
              ),
              UE.KismetSystemLibrary.DrawDebugArrow(
                this.n$t.Actor,
                this.n$t.ActorLocationProxy.ToUeVector(),
                CharacterGlideComponent_1.Lz.ToUeVector(),
                100,
                redColor,
                void 0,
                10,
              ),
              this.K5r.Multiply(100, CharacterGlideComponent_1.Lz),
              CharacterGlideComponent_1.Lz.AdditionEqual(
                this.n$t.ActorLocationProxy,
              ),
              UE.KismetSystemLibrary.DrawDebugArrow(
                this.n$t.Actor,
                this.n$t.ActorLocationProxy.ToUeVector(),
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
                  this.n$t.ActorForwardProxy,
                )),
            UE.KuroMovementBPLibrary.KuroSoar(
              t,
              e,
              SOAR_AIRFRICTION,
              SOAR_AERODYNAMICS,
              soarGravity,
              this.K5r.ToUeVector(),
            ) || this.ExitSoarState(),
            this.n$t.ResetAllCachedTime());
        }),
        (this.OnStateInherit = (t, e) => {
          t?.Valid &&
            (t = t.GetComponent(52))?.Valid &&
            !e &&
            (this.K5r.DeepCopy(t.K5r),
            this.Q5r.DeepCopy(t.Q5r),
            this.X5r.DeepCopy(t.X5r),
            (this.$5r = t.$5r));
        }),
        (this.eVr = (t, e) => {
          this.H5r?.SetParaglidingIsAscent(e);
        });
    }
    OnStart() {
      return (
        (this.n$t = this.Entity.CheckGetComponent(3)),
        (this.o4o = this.Entity.CheckGetComponent(164)),
        (this.H5r = this.Entity.CheckGetComponent(72)),
        (this.Xte = this.Entity.CheckGetComponent(190)),
        (this.oRe = this.Entity.CheckGetComponent(163)),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CustomMoveGlide,
          this.J5r,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CustomMoveSoar,
          this.z5r,
        ),
        (this.j5r = this.Xte.ListenForTagAddOrRemove(-1819043374, this.eVr)),
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
          this.J5r,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CustomMoveSoar,
          this.z5r,
        ),
        this.j5r.EndTask(),
        (this.j5r = void 0),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.OnStateInherit,
        ),
        !0
      );
    }
    EnterGlideState() {
      this.o4o.CharacterMovement.SetMovementMode(
        6,
        CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_GLIDE,
      );
    }
    ExitGlideState() {
      this.o4o.CharacterMovement.SetMovementMode(3, 0);
    }
    EnterSoarState() {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Test", 6, "EnterSoarState", ["Entity", this.Entity.Id]),
        this.o4o.CharacterMovement.SetMovementMode(
          6,
          CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SOAR,
        ),
        this.n$t.ClearInput(),
        this.CalculateSoarQuat(),
        this.Q5r.RotateVector(Vector_1.Vector.UpVectorProxy, this.K5r),
        (this.$5r = !1),
        (this.Y5r = Time_1.Time.Frame);
    }
    ExitSoarState() {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Test", 6, "ExitSoarState", ["Entity", this.Entity.Id]),
        this.o4o.CharacterMovement.SetMovementMode(3, 0);
    }
    CalculateSoarQuat() {
      var t;
      this.n$t.ActorVelocityProxy.IsNearlyZero()
        ? this.Q5r.DeepCopy(this.n$t.ActorQuatProxy)
        : (t = this.n$t.ActorVelocityProxy).SizeSquared2D() <
            SOAR_TURN_SPEED_SQR_THRESHOLD
          ? (CharacterGlideComponent_1.Lz.DeepCopy(this.n$t.ActorForwardProxy),
            0 < t.Z && CharacterGlideComponent_1.Lz.MultiplyEqual(-1),
            MathUtils_1.MathUtils.LookRotationForwardFirst(
              t,
              CharacterGlideComponent_1.Lz,
              this.Q5r,
            ))
          : MathUtils_1.MathUtils.LookRotationForwardFirst(
              t,
              Vector_1.Vector.UpVectorProxy,
              this.Q5r,
            );
    }
    Z5r(t) {
      var e, i;
      this.n$t &&
        ((i = t.DotProduct(this.n$t.ActorForwardProxy)),
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
          this.n$t.ActorQuatProxy.RotateVector(
            CharacterGlideComponent_1.Lz,
            CharacterGlideComponent_1.Lz,
          ),
          Quat_1.Quat.FindBetween(
            this.n$t.ActorForwardProxy,
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
      [(0, RegisterComponent_1.RegisterComponent)(52)],
      CharacterGlideComponent,
    )),
  (exports.CharacterGlideComponent = CharacterGlideComponent);
//# sourceMappingURL=CharacterGlideComponent.js.map
