"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipTaskRole = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  SkipTask_1 = require("./SkipTask"),
  DEFAULT_PARAM = "0";
class SkipTaskRole extends SkipTask_1.SkipTask {
  OnRun(e) {
    let o = void 0;
    e !== DEFAULT_PARAM && (o = e),
      ControllerHolder_1.ControllerHolder.RoleController.OpenRoleMainView(
        0,
        0,
        [],
        o,
      ),
      this.Finish();
  }
}
exports.SkipTaskRole = SkipTaskRole;
//# sourceMappingURL=SkipTaskRole.js.map
