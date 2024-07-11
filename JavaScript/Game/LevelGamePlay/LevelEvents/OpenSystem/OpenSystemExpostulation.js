"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemExpostulation = void 0);
const AdviceController_1 = require("../../../Module/Advice/AdviceController");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemExpostulation extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, t) {
    return (
      t.Type === 1 &&
      AdviceController_1.AdviceController.OpenAdviceInfoView(t.EntityId)
    );
  }
  GetViewName(e, t) {
    if (t.Type === 1) return "AdviceInfoView";
  }
}
exports.OpenSystemExpostulation = OpenSystemExpostulation;
// # sourceMappingURL=OpenSystemExpostulation.js.map
