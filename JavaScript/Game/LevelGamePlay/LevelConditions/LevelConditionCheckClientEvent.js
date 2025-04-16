"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckClientEvent = void 0);
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckClientEvent extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, t, n) {
    if (
      10 === n?.Type &&
      n.EventName === EventDefine_1.EEventName.CheckClientEvent &&
      n.GetEventHandleParams()?.[0] ===
        GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(e.EventName)
    )
      return !0;
    return !1;
  }
}
exports.LevelConditionCheckClientEvent = LevelConditionCheckClientEvent;
//# sourceMappingURL=LevelConditionCheckClientEvent.js.map
