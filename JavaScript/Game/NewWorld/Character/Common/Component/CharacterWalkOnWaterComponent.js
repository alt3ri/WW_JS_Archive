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
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes"),
  CustomMovementDefine_1 = require("./Move/CustomMovementDefine"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  MAX_BYTE = 255,
  EIGHTY = 80,
  COS_EIGHTY = 0.173,
  PROFILE_DETECT_WATER_DEPTH = "CharacterWalkOnWaterComponent_DetectWaterDepth",
  ENTER_UP_TO_WALK_ON_WATER_DEPTH = 10,
  ENTER_WALK_ON_WATER_DEPTH = 4,
  PRE_FRAME_POSITION_MAX_DISTANCE = 1e3,
  UP_TO_WATER_SURFACE_SPEED = 500,
  CHECK_IN_GROUND_INTERVAL = 1e3,
  FIVE_HUNDRED_TO_FIND_SURFACE = 1e5,
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
      (this.GKr = void 0),
      (this.Iso = void 0),
      (this.NKr = void 0),
      (this.Hte = void 0),
      (this.Lie = void 0),
      (this.Gce = void 0),
      (this.mBe = void 0),
      (this.OKr = void 0),
      (this.XHt = !1),
      (this.dce = !1),
      (this.OWr = 0),
      (this.cz = void 0),
      (this.$Wr = void 0),
      (this.YWr = void 0),
      (this.kKr = 0),
      (this.FKr = 0),
      (this.VKr = void 0),
      (this.HKr = void 0),
      (this.WalkOnWaterStage = 0),
      (this.jKr = void 0),
      (this.pkr = (t, e) => {
        1 === this.WalkOnWaterStage &&
          0 < this.WKr(e) &&
          (this.Gce.CharacterMovement.MaxCustomMovementSpeed = this.WKr(e));
      }),
      (this.KKr = (t) => {
        this.Gce.CharacterMovement.KuroFlying(
          t,
          0,
          0,
          0,
          this.Gce.CurrentMovementSettings.Acceleration,
          this.WKr(this.mBe.MoveState),
          1,
        );
      }),
      (this.W3r = (t, e) => {
        t?.Valid &&
          ((this.dce = this.Lie.HasTag(-1523054094)),
          this.dce ||
            (this.QKr(0),
            this.mBe.SetPositionSubState(
              CharacterUnifiedStateTypes_1.ECharPositionSubState.None,
            )));
      }),
      (this.XKr = (t, e) => {
        (this.dce = e) ||
          (this.QKr(0),
          this.mBe.SetPositionSubState(
            CharacterUnifiedStateTypes_1.ECharPositionSubState.None,
          ));
      }),
      (this.XVr = (t, e) => {
        this.dce &&
          e === CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
          (this.$Kr() || this.YKr() || this.UKr()
            ? this.mBe.SetPositionSubState(
                CharacterUnifiedStateTypes_1.ECharPositionSubState.WaterSurface,
              )
            : (this.mBe.SetPositionSubState(
                CharacterUnifiedStateTypes_1.ECharPositionSubState.None,
              ),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Movement", 37, "[WalkOnWater] EnterGround")));
      }),
      (this.uht = (t, e) => {
        this.dce &&
          this.mBe?.PositionState ===
            CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
          (this.$Kr() || this.YKr() || this.UKr()) &&
          this.mBe.SetPositionSubState(
            CharacterUnifiedStateTypes_1.ECharPositionSubState.WaterSurface,
          );
      }),
      (this.JKr = -0),
      (this.zKr = -0),
      (this.ZKr = CHECK_IN_GROUND_INTERVAL);
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(3);
    var t = this.Entity.GetComponent(185);
    if (!t?.Valid) return !1;
    this.Lie = t;
    t = this.Entity.GetComponent(161);
    if (!t?.Valid) return !1;
    (this.WalkOnWaterStage = 0),
      (this.Gce = t),
      (this.mBe = this.Entity.GetComponent(158));
    t = this.Entity.GetComponent(0).GetEntityType();
    return (
      (this.XHt = t === Protocol_1.Aki.Protocol.HBs.Proto_Player),
      (this.OWr = this.Hte.HalfHeight + WALK_ON_WATER_HALF_HEIGHT_OFFSET),
      this.iKr(),
      this.k_(),
      this.Iwr(),
      !0
    );
  }
  OnEnd() {
    return (
      this.eQr(),
      this.CKr(),
      this.GKr?.SetCollisionResponseToChannel(
        QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer,
        this.jKr || 0,
      ),
      !0
    );
  }
  k_() {
    (this.OKr = this.Lie.ListenForTagAddOrRemove(-1523054094, this.XKr)),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
        this.pkr,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.RoleOnStateInherit,
        this.W3r,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CustomMoveWalkOnWater,
        this.KKr,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnPositionStateChanged,
        this.XVr,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TeleportComplete,
        this.uht,
      );
  }
  eQr() {
    this.OKr.EndTask(),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.RoleOnStateInherit,
        this.W3r,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CustomMoveWalkOnWater,
        this.KKr,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
        this.pkr,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnPositionStateChanged,
        this.XVr,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TeleportComplete,
        this.uht,
      );
  }
  iKr() {
    (this.cz = Vector_1.Vector.Create(0, 0, 0)),
      (this.$Wr = Vector_1.Vector.Create(0, 0, 0)),
      (this.YWr = Vector_1.Vector.Create(0, 0, 0)),
      (this.HKr = Vector_1.Vector.Create(0, 0, 0));
  }
  CKr() {
    (this.cz = void 0),
      (this.VKr = void 0),
      (this.$Wr = void 0),
      (this.YWr = void 0),
      (this.HKr = void 0);
  }
  static get Dependencies() {
    return [3, 161, 185];
  }
  Iwr() {
    (this.Iso = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (this.Iso.WorldContextObject = this.Hte.Actor),
      (this.Iso.Radius = 3),
      (this.Iso.bIgnoreSelf = !0),
      (this.Iso.bIsSingle = !0),
      this.Iso.SetDrawDebugTrace(this.IsDebug ? 1 : 0),
      this.Iso.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water),
      TraceElementCommon_1.TraceElementCommon.SetTraceColor(
        this.Iso,
        CharacterSwimUtils.DebugColor3,
      ),
      TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
        this.Iso,
        CharacterSwimUtils.DebugColor4,
      ),
      (this.NKr = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (this.NKr.WorldContextObject = this.Hte.Actor),
      (this.NKr.Radius = this.Hte.Radius + WALK_ON_WATER_RADIUS_OFFSET),
      (this.NKr.bIgnoreSelf = !0),
      (this.NKr.bIsSingle = !0),
      this.NKr.SetDrawDebugTrace(this.IsDebug ? 1 : 0),
      this.NKr.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water),
      TraceElementCommon_1.TraceElementCommon.SetTraceColor(
        this.NKr,
        CharacterSwimUtils.DebugColor1,
      ),
      TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
        this.NKr,
        CharacterSwimUtils.DebugColor2,
      );
  }
  WKr(t) {
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
  IKr(t) {
    return (
      MathUtils_1.MathUtils.DotProduct(t, Vector_1.Vector.ZAxisVector) >
      COS_EIGHTY
    );
  }
  fKr(t) {
    t.Z = Math.abs(t.Z);
  }
  UKr() {
    var t = this.$Wr,
      e =
        ((t.X = 0),
        (t.Y = 0),
        (t.Z = FIVE_HUNDRED_TO_FIND_SURFACE),
        this.Hte.ActorLocationProxy.Addition(t, t),
        this.YWr),
      t =
        (this.Hte.ActorUpProxy.Multiply(-this.OWr, e),
        this.Hte.ActorLocationProxy.Subtraction(e, e),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Iso, t),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Iso, e),
        this.TKr(t, e));
    return t;
  }
  $Kr() {
    var t = this.$Wr,
      e = this.YWr;
    if (
      this.VKr &&
      0 === this.WalkOnWaterStage &&
      Vector_1.Vector.Dist(this.VKr, this.Hte.ActorLocationProxy) <
        PRE_FRAME_POSITION_MAX_DISTANCE
    )
      return (
        (i = this.cz),
        this.Hte.ActorLocationProxy.Subtraction(this.VKr, i),
        i.Normalize(),
        i.Multiply(2 * this.OWr, i),
        this.VKr.Subtraction(i, t),
        this.Hte.ActorLocationProxy.Addition(i, e),
        this.TKr(t, e)
      );
    var i = this.cz;
    return (
      this.Hte.ActorUpProxy.Multiply(this.OWr, i),
      this.Hte.ActorLocationProxy.Addition(i, t),
      this.Hte.ActorLocationProxy.Subtraction(i, e),
      this.TKr(t, e)
    );
  }
  YKr() {
    var t = this.cz,
      e = (this.Hte.ActorUpProxy.Multiply(this.OWr, t), this.$Wr),
      i = (this.Hte.ActorLocationProxy.Addition(t, e), this.YWr);
    return this.Hte.ActorLocationProxy.Subtraction(t, i), this.tQr(e, i);
  }
  TKr(t, e) {
    return (
      (this.kKr = this.gKr(t, e)),
      0 !== this.kKr &&
        (TraceElementCommon_1.TraceElementCommon.GetImpactNormal(
          this.Iso.HitResult,
          0,
          this.HKr,
        ),
        this.fKr(this.HKr),
        !!this.IKr(this.HKr)) &&
        (!this.GKr &&
          0 < this.Iso.HitResult.Actors.Num() &&
          (this.GKr = this.Iso.HitResult.Actors.Get(0)?.GetComponentByClass(
            UE.StaticMeshComponent.StaticClass(),
          )),
        !0)
    );
  }
  gKr(t, e) {
    var t = this.SKr(t, e),
      e = this.cz;
    return t &&
      this.Iso.HitResult.bBlockingHit &&
      (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
        this.Iso.HitResult,
        0,
        e,
      ),
      0 < (t = e.Z - (this.Hte.ActorLocationProxy.Z - this.OWr)))
      ? t
      : 0;
  }
  iQr(t) {
    this.kKr < ENTER_WALK_ON_WATER_DEPTH ||
      ((this.zKr += t * TimeUtil_1.TimeUtil.Millisecond),
      (t = this.cz).DeepCopy(this.Hte.ActorLocationProxy),
      (t.Z = MathUtils_1.MathUtils.Clamp(
        this.JKr + this.zKr * UP_TO_WATER_SURFACE_SPEED,
        this.JKr,
        this.Hte.ActorLocationProxy.Z + this.kKr,
      )),
      this.Hte.SetActorLocation(t.ToUeVector(), "修正在水中的Z轴"));
  }
  oQr() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Movement", 37, "[WalkOnWater] EnterUpToWalkOnWater"),
      (this.Gce.CharacterMovement.Velocity.Z = 0),
      this.Gce.CharacterMovement.SetMovementMode(
        6,
        CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_UP_TO_WALK_ON_WATER,
      ),
      (this.zKr = 0),
      (this.JKr = this.Hte.ActorLocationProxy.Z),
      (this.FKr = this.Gce.CharacterMovement.MaxCustomMovementSpeed);
  }
  rQr() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Movement", 37, "[WalkOnWater] ExitUpToWalkOnWater"),
      (this.Gce.CharacterMovement.MaxCustomMovementSpeed = this.FKr);
  }
  nQr() {
    (this.Gce.CharacterMovement.Velocity.Z = 0),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Movement", 37, "[WalkOnWater] EnterWalkOnWater"),
      this.Gce.CharacterMovement.SetMovementMode(1),
      this.GKr &&
        ((this.jKr = this.GKr.GetCollisionResponseToChannel(
          QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer,
        )),
        this.GKr.SetCollisionResponseToChannel(
          QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer,
          2,
        ));
  }
  sQr(t = !1) {
    t && this.UKr() && this.iQr(TimeUtil_1.TimeUtil.InverseMillisecond),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Movement", 37, "[WalkOnWater] ExitWalkOnWater"),
      this.GKr?.SetCollisionResponseToChannel(
        QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer,
        this.jKr || 0,
      ),
      (this.GKr = void 0);
  }
  SKr(t, e) {
    return (
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Iso, t),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Iso, e),
      TraceElementCommon_1.TraceElementCommon.SphereTrace(
        this.Iso,
        PROFILE_DETECT_WATER_DEPTH,
      ) && this.Iso.HitResult.bBlockingHit
    );
  }
  tQr(t, e) {
    return (
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.NKr, t),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.NKr, e),
      TraceElementCommon_1.TraceElementCommon.SphereTrace(
        this.NKr,
        PROFILE_DETECT_WATER_DEPTH,
      ) && this.NKr.HitResult.bBlockingHit
    );
  }
  QKr(t) {
    this.WalkOnWaterStage !== t &&
      this.aQr(t) &&
      (this.hQr(this.WalkOnWaterStage), this.lQr(t));
  }
  aQr(t) {
    return !0;
  }
  lQr(t) {
    switch ((this.WalkOnWaterStage = t)) {
      case 1:
        this.oQr();
        break;
      case 2:
        this.nQr();
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
  hQr(t) {
    switch (t) {
      case 1:
        this.rQr();
        break;
      case 2:
        this.sQr(!this.dce);
        break;
      case 0:
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Movement", 37, "[WalkOnWater] ExitNone"),
          this.mBe.SetPositionSubState(
            CharacterUnifiedStateTypes_1.ECharPositionSubState.WaterSurface,
          );
    }
  }
  _Qr(t) {
    1 === this.WalkOnWaterStage && this.iQr(t);
  }
  OnTick(e) {
    if (this.XHt && this.dce) {
      let t = 0;
      this.$Kr()
        ? (t =
            this.kKr < ENTER_WALK_ON_WATER_DEPTH
              ? 2
              : this.kKr > ENTER_UP_TO_WALK_ON_WATER_DEPTH ||
                  0 === this.WalkOnWaterStage
                ? 1
                : this.WalkOnWaterStage)
        : this.UKr()
          ? (t = 1)
          : 0 !== this.WalkOnWaterStage &&
            (t = this.YKr() ? this.WalkOnWaterStage : 0),
        this.QKr(t),
        this._Qr(e),
        0 === this.WalkOnWaterStage &&
          (this.VKr || (this.VKr = Vector_1.Vector.Create(0, 0, 0)),
          this.VKr.DeepCopy(this.Hte.ActorLocationProxy),
          (this.ZKr -= e),
          this.ZKr < 0) &&
          ((this.ZKr = CHECK_IN_GROUND_INTERVAL),
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
  [(0, RegisterComponent_1.RegisterComponent)(68)],
  CharacterWalkOnWaterComponent,
)),
  (exports.CharacterWalkOnWaterComponent = CharacterWalkOnWaterComponent);
//# sourceMappingURL=CharacterWalkOnWaterComponent.js.map
