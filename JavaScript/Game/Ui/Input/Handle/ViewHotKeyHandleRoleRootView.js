"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ViewHotKeyHandleRoleRootView = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ViewHotKeyHandle_1 = require("../ViewHotKeyHandle");
class ViewHotKeyHandleRoleRootView extends ViewHotKeyHandle_1.ViewHotKeyHandle {
  SpecialConditionCheck() {
    return !ControllerHolder_1.ControllerHolder.MapRogueController.CheckInMapRogueInstance();
  }
}
exports.ViewHotKeyHandleRoleRootView = ViewHotKeyHandleRoleRootView;
//# sourceMappingURL=ViewHotKeyHandleRoleRootView.js.map
