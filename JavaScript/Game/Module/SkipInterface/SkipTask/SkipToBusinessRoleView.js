"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipToBusinessRoleView = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  SkipToMoonChasingBase_1 = require("./SkipToMoonChasingBase");
class SkipToBusinessRoleView extends SkipToMoonChasingBase_1.SkipToMoonChasingBase {
  OnRun(e) {
    this.CheckMainViewOpen()
      ? ControllerHolder_1.ControllerHolder.MoonChasingController.OpenHelperView()
      : this.SkipToMap(parseInt(e));
  }
}
exports.SkipToBusinessRoleView = SkipToBusinessRoleView;
//# sourceMappingURL=SkipToBusinessRoleView.js.map
