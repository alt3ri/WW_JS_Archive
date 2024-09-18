"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  PayShopGoods_1 = require("../../PayShopData/PayShopGoods"),
  PayShopItemBase_1 = require("./PayShopItemBase");
class PayShopItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.d3i = !1),
      (this.C3i = !1),
      (this.Pe = void 0),
      (this.g3i = void 0),
      (this.f3i = !1),
      (this.p3i = 0),
      (this.v3i = !1),
      (this.M3i = ""),
      (this.E3i = 0),
      (this.S3i = !1),
      (this.y3i = !1),
      (this.I3i = !1),
      (this.T3i = !1),
      (this.L3i = !1),
      (this.D3i = !0),
      (this.OMa = void 0),
      (this.jbe = () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Shop", 11, "PayShop:ShopItem 点击商品", [
            "Id",
            this.Pe.GetGoodsData().Id,
          ]),
          ControllerHolder_1.ControllerHolder.PayShopController.OpenBuyViewByGoodsId(
            this.Pe,
          ),
          this.OMa && this.OMa(this, this.Pe);
      }),
      (this.R3i = () => {
        if (this.Pe && this.IsUiActiveInHierarchy()) {
          let t = !1;
          this.U3i() && (t = !0),
            this.B2t() && (t = !0),
            this.A3i(),
            this.P3i(),
            this.x3i(),
            this.Svt(),
            this.w3i(),
            this.B3i(),
            this.g3i.OnTimerRefresh(this.Pe.ConvertToPayShopBaseSt(), !1, 0),
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
      [17, UE.UIItem],
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
      this.g3i.SetDownPriceOnlyShow(!0),
      this.SetRedDotState(!1);
  }
  SetRaycastState(t) {
    this.RootItem.SetRaycastTarget(t),
      this.g3i.GetRootItem().SetRaycastTarget(t),
      this.GetButton(8).SetCanClickWhenDisable(t);
  }
  SetResellShowState(t) {
    this.I3i = t;
  }
  SetDisableSelfInteractiveState(t) {
    this.T3i = t;
  }
  SetForceHideReUpTextState(t) {
    this.L3i = t;
  }
  SetDownPriceShowState(t) {
    this.g3i.SetDownPriceShowState(t);
  }
  OnStart() {
    this.GetItem(12).SetUIActive(!1),
      (this.g3i = new PayShopItemBase_1.PayShopItemBase(this.GetItem(0))),
      this.g3i.Init(),
      (this.d3i = this.GetItem(5).bIsUIActive),
      (this.C3i = this.GetItem(1).bIsUIActive),
      (this.f3i = this.GetItem(4).bIsUIActive),
      (this.v3i = this.GetText(7).bIsUIActive),
      (this.S3i = !1),
      (this.y3i = !1),
      (this.D3i = this.GetItem(12).bIsActive),
      this.GetButton(8).SetCanClickWhenDisable(!0),
      this.SetNewFlagState(!1),
      this.dde();
  }
  dde() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.DiscountShopTimerRefresh,
      this.R3i,
    );
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.DiscountShopTimerRefresh,
      this.R3i,
    );
  }
  Refresh(t, i, s) {
    t instanceof PayShopGoods_1.PayShopGoods &&
      ((this.Pe = t),
      this.g3i.Refresh(t.ConvertToPayShopBaseSt(), i, s),
      this.Z9e(),
      this.U3i(),
      this.B2t(),
      this.A3i(),
      this.P3i(),
      this.x3i(),
      this.Svt(),
      this.b3i(),
      this.w3i(),
      this.B3i());
  }
  Z9e() {
    this.GetItem(15).SetUIActive(!1), (this.y3i = !1);
  }
  B3i() {
    let t = !this.Pe.IfCanBuy();
    t && this.T3i && (t = !1);
    var i = void 0,
      s = void 0;
    this.y3i !== t &&
      ((i = this.GetItem(15)),
      (s = this.GetText(16)),
      (this.y3i = t),
      i.SetUIActive(t),
      t) &&
      s.SetText(this.Pe.GetConditionLimitText());
  }
  Svt() {
    var t = this.Pe.IsSoldOut();
    let i = this.Pe.IsLimitGoods() && t;
    i && this.T3i && (i = !1),
      this.S3i !== i &&
        ((this.S3i = i), this.GetItem(13)?.SetUIActive(i), t) &&
        this.GetText(14)?.SetText(this.Pe.GetDownTipsText());
  }
  x3i() {
    var t = this.Pe.GetDiscountLabel();
    let i = !1;
    (i =
      0 < t &&
      (!!this.Pe.InLabelShowTime() || (this.Pe.InLabelShowTime(), !1))),
      this.f3i !== i && (this.GetItem(4).SetUIActive(i), (this.f3i = i));
  }
  w3i() {
    var t = this.f3i || this.C3i;
    this.D3i !== t && ((this.D3i = t), this.GetItem(12).SetUIActive(t));
  }
  A3i() {
    var t = this.Pe.GetDiscountLabel();
    0 < t &&
      this.Pe.InLabelShowTime() &&
      this.p3i !== t &&
      ((this.p3i = t),
      (t = ConfigManager_1.ConfigManager.PayShopConfig.GetShopDiscountLabel(t)),
      this.GetText(11).ShowTextNew(t));
  }
  B2t() {
    var i = this.Pe.GetCountDownData();
    let s = !1;
    if (0 === i[2])
      this.d3i && (this.GetItem(5).SetUIActive(!1), (this.d3i = !1), (s = !0));
    else {
      let t = i[1];
      i = i[0];
      if ((t = this.I3i ? void 0 : t) && 2 !== i) {
        this.d3i ||
          (this.GetItem(5).SetUIActive(!0), (this.d3i = !0), (s = !0));
        i = this.GetText(6);
        if ("string" == typeof t) return i.SetText(t), s;
        LguiUtil_1.LguiUtil.SetLocalText(i, t.TextId, t.TimeValue);
      } else
        this.d3i &&
          (this.GetItem(5).SetUIActive(!1), (this.d3i = !1), (s = !0));
    }
    return s;
  }
  P3i() {
    var t = this.Pe.GetResellText();
    let i = !StringUtils_1.StringUtils.IsEmpty(t);
    this.I3i && (i = !1),
      this.M3i !== t &&
        ((this.M3i = t), i) &&
        ((t = ConfigManager_1.ConfigManager.TextConfig.GetTextById(t)),
        this.GetText(7).SetText(t)),
      this.v3i !== i && ((this.v3i = i), this.GetText(7).SetUIActive(i));
  }
  U3i() {
    var t = this.GetItem(1),
      i = this.Pe.HasDiscount();
    let s = !1;
    return (
      this.C3i !== i && (t.SetUIActive(i), (this.C3i = i), (s = !0)),
      this.C3i &&
        (t = this.Pe.GetDiscount()) !== this.E3i &&
        ((this.E3i = t),
        this.GetText(2).SetText(
          StringUtils_1.StringUtils.Format("-{0}%", t.toString()),
        ),
        (s = !0)),
      s
    );
  }
  b3i() {
    var t, i;
    this.L3i
      ? this.GetItem(5).SetUIActive(!1)
      : this.d3i ||
        (2 === (t = this.Pe.GetCountDownData())[0]
          ? ((t = t[1]),
            this.GetItem(5).SetUIActive(!0),
            this.g3i.SetLeftTimeTextShowState(!1),
            (i = this.GetText(6)),
            "string" == typeof t
              ? i.SetText(t)
              : LguiUtil_1.LguiUtil.SetLocalText(i, t.TextId, t.TimeValue))
          : (this.GetItem(5).SetUIActive(!1),
            this.g3i.SetLeftTimeTextShowState(!0)));
  }
  SetLeftTimeTextShowState(t) {
    this.g3i.SetLeftTimeTextShowState(t);
  }
  SetNameTextShowState(t) {
    this.g3i.SetNameTextShowState(t);
  }
  SetRedDotState(t) {
    (this.g3i.RefreshRedDotState = t), this.g3i.SetRedDotVisible(t);
  }
  SetNewFlagState(t) {
    this.GetItem(17).SetUIActive(t);
  }
  SetExtraFunction(t) {
    this.OMa = t;
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
//# sourceMappingURL=PayShopItem.js.map
