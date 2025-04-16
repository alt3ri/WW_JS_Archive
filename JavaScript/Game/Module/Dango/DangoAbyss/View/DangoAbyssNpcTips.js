"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssNpcTips = void 0);
const GenericPromptFloatTipsBase_1 = require("../../../GenericPrompt/View/GenericPromptFloatTipsBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class DangoAbyssNpcTips extends GenericPromptFloatTipsBase_1.GenericPromptFloatTipsBase {
  SetMainText() {
    this.Data.MainTextObj &&
      (LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.ExtraText,
        this.Data.MainTextObj.TextKey,
      ),
      this.ExtraText.SetUIActive(!0));
  }
  SetExtraText() {}
}
exports.DangoAbyssNpcTips = DangoAbyssNpcTips;
//# sourceMappingURL=DangoAbyssNpcTips.js.map
