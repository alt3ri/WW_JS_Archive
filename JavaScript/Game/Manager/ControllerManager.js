"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ControllerManager = void 0);
const ControllerManagerBase_1 = require("../../Core/Framework/ControllerManagerBase"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem");
class ControllerManager extends ControllerManagerBase_1.ControllerManagerBase {
  static Init() {
    super.Init(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBattleStateChanged,
        ControllerManager.Zpe,
      );
  }
  static Clear() {
    super.Clear(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnBattleStateChanged,
        ControllerManager.Zpe,
      );
  }
}
(exports.ControllerManager = ControllerManager),
  ((_a = ControllerManager).Zpe = (e) => {
    _a.IsInFight = e;
  });
//# sourceMappingURL=ControllerManager.js.map
