"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var r,
      h = arguments.length,
      a =
        h < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, s);
    else
      for (var o = t.length - 1; 0 <= o; o--)
        (r = t[o]) && (a = (h < 3 ? r(a) : 3 < h ? r(e, i, a) : r(e, i)) || a);
    return 3 < h && a && Object.defineProperty(e, i, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SequenceCameraPlayerComponent = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../Core/Actor/ActorSystem"),
  Log_1 = require("../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../Core/Entity/EntityComponent"),
  EntitySystem_1 = require("../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../Core/Utils/TraceElementCommon"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  GameQualitySettingsManager_1 = require("../GameQualitySettings/GameQualitySettingsManager"),
  GlobalData_1 = require("../GlobalData"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CharacterNameDefines_1 = require("../NewWorld/Character/Common/CharacterNameDefines"),
  UiLayerType_1 = require("../Ui/Define/UiLayerType"),
  UiLayer_1 = require("../Ui/UiLayer"),
  ActorUtils_1 = require("../Utils/ActorUtils"),
  CameraController_1 = require("./CameraController"),
  CameraModel_1 = require("./CameraModel"),
  CameraUtility_1 = require("./CameraUtility"),
  PROFILE_KEY1 = "SequenceCameraPlayerComponent_CheckCameraLocation",
  PROFILE_KEY2 = "SequenceCameraPlayerComponent_ProcessHideShelterCharacter",
  SEQUENCE_CAMERA = new UE.FName("SequenceCamera"),
  ROLE_TAG = new UE.FName("Role"),
  RELATIVE_LENGTH = 1e4,
  LIMIT_DISTANCE = 200;
let SequenceCameraPlayerComponent = class SequenceCameraPlayerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.ZPr = void 0),
      (this._sr = UE.NewArray(UE.Actor)),
      (this.nZo = void 0),
      (this.exr = void 0),
      (this.vxr = -0),
      (this.uAo = -0),
      (this.Mxr = 1),
      (this.Exr = 1),
      (this.Sxr = 1),
      (this.yxr = -0),
      (this.Ixr = void 0),
      (this.rRe = void 0),
      (this.Txr = void 0),
      (this.Lxr = void 0),
      (this.Dxr = !1),
      (this.Rxr = !1),
      (this.Uxr = 0),
      (this.GPe = UE.NewArray(UE.Actor)),
      (this.Axr = UE.NewArray(UE.Actor)),
      (this.Pxr = new Map()),
      (this.xxr = new Set()),
      (this.wxr = void 0),
      (this.Bxr = !1),
      (this.sor = void 0),
      (this.Tae = void 0),
      (this.bxr = void 0),
      (this.qxr = void 0),
      (this.Gxr = void 0),
      (this.Lz = Vector_1.Vector.Create()),
      (this.g1t = FNameUtil_1.FNameUtil.EMPTY),
      (this.Nxr = FNameUtil_1.FNameUtil.EMPTY),
      (this.Oxr = void 0),
      (this.kxr = Vector_1.Vector.Create(
        RELATIVE_LENGTH,
        RELATIVE_LENGTH,
        RELATIVE_LENGTH,
      )),
      (this.Fxr = !1),
      (this.Vxr = 0),
      (this.Hxr = !0),
      (this.Fse = void 0),
      (this.jxr = void 0),
      (this.Wxr = !1),
      (this.Wse = Vector_1.Vector.Create()),
      (this.Kxr = Vector_1.Vector.Create()),
      (this.Qxr = void 0),
      (this.Xxr = Vector_1.Vector.Create()),
      (this.$xr = Vector_1.Vector.Create()),
      (this.Yxr = Vector_1.Vector.Create()),
      (this.I7 = Vector_1.Vector.Create());
  }
  SetPlayCameraSequenceEnabled(t) {
    this.Hxr = t;
  }
  SetPawn(t) {
    t instanceof TsBaseCharacter_1.default && this.SetCharacter(t);
  }
  SetCharacter(t) {
    this.bxr?.IsValid() ? (this.bxr = t) : (this.Tae = t);
  }
  PlayCameraSequence(
    t,
    e,
    i,
    s,
    r,
    h,
    a,
    o,
    n,
    _ = !1,
    l = !0,
    m = !0,
    C = !1,
  ) {
    if (!this.Hxr) return !1;
    if (this.Dxr) {
      if (!this.Jxr(this.Tae, s)) return !1;
      this.StopSequence();
    }
    this.ZPr.CineCamera.GetAttachParentActor() &&
      this.ZPr.CineCamera.K2_DetachFromActor(),
      (this.Fxr = n),
      a
        ? this.kxr.FromUeVector(a)
        : this.kxr.Set(RELATIVE_LENGTH, RELATIVE_LENGTH, RELATIVE_LENGTH),
      (this.Vxr = o),
      (this.bxr = this.Tae),
      (this.Tae = s),
      (this.Nxr = h),
      (this.g1t = r),
      FNameUtil_1.FNameUtil.IsEmpty(this.g1t) ||
        (this.Oxr?.IsValid() ||
          ((this.Oxr = ActorSystem_1.ActorSystem.Get(
            UE.Actor.StaticClass(),
            MathUtils_1.MathUtils.DefaultTransform,
          )),
          this.Oxr.K2_GetRootComponent()) ||
          this.Oxr.AddComponentByClass(
            UE.SceneComponent.StaticClass(),
            !1,
            this.Oxr.GetTransform(),
            !1,
          ),
        this.Oxr.K2_AttachToComponent(this.Tae.Mesh, this.g1t, 2, 2, 2, !1)),
      this.zxr(t, l, m);
    n = this.S9e(_);
    return (
      (this.Bxr = e),
      (this.wxr = i),
      n &&
        (EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnSequenceCameraStatus,
          !0,
        ),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.SetNearClipPlane 1",
        ),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Camera", 39, "进入Sequence相机，最小近裁面"),
        C) &&
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.MotionBlur.Amount 0",
        ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.PlayCameraLevelSequence,
        t.CameraSequence,
        s,
        this.exr,
        CameraUtility_1.CameraUtility.GetRootTransform(s),
      ),
      n
    );
  }
  StopSequence() {
    this.Zxr();
  }
  SetBlendTime(t, e) {
    (this.Exr = t), (this.Sxr = e);
  }
  GetCurrentLevelSequenceActor() {
    return this.exr;
  }
  GetIsInCinematic() {
    return this.Dxr;
  }
  ResetCameraRatioSetting() {
    var t,
      e = this.ZPr?.CineCamera?.GetCineCameraComponent();
    e &&
      ((t = e.GetDefaultFilmbackPresetName()) && e.SetFilmbackPresetByName(t),
      (e.bConstrainAspectRatio = !1));
  }
  OnStart() {
    return this.ewr(), (this.ZPr = this.Entity.GetComponent(9)), this.ZPr.Valid;
  }
  ewr() {
    (this.qxr = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (this.qxr.bIsSingle = !0),
      (this.qxr.bIgnoreSelf = !0),
      this.qxr.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera),
      (this.Gxr = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (this.Gxr.bIsSingle = !1),
      (this.Gxr.bIgnoreSelf = !0),
      (this.Gxr.ActorsToIgnore = this._sr),
      this.Gxr.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.Pawn),
      this.Gxr.AddObjectTypeQuery(
        QueryTypeDefine_1.KuroObjectTypeQuery.PawnPlayer,
      ),
      this.Gxr.AddObjectTypeQuery(
        QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster,
      ),
      (this.Fse = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (this.Fse.bIsSingle = !0),
      (this.Fse.bIgnoreSelf = !0),
      (this.Fse.bTraceComplex = !0),
      this.Fse.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera),
      (this.jxr = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (this.jxr.bIsSingle = !0),
      (this.jxr.bIgnoreSelf = !0),
      (this.jxr.bTraceComplex = !0),
      this.Fxr && ((this.jxr.DrawTime = 5), this.jxr.SetDrawDebugTrace(2)),
      this.jxr.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera);
  }
  OnEnd() {
    if (((this.ZPr = void 0), this.GPe.Empty(), this.exr)) {
      this.exr.SequencePlayer?.OnStop.Clear();
      const t = this.exr;
      TimerSystem_1.TimerSystem.Next(() => {
        ActorSystem_1.ActorSystem.Put(t);
      }),
        (this.exr = void 0);
    }
    return (
      (this.nZo = void 0),
      (this.Ixr = void 0),
      (this.rRe = void 0),
      (this.Txr = void 0),
      (this.Lxr = void 0),
      (this.Exr = 1),
      (this.Sxr = 1),
      (this.Dxr = !1),
      this.Rxr &&
        (ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(
          2,
        ),
        UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Float, !0),
        UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Pop, !0),
        UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Guide, !0),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnCameraSequenceSetUiVisible,
          !0,
        )),
      !0
    );
  }
  OnAfterTick(t) {
    if (this.exr) {
      if (!this.Tae?.IsValid()) return void this.StopSequence();
      var e = this.Tae.GetEntityIdNoBlueprint();
      if (!e || !EntitySystem_1.EntitySystem.Get(e))
        return void this.StopSequence();
    }
    this.Ixr && this.rRe && this.Txr
      ? (this.twr(),
        this.iwr(),
        (this.vxr += t * MathUtils_1.MathUtils.MillisecondToSecond * this.Mxr),
        this.exr.SequencePlayer.PlayToSeconds(this.vxr),
        this.owr(),
        this.rwr(),
        this.CheckCollision(),
        this.vxr >= this.uAo
          ? this.Zxr()
          : this.Rxr &&
            0 < this.Uxr &&
            this.vxr >= this.Uxr &&
            (ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(
              2,
            ),
            UiLayer_1.UiLayer.SetLayerActive(
              UiLayerType_1.ELayerType.Float,
              !0,
            ),
            UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Pop, !0),
            UiLayer_1.UiLayer.SetLayerActive(
              UiLayerType_1.ELayerType.Guide,
              !0,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnCameraSequenceSetUiVisible,
              !0,
            ),
            (this.Rxr = !1)))
      : this.yxr &&
        ((this.yxr = Math.max(0, this.yxr - t)), this.CheckCollision());
  }
  iwr() {
    this.Mxr =
      this.Tae?.GetEntityNoBlueprint()?.GetComponent(109)?.CurrentTimeScale ??
      1;
  }
  nwr() {
    return this.sor ?? CameraController_1.CameraController.GetCharacter();
  }
  zxr(t, e = !0, i = !0) {
    if (
      ((this.Exr = t.BlendInTime),
      (this.Sxr = t.BlendOutTime),
      (this.nZo = t.CameraSequence),
      (this.Rxr = t.IsHideHud),
      this.nZo)
    ) {
      this.ResetCameraRatioSetting(),
        this.ZPr?.CineCamera?.ResetSeqCineCamSetting();
      var s = new UE.MovieSceneSequencePlaybackSettings(),
        e =
          ((s.bDisableMovementInput = e),
          (s.bDisableLookAtInput = i),
          (this.exr = ActorSystem_1.ActorSystem.Get(
            UE.LevelSequenceActor.StaticClass(),
            new UE.Transform(),
            void 0,
            !1,
          )),
          (this.exr.PlaybackSettings = s),
          this.exr.SetSequence(this.nZo),
          this.exr.SequencePlayer.GetStartTime()),
        i =
          ((this.vxr =
            ((e.Time.FrameNumber.Value + e.Time.SubFrame) *
              e.Rate.Denominator) /
            e.Rate.Numerator),
          this.exr.SequencePlayer.GetEndTime());
      if (
        ((this.uAo =
          ((i.Time.FrameNumber.Value + i.Time.SubFrame) * i.Rate.Denominator) /
          i.Rate.Numerator),
        t.EnableSpecificSequenceTime &&
          (this.uAo = Math.min(this.uAo, t.SpecificSequenceTime)),
        (this.qxr.WorldContextObject = GlobalData_1.GlobalData.World),
        (this.Gxr.WorldContextObject = GlobalData_1.GlobalData.World),
        this.swr(),
        this.Rxr)
      ) {
        this.Uxr = t.HideHudTime;
        var r = t.VisibleChild,
          h = r.Num();
        if (h <= 0)
          ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(
            2,
          );
        else {
          var a = [];
          for (let t = 0; t < h; t++) a.push(r.Get(t));
          ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(
            2,
            a,
          );
        }
        UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Float, !1),
          UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Pop, !1),
          UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Guide, !1),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnCameraSequenceSetUiVisible,
            !1,
          );
      }
    }
  }
  swr() {
    this.exr &&
      (this.GPe.Add(this.ZPr.CineCamera),
      this.exr.SetBindingByTag(SEQUENCE_CAMERA, this.GPe, !1),
      this.GPe.Empty(),
      this.Tae) &&
      (this.Axr.Add(this.Tae),
      this.exr.SetBindingByTag(ROLE_TAG, this.Axr, !1),
      this.Axr.Empty());
  }
  S9e(t) {
    let e = !1;
    return (
      !this.awr(t) && !this.CheckSphereCollision() && this.hwr()
        ? (this.lwr(), (e = !0))
        : this.Zxr(),
      e
    );
  }
  awr(t) {
    var e = UE.KuroStaticLibrary.GetSequenceTracksForObjectBindingID(
        this.exr,
        SEQUENCE_CAMERA,
      ),
      e = UE.KuroStaticLibrary.GetTrackByClass(
        e,
        UE.MovieScene3DTransformTrack.StaticClass(),
      );
    if (!e) return !1;
    var e = UE.KuroStaticLibrary.GetFirstLocationFromSeqTrack(e),
      i = this.nwr(),
      e =
        CameraUtility_1.CameraUtility.GetRootTransform(i).TransformPosition(e),
      t =
        ((this.qxr.Radius =
          CameraController_1.CameraController.FightCamera.LogicComponent.CollisionProbeSize),
        this.qxr.ActorsToIgnore.Empty(),
        t &&
          this.qxr.ActorsToIgnore.Add(
            CameraController_1.CameraController.GetCharacter(),
          ),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.qxr, e),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.qxr, e),
        TraceElementCommon_1.TraceElementCommon.SphereTrace(
          this.qxr,
          PROFILE_KEY1,
        ));
    if (t && this.qxr.HitResult?.Actors?.Get(0) === i)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Camera",
            58,
            "Seq相机初始位置与角色碰撞，请检查Seq的相机初始位置",
          ),
        !1
      );
    return t;
  }
  hwr() {
    if (!this.nZo) return !1;
    var t = this.nwr();
    if (!t) return !1;
    if (!this.exr) return !1;
    var e = t.CharacterActorComponent.Entity.GetComponent(162),
      i =
        (e.Valid && e.StopModelBuffer(),
        (this.exr.bOverrideInstanceData = !0),
        this.exr.DefaultInstanceData);
    if (!i) return !1;
    (this.Ixr = i),
      (this.Txr = CameraUtility_1.CameraUtility.GetRootTransform(t)),
      (this.Lxr = t?.CharacterActorComponent?.Entity?.GetComponent(37)),
      e.Valid
        ? ((i = e.MainAnimInstance),
          UE.KuroStaticLibrary.IsObjectClassByName(
            i,
            CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE,
          ) && (this.rRe = i))
        : (this.rRe = void 0),
      this.owr();
    t = this.exr.SequencePlayer;
    return t.Play(), t.SetPlayRate(0), t.Pause(), t.JumpToSeconds(this.vxr), !0;
  }
  Zxr() {
    if (
      (this.Bxr
        ? CameraController_1.CameraController.FightCamera.LogicComponent.ResetArmLengthAndRotation(
            this.wxr,
          )
        : CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(
            CameraController_1.CameraController.SequenceCamera.DisplayComponent.CineCamera.K2_GetActorRotation(),
          ),
      CameraController_1.CameraController.FightCamera?.LogicComponent
        ?.CameraCollision &&
        (CameraController_1.CameraController.FightCamera.LogicComponent.CameraCollision.IsNpcDitherEnable =
          !0),
      (this.Fxr = !1),
      (this.Dxr = !1),
      this.Rxr &&
        (ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(
          2,
        ),
        UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Float, !0),
        UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Pop, !0),
        UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Guide, !0),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnCameraSequenceSetUiVisible,
          !0,
        ),
        (this.Rxr = !1)),
      CameraController_1.CameraController.ExitCameraMode(1, this.Sxr),
      (this.yxr = this.Sxr),
      this.exr)
    ) {
      this.exr.SequencePlayer.Stop(),
        (this.exr.PlaybackSettings.bDisableMovementInput = !1),
        (this.exr.PlaybackSettings.bDisableLookAtInput = !1);
      const i = this.exr;
      TimerSystem_1.TimerSystem.Next(() => {
        ActorSystem_1.ActorSystem.Put(i);
      }),
        (this.exr = void 0);
    }
    (this.nZo = void 0),
      this.Tae?.IsValid() &&
        this.Tae.CharRenderingComponent?.OnFinalizedLevelSequence(),
      (this.Ixr = void 0),
      (this.rRe = void 0),
      (this.Txr = void 0),
      (this.sor = void 0);
    for (var [t, e] of this.Pxr)
      t.IsValid() && t.CharacterActorComponent?.EnableActor(e);
    FNameUtil_1.FNameUtil.IsEmpty(this.g1t) ||
      (this.Oxr?.IsValid() && this.Oxr.K2_DetachFromActor(1, 1, 1)),
      (this.g1t = FNameUtil_1.FNameUtil.EMPTY),
      this.Pxr.clear(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnSequenceCameraStatus,
        !1,
      ),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.SetNearClipPlane 10",
      ),
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
        ?.GetCurrentQualityInfo()
        ?.ApplyMotionBlur(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Camera", 39, "退出Sequence相机，正常近裁面");
  }
  twr() {
    this.Lxr.HasDeltaBaseMovementData &&
      (this.Txr.AddToTranslation(this.Lxr.DeltaBaseMovementOffset),
      this.Txr.ConcatenateRotation(this.Lxr.DeltaBaseMovementQuat.ToUeQuat()));
  }
  rwr() {
    this.nwr()
      .GetEntityNoBlueprint()
      .GetComponent(162)
      .GetCameraPosition(this.Lz),
      this.Kxr.DeepCopy(this.ZPr.CineCamera.K2_GetActorLocation()),
      (this.Gxr.WorldContextObject = GlobalData_1.GlobalData.World),
      (this.Gxr.ActorsToIgnore = this._sr),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(
        this.Gxr,
        this.Lz,
      ),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(
        this.Gxr,
        this.Kxr,
      ),
      (this.Gxr.Radius =
        CameraController_1.CameraController.FightCamera.LogicComponent.CollisionProbeSize),
      this.xxr.clear();
    var t,
      e,
      i = TraceElementCommon_1.TraceElementCommon.SphereTrace(
        this.Gxr,
        PROFILE_KEY2,
      ),
      s = this.Gxr.HitResult;
    let r = void 0;
    if (i && s.bBlockingHit) {
      var h = s.GetHitCount();
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(
        this.Gxr.HitResult,
        0,
        this.Wse,
      );
      for (let t = 0; t < h; t++) {
        var a = s.Actors.Get(t);
        a instanceof TsBaseCharacter_1.default &&
          ((r = ActorUtils_1.ActorUtils.GetEntityByActor(a)?.Entity)
            ?.GetComponent(188)
            ?.HasTag(1922109466) ||
            (this.Wse.Set(
              s.LocationX_Array.Get(t),
              s.LocationY_Array.Get(t),
              s.LocationZ_Array.Get(t),
            ),
            Vector_1.Vector.Dist(this.Wse, this.Kxr) > LIMIT_DISTANCE) ||
            this.xxr.add(a));
      }
    }
    for ([t, e] of this.Pxr)
      (r = ActorUtils_1.ActorUtils.GetEntityByActor(t)?.Entity),
        t.CharacterActorComponent?.EnableActor(e);
    this.Pxr.clear();
    for (const o of this.xxr)
      this.Pxr.has(o) ||
        (o.CharacterActorComponent?.Valid &&
          this.Pxr.set(
            o,
            o.CharacterActorComponent.DisableActor(
              "[SequenceCameraPlayerComponent.ProcessHideShelterCharacter]",
            ),
          ));
  }
  owr() {
    var t;
    FNameUtil_1.FNameUtil.IsEmpty(this.g1t)
      ? ((t = this._wr(this.Txr)), (this.Ixr.TransformOrigin = t))
      : this.Oxr?.IsValid() &&
        ((this.Ixr.TransformOriginActor = this.Oxr), this.ZPr?.CineCamera) &&
        ((t = this.ZPr.CineCamera.K2_GetActorLocation()),
        this.ZPr.CineCamera.K2_SetActorLocation(t, !1, void 0, !1));
  }
  Jxr(t, e) {
    return !(
      !e?.IsValid() ||
      (t?.IsValid() &&
        t !== e &&
        ((t = t.GetEntityNoBlueprint()?.GetComponent(0)),
        (e = e.GetEntityNoBlueprint()?.GetComponent(0)),
        !t?.IsRole() || !e?.IsMonster()))
    );
  }
  lwr() {
    this._sr.Empty(),
      this._sr.Add(CameraController_1.CameraController.GetCharacter()),
      this.sor && this._sr.Add(this.sor),
      CameraController_1.CameraController.EnterCameraMode(1, this.Exr, 0),
      CameraController_1.CameraController.FightCamera?.LogicComponent
        ?.CameraCollision &&
        (CameraController_1.CameraController.FightCamera.LogicComponent.CameraCollision.IsNpcDitherEnable =
          !1),
      (this.Dxr = !0);
  }
  _wr(t) {
    return new UE.Transform(
      t.GetRotation(),
      t.GetTranslation(),
      t.GetScale3D(),
    );
  }
  OnChangeTimeDilation(t) {}
  CheckCollision() {
    var t;
    this.Tae?.IsValid() &&
      ((this.Fse.WorldContextObject = GlobalData_1.GlobalData.World),
      FNameUtil_1.FNameUtil.IsEmpty(this.Nxr)
        ? ((t = this.Tae.GetEntityNoBlueprint().GetComponent(162)),
          (this.Qxr = t.GetCameraTransform()))
        : (this.Qxr = this.GetBoneTransform(this.Nxr)),
      this.Qxr?.IsValid()
        ? (this._sr.Empty(),
          this._sr.Add(CameraController_1.CameraController.GetCharacter()),
          (this.Fse.ActorsToIgnore = this._sr),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(
            this.Fse,
            this.Qxr.GetLocation(),
          ),
          this.Kxr.DeepCopy(this.ZPr.CineCamera.K2_GetActorLocation()),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(
            this.Fse,
            this.Kxr,
          ),
          (this.Fse.Radius = 3),
          (this.Wxr = TraceElementCommon_1.TraceElementCommon.SphereTrace(
            this.Fse,
            PROFILE_KEY2,
          )),
          this.Wxr &&
            (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
              this.Fse.HitResult,
              0,
              this.Wse,
            ),
            this.ZPr.CineCamera.K2_SetActorLocation(
              this.Wse.ToUeVector(),
              !1,
              void 0,
              !1,
            )))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            23,
            "CheckCollision  SocketTransform 不存在",
          ));
  }
  CheckSphereCollision() {
    if (0 === this.Vxr) return !1;
    this.jxr.WorldContextObject = GlobalData_1.GlobalData.World;
    var t = this.Tae.GetEntityNoBlueprint().GetComponent(162);
    return (
      (this.Qxr = t.GetCameraTransform()),
      t.GetCameraPosition(this.Xxr),
      this.$xr.DeepCopy(this.Tae.CharacterActorComponent.ActorForwardProxy),
      this.$xr.Multiply(this.kxr.X, this.$xr),
      this.Yxr.DeepCopy(Vector_1.Vector.OneVectorProxy),
      this.Yxr.Multiply(this.kxr.Y, this.Yxr),
      this.I7.DeepCopy(Vector_1.Vector.UpVectorProxy),
      this.I7.Multiply(this.kxr.Z, this.I7),
      this.Xxr.Addition(this.$xr, this.Xxr),
      this.Xxr.Addition(this.Yxr, this.Xxr),
      this.Xxr.Addition(this.I7, this.Xxr),
      this._sr.Empty(),
      this._sr.Add(CameraController_1.CameraController.GetCharacter()),
      (this.jxr.ActorsToIgnore = this._sr),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(
        this.jxr,
        this.Xxr,
      ),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(
        this.jxr,
        this.Xxr,
      ),
      (this.jxr.Radius = this.Vxr),
      TraceElementCommon_1.TraceElementCommon.SphereTrace(
        this.jxr,
        PROFILE_KEY2,
      )
    );
  }
  GetBoneTransform(t) {
    var e = this.Tae;
    if (-1 !== e.Mesh.GetAllSocketNames().FindIndex(t))
      return e.Mesh.GetSocketTransform(t, 0);
  }
  DrawCube(t, e, i) {
    var s, r, h;
    t &&
      ((i = new UE.LinearColor(i, i, i, i)),
      (h = t.GetLocation()),
      (s = new UE.Vector(10, 10, 10)),
      (s = new UE.Vector(0.5 * s.X, 0.5 * s.Y, 0.5 * s.Z)),
      (r = t.Rotator()),
      UE.KismetSystemLibrary.DrawDebugBox(
        GlobalData_1.GlobalData.World,
        h,
        s,
        i,
        r,
        e,
        30,
      ),
      (h = UE.KismetMathLibrary.TransformLocation(
        t,
        new UE.Vector(0.5, 0.5, 0.5),
      )),
      (s = UE.KismetMathLibrary.TransformLocation(
        t,
        new UE.Vector(-0.5, -0.5, -0.5),
      )),
      UE.KismetSystemLibrary.DrawDebugLine(
        GlobalData_1.GlobalData.World,
        h,
        s,
        i,
        e,
        15,
      ),
      (r = UE.KismetMathLibrary.TransformLocation(
        t,
        new UE.Vector(0.5, -0.5, 0.5),
      )),
      (h = UE.KismetMathLibrary.TransformLocation(
        t,
        new UE.Vector(-0.5, 0.5, 0.5),
      )),
      UE.KismetSystemLibrary.DrawDebugLine(
        GlobalData_1.GlobalData.World,
        r,
        h,
        i,
        e,
        15,
      ));
  }
  SaveSeqCamera() {
    var t = new CameraModel_1.SeqCameraThings();
    return (
      (t.CameraLocation = this.ZPr.CineCamera.K2_GetActorLocation()),
      (t.CameraRotation = this.ZPr.CineCamera.K2_GetActorRotation()),
      (t.OriginRootTransform = this.Txr),
      (t.ConstrainAspectRatio = this.ZPr.CineCamera["Constrain Aspect Ratio"]),
      (t.CurrentAperture = this.ZPr.CineCamera["Current Aperture"]),
      (t.CurrentFocalLength = this.ZPr.CineCamera["Current Focal Length"]),
      (t.FocusSettings = this.ZPr.CineCamera["Focus Settings"]),
      (t.LensSettings = this.ZPr.CineCamera["Lens Settings"]),
      (t.FieldOfView =
        this.ZPr.CineCamera.GetCineCameraComponent().FieldOfView),
      t
    );
  }
};
(SequenceCameraPlayerComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(10)],
  SequenceCameraPlayerComponent,
)),
  (exports.SequenceCameraPlayerComponent = SequenceCameraPlayerComponent);
//# sourceMappingURL=SequenceCameraPlayerComponent.js.map
