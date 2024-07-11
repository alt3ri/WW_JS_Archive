"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityTurntableRewardView = void 0);
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
class ActivityTurntableRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), (this.oPn = void 0);
  }
  OnAfterShow() {
    this.CloseMe(() => {
      this.oPn?.();
    });
  }
  OnStart() {
    this.oPn = this.OpenParam ?? void 0;
  }
}
exports.ActivityTurntableRewardView = ActivityTurntableRewardView;
//# sourceMappingURL=ActivityTurntableRewardView.js.map
