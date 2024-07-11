"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueRecorderHook = exports.GameplayCueRecorderObject =
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
      (this.psr = new UE.Vector()),
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
        "GameplayCue " + this.Actor.GetName(),
      ),
      (this.n8 = t.Paths[0]),
      (this.psr = t.TargetPosition);
  }
  StopRecorder(e) {
    this.Recorder.AddStaticStrPropertyTrack(
      this.Actor,
      new UE.FName("Path"),
      this.n8,
      0,
      e,
    ),
      this.Recorder.AddStaticVectorPropertyTrack(
        this.Actor,
        new UE.FName("Position0"),
        this.psr,
        0,
        e,
      ),
      super.StopRecorder(e);
  }
}
exports.GameplayCueRecorderHook = GameplayCueRecorderHook;
//# sourceMappingURL=GameplayCueRecorder.js.map
