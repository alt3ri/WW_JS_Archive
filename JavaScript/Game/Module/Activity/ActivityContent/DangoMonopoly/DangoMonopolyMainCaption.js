"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoMonopolyMainCaption = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  CommonCurrencyItemListComponent_1 = require("../../../Common/CommonCurrencyItemListComponent");
class DangoMonopolyMainCaption extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ucr = void 0),
      (this.OnCloseCallback = void 0),
      (this.OnHelpCallback = void 0),
      (this.Jvt = () => {
        this.OnCloseCallback?.();
      }),
      (this.pcr = () => {
        this.OnHelpCallback?.();
      });
  }
  async Init(t) {
    await this.CreateThenShowByActorAsync(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [1, UE.UIButtonComponent],
      [0, UE.UIButtonComponent],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.Jvt],
        [1, this.pcr],
      ]);
  }
  L4c() {
    return this.GetButton(0);
  }
  w4c() {
    return this.GetButton(1);
  }
  GetCostContent() {
    return this.GetItem(2);
  }
  SetBtnHelpVisible(t) {
    this.w4c().RootUIComp.SetUIActive(t);
  }
  SetBtnCloseVisible(t) {
    this.L4c().RootUIComp.SetUIActive(t);
  }
  SetCurrencyVisible(t) {
    this.GetCostContent().SetUIActive(t);
  }
  async SetCurrencyItemList(t) {
    this.ucr ||
      (this.ucr =
        new CommonCurrencyItemListComponent_1.CommonCurrencyItemListComponent(
          this.GetCostContent(),
        )),
      await this.ucr.SetCurrencyItemList(t);
  }
  GetCurrencyItemList() {
    return this.ucr?.GetCurrencyItemList();
  }
  SetCurrencyItemBtnFunction(e, t) {
    var i = this.ucr?.GetCurrencyItemList()?.find((t) => t.ItemId === e);
    i && i.SetButtonFunction(t);
  }
}
exports.DangoMonopolyMainCaption = DangoMonopolyMainCaption;
//# sourceMappingURL=DangoMonopolyMainCaption.js.map
