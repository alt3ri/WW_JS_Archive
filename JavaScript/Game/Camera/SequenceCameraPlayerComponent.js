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
      (this.yxr = void 0),
      (this.mnr = UE.NewArray(UE.Actor)),
      (this.hzo = void 0),
      (this.Ixr = void 0),
      (this.Hxr = -0),
      (this.dUo = -0),
      (this.jxr = 1),
      (this.Wxr = 1),
      (this.Kxr = 1),
      (this.Qxr = -0),
      (this.Xxr = void 0),
      (this.rRe = void 0),
      (this.$xr = void 0),
      (this.Yxr = void 0),
      (this.Jxr = !1),
      (this.zxr = !1),
      (this.Zxr = 0),
      (this.GPe = UE.NewArray(UE.Actor)),
      (this.ewr = UE.NewArray(UE.Actor)),
      (this.twr = new Map()),
      (this.iwr = new Set()),
      (this.owr = void 0),
      (this.rwr = !1),
      (this.sir = void 0),
      (this.Tae = void 0),
      (this.nwr = void 0),
      (this.swr = void 0),
      (this.awr = void 0),
      (this.Lz = Vector_1.Vector.Create()),
      (this.olt = FNameUtil_1.FNameUtil.EMPTY),
      (this.hwr = FNameUtil_1.FNameUtil.EMPTY),
      (this.lwr = void 0),
      (this._wr = Vector_1.Vector.Create(
        RELATIVE_LENGTH,
        RELATIVE_LENGTH,
        RELATIVE_LENGTH,
      )),
      (this.uwr = !1),
      (this.cwr = 0),
      (this.mwr = !0),
      (this.Fse = void 0),
      (this.dwr = void 0),
      (this.Cwr = !1),
      (this.Wse = Vector_1.Vector.Create()),
      (this.gwr = Vector_1.Vector.Create()),
      (this.fwr = void 0),
      (this.pwr = Vector_1.Vector.Create()),
      (this.vwr = Vector_1.Vector.Create()),
      (this.Mwr = Vector_1.Vector.Create()),
      (this.I7 = Vector_1.Vector.Create());
  }
  SetPlayCameraSequenceEnabled(t) {
    this.mwr = t;
  }
  SetPawn(t) {
    t instanceof TsBaseCharacter_1.default && this.SetCharacter(t);
  }
  SetCharacter(t) {
    this.nwr?.IsValid() ? (this.nwr = t) : (this.Tae = t);
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
    if (!this.mwr) return !1;
    if (this.Jxr) {
      if (!this.Swr(this.Tae, s)) return !1;
      this.StopSequence();
    }
    this.yxr.CineCamera.GetAttachParentActor() &&
      this.yxr.CineCamera.K2_DetachFromActor(),
      (this.uwr = n),
      a
        ? this._wr.FromUeVector(a)
        : this._wr.Set(RELATIVE_LENGTH, RELATIVE_LENGTH, RELATIVE_LENGTH),
      (this.cwr = o),
      (this.nwr = this.Tae),
      (this.Tae = s),
      (this.hwr = h),
      (this.olt = r),
      FNameUtil_1.FNameUtil.IsEmpty(this.olt) ||
        (this.lwr?.IsValid() ||
          ((this.lwr = ActorSystem_1.ActorSystem.Get(
            UE.Actor.StaticClass(),
            MathUtils_1.MathUtils.DefaultTransform,
          )),
          this.lwr.K2_GetRootComponent()) ||
          this.lwr.AddComponentByClass(
            UE.SceneComponent.StaticClass(),
            !1,
            this.lwr.GetTransform(),
            !1,
          ),
        this.lwr.K2_AttachToComponent(this.Tae.Mesh, this.olt, 2, 2, 2, !1)),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.PlayCameraLevelSequence,
        t.CameraSequence,
        s,
      ),
      this.Ewr(t, l, m);
    n = this.h8e(_);
    return (
      (this.rwr = e),
      (this.owr = i),
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
      n
    );
  }
  StopSequence() {
    this.ywr();
  }
  SetBlendTime(t, e) {
    (this.Wxr = t), (this.Kxr = e);
  }
  GetCurrentLevelSequenceActor() {
    return this.Ixr;
  }
  GetIsInCinematic() {
    return this.Jxr;
  }
  ResetCameraRatioSetting() {
    var t,
      e = this.yxr?.CineCamera?.GetCineCameraComponent();
    e &&
      ((t = e.GetDefaultFilmbackPresetName()) && e.SetFilmbackPresetByName(t),
      (e.bConstrainAspectRatio = !1));
  }
  OnStart() {
    return this.Iwr(), (this.yxr = this.Entity.GetComponent(9)), this.yxr.Valid;
  }
  Iwr() {
    (this.swr = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (this.swr.bIsSingle = !0),
      (this.swr.bIgnoreSelf = !0),
      this.swr.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera),
      (this.awr = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (this.awr.bIsSingle = !1),
      (this.awr.bIgnoreSelf = !0),
      (this.awr.ActorsToIgnore = this.mnr),
      this.awr.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.Pawn),
      this.awr.AddObjectTypeQuery(
        QueryTypeDefine_1.KuroObjectTypeQuery.PawnPlayer,
      ),
      this.awr.AddObjectTypeQuery(
        QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster,
      ),
      (this.Fse = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (this.Fse.bIsSingle = !0),
      (this.Fse.bIgnoreSelf = !0),
      (this.Fse.bTraceComplex = !0),
      this.Fse.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera),
      (this.dwr = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (this.dwr.bIsSingle = !0),
      (this.dwr.bIgnoreSelf = !0),
      (this.dwr.bTraceComplex = !0),
      this.uwr && ((this.dwr.DrawTime = 5), this.dwr.SetDrawDebugTrace(2)),
      this.dwr.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera);
  }
  OnEnd() {
    if (((this.yxr = void 0), this.GPe.Empty(), this.Ixr)) {
      this.Ixr.SequencePlayer?.OnStop.Clear();
      const t = this.Ixr;
      TimerSystem_1.TimerSystem.Next(() => {
        ActorSystem_1.ActorSystem.Put(t);
      }),
        (this.Ixr = void 0);
    }
    return (
      (this.hzo = void 0),
      (this.Xxr = void 0),
      (this.rRe = void 0),
      (this.$xr = void 0),
      (this.Yxr = void 0),
      (this.Wxr = 1),
      (this.Kxr = 1),
      (this.Jxr = !1),
      this.zxr &&
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
    if (this.Ixr) {
      if (!this.Tae?.IsValid()) return void this.StopSequence();
      var e = this.Tae.GetEntityIdNoBlueprint();
      if (!e || !EntitySystem_1.EntitySystem.Get(e))
        return void this.StopSequence();
    }
    this.Xxr && this.rRe && this.$xr
      ? (this.Twr(),
        this.Lwr(),
        (this.Hxr += t * MathUtils_1.MathUtils.MillisecondToSecond * this.jxr),
        this.Ixr.SequencePlayer.JumpToSeconds(this.Hxr),
        this.Dwr(),
        this.Rwr(),
        this.CheckCollision(),
        this.Hxr >= this.dUo
          ? this.ywr()
          : this.zxr &&
            0 < this.Zxr &&
            this.Hxr >= this.Zxr &&
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
            (this.zxr = !1)))
      : this.Qxr &&
        ((this.Qxr = Math.max(0, this.Qxr - t)), this.CheckCollision());
  }
  Lwr() {
    this.jxr =
      this.Tae?.GetEntityNoBlueprint()?.GetComponent(107)?.CurrentTimeScale ??
      1;
  }
  Awr() {
    return this.sir ?? CameraController_1.CameraController.GetCharacter();
  }
  Ewr(t, e = !0, i = !0) {
    if (
      ((this.Wxr = t.BlendInTime),
      (this.Kxr = t.BlendOutTime),
      (this.hzo = t.CameraSequence),
      (this.zxr = t.IsHideHud),
      this.hzo)
    ) {
      this.ResetCameraRatioSetting(),
        this.yxr?.CineCamera?.ResetSeqCineCamSetting();
      var s = new UE.MovieSceneSequencePlaybackSettings(),
        e =
          ((s.bDisableMovementInput = e),
          (s.bDisableLookAtInput = i),
          (this.Ixr = ActorSystem_1.ActorSystem.Get(
            UE.LevelSequenceActor.StaticClass(),
            new UE.Transform(),
            void 0,
            !1,
          )),
          (this.Ixr.PlaybackSettings = s),
          this.Ixr.SetSequence(this.hzo),
          this.Ixr.SequencePlayer.GetStartTime()),
        i =
          ((this.Hxr =
            ((e.Time.FrameNumber.Value + e.Time.SubFrame) *
              e.Rate.Denominator) /
            e.Rate.Numerator),
          this.Ixr.SequencePlayer.GetEndTime());
      if (
        ((this.dUo =
          ((i.Time.FrameNumber.Value + i.Time.SubFrame) * i.Rate.Denominator) /
          i.Rate.Numerator),
        t.EnableSpecificSequenceTime &&
          (this.dUo = Math.min(this.dUo, t.SpecificSequenceTime)),
        (this.swr.WorldContextObject = GlobalData_1.GlobalData.World),
        (this.awr.WorldContextObject = GlobalData_1.GlobalData.World),
        this.Uwr(),
        this.zxr)
      ) {
        this.Zxr = t.HideHudTime;
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
  Uwr() {
    this.Ixr &&
      (this.GPe.Add(this.yxr.CineCamera),
      this.Ixr.SetBindingByTag(SEQUENCE_CAMERA, this.GPe, !1),
      this.GPe.Empty(),
      this.Tae) &&
      (this.ewr.Add(this.Tae),
      this.Ixr.SetBindingByTag(ROLE_TAG, this.ewr, !1),
      this.ewr.Empty());
  }
  h8e(t) {
    let e = !1;
    return (
      !this.Pwr(t) && !this.CheckSphereCollision() && this.xwr()
        ? (this.wwr(), (e = !0))
        : this.ywr(),
      e
    );
  }
  Pwr(t) {
    var e = UE.KuroStaticLibrary.GetSequenceTracksForObjectBindingID(
        this.Ixr,
        SEQUENCE_CAMERA,
      ),
      e = UE.KuroStaticLibrary.GetTrackByClass(
        e,
        UE.MovieScene3DTransformTrack.StaticClass(),
      );
    if (!e) return !1;
    var e = UE.KuroStaticLibrary.GetFirstLocationFromSeqTrack(e),
      i = this.Awr(),
      e =
        CameraUtility_1.CameraUtility.GetRootTransform(i).TransformPosition(e),
      t =
        ((this.swr.Radius =
          CameraController_1.CameraController.FightCamera.LogicComponent.CollisionProbeSize),
        this.swr.ActorsToIgnore.Empty(),
        t &&
          this.swr.ActorsToIgnore.Add(
            CameraController_1.CameraController.GetCharacter(),
          ),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.swr, e),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.swr, e),
        TraceElementCommon_1.TraceElementCommon.SphereTrace(
          this.swr,
          PROFILE_KEY1,
        ));
    if (t && this.swr.HitResult?.Actors?.Get(0) === i)
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
  xwr() {
    if (!this.hzo) return !1;
    var t = this.Awr();
    if (!t) return !1;
    if (!this.Ixr) return !1;
    var e = t.CharacterActorComponent.Entity.GetComponent(160),
      i =
        (e.Valid && e.StopModelBuffer(),
        (this.Ixr.bOverrideInstanceData = !0),
        this.Ixr.DefaultInstanceData);
    if (!i) return !1;
    (this.Xxr = i),
      (this.$xr = CameraUtility_1.CameraUtility.GetRootTransform(t)),
      (this.Yxr = t?.CharacterActorComponent?.Entity?.GetComponent(36)),
      e.Valid
        ? ((i = e.MainAnimInstance),
          UE.KuroStaticLibrary.IsObjectClassByName(
            i,
            CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE,
          ) && (this.rRe = i))
        : (this.rRe = void 0),
      this.Dwr();
    t = this.Ixr.SequencePlayer;
    return t.Play(), t.SetPlayRate(0), t.Pause(), t.JumpToSeconds(this.Hxr), !0;
  }
  ywr() {
    if (
      (this.rwr
        ? CameraController_1.CameraController.FightCamera.LogicComponent.ResetArmLengthAndRotation(
            this.owr,
          )
        : CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(
            CameraController_1.CameraController.SequenceCamera.DisplayComponent.CineCamera.K2_GetActorRotation(),
          ),
      CameraController_1.CameraController.FightCamera?.LogicComponent
        ?.CameraCollision &&
        (CameraController_1.CameraController.FightCamera.LogicComponent.CameraCollision.IsNpcDitherEnable =
          !0),
      (this.uwr = !1),
      (this.Jxr = !1),
      this.zxr &&
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
        (this.zxr = !1)),
      CameraController_1.CameraController.ExitCameraMode(1, this.Kxr),
      (this.Qxr = this.Kxr),
      this.Ixr)
    ) {
      this.Ixr.SequencePlayer.Stop(),
        (this.Ixr.PlaybackSettings.bDisableMovementInput = !1),
        (this.Ixr.PlaybackSettings.bDisableLookAtInput = !1);
      const i = this.Ixr;
      TimerSystem_1.TimerSystem.Next(() => {
        ActorSystem_1.ActorSystem.Put(i);
      }),
        (this.Ixr = void 0);
    }
    (this.hzo = void 0),
      this.Tae?.IsValid() &&
        this.Tae.CharRenderingComponent?.OnFinalizedLevelSequence(),
      (this.Xxr = void 0),
      (this.rRe = void 0),
      (this.$xr = void 0),
      (this.sir = void 0);
    for (var [t, e] of this.twr)
      t.IsValid() && t.CharacterActorComponent?.EnableActor(e);
    FNameUtil_1.FNameUtil.IsEmpty(this.olt) ||
      (this.lwr?.IsValid() && this.lwr.K2_DetachFromActor(1, 1, 1)),
      (this.olt = FNameUtil_1.FNameUtil.EMPTY),
      this.twr.clear(),
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
  Twr() {
    this.Yxr.HasDeltaBaseMovementData &&
      (this.$xr.AddToTranslation(this.Yxr.DeltaBaseMovementOffset),
      this.$xr.ConcatenateRotation(this.Yxr.DeltaBaseMovementQuat));
  }
  Rwr() {
    this.Awr()
      .GetEntityNoBlueprint()
      .GetComponent(160)
      .GetCameraPosition(this.Lz),
      this.gwr.DeepCopy(this.yxr.CineCamera.K2_GetActorLocation()),
      (this.awr.WorldContextObject = GlobalData_1.GlobalData.World),
      (this.awr.ActorsToIgnore = this.mnr),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(
        this.awr,
        this.Lz,
      ),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(
        this.awr,
        this.gwr,
      ),
      (this.awr.Radius =
        CameraController_1.CameraController.FightCamera.LogicComponent.CollisionProbeSize),
      this.iwr.clear();
    var t,
      e,
      i = TraceElementCommon_1.TraceElementCommon.SphereTrace(
        this.awr,
        PROFILE_KEY2,
      ),
      s = this.awr.HitResult;
    let r = void 0;
    if (i && s.bBlockingHit) {
      var h = s.GetHitCount();
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(
        this.awr.HitResult,
        0,
        this.Wse,
      );
      for (let t = 0; t < h; t++) {
        var a = s.Actors.Get(t);
        a instanceof TsBaseCharacter_1.default &&
          ((r = ActorUtils_1.ActorUtils.GetEntityByActor(a)?.Entity)
            ?.GetComponent(185)
            ?.HasTag(1922109466) ||
            (this.Wse.Set(
              s.LocationX_Array.Get(t),
              s.LocationY_Array.Get(t),
              s.LocationZ_Array.Get(t),
            ),
            Vector_1.Vector.Dist(this.Wse, this.gwr) > LIMIT_DISTANCE) ||
            this.iwr.add(a));
      }
    }
    for ([t, e] of this.twr)
      (r = ActorUtils_1.ActorUtils.GetEntityByActor(t)?.Entity),
        t.CharacterActorComponent?.EnableActor(e);
    this.twr.clear();
    for (const o of this.iwr)
      this.twr.has(o) ||
        (o.CharacterActorComponent?.Valid &&
          this.twr.set(
            o,
            o.CharacterActorComponent.DisableActor(
              "[SequenceCameraPlayerComponent.ProcessHideShelterCharacter]",
            ),
          ));
  }
  Dwr() {
    var t;
    FNameUtil_1.FNameUtil.IsEmpty(this.olt)
      ? ((t = this.Bwr(this.$xr)), (this.Xxr.TransformOrigin = t))
      : this.lwr?.IsValid() &&
        ((this.Xxr.TransformOriginActor = this.lwr), this.yxr?.CineCamera) &&
        ((t = this.yxr.CineCamera.K2_GetActorLocation()),
        this.yxr.CineCamera.K2_SetActorLocation(t, !1, void 0, !1));
  }
  Swr(t, e) {
    return !(
      !e?.IsValid() ||
      (t?.IsValid() &&
        t !== e &&
        ((t = t.GetEntityNoBlueprint()?.GetComponent(0)),
        (e = e.GetEntityNoBlueprint()?.GetComponent(0)),
        !t?.IsRole() || !e?.IsMonster()))
    );
  }
  wwr() {
    this.mnr.Empty(),
      this.mnr.Add(CameraController_1.CameraController.GetCharacter()),
      this.sir && this.mnr.Add(this.sir),
      CameraController_1.CameraController.EnterCameraMode(1, this.Wxr, 0),
      CameraController_1.CameraController.FightCamera?.LogicComponent
        ?.CameraCollision &&
        (CameraController_1.CameraController.FightCamera.LogicComponent.CameraCollision.IsNpcDitherEnable =
          !1),
      (this.Jxr = !0);
  }
  Bwr(t) {
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
      FNameUtil_1.FNameUtil.IsEmpty(this.hwr)
        ? ((t = this.Tae.GetEntityNoBlueprint().GetComponent(160)),
          (this.fwr = t.GetCameraTransform()))
        : (this.fwr = this.GetBoneTransform(this.hwr)),
      this.fwr?.IsValid()
        ? (this.mnr.Empty(),
          this.mnr.Add(CameraController_1.CameraController.GetCharacter()),
          (this.Fse.ActorsToIgnore = this.mnr),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(
            this.Fse,
            this.fwr.GetLocation(),
          ),
          this.gwr.DeepCopy(this.yxr.CineCamera.K2_GetActorLocation()),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(
            this.Fse,
            this.gwr,
          ),
          (this.Fse.Radius = 3),
          (this.Cwr = TraceElementCommon_1.TraceElementCommon.SphereTrace(
            this.Fse,
            PROFILE_KEY2,
          )),
          this.Cwr &&
            (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
              this.Fse.HitResult,
              0,
              this.Wse,
            ),
            this.yxr.CineCamera.K2_SetActorLocation(
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
    if (0 === this.cwr) return !1;
    this.dwr.WorldContextObject = GlobalData_1.GlobalData.World;
    var t = this.Tae.GetEntityNoBlueprint().GetComponent(160);
    return (
      (this.fwr = t.GetCameraTransform()),
      t.GetCameraPosition(this.pwr),
      this.vwr.DeepCopy(this.Tae.CharacterActorComponent.ActorForwardProxy),
      this.vwr.Multiply(this._wr.X, this.vwr),
      this.Mwr.DeepCopy(Vector_1.Vector.OneVectorProxy),
      this.Mwr.Multiply(this._wr.Y, this.Mwr),
      this.I7.DeepCopy(Vector_1.Vector.UpVectorProxy),
      this.I7.Multiply(this._wr.Z, this.I7),
      this.pwr.Addition(this.vwr, this.pwr),
      this.pwr.Addition(this.Mwr, this.pwr),
      this.pwr.Addition(this.I7, this.pwr),
      this.mnr.Empty(),
      this.mnr.Add(CameraController_1.CameraController.GetCharacter()),
      (this.dwr.ActorsToIgnore = this.mnr),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(
        this.dwr,
        this.pwr,
      ),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(
        this.dwr,
        this.pwr,
      ),
      (this.dwr.Radius = this.cwr),
      TraceElementCommon_1.TraceElementCommon.SphereTrace(
        this.dwr,
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
      (t.CameraLocation = this.yxr.CineCamera.K2_GetActorLocation()),
      (t.CameraRotation = this.yxr.CineCamera.K2_GetActorRotation()),
      (t.OriginRootTransform = this.$xr),
      (t.ConstrainAspectRatio = this.yxr.CineCamera["Constrain Aspect Ratio"]),
      (t.CurrentAperture = this.yxr.CineCamera["Current Aperture"]),
      (t.CurrentFocalLength = this.yxr.CineCamera["Current Focal Length"]),
      (t.FocusSettings = this.yxr.CineCamera["Focus Settings"]),
      (t.LensSettings = this.yxr.CineCamera["Lens Settings"]),
      (t.FieldOfView =
        this.yxr.CineCamera.GetCineCameraComponent().FieldOfView),
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
