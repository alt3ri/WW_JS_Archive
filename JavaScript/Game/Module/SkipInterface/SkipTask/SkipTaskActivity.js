"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipTaskActivity = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  SkipTask_1 = require("./SkipTask");
class SkipTaskActivity extends SkipTask_1.SkipTask {
  OnRun(e) {
    e = "string" == typeof e ? Number(e) : e;
    ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityById(e),
      this.Finish();
  }
}
exports.SkipTaskActivity = SkipTaskActivity;
//# sourceMappingURL=SkipTaskActivity.js.map
