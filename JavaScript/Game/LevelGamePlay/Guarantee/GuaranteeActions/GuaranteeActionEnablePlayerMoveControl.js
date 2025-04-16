"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuaranteeActionEnablePlayerMoveControl = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  GuaranteeActionBase_1 = require("./GuaranteeActionBase");
class GuaranteeActionEnablePlayerMoveControl extends GuaranteeActionBase_1.GuaranteeActionBase {
  OnExecute(e) {
    ControllerHolder_1.ControllerHolder.InputController.SetMoveControlEnabled(
      !0,
      !0,
      !0,
      !0,
    );
  }
}
exports.GuaranteeActionEnablePlayerMoveControl =
  GuaranteeActionEnablePlayerMoveControl;
//# sourceMappingURL=GuaranteeActionEnablePlayerMoveControl.js.map
