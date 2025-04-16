"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem");
class TsAnimNotifyClientEvent extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.GameplayTag = void 0);
  }
  Constructor() {}
  K2_Notify(e, t) {
    return this.GameplayTag
      ? (EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.CheckClientEvent,
          this.GameplayTag,
        ),
        !0)
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("LevelCondition", 72, "客户端全局自定义事件Tag为空"),
        !1);
  }
  GetNotifyName() {
    return "客户端全局自定义事件";
  }
}
exports.default = TsAnimNotifyClientEvent;
//# sourceMappingURL=TsAnimNotifyClientEvent.js.map
