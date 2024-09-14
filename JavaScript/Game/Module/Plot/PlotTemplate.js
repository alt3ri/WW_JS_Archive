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
  NpcPerformController_1 = require("../../NewWorld/Character/Npc/Controller/NpcPerformController"),
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
  MONTAGE_BLEND_OUT_TIME = 0.5,
  DEFAULT_CAMERA_BASE = 140.19,
  DEFAULT_CAMERA_BASE_HEAD = 135.96,
  MAX_POS_DIST_SQ = 1e6;
class ActorData {
  constructor() {
    (this.ValidInternal = !1),
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
    (this.Sia = new Set()), (this.Eia = new Map());
  }
  DelayAction(e, t, i, o) {
    if (o) {
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
      (this.tNn = -1),
      (this.iNn = void 0),
      (this.xJt = void 0),
      (this.a9s = 0),
      (this.LJi = new MovingShotManager_1.MovingShotManager()),
      (this.yia = new DelayActionManager()),
      (this.B4a = new DelayActionManager());
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
  StartTemplateNew(t, e, i) {
    (this.oJi = !0),
      (this.EJi = t.UseFreeCamera),
      (this.SJi = 0),
      (this.nx = e),
      (this.TJi = !0),
      (this.IJi = !0);
    var o = new Array();
    for (const s of t.Actors) o.push(s.EntityId);
    this.RJi(o, () => {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 27, "等待模板演出实体完成"),
        this.EJi
          ? ControllerHolder_1.ControllerHolder.PlotController.EnableViewControl(
              !0,
            )
          : (ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent.CineCamera.ResetSeqCineCamSetting(),
            ModelManager_1.ModelManager.PlotModel.SwitchCameraMode(3),
            ControllerHolder_1.ControllerHolder.PlotController.EnableViewControl(
              !1,
            ),
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
        o,
        s,
        r,
        a,
        _ = this.DJi[t];
      _.Reset(),
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
                (s = i.Entity.GetComponent(34))?.Valid &&
                  s.StopAllSkills("PlotTemplate.ControlActor"),
                (s = i.Entity.GetComponent(38))?.Valid &&
                  (s.CharacterMovement &&
                    (s.CharacterMovement.Velocity = Vector_1.Vector.ZeroVector),
                  o.ResetCachedVelocityTime()),
                (r = i.Entity.GetComponent(163))?.Valid &&
                  r.SetSightTargetItem(void 0),
                (a = i.Entity.GetComponent(60))?.Valid &&
                  ((_.OriginMoveSync = a.GetEnableMovementSync()),
                  _.OriginMoveSync) &&
                  a.SetEnableMovementSync(!1, "PlotTemplate"),
                (_.Valid = !0),
                (_.EntityId = i.Id),
                (_.PbDataId = e[t].EntityId),
                (_.TalkerId = e[t].TalkerId),
                (_.OriginPos.X = o.ActorLocationProxy.X),
                (_.OriginPos.Y = o.ActorLocationProxy.Y),
                (_.OriginPos.Z = o.ActorLocationProxy.Z),
                (_.OriginPos.A = o.ActorRotationProxy.Yaw),
                Object.assign(_.Pos, _.OriginPos),
                (_.IsPosReset = e[t].IsResetPosition),
                (_.OriginEnableLookAt = !1),
                (_.Visible = !0),
                (_.OriginMoveMode = s.CharacterMovement.MovementMode),
                _.IsPlayer() ||
                  ((a = i?.Entity?.GetComponent(172)),
                  (_.FaceChangeManager = a?.ExpressionController)),
                -1 !== _.TalkerId
                  ? (this.aJi.has(_.TalkerId) &&
                      Log_1.Log.CheckWarn() &&
                      Log_1.Log.Warn(
                        "Plot",
                        27,
                        "重复的对话人，请策划检查配置",
                      ),
                    this.aJi.set(_.TalkerId, _))
                  : Log_1.Log.CheckWarn() &&
                    Log_1.Log.Warn(
                      "Plot",
                      27,
                      "未配置说话人，口型和自动看向功能不生效",
                      ["演员位", t],
                    ),
                t === this.dJi
                  ? (o.Entity.GetComponent(72).HideWeapon(-1, !0, !1),
                    this.EJi ||
                      o.Actor.CharRenderingComponent?.SetDisableFightDither(!0))
                  : (NpcPerformController_1.NpcPerformController.ForceSetNpcDitherVisible(
                      !0,
                      _.PbDataId,
                      1,
                    ),
                    (a = i.Entity.GetComponent(172))?.Valid &&
                      ((_.OriginEnableLookAt = a.OpenLookAt),
                      a.SetLookAtPlayerEnabled(!1),
                      a.OnNpcInPlot(!0)),
                    (a = i.Entity?.GetComponent(40))?.Valid &&
                      ((_.OriginEnableAi = a.IsAiDriver && a.IsEnabled()),
                      _.OriginEnableAi) &&
                      a.DisableAi("Plot Control Ai"),
                    s.CharacterMovement.SetMovementMode(1),
                    r.SetBlendSpaceLookAt(!0)),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Plot",
                    27,
                    "演员信息",
                    ["index", t],
                    ["actor", o.Actor.GetName()],
                    ["entityId", _.EntityId],
                    [
                      "pbDataId",
                      -1 === _.PbDataId
                        ? o.CreatureData.GetPbDataId()
                        : _.PbDataId,
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
    this.nx.IsBackground && t();
    var i = new Array();
    for (let t = 0; t < e.length; t++) {
      var o,
        s,
        r = e[t],
        a = this.DJi[t];
      a.Valid
        ? ((o = r.InitialState?.InitialMontage) &&
            ((s = a.IsPlayer()
              ? this.PJi(o.MontageId.MontageId)
              : o.MontageId.MontageId),
            (o = o.MontageId.IsAbp
              ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(s)
              : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(s))
              ? i.push(this.xJi(a, o.ActionMontage))
              : ControllerHolder_1.ControllerHolder.FlowController.LogError(
                  "初始化演员蒙太奇时找不到资源",
                  ["id", s],
                )),
          (o = r.InitialState?.InitialLookAt) &&
            ((s = EntitySystem_1.EntitySystem.Get(a.EntityId).GetComponent(
              163,
            )),
            this.wJi(s, o, a)))
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Plot", 27, "初始化演员失败", [
            "EntityId",
            r.EntityId,
          ]);
    }
    const _ = new CustomPromise_1.CustomPromise();
    i.push(_.Promise),
      TimerSystem_1.TimerSystem.Delay(() => {
        _.SetResult();
      }, BEGIN_WAIT_TIME),
      Promise.all(i).finally(t);
  }
  async xJi(i, t) {
    const o = new CustomPromise_1.CustomPromise();
    return (
      this.BJi(t, (t) => {
        var e;
        ObjectUtils_1.ObjectUtils.IsValid(t) &&
          ((e = EntitySystem_1.EntitySystem.Get(i.EntityId).GetComponent(
            163,
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
          o.SetResult();
      }),
      o.Promise
    );
  }
  async SetTemplateNew(e) {
    if (!this.EJi && e && this.IsInTemplate) {
      var i, o;
      this.bJi(e.TemplateMode.CameraId),
        e.TargetPos &&
          (this.qJi(e.TargetPos),
          (o = Vector_1.Vector.Create(
            e.TargetPos.X,
            e.TargetPos.Y,
            e.TargetPos.Z,
          )),
          (i = Rotator_1.Rotator.Create(0, e.TargetPos.A, 0)),
          this.rJi.SetRotation(i.Quaternion()),
          this.rJi.SetLocation(o),
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
    var o = this.iJi.ActorDataArray,
      s = Vector_1.Vector.Create(0, 0, 0),
      r = Vector_1.Vector.Create(0, 0, 0),
      a = new UE.Vector(0, 0, 0),
      _ = new UE.Rotator(0, 0, 0),
      t = ((this.fJi = 0), Time_1.Time.Frame);
    this.nx.IsBackground ||
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 27, "剧情切镜飘带处理 -关闭", ["frame", t]),
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
                  (a.X = h.Offset.X),
                  (a.Y = h.Offset.Y),
                  (a.Z = h.Offset.Z),
                  (_.Yaw = ((h.Offset.A + 180) % 360) - 180),
                  r.FromUeVector(a))
                : ((m = o[t]),
                  s.Set(m.X, m.Y, 0),
                  this.rJi.TransformPosition(s, r),
                  a.Set(r.X, r.Y, r.Z),
                  (_.Yaw = ((m.A + this.nJi + 180) % 360) - 180));
              var m = a.Z,
                c = (this.kJi(a, l), a.Z - m),
                E =
                  ((a.Z +=
                    l.Actor.CapsuleComponent.GetScaledCapsuleHalfHeight()),
                  this.FJi(n.Pos, a.X, a.Y, a.Z, _.Yaw));
              if (
                ((n.Pos.X = a.X),
                (n.Pos.Y = a.Y),
                (n.Pos.Z = a.Z),
                (n.Pos.A = _.Yaw),
                !this.nx.IsBackground)
              )
                if (
                  (!n.IsPlayer() &&
                    l.HasMesh() &&
                    (l.SkeletalMesh.bForceTickThisFrame = !0),
                  t === this.uJi &&
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
                          a,
                          _,
                          "剧情演出.SetupTemplateActor",
                        );
                      continue;
                    }
                    l.Actor.CharacterMovement?.SetMovementMode(
                      l.Actor.CharacterMovement?.DefaultLandMovementMode,
                    );
                  }
                  l.FixBornLocation("剧情演出.SetupTemplateActor", !0, r, !1),
                    l.SetActorRotation(_, "剧情演出.SetupTemplateActor", !1),
                    l.SetInputRotator(_);
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
        Log_1.Log.Debug("Plot", 27, "剧情切镜飘带处理 -开启", ["curFrame", t]),
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
  OJi(e, i) {
    if (!this.nx.IsBackground) {
      this.LJi.Stop();
      var o = this.iJi.CameraData;
      let t = e;
      if (!t) {
        var e = Vector_1.Vector.Create(o.Pos.X, o.Pos.Y, o.Pos.Z),
          s = Rotator_1.Rotator.Create(o.Rot.Y, o.Rot.Z, o.Rot.X);
        if (
          ("_CU" === this.cJi || "_MS" === this.cJi) &&
          0 <= this.uJi &&
          this.uJi < this.mJi.length
        ) {
          var r = this.mJi[this.uJi].Index;
          if (r !== ACTOR_EMPTY_INDEX) {
            r = this.DJi[r];
            let t =
              EntitySystem_1.EntitySystem.Get(r.EntityId)
                ?.GetComponent(3)
                ?.Actor.Mesh.GetSocketTransform(PlotTemplate.HJi, 2)
                ?.GetLocation().Z ?? DEFAULT_CAMERA_BASE;
            0 === t
              ? ((t =
                  EntitySystem_1.EntitySystem.Get(r.EntityId)
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
        r = Transform_1.Transform.Create(
          s.Quaternion(),
          e,
          Vector_1.Vector.OneVectorProxy,
        );
        (t = Transform_1.Transform.Create()), r.ComposeTransforms(this.rJi, t);
      }
      (s =
        CameraController_1.CameraController.SequenceCamera.GetComponent(
          9,
        ).CineCamera),
        (e = s.CameraComponent);
      ObjectUtils_1.ObjectUtils.IsValid(s) &&
        (s.K2_SetActorTransform(t.ToUeTransform(), !1, void 0, !0),
        s.ResetSeqCineCamSetting(),
        i
          ? ((e.CurrentAperture = i.Aperture),
            (e.CurrentFocalLength = i.FocalLength),
            (e.FocusSettings.ManualFocusDistance = i.FocusDistance),
            (e.CurrentFocalRegion = i.FocalRegion))
          : (o.Aperture && (e.CurrentAperture = o.Aperture),
            o.FocalLength && (e.CurrentFocalLength = o.FocalLength),
            o.FocusDistance &&
              (e.FocusSettings.ManualFocusDistance = o.FocusDistance),
            o.FocalRegion && (e.CurrentFocalRegion = o.FocalRegion)),
        this.WJi());
    }
  }
  WJi() {
    for (const t of this.DJi)
      t.Valid &&
        t.Visible &&
        EntitySystem_1.EntitySystem.Get(t.EntityId)
          ?.GetComponent(163)
          ?.StartForceDisableAnimOptimization(0);
  }
  async EndTemplateNew(t) {
    this.IsInTemplate &&
      (this.LJi.Stop(),
      this.yia.CleanAction(!1),
      this.B4a.CleanAction(!1),
      this.EJi ||
        (ModelManager_1.ModelManager.PlotModel.SwitchCameraMode(1),
        CameraController_1.CameraController.FightCamera.LogicComponent.ResetArmLengthAndRotation(
          ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.PlotTemplateCameraExitRotation.ToUeRotator(),
        ),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.MotionBlur.Amount " + this.yJi,
        )),
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
      var o,
        s,
        r,
        a,
        _ = this.DJi[t];
      _.Valid &&
        ((s = (o = EntitySystem_1.EntitySystem.Get(_.EntityId))?.GetComponent(
          3,
        ))
          ? (s.ClearInput(),
            ModelManager_1.ModelManager.WorldModel.RemoveIgnore(s.Actor),
            _.Visible ||
              ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
                o,
                !0,
                "[PlotTemplate.ReleaseActor] 恢复模板演出实体显隐",
              ),
            _.MouseMontageLoadingId !==
              ResourceSystem_1.ResourceSystem.InvalidId &&
              (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(
                _.MouseMontageLoadingId,
              ),
              (_.MouseMontageLoadingId =
                ResourceSystem_1.ResourceSystem.InvalidId)),
            (r = (a = o.GetComponent(163))?.MainAnimInstance),
            ObjectUtils_1.ObjectUtils.IsValid(r) &&
              (r.Montage_Stop(MONTAGE_BLEND_OUT_TIME),
              a.ResetSightLimit(),
              a.SetSightTargetItem(void 0)),
            (r = o.GetComponent(60))?.Valid &&
              _.OriginMoveSync &&
              r.SetEnableMovementSync(!0, "PlotTemplate"),
            void 0 !== _.TurningTimer &&
              TimerSystem_1.TimerSystem.Remove(_.TurningTimer),
            t === this.dJi
              ? this.EJi ||
                s.Actor.CharRenderingComponent?.SetDisableFightDither(!1)
              : (NpcPerformController_1.NpcPerformController.ForceSetNpcDitherVisible(
                  !1,
                  _.PbDataId,
                  1,
                ),
                (r = o?.GetComponent(40))?.Valid &&
                  _.OriginEnableAi &&
                  r.EnableAi("Plot Control Ai"),
                (r = o.GetComponent(172))?.Valid &&
                  (_.OriginEnableLookAt && r.SetLookAtPlayerEnabled(!0),
                  r.OnNpcInPlot(!1)),
                (r = o.GetComponent(38))?.Valid &&
                  r.CharacterMovement.SetMovementMode(_.OriginMoveMode),
                a.SetBlendSpaceLookAt(!1),
                (r = o.GetComponent(0).GetModelConfig()),
                (ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(r.DA) &&
                  !StringUtils_1.StringUtils.IsEmpty(
                    r.DA.AssetPathName?.toString(),
                  ) &&
                  "None" !== r.DA.AssetPathName?.toString()) ||
                  ((a = s.SkeletalMesh.SkeletalMesh),
                  UE.KuroMeshTextureFunctionLibrary.HandleSkeletalMeshComponentStreaming(
                    a,
                    !1,
                  ))),
            i.push(this.KJi(_, e?.IsResetPosition)),
            _.Reset())
          : Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Plot",
              27,
              "模板结束时无法获取实体CharacterActorComponent",
              ["EntityId", _.EntityId],
              ["PbDataId", _.PbDataId],
            ));
    }
    await Promise.all(i);
  }
  async KJi(e, i = !1) {
    if (!ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode()) {
      var o = Vector_1.Vector.Create(),
        s = new UE.Rotator(0, 0, 0);
      let t = !1;
      i && e.IsPosReset
        ? ((s.Yaw = e.OriginPos.A),
          o.Set(e.OriginPos.X, e.OriginPos.Y, e.OriginPos.Z),
          (t = !0))
        : this.nx.IsBackground &&
          ((s.Yaw = e.Pos.A), o.Set(e.Pos.X, e.Pos.Y, e.Pos.Z), (t = !0)),
        t &&
          ((i = EntitySystem_1.EntitySystem.Get(e.EntityId).GetComponent(3)),
          this.EJi
            ? i.SetInputRotator(s)
            : e.IsPlayer()
              ? await TeleportController_1.TeleportController.TeleportToPositionNoLoading(
                  o.ToUeVector(),
                  s,
                  "模板演出结束设置位置",
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
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Plot", 18, "剧情加载等待-npc-开始", ["", i]),
      WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(
        i,
        (t) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 18, "剧情加载等待-npc-完成", ["result", t]),
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
          Log_1.Log.Info("Plot", 27, "剧情加载等待 npc纹理流送 开始", [
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
              Log_1.Log.Info("Plot", 27, "剧情加载等待 npc纹理流送 完成", [
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
  async HandleTemplateShowTalk(e) {
    if (this.IsInTemplate) {
      this.TJi ? (this.TJi = !1) : (this.IJi = !1),
        e.CameraData &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Plot", 27, "旧演出模板已废弃");
      const i = new CustomPromise_1.CustomPromise();
      TimerSystem_1.TimerSystem.Next(() => {
        var t = this.SetTemplateNew(e.FlowTemplate);
        this.JJi(e),
          t.finally(() => {
            i.SetResult();
          });
      }),
        await i.Promise,
        this.QJi(e.WhoId, e.ActorTurnToArray),
        this.nx.IsBackground ||
          (this.XJi(e.WhoId, e.ActorLookAtArray, "Option" === e.Type),
          this.$Ji(e.ActorMontageArray));
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
            27,
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
        ((a = EntitySystem_1.EntitySystem.Get(n.EntityId)?.GetComponent(163))
          ?.Valid &&
          (a.ResetSightLimit(), a.SetSightTargetItem(void 0)));
    }
    for (const l of this.mJi)
      if (l.Index !== ACTOR_EMPTY_INDEX) {
        var _,
          h = this.DJi[l.Index];
        if (h.Valid) {
          const m = EntitySystem_1.EntitySystem.Get(h.EntityId)?.GetComponent(
            163,
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
          const m = n.Entity.GetComponent(3) ?? n.Entity.GetComponent(187);
          (_ = h.Lock ?? !1),
            (a = () => {
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
    }
    i.LookLocked = _;
    s = (s ?? 0) * CommonDefine_1.MILLIONSECOND_PER_SECOND;
    s > TimerSystem_1.MIN_TIME
      ? this.yia.DelayAction(i.EntityId, s, a, _)
      : a?.();
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
    this.B4a.CleanAction();
    for (const r of this.DJi)
      r.MontageKeeping || (r.BodyMontagePath = void 0),
        r.OverlayMontageKeeping || (r.OverlayMontagePath = void 0),
        (r.MontageBlendToEnd = !1);
    if (t) {
      var e = [...t],
        i =
          (e.sort((t, e) => (t.DelayTime ?? 0) - (e.DelayTime ?? 0)),
          new Set());
      for (let t = e.length - 1; 0 <= t; t--) {
        var o = e[t];
        i.has(o.ActorIndex)
          ? (o.KeepPose = !1)
          : (o.KeepPose ?? o.EndLoopingMontage ?? o.EndMontageDirectly) &&
            i.add(o.ActorIndex);
      }
      for (const a of e)
        if (!(a.ActorIndex < 0 || a.ActorIndex >= ACTOR_NUM_MAX)) {
          const _ = this.DJi[a.ActorIndex];
          if (_.Valid && _.Visible) {
            var s = a.DelayTime
              ? TimeUtil_1.TimeUtil.SetTimeMillisecond(a.DelayTime)
              : 0;
            if (s <= TimerSystem_1.MIN_TIME) {
              if (a.EndMontageDirectly) {
                (_.MontageKeeping = !1),
                  (_.OverlayMontageKeeping = !1),
                  (_.MontageBlendToEnd = !0);
                continue;
              }
              if (a.EndLoopingMontage) {
                (_.MontageKeeping = !1),
                  (_.OverlayMontageKeeping = !1),
                  (_.MontageBlendToEnd = !1);
                continue;
              }
              this.ZJi(_, a, !1);
            } else {
              if (a.EndMontageDirectly) {
                this.B4a.DelayAction(
                  _.PbDataId,
                  s,
                  () => {
                    (_.MontageKeeping = !1),
                      (_.OverlayMontageKeeping = !1),
                      (_.MontageBlendToEnd = !0),
                      this.tzi(_);
                  },
                  a.KeepPose ?? !1,
                );
                continue;
              }
              if (a.EndLoopingMontage) {
                this.B4a.DelayAction(
                  _.PbDataId,
                  s,
                  () => {
                    (_.MontageKeeping = !1),
                      (_.OverlayMontageKeeping = !1),
                      (_.MontageBlendToEnd = !1),
                      this.tzi(_);
                  },
                  a.KeepPose ?? !1,
                );
                continue;
              }
              this.B4a.DelayAction(
                _.PbDataId,
                s,
                () => {
                  this.ZJi(_, a, !0);
                },
                a.KeepPose ?? !1,
              );
            }
            if (a.OverlayMontage) {
              s = a.OverlayMontage?.DelayTime
                ? TimeUtil_1.TimeUtil.SetTimeMillisecond(
                    a.OverlayMontage.DelayTime,
                  )
                : 0;
              if (s <= TimerSystem_1.MIN_TIME) this.ezi(_, a, !1);
              else {
                const h = TimerSystem_1.TimerSystem.Delay(() => {
                  this.ezi(_, a, !0), this.hJi.delete(h);
                }, s);
                this.hJi.add(h);
              }
            }
          }
        }
    }
    for (const n of this.DJi)
      n.Valid &&
        n.Visible &&
        (this.tzi(n),
        this.izi(n),
        this.BJi(n.BodyMontagePath, (t) => {
          this.ozi(n, t);
        }),
        this.BJi(n.OverlayMontagePath, (t) => {
          this.rzi(n, t);
        }));
  }
  ezi(e, i, o) {
    if (void 0 !== i.OverlayMontage?.MontageId.MontageId)
      if (void 0 !== e.TurningTimer)
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Plot", 27, "试图在转身期间播放蒙太奇，已阻止");
      else {
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
                27,
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
            Log_1.Log.Warn("Plot", 27, "模板蒙太奇库中没有该资源", ["Id", s]);
      }
  }
  ZJi(e, i, o) {
    if (void 0 !== i.MontageId)
      if (void 0 !== e.TurningTimer)
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Plot", 27, "试图在转身期间播放蒙太奇，已阻止");
      else {
        var s = i.ActorIndex === this.dJi ? this.PJi(i.MontageId) : i.MontageId;
        let t = void 0;
        (t = i.IsAbpMontage
          ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(s)
          : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(s))
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
            o &&
              (this.tzi(e),
              this.BJi(e.BodyMontagePath, (t) => {
                this.ozi(e, t);
              })))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Plot", 27, "模板蒙太奇库中没有该资源", ["Id", s]);
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
  KCa(e, i) {
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
    var e,
      i = EntitySystem_1.EntitySystem.Get(t.EntityId)?.GetComponent(
        163,
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
              ? this.KCa(t.BodyMontage, i)
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
        163,
      )?.MainAnimInstance;
    ObjectUtils_1.ObjectUtils.IsValid(i) &&
      (ObjectUtils_1.ObjectUtils.IsValid(t.OverlayMontage) &&
      i.Montage_IsPlaying(t.OverlayMontage)
        ? StringUtils_1.StringUtils.IsEmpty(t.OverlayMontagePath)
          ? t.MontageBlendToEnd
            ? this.KCa(t.OverlayMontage, i)
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
    var o;
    ObjectUtils_1.ObjectUtils.IsValid(e) &&
      this.IsInTemplate &&
      ((o = EntitySystem_1.EntitySystem.Get(t.EntityId)?.GetComponent(
        163,
      )?.MainAnimInstance),
      ObjectUtils_1.ObjectUtils.IsValid(o)) &&
      (this.ZYi.get(t.BodyMontagePath) !== e
        ? Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Plot", 27, "异步加载完的蒙太奇过期了")
        : ((t.BodyMontagePath = void 0),
          (o.Montage_IsPlaying(e) &&
            !o
              .Montage_GetCurrentSection(e)
              .op_Equality(
                CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
              )) ||
            (this.IJi &&
              (UE.KuroStaticLibrary.StopAllMontagesBySlotName(
                o,
                CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SLOT,
                MONTAGE_BLEND_OUT_TIME,
              ),
              UE.KuroStaticLibrary.StopAllMontagesBySlotName(
                o,
                CharacterNameDefines_1.CharacterNameDefines.SEQUENCE_SLOT,
                MONTAGE_BLEND_OUT_TIME,
              )),
            o.Montage_Play(e, i, 0, 0, !1)),
          (t.BodyMontage = e),
          t.MontageLooping
            ? o.Montage_SetNextSection(
                CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
                CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
                e,
              )
            : o.Montage_SetNextSection(
                CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
                CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
                e,
              ),
          t.FaceChangeManager?.ResetFacialExpressionOuter(),
          t.FaceChangeManager?.ChangeFaceForExpression(e, t.FaceExpressionId)));
  }
  rzi(t, e, i = 1) {
    var o;
    ObjectUtils_1.ObjectUtils.IsValid(e) &&
      this.IsInTemplate &&
      ((o = EntitySystem_1.EntitySystem.Get(t.EntityId)?.GetComponent(
        163,
      )?.MainAnimInstance),
      ObjectUtils_1.ObjectUtils.IsValid(o)) &&
      (this.ZYi.get(t.OverlayMontagePath) !== e
        ? Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Plot", 27, "异步加载完的蒙太奇过期了")
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
    var e = o.Actor,
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
      s = this.uoe.HitResult;
    if (e && s.bBlockingHit) {
      var r = s.Actors.Num();
      let e = 0,
        i = void 0;
      for (let t = 0; t < r; t++)
        if (
          ((i = s.Actors.Get(t)),
          ObjectUtils_1.ObjectUtils.IsValid(i) &&
            !i.IsA(UE.Character.StaticClass()))
        ) {
          e = t;
          break;
        }
      (t.Z = s.LocationZ_Array.Get(e)),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Plot",
            27,
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
          (t = t.GetComponent(163))?.Valid &&
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
  HandleMouthAnim(i) {
    if (this.IsInTemplate) {
      for (const o of this.DJi)
        o.Valid &&
          (o.MouseMontageLoadingId !==
            ResourceSystem_1.ResourceSystem.InvalidId &&
            (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(
              o.MouseMontageLoadingId,
            ),
            (o.MouseMontageLoadingId =
              ResourceSystem_1.ResourceSystem.InvalidId)),
          EntitySystem_1.EntitySystem.Get(o.EntityId)
            ?.GetComponent(163)
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
          const o = this.aJi.get(i.WhoId);
          if (o?.Valid && o?.Visible) {
            const s = EntitySystem_1.EntitySystem.Get(o.EntityId)?.GetComponent(
              163,
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
                            39,
                            "MouthAnim 播放口型",
                            ["Key", i.TidTalk],
                            ["Asset", t?.GetName()],
                            ["ABP", s.GetName()],
                          );
                    },
                  )))
              : Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn("Plot", 27, "播放嘴型时拿不到AnimInst", [
                  "EntityId",
                  o.EntityId,
                ]);
          }
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
                    Log_1.Log.Warn("Plot", 27, "说话人未在模板内，转向失败");
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
  szi(e, i) {
    if (void 0 !== e.TurningTimer)
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Plot", 27, "多次触发转身！！！！注意表现");
    else {
      var o = EntitySystem_1.EntitySystem.Get(e.EntityId);
      const s = o?.GetComponent(3);
      if (s?.Valid) {
        s.ClearInput();
        let t = WAIT_TURING_TIME;
        o = o?.GetComponent(163);
        if (
          (ObjectUtils_1.ObjectUtils.IsValid(e.BodyMontage) &&
            o.MainAnimInstance.Montage_IsPlaying(e.BodyMontage) &&
            (o.MainAnimInstance.Montage_Stop(MONTAGE_BLEND_OUT_TIME),
            (t += 0.5 * MONTAGE_BLEND_OUT_TIME)),
          (e.TurningTimer = TimerSystem_1.TimerSystem.Delay(() => {
            e.TurningTimer = void 0;
          }, t)),
          e.PbDataId !== PLAYER_USED_ID)
        )
          TimerSystem_1.TimerSystem.Delay(
            () => {
              e.Valid &&
                AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(s, i, 0);
            },
            MONTAGE_BLEND_OUT_TIME *
              CommonDefine_1.MILLIONSECOND_PER_SECOND *
              0.5,
          );
        else {
          const r = MathUtils_1.MathUtils.CommonTempRotator;
          o = MathUtils_1.MathUtils.CommonTempVector;
          i.Subtraction(s.ActorLocationProxy, o),
            o.Normalize(),
            (r.Roll = 0),
            (r.Pitch = 0),
            (r.Yaw = MathUtils_1.MathUtils.GetAngleByVector2D(o)),
            TimerSystem_1.TimerSystem.Delay(
              () => {
                e.Valid && s.SetInputRotator(r);
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
  OnFinishShowTalk() {
    if (this.IsInTemplate)
      for (const e of this.DJi) {
        if (!e.Valid) return;
        var t = EntitySystem_1.EntitySystem.Get(e.EntityId)?.GetComponent(
          163,
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
