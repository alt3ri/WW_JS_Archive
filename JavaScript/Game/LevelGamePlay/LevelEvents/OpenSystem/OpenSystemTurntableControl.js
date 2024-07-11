"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemTurntableControl = void 0);
const TurntableControlController_1 = require("../../TurntableControl/TurntableControlController");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemTurntableControl extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, t) {
    return (
      t.Type === 1 &&
      TurntableControlController_1.TurntableControlController.OpenTurntableControlView(
        t.EntityId,
      )
    );
  }
  GetViewName(e, t) {
    return "TurntableControlView";
  }
}
exports.OpenSystemTurntableControl = OpenSystemTurntableControl;
// # sourceMappingURL=OpenSystemTurntableControl.js.map
