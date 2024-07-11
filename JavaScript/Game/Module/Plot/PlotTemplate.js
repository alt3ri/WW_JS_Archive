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
  NpcFacialExpressionController_1 = require("../../NewWorld/Character/Npc/Logics/NpcFacialExpressionController"),
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
  NANZHU_ROLEID = 100901,
  NANZHU_ROLEID_NORMAL = 1501,
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
      (this.FaceChangeManager = void 0),
      (this.OriginPos = { X: 0, Y: 0, Z: 0, A: 0 }),
      (this.IsPosReset = !1),
      (this.OriginEnableLookAt = !1),
      (this.OriginEnableAi = !1),
      (this.OriginMoveSync = !1),
      (this.OriginMoveMode = void 0),
      (this.TurningTimer = void 0),
      (this.LookLocked = !1),
      (this.ResetFacialExpressionCallback = (t, e) => {
        (t?.IsValid() && t !== this.BodyMontage) ||
          this.FaceChangeManager?.ResetFacialExpression();
      });
  }
  Reset() {
    (this.Valid = !1),
      (this.PbDataId = 0),
      (this.EntityId = 0),
      (this.TalkerId = 0),
      (this.Visible = !0),
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
    (this.FVs = new Set()), (this.VVs = new Map());
  }
  DelayAction(e, t, i, s) {
    if (s) {
      s = TimerSystem_1.TimerSystem.Delay(() => {
        var t = this.VVs.get(e)[1];
        this.VVs.delete(e), t();
      }, t);
      this.VVs.has(e) && this.VVs.get(e)[0].Remove(), this.VVs.set(e, [s, i]);
    } else {
      const o = TimerSystem_1.TimerSystem.Delay(() => {
        this.FVs.delete(o), i();
      }, t);
      this.FVs.add(o);
    }
  }
  CleanAction(t = 0) {
    this.FVs.forEach((t) => t.Remove()),
      this.FVs.clear(),
      this.VVs.forEach((t) => {
        var e = t[0],
          t = t[1];
        e.Remove(), t();
      }),
      this.VVs.clear();
  }
}
class PlotTemplate {
  constructor() {
    (this.rYi = void 0),
      (this.nx = void 0),
      (this.nYi = !1),
      (this.sYi = Transform_1.Transform.Create()),
      (this.aYi = 0),
      (this.hYi = void 0),
      (this.lYi = new Map()),
      (this.tYi = new Map()),
      (this._Yi = new Set()),
      (this.uYi = new Set()),
      (this.cYi = new ShowActorParam()),
      (this.mYi = ACTOR_EMPTY_INDEX),
      (this.dYi = ""),
      (this.CYi = void 0),
      (this.gYi = PLAYER_UNUSED_INDEX),
      (this.vYi = 0),
      (this.uoe = void 0),
      (this.SYi = new RegExp(/(?<=station)\d/)),
      (this.EYi = new RegExp(/_CU|_MS|_FS|_RFS/)),
      (this.yYi = !1),
      (this.IYi = 0),
      (this.TYi = 0),
      (this.LYi = !1),
      (this.DYi = !1),
      (this.Vqn = -1),
      (this.Hqn = void 0),
      (this.xYt = void 0),
      (this.t4s = 0),
      (this.RYi = new MovingShotManager_1.MovingShotManager()),
      (this.HVs = new DelayActionManager());
  }
  get IsInTemplate() {
    return this.nYi;
  }
  get UYi() {
    if (!this.hYi) {
      this.hYi = new Array();
      for (let t = 0; t < ACTOR_NUM_MAX; t++) {
        var e = new ActorData();
        this.hYi.push(e);
      }
    }
    return this.hYi;
  }
  get MinWaitingTime() {
    return this.IsInTemplate ? TimeUtil_1.TimeUtil.SetTimeSecond(this.IYi) : 0;
  }
  StartTemplateNew(t, e, i) {
    (this.nYi = !0),
      (this.yYi = t.UseFreeCamera),
      (this.IYi = 0),
      (this.nx = e),
      (this.DYi = !0),
      (this.LYi = !0);
    var s = new Array();
    for (const o of t.Actors) s.push(o.EntityId);
    this.AYi(s, () => {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 27, "等待模板演出实体完成"),
        this.yYi ||
          (ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent.CineCamera.ResetSeqCineCamSetting(),
          ModelManager_1.ModelManager.PlotModel.SwitchCameraMode(3),
          (this.TYi = UE.KismetSystemLibrary.GetConsoleVariableFloatValue(
            "r.MotionBlur.Amount",
          )),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.MotionBlur.Amount 0",
          )),
        this.PYi(t.Actors),
        (this.CYi = new Array()),
        this.yYi &&
          this.UYi.forEach((t, e) => {
            t.Valid && this.CYi.push({ Index: e });
          }),
        this.xYi(t.Actors, i);
    });
  }
  PYi(e) {
    this.lYi.clear();
    for (let t = 0; t < ACTOR_NUM_MAX; t++) {
      var i,
        s,
        o,
        r,
        _,
        a = this.UYi[t];
      a.Reset(),
        t >= e.length ||
          ((i =
            t === this.gYi
              ? ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity
              : ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
                  e[t].EntityId,
                )),
          this.v5s(i)
            ? (s = i.Entity.GetComponent(3))
              ? (ModelManager_1.ModelManager.WorldModel.AddIgnore(s.Actor),
                s.ClearInput(),
                (o = i.Entity.GetComponent(33))?.Valid &&
                  o.StopAllSkills("PlotTemplate.ControlActor"),
                (o = i.Entity.GetComponent(36))?.Valid &&
                  (o.CharacterMovement &&
                    (o.CharacterMovement.Velocity = Vector_1.Vector.ZeroVector),
                  s.ResetCachedVelocityTime()),
                (r = i.Entity.GetComponent(160))?.Valid &&
                  r.SetSightTargetItem(void 0),
                (_ = i.Entity.GetComponent(57))?.Valid &&
                  ((a.OriginMoveSync = _.GetEnableMovementSync()),
                  a.OriginMoveSync) &&
                  _.SetEnableMovementSync(!1),
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
                  (a.FaceChangeManager =
                    new NpcFacialExpressionController_1.NpcFacialExpressionController(
                      i.Id,
                    )),
                -1 !== a.TalkerId
                  ? (this.lYi.has(a.TalkerId) &&
                      Log_1.Log.CheckWarn() &&
                      Log_1.Log.Warn(
                        "Plot",
                        27,
                        "重复的对话人，请策划检查配置",
                      ),
                    this.lYi.set(a.TalkerId, a))
                  : Log_1.Log.CheckWarn() &&
                    Log_1.Log.Warn(
                      "Plot",
                      27,
                      "未配置说话人，口型和自动看向功能不生效",
                      ["演员位", t],
                    ),
                t === this.gYi
                  ? (s.Entity.GetComponent(69).HideWeapon(-1, !0, !1),
                    s.Actor.CharRenderingComponent?.ResetAllRenderingState())
                  : ((_ = i.Entity.GetComponent(168))?.Valid &&
                      ((a.OriginEnableLookAt = _.OpenLookAt),
                      _.SetLookAtPlayerEnabled(!1),
                      _.OnNpcInPlot(!0)),
                    (_ = i.Entity?.GetComponent(38))?.Valid &&
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
  v5s(t) {
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
  xYi(e, t) {
    this.nx.IsBackground && t();
    var i = new Array();
    for (let t = 0; t < e.length; t++) {
      var s,
        o,
        r = e[t],
        _ = this.UYi[t];
      _.Valid
        ? ((s = r.InitialState?.InitialMontage) &&
            ((o = _.IsPlayer()
              ? this.wYi(s.MontageId.MontageId)
              : s.MontageId.MontageId),
            (s = s.MontageId.IsAbp
              ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(o)
              : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(o))
              ? i.push(this.BYi(_, s.ActionMontage))
              : ControllerHolder_1.ControllerHolder.FlowController.LogError(
                  "初始化演员蒙太奇时找不到资源",
                  ["id", o],
                )),
          (s = r.InitialState?.InitialLookAt) &&
            ((o = EntitySystem_1.EntitySystem.Get(_.EntityId).GetComponent(
              160,
            )),
            this.bYi(o, s, _)))
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
  async BYi(i, t) {
    const s = new CustomPromise_1.CustomPromise();
    return (
      this.qYi(t, (t) => {
        var e;
        ObjectUtils_1.ObjectUtils.IsValid(t) &&
          ((e = EntitySystem_1.EntitySystem.Get(i.EntityId).GetComponent(
            160,
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
    if (!this.yYi && e && this.IsInTemplate) {
      var i, s;
      this.GYi(e.TemplateMode.CameraId),
        e.TargetPos &&
          (this.NYi(e.TargetPos),
          (s = Vector_1.Vector.Create(
            e.TargetPos.X,
            e.TargetPos.Y,
            e.TargetPos.Z,
          )),
          (i = Rotator_1.Rotator.Create(0, e.TargetPos.A, 0)),
          this.sYi.SetRotation(i.Quaternion()),
          this.sYi.SetLocation(s),
          this.sYi.SetScale3D(Vector_1.Vector.OneVectorProxy),
          (this.aYi = e.TargetPos.A));
      let t = !1;
      e.ActorIndexArray && ((t = !0), (this.CYi = e.ActorIndexArray)),
        this.CYi
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
            (s = this.OYi(t)),
            this.kYi(),
            this.FYi(i),
            this.PlayCameraAnimCompatible(e.CameraAnim),
            await s)
          : ControllerHolder_1.ControllerHolder.FlowController.LogError(
              "没有演员列表啊，前面也没有",
            );
    }
  }
  GYi(t) {
    var e;
    (this.rYi = ModelManager_1.ModelManager.PlotModel.GetPlotTemplateConfig(t)),
      this.rYi
        ? (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 27, "演出模板", [
              "TemplateName",
              this.rYi.Name,
            ]),
          (e = this.SYi.exec(this.rYi.Name)),
          (this.mYi =
            null !== e && 0 < e.length
              ? parseInt(e[0]) - 1
              : ACTOR_EMPTY_INDEX),
          (e = this.EYi.exec(this.rYi.Name)),
          (this.dYi = null !== e && 0 < e.length ? e[0] : "UNDEFINED"))
        : ControllerHolder_1.ControllerHolder.FlowController.LogError(
            "C级演出模板配置读取失败",
            ["Id", t],
          );
  }
  async OYi(e) {
    let i = void 0;
    var s = this.rYi.ActorDataArray,
      o = Vector_1.Vector.Create(0, 0, 0),
      r = Vector_1.Vector.Create(0, 0, 0),
      _ = new UE.Vector(0, 0, 0),
      a = new UE.Rotator(0, 0, 0),
      t = ((this.vYi = 0), Time_1.Time.Frame);
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Plot", 27, "剧情切镜飘带处理 -关闭", ["frame", t]),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Kuro.DisableKawaiiSimulate 1",
      );
    for (
      let t = 0;
      t < s.length && !(t >= this.CYi.length || t >= this.UYi.length);
      t++
    ) {
      var h = this.CYi[t];
      if (!(h.Index === ACTOR_EMPTY_INDEX || h.Index >= this.UYi.length)) {
        var n = this.UYi[h.Index];
        if (n.Valid)
          if (n.Valid) {
            var l = EntitySystem_1.EntitySystem.Get(n.EntityId)?.GetComponent(
              3,
            );
            if (l) {
              e && h.Offset
                ? (this.NYi(h.Offset),
                  (_.X = h.Offset.X),
                  (_.Y = h.Offset.Y),
                  (_.Z = h.Offset.Z),
                  (a.Yaw = ((h.Offset.A + 180) % 360) - 180),
                  r.FromUeVector(_))
                : ((m = s[t]),
                  o.Set(m.X, m.Y, 0),
                  this.sYi.TransformPosition(o, r),
                  _.Set(r.X, r.Y, r.Z),
                  (a.Yaw = ((m.A + this.aYi + 180) % 360) - 180));
              var m = _.Z,
                c = (this.VYi(_, l), _.Z - m),
                E =
                  ((_.Z +=
                    l.Actor.CapsuleComponent.GetScaledCapsuleHalfHeight()),
                  this.HYi(n.Pos, _.X, _.Y, _.Z, a.Yaw));
              if (
                ((n.Pos.X = _.X),
                (n.Pos.Y = _.Y),
                (n.Pos.Z = _.Z),
                (n.Pos.A = a.Yaw),
                !this.nx.IsBackground)
              )
                if (
                  (t === this.mYi &&
                    (Log_1.Log.CheckDebug() &&
                      Log_1.Log.Debug("Plot", 27, "演员位", [
                        "station",
                        this.mYi,
                      ]),
                    (this.vYi = c)),
                  E)
                )
                  Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug("Plot", 27, "位置相同，略了", [
                      "id",
                      n.PbDataId,
                    ]);
                else {
                  if (n.IsPlayer()) {
                    if (this.jYi(n.OriginPos, n.Pos)) {
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
      (this.Hqn = new CustomPromise_1.CustomPromise()),
      (this.Vqn = t + 3),
      await this.Hqn.Promise,
      !0
    );
  }
  jqn() {
    var t;
    !this.Hqn ||
      (t = Time_1.Time.Frame) < this.Vqn ||
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 27, "剧情切镜飘带处理 -开启", ["curFrame", t]),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Kuro.DisableKawaiiSimulate 0",
      ),
      (t = this.Hqn),
      (this.Vqn = -1),
      (this.Hqn = void 0),
      t.SetResult());
  }
  HYi(t, e, i, s, o) {
    return (
      MathUtils_1.MathUtils.IsNearlyEqual(t.X, e, 1) &&
      MathUtils_1.MathUtils.IsNearlyEqual(t.Y, i, 1) &&
      MathUtils_1.MathUtils.IsNearlyEqual(t.Z, s, 1) &&
      MathUtils_1.MathUtils.IsNearlyEqual(t.A, o, 1)
    );
  }
  jYi(t, e) {
    (t = Vector_1.Vector.Create(t)), (e = Vector_1.Vector.Create(e));
    return Vector_1.Vector.DistSquared(t, e) > MAX_POS_DIST_SQ;
  }
  FYi(e) {
    if (!this.nx.IsBackground) {
      this.RYi.Stop();
      var i = this.rYi.CameraData;
      let t = e;
      if (!t) {
        var e = Vector_1.Vector.Create(i.Pos.X, i.Pos.Y, i.Pos.Z),
          s = Rotator_1.Rotator.Create(i.Rot.Y, i.Rot.Z, i.Rot.X);
        if (
          ("_CU" === this.dYi || "_MS" === this.dYi) &&
          0 <= this.mYi &&
          this.mYi < this.CYi.length
        ) {
          var o = this.CYi[this.mYi].Index;
          if (o !== ACTOR_EMPTY_INDEX) {
            o = this.UYi[o];
            let t =
              EntitySystem_1.EntitySystem.Get(o.EntityId)
                ?.GetComponent(3)
                ?.Actor.Mesh.GetSocketTransform(PlotTemplate.WYi, 2)
                ?.GetLocation().Z ?? DEFAULT_CAMERA_BASE;
            0 === t
              ? ((t =
                  EntitySystem_1.EntitySystem.Get(o.EntityId)
                    ?.GetComponent(3)
                    ?.Actor.Mesh.GetSocketTransform(PlotTemplate.KYi, 2)
                    ?.GetLocation().Z ?? DEFAULT_CAMERA_BASE_HEAD),
                (this.vYi += 0 !== t ? t - DEFAULT_CAMERA_BASE_HEAD : 0))
              : (this.vYi += t - DEFAULT_CAMERA_BASE),
              (e.Z += this.vYi),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Plot", 27, "CU、MS相机自动调整", [
                  "Offset",
                  this.vYi,
                ]);
          }
        }
        o = Transform_1.Transform.Create(
          s.Quaternion(),
          e,
          Vector_1.Vector.OneVectorProxy,
        );
        (t = Transform_1.Transform.Create()), o.ComposeTransforms(this.sYi, t);
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
        this.QYi());
    }
  }
  QYi() {
    for (const t of this.UYi)
      t.Valid &&
        t.Visible &&
        EntitySystem_1.EntitySystem.Get(t.EntityId)
          ?.GetComponent(160)
          ?.StartForceDisableAnimOptimization(3);
  }
  async EndTemplateNew(t) {
    this.IsInTemplate &&
      (this.RYi.Stop(),
      this.yYi ||
        (ModelManager_1.ModelManager.PlotModel.SwitchCameraMode(1),
        CameraController_1.CameraController.FightCamera.LogicComponent.ResetArmLengthAndRotation(
          ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.PlotTemplateCameraExitRotation.ToUeRotator(),
        ),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.MotionBlur.Amount " + this.TYi,
        )),
      await this.Lc(t),
      this.HVs.CleanAction(!1),
      this._Yi.forEach((t) => {
        TimerSystem_1.TimerSystem.Remove(t);
      }),
      this._Yi.clear(),
      this.uYi.forEach((t) => {
        TimerSystem_1.TimerSystem.Remove(t);
      }),
      this.uYi.clear(),
      this.tYi.clear(),
      (this.vYi = 0),
      (this.rYi = void 0),
      this.sYi.Reset(),
      (this.aYi = 0),
      (this.gYi = PLAYER_UNUSED_INDEX),
      (this.nYi = !1),
      (this.IYi = 0),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Kuro.DisableKawaiiSimulate 0",
      ));
  }
  async Lc(e) {
    var i = [];
    for (let t = 0; t < this.UYi.length; t++) {
      var s,
        o,
        r,
        _,
        a = this.UYi[t];
      a.Valid &&
        ((o = (s = EntitySystem_1.EntitySystem.Get(a.EntityId))?.GetComponent(
          3,
        ))
          ? (o.ClearInput(),
            a.IsPlayer() || a.FaceChangeManager.ResetFacialExpression(),
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
            (r = (_ = s.GetComponent(160))?.MainAnimInstance),
            ObjectUtils_1.ObjectUtils.IsValid(r) &&
              (r.OnMontageEnded.Remove(a.ResetFacialExpressionCallback),
              r.Montage_Stop(MONTAGE_BLEND_OUT_TIME),
              _.ResetSightLimit(),
              _.SetSightTargetItem(void 0)),
            (r = s.GetComponent(57))?.Valid &&
              a.OriginMoveSync &&
              r.SetEnableMovementSync(!0),
            void 0 !== a.TurningTimer &&
              TimerSystem_1.TimerSystem.Remove(a.TurningTimer),
            t === this.gYi
              ? o.Actor.CharRenderingComponent?.ResetAllRenderingState()
              : ((r = s?.GetComponent(38))?.Valid &&
                  a.OriginEnableAi &&
                  r.EnableAi("Plot Control Ai"),
                (r = s.GetComponent(168))?.Valid &&
                  (a.OriginEnableLookAt && r.SetLookAtPlayerEnabled(!0),
                  r.OnNpcInPlot(!1)),
                (r = s.GetComponent(36))?.Valid &&
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
            i.push(this.XYi(a, e?.IsResetPosition)),
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
  async XYi(e, i = !1) {
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
          this.yYi
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
  AYi(t, e) {
    const i = new Array();
    this.gYi = PLAYER_UNUSED_INDEX;
    for (const s of t)
      s !== PLAYER_USED_ID ? i.push(s) : (this.gYi = t.indexOf(s));
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Plot", 18, "剧情加载等待-npc-开始", ["", i]),
      WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(
        i,
        (t) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 18, "剧情加载等待-npc-完成", ["result", t]),
            this.xyn(i, e);
        },
        !0,
        WAIT_ENTITY_TIME,
      );
  }
  xyn(t, s) {
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
        (this.t4s = 0),
        (this.xYt = TimerSystem_1.TimerSystem.Forever(() => {
          this.t4s++;
          let t = !0;
          for (var [e, i] of o)
            i ||
              (UE.KuroMeshTextureFunctionLibrary.IsSkeletalMeshComponentStreamingComplete(
                e,
              )
                ? o.set(e, !0)
                : (t = !1));
          (t || 15 < this.t4s) &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Plot", 27, "剧情加载等待 npc纹理流送 完成", [
                "checkTimes",
                this.t4s,
              ]),
            (this.t4s = 0),
            this.xYt?.Remove(),
            (this.xYt = void 0),
            s());
        }, 200)));
  }
  NYi(t) {
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
      this.RYi.Play({
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
      ((this.IYi = 0),
      this.DYi ? (this.DYi = !1) : (this.LYi = !1),
      t.CameraData &&
        Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Plot", 27, "旧演出模板已废弃"),
      (e = this.SetTemplateNew(t.FlowTemplate)),
      this.ZYi(t),
      await e,
      this.$Yi(t.WhoId, t.ActorTurnToArray),
      this.nx.IsBackground ||
        (this.YYi(t.WhoId, t.ActorLookAtArray),
        this.JYi(t.ActorMontageArray),
        this.zYi(t)));
  }
  ZYi(t) {
    let e = void 0;
    switch (t.Type) {
      case "Talk":
      case "Option":
        e = t.CameraMotion;
    }
    e && this.RYi.Play(e);
  }
  YYi(t, e) {
    this.HVs.CleanAction();
    var i,
      s = this.lYi.get(t);
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
    for (const h of this.UYi)
      !h.Valid ||
        h.Visible ||
        h.LookLocked ||
        ((i = EntitySystem_1.EntitySystem.Get(h.EntityId)?.GetComponent(160))
          ?.Valid &&
          (i.ResetSightLimit(), i.SetSightTargetItem(void 0)));
    for (const n of this.CYi)
      if (n.Index !== ACTOR_EMPTY_INDEX) {
        var _,
          a = this.UYi[n.Index];
        if (a.Valid) {
          const l = EntitySystem_1.EntitySystem.Get(a.EntityId)?.GetComponent(
            160,
          );
          l?.Valid &&
            ((_ = a.LookLocked),
            (r.has(n.Index) && this.jVs(l, r.get(n.Index), a, s)) ||
              _ ||
              ("_CU" === this.dYi && n === this.CYi[this.mYi]
                ? (l.ResetSightLimit(), l.SetSightTargetItem(void 0))
                : a.Visible &&
                  a.Valid &&
                  (s?.Visible && s?.Valid
                    ? a === s
                      ? l.GetSightTargetPoint() ||
                        this.eJi(l.GetSightTargetItem()) ||
                        (l.ResetSightLimit(), l.SetSightTargetItem(void 0))
                      : ((_ =
                          ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
                            .PlotTemplateLookAtDelay),
                        (_ = MathUtils_1.MathUtils.GetRandomRange(_[0], _[1])),
                        this.HVs.DelayAction(
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
  jVs(i, t, s, o) {
    const r = t.length - 1;
    if (r < 0) return !1;
    let _ = !1;
    return (
      t.forEach((t, e) => {
        (_ ||=
          (t.DelayTime ?? 0) * CommonDefine_1.MILLIONSECOND_PER_SECOND <
          TimerSystem_1.MIN_TIME),
          this.bYi(i, t.Target, s, o, t.DelayTime, e === r);
      }),
      _
    );
  }
  bYi(e, t, i, s, o = 0, r) {
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
          const m = n.Entity.GetComponent(3) ?? n.Entity.GetComponent(182);
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
      ? this.HVs.DelayAction(i.EntityId, o, _, a)
      : _?.();
  }
  eJi(t) {
    if (!t) return !1;
    if ((0, RegisterComponent_1.isComponentInstance)(t, 3))
      for (const e of this.UYi)
        if (!e.Visible && e.Valid)
          if (
            EntitySystem_1.EntitySystem.Get(e.EntityId)?.GetComponent(3) === t
          )
            return !1;
    return !0;
  }
  JYi(t) {
    this._Yi.forEach((t) => {
      TimerSystem_1.TimerSystem.Remove(t);
    }),
      this._Yi.clear();
    for (const i of this.UYi)
      (i.BodyMontagePath = void 0), (i.OverlayMontagePath = void 0);
    if (t)
      for (const s of t)
        if (!(s.ActorIndex < 0 || s.ActorIndex >= ACTOR_NUM_MAX)) {
          const o = this.UYi[s.ActorIndex];
          if (o.Valid && o.Visible)
            if (s.EndLoopingMontage)
              (o.MontageKeeping = !1), (o.OverlayMontageKeeping = !1);
            else {
              var e = s.DelayTime
                ? TimeUtil_1.TimeUtil.SetTimeMillisecond(s.DelayTime)
                : 0;
              if (e <= TimerSystem_1.MIN_TIME) this.tJi(o, s, !1);
              else {
                const r = TimerSystem_1.TimerSystem.Delay(() => {
                  this.tJi(o, s, !0), this._Yi.delete(r);
                }, e);
                this._Yi.add(r);
              }
              if (s.OverlayMontage) {
                e = s.OverlayMontage?.DelayTime
                  ? TimeUtil_1.TimeUtil.SetTimeMillisecond(
                      s.OverlayMontage.DelayTime,
                    )
                  : 0;
                if (e <= TimerSystem_1.MIN_TIME) this.iJi(o, s, !1);
                else {
                  const _ = TimerSystem_1.TimerSystem.Delay(() => {
                    this.iJi(o, s, !0), this._Yi.delete(_);
                  }, e);
                  this._Yi.add(_);
                }
              }
            }
        }
    for (const a of this.UYi)
      a.Valid &&
        a.Visible &&
        (this.oJi(a),
        this.rJi(a),
        this.qYi(a.BodyMontagePath, (t) => {
          this.nJi(a, t);
        }),
        this.qYi(a.OverlayMontagePath, (t) => {
          this.sJi(a, t);
        }));
  }
  iJi(e, i, s) {
    if (void 0 !== i.OverlayMontage?.MontageId.MontageId)
      if (void 0 !== e.TurningTimer)
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Plot", 27, "试图在转身期间播放蒙太奇，已阻止");
      else {
        var o =
          i.ActorIndex === this.gYi
            ? this.wYi(i.OverlayMontage.MontageId.MontageId)
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
              (this.rJi(e),
              this.qYi(e.OverlayMontagePath, (t) => {
                this.sJi(e, t);
              })))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Plot", 27, "模板蒙太奇库中没有该资源", ["Id", o]);
      }
  }
  tJi(e, i, s) {
    if (void 0 !== i.MontageId)
      if (void 0 !== e.TurningTimer)
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Plot", 27, "试图在转身期间播放蒙太奇，已阻止");
      else {
        var o = i.ActorIndex === this.gYi ? this.wYi(i.MontageId) : i.MontageId;
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
            e.FaceChangeManager?.InitFaceExpressionData(i.FaceExpressionId),
            s &&
              (this.oJi(e),
              this.qYi(e.BodyMontagePath, (t) => {
                this.nJi(e, t);
              })))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Plot", 27, "模板蒙太奇库中没有该资源", ["Id", o]);
      }
  }
  wYi(t) {
    var e = ModelManager_1.ModelManager.RoleModel.GetBattleTeamFirstRoleId();
    return e === NANZHU_ROLEID || e === NANZHU_ROLEID_NORMAL ? t + 1 : t;
  }
  qYi(e, i) {
    var t;
    !e || StringUtils_1.StringUtils.IsEmpty(e)
      ? i(void 0)
      : ((t = this.tYi.get(e)),
        ObjectUtils_1.ObjectUtils.IsValid(t)
          ? i(t)
          : ResourceSystem_1.ResourceSystem.LoadAsync(
              e,
              UE.AnimMontage,
              (t) => {
                this.IsInTemplate && (this.tYi.set(e, t), i(t));
              },
            ));
  }
  oJi(t) {
    var e,
      i = EntitySystem_1.EntitySystem.Get(t.EntityId)?.GetComponent(
        160,
      )?.MainAnimInstance;
    ObjectUtils_1.ObjectUtils.IsValid(i) &&
      (this.LYi && !t.MontageKeeping
        ? i.Montage_SetNextSection(
            CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
            CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
          )
        : (ObjectUtils_1.ObjectUtils.IsValid(t.BodyMontage) &&
          i.Montage_IsPlaying(t.BodyMontage)
            ? StringUtils_1.StringUtils.IsEmpty(t.BodyMontagePath)
              ? t.MontageKeeping ||
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
              : t.BodyMontage !== this.tYi.get(t.BodyMontagePath) &&
                (i.Montage_Stop(MONTAGE_BLEND_OUT_TIME, t.BodyMontage),
                (t.BodyMontage = void 0))
            : (t.BodyMontage = void 0),
          t.MontageKeeping ||
            (i.OnMontageEnded.Remove(t.ResetFacialExpressionCallback),
            t.FaceChangeManager?.ResetFacialExpression())));
  }
  rJi(t) {
    var e,
      i = EntitySystem_1.EntitySystem.Get(t.EntityId)?.GetComponent(
        160,
      )?.MainAnimInstance;
    ObjectUtils_1.ObjectUtils.IsValid(i) &&
      (ObjectUtils_1.ObjectUtils.IsValid(t.OverlayMontage) &&
      i.Montage_IsPlaying(t.OverlayMontage)
        ? StringUtils_1.StringUtils.IsEmpty(t.OverlayMontagePath)
          ? t.OverlayMontageKeeping ||
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
          : t.OverlayMontage !== this.tYi.get(t.OverlayMontagePath) &&
            (i.Montage_Stop(MONTAGE_BLEND_OUT_TIME, t.OverlayMontage),
            (t.OverlayMontage = void 0))
        : (t.OverlayMontage = void 0));
  }
  nJi(t, e, i = 1) {
    var s;
    ObjectUtils_1.ObjectUtils.IsValid(e) &&
      this.IsInTemplate &&
      ((s = EntitySystem_1.EntitySystem.Get(t.EntityId)?.GetComponent(
        160,
      )?.MainAnimInstance),
      ObjectUtils_1.ObjectUtils.IsValid(s)) &&
      (this.tYi.get(t.BodyMontagePath) !== e
        ? Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Plot", 27, "异步加载完的蒙太奇过期了")
        : ((t.BodyMontagePath = void 0),
          (s.Montage_IsPlaying(e) &&
            !s
              .Montage_GetCurrentSection(e)
              .op_Equality(
                CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
              )) ||
            (this.LYi &&
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
            s.OnMontageEnded.Add(t.ResetFacialExpressionCallback),
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
          t.FaceChangeManager?.ChangeFacialExpression()));
  }
  sJi(t, e, i = 1) {
    var s;
    ObjectUtils_1.ObjectUtils.IsValid(e) &&
      this.IsInTemplate &&
      ((s = EntitySystem_1.EntitySystem.Get(t.EntityId)?.GetComponent(
        160,
      )?.MainAnimInstance),
      ObjectUtils_1.ObjectUtils.IsValid(s)) &&
      (this.tYi.get(t.OverlayMontagePath) !== e
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
  VYi(t, s) {
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
  kYi() {
    if (this.UYi && this.CYi) {
      const i = new Map();
      this.CYi.forEach((t) => {
        t.Index !== ACTOR_EMPTY_INDEX && i.set(t.Index, t);
      }),
        this.UYi.forEach((t, e) => {
          t.Valid &&
            ((this.cYi.Visible = i.has(e)),
            (this.cYi.UseEffect = !1),
            t.Visible !== this.cYi.Visible) &&
            ((t.Visible = this.cYi.Visible), this.aJi(t, this.cYi));
        });
    }
  }
  aJi(t, e) {
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
          (t = t.GetComponent(160))?.Valid &&
            t.MainAnimInstance.Montage_Stop(0),
          e.UseEffect &&
            i.Actor.DitherEffectController.EnterDisappearEffect(
              DITHER_RATE_PER_SECOND,
              1,
            ))
      : Log_1.Log.CheckWarn() && Log_1.Log.Warn("Plot", 27, "显隐实体出错");
  }
  SetActorName(t) {
    t.ActorIndex >= this.UYi.length ||
      t.ActorIndex < 0 ||
      this.lYi.set(t.Talker, this.UYi[t.ActorIndex]);
  }
  zYi(e) {
    for (const i of this.UYi)
      i.Valid &&
        (i.MouseMontageLoadingId !==
          ResourceSystem_1.ResourceSystem.InvalidId &&
          (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(
            i.MouseMontageLoadingId,
          ),
          (i.MouseMontageLoadingId =
            ResourceSystem_1.ResourceSystem.InvalidId)),
        EntitySystem_1.EntitySystem.Get(i.EntityId)
          ?.GetComponent(160)
          ?.MainAnimInstance?.StopSlotAnimation(
            0,
            SequenceDefine_1.ABP_Mouth_Slot_Name,
          ));
    if (
      e.PlayVoice &&
      e.WhoId &&
      (!e || "Talk" === e.Type) &&
      !StringUtils_1.StringUtils.IsEmpty(e.TidTalk)
    ) {
      var t = e;
      if ("InnerVoice" !== t.Style?.Type) {
        const i = this.lYi.get(e.WhoId);
        if (i?.Valid && i?.Visible) {
          const s = EntitySystem_1.EntitySystem.Get(i.EntityId)?.GetComponent(
            160,
          )?.MainAnimInstance;
          s
            ? ((t = PlotAudioById_1.configPlotAudioById.GetConfig(e.TidTalk)),
              (t = PlotAudioModel_1.PlotAudioModel.GetAudioMouthAnimName([
                t.IsCheckSex,
                t.FileName,
              ])),
              (i.MouseMontageLoadingId =
                ResourceSystem_1.ResourceSystem.LoadAsync(
                  t,
                  UE.AnimSequence,
                  (t) => {
                    (i.MouseMontageLoadingId =
                      ResourceSystem_1.ResourceSystem.InvalidId),
                      s.PlaySlotAnimationAsDynamicMontage(
                        t,
                        SequenceDefine_1.ABP_Mouth_Slot_Name,
                        0,
                        0,
                        1,
                        1,
                        -1,
                        0,
                        !1,
                      ),
                      Log_1.Log.CheckDebug() &&
                        Log_1.Log.Debug(
                          "Plot",
                          39,
                          "MouthAnim 播放口型",
                          ["Key", e.TidTalk],
                          ["Asset", t?.GetName()],
                          ["ABP", s.GetName()],
                        );
                  },
                )))
            : Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("Plot", 27, "播放嘴型时拿不到AnimInst", [
                "EntityId",
                i.EntityId,
              ]);
        }
      }
    }
  }
  $Yi(e, t) {
    if (
      (this.uYi.forEach((t) => {
        TimerSystem_1.TimerSystem.Remove(t);
      }),
      t && 0 !== t.length)
    )
      for (const _ of t)
        if (!(_.ActorIndex > this.UYi.length)) {
          const a = this.UYi[_.ActorIndex];
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
                var s = this.lYi.get(e);
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
                if (r < TimerSystem_1.MIN_TIME) this.hJi(a, t);
                else {
                  const h = TimerSystem_1.TimerSystem.Delay(() => {
                    this.hJi(a, t), this.uYi.delete(h);
                  }, r);
                  this.uYi.add(h);
                }
                this.IYi < r + WAIT_TURING_TIME &&
                  (this.IYi = r + WAIT_TURING_TIME);
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
  hJi(t, e) {
    var i, s, o;
    void 0 !== t.TurningTimer
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Plot", 27, "多次触发转身！！！！注意表现")
      : (i = (s = EntitySystem_1.EntitySystem.Get(t.EntityId))?.GetComponent(3))
          ?.Valid &&
        ((s = s?.GetComponent(160)),
        i.ClearInput(),
        s.MainAnimInstance.Montage_Stop(0),
        (t.TurningTimer = TimerSystem_1.TimerSystem.Delay(() => {
          t.TurningTimer = void 0;
        }, WAIT_TURING_TIME)),
        t.PbDataId !== PLAYER_USED_ID
          ? AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(i, e, 0)
          : ((s = MathUtils_1.MathUtils.CommonTempRotator),
            (o = MathUtils_1.MathUtils.CommonTempVector),
            e.Subtraction(i.ActorLocationProxy, o),
            o.Normalize(),
            (s.Roll = 0),
            (s.Pitch = 0),
            (s.Yaw = MathUtils_1.MathUtils.GetAngleByVector2D(o)),
            i.SetInputRotator(s)));
  }
  SetTemplatePlayerTransform(t) {
    var e;
    this.gYi !== PLAYER_UNUSED_INDEX &&
      (((e = this.UYi[this.gYi]).Pos.X = t.X ?? 0),
      (e.Pos.Y = t.Y ?? 0),
      (e.Pos.Z = t.Z ?? 0),
      (e.Pos.A = t.A ?? 0));
  }
  OnTick(t) {
    this.IsInTemplate && (this.RYi.OnTick(t), this.jqn());
  }
}
((exports.PlotTemplate = PlotTemplate).WYi = new UE.FName(
  "Bip001_Pupil_Bone01_L",
)),
  (PlotTemplate.KYi = new UE.FName("Bip001Head"));
//# sourceMappingURL=PlotTemplate.js.map
