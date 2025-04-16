"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemTurntableControl = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemTurntableControl extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    return (
      1 === r.Type &&
      ControllerHolder_1.ControllerHolder.TurntableControlController.OpenTurntableControlView(
        r.EntityId,
      )
    );
  }
  GetViewName(e, r) {
    return "TurntableControlView";
  }
}
exports.OpenSystemTurntableControl = OpenSystemTurntableControl;
//# sourceMappingURL=OpenSystemTurntableControl.js.map
