"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ResDownLoadLoadingView = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  HotFixManager_1 = require("../../../Launcher/Ui/HotFix/HotFixManager"),
  VideoUpdateManager_1 = require("../../../Launcher/Update/VideoUpdateManager"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  LguiUtil_1 = require("../Util/LguiUtil");
class ResDownLoadLoadingView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.TDe = void 0),
      (this.ZT1 = (e) => {
        3 === e &&
          (((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
            313,
          )).IsEscViewTriggerCallBack = !0),
          e.FunctionMap.set(0, () => {
            this.CloseMe();
          }),
          e.FunctionMap.set(1, () => {
            this.CloseMe();
          }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            e,
          ));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
    ];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ResDownLoadStateRefresh,
      this.ZT1,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ResDownLoadStateRefresh,
      this.ZT1,
    );
  }
  OnStart() {
    this.TDe = TimerSystem_1.TimerSystem.Forever(() => {
      this.Og();
    }, TimeUtil_1.TimeUtil.InverseMillisecond);
  }
  Og() {
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    let i = void 0;
    (i = (
      1 === e
        ? VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(4)
        : VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(3)
    ).GetDownLoadProgress()),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(1),
        "DownLoadText_Downing",
      );
    var e = Number(i[1]) / Number(i[2]),
      r = HotFixManager_1.HotFixManager.ByteConverter(i[3]) + "/s ",
      t =
        "(" +
        HotFixManager_1.HotFixManager.ByteConverter(i[1]) +
        "/" +
        HotFixManager_1.HotFixManager.ByteConverter(i[2]) +
        ") ",
      e =
        (this.GetTexture(0).SetFillAmount(e),
        (100 * e).toFixed(2).replace(/\.?0+$/, "") + "%");
    this.GetText(2).SetText(r + t + e);
  }
  OnBeforeDestroy() {
    this.TDe &&
      (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0));
  }
}
exports.ResDownLoadLoadingView = ResDownLoadLoadingView;
//# sourceMappingURL=ResDownLoadLoadingView.js.map
