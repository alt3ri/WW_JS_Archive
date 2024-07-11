"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotFunctionViewQuestBtn = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotFunctionViewQuestBtn extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnQuestRedDotStateChange];
  }
  OnCheck() {
    let e;
    for ([e] of ModelManager_1.ModelManager.QuestNewModel.GetAllRedDotData()) {
      const t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
      if (t && t.CanShowInUiPanel()) return !0;
    }
    return !1;
  }
  IsAllEventParamAsUId() {
    return !1;
  }
}
exports.RedDotFunctionViewQuestBtn = RedDotFunctionViewQuestBtn;
// # sourceMappingURL=RedDotFunctionViewQuestBtn.js.map
