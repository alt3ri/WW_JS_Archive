"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RegressGradeSignItem = void 0);
const RedDotController_1 = require("../../../../../RedDot/RedDotController"),
  RegressGradeUiItem_1 = require("./RegressGradeUiItem");
class RegressGradeSignItem extends RegressGradeUiItem_1.RegressGradeUiItem {
  constructor(t, e) {
    super(),
      (this.NormalContext = t),
      (this.HyperContext = e),
      (this.nf1 = void 0);
  }
  BindRedDot(t) {
    RedDotController_1.RedDotController.BindRedDot(
      t,
      this.NormalContext.RedDotItem,
    ),
      RedDotController_1.RedDotController.BindRedDot(
        t,
        this.HyperContext.RedDotItem,
      ),
      (this.nf1 = t);
  }
  UnBindRedDot() {
    this.nf1 &&
      (RedDotController_1.RedDotController.UnBindGivenUi(
        this.nf1,
        this.NormalContext.RedDotItem,
      ),
      RedDotController_1.RedDotController.UnBindGivenUi(
        this.nf1,
        this.HyperContext.RedDotItem,
      ),
      (this.nf1 = void 0));
  }
  Clear() {
    this.UnBindRedDot();
  }
  OnSetToNormal() {
    this.ol1();
  }
  OnSetToHyper() {
    this.ol1();
  }
  ol1() {
    this.nl1(this.NormalContext, 1), this.nl1(this.HyperContext, 2);
  }
  nl1(t, e) {
    t.Btn.RootUIComp.SetUIActive(e === this.Grade),
      t.CurrencyTexNode.SetUIActive(e === this.Grade),
      t.BubbleNode.SetUIActive(e === this.Grade);
  }
  GetActivateContext() {
    return 1 === this.Grade ? this.NormalContext : this.HyperContext;
  }
  SetClaimRewardBubbleActive(t) {
    this.GetActivateContext().BubbleNode.SetUIActive(t);
  }
}
exports.RegressGradeSignItem = RegressGradeSignItem;
//# sourceMappingURL=RegressGradeSignItem.js.map
