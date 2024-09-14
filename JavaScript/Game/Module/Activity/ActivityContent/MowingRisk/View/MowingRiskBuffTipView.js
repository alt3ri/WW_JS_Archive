"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingRiskBuffTipView = void 0);
const UE = require("ue"),
  GenericPromptFloatTipsBase_1 = require("../../../../GenericPrompt/View/GenericPromptFloatTipsBase"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class MowingRiskBuffTipView extends GenericPromptFloatTipsBase_1.GenericPromptFloatTipsBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
    ];
  }
  OnStart() {
    var e = this.OpenParam;
    this.SetTextureByPath(e.IconPath, this.GetTexture(0)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.TitleTextId);
  }
}
exports.MowingRiskBuffTipView = MowingRiskBuffTipView;
//# sourceMappingURL=MowingRiskBuffTipView.js.map
