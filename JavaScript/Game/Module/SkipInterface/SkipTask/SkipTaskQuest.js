"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipTaskQuest = void 0);
const UiManager_1 = require("../../../Ui/UiManager");
const SkipTask_1 = require("./SkipTask");
class SkipTaskQuest extends SkipTask_1.SkipTask {
  OnRun(e) {
    e = typeof e === "string" ? Number(e) : e;
    UiManager_1.UiManager.OpenView("QuestView", e), this.Finish();
  }
}
exports.SkipTaskQuest = SkipTaskQuest;
// # sourceMappingURL=SkipTaskQuest.js.map
