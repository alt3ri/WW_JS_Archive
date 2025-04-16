"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RecommendQuestTipsSubPanel = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class RecommendQuestTipsSubPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.pxl = void 0),
      (this.fxl = () => {
        this.pxl?.();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[1, this.fxl]]);
  }
  SetTipsTxtByTextId(e, ...i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e, i);
  }
  SetTipsTxt(e) {
    this.GetText(0).SetText(e);
  }
  BindClickBtnTipsCallBack(e) {
    this.pxl = e;
  }
}
exports.RecommendQuestTipsSubPanel = RecommendQuestTipsSubPanel;
//# sourceMappingURL=RecommendQuestTipsSubPanel.js.map
