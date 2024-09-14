"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ViewHotKeyHandleFactory = void 0);
const ViewHotKeyHandle_1 = require("../ViewHotKeyHandle"),
  ViewHotKeyHandleFunctionMenu_1 = require("./ViewHotKeyHandleFunctionMenu"),
  ViewHotKeyHandleRoulette_1 = require("./ViewHotKeyHandleRoulette");
class ViewHotKeyHandleFactory {
  static CreateViewHotKeyHandle(e, t) {
    return new (this.x$a.get(t) ?? ViewHotKeyHandle_1.ViewHotKeyHandle)(e);
  }
}
(exports.ViewHotKeyHandleFactory = ViewHotKeyHandleFactory).x$a = new Map([
  ["ViewHotKeyHandle", ViewHotKeyHandle_1.ViewHotKeyHandle],
  [
    "ViewHotKeyHandleRoulette",
    ViewHotKeyHandleRoulette_1.ViewHotKeyHandleRoulette,
  ],
  [
    "ViewHotKeyHandleFunctionMenu",
    ViewHotKeyHandleFunctionMenu_1.ViewHotKeyHandleFunctionMenu,
  ],
]);
//# sourceMappingURL=ViewHotKeyHandleDefine.js.map
