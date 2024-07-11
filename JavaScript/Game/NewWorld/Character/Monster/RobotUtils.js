"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RobotUtils = void 0);
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
class RobotUtils {
  static IsRobot(o) {
    var o = o.GetPbEntityInitData(),
      t = (0, IComponent_1.getComponent)(o.ComponentsData, "InteractComponent"),
      o = (0, IComponent_1.getComponent)(o.ComponentsData, "BubbleComponent");
    return !(!t || !o);
  }
}
exports.RobotUtils = RobotUtils;
//# sourceMappingURL=RobotUtils.js.map
