"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ViewHotKeyHandleFactory = void 0);
const ViewHotKeyHandle_1 = require("../ViewHotKeyHandle"),
  ViewHotKeyHandleFunctionMenu_1 = require("./ViewHotKeyHandleFunctionMenu"),
  ViewHotKeyHandleMapView_1 = require("./ViewHotKeyHandleMapView"),
  ViewHotKeyHandleRoleRootView_1 = require("./ViewHotKeyHandleRoleRootView"),
  ViewHotKeyHandleRoulette_1 = require("./ViewHotKeyHandleRoulette");
class ViewHotKeyHandleFactory {
  static CreateViewHotKeyHandle(e, t) {
    return new (this.CJa.get(t) ?? ViewHotKeyHandle_1.ViewHotKeyHandle)(e);
  }
}
(exports.ViewHotKeyHandleFactory = ViewHotKeyHandleFactory).CJa = new Map([
  ["ViewHotKeyHandle", ViewHotKeyHandle_1.ViewHotKeyHandle],
  [
    "ViewHotKeyHandleRoulette",
    ViewHotKeyHandleRoulette_1.ViewHotKeyHandleRoulette,
  ],
  [
    "ViewHotKeyHandleFunctionMenu",
    ViewHotKeyHandleFunctionMenu_1.ViewHotKeyHandleFunctionMenu,
  ],
  [
    "ViewHotKeyHandleMapView",
    ViewHotKeyHandleMapView_1.ViewHotKeyHandleMapView,
  ],
  [
    "ViewHotKeyHandleRoleRootView",
    ViewHotKeyHandleRoleRootView_1.ViewHotKeyHandleRoleRootView,
  ],
]);
//# sourceMappingURL=ViewHotKeyHandleDefine.js.map
