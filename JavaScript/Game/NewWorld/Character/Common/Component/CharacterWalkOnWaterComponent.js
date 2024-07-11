"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var h,
      r = arguments.length,
      _ =
        r < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(t, e, i, s);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (h = t[n]) && (_ = (r < 3 ? h(_) : 3 < r ? h(e, i, _) : h(e, i)) || _);
    return 3 < r && _ && Object.defineProperty(e, i, _), _;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterWalkOnWaterComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes"),
  CustomMovementDefine_1 = require("./Move/CustomMovementDefine"),
  MAX_BYTE = 255,
  EIGHTY = 80,
  COS_EIGHTY = 0.173,
  PROFILE_DETECT_WATER_DEPTH = "CharacterWalkOnWaterComponent_DetectWaterDepth",
  ENTER_UP_TO_WALK_ON_WATER_DEPTH = 10,
  ENTER_WALK_ON_WATER_DEPTH = 4,
  PRE_FRAME_POSITION_MAX_DISTANCE = 1e3,
  UP_TO_WATER_SURFACE_SPEED = 500,
  CHECK_IN_GROUND_INTERVAL = 1e3,
  FIVE_HUNDRED_TO_FIND_SURFACE = 1e3,
  WALK_ON_WATER_HALF_HEIGHT_OFFSET = 3,
  WALK_ON_WATER_RADIUS_OFFSET = 20;
class CharacterSwimUtils {}
(CharacterSwimUtils.AfterTransformLocationOffset = new UE.Vector(EIGHTY, 0, 0)),
  (CharacterSwimUtils.DebugColor1 = new UE.LinearColor(
    MAX_BYTE,
    MAX_BYTE,
    0,
    1,
  )),
  (CharacterSwimUtils.DebugColor2 = new UE.LinearColor(0, MAX_BYTE, 0, 1)),
  (CharacterSwimUtils.DebugColor3 = new UE.LinearColor(MAX_BYTE, 0, 0, 1)),
  (CharacterSwimUtils.DebugColor4 = new UE.LinearColor(
    0,
    MAX_BYTE,
    MAX_BYTE,
    1,
  ));
let CharacterWalkOnWaterComponent = class CharacterWalkOnWaterComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.IsDebug = !1),
      (this.fKr = void 0),
      (this.Mao = void 0),
      (this.pKr = void 0),
      (this.Hte = void 0),
      (this.Lie = void 0),
      (this.Gce = void 0),
      (this.mBe = void 0),
      (this.vKr = void 0),
      (this.Xjt = !1),
      (this.dce = !1),
      (this.vWr = 0),
      (this.cz = void 0),
      (this.UWr = void 0),
      (this.AWr = void 0),
      (this.MKr = 0),
      (this.EKr = 0),
      (this.SKr = void 0),
      (this.yKr = void 0),
      (this.WalkOnWaterStage = 0),
      (this.IKr = void 0),
      (this.XOr = (t, e) => {
        1 === this.WalkOnWaterStage &&
          0 < this.TKr(e) &&
          (this.Gce.CharacterMovement.MaxCustomMovementSpeed = this.TKr(e));
      }),
      (this.LKr = (t) => {
        this.Gce.CharacterMovement.KuroFlying(
          t,
          0,
          0,
          0,
          this.Gce.CurrentMovementSettings.Acceleration,
          this.TKr(this.mBe.MoveState),
          1,
        );
      }),
      (this.I3r = (t) => {
        t?.Valid &&
          ((this.dce = this.Lie.HasTag(-1523054094)),
          this.dce ||
            (this.DKr(0),
            this.mBe.SetPositionSubState(
              CharacterUnifiedStateTypes_1.ECharPositionSubState.None,
            )));
      }),
      (this.RKr = (t, e) => {
        (this.dce = e) ||
          (this.DKr(0),
          this.mBe.SetPositionSubState(
            CharacterUnifiedStateTypes_1.ECharPositionSubState.None,
          ));
      }),
      (this.DVr = (t, e) => {
        this.dce &&
          e === CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
          (this.UKr() || this.AKr() || this._Kr()
            ? this.mBe.SetPositionSubState(
                CharacterUnifiedStateTypes_1.ECharPositionSubState.WaterSurface,
              )
            : (this.mBe.SetPositionSubState(
                CharacterUnifiedStateTypes_1.ECharPositionSubState.None,
              ),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Movement", 37, "[WalkOnWater] EnterGround")));
      }),
      (this.Ilt = (t, e) => {
        this.dce &&
          this.mBe?.PositionState ===
            CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
          (this.UKr() || this.AKr() || this._Kr()) &&
          this.mBe.SetPositionSubState(
            CharacterUnifiedStateTypes_1.ECharPositionSubState.WaterSurface,
          );
      }),
      (this.PKr = -0),
      (this.xKr = -0),
      (this.wKr = CHECK_IN_GROUND_INTERVAL);
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(3);
    var t = this.Entity.GetComponent(188);
    if (!t?.Valid) return !1;
    this.Lie = t;
    t = this.Entity.GetComponent(163);
    if (!t?.Valid) return !1;
    (this.WalkOnWaterStage = 0),
      (this.Gce = t),
      (this.mBe = this.Entity.GetComponent(160));
    t = this.Entity.GetComponent(0).GetEntityType();
    return (
      (this.Xjt = t === Protocol_1.Aki.Protocol.wks.Proto_Player),
      (this.vWr = this.Hte.HalfHeight + WALK_ON_WATER_HALF_HEIGHT_OFFSET),
      this.qWr(),
      this.k_(),
      this.ewr(),
      !0
    );
  }
  OnEnd() {
    return (
      this.BKr(),
      this.$Wr(),
      this.fKr?.SetCollisionResponseToChannel(
        QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer,
        this.IKr || 0,
      ),
      !0
    );
  }
  k_() {
    (this.vKr = this.Lie.ListenForTagAddOrRemove(-1523054094, this.RKr)),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
        this.XOr,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.RoleOnStateInherit,
        this.I3r,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CustomMoveWalkOnWater,
        this.LKr,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnPositionStateChanged,
        this.DVr,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TeleportComplete,
        this.Ilt,
      );
  }
  BKr() {
    this.vKr.EndTask(),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.RoleOnStateInherit,
        this.I3r,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CustomMoveWalkOnWater,
        this.LKr,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
        this.XOr,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnPositionStateChanged,
        this.DVr,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TeleportComplete,
        this.Ilt,
      );
  }
  qWr() {
    (this.cz = Vector_1.Vector.Create(0, 0, 0)),
      (this.UWr = Vector_1.Vector.Create(0, 0, 0)),
      (this.AWr = Vector_1.Vector.Create(0, 0, 0)),
      (this.yKr = Vector_1.Vector.Create(0, 0, 0));
  }
  $Wr() {
    (this.cz = void 0),
      (this.SKr = void 0),
      (this.UWr = void 0),
      (this.AWr = void 0),
      (this.yKr = void 0);
  }
  static get Dependencies() {
    return [3, 163, 188];
  }
  ewr() {
    (this.Mao = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (this.Mao.WorldContextObject = this.Hte.Actor),
      (this.Mao.Radius = 3),
      (this.Mao.bIgnoreSelf = !0),
      (this.Mao.bIsSingle = !0),
      this.Mao.SetDrawDebugTrace(this.IsDebug ? 1 : 0),
      this.Mao.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water),
      TraceElementCommon_1.TraceElementCommon.SetTraceColor(
        this.Mao,
        CharacterSwimUtils.DebugColor3,
      ),
      TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
        this.Mao,
        CharacterSwimUtils.DebugColor4,
      ),
      (this.pKr = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (this.pKr.WorldContextObject = this.Hte.Actor),
      (this.pKr.Radius = this.Hte.Radius + WALK_ON_WATER_RADIUS_OFFSET),
      (this.pKr.bIgnoreSelf = !0),
      (this.pKr.bIsSingle = !0),
      this.pKr.SetDrawDebugTrace(this.IsDebug ? 1 : 0),
      this.pKr.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water),
      TraceElementCommon_1.TraceElementCommon.SetTraceColor(
        this.pKr,
        CharacterSwimUtils.DebugColor1,
      ),
      TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
        this.pKr,
        CharacterSwimUtils.DebugColor2,
      );
  }
  TKr(t) {
    switch (t) {
      case CharacterUnifiedStateTypes_1.ECharMoveState.Walk:
        return this.Gce.WalkSpeed;
      case CharacterUnifiedStateTypes_1.ECharMoveState.Run:
        return this.Gce.RunSpeed;
      case CharacterUnifiedStateTypes_1.ECharMoveState.Sprint:
        return this.Gce.SprintSpeed;
      default:
        return 0;
    }
  }
  rKr(t) {
    return (
      MathUtils_1.MathUtils.DotProduct(t, Vector_1.Vector.ZAxisVector) >
      COS_EIGHTY
    );
  }
  JWr(t) {
    t.Z = Math.abs(t.Z);
  }
  _Kr() {
    var t = this.UWr,
      e =
        ((t.X = 0),
        (t.Y = 0),
        (t.Z = FIVE_HUNDRED_TO_FIND_SURFACE),
        this.Hte.ActorLocationProxy.Addition(t, t),
        this.AWr),
      t =
        (this.Hte.ActorUpProxy.Multiply(-this.vWr, e),
        this.Hte.ActorLocationProxy.Subtraction(e, e),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Mao, t),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Mao, e),
        this.nKr(t, e));
    return t;
  }
  UKr() {
    var t = this.UWr,
      e = this.AWr;
    if (
      this.SKr &&
      0 === this.WalkOnWaterStage &&
      Vector_1.Vector.Dist(this.SKr, this.Hte.ActorLocationProxy) <
        PRE_FRAME_POSITION_MAX_DISTANCE
    )
      return (
        (i = this.cz),
        this.Hte.ActorLocationProxy.Subtraction(this.SKr, i),
        i.Normalize(),
        i.Multiply(2 * this.vWr, i),
        this.SKr.Subtraction(i, t),
        this.Hte.ActorLocationProxy.Addition(i, e),
        this.nKr(t, e)
      );
    var i = this.cz;
    return (
      this.Hte.ActorUpProxy.Multiply(this.vWr, i),
      this.Hte.ActorLocationProxy.Addition(i, t),
      this.Hte.ActorLocationProxy.Subtraction(i, e),
      this.nKr(t, e)
    );
  }
  AKr() {
    var t = this.cz,
      e = (this.Hte.ActorUpProxy.Multiply(this.vWr, t), this.UWr),
      i = (this.Hte.ActorLocationProxy.Addition(t, e), this.AWr);
    return this.Hte.ActorLocationProxy.Subtraction(t, i), this.bKr(e, i);
  }
  nKr(t, e) {
    return (
      (this.MKr = this.YWr(t, e)),
      0 !== this.MKr &&
        (TraceElementCommon_1.TraceElementCommon.GetImpactNormal(
          this.Mao.HitResult,
          0,
          this.yKr,
        ),
        this.JWr(this.yKr),
        !!this.rKr(this.yKr)) &&
        (!this.fKr &&
          0 < this.Mao.HitResult.Actors.Num() &&
          (this.fKr = this.Mao.HitResult.Actors.Get(0)?.GetComponentByClass(
            UE.StaticMeshComponent.StaticClass(),
          )),
        !0)
    );
  }
  YWr(t, e) {
    var t = this.tKr(t, e),
      e = this.cz;
    return t &&
      this.Mao.HitResult.bBlockingHit &&
      (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
        this.Mao.HitResult,
        0,
        e,
      ),
      0 < (t = e.Z - (this.Hte.ActorLocationProxy.Z - this.vWr)))
      ? t
      : 0;
  }
  qKr(t) {
    this.MKr < ENTER_WALK_ON_WATER_DEPTH ||
      ((this.xKr += t * TimeUtil_1.TimeUtil.Millisecond),
      (t = this.cz).DeepCopy(this.Hte.ActorLocationProxy),
      (t.Z = MathUtils_1.MathUtils.Clamp(
        this.PKr + this.xKr * UP_TO_WATER_SURFACE_SPEED,
        this.PKr,
        this.Hte.ActorLocationProxy.Z + this.MKr,
      )),
      this.Hte.SetActorLocation(t.ToUeVector(), "修正在水中的Z轴"));
  }
  GKr() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Movement", 37, "[WalkOnWater] EnterUpToWalkOnWater"),
      (this.Gce.CharacterMovement.Velocity.Z = 0),
      this.Gce.CharacterMovement.SetMovementMode(
        6,
        CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_UP_TO_WALK_ON_WATER,
      ),
      (this.xKr = 0),
      (this.PKr = this.Hte.ActorLocationProxy.Z),
      (this.EKr = this.Gce.CharacterMovement.MaxCustomMovementSpeed);
  }
  NKr() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Movement", 37, "[WalkOnWater] ExitUpToWalkOnWater"),
      (this.Gce.CharacterMovement.MaxCustomMovementSpeed = this.EKr);
  }
  OKr() {
    (this.Gce.CharacterMovement.Velocity.Z = 0),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Movement", 37, "[WalkOnWater] EnterWalkOnWater"),
      this.Gce.CharacterMovement.SetMovementMode(1),
      this.fKr &&
        ((this.IKr = this.fKr.GetCollisionResponseToChannel(
          QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer,
        )),
        this.fKr.SetCollisionResponseToChannel(
          QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer,
          2,
        ));
  }
  kKr(t = !1) {
    t && this._Kr() && this.qKr(TimeUtil_1.TimeUtil.InverseMillisecond),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Movement", 37, "[WalkOnWater] ExitWalkOnWater"),
      this.fKr?.SetCollisionResponseToChannel(
        QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer,
        this.IKr || 0,
      ),
      (this.fKr = void 0);
  }
  tKr(t, e) {
    return (
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Mao, t),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Mao, e),
      TraceElementCommon_1.TraceElementCommon.SphereTrace(
        this.Mao,
        PROFILE_DETECT_WATER_DEPTH,
      ) && this.Mao.HitResult.bBlockingHit
    );
  }
  bKr(t, e) {
    return (
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.pKr, t),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.pKr, e),
      TraceElementCommon_1.TraceElementCommon.SphereTrace(
        this.pKr,
        PROFILE_DETECT_WATER_DEPTH,
      ) && this.pKr.HitResult.bBlockingHit
    );
  }
  DKr(t) {
    this.WalkOnWaterStage !== t &&
      this.FKr(t) &&
      (this.VKr(this.WalkOnWaterStage), this.HKr(t));
  }
  FKr(t) {
    return !0;
  }
  HKr(t) {
    switch ((this.WalkOnWaterStage = t)) {
      case 1:
        this.GKr();
        break;
      case 2:
        this.OKr();
        break;
      case 0:
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Movement", 37, "[WalkOnWater] EnterNone"),
          5 === this.Gce.CharacterMovement.MovementMode ||
            (6 === this.Gce.CharacterMovement.MovementMode &&
              this.Gce.CharacterMovement.CustomMovementMode ===
                CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_LEISURE) ||
            this.Gce.CharacterMovement.SetMovementMode(3);
    }
  }
  VKr(t) {
    switch (t) {
      case 1:
        this.NKr();
        break;
      case 2:
        this.kKr(!this.dce);
        break;
      case 0:
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Movement", 37, "[WalkOnWater] ExitNone"),
          this.mBe.SetPositionSubState(
            CharacterUnifiedStateTypes_1.ECharPositionSubState.WaterSurface,
          );
    }
  }
  jKr(t) {
    1 === this.WalkOnWaterStage && this.qKr(t);
  }
  OnTick(e) {
    if (this.Xjt && this.dce) {
      let t = 0;
      this.UKr()
        ? (t =
            this.MKr < ENTER_WALK_ON_WATER_DEPTH
              ? 2
              : this.MKr > ENTER_UP_TO_WALK_ON_WATER_DEPTH ||
                  0 === this.WalkOnWaterStage
                ? 1
                : this.WalkOnWaterStage)
        : this._Kr()
          ? (t = 1)
          : 0 !== this.WalkOnWaterStage &&
            (t = this.AKr() ? this.WalkOnWaterStage : 0),
        this.DKr(t),
        this.jKr(e),
        0 === this.WalkOnWaterStage &&
          (this.SKr || (this.SKr = Vector_1.Vector.Create(0, 0, 0)),
          this.SKr.DeepCopy(this.Hte.ActorLocationProxy),
          (this.wKr -= e),
          this.wKr < 0) &&
          ((this.wKr = CHECK_IN_GROUND_INTERVAL),
          this.mBe?.PositionState ===
            CharacterUnifiedStateTypes_1.ECharPositionState.Ground) &&
          (this.mBe.SetPositionSubState(
            CharacterUnifiedStateTypes_1.ECharPositionSubState.None,
          ),
          Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug("Movement", 37, "[WalkOnWater] EnterGround");
    }
  }
};
(CharacterWalkOnWaterComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(70)],
  CharacterWalkOnWaterComponent,
)),
  (exports.CharacterWalkOnWaterComponent = CharacterWalkOnWaterComponent);
//# sourceMappingURL=CharacterWalkOnWaterComponent.js.map
