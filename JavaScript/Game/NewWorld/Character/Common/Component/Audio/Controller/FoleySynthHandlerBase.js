"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FoleySynthHandlerBase = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../../Core/Common/Log"),
  Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils"),
  CharacterNameDefines_1 = require("../../../CharacterNameDefines");
class FoleySynthRecord {
  constructor() {
    (this.Speed = 0), (this.BoneSpeed = 0), (this.Acceleration = 0);
  }
}
class FoleySynthDynamicConfig {
  constructor() {
    this.State = -1;
  }
}
class FoleySynthHandlerBase {
  constructor(t, i, s) {
    (this.ActorComp = t),
      (this.AkComp = i),
      (this.RecordCount = s),
      (this.UeAkComp = void 0),
      (this.FoleySynthRecordsModel = new Array()),
      (this.FoleySynthModelConfigs = new Array()),
      (this.FoleySynthModelDynamicConfigs = new Array()),
      (this.PreModelBoneComponentLocations = new Array()),
      (this.RecordIndex = 0),
      (this.RecordTickCount = 0),
      (this.RecordErrorFlag = 0),
      (this.TempVector = Vector_1.Vector.Create()),
      (this.TempBoneLocation = Vector_1.Vector.Create()),
      (this.IsActive = !1),
      (this.SavedRecords = ""),
      (this.IsDebug = !1),
      (this.SavedPath = ""),
      (this.DebugTime = -0);
  }
  Init(t) {
    this.OnInit(t),
      (this.RecordIndex = 0),
      (this.RecordErrorFlag = 0),
      (this.RecordTickCount = 0),
      (this.UeAkComp = this.AkComp.GetAkComponentBySocketName(
        CharacterNameDefines_1.CharacterNameDefines.HIT_CASE_NAME,
      )),
      (this.IsActive = !0);
    for (let t = 0; t < this.RecordCount; ++t) {
      var i = new Array();
      for (let t = 0; t < this.FoleySynthModelConfigs.length; ++t)
        i.push(new FoleySynthRecord());
      this.FoleySynthRecordsModel.push(i);
    }
    for (let t = 0; t < this.FoleySynthModelConfigs.length; ++t)
      this.PreModelBoneComponentLocations.push(Vector_1.Vector.Create()),
        this.FoleySynthModelDynamicConfigs.push(new FoleySynthDynamicConfig());
  }
  OnInit(t) {}
  Tick(t) {
    this.IsActive && this.EYo(t);
  }
  SetActive(t) {
    this.IsActive = t;
  }
  Clear() {
    (this.ActorComp = void 0), (this.AkComp = void 0), (this.UeAkComp = void 0);
  }
  EYo(t) {
    t *= MathUtils_1.MathUtils.MillisecondToSecond;
    this.IsDebug && (this.DebugTime += t),
      0 === this.RecordTickCount
        ? (this.SYo(), ++this.RecordTickCount)
        : (this.yYo(t),
          this.RecordTickCount > this.RecordCount + this.RecordErrorFlag &&
            this.OnParseBoneSpeedForAudio(),
          ++this.RecordTickCount,
          this.RecordTickCount === Number.MAX_VALUE &&
            ((this.RecordTickCount = this.RecordCount),
            (this.RecordErrorFlag = 0)));
  }
  SYo() {
    for (let t = 0; t < this.FoleySynthModelConfigs.length; ++t) {
      var i = this.FoleySynthModelConfigs[t],
        i = this.ActorComp.Actor.Mesh.GetSocketTransform(i.BoneName, 2);
      this.PreModelBoneComponentLocations[t].DeepCopy(i.GetTranslation());
    }
  }
  yYo(i) {
    this.RecordIndex = (this.RecordIndex + 1) % this.RecordCount;
    var s = this.GetPreRecordIndex(1);
    for (let t = 0; t < this.FoleySynthModelConfigs.length; ++t) {
      var h = this.FoleySynthModelConfigs[t],
        e = this.ActorComp.Actor.Mesh.GetSocketLocation(h.BoneName),
        e =
          (this.TempBoneLocation.DeepCopy(e),
          this.TempBoneLocation.SubtractionEqual(
            this.ActorComp.ActorLocationProxy,
          ),
          this.IYo(
            this.TempBoneLocation,
            this.PreModelBoneComponentLocations[t],
            i,
          )),
        r = e[0],
        e = e[1],
        o =
          ((this.FoleySynthRecordsModel[this.RecordIndex][t].Speed = r),
          (this.FoleySynthRecordsModel[this.RecordIndex][t].BoneSpeed = e),
          this.FoleySynthRecordsModel[s][t].Speed),
        o = (r - o) / i;
      (this.FoleySynthRecordsModel[this.RecordIndex][t].Acceleration = o),
        this.PreModelBoneComponentLocations[t].DeepCopy(this.TempBoneLocation),
        this.IsDebug && this.SaveDebugInfo(h.BoneName, r, o, e);
    }
  }
  OnParseBoneSpeedForAudio() {}
  IYo(t, i, s) {
    this.TempVector.DeepCopy(t),
      this.TempVector.SubtractionEqual(i),
      this.TempVector.DivisionEqual(s);
    t = this.TempVector.Size();
    return (
      this.TempVector.AdditionEqual(this.ActorComp.ActorVelocityProxy),
      [this.TempVector.Size(), t]
    );
  }
  GetPreRecordIndex(t) {
    return (this.RecordIndex + this.RecordCount - t) % this.RecordCount;
  }
  GetCurrentRecord(t) {
    return this.FoleySynthRecordsModel[this.RecordIndex][t];
  }
  SetDebug(t) {
    t
      ? ((this.SavedPath =
          UE.KismetSystemLibrary.GetProjectDirectory() +
          "/Saved/FoleySynth/FoleySynthRecord_" +
          this.constructor?.name +
          "_" +
          this.ActorComp.Actor.GetName() +
          ".txt"),
        UE.FileSystemOperation.FileExists(this.SavedPath) ||
          UE.FileSystemOperation.WriteFile(this.SavedPath, "Test........"),
        (this.SavedRecords = ""),
        (this.IsDebug = !0),
        (this.DebugTime = 0))
      : (UE.FileSystemOperation.WriteFile(this.SavedPath, this.SavedRecords),
        (this.SavedRecords = ""),
        (this.IsDebug = !1));
  }
  SaveDebugInfo(t, i, s, h) {
    this.IsDebug &&
      ((t =
        t?.toString() +
        ",speed:" +
        i.toString() +
        ",acceleration:" +
        s.toString() +
        ",boneSpeed:" +
        h.toString() +
        ",debugTime:" +
        this.DebugTime.toString()),
      (this.SavedRecords = this.SavedRecords + "\n" + t),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "Audio",
        58,
        "-------------Ak[FoleySynth] Debug信息",
        ["Actor", this.ActorComp.Actor.GetName()],
        ["Info", t],
      );
  }
}
exports.FoleySynthHandlerBase = FoleySynthHandlerBase;
//# sourceMappingURL=FoleySynthHandlerBase.js.map
