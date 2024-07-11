"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BpFxEffectRecorderObject =
    exports.EFFECT_CREATE_ADVANCE =
    exports.RECORDER_MAX_EFFECT_SPEED =
    exports.RECORDER_MAX_SPEED =
    exports.RECORD_INTERVAL =
      void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const Stats_1 = require("../../Core/Common/Stats");
const Time_1 = require("../../Core/Common/Time");
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../Core/Entity/EntitySystem");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const CameraController_1 = require("../Camera/CameraController");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const EffectSystem_1 = require("../Effect/EffectSystem");
const Global_1 = require("../Global");
const ModelManager_1 = require("../Manager/ModelManager");
const SceneInteractionManager_1 = require("../Render/Scene/Interaction/SceneInteractionManager");
const GameplayCueRecorder_1 = require("./GameplayCueRecorder");
const characterTypes =
  ((exports.RECORD_INTERVAL = 0.016667),
  (exports.RECORDER_MAX_SPEED = 3e3),
  (exports.RECORDER_MAX_EFFECT_SPEED = 1e5),
  (exports.EFFECT_CREATE_ADVANCE = 0.1),
  new Set([
    Protocol_1.Aki.Protocol.HBs.Proto_Animal,
    Protocol_1.Aki.Protocol.HBs.Proto_Monster,
    Protocol_1.Aki.Protocol.HBs.Proto_Npc,
    Protocol_1.Aki.Protocol.HBs.Proto_Player,
    Protocol_1.Aki.Protocol.HBs.Proto_Vision,
  ]));
const sceneItemTypes = new Set([Protocol_1.Aki.Protocol.HBs.Proto_SceneItem]);
class MaterialControllerParam {
  constructor(r, e, t) {
    (this.Data = r), (this.UserData = e), (this.StartTime = t);
  }
}
class CameraRecorderObject {
  constructor(r, e, t) {
    (this.OC = r),
      (this.Recorder = void 0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Test",
          6,
          "Start Camera Recorder",
          ["Actor", r.GetName()],
          ["Time", t],
        ),
      (this.Recorder = UE.NewObject(UE.KuroCameraRecorder.StaticClass())),
      this.Recorder.SetRecordActor(
        r,
        exports.RECORD_INTERVAL,
        exports.RECORDER_MAX_SPEED,
      ),
      this.Recorder.StartRecorder(e, t);
  }
  TickRecorder(r) {
    this.Recorder.TickRecorder(r);
  }
  StopRecorder() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Test",
        6,
        "Stop Camera Recorder",
        ["Actor", this.OC?.GetName()],
        ["Time", RecorderBlueprintFunctionLibrary.RecordingTimeNoBlueprint()],
      ),
      this.Recorder.StopRecorder();
  }
}
class CharacterRecorderObject {
  constructor(r, e, t) {
    (this.Tae = r),
      (this.ae = t),
      (this.E0 = 0),
      (this.Recorder = void 0),
      (this.vsr = new Map()),
      (this.Msr = (r, e, t) => {
        this.vsr.set(
          t,
          new MaterialControllerParam(
            r,
            e,
            RecorderBlueprintFunctionLibrary.RecordingTimeNoBlueprint(),
          ),
        );
      }),
      (this.Ssr = (r) => {
        let e;
        const t = this.vsr.get(r);
        t &&
          (RecorderBlueprintFunctionLibrary.RecordingTimeNoBlueprint() <
            t.StartTime &&
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Test",
              6,
              `Remove MaterialController: ${r} at ` +
                RecorderBlueprintFunctionLibrary.RecordingTimeNoBlueprint(),
            ),
          ((e = this.Recorder.AddNotify(
            UE.TsAnimNotifyStateAddMaterialController_C.StaticClass(),
            FNameUtil_1.FNameUtil.EMPTY,
            t.StartTime,
            RecorderBlueprintFunctionLibrary.RecordingTimeNoBlueprint() -
              t.StartTime,
          )).ControllerData = t.Data),
          (e.UserData = t.UserData),
          this.vsr.delete(r));
      }),
      (this.E0 = r.GetEntityIdNoBlueprint()),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Test",
          6,
          "Start Character Recorder",
          ["Actor", r.GetName()],
          ["EntityId", r.CharacterActorComponent.Entity.Id],
          ["Time", t],
        ),
      (this.Recorder = UE.NewObject(UE.KuroCharacterRecorder.StaticClass())),
      (this.Recorder.bUseClone = !CharacterRecorderObject.Esr.has(
        r.CharacterActorComponent.CreatureData.GetEntityType(),
      )),
      this.Recorder.SetRecordActor(
        r,
        exports.RECORD_INTERVAL,
        exports.RECORDER_MAX_SPEED,
      ),
      this.Recorder.StartRecorder(e, t),
      this.Recorder.SetNotifiesRecordConfigs(
        RecorderBlueprintFunctionLibrary.RecordNotifies,
        RecorderBlueprintFunctionLibrary.ReplaceNotifies,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        r.CharRenderingComponent,
        EventDefine_1.EEventName.OnAddMaterialController,
        this.Msr,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        r.CharRenderingComponent,
        EventDefine_1.EEventName.OnRemoveMaterialController,
        this.Ssr,
      );
  }
  TickRecorder(r) {
    this.Recorder.TickRecorder(r);
  }
  StopRecorder() {
    let r;
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Test",
        6,
        "Stop Character Recorder",
        ["Actor", this.Tae?.GetName()],
        ["EntityId", this.Tae?.CharacterActorComponent?.Entity.Id],
        ["Time", RecorderBlueprintFunctionLibrary.RecordingTimeNoBlueprint()],
      ),
      (this.Recorder.AddNotify(
        UE.TsAnimNotifyStateAddCharRendering_C.StaticClass(),
        FNameUtil_1.FNameUtil.EMPTY,
        this.ae,
        RecorderBlueprintFunctionLibrary.RecordingTimeNoBlueprint() - this.ae,
      ).RenderType = this.Tae.RenderType),
      EntitySystem_1.EntitySystem.Get(this.E0) &&
        (EventSystem_1.EventSystem.RemoveWithTarget(
          this.Tae.CharRenderingComponent,
          EventDefine_1.EEventName.OnAddMaterialController,
          this.Msr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Tae.CharRenderingComponent,
          EventDefine_1.EEventName.OnRemoveMaterialController,
          this.Ssr,
        ));
    for ([r] of this.vsr) this.Ssr(r);
    this.Recorder.StopRecorder();
  }
}
CharacterRecorderObject.Esr = new Set([
  Protocol_1.Aki.Protocol.HBs.Proto_Player,
]);
class SceneItemRecorderObject {
  constructor(r, t, i) {
    (this.ysr = r),
      (this.Isr = new Array()),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Test",
          6,
          "Start SceneItem Recorder",
          ["Name", r.Owner.GetName()],
          [
            "Path",
            SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionLevelName(
              r.GetSceneInteractionLevelHandleId(),
            ),
          ],
          ["EntityId", r.Entity.Id],
          ["Time", i],
        );
    const e = r.Owner;
    const n = UE.NewObject(UE.KuroMeshRecorder.StaticClass());
    this.Isr.push(n),
      n.SetRecordActor(
        e,
        exports.RECORD_INTERVAL,
        exports.RECORDER_MAX_EFFECT_SPEED,
      ),
      n.StartRecorder(t, i);
    const o =
      SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(
        r.GetSceneInteractionLevelHandleId(),
      );
    if (o) {
      const c = new Set();
      for (let r = 0, e = o.Num(); r < e; r++) {
        const u = o.Get(r);
        if (c.has(u))
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Test", 6, "Recorder Repetitive SceneItemActor", [
              "Actor",
              u.GetName(),
            ]);
        else if (
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Test", 6, "  SceneItem Child", [
              "Name",
              u.GetName(),
            ]),
          c.add(u),
          !(
            !u.RootComponent ||
            u instanceof UE.Brush ||
            u instanceof UE.LevelSequenceActor
          ))
        ) {
          const n = UE.NewObject(UE.KuroMeshRecorder.StaticClass());
          this.Isr.push(n),
            n.SetRecordActor(
              u,
              exports.RECORD_INTERVAL,
              exports.RECORDER_MAX_SPEED,
            ),
            n.StartRecorder(t, i);
        }
      }
    }
  }
  TickRecorder(r) {
    for (const e of this.Isr) e.TickRecorder(r);
  }
  StopRecorder() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Test",
        6,
        "Stop SceneItem Recorder",
        [
          "LevelName",
          SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionLevelName(
            this.ysr.GetSceneInteractionLevelHandleId(),
          ),
        ],
        ["EntityId", this.ysr?.Entity?.Id],
        ["Time", RecorderBlueprintFunctionLibrary.RecordingTimeNoBlueprint()],
      );
    for (const r of this.Isr) r.StopRecorder();
  }
}
class EffectRecorderObject {
  constructor(r, e, t, i) {
    (this.OC = r),
      (this.gXo = e),
      (this.Tsr = -1),
      (this.Lsr = -1),
      (this.Playing = !1),
      (this.iy = void 0),
      (this.n8 = ""),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Test",
          6,
          "Start Effect Recorder",
          ["Actor", r.GetName()],
          ["Time", i],
        ),
      (this.iy = UE.NewObject(UE.KuroEffectRecorder.StaticClass())),
      this.iy.SetEffectClass(
        UE.TsRecordEffect_C.StaticClass(),
        EffectSystem_1.EffectSystem.GetEffectModel(e).GetName(),
      ),
      this.iy.SetRecordActor(
        r,
        exports.RECORD_INTERVAL,
        exports.RECORDER_MAX_SPEED,
      ),
      this.iy.StartRecorder(t, i);
    t = this.iy.GetShadow();
    (this.n8 = UE.KismetSystemLibrary.GetPathName(
      EffectSystem_1.EffectSystem.GetEffectModel(e),
    )),
      this.iy.RecordStringValue(
        r,
        new UE.FName("EffectModelDataPath"),
        i - exports.EFFECT_CREATE_ADVANCE,
        this.n8,
      ),
      (t.EffectModelDataPath = this.n8),
      (t.EffectModelData = EffectSystem_1.EffectSystem.GetEffectModel(e)),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Test",
          6,
          "Record Effect",
          [
            "EffectModel",
            EffectSystem_1.EffectSystem.GetEffectModel(e)?.GetName(),
          ],
          ["Path", t.EffectModelDataPath],
        );
  }
  TickRecorder(r) {
    let e = !1;
    const t = EffectSystem_1.EffectSystem.GetLastPlayTime(this.gXo);
    const i = EffectSystem_1.EffectSystem.GetLastStopTime(this.gXo);
    t > 0 && t !== this.Tsr && ((this.Tsr = t), (e = !0), (this.Playing = !0)),
      i > 0 &&
        i !== this.Lsr &&
        ((this.Lsr = i), (e = !0), (this.Playing = !1)),
      e &&
        (this.Tsr > this.Lsr ? this.iy.PlayCommand() : this.iy.StopCommand()),
      this.iy.TickRecorder(r);
  }
  StopRecorder() {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Test", 6, "Stop Effect Recorder"),
      this.Tsr > this.Lsr && this.iy.StopCommand(),
      this.iy.RecordStringValue(
        this.OC,
        new UE.FName("EffectModelDataPath"),
        RecorderBlueprintFunctionLibrary.RecordingTimeNoBlueprint(),
        this.n8,
      ),
      this.iy.StopRecorder();
  }
}
class BpFxEffectRecorderObject {
  constructor(r, e, t) {
    (this.OC = r),
      (this.ae = t),
      (this.Recorder = void 0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Test",
          6,
          "Start TsBpFxEffect Recorder",
          ["Actor", r.GetName()],
          ["Time", t],
        ),
      (this.Recorder = UE.NewObject(UE.KuroTrackRecorder.StaticClass())),
      this.Recorder.SetRecordActor(
        r,
        exports.RECORD_INTERVAL,
        exports.RECORDER_MAX_SPEED,
      ),
      this.Recorder.StartRecorder(e, t),
      ((this.OC.Recorder = this).OC.RecorderShadow = this.Shadow),
      (this.Shadow.IsRecorderActor = !0),
      this.OC.OnRecordStart();
  }
  get Shadow() {
    return this.Recorder.GetShadow();
  }
  TickRecorder(r) {
    this.OC.OnRecordTick(r), this.Recorder.TickRecorder(r);
  }
  StopRecorder(r) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Test",
        6,
        "Stop TsBpFxEffect Recorder",
        ["Actor", this.OC.GetName()],
        ["Time", RecorderBlueprintFunctionLibrary.RecordingTimeNoBlueprint()],
      ),
      this.OC.OnRecordStop(),
      this.Recorder.AddStaticBoolPropertyTrack(
        this.OC,
        new UE.FName("IsRecorderActor"),
        !0,
        this.ae,
        r,
      ),
      this.Recorder.StopRecorder(),
      this.OC.ClearRecorder();
  }
}
exports.BpFxEffectRecorderObject = BpFxEffectRecorderObject;
class RecorderBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  static FindCenterLocation() {
    const r = RecorderBlueprintFunctionLibrary.CenterLocation;
    return (
      r.DeepCopy(
        RecorderBlueprintFunctionLibrary.CenterActor
          ? RecorderBlueprintFunctionLibrary.CenterActor.K2_GetActorLocation()
          : Global_1.Global.BaseCharacter.CharacterActorComponent
              .ActorLocationProxyNoUpdate,
      ),
      r
    );
  }
  static Init() {
    (RecorderBlueprintFunctionLibrary.RecordNotifies = UE.NewArray(UE.Class)),
      RecorderBlueprintFunctionLibrary.RecordNotifies.Add(
        UE.AnimNotifyEffect_C.StaticClass(),
      ),
      RecorderBlueprintFunctionLibrary.RecordNotifies.Add(
        UE.AnimNotifyStateEffect_C.StaticClass(),
      ),
      RecorderBlueprintFunctionLibrary.RecordNotifies.Add(
        UE.AnimNotifyStateGhost_C.StaticClass(),
      ),
      RecorderBlueprintFunctionLibrary.RecordNotifies.Add(
        UE.AnimNotifyAddMaterialControllerData_C.StaticClass(),
      ),
      RecorderBlueprintFunctionLibrary.RecordNotifies.Add(
        UE.AnimNotifyAddMaterialControllerDataGroup_C.StaticClass(),
      ),
      RecorderBlueprintFunctionLibrary.RecordNotifies.Add(
        UE.AnimNotifyAddMeshMaterialControllerData_C.StaticClass(),
      ),
      RecorderBlueprintFunctionLibrary.RecordNotifies.Add(
        UE.AnimNotifyAddMeshMaterialControllerDataGroup_C.StaticClass(),
      ),
      RecorderBlueprintFunctionLibrary.RecordNotifies.Add(
        UE.AnimNotifyAddMotionVertexOffset_C.StaticClass(),
      ),
      RecorderBlueprintFunctionLibrary.RecordNotifies.Add(
        UE.AnimNotifyAddTransferEffect_C.StaticClass(),
      ),
      RecorderBlueprintFunctionLibrary.RecordNotifies.Add(
        UE.AnimNotifyStateAddMaterialControllerData_C.StaticClass(),
      ),
      RecorderBlueprintFunctionLibrary.RecordNotifies.Add(
        UE.AnimNotifyStateAddMaterialControllerDataGroup_C.StaticClass(),
      ),
      (RecorderBlueprintFunctionLibrary.ReplaceNotifies = UE.NewArray(
        UE.Class,
      )),
      (RecorderBlueprintFunctionLibrary.CenterLocation =
        Vector_1.Vector.Create()),
      (RecorderBlueprintFunctionLibrary.EffectLocation =
        Vector_1.Vector.Create()),
      (RecorderBlueprintFunctionLibrary.OverrideAttached = UE.NewMap(
        UE.BuiltinName,
        UE.Guid,
      )),
      (RecorderBlueprintFunctionLibrary.IgnoreClasses = UE.NewSet(UE.Class)),
      RecorderBlueprintFunctionLibrary.IgnoreClasses.Add(
        UE.BP_Cinematics_Tick_C.StaticClass(),
      ),
      (RecorderBlueprintFunctionLibrary.Stat1 = void 0),
      (RecorderBlueprintFunctionLibrary.Stat2 = void 0),
      (RecorderBlueprintFunctionLibrary.Stat3 = void 0);
  }
  static StartRecord(r, e, t, i, n, o) {
    if (
      (RecorderBlueprintFunctionLibrary.Init(),
      !RecorderBlueprintFunctionLibrary.Recording) &&
      (r || Global_1.Global.BaseCharacter)
    )
      return (
        (RecorderBlueprintFunctionLibrary.EnableCharacterRecord = i),
        (RecorderBlueprintFunctionLibrary.EnableSceneItemRecord = n),
        (RecorderBlueprintFunctionLibrary.EnableEffectRecord = o),
        (RecorderBlueprintFunctionLibrary.Recording = !0),
        (RecorderBlueprintFunctionLibrary.RecordingTimeInternal = 0),
        (RecorderBlueprintFunctionLibrary.CenterActor = r),
        (RecorderBlueprintFunctionLibrary.RecordDist = e),
        (RecorderBlueprintFunctionLibrary.RecordDistSquared = e * e),
        (RecorderBlueprintFunctionLibrary.CharacterRecorders = new Map()),
        (RecorderBlueprintFunctionLibrary.SceneItemRecorders = new Map()),
        (RecorderBlueprintFunctionLibrary.EffectRecorders = new Map()),
        (RecorderBlueprintFunctionLibrary.BpFxEffectRecorders = new Map()),
        (RecorderBlueprintFunctionLibrary.GameplayCueRecorders = new Map()),
        (i = (0, puerts_1.$ref)(void 0)),
        (RecorderBlueprintFunctionLibrary.OutPath = t),
        UE.KuroAnimEdLibrary.CreateNewLevelSequence(
          t + "RecordSequence",
          i,
          void 0,
        ),
        (RecorderBlueprintFunctionLibrary.OutputSequence = (0, puerts_1.$unref)(
          i,
        )),
        UE.KuroDataHelperLibrary.SaveObject(
          RecorderBlueprintFunctionLibrary.OutputSequence,
        ),
        (RecorderBlueprintFunctionLibrary.FightCameraRecorder =
          new CameraRecorderObject(
            CameraController_1.CameraController.FightCamera.LogicComponent.CameraActor,
            RecorderBlueprintFunctionLibrary.OutputSequence,
            RecorderBlueprintFunctionLibrary.RecordingTimeInternal,
          )),
        (RecorderBlueprintFunctionLibrary.SequenceCameraRecorder =
          new CameraRecorderObject(
            CameraController_1.CameraController.SequenceCamera.DisplayComponent.CineCamera,
            RecorderBlueprintFunctionLibrary.OutputSequence,
            RecorderBlueprintFunctionLibrary.RecordingTimeInternal,
          )),
        (RecorderBlueprintFunctionLibrary.WidgetCameraRecorder =
          new CameraRecorderObject(
            CameraController_1.CameraController.WidgetCamera.DisplayComponent.CineCamera,
            RecorderBlueprintFunctionLibrary.OutputSequence,
            RecorderBlueprintFunctionLibrary.RecordingTimeInternal,
          )),
        RecorderBlueprintFunctionLibrary.OverrideAttached.Empty(),
        RecorderBlueprintFunctionLibrary.OverrideAttached.Set(
          new UE.FName("SequenceCamera"),
          RecorderBlueprintFunctionLibrary.SequenceCameraRecorder.Recorder.GetMainGuid(),
        ),
        RecorderBlueprintFunctionLibrary.StartRecordersWhenUpdate(),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CreateEntity,
          RecorderBlueprintFunctionLibrary.OnCreateEntity,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.PlayCameraLevelSequence,
          RecorderBlueprintFunctionLibrary.OnPlayCameraLevelSequence,
        ),
        RecorderBlueprintFunctionLibrary.OutputSequence
      );
  }
  static TickRecord(r) {
    if (
      RecorderBlueprintFunctionLibrary.Recording &&
      (RecorderBlueprintFunctionLibrary.CenterActor ||
        Global_1.Global.BaseCharacter)
    ) {
      let e;
      let t;
      let i;
      let n;
      let o;
      const c = Time_1.Time.DeltaTimeSeconds;
      (RecorderBlueprintFunctionLibrary.RecordingTimeInternal += c),
        RecorderBlueprintFunctionLibrary.StopRecordersWhenUpdate(),
        RecorderBlueprintFunctionLibrary.FightCameraRecorder?.TickRecorder(c),
        RecorderBlueprintFunctionLibrary.SequenceCameraRecorder?.TickRecorder(
          c,
        ),
        RecorderBlueprintFunctionLibrary.WidgetCameraRecorder?.TickRecorder(c);
      for ([, e] of RecorderBlueprintFunctionLibrary.CharacterRecorders)
        e.TickRecorder(c);
      for ([, t] of RecorderBlueprintFunctionLibrary.SceneItemRecorders)
        t.TickRecorder(c);
      for ([, i] of RecorderBlueprintFunctionLibrary.EffectRecorders)
        i.TickRecorder(c);
      for ([, n] of RecorderBlueprintFunctionLibrary.BpFxEffectRecorders)
        n.TickRecorder(c);
      for ([, o] of RecorderBlueprintFunctionLibrary.GameplayCueRecorders)
        o.TickRecorder(c);
      RecorderBlueprintFunctionLibrary.StartRecordersWhenUpdate();
    }
  }
  static StopRecord() {
    if (RecorderBlueprintFunctionLibrary.Recording) {
      RecorderBlueprintFunctionLibrary.FightCameraRecorder?.StopRecorder(),
        RecorderBlueprintFunctionLibrary.SequenceCameraRecorder?.StopRecorder(),
        RecorderBlueprintFunctionLibrary.WidgetCameraRecorder?.StopRecorder();
      for (const [, r] of RecorderBlueprintFunctionLibrary.CharacterRecorders)
        r.StopRecorder();
      RecorderBlueprintFunctionLibrary.CharacterRecorders.clear();
      for (const [, e] of RecorderBlueprintFunctionLibrary.SceneItemRecorders)
        e.StopRecorder();
      RecorderBlueprintFunctionLibrary.SceneItemRecorders.clear();
      for (const [, t] of RecorderBlueprintFunctionLibrary.EffectRecorders)
        t.StopRecorder();
      RecorderBlueprintFunctionLibrary.EffectRecorders.clear();
      for (const [, i] of RecorderBlueprintFunctionLibrary.BpFxEffectRecorders)
        i.StopRecorder(RecorderBlueprintFunctionLibrary.RecordingTimeInternal);
      RecorderBlueprintFunctionLibrary.BpFxEffectRecorders.clear();
      for (const [, n] of RecorderBlueprintFunctionLibrary.GameplayCueRecorders)
        n.StopRecorder(RecorderBlueprintFunctionLibrary.RecordingTimeInternal);
      RecorderBlueprintFunctionLibrary.GameplayCueRecorders.clear(),
        (RecorderBlueprintFunctionLibrary.Recording = !1),
        (RecorderBlueprintFunctionLibrary.RecordingTimeInternal = 0),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CreateEntity,
          RecorderBlueprintFunctionLibrary.OnCreateEntity,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.PlayCameraLevelSequence,
          RecorderBlueprintFunctionLibrary.OnPlayCameraLevelSequence,
        );
    }
  }
  static IsPlaying() {
    return RecorderBlueprintFunctionLibrary.Playing;
  }
  static SetPlaying(r) {
    RecorderBlueprintFunctionLibrary.Playing = r;
  }
  static GetPlayingLevelSequence(r) {
    if (!RecorderBlueprintFunctionLibrary.LevelSequencePlayer?.IsValid()) {
      const e = (0, puerts_1.$ref)(void 0);
      const t =
        (UE.GameplayStatics.GetAllActorsOfClass(
          r,
          UE.LevelSequenceActor.StaticClass(),
          e,
        ),
        (0, puerts_1.$unref)(e));
      for (let r = t.Num() - 1; r >= 0; --r) {
        const i = t.Get(r);
        if (i.IsValid()) {
          RecorderBlueprintFunctionLibrary.LevelSequencePlayer =
            i.SequencePlayer;
          break;
        }
      }
    }
    return RecorderBlueprintFunctionLibrary.LevelSequencePlayer;
  }
  static IsRecording() {
    return RecorderBlueprintFunctionLibrary.Recording;
  }
  static RecordingTime() {
    return RecorderBlueprintFunctionLibrary.RecordingTimeInternal || 0;
  }
  static CreateNewDataAsset(r, e) {
    const t = (0, puerts_1.$ref)(void 0);
    return (
      UE.KuroAnimEdLibrary.CreateNewDataAsset(
        RecorderBlueprintFunctionLibrary.OutPath + r,
        e,
        t,
        void 0,
      ),
      (0, puerts_1.$unref)(t)
    );
  }
  static SaveObject(r) {
    UE.KuroDataHelperLibrary.SaveObject(r);
  }
  static RecordingTimeNoBlueprint() {
    return RecorderBlueprintFunctionLibrary.RecordingTimeInternal || 0;
  }
  static GetRecordingsText() {
    return RecorderBlueprintFunctionLibrary.RecordingsText;
  }
  static StopRecordersWhenUpdate() {
    let r = !1;
    for (const [e, t] of RecorderBlueprintFunctionLibrary.CharacterRecorders)
      EntitySystem_1.EntitySystem.Get(e) ||
        (t.StopRecorder(),
        RecorderBlueprintFunctionLibrary.CharacterRecorders.delete(e),
        (r = !0));
    for (const [i, n] of RecorderBlueprintFunctionLibrary.SceneItemRecorders)
      EntitySystem_1.EntitySystem.Get(i) ||
        (n.StopRecorder(),
        RecorderBlueprintFunctionLibrary.SceneItemRecorders.delete(i),
        (r = !0));
    for (const [o, c] of RecorderBlueprintFunctionLibrary.EffectRecorders)
      EffectSystem_1.EffectSystem.IsValid(o) ||
        (c.StopRecorder(),
        RecorderBlueprintFunctionLibrary.EffectRecorders.delete(o));
    return r;
  }
  static StartRecordersWhenUpdate() {
    const r = this.FindCenterLocation();
    let e = RecorderBlueprintFunctionLibrary.StartEntityRecorders(r);
    e = !!RecorderBlueprintFunctionLibrary.StartEffectRecorders(r) || e;
  }
  static StartEntityRecorders(r) {
    let e = !1;
    let t, i, n, o;
    if (RecorderBlueprintFunctionLibrary.EnableCharacterRecord)
      for (const c of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
        c.Valid &&
          c.Entity &&
          (t = c.Entity).Active &&
          !RecorderBlueprintFunctionLibrary.CharacterRecorders.has(
            c.Entity.Id,
          ) &&
          (i = t.GetComponent(0)) &&
          characterTypes.has(i.GetEntityType()) &&
          (i = t.GetComponent(3)) &&
          i.Actor &&
          (Vector_1.Vector.DistSquared(i.ActorLocationProxy, r) >
            RecorderBlueprintFunctionLibrary.RecordDistSquared ||
            ((i = new CharacterRecorderObject(
              i.Actor,
              RecorderBlueprintFunctionLibrary.OutputSequence,
              RecorderBlueprintFunctionLibrary.RecordingTimeInternal,
            )),
            RecorderBlueprintFunctionLibrary.CharacterRecorders.set(t.Id, i),
            (e = !0)));
    if (RecorderBlueprintFunctionLibrary.EnableSceneItemRecord)
      for (const u of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
        u.Valid &&
          u.Entity &&
          (n = u.Entity).Active &&
          !RecorderBlueprintFunctionLibrary.SceneItemRecorders.has(
            u.Entity.Id,
          ) &&
          (o = n.GetComponent(0)) &&
          sceneItemTypes.has(o.GetEntityType()) &&
          (!(o = n.GetComponent(182)).GetIsSceneInteractionLoadCompleted() ||
            Vector_1.Vector.DistSquared(o.ActorLocationProxy, r) >
              RecorderBlueprintFunctionLibrary.RecordDistSquared ||
            ((o = new SceneItemRecorderObject(
              o,
              RecorderBlueprintFunctionLibrary.OutputSequence,
              RecorderBlueprintFunctionLibrary.RecordingTimeInternal,
            )),
            RecorderBlueprintFunctionLibrary.SceneItemRecorders.set(n.Id, o),
            (e = !0)));
    return e;
  }
  static StartEffectRecorders(r) {
    if (RecorderBlueprintFunctionLibrary.EnableEffectRecord) {
      let e;
      const t = RecorderBlueprintFunctionLibrary.EffectLocation;
      for (const i of EffectSystem_1.EffectSystem.Effects)
        i &&
          i.IsRoot() &&
          i.IsDone() &&
          i.GetEffectData()?.IsValid() &&
          (i.GetNotRecord() ||
            RecorderBlueprintFunctionLibrary.EffectRecorders.has(i.Id) ||
            ((e = i.GetSureEffectActor()) &&
              (t.FromUeVector(e.K2_GetActorLocation()),
              Vector_1.Vector.DistSquared(t, r) >
                RecorderBlueprintFunctionLibrary.RecordDistSquared ||
                ((e = new EffectRecorderObject(
                  e,
                  i.Id,
                  RecorderBlueprintFunctionLibrary.OutputSequence,
                  RecorderBlueprintFunctionLibrary.RecordingTimeInternal,
                )),
                RecorderBlueprintFunctionLibrary.EffectRecorders.set(
                  i.Id,
                  e,
                )))));
    }
    return !1;
  }
  static StartRecordTsBpFxEffect(r) {
    let e, t, i;
    if (RecorderBlueprintFunctionLibrary.EnableEffectRecord)
      return (
        (e = RecorderBlueprintFunctionLibrary.BpFxEffectRecorders.get(r)) ||
        ((t = this.FindCenterLocation()),
        (i = RecorderBlueprintFunctionLibrary.EffectLocation).FromUeVector(
          r.K2_GetActorLocation(),
        ),
        Vector_1.Vector.DistSquared(t, i) >
        RecorderBlueprintFunctionLibrary.RecordDistSquared
          ? void (
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Test",
                6,
                "Record TsBpFxEffect TooFar",
                ["Name", r.GetName()],
                ["effectLocation", i],
                ["centerLocation", t],
              )
            )
          : ((e = new BpFxEffectRecorderObject(
              r,
              RecorderBlueprintFunctionLibrary.OutputSequence,
              RecorderBlueprintFunctionLibrary.RecordingTimeInternal,
            )),
            RecorderBlueprintFunctionLibrary.BpFxEffectRecorders.set(r, e),
            e))
      );
  }
  static StopRecordTsBpFxEffect(r) {
    const e = RecorderBlueprintFunctionLibrary.BpFxEffectRecorders.get(r);
    e &&
      (e.StopRecorder(RecorderBlueprintFunctionLibrary.RecordingTimeInternal),
      RecorderBlueprintFunctionLibrary.BpFxEffectRecorders.delete(r));
  }
  static StartRecordGameplayCueHook(r, e) {
    let t, i, n;
    if (RecorderBlueprintFunctionLibrary.EnableEffectRecord)
      return (
        (t = RecorderBlueprintFunctionLibrary.GameplayCueRecorders.get(e)) ||
        ((i = this.FindCenterLocation()),
        (n = RecorderBlueprintFunctionLibrary.EffectLocation).FromUeVector(
          r.K2_GetActorLocation(),
        ),
        Vector_1.Vector.DistSquared(i, n) >
        RecorderBlueprintFunctionLibrary.RecordDistSquared
          ? void (
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Test",
                6,
                "Record GameplayCue TooFar",
                ["Name", r.GetName()],
                ["actorLocation", n],
                ["centerLocation", i],
              )
            )
          : ((t = new GameplayCueRecorder_1.GameplayCueRecorderHook(
              r,
              e,
              RecorderBlueprintFunctionLibrary.OutputSequence,
              RecorderBlueprintFunctionLibrary.RecordingTimeInternal,
            )).Start(),
            RecorderBlueprintFunctionLibrary.GameplayCueRecorders.set(e, t),
            t))
      );
  }
  static StopRecordGameplayCueHook(r) {
    const e = RecorderBlueprintFunctionLibrary.GameplayCueRecorders.get(r);
    e &&
      (e.StopRecorder(RecorderBlueprintFunctionLibrary.RecordingTimeInternal),
      RecorderBlueprintFunctionLibrary.GameplayCueRecorders.delete(r));
  }
  static RecorderPlayerInitialize() {
    RecorderBlueprintFunctionLibrary.RecorderPlayerInitializeTs();
  }
  static RecorderPlayerInitializeTs() {
    RecorderBlueprintFunctionLibrary.RecorderPlayerInitialized ||
      ((RecorderBlueprintFunctionLibrary.RecorderPlayerInitialized = !0),
      EffectSystem_1.EffectSystem.Initialize());
  }
  static FindCharacterRecorder(r) {
    if (r)
      return RecorderBlueprintFunctionLibrary.CharacterRecorders.get(
        r.GetEntityIdNoBlueprint(),
      )?.Recorder;
  }
}
(RecorderBlueprintFunctionLibrary.Playing = !1),
  (RecorderBlueprintFunctionLibrary.LevelSequencePlayer = void 0),
  (RecorderBlueprintFunctionLibrary.Recording = !1),
  (RecorderBlueprintFunctionLibrary.RecordingTimeInternal = 0),
  (RecorderBlueprintFunctionLibrary.OutPath = ""),
  (RecorderBlueprintFunctionLibrary.OutputSequence = void 0),
  (RecorderBlueprintFunctionLibrary.CenterActor = void 0),
  (RecorderBlueprintFunctionLibrary.RecordDist = 0),
  (RecorderBlueprintFunctionLibrary.RecordDistSquared = 0),
  (RecorderBlueprintFunctionLibrary.FightCameraRecorder = void 0),
  (RecorderBlueprintFunctionLibrary.SequenceCameraRecorder = void 0),
  (RecorderBlueprintFunctionLibrary.WidgetCameraRecorder = void 0),
  (RecorderBlueprintFunctionLibrary.CharacterRecorders = new Map()),
  (RecorderBlueprintFunctionLibrary.SceneItemRecorders = new Map()),
  (RecorderBlueprintFunctionLibrary.EffectRecorders = new Map()),
  (RecorderBlueprintFunctionLibrary.BpFxEffectRecorders = new Map()),
  (RecorderBlueprintFunctionLibrary.GameplayCueRecorders = new Map()),
  (RecorderBlueprintFunctionLibrary.RecordingsText = ""),
  (RecorderBlueprintFunctionLibrary.RecordNotifies = UE.NewArray(UE.Class)),
  (RecorderBlueprintFunctionLibrary.ReplaceNotifies = UE.NewArray(UE.Class)),
  (RecorderBlueprintFunctionLibrary.EnableCharacterRecord = !1),
  (RecorderBlueprintFunctionLibrary.EnableSceneItemRecord = !1),
  (RecorderBlueprintFunctionLibrary.EnableEffectRecord = !1),
  (RecorderBlueprintFunctionLibrary.CenterLocation = Vector_1.Vector.Create()),
  (RecorderBlueprintFunctionLibrary.OverrideAttached = UE.NewMap(
    UE.BuiltinName,
    UE.Guid,
  )),
  (RecorderBlueprintFunctionLibrary.IgnoreClasses = UE.NewSet(UE.Class)),
  (RecorderBlueprintFunctionLibrary.EffectLocation = void 0),
  (RecorderBlueprintFunctionLibrary.Stat1 = void 0),
  (RecorderBlueprintFunctionLibrary.Stat2 = void 0),
  (RecorderBlueprintFunctionLibrary.Stat3 = void 0),
  (RecorderBlueprintFunctionLibrary.RecorderPlayerInitialized = !1),
  (RecorderBlueprintFunctionLibrary.OnCreateEntity = (r, e) => {
    let t, i;
    RecorderBlueprintFunctionLibrary.CharacterRecorders.has(e.Id) ||
      ((i = e.Entity.GetComponent(3))?.Valid &&
        ((t = RecorderBlueprintFunctionLibrary.FindCenterLocation()),
        Vector_1.Vector.DistSquared(i.ActorLocationProxyNoUpdate, t) >
          RecorderBlueprintFunctionLibrary.RecordDistSquared ||
          ((i = new CharacterRecorderObject(
            e.Entity.GetComponent(3).Actor,
            RecorderBlueprintFunctionLibrary.OutputSequence,
            RecorderBlueprintFunctionLibrary.RecordingTimeInternal,
          )),
          RecorderBlueprintFunctionLibrary.CharacterRecorders.set(e.Id, i))));
  }),
  (RecorderBlueprintFunctionLibrary.OnPlayCameraLevelSequence = (r, e) => {
    e = RecorderBlueprintFunctionLibrary.FindCharacterRecorder(e);
    e &&
      RecorderBlueprintFunctionLibrary.OverrideAttached.Set(
        new UE.FName("Role"),
        e.GetMainGuid(),
      ),
      UE.KuroRecorderLibrary.CopyLevelSequence(
        r,
        RecorderBlueprintFunctionLibrary.OutputSequence,
        RecorderBlueprintFunctionLibrary.RecordingTimeInternal,
        RecorderBlueprintFunctionLibrary.OverrideAttached,
        RecorderBlueprintFunctionLibrary.IgnoreClasses,
      );
  }),
  (exports.default = RecorderBlueprintFunctionLibrary);
// # sourceMappingURL=RecorderBlueprintFunctionLibrary.js.map
