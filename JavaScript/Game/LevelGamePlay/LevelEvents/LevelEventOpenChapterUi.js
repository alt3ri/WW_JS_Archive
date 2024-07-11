"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventOpenChapterUi = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  GeneralLogicTreeUtil_1 = require("../../Module/GeneralLogicTree/GeneralLogicTreeUtil"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventOpenChapterUi extends LevelGeneralBase_1.LevelEventBase {
  ExecuteInGm(e, r) {
    this.FinishExecute(!0);
  }
  ExecuteNew(r, l) {
    if (r) {
      let e = void 0;
      if (r.QuestId) e = r.QuestId;
      else
        switch (l.Type) {
          case 2:
            e = l.QuestId;
            break;
          case 6:
            e = l.TreeConfigId;
        }
      e
        ? GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.OpenQuestChapterView(r, e)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("LevelEvent", 19, "非任务系统不可使用章节提示事件");
    }
  }
}
exports.LevelEventOpenChapterUi = LevelEventOpenChapterUi;
//# sourceMappingURL=LevelEventOpenChapterUi.js.map
