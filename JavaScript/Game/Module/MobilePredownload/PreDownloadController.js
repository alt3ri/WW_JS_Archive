"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PreDownloadController = void 0);
const LauncherConfigLib_1 = require("../../../Launcher/Define/LauncherConfigLib"),
  PreDownloadManager_1 = require("../../../Launcher/PreDownload/PreDownloadManager"),
  RemoteConfig_1 = require("../../../Launcher/RemoteConfig"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  LogReportDefine_1 = require("../LogReport/LogReportDefine");
class PreDownloadController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return !0;
  }
  static OnClear() {
    return !0;
  }
  static OnAddEvents() {}
  static OnRemoveEvents() {}
  static OnPreDownloadBtnClick(e) {
    PreDownloadManager_1.PreDownloadManager.Get().IsComplete()
      ? ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
          "PreDownload_Complete",
        )
      : ((e = new LogReportDefine_1.PreDownloadEntranceRecord(e ? 1 : 2)),
        ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e),
        ModelManager_1.ModelManager.PreDownloadModel.GetHasStartDownload()
          ? PreDownloadController.T0c()
          : PreDownloadController.b0c());
  }
  static b0c() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(264),
      o =
        (
          PreDownloadManager_1.PreDownloadManager.Get().GetDownloadSize() /
          BigInt(1048576)
        ).toString() + "MB";
    e.FunctionMap.set(2, () => {
      PreDownloadController.T0c();
    }),
      e.SetTextArgs(o),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        e,
      );
  }
  static T0c() {
    var e;
    RemoteConfig_1.RemoteInfo.PreVerConfig &&
      ((e = RemoteConfig_1.RemoteInfo.PreVerConfig.PackageVersion),
      LocalStorage_1.LocalStorage.SetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.PreDownloadVersionRecord,
        e,
      )),
      UiManager_1.UiManager.OpenView("PreDownloadView");
  }
  static ClosePreDownloadView() {
    UiManager_1.UiManager.CloseView("PreDownloadView"),
      PreDownloadManager_1.PreDownloadManager.Get().IsDownloading() &&
        ModelManager_1.ModelManager.PreDownloadModel.SetDownloadMode(0);
  }
  static OnCellNetTypeChanged() {
    var e;
    UiManager_1.UiManager.IsViewShow("PreDownloadView")
      ? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(267)).FunctionMap.set(
          1,
          () => {
            !ModelManager_1.ModelManager.PreDownloadModel.GetHasStartDownload() &&
              UiManager_1.UiManager.IsViewShow("PreDownloadView") &&
              UiManager_1.UiManager.CloseView("PreDownloadView");
          },
        ),
        e.FunctionMap.set(2, () => {
          ModelManager_1.ModelManager.PreDownloadModel.ResumePreDownload();
        }),
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          e,
        ))
      : ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
          "PreDownload_ChangeCellNet",
        );
  }
  static GetLocalText(e, ...o) {
    e = LauncherConfigLib_1.LauncherConfigLib.GetHotPatchText(e);
    if (void 0 === e) return "";
    let r = e;
    if (o)
      for (let e = 0; e < o.length; e++) {
        var n = o[e],
          a = `{${e}}`;
        r = r.split(a).join(n);
      }
    return r;
  }
}
exports.PreDownloadController = PreDownloadController;
//# sourceMappingURL=PreDownloadController.js.map
