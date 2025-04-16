"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkinBuyDetailViewData = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager");
class SkinBuyDetailViewData {
  constructor() {
    (this.fyl = []), (this.vyl = []), (this.NOe = 0), (this.vUl = "");
  }
  static Create(t) {
    var e = new SkinBuyDetailViewData();
    return e.InitData(t), e;
  }
  static CreateByRoleSkinData(t) {
    var e = new SkinBuyDetailViewData();
    return e.InitDataByRoleSkinData(t), e;
  }
  SetPreviewTitle(t) {
    this.vUl = t;
  }
  GetPreviewTitle() {
    return this.vUl;
  }
  SetIndex(t) {
    this.NOe = t;
  }
  InitDataByRoleSkinData(t) {
    this.fyl = t;
  }
  InitData(t) {
    (this.vyl = t), (this.fyl = []);
    for (const i of t) {
      var e = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(
        i.GetItemId(),
      );
      this.fyl.push(e);
    }
  }
  CheckIfHaveMutiGood() {
    return 1 < this.vyl.length;
  }
  GetCurrentGoodsData() {
    if (0 !== this.vyl.length) return this.vyl[this.NOe];
  }
  SwitchToNextGoods() {
    this.NOe++, this.NOe > this.vyl.length - 1 && (this.NOe = 0);
  }
  SwitchToPreGoods() {
    this.NOe--, this.NOe < 0 && (this.NOe = this.vyl.length - 1);
  }
  GetCurrentSkinData() {
    return this.fyl[this.NOe];
  }
  GetIfNeedShowSwitchItem() {
    return 0 < this.GetCurrentSkinData().GetSuitWeaponSkinId();
  }
  GetDiscountText() {
    return this.GetCurrentGoodsData()
      ? this.GetCurrentGoodsData().GetDiscountText()
      : "";
  }
  GetDiscountTimeData() {
    if (this.GetCurrentGoodsData())
      return this.GetCurrentGoodsData().GetDiscountTimeData();
  }
  GetIfDirect() {
    return (
      !!this.GetCurrentGoodsData() && this.GetCurrentGoodsData().GetIfDirect()
    );
  }
  GetPriceData() {
    if (this.GetCurrentGoodsData())
      return this.GetCurrentGoodsData().GetPriceData();
  }
  GetDirectPriceText() {
    return this.GetCurrentGoodsData()
      ? this.GetCurrentGoodsData().GetDirectPriceText()
      : "";
  }
  GetIfHaveSkinNeedRole() {
    return this.GetCurrentSkinData().GetIfHaveRole();
  }
}
exports.SkinBuyDetailViewData = SkinBuyDetailViewData;
//# sourceMappingURL=SkinBuyDetailViewData.js.map
