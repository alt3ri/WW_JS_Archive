"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionPlaySpine = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  FlowActionBase_1 = require("./FlowActionBase");
class FlowActionPlaySpine extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    var e = this.ActionInfo.Params;
    "Play" === e.Config.Type &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.PlayPlotSpine,
        e.Config.Name,
        e.Config.IsLoop,
      );
  }
  OnBackgroundExecute() {}
}
exports.FlowActionPlaySpine = FlowActionPlaySpine;
//# sourceMappingURL=FlowActionPlaySpine.js.map
