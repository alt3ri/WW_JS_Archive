"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipToTaskViewDirect = void 0);
const MoonChasingController_1 = require("../../Activity/ActivityContent/MoonChasing/Main/MoonChasingController"),
  SkipToMoonChasingBase_1 = require("./SkipToMoonChasingBase");
class SkipToTaskViewDirect extends SkipToMoonChasingBase_1.SkipToMoonChasingBase {
  OnRun(o) {
    this.CheckMainViewOpen()
      ? MoonChasingController_1.MoonChasingController.OpenTaskView()
      : this.SkipToMap(parseInt(o));
  }
}
exports.SkipToTaskViewDirect = SkipToTaskViewDirect;
//# sourceMappingURL=SkipToTaskViewDirect.js.map
