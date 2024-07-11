"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleNewJoinTipView = void 0);
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
class RoleNewJoinTipView extends UiViewBase_1.UiViewBase {
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = []), (this.BtnBindInfo = []);
  }
  OnAfterPlayStartSequence() {
    const e = this.OpenParam;
    UiManager_1.UiManager.CloseAndOpenView(
      this.Info.Name,
      "RoleNewJoinView",
      e,
    );
  }
}
exports.RoleNewJoinTipView = RoleNewJoinTipView;
// # sourceMappingURL=RoleNewJoinTipView.js.map
