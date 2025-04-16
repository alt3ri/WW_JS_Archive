"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotFixButtonItem = void 0);
const LaunchComponentsAction_1 = require("../LaunchComponentsAction"),
  HotFixManager_1 = require("./HotFixManager");
class HotFixButtonItem extends LaunchComponentsAction_1.LaunchComponentsAction {
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
  BindClickCallback(t) {
    this.Callback = t;
  }
  SetLocalText(t) {
    HotFixManager_1.HotFixManager.SetLocalText(this.GetText(1), t);
  }
  SetEnableClick(t) {
    this.GetButton(0)?.SetSelfInteractive(t);
  }
}
exports.HotFixButtonItem = HotFixButtonItem;
//# sourceMappingURL=HotFixButtonItem.js.map
