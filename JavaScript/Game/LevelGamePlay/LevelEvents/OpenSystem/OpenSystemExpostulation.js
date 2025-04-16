"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemExpostulation = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemExpostulation extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, t) {
    return (
      1 === t.Type &&
      ControllerHolder_1.ControllerHolder.AdviceController.OpenAdviceInfoView(
        t.EntityId,
      )
    );
  }
  GetViewName(e, t) {
    if (1 === t.Type) return "AdviceInfoView";
  }
}
exports.OpenSystemExpostulation = OpenSystemExpostulation;
//# sourceMappingURL=OpenSystemExpostulation.js.map
