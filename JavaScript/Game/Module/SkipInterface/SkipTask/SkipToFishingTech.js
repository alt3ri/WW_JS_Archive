"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipToFishingTech = void 0);
const UiManager_1 = require("../../../Ui/UiManager"),
  SkipTask_1 = require("./SkipTask");
class SkipToFishingTech extends SkipTask_1.SkipTask {
  OnRun(e, i) {
    e = { Type: Number(e), NodeId: Number(i) };
    UiManager_1.UiManager.OpenView("FishingTechRootView", e), this.Finish();
  }
}
exports.SkipToFishingTech = SkipToFishingTech;
//# sourceMappingURL=SkipToFishingTech.js.map
