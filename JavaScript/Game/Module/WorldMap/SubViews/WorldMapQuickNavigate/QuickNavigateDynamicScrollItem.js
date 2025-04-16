"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuickNavigateDynamicScrollItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  QuickNavigateItemPanelA_1 = require("./QuickNavigateItemPanelA"),
  QuickNavigateItemPanelB_1 = require("./QuickNavigateItemPanelB");
class QuickNavigateDynamicScrollItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.AYa = void 0), (this.DYa = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), void 0, !0);
  }
  async OnBeforeStartAsync() {
    this.AYa = new QuickNavigateItemPanelA_1.QuickNavigateItemPanelA();
    var e = this.GetItem(0).GetOwner(),
      e =
        (await this.AYa.CreateThenShowByActorAsync(e, void 0, !0),
        (this.DYa = new QuickNavigateItemPanelB_1.QuickNavigateItemPanelB()),
        this.GetItem(1).GetOwner());
    await this.DYa.CreateThenShowByActorAsync(e, void 0, !0);
  }
  GetUsingItem(e) {
    return 0 === e.ItemType
      ? this.cma(0)
      : 1 === e.ItemType
        ? this.cma(1)
        : void 0;
  }
  cma(e) {
    return this.GetItem(e).GetOwner();
  }
  Update(e, t) {
    var i = 0 === e.ItemType;
    this.AYa.SetActive(i),
      this.DYa.SetActive(!i),
      (i ? this.AYa : this.DYa).RefreshByData(e);
  }
  ClearItem() {
    this.Destroy();
  }
}
exports.QuickNavigateDynamicScrollItem = QuickNavigateDynamicScrollItem;
//# sourceMappingURL=QuickNavigateDynamicScrollItem.js.map
