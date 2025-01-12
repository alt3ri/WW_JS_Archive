"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotFixPopupUiView = void 0);
const LaunchComponentsAction_1 = require("../LaunchComponentsAction"),
  HotFixBtnUiItem_1 = require("./HotFixBtnUiItem"),
  HotFixManager_1 = require("./HotFixManager");
class HotFixPopupUiView extends LaunchComponentsAction_1.LaunchComponentsAction {
  OnStart() {
    this.AttachElement(5, HotFixBtnUiItem_1.HotFixBtnUiItem),
      this.AttachElement(6, HotFixBtnUiItem_1.HotFixBtnUiItem),
      this.AttachElement(7, HotFixBtnUiItem_1.HotFixBtnUiItem);
  }
  SetConfirmationTitle(t) {
    HotFixManager_1.HotFixManager.SetLocalText(this.GetText(4), t);
  }
  SetConfirmationContent(t, ...i) {
    HotFixManager_1.HotFixManager.SetLocalText(this.GetText(8), t, ...i);
  }
  SetConfirmationLeftButtonCallBack(t) {
    this.GetElement(5).BindClickCallback(t);
  }
  SetConfirmationRightButtonCallBack(t) {
    this.GetElement(6).BindClickCallback(t);
  }
  SetConfirmationMiddleButtonCallBack(t) {
    this.GetElement(7).BindClickCallback(t);
  }
  SetConfirmationCloseButtonCallBack(t) {
    this.GetButton(2).OnClickCallBack.Unbind(),
      this.GetButton(2).OnClickCallBack.Bind(t);
  }
  SetConfirmationLeftButtonText(t) {
    this.GetElement(5).SetText(t);
  }
  SetConfirmationRightButtonText(t) {
    this.GetElement(6).SetText(t);
  }
  SetConfirmationMiddleButtonText(t) {
    this.GetElement(7).SetText(t);
  }
  SetConfirmationLeftButtonActive(t) {
    this.GetElement(5).SetActive(t);
  }
  SetConfirmationRightButtonActive(t) {
    this.GetElement(6).SetActive(t);
  }
  SetConfirmationMiddleButtonActive(t) {
    this.GetElement(7).SetActive(t);
  }
  SetConfirmationCloseButtonActive(t) {
    this.GetButton(2).RootUIComp.SetUIActive(t);
  }
}
exports.HotFixPopupUiView = HotFixPopupUiView;
//# sourceMappingURL=HotFixPopupUiView.js.map
