"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomBattleFettersTabView = void 0);
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
  PhantomBattleFettersViewItem_1 = require("../../../Phantom/PhantomBattle/View/PhantomBattleFettersViewItem");
class PhantomBattleFettersTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments), (this.Rpt = void 0);
  }
  async OnBeforeStartAsync() {
    (this.Rpt =
      new PhantomBattleFettersViewItem_1.PhantomBattleFettersViewItem()),
      await this.Rpt.CreateThenShowByActorAsync(this.GetRootItem().GetOwner());
  }
  OnBeforeShow() {
    var e = this.ExtraParams;
    0 < e && this.Rpt.SelectByFetterId(e);
  }
}
exports.PhantomBattleFettersTabView = PhantomBattleFettersTabView;
//# sourceMappingURL=PhantomBattleFettersTabView.js.map
