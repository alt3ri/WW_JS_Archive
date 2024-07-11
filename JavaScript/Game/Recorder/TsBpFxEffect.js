"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  RecorderBlueprintFunctionLibrary_1 = require("./RecorderBlueprintFunctionLibrary");
class TsBpFxEffect extends UE.Actor {
  constructor() {
    super(...arguments),
      (this.IsRecorderActor = !1),
      (this.RecordTime = 0),
      (this.RecorderShadow = void 0),
      (this.Recorder = void 0);
  }
  ReceiveBeginPlay() {
    this.OnPlay();
  }
  ReceiveEndPlay() {
    this.OnStop();
  }
  TryRecord() {
    this.OnPlay();
  }
  AddAutoFloatTrack(r) {
    this.Recorder?.Recorder?.AddAutoFloatPropertyTrack(
      this,
      r,
      RecorderBlueprintFunctionLibrary_1.default.RecordingTimeNoBlueprint(),
    );
  }
  AddAutoVectorTrack(r) {
    this.Recorder?.Recorder?.AddAutoVectorPropertyTrack(
      this,
      r,
      RecorderBlueprintFunctionLibrary_1.default.RecordingTimeNoBlueprint(),
    );
  }
  AddAutoObjectTrack(r) {
    this.Recorder?.Recorder?.AddAutoObjectPropertyTrack(
      this,
      r,
      RecorderBlueprintFunctionLibrary_1.default.RecordingTimeNoBlueprint(),
    );
  }
  OnRecordStart() {}
  OnRecordTick(r) {
    this.RecordTime =
      RecorderBlueprintFunctionLibrary_1.default.RecordingTimeNoBlueprint();
  }
  OnRecordStop() {}
  OnPlay() {
    RecorderBlueprintFunctionLibrary_1.default.Recording &&
      !this.Recorder &&
      (this.Recorder =
        RecorderBlueprintFunctionLibrary_1.default.StartRecordTsBpFxEffect(
          this,
        ));
  }
  OnStop() {
    RecorderBlueprintFunctionLibrary_1.default.Recording &&
      this.RecorderShadow &&
      RecorderBlueprintFunctionLibrary_1.default.StopRecordTsBpFxEffect(this);
  }
  ClearRecorder() {
    (this.Recorder = void 0), (this.RecorderShadow = void 0);
  }
}
exports.default = TsBpFxEffect;
//# sourceMappingURL=TsBpFxEffect.js.map
