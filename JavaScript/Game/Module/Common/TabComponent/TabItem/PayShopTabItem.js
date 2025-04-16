"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopTabItem = void 0);
const UE = require("ue"),
  UiTabSequence_1 = require("../../../DynamicTab/UiTabViewBehavior/UiTabSequence"),
  CommonTabItem_1 = require("./CommonTabItem");
class PayShopTabItem extends CommonTabItem_1.CommonTabItem {
  constructor() {
    super(...arguments), (this.eBl = void 0);
  }
  OnRegisterComponent() {
    super.OnRegisterComponent(),
      this.ComponentRegisterInfos.push([5, UE.UIText]);
  }
  GetNameTextComponent() {
    return this.GetText(5);
  }
  RegisterViewModule(e) {
    e.AddUiTabViewBehavior(UiTabSequence_1.UiTabSequence).SetRootItem(e);
  }
  Refresh(e, t, i) {
    super.Refresh(e, t, i),
      this.GetTabToggle().RootUIComp.SetUIActive(!1),
      this.GetTabToggle().RootUIComp.SetUIActive(!0);
  }
  BindRedDot(e, t = 0) {
    super.BindRedDot(e, t), (this.eBl = t);
  }
  UnBindRedDot() {
    this.UnBindGivenUid(this.eBl);
  }
}
exports.PayShopTabItem = PayShopTabItem;
//# sourceMappingURL=PayShopTabItem.js.map
