"use strict";
var CharacterClimbComponent_1,
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
        for (var _ = t.length - 1; 0 <= _; _--)
          (e = t[_]) &&
            (o = (r < 3 ? e(o) : 3 < r ? e(i, s, o) : e(i, s)) || o);
      return 3 < r && o && Object.defineProperty(i, s, o), o;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterClimbComponent =
    exports.SClimbState =
    exports.SClimbInfo =
      void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../../Core/Common/Stats"),
  Time_1 = require("../../../../../../Core/Common/Time"),
  ClimbById_1 = require("../../../../../../Core/Define/ConfigQuery/ClimbById"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../../../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  Quat_1 = require("../../../../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../../../Core/Utils/TraceElementCommon"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../../Common/TimeUtil"),
  GlobalData_1 = require("../../../../../GlobalData"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  FormationAttributeController_1 = require("../../../../../Module/Abilities/FormationAttributeController"),
  GravityUtils_1 = require("../../../../../Utils/GravityUtils"),
  BlackboardController_1 = require("../../../../../World/Controller/BlackboardController"),
  WorldGlobal_1 = require("../../../../../World/WorldGlobal"),
  CharacterController_1 = require("../../../CharacterController"),
  RoleAudioController_1 = require("../../../Role/RoleAudioController"),
  CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes"),
  CustomMovementDefine_1 = require("./CustomMovementDefine"),
  PROFILE_KEY = "CharacterClimbComponent_DetectClimbFromTop",
  THREAHOLD_JUMP_LEAVE = -0.707,
  THREADHOLD_ENTER_CLIMB_FORWARD_NEED = 0.707,
  THREAHOLD_ENTER_CLIMB_MIN_Z_SPEED = -500,
  FIVE_SECONDS = 5,
  NORMAL_CACHE_TIME = 200,
  FAST_CACHE_TIME = 100,
  CACHE_TIME_FROM_TOP = 400,
  CACHE_TIME_UP_ARRIVE = 300,
  EXIT_CLIMB_CACHE_TIME = 300,
  FIVE_HUNDRED = 500,
  DOUBLE_HALFHEIGHT = 2,
  ONE_POINT_FIVE_HALFHRIGHT = 1.5,
  KINDA_LESS_THAN_ONE = 0.85,
  STRENGTH_THREADHOLD = 10,
  THREADHOLD_FORWARD_BLOCK = -0.707,
  THREADHOLD_MODEL_BUFFER = 0.9,
  traceColor = new UE.LinearColor(1, 0, 0, 1),
  traceSuccessColor = new UE.LinearColor(0, 1, 0, 1),
  NORMAL_GROUP_ID = 1,
  SHORT_DRAW_TIME = 0.1,
  LONG_DRAW_TIME = 5,
  CAN_ENTER_CLIMB_CD = 500,
  CLIMBING_CAPSULE_SIZE = 5,
  MAX_ROLE_HALF_HEIGHT = 85,
  MAX_ROLE_RADIUS = 25,
  MAX_ROLE_CYLINDER_HALF_HEIGHT = MAX_ROLE_HALF_HEIGHT - MAX_ROLE_RADIUS,
  MAX_SAFETY_DIST = 100,
  ENTER_CLIMB_ANGLE = 35,
  ENTER_SPINT_VAULT_ANGLE = 45,
  DEFAULT_DETECT_LENGTH = 150,
  EXIT_CLIMB_TIME = 800,
  canEnterClimbAirStates = new Set([
    CharacterUnifiedStateTypes_1.ECharMoveState.Other,
    CharacterUnifiedStateTypes_1.ECharMoveState.Flying,
    CharacterUnifiedStateTypes_1.ECharMoveState.Glide,
    CharacterUnifiedStateTypes_1.ECharMoveState.Slide,
  ]);
class SClimbInfo {
  constructor(t, i, s) {
    (this["攀爬移动中"] = !0),
      (this["攀爬输入向量"] = void 0),
      (this.OnWallAngle = 0),
      (this.攀爬移动中 = t ?? !1),
      (this.攀爬输入向量 = Vector2D_1.Vector2D.Create(i)),
      (this.OnWallAngle = s ?? 0);
  }
  Equals(t) {
    return (
      void 0 !== t &&
      this.攀爬移动中 === t.攀爬移动中 &&
      this.攀爬输入向量.Equals(t.攀爬输入向量) &&
      this.OnWallAngle === t.OnWallAngle
    );
  }
  DeepCopy(t) {
    (this.攀爬移动中 = t.攀爬移动中),
      this.攀爬输入向量.DeepCopy(t.攀爬输入向量),
      (this.OnWallAngle = t.OnWallAngle);
  }
  Copy() {
    var t = Vector2D_1.Vector2D.Create(
      this.攀爬输入向量.X,
      this.攀爬输入向量.Y,
    );
    return new SClimbInfo(this.攀爬移动中, t, this.OnWallAngle);
  }
}
exports.SClimbInfo = SClimbInfo;
class SClimbState {
  constructor(t, i, s) {
    (this["攀爬状态"] = 0),
      (this["进入攀爬类型"] = 0),
      (this["退出攀爬类型"] = 0),
      (this.攀爬状态 = t ?? 0),
      (this.进入攀爬类型 = i ?? 0),
      (this.退出攀爬类型 = s ?? 0);
  }
  Equals(t) {
    return (
      void 0 !== t &&
      this.攀爬状态 === t.攀爬状态 &&
      this.进入攀爬类型 === t.进入攀爬类型 &&
      this.退出攀爬类型 === t.退出攀爬类型
    );
  }
  DeepCopy(t) {
    (this.攀爬状态 = t.攀爬状态),
      (this.进入攀爬类型 = t.进入攀爬类型),
      (this.退出攀爬类型 = t.退出攀爬类型);
  }
  Copy() {
    return new SClimbState(this.攀爬状态, this.进入攀爬类型, this.退出攀爬类型);
  }
}
exports.SClimbState = SClimbState;
let CharacterClimbComponent =
  (CharacterClimbComponent_1 = class CharacterClimbComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.b$r = (t) => {
          this.q$r(t);
        }),
        (this.I3r = (t, i) => {
          i ||
            (t?.Valid &&
              (i = t.GetComponent(31))?.Valid &&
              (i.G$r.ContainsNaN() &&
                (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Movement",
                    6,
                    "OnStateInherit ClimbInput is Nan.",
                    ["ClimbInput", i.G$r],
                  ),
                i.G$r.Reset()),
              this.G$r.DeepCopy(i.G$r),
              this.N$r.DeepCopy(i.N$r),
              (this.O$r = i.O$r),
              (this.k$r = i.k$r),
              (this.F$r = i.F$r),
              (this.V$r = i.V$r),
              this.SetClimbState(i.H$r),
              this.SetEnterClimbType(i.j$r),
              this.SetExitClimbType(i.W$r),
              (this.K$r = i.K$r),
              0 !== this.H$r) &&
              (this.Q$r.SyncFromOther(i.Q$r),
              this.Hte.ResetCachedVelocityTime()));
        }),
        (this.ero = (t, i, s) => {
          i = this.Entity.GetComponent(33).GetSkillInfo(i);
          NORMAL_GROUP_ID !== i.GroupId ||
            (this.HBr.MoveState !==
              CharacterUnifiedStateTypes_1.ECharMoveState.NormalClimb &&
              this.HBr.MoveState !==
                CharacterUnifiedStateTypes_1.ECharMoveState.FastClimb) ||
            this.Gce.CharacterMovement.SetMovementMode(1);
        }),
        (this.Hte = void 0),
        (this.Gce = void 0),
        (this.oRe = void 0),
        (this.X$r = void 0),
        (this.$$r = void 0),
        (this.Y$r = void 0),
        (this.J$r = void 0),
        (this.z$r = void 0),
        (this.Z$r = void 0),
        (this.eYr = void 0),
        (this.tYr = void 0),
        (this.iYr = void 0),
        (this.oYr = void 0),
        (this.F$r = void 0),
        (this.V$r = Vector_1.Vector.Create()),
        (this.rYr = void 0),
        (this.nYr = void 0),
        (this.sYr = Vector_1.Vector.Create()),
        (this.G$r = Vector2D_1.Vector2D.Create()),
        (this.N$r = Vector2D_1.Vector2D.Create()),
        (this.aYr = 0),
        (this.k$r = !1),
        (this.hYr = !1),
        (this.O$r = !1),
        (this.H$r = 0),
        (this.W$r = 5),
        (this.j$r = 0),
        (this.K$r = 0),
        (this.lYr = !1),
        (this._Yr = 0),
        (this.uYr = void 0),
        (this.cYr = void 0),
        (this.DVr = (t, i) => {
          var s;
          if (t !== i)
            if (
              (t === CharacterUnifiedStateTypes_1.ECharPositionState.Climb &&
                i === CharacterUnifiedStateTypes_1.ECharPositionState.Air &&
                4 !== this.W$r &&
                10 !== this.W$r &&
                1 <
                  (s = GravityUtils_1.GravityUtils.GetZnInGravity(
                    this.Hte,
                    this.Hte.ActorVelocityProxy,
                  )) &&
                (Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn(
                    "Movement",
                    6,
                    "错误的退出攀爬",
                    ["退出模式", this.W$r],
                    ["速度", this.Hte.ActorVelocityProxy],
                    ["动作", this.oRe.MainAnimInstance.GetMainAnimsDebugText()],
                  ),
                this.Lz.DeepCopy(this.Hte.ActorVelocityProxy),
                GravityUtils_1.GravityUtils.AddZnInGravity(
                  this.Hte,
                  this.Lz,
                  -s,
                ),
                this.Gce.SetForceSpeed(this.Lz)),
              t === CharacterUnifiedStateTypes_1.ECharPositionState.Climb)
            ) {
              let t = void 0,
                i = !1;
              Math.abs(
                this.Hte.ActorForwardProxy.DotProduct(this.Gce.GravityUp),
              ) > MathUtils_1.MathUtils.SmallNumber &&
                (MathUtils_1.MathUtils.LookRotationUpFirst(
                  this.Hte.ActorForwardProxy,
                  this.Gce.GravityUp,
                  this.az,
                ),
                this.az.Rotator(this.Gue),
                this.Hte?.SetActorRotation(
                  this.Gue.ToUeRotator(),
                  "ExitClimb",
                  !1,
                ),
                (i = !0),
                this.oRe) &&
                !t &&
                (t = this.oRe.GetMeshTransform()),
                this.Hte.IsDefaultCapsule ||
                  (CharacterController_1.CharacterController.FindSpaceForExitClimb(
                    this.Hte,
                    this.Hte.DefaultHalfHeight,
                    this.Hte.DefaultRadius,
                    CLIMBING_CAPSULE_SIZE,
                    this.Lz,
                  ) &&
                    (this.Hte.SetActorLocation(
                      this.Lz.ToUeVector(),
                      "ExitClimb Capsule",
                      !1,
                    ),
                    (i = !0),
                    this.oRe) &&
                    !t &&
                    (t = this.oRe.GetMeshTransform())),
                i && t && this.oRe.SetModelBuffer(t, FAST_CACHE_TIME),
                this.Hte.ResetCapsuleRadiusAndHeight(),
                this.mYr();
            } else
              i === CharacterUnifiedStateTypes_1.ECharPositionState.Climb &&
                this.Hte.SetRadiusAndHalfHeight(
                  CLIMBING_CAPSULE_SIZE,
                  CLIMBING_CAPSULE_SIZE,
                  !1,
                );
        }),
        (this.Xte = void 0),
        (this.HBr = void 0),
        (this.dYr = Vector_1.Vector.Create()),
        (this.CYr = void 0),
        (this.gYr = -0),
        (this.fYr = Vector_1.Vector.Create()),
        (this.Lz = Vector_1.Vector.Create()),
        (this.Tz = Vector_1.Vector.Create()),
        (this.fHo = Vector_1.Vector.Create()),
        (this.az = Quat_1.Quat.Create()),
        (this.Gue = Rotator_1.Rotator.Create()),
        (this.Z_e = Transform_1.Transform.Create()),
        (this.Q$r = void 0),
        (this.DebugNoTop = !1),
        (this.pYr = 0),
        (this.vYr = 0),
        (this.MYr = 0),
        (this.EYr = 0),
        (this.mWi = void 0),
        (this.SYr = 0),
        (this.yYr = void 0),
        (this.IYr = (t) => {
          t
            ? this.yYr ||
              ((this.yYr = this.Disable(
                "[CharacterClimbComponent.OnForbiddenClimbChanged] 禁用攀爬",
              )),
              this.HBr.PositionState ===
                CharacterUnifiedStateTypes_1.ECharPositionState.Climb &&
                this.TYr())
            : this.yYr &&
              (this.Enable(
                this.yYr,
                "[CharacterClimbComponent.OnForbiddenClimbChanged] 启用攀爬",
              ),
              (this.yYr = void 0));
        }),
        (this.LYr = (t) => {
          t &&
            this.HBr.PositionState ===
              CharacterUnifiedStateTypes_1.ECharPositionState.Climb &&
            this.TYr();
        }),
        (this.DYr = Vector_1.Vector.Create()),
        (this.RYr = void 0),
        (this.UYr = void 0),
        (this.AYr = void 0),
        (this.PYr = void 0),
        (this.xYr = void 0),
        (this.wYr = void 0),
        (this.BYr = void 0),
        (this.bYr = void 0),
        (this.qYr = void 0),
        (this.GYr = Rotator_1.Rotator.Create(0, 180, 0)),
        (this.NYr = void 0),
        (this.OYr = void 0),
        (this.kYr = void 0),
        (this.FYr = new Set([2, 7, 9, 8])),
        (this.AwakeClimbInput = (t) => {
          this.k$r = t;
        }),
        (this.VYr = void 0),
        (this.HYr = void 0),
        (this.jYr = void 0);
    }
    static get Dependencies() {
      return [3, 163];
    }
    get ClimbBlocking() {
      return this.lYr;
    }
    set ClimbBlocking(t) {
      this.lYr !== t &&
        ((this.lYr = t),
        this.lYr
          ? this.Xte.AddTag(-787153509)
          : this.Xte.RemoveTag(-787153509));
    }
    UpdateClimbDebug() {
      var t;
      GlobalData_1.GlobalData.IsPlayInEditor &&
        ((t = this.Hte.Actor.TsCharacterDebugComponent),
        (this.DebugNoTop = t.NoTop),
        (this.pYr = t.EnterClimbTrace),
        (this.vYr = t.VaultClimbTrace),
        (this.MYr = t.UpArriveClimbTrace),
        (this.EYr = t.ClimbingTrace));
    }
    OnInitData() {
      return (
        (this.F$r = new UE.Transform(
          Rotator_1.Rotator.ZeroRotator,
          Vector_1.Vector.ZeroVector,
          Vector_1.Vector.OneVector,
        )),
        (this.nYr = new UE.Transform(
          Quat_1.Quat.Identity,
          Vector_1.Vector.ZeroVector,
          Vector_1.Vector.OneVector,
        )),
        (this.uYr = (0, puerts_1.$ref)(void 0)),
        (this.cYr = (0, puerts_1.$ref)(void 0)),
        !0
      );
    }
    OnInit() {
      return (this.Xte = this.Entity.GetComponent(188)), !0;
    }
    OnStart() {
      if (
        ((this.Hte = this.Entity.CheckGetComponent(3)),
        (this.Gce = this.Entity.CheckGetComponent(163)),
        (this.oRe = this.Entity.GetComponent(162)),
        (this.HBr = this.Entity.CheckGetComponent(160)),
        (this.k$r = !0),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.DVr,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CustomMoveClimb,
          this.b$r,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.I3r,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharUseSkill,
          this.ero,
        ),
        (this.X$r = ClimbById_1.configClimbById.GetConfig(
          this.Hte.CreatureData.GetRoleConfig().RoleBody,
        )),
        !this.X$r)
      )
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Movement", 6, "没有配置攀爬", [
              "RoleBody",
              this.Hte.CreatureData.GetRoleConfig().RoleBody,
            ]),
          !1
        );
      this.Q$r = UE.NewObject(UE.KuroClimbObject.StaticClass(), this.Hte.Actor);
      var t = UE.NewArray(UE.Vector);
      for (const h of this.X$r.ClimbDetectPoints)
        t.Add(WorldGlobal_1.WorldGlobal.ToUeVector(h));
      this.Q$r.InitBase(
        this.Hte.Actor.CapsuleComponent,
        QueryTypeDefine_1.KuroCollisionChannel.Climb,
        t,
        this.X$r.DetectRadius,
        this.X$r.ClimbRadius,
        DEFAULT_DETECT_LENGTH,
      ),
        this.Q$r.InitClimbSafety(
          MAX_ROLE_RADIUS,
          MAX_ROLE_HALF_HEIGHT,
          MAX_SAFETY_DIST,
        ),
        (this.$$r = WorldGlobal_1.WorldGlobal.ToUeVector(this.X$r.ClimbVault)),
        (this.Y$r = WorldGlobal_1.WorldGlobal.ToUeVector(this.X$r.ClimbOnTop)),
        (this.J$r = WorldGlobal_1.WorldGlobal.ToUeVector(
          this.X$r.ClimbFromTop,
        )),
        (this.rYr = WorldGlobal_1.WorldGlobal.ToUeVector(
          this.X$r.ClimbSprintVault,
        )),
        (this.z$r = new UE.SClimbInfo(
          Vector_1.Vector.ZeroVector,
          !1,
          new UE.Vector2D(0, 0),
          !1,
        )),
        (this.Z$r = new UE.ClimbInfoStruct()),
        (this.eYr = new SClimbInfo()),
        (this.tYr = new UE.SClimbState()),
        (this.iYr = new UE.ClimbStateStruct()),
        (this.oYr = new SClimbState()),
        t.Empty();
      var i = UE.NewArray(UE.BuiltinFloat),
        s = UE.NewArray(UE.BuiltinFloat);
      return (
        t.Add(this.Y$r),
        i.Add(this.X$r.UpArriveRange.Min),
        s.Add(this.X$r.UpArriveRange.Max),
        t.Add(this.$$r),
        i.Add(this.X$r.VaultRange.Min),
        s.Add(this.X$r.VaultRange.Max),
        this.Q$r.InitUpArrives(t, i, s),
        this.Q$r.InitSprintVault(
          this.X$r.ForwardBlockHeight,
          this.X$r.ForwardBlockRadius,
          this.X$r.ForwardBlockDistance.Min,
          this.X$r.ForwardBlockDistance.Max,
          this.rYr,
          this.X$r.SprintVaultRange.Min,
          this.X$r.SprintVaultRange.Max,
          this.X$r.SprintVaultLongNeedDistance,
          this.X$r.SprintVaultLongHeight,
          QueryTypeDefine_1.KuroTraceTypeQuery.AcrossBlock,
          this.X$r.SprintVaultLongRange.Min,
          this.X$r.SprintVaultLongRange.Max,
          ENTER_SPINT_VAULT_ANGLE,
        ),
        this.Q$r.InitBlockUps(
          WorldGlobal_1.WorldGlobal.ToUeVector(this.X$r.BlockUpOffset),
          this.X$r.BlockUpDetectRadius,
          this.X$r.BlockUpDetectDistance,
          this.X$r.BlockUpBackDistance,
          this.X$r.BlockUpBackMinDist,
          WorldGlobal_1.WorldGlobal.ToUeVector(this.X$r.BlockUpFinalMove),
          this.X$r.BlockUpVerticalRange.Min,
          this.X$r.BlockUpVerticalRange.Max,
        ),
        (this.hYr = !0),
        this.WYr(),
        this.Xte?.Valid &&
          (this.Xte.HasTag(1448371427) &&
            (this.yYr = this.Disable(
              "[CharacterClimbComponent.OnStart] 包含了禁止攀爬Tag",
            )),
          this.Xte.ListenForTagAnyCountChanged(1448371427, this.IYr),
          this.Xte.ListenForTagAnyCountChanged(-866600078, this.LYr)),
        !0
      );
    }
    WYr() {
      (this.mWi = UE.NewObject(UE.TraceSphereElement.StaticClass())),
        (this.mWi.WorldContextObject = this.Hte.Owner),
        (this.mWi.bIgnoreSelf = !0),
        this.mWi.SetTraceTypeQuery(
          QueryTypeDefine_1.KuroTraceTypeQuery.Visible,
        ),
        this.mWi.SetDrawDebugTrace(this.pYr),
        (this.mWi.DrawTime = FIVE_SECONDS),
        (this.mWi.Radius = this.X$r.ClimbRadius * KINDA_LESS_THAN_ONE),
        TraceElementCommon_1.TraceElementCommon.SetTraceColor(
          this.mWi,
          traceColor,
        ),
        TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
          this.mWi,
          traceSuccessColor,
        );
    }
    OnActivate() {
      (this.aYr = this.Hte.ScaledHalfHeight), this.UpdateClimbDebug();
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.DVr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CustomMoveClimb,
          this.b$r,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.I3r,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharUseSkill,
          this.ero,
        ),
        !0
      );
    }
    OnTick(t) {
      ModelManager_1.ModelManager.SundryModel.SceneCheckOn &&
        ((i = Vector_1.Vector.Dist(this.Hte.ActorLocationProxy, this.DYr)),
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Test",
            6,
            "TickMove",
            ["Entity", this.Entity.Id],
            ["PrevLocation", this.DYr],
            ["CurrentLocation", this.Hte.ActorLocationProxy],
            ["MovementMode", this.Gce.CharacterMovement.MovementMode],
            ["CustomMode", this.Gce.CharacterMovement.CustomMovementMode],
            ["Delta", t],
            ["Dist", i],
            ["MainAnim", this.oRe.MainAnimInstance.GetDebugAnimNodeString()],
          ),
        2 * t < i &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Test", 6, "OverSpeed", [
            "Velocity",
            this.Hte.ActorVelocityProxy,
          ]),
        500 < i &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Test", 6, "OverSpeed2", [
            "Velocity",
            this.Hte.ActorVelocityProxy,
          ]),
        ((i =
          ModelManager_1.ModelManager.TraceElementModel.GetActorTrace()).WorldContextObject =
          this.Hte.Actor),
        (i.Radius = CLIMBING_CAPSULE_SIZE),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, this.DYr),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(
          i,
          this.Hte.ActorLocationProxy,
        ),
        TraceElementCommon_1.TraceElementCommon.ShapeTrace(
          this.Hte.Actor.CapsuleComponent,
          i,
          PROFILE_KEY,
          PROFILE_KEY,
        ) &&
          ((i = i.HitResult), Log_1.Log.CheckWarn()) &&
          Log_1.Log.Warn(
            "Test",
            6,
            "MoveHit Something",
            ["Actor", i.Actors.Get(0)?.GetName()],
            ["Comp", i.Components.Get(0)?.GetName()],
          ),
        this.DYr.DeepCopy(this.Hte.ActorLocationProxy));
      var i = this.Hte.InputDirectProxy;
      0 !== this.H$r
        ? (i.ContainsNaN()
            ? (this.G$r.Reset(),
              Log_1.Log.CheckError() &&
                Log_1.Log.Error("Movement", 6, "Set Climb Input Nan.", [
                  "Input",
                  i,
                ]))
            : ((this.G$r.X = i.X), (this.G$r.Y = i.Y)),
          this._Yr &&
            (this.N$r.IsNearlyZero()
              ? this.N$r.DeepCopy(this.G$r)
              : this.N$r.Equals(this.G$r) || (this._Yr = 0)))
        : (this.G$r.Reset(), this.N$r.Reset());
      let s =
        this.HBr.PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Climb;
      s
        ? 0 < this.K$r &&
          ((this.K$r -= t), this.K$r <= 0) &&
          (this.OnExitClimb(), (s = !1))
        : (this.K$r = 0),
        !s &&
          !this.O$r &&
          this.Gce.HasMoveInput &&
          (this.Xte.HasTag(-1462404775) ||
            MathUtils_1.MathUtils.DotProduct(i, this.Hte.ActorForwardProxy) >
              THREADHOLD_ENTER_CLIMB_FORWARD_NEED) &&
          (this.SetClimbState(0), this.KYr(t)),
        s &&
          FormationAttributeController_1.FormationAttributeController.GetValue(
            1,
          ) <= 0 &&
          3 !== this.H$r &&
          !this.Xte.HasTag(-976785652) &&
          this.TYr(),
        (this.O$r = s);
    }
    GetExitClimbType() {
      return this.W$r;
    }
    KYr(t) {
      var i;
      (this.Xte.HasTag(-1371021686) && !this.Xte.HasTag(1781274524)) ||
        ((i = this.QYr()) &&
          this.HBr.MoveState !==
            CharacterUnifiedStateTypes_1.ECharMoveState.Glide &&
          (this.XYr(), 0 !== this.H$r)) ||
        (i || this.Xte.HasTag(400631093)
          ? (this.$Yr(!0),
            (i = this.Hte?.Entity?.GetComponent(33)),
            0 !== this.H$r && i.StopGroup1Skill("攀爬打断技能"))
          : this.$Yr(!1));
    }
    $Yr(t) {
      switch (this.HBr.PositionState) {
        case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
          this.YYr(t);
          break;
        case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
          canEnterClimbAirStates.has(this.HBr.MoveState) &&
            this.JYr() &&
            (this.zYr(), 0 === this.H$r) &&
            this.ZYr(t ? 4 : this.Gce.IsJump ? 2 : 0);
          break;
        case CharacterUnifiedStateTypes_1.ECharPositionState.Water:
          this.JYr() &&
            this.Entity.GetComponent(68).CheckCanEnterClimbFromSwim() &&
            (this.zYr(), 0 === this.H$r) &&
            this.ZYr(1);
      }
    }
    zYr() {
      switch (
        this.Q$r.TryUpArrives(
          this.Hte.ActorForward,
          this.eJr(this.vYr),
          this.uYr,
        )
      ) {
        case 1:
          this.tJr(2, (0, puerts_1.$unref)(this.uYr));
          break;
        case 2:
          this.tJr(7, (0, puerts_1.$unref)(this.uYr));
      }
    }
    YYr(t) {
      (this.Xte.HasTag(498191540) && (this.iJr(), 0 !== this.H$r)) ||
        (this.JYr() && (this.zYr(), 0 === this.H$r) && this.ZYr(t ? 4 : 2));
    }
    mYr() {
      this.Q$r.ExitClimb(),
        this.SetClimbState(0),
        this.SetExitClimbType(5),
        this.sYr.Set(0, 0, 0),
        this.Hte.SetInputFacing(this.Hte.ActorForwardProxy),
        (this.ClimbBlocking = !1);
    }
    CanClimbPress() {
      return !0;
    }
    TYr() {
      var t, i;
      0 <
        GravityUtils_1.GravityUtils.GetZnInGravity(
          this.Hte,
          this.Hte.ActorVelocityProxy,
        ) &&
        (this.Lz.DeepCopy(this.Hte.ActorVelocityProxy),
        GravityUtils_1.GravityUtils.ConvertToPlanarVector(this.Hte, this.Lz),
        this.Gce.SetForceSpeed(this.Lz)),
        2 === this.H$r && this.oJr(),
        this.HBr.MoveState ===
          CharacterUnifiedStateTypes_1.ECharMoveState.FastClimb &&
          (this.Lz.DeepCopy(this.Hte.InputDirectProxy),
          this.Lz.IsNearlyZero() ||
            (Math.abs(this.Lz.Y) > MathUtils_1.MathUtils.SmallNumber &&
              ((i = this.Hte.ActorForwardProxy),
              (t = this.Hte.ActorRightProxy),
              i.Multiply(Math.abs(this.Lz.X), this.Tz),
              t.Multiply(this.Lz.Y, this.fHo),
              this.Tz.AdditionEqual(this.fHo),
              MathUtils_1.MathUtils.LookRotationUpFirst(
                this.Tz,
                this.Gce.GravityUp,
                this.az,
              ),
              (i = this.Hte.ActorTransform).SetRotation(this.az.ToUeQuat()),
              this.SetCharacterTransformAndBuffer(i, EXIT_CLIMB_CACHE_TIME)))),
        this.Gce.CharacterMovement.SetMovementMode(3);
    }
    ClimbPress(t) {
      this.HBr.PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Climb &&
        2 === this.H$r &&
        (this.TYr(), (this.SYr = Time_1.Time.Now + CAN_ENTER_CLIMB_CD));
    }
    rJr(t, i) {
      return (
        this.Lz.DeepCopy(i),
        GravityUtils_1.GravityUtils.ConvertToPlanarVector(this.Hte, this.Lz),
        this.Lz.Normalize(),
        GravityUtils_1.GravityUtils.GetAngleOffsetInGravity(this.Hte, i, t)
      );
    }
    NeedProcessTransform() {
      return !(
        (1 === this.H$r && !this.hYr) ||
        (2 !== this.H$r && 1 !== this.H$r)
      );
    }
    nJr(t, i = NORMAL_CACHE_TIME) {
      this.Lz.FromUeVector(t.GetLocation()),
        this.oRe?.Valid &&
        MathUtils_1.MathUtils.DotProduct(
          t.GetRotation().GetForwardVector(),
          this.nYr.GetRotation().GetForwardVector(),
        ) < THREADHOLD_MODEL_BUFFER
          ? this.SetCharacterTransformAndBuffer(t, i)
          : this.Hte.SetActorTransform(t, "攀爬.ConfirmMove", !0),
        this.Q$r.ConfirmMove();
    }
    JYr() {
      return (
        this.Lz.FromUeVector(
          this.Gce.CharacterMovement.Kuro_GetBlockDirectWhenMove(),
        ),
        GravityUtils_1.GravityUtils.ConvertToPlanarVector(this.Hte, this.Lz),
        !(
          !this.Lz.Normalize() ||
          this.Hte.InputDirectProxy.DotProduct(this.Lz) >
            THREADHOLD_FORWARD_BLOCK
        )
      );
    }
    tJr(t, i, s = !0) {
      this.HBr.PositionState ===
      CharacterUnifiedStateTypes_1.ECharPositionState.Ground
        ? this.Gce.PlayerMotionRequest(
            Protocol_1.Aki.Protocol.Q6s.Proto_StepAcross,
          )
        : this.Gce.PlayerMotionRequest(
            Protocol_1.Aki.Protocol.Q6s.Proto_ClimbTop,
          ),
        s &&
          this.Gce.CharacterMovement.SetMovementMode(
            6,
            CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_CLIMB,
          ),
        this.SetClimbState(3),
        (this.K$r = EXIT_CLIMB_TIME),
        this.SetExitClimbType(t),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.CharClimbStartExit,
          this.Entity.Id,
          t,
        ),
        this.QYr() &&
          (2 === t
            ? this.SetExitClimbType(6)
            : 7 === t &&
              (this.SetExitClimbType(9),
              this.Lz.Set(0, 0, this.$$r.Z - this.rYr.Z),
              (s = i.TransformPosition(this.Lz.ToUeVector())),
              i.SetLocation(s))),
        this.V$r.FromUeVector(i.GetLocation());
      var s = GravityUtils_1.GravityUtils.GetZnInGravity(
        this.Hte,
        this.Hte.ActorForwardProxy,
      );
      s <= 0
        ? (i.SetLocation(this.Hte.ActorLocation),
          this.V$r.Subtraction(this.Hte.ActorLocationProxy, this.Lz),
          GravityUtils_1.GravityUtils.AddZnInGravity(this.Hte, this.Lz, 2))
        : (this.Lz.DeepCopy(this.V$r),
          GravityUtils_1.GravityUtils.SetZnInGravity(
            this.Hte,
            this.Lz,
            GravityUtils_1.GravityUtils.GetZnInGravity(
              this.Hte,
              this.Hte.ActorLocationProxy,
            ),
          ),
          i.SetLocation(this.Lz.ToUeVector()),
          this.Lz.Reset(),
          this.V$r.Subtraction(this.Hte.ActorLocationProxy, this.Tz),
          GravityUtils_1.GravityUtils.AddZnInGravity(
            this.Hte,
            this.Lz,
            GravityUtils_1.GravityUtils.GetZnInGravity(this.Hte, this.Tz) + 2,
          )),
        BlackboardController_1.BlackboardController.SetVectorValueByEntity(
          this.Entity.Id,
          "ClimbOnTopMove",
          this.Lz.X,
          this.Lz.Y,
          this.Lz.Z,
        ),
        10 === t &&
          ((s = this.Q$r.GetSecondMoveOffset()),
          BlackboardController_1.BlackboardController.SetVectorValueByEntity(
            this.Entity.Id,
            "ClimbBlockUpSecondMove",
            s.X,
            s.Y,
            s.Z,
          )),
        ModelManager_1.ModelManager.SundryModel.SceneCheckOn &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Test",
            6,
            "UpArrive",
            ["NewLocation", i.GetLocation()],
            ["From", this.Hte.ActorLocationProxy],
            ["Forward", this.Hte.ActorForwardProxy],
            ["ExitClimbType", this.W$r],
          ),
        9 === this.W$r || 8 === this.W$r || 6 === this.W$r
          ? this.SetCharacterTransformAndBuffer(i, FAST_CACHE_TIME)
          : this.SetCharacterTransformAndBuffer(i, CACHE_TIME_UP_ARRIVE),
        ModelManager_1.ModelManager.SundryModel.SceneCheckOn &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Test", 6, "UpArrive2", [
            "Location",
            this.Hte.ActorLocationProxy,
          ]);
    }
    eJr(t) {
      switch (t) {
        case 1:
          return SHORT_DRAW_TIME;
        case 2:
          return LONG_DRAW_TIME;
        default:
          return 0;
      }
    }
    iJr() {}
    ZYr(t) {
      if (
        !(
          this.SYr > Time_1.Time.Now ||
          FormationAttributeController_1.FormationAttributeController.GetValue(
            1,
          ) <= STRENGTH_THREADHOLD ||
          this.Xte.HasTag(-866600078)
        )
      ) {
        if (
          this.HBr.PositionState ===
            CharacterUnifiedStateTypes_1.ECharPositionState.Air &&
          this.Xte.HasTag(-1371021686)
        )
          this.Lz.DeepCopy(this.Hte.InputDirectProxy);
        else {
          var i = this.Hte.ActorVelocityProxy;
          if (
            GravityUtils_1.GravityUtils.GetZnInGravity(this.Hte, i) <
            THREAHOLD_ENTER_CLIMB_MIN_Z_SPEED
          )
            return;
          this.Hte.InputDirectProxy.Multiply(FIVE_HUNDRED, this.Lz),
            this.Lz.AdditionEqual(i);
        }
        this.sJr(t, this.Lz);
      }
    }
    sJr(t, i) {
      var s;
      this.kYr || (this.kYr = Transform_1.Transform.Create()),
        this.kYr.SetLocation(this.Hte.ActorLocationProxy),
        this.kYr.SetScale3D(this.Hte.ActorScaleProxy),
        MathUtils_1.MathUtils.LookRotationForwardFirst(
          i,
          this.Gce.GravityUp,
          this.kYr.GetRotation(),
        ),
        this.Q$r.TryStartClimb(
          this.kYr.ToUeTransform(),
          this.eJr(this.pYr),
          this.uYr,
        ) &&
          ((s = (0, puerts_1.$unref)(this.uYr)),
          Math.abs(
            MathUtils_1.MathUtils.WrapAngle(
              s.Rotator().Yaw - MathUtils_1.MathUtils.GetAngleByVector2D(i),
            ),
          ) > ENTER_CLIMB_ANGLE ||
            (this.Gce.CharacterMovement.SetMovementMode(
              6,
              CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_CLIMB,
            ),
            this.Xte.HasTag(388142570)
              ? this.SetClimbState(2)
              : this.SetClimbState(1),
            this.SetEnterClimbType(t),
            4 === t
              ? (this.HBr.SwitchFastClimb(!0),
                (i = Vector_1.Vector.Create(
                  s.GetRotation().GetForwardVector(),
                )).Normalize(MathUtils_1.MathUtils.SmallNumber),
                (this._Yr = this.rJr(this.Hte.ActorForwardProxy, i)))
              : (this._Yr = 0),
            this.nJr(s, NORMAL_CACHE_TIME),
            (this.hYr = !0)));
    }
    aJr() {
      this.TYr();
    }
    XYr() {
      switch (this.Q$r.TrySprintVault(this.eJr(this.vYr), this.uYr, this.cYr)) {
        case 1:
          this.tJr(9, (0, puerts_1.$unref)(this.uYr));
          break;
        case 2:
          var t = (0, puerts_1.$unref)(this.uYr);
          this.tJr(8, t),
            this.az.FromUeQuat(t.GetRotation()),
            this.az.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.Lz),
            this.Lz.MultiplyEqual((0, puerts_1.$unref)(this.cYr)),
            BlackboardController_1.BlackboardController.SetVectorValueByEntity(
              this.Entity.Id,
              "ClimbAddMove",
              this.Lz.X,
              this.Lz.Y,
              this.Lz.Z,
            );
          break;
        default:
          return;
      }
      RoleAudioController_1.RoleAudioController.PlayRoleAudio(
        this.Entity,
        1003,
      );
    }
    DealClimbUpStart() {}
    DealClimbUpFinish() {
      CharacterController_1.CharacterController.FindSpaceForExitClimb(
        this.Hte,
        this.Hte.DefaultHalfHeight,
        this.Hte.DefaultRadius,
        CLIMBING_CAPSULE_SIZE,
        this.Lz,
      ) &&
        (this.Z_e.Set(
          this.Lz,
          this.Hte.ActorQuatProxy,
          this.Hte.ActorScaleProxy,
        ),
        this.SetCharacterTransformAndBuffer(
          this.Z_e.ToUeTransform(),
          FAST_CACHE_TIME,
        )),
        this.Hte.ResetCapsuleRadiusAndHeight();
    }
    q$r(i) {
      var t = this.NeedProcessTransform();
      if (
        (ModelManager_1.ModelManager.SundryModel.SceneCheckOn &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Test",
            6,
            "ProcessClimbing",
            ["Entity", this.Entity.Id],
            ["Location", this.Hte.ActorLocationProxy],
            [
              "HasKuroRootMotionAnim",
              this.oRe.MainAnimInstance.HasKuroRootMotionAnim(),
            ],
            ["MoveSpeed", this.Gce.CharacterMovement.AnimRootMotionVelocity],
            ["DeltaTime", i],
            ["NeedProcess", t],
          ),
        this.Lz.DeepCopy(
          this.oRe.MainAnimInstance.HasKuroRootMotionAnim()
            ? this.Gce.CharacterMovement.AnimRootMotionVelocity
            : Vector_1.Vector.ZeroVector,
        ),
        this.CYr)
      ) {
        this.gYr += i;
        let t = 0;
        (t = this.gYr > this.CYr ? (this.CYr - this.gYr + i) / i : 1),
          this.dYr.Multiply(t, this.Tz),
          this.Lz.AdditionEqual(this.Tz),
          this.gYr > this.CYr && (this.CYr = void 0);
      }
      if (
        this.Q$r.ProcessClimbing(
          this.Lz.ToUeVector(),
          i,
          t,
          this.eJr(this.EYr),
          this.uYr,
        )
      ) {
        if (
          ((this.ClimbBlocking = this.Q$r.ClimbBlock()),
          ModelManager_1.ModelManager.SundryModel.SceneCheckOn &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Test", 6, "ProcessClimbing Success", [
              "Location",
              this.Hte.Actor.K2_GetActorLocation(),
            ]),
          this.Hte.ResetLocationCachedTime(),
          t)
        )
          switch (
            this.Q$r.TryClimbingArrives(
              this.Hte.InputDirect,
              this.eJr(this.MYr),
              this.uYr,
              this.QYr(),
            )
          ) {
            case 1:
              this.tJr(2, (0, puerts_1.$unref)(this.uYr), !1);
              break;
            case 2:
              this.tJr(7, (0, puerts_1.$unref)(this.uYr), !1);
              break;
            case 3:
              this.aJr();
              break;
            case 4:
              this.tJr(10, (0, puerts_1.$unref)(this.uYr), !1);
          }
      } else
        ModelManager_1.ModelManager.SundryModel.SceneCheckOn &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Test", 6, "ProcessClimbing Failed", [
            "Location",
            this.Hte.Actor.K2_GetActorLocation(),
          ]),
          this.TYr();
    }
    GetClimbInfo() {
      return (
        this.G$r.ContainsNaN() &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Movement", 6, "GetClimbInfo Nan.", [
              "ClimbInput",
              this.G$r,
            ]),
          this.G$r.Reset()),
        (this.z$r.攀爬移动中 = !this.k$r),
        (this.z$r.攀爬输入向量 = this.G$r.ToUeVector2D()),
        this.z$r
      );
    }
    GetClimbInfoNew() {
      return (
        this.G$r.ContainsNaN() &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Movement", 6, "GetClimbInfo Nan.", [
              "ClimbInput",
              this.G$r,
            ]),
          this.G$r.Reset()),
        (this.Z$r.IsClimbMoving = !this.k$r),
        (this.Z$r.ClimbInput = this.G$r.ToUeVector2D()),
        (this.Z$r.OnWallAngle = this._Yr),
        this.Z$r
      );
    }
    GetTsClimbInfo() {
      return (
        this.G$r.ContainsNaN() &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Movement", 6, "GetClimbInfo Nan.", [
              "ClimbInput",
              this.G$r,
            ]),
          this.G$r.Reset()),
        (this.eYr.攀爬移动中 = !this.k$r),
        this.eYr.攀爬输入向量.DeepCopy(this.G$r),
        (this.eYr.OnWallAngle = this._Yr),
        this.eYr
      );
    }
    FinishClimbDown() {
      (this.hYr = !0),
        this.Q$r.TryStartClimb(this.Hte.ActorTransform, 0, this.uYr)
          ? this.nJr((0, puerts_1.$unref)(this.uYr))
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Movement",
                6,
                "下爬动作完成后停留在了一个不太适合攀爬的地点",
              ),
            this.Gce.CharacterMovement.SetMovementMode(3));
    }
    SetCharacterTransformAndBuffer(t, i, s = void 0) {
      (this.CYr = void 0),
        s &&
          (0 < i
            ? (this.Lz.FromUeVector(t.GetTranslation()),
              s.Subtraction(this.Lz, this.dYr),
              this.dYr.DivisionEqual(i * TimeUtil_1.TimeUtil.Millisecond),
              (this.gYr = 0),
              (this.CYr = i * TimeUtil_1.TimeUtil.Millisecond))
            : t.SetLocation(s.ToUeVector())),
        this.oRe?.Valid
          ? this.oRe.SetTransformWithModelBuffer(t, i)
          : this.Hte.SetActorTransform(
              t,
              "攀爬.SetCharacterTransformAndBuffer",
              !0,
            );
    }
    KickWallExit() {
      this.SetExitClimbType(4), this.SetClimbState(3);
    }
    SetClimbState(t) {
      if (
        this.H$r !== t &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Movement",
            6,
            "SetClimbState",
            ["Entity", this.Entity.Id],
            ["From", this.H$r],
            ["To", t],
          ),
        (this.H$r = t),
        (this.oYr.攀爬状态 = t),
        this.HBr.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Climb)
      )
        switch (t) {
          case 2:
            this.G$r.IsNearlyZero()
              ? this.HBr.SetMoveState(
                  CharacterUnifiedStateTypes_1.ECharMoveState.Other,
                )
              : this.HBr.SwitchFastClimb(this.Xte.HasTag(388142570), !0);
            break;
          case 1:
            this.HBr.SetMoveState(
              CharacterUnifiedStateTypes_1.ECharMoveState.EnterClimb,
            );
            break;
          case 3:
            this.HBr.SetMoveState(
              CharacterUnifiedStateTypes_1.ECharMoveState.ExitClimb,
            );
        }
    }
    SetEnterClimbType(t) {
      (this.j$r = t), (this.oYr.进入攀爬类型 = t);
    }
    SetExitClimbType(t) {
      var i = this.FYr.has(this.W$r),
        s = this.FYr.has(t);
      i
        ? s || this.Xte.RemoveTag(1313414424)
        : s && this.Xte.AddTag(1313414424),
        (this.W$r = t),
        (this.oYr.退出攀爬类型 = t);
    }
    GetClimbState() {
      return (
        (this.tYr.攀爬状态 = this.H$r),
        (this.tYr.进入攀爬类型 = this.j$r),
        (this.tYr.退出攀爬类型 = this.W$r),
        this.tYr
      );
    }
    GetClimbStateNew() {
      return (
        (this.iYr.ClimbState = this.H$r),
        (this.iYr.EnterClimbType = this.j$r),
        (this.iYr.ExitClimbType = this.W$r),
        this.iYr
      );
    }
    GetTsClimbState() {
      return this.oYr;
    }
    GetOnWallAngle() {
      return this._Yr;
    }
    OnEnterClimb() {
      1 === this.H$r && (this.SetClimbState(2), this.SetExitClimbType(5));
    }
    OnExitClimb() {
      if (
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Movement", 6, "OnExitClimb", [
            "Entity",
            this.Entity.Id,
          ]),
        0 !== this.H$r)
      ) {
        switch (this.W$r) {
          case 2:
          case 7:
          case 3:
          case 6:
          case 9:
            this.Gce.CharacterMovement.SetMovementMode(1);
            break;
          default:
            this.Gce.CharacterMovement.SetMovementMode(3);
        }
        this.CYr &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Movement",
              6,
              "ClimbUp Buffer is not finished",
              ["Now", this.gYr],
              ["TimeLength", this.CYr],
            ),
          (this.CYr = void 0));
      }
    }
    ClimbKeyPressed(t) {
      this.ClimbPress(t);
    }
    KickExitCheck() {
      var t;
      this.HBr.PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Climb &&
        (this.G$r.X < THREAHOLD_JUMP_LEAVE
          ? this.KickWallExit()
          : (t = this.Entity.GetComponent(162)).Valid && t.ClimbDash());
    }
    GetClimbRadius() {
      return this.X$r ? this.X$r.ClimbRadius : 0;
    }
    DetectClimbWithDirect(t, i) {
      if (
        !this.Active ||
        this.HBr.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Climb
      )
        return !1;
      switch (
        (this.SetClimbState(0),
        this.Q$r.TryUpArrives(i, this.eJr(this.pYr), this.uYr))
      ) {
        case 1:
          return this.tJr(2, (0, puerts_1.$unref)(this.uYr)), !0;
        case 2:
          return this.tJr(7, (0, puerts_1.$unref)(this.uYr)), !0;
      }
      return (
        this.fYr.FromUeVector(i),
        this.sJr(t ? 4 : this.Gce.IsJump ? 2 : 0, this.fYr),
        0 !== this.H$r
      );
    }
    oJr() {
      this.Tz.FromUeVector(this.Q$r.GetSafetyLocation()),
        this.Hte.ActorLocationProxy.Subtraction(this.Tz, this.Lz);
      var t = this.Hte.DefaultHalfHeight - this.Hte.DefaultRadius,
        t = MAX_ROLE_CYLINDER_HALF_HEIGHT - t;
      let i = GravityUtils_1.GravityUtils.ConvertToPlanarVector(
        this.Hte,
        this.Lz,
      );
      var s = this.Lz.SizeSquared(),
        h = MAX_ROLE_RADIUS - this.Hte.DefaultRadius;
      h <= 0
        ? this.Lz.Reset()
        : h * h < s && ((h = h / Math.sqrt(s)), this.Lz.MultiplyEqual(h)),
        t <= 0 ? (i = 0) : i > t ? (i = t) : i < -t && (i = -t),
        GravityUtils_1.GravityUtils.AddZnInGravity(this.Hte, this.Lz, i),
        this.Lz.AdditionEqual(this.Tz),
        MathUtils_1.MathUtils.LookRotationUpFirst(
          this.Hte.ActorForwardProxy,
          this.Gce.GravityUp,
          this.az,
        ),
        this.Z_e.Set(this.Lz, this.az, this.Hte.ActorScaleProxy),
        this.SetCharacterTransformAndBuffer(
          this.Z_e.ToUeTransform(),
          NORMAL_CACHE_TIME,
        ),
        this.Hte.ResetCapsuleRadiusAndHeight();
    }
    QYr() {
      return this.Xte.HasTag(388142570) && !this.Xte.HasTag(1098729489);
    }
  });
(CharacterClimbComponent.wz = void 0),
  (CharacterClimbComponent.Bz = void 0),
  (CharacterClimbComponent.bz = void 0),
  (CharacterClimbComponent = CharacterClimbComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(31)],
      CharacterClimbComponent,
    )),
  (exports.CharacterClimbComponent = CharacterClimbComponent);
//# sourceMappingURL=CharacterClimbComponent.js.map
