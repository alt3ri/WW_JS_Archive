"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemInstanceFailure = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemInstanceFailure extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    return ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.OpenInstanceDungeonFailView();
  }
  GetViewName(e, r) {
    return "InstanceDungeonFailView";
  }
}
exports.OpenSystemInstanceFailure = OpenSystemInstanceFailure;
//# sourceMappingURL=OpenSystemInstanceFailure.js.map
