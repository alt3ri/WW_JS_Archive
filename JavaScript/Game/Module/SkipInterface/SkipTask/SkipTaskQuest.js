"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipTaskQuest = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  SkipTask_1 = require("./SkipTask"),
  DEFAULT_PARAM = "0";
class SkipTaskQuest extends SkipTask_1.SkipTask {
  OnRun(e, r) {
    var i,
      e = "string" == typeof e ? Number(e) : e;
    let s = !1;
    e &&
      (i = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e)) &&
      i.CanShowInUiPanel() &&
      (s = !0),
      UiManager_1.UiManager.OpenView("QuestView", e),
      s ||
        r === DEFAULT_PARAM ||
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(r),
      this.Finish();
  }
}
exports.SkipTaskQuest = SkipTaskQuest;
//# sourceMappingURL=SkipTaskQuest.js.map
