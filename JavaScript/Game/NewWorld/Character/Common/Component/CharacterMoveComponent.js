"use strict";
var CharacterMoveComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var h,
        r = arguments.length,
        a =
          r < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(t, e, i, s);
      else
        for (var o = t.length - 1; 0 <= o; o--)
          (h = t[o]) &&
            (a = (r < 3 ? h(a) : 3 < r ? h(e, i, a) : h(e, i)) || a);
      return 3 < r && a && Object.defineProperty(e, i, a), a;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterMoveComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil"),
  Transform_1 = require("../../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  TsBaseRoleConfig_1 = require("../../../../Character/TsBaseRoleConfig"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  PreloadConstants_1 = require("../../../../World/Controller/PreloadConstants"),
  CharacterNameDefines_1 = require("../CharacterNameDefines"),
  CharacterAttributeTypes_1 = require("./Abilities/CharacterAttributeTypes"),
  CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes"),
  BaseMoveComponent_1 = require("./BaseMoveComponent"),
  CustomMovementDefine_1 = require("./Move/CustomMovementDefine");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  FormationAttributeController_1 = require("../../../../Module/Abilities/FormationAttributeController"),
  GravityUtils_1 = require("../../../../Utils/GravityUtils"),
  WhirlpoolPoint_1 = require("./Move/WhirlpoolPoint"),
  MIN_MOVE_SPEED = 20,
  GLIDING_CONTROL_OFFSET = 0.3,
  GLIDING_HEIGHT_THREDHOLD = 250,
  MAX_IN_WATER_SPEED = 800,
  GLIDE_STRENGTH_THREADHOLD = 10,
  SQUARE_MAX_INHERIT_SPEED = 1e6,
  cannotResponseInputTag = [-648310348, -2044964178, 1008164187, 191377386],
  JUMP_FRAME_COUNT = 3,
  SLIDE_JUMP_LERP_TIME = 100,
  SLIDE_JUMP_SPEED = 900,
  OVER_VELOCITY_PERCENT = 1.01,
  BASE_MOVE_INHERIT_TIME = 1.5,
  TRY_GLIDE_TIME = 500,
  NEAR_ZERO = 1e-6,
  MAX_WALK_FLOOR_ANGLE = 55,
  DEFAULT_MAX_STEP_HEIGHT = 45,
  DEFAULT_STEP_UP_PERCENT = 0.08,
  DEFAULT_STEP_UP_STANDARD_SPEED = 400;
class ForceFallingSpeedCache {
  constructor() {
    (this.ForceFallingSpeed = Vector_1.Vector.Create()),
      (this.Tag = 0),
      (this.HasForceFallingSpeed = !1);
  }
}
let CharacterMoveComponent =
  (CharacterMoveComponent_1 = class CharacterMoveComponent extends (
    BaseMoveComponent_1.BaseMoveComponent
  ) {
    constructor() {
      super(...arguments),
        (this.TimeScaleComp = void 0),
        (this.GlideComp = void 0),
        (this.SwimComp = void 0),
        (this.ForceFallingSpeedCache = void 0),
        (this.SkillComp = void 0),
        (this.LastGlidingControlTime = 0),
        (this.AttributeComponent = void 0),
        (this.TagComponent = void 0),
        (this.DeathComponent = void 0),
        (this.AirInertiaHandler = 0),
        (this.CanResponseInputTasks = new Array()),
        (this.TryGlideTime = 0),
        (this.gHr = new WhirlpoolPoint_1.WhirlpoolPoint()),
        (this.fHr = 0),
        (this.GroundedFrame = 0),
        (this.OnLand = () => {
          (this.GroundedTimeUe = UE.GameplayStatics.GetTimeSeconds(
            this.ActorComp.Actor,
          )),
            (this.GroundedFrame = Time_1.Time.Frame),
            1 === UE.Actor.GetKuroNetMode() &&
              this.ActorComp.IsAutonomousProxy &&
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.EntityOnLandedPush,
                this.Entity,
              );
        }),
        (this.OnPositionStateChanged = (t, e) => {
          switch (
            (t === CharacterUnifiedStateTypes_1.ECharPositionState.Air &&
              ((this.IsFallingIntoWater = !1),
              this.StopAddMove(this.AirInertiaHandler),
              (this.AirInertiaHandler = 0),
              this.ActorComp.IsRoleAndCtrlByMe) &&
              e === CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
              this.PlayerMotionRequest(
                Protocol_1.Aki.Protocol.t8s.Proto_BeLand,
              ),
            e)
          ) {
            case CharacterUnifiedStateTypes_1.ECharPositionState.Water:
              this.VelocityVector.FromUeVector(
                this.ActorComp.ActorVelocityProxy,
              );
              var i = this.VelocityVector.Size();
              i > MAX_IN_WATER_SPEED &&
                (this.VelocityVector.MultiplyEqual(MAX_IN_WATER_SPEED / i),
                this.CharacterMovement.Velocity.Set(
                  this.VelocityVector.X,
                  this.VelocityVector.Y,
                  this.VelocityVector.Z,
                ),
                this.ActorComp.ResetCachedVelocityTime());
              break;
            case CharacterUnifiedStateTypes_1.ECharPositionState.Climb:
              break;
            case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
              this.Entity.Active &&
                this.ActorComp.IsAutonomousProxy &&
                (this.Entity.GetComponent(18)?.FallInjure(),
                this.GetWhirlpoolEnable()) &&
                this.EndWhirlpool();
              break;
            case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
              this.HasBaseMovement &&
                !this.ActorComp.Actor.BasedMovement.bRelativeRotation &&
                this.DeltaBaseMovementSpeed &&
                (this.AirInertiaHandler = this.SetAddMoveWorld(
                  this.DeltaBaseMovementSpeed,
                  BASE_MOVE_INHERIT_TIME,
                  CharacterMoveComponent_1.BaseMoveInheritCurve,
                  this.AirInertiaHandler,
                )),
                this.DeltaConveyBeltSpeed &&
                  (this.AirInertiaHandler = this.SetAddMoveWorld(
                    this.DeltaConveyBeltSpeed,
                    BASE_MOVE_INHERIT_TIME,
                    CharacterMoveComponent_1.BaseMoveInheritCurve,
                    this.AirInertiaHandler,
                  ));
          }
        }),
        (this.OnStateInherit = (t, e) => {
          var i;
          t?.Valid &&
            (i = t.GetComponent(164))?.Valid &&
            (this.SetGravityDirect(i.GravityDirect),
            this.CharacterMovement.ConsumeInputVector(),
            this.CharacterMovement.AddInputVector(
              i.CharacterMovement.GetLastInputVector(),
              !0,
            ),
            this.ActorComp.SetInputDirect(i.ActorComp.InputDirectProxy),
            this.ActorComp.SetInputFacing(i.ActorComp.InputFacingProxy),
            this.ActorComp.SetOverrideTurnSpeed(i.ActorComp.OverrideTurnSpeed),
            (this.HasMoveInput = i.HasMoveInput),
            (this.CharacterMovement.LastUpdateVelocity =
              i.GetLastUpdateVelocity()),
            this.ActorComp.ResetCachedVelocityTime(),
            e ||
              ((this.IsMoving = i.IsMoving),
              CharacterMoveComponent_1.TempVelocity.DeepCopy(
                i.ActorComp.ActorVelocityProxy,
              ),
              (e = CharacterMoveComponent_1.TempVelocity.SizeSquared()) >
                SQUARE_MAX_INHERIT_SPEED &&
                CharacterMoveComponent_1.TempVelocity.MultiplyEqual(
                  Math.sqrt(SQUARE_MAX_INHERIT_SPEED / e),
                ),
              this.Entity.GetComponent(190)?.HasTag(-1423251824) ||
                (this.ForceSpeed.DeepCopy(
                  CharacterMoveComponent_1.TempVelocity,
                ),
                (this.Speed = Math.sqrt(
                  GravityUtils_1.GravityUtils.GetPlanarSizeSquared2D(
                    this.ActorComp,
                    this.ForceSpeed,
                  ),
                )),
                (this.CharacterMovement.Velocity =
                  this.ForceSpeed.ToUeVector())),
              i.ActorComp.Actor.BasedMovement.MovementBase ||
                (this.ActorComp.Actor.BasedMovement.MovementBase = void 0),
              (e = t.GetComponent(190)),
              0 === i.CharacterMovement.MovementMode || e?.HasTag(-2100129479)
                ? this.CharacterMovement.SetMovementMode(1, 0)
                : 5 !== i.CharacterMovement.MovementMode &&
                  this.CharacterMovement.SetMovementMode(
                    i.CharacterMovement.MovementMode,
                    i.CharacterMovement.CustomMovementMode,
                  ),
              (t = this.ActorComp.Actor.CharacterMovement.CurrentFloor),
              (e = i.ActorComp.Actor.CharacterMovement.CurrentFloor),
              (t.bBlockingHit = e.bBlockingHit),
              (t.bLineTrace = e.bLineTrace),
              (t.bWalkableFloor = e.bWalkableFloor),
              (t.FloorDist = e.FloorDist),
              (t.HitResult = e.HitResult),
              (t.LineDist = e.LineDist),
              UE.KuroStaticLibrary.SetBaseAndSaveBaseLocation(
                this.CharacterMovement,
                i.CharacterMovement.GetMovementBase(),
              )));
        }),
        (this.OnSprintTag = (t, e) => {
          if (e)
            switch (t) {
              case 24802177:
                this.PlayerMotionRequest(
                  Protocol_1.Aki.Protocol.t8s.Proto_Spurt,
                );
                break;
              case -268378154:
                this.PlayerMotionRequest(
                  Protocol_1.Aki.Protocol.t8s.Proto_Pullback,
                );
                break;
              case 1965311544:
                this.PlayerMotionRequest(
                  Protocol_1.Aki.Protocol.t8s.Proto_AirSprint,
                );
                break;
              case -2042325985:
                this.PlayerMotionRequest(
                  Protocol_1.Aki.Protocol.t8s.Proto_BackFlip,
                );
            }
        }),
        (this.SlideTrans = void 0),
        (this.OnSpeedRatioAttributeChanged = (t, e, i) => {
          var s = this.UnifiedStateComponent?.MoveState,
            h = this.Entity.GetComponent(164);
          h?.Valid && h.ResetMaxSpeed(s);
        }),
        (this.OnResponseInputTagsChanged = (t, e) => {
          e
            ? (0 === this.CannotResponseInputCount && (this.HasMoveInput = !1),
              ++this.CannotResponseInputCount)
            : --this.CannotResponseInputCount;
        }),
        (this.kka = 0),
        (this.InitMaxStepHeight = DEFAULT_MAX_STEP_HEIGHT),
        (this.InitStepUpPercent = DEFAULT_STEP_UP_PERCENT),
        (this.InitStepUpStandardSpeed = DEFAULT_STEP_UP_STANDARD_SPEED);
    }
    static get Dependencies() {
      return [3];
    }
    static get BaseMoveInheritCurve() {
      return (
        this.BaseMoveInheritCurveInternal ||
          (this.BaseMoveInheritCurveInternal =
            ResourceSystem_1.ResourceSystem.GetLoadedAsset(
              PreloadConstants_1.BASE_MOVE_INHERIT_CURVE_PATH,
              UE.CurveFloat,
            )),
        this.BaseMoveInheritCurveInternal
      );
    }
    SetForceFallingSpeed(t, e) {
      (this.ForceFallingSpeedCache.ForceFallingSpeed.X = 0),
        (this.ForceFallingSpeedCache.ForceFallingSpeed.Y = 0),
        (this.ForceFallingSpeedCache.ForceFallingSpeed.Z = t.Z),
        this.SetForceSpeed(this.ForceFallingSpeedCache.ForceFallingSpeed),
        (this.ForceFallingSpeedCache.ForceFallingSpeed.X = t.X),
        (this.ForceFallingSpeedCache.ForceFallingSpeed.Y = t.Y),
        (this.ForceFallingSpeedCache.ForceFallingSpeed.Z = 0),
        (this.ForceFallingSpeedCache.Tag = e),
        (this.ForceFallingSpeedCache.HasForceFallingSpeed = !0);
    }
    ConsumeForceFallingSpeed() {
      return (
        !!this.ForceFallingSpeedCache.HasForceFallingSpeed &&
        (this.TagComponent.HasTag(this.ForceFallingSpeedCache.Tag)
          ? !(
              this.AnimComp.HasKuroRootMotion ||
              3 !== this.CharacterMovement.MovementMode ||
              ((this.ForceFallingSpeedCache.ForceFallingSpeed.Z =
                this.CharacterMovement.Velocity.Z),
              this.SetForceSpeed(this.ForceFallingSpeedCache.ForceFallingSpeed),
              (this.ForceFallingSpeedCache.HasForceFallingSpeed = !1))
            )
          : (this.ForceFallingSpeedCache.HasForceFallingSpeed = !1))
      );
    }
    get WalkSpeed() {
      return this.CurrentMovementSettings.WalkSpeed;
    }
    get RunSpeed() {
      return this.CurrentMovementSettings.RunSpeed;
    }
    get SprintSpeed() {
      return this.CurrentMovementSettings.SprintSpeed;
    }
    get SwimSpeed() {
      return this.CurrentMovementSettings.NormalSwimSpeed;
    }
    get FastSwimSpeed() {
      return this.CurrentMovementSettings.FastSwimSpeed;
    }
    SetOverrideMaxFallingSpeed(t) {
      this.fHr = t;
    }
    ResetOverrideMaxFallingSpeed() {
      this.fHr = 0;
    }
    SetMaxSpeed(t) {
      let e = this.AttributeComponent?.GetCurrentValue(EAttributeId.vVn);
      (!e || e <= 0) && (e = CharacterAttributeTypes_1.PER_TEN_THOUSAND),
        (e /= CharacterAttributeTypes_1.PER_TEN_THOUSAND);
      var i = this.CharacterMovement.MovementMode;
      5 === i
        ? (this.CharacterMovement.MaxFlySpeed = t * e)
        : (this.CharacterMovement.MaxWalkSpeed =
            3 === i ? (0 < this.fHr ? this.fHr : t) * e : t * e),
        this.ActorComp?.IsRoleAndCtrlByMe &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Movement",
            6,
            "SetMaxSpeed",
            ["Entity", this.Entity.Id],
            ["WalkSpeed", this.CharacterMovement.MaxWalkSpeed],
            ["FlySpeed", this.CharacterMovement.MaxFlySpeed],
            ["NewSpeed", t],
            ["SpeedRatio", e],
          );
    }
    OnInitData() {
      return (
        super.OnInitData(),
        (this.CurrentGravityScale = new BaseMoveComponent_1.GravityScale()),
        (this.ForceFallingSpeedCache = new ForceFallingSpeedCache()),
        !0
      );
    }
    OnClear() {
      return (
        super.OnClear(),
        this.JumpDelayTimer &&
          TimerSystem_1.TimerSystem.Remove(this.JumpDelayTimer),
        CharacterMoveComponent_1.TempVelocity.Reset(),
        this.MoveController?.Dispose(),
        !0
      );
    }
    OnInit() {
      return super.OnInit();
    }
    OnStart() {
      (this.AccelerationLerpCurve =
        ResourceSystem_1.ResourceSystem.GetLoadedAsset(
          PreloadConstants_1.ACC_LERP_CURVE_PATH,
          UE.CurveFloat,
        )),
        this.AccelerationLerpCurve?.IsValid() ||
          ModelManager_1.ModelManager.PreloadModel.CommonAssetElement.PrintDebugInfo(),
        (this.AccelerationLerpTime = 0),
        (this.AccelerationChangeMoveState =
          CharacterUnifiedStateTypes_1.ECharMoveState.Other);
      var t = this.Entity.GetComponent(3);
      if (!t.Valid) return !1;
      (this.IsHidden = !1),
        (this.ActorComp = t),
        (this.CharacterMovement = t.Actor.CharacterMovement),
        this.GravityDirectInternal.FromUeVector(
          this.CharacterMovement.Kuro_GetGravityDirect(),
        ),
        (this.IsStandardGravityInternal =
          Math.abs(this.GravityDirectInternal.Z + 1) <
          MathUtils_1.MathUtils.SmallNumber),
        this.IsStandardGravityInternal &&
          this.GravityDirectInternal.Set(0, 0, -1),
        this.GravityDirectInternal.UnaryNegation(this.GravityUpInternal),
        (this.CharacterMovement.GravityScale = 2),
        (this.CharacterMovement.bRotationFollowBaseMovement = !0),
        this.CharacterMovement.SetWalkableFloorAngle(MAX_WALK_FLOOR_ANGLE),
        (this.CharacterMovement.bEnablePhysicsInteraction = !1),
        (this.AnimComp = this.Entity.GetComponent(163)),
        (this.GlideComp = this.Entity.GetComponent(52)),
        (this.SwimComp = this.Entity.GetComponent(69)),
        (this.AttributeComponent = this.Entity.GetComponent(159)),
        (this.TagComponent = this.Entity.GetComponent(190)),
        (this.DeathComponent = this.Entity.GetComponent(15)),
        (this.UnifiedStateComponent = this.Entity.GetComponent(92)),
        (this.SkillComp = this.Entity.GetComponent(34)),
        (this.TimeScaleComp = this.Entity.GetComponent(110)),
        (this.CapsuleOffset = Vector_1.Vector.Create(
          0,
          0,
          this.ActorComp.Radius - this.ActorComp.HalfHeight,
        )),
        this.InitCreatureProperty(),
        this.InitStepUpParams(),
        (this.MovementData = DataTableUtil_1.DataTableUtil.GetDataTableRow(
          this.ActorComp.Actor.DtBaseMovementSetting,
          CharacterNameDefines_1.CharacterNameDefines.NORMAL.toString(),
        )),
        (this.ActorComp.Actor.DtBaseMovementSetting && this.MovementData) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              58,
              "以下BP_{Character}没有在蓝图中配置Dt_BaseMovementSetting找对应的蓝图负责人处理",
              ["Character", this.ActorComp.Actor.GetName()],
            )),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
          this.OnMoveStateChange,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.OnPositionStateChange,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnDirectionStateChanged,
          this.OnDirectionStateChange,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnLand,
          this.OnLand,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.OnPositionStateChanged,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.OnStateInherit,
        ),
        (this.IsStopInternal = !1),
        this.InitBaseState(),
        this.AttributeComponent?.AddListener(
          EAttributeId.vVn,
          this.OnSpeedRatioAttributeChanged,
        ),
        (this.CannotResponseInputCount = 0);
      for (const e of cannotResponseInputTag)
        this.TagComponent &&
          (this.TagComponent.HasTag(e) && ++this.CannotResponseInputCount,
          this.CanResponseInputTasks.push(
            this.TagComponent.ListenForTagAddOrRemove(
              e,
              this.OnResponseInputTagsChanged,
            ),
          ));
      return (
        this.InitTraceInfo(),
        this.TagComponent.AddTagAddOrRemoveListener(24802177, this.OnSprintTag),
        this.TagComponent.AddTagAddOrRemoveListener(
          -268378154,
          this.OnSprintTag,
        ),
        this.TagComponent.AddTagAddOrRemoveListener(
          1965311544,
          this.OnSprintTag,
        ),
        this.TagComponent.AddTagAddOrRemoveListener(
          -2042325985,
          this.OnSprintTag,
        ),
        !0
      );
    }
    OnEnd() {
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
        this.OnMoveStateChange,
      ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.OnPositionStateChange,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnDirectionStateChanged,
          this.OnDirectionStateChange,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnLand,
          this.OnLand,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.OnPositionStateChanged,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.OnStateInherit,
        ),
        this.AttributeComponent?.RemoveListener(
          EAttributeId.vVn,
          this.OnSpeedRatioAttributeChanged,
        );
      for (const t of this.CanResponseInputTasks) t.EndTask();
      return (
        (this.CanResponseInputTasks.length = 0),
        (this.IsHidden = !1),
        this.TagComponent.RemoveTagAddOrRemoveListener(
          24802177,
          this.OnSprintTag,
        ),
        this.TagComponent.RemoveTagAddOrRemoveListener(
          -268378154,
          this.OnSprintTag,
        ),
        this.TagComponent.RemoveTagAddOrRemoveListener(
          1965311544,
          this.OnSprintTag,
        ),
        this.TagComponent.RemoveTagAddOrRemoveListener(
          -2042325985,
          this.OnSprintTag,
        ),
        !0
      );
    }
    OnActivate() {
      this.OnMoveStateChange(
        CharacterUnifiedStateTypes_1.ECharMoveState.Stand,
        CharacterUnifiedStateTypes_1.ECharMoveState.Run,
      ),
        2 === this.CharacterMovement.MovementMode &&
          this.CharacterMovement.SetMovementMode(1);
    }
    OnDisable() {
      this.DeltaTimeSeconds = 0;
    }
    OnTick(i) {
      if (
        !(i < MathUtils_1.MathUtils.SmallNumber) &&
        (super.OnTick(i), this.ActorComp) &&
        this.DeathComponent &&
        (this.gHr.GetEnable() || !this.DeathComponent.IsDead()) &&
        ((this.CharHeightAboveGround = -1),
        (this.DeltaTimeSeconds = i * MathUtils_1.MathUtils.MillisecondToSecond),
        this.MoveController?.UpdateMove(this.DeltaTimeSeconds),
        0 < this.SpeedLockFrame && --this.SpeedLockFrame,
        this.IsJump && --this.JumpFrameCount,
        this.LerpMaxAcceleration(),
        this.UpdateBaseMovement(),
        !this.IsSpecialMove)
      )
        if (
          (this.IsStopInternal
            ? (this.Speed = 0)
            : (this.Speed = Math.sqrt(
                GravityUtils_1.GravityUtils.GetPlanarSizeSquared2D(
                  this.ActorComp,
                  this.ActorComp.ActorVelocityProxy,
                ),
              )),
          (this.IsMoving = this.Speed > MIN_MOVE_SPEED),
          this.ActorComp.IsMoveAutonomousProxy)
        ) {
          this.UpdateInputOrder(),
            this.UnifiedStateComponent?.Valid &&
              this.UnifiedStateComponent.PositionState ===
                CharacterUnifiedStateTypes_1.ECharPositionState.Air &&
              this.UnifiedStateComponent.MoveState ===
                CharacterUnifiedStateTypes_1.ECharMoveState.Other &&
              !this.AnimComp.HasKuroRootMotion &&
              ((h = Math.max(this.FallingHorizontalMaxSpeed, this.fHr)),
              this.Speed > h * OVER_VELOCITY_PERCENT) &&
              (CharacterMoveComponent_1.TempVelocity.DeepCopy(
                this.ActorComp.ActorVelocityProxy,
              ),
              (CharacterMoveComponent_1.TempVelocity.X *= h / this.Speed),
              (CharacterMoveComponent_1.TempVelocity.Y *= h / this.Speed),
              CharacterMoveComponent_1.TempVelocity.ContainsNaN() &&
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Movement",
                  6,
                  "Air Speed Limit has NaN",
                  ["velocity", CharacterMoveComponent_1.TempVelocity],
                  ["speed", this.Speed],
                  ["max", h],
                ),
              (this.CharacterMovement.Velocity =
                CharacterMoveComponent_1.TempVelocity.ToUeVector()),
              (this.Speed = this.FallingHorizontalMaxSpeed),
              this.ActorComp.ResetCachedVelocityTime());
          var s,
            h =
              1 < this.Entity.GetTickInterval() &&
              this.AnimComp?.Valid &&
              this.ActorComp.Owner.WasRecentlyRenderedOnScreen();
          let t = void 0,
            e = (h && (t = this.AnimComp.GetMeshTransform()), !1);
          this.CanResponseInput()
            ? (this.SetInfoVar(),
              (s = this.ActorComp.ActorRotationProxy.Pitch),
              this.UpdateFacing(),
              (e ||= s !== this.ActorComp.ActorRotationProxy.Pitch),
              this.CacheVar())
            : (this.HasMoveInput = !1),
            this.gHr.GetEnable()
              ? ((e = this.pHr()),
                this.gHr.OnTick(
                  this.DeltaTimeSeconds *
                    (this.TimeScaleComp?.CurrentTimeScale ?? 1),
                ) || this.EndWhirlpool())
              : (this.UpdateAddMoveSpeed(
                  this.TimeScaleComp?.CurrentTimeScale ?? 1,
                ) && (e = !0),
                this.UpdateAddMoveOffset() && (e = !0)),
            h && e && this.AnimComp.SetModelBuffer(t, i),
            this.OnTickGravityScale(),
            this.HasBaseMovement &&
              (this.DeltaBaseMovementQuat.RotateVector(
                this.ActorComp.InputFacingProxy,
                this.TmpVector,
              ),
              this.ActorComp.SetInputFacing(this.TmpVector)),
            ModelManager_1.ModelManager.SundryModel.SceneCheckOn &&
              this.PrintAnimInstanceMovementInfo(),
            this.UpdateMoveChain(),
            this.TryGlideTime &&
              (this.TrySetGlide() && (this.TryGlideTime = 0),
              (this.TryGlideTime = Math.max(this.TryGlideTime - i, 0)));
        } else
          this.CanResponseInput()
            ? (this.SetInfoVar(), this.UpdateFacing(), this.CacheVar())
            : (this.HasMoveInput = !1);
    }
    ContainsTag(t) {
      return this.TagComponent?.HasTag(t) ?? !1;
    }
    JumpRelease() {
      this.ActorComp.Actor.StopJumping();
    }
    JumpCheck() {
      return !(
        !this.CanResponseInput() ||
        this.ContainsTag(-291592299) ||
        (this.UnifiedStateComponent?.PositionState !==
          CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
          this.UnifiedStateComponent?.PositionState !==
            CharacterUnifiedStateTypes_1.ECharPositionState.Ski)
      );
    }
    CanJumpPress() {
      if (this.GroundedFrame > Time_1.Time.Frame - 2) return !1;
      var t = this.Entity.GetComponent(34),
        e = this.UnifiedStateComponent?.PositionState,
        i = this.UnifiedStateComponent?.MoveState;
      switch (e) {
        case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
        case CharacterUnifiedStateTypes_1.ECharPositionState.Climb:
        case CharacterUnifiedStateTypes_1.ECharPositionState.Ski:
          return (!t.Valid || t.CheckJumpCanInterrupt()) && this.JumpCheck();
        case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
          return i === CharacterUnifiedStateTypes_1.ECharMoveState.Glide
            ? Time_1.Time.WorldTime - this.LastGlidingControlTime >
                GLIDING_CONTROL_OFFSET
            : (CharacterUnifiedStateTypes_1.ECharMoveState.Slide, !0);
        default:
          return !1;
      }
    }
    CanWalkPress() {
      return (
        this.UnifiedStateComponent?.PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Ground
      );
    }
    LimitMaxSpeed() {
      this.VelocityVector.FromUeVector(this.ActorComp.ActorVelocityProxy);
      var t = this.VelocityVector.Size(),
        e = this.CurrentMovementSettings?.SprintSpeed;
      e < t &&
        (this.VelocityVector.MultiplyEqual(e / t),
        this.CharacterMovement.Velocity.Set(
          this.VelocityVector.X,
          this.VelocityVector.Y,
          this.VelocityVector.Z,
        ),
        this.ActorComp.ResetCachedVelocityTime());
    }
    OnJump() {
      var t = this.Entity.GetComponent(163);
      t.Valid && t.MainAnimInstance && t.MainAnimInstance.Montage_Stop(0),
        (this.JumpFrameCount = JUMP_FRAME_COUNT),
        this.AnimComp.OnJump();
    }
    JumpPress() {
      if (!this.CheckInHit() && this.CanJumpPress()) {
        var t = this.UnifiedStateComponent?.PositionState,
          e = t === CharacterUnifiedStateTypes_1.ECharPositionState.Ground,
          i = t === CharacterUnifiedStateTypes_1.ECharPositionState.Climb;
        if (e || i)
          this.TagComponent?.RemoveTag(-1371021686),
            (i = this.Entity.GetComponent(34)).Valid &&
              i.CurrentSkill &&
              (i.StopGroup1Skill("跳跃打断技能"), this.LimitMaxSpeed()),
            this.OnJump(),
            e &&
              this.PlayerMotionRequest(
                Protocol_1.Aki.Protocol.t8s.Proto_MotionJump,
              );
        else {
          if (t === CharacterUnifiedStateTypes_1.ECharPositionState.Air) {
            if (this.JumpPressInAir()) return;
          } else if (
            t === CharacterUnifiedStateTypes_1.ECharPositionState.Ski &&
            this.JumpPressInSki()
          )
            return;
          this.TrySetGlide() || (this.TryGlideTime = TRY_GLIDE_TIME);
        }
      }
    }
    CheckInHit() {
      return !(
        !this.TagComponent ||
        (!this.TagComponent.HasTag(-1503953470) &&
          !this.TagComponent.HasTag(-2044964178))
      );
    }
    JumpPressInAir() {
      var t;
      return !(
        this.CheckInHit() ||
        ((t = this.UnifiedStateComponent?.MoveState) ===
        CharacterUnifiedStateTypes_1.ECharMoveState.Glide
          ? (this.GlideComp?.Valid &&
              (this.GlideComp.ExitGlideState(),
              (this.LastGlidingControlTime = Time_1.Time.WorldTime)),
            0)
          : t === CharacterUnifiedStateTypes_1.ECharMoveState.Soar
            ? (this.GlideComp?.Valid &&
                (this.GlideComp.ExitSoarState(),
                (this.LastGlidingControlTime = Time_1.Time.WorldTime)),
              0)
            : t !== CharacterUnifiedStateTypes_1.ECharMoveState.Slide ||
              (CharacterMoveComponent_1.TempVelocity.FromUeVector(
                this.CharacterMovement.Kuro_GetBlockDirectWhenMove(),
              ),
              this.AnimComp?.Valid &&
                (this.SlideTrans ||
                  (this.SlideTrans = Transform_1.Transform.Create()),
                MathUtils_1.MathUtils.LookRotationUpFirst(
                  CharacterMoveComponent_1.TempVelocity,
                  Vector_1.Vector.UpVectorProxy,
                  this.TmpQuat,
                ),
                this.SlideTrans.Set(
                  this.ActorComp.ActorLocationProxy,
                  this.TmpQuat,
                  this.ActorComp.ActorScaleProxy,
                ),
                this.AnimComp.SetTransformWithModelBuffer(
                  this.SlideTrans.ToUeTransform(),
                  SLIDE_JUMP_LERP_TIME,
                )),
              (CharacterMoveComponent_1.TempVelocity.Z = 0),
              CharacterMoveComponent_1.TempVelocity.Normalize() ||
                CharacterMoveComponent_1.TempVelocity.DeepCopy(
                  this.ActorComp.ActorForwardProxy,
                ),
              CharacterMoveComponent_1.TempVelocity.MultiplyEqual(
                SLIDE_JUMP_SPEED /
                  CharacterMoveComponent_1.TempVelocity.Size2D(),
              ),
              (this.CharacterMovement.Velocity =
                CharacterMoveComponent_1.TempVelocity.ToUeVector()),
              this.OnJump(),
              this.CharacterMovement.SetMovementMode(3),
              this.PlayerMotionRequest(
                Protocol_1.Aki.Protocol.t8s.Proto_MotionJump,
              ),
              0))
      );
    }
    JumpPressInSki() {
      var t;
      return (
        !this.CheckInHit() &&
        !!(t = this.Entity.GetComponent(32)) &&
        (CharacterMoveComponent_1.TempVelocity.FromUeVector(
          this.ActorComp.ActorForwardProxy,
        ),
        this.AnimComp?.Valid &&
          (this.SlideTrans ||
            (this.SlideTrans = Transform_1.Transform.Create()),
          MathUtils_1.MathUtils.LookRotationUpFirst(
            CharacterMoveComponent_1.TempVelocity,
            t.SlideForward,
            this.TmpQuat,
          ),
          this.SlideTrans.Set(
            this.ActorComp.ActorLocationProxy,
            this.TmpQuat,
            this.ActorComp.ActorScaleProxy,
          ),
          this.AnimComp.SetTransformWithModelBuffer(
            this.SlideTrans.ToUeTransform(),
            SLIDE_JUMP_LERP_TIME,
          )),
        (CharacterMoveComponent_1.TempVelocity.Z = 0),
        CharacterMoveComponent_1.TempVelocity.Normalize() ||
          CharacterMoveComponent_1.TempVelocity.DeepCopy(
            this.ActorComp.ActorForwardProxy,
          ),
        CharacterMoveComponent_1.TempVelocity.MultiplyEqual(
          this.ActorComp.ActorVelocityProxy.Size2D(),
        ),
        (this.CharacterMovement.Velocity =
          CharacterMoveComponent_1.TempVelocity.ToUeVector()),
        this.OnJump(),
        t.OnJump(),
        this.PlayerMotionRequest(Protocol_1.Aki.Protocol.t8s.Proto_MotionJump),
        !0)
      );
    }
    TrySetGlide() {
      if (
        this.UnifiedStateComponent?.PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Air
      ) {
        var t = this.UnifiedStateComponent.MoveState;
        if (
          t !== CharacterUnifiedStateTypes_1.ECharMoveState.Glide &&
          t !== CharacterUnifiedStateTypes_1.ECharMoveState.Slide &&
          !this.TagComponent?.HasTag(-8769906) &&
          Time_1.Time.WorldTime - this.LastGlidingControlTime >
            GLIDING_CONTROL_OFFSET &&
          (this.GetHeightAboveGround() > GLIDING_HEIGHT_THREDHOLD ||
            this.TagComponent?.HasTag(-654554827)) &&
          FormationAttributeController_1.FormationAttributeController.GetValue(
            1,
          ) > GLIDE_STRENGTH_THREADHOLD
        ) {
          t = this.Entity.GetComponent(34);
          if (t.Valid && t.CurrentSkill) {
            if (!t.CheckGlideCanInterrupt()) return !1;
            t.StopGroup1Skill("滑翔打断技能"), this.LimitMaxSpeed();
          }
          return (
            this.GlideComp?.Valid &&
              (ModelManager_1.ModelManager.CharacterModel?.TestSoarOn
                ? this.GlideComp.EnterSoarState()
                : this.GlideComp.EnterGlideState(),
              this.StopAddMove(this.AirInertiaHandler),
              (this.AirInertiaHandler = 0),
              (this.LastGlidingControlTime = Time_1.Time.WorldTime)),
            !0
          );
        }
      }
      return !1;
    }
    PlayerMovementInput(t) {
      var e = this.Entity.GetComponent(26);
      if (!e?.GetSitDownState()) {
        e = this.Entity.GetComponent(34);
        if (
          e?.Valid &&
          this.ContainsTag(1996624497) &&
          !this.ContainsTag(-652371212)
        ) {
          if (
            !this.CanResponseInput() ||
            !e.IsMainSkillReadyEnd ||
            t.SizeSquared() < NEAR_ZERO
          )
            return;
          e.StopGroup1Skill("移动打断技能");
        }
        switch (this.UnifiedStateComponent?.PositionState) {
          case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
            this.ActorComp.Actor.AddMovementInput(
              t,
              this.AnimComp?.Valid ? this.AnimComp.GetWalkRunMix() : 1,
              !1,
            );
            break;
          case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
          case CharacterUnifiedStateTypes_1.ECharPositionState.Water:
            this.ActorComp.Actor.AddMovementInput(t, 1, !1);
        }
      }
    }
    UpdateInputOrder() {
      this.CanResponseInput() &&
        this.PlayerMovementInput(this.ActorComp.InputDirect);
    }
    SmoothCharacterRotationByValue(
      t,
      e,
      i,
      s,
      h,
      r = "Movement.SmoothCharacterRotationByValue",
    ) {
      this.LockedRotation ||
        ((this.TmpRotator.Pitch = t),
        (this.TmpRotator.Yaw = e),
        (this.TmpRotator.Roll = i),
        (t = this.ActorComp.ActorRotationProxy),
        this.TmpRotator.Equals(t)) ||
        (MathUtils_1.MathUtils.RotatorInterpConstantTo(
          t,
          this.TmpRotator,
          h,
          s,
          this.TmpRotator,
        ),
        this.ActorComp.SetActorRotationWithPriority(
          this.TmpRotator.ToUeRotator(),
          r,
          0,
          !1,
          !1,
        ));
    }
    UpdateInAirRotation() {
      !this.UnifiedStateComponent ||
        (this.UnifiedStateComponent.MoveState !==
          CharacterUnifiedStateTypes_1.ECharMoveState.Glide &&
          this.UnifiedStateComponent.MoveState !==
            CharacterUnifiedStateTypes_1.ECharMoveState.Slide) ||
        this.SmoothCharacterRotation(
          this.ActorComp.InputRotatorProxy,
          TsBaseRoleConfig_1.tsBaseRoleConfig.SmoothCharacterRotationSpeed,
          this.DeltaTimeSeconds,
          !1,
          "Movement.UpdateInAirRotation",
        );
    }
    SetAddMoveSpeed(t, e) {
      t = this.ActorComp.ActorRotation.RotateVector(t);
      return this.SetAddMoveWorld(t, -1, void 0, e);
    }
    SetAddMoveSpeedWithMesh(t, e) {
      var i;
      t
        ? ((i = this.VelocityAdditionMapByMesh.get(t) ?? 0),
          (e = this.ActorComp.ActorRotation.RotateVector(e)),
          (i = this.SetAddMoveWorld(e, -1, void 0, i)) &&
            this.VelocityAdditionMapByMesh.set(t, i))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Game",
            15,
            "[CharacterMoveComponent.SetAddMoveSpeedWithMesh] 叠加位移失败，mesh为空",
          );
    }
    SetAddMove(t, e, i, s, h, r, a) {
      t = this.ActorComp.ActorRotation.RotateVector(t);
      return this.SetAddMoveWorld(t, e, i, s, void 0, h, r, a);
    }
    SetAddMoveWithMesh(t, e, i, s) {
      var h;
      t
        ? ((h = this.VelocityAdditionMapByMesh.get(t) ?? 0),
          (e = this.ActorComp.ActorRotation.RotateVector(e)),
          (h = this.SetAddMoveWorld(e, i, s, h)) &&
            this.VelocityAdditionMapByMesh.set(t, h))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Game",
            15,
            "[CharacterMoveComponent.SetAddMoveWithMesh] 叠加位移失败，mesh为空",
          );
    }
    SetGravityScale(t, e, i, s, h) {
      (1 === t && 1 === e && 1 === i) ||
        ((this.CurrentGravityScale.ScaleUp = t),
        (this.CurrentGravityScale.ScaleDown = e),
        (this.CurrentGravityScale.ScaleTop = i),
        (this.CurrentGravityScale.VelocityTop = s),
        (this.CurrentGravityScale.Duration = h),
        (this.CurrentGravityScale.ElapsedTime = 0));
    }
    GetLastUpdateVelocity() {
      return this.CharacterMovement.GetLastUpdateVelocity();
    }
    get CharacterWeight() {
      return this.CreatureProperty ? this.CreatureProperty.重量 : 0;
    }
    get HasSwimmingBlock() {
      return (
        this.CharacterMovement.CustomMovementMode ===
          CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWIM &&
        0 < this.CharacterMovement.Kuro_GetBlockDirectWhenMove().SizeSquared()
      );
    }
    UpdateSkillRotation() {
      return (
        !!this.SkillComp &&
        !(
          !this.SkillComp.Active ||
          !this.SkillComp.UpdateAllSkillRotator(this.DeltaTimeSeconds)
        )
      );
    }
    UpdateFacing() {
      if (this.CanUpdateMovingRotation()) {
        var t = this.Entity.GetComponent(26);
        if (!t?.GetSitDownState())
          if (this.ActorComp.OverrideTurnSpeed)
            this.SmoothCharacterRotation(
              this.ActorComp.InputRotatorProxy,
              this.ActorComp.OverrideTurnSpeed,
              this.DeltaTimeSeconds,
              !1,
              "Movement.UpdateFacing",
            ),
              this.ActorComp.SetOverrideTurnSpeed(void 0);
          else if (
            !this.UpdateSkillRotation() &&
            this.IsInputDrivenCharacter &&
            !(0 < this.AnimComp.BattleIdleEndTime)
          ) {
            t = this.UnifiedStateComponent;
            if (t?.Valid) {
              t = t.PositionState;
              if (!this.ContainsTag(1996624497))
                switch (t) {
                  case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
                    this.UpdateGroundedRotation();
                    break;
                  case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
                    this.UpdateInAirRotation();
                }
            } else this.UpdateGroundedRotation();
          }
      } else this.UpdateSkillRotation();
    }
    SpeedScaled(t) {
      return this.TimeScaleComp
        ? t * this.TimeScaleComp.CurrentTimeScale * this.ActorComp.TimeDilation
        : t;
    }
    CanMove() {
      return super.CanMove() && !this.ContainsTag(-2044964178);
    }
    SetChain(t, e) {
      (this.ConfigChainLengthSquared = t < 0 ? -1 : t * t),
        this.ChainCenter.FromUeVector(e || this.ActorComp.GetInitLocation());
    }
    UpdateMoveChain() {
      var t;
      this.ConfigChainLengthSquared < 0 ||
        ((this.CurrentChainLengthSquared = Math.max(
          this.CurrentChainLengthSquared,
          this.ConfigChainLengthSquared,
        )),
        (t = Vector_1.Vector.DistSquared2D(
          this.ActorComp.ActorLocationProxy,
          this.ChainCenter,
        )) > this.CurrentChainLengthSquared
          ? (this.ChainCenter.Subtraction(
              this.ActorComp.ActorLocationProxy,
              CharacterMoveComponent_1.TempVelocity,
            ),
            (CharacterMoveComponent_1.TempVelocity.Z = 0),
            CharacterMoveComponent_1.TempVelocity.MultiplyEqual(
              (Math.sqrt(t) - Math.sqrt(this.CurrentChainLengthSquared)) /
                CharacterMoveComponent_1.TempVelocity.Size2D(),
            ),
            this.MoveCharacter(
              CharacterMoveComponent_1.TempVelocity,
              this.DeltaTimeSeconds,
            ))
          : t > this.ConfigChainLengthSquared &&
            (this.CurrentChainLengthSquared = t));
    }
    PlayerMotionRequest(t) {
      var e = Protocol_1.Aki.Protocol.Hls.create();
      (e.c8n = t), Net_1.Net.Call(19946, e, () => {});
    }
    pHr() {
      var t,
        e = this.gHr.GetAlpha();
      return !(
        1 < e ||
        ((t = CharacterMoveComponent_1.VelocityAdditionDestination),
        Vector_1.Vector.Lerp(this.gHr.BeginLocation, this.gHr.ToLocation, e, t),
        this.ActorComp.SetActorLocation(t.ToUeVector(), "移动.被吸引", !0),
        0)
      );
    }
    BeginWhirlpool(t, e, i, s, h = -1, r = 0) {
      var a = this.CharacterMovement;
      (a.GravityScale = 0),
        this.Entity.GetComponent(161).SetMoveState(
          CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp,
        ),
        a.SetMovementMode(3),
        this.SetForceFallingSpeed(Vector_1.Vector.ZeroVector, 31862857),
        this.gHr.Begin(t, e, i, s, h, r);
    }
    EndWhirlpool() {
      (this.CharacterMovement.GravityScale = 2), this.gHr.OnEnd();
    }
    GetWhirlpoolEnable() {
      return this.gHr.GetEnable();
    }
    GetWhirlpoolId() {
      return this.gHr.GetId();
    }
    CompareWhirlpoolPriority(t) {
      return t < this.gHr.GetMoveTime();
    }
    UpdateWhirlpoolLocation(t) {
      this.gHr.UpdateLocation(t);
    }
    InitStepUpParams() {
      this.CharacterMovement &&
        ((this.InitMaxStepHeight = this.CharacterMovement.MaxStepHeight),
        (this.InitStepUpPercent = this.CharacterMovement.StepUpDeltaPrecent),
        (this.InitStepUpStandardSpeed =
          this.CharacterMovement.StepUpStandardSpeed));
    }
    SetStepUpParamsRecord(t) {
      t
        ? (--this.kka, 0 === this.kka && this.ResetStepUpParams())
        : (++this.kka, 1 === this.kka && this.SetStepUpParams()),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Movement",
            43,
            "SetStepUpParamsRecord",
            ["reset", t],
            ["count", this.kka],
          );
    }
    SetStepUpParams() {
      this.CharacterMovement &&
        ((this.CharacterMovement.StepUpDeltaPrecent = 1),
        (this.CharacterMovement.StepUpStandardSpeed = 1));
    }
    ResetStepUpParams() {
      this.CharacterMovement &&
        ((this.CharacterMovement.StepUpDeltaPrecent = this.InitStepUpPercent),
        (this.CharacterMovement.StepUpStandardSpeed =
          this.InitStepUpStandardSpeed));
    }
    SetStepHeight(t) {
      this.CharacterMovement && (this.CharacterMovement.MaxStepHeight = t);
    }
    ResetStepHeight() {
      this.CharacterMovement &&
        (this.CharacterMovement.MaxStepHeight = this.InitMaxStepHeight);
    }
  });
(CharacterMoveComponent.TempVelocity = Vector_1.Vector.Create()),
  (CharacterMoveComponent = CharacterMoveComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(164)],
      CharacterMoveComponent,
    )),
  (exports.CharacterMoveComponent = CharacterMoveComponent);
//# sourceMappingURL=CharacterMoveComponent.js.map
