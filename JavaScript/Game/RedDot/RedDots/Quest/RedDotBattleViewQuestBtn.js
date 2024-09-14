"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotBattleViewQuestBtn = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotBattleViewQuestBtn extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnQuestRedDotStateChange];
  }
  OnCheck() {
    var e,
      t = ModelManager_1.ModelManager.QuestNewModel.GetAllRedDotData();
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Quest", 19, "开始检测主界面任务红点", [
        "红点数据量",
        t?.size,
      ]);
    for ([e] of t) {
      var r = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
      if (r && r.CanShowInUiPanel())
        return (
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Quest", 19, "主界面任务红点", ["红点任务", r.Id]),
          !0
        );
    }
    return !1;
  }
  IsAllEventParamAsUId() {
    return !1;
  }
}
exports.RedDotBattleViewQuestBtn = RedDotBattleViewQuestBtn;
//# sourceMappingURL=RedDotBattleViewQuestBtn.js.map
