"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  ControllerHolder_1 = require("../Manager/ControllerHolder");
class TsAnimNotifyTriggerGuide extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.EventGroupId = 0);
  }
  K2_Notify(e, r) {
    e = e.GetOwner();
    return (
      ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActions(
        this.EventGroupId,
        e,
      ),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 4, "TsAnimNotifyTriggerGuide", [
          "EventGroupId",
          this.EventGroupId,
        ]),
      !0
    );
  }
  GetNotifyName() {
    return "执行行为组事件";
  }
}
exports.default = TsAnimNotifyTriggerGuide;
//# sourceMappingURL=TsAnimNotifyTriggerGuide.js.map
