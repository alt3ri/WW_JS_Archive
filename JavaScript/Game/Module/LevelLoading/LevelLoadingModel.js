"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelLoadingModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  GlobalData_1 = require("../../GlobalData");
class LevelLoadingModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.CameraFadeShowPromise = void 0),
      (this.CameraFadeHidePromise = void 0),
      (this.Epi = void 0),
      (this.Spi = void 0),
      (this.ypi = !1);
  }
  get IsLoading() {
    return this.ypi;
  }
  OnInit() {
    return (this.Epi = new Map()), (this.Spi = new Map()), !0;
  }
  OnClear() {
    return (
      this.Epi?.clear(),
      (this.Epi = void 0),
      this.Spi?.clear(),
      !(this.Spi = void 0)
    );
  }
  SetLoadingState(e) {
    var o;
    this.ypi !== e &&
      ((o = "LoadingMode[Fade]"),
      (this.ypi = e)
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Loading", 7, "LevelLoading:LoadingModeEnable"),
          ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(
            GlobalData_1.GlobalData.World,
            o,
          ))
        : (this.Ipi(),
          this.ClearLoadingPerforms(),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Loading", 7, "LevelLoading:LoadingModeDisable"),
          ResourceSystem_1.ResourceSystem.SetLoadModeInGame(
            GlobalData_1.GlobalData.World,
            o,
          )));
  }
  AddLoadingReason(e, o) {
    this.Epi.set(e, o),
      this.AddLoadingPerform(o),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Loading", 19, "LevelLoading:AddLoadingReason", [
          "reason",
          e,
        ]);
  }
  RemoveLoadingReason(e) {
    var o = this.GetPerformByReason(e);
    this.Epi.delete(e),
      this.RemoveLoadingPerform(o),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Loading", 19, "LevelLoading:RemoveLoadingReason", [
          "reason",
          e,
        ]);
  }
  AddLoadingPerform(e) {
    var o = this.Spi.get(e) ?? 0;
    this.Spi.set(e, ++o),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Loading",
          19,
          "LevelLoading:AddLoadingPerform",
          ["perform", e],
          ["count", o],
        );
  }
  RemoveLoadingPerform(e) {
    var o = this.Spi.get(e);
    o &&
      (this.Spi.set(e, --o), o <= 0) &&
      (this.Spi.delete(e), Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info("Loading", 19, "LevelLoading:RemoveLoadingPerform", [
        "perform",
        e,
      ]);
  }
  GetPerformByReason(e) {
    return this.Epi.get(e);
  }
  Ipi() {
    this.Epi.clear(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Loading", 19, "LevelLoading:ClearLoadingReason");
  }
  ClearLoadingPerforms() {
    this.Spi.clear(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Loading", 19, "LevelLoading:ClearLoadingPerforms");
  }
  CheckLoadingPerformsEmpty() {
    return 0 === this.Spi.size;
  }
  CheckCanDoClose(e) {
    return !!this.IsLoading && !this.Spi.get(e);
  }
  FinishCameraShowPromise() {
    this.CameraFadeShowPromise?.SetResult(),
      (this.CameraFadeShowPromise = void 0);
  }
  FinishCameraHidePromise() {
    this.CameraFadeHidePromise?.SetResult(),
      (this.CameraFadeHidePromise = void 0);
  }
}
exports.LevelLoadingModel = LevelLoadingModel;
//# sourceMappingURL=LevelLoadingModel.js.map
