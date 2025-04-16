"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotFixDownLoadFreeSpaceTipsView = void 0);
const VideoResUpdate_1 = require("../../DiffPatch/Update/VideoResUpdate"),
  LauncherLog_1 = require("../../Util/LauncherLog"),
  LaunchComponentsAction_1 = require("../LaunchComponentsAction"),
  HotFixBtnUiItem_1 = require("./HotFixBtnUiItem"),
  HotFixManager_1 = require("./HotFixManager");
class HotFixDownLoadFreeSpaceTipsView extends LaunchComponentsAction_1.LaunchComponentsAction {
  constructor() {
    super(...arguments), (this.SetDownLoadActiveCallBack = void 0);
  }
  OnStart() {
    this.AttachElement(2, HotFixBtnUiItem_1.HotFixBtnUiItem).BindClickCallback(
      () => {
        LauncherLog_1.LauncherLog.Info(
          "HotFixDownLoadFreeSpaceTipsView CancelBtn",
        ),
          this.SetDownLoadActiveCallBack?.(!0),
          this.SetActive(!1);
      },
    ),
      this.AttachElement(
        3,
        HotFixBtnUiItem_1.HotFixBtnUiItem,
      ).BindClickCallback(() => {
        LauncherLog_1.LauncherLog.Info(
          "HotFixDownLoadFreeSpaceTipsView ConfirmBtn",
        ),
          this.Og();
        var e = VideoResUpdate_1.VideoResUpdate.GetFreeSpace();
        HotFixManager_1.HotFixManager.NeedDownLoadByte < e
          ? (HotFixManager_1.HotFixManager.DownLoadViewChoseDoneCallBack?.(),
            this.SetActive(!1))
          : this.Og();
      }),
      HotFixManager_1.HotFixManager.SetLocalText(
        this.GetText(5),
        "Download_NoSpace",
      ),
      HotFixManager_1.HotFixManager.SetLocalText(
        this.GetText(6),
        "Download_Retry",
      ),
      HotFixManager_1.HotFixManager.SetLocalText(
        this.GetText(7),
        "Download_DownLoadBtnCancel",
      ),
      HotFixManager_1.HotFixManager.SetLocalText(
        this.GetText(8),
        "Download_DownLoadBtnRetry",
      );
  }
  OnShow() {
    this.Og();
  }
  Og() {
    HotFixManager_1.HotFixManager.SetLocalText(
      this.GetText(0),
      "DownLoadText_NeedSpace",
      HotFixManager_1.HotFixManager.ByteConverter(
        HotFixManager_1.HotFixManager.NeedDownLoadByte,
      ),
    );
    var e = VideoResUpdate_1.VideoResUpdate.GetFreeSpace();
    HotFixManager_1.HotFixManager.SetLocalText(
      this.GetText(1),
      "DownLoadText_LeftSpace",
      `<color=#c25757>${HotFixManager_1.HotFixManager.ByteConverter(e)}</color>`,
    );
  }
}
exports.HotFixDownLoadFreeSpaceTipsView = HotFixDownLoadFreeSpaceTipsView;
//# sourceMappingURL=HotFixDownLoadFreeSpaceTipsView.js.map
