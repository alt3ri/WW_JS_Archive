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
  PerformanceConditionByIdWithZero_1 = require("../../../../../Core/Define/ConfigQuery/PerformanceConditionByIdWithZero"),
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
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  AnimController_1 = require("../../../../Module/Anim/AnimController"),
  CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage"),
  PhotographController_1 = require("../../../../Module/Photograph/PhotographController"),
  InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController"),
  CombatLog_1 = require("../../../../Utils/CombatLog"),
  PreloadConstants_1 = require("../../../../World/Controller/PreloadConstants"),
  AnimLogicParamsSetter_1 = require("../Blueprint/Utils/AnimLogicParamsSetter"),
  CharacterNameDefines_1 = require("../CharacterNameDefines"),
  CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes"),
  BaseAnimationComponent_1 = require("./BaseAnimationComponent"),
  PERFORMANCE_COUNT = 3,
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
  MIN_BUFFER_TIME_LENGTH = 10,
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
        (this.zFr = void 0),
        (this.ZFr = void 0),
        (this.e3r = -0),
        (this.SlopeStepPeriodicCurve = void 0),
        (this.SlopeStepSizeCurve = void 0),
        (this.t3r = 0),
        (this.i3r = 0),
        (this.o3r = Vector_1.Vector.Create()),
        (this.r3r = 0),
        (this.n3r = Vector_1.Vector.Create()),
        (this.s3r = void 0),
        (this.Z_e = Transform_1.Transform.Create()),
        (this.a3r = Transform_1.Transform.Create()),
        (this.az = Quat_1.Quat.Create()),
        (this.KJ = Quat_1.Quat.Create()),
        (this.h3r = Vector_1.Vector.Create()),
        (this.l3r = Vector_1.Vector.Create()),
        (this._3r = Vector_1.Vector.Create()),
        (this.u3r = -0),
        (this.BufferModelTransform = Transform_1.Transform.Create()),
        (this.BufferOriginTransform = Transform_1.Transform.Create()),
        (this.BufferShowTransform = Transform_1.Transform.Create()),
        (this.BufferNowTime = 0),
        (this.BufferTimeLength = 0),
        (this.LastRemainBufferFrame = 0),
        (this.RemainBufferTime = 0),
        (this.c3r = !1),
        (this.BufferLocation = !1),
        (this.Wnr = Vector_1.Vector.Create()),
        (this.Kxr = Vector_1.Vector.Create()),
        (this.m3r = Vector_1.Vector.Create()),
        (this.d3r = -1),
        (this.C3r = 0),
        (this.g3r = 0),
        (this.J0a = -1),
        (this.f3r = !1),
        (this.dFe = 0),
        (this.p3r = -1),
        (this.v3r = 2),
        (this.M3r = Vector_1.Vector.Create()),
        (this.AnimLogicParamsSetter = void 0),
        (this.vJ = void 0),
        (this.BBn = Vector_1.Vector.Create()),
        (this.pDa = 0),
        (this.DNa = void 0),
        (this.UNa = [!1, !1, !1]),
        (this.MainAnimInstanceRole = void 0),
        (this.xNa = Vector_1.Vector.Create(-1e8, -1e8, -1e8)),
        (this.I3r = (t, i) => {
          var s;
          t?.Valid &&
            (s = t.GetComponent(163))?.Valid &&
            (i
              ? this.T3r()
              : t.GetComponent(190)?.HasTag(715234113) ||
                ((i = this.Mesh.GetAnimInstance()) !==
                  this.MainAnimInstanceInternal && i.SyncAnimStates(void 0),
                UE.KuroStaticLibrary.IsObjectClassByName(
                  this.MainAnimInstanceInternal,
                  CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE,
                ) &&
                UE.KuroStaticLibrary.IsObjectClassByName(
                  s.MainAnimInstanceInternal,
                  CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE,
                )
                  ? (this.MainAnimInstanceInternal.替换角色时同步动作数据(
                      s.MainAnimInstance,
                    ),
                    this.hCa(this.MainAnimInstanceInternal))
                  : this.MainAnimInstanceInternal.SyncAnimStates(void 0),
                (t = this.Entity.GetComponent(43))?.ClearOrders(),
                t?.AnimationStateInitPush(),
                this.T3r()));
        }),
        (this.L3r = () => {
          this.GetAnimInstanceFromMesh(), this.StartAnimInstance();
        }),
        (this.bpr = () => {
          this.D3r();
        }),
        (this.R3r = (t) => {
          t || this.D3r();
        }),
        (this.kYs = !1),
        (this.GYs = (t, i) => {
          t === this.Entity.Id &&
            i &&
            (this.StartForceDisableAnimOptimization(1), (this.kYs = !0));
        }),
        (this.U3r = () => {
          this.StopModelBuffer();
        }),
        (this.ero = () => {
          this.C3r = 0;
        }),
        (this.gne = (t) => {
          this.C3r = 0;
        }),
        (this.A3r = new Set([
          CharacterUnifiedStateTypes_1.ECharMoveState.Walk,
          CharacterUnifiedStateTypes_1.ECharMoveState.Stand,
          CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop,
          CharacterUnifiedStateTypes_1.ECharMoveState.RunStop,
          CharacterUnifiedStateTypes_1.ECharMoveState.SprintStop,
        ])),
        (this.P3r = (t, i) => {
          this.A3r.has(i) || (this.C3r = 0);
        });
    }
    static get Dependencies() {
      return [3, 0];
    }
    get DegMovementSlope() {
      return this.t3r;
    }
    get IkMeshOffset() {
      return this.i3r;
    }
    set IkMeshOffset(t) {
      this.i3r = t;
    }
    get MovementTerrainNormal() {
      return this.o3r;
    }
    get BattleIdleEndTime() {
      return this.C3r;
    }
    get HasKuroRootMotion() {
      return (
        !!this.MainAnimInstance &&
        (this.J0a !== Time_1.Time.Frame &&
          ((this.f3r = this.MainAnimInstance.HasKuroRootMotionAnim()),
          (this.J0a = Time_1.Time.Frame)),
        this.f3r)
      );
    }
    hCa(t) {
      this.AnimLogicParamsSetter
        ? (t = t.LogicParams)
          ? ((this.AnimLogicParamsSetter.SitDown = t.bSitDown),
            (this.AnimLogicParamsSetter.SitDownDirect = t.SitDownDirect),
            (this.AnimLogicParamsSetter.StandUpDirect = t.StandUpDirect))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Character", 37, "状态继承时LogicParams为空")
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            37,
            "状态继承时AnimLogicParamsSetter为空",
          );
    }
    T3r() {
      this.g3r
        ? Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Character", 58, "人物上场隐藏一帧【重复隐藏】", [
            "Entity:",
            this.Entity.Id,
          ])
        : ((this.g3r = this.ActorComp.DisableActor(
            "[CharacterAnimationComponent.TemporaryHidden] 短暂消失",
          )),
          (this.p3r = 1),
          this.MainAnimInstanceInternal.ForceSetCurrentMontageBlendTime(0),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Character", 58, "人物上场隐藏一帧 【隐藏开始】", [
              "Entity:",
              this.Entity.Id,
            ]));
    }
    x3r() {
      0 < this.p3r
        ? this.p3r--
        : 0 === this.p3r &&
          (this.ActorComp.EnableActor(this.g3r),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Character", 58, "人物上场隐藏一帧 【隐藏结束】", [
              "Entity:",
              this.Entity.Id,
            ]),
          (this.g3r = void 0),
          (this.p3r = -1));
    }
    D3r() {
      (this.C3r = 0),
        UE.KuroStaticLibrary.IsObjectClassByName(
          this.MainAnimInstance,
          CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE,
        ) && this.MainAnimInstance.CleanAnimVariable();
    }
    OnInitData() {
      return (
        (this.AnimLogicParamsSetter =
          new AnimLogicParamsSetter_1.AnimLogicParamsSetter()),
        (this.vJ = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(
          this.Entity,
        )),
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
            ((this.s3r = Quat_1.Quat.Create()),
            Quat_1.Quat.FindBetween(
              Vector_1.Vector.ForwardVectorProxy,
              Vector_1.Vector.Create(
                Math.cos(t * MathUtils_1.MathUtils.DegToRad),
                0,
                Math.sin(t * MathUtils_1.MathUtils.DegToRad),
              ),
              this.s3r,
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
          (this.Gce = this.Entity.GetComponent(38)),
          (this.bre = this.Entity.GetComponent(40)),
          (this.Lie = this.Entity.GetComponent(190)),
          (this.zFr = this.Entity.GetComponent(72)),
          (this.pDa = this.Mesh?.KuroAnimInstanceLod ?? 0),
          Info_1.Info.EnableForceTick ||
            ((this.ZFr = this.Actor.GetComponentByClass(
              UE.KuroCharacterAnimationComponent.StaticClass(),
            )),
            this.ZFr?.IsValid() ||
              (this.ZFr = this.Actor.AddComponentByClass(
                UE.KuroCharacterAnimationComponent.StaticClass(),
                !1,
                new UE.Transform(),
                !1,
              )),
            this.ZFr.SetComponentTickEnabled(!0)),
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
        if (
          (this.InitBaseInfo(),
          this.Ore(),
          this.CheckNpcAnimationAssets(),
          this.Mesh.DoesSocketExist(
            CharacterAnimationComponent_1.CameraPosition,
          )
            ? ((this.v3r = 0),
              this.M3r.FromUeVector(
                this.Mesh.GetSocketTransform(
                  CharacterAnimationComponent_1.CameraPosition,
                  1,
                ).GetLocation(),
              ))
            : this.Mesh.DoesSocketExist(CharacterAnimationComponent_1.HitCase)
              ? (this.v3r = 1)
              : (this.v3r = 2),
          this.ActorComp.IsRoleAndCtrlByMe)
        ) {
          var t = this.ActorComp.CreatureData,
            t = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(
              t.GetRoleId(),
            );
          if (
            ((this.DNa =
              PerformanceConditionByIdWithZero_1.configPerformanceConditionByIdWithZero.GetConfig(
                t,
                t,
                t,
              )),
            !this.DNa)
          )
            for (let t = 0; t < PERFORMANCE_COUNT; ++t)
              (this.UNa[t] = !0),
                this.MainAnimInstanceRole?.ValidPerformanceIndexes.Add(t);
        }
      }
      return !0;
    }
    InitBaseInfo() {
      (this.e3r = 1), (this.u3r = 0), (this.t3r = 0), (this.IkMeshOffset = 0);
      var t = this.Mesh,
        t =
          (this.BufferOriginTransform.FromUeTransform(t.GetRelativeTransform()),
          this.BufferShowTransform.FromUeTransform(t.GetRelativeTransform()),
          this.ActorComp.CreatureData.GetEntityType());
      (this.dFe = this.ActorComp.CreatureData.GetRoleId()),
        this.SightDirect.DeepCopy(Vector_1.Vector.RightVectorProxy),
        this.SightDirect2.DeepCopy(Vector_1.Vector.RightVectorProxy),
        t === Protocol_1.Aki.Protocol.kks.Proto_Player
          ? (this.IsPlayer = !0)
          : (this.IsPlayer = !1),
        this.w3r();
    }
    GetAnimInstanceFromMesh() {
      super.GetAnimInstanceFromMesh(),
        this.MainAnimInstanceInternal instanceof UE.KuroAnimInstanceRole &&
          (this.MainAnimInstanceRole = this.MainAnimInstanceInternal);
    }
    Ore() {
      this.IsPlayer &&
        this.ActorComp.IsAutonomousProxy &&
        (EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharUseSkill,
          this.ero,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeHitLocal,
          this.gne,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
          this.P3r,
        ),
        (this.c3r = !0)),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.I3r,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharChangeMeshAnim,
          this.L3r,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.TeleportStartEntity,
          this.bpr,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnRoleDrown,
          this.R3r,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RequestClearMeshRotationBuffer,
          this.U3r,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.vJ,
          EventDefine_1.EEventName.OnSetActorHidden,
          this.GYs,
        );
    }
    kre() {
      this.c3r &&
        (EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharUseSkill,
          this.ero,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeHitLocal,
          this.gne,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
          this.P3r,
        )),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.I3r,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharChangeMeshAnim,
          this.L3r,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.TeleportStartEntity,
          this.bpr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnRoleDrown,
          this.R3r,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RequestClearMeshRotationBuffer,
          this.U3r,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.vJ,
          EventDefine_1.EEventName.OnSetActorHidden,
          this.GYs,
        );
    }
    OnEnd() {
      return (
        this.kYs &&
          ((this.kYs = !1), this.CancelForceDisableAnimOptimization(1)),
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
      this.kYs && ((this.kYs = !1), this.CancelForceDisableAnimOptimization(1)),
        this.vDa(),
        this.x3r(),
        this.b3r(t),
        this.IsPlayer &&
          ((this.C3r -= t),
          0 < this.BattleIdleEndTime &&
            this.ActorComp.InputDirectProxy.SizeSquared2D() >
              MathUtils_1.MathUtils.SmallNumber &&
            (this.C3r = 0),
          this.q3r(),
          this.UpdateWalkRunMix(t),
          this.RefreshPerformance());
    }
    OnForceAfterTick(t) {
      this.UpdateModelBuffer(t);
    }
    OnDisable() {
      0 <= this.p3r &&
        (this.ActorComp.EnableActor(this.g3r), Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info(
          "Character",
          58,
          "人物上场隐藏一帧 【组件Disable 隐藏结束】",
          ["Entity:", this.Entity.Id],
        ),
        (this.p3r = -1),
        this.Lie?.HasTag(1144073280) ||
          this.Entity.GetComponent(172)?.AnyIdleLoopMontagePlaying ||
          (this.MainAnimInstanceInternal?.IsValid() &&
            (this.StopMontage(),
            this.vJ.AddHoldEntity("CharacterAnimationComponent.OnDisable"),
            TimerSystem_1.TimerSystem.Next(() => {
              this.vJ &&
                this.vJ.RemoveHoldEntity(
                  "CharacterAnimationComponent.OnDisable",
                ),
                this.Active ||
                  (this.MainAnimInstance?.ClearMontage(),
                  UE.KuroAnimLibrary.EndAnimNotifyStates(
                    this.MainAnimInstanceInternal,
                  ));
            })),
          this.SightDirect.DeepCopy(Vector_1.Vector.RightVectorProxy),
          this.SightDirect2.DeepCopy(Vector_1.Vector.RightVectorProxy));
    }
    vDa() {
      var t = Info_1.Info.IsPcPlatform() ? 3e3 : 1500;
      0 === this.pDa && this.Entity?.DistanceWithCamera >= t
        ? (this.Mesh.KuroAnimInstanceLod = 1)
        : 1 === this.pDa &&
          this.Entity?.DistanceWithCamera < t &&
          (this.Mesh.KuroAnimInstanceLod = 0);
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
      this.C3r = BATLLE_IDLE_TIME;
    }
    OnJump() {
      var t;
      return UE.KuroStaticLibrary.IsImplementInterface(
        this.MainAnimInstanceInternal.GetClass(),
        UE.BPI_Animation_C.StaticClass(),
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
            (t.RotateVector(this.BufferShowTransform.GetLocation(), this.h3r),
            this.BufferShowTransform.SetLocation(this.h3r)),
          this.BufferNowTime < this.BufferTimeLength ||
            this.Mesh.K2_SetRelativeTransform(
              this.BufferShowTransform.ToUeTransform(),
              !1,
              void 0,
              !1,
            ))
        : this.ZFr.AddModelQuat(t.ToUeQuat(), i);
    }
    AddModelLocation(t) {
      Info_1.Info.EnableForceTick
        ? (this.BBn.AdditionEqual(t),
          t.Addition(this.BufferShowTransform.GetLocation(), this.h3r),
          this.BufferShowTransform.SetLocation(this.h3r),
          this.BufferNowTime < this.BufferTimeLength ||
            this.Mesh.K2_SetRelativeTransform(
              this.BufferShowTransform.ToUeTransform(),
              !1,
              void 0,
              !1,
            ))
        : this.ZFr.AddModelLocation(t.ToUeVector());
    }
    ResetModelQuat() {
      Info_1.Info.EnableForceTick
        ? (this.BBn.Addition(
            this.BufferOriginTransform.GetLocation(),
            this.h3r,
          ),
          this.BufferShowTransform.SetLocation(this.h3r),
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
        : this.ZFr.ResetModelQuat();
    }
    ResetModelLocation() {
      Info_1.Info.EnableForceTick
        ? (this.BBn.Reset(),
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
        : this.ZFr.ResetModelLocation();
    }
    G3r(t, i, s) {
      Info_1.Info.EnableForceTick
        ? (this.h3r.FromUeVector(t.GetLocation()),
          this.h3r.SubtractionEqual(i.ActorLocationProxy),
          s.SetLocation(this.h3r),
          this.h3r.FromUeVector(t.GetScale3D()),
          this.h3r.SubtractionEqual(i.ActorScaleProxy),
          s.SetScale3D(this.h3r),
          this.az.FromUeQuat(t.GetRotation()),
          i.ActorQuatProxy.Inverse(this.KJ),
          this.KJ.Multiply(this.az, this.az),
          s.SetRotation(this.az))
        : (this.ZFr.GetTransformOffsetInWorld(t, i.ActorTransform),
          s.SetLocation(this.BufferShowTransform.GetLocation()),
          s.SetRotation(this.BufferShowTransform.GetRotation()),
          s.SetScale3D(this.BufferShowTransform.GetScale3D()));
    }
    SetTransformWithModelBuffer(t, i, s = void 0, h = !0) {
      i < MIN_BUFFER_TIME_LENGTH
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Test",
              6,
              "ModelBuffer Time is Too Short",
              ["Actor", this.ActorComp?.Actor.GetName()],
              ["timeLength", i],
            ),
          this.ActorComp.SetActorTransform(
            t,
            "移动表现优化，Mesh缓动.没有缓动",
            !0,
            s,
          ),
          this.StopModelBuffer())
        : (Info_1.Info.EnableForceTick
            ? ((this.BufferNowTime = 0), (this.BufferTimeLength = i))
            : ((this.ZFr.BufferNowTime = 0),
              (this.ZFr.BufferTimeLength = i / 1e3),
              this.ZFr?.SetComponentTickEnabled(!0)),
          (i = this.Mesh.K2_GetComponentToWorld()),
          this.ActorComp.SetActorTransformExceptMesh(
            t,
            "移动表现优化，Mesh缓动",
            h,
            s,
          ),
          this.G3r(i, this.ActorComp, this.BufferModelTransform),
          (this.BufferLocation =
            !this.BufferModelTransform.GetLocation().Equals(
              this.BufferShowTransform.GetLocation(),
              10,
            )));
    }
    SetLocationAndRotatorWithModelBuffer(t, i, s, h, e = 2, r = !0) {
      s < MIN_BUFFER_TIME_LENGTH
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Test",
              6,
              "ModelBuffer Time is Too Short",
              ["Actor", this.ActorComp?.Actor.GetName()],
              ["timeLength", s],
            ),
          this.ActorComp.SetActorLocationAndRotation(
            t,
            i,
            h + ".移动表现优化.Mesh缓动.没有缓动",
            r,
            e,
          ),
          this.StopModelBuffer())
        : (Info_1.Info.EnableForceTick
            ? ((this.BufferNowTime = 0), (this.BufferTimeLength = s))
            : ((this.ZFr.BufferNowTime = 0),
              (this.ZFr.BufferTimeLength = s / 1e3),
              this.ZFr?.SetComponentTickEnabled(!0)),
          (s = this.Mesh.K2_GetComponentToWorld()),
          this.ActorComp.SetActorLocationAndRotationExceptMesh(
            t,
            i,
            h + "移动表现优化，Mesh缓动",
            r,
            e,
          ),
          this.G3r(s, this.ActorComp, this.BufferModelTransform),
          (this.BufferLocation =
            !this.BufferModelTransform.GetLocation().Equals(
              this.BufferShowTransform.GetLocation(),
              10,
            )));
    }
    SetModelBuffer(t, i) {
      i < MIN_BUFFER_TIME_LENGTH
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Test",
              6,
              "ModelBuffer Time is Too Short",
              ["Actor", this.ActorComp?.Actor.GetName()],
              ["timeLength", i],
            ),
          this.StopModelBuffer())
        : (Info_1.Info.EnableForceTick
            ? ((this.BufferNowTime = 0), (this.BufferTimeLength = i))
            : (this.LastRemainBufferFrame !== Time_1.Time.Frame &&
                ((this.RemainBufferTime =
                  this.ZFr.BufferTimeLength - this.ZFr.BufferNowTime),
                (this.LastRemainBufferFrame = Time_1.Time.Frame)),
              (this.ZFr.BufferNowTime = 0),
              (this.ZFr.BufferTimeLength = i / 1e3),
              0 < this.RemainBufferTime &&
                (this.ZFr.BufferTimeLength +=
                  this.RemainBufferTime * MODEL_BUFFER_SMOOTH_FACTOR),
              this.ZFr?.SetComponentTickEnabled(!0)),
          this.Mesh.K2_SetWorldTransform(t, !1, void 0, !0),
          this.Mesh.KuroRefreshCacheLocalTransform(),
          this.G3r(t, this.ActorComp, this.BufferModelTransform),
          (this.BufferLocation =
            !this.BufferModelTransform.GetLocation().Equals(
              this.BufferShowTransform.GetLocation(),
              10,
            )));
    }
    UpdateModelBuffer(t) {
      (this.BufferNowTime < this.BufferTimeLength &&
        ((this.BufferNowTime = Math.min(
          this.BufferNowTime + t,
          this.BufferTimeLength,
        )),
        this.Z_e.FromUeTransform(this.ActorComp.ActorTransform),
        this.BufferShowTransform.ComposeTransforms(this.Z_e, this.a3r),
        (t = this.BufferNowTime / this.BufferTimeLength),
        this.ActorComp.ActorLocationProxy.Addition(
          this.BufferModelTransform.GetLocation(),
          this.h3r,
        ),
        Vector_1.Vector.Lerp(this.h3r, this.a3r.GetLocation(), t, this.l3r),
        this.Z_e.SetLocation(this.l3r),
        this.ActorComp.ActorScaleProxy.Addition(
          this.BufferModelTransform.GetScale3D(),
          this.h3r,
        ),
        Vector_1.Vector.Lerp(this.h3r, this.a3r.GetScale3D(), t, this.l3r),
        this.Z_e.SetScale3D(this.l3r),
        this.ActorComp.ActorQuatProxy.Multiply(
          this.BufferModelTransform.GetRotation(),
          this.az,
        ),
        Quat_1.Quat.Slerp(this.az, this.a3r.GetRotation(), t, this.KJ),
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
        : (this.ZFr?.StopModelBuffer(), this.ZFr?.SetComponentTickEnabled(!1));
    }
    HasModelBuffer() {
      return Info_1.Info.EnableForceTick
        ? 0 < this.BufferTimeLength
        : 0 < this.ZFr.BufferTimeLength;
    }
    HasLocationModelBuffer() {
      return this.HasModelBuffer() && this.BufferLocation;
    }
    ClearModelBuffer() {
      Info_1.Info.EnableForceTick
        ? 0 < this.BufferTimeLength && (this.BufferTimeLength = 0)
        : 0 < this.ZFr.BufferTimeLength &&
          ((this.ZFr.BufferTimeLength = 0),
          this.ZFr?.SetComponentTickEnabled(!1));
    }
    GetWalkRunMix() {
      return this.e3r;
    }
    UpdateWalkRunMix(t) {
      this.Lie?.Valid && this.Lie.HasTag(-1898186757)
        ? (this.e3r =
            this.e3r +
            (this.GetSlopeScale() - this.e3r) *
              (1 - Math.pow(WALK_RUN_MIX_LERP, t)))
        : (this.e3r = 1);
    }
    GetSlopeScale() {
      return MathUtils_1.MathUtils.Clamp(
        this.SlopeStepPeriodicCurve.GetFloatValue(this.t3r) *
          this.SlopeStepSizeCurve.GetFloatValue(this.t3r),
        MIN_SCLOPE_SCALE,
        MAX_SCLOPE_SCALE,
      );
    }
    q3r() {
      var t = this.Gce.CharacterMovement.MovementMode;
      if (1 !== t && 2 !== t)
        (this.t3r = 0), this.o3r.FromUeVector(Vector_1.Vector.UpVectorProxy);
      else {
        var i = this.ActorComp.ActorLocationProxy,
          s = this.ActorComp.ActorForwardProxy;
        if (1 === t) {
          t = this.Gce.CharacterMovement.CurrentFloor;
          if (!t.bBlockingHit)
            return (
              (this.t3r = 0),
              void this.o3r.FromUeVector(Vector_1.Vector.UpVectorProxy)
            );
          t = t.HitResult.ImpactNormal;
          (this.t3r =
            -1 *
            Math.asin(MathUtils_1.MathUtils.DotProduct(s, t)) *
            MathUtils_1.MathUtils.RadToDeg),
            this.o3r.Set(t.X, t.Y, t.Z);
        } else {
          if (Time_1.Time.Frame - this.d3r != 1)
            return (
              (this.t3r = 0),
              this.o3r.FromUeVector(Vector_1.Vector.UpVectorProxy),
              (this.d3r = Time_1.Time.Frame),
              void this.Wnr.FromUeVector(i)
            );
          i.Subtraction(this.Wnr, this.h3r),
            Math.abs(this.h3r.X) < MathUtils_1.MathUtils.SmallNumber &&
            Math.abs(this.h3r.Y) < MathUtils_1.MathUtils.SmallNumber
              ? ((this.t3r = 0),
                this.o3r.FromUeVector(Vector_1.Vector.UpVectorProxy))
              : (Vector_1.Vector.UpVectorProxy.CrossProduct(this.h3r, this.l3r),
                this.h3r.CrossProduct(this.l3r, this._3r),
                this._3r.Normalize(),
                (this.t3r =
                  -1 *
                  Math.asin(s.DotProduct(this._3r)) *
                  MathUtils_1.MathUtils.RadToDeg),
                this.o3r.FromUeVector(this._3r));
        }
        (this.d3r = Time_1.Time.Frame), this.Wnr.FromUeVector(i);
      }
    }
    b3r(t) {
      this.EnableSightDirectInternal &&
        (this.IsPlayer
          ? this.ActorComp.IsAutonomousProxy
            ? this.N3r(t) && this.O3r(t)
            : (this.k3r(this.n3r), this.O3r(t))
          : ((this.GetSightTargetItem() ?? this.SightTargetPoint)
              ? this.F3r(this.n3r)
              : this.V3r(this.n3r),
            this.O3r(t)));
    }
    N3r(t) {
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
          ? this.UpdateStaticRotation(this.n3r)
          : ((this.u3r = Time_1.Time.WorldTime + WATCH_CAMERA_TIME),
            this.n3r.DeepCopy(this.ActorComp.ActorForwardProxy));
      else if (ModelManager_1.ModelManager.PlotModel.IsInTemplate())
        (this.GetSightTargetItem() ?? this.SightTargetPoint)
          ? this.F3r(this.n3r)
          : this.n3r.DeepCopy(this.ActorComp.ActorForwardProxy);
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
            return this.n3r.DeepCopy(this.ActorComp.ActorForwardProxy), !0;
        }
        0 < this.C3r || !this.Gce.CanResponseInput()
          ? ((this.u3r = Time_1.Time.WorldTime + WATCH_CAMERA_TIME_2),
            this.n3r.DeepCopy(this.ActorComp.ActorForwardProxy))
          : (this.H3r(),
            this.GetSightTargetItem()
              ? this.F3r(this.n3r)
              : (!this.Lie?.Valid ||
                    this.Lie.HasTag(-1898186757) ||
                    this.Lie.HasTag(855966206)) &&
                  this.Gce.HasMoveInput
                ? ((this.u3r = Time_1.Time.WorldTime + WATCH_CAMERA_TIME),
                  this.k3r(this.n3r))
                : this.n3r.DeepCopy(this.ActorComp.ActorForwardProxy));
      }
      return !0;
    }
    O3r(t) {
      this.h3r.FromUeVector(this.n3r),
        this.az.FromUeQuat(this.Mesh.K2_GetComponentQuaternion()),
        this.az.Inverse(this.az),
        this.l3r.FromUeVector(this.n3r),
        this.az.RotateVector(this.n3r, this.n3r),
        this.ClampSightDirect(this.n3r, this.n3r),
        (this.SightDirectIsEqual && this.n3r.Equals(this.SightDirect)) ||
          (BaseAnimationComponent_1.BaseAnimationComponent.LerpDirect2dByMaxAngle(
            this.SightDirect2,
            this.n3r,
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
                ["DegMovementSlopeInternal", this.t3r],
                ["BeforeRotate", this.h3r],
                ["BeforeClamp", this.l3r],
                ["TargetDirect", this.n3r],
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
    V3r(t) {
      var i;
      !this.bre?.Valid ||
      !(i =
        this.bre.AiController.AiHateList.GetCurrentTarget()?.Entity?.GetComponent(
          3,
        ))?.Valid ||
      (i.ActorLocationProxy.Subtraction(
        this.ActorComp.ActorLocationProxy,
        this.h3r,
      ),
      (this.h3r.Z += i.ScaledHalfHeight - this.ActorComp.ScaledHalfHeight),
      this.h3r.IsNearlyZero())
        ? t.DeepCopy(this.ActorComp.ActorForwardProxy)
        : (t.DeepCopy(this.h3r), this.j3r(t));
    }
    F3r(t) {
      var i = this.GetSightTargetItem();
      (this.SightTargetPoint ?? i.ActorLocationProxy).Subtraction(
        this.ActorComp.ActorLocationProxy,
        this.h3r,
      ),
        (0, RegisterComponent_1.isComponentInstance)(i, 2)
          ? (this.h3r.Z += i.ScaledHalfHeight - this.ActorComp.ScaledHalfHeight)
          : (this.h3r.Z -= this.ActorComp.ScaledHalfHeight),
        this.h3r.IsNearlyZero()
          ? t.DeepCopy(this.ActorComp.ActorForwardProxy)
          : (t.DeepCopy(this.h3r), this.j3r(t));
    }
    H3r() {
      var t;
      Time_1.Time.Now < this.r3r ||
        ((this.r3r = Time_1.Time.Now + FIND_SIGHT_TARGET_ITEM_PERIOD),
        (t = []),
        ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(
          SIGHT_TARGET_ITEM_DISTANCE_THREAHOLD,
          63,
          t,
        ),
        this.W3r(t));
    }
    W3r(t) {
      var i = this.ActorComp.ActorLocationProxy;
      let s = SQUARE_SIGHT_TARGET_ITEM_DISTANCE_THREAHOLD;
      this.SetSightTargetItem(void 0);
      for (const o of t)
        if (o.Entity?.Active && o.Entity.Id !== this.Entity.Id) {
          var h = o.Entity.GetComponent(0).GetBaseInfo()?.FocusPriority;
          if (h) {
            var e = o.Entity.GetComponent(1);
            if (e?.Valid) {
              e.ActorLocationProxy.Subtraction(i, this.h3r);
              var r = this.h3r.SizeSquared();
              if (
                (0 < h && r < SQUARE_SIGHT_TARGET_ITEM_DISTANCE_THREAHOLD) ||
                (0 === h && r < s)
              )
                for (const a of priorityToMaxSquareDistance)
                  if (h <= a[0]) {
                    if (r > a[1]) break;
                    if (
                      this.h3r.DotProduct(this.ActorComp.ActorForwardProxy) /
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
      if (this.u3r < Time_1.Time.WorldTime) {
        var i = Global_1.Global.CharacterCameraManager,
          s = i.GetCameraLocation(),
          h = this.K3r(s);
        if (1 === h)
          return (
            this.Kxr.FromUeVector(s),
            this.m3r.FromUeVector(
              this.Mesh.GetSocketLocation(
                CharacterNameDefines_1.CharacterNameDefines.BIP_001_HEAD,
              ),
            ),
            this.Kxr.Subtraction(this.m3r, t),
            t.Normalize(),
            void this.j3r(t)
          );
        if (2 === h)
          return t.FromUeVector(i.GetActorForwardVector()), void this.j3r(t);
      }
      t.DeepCopy(this.ActorComp.ActorForwardProxy);
    }
    k3r(t) {
      var i = MathUtils_1.MathUtils.DegToRad * this.t3r,
        s = Math.sin(i),
        i = Math.cos(i);
      (t.X = this.ActorComp.InputDirectProxy.X * i),
        (t.Y = this.ActorComp.InputDirectProxy.Y * i),
        (t.Z = s),
        this.j3r(t);
    }
    K3r(t) {
      this.Kxr.FromUeVector(t),
        this.Kxr.SubtractionEqual(this.ActorComp.ActorLocationProxy);
      t =
        MathUtils_1.MathUtils.DotProduct(
          this.Kxr,
          this.ActorComp.ActorForwardProxy,
        ) / this.Kxr.Size();
      return t > CAMERA_INFEED_ME ? 1 : t < -CAMERA_INFEED_ME ? 2 : 0;
    }
    GetMeshTransform() {
      return this.Actor.Mesh.K2_GetComponentToWorld();
    }
    GetRandomStandActionIndex() {
      var t, i, s;
      return this.ActorComp.CreatureData.GetEntityType() !==
        Protocol_1.Aki.Protocol.kks.Proto_Player ||
        !(t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
          this.dFe,
        )) ||
        !(t = t.GetFavorData()) ||
        !(t = t.GetUnlockActionIndexList()) ||
        (i = t.length) <= 1
        ? 1
        : ((s = Math.random() * i),
          (s = Math.floor(s)) <= i - 1 ? t[s] : t[i - 1]);
    }
    j3r(t) {
      this.s3r &&
        (this.ActorComp.ActorQuatProxy.Inverse(this.az),
        this.az.RotateVector(t, t),
        this.s3r.RotateVector(t, t),
        this.ActorComp.ActorQuatProxy.RotateVector(t, t));
    }
    HideBone(t, i, s = !0) {
      CombatLog_1.CombatLog.Info(
        "Animation",
        this.Entity,
        "骨骼隐藏",
        ["boneName", t],
        ["hide", i],
        ["sync", s],
      ),
        this.Mesh.IsBoneHiddenByName(t) !== i &&
          (i ? this.Mesh.HideBoneByName(t, 0) : this.Mesh.UnHideBoneByName(t),
          this.zFr?.HideWeaponsWhenHideBones(i, t),
          ModelManager_1.ModelManager.GameModeModel.IsMulti) &&
          this.ActorComp.IsAutonomousProxy &&
          s &&
          (((s = Protocol_1.Aki.Protocol.t4n.create()).nWn =
            Protocol_1.Aki.Protocol.nWn.create()),
          (s.nWn.sWn = t.toString()),
          (s.nWn.aWn = !i),
          CombatMessage_1.CombatNet.Call(16305, this.Entity, s, () => {}));
    }
    static BoneVisibleChangeNotify(t, i) {}
    w3r(t = !0) {
      var i = Info_1.Info.IsMobilePlatform(),
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
        case Protocol_1.Aki.Protocol.kks.Proto_Player:
          this.DefaultVisibilityBasedAnimTickOption = 0;
          break;
        case Protocol_1.Aki.Protocol.kks.Proto_Monster:
          this.DefaultVisibilityBasedAnimTickOption = a ? 1 : 3;
          break;
        case Protocol_1.Aki.Protocol.kks.Proto_Vision:
          this.DefaultVisibilityBasedAnimTickOption = 1;
          break;
        default:
          Protocol_1.Aki.Protocol.kks.Proto_Npc;
          this.DefaultVisibilityBasedAnimTickOption = 3;
      }
      this.RefreshAnimOptimization();
    }
    SetAnimParamsInFight(t) {
      this.RefreshAnimOptimization();
    }
    GetCameraPosition(t) {
      switch (this.v3r) {
        case 0:
          this.ActorComp.ActorQuatProxy.RotateVector(this.M3r, this.h3r),
            this.ActorComp.ActorLocationProxy.Addition(this.h3r, t);
          break;
        case 1:
          t.FromUeVector(
            this.Mesh.GetSocketLocation(CharacterAnimationComponent_1.HitCase),
          );
          break;
        default:
          this.ActorComp.ActorUpProxy.Multiply(
            DEFAULT_CAMERA_HEIGHT_RATE * this.ActorComp.HalfHeight,
            this.h3r,
          ),
            this.ActorComp.ActorLocationProxy.Addition(this.h3r, t);
      }
    }
    GetCameraTransform() {
      switch (this.v3r) {
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
    RefreshPerformance() {
      if (
        this.ActorComp?.IsRoleAndCtrlByMe &&
        this.DNa &&
        this.MainAnimInstanceRole &&
        this.Lie?.HasTag(248240472) &&
        !this.xNa.Equals(this.ActorComp.ActorLocationProxy)
      ) {
        this.xNa.DeepCopy(this.ActorComp.ActorLocationProxy);
        var s =
            this.Gce.CharacterMovement.CurrentFloor.HitResult.ImpactNormal.Z,
          h = this.Entity.GetComponent(69).WaterHeightAboveMe;
        let i = !1;
        for (let t = 0; t < PERFORMANCE_COUNT; ++t) {
          var e =
            this.DNa.StandingNormalZ[t] < s && this.DNa.WaterHeight[t] > h;
          e !== this.UNa[t] && ((this.UNa[t] = e), (i = !0));
        }
        if (i) {
          this.MainAnimInstanceRole.ValidPerformanceIndexes.Empty();
          for (let t = 0; t < PERFORMANCE_COUNT; ++t)
            this.UNa[t] &&
              this.MainAnimInstanceRole.ValidPerformanceIndexes.Add(t);
        }
      }
    }
  });
(CharacterAnimationComponent.CameraPosition = new UE.FName("CameraPosition")),
  (CharacterAnimationComponent.HitCase = new UE.FName("HitCase")),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("YFn")],
    CharacterAnimationComponent,
    "BoneVisibleChangeNotify",
    null,
  ),
  (CharacterAnimationComponent = CharacterAnimationComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(163)],
      CharacterAnimationComponent,
    )),
  (exports.CharacterAnimationComponent = CharacterAnimationComponent);
//# sourceMappingURL=CharacterAnimationComponent.js.map
