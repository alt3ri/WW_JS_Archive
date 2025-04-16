"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FunctionResDownLoadItem = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  VideoResUpdate_1 = require("../../../../Launcher/DiffPatch/Update/VideoResUpdate"),
  VideoUpdateManager_1 = require("../../../../Launcher/Update/VideoUpdateManager"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../Ui/UiManager");
class FunctionResDownLoadItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ub1 = 0),
      (this.TDe = void 0),
      (this.cb1 = () => {
        UiManager_1.UiManager.IsViewOpen("ResDownLoadView") ||
          UiManager_1.UiManager.OpenView("ResDownLoadView");
      }),
      (this.ZT1 = (e) => {
        (this.ub1 = e), this.Update();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[1, this.cb1]]);
  }
  OnStart() {
    this.LZs();
  }
  OnBeforeDestroy() {
    this.DZs(),
      this.TDe &&
        (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0));
  }
  LZs() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ResDownLoadStateRefresh,
      this.ZT1,
    );
  }
  DZs() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ResDownLoadStateRefresh,
      this.ZT1,
    );
  }
  Update() {
    this.Refresh();
  }
  Refresh() {
    var e = this.GetTexture(0);
    e.SetFillAmount(
      ModelManager_1.ModelManager.ResDownLoadModel.DownLoadPercentage(),
    ),
      1 === this.ub1
        ? this.GetTexture(0).SetChangeColor(!1, e.changeColor)
        : this.GetTexture(0).SetChangeColor(!0, e.changeColor);
  }
  StartShow() {
    VideoResUpdate_1.VideoResUpdate.GetIsResPakDownloading(3) &&
      (this.ub1 =
        VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(
          3,
        ).GetDownLoadState()),
      VideoResUpdate_1.VideoResUpdate.GetIsResPakDownloading(4) &&
        (this.ub1 =
          VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(
            4,
          ).GetDownLoadState()),
      this.Update(),
      this.TDe &&
        (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0)),
      (this.TDe = TimerSystem_1.TimerSystem.Forever(() => {
        this.Update();
      }, TimeUtil_1.TimeUtil.InverseMillisecond));
  }
  EndShow() {
    this.TDe &&
      (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0));
  }
}
exports.FunctionResDownLoadItem = FunctionResDownLoadItem;
//# sourceMappingURL=FunctionResDownLoadItem.js.map
