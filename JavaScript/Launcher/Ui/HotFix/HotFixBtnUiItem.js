"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotFixBtnUiItem = void 0);
const LaunchComponentsAction_1 = require("../LaunchComponentsAction"),
  HotFixManager_1 = require("./HotFixManager");
class HotFixBtnUiItem extends LaunchComponentsAction_1.LaunchComponentsAction {
  constructor() {
    super(...arguments),
      (this.Callback = () => {}),
      (this.OnClickCallback = () => {
        this.Callback && this.Callback();
      });
  }
  OnStart() {
    this.GetButton(0).OnClickCallBack.Bind(this.OnClickCallback);
  }
  OnBeforeDestroy() {
    this.Callback && (this.Callback = void 0),
      this.GetButton(0).OnClickCallBack.Unbind();
  }
  SetText(t) {
    HotFixManager_1.HotFixManager.SetLocalText(this.GetText(1), t);
  }
  BindClickCallback(t) {
    this.Callback = t;
  }
}
exports.HotFixBtnUiItem = HotFixBtnUiItem;
//# sourceMappingURL=HotFixBtnUiItem.js.map
