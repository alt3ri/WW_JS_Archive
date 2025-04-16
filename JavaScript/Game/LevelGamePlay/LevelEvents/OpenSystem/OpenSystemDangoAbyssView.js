"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemDangoAbyssView = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemDangoAbyssView extends OpenSystemBase_1.OpenSystemBase {
  GetViewName(e, s) {
    return "DangoAbyssEntranceView";
  }
  async ExecuteOpenView(e, s) {
    return ControllerHolder_1.ControllerHolder.DangoAbyssController.OpenCurrentActivityAbyssEntranceAsync();
  }
}
exports.OpenSystemDangoAbyssView = OpenSystemDangoAbyssView;
//# sourceMappingURL=OpenSystemDangoAbyssView.js.map
