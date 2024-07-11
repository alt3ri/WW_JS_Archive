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
  BlackboardController_1 = require("../../../../../World/Controller/BlackboardController"),
  WorldGlobal_1 = require("../../../../../World/WorldGlobal"),
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
        (this.tYr = (t) => {
          this.iYr(t);
        }),
        (this.W3r = (t, i, s) => {
          0 !== i ||
            s ||
            (t?.Valid &&
              (i = t.GetComponent(31))?.Valid &&
              (i.oYr.ContainsNaN() &&
                (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Movement",
                    6,
                    "OnStateInherit ClimbInput is Nan.",
                    ["ClimbInput", i.oYr],
                  ),
                i.oYr.Reset()),
              this.oYr.DeepCopy(i.oYr),
              this.rYr.DeepCopy(i.rYr),
              (this.nYr = i.nYr),
              (this.sYr = i.sYr),
              (this.aYr = i.aYr),
              (this.hYr = i.hYr),
              this.SetClimbState(i.lYr),
              this.SetEnterClimbType(i._Yr),
              this.SetExitClimbType(i.uYr),
              (this.cYr = i.cYr),
              0 !== this.lYr) &&
              (this.mYr.SyncFromOther(i.mYr),
              this.Hte.ResetCachedVelocityTime()));
        }),
        (this.ooo = (t, i, s) => {
          i = this.Entity.GetComponent(33).GetSkillInfo(i);
          NORMAL_GROUP_ID !== i.GroupId ||
            (this.mbr.MoveState !==
              CharacterUnifiedStateTypes_1.ECharMoveState.NormalClimb &&
              this.mbr.MoveState !==
                CharacterUnifiedStateTypes_1.ECharMoveState.FastClimb) ||
            this.Gce.CharacterMovement.SetMovementMode(1);
        }),
        (this.Hte = void 0),
        (this.Gce = void 0),
        (this.oRe = void 0),
        (this.dYr = void 0),
        (this.CYr = void 0),
        (this.gYr = void 0),
        (this.fYr = void 0),
        (this.pYr = void 0),
        (this.vYr = void 0),
        (this.MYr = void 0),
        (this.SYr = void 0),
        (this.EYr = void 0),
        (this.yYr = void 0),
        (this.aYr = void 0),
        (this.hYr = Vector_1.Vector.Create()),
        (this.IYr = void 0),
        (this.TYr = void 0),
        (this.LYr = Vector_1.Vector.Create()),
        (this.oYr = Vector2D_1.Vector2D.Create()),
        (this.rYr = Vector2D_1.Vector2D.Create()),
        (this.DYr = 0),
        (this.sYr = !1),
        (this.RYr = !1),
        (this.nYr = !1),
        (this.lYr = 0),
        (this.uYr = 5),
        (this._Yr = 0),
        (this.cYr = 0),
        (this.AYr = !1),
        (this.UYr = 0),
        (this.PYr = void 0),
        (this.xYr = void 0),
        (this.XVr = (t, i) => {
          t !== i &&
            (t === CharacterUnifiedStateTypes_1.ECharPositionState.Climb &&
              i === CharacterUnifiedStateTypes_1.ECharPositionState.Air &&
              4 !== this.uYr &&
              10 !== this.uYr &&
              1 < this.Hte.ActorVelocityProxy.Z &&
              (Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Movement",
                  6,
                  "错误的退出攀爬",
                  ["退出模式", this.uYr],
                  ["速度", this.Hte.ActorVelocityProxy],
                  ["动作", this.oRe.MainAnimInstance.GetMainAnimsDebugText()],
                ),
              this.Lz.DeepCopy(this.Hte.ActorVelocityProxy),
              (this.Lz.Z = 0),
              this.Gce.SetForceSpeed(this.Lz)),
            t === CharacterUnifiedStateTypes_1.ECharPositionState.Climb
              ? (Math.abs(
                  this.Hte.ActorForwardProxy.DotProduct(
                    Vector_1.Vector.UpVectorProxy,
                  ),
                ) > MathUtils_1.MathUtils.SmallNumber &&
                  ((t = this.Hte.ActorTransform),
                  MathUtils_1.MathUtils.LookRotationUpFirst(
                    this.Hte.ActorForwardProxy,
                    Vector_1.Vector.UpVectorProxy,
                    this.az,
                  ),
                  t.SetRotation(this.az.ToUeQuat()),
                  this.SetCharacterTransformAndBuffer(t, FAST_CACHE_TIME)),
                this.Hte.ResetCapsuleRadiusAndHeight(),
                this.wYr())
              : i === CharacterUnifiedStateTypes_1.ECharPositionState.Climb &&
                this.Hte.SetRadiusAndHalfHeight(
                  CLIMBING_CAPSULE_SIZE,
                  CLIMBING_CAPSULE_SIZE,
                  !1,
                ));
        }),
        (this.Xte = void 0),
        (this.mbr = void 0),
        (this.BYr = Vector_1.Vector.Create()),
        (this.bYr = void 0),
        (this.qYr = -0),
        (this.GYr = Vector_1.Vector.Create()),
        (this.Lz = Vector_1.Vector.Create()),
        (this.Tz = Vector_1.Vector.Create()),
        (this.M7o = Vector_1.Vector.Create()),
        (this.az = Quat_1.Quat.Create()),
        (this.Z_e = Transform_1.Transform.Create()),
        (this.mYr = void 0),
        (this.DebugNoTop = !1),
        (this.NYr = 0),
        (this.OYr = 0),
        (this.kYr = 0),
        (this.FYr = 0),
        (this.Cji = void 0),
        (this.VYr = 0),
        (this.HYr = void 0),
        (this.jYr = (t) => {
          t
            ? this.HYr ||
              ((this.HYr = this.Disable(
                "[CharacterClimbComponent.OnForbiddenClimbChanged] 禁用攀爬",
              )),
              this.mbr.PositionState ===
                CharacterUnifiedStateTypes_1.ECharPositionState.Climb &&
                this.WYr())
            : this.HYr &&
              (this.Enable(
                this.HYr,
                "[CharacterClimbComponent.OnForbiddenClimbChanged] 启用攀爬",
              ),
              (this.HYr = void 0));
        }),
        (this.KYr = (t) => {
          t &&
            this.mbr.PositionState ===
              CharacterUnifiedStateTypes_1.ECharPositionState.Climb &&
            this.WYr();
        }),
        (this.QYr = Vector_1.Vector.Create()),
        (this.XYr = void 0),
        (this.$Yr = void 0),
        (this.YYr = void 0),
        (this.JYr = void 0),
        (this.zYr = void 0),
        (this.ZYr = void 0),
        (this.eJr = void 0),
        (this.tJr = void 0),
        (this.iJr = void 0),
        (this.oJr = Rotator_1.Rotator.Create(0, 180, 0)),
        (this.rJr = void 0),
        (this.nJr = void 0),
        (this.sJr = void 0),
        (this.aJr = new Set([2, 7, 9, 8])),
        (this.AwakeClimbInput = (t) => {
          this.sYr = t;
        }),
        (this.hJr = void 0),
        (this.lJr = void 0),
        (this._Jr = void 0);
    }
    static get Dependencies() {
      return [3, 161];
    }
    get ClimbBlocking() {
      return this.AYr;
    }
    set ClimbBlocking(t) {
      this.AYr !== t &&
        ((this.AYr = t),
        this.AYr
          ? this.Xte.AddTag(-787153509)
          : this.Xte.RemoveTag(-787153509));
    }
    UpdateClimbDebug() {
      var t;
      GlobalData_1.GlobalData.IsPlayInEditor &&
        ((t = this.Hte.Actor.TsCharacterDebugComponent),
        (this.DebugNoTop = t.NoTop),
        (this.NYr = t.EnterClimbTrace),
        (this.OYr = t.VaultClimbTrace),
        (this.kYr = t.UpArriveClimbTrace),
        (this.FYr = t.ClimbingTrace));
    }
    OnInitData() {
      return (
        (this.aYr = new UE.Transform(
          Rotator_1.Rotator.ZeroRotator,
          Vector_1.Vector.ZeroVector,
          Vector_1.Vector.OneVector,
        )),
        (this.TYr = new UE.Transform(
          Quat_1.Quat.Identity,
          Vector_1.Vector.ZeroVector,
          Vector_1.Vector.OneVector,
        )),
        (this.PYr = (0, puerts_1.$ref)(void 0)),
        (this.xYr = (0, puerts_1.$ref)(void 0)),
        !0
      );
    }
    OnInit() {
      return (this.Xte = this.Entity.GetComponent(185)), !0;
    }
    OnStart() {
      if (
        ((this.Hte = this.Entity.CheckGetComponent(3)),
        (this.Gce = this.Entity.CheckGetComponent(161)),
        (this.oRe = this.Entity.GetComponent(160)),
        (this.mbr = this.Entity.CheckGetComponent(158)),
        (this.sYr = !0),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.XVr,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CustomMoveClimb,
          this.tYr,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.W3r,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharUseSkill,
          this.ooo,
        ),
        (this.dYr = ClimbById_1.configClimbById.GetConfig(
          this.Hte.CreatureData.GetRoleConfig().RoleBody,
        )),
        !this.dYr)
      )
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Movement", 6, "没有配置攀爬", [
              "RoleBody",
              this.Hte.CreatureData.GetRoleConfig().RoleBody,
            ]),
          !1
        );
      this.mYr = UE.NewObject(UE.KuroClimbObject.StaticClass(), this.Hte.Actor);
      var t = UE.NewArray(UE.Vector);
      for (const h of this.dYr.ClimbDetectPoints)
        t.Add(WorldGlobal_1.WorldGlobal.ToUeVector(h));
      this.mYr.InitBase(
        this.Hte.Actor.CapsuleComponent,
        QueryTypeDefine_1.KuroCollisionChannel.Climb,
        t,
        this.dYr.DetectRadius,
        this.dYr.ClimbRadius,
        DEFAULT_DETECT_LENGTH,
      ),
        this.mYr.InitClimbSafety(
          MAX_ROLE_RADIUS,
          MAX_ROLE_HALF_HEIGHT,
          MAX_SAFETY_DIST,
        ),
        (this.CYr = WorldGlobal_1.WorldGlobal.ToUeVector(this.dYr.ClimbVault)),
        (this.gYr = WorldGlobal_1.WorldGlobal.ToUeVector(this.dYr.ClimbOnTop)),
        (this.fYr = WorldGlobal_1.WorldGlobal.ToUeVector(
          this.dYr.ClimbFromTop,
        )),
        (this.IYr = WorldGlobal_1.WorldGlobal.ToUeVector(
          this.dYr.ClimbSprintVault,
        )),
        (this.pYr = new UE.SClimbInfo(
          Vector_1.Vector.ZeroVector,
          !1,
          new UE.Vector2D(0, 0),
          !1,
        )),
        (this.vYr = new UE.ClimbInfoStruct()),
        (this.MYr = new SClimbInfo()),
        (this.SYr = new UE.SClimbState()),
        (this.EYr = new UE.ClimbStateStruct()),
        (this.yYr = new SClimbState()),
        t.Empty();
      var i = UE.NewArray(UE.BuiltinFloat),
        s = UE.NewArray(UE.BuiltinFloat);
      return (
        t.Add(this.gYr),
        i.Add(this.dYr.UpArriveRange.Min),
        s.Add(this.dYr.UpArriveRange.Max),
        t.Add(this.CYr),
        i.Add(this.dYr.VaultRange.Min),
        s.Add(this.dYr.VaultRange.Max),
        this.mYr.InitUpArrives(t, i, s),
        this.mYr.InitSprintVault(
          this.dYr.ForwardBlockHeight,
          this.dYr.ForwardBlockRadius,
          this.dYr.ForwardBlockDistance.Min,
          this.dYr.ForwardBlockDistance.Max,
          this.IYr,
          this.dYr.SprintVaultRange.Min,
          this.dYr.SprintVaultRange.Max,
          this.dYr.SprintVaultLongNeedDistance,
          this.dYr.SprintVaultLongHeight,
          QueryTypeDefine_1.KuroTraceTypeQuery.AcrossBlock,
          this.dYr.SprintVaultLongRange.Min,
          this.dYr.SprintVaultLongRange.Max,
          ENTER_SPINT_VAULT_ANGLE,
        ),
        this.mYr.InitBlockUps(
          WorldGlobal_1.WorldGlobal.ToUeVector(this.dYr.BlockUpOffset),
          this.dYr.BlockUpDetectRadius,
          this.dYr.BlockUpDetectDistance,
          this.dYr.BlockUpBackDistance,
          this.dYr.BlockUpBackMinDist,
          WorldGlobal_1.WorldGlobal.ToUeVector(this.dYr.BlockUpFinalMove),
          this.dYr.BlockUpVerticalRange.Min,
          this.dYr.BlockUpVerticalRange.Max,
        ),
        (this.RYr = !0),
        this.uJr(),
        this.Xte?.Valid &&
          (this.Xte.HasTag(1448371427) &&
            (this.HYr = this.Disable(
              "[CharacterClimbComponent.OnStart] 包含了禁止攀爬Tag",
            )),
          this.Xte.ListenForTagAnyCountChanged(1448371427, this.jYr),
          this.Xte.ListenForTagAnyCountChanged(-866600078, this.KYr)),
        !0
      );
    }
    uJr() {
      (this.Cji = UE.NewObject(UE.TraceSphereElement.StaticClass())),
        (this.Cji.WorldContextObject = this.Hte.Owner),
        (this.Cji.bIgnoreSelf = !0),
        this.Cji.SetTraceTypeQuery(
          QueryTypeDefine_1.KuroTraceTypeQuery.Visible,
        ),
        this.Cji.SetDrawDebugTrace(this.NYr),
        (this.Cji.DrawTime = FIVE_SECONDS),
        (this.Cji.Radius = this.dYr.ClimbRadius * KINDA_LESS_THAN_ONE),
        TraceElementCommon_1.TraceElementCommon.SetTraceColor(
          this.Cji,
          traceColor,
        ),
        TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
          this.Cji,
          traceSuccessColor,
        );
    }
    OnActivate() {
      (this.DYr = this.Hte.ScaledHalfHeight), this.UpdateClimbDebug();
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.XVr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CustomMoveClimb,
          this.tYr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.W3r,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharUseSkill,
          this.ooo,
        ),
        !0
      );
    }
    OnTick(t) {
      ModelManager_1.ModelManager.SundryModel.SceneCheckOn &&
        ((i = Vector_1.Vector.Dist(this.Hte.ActorLocationProxy, this.QYr)),
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Test",
            6,
            "TickMove",
            ["Entity", this.Entity.Id],
            ["PrevLocation", this.QYr],
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
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, this.QYr),
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
        this.QYr.DeepCopy(this.Hte.ActorLocationProxy));
      var i = this.Hte.InputDirectProxy;
      0 !== this.lYr
        ? (i.ContainsNaN()
            ? (this.oYr.Reset(),
              Log_1.Log.CheckError() &&
                Log_1.Log.Error("Movement", 6, "Set Climb Input Nan.", [
                  "Input",
                  i,
                ]))
            : ((this.oYr.X = i.X), (this.oYr.Y = i.Y)),
          this.UYr &&
            (this.rYr.IsNearlyZero()
              ? this.rYr.DeepCopy(this.oYr)
              : this.rYr.Equals(this.oYr) || (this.UYr = 0)))
        : (this.oYr.Reset(), this.rYr.Reset());
      let s =
        this.mbr.PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Climb;
      s
        ? 0 < this.cYr &&
          ((this.cYr -= t), this.cYr <= 0) &&
          (this.OnExitClimb(), (s = !1))
        : (this.cYr = 0),
        !s &&
          !this.nYr &&
          this.Gce.HasMoveInput &&
          (this.Xte.HasTag(-1462404775) ||
            MathUtils_1.MathUtils.DotProduct(i, this.Hte.ActorForwardProxy) >
              THREADHOLD_ENTER_CLIMB_FORWARD_NEED) &&
          (this.SetClimbState(0), this.cJr(t)),
        s &&
          FormationAttributeController_1.FormationAttributeController.GetValue(
            1,
          ) <= 0 &&
          3 !== this.lYr &&
          !this.Xte.HasTag(-976785652) &&
          this.WYr(),
        (this.nYr = s);
    }
    GetExitClimbType() {
      return this.uYr;
    }
    cJr(t) {
      var i;
      (this.Xte.HasTag(-1371021686) && !this.Xte.HasTag(1781274524)) ||
        ((i = this.mJr()) &&
          this.mbr.MoveState !==
            CharacterUnifiedStateTypes_1.ECharMoveState.Glide &&
          (this.dJr(), 0 !== this.lYr)) ||
        (i || this.Xte.HasTag(400631093)
          ? (this.CJr(!0),
            (i = this.Hte?.Entity?.GetComponent(33)),
            0 !== this.lYr && i.StopGroup1Skill("攀爬打断技能"))
          : this.CJr(!1));
    }
    CJr(t) {
      switch (this.mbr.PositionState) {
        case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
          this.gJr(t);
          break;
        case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
          canEnterClimbAirStates.has(this.mbr.MoveState) &&
            this.fJr() &&
            (this.pJr(), 0 === this.lYr) &&
            this.vJr(t ? 4 : this.Gce.IsJump ? 2 : 0);
          break;
        case CharacterUnifiedStateTypes_1.ECharPositionState.Water:
          this.fJr() &&
            this.Entity.GetComponent(66).CheckCanEnterClimbFromSwim() &&
            (this.pJr(), 0 === this.lYr) &&
            this.vJr(1);
      }
    }
    pJr() {
      switch (
        this.mYr.TryUpArrives(
          this.Hte.ActorForward,
          this.MJr(this.OYr),
          this.PYr,
        )
      ) {
        case 1:
          this.SJr(2, (0, puerts_1.$unref)(this.PYr));
          break;
        case 2:
          this.SJr(7, (0, puerts_1.$unref)(this.PYr));
      }
    }
    gJr(t) {
      (this.Xte.HasTag(498191540) && (this.EJr(), 0 !== this.lYr)) ||
        (this.fJr() && (this.pJr(), 0 === this.lYr) && this.vJr(t ? 4 : 2));
    }
    wYr() {
      this.mYr.ExitClimb(),
        this.SetClimbState(0),
        this.SetExitClimbType(5),
        this.LYr.Set(0, 0, 0),
        this.Hte.SetInputRotator(this.Hte.ActorRotationProxy),
        (this.ClimbBlocking = !1);
    }
    CanClimbPress() {
      return !0;
    }
    WYr() {
      var t, i;
      0 < this.Hte.ActorVelocityProxy.Z &&
        (this.Lz.DeepCopy(this.Hte.ActorVelocityProxy),
        (this.Lz.Z = 0),
        this.Gce.SetForceSpeed(this.Lz)),
        2 === this.lYr && this.yJr(),
        this.mbr.MoveState ===
          CharacterUnifiedStateTypes_1.ECharMoveState.FastClimb &&
          (this.Lz.DeepCopy(this.Hte.InputDirectProxy),
          this.Lz.IsNearlyZero() ||
            (Math.abs(this.Lz.Y) > MathUtils_1.MathUtils.SmallNumber &&
              ((i = this.Hte.ActorForwardProxy),
              (t = this.Hte.ActorRightProxy),
              i.Multiply(Math.abs(this.Lz.X), this.Tz),
              t.Multiply(this.Lz.Y, this.M7o),
              this.Tz.AdditionEqual(this.M7o),
              MathUtils_1.MathUtils.LookRotationUpFirst(
                this.Tz,
                Vector_1.Vector.UpVectorProxy,
                this.az,
              ),
              (i = this.Hte.ActorTransform).SetRotation(this.az.ToUeQuat()),
              this.SetCharacterTransformAndBuffer(i, EXIT_CLIMB_CACHE_TIME)))),
        this.Gce.CharacterMovement.SetMovementMode(3);
    }
    ClimbPress(t) {
      this.mbr.PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Climb &&
        2 === this.lYr &&
        (this.WYr(), (this.VYr = Time_1.Time.Now + CAN_ENTER_CLIMB_CD));
    }
    IJr(t, i) {
      var s = i.X * t.Y - i.Y * t.X;
      return (
        Math.sign(s) *
        Math.acos(MathUtils_1.MathUtils.Clamp(t.X * i.X + t.Y * i.Y, 0, 1)) *
        MathUtils_1.MathUtils.RadToDeg
      );
    }
    NeedProcessTransform() {
      return !(
        (1 === this.lYr && !this.RYr) ||
        (2 !== this.lYr && 1 !== this.lYr)
      );
    }
    TJr(t, i = NORMAL_CACHE_TIME) {
      this.Lz.FromUeVector(t.GetLocation()),
        this.oRe?.Valid &&
        MathUtils_1.MathUtils.DotProduct(
          t.GetRotation().GetForwardVector(),
          this.TYr.GetRotation().GetForwardVector(),
        ) < THREADHOLD_MODEL_BUFFER
          ? this.SetCharacterTransformAndBuffer(t, i)
          : this.Hte.SetActorTransform(t, "攀爬.ConfirmMove", !0),
        this.mYr.ConfirmMove();
    }
    fJr() {
      return (
        this.M7o.FromUeVector(
          this.Gce.CharacterMovement.Kuro_GetBlockDirectWhenMove(),
        ),
        (this.M7o.Z = 0),
        !(
          !this.M7o.Normalize() ||
          this.Hte.InputDirectProxy.DotProduct(this.M7o) >
            THREADHOLD_FORWARD_BLOCK
        )
      );
    }
    SJr(t, i, s = !0) {
      this.mbr.PositionState ===
      CharacterUnifiedStateTypes_1.ECharPositionState.Ground
        ? this.Gce.PlayerMotionRequest(
            Protocol_1.Aki.Protocol.n3s.Proto_StepAcross,
          )
        : this.Gce.PlayerMotionRequest(
            Protocol_1.Aki.Protocol.n3s.Proto_ClimbTop,
          ),
        s &&
          this.Gce.CharacterMovement.SetMovementMode(
            6,
            CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_CLIMB,
          ),
        this.SetClimbState(3),
        (this.cYr = EXIT_CLIMB_TIME),
        this.SetExitClimbType(t),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.CharClimbStartExit,
          this.Entity.Id,
          t,
        ),
        this.mJr() &&
          (2 === t
            ? this.SetExitClimbType(6)
            : 7 === t &&
              (this.SetExitClimbType(9),
              this.Lz.Set(0, 0, this.CYr.Z - this.IYr.Z),
              (s = i.TransformPosition(this.Lz.ToUeVector())),
              i.SetLocation(s))),
        this.hYr.FromUeVector(i.GetLocation()),
        this.Hte.ActorForwardProxy.Z <= 0
          ? (i.SetLocation(this.Hte.ActorLocation),
            this.hYr.Subtraction(this.Hte.ActorLocationProxy, this.Lz))
          : (this.Lz.DeepCopy(this.hYr),
            (this.Lz.Z = this.Hte.ActorLocation.Z),
            i.SetLocation(this.Lz.ToUeVector()),
            this.Lz.Reset(),
            (this.Lz.Z = this.hYr.Z - this.Hte.ActorLocationProxy.Z)),
        (this.Lz.Z += 2),
        BlackboardController_1.BlackboardController.SetVectorValueByEntity(
          this.Entity.Id,
          "ClimbOnTopMove",
          this.Lz.X,
          this.Lz.Y,
          this.Lz.Z,
        ),
        10 === t &&
          ((s = this.mYr.GetSecondMoveOffset()),
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
            ["ForwardZ", this.Hte.ActorForwardProxy.Z],
            ["ExitClimbType", this.uYr],
          ),
        9 === this.uYr || 8 === this.uYr || 6 === this.uYr
          ? this.SetCharacterTransformAndBuffer(i, FAST_CACHE_TIME)
          : this.SetCharacterTransformAndBuffer(i, CACHE_TIME_UP_ARRIVE),
        ModelManager_1.ModelManager.SundryModel.SceneCheckOn &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Test", 6, "UpArrive2", [
            "Location",
            this.Hte.ActorLocationProxy,
          ]);
    }
    MJr(t) {
      switch (t) {
        case 1:
          return SHORT_DRAW_TIME;
        case 2:
          return LONG_DRAW_TIME;
        default:
          return 0;
      }
    }
    EJr() {}
    vJr(t) {
      if (
        !(
          this.VYr > Time_1.Time.Now ||
          FormationAttributeController_1.FormationAttributeController.GetValue(
            1,
          ) <= STRENGTH_THREADHOLD ||
          this.Xte.HasTag(-866600078)
        )
      ) {
        if (
          this.mbr.PositionState ===
            CharacterUnifiedStateTypes_1.ECharPositionState.Air &&
          this.Xte.HasTag(-1371021686)
        )
          this.Lz.DeepCopy(this.Hte.InputDirectProxy);
        else {
          var i = this.Hte.ActorVelocityProxy;
          if (i.Z < THREAHOLD_ENTER_CLIMB_MIN_Z_SPEED) return;
          this.Hte.InputDirectProxy.Multiply(FIVE_HUNDRED, this.Lz),
            this.Lz.AdditionEqual(i);
        }
        this.LJr(t, this.Lz);
      }
    }
    LJr(t, i) {
      var s;
      this.sJr || (this.sJr = Transform_1.Transform.Create()),
        this.sJr.SetLocation(this.Hte.ActorLocationProxy),
        this.sJr.SetScale3D(this.Hte.ActorScaleProxy),
        MathUtils_1.MathUtils.LookRotationForwardFirst(
          i,
          Vector_1.Vector.UpVectorProxy,
          this.sJr.GetRotation(),
        ),
        this.mYr.TryStartClimb(
          this.sJr.ToUeTransform(),
          this.MJr(this.NYr),
          this.PYr,
        ) &&
          ((s = (0, puerts_1.$unref)(this.PYr)),
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
              ? (this.mbr.SwitchFastClimb(!0),
                (i = Vector_1.Vector.Create(
                  s.GetRotation().GetForwardVector(),
                )).Normalize(MathUtils_1.MathUtils.SmallNumber),
                (this.UYr = this.IJr(this.Hte.ActorForwardProxy, i)))
              : (this.UYr = 0),
            this.TJr(s, NORMAL_CACHE_TIME),
            (this.RYr = !0)));
    }
    DJr() {
      this.WYr();
    }
    dJr() {
      switch (this.mYr.TrySprintVault(this.MJr(this.OYr), this.PYr, this.xYr)) {
        case 1:
          this.SJr(9, (0, puerts_1.$unref)(this.PYr));
          break;
        case 2:
          var t = (0, puerts_1.$unref)(this.PYr);
          this.SJr(8, t),
            this.az.FromUeQuat(t.GetRotation()),
            this.az.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.Lz),
            this.Lz.MultiplyEqual((0, puerts_1.$unref)(this.xYr)),
            BlackboardController_1.BlackboardController.SetVectorValueByEntity(
              this.Entity.Id,
              "ClimbAddMove",
              this.Lz.X,
              this.Lz.Y,
              this.Lz.Z,
            );
      }
    }
    DealClimbUpStart() {}
    DealClimbUpFinish() {
      this.Hte.ResetCapsuleRadiusAndHeight();
    }
    iYr(i) {
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
        this.bYr)
      ) {
        this.qYr += i;
        let t = 0;
        (t = this.qYr > this.bYr ? (this.bYr - this.qYr + i) / i : 1),
          this.BYr.Multiply(t, this.Tz),
          this.Lz.AdditionEqual(this.Tz),
          this.qYr > this.bYr && (this.bYr = void 0);
      }
      if (
        this.mYr.ProcessClimbing(
          this.Lz.ToUeVector(),
          i,
          t,
          this.MJr(this.FYr),
          this.PYr,
        )
      ) {
        if (
          ((this.ClimbBlocking = this.mYr.ClimbBlock()),
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
            this.mYr.TryClimbingArrives(
              this.Hte.InputDirect,
              this.MJr(this.kYr),
              this.PYr,
              this.mJr(),
            )
          ) {
            case 1:
              this.SJr(2, (0, puerts_1.$unref)(this.PYr), !1);
              break;
            case 2:
              this.SJr(7, (0, puerts_1.$unref)(this.PYr), !1);
              break;
            case 3:
              this.DJr();
              break;
            case 4:
              this.SJr(10, (0, puerts_1.$unref)(this.PYr), !1);
          }
      } else
        ModelManager_1.ModelManager.SundryModel.SceneCheckOn &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Test", 6, "ProcessClimbing Failed", [
            "Location",
            this.Hte.Actor.K2_GetActorLocation(),
          ]),
          this.WYr();
    }
    GetClimbInfo() {
      return (
        this.oYr.ContainsNaN() &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Movement", 6, "GetClimbInfo Nan.", [
              "ClimbInput",
              this.oYr,
            ]),
          this.oYr.Reset()),
        (this.pYr.攀爬移动中 = !this.sYr),
        (this.pYr.攀爬输入向量 = this.oYr.ToUeVector2D()),
        this.pYr
      );
    }
    GetClimbInfoNew() {
      return (
        this.oYr.ContainsNaN() &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Movement", 6, "GetClimbInfo Nan.", [
              "ClimbInput",
              this.oYr,
            ]),
          this.oYr.Reset()),
        (this.vYr.IsClimbMoving = !this.sYr),
        (this.vYr.ClimbInput = this.oYr.ToUeVector2D()),
        (this.vYr.OnWallAngle = this.UYr),
        this.vYr
      );
    }
    GetTsClimbInfo() {
      return (
        this.oYr.ContainsNaN() &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Movement", 6, "GetClimbInfo Nan.", [
              "ClimbInput",
              this.oYr,
            ]),
          this.oYr.Reset()),
        (this.MYr.攀爬移动中 = !this.sYr),
        this.MYr.攀爬输入向量.DeepCopy(this.oYr),
        (this.MYr.OnWallAngle = this.UYr),
        this.MYr
      );
    }
    FinishClimbDown() {
      (this.RYr = !0),
        this.mYr.TryStartClimb(this.Hte.ActorTransform, 0, this.PYr)
          ? this.TJr((0, puerts_1.$unref)(this.PYr))
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Movement",
                6,
                "下爬动作完成后停留在了一个不太适合攀爬的地点",
              ),
            this.Gce.CharacterMovement.SetMovementMode(3));
    }
    SetCharacterTransformAndBuffer(t, i, s = void 0) {
      (this.bYr = void 0),
        s &&
          (0 < i
            ? (this.Lz.FromUeVector(t.GetTranslation()),
              s.Subtraction(this.Lz, this.BYr),
              this.BYr.DivisionEqual(i * TimeUtil_1.TimeUtil.Millisecond),
              (this.qYr = 0),
              (this.bYr = i * TimeUtil_1.TimeUtil.Millisecond))
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
        this.lYr !== t &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Movement",
            6,
            "SetClimbState",
            ["Entity", this.Entity.Id],
            ["From", this.lYr],
            ["To", t],
          ),
        (this.lYr = t),
        (this.yYr.攀爬状态 = t),
        this.mbr.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Climb)
      )
        switch (t) {
          case 2:
            this.oYr.IsNearlyZero()
              ? this.mbr.SetMoveState(
                  CharacterUnifiedStateTypes_1.ECharMoveState.Other,
                )
              : this.mbr.SwitchFastClimb(this.Xte.HasTag(388142570), !0);
            break;
          case 1:
            this.mbr.SetMoveState(
              CharacterUnifiedStateTypes_1.ECharMoveState.EnterClimb,
            );
            break;
          case 3:
            this.mbr.SetMoveState(
              CharacterUnifiedStateTypes_1.ECharMoveState.ExitClimb,
            );
        }
    }
    SetEnterClimbType(t) {
      (this._Yr = t), (this.yYr.进入攀爬类型 = t);
    }
    SetExitClimbType(t) {
      var i = this.aJr.has(this.uYr),
        s = this.aJr.has(t);
      i
        ? s || this.Xte.RemoveTag(1313414424)
        : s && this.Xte.AddTag(1313414424),
        (this.uYr = t),
        (this.yYr.退出攀爬类型 = t);
    }
    GetClimbState() {
      return (
        (this.SYr.攀爬状态 = this.lYr),
        (this.SYr.进入攀爬类型 = this._Yr),
        (this.SYr.退出攀爬类型 = this.uYr),
        this.SYr
      );
    }
    GetClimbStateNew() {
      return (
        (this.EYr.ClimbState = this.lYr),
        (this.EYr.EnterClimbType = this._Yr),
        (this.EYr.ExitClimbType = this.uYr),
        this.EYr
      );
    }
    GetTsClimbState() {
      return this.yYr;
    }
    GetOnWallAngle() {
      return this.UYr;
    }
    OnEnterClimb() {
      1 === this.lYr && (this.SetClimbState(2), this.SetExitClimbType(5));
    }
    OnExitClimb() {
      if (
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Movement", 6, "OnExitClimb", [
            "Entity",
            this.Entity.Id,
          ]),
        0 !== this.lYr)
      ) {
        switch (this.uYr) {
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
        this.bYr &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Movement",
              6,
              "ClimbUp Buffer is not finished",
              ["Now", this.qYr],
              ["TimeLength", this.bYr],
            ),
          (this.bYr = void 0));
      }
    }
    ClimbKeyPressed(t) {
      this.ClimbPress(t);
    }
    KickExitCheck() {
      var t;
      this.mbr.PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Climb &&
        (this.oYr.X < THREAHOLD_JUMP_LEAVE
          ? this.KickWallExit()
          : (t = this.Entity.GetComponent(160)).Valid && t.ClimbDash());
    }
    GetClimbRadius() {
      return this.dYr ? this.dYr.ClimbRadius : 0;
    }
    DetectClimbWithDirect(t, i) {
      if (
        !this.Active ||
        this.mbr.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Climb
      )
        return !1;
      switch (
        (this.SetClimbState(0),
        this.mYr.TryUpArrives(i, this.MJr(this.NYr), this.PYr))
      ) {
        case 1:
          return this.SJr(2, (0, puerts_1.$unref)(this.PYr)), !0;
        case 2:
          return this.SJr(7, (0, puerts_1.$unref)(this.PYr)), !0;
      }
      return (
        this.GYr.FromUeVector(i),
        this.LJr(t ? 4 : this.Gce.IsJump ? 2 : 0, this.GYr),
        0 !== this.lYr
      );
    }
    yJr() {
      this.Tz.FromUeVector(this.mYr.GetSafetyLocation()),
        this.Hte.ActorLocationProxy.Subtraction(this.Tz, this.Lz);
      var t = this.Hte.DefaultHalfHeight - this.Hte.DefaultRadius,
        i = MAX_ROLE_CYLINDER_HALF_HEIGHT - t,
        t =
          (i <= 0
            ? (this.Lz.Z = 0)
            : this.Lz.Z > i
              ? (this.Lz.Z = MAX_ROLE_CYLINDER_HALF_HEIGHT - t)
              : this.Lz.Z < -i && (this.Lz.Z = -i),
          this.Lz.SizeSquared2D()),
        i = MAX_ROLE_RADIUS - this.Hte.DefaultRadius;
      i <= 0
        ? ((this.Lz.X = 0), (this.Lz.Y = 0))
        : i * i < t &&
          ((i = i / Math.sqrt(t)), (this.Lz.X *= i), (this.Lz.Y *= i)),
        this.Lz.AdditionEqual(this.Tz),
        MathUtils_1.MathUtils.LookRotationUpFirst(
          this.Hte.ActorForwardProxy,
          Vector_1.Vector.UpVectorProxy,
          this.az,
        ),
        this.Z_e.Set(this.Lz, this.az, this.Hte.ActorScaleProxy),
        this.SetCharacterTransformAndBuffer(
          this.Z_e.ToUeTransform(),
          NORMAL_CACHE_TIME,
        );
    }
    mJr() {
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
