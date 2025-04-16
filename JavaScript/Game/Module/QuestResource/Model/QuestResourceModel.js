"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestResourceModel = exports.QuestResourceUpdateProxy = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  QuestRefVideoConfigAll_1 = require("../../../../Core/Define/ConfigQuery/QuestRefVideoConfigAll"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  Net_1 = require("../../../../Core/Net/Net"),
  VideoResUpdate_1 = require("../../../../Launcher/DiffPatch/Update/VideoResUpdate"),
  VideoUpdateManager_1 = require("../../../../Launcher/Update/VideoUpdateManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager");
class QuestResourceUpdateProxy {
  constructor() {
    (this.SpaceEnough = !0),
      (this.ReceiveSize = 0n),
      (this.CurProgress = 0n),
      (this.TotalProgress = 0n),
      (this.DownloadSpeed = 0n);
  }
  async ShowNotEnoughSpaceConfirmation(e) {
    return (
      (this.SpaceEnough = !1),
      new Promise((e) => {
        e(!0);
      })
    );
  }
  UpdatePatchProgress(e, o, t, r) {
    (this.ReceiveSize = e),
      (this.CurProgress = o),
      (this.TotalProgress = t),
      (this.DownloadSpeed = r),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("QuestResource", 38, "登录过程中下载任务数据", [
          "curProgress",
          o,
        ]);
  }
}
exports.QuestResourceUpdateProxy = QuestResourceUpdateProxy;
class QuestResourceModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.hb1 = new Map()),
      (this.lb1 = new Map()),
      (this.UserClickPromise = void 0),
      (this.ws1 = new Array());
  }
  get IsSeparateVideo() {
    return VideoResUpdate_1.VideoResUpdate.GetIsSeparateVideo();
  }
  OnInit() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("QuestResource", 38, "任务资源初始化");
    var e =
      QuestRefVideoConfigAll_1.configQuestRefVideoConfigAll.GetConfigList();
    if (!e)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("QuestResource", 38, "找不到任务视频对照配置"),
        !1
      );
    var o,
      t = new Set(),
      r = new Set();
    for (const s of e)
      0 === s.GirlOrBoy
        ? (this.lb1.has(s.QuestId)
            ? this.lb1.get(s.QuestId).push(s.PakName)
            : ((o = new Array()).push(s.PakName), this.lb1.set(s.QuestId, o)),
          s.PakName.endsWith("2") || r.add(s.PakName))
        : 1 === s.GirlOrBoy &&
          (this.hb1.has(s.QuestId)
            ? this.hb1.get(s.QuestId).push(s.PakName)
            : ((o = new Array()).push(s.PakName), this.hb1.set(s.QuestId, o)),
          s.PakName.endsWith("2") || t.add(s.PakName));
    return (
      VideoResUpdate_1.VideoResUpdate.SetAllSpecialVideoResPak(3, [...r]),
      VideoResUpdate_1.VideoResUpdate.SetAllSpecialVideoResPak(4, [...t]),
      !0
    );
  }
  ClearCheckQuests() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("QuestResource", 38, "清理检查数据"),
      (this.ws1.length = 0);
  }
  FillCheckQuests(e) {
    (this.ws1.length = 0),
      (this.ws1 = [...e]),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "QuestResource",
          38,
          "收到登录任务通知，填充任务视频检查数据",
          ["questIds", this.ws1],
        );
  }
  vL1() {
    var e = new Set(),
      o = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    if (0 === o)
      for (const s of this.ws1) {
        var t = this.lb1.get(s);
        if (t) for (const i of t) e.add(i);
      }
    else if (1 === o)
      for (const a of this.ws1) {
        var r = this.hb1.get(a);
        if (r) for (const u of r) e.add(u);
      }
    return 0 < e.size ? [...e] : [];
  }
  NeedCheckQuestResource() {
    var e, o;
    return (
      0 < this.ws1.length &&
      ((e = this.vL1()),
      ([, e, o] =
        VideoResUpdate_1.VideoResUpdate.AnalyzeRequireFilesByNames(e)),
      e !== o)
    );
  }
  UserClicked() {
    this.UserClickPromise
      ? this.UserClickPromise.SetResult()
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("QuestResource", 38, "检查任务数据点击回调错误");
  }
  async CheckQuestResource() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("QuestResource", 38, "登录后，尝试检查任务数据");
    var e = [];
    (this.UserClickPromise = new CustomPromise_1.CustomPromise()),
      e.push(this.TryCheckQuestResource()),
      e.push(this.UserClickPromise.Promise),
      UiManager_1.UiManager.OpenView("ResDownLoadLoadingView"),
      await Promise.all(e);
  }
  UpdateServerQuestState() {
    var e = Protocol_1.Aki.Protocol.ts1.create({ a2s: this.ws1 });
    Net_1.Net.Call(24388, e, (e) => {
      e &&
        e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.BEs,
          26327,
        );
    });
  }
  async TryCheckQuestResource() {
    var e;
    0 === this.ws1.length
      ? Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("QuestResource", 38, "没有任务需要检查")
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("QuestResource", 38, "尝试检查任务数据，开始检查"),
        0 < (e = this.vL1()).length &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("QuestResource", 38, "开始 下载缺失视频"),
          VideoResUpdate_1.VideoResUpdate.SetVideoResPak(5, [...e]),
          (0 === ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender()
            ? (await VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(
                3,
              ).Update(5),
              VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(3))
            : (await VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(
                4,
              ).Update(5),
              VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(4))
          ).ResetDownLoadState(),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info("QuestResource", 38, "结束 下载缺失视频"));
  }
  CalcPrepareResource() {
    var e = new Set();
    for (const s of this.lb1)
      if (!ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(s[0]))
        for (const i of s[1]) e.add(i);
    var [, o, t] = VideoResUpdate_1.VideoResUpdate.AnalyzeRequireFilesByNames([
        ...e,
      ]),
      r =
        (VideoResUpdate_1.VideoResUpdate.SetVideoResSize(3, o),
        VideoResUpdate_1.VideoResUpdate.SetVideoResSavedSize(3, t),
        VideoResUpdate_1.VideoResUpdate.SetVideoResPak(3, [...e]),
        new Set());
    for (const a of this.hb1)
      if (!ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(a[0]))
        for (const u of a[1]) r.add(u);
    var [, o, t] = VideoResUpdate_1.VideoResUpdate.AnalyzeRequireFilesByNames([
      ...r,
    ]);
    VideoResUpdate_1.VideoResUpdate.SetVideoResSize(4, o),
      VideoResUpdate_1.VideoResUpdate.SetVideoResSavedSize(4, t),
      VideoResUpdate_1.VideoResUpdate.SetVideoResPak(4, [...r]);
  }
}
exports.QuestResourceModel = QuestResourceModel;
//# sourceMappingURL=QuestResourceModel.js.map
