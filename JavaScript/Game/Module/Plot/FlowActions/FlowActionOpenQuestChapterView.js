"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionOpenQuestChapterView = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  GeneralLogicTreeUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeUtil"),
  FlowActionBase_1 = require("./FlowActionBase");
class FlowActionOpenQuestChapterView extends FlowActionBase_1.FlowActionBase {
  constructor() {
    super(...arguments),
      (this.$Ge = () => {
        this.FinishExecute(!0);
      });
  }
  OnExecute() {
    var t = this.ActionInfo.Params;
    if (t) {
      var o = this.Context.Context;
      let e = void 0;
      if (t.QuestId) e = t.QuestId;
      else
        switch (o.Type) {
          case 2:
            e = o.QuestId;
            break;
          case 6:
            e = o.TreeConfigId;
        }
      e
        ? GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.OpenQuestChapterView(
            t,
            e,
            this.$Ge,
          )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("LevelEvent", 19, "非任务系统不可使用章节提示事件");
    }
  }
}
exports.FlowActionOpenQuestChapterView = FlowActionOpenQuestChapterView;
//# sourceMappingURL=FlowActionOpenQuestChapterView.js.map
