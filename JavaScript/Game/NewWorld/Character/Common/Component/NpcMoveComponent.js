"use strict";
var NpcMoveComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var h,
        n = arguments.length,
        r =
          n < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(t, e, i, s);
      else
        for (var o = t.length - 1; 0 <= o; o--)
          (h = t[o]) &&
            (r = (n < 3 ? h(r) : 3 < n ? h(e, i, r) : h(e, i)) || r);
      return 3 < n && r && Object.defineProperty(e, i, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcMoveComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  PreloadConstants_1 = require("../../../../World/Controller/PreloadConstants"),
  CharacterNameDefines_1 = require("../CharacterNameDefines"),
  CharacterAttributeTypes_1 = require("./Abilities/CharacterAttributeTypes"),
  CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes"),
  BaseMoveComponent_1 = require("./BaseMoveComponent"),
  MIN_MOVE_SPEED = 20,
  MAX_IN_WATER_SPEED = 800,
  BASE_MOVE_INHERIT_TIME = 1.5;
let NpcMoveComponent = (NpcMoveComponent_1 = class NpcMoveComponent extends (
  BaseMoveComponent_1.BaseMoveComponent
) {
  constructor() {
    super(...arguments),
      (this.CanResponseInputTasks = new Array()),
      (this.CachedDeltaYaw = 0),
      (this.IsTurningInternal = !1),
      (this.OnPositionStateChanged = (t, e) => {
        switch (
          (t === CharacterUnifiedStateTypes_1.ECharPositionState.Air &&
            ((this.IsFallingIntoWater = !1),
            this.StopAddMove(this.AirInertiaHandler),
            (this.AirInertiaHandler = 0)),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Character",
              20,
              "OnPositionStateChanged:",
              ["NPCName:", this.ActorComp.Actor.GetName()],
              ["oldPositionState->", t],
              ["newPositionState", e],
            ),
          e)
        ) {
          case CharacterUnifiedStateTypes_1.ECharPositionState.Water:
            this.VelocityVector.FromUeVector(this.ActorComp.ActorVelocityProxy);
            var i = this.VelocityVector.Size();
            i > MAX_IN_WATER_SPEED &&
              (this.VelocityVector.MultiplyEqual(MAX_IN_WATER_SPEED / i),
              this.ActorComp?.SetActorVelocity(this.VelocityVector));
            break;
          case CharacterUnifiedStateTypes_1.ECharPositionState.Climb:
          case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
            break;
          case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
            this.HasBaseMovement &&
              !this.ActorComp.Actor.BasedMovement.bRelativeRotation &&
              this.DeltaBaseMovementSpeed &&
              (this.AirInertiaHandler = this.SetAddMoveWorld(
                this.DeltaBaseMovementSpeed,
                BASE_MOVE_INHERIT_TIME,
                NpcMoveComponent_1.BaseMoveInheritCurve,
                this.AirInertiaHandler,
              ));
        }
      }),
      (this.AirInertiaHandler = 0);
  }
  static get Dependencies() {
    return [3];
  }
  get IsTurning() {
    return this.IsTurningInternal;
  }
  set IsTurning(t) {
    this.IsTurningInternal !== t &&
      ((this.IsTurningInternal = t)
        ? EventSystem_1.EventSystem.EmitWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharTurnBegin,
          )
        : EventSystem_1.EventSystem.EmitWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharTurnEnd,
          ));
  }
  SetMaxSpeed(t) {
    let e = CharacterAttributeTypes_1.PER_TEN_THOUSAND;
    e <= 0 && (e = CharacterAttributeTypes_1.PER_TEN_THOUSAND);
    t *= e /= CharacterAttributeTypes_1.PER_TEN_THOUSAND;
    5 === this.CharacterMovement.MovementMode
      ? (this.CharacterMovement.MaxFlySpeed = t)
      : (this.CharacterMovement.MaxWalkSpeed = t);
  }
  OnClear() {
    return (
      super.OnClear(),
      this.JumpDelayTimer &&
        TimerSystem_1.TimerSystem.Remove(this.JumpDelayTimer),
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
      (this.AccelerationChangeMoveState =
        CharacterUnifiedStateTypes_1.ECharMoveState.Other);
    var t = this.Entity.GetComponent(3);
    return (
      !!t.Valid &&
      ((this.IsHidden = !1),
      (this.ActorComp = t),
      (this.CharacterMovement = t.Actor.CharacterMovement),
      (this.CharacterMovement.GravityScale = 2),
      (this.CharacterMovement.bRotationFollowBaseMovement = !0),
      (this.AnimComp = this.Entity.GetComponent(175)),
      (this.UnifiedStateComponent = this.Entity.GetComponent(99)),
      (this.CapsuleOffset = Vector_1.Vector.Create(
        0,
        0,
        this.ActorComp.Radius - this.ActorComp.HalfHeight,
      )),
      this.InitCreatureProperty(),
      (this.MovementData = DataTableUtil_1.DataTableUtil.GetDataTableRow(
        this.ActorComp.Actor.DtBaseMovementSetting,
        CharacterNameDefines_1.CharacterNameDefines.NORMAL.toString(),
      )),
      (this.ActorComp.Actor.DtBaseMovementSetting && this.MovementData) ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            57,
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
        EventDefine_1.EEventName.CharOnDirectionStateChanged,
        this.OnDirectionStateChange,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnPositionStateChanged,
        this.OnPositionStateChanged,
      ),
      (this.IsStopInternal = !1),
      this.InitBaseState(),
      this.InitTraceInfo(),
      !0)
    );
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
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.Entity,
      EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
      this.OnMoveStateChange,
    ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnDirectionStateChanged,
        this.OnDirectionStateChange,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnPositionStateChanged,
        this.OnPositionStateChanged,
      );
    for (const t of this.CanResponseInputTasks) t.EndTask();
    return (this.CanResponseInputTasks.length = 0), !(this.IsHidden = !1);
  }
  OnActivate() {
    var t;
    this.OnMoveStateChange(
      CharacterUnifiedStateTypes_1.ECharMoveState.Stand,
      CharacterUnifiedStateTypes_1.ECharMoveState.Run,
    ),
      this.OnPositionStateChanged(
        CharacterUnifiedStateTypes_1.ECharPositionState.Air,
        CharacterUnifiedStateTypes_1.ECharPositionState.Ground,
      ),
      this.CharacterMovement.MovementMode !==
        this.CharacterMovement.DefaultLandMovementMode &&
        ((t =
          1 === ModelManager_1.ModelManager.WorldModel?.CurEnvironmentInfo.jNn),
        this.Entity.IsEncloseSpace && t
          ? this.ActorComp?.Actor.KuroSetMovementMode({
              Mode: 0,
              Context:
                "[NpcMoveComponent.OnActivate:人在山洞外,实体在山洞里的情况，将movementMode设成none防止掉落]",
            })
          : this.ActorComp?.Actor.KuroSetMovementMode({
              Mode: this.CharacterMovement.DefaultLandMovementMode,
              Context: "[NpcMoveComponent.OnActivate]",
            }));
  }
  OnTick(i) {
    if (
      (super.OnTick(i),
      this.ActorComp &&
        ((this.DeltaTimeSeconds =
          i * MathUtils_1.MathUtils.MillisecondToSecond),
        this.MoveController?.UpdateMove(this.DeltaTimeSeconds),
        0 < this.SpeedLockFrame && --this.SpeedLockFrame,
        this.IsJump && --this.JumpFrameCount,
        this.LerpMaxAcceleration(),
        this.UpdateBaseMovement(),
        !this.IsSpecialMove))
    )
      if (
        (this.IsStopInternal
          ? (this.Speed = 0)
          : (this.Speed = this.ActorComp.ActorVelocityProxy.Size2D()),
        (this.IsMoving = this.Speed > MIN_MOVE_SPEED),
        this.ActorComp.IsMoveAutonomousProxy)
      ) {
        this.UpdateMovementInput(this.ActorComp.InputDirect);
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
          h && e && this.AnimComp.SetModelBuffer(t, i),
          this.OnTickGravityScale(),
          this.HasBaseMovement &&
            (this.DeltaBaseMovementQuat.RotateVector(
              this.ActorComp.InputFacingProxy,
              this.TmpVector,
            ),
            this.ActorComp.SetInputFacing(this.TmpVector, !0)),
          ModelManager_1.ModelManager.SundryModel.SceneCheckOn &&
            this.PrintAnimInstanceMovementInfo();
      } else
        this.CanResponseInput()
          ? (this.SetInfoVar(), this.UpdateFacing(), this.CacheVar())
          : (this.HasMoveInput = !1);
  }
  InitCreatureProperty() {
    var t = this.Entity.GetComponent(0);
    (this.CreatureProperty = t.GetEntityPropertyConfig()),
      (this.CharacterMovement.Mass = this.CreatureProperty.重量),
      (this.CharacterMovement.HitPriority = this.CreatureProperty.碰撞优先级),
      (this.CharacterMovement.GoThroughPriority =
        this.CreatureProperty.穿透优先级);
  }
  GetAndConsumeAddMove(t, e, i) {
    if (
      (e.Reset(),
      i.Reset(),
      this.AddMoveOffset &&
        (this.TmpVector.FromUeVector(this.AddMoveOffset),
        e.AdditionEqual(this.TmpVector),
        (this.AddMoveOffset = void 0)),
      this.AddMoveRotation.IsNearlyZero() ||
        (i.DeepCopy(this.AddMoveRotation), this.AddMoveRotation.Reset()),
      0 !== this.VelocityAdditionMap.size)
    ) {
      NpcMoveComponent_1.VelocityAdditionTotal.Reset();
      for (var [s, h] of this.VelocityAdditionMap)
        0 <= h.Duration && h.ElapsedTime >= h.Duration
          ? this.VelocityAdditionMap.delete(s)
          : h.MovementMode &&
              this.CharacterMovement.CustomMovementMode !== h.MovementMode
            ? this.VelocityAdditionMap.delete(s)
            : ((h.ElapsedTime += this.DeltaTimeSeconds),
              this.VelocityVector.FromUeVector(h.Velocity),
              h.CurveFloat?.IsValid() &&
                this.VelocityVector.MultiplyEqual(
                  h.CurveFloat.GetFloatValue(
                    0 < h.Duration ? h.ElapsedTime / h.Duration : 1,
                  ),
                ),
              0 < h.Duration &&
                h.ElapsedTime > h.Duration &&
                ((s = h.ElapsedTime - h.Duration),
                (h = (this.DeltaTimeSeconds - s) / this.DeltaTimeSeconds),
                this.VelocityVector.MultiplyEqual(h)),
              NpcMoveComponent_1.VelocityAdditionTotal.AdditionEqual(
                this.VelocityVector,
              ));
      BaseMoveComponent_1.BaseMoveComponent.VelocityAdditionTotal.Multiply(
        t,
        BaseMoveComponent_1.BaseMoveComponent.VelocityAdditionDestination,
      ),
        BaseMoveComponent_1.BaseMoveComponent.VelocityAdditionDestination.ContainsNaN()
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Movement",
              6,
              "VelocityAdditionDestination NaN",
              [
                "VelocityAdditionDestination",
                BaseMoveComponent_1.BaseMoveComponent
                  .VelocityAdditionDestination,
              ],
              [
                "VelocityAdditionTotal",
                BaseMoveComponent_1.BaseMoveComponent.VelocityAdditionTotal,
              ],
              ["deltaTimeSeconds", t],
            )
          : e.AdditionEqual(
              BaseMoveComponent_1.BaseMoveComponent.VelocityAdditionDestination,
            );
    }
  }
  UpdateMovementInput(t) {
    switch (this.UnifiedStateComponent?.PositionState) {
      case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
        this.ActorComp.Actor.D_AddMovementInput(
          t,
          this.AnimComp?.Valid ? this.AnimComp.GetWalkRunMix() : 1,
          !1,
        );
        break;
      case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
        this.ActorComp.Actor.D_AddMovementInput(t, 1, !1);
    }
  }
  UpdateFacing() {
    this.CanUpdateMovingRotation() &&
      (this.ActorComp.OverrideTurnSpeed
        ? (this.SmoothCharacterRotation(
            this.ActorComp.InputRotatorProxy,
            this.ActorComp.OverrideTurnSpeed,
            this.DeltaTimeSeconds,
            !1,
            "Movement.UpdateFacing",
          ),
          this.ActorComp.SetOverrideTurnSpeed(void 0))
        : this.UpdateGroundedRotation());
  }
});
(NpcMoveComponent = NpcMoveComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(179)],
    NpcMoveComponent,
  )),
  (exports.NpcMoveComponent = NpcMoveComponent);
//# sourceMappingURL=NpcMoveComponent.js.map
