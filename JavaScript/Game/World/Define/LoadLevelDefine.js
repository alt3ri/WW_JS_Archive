"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SubLevel = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  Platform_1 = require("../../../Launcher/Platform/Platform"),
  GlobalData_1 = require("../../GlobalData"),
  GameModePromise_1 = require("./GameModePromise"),
  PC_ONEFRAME_MAXSET_COUNT = 1e3,
  MOBILE_ONEFRAME_MAXSET_COUNT = 200;
class SubLevel {
  constructor(e, i) {
    (this.Path = e),
      (this.VisibleAfterLoad = i),
      (this.LoadType = 0),
      (this.Level = void 0),
      (this.LinkId = 0),
      (this.UnLoadLinkId = 0),
      (this.LoadPromise = new GameModePromise_1.GameModePromise()),
      (this.UnLoadPromise = void 0),
      (this.uu1 = void 0),
      (this.IsPreload = !1),
      (this.AllActors = void 0),
      (this.IsVisible = !0),
      (this.du1 = void 0),
      (this.mu1 = (e) => {
        e === this.LinkId && this.uu1?.SetResult(!0);
      }),
      (this.du1 = (0, puerts_1.toManualReleaseDelegate)(this.mu1));
  }
  get OneFrameSetCount() {
    return Platform_1.Platform.IsPcPlatform()
      ? PC_ONEFRAME_MAXSET_COUNT
      : MOBILE_ONEFRAME_MAXSET_COUNT;
  }
  Dispose() {
    this.uu1?.IsPending() && this.uu1?.SetResult(!1),
      (this.uu1 = void 0),
      UE.KuroSubLevelVisibleSubsystem.GetSubSystem(
        GlobalData_1.GlobalData.GameInstance,
      ).RemoveLevel(this.LinkId),
      ((this.Level = void 0), puerts_1.releaseManualReleaseDelegate)(this.mu1);
  }
  async OnLevelLoad(e) {
    var i;
    e
      ? ((this.LoadType = 2),
        (e = (this.Level = e).GetLoadedLevel()),
        (i = UE.KuroSubLevelVisibleSubsystem.GetSubSystem(
          GlobalData_1.GlobalData.GameInstance,
        )).AddLevel(this.LinkId, e),
        i.SetOneFrameExecuteCount(this.OneFrameSetCount),
        await this.SetLevelVisible(this.VisibleAfterLoad, "OnLevelLoad"))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "GameMode",
          3,
          "SubLevelController:加载的子关卡不存在",
          ["LinkId", this.LinkId],
          ["Level", this.Path],
        ),
      this.LoadPromise.SetResult(!0);
  }
  async SetLevelVisible(e, i) {
    var t;
    this.IsVisible !== e &&
      ((this.IsVisible = e),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "GameMode",
          18,
          "SetLevelVisible:开始",
          ["path", this.Path],
          ["LinkId", this.LinkId],
          ["bVisible", e],
          ["reason", i],
        ),
      (t = UE.KuroSubLevelVisibleSubsystem.GetSubSystem(
        GlobalData_1.GlobalData.GameInstance,
      )),
      (this.uu1 = new CustomPromise_1.CustomPromise()),
      (t = t.SetLevelActorsVisible(this.LinkId, e, this.du1)),
      await this.uu1.Promise,
      t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "GameMode",
            18,
            "SetLevelVisible:失败,Actors为空",
            ["path", this.Path],
            ["LinkId", this.LinkId],
            ["bVisible", e],
            ["reason", i],
          )),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "GameMode",
        18,
        "SetLevelVisible:结束",
        ["path", this.Path],
        ["LinkId", this.LinkId],
        ["bVisible", e],
        ["reason", i],
      );
  }
}
exports.SubLevel = SubLevel;
//# sourceMappingURL=LoadLevelDefine.js.map
