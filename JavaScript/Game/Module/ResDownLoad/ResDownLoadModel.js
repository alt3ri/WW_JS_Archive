"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ResDownLoadModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  VideoResUpdate_1 = require("../../../Launcher/DiffPatch/Update/VideoResUpdate"),
  VideoUpdateManager_1 = require("../../../Launcher/Update/VideoUpdateManager"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager");
class ResDownLoadModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.CurrentDownLoadVideo = -1),
      (this.OnDownLoadStateChange = (e) => {
        3 === e &&
          (UiManager_1.UiManager.IsViewOpen("ResDownLoadView") &&
            UiManager_1.UiManager.CloseView("ResDownLoadView"),
          3 === this.CurrentDownLoadVideo
            ? ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
                "DownloadCompletedTip1",
              )
            : 4 === this.CurrentDownLoadVideo &&
              ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
                "DownloadCompletedTip2",
              ),
          (this.CurrentDownLoadVideo = -1)),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ResDownLoadStateRefresh,
            e,
          );
      });
  }
  OnInit() {
    return (
      VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(
        3,
      ).SetDownLoadStateChangeCallBack(this.OnDownLoadStateChange),
      VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(
        4,
      ).SetDownLoadStateChangeCallBack(this.OnDownLoadStateChange),
      !0
    );
  }
  DownLoadPercentage() {
    var e, a;
    return VideoResUpdate_1.VideoResUpdate.GetIsResPakDownloading(4)
      ? (a =
          VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(
            4,
          ).GetDownLoadProgress())[2] && 0 < a[1]
        ? Number(a[1]) / Number(a[2])
        : ((a = VideoResUpdate_1.VideoResUpdate.GetVideoResSavedSize(4)),
          (e = VideoResUpdate_1.VideoResUpdate.GetVideoResSize(4)),
          Number(a) / Number(e))
      : VideoResUpdate_1.VideoResUpdate.GetIsResPakDownloading(3)
        ? (a =
            VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(
              3,
            ).GetDownLoadProgress())[2] && 0 < a[1]
          ? Number(a[1]) / Number(a[2])
          : ((e = VideoResUpdate_1.VideoResUpdate.GetVideoResSavedSize(3)),
            (a = VideoResUpdate_1.VideoResUpdate.GetVideoResSize(3)),
            Number(e) / Number(a))
        : 0;
  }
  NeedShowBattleViewButton() {
    return (
      ModelManager_1.ModelManager.QuestResourceModel.CalcPrepareResource(),
      (1 === ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() &&
        VideoResUpdate_1.VideoResUpdate.GetVideoResSize(4) !==
          VideoResUpdate_1.VideoResUpdate.GetVideoResSavedSize(4)) ||
        (0 === ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() &&
          VideoResUpdate_1.VideoResUpdate.GetVideoResSize(3) !==
            VideoResUpdate_1.VideoResUpdate.GetVideoResSavedSize(3)) ||
        !!VideoResUpdate_1.VideoResUpdate.GetIsResPakDownloading(4) ||
        !!VideoResUpdate_1.VideoResUpdate.GetIsResPakDownloading(3)
    );
  }
}
exports.ResDownLoadModel = ResDownLoadModel;
//# sourceMappingURL=ResDownLoadModel.js.map
