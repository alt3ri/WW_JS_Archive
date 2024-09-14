"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipTaskHelp = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  SkipTask_1 = require("./SkipTask");
class SkipTaskHelp extends SkipTask_1.SkipTask {
  OnRun(e) {
    e = "string" == typeof e ? Number(e) : e;
    ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(e),
      this.Finish();
  }
}
exports.SkipTaskHelp = SkipTaskHelp;
//# sourceMappingURL=SkipTaskHelp.js.map
