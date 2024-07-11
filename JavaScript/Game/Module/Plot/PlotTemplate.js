"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotTemplate = void 0);
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
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  AiContollerLibrary_1 = require("../../AI/Controller/AiContollerLibrary"),
  CameraController_1 = require("../../Camera/CameraController"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  GlobalData_1 = require("../../GlobalData"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterNameDefines_1 = require("../../NewWorld/Character/Common/CharacterNameDefines"),
  WaitEntityTask_1 = require("../../World/Define/WaitEntityTask"),
  TeleportController_1 = require("../Teleport/TeleportController"),
  MovingShotManager_1 = require("./MovingShotManager"),
  PlotAudioModel_1 = require("./PlotAudioModel"),
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
  BEGIN_WAIT_TIME = 800,
  CAMERA_FILMBACK_SENSOR_WIDTH = 23.76,
  CAMERA_FILMBACK_SENSOR_HEIGHT = 13.365,
  MONTAGE_BLEND_OUT_TIME = 0.5,
  DEFAULT_CAMERA_BASE = 140.19,
  DEFAULT_CAMERA_BASE_HEAD = 135.96,
  MAX_POS_DIST_SQ = 1e6;
class ActorData {
  constructor() {
    (this.Valid = !1),
      (this.PbDataId = 0),
      (this.EntityId = 0),
      (this.TalkerId = 0),
      (this.Pos = { X: 0, Y: 0, Z: 0, A: 0 }),
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
      (this.OriginPos = { X: 0, Y: 0, Z: 0, A: 0 }),
      (this.IsPosReset = !1),
      (this.OriginEnableLookAt = !1),
      (this.OriginEnableAi = !1),
      (this.OriginMoveSync = !1),
      (this.OriginMoveMode = void 0),
      (this.TurningTimer = void 0),
      (this.LookLocked = !1);
  }
  Reset() {
    (this.Valid = !1),
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
      (this.OriginPos.X = 0),
      (this.OriginPos.Y = 0),
      (this.OriginPos.Z = 0),
      (this.OriginPos.A = 0),
      (this.IsPosReset = !1),
      (this.OriginEnableLookAt = !1),
      (this.OriginEnableAi = !1),
      (this.OriginMoveSync = !1),
      (this.OriginMoveMode = void 0),
      (this.TurningTimer = void 0),
      (this.LookLocked = !1);
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
    (this.lea = new Set()), (this._ea = new Map());
  }
  DelayAction(e, t, i, s) {
    if (s) {
      s = TimerSystem_1.TimerSystem.Delay(() => {
        var t = this._ea.get(e)[1];
        this._ea.delete(e), t();
      }, t);
      this._ea.has(e) && this._ea.get(e)[0].Remove(), this._ea.set(e, [s, i]);
    } else {
      const o = TimerSystem_1.TimerSystem.Delay(() => {
        this.lea.delete(o), i();
      }, t);
      this.lea.add(o);
    }
  }
  CleanAction(t = 0) {
    this.lea.forEach((t) => t.Remove()),
      this.lea.clear(),
      this._ea.forEach((t) => {
        var e = t[0],
          t = t[1];
        e.Remove(), t();
      }),
      this._ea.clear();
  }
}
class PlotTemplate {
  constructor() {
    (this.iJi = void 0),
      (this.nx = void 0),
      (this.oJi = !1),
      (this.rJi = Transform_1.Transform.Create()),
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
      (this.fJi = 0),
      (this.uoe = void 0),
      (this.vJi = new RegExp(/(?<=station)\d/)),
      (this.MJi = new RegExp(/_CU|_MS|_FS|_RFS/)),
      (this.EJi = !1),
      (this.SJi = 0),
      (this.yJi = 0),
      (this.IJi = !1),
      (this.TJi = !1),
      (this.K2n = -1),
      (this.Q2n = void 0),
      (this.xJt = void 0),
      (this.FVs = 0),
      (this.LJi = new MovingShotManager_1.MovingShotManager()),
      (this.uea = new DelayActionManager());
  }
  get IsInTemplate() {
    return this.oJi;
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
  StartTemplateNew(t, e, i) {
    (this.oJi = !0),
      (this.EJi = t.UseFreeCamera),
      (this.SJi = 0),
      (this.nx = e),
      (this.TJi = !0),
      (this.IJi = !0);
    var s = new Array();
    for (const o of t.Actors) s.push(o.EntityId);
    this.RJi(s, () => {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 27, "等待模板演出实体完成"),
        this.EJi ||
          (ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent.CineCamera.ResetSeqCineCamSetting(),
          ModelManager_1.ModelManager.PlotModel.SwitchCameraMode(3),
          (this.yJi = UE.KismetSystemLibrary.GetConsoleVariableFloatValue(
            "r.MotionBlur.Amount",
          )),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.MotionBlur.Amount 0",
          )),
        this.UJi(t.Actors),
        (this.mJi = new Array()),
        this.EJi &&
          this.DJi.forEach((t, e) => {
            t.Valid && this.mJi.push({ Index: e });
          }),
        this.AJi(t.Actors, i);
    });
  }
  UJi(e) {
    this.aJi.clear();
    for (let t = 0; t < ACTOR_NUM_MAX; t++) {
      var i,
        s,
        o,
        r,
        _,
        a = this.DJi[t];
      a.Reset(),
        t >= e.length ||
          ((i =
            t === this.dJi
              ? ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity
              : ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
                  e[t].EntityId,
                )),
          this.Vjs(i)
            ? (s = i.Entity.GetComponent(3))
              ? (ModelManager_1.ModelManager.WorldModel.AddIgnore(s.Actor),
                s.ClearInput(),
                (o = i.Entity.GetComponent(33))?.Valid &&
                  o.StopAllSkills("PlotTemplate.ControlActor"),
                (o = i.Entity.GetComponent(37))?.Valid &&
                  (o.CharacterMovement &&
                    (o.CharacterMovement.Velocity = Vector_1.Vector.ZeroVector),
                  s.ResetCachedVelocityTime()),
                (r = i.Entity.GetComponent(162))?.Valid &&
                  r.SetSightTargetItem(void 0),
                (_ = i.Entity.GetComponent(59))?.Valid &&
                  ((a.OriginMoveSync = _.GetEnableMovementSync()),
                  a.OriginMoveSync) &&
                  _.SetEnableMovementSync(!1, "PlotTemplate"),
                (a.Valid = !0),
                (a.EntityId = i.Id),
                (a.PbDataId = e[t].EntityId),
                (a.TalkerId = e[t].TalkerId),
                (a.OriginPos.X = s.ActorLocationProxy.X),
                (a.OriginPos.Y = s.ActorLocationProxy.Y),
                (a.OriginPos.Z = s.ActorLocationProxy.Z),
                (a.OriginPos.A = s.ActorRotationProxy.Yaw),
                Object.assign(a.Pos, a.OriginPos),
                (a.IsPosReset = e[t].IsResetPosition),
                (a.OriginEnableLookAt = !1),
                (a.Visible = !0),
                (a.OriginMoveMode = o.CharacterMovement.MovementMode),
                a.IsPlayer() ||
                  ((_ = i?.Entity?.GetComponent(171)),
                  (a.FaceChangeManager = _?.ExpressionController)),
                -1 !== a.TalkerId
                  ? (this.aJi.has(a.TalkerId) &&
                      Log_1.Log.CheckWarn() &&
                      Log_1.Log.Warn(
                        "Plot",
                        27,
                        "重复的对话人，请策划检查配置",
                      ),
                    this.aJi.set(a.TalkerId, a))
                  : Log_1.Log.CheckWarn() &&
                    Log_1.Log.Warn(
                      "Plot",
                      27,
                      "未配置说话人，口型和自动看向功能不生效",
                      ["演员位", t],
                    ),
                t === this.dJi
                  ? (s.Entity.GetComponent(71).HideWeapon(-1, !0, !1),
                    this.EJi ||
                      s.Actor.CharRenderingComponent?.SetDisableFightDither(!0))
                  : ((_ = i.Entity.GetComponent(171))?.Valid &&
                      ((a.OriginEnableLookAt = _.OpenLookAt),
                      _.SetLookAtPlayerEnabled(!1),
                      _.OnNpcInPlot(!0)),
                    (_ = i.Entity?.GetComponent(39))?.Valid &&
                      ((a.OriginEnableAi = _.IsAiDriver && _.IsEnabled()),
                      a.OriginEnableAi) &&
                      _.DisableAi("Plot Control Ai"),
                    o.CharacterMovement.SetMovementMode(1),
                    r.SetBlendSpaceLookAt(!0)),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Plot",
                    27,
                    "演员信息",
                    ["index", t],
                    ["actor", s.Actor.GetName()],
                    ["entityId", a.EntityId],
                    [
                      "pbDataId",
                      -1 === a.PbDataId
                        ? s.CreatureData.GetPbDataId()
                        : a.PbDataId,
                    ],
                  ))
              : Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn("Plot", 27, "实体类型错误", [
                  "PbDataId",
                  e[t].EntityId,
                ])
            : Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("Plot", 27, "模板演出拿不到演员", [
                "PbDataId",
                e[t].EntityId,
              ]));
    }
  }
  Vjs(t) {
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
    this.nx.IsBackground && t();
    var i = new Array();
    for (let t = 0; t < e.length; t++) {
      var s,
        o,
        r = e[t],
        _ = this.DJi[t];
      _.Valid
        ? ((s = r.InitialState?.InitialMontage) &&
            ((o = _.IsPlayer()
              ? this.PJi(s.MontageId.MontageId)
              : s.MontageId.MontageId),
            (s = s.MontageId.IsAbp
              ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(o)
              : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(o))
              ? i.push(this.xJi(_, s.ActionMontage))
              : ControllerHolder_1.ControllerHolder.FlowController.LogError(
                  "初始化演员蒙太奇时找不到资源",
                  ["id", o],
                )),
          (s = r.InitialState?.InitialLookAt) &&
            ((o = EntitySystem_1.EntitySystem.Get(_.EntityId).GetComponent(
              162,
            )),
            this.wJi(o, s, _)))
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Plot", 27, "初始化演员失败", [
            "EntityId",
            r.EntityId,
          ]);
    }
    const a = new CustomPromise_1.CustomPromise();
    i.push(a.Promise),
      TimerSystem_1.TimerSystem.Delay(() => {
        a.SetResult();
      }, BEGIN_WAIT_TIME),
      Promise.all(i).finally(t);
  }
  async xJi(i, t) {
    const s = new CustomPromise_1.CustomPromise();
    return (
      this.BJi(t, (t) => {
        var e;
        ObjectUtils_1.ObjectUtils.IsValid(t) &&
          ((e = EntitySystem_1.EntitySystem.Get(i.EntityId).GetComponent(
            162,
          ).MainAnimInstance).Montage_IsPlaying(t) || e.Montage_Play(t),
          e.Montage_SetNextSection(
            CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
            CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
            t,
          ),
          e.Montage_JumpToSection(
            CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
            t,
          ),
          (i.BodyMontage = t),
          (i.MontageLooping = !0),
          (i.MontageKeeping = !0)),
          s.SetResult();
      }),
      s.Promise
    );
  }
  async SetTemplateNew(e) {
    if (!this.EJi && e && this.IsInTemplate) {
      var i, s;
      this.bJi(e.TemplateMode.CameraId),
        e.TargetPos &&
          (this.qJi(e.TargetPos),
          (s = Vector_1.Vector.Create(
            e.TargetPos.X,
            e.TargetPos.Y,
            e.TargetPos.Z,
          )),
          (i = Rotator_1.Rotator.Create(0, e.TargetPos.A, 0)),
          this.rJi.SetRotation(i.Quaternion()),
          this.rJi.SetLocation(s),
          this.rJi.SetScale3D(Vector_1.Vector.OneVectorProxy),
          (this.nJi = e.TargetPos.A));
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
            (s = this.GJi(t)),
            this.NJi(),
            this.OJi(i),
            this.PlayCameraAnimCompatible(e.CameraAnim),
            await s)
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
            Log_1.Log.Debug("Plot", 27, "演出模板", [
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
    var s = this.iJi.ActorDataArray,
      o = Vector_1.Vector.Create(0, 0, 0),
      r = Vector_1.Vector.Create(0, 0, 0),
      _ = new UE.Vector(0, 0, 0),
      a = new UE.Rotator(0, 0, 0),
      t = ((this.fJi = 0), Time_1.Time.Frame);
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Plot", 27, "剧情切镜飘带处理 -关闭", ["frame", t]),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Kuro.DisableKawaiiSimulate 1",
      );
    for (
      let t = 0;
      t < s.length && !(t >= this.mJi.length || t >= this.DJi.length);
      t++
    ) {
      var h = this.mJi[t];
      if (!(h.Index === ACTOR_EMPTY_INDEX || h.Index >= this.DJi.length)) {
        var n = this.DJi[h.Index];
        if (n.Valid)
          if (n.Valid) {
            var l = EntitySystem_1.EntitySystem.Get(n.EntityId)?.GetComponent(
              3,
            );
            if (l) {
              e && h.Offset
                ? (this.qJi(h.Offset),
                  (_.X = h.Offset.X),
                  (_.Y = h.Offset.Y),
                  (_.Z = h.Offset.Z),
                  (a.Yaw = ((h.Offset.A + 180) % 360) - 180),
                  r.FromUeVector(_))
                : ((m = s[t]),
                  o.Set(m.X, m.Y, 0),
                  this.rJi.TransformPosition(o, r),
                  _.Set(r.X, r.Y, r.Z),
                  (a.Yaw = ((m.A + this.nJi + 180) % 360) - 180));
              var m = _.Z,
                c = (this.kJi(_, l), _.Z - m),
                E =
                  ((_.Z +=
                    l.Actor.CapsuleComponent.GetScaledCapsuleHalfHeight()),
                  this.FJi(n.Pos, _.X, _.Y, _.Z, a.Yaw));
              if (
                ((n.Pos.X = _.X),
                (n.Pos.Y = _.Y),
                (n.Pos.Z = _.Z),
                (n.Pos.A = a.Yaw),
                !this.nx.IsBackground)
              )
                if (
                  (t === this.uJi &&
                    (Log_1.Log.CheckDebug() &&
                      Log_1.Log.Debug("Plot", 27, "演员位", [
                        "station",
                        this.uJi,
                      ]),
                    (this.fJi = c)),
                  E)
                )
                  Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug("Plot", 27, "位置相同，略了", [
                      "id",
                      n.PbDataId,
                    ]);
                else {
                  if (n.IsPlayer()) {
                    if (this.VJi(n.OriginPos, n.Pos)) {
                      i =
                        TeleportController_1.TeleportController.TeleportToPositionNoLoading(
                          _,
                          a,
                          "剧情演出.SetupTemplateActor",
                        );
                      continue;
                    }
                    l.Actor.CharacterMovement?.SetMovementMode(
                      l.Actor.CharacterMovement?.DefaultLandMovementMode,
                    );
                  }
                  l.FixBornLocation("剧情演出.SetupTemplateActor", !0, r, !1),
                    l.SetActorRotation(a, "剧情演出.SetupTemplateActor", !1),
                    l.SetInputRotator(a);
                }
            } else
              Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Plot",
                  27,
                  "无法获取实体CharacterActorComponent",
                  ["PbDataId", n.PbDataId],
                );
          } else
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("Plot", 27, "演员无效", ["演员位置", h.Index]);
      }
    }
    return (
      void 0 !== i && (await i),
      (this.Q2n = new CustomPromise_1.CustomPromise()),
      (this.K2n = t + 3),
      await this.Q2n.Promise,
      !0
    );
  }
  X2n() {
    var t;
    !this.Q2n ||
      (t = Time_1.Time.Frame) < this.K2n ||
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 27, "剧情切镜飘带处理 -开启", ["curFrame", t]),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Kuro.DisableKawaiiSimulate 0",
      ),
      (t = this.Q2n),
      (this.K2n = -1),
      (this.Q2n = void 0),
      t.SetResult());
  }
  FJi(t, e, i, s, o) {
    return (
      MathUtils_1.MathUtils.IsNearlyEqual(t.X, e, 1) &&
      MathUtils_1.MathUtils.IsNearlyEqual(t.Y, i, 1) &&
      MathUtils_1.MathUtils.IsNearlyEqual(t.Z, s, 1) &&
      MathUtils_1.MathUtils.IsNearlyEqual(t.A, o, 1)
    );
  }
  VJi(t, e) {
    (t = Vector_1.Vector.Create(t)), (e = Vector_1.Vector.Create(e));
    return Vector_1.Vector.DistSquared(t, e) > MAX_POS_DIST_SQ;
  }
  OJi(e) {
    if (!this.nx.IsBackground) {
      this.LJi.Stop();
      var i = this.iJi.CameraData;
      let t = e;
      if (!t) {
        var e = Vector_1.Vector.Create(i.Pos.X, i.Pos.Y, i.Pos.Z),
          s = Rotator_1.Rotator.Create(i.Rot.Y, i.Rot.Z, i.Rot.X);
        if (
          ("_CU" === this.cJi || "_MS" === this.cJi) &&
          0 <= this.uJi &&
          this.uJi < this.mJi.length
        ) {
          var o = this.mJi[this.uJi].Index;
          if (o !== ACTOR_EMPTY_INDEX) {
            o = this.DJi[o];
            let t =
              EntitySystem_1.EntitySystem.Get(o.EntityId)
                ?.GetComponent(3)
                ?.Actor.Mesh.GetSocketTransform(PlotTemplate.HJi, 2)
                ?.GetLocation().Z ?? DEFAULT_CAMERA_BASE;
            0 === t
              ? ((t =
                  EntitySystem_1.EntitySystem.Get(o.EntityId)
                    ?.GetComponent(3)
                    ?.Actor.Mesh.GetSocketTransform(PlotTemplate.jJi, 2)
                    ?.GetLocation().Z ?? DEFAULT_CAMERA_BASE_HEAD),
                (this.fJi += 0 !== t ? t - DEFAULT_CAMERA_BASE_HEAD : 0))
              : (this.fJi += t - DEFAULT_CAMERA_BASE),
              (e.Z += this.fJi),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Plot", 27, "CU、MS相机自动调整", [
                  "Offset",
                  this.fJi,
                ]);
          }
        }
        o = Transform_1.Transform.Create(
          s.Quaternion(),
          e,
          Vector_1.Vector.OneVectorProxy,
        );
        (t = Transform_1.Transform.Create()), o.ComposeTransforms(this.rJi, t);
      }
      (s =
        CameraController_1.CameraController.SequenceCamera.GetComponent(
          9,
        ).CineCamera),
        (e = s.CameraComponent);
      ObjectUtils_1.ObjectUtils.IsValid(s) &&
        (s.K2_SetActorTransform(t.ToUeTransform(), !1, void 0, !0),
        i.Aperture && (e.CurrentAperture = i.Aperture),
        i.FocalLength && (e.CurrentFocalLength = i.FocalLength),
        i.FocusDistance &&
          (e.FocusSettings.ManualFocusDistance = i.FocusDistance),
        (e.Filmback.SensorWidth = CAMERA_FILMBACK_SENSOR_WIDTH),
        (e.Filmback.SensorHeight = CAMERA_FILMBACK_SENSOR_HEIGHT),
        this.WJi());
    }
  }
  WJi() {
    for (const t of this.DJi)
      t.Valid &&
        t.Visible &&
        EntitySystem_1.EntitySystem.Get(t.EntityId)
          ?.GetComponent(162)
          ?.StartForceDisableAnimOptimization(0);
  }
  async EndTemplateNew(t) {
    this.IsInTemplate &&
      (this.LJi.Stop(),
      this.EJi ||
        (ModelManager_1.ModelManager.PlotModel.SwitchCameraMode(1),
        CameraController_1.CameraController.FightCamera.LogicComponent.ResetArmLengthAndRotation(
          ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.PlotTemplateCameraExitRotation.ToUeRotator(),
        ),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.MotionBlur.Amount " + this.yJi,
        )),
      await this.Lc(t),
      this.uea.CleanAction(!1),
      this.hJi.forEach((t) => {
        TimerSystem_1.TimerSystem.Remove(t);
      }),
      this.hJi.clear(),
      this.lJi.forEach((t) => {
        TimerSystem_1.TimerSystem.Remove(t);
      }),
      this.lJi.clear(),
      this.ZYi.clear(),
      (this.fJi = 0),
      (this.iJi = void 0),
      this.rJi.Reset(),
      (this.nJi = 0),
      (this.dJi = PLAYER_UNUSED_INDEX),
      (this.oJi = !1),
      (this.SJi = 0),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Kuro.DisableKawaiiSimulate 0",
      ));
  }
  async Lc(e) {
    var i = [];
    for (let t = 0; t < this.DJi.length; t++) {
      var s,
        o,
        r,
        _,
        a = this.DJi[t];
      a.Valid &&
        ((o = (s = EntitySystem_1.EntitySystem.Get(a.EntityId))?.GetComponent(
          3,
        ))
          ? (o.ClearInput(),
            ModelManager_1.ModelManager.WorldModel.RemoveIgnore(o.Actor),
            a.Visible ||
              ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
                s,
                !0,
                "[PlotTemplate.ReleaseActor] 恢复模板演出实体显隐",
              ),
            a.MouseMontageLoadingId !==
              ResourceSystem_1.ResourceSystem.InvalidId &&
              (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(
                a.MouseMontageLoadingId,
              ),
              (a.MouseMontageLoadingId =
                ResourceSystem_1.ResourceSystem.InvalidId)),
            (r = (_ = s.GetComponent(162))?.MainAnimInstance),
            ObjectUtils_1.ObjectUtils.IsValid(r) &&
              (r.Montage_Stop(MONTAGE_BLEND_OUT_TIME),
              _.ResetSightLimit(),
              _.SetSightTargetItem(void 0)),
            (r = s.GetComponent(59))?.Valid &&
              a.OriginMoveSync &&
              r.SetEnableMovementSync(!0, "PlotTemplate"),
            void 0 !== a.TurningTimer &&
              TimerSystem_1.TimerSystem.Remove(a.TurningTimer),
            t === this.dJi
              ? this.EJi ||
                o.Actor.CharRenderingComponent?.SetDisableFightDither(!1)
              : ((r = s?.GetComponent(39))?.Valid &&
                  a.OriginEnableAi &&
                  r.EnableAi("Plot Control Ai"),
                (r = s.GetComponent(171))?.Valid &&
                  (a.OriginEnableLookAt && r.SetLookAtPlayerEnabled(!0),
                  r.OnNpcInPlot(!1)),
                (r = s.GetComponent(37))?.Valid &&
                  r.CharacterMovement.SetMovementMode(a.OriginMoveMode),
                _.SetBlendSpaceLookAt(!1),
                (r = s.GetComponent(0).GetModelConfig()),
                (ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(r.DA) &&
                  !StringUtils_1.StringUtils.IsEmpty(
                    r.DA.AssetPathName?.toString(),
                  ) &&
                  "None" !== r.DA.AssetPathName?.toString()) ||
                  ((_ = o.SkeletalMesh.SkeletalMesh),
                  UE.KuroMeshTextureFunctionLibrary.HandleSkeletalMeshComponentStreaming(
                    _,
                    !1,
                  ))),
            i.push(this.KJi(a, e?.IsResetPosition)),
            a.Reset())
          : Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Plot",
              27,
              "模板结束时无法获取实体CharacterActorComponent",
              ["EntityId", a.EntityId],
              ["PbDataId", a.PbDataId],
            ));
    }
    await Promise.all(i);
  }
  async KJi(e, i = !1) {
    if (!ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode()) {
      var s = new UE.Vector(0, 0, 0),
        o = new UE.Rotator(0, 0, 0);
      let t = !1;
      i && e.IsPosReset
        ? ((o.Yaw = e.OriginPos.A),
          s.Set(e.OriginPos.X, e.OriginPos.Y, e.OriginPos.Z),
          (t = !0))
        : this.nx.IsBackground &&
          ((o.Yaw = e.Pos.A), s.Set(e.Pos.X, e.Pos.Y, e.Pos.Z), (t = !0)),
        t &&
          ((i = EntitySystem_1.EntitySystem.Get(e.EntityId).GetComponent(3)),
          this.EJi
            ? i.SetInputRotator(o)
            : e.IsPlayer()
              ? await TeleportController_1.TeleportController.TeleportToPositionNoLoading(
                  s,
                  o,
                  "模板演出结束设置位置",
                )
              : (i.SetActorRotation(o, "模板演出结束设置位置", !1),
                i.SetInputRotator(o),
                i.SetActorLocation(s, "模板演出结束设置位置", !1)));
    }
  }
  RJi(t, e) {
    const i = new Array();
    this.dJi = PLAYER_UNUSED_INDEX;
    for (const s of t)
      s !== PLAYER_USED_ID ? i.push(s) : (this.dJi = t.indexOf(s));
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Plot", 18, "剧情加载等待-npc-开始", ["", i]),
      WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(
        i,
        (t) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 18, "剧情加载等待-npc-完成", ["result", t]),
            this.$In(i, e);
        },
        !0,
        WAIT_ENTITY_TIME,
      );
  }
  $In(t, s) {
    const o = new Map();
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
          ObjectUtils_1.ObjectUtils.IsValid(i) && o.set(i, !1);
        }
      }
    }
    0 === o.size
      ? s()
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Plot", 27, "剧情加载等待 npc纹理流送 开始", [
            "size",
            o.size,
          ]),
        (this.FVs = 0),
        (this.xJt = TimerSystem_1.TimerSystem.Forever(() => {
          this.FVs++;
          let t = !0;
          for (var [e, i] of o)
            i ||
              (UE.KuroMeshTextureFunctionLibrary.IsSkeletalMeshComponentStreamingComplete(
                e,
              )
                ? o.set(e, !0)
                : (t = !1));
          (t || 15 < this.FVs) &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Plot", 27, "剧情加载等待 npc纹理流送 完成", [
                "checkTimes",
                this.FVs,
              ]),
            (this.FVs = 0),
            this.xJt?.Remove(),
            (this.xJt = void 0),
            s());
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
    var e;
    this.IsInTemplate &&
      (this.TJi ? (this.TJi = !1) : (this.IJi = !1),
      t.CameraData &&
        Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Plot", 27, "旧演出模板已废弃"),
      (e = this.SetTemplateNew(t.FlowTemplate)),
      this.JJi(t),
      await e,
      this.QJi(t.WhoId, t.ActorTurnToArray),
      this.nx.IsBackground ||
        (this.XJi(t.WhoId, t.ActorLookAtArray),
        this.$Ji(t.ActorMontageArray),
        this.YJi(t)));
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
  XJi(t, e) {
    this.uea.CleanAction();
    var i,
      s = this.aJi.get(t);
    const o = s?.Valid
        ? EntitySystem_1.EntitySystem.Get(s.EntityId)?.GetComponent(3)
        : void 0,
      r =
        (o?.Valid ||
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Plot",
              27,
              "说话人未在模板内，可能会导致演员看向错误",
            )),
        new Map());
    e?.forEach((t) => {
      var e;
      r.has(t.ActorIndex)
        ? ((e = r.get(t.ActorIndex)).push(t),
          e.sort((t, e) => (t.DelayTime ?? 0) - (e.DelayTime ?? 0)))
        : ((e = new Array()).push(t), r.set(t.ActorIndex, e));
    });
    for (const h of this.DJi)
      !h.Valid ||
        h.Visible ||
        h.LookLocked ||
        ((i = EntitySystem_1.EntitySystem.Get(h.EntityId)?.GetComponent(162))
          ?.Valid &&
          (i.ResetSightLimit(), i.SetSightTargetItem(void 0)));
    for (const n of this.mJi)
      if (n.Index !== ACTOR_EMPTY_INDEX) {
        var _,
          a = this.DJi[n.Index];
        if (a.Valid) {
          const l = EntitySystem_1.EntitySystem.Get(a.EntityId)?.GetComponent(
            162,
          );
          l?.Valid &&
            ((_ = a.LookLocked),
            (r.has(n.Index) && this.cea(l, r.get(n.Index), a, s)) ||
              _ ||
              ("_CU" === this.cJi && n === this.mJi[this.uJi]
                ? (l.ResetSightLimit(), l.SetSightTargetItem(void 0))
                : a.Visible &&
                  a.Valid &&
                  (s?.Visible && s?.Valid
                    ? a === s
                      ? l.GetSightTargetPoint() ||
                        this.zJi(l.GetSightTargetItem()) ||
                        (l.ResetSightLimit(), l.SetSightTargetItem(void 0))
                      : ((_ =
                          ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
                            .PlotTemplateLookAtDelay),
                        (_ = MathUtils_1.MathUtils.GetRandomRange(_[0], _[1])),
                        this.uea.DelayAction(
                          a.EntityId,
                          _,
                          () => {
                            l.ResetSightLimit(), l.SetSightTargetItem(o);
                          },
                          !1,
                        ))
                    : (l.ResetSightLimit(), l.SetSightTargetItem(void 0)))));
        }
      }
  }
  cea(i, t, s, o) {
    const r = t.length - 1;
    if (r < 0) return !1;
    let _ = !1;
    return (
      t.forEach((t, e) => {
        (_ ||=
          (t.DelayTime ?? 0) * CommonDefine_1.MILLIONSECOND_PER_SECOND <
          TimerSystem_1.MIN_TIME),
          this.wJi(i, t.Target, s, o, t.DelayTime, e === r);
      }),
      _
    );
  }
  wJi(e, t, i, s, o = 0, r) {
    let _ = void 0,
      a = !1;
    switch (t.Type) {
      case 3: {
        var h = t;
        const l = Vector_1.Vector.Create(
          h.Pos.X ?? 0,
          h.Pos.Y ?? 0,
          h.Pos.Z ?? 0,
        );
        (a = h.Lock ?? !1),
          (_ = () => {
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
          const m = n.Entity.GetComponent(3) ?? n.Entity.GetComponent(185);
          (a = h.Lock ?? !1),
            (_ = () => {
              e.ResetSightLimit(), e.SetSightTargetItem(m);
            });
        } else
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Plot", 27, "看向的实体不存在", [
              "pbdataid",
              h.EntityId,
            ]);
        break;
      case 1:
        (a = t.Lock ?? !1),
          (_ = () => {
            e.ResetSightLimit(), e.SetSightTargetItem(void 0);
          });
        break;
      case 4: {
        n = t;
        const c =
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
            3,
          );
        (a = n.Lock ?? !1),
          (_ = () => {
            e.ResetSightLimit(), e.SetSightTargetItem(c);
          });
        break;
      }
      case 0:
      case 5: {
        let t = void 0;
        s &&
          i !== s &&
          (t = EntitySystem_1.EntitySystem.Get(s.EntityId)?.GetComponent(3)),
          (a = !1),
          (_ = () => {
            e.ResetSightLimit(), e.SetSightTargetItem(t);
          });
        break;
      }
    }
    i.LookLocked = a;
    o = (o ?? 0) * CommonDefine_1.MILLIONSECOND_PER_SECOND;
    o > TimerSystem_1.MIN_TIME
      ? this.uea.DelayAction(i.EntityId, o, _, a)
      : _?.();
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
    this.hJi.forEach((t) => {
      TimerSystem_1.TimerSystem.Remove(t);
    }),
      this.hJi.clear();
    for (const i of this.DJi)
      (i.BodyMontagePath = void 0),
        (i.OverlayMontagePath = void 0),
        (i.MontageBlendToEnd = !1);
    if (t)
      for (const s of t)
        if (!(s.ActorIndex < 0 || s.ActorIndex >= ACTOR_NUM_MAX)) {
          const o = this.DJi[s.ActorIndex];
          if (o.Valid && o.Visible)
            if (s.EndMontageDirectly)
              (o.MontageKeeping = !1),
                (o.OverlayMontageKeeping = !1),
                (o.MontageBlendToEnd = !0);
            else if (s.EndLoopingMontage)
              (o.MontageKeeping = !1), (o.OverlayMontageKeeping = !1);
            else {
              var e = s.DelayTime
                ? TimeUtil_1.TimeUtil.SetTimeMillisecond(s.DelayTime)
                : 0;
              if (e <= TimerSystem_1.MIN_TIME) this.ZJi(o, s, !1);
              else {
                const r = TimerSystem_1.TimerSystem.Delay(() => {
                  this.ZJi(o, s, !0), this.hJi.delete(r);
                }, e);
                this.hJi.add(r);
              }
              if (s.OverlayMontage) {
                e = s.OverlayMontage?.DelayTime
                  ? TimeUtil_1.TimeUtil.SetTimeMillisecond(
                      s.OverlayMontage.DelayTime,
                    )
                  : 0;
                if (e <= TimerSystem_1.MIN_TIME) this.ezi(o, s, !1);
                else {
                  const _ = TimerSystem_1.TimerSystem.Delay(() => {
                    this.ezi(o, s, !0), this.hJi.delete(_);
                  }, e);
                  this.hJi.add(_);
                }
              }
            }
        }
    for (const a of this.DJi)
      a.Valid &&
        a.Visible &&
        (this.tzi(a),
        this.izi(a),
        this.BJi(a.BodyMontagePath, (t) => {
          this.ozi(a, t);
        }),
        this.BJi(a.OverlayMontagePath, (t) => {
          this.rzi(a, t);
        }));
  }
  ezi(e, i, s) {
    if (void 0 !== i.OverlayMontage?.MontageId.MontageId)
      if (void 0 !== e.TurningTimer)
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Plot", 27, "试图在转身期间播放蒙太奇，已阻止");
      else {
        var o =
          i.ActorIndex === this.dJi
            ? this.PJi(i.OverlayMontage.MontageId.MontageId)
            : i.OverlayMontage.MontageId.MontageId;
        let t = void 0;
        (t = i.OverlayMontage.MontageId.IsAbp
          ? ModelManager_1.ModelManager.PlotModel.GetOverlayAbpMontageConfig(o)
          : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(o))
          ? (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Plot",
                27,
                "模板演出蒙太奇播放",
                ["演员", e.PbDataId],
                ["蒙太奇", t],
              ),
            (e.OverlayMontagePath = t.ActionMontage),
            (e.OverlayMontageLooping = i.OverlayMontage.IsLoop ?? !1),
            (e.OverlayMontageKeeping = i.OverlayMontage.KeepPose ?? !1),
            s &&
              (this.izi(e),
              this.BJi(e.OverlayMontagePath, (t) => {
                this.rzi(e, t);
              })))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Plot", 27, "模板蒙太奇库中没有该资源", ["Id", o]);
      }
  }
  ZJi(e, i, s) {
    if (void 0 !== i.MontageId)
      if (void 0 !== e.TurningTimer)
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Plot", 27, "试图在转身期间播放蒙太奇，已阻止");
      else {
        var o = i.ActorIndex === this.dJi ? this.PJi(i.MontageId) : i.MontageId;
        let t = void 0;
        (t = i.IsAbpMontage
          ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(o)
          : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(o))
          ? (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Plot",
                27,
                "模板演出蒙太奇播放",
                ["演员", e.PbDataId],
                ["蒙太奇", t],
              ),
            (e.BodyMontagePath = t.ActionMontage),
            (e.MontageLooping = i.IsLoop ?? !1),
            (e.MontageKeeping = i.KeepPose ?? !1),
            (e.FaceExpressionId = i.FaceExpressionId),
            s &&
              (this.tzi(e),
              this.BJi(e.BodyMontagePath, (t) => {
                this.ozi(e, t);
              })))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Plot", 27, "模板蒙太奇库中没有该资源", ["Id", o]);
      }
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
  Qca(e, i) {
    if (
      !i
        .Montage_GetCurrentSection(e)
        .op_Equality(CharacterNameDefines_1.CharacterNameDefines.END_SECTION)
    ) {
      i.Montage_Stop(MONTAGE_BLEND_OUT_TIME, e);
      var s = e.CompositeSections,
        o = s.Num();
      for (let t = 0; t < o; t++) {
        var r = s.Get(t);
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
    var e,
      i = EntitySystem_1.EntitySystem.Get(t.EntityId)?.GetComponent(
        162,
      )?.MainAnimInstance;
    ObjectUtils_1.ObjectUtils.IsValid(i) &&
      (this.IJi && !t.MontageKeeping
        ? i.Montage_SetNextSection(
            CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
            CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
          )
        : ObjectUtils_1.ObjectUtils.IsValid(t.BodyMontage) &&
            i.Montage_IsPlaying(t.BodyMontage)
          ? StringUtils_1.StringUtils.IsEmpty(t.BodyMontagePath)
            ? t.MontageBlendToEnd
              ? this.Qca(t.BodyMontage, i)
              : t.MontageKeeping ||
                (!(e = i.Montage_GetCurrentSection(t.BodyMontage)).op_Equality(
                  CharacterNameDefines_1.CharacterNameDefines.START_SECTION,
                ) &&
                  !e.op_Equality(
                    CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
                  )) ||
                i.Montage_SetNextSection(
                  e,
                  CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
                  t.BodyMontage,
                )
            : t.BodyMontage !== this.ZYi.get(t.BodyMontagePath) &&
              (i.Montage_Stop(MONTAGE_BLEND_OUT_TIME, t.BodyMontage),
              (t.BodyMontage = void 0))
          : (t.BodyMontage = void 0));
  }
  izi(t) {
    var e,
      i = EntitySystem_1.EntitySystem.Get(t.EntityId)?.GetComponent(
        162,
      )?.MainAnimInstance;
    ObjectUtils_1.ObjectUtils.IsValid(i) &&
      (ObjectUtils_1.ObjectUtils.IsValid(t.OverlayMontage) &&
      i.Montage_IsPlaying(t.OverlayMontage)
        ? StringUtils_1.StringUtils.IsEmpty(t.OverlayMontagePath)
          ? t.MontageBlendToEnd
            ? this.Qca(t.OverlayMontage, i)
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
  ozi(t, e, i = 1) {
    var s;
    ObjectUtils_1.ObjectUtils.IsValid(e) &&
      this.IsInTemplate &&
      ((s = EntitySystem_1.EntitySystem.Get(t.EntityId)?.GetComponent(
        162,
      )?.MainAnimInstance),
      ObjectUtils_1.ObjectUtils.IsValid(s)) &&
      (this.ZYi.get(t.BodyMontagePath) !== e
        ? Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Plot", 27, "异步加载完的蒙太奇过期了")
        : ((t.BodyMontagePath = void 0),
          (s.Montage_IsPlaying(e) &&
            !s
              .Montage_GetCurrentSection(e)
              .op_Equality(
                CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
              )) ||
            (this.IJi &&
              (UE.KuroStaticLibrary.StopAllMontagesBySlotName(
                s,
                CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SLOT,
                MONTAGE_BLEND_OUT_TIME,
              ),
              UE.KuroStaticLibrary.StopAllMontagesBySlotName(
                s,
                CharacterNameDefines_1.CharacterNameDefines.SEQUENCE_SLOT,
                MONTAGE_BLEND_OUT_TIME,
              )),
            s.Montage_Play(e, i, 0, 0, !1)),
          (t.BodyMontage = e),
          t.MontageLooping
            ? s.Montage_SetNextSection(
                CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
                CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
                e,
              )
            : s.Montage_SetNextSection(
                CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
                CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
                e,
              ),
          t.FaceChangeManager?.ChangeFaceForExpression(e, t.FaceExpressionId)));
  }
  rzi(t, e, i = 1) {
    var s;
    ObjectUtils_1.ObjectUtils.IsValid(e) &&
      this.IsInTemplate &&
      ((s = EntitySystem_1.EntitySystem.Get(t.EntityId)?.GetComponent(
        162,
      )?.MainAnimInstance),
      ObjectUtils_1.ObjectUtils.IsValid(s)) &&
      (this.ZYi.get(t.OverlayMontagePath) !== e
        ? Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Plot", 27, "异步加载完的蒙太奇过期了")
        : ((t.OverlayMontagePath = void 0),
          (s.Montage_IsPlaying(e) &&
            !s
              .Montage_GetCurrentSection(e)
              .op_Equality(
                CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
              )) ||
            s.Montage_Play(e, i, 0, 0, !1),
          (t.OverlayMontage = e),
          t.OverlayMontageLooping
            ? s.Montage_SetNextSection(
                CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
                CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
                e,
              )
            : s.Montage_SetNextSection(
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
  kJi(t, s) {
    this.uoe || this.koe();
    var e = s.Actor,
      i = e.CapsuleComponent,
      e =
        ((this.uoe.WorldContextObject = e),
        this.uoe.SetStartLocation(
          t.X,
          t.Y,
          t.Z + 2 * i.GetScaledCapsuleHalfHeight(),
        ),
        this.uoe.SetEndLocation(
          t.X,
          t.Y,
          this.uoe.StartZ + FIX_TELEPORT_TRACE_DOWN,
        ),
        TraceElementCommon_1.TraceElementCommon.LineTrace(
          this.uoe,
          PROFILE_KEY,
        )),
      o = this.uoe.HitResult;
    if (e && o.bBlockingHit) {
      var r = o.Actors.Num();
      let e = 0,
        i = void 0;
      for (let t = 0; t < r; t++)
        if (
          ((i = o.Actors.Get(t)),
          ObjectUtils_1.ObjectUtils.IsValid(i) &&
            !i.IsA(UE.Character.StaticClass()))
        ) {
          e = t;
          break;
        }
      (t.Z = o.LocationZ_Array.Get(e)),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Plot",
            27,
            "实体剧情内修正地面",
            ["FixedActor", s.CreatureData.GetPbDataId()],
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
          (t = t.GetComponent(162))?.Valid &&
            t.MainAnimInstance.Montage_Stop(0),
          e.UseEffect &&
            i.Actor.DitherEffectController.EnterDisappearEffect(
              DITHER_RATE_PER_SECOND,
              1,
            ))
      : Log_1.Log.CheckWarn() && Log_1.Log.Warn("Plot", 27, "显隐实体出错");
  }
  SetActorName(t) {
    t.ActorIndex >= this.DJi.length ||
      t.ActorIndex < 0 ||
      this.aJi.set(t.Talker, this.DJi[t.ActorIndex]);
  }
  YJi(i) {
    for (const s of this.DJi)
      s.Valid &&
        (s.MouseMontageLoadingId !==
          ResourceSystem_1.ResourceSystem.InvalidId &&
          (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(
            s.MouseMontageLoadingId,
          ),
          (s.MouseMontageLoadingId =
            ResourceSystem_1.ResourceSystem.InvalidId)),
        EntitySystem_1.EntitySystem.Get(s.EntityId)
          ?.GetComponent(162)
          ?.MainAnimInstance?.StopSlotAnimation(
            0,
            SequenceDefine_1.ABP_Mouth_Slot_Name,
          ));
    if (
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
        const s = this.aJi.get(i.WhoId);
        if (s?.Valid && s?.Visible) {
          const o = EntitySystem_1.EntitySystem.Get(s.EntityId)?.GetComponent(
            162,
          )?.MainAnimInstance;
          o
            ? ((t = PlotAudioById_1.configPlotAudioById.GetConfig(i.TidTalk)),
              (t = PlotAudioModel_1.PlotAudioModel.GetAudioMouthAnimName([
                t.IsCheckSex,
                t.FileName,
              ])),
              (s.MouseMontageLoadingId =
                ResourceSystem_1.ResourceSystem.LoadAsync(
                  t,
                  UE.AnimSequence,
                  (t) => {
                    s.MouseMontageLoadingId =
                      ResourceSystem_1.ResourceSystem.InvalidId;
                    var e = o.PlaySlotAnimationAsDynamicMontage(
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
                    s.FaceChangeManager?.ChangeFaceForMouthMontage(e),
                      Log_1.Log.CheckDebug() &&
                        Log_1.Log.Debug(
                          "Plot",
                          39,
                          "MouthAnim 播放口型",
                          ["Key", i.TidTalk],
                          ["Asset", t?.GetName()],
                          ["ABP", o.GetName()],
                        );
                  },
                )))
            : Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("Plot", 27, "播放嘴型时拿不到AnimInst", [
                "EntityId",
                s.EntityId,
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
      for (const _ of t)
        if (!(_.ActorIndex > this.DJi.length)) {
          const a = this.DJi[_.ActorIndex];
          if (a.Valid && a.Visible) {
            let t = void 0;
            switch (_.Target.Type) {
              case 2:
                var i = _.Target;
                t = this.tL(i.EntityId);
                break;
              case 3:
                i = _.Target;
                t = Vector_1.Vector.Create(i.Pos.X, i.Pos.Y, i.Pos.Z);
                break;
              case 0:
                var s = this.aJi.get(e);
                if (!s?.Valid) {
                  Log_1.Log.CheckWarn() &&
                    Log_1.Log.Warn("Plot", 27, "说话人未在模板内，转向失败");
                  continue;
                }
                s = EntitySystem_1.EntitySystem.Get(s.EntityId)?.GetComponent(
                  3,
                );
                s && (t = Vector_1.Vector.Create(s.ActorLocationProxy));
                break;
              case 4:
                s =
                  ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
                    3,
                  );
                s && (t = Vector_1.Vector.Create(s.ActorLocationProxy));
            }
            if (t)
              if (this.nx.IsBackground) {
                var o = Vector_1.Vector.Create(),
                  r = EntitySystem_1.EntitySystem.Get(a.EntityId)?.GetComponent(
                    3,
                  );
                t.Subtraction(r.ActorLocationProxy, o),
                  (a.Pos.A =
                    o.HeadingAngle() * MathCommon_1.MathCommon.RadToDeg);
              } else {
                r = _.DelayTime
                  ? TimeUtil_1.TimeUtil.SetTimeMillisecond(_.DelayTime)
                  : 0;
                if (r < TimerSystem_1.MIN_TIME) this.szi(a, t);
                else {
                  const h = TimerSystem_1.TimerSystem.Delay(() => {
                    this.szi(a, t), this.lJi.delete(h);
                  }, r);
                  this.lJi.add(h);
                }
                o = r + WAIT_TURING_TIME + 0.5 * MONTAGE_BLEND_OUT_TIME;
                this.SJi < o && (this.SJi = o);
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
  szi(e, i) {
    if (void 0 !== e.TurningTimer)
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Plot", 27, "多次触发转身！！！！注意表现");
    else {
      var s = EntitySystem_1.EntitySystem.Get(e.EntityId);
      const o = s?.GetComponent(3);
      if (o?.Valid) {
        o.ClearInput();
        let t = WAIT_TURING_TIME;
        s = s?.GetComponent(162);
        if (
          (ObjectUtils_1.ObjectUtils.IsValid(e.BodyMontage) &&
            s.MainAnimInstance.Montage_IsPlaying(e.BodyMontage) &&
            (s.MainAnimInstance.Montage_Stop(MONTAGE_BLEND_OUT_TIME),
            (t += 0.5 * MONTAGE_BLEND_OUT_TIME)),
          (e.TurningTimer = TimerSystem_1.TimerSystem.Delay(() => {
            e.TurningTimer = void 0;
          }, t)),
          e.PbDataId !== PLAYER_USED_ID)
        )
          TimerSystem_1.TimerSystem.Delay(
            () => {
              e.Valid &&
                AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(o, i, 0);
            },
            MONTAGE_BLEND_OUT_TIME *
              CommonDefine_1.MILLIONSECOND_PER_SECOND *
              0.5,
          );
        else {
          const r = MathUtils_1.MathUtils.CommonTempRotator;
          s = MathUtils_1.MathUtils.CommonTempVector;
          i.Subtraction(o.ActorLocationProxy, s),
            s.Normalize(),
            (r.Roll = 0),
            (r.Pitch = 0),
            (r.Yaw = MathUtils_1.MathUtils.GetAngleByVector2D(s)),
            TimerSystem_1.TimerSystem.Delay(
              () => {
                e.Valid && o.SetInputRotator(r);
              },
              MONTAGE_BLEND_OUT_TIME *
                CommonDefine_1.MILLIONSECOND_PER_SECOND *
                0.5,
            );
        }
      }
    }
  }
  SetTemplatePlayerTransform(t) {
    var e;
    this.dJi !== PLAYER_UNUSED_INDEX &&
      (((e = this.DJi[this.dJi]).Pos.X = t.X ?? 0),
      (e.Pos.Y = t.Y ?? 0),
      (e.Pos.Z = t.Z ?? 0),
      (e.Pos.A = t.A ?? 0));
  }
  OnTick(t) {
    this.IsInTemplate && (this.LJi.OnTick(t), this.X2n());
  }
}
((exports.PlotTemplate = PlotTemplate).HJi = new UE.FName(
  "Bip001_Pupil_Bone01_L",
)),
  (PlotTemplate.jJi = new UE.FName("Bip001Head"));
//# sourceMappingURL=PlotTemplate.js.map
