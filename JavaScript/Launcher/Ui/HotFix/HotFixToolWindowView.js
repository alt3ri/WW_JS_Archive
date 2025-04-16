"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotFixToolWindowView = void 0);
const LaunchComponentsAction_1 = require("../LaunchComponentsAction"),
  HotFixButtonItem_1 = require("./HotFixButtonItem"),
  HotFixPopupRepairView_1 = require("./HotFixPopupRepairView"),
  HotFixNetworkDetectionView_1 = require("./NetWorkDetection/HotFixNetworkDetectionView");
class HotFixToolWindowView extends LaunchComponentsAction_1.LaunchComponentsAction {
  constructor() {
    super(...arguments),
      (this.irc = () => {
        this.qyr(!0);
      }),
      (this.rrc = () => {}),
      (this.orc = () => {
        this.nrc(!0);
      }),
      (this.B6e = () => {
        this.SetActive(!1);
      });
  }
  async LoadAsync(t) {
    await this.AttachElementAsyncFromPath(
      101,
      "/Game/Aki/UI/Module/HotFix/Prefab/UiView_HotFixPopup.UiView_HotFixPopup",
      HotFixPopupRepairView_1.HotFixPopupRepairView,
    ),
      this.qyr(!1),
      await (
        await this.AttachElementAsyncFromPath(
          102,
          "/Game/Aki/UI/Module/HotFix/Prefab/UiView_NetDetection.UiView_NetDetection",
          HotFixNetworkDetectionView_1.HotFixNetworkDetectionView,
        )
      ).LoadAsync(t),
      this.nrc(!1);
  }
  qyr(t) {
    this.GetElement(101).SetActive(t);
  }
  nrc(t) {
    this.GetElement(102).SetActive(t);
  }
  OnStart() {
    this.AttachElement(
      3,
      HotFixButtonItem_1.HotFixButtonItem,
    ).BindClickCallback(this.irc);
    var t = this.AttachElement(4, HotFixButtonItem_1.HotFixButtonItem);
    t.BindClickCallback(this.rrc),
      t.SetActive(!1),
      this.AttachElement(
        5,
        HotFixButtonItem_1.HotFixButtonItem,
      ).BindClickCallback(this.orc),
      this.GetButton(1).OnClickCallBack.Bind(this.B6e);
  }
}
exports.HotFixToolWindowView = HotFixToolWindowView;
//# sourceMappingURL=HotFixToolWindowView.js.map
