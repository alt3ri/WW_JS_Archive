"use strict";
var CharacterAnimationComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, s, h) {
      var e,
        r = arguments.length,
        o =
          r < 3
            ? i
            : null === h
              ? (h = Object.getOwnPropertyDescriptor(i, s))
              : h;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        o = Reflect.decorate(t, i, s, h);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (e = t[a]) &&
            (o = (r < 3 ? e(o) : 3 < r ? e(i, s, o) : e(i, s)) || o);
      return 3 < r && o && Object.defineProperty(i, s, o), o;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterAnimationComponent = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon"),
  Quat_1 = require("../../../../../Core/Utils/Math/Quat"),
  Transform_1 = require("../../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  Global_1 = require("../../../../Global"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  AnimController_1 = require("../../../../Module/Anim/AnimController"),
  CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage"),
  PhotographController_1 = require("../../../../Module/Photograph/PhotographController"),
  InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController"),
  CombatDebugController_1 = require("../../../../Utils/CombatDebugController"),
  PreloadConstants_1 = require("../../../../World/Controller/PreloadConstants"),
  AnimLogicParamsSetter_1 = require("../Blueprint/Utils/AnimLogicParamsSetter"),
  CharacterNameDefines_1 = require("../CharacterNameDefines"),
  CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes"),
  BaseAnimationComponent_1 = require("./BaseAnimationComponent"),
  ROTATABLE_THREADHOLD = 0.5,
  MIN_SCLOPE_SCALE = 0.5,
  MAX_SCLOPE_SCALE = 1,
  CAMERA_INFEED_ME = 0.3,
  TURN_SPEED = 0.36,
  TURN_RATIO = 0.04,
  WATCH_CAMERA_TIME = 1e3,
  WATCH_CAMERA_TIME_2 = 3e3,
  FIND_SIGHT_TARGET_ITEM_PERIOD = 1e3,
  SIGHT_TARGET_ITEM_DISTANCE_THREAHOLD = 2e3,
  SQUARE_SIGHT_TARGET_ITEM_DISTANCE_THREAHOLD =
    SIGHT_TARGET_ITEM_DISTANCE_THREAHOLD * SIGHT_TARGET_ITEM_DISTANCE_THREAHOLD,
  BATLLE_IDLE_TIME = 5e3,
  priorityToMaxSquareDistance = [
    [5, 25e4],
    [10, 1e6],
    [20, 4e6],
  ],
  WALK_RUN_MIX_LERP = 0.995,
  DEFAULT_CAMERA_HEIGHT_RATE = 1 / 3,
  MODEL_BUFFER_SMOOTH_FACTOR = 0.75,
  limitBlendSpaceY = [-30, 30],
  limitBlendSpaceX = [-90, 90];
let CharacterAnimationComponent =
  (CharacterAnimationComponent_1 = class CharacterAnimationComponent extends (
    BaseAnimationComponent_1.BaseAnimationComponent
  ) {
    constructor() {
      super(...arguments),
        (this.ActorComp = void 0),
        (this.Gce = void 0),
        (this.bre = void 0),
        (this.Lie = void 0),
        (this.v3r = void 0),
        (this.M3r = void 0),
        (this.S3r = -0),
        (this.SlopeStepPeriodicCurve = void 0),
        (this.SlopeStepSizeCurve = void 0),
        (this.E3r = 0),
        (this.y3r = 0),
        (this.I3r = Vector_1.Vector.Create()),
        (this.T3r = 0),
        (this.L3r = Vector_1.Vector.Create()),
        (this.D3r = void 0),
        (this.Z_e = Transform_1.Transform.Create()),
        (this.R3r = Transform_1.Transform.Create()),
        (this.az = Quat_1.Quat.Create()),
        (this.KJ = Quat_1.Quat.Create()),
        (this.A3r = Vector_1.Vector.Create()),
        (this.U3r = Vector_1.Vector.Create()),
        (this.P3r = Vector_1.Vector.Create()),
        (this.x3r = -0),
        (this.BufferModelTransform = Transform_1.Transform.Create()),
        (this.BufferOriginTransform = Transform_1.Transform.Create()),
        (this.BufferShowTransform = Transform_1.Transform.Create()),
        (this.BufferNowTime = 0),
        (this.BufferTimeLength = 0),
        (this.LastRemainBufferFrame = 0),
        (this.RemainBufferTime = 0),
        (this.w3r = !1),
        (this.BufferLocation = !1),
        (this.Xrr = Vector_1.Vector.Create()),
        (this.gwr = Vector_1.Vector.Create()),
        (this.B3r = Vector_1.Vector.Create()),
        (this.b3r = -1),
        (this.q3r = 0),
        (this.G3r = 0),
        (this.N3r = void 0),
        (this.zke = 0),
        (this.O3r = -1),
        (this.k3r = 2),
        (this.F3r = Vector_1.Vector.Create()),
        (this.H3r = !1),
        (this.AnimLogicParamsSetter = void 0),
        (this.Xxn = Vector_1.Vector.Create()),
        (this.W3r = (t, i, s) => {
          var h;
          t?.Valid &&
            (h = t.GetComponent(160))?.Valid &&
            (0 !== i || s
              ? this.K3r()
              : t.GetComponent(185)?.HasTag(715234113) ||
                ((i = this.Mesh.GetAnimInstance()) !==
                  this.MainAnimInstanceInternal && i.SyncAnimStates(void 0),
                UE.KuroStaticLibrary.IsObjectClassByName(
                  this.MainAnimInstanceInternal,
                  CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE,
                ) &&
                UE.KuroStaticLibrary.IsObjectClassByName(
                  h.MainAnimInstanceInternal,
                  CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE,
                )
                  ? this.MainAnimInstanceInternal.替换角色时同步动作数据(
                      h.MainAnimInstance,
                    )
                  : this.MainAnimInstanceInternal.SyncAnimStates(void 0),
                (s = this.Entity.GetComponent(41))?.ClearOrders(),
                s?.AnimationStateInitPush(),
                this.K3r()));
        }),
        (this.Q3r = () => {
          this.GetAnimInstanceFromMesh(), this.StartAnimInstance();
        }),
        (this.Gfr = () => {
          this.X3r();
        }),
        (this.$3r = (t) => {
          t || this.X3r();
        }),
        (this.Y3r = () => {
          this.StopModelBuffer();
        }),
        (this.ooo = () => {
          this.q3r = 0;
        }),
        (this.gne = (t) => {
          this.q3r = 0;
        }),
        (this.J3r = new Set([
          CharacterUnifiedStateTypes_1.ECharMoveState.Walk,
          CharacterUnifiedStateTypes_1.ECharMoveState.Stand,
          CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop,
          CharacterUnifiedStateTypes_1.ECharMoveState.RunStop,
          CharacterUnifiedStateTypes_1.ECharMoveState.SprintStop,
        ])),
        (this.z3r = (t, i) => {
          this.J3r.has(i) || (this.q3r = 0);
        });
    }
    static get Dependencies() {
      return [3, 0];
    }
    get DegMovementSlope() {
      return this.E3r;
    }
    get IkMeshOffset() {
      return this.y3r;
    }
    set IkMeshOffset(t) {
      this.y3r = t;
    }
    get MovementTerrainNormal() {
      return this.I3r;
    }
    get BattleIdleEndTime() {
      return this.q3r;
    }
    get HasKuroRootMotion() {
      return (
        !!this.MainAnimInstance &&
        (void 0 === this.N3r &&
          (this.N3r = this.MainAnimInstance.HasKuroRootMotionAnim()),
        this.N3r)
      );
    }
    K3r() {
      this.G3r
        ? Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Character", 58, "人物上场隐藏一帧【重复隐藏】", [
            "Entity:",
            this.Entity.Id,
          ])
        : ((this.G3r = this.ActorComp.DisableActor(
            "[CharacterAnimationComponent.TemporaryHidden] 短暂消失",
          )),
          this.StartForceDisableAnimOptimization(1),
          (this.O3r = 1),
          this.MainAnimInstanceInternal.ForceSetCurrentMontageBlendTime(0),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Character", 58, "人物上场隐藏一帧 【隐藏开始】", [
              "Entity:",
              this.Entity.Id,
            ]));
    }
    Z3r() {
      0 < this.O3r
        ? this.O3r--
        : 0 === this.O3r &&
          (this.ActorComp.EnableActor(this.G3r),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Character", 58, "人物上场隐藏一帧 【隐藏结束】", [
              "Entity:",
              this.Entity.Id,
            ]),
          (this.G3r = void 0),
          this.CancelForceDisableAnimOptimization(1),
          (this.O3r = -1));
    }
    X3r() {
      (this.q3r = 0),
        UE.KuroStaticLibrary.IsObjectClassByName(
          this.MainAnimInstance,
          CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE,
        ) && this.MainAnimInstance.CleanAnimVariable();
    }
    OnInitData() {
      return (
        (this.AnimLogicParamsSetter =
          new AnimLogicParamsSetter_1.AnimLogicParamsSetter()),
        !0
      );
    }
    OnClear() {
      var t, i;
      return (
        UE.KuroStaticLibrary.IsObjectClassByName(
          this.MainAnimInstanceInternal,
          CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE,
        ) &&
          (t = this.MainAnimInstanceInternal.LogicParams) &&
          (this.StopMontage(),
          this.MainAnimInstanceInternal.SyncAnimStates(void 0),
          (i = UE.KuroStaticLibrary.GetDefaultObject(t.GetClass())),
          (t.AccelerationRef = Vector_1.Vector.Create(
            i.AccelerationRef,
          ).ToUeVector()),
          (t.AcceptedNewBeHitRef = i.AcceptedNewBeHitRef),
          (t.BattleIdleTimeRef = i.BattleIdleTimeRef),
          (t.BeHitAnimRef = i.BeHitAnimRef),
          (t.BeHitDirectRef = Vector_1.Vector.Create(
            i.BeHitDirectRef,
          ).ToUeVector()),
          (t.BeHitLocationRef = Vector_1.Vector.Create(
            i.BeHitLocationRef,
          ).ToUeVector()),
          (t.BeHitSocketNameRef = FNameUtil_1.FNameUtil.EMPTY),
          (t.CharCameraStateRef = i.CharCameraStateRef),
          (t.CharMoveStateRef = i.CharMoveStateRef),
          (t.CharPositionStateRef = i.CharPositionStateRef),
          (t.ClimbInfoRef = i.ClimbInfoRef),
          (t.ClimbOnWallAngleRef = i.ClimbOnWallAngleRef),
          (t.ClimbStateRef = i.ClimbStateRef),
          (t.DegMovementSlopeRef = i.DegMovementSlopeRef),
          (t.DoubleHitInAirRef = i.DoubleHitInAirRef),
          (t.EnterFkRef = i.EnterFkRef),
          (t.GroundedTimeRef = i.GroundedTimeRef),
          (t.HasMoveInputRef = i.HasMoveInputRef),
          (t.InputDirectRef = Vector_1.Vector.Create(
            i.InputDirectRef,
          ).ToUeVector()),
          (t.InputRotatorRef = i.InputRotatorRef),
          (t.IsFallingIntoWaterRef = i.IsFallingIntoWaterRef),
          (t.IsJumpRef = i.IsJumpRef),
          (t.IsMovingRef = i.IsMovingRef),
          (t.JumpUpRateRef = i.JumpUpRateRef),
          (t.RagQuitStateRef = i.RagQuitStateRef),
          (t.SightDirectRef = Vector_1.Vector.Create(
            i.SightDirectRef,
          ).ToUeVector()),
          (t.SlideForwardRef = Vector_1.Vector.Create(
            i.SlideForwardRef,
          ).ToUeVector()),
          (t.SlideStandModeRef = i.SlideStandModeRef),
          (t.SlideSwitchThisFrameRef = i.SlideSwitchThisFrameRef),
          (t.SpeedRef = i.SpeedRef),
          (t.SprintSwimOffsetLerpSpeedRef = i.SprintSwimOffsetLerpSpeedRef),
          (t.SprintSwimOffsetRef = i.SprintSwimOffsetRef)),
        !0
      );
    }
    OnInit() {
      var t;
      return (
        super.OnInit(),
        (this.SlopeStepPeriodicCurve =
          ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            PreloadConstants_1.ANGLE_TO_STEP_FREQUENCY_CURVE_PATH,
            UE.CurveFloat,
          )),
        (this.SlopeStepSizeCurve =
          ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            PreloadConstants_1.ANGLE_TO_STEP_LENGTH_CURVE_PATH,
            UE.CurveFloat,
          )),
        !(
          !this.SlopeStepPeriodicCurve ||
          !this.SlopeStepSizeCurve ||
          ((t =
            this.Entity.GetComponent(0).GetModelConfig().注释时的抬升角度) &&
            ((this.D3r = Quat_1.Quat.Create()),
            Quat_1.Quat.FindBetween(
              Vector_1.Vector.ForwardVectorProxy,
              Vector_1.Vector.Create(
                Math.cos(t * MathUtils_1.MathUtils.DegToRad),
                0,
                Math.sin(t * MathUtils_1.MathUtils.DegToRad),
              ),
              this.D3r,
            )),
          0)
        )
      );
    }
    OnStart() {
      if (
        ((this.ActorComp = this.Entity.CheckGetComponent(3)),
        !this.ActorComp.Actor?.Mesh)
      )
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Character", 6, "模型仍未初始化", [
              "Entity",
              this.Entity.Id,
            ]),
          !1
        );
      if (this.ActorComp.Actor.Mesh.SkeletalMesh) {
        if (
          ((this.Actor = this.ActorComp.Actor),
          (this.Mesh = this.Actor.Mesh),
          (this.Gce = this.Entity.GetComponent(36)),
          (this.bre = this.Entity.GetComponent(38)),
          (this.Lie = this.Entity.GetComponent(185)),
          (this.v3r = this.Entity.GetComponent(69)),
          Info_1.Info.EnableForceTick ||
            ((this.M3r = this.Actor.GetComponentByClass(
              UE.KuroCharacterAnimationComponent.StaticClass(),
            )),
            this.M3r?.IsValid() ||
              (this.M3r = this.Actor.AddComponentByClass(
                UE.KuroCharacterAnimationComponent.StaticClass(),
                !1,
                new UE.Transform(),
                !1,
              )),
            this.M3r.SetComponentTickEnabled(!0)),
          this.GetAnimInstanceFromMesh(),
          !this.MainAnimInstanceInternal)
        )
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Character",
                6,
                "缺少MainAnimInstance",
                ["Entity", this.Entity.Id],
                ["pbDataId", this.ActorComp.CreatureData.GetPbDataId()],
              ),
            !1
          );
        this.InitBaseInfo(),
          this.Ore(),
          this.CheckNpcAnimationAssets(),
          this.Mesh.DoesSocketExist(
            CharacterAnimationComponent_1.CameraPosition,
          )
            ? ((this.k3r = 0),
              this.F3r.FromUeVector(
                this.Mesh.GetSocketTransform(
                  CharacterAnimationComponent_1.CameraPosition,
                  1,
                ).GetLocation(),
              ))
            : this.Mesh.DoesSocketExist(CharacterAnimationComponent_1.HitCase)
              ? (this.k3r = 1)
              : (this.k3r = 2);
      }
      return !0;
    }
    InitBaseInfo() {
      (this.S3r = 1), (this.x3r = 0), (this.E3r = 0), (this.IkMeshOffset = 0);
      var t = this.Mesh,
        t =
          (this.BufferOriginTransform.FromUeTransform(t.GetRelativeTransform()),
          this.BufferShowTransform.FromUeTransform(t.GetRelativeTransform()),
          this.ActorComp.CreatureData.GetEntityType());
      (this.zke = this.ActorComp.CreatureData.GetRoleId()),
        this.SightDirect.DeepCopy(Vector_1.Vector.RightVectorProxy),
        this.SightDirect2.DeepCopy(Vector_1.Vector.RightVectorProxy),
        t === Protocol_1.Aki.Protocol.HBs.Proto_Player
          ? (this.IsPlayer = !0)
          : ((this.IsPlayer = !1),
            (this.H3r = !0),
            this.StartForceDisableAnimOptimization(0)),
        this.e4r();
    }
    t4r() {
      this.H3r && ((this.H3r = !1), this.CancelForceDisableAnimOptimization(0));
    }
    Ore() {
      this.IsPlayer &&
        this.ActorComp.IsAutonomousProxy &&
        (EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharUseSkill,
          this.ooo,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeHitLocal,
          this.gne,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
          this.z3r,
        ),
        (this.w3r = !0)),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.W3r,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharChangeMeshAnim,
          this.Q3r,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.TeleportStartEntity,
          this.Gfr,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnRoleDrown,
          this.$3r,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RequestClearMeshRotationBuffer,
          this.Y3r,
        );
    }
    kre() {
      this.w3r &&
        (EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharUseSkill,
          this.ooo,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeHitLocal,
          this.gne,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
          this.z3r,
        )),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.W3r,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharChangeMeshAnim,
          this.Q3r,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.TeleportStartEntity,
          this.Gfr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnRoleDrown,
          this.$3r,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RequestClearMeshRotationBuffer,
          this.Y3r,
        );
    }
    OnEnd() {
      return (
        AnimController_1.AnimController.UnregisterUpdateAnimInfoEntity(
          this.Entity.Id,
        ),
        this.kre(),
        this.StopModelBuffer(),
        !0
      );
    }
    OnActivate() {
      this.StartAnimInstance(),
        AnimController_1.AnimController.RegisterUpdateAnimInfoEntity(
          this.Entity.Id,
        );
    }
    OnTick(t) {
      this.t4r(),
        this.Z3r(),
        this.i4r(t),
        this.IsPlayer &&
          ((this.q3r -= t),
          0 < this.BattleIdleEndTime &&
            this.ActorComp.InputDirectProxy.SizeSquared2D() >
              MathUtils_1.MathUtils.SmallNumber &&
            (this.q3r = 0),
          this.o4r(),
          this.UpdateWalkRunMix(t));
    }
    OnAfterTick(t) {
      this.N3r = void 0;
    }
    OnForceAfterTick(t) {
      this.UpdateModelBuffer(t);
    }
    OnDisable() {
      0 <= this.O3r &&
        (this.ActorComp.EnableActor(this.G3r), Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info(
          "Character",
          58,
          "人物上场隐藏一帧 【组件Disable 隐藏结束】",
          ["Entity:", this.Entity.Id],
        ),
        (this.O3r = -1),
        this.Lie?.HasTag(1144073280) ||
          this.Entity.GetComponent(168)?.AnyIdleLoopMontagePlaying ||
          (this.MainAnimInstanceInternal?.IsValid() &&
            (this.StopMontage(),
            TimerSystem_1.TimerSystem.Next(() => {
              this.Active ||
                (this.MainAnimInstance?.ClearMontage(),
                UE.KuroAnimLibrary.EndAnimNotifyStates(
                  this.MainAnimInstanceInternal,
                ));
            })),
          this.SightDirect.DeepCopy(Vector_1.Vector.RightVectorProxy),
          this.SightDirect2.DeepCopy(Vector_1.Vector.RightVectorProxy));
    }
    SetBlendSpaceLookAt(t) {
      (this.EnableBlendSpaceLookAtInner = t),
        (this.LookAtBlendSpaceVector2D.X = MathUtils_1.MathUtils.Clamp(
          MathCommon_1.MathCommon.RightAngle -
            this.SightDirect.HeadingAngle() * MathCommon_1.MathCommon.RadToDeg,
          limitBlendSpaceX[0],
          limitBlendSpaceX[1],
        )),
        (this.LookAtBlendSpaceVector2D.Y = MathUtils_1.MathUtils.Clamp(
          Math.asin(this.SightDirect.Z) * MathCommon_1.MathCommon.RadToDeg,
          limitBlendSpaceY[0],
          limitBlendSpaceY[1],
        ));
    }
    EnterBattleIdle() {
      this.q3r = BATLLE_IDLE_TIME;
    }
    OnJump() {
      var t;
      return UE.KuroStaticLibrary.IsObjectClassByName(
        this.MainAnimInstanceInternal,
        CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE,
      )
        ? ((t = (0, puerts_1.$ref)(0)),
          this.MainAnimInstanceInternal.InterfaceJumpPressed(t),
          (0, puerts_1.$unref)(t))
        : 0;
    }
    SimulateJump(t) {
      this.MainAnimInstanceInternal.InterfaceSimulateJump(t);
    }
    AnimCanTurn() {
      return (
        !this.MainAnimInstanceInternal.HasKuroRootMotionAnim() ||
        this.MainAnimInstanceInternal.GetCurveValue(
          CharacterNameDefines_1.CharacterNameDefines.ROOT_ROTATABLE,
        ) >= ROTATABLE_THREADHOLD
      );
    }
    ClimbDash() {
      UE.KuroStaticLibrary.IsObjectClassByName(
        this.MainAnimInstanceInternal,
        CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE,
      ) && this.MainAnimInstanceInternal.ClimbDash();
    }
    MontageSetPosition(t) {
      this.MainAnimInstanceInternal &&
        this.MainAnimInstanceInternal.Montage_SetPosition(
          this.MainAnimInstanceInternal.GetCurrentActiveMontage(),
          t,
        );
    }
    AddModelQuat(t, i) {
      var s;
      Info_1.Info.EnableForceTick
        ? ((s = this.BufferShowTransform.GetRotation()),
          t.Multiply(s, this.az),
          this.BufferShowTransform.SetRotation(this.az),
          i &&
            (t.RotateVector(this.BufferShowTransform.GetLocation(), this.A3r),
            this.BufferShowTransform.SetLocation(this.A3r)),
          this.BufferNowTime < this.BufferTimeLength ||
            this.Mesh.K2_SetRelativeTransform(
              this.BufferShowTransform.ToUeTransform(),
              !1,
              void 0,
              !1,
            ))
        : this.M3r.AddModelQuat(t.ToUeQuat(), i);
    }
    AddModelLocation(t) {
      Info_1.Info.EnableForceTick
        ? (this.Xxn.AdditionEqual(t),
          t.Addition(this.BufferShowTransform.GetLocation(), this.A3r),
          this.BufferShowTransform.SetLocation(this.A3r),
          this.BufferNowTime < this.BufferTimeLength ||
            this.Mesh.K2_SetRelativeTransform(
              this.BufferShowTransform.ToUeTransform(),
              !1,
              void 0,
              !1,
            ))
        : this.M3r.AddModelLocation(t.ToUeVector());
    }
    ResetModelQuat() {
      Info_1.Info.EnableForceTick
        ? (this.Xxn.Addition(
            this.BufferOriginTransform.GetLocation(),
            this.A3r,
          ),
          this.BufferShowTransform.SetLocation(this.A3r),
          this.BufferShowTransform.SetRotation(
            this.BufferOriginTransform.GetRotation(),
          ),
          this.BufferNowTime < this.BufferTimeLength ||
            this.Mesh.K2_SetRelativeTransform(
              this.BufferShowTransform.ToUeTransform(),
              !1,
              void 0,
              !1,
            ))
        : this.M3r.ResetModelQuat();
    }
    ResetModelLocation() {
      Info_1.Info.EnableForceTick
        ? (this.Xxn.Reset(),
          this.BufferShowTransform.SetLocation(
            this.BufferOriginTransform.GetLocation(),
          ),
          this.BufferNowTime < this.BufferTimeLength ||
            this.Mesh.K2_SetRelativeTransform(
              this.BufferShowTransform.ToUeTransform(),
              !1,
              void 0,
              !1,
            ))
        : this.M3r.ResetModelLocation();
    }
    r4r(t, i, s) {
      Info_1.Info.EnableForceTick
        ? (this.A3r.FromUeVector(t.GetLocation()),
          this.A3r.SubtractionEqual(i.ActorLocationProxy),
          s.SetLocation(this.A3r),
          this.A3r.FromUeVector(t.GetScale3D()),
          this.A3r.SubtractionEqual(i.ActorScaleProxy),
          s.SetScale3D(this.A3r),
          this.az.FromUeQuat(t.GetRotation()),
          i.ActorQuatProxy.Inverse(this.KJ),
          this.KJ.Multiply(this.az, this.az),
          s.SetRotation(this.az))
        : (this.M3r.GetTransformOffsetInWorld(t, i.ActorTransform),
          s.SetLocation(this.BufferShowTransform.GetLocation()),
          s.SetRotation(this.BufferShowTransform.GetRotation()),
          s.SetScale3D(this.BufferShowTransform.GetScale3D()));
    }
    SetTransformWithModelBuffer(t, i, s = void 0) {
      Info_1.Info.EnableForceTick
        ? ((this.BufferNowTime = 0), (this.BufferTimeLength = i))
        : ((this.M3r.BufferNowTime = 0),
          (this.M3r.BufferTimeLength = i / 1e3),
          this.M3r?.SetComponentTickEnabled(!0));
      i = this.Mesh.K2_GetComponentToWorld();
      this.ActorComp.SetActorTransformExceptMesh(
        t,
        "移动表现优化，Mesh缓动",
        !0,
        s,
      ),
        this.r4r(i, this.ActorComp, this.BufferModelTransform),
        (this.BufferLocation = !this.BufferModelTransform.GetLocation().Equals(
          this.BufferShowTransform.GetLocation(),
          10,
        ));
    }
    SetLocationAndRotatorWithModelBuffer(t, i, s, h, e = 2) {
      Info_1.Info.EnableForceTick
        ? ((this.BufferNowTime = 0), (this.BufferTimeLength = s))
        : ((this.M3r.BufferNowTime = 0),
          (this.M3r.BufferTimeLength = s / 1e3),
          this.M3r?.SetComponentTickEnabled(!0));
      s = this.Mesh.K2_GetComponentToWorld();
      this.ActorComp.SetActorLocationAndRotationExceptMesh(
        t,
        i,
        "移动表现优化，Mesh缓动",
        !0,
        e,
      ),
        this.r4r(s, this.ActorComp, this.BufferModelTransform),
        (this.BufferLocation = !this.BufferModelTransform.GetLocation().Equals(
          this.BufferShowTransform.GetLocation(),
          10,
        ));
    }
    SetModelBuffer(t, i) {
      Info_1.Info.EnableForceTick
        ? ((this.BufferNowTime = 0), (this.BufferTimeLength = i))
        : (this.LastRemainBufferFrame !== Time_1.Time.Frame &&
            ((this.RemainBufferTime =
              this.M3r.BufferTimeLength - this.M3r.BufferNowTime),
            (this.LastRemainBufferFrame = Time_1.Time.Frame)),
          (this.M3r.BufferNowTime = 0),
          (this.M3r.BufferTimeLength = i / 1e3),
          0 < this.RemainBufferTime &&
            (this.M3r.BufferTimeLength +=
              this.RemainBufferTime * MODEL_BUFFER_SMOOTH_FACTOR),
          this.M3r?.SetComponentTickEnabled(!0)),
        this.Mesh.K2_SetWorldTransform(t, !1, void 0, !0),
        this.Mesh.KuroRefreshCacheLocalTransform(),
        this.r4r(t, this.ActorComp, this.BufferModelTransform),
        (this.BufferLocation = !this.BufferModelTransform.GetLocation().Equals(
          this.BufferShowTransform.GetLocation(),
          10,
        ));
    }
    UpdateModelBuffer(t) {
      (this.BufferNowTime < this.BufferTimeLength &&
        ((this.BufferNowTime = Math.min(
          this.BufferNowTime + t,
          this.BufferTimeLength,
        )),
        this.Z_e.FromUeTransform(this.ActorComp.ActorTransform),
        this.BufferShowTransform.ComposeTransforms(this.Z_e, this.R3r),
        (t = this.BufferNowTime / this.BufferTimeLength),
        this.ActorComp.ActorLocationProxy.Addition(
          this.BufferModelTransform.GetLocation(),
          this.A3r,
        ),
        Vector_1.Vector.Lerp(this.A3r, this.R3r.GetLocation(), t, this.U3r),
        this.Z_e.SetLocation(this.U3r),
        this.ActorComp.ActorScaleProxy.Addition(
          this.BufferModelTransform.GetScale3D(),
          this.A3r,
        ),
        Vector_1.Vector.Lerp(this.A3r, this.R3r.GetScale3D(), t, this.U3r),
        this.Z_e.SetScale3D(this.U3r),
        this.ActorComp.ActorQuatProxy.Multiply(
          this.BufferModelTransform.GetRotation(),
          this.az,
        ),
        Quat_1.Quat.Slerp(this.az, this.R3r.GetRotation(), t, this.KJ),
        this.Z_e.SetRotation(this.KJ),
        this.Mesh.K2_SetWorldTransform(
          this.Z_e.ToUeTransform(),
          !1,
          void 0,
          !1,
        ),
        !(
          this.BufferNowTime >=
          this.BufferTimeLength - MathUtils_1.MathUtils.KindaSmallNumber
        ))) ||
        ((this.BufferTimeLength = 0), (this.BufferLocation = !1));
    }
    StopModelBuffer() {
      Info_1.Info.EnableForceTick
        ? 0 < this.BufferTimeLength &&
          ((this.BufferTimeLength = 0),
          this.Mesh.K2_SetRelativeTransform(
            this.BufferShowTransform.ToUeTransform(),
            !1,
            void 0,
            !1,
          ))
        : (this.M3r?.StopModelBuffer(), this.M3r?.SetComponentTickEnabled(!1));
    }
    HasModelBuffer() {
      return Info_1.Info.EnableForceTick
        ? 0 < this.BufferTimeLength
        : 0 < this.M3r.BufferTimeLength;
    }
    HasLocationModelBuffer() {
      return this.HasModelBuffer() && this.BufferLocation;
    }
    ClearModelBuffer() {
      Info_1.Info.EnableForceTick
        ? 0 < this.BufferTimeLength && (this.BufferTimeLength = 0)
        : 0 < this.M3r.BufferTimeLength &&
          ((this.M3r.BufferTimeLength = 0),
          this.M3r?.SetComponentTickEnabled(!1));
    }
    GetWalkRunMix() {
      return this.S3r;
    }
    UpdateWalkRunMix(t) {
      this.Lie?.Valid && this.Lie.HasTag(-1898186757)
        ? (this.S3r =
            this.S3r +
            (this.GetSlopeScale() - this.S3r) *
              (1 - Math.pow(WALK_RUN_MIX_LERP, t)))
        : (this.S3r = 1);
    }
    GetSlopeScale() {
      return MathUtils_1.MathUtils.Clamp(
        this.SlopeStepPeriodicCurve.GetFloatValue(this.E3r) *
          this.SlopeStepSizeCurve.GetFloatValue(this.E3r),
        MIN_SCLOPE_SCALE,
        MAX_SCLOPE_SCALE,
      );
    }
    o4r() {
      var t = this.Gce.CharacterMovement.MovementMode;
      if (1 !== t && 2 !== t)
        (this.E3r = 0), this.I3r.FromUeVector(Vector_1.Vector.UpVectorProxy);
      else {
        var i = this.ActorComp.ActorLocationProxy,
          s = this.ActorComp.ActorForwardProxy;
        if (1 === t) {
          t = this.Gce.CharacterMovement.CurrentFloor;
          if (!t.bBlockingHit)
            return (
              (this.E3r = 0),
              void this.I3r.FromUeVector(Vector_1.Vector.UpVectorProxy)
            );
          t = t.HitResult.ImpactNormal;
          (this.E3r =
            -1 *
            Math.asin(MathUtils_1.MathUtils.DotProduct(s, t)) *
            MathUtils_1.MathUtils.RadToDeg),
            this.I3r.Set(t.X, t.Y, t.Z);
        } else {
          if (Time_1.Time.Frame - this.b3r != 1)
            return (
              (this.E3r = 0),
              this.I3r.FromUeVector(Vector_1.Vector.UpVectorProxy),
              (this.b3r = Time_1.Time.Frame),
              void this.Xrr.FromUeVector(i)
            );
          i.Subtraction(this.Xrr, this.A3r),
            Math.abs(this.A3r.X) < MathUtils_1.MathUtils.SmallNumber &&
            Math.abs(this.A3r.Y) < MathUtils_1.MathUtils.SmallNumber
              ? ((this.E3r = 0),
                this.I3r.FromUeVector(Vector_1.Vector.UpVectorProxy))
              : (Vector_1.Vector.UpVectorProxy.CrossProduct(this.A3r, this.U3r),
                this.A3r.CrossProduct(this.U3r, this.P3r),
                this.P3r.Normalize(),
                (this.E3r =
                  -1 *
                  Math.asin(s.DotProduct(this.P3r)) *
                  MathUtils_1.MathUtils.RadToDeg),
                this.I3r.FromUeVector(this.P3r));
        }
        (this.b3r = Time_1.Time.Frame), this.Xrr.FromUeVector(i);
      }
    }
    i4r(t) {
      this.EnableSightDirectInternal &&
        (this.IsPlayer
          ? this.ActorComp.IsAutonomousProxy
            ? this.n4r(t) && this.s4r(t)
            : (this.a4r(this.L3r), this.s4r(t))
          : (this.GetSightTargetItem() ?? this.SightTargetPoint
              ? this.h4r(this.L3r)
              : this.l4r(this.L3r),
            this.s4r(t)));
    }
    n4r(t) {
      if (
        !InputDistributeController_1.InputDistributeController.IsAllowHeadRotation()
      )
        return (
          this.SightDirect.DeepCopy(Vector_1.Vector.RightVectorProxy),
          this.SightDirect2.DeepCopy(Vector_1.Vector.RightVectorProxy),
          !(this.SightDirectIsEqual = !0)
        );
      if (PhotographController_1.PhotographController.IsOpenPhotograph())
        PhotographController_1.PhotographController.IsPlayerLookAtCamera()
          ? this.UpdateStaticRotation(this.L3r)
          : ((this.x3r = Time_1.Time.WorldTime + WATCH_CAMERA_TIME),
            this.L3r.DeepCopy(this.ActorComp.ActorForwardProxy));
      else if (ModelManager_1.ModelManager.PlotModel.IsInTemplate())
        this.GetSightTargetItem() ?? this.SightTargetPoint
          ? this.h4r(this.L3r)
          : this.L3r.DeepCopy(this.ActorComp.ActorForwardProxy);
      else {
        if (this.Lie?.Valid) {
          if (this.Lie.HasTag(1733479717))
            return (
              this.SightDirect.DeepCopy(Vector_1.Vector.RightVectorProxy),
              this.SightDirect2.DeepCopy(Vector_1.Vector.RightVectorProxy),
              !(this.SightDirectIsEqual = !0)
            );
          if (
            this.Lie.HasTag(-1371021686) ||
            this.Lie.HasTag(504239013) ||
            !this.Lie.HasTag(-1462404775)
          )
            return this.L3r.DeepCopy(this.ActorComp.ActorForwardProxy), !0;
        }
        0 < this.q3r || !this.Gce.CanResponseInput()
          ? ((this.x3r = Time_1.Time.WorldTime + WATCH_CAMERA_TIME_2),
            this.L3r.DeepCopy(this.ActorComp.ActorForwardProxy))
          : (this._4r(),
            this.GetSightTargetItem()
              ? this.h4r(this.L3r)
              : (!this.Lie?.Valid ||
                    this.Lie.HasTag(-1898186757) ||
                    this.Lie.HasTag(855966206)) &&
                  this.Gce.HasMoveInput
                ? ((this.x3r = Time_1.Time.WorldTime + WATCH_CAMERA_TIME),
                  this.a4r(this.L3r))
                : this.L3r.DeepCopy(this.ActorComp.ActorForwardProxy));
      }
      return !0;
    }
    s4r(t) {
      this.A3r.FromUeVector(this.L3r),
        this.az.FromUeQuat(this.Mesh.K2_GetComponentQuaternion()),
        this.az.Inverse(this.az),
        this.U3r.FromUeVector(this.L3r),
        this.az.RotateVector(this.L3r, this.L3r),
        this.ClampSightDirect(this.L3r, this.L3r),
        (this.SightDirectIsEqual && this.L3r.Equals(this.SightDirect)) ||
          (BaseAnimationComponent_1.BaseAnimationComponent.LerpDirect2dByMaxAngle(
            this.SightDirect2,
            this.L3r,
            t * TURN_SPEED,
            this.SightDirect2,
          ),
          BaseAnimationComponent_1.BaseAnimationComponent.LerpVector2dByAlpha(
            this.SightDirect,
            this.SightDirect2,
            1 -
              Math.pow(
                TURN_RATIO,
                t * MathUtils_1.MathUtils.MillisecondToSecond,
              ),
            this.SightDirect,
          ),
          (this.SightDirectIsEqual = this.SightDirect.Equals(
            this.SightDirect2,
          )),
          this.SightDirect.ContainsNaN() &&
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Character",
                6,
                "UpdateHeadRotation Contains Nan.",
                ["DegMovementSlopeInternal", this.E3r],
                ["BeforeRotate", this.A3r],
                ["BeforeClamp", this.U3r],
                ["TargetDirect", this.L3r],
                ["SightDirect", this.SightDirect],
                ["SightDirect2", this.SightDirect2],
                ["quatInverse", this.az],
                ["IsPlayer", this.IsPlayer],
                ["CanResponseInput", this.Gce.CanResponseInput()],
                ["Delta", t],
              ),
            this.SightDirect.Set(0, 1, 0),
            this.SightDirect2.Set(0, 1, 0)),
          this.EnableBlendSpaceLookAt &&
            ((this.LookAtBlendSpaceVector2D.X = MathUtils_1.MathUtils.Clamp(
              MathCommon_1.MathCommon.RightAngle -
                this.SightDirect.HeadingAngle() *
                  MathCommon_1.MathCommon.RadToDeg,
              limitBlendSpaceX[0],
              limitBlendSpaceX[1],
            )),
            (this.LookAtBlendSpaceVector2D.Y = MathUtils_1.MathUtils.Clamp(
              Math.asin(this.SightDirect.Z) * MathCommon_1.MathCommon.RadToDeg,
              limitBlendSpaceY[0],
              limitBlendSpaceY[1],
            ))));
    }
    l4r(t) {
      var i;
      !this.bre?.Valid ||
      !(i =
        this.bre.AiController.AiHateList.GetCurrentTarget()?.Entity?.GetComponent(
          3,
        ))?.Valid ||
      (i.ActorLocationProxy.Subtraction(
        this.ActorComp.ActorLocationProxy,
        this.A3r,
      ),
      (this.A3r.Z += i.ScaledHalfHeight - this.ActorComp.ScaledHalfHeight),
      this.A3r.IsNearlyZero())
        ? t.DeepCopy(this.ActorComp.ActorForwardProxy)
        : (t.DeepCopy(this.A3r), this.u4r(t));
    }
    h4r(t) {
      var i = this.GetSightTargetItem();
      (this.SightTargetPoint ?? i.ActorLocationProxy).Subtraction(
        this.ActorComp.ActorLocationProxy,
        this.A3r,
      ),
        (0, RegisterComponent_1.isComponentInstance)(i, 2)
          ? (this.A3r.Z += i.ScaledHalfHeight - this.ActorComp.ScaledHalfHeight)
          : (this.A3r.Z -= this.ActorComp.ScaledHalfHeight),
        this.A3r.IsNearlyZero()
          ? t.DeepCopy(this.ActorComp.ActorForwardProxy)
          : (t.DeepCopy(this.A3r), this.u4r(t));
    }
    _4r() {
      var t;
      Time_1.Time.Now < this.T3r ||
        ((this.T3r = Time_1.Time.Now + FIND_SIGHT_TARGET_ITEM_PERIOD),
        (t = []),
        ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(
          SIGHT_TARGET_ITEM_DISTANCE_THREAHOLD,
          3,
          t,
        ),
        this.c4r(t));
    }
    c4r(t) {
      var i = this.ActorComp.ActorLocationProxy;
      let s = SQUARE_SIGHT_TARGET_ITEM_DISTANCE_THREAHOLD;
      this.SetSightTargetItem(void 0);
      for (const o of t)
        if (o.Entity?.Active && o.Entity.Id !== this.Entity.Id) {
          var h = o.Entity.GetComponent(0).GetBaseInfo()?.FocusPriority;
          if (h) {
            var e = o.Entity.GetComponent(1);
            if (e?.Valid) {
              e.ActorLocationProxy.Subtraction(i, this.A3r);
              var r = this.A3r.SizeSquared();
              if (
                (0 < h && r < SQUARE_SIGHT_TARGET_ITEM_DISTANCE_THREAHOLD) ||
                (0 === h && r < s)
              )
                for (const a of priorityToMaxSquareDistance)
                  if (h <= a[0]) {
                    if (r > a[1]) break;
                    if (
                      this.A3r.DotProduct(this.ActorComp.ActorForwardProxy) /
                        Math.sqrt(r) <
                      0.5
                    )
                      break;
                    (s = r), this.SetSightTargetItem(e);
                    break;
                  }
            }
          }
        }
    }
    UpdateStaticRotation(t) {
      if (this.x3r < Time_1.Time.WorldTime) {
        var i = Global_1.Global.CharacterCameraManager,
          s = i.GetCameraLocation(),
          h = this.m4r(s);
        if (1 === h)
          return (
            this.gwr.FromUeVector(s),
            this.B3r.FromUeVector(
              this.Mesh.GetSocketLocation(
                CharacterNameDefines_1.CharacterNameDefines.BIP_001_HEAD,
              ),
            ),
            this.gwr.Subtraction(this.B3r, t),
            t.Normalize(),
            void this.u4r(t)
          );
        if (2 === h)
          return t.FromUeVector(i.GetActorForwardVector()), void this.u4r(t);
      }
      t.DeepCopy(this.ActorComp.ActorForwardProxy);
    }
    a4r(t) {
      var i = MathUtils_1.MathUtils.DegToRad * this.E3r,
        s = Math.sin(i),
        i = Math.cos(i);
      (t.X = this.ActorComp.InputDirectProxy.X * i),
        (t.Y = this.ActorComp.InputDirectProxy.Y * i),
        (t.Z = s),
        this.u4r(t);
    }
    m4r(t) {
      this.gwr.FromUeVector(t),
        this.gwr.SubtractionEqual(this.ActorComp.ActorLocationProxy);
      t =
        MathUtils_1.MathUtils.DotProduct(
          this.gwr,
          this.ActorComp.ActorForwardProxy,
        ) / this.gwr.Size();
      return t > CAMERA_INFEED_ME ? 1 : t < -CAMERA_INFEED_ME ? 2 : 0;
    }
    GetMeshTransform() {
      return this.Actor.Mesh.K2_GetComponentToWorld();
    }
    GetRandomStandActionIndex() {
      var t, i, s;
      return this.ActorComp.CreatureData.GetEntityType() !==
        Protocol_1.Aki.Protocol.HBs.Proto_Player ||
        !(t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
          this.zke,
        )) ||
        !(t = t.GetFavorData()) ||
        !(t = t.GetUnlockActionIndexList()) ||
        (i = t.length) <= 1
        ? 1
        : ((s = Math.random() * i),
          (s = Math.floor(s)) <= i - 1 ? t[s] : t[i - 1]);
    }
    u4r(t) {
      this.D3r &&
        (this.ActorComp.ActorQuatProxy.Inverse(this.az),
        this.az.RotateVector(t, t),
        this.D3r.RotateVector(t, t),
        this.ActorComp.ActorQuatProxy.RotateVector(t, t));
    }
    HideBone(t, i, s = !0) {
      CombatDebugController_1.CombatDebugController.CombatInfo(
        "Animation",
        this.Entity,
        "骨骼隐藏",
        ["boneName", t],
        ["hide", i],
        ["sync", s],
      ),
        this.Mesh.IsBoneHiddenByName(t) !== i &&
          (i ? this.Mesh.HideBoneByName(t, 0) : this.Mesh.UnHideBoneByName(t),
          this.v3r?.HideWeaponsWhenHideBones(i, t),
          ModelManager_1.ModelManager.GameModeModel.IsMulti) &&
          this.ActorComp.IsAutonomousProxy &&
          s &&
          (((s = Protocol_1.Aki.Protocol.fNn.create()).v9n =
            Protocol_1.Aki.Protocol.v9n.create()),
          (s.v9n.M9n = t.toString()),
          (s.v9n.S9n = !i),
          CombatMessage_1.CombatNet.Call(22584, this.Entity, s, () => {}));
    }
    static BoneVisibleChangeNotify(t, i) {}
    e4r(t = !0) {
      var i = ModelManager_1.ModelManager.PlatformModel.IsMobile(),
        s = new UE.AnimUpdateRateParameters(),
        h = this.Mesh.LODInfo.Num();
      if (t)
        (s.bShouldUseDistanceMap = !0),
          s.BaseVisibleDistanceThresholds.Empty(),
          s.BaseVisibleDistanceThresholds.Add(i ? 500 : 800),
          s.BaseVisibleDistanceThresholds.Add(i ? 1e3 : 1500),
          s.BaseVisibleDistanceThresholds.Add(i ? 1500 : 4e3),
          s.BaseVisibleDistanceThresholds.Add(i ? 2e3 : 5e3),
          s.BaseVisibleDistanceThresholds.Add(i ? 3e3 : 8e3);
      else {
        (s.bShouldUseLodMap = !0), s.LODToFrameSkipMap.Empty();
        for (let t = 0; t < h; t++) {
          var e = t < 2 ? 0 : t - 1;
          s.LODToFrameSkipMap.Add(t, e);
        }
      }
      (s.BaseNonRenderedUpdateRate = i ? 15 : 8),
        (s.MaxEvalRateForInterpolation = 8);
      var r = (0, puerts_1.$ref)(s),
        o = this.Actor.K2_GetComponentsByClass(
          UE.SkeletalMeshComponent.StaticClass(),
        );
      for (let t = 0; t < o.Num(); t++) o.Get(t).SetAnimUpdateRateParameters(r);
      (0, puerts_1.$unref)(r);
      var t = this.ActorComp.CreatureData.GetEntityType(),
        i = this.Entity.GetComponent(0).GetSummonerId(),
        a = void 0 !== i && 0 !== i;
      switch (t) {
        case Protocol_1.Aki.Protocol.HBs.Proto_Player:
          this.DefaultVisibilityBasedAnimTickOption = 0;
          break;
        case Protocol_1.Aki.Protocol.HBs.Proto_Monster:
          this.DefaultVisibilityBasedAnimTickOption = a ? 1 : 3;
          break;
        case Protocol_1.Aki.Protocol.HBs.Proto_Vision:
          this.DefaultVisibilityBasedAnimTickOption = 1;
          break;
        default:
          Protocol_1.Aki.Protocol.HBs.Proto_Npc;
          this.DefaultVisibilityBasedAnimTickOption = 3;
      }
    }
    SetAnimParamsInFight(t) {
      this.RefreshAnimOptimization();
    }
    GetCameraPosition(t) {
      switch (this.k3r) {
        case 0:
          this.ActorComp.ActorQuatProxy.RotateVector(this.F3r, this.A3r),
            this.ActorComp.ActorLocationProxy.Addition(this.A3r, t);
          break;
        case 1:
          t.FromUeVector(
            this.Mesh.GetSocketLocation(CharacterAnimationComponent_1.HitCase),
          );
          break;
        default:
          this.ActorComp.ActorUpProxy.Multiply(
            DEFAULT_CAMERA_HEIGHT_RATE * this.ActorComp.HalfHeight,
            this.A3r,
          ),
            this.ActorComp.ActorLocationProxy.Addition(this.A3r, t);
      }
    }
    GetCameraTransform() {
      switch (this.k3r) {
        case 0:
          return this.Mesh.GetSocketTransform(
            CharacterAnimationComponent_1.CameraPosition,
            0,
          );
        case 1:
          return this.Mesh.GetSocketTransform(
            CharacterAnimationComponent_1.HitCase,
            0,
          );
        default:
          return this.ActorComp.ActorTransform;
      }
    }
    ConsumeRootMotion() {
      this.Mesh?.GetAnimInstance()?.ConsumeExtractedRootMotion(1);
      var i = this.Mesh?.LinkedInstances;
      if (i)
        for (let t = 0; t < i.Num(); ++t)
          i.Get(t).ConsumeExtractedRootMotion(1);
    }
  });
(CharacterAnimationComponent.CameraPosition = new UE.FName("CameraPosition")),
  (CharacterAnimationComponent.HitCase = new UE.FName("HitCase")),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("c2n")],
    CharacterAnimationComponent,
    "BoneVisibleChangeNotify",
    null,
  ),
  (CharacterAnimationComponent = CharacterAnimationComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(160)],
      CharacterAnimationComponent,
    )),
  (exports.CharacterAnimationComponent = CharacterAnimationComponent);
//# sourceMappingURL=CharacterAnimationComponent.js.map
