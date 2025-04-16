"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueRecorderBeam =
    exports.GameplayCueRecorderHook =
    exports.GameplayCueRecorderObject =
      void 0);
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  RecorderBlueprintFunctionLibrary_1 = require("./RecorderBlueprintFunctionLibrary");
class GameplayCueRecorderObject {
  constructor(e, t, r) {
    (this.Actor = e),
      (this.OutSeq = t),
      (this.StartTime = r),
      (this.Recorder = void 0);
  }
  Start() {
    this.Recorder &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Test",
          6,
          "Start GameplayCue Recorder",
          ["Actor", this.Actor.GetName()],
          ["Time", this.StartTime],
        ),
      this.Recorder.SetRecordActor(
        this.Actor,
        RecorderBlueprintFunctionLibrary_1.RECORD_INTERVAL,
        RecorderBlueprintFunctionLibrary_1.RECORDER_MAX_SPEED,
      ),
      this.Recorder.StartRecorder(
        this.OutSeq,
        this.StartTime -
          RecorderBlueprintFunctionLibrary_1.EFFECT_CREATE_ADVANCE,
      ),
      this.Recorder.TickRecorder(
        RecorderBlueprintFunctionLibrary_1.EFFECT_CREATE_ADVANCE,
      ),
      this.Recorder.PlayCommand());
  }
  TickRecorder(e) {
    this.Recorder.TickRecorder(e);
  }
  StopRecorder(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Test", 6, "Stop GameplayCue Recorder"),
      this.Recorder.StopCommand(),
      this.Recorder.StopRecorder();
  }
}
class GameplayCueRecorderHook extends (exports.GameplayCueRecorderObject =
  GameplayCueRecorderObject) {
  constructor(e, t, r, i) {
    super(e, r, i),
      (this.gar = new UE.VectorDouble()),
      (this.n8 = ""),
      e.RootComponent ||
        e.AddComponentByClass(
          UE.SceneComponent.StaticClass(),
          !1,
          MathUtils_1.MathUtils.DefaultTransform,
          !1,
        ),
      (this.Recorder = UE.NewObject(UE.KuroEffectRecorder.StaticClass())),
      this.Recorder.SetEffectClass(
        UE.TsRecordGameplayCue_C.StaticClass(),
        "GameplayCue_" + this.Actor.GetName(),
      ),
      (this.n8 = t.Paths[0]),
      (this.gar = t.TargetPosition);
  }
  StopRecorder(e) {
    this.Recorder.AddStaticStrPropertyTrack(
      this.Actor,
      new UE.FName("Path"),
      this.n8,
      0,
      e,
    );
    var t = UE.KismetMathLibrary.Conv_VectorDoubleToVector(this.gar);
    this.Recorder.AddStaticVectorPropertyTrack(
      this.Actor,
      new UE.FName("Position0"),
      t,
      0,
      e,
    ),
      super.StopRecorder(e);
  }
}
exports.GameplayCueRecorderHook = GameplayCueRecorderHook;
class GameplayCueRecorderBeam extends GameplayCueRecorderObject {
  constructor(e, t, r, i) {
    super(e, r, i),
      (this.n8 = ""),
      (this.hEc = void 0),
      (this.v$o = void 0),
      e.RootComponent ||
        e.AddComponentByClass(
          UE.SceneComponent.StaticClass(),
          !1,
          MathUtils_1.MathUtils.DefaultTransform,
          !1,
        ),
      (this.Recorder = UE.NewObject(UE.KuroEffectRecorder.StaticClass())),
      this.Recorder.SetEffectClass(
        UE.TsRecordGameplayCue_C.StaticClass(),
        "GameplayCue_" + this.Actor.GetName(),
      ),
      (this.n8 = t.Path),
      (this.v$o = t),
      (this.hEc =
        RecorderBlueprintFunctionLibrary_1.default.CreateNewDataAssetNoBlueprint(
          "DA_GameplayCue_" + this.Actor.GetName(),
          UE.BP_GameplayCueBeamDataAsset_C.StaticClass(),
        ));
  }
  TickRecorder(e) {
    if (
      (super.TickRecorder(e),
      !(e < MathUtils_1.MathUtils.SmallNumber) && this.hEc)
    ) {
      this.hEc.TimeLine.Add(
        RecorderBlueprintFunctionLibrary_1.default.RecordingTimeNoBlueprint() -
          this.StartTime,
      );
      var t = new UE.SVectorArray();
      if (this.v$o?.CurrentPoints)
        for (const r of this.v$o.CurrentPoints) t.Vectors.Add(r);
      this.hEc.PointPositions.Add(t);
    }
  }
  StopRecorder(e) {
    this.Recorder.AddStaticStrPropertyTrack(
      this.Actor,
      new UE.FName("Path"),
      this.n8,
      0,
      e,
    ),
      this.Recorder.AddStaticObjectPropertyTrack(
        this.Actor,
        new UE.FName("BeamData"),
        this.hEc,
        0,
        e,
      ),
      super.StopRecorder(e);
  }
}
exports.GameplayCueRecorderBeam = GameplayCueRecorderBeam;
//# sourceMappingURL=GameplayCueRecorder.js.map
