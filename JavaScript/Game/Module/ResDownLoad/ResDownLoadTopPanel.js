"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ResDownLoadTopPanel = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  VideoResUpdate_1 = require("../../../Launcher/DiffPatch/Update/VideoResUpdate"),
  VideoUpdateManager_1 = require("../../../Launcher/Update/VideoUpdateManager"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  BattleVisibleChildView_1 = require("../BattleUi/Views/BattleChildView/BattleVisibleChildView");
class ResDownLoadTopPanel extends BattleVisibleChildView_1.BattleVisibleChildView {
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
  Initialize(e) {
    super.Initialize(e), this.InitChildType(4), this.SetVisible(1, !1);
  }
  Reset() {
    super.Reset();
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
      this.SetVisible(1, !0),
      this.TDe &&
        (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0)),
      (this.TDe = TimerSystem_1.TimerSystem.Forever(() => {
        this.Update();
      }, TimeUtil_1.TimeUtil.InverseMillisecond));
  }
  EndShow() {
    this.SetVisible(1, !1),
      this.TDe &&
        (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0));
  }
  OnBeforeDestroy() {
    this.TDe &&
      (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0));
  }
  OnBeforeShow() {
    this.LZs();
  }
  OnBeforeHide() {
    this.DZs();
  }
}
exports.ResDownLoadTopPanel = ResDownLoadTopPanel;
//# sourceMappingURL=ResDownLoadTopPanel.js.map
