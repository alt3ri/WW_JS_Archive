"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemFishingCage = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemFishingCage extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    return (
      e &&
        ((e = e.BoardId),
        await ControllerHolder_1.ControllerHolder.FishingController.OpenDockyardCageView(
          e,
        )),
      !0
    );
  }
  GetViewName(e, r) {
    return "DockyardCageView";
  }
}
exports.OpenSystemFishingCage = OpenSystemFishingCage;
//# sourceMappingURL=OpenSystemFishingCage.js.map
