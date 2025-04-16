"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotTemplate = exports.BEGIN_WAIT_TIME = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  PlotAudioById_1 = require("../../../Core/Define/ConfigQuery/PlotAudioById"),
  QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  MathCommon_1 = require("../../../Core/Utils/Math/MathCommon"),
  Quat_1 = require("../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  CameraController_1 = require("../../Camera/CameraController"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  GlobalData_1 = require("../../GlobalData"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterNameDefines_1 = require("../../NewWorld/Character/Common/CharacterNameDefines"),
  GameplayCueController_1 = require("../../NewWorld/Character/Common/Component/Abilities/GameplayCueSFX/Controller/GameplayCueController"),
  NpcPerformController_1 = require("../../NewWorld/Character/Npc/Controller/NpcPerformController"),
  GravityUtils_1 = require("../../Utils/GravityUtils"),
  WaitEntityTask_1 = require("../../World/Define/WaitEntityTask"),
  TeleportController_1 = require("../Teleport/TeleportController"),
  MovingShotManager_1 = require("./MovingShotManager"),
  PlotAudioModel_1 = require("./PlotAudioModel"),
  PlotController_1 = require("./PlotController"),
  SequenceDefine_1 = require("./Sequence/SequenceDefine"),
  PLAYER_UNUSED_INDEX = -1,
  PLAYER_USED_ID = -1,
  ACTOR_EMPTY_INDEX = -1,
  FIX_TELEPORT_TRACE_DOWN = -1e3,
  PROFILE_KEY = "PlotTemplate_GroundCheckModify",
  ACTOR_NUM_MAX = 10,
  WAIT_ENTITY_TIME = 3e4,
  DITHER_RATE_PER_SECOND = 0.33,
  WAIT_TURING_TIME = 1500,
  MONTAGE_BLEND_OUT_TIME = ((exports.BEGIN_WAIT_TIME = 800), 0.5),
  DEFAULT_CAMERA_BASE = 140.19,
  DEFAULT_CAMERA_BASE_HEAD = 135.96,
  MAX_POS_DIST_SQ = 1e6;
class ActorData {
  constructor() {
    (this.ValidInternal = !1),
      (this.PbDataId = 0),
      (this.EntityId = 0),
      (this.TalkerId = 0),
      (this.Pos = { X: 0, Y: 0, Z: 0, A: 0, Roll: 0, Pitch: 0 }),
      (this.Visible = !1),
      (this.MontageBlendToEnd = !1),
      (this.MontageLooping = !1),
      (this.MontageKeeping = !1),
      (this.BodyMontage = void 0),
      (this.BodyMontagePath = void 0),
      (this.OverlayMontageLooping = !1),
      (this.OverlayMontageKeeping = !1),
      (this.OverlayMontage = void 0),
      (this.OverlayMontagePath = void 0),
      (this.FaceMontage = void 0),
      (this.MouseMontageLoadingId = ResourceSystem_1.ResourceSystem.InvalidId),
      (this.FaceExpressionId = void 0),
      (this.FaceChangeManager = void 0),
      (this.OriginPos = { X: 0, Y: 0, Z: 0, A: 0, Roll: 0, Pitch: 0 }),
      (this.IsPosReset = !1),
      (this.IsMontageKeep = !1),
      (this.OriginEnableLookAt = !1),
      (this.OriginEnableAi = !1),
      (this.OriginMoveSync = !1),
      (this.OriginMoveMode = void 0),
      (this.LookLocked = !1),
      (this.PositionLocked = !1),
      (this.QueHandleIds = []);
  }
  get Valid() {
    return (
      !!this.ValidInternal &&
      (this.IsPlayer()
        ? (ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity
            ?.Valid ?? !1)
        : (ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
            this.PbDataId,
          )?.Valid ?? !1))
    );
  }
  set Valid(t) {
    this.ValidInternal = t;
  }
  Reset() {
    (this.ValidInternal = !1),
      (this.PbDataId = 0),
      (this.EntityId = 0),
      (this.TalkerId = 0),
      (this.Visible = !0),
      (this.MontageBlendToEnd = !1),
      (this.MontageLooping = !1),
      (this.MontageKeeping = !1),
      (this.BodyMontage = void 0),
      (this.BodyMontagePath = void 0),
      (this.FaceMontage = void 0),
      (this.MouseMontageLoadingId = ResourceSystem_1.ResourceSystem.InvalidId),
      (this.OverlayMontageLooping = !1),
      (this.OverlayMontageKeeping = !1),
      (this.OverlayMontage = void 0),
      (this.OverlayMontagePath = void 0),
      (this.FaceExpressionId = void 0),
      (this.FaceChangeManager = void 0),
      (this.Pos.X = 0),
      (this.Pos.Y = 0),
      (this.Pos.Z = 0),
      (this.Pos.A = 0),
      (this.Pos.Roll = 0),
      (this.Pos.Pitch = 0),
      (this.OriginPos.X = 0),
      (this.OriginPos.Y = 0),
      (this.OriginPos.Z = 0),
      (this.OriginPos.A = 0),
      (this.OriginPos.Roll = 0),
      (this.OriginPos.Pitch = 0),
      (this.IsPosReset = !1),
      (this.IsMontageKeep = !1),
      (this.OriginEnableLookAt = !1),
      (this.OriginEnableAi = !1),
      (this.OriginMoveSync = !1),
      (this.OriginMoveMode = void 0),
      (this.LookLocked = !1),
      (this.PositionLocked = !1),
      (this.QueHandleIds.length = 0);
  }
  IsPlayer() {
    return this.PbDataId === PLAYER_USED_ID;
  }
}
class ShowActorParam {
  constructor() {
    (this.Visible = !1), (this.UseEffect = !1);
  }
}
class DelayActionManager {
  constructor() {
    (this.Sia = new Set()), (this.Eia = new Map());
  }
  DelayAction(e, t, i, o) {
    if (t < TimerSystem_1.MIN_TIME || t > TimerSystem_1.MAX_TIME) i();
    else if (o) {
      o = TimerSystem_1.TimerSystem.Delay(() => {
        var t = this.Eia.get(e)[1];
        this.Eia.delete(e), t();
      }, t);
      this.Eia.has(e) && this.Eia.get(e)[0].Remove(), this.Eia.set(e, [o, i]);
    } else {
      const s = TimerSystem_1.TimerSystem.Delay(() => {
        this.Sia.delete(s), i();
      }, t);
      this.Sia.add(s);
    }
  }
  CleanAction(i = !0) {
    this.Sia.forEach((t) => t.Remove()),
      this.Sia.clear(),
      this.Eia.forEach((t) => {
        var e = t[0],
          t = t[1];
        e.Remove(), i && t();
      }),
      this.Eia.clear();
  }
}
class PlotTemplate {
  constructor() {
    (this.iJi = void 0),
      (this.nx = void 0),
      (this.oJi = !1),
      (this.rJi = Transform_1.Transform.Create()),
      (this.lpc = !0),
      (this.nJi = 0),
      (this.sJi = void 0),
      (this.aJi = new Map()),
      (this.ZYi = new Map()),
      (this.hJi = new Set()),
      (this.lJi = new Set()),
      (this._Ji = new ShowActorParam()),
      (this.uJi = ACTOR_EMPTY_INDEX),
      (this.cJi = ""),
      (this.mJi = void 0),
      (this.dJi = PLAYER_UNUSED_INDEX),
      (this.fJi = Vector_1.Vector.Create()),
      (this.uoe = void 0),
      (this.vJi = new RegExp(/(?<=station)\d/)),
      (this.MJi = new RegExp(/_CU|_MS|_FS|_RFS/)),
      (this.EJi = !1),
      (this.AWl = !1),
      (this.SJi = 0),
      (this.yJi = 0),
      (this.tNn = -1),
      (this.iNn = void 0),
      (this.xJt = void 0),
      (this.a9s = 0),
      (this.Y2_ = void 0),
      (this.LJi = new MovingShotManager_1.MovingShotManager()),
      (this.yia = new DelayActionManager()),
      (this.m8a = new DelayActionManager()),
      (this.z2_ = new DelayActionManager()),
      (this.AM1 = new Map());
  }
  get IsInTemplate() {
    return this.oJi;
  }
  get IsCameraControl() {
    return this.EJi;
  }
  get DJi() {
    if (!this.sJi) {
      this.sJi = new Array();
      for (let t = 0; t < ACTOR_NUM_MAX; t++) {
        var e = new ActorData();
        this.sJi.push(e);
      }
    }
    return this.sJi;
  }
  get MinWaitingTime() {
    return this.IsInTemplate ? TimeUtil_1.TimeUtil.SetTimeSecond(this.SJi) : 0;
  }
  StartTemplateNew(i, t, o) {
    (this.oJi = !0),
      (this.EJi = i.UseFreeCamera),
      (this.SJi = 0),
      (this.nx = t),
      (this.AWl = i.IsSwitchMainRole ?? !1);
    var e = new Array();
    for (const s of i.Actors) e.push(s.EntityId);
    this.RJi(e, () => {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 26, "等待模板演出实体完成");
      const t = this.PM1();
      var e;
      this.EJi
        ? ControllerHolder_1.ControllerHolder.PlotController.EnableViewControl(
            !0,
          )
        : ((e =
            ModelManager_1.ModelManager.CameraModel.SequenceCamera
              .DisplayComponent.CineCamera).ResetSeqCineCamSetting(),
          e.D_K2_SetActorTransform(
            ModelManager_1.ModelManager.CameraModel.CameraTransform,
            !1,
            void 0,
            !0,
          ),
          ControllerHolder_1.ControllerHolder.PlotController.EnableViewControl(
            !1,
          ),
          (this.yJi = UE.KismetSystemLibrary.GetConsoleVariableFloatValue(
            "r.MotionBlur.Amount",
          )),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.MotionBlur.Amount 0",
          ),
          ModelManager_1.ModelManager.PlotModel.SwitchCameraMode(3)),
        this.UJi(i.Actors),
        (this.mJi = new Array()),
        this.EJi &&
          this.DJi.forEach((t, e) => {
            t.Valid && this.mJi.push({ Index: e });
          }),
        this.AJi(i.Actors, () => {
          t.finally(o);
        });
    });
  }
  async PM1() {
    var t =
      ControllerHolder_1.ControllerHolder.FlowController.GetNextNameAction(
        "ShowTalk",
      );
    if (t) {
      var t = t.Params,
        e = new Array();
      for (const o of t.TalkItems)
        if (o.ActorMontageArray)
          for (const s of o.ActorMontageArray) {
            var i =
              s.ActorIndex === this.dJi ? this.PJi(s.MontageId) : s.MontageId;
            let t = void 0;
            if (
              (t = s.IsAbpMontage
                ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(i)
                : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(i))
                ?.ActionMontage
            ) {
              const r = new CustomPromise_1.CustomPromise();
              e.push(r.Promise),
                ResourceSystem_1.ResourceSystem.LoadAsync(
                  t.ActionMontage,
                  UE.AnimMontage,
                  (t, e) => {
                    t?.IsValid() && this.AM1.set(e, t), r.SetResult();
                  },
                );
            }
          }
      await Promise.all(e);
    }
  }
  UJi(e) {
    this.aJi.clear();
    for (let t = 0; t < ACTOR_NUM_MAX; t++) {
      var i,
        o,
        s,
        r,
        a = this.DJi[t];
      a.Reset(),
        t >= e.length ||
          ((i =
            t === this.dJi
              ? ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity
              : ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
                  e[t].EntityId,
                )),
          this._Ws(i)
            ? (o = i.Entity.GetComponent(3))
              ? (ModelManager_1.ModelManager.WorldModel.AddIgnore(o.Actor),
                o.ClearInput(),
                (s = i.Entity.GetComponent(39))?.Valid &&
                  s.StopAllSkills("PlotTemplate.ControlActor"),
                o.SetActorVelocity(Vector_1.Vector.ZeroVectorProxy),
                (s = i.Entity.GetComponent(175))?.Valid &&
                  s.SetSightTargetItem(void 0),
                (r = i.Entity.GetComponent(67))?.Valid &&
                  ((a.OriginMoveSync = r.GetEnableMovementSync()),
                  a.OriginMoveSync) &&
                  r.SetEnableMovementSync(!1, "PlotTemplate"),
                (a.Valid = !0),
                (a.EntityId = i.Id),
                (a.PbDataId = e[t].EntityId),
                (a.TalkerId = e[t].TalkerId),
                (a.OriginPos.X = o.ActorLocationProxy.X),
                (a.OriginPos.Y = o.ActorLocationProxy.Y),
                (a.OriginPos.Z = o.ActorLocationProxy.Z),
                (a.OriginPos.A = o.ActorRotationProxy.Yaw),
                (a.OriginPos.Roll = o.ActorRotationProxy.Roll),
                (a.OriginPos.Pitch = o.ActorRotationProxy.Pitch),
                Object.assign(a.Pos, a.OriginPos),
                (a.IsPosReset = e[t].IsResetPosition),
                (a.OriginEnableLookAt = !1),
                (a.Visible = !0),
                (a.OriginMoveMode = o.Actor.CharacterMovement.MovementMode),
                a.IsPlayer() ||
                  ((r = i?.Entity?.GetComponent(185)),
                  (a.FaceChangeManager = r?.ExpressionController)),
                -1 !== a.TalkerId
                  ? (this.aJi.has(a.TalkerId) &&
                      Log_1.Log.CheckWarn() &&
                      Log_1.Log.Warn(
                        "Plot",
                        26,
                        "重复的对话人，请策划检查配置",
                      ),
                    this.aJi.set(a.TalkerId, a))
                  : Log_1.Log.CheckWarn() &&
                    Log_1.Log.Warn(
                      "Plot",
                      26,
                      "未配置说话人，口型和自动看向功能不生效",
                      ["演员位", t],
                    ),
                t === this.dJi
                  ? (o.Entity.GetComponent(79).HideWeapon(-1, !0, !1),
                    this.EJi ||
                      o.Actor.CharRenderingComponent?.SetDisableFightDither(!0),
                    (a.PositionLocked = this.nx.KeepMainRolePose))
                  : (NpcPerformController_1.NpcPerformController.ForceSetNpcDitherVisible(
                      !0,
                      a.PbDataId,
                      1,
                    ),
                    (r = i.Entity.GetComponent(185))?.Valid &&
                      ((a.OriginEnableLookAt = r.OpenLookAt),
                      r.SetLookAtPlayerEnabled(!1),
                      r.OnNpcInPlot(!0),
                      (a.PositionLocked = r.GetIsUseFixLocation())),
                    (r = i.Entity?.GetComponent(46))?.Valid &&
                      ((a.OriginEnableAi = r.IsAiDriver && r.IsEnabled()),
                      a.OriginEnableAi) &&
                      r.DisableAi("Plot Control Ai"),
                    a.PositionLocked ||
                      o.Actor.KuroSetMovementMode({
                        Mode: 1,
                        Context: "[PlotTemplate.ControlActor]",
                      }),
                    s.SetBlendSpaceLookAt(!0)),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Plot",
                    26,
                    "演员信息",
                    ["index", t],
                    ["actor", o.Actor.GetName()],
                    ["entityId", a.EntityId],
                    [
                      "pbDataId",
                      -1 === a.PbDataId
                        ? o.CreatureData.GetPbDataId()
                        : a.PbDataId,
                    ],
                  ))
              : Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn("Plot", 26, "实体类型错误", [
                  "PbDataId",
                  e[t].EntityId,
                ])
            : Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("Plot", 26, "模板演出拿不到演员", [
                "PbDataId",
                e[t].EntityId,
              ]));
    }
  }
  _Ws(t) {
    return (
      !!t?.Valid &&
      !(
        !t?.IsInit ||
        !t?.Entity?.Active ||
        !(t = t.Entity.GetComponent(0)) ||
        t.GetRemoveState()
      )
    );
  }
  AJi(e, t) {
    if (this.nx.IsBackground) t();
    else {
      var i = new Array();
      for (let t = 0; t < e.length; t++) {
        var o,
          s,
          r = e[t],
          a = this.DJi[t];
        a.Valid
          ? ((s =
              ((s = r.InitialState?.InitialMontage) &&
                ((o = a.IsPlayer()
                  ? this.PJi(s.MontageId.MontageId)
                  : s.MontageId.MontageId),
                (s = s.MontageId.IsAbp
                  ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(o)
                  : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(o))
                  ? i.push(this.xJi(a, s.ActionMontage))
                  : ControllerHolder_1.ControllerHolder.FlowController.LogError(
                      "初始化演员蒙太奇时找不到资源",
                      ["id", o],
                    )),
              EntitySystem_1.EntitySystem.Get(a.EntityId))),
            (o = r.InitialState?.InitialLookAt) &&
              ((s = s.GetComponent(175)), this.wJi(s, o, a)))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Plot", 26, "初始化演员失败", [
              "EntityId",
              r.EntityId,
            ]);
      }
      const _ = new CustomPromise_1.CustomPromise();
      i.push(_.Promise),
        TimerSystem_1.TimerSystem.Delay(() => {
          _.SetResult();
        }, exports.BEGIN_WAIT_TIME),
        Promise.all(i).finally(t);
    }
  }
  async SetTemplateNew(e) {
    if (!this.EJi && e && this.IsInTemplate) {
      var i, o;
      this.bJi(e.TemplateMode.CameraId),
        e.TargetPos &&
          (this.qJi(e.TargetPos),
          (i = Vector_1.Vector.Create(
            e.TargetPos.X,
            e.TargetPos.Y,
            e.TargetPos.Z,
          )),
          (o = Rotator_1.Rotator.Create(
            e.TargetPos.Pitch ?? 0,
            e.TargetPos.A ?? 0,
            e.TargetPos.Roll ?? 0,
          )),
          this.rJi.SetRotation(o.Quaternion()),
          this.rJi.SetLocation(i),
          this.rJi.SetScale3D(Vector_1.Vector.OneVectorProxy),
          (this.nJi = e.TargetPos.A),
          0 === o.Pitch && 0 === o.Roll ? (this.lpc = !0) : (this.lpc = !1));
      let t = !1;
      e.ActorIndexArray && ((t = !0), (this.mJi = e.ActorIndexArray)),
        this.mJi
          ? ((i = e.CameraPosAndRot
              ? Transform_1.Transform.Create(
                  Rotator_1.Rotator.Create(
                    e.CameraPosAndRot.CameraRotate.Y,
                    e.CameraPosAndRot.CameraRotate.Z,
                    e.CameraPosAndRot.CameraRotate.X,
                  ).Quaternion(),
                  Vector_1.Vector.Create(
                    e.CameraPosAndRot.CameraOffset.X,
                    e.CameraPosAndRot.CameraOffset.Y,
                    e.CameraPosAndRot.CameraOffset.Z,
                  ),
                  Vector_1.Vector.OneVectorProxy,
                )
              : void 0),
            (o = this.GJi(t)),
            this.NJi(),
            this.OJi(i, e.CameraSetting),
            this.PlayCameraAnimCompatible(e.CameraAnim),
            await o)
          : ControllerHolder_1.ControllerHolder.FlowController.LogError(
              "没有演员列表啊，前面也没有",
            );
    }
  }
  bJi(t) {
    var e;
    (this.iJi = ModelManager_1.ModelManager.PlotModel.GetPlotTemplateConfig(t)),
      this.iJi
        ? (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 26, "演出模板", [
              "TemplateName",
              this.iJi.Name,
            ]),
          (e = this.vJi.exec(this.iJi.Name)),
          (this.uJi =
            null !== e && 0 < e.length
              ? parseInt(e[0]) - 1
              : ACTOR_EMPTY_INDEX),
          (e = this.MJi.exec(this.iJi.Name)),
          (this.cJi = null !== e && 0 < e.length ? e[0] : "UNDEFINED"))
        : ControllerHolder_1.ControllerHolder.FlowController.LogError(
            "C级演出模板配置读取失败",
            ["Id", t],
          );
  }
  async GJi(e) {
    let i = void 0;
    var o = this.iJi.ActorDataArray,
      s = Vector_1.Vector.Create(0, 0, 0),
      r = Vector_1.Vector.Create(0, 0, 0),
      a = new UE.VectorDouble(0, 0, 0),
      _ = new UE.Rotator(0, 0, 0),
      h = Vector_1.Vector.Create(0, 0, 0),
      t =
        ((this.fJi.X = 0),
        (this.fJi.Y = 0),
        (this.fJi.Z = 0),
        Time_1.Time.Frame);
    this.nx.IsBackground ||
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 26, "剧情切镜飘带处理 -关闭", ["frame", t]),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Kuro.DisableKawaiiSimulate 1",
      ),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.InvalidSeveralFrameOcculusion 5",
      ));
    for (
      let t = 0;
      t < o.length && !(t >= this.mJi.length || t >= this.DJi.length);
      t++
    ) {
      var n = this.mJi[t];
      if (!(n.Index === ACTOR_EMPTY_INDEX || n.Index >= this.DJi.length)) {
        var l = this.DJi[n.Index];
        if (l.Valid) {
          if (!l.PositionLocked) {
            var m = EntitySystem_1.EntitySystem.Get(l.EntityId)?.GetComponent(
              3,
            );
            if (m) {
              this.lpc
                ? (e && n.Offset
                    ? (this.qJi(n.Offset),
                      (a.X = n.Offset.X),
                      (a.Y = n.Offset.Y),
                      (a.Z = n.Offset.Z),
                      (_.Yaw = ((n.Offset.A + 180) % 360) - 180),
                      (_.Roll = 0),
                      (_.Pitch = 0),
                      r.FromUeVector(a))
                    : ((c = o[t]),
                      s.Set(c.X, c.Y, 0),
                      this.rJi.TransformPosition(s, r),
                      a.Set(r.X, r.Y, r.Z),
                      (_.Yaw = ((c.A + this.nJi + 180) % 360) - 180),
                      (_.Roll = 0),
                      (_.Pitch = 0)),
                  (c = a.Z),
                  this.kJi(Vector_1.Vector.Create(a), m),
                  (h.X = 0),
                  (h.Y = 0),
                  (h.Z = a.Z - c),
                  (a.Z +=
                    m.Actor.CapsuleComponent.GetScaledCapsuleHalfHeight()))
                : (e && n.Offset
                    ? (this.qJi(n.Offset),
                      (a.X = n.Offset.X),
                      (a.Y = n.Offset.Y),
                      (a.Z = n.Offset.Z),
                      (_.Roll = ((n.Offset.Roll + 180) % 360) - 180),
                      (_.Pitch = ((n.Offset.Pitch + 180) % 360) - 180),
                      (_.Yaw = ((n.Offset.A + 180) % 360) - 180),
                      r.FromUeVector(a))
                    : ((v = o[t]),
                      s.Set(v.X, v.Y, 0),
                      this.rJi.TransformPosition(s, r),
                      a.Set(r.X, r.Y, r.Z),
                      (v = Rotator_1.Rotator.Create(0, v.A, 0)),
                      (d = Rotator_1.Rotator.Create(0, 0, 0)),
                      this.rJi.TransformRotation(v, d),
                      (_.Roll = ((d.Roll + 180) % 360) - 180),
                      (_.Pitch = ((d.Pitch + 180) % 360) - 180),
                      (_.Yaw = ((d.Yaw + 180) % 360) - 180)),
                  (v = Vector_1.Vector.Create(a)),
                  (d = Vector_1.Vector.Create(a)),
                  this.kJi(d, m),
                  d.Subtraction(v, h),
                  (M = _.RotateVectorDouble(
                    new UE.VectorDouble(
                      0,
                      0,
                      m.Actor.CapsuleComponent.GetScaledCapsuleHalfHeight(),
                    ),
                  )),
                  (a.X += M.X),
                  (a.Y += M.Y),
                  (a.Z += M.Z));
              var c,
                v,
                d,
                M = this.FJi(l.Pos, a.X, a.Y, a.Z, _.Yaw);
              if (
                ((l.Pos.X = a.X),
                (l.Pos.Y = a.Y),
                (l.Pos.Z = a.Z),
                (l.Pos.A = _.Yaw),
                (l.Pos.Roll = _.Roll),
                (l.Pos.Pitch = _.Pitch),
                !this.nx.IsBackground)
              )
                if (
                  (!l.IsPlayer() &&
                    m.HasMesh() &&
                    (m.SkeletalMesh.bForceTickThisFrame = !0),
                  t === this.uJi &&
                    (Log_1.Log.CheckDebug() &&
                      Log_1.Log.Debug("Plot", 26, "演员位", [
                        "station",
                        this.uJi,
                      ]),
                    (this.fJi = h)),
                  M)
                )
                  Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug("Plot", 26, "位置相同，略了", [
                      "id",
                      l.PbDataId,
                    ]);
                else {
                  if (l.IsPlayer()) {
                    if (this.VJi(l.OriginPos, l.Pos)) {
                      i =
                        TeleportController_1.TeleportController.TeleportToPositionNoLoading(
                          a,
                          _,
                          "剧情演出.SetupTemplateActor",
                        );
                      continue;
                    }
                    m.Actor.CharacterMovement &&
                      m.Actor.KuroSetMovementMode({
                        Mode: m.Actor.CharacterMovement.DefaultLandMovementMode,
                        Context: "[PlotTemplate.SetupTemplateActor]",
                      });
                  }
                  m.FixBornLocation("剧情演出.SetupTemplateActor", !0, r, !1),
                    m.SetActorRotation(_, "剧情演出.SetupTemplateActor", !1),
                    m.SetInputRotator(_);
                }
            } else
              Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Plot",
                  26,
                  "无法获取实体CharacterActorComponent",
                  ["PbDataId", l.PbDataId],
                );
          }
        } else
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Plot", 26, "演员无效", ["演员位置", n.Index]);
      }
    }
    return (
      void 0 !== i && (await i),
      this.nx.IsBackground ||
        ((this.iNn = new CustomPromise_1.CustomPromise()),
        (this.tNn = t + 3),
        await this.iNn.Promise),
      !0
    );
  }
  rNn() {
    var t;
    !this.iNn ||
      (t = Time_1.Time.Frame) < this.tNn ||
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 26, "剧情切镜飘带处理 -开启", ["curFrame", t]),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Kuro.DisableKawaiiSimulate 0",
      ),
      (t = this.iNn),
      (this.tNn = -1),
      (this.iNn = void 0),
      t.SetResult());
  }
  FJi(t, e, i, o, s) {
    return (
      MathUtils_1.MathUtils.IsNearlyEqual(t.X, e, 1) &&
      MathUtils_1.MathUtils.IsNearlyEqual(t.Y, i, 1) &&
      MathUtils_1.MathUtils.IsNearlyEqual(t.Z, o, 1) &&
      MathUtils_1.MathUtils.IsNearlyEqual(t.A, s, 1)
    );
  }
  VJi(t, e) {
    (t = Vector_1.Vector.Create(t)), (e = Vector_1.Vector.Create(e));
    return Vector_1.Vector.DistSquared(t, e) > MAX_POS_DIST_SQ;
  }
  OJi(i, e) {
    if (!this.nx.IsBackground) {
      this.LJi.Stop();
      var o = this.iJi.CameraData;
      let t = i;
      if (!t) {
        var i = Vector_1.Vector.Create(o.Pos.X, o.Pos.Y, o.Pos.Z),
          s = Rotator_1.Rotator.Create(o.Rot.Y, o.Rot.Z, o.Rot.X);
        if (
          ("_CU" === this.cJi || "_MS" === this.cJi) &&
          0 <= this.uJi &&
          this.uJi < this.mJi.length
        ) {
          var r = this.mJi[this.uJi].Index;
          let e = 0;
          if (r !== ACTOR_EMPTY_INDEX) {
            r = this.DJi[r];
            let t =
              EntitySystem_1.EntitySystem.Get(r.EntityId)
                ?.GetComponent(3)
                ?.Actor.Mesh.D_GetSocketTransform(PlotTemplate.HJi, 2)
                ?.GetLocation().Z ?? DEFAULT_CAMERA_BASE;
            e =
              0 === t
                ? 0 !==
                  (t =
                    EntitySystem_1.EntitySystem.Get(r.EntityId)
                      ?.GetComponent(3)
                      ?.Actor.Mesh.D_GetSocketTransform(PlotTemplate.jJi, 2)
                      ?.GetLocation().Z ?? DEFAULT_CAMERA_BASE_HEAD)
                  ? t - DEFAULT_CAMERA_BASE_HEAD
                  : 0
                : t - DEFAULT_CAMERA_BASE;
            r = Vector_1.Vector.Create(0, 0, e);
            this.lpc ||
              ((a = Vector_1.Vector.Create(0, 0, 0)),
              this.rJi.TransformVector(r, a),
              r.DeepCopy(a)),
              (this.fJi.X += r.X),
              (this.fJi.Y += r.Y),
              (this.fJi.Z += r.Z),
              (i.X += this.fJi.X),
              (i.Y += this.fJi.Y),
              (i.Z += this.fJi.Z),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Plot", 26, "CU、MS相机自动调整", [
                  "Offset",
                  this.fJi,
                ]);
          }
        }
        var a = Transform_1.Transform.Create(
          s.Quaternion(),
          i,
          Vector_1.Vector.OneVectorProxy,
        );
        (t = Transform_1.Transform.Create()), a.ComposeTransforms(this.rJi, t);
      }
      (r =
        CameraController_1.CameraController.SequenceCamera.GetComponent(
          9,
        ).CineCamera),
        (s = r.CameraComponent);
      ObjectUtils_1.ObjectUtils.IsValid(r) &&
        (r.D_K2_SetActorTransform(t.ToUeTransform(), !1, void 0, !0),
        r.ResetSeqCineCamSetting(),
        e
          ? ((s.CurrentAperture = e.Aperture),
            (s.CurrentFocalLength = e.FocalLength),
            (s.FocusSettings.ManualFocusDistance = e.FocusDistance),
            (s.CurrentFocalRegion = e.FocalRegion))
          : (o.Aperture && (s.CurrentAperture = o.Aperture),
            o.FocalLength && (s.CurrentFocalLength = o.FocalLength),
            o.FocusDistance &&
              (s.FocusSettings.ManualFocusDistance = o.FocusDistance),
            o.FocalRegion && (s.CurrentFocalRegion = o.FocalRegion)),
        this.WJi());
    }
  }
  WJi() {
    for (const t of this.DJi)
      t.Valid &&
        t.Visible &&
        EntitySystem_1.EntitySystem.Get(t.EntityId)
          ?.GetComponent(175)
          ?.StartForceDisableAnimOptimization(0);
  }
  async EndTemplateNew(t) {
    this.IsInTemplate &&
      (this.LJi.Stop(),
      this.yia.CleanAction(!1),
      this.m8a.CleanAction(!1),
      this.EJi ||
        (ModelManager_1.ModelManager.PlotModel.SwitchCameraMode(1),
        CameraController_1.CameraController.FightCamera.LogicComponent.ResetArmLengthAndRotation(
          ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.PlotTemplateCameraExitRotation.ToUeRotator(),
        ),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.MotionBlur.Amount " + this.yJi,
        )),
      this.AWl &&
        ControllerHolder_1.ControllerHolder.PlotController.RestoreChangeRole(),
      (t = this.Lc(t)),
      this.nx.IsBackground || (await t),
      this.hJi.forEach((t) => {
        TimerSystem_1.TimerSystem.Remove(t);
      }),
      this.hJi.clear(),
      this.lJi.forEach((t) => {
        TimerSystem_1.TimerSystem.Remove(t);
      }),
      this.lJi.clear(),
      this.ZYi.clear(),
      (this.fJi.X = 0),
      (this.fJi.Y = 0),
      (this.fJi.Z = 0),
      (this.iJi = void 0),
      this.rJi.Reset(),
      (this.nJi = 0),
      (this.lpc = !0),
      (this.dJi = PLAYER_UNUSED_INDEX),
      (this.oJi = !1),
      (this.SJi = 0),
      this.AM1.clear(),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Kuro.DisableKawaiiSimulate 0",
      ));
  }
  async Lc(e) {
    e?.EndState?.StayFlowMontageActors?.forEach((t) => {
      this.DJi[t].IsMontageKeep = !0;
    });
    var i = [];
    for (let t = 0; t < this.DJi.length; t++) {
      var o = this.DJi[t];
      if (o.Valid) {
        var s = EntitySystem_1.EntitySystem.Get(o.EntityId),
          r = s?.GetComponent(3);
        if (r) {
          r.ClearInput(),
            ModelManager_1.ModelManager.WorldModel.RemoveIgnore(r.Actor),
            o.Visible ||
              ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
                s,
                !0,
                "[PlotTemplate.ReleaseActor] 恢复模板演出实体显隐",
              ),
            o.MouseMontageLoadingId !==
              ResourceSystem_1.ResourceSystem.InvalidId &&
              (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(
                o.MouseMontageLoadingId,
              ),
              (o.MouseMontageLoadingId =
                ResourceSystem_1.ResourceSystem.InvalidId));
          var a = s.GetComponent(175),
            _ = a?.MainAnimInstance,
            _ =
              (ObjectUtils_1.ObjectUtils.IsValid(_) &&
                (a.ResetSightLimit(), a.SetSightTargetItem(void 0)),
              s.GetComponent(67));
          _?.Valid &&
            o.OriginMoveSync &&
            _.SetEnableMovementSync(!0, "PlotTemplate");
          const h = s?.GetComponent(222);
          h &&
            o.QueHandleIds.forEach((t) => {
              t !== GameplayCueController_1.INVALID_CUE_HANDLE &&
                h.RemoveCueByHandle(t);
            }),
            t === this.dJi
              ? (this.EJi ||
                  r.Actor.CharRenderingComponent?.SetDisableFightDither(!1),
                o.IsMontageKeep ||
                  a.MontageManager.StopMontage({
                    Method: 0,
                    BlendOutTime: MONTAGE_BLEND_OUT_TIME,
                  }))
              : (NpcPerformController_1.NpcPerformController.ForceSetNpcDitherVisible(
                  !1,
                  o.PbDataId,
                  1,
                ),
                (_ = s?.GetComponent(46))?.Valid &&
                  o.OriginEnableAi &&
                  _.EnableAi("Plot Control Ai"),
                (_ = s.GetComponent(185))?.Valid &&
                  (o.OriginEnableLookAt && _.SetLookAtPlayerEnabled(!0),
                  o.IsMontageKeep ||
                    _.StopPerformMontage(1, {
                      Method: 0,
                      BlendOutTime: MONTAGE_BLEND_OUT_TIME,
                    }),
                  _.OnNpcInPlot(!1)),
                r.Actor.KuroSetMovementMode({
                  Mode: o.OriginMoveMode,
                  Context: "[PlotTemplate.ReleaseActor]",
                }),
                a.SetBlendSpaceLookAt(!1),
                (_ = s.GetComponent(0).GetModelConfig()),
                (ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(_.DA) &&
                  !StringUtils_1.StringUtils.IsEmpty(
                    _.DA.AssetPathName?.toString(),
                  ) &&
                  "None" !== _.DA.AssetPathName?.toString()) ||
                  ((a = r.SkeletalMesh.SkeletalMesh),
                  UE.KuroMeshTextureFunctionLibrary.HandleSkeletalMeshComponentStreaming(
                    a,
                    !1,
                  ))),
            i.push(this.KJi(o, e?.IsResetPosition)),
            o.Reset();
        } else
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Plot",
              26,
              "模板结束时无法获取实体CharacterActorComponent",
              ["EntityId", o.EntityId],
              ["PbDataId", o.PbDataId],
            );
      }
    }
    await Promise.all(i);
  }
  async KJi(e, i = !1) {
    if (
      !ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode() &&
      (e.IsPlayer() || !e.PositionLocked)
    ) {
      var o = Vector_1.Vector.Create(),
        s = new UE.Rotator(0, 0, 0);
      let t = !1;
      i && e.IsPosReset
        ? ((s.Yaw = e.OriginPos.A),
          (s.Roll = e.OriginPos.Roll),
          (s.Pitch = e.OriginPos.Pitch),
          o.Set(e.OriginPos.X, e.OriginPos.Y, e.OriginPos.Z),
          (t = !0))
        : this.nx.IsBackground &&
          ((s.Yaw = e.Pos.A),
          (s.Roll = e.Pos.Roll),
          (s.Pitch = e.Pos.Pitch),
          o.Set(e.Pos.X, e.Pos.Y, e.Pos.Z),
          (t = !0)),
        t &&
          ((i = EntitySystem_1.EntitySystem.Get(e.EntityId).GetComponent(3)),
          this.EJi
            ? i.SetInputRotator(s)
            : e.IsPlayer()
              ? await TeleportController_1.TeleportController.TeleportToPositionNoLoading(
                  o.ToUeVector(),
                  s,
                  "模板演出结束设置位置",
                  !1,
                )
              : (i.SetActorRotation(s, "模板演出结束设置位置", !1),
                i.SetInputRotator(s),
                i.FixBornLocation("模板演出结束设置位置", !0, o, !1)));
    }
  }
  RJi(t, e) {
    const i = new Array();
    this.dJi = PLAYER_UNUSED_INDEX;
    for (const o of t)
      o !== PLAYER_USED_ID ? i.push(o) : (this.dJi = t.indexOf(o));
    this.AWl && PlotController_1.PlotController.RequestChangeRole(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 17, "剧情加载等待-npc-开始", ["", i]),
      WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(
        "PlotTemplate.WaitActor",
        i,
        (t) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 17, "剧情加载等待-npc-完成", ["result", t]),
            this.$In(i, e);
        },
        WAIT_ENTITY_TIME,
      );
  }
  $In(t, o) {
    const s = new Map();
    for (const r of t) {
      var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r);
      if (e?.IsInit) {
        var i = e.Entity.GetComponent(0)?.GetModelConfig();
        if (i) {
          if (ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(i.DA)) {
            i = i.DA.AssetPathName?.toString();
            if (i?.length && "None" !== i) continue;
          }
          i = e.Entity.GetComponent(3)?.SkeletalMesh?.SkeletalMesh;
          ObjectUtils_1.ObjectUtils.IsValid(i) && s.set(i, !1);
        }
      }
    }
    0 === s.size
      ? o()
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Plot", 26, "剧情加载等待 npc纹理流送 开始", [
            "size",
            s.size,
          ]),
        (this.a9s = 0),
        (this.xJt = TimerSystem_1.TimerSystem.Forever(() => {
          this.a9s++;
          let t = !0;
          for (var [e, i] of s)
            i ||
              (UE.KuroMeshTextureFunctionLibrary.IsSkeletalMeshComponentStreamingComplete(
                e,
              )
                ? s.set(e, !0)
                : (t = !1));
          (t || 15 < this.a9s) &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Plot", 26, "剧情加载等待 npc纹理流送 完成", [
                "checkTimes",
                this.a9s,
              ]),
            (this.a9s = 0),
            this.xJt?.Remove(),
            (this.xJt = void 0),
            o());
        }, 200)));
  }
  qJi(t) {
    return !(
      !t ||
      ((t.A = t.A ?? 0),
      (t.X = t.X ?? 0),
      (t.Y = t.Y ?? 0),
      (t.Z = t.Z ?? 0),
      void 0 === t.A) ||
      void 0 === t.X ||
      void 0 === t.Y ||
      void 0 === t.Z ||
      isNaN(t.A) ||
      isNaN(t.X) ||
      isNaN(t.Y) ||
      isNaN(t.Z)
    );
  }
  PlayCameraAnimCompatible(t) {
    t &&
      !this.nx.IsBackground &&
      this.LJi.Play({
        Type: IAction_1.EShowTalkCameraMotionType.Preset,
        CamShake: {
          CameraShakeBp:
            ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
              .TemplateCameraShakePath,
        },
      });
  }
  async HandleTemplateShowTalk(t) {
    var e, i;
    this.IsInTemplate &&
      (t.CameraData &&
        Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Plot", 26, "旧演出模板已废弃"),
      t.FlowTemplateList || t.FlowTemplate
        ? ((e = []),
          t.FlowTemplateList && e.push(...t.FlowTemplateList),
          t.FlowTemplate && e.push(t.FlowTemplate),
          e.sort((t, e) => (t.DelayTime ?? 0) - (e.DelayTime ?? 0)),
          (i =
            !!e[0].DelayTime &&
            e[0].DelayTime > TimerSystem_1.MIN_TIME &&
            e[0].DelayTime < TimerSystem_1.MAX_TIME),
          this.z2_.CleanAction(i),
          this.J2_(e))
        : this.z2_.CleanAction(!0),
      this.Y2_ && (await this.Y2_),
      this.JJi(t),
      this.QJi(t.WhoId, t.ActorTurnToArray),
      this.nx.IsBackground ||
        (this.XJi(t.WhoId, t.ActorLookAtArray, "Option" === t.Type),
        this.$Ji(t.ActorMontageArray)));
  }
  J2_(e) {
    for (let t = 0; t < e.length; t++) {
      const o = e[t];
      var i = o.DelayTime
        ? o.DelayTime * CommonDefine_1.MILLIONSECOND_PER_SECOND
        : 0;
      this.z2_.DelayAction(
        0,
        i,
        () => {
          this.Z2_(o);
        },
        t === e.length - 1,
      );
    }
  }
  Z2_(t) {
    if (t)
      if (this.Y2_)
        this.Y2_.finally(() => {
          this.Z2_(t);
        });
      else {
        const e = new CustomPromise_1.CustomPromise();
        (this.Y2_ = e.Promise),
          TimerSystem_1.TimerSystem.Next(() => {
            this.SetTemplateNew(t).finally(() => {
              (this.Y2_ = void 0), e.SetResult();
            });
          });
      }
  }
  JJi(t) {
    let e = void 0;
    switch (t.Type) {
      case "Talk":
      case "Option":
        e = t.CameraMotion;
    }
    e && this.LJi.Play(e);
  }
  XJi(t, e, i) {
    this.yia.CleanAction();
    let o = void 0,
      s = void 0;
    i
      ? this.dJi !== PLAYER_UNUSED_INDEX &&
        ((o = this.DJi[this.dJi]),
        (s =
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
            3,
          )))
      : ((o = this.aJi.get(t)),
        (s = o?.Valid
          ? EntitySystem_1.EntitySystem.Get(o.EntityId)?.GetComponent(3)
          : void 0)),
      s?.Valid ||
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Plot",
            26,
            "说话人未在模板内，可能会导致演员看向错误",
          ));
    const r = new Map();
    e?.forEach((t) => {
      var e;
      r.has(t.ActorIndex)
        ? ((e = r.get(t.ActorIndex)).push(t),
          e.sort((t, e) => (t.DelayTime ?? 0) - (e.DelayTime ?? 0)))
        : ((e = new Array()).push(t), r.set(t.ActorIndex, e));
    });
    for (const n of this.DJi) {
      var a;
      !n.Valid ||
        n.Visible ||
        n.LookLocked ||
        ((a = EntitySystem_1.EntitySystem.Get(n.EntityId)?.GetComponent(175))
          ?.Valid &&
          (a.ResetSightLimit(), a.SetSightTargetItem(void 0)));
    }
    for (const l of this.mJi)
      if (l.Index !== ACTOR_EMPTY_INDEX) {
        var _,
          h = this.DJi[l.Index];
        if (h.Valid) {
          const m = EntitySystem_1.EntitySystem.Get(h.EntityId)?.GetComponent(
            175,
          );
          m?.Valid &&
            ((_ = h.LookLocked),
            (r.has(l.Index) && this.Iia(m, r.get(l.Index), h, o)) ||
              _ ||
              ("_CU" === this.cJi && l === this.mJi[this.uJi]
                ? (m.ResetSightLimit(), m.SetSightTargetItem(void 0))
                : h.Visible &&
                  h.Valid &&
                  (o?.Visible && o?.Valid
                    ? h === o
                      ? m.GetSightTargetPoint() ||
                        this.zJi(m.GetSightTargetItem()) ||
                        (m.ResetSightLimit(), m.SetSightTargetItem(void 0))
                      : ((_ =
                          ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
                            .PlotTemplateLookAtDelay),
                        (_ = MathUtils_1.MathUtils.GetRandomRange(_[0], _[1])),
                        this.yia.DelayAction(
                          h.EntityId,
                          _,
                          () => {
                            m.ResetSightLimit(), m.SetSightTargetItem(s);
                          },
                          !1,
                        ))
                    : (m.ResetSightLimit(), m.SetSightTargetItem(void 0)))));
        }
      }
  }
  Iia(i, t, o, s) {
    const r = t.length - 1;
    if (r < 0) return !1;
    let a = !1;
    return (
      t.forEach((t, e) => {
        (a ||=
          (t.DelayTime ?? 0) * CommonDefine_1.MILLIONSECOND_PER_SECOND <
          TimerSystem_1.MIN_TIME),
          this.wJi(i, t.Target, o, s, t.DelayTime, e === r);
      }),
      a
    );
  }
  wJi(e, t, i, o, s = 0, r) {
    let a = void 0,
      _ = !1;
    switch (t.Type) {
      case 3: {
        var h = t;
        const l = Vector_1.Vector.Create(
          h.Pos.X ?? 0,
          h.Pos.Y ?? 0,
          h.Pos.Z ?? 0,
        );
        (_ = h.Lock ?? !1),
          (a = () => {
            e.SetSightLimit([-90, 90], [-90, 90]), e.SetSightTargetPoint(l);
          });
        break;
      }
      case 2:
        var h = t,
          n = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
            h.EntityId,
          );
        if (n?.IsInit) {
          const m = n.Entity.GetComponent(3) ?? n.Entity.GetComponent(200);
          (_ = h.Lock ?? !1),
            (a = () => {
              e.ResetSightLimit(), e.SetSightTargetItem(m);
            });
        } else
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Plot", 26, "看向的实体不存在", [
              "pbdataid",
              h.EntityId,
            ]);
        break;
      case 1:
        (_ = t.Lock ?? !1),
          (a = () => {
            e.ResetSightLimit(), e.SetSightTargetItem(void 0);
          });
        break;
      case 4: {
        n = t;
        const c =
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
            3,
          );
        (_ = n.Lock ?? !1),
          (a = () => {
            e.ResetSightLimit(), e.SetSightTargetItem(c);
          });
        break;
      }
      case 0:
      case 5: {
        let t = void 0;
        o &&
          i !== o &&
          (t = EntitySystem_1.EntitySystem.Get(o.EntityId)?.GetComponent(3)),
          (_ = !1),
          (a = () => {
            e.ResetSightLimit(), e.SetSightTargetItem(t);
          });
        break;
      }
      case 6:
        h = t;
        if (
          0 <= h.ActorIndex &&
          h.ActorIndex < this.DJi.length &&
          this.DJi[h.ActorIndex].Valid
        ) {
          const v = EntitySystem_1.EntitySystem.Get(
            this.DJi[h.ActorIndex].EntityId,
          )?.GetComponent(1);
          (_ = h.Lock ?? !1),
            (a = () => {
              e.ResetSightLimit(), e.SetSightTargetItem(v);
            });
        }
    }
    a &&
      ((i.LookLocked = _),
      (s = (s ?? 0) * CommonDefine_1.MILLIONSECOND_PER_SECOND) >
      TimerSystem_1.MIN_TIME
        ? this.yia.DelayAction(i.EntityId, s, a, _)
        : a());
  }
  zJi(t) {
    if (!t) return !1;
    if ((0, RegisterComponent_1.isComponentInstance)(t, 3))
      for (const e of this.DJi)
        if (!e.Visible && e.Valid)
          if (
            EntitySystem_1.EntitySystem.Get(e.EntityId)?.GetComponent(3) === t
          )
            return !1;
    return !0;
  }
  $Ji(t) {
    this.m8a.CleanAction(), this.hJi.clear();
    for (const a of this.DJi)
      a.OverlayMontageKeeping || (a.OverlayMontagePath = void 0),
        (a.MontageBlendToEnd = !1),
        a.MouseMontageLoadingId !== ResourceSystem_1.ResourceSystem.InvalidId &&
          (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(
            a.MouseMontageLoadingId,
          ),
          (a.MouseMontageLoadingId =
            ResourceSystem_1.ResourceSystem.InvalidId)),
        EntitySystem_1.EntitySystem.Get(a.EntityId)
          ?.GetComponent(175)
          ?.MainAnimInstance?.StopSlotAnimation(
            0,
            SequenceDefine_1.ABP_Mouth_Slot_Name,
          );
    var e = new Set();
    if (t) {
      var i = [...t],
        o =
          (i.sort((t, e) => (t.DelayTime ?? 0) - (e.DelayTime ?? 0)),
          new Set());
      for (let t = i.length - 1; 0 <= t; t--) {
        var s = i[t];
        o.has(s.ActorIndex)
          ? (s.KeepPose = !1)
          : (s.KeepPose ?? s.EndLoopingMontage ?? s.EndMontageDirectly) &&
            ((s.KeepPose = !0), o.add(s.ActorIndex), (s.KeepPose = !0));
      }
      for (const _ of i)
        if (!(_.ActorIndex < 0 || _.ActorIndex >= ACTOR_NUM_MAX)) {
          const h = this.DJi[_.ActorIndex];
          if (h.Valid && h.Visible) {
            var r = _.DelayTime
              ? TimeUtil_1.TimeUtil.SetTimeMillisecond(_.DelayTime)
              : 0;
            if (r <= TimerSystem_1.MIN_TIME) {
              if (_.EndMontageDirectly) {
                (h.MontageKeeping = !1),
                  (h.OverlayMontageKeeping = !1),
                  (h.MontageBlendToEnd = !0);
                continue;
              }
              if (_.EndLoopingMontage) {
                (h.MontageKeeping = !1),
                  (h.OverlayMontageKeeping = !1),
                  (h.MontageBlendToEnd = !1);
                continue;
              }
              this.ZJi(h, _), e.add(h);
            } else {
              if (_.EndMontageDirectly) {
                this.m8a.DelayAction(
                  h.PbDataId,
                  r,
                  () => {
                    (h.MontageKeeping = !1),
                      (h.OverlayMontageKeeping = !1),
                      (h.MontageBlendToEnd = !0),
                      this.tzi(h);
                  },
                  _.KeepPose ?? !1,
                );
                continue;
              }
              if (_.EndLoopingMontage) {
                this.m8a.DelayAction(
                  h.PbDataId,
                  r,
                  () => {
                    (h.MontageKeeping = !1),
                      (h.OverlayMontageKeeping = !1),
                      (h.MontageBlendToEnd = !1),
                      this.tzi(h);
                  },
                  _.KeepPose ?? !1,
                );
                continue;
              }
              this.m8a.DelayAction(
                h.PbDataId,
                r,
                () => {
                  this.ZJi(h, _);
                },
                _.KeepPose ?? !1,
              );
            }
            if (_.OverlayMontage) {
              r = _.OverlayMontage?.DelayTime
                ? TimeUtil_1.TimeUtil.SetTimeMillisecond(
                    _.OverlayMontage.DelayTime,
                  )
                : 0;
              if (r <= TimerSystem_1.MIN_TIME) this.ezi(h, _, !1);
              else {
                const n = TimerSystem_1.TimerSystem.Delay(() => {
                  this.ezi(h, _, !0), this.hJi.delete(n);
                }, r);
                this.hJi.add(n);
              }
            }
          }
        }
    }
    for (const l of this.DJi)
      l.Valid &&
        l.Visible &&
        (e.has(l) || this.tzi(l),
        this.izi(l),
        this.BJi(l.OverlayMontagePath, (t) => {
          this.rzi(l, t);
        }));
  }
  ezi(e, i, o) {
    if (void 0 !== i.OverlayMontage?.MontageId.MontageId) {
      var s =
        i.ActorIndex === this.dJi
          ? this.PJi(i.OverlayMontage.MontageId.MontageId)
          : i.OverlayMontage.MontageId.MontageId;
      let t = void 0;
      (t = i.OverlayMontage.MontageId.IsAbp
        ? ModelManager_1.ModelManager.PlotModel.GetOverlayAbpMontageConfig(s)
        : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(s))
        ? (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Plot",
              26,
              "模板演出蒙太奇播放",
              ["演员", e.PbDataId],
              ["蒙太奇", t],
            ),
          (e.OverlayMontagePath = t.ActionMontage),
          (e.OverlayMontageLooping = i.OverlayMontage.IsLoop ?? !1),
          (e.OverlayMontageKeeping = i.OverlayMontage.KeepPose ?? !1),
          o &&
            (this.izi(e),
            this.BJi(e.OverlayMontagePath, (t) => {
              this.rzi(e, t);
            })))
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Plot", 26, "模板蒙太奇库中没有该资源", ["Id", s]);
    }
  }
  ZJi(e, i) {
    if (void 0 !== i.MontageId) {
      var o = i.ActorIndex === this.dJi ? this.PJi(i.MontageId) : i.MontageId;
      let t = void 0;
      (t = i.IsAbpMontage
        ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(o)
        : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(o))
        ? (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Plot",
              26,
              "模板演出蒙太奇播放",
              ["演员", e.PbDataId],
              ["蒙太奇", t],
            ),
          (e.BodyMontagePath = t.ActionMontage),
          (e.MontageLooping = i.IsLoop ?? !1),
          (e.MontageKeeping = i.KeepPose ?? !1),
          (e.FaceExpressionId = i.FaceExpressionId),
          this.ij_(e, {
            MontageAsset: this.AM1.get(e.BodyMontagePath),
            IsLoop: e.MontageLooping,
            OnPlayCallback: (t) => {
              (e.BodyMontage = t),
                e.FaceChangeManager?.ResetFacialExpressionOuter(),
                e.FaceChangeManager?.ChangeFaceForExpression(
                  t,
                  e.FaceExpressionId,
                );
            },
            KeepOtherMontage: !0,
          }))
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Plot", 26, "模板蒙太奇库中没有该资源", ["Id", o]);
    }
  }
  async xJi(e, i) {
    const o = new CustomPromise_1.CustomPromise(),
      s =
        (ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.AnimMontage, (t) => {
          t?.IsValid() && this.AM1.set(i, t), o.SetResult();
        }),
        await o.Promise,
        new CustomPromise_1.CustomPromise());
    return (
      this.ij_(e, {
        MontageAsset: this.AM1.get(i),
        IsLoop: !0,
        InSectionToStartMontageAt:
          CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
        OnPlayCallback: (t) => {
          (e.BodyMontage = t),
            (e.MontageLooping = !0),
            (e.MontageKeeping = !0),
            s.SetResult();
        },
        KeepOtherMontage: !0,
      }),
      s.Promise
    );
  }
  ij_(t, e) {
    var i = EntitySystem_1.EntitySystem.Get(t.EntityId);
    t.IsPlayer()
      ? i.GetComponent(43).MontageManager.PlayMontage(e)
      : i.GetComponent(45).PlayPerformMontage(1, e);
  }
  rj_(t, e) {
    var i = EntitySystem_1.EntitySystem.Get(t.EntityId);
    t.IsPlayer()
      ? i.GetComponent(43).MontageManager.StopMontage(e)
      : i.GetComponent(45).StopPerformMontage(1, e);
  }
  PJi(t) {
    return 1 === ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender()
      ? t + 1
      : t;
  }
  BJi(e, i) {
    var t;
    !e || StringUtils_1.StringUtils.IsEmpty(e)
      ? i(void 0)
      : ((t = this.ZYi.get(e)),
        ObjectUtils_1.ObjectUtils.IsValid(t)
          ? i(t)
          : ResourceSystem_1.ResourceSystem.LoadAsync(
              e,
              UE.AnimMontage,
              (t) => {
                this.IsInTemplate && (this.ZYi.set(e, t), i(t));
              },
            ));
  }
  $Ca(e, i) {
    if (
      !i
        .Montage_GetCurrentSection(e)
        .op_Equality(CharacterNameDefines_1.CharacterNameDefines.END_SECTION)
    ) {
      i.Montage_Stop(MONTAGE_BLEND_OUT_TIME, e);
      var o = e.CompositeSections,
        s = o.Num();
      for (let t = 0; t < s; t++) {
        var r = o.Get(t);
        if (
          r.SectionName.op_Equality(
            CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
          )
        ) {
          r = r.SegmentBeginTime;
          i.Montage_Play(e, void 0, void 0, r, !1),
            i.Montage_SetNextSection(
              CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
              CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
              e,
            );
          break;
        }
      }
    }
  }
  tzi(t) {
    var e = EntitySystem_1.EntitySystem.Get(t.EntityId)?.GetComponent(
      175,
    )?.MainAnimInstance;
    ObjectUtils_1.ObjectUtils.IsValid(e) &&
      !t.MontageKeeping &&
      (t.MontageBlendToEnd
        ? this.ij_(t, {
            MontageAsset: t.BodyMontage,
            InSectionToStartMontageAt:
              CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
            IsLoop: !1,
            KeepOtherMontage: !0,
          })
        : this.rj_(t, { Method: 1 }),
      (t.BodyMontage = void 0),
      (t.BodyMontagePath = void 0));
  }
  izi(t) {
    var e,
      i = EntitySystem_1.EntitySystem.Get(t.EntityId)?.GetComponent(
        175,
      )?.MainAnimInstance;
    ObjectUtils_1.ObjectUtils.IsValid(i) &&
      (ObjectUtils_1.ObjectUtils.IsValid(t.OverlayMontage) &&
      i.Montage_IsPlaying(t.OverlayMontage)
        ? StringUtils_1.StringUtils.IsEmpty(t.OverlayMontagePath)
          ? t.MontageBlendToEnd
            ? this.$Ca(t.OverlayMontage, i)
            : t.OverlayMontageKeeping ||
              (!(e = i.Montage_GetCurrentSection(t.OverlayMontage)).op_Equality(
                CharacterNameDefines_1.CharacterNameDefines.START_SECTION,
              ) &&
                !e.op_Equality(
                  CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
                )) ||
              i.Montage_SetNextSection(
                e,
                CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
                t.OverlayMontage,
              )
          : t.OverlayMontage !== this.ZYi.get(t.OverlayMontagePath) &&
            (i.Montage_Stop(MONTAGE_BLEND_OUT_TIME, t.OverlayMontage),
            (t.OverlayMontage = void 0))
        : (t.OverlayMontage = void 0));
  }
  rzi(t, e, i = 1) {
    var o;
    ObjectUtils_1.ObjectUtils.IsValid(e) &&
      this.IsInTemplate &&
      ((o = EntitySystem_1.EntitySystem.Get(t.EntityId)?.GetComponent(
        175,
      )?.MainAnimInstance),
      ObjectUtils_1.ObjectUtils.IsValid(o)) &&
      (this.ZYi.get(t.OverlayMontagePath) !== e
        ? Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Plot", 26, "异步加载完的蒙太奇过期了")
        : ((t.OverlayMontagePath = void 0),
          (o.Montage_IsPlaying(e) &&
            !o
              .Montage_GetCurrentSection(e)
              .op_Equality(
                CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
              )) ||
            o.Montage_Play(e, i, 0, 0, !1),
          (t.OverlayMontage = e),
          t.OverlayMontageLooping
            ? o.Montage_SetNextSection(
                CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
                CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
                e,
              )
            : o.Montage_SetNextSection(
                CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
                CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
                e,
              )));
  }
  koe() {
    (this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass())),
      (this.uoe.bIsSingle = !0),
      (this.uoe.bIgnoreSelf = !0),
      this.uoe.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround);
  }
  kJi(t, o) {
    this.uoe || this.koe();
    var e,
      i = o.Actor,
      s = i.CapsuleComponent,
      i =
        ((this.uoe.WorldContextObject = i),
        Vector_1.Vector.Create(0, 0, 2 * s.GetScaledCapsuleHalfHeight())),
      s = Vector_1.Vector.Create(0, 0, i.Z + FIX_TELEPORT_TRACE_DOWN),
      r =
        (this.lpc ||
          ((r = Quat_1.Quat.Create()),
          GravityUtils_1.GravityUtils.GetBaseQuatInGravityForActor(o, r),
          (e = Vector_1.Vector.Create()).DeepCopy(i),
          r.RotateVector(e, i),
          e.DeepCopy(s),
          r.RotateVector(e, s)),
        this.uoe.SetStartLocation(t.X + i.X, t.Y + i.Y, t.Z + i.Z),
        this.uoe.SetEndLocation(t.X + s.X, t.Y + s.Y, t.Z + s.Z),
        TraceElementCommon_1.TraceElementCommon.LineTrace(
          this.uoe,
          PROFILE_KEY,
        )),
      a = this.uoe.HitResult;
    if (r && a.bBlockingHit) {
      var _ = a.Actors.Num();
      let e = 0,
        i = void 0;
      for (let t = 0; t < _; t++)
        if (
          ((i = a.Actors.Get(t)),
          ObjectUtils_1.ObjectUtils.IsValid(i) &&
            !i.IsA(UE.Character.StaticClass()))
        ) {
          e = t;
          break;
        }
      (t.X = a.LocationX_Array.Get(e)),
        (t.Y = a.LocationY_Array.Get(e)),
        (t.Z = a.LocationZ_Array.Get(e)),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Plot",
            26,
            "实体剧情内修正地面",
            ["FixedActor", o.CreatureData.GetPbDataId()],
            ["Location", t],
            ["HitActor", i.GetName()],
          );
    }
    this.uoe.WorldContextObject = void 0;
  }
  NJi() {
    if (this.DJi && this.mJi) {
      const i = new Map();
      this.mJi.forEach((t) => {
        t.Index !== ACTOR_EMPTY_INDEX && i.set(t.Index, t);
      }),
        this.DJi.forEach((t, e) => {
          t.Valid &&
            ((this._Ji.Visible = i.has(e)),
            (this._Ji.UseEffect = !1),
            t.Visible !== this._Ji.Visible) &&
            ((t.Visible = this._Ji.Visible), this.nzi(t, this._Ji));
        });
    }
  }
  nzi(t, e) {
    var t = EntitySystem_1.EntitySystem.Get(t.EntityId),
      i = t?.GetComponent(3);
    i?.Valid && e
      ? e.Visible
        ? (ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
            t,
            !0,
            "[PlotTemplate.ShowActor] 显示模板剧情实体",
          ),
          e.UseEffect &&
            i.Actor.DitherEffectController.EnterAppearEffect(
              DITHER_RATE_PER_SECOND,
              1,
              !0,
            ))
        : (ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
            t,
            !1,
            "[PlotTemplate.ShowActor] 隐藏演出的实体",
          ),
          (t = t.GetComponent(175))?.Valid &&
            t.MainAnimInstance.Montage_Stop(0),
          e.UseEffect &&
            i.Actor.DitherEffectController.EnterDisappearEffect(
              DITHER_RATE_PER_SECOND,
              1,
            ))
      : Log_1.Log.CheckWarn() && Log_1.Log.Warn("Plot", 26, "显隐实体出错");
  }
  SetActorName(t) {
    t.ActorIndex >= this.DJi.length ||
      t.ActorIndex < 0 ||
      this.aJi.set(t.Talker, this.DJi[t.ActorIndex]);
  }
  HandleMouthAnim(i) {
    if (
      this.IsInTemplate &&
      !(
        !i.PlayVoice ||
        !i.WhoId ||
        (i && "Talk" !== i.Type) ||
        StringUtils_1.StringUtils.IsEmpty(i.TidTalk) ||
        i.NoMouthAnim
      )
    ) {
      var t = i;
      if ("InnerVoice" !== t.Style?.Type) {
        const o = this.aJi.get(i.WhoId);
        if (o?.Valid && o?.Visible) {
          const s = EntitySystem_1.EntitySystem.Get(o.EntityId)?.GetComponent(
            175,
          )?.MainAnimInstance;
          s
            ? ((t = PlotAudioById_1.configPlotAudioById.GetConfig(i.TidTalk)),
              (t = PlotAudioModel_1.PlotAudioModel.GetAudioMouthAnimName(t)),
              (o.MouseMontageLoadingId =
                ResourceSystem_1.ResourceSystem.LoadAsync(
                  t,
                  UE.AnimSequence,
                  (t) => {
                    o.MouseMontageLoadingId =
                      ResourceSystem_1.ResourceSystem.InvalidId;
                    var e = s.PlaySlotAnimationAsDynamicMontage(
                      t,
                      SequenceDefine_1.ABP_Mouth_Slot_Name,
                      0,
                      0,
                      1,
                      1,
                      -1,
                      0,
                      !1,
                    );
                    o.FaceChangeManager?.ChangeFaceForMouthMontage(e),
                      Log_1.Log.CheckDebug() &&
                        Log_1.Log.Debug(
                          "Plot",
                          38,
                          "MouthAnim 播放口型",
                          ["Key", i.TidTalk],
                          ["Asset", t?.GetName()],
                          ["ABP", s.GetName()],
                        );
                  },
                )))
            : Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("Plot", 26, "播放嘴型时拿不到AnimInst", [
                "EntityId",
                o.EntityId,
              ]);
        }
      }
    }
  }
  QJi(e, t) {
    if (
      ((this.SJi = 0),
      this.lJi.forEach((t) => {
        TimerSystem_1.TimerSystem.Remove(t);
      }),
      t && 0 !== t.length)
    )
      for (const a of t)
        if (!(a.ActorIndex > this.DJi.length)) {
          const _ = this.DJi[a.ActorIndex];
          if (_.Valid && _.Visible) {
            if (_.PositionLocked) return;
            let t = void 0;
            switch (a.Target.Type) {
              case 2:
                var i = a.Target;
                t = this.tL(i.EntityId);
                break;
              case 3:
                i = a.Target;
                t = Vector_1.Vector.Create(i.Pos.X, i.Pos.Y, i.Pos.Z);
                break;
              case 0:
                var o = this.aJi.get(e);
                if (!o?.Valid) {
                  Log_1.Log.CheckWarn() &&
                    Log_1.Log.Warn("Plot", 26, "说话人未在模板内，转向失败");
                  continue;
                }
                o = EntitySystem_1.EntitySystem.Get(o.EntityId)?.GetComponent(
                  3,
                );
                o && (t = Vector_1.Vector.Create(o.ActorLocationProxy));
                break;
              case 4:
                o =
                  ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
                    3,
                  );
                o && (t = Vector_1.Vector.Create(o.ActorLocationProxy));
            }
            if (t)
              if (this.nx.IsBackground) {
                var s = Vector_1.Vector.Create(),
                  r = EntitySystem_1.EntitySystem.Get(_.EntityId)?.GetComponent(
                    3,
                  );
                r?.Valid &&
                  (t.Subtraction(r.ActorLocationProxy, s),
                  (_.Pos.A =
                    s.HeadingAngle() * MathCommon_1.MathCommon.RadToDeg));
              } else {
                r = a.DelayTime
                  ? TimeUtil_1.TimeUtil.SetTimeMillisecond(a.DelayTime)
                  : 0;
                if (r < TimerSystem_1.MIN_TIME) this.szi(_, t);
                else {
                  const h = TimerSystem_1.TimerSystem.Delay(() => {
                    this.szi(_, t), this.lJi.delete(h);
                  }, r);
                  this.lJi.add(h);
                }
                s = r + WAIT_TURING_TIME + 0.5 * MONTAGE_BLEND_OUT_TIME;
                this.SJi < s && (this.SJi = s);
              }
          }
        }
  }
  tL(t) {
    var e =
      ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
        t,
      )?.Entity?.GetComponent(3);
    return e
      ? Vector_1.Vector.Create(e.ActorLocationProxy)
      : (e = ModelManager_1.ModelManager.CreatureModel.GetEntityData(t))
        ? Vector_1.Vector.Create(
            e.Transform.Pos.X,
            e.Transform.Pos.Y,
            e.Transform.Pos.Z,
          )
        : void 0;
  }
  szi(t, e) {
    var i,
      o = EntitySystem_1.EntitySystem.Get(t.EntityId),
      s = o?.GetComponent(3);
    s?.Valid &&
      (t.IsPlayer()
        ? ((t = MathUtils_1.MathUtils.CommonTempRotator),
          (i = MathUtils_1.MathUtils.CommonTempVector),
          e.Subtraction(s.ActorLocationProxy, i),
          i.Normalize(),
          (t.Roll = 0),
          (t.Pitch = 0),
          (t.Yaw = MathUtils_1.MathUtils.GetAngleByVector2D(i)),
          o
            .GetComponent(175)
            .MontageManager.StopMontage({ Method: 0, BlendOutTime: 0.5 }),
          s.SetInputRotator(t))
        : o.GetComponent(45).PerformTurn(1, { TargetLocation: e }));
  }
  SetTemplatePlayerTransform(t) {
    var e;
    this.dJi !== PLAYER_UNUSED_INDEX &&
      (((e = this.DJi[this.dJi]).Pos.X = t.X ?? 0),
      (e.Pos.Y = t.Y ?? 0),
      (e.Pos.Z = t.Z ?? 0),
      (e.Pos.A = t.A ?? 0),
      (e.Pos.Roll = t.Roll ?? 0),
      (e.Pos.Pitch = t.Pitch ?? 0));
  }
  OnFinishShowTalk() {
    if (this.IsInTemplate)
      for (const e of this.DJi) {
        if (!e.Valid) return;
        var t = EntitySystem_1.EntitySystem.Get(e.EntityId)?.GetComponent(
          175,
        )?.MainAnimInstance;
        if (!ObjectUtils_1.ObjectUtils.IsValid(t)) return;
        t?.StopSlotAnimation(0, SequenceDefine_1.ABP_Mouth_Slot_Name);
      }
  }
  OnTick(t) {
    this.IsInTemplate && (this.LJi.OnTick(t), this.rNn());
  }
}
((exports.PlotTemplate = PlotTemplate).HJi = new UE.FName(
  "Bip001_Pupil_Bone01_L",
)),
  (PlotTemplate.jJi = new UE.FName("Bip001Head"));
//# sourceMappingURL=PlotTemplate.js.map
