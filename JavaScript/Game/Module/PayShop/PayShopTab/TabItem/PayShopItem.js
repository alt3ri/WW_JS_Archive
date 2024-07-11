"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopItem = void 0);
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const PayShopGoods_1 = require("../../PayShopData/PayShopGoods");
const PayShopItemBase_1 = require("./PayShopItemBase");
class PayShopItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.dFi = !1),
      (this.CFi = !1),
      (this.Pe = void 0),
      (this.gFi = void 0),
      (this.fFi = !1),
      (this.pFi = 0),
      (this.vFi = !1),
      (this.MFi = ""),
      (this.SFi = 0),
      (this.EFi = !1),
      (this.yFi = !1),
      (this.IFi = !1),
      (this.TFi = !1),
      (this.LFi = !1),
      (this.DFi = !0),
      (this.jbe = () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Shop", 11, "PayShop:ShopItem 点击商品", [
            "Id",
            this.Pe.GetGoodsData().Id,
          ]),
          ControllerHolder_1.ControllerHolder.PayShopController.OpenBuyViewByGoodsId(
            this.Pe,
          );
      }),
      (this.YOi = () => {
        this.Pe &&
          this.IsUiActiveInHierarchy() &&
          this.gFi.Refresh(this.Pe.ConvertToPayShopBaseSt(), !1, 0);
      }),
      (this.RFi = () => {
        if (this.Pe && this.IsUiActiveInHierarchy()) {
          let t = !1;
          this.UFi() && (t = !0),
            this.wkt() && (t = !0),
            this.AFi(),
            this.PFi(),
            this.xFi(),
            this._pt(),
            this.wFi(),
            this.BFi(),
            this.gFi.OnTimerRefresh(this.Pe.ConvertToPayShopBaseSt(), !1, 0),
            t && this.TryEmitRefreshTips();
        }
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UISprite],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIButtonComponent],
      [9, UE.UIItem],
      [10, UE.UIText],
      [11, UE.UIText],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIText],
      [15, UE.UIItem],
      [16, UE.UIText],
    ]),
      (this.BtnBindInfo = [[8, this.jbe]]);
  }
  HideExchangePopViewElement() {
    this.SetRaycastState(!1),
      this.SetDownPriceShowState(!1),
      this.SetForceHideReUpTextState(!0),
      this.SetResellShowState(!0),
      this.SetDisableSelfInteractiveState(!0),
      this.SetLeftTimeTextShowState(!1),
      this.SetRedDotState(!1);
  }
  HidePackageViewElement() {
    this.SetRaycastState(!1),
      this.SetForceHideReUpTextState(!0),
      this.SetResellShowState(!0),
      this.SetDisableSelfInteractiveState(!0),
      this.SetLeftTimeTextShowState(!1),
      this.gFi.SetDownPriceOnlyShow(!0),
      this.SetRedDotState(!1);
  }
  SetRaycastState(t) {
    this.RootItem.SetRaycastTarget(t),
      this.gFi.GetRootItem().SetRaycastTarget(t),
      this.GetButton(8).SetCanClickWhenDisable(t);
  }
  SetResellShowState(t) {
    this.IFi = t;
  }
  SetDisableSelfInteractiveState(t) {
    this.TFi = t;
  }
  SetForceHideReUpTextState(t) {
    this.LFi = t;
  }
  SetDownPriceShowState(t) {
    this.gFi.SetDownPriceShowState(t);
  }
  OnStart() {
    this.GetItem(12).SetUIActive(!1),
      (this.gFi = new PayShopItemBase_1.PayShopItemBase(this.GetItem(0))),
      this.gFi.Init(),
      (this.dFi = this.GetItem(5).bIsUIActive),
      (this.CFi = this.GetItem(1).bIsUIActive),
      (this.fFi = this.GetItem(4).bIsUIActive),
      (this.vFi = this.GetText(7).bIsUIActive),
      (this.EFi = !1),
      (this.yFi = !1),
      (this.DFi = this.GetItem(12).bIsActive),
      this.GetButton(8).SetCanClickWhenDisable(!0),
      this.dde();
  }
  dde() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.DiscountShopTimerRefresh,
      this.RFi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnQueryProductInfo,
        this.YOi,
      );
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.DiscountShopTimerRefresh,
      this.RFi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnQueryProductInfo,
        this.YOi,
      );
  }
  Refresh(t, i, s) {
    t instanceof PayShopGoods_1.PayShopGoods &&
      ((this.Pe = t),
      this.gFi.Refresh(t.ConvertToPayShopBaseSt(), i, s),
      this.O8e(),
      this.UFi(),
      this.wkt(),
      this.AFi(),
      this.PFi(),
      this.xFi(),
      this._pt(),
      this.bFi(),
      this.wFi(),
      this.BFi());
  }
  O8e() {
    this.GetItem(15).SetUIActive(!1), (this.yFi = !1);
  }
  BFi() {
    let t = !this.Pe.IfCanBuy();
    t && this.TFi && (t = !1);
    let i = void 0;
    let s = void 0;
    this.yFi !== t &&
      ((i = this.GetItem(15)),
      (s = this.GetText(16)),
      (this.yFi = t),
      i.SetUIActive(t),
      t) &&
      s.SetText(this.Pe.GetConditionLimitText());
  }
  _pt() {
    const t = this.Pe.IsSoldOut();
    let i = this.Pe.IsLimitGoods() && t;
    i && this.TFi && (i = !1),
      this.EFi !== i &&
        ((this.EFi = i), this.GetItem(13)?.SetUIActive(i), t) &&
        this.GetText(14)?.SetText(this.Pe.GetDownTipsText());
  }
  xFi() {
    const t = this.Pe.GetDiscountLabel();
    let i = !1;
    (i =
      t > 0 &&
      (!!this.Pe.InLabelShowTime() || (this.Pe.InLabelShowTime(), !1))),
      this.fFi !== i && (this.GetItem(4).SetUIActive(i), (this.fFi = i));
  }
  wFi() {
    const t = this.fFi || this.CFi;
    this.DFi !== t && ((this.DFi = t), this.GetItem(12).SetUIActive(t));
  }
  AFi() {
    let t = this.Pe.GetDiscountLabel();
    t > 0 &&
      this.Pe.InLabelShowTime() &&
      this.pFi !== t &&
      ((this.pFi = t),
      (t = ConfigManager_1.ConfigManager.PayShopConfig.GetShopDiscountLabel(t)),
      this.GetText(11).ShowTextNew(t));
  }
  wkt() {
    let i = this.Pe.GetCountDownData();
    let s = !1;
    if (i[2] === 0)
      this.dFi && (this.GetItem(5).SetUIActive(!1), (this.dFi = !1), (s = !0));
    else {
      let t = i[1];
      i = i[0];
      if ((t = this.IFi ? void 0 : t) && i !== 2) {
        this.dFi ||
          (this.GetItem(5).SetUIActive(!0), (this.dFi = !0), (s = !0));
        i = this.GetText(6);
        if (typeof t === "string") return i.SetText(t), s;
        LguiUtil_1.LguiUtil.SetLocalText(i, t.TextId, t.TimeValue);
      } else
        this.dFi &&
          (this.GetItem(5).SetUIActive(!1), (this.dFi = !1), (s = !0));
    }
    return s;
  }
  PFi() {
    let t = this.Pe.GetResellText();
    let i = !StringUtils_1.StringUtils.IsEmpty(t);
    this.IFi && (i = !1),
      this.MFi !== t &&
        ((this.MFi = t), i) &&
        ((t = ConfigManager_1.ConfigManager.TextConfig.GetTextById(t)),
        this.GetText(7).SetText(t)),
      this.vFi !== i && ((this.vFi = i), this.GetText(7).SetUIActive(i));
  }
  UFi() {
    let t = this.GetItem(1);
    const i = this.Pe.HasDiscount();
    let s = !1;
    return (
      this.CFi !== i && (t.SetUIActive(i), (this.CFi = i), (s = !0)),
      this.CFi &&
        (t = this.Pe.GetDiscount()) !== this.SFi &&
        ((this.SFi = t),
        this.GetText(2).SetText(
          StringUtils_1.StringUtils.Format("-{0}%", t.toString()),
        ),
        (s = !0)),
      s
    );
  }
  bFi() {
    let t, i;
    this.LFi
      ? this.GetItem(5).SetUIActive(!1)
      : this.dFi ||
        ((t = this.Pe.GetCountDownData())[0] === 2
          ? ((t = t[1]),
            this.GetItem(5).SetUIActive(!0),
            this.gFi.SetLeftTimeTextShowState(!1),
            (i = this.GetText(6)),
            typeof t === "string"
              ? i.SetText(t)
              : LguiUtil_1.LguiUtil.SetLocalText(i, t.TextId, t.TimeValue))
          : (this.GetItem(5).SetUIActive(!1),
            this.gFi.SetLeftTimeTextShowState(!0)));
  }
  SetLeftTimeTextShowState(t) {
    this.gFi.SetLeftTimeTextShowState(t);
  }
  SetNameTextShowState(t) {
    this.gFi.SetNameTextShowState(t);
  }
  SetRedDotState(t) {
    (this.gFi.RefreshRedDotState = t), this.gFi.SetRedDotVisible(t);
  }
  TryEmitRefreshTips() {
    ControllerHolder_1.ControllerHolder.PayShopController.ClosePayShopGoodDetailPopView(),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.CheckIsConfirmBoxOpen() ||
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RefreshPayShop,
          this.Pe.PayShopId,
          !0,
        );
  }
  OnBeforeDestroy() {
    this.Cde();
  }
}
exports.PayShopItem = PayShopItem;
// # sourceMappingURL=PayShopItem.js.map
