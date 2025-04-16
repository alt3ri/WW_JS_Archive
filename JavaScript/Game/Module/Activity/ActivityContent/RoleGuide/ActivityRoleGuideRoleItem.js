"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRoleGuideRoleItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class ActivityRoleGuideRoleItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.SpineSkeletonAnimationComponent]];
  }
  OnBeforeShow() {
    this.GetSpine(0)?.SetAnimation(0, "idle", !0);
  }
}
exports.ActivityRoleGuideRoleItem = ActivityRoleGuideRoleItem;
//# sourceMappingURL=ActivityRoleGuideRoleItem.js.map
