"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonCurrencyItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../Util/LguiUtil");
class CommonCurrencyItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ETt = 0),
      (this.SkipAutoAddEvent = !1),
      (this.Gke = void 0),
      (this.STt = void 0),
      (this.ije = () => {
        this.STt?.(), this.Gke?.(this.ETt);
      }),
      (this.yTt = () => {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          this.ETt,
        );
      }),
      (this.ITt = () => {
        this.RefreshCountText();
      }),
      (this.TTt = (e) => {
        for (const t of e)
          if (this.ETt === t.J4n) return void this.RefreshCountText();
      }),
      (this.LTt = (e) => {
        e.includes(this.ETt) && this.RefreshCountText();
      }),
      (this.DTt = (e, t, i) => {
        this.ETt === e.J4n && this.RefreshCountText();
      }),
      (this.RTt = (e) => {
        e === ConfigManager_1.ConfigManager.GachaConfig.PrimaryCurrency()
          ? ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopViewToRecharge()
          : e === ConfigManager_1.ConfigManager.GachaConfig.SecondCurrency() &&
            ControllerHolder_1.ControllerHolder.ItemExchangeController.OpenExchangeViewByItemId(
              e,
            );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UITextureTransitionComponent],
      [5, UE.UIItem],
      [6, UE.UISprite],
      [7, UE.UISprite],
      [8, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [2, this.ije],
        [3, this.yTt],
      ]);
  }
  OnStart() {
    this.SkipAutoAddEvent || this.AddEventListener();
  }
  OnBeforeDestroy() {
    this.SkipAutoAddEvent || this.RemoveEventListener();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PayShopGoodsBuy,
      this.ITt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlayerCurrencyChange,
        this.ITt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAddCommonItemList,
        this.TTt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRemoveCommonItem,
        this.LTt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCommonItemCountRefresh,
        this.DTt,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PayShopGoodsBuy,
      this.ITt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlayerCurrencyChange,
        this.ITt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAddCommonItemList,
        this.TTt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRemoveCommonItem,
        this.LTt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCommonItemCountRefresh,
        this.DTt,
      );
  }
  UTt() {
    const e = this.GetTexture(0);
    e.SetUIActive(!1),
      this.SetItemIcon(this.GetTexture(0), this.ETt, void 0, () => {
        this.ATt(), e.SetUIActive(!0);
      });
  }
  ATt() {
    var e = this.GetUiTextureTransitionComponent(4);
    e && e.SetAllStateTexture(this.GetTexture(0).GetTexture());
  }
  RefreshTemp(e, t) {
    this.ShowWithoutText(e), this.RefreshCountText(t);
  }
  ShowWithoutText(e) {
    (this.ETt = e), this.UTt();
  }
  RefreshCountText(e) {
    var t = this.GetText(1),
      e =
        e ??
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          this.ETt,
        );
    t?.SetText(e.toString());
  }
  SetCountText(e, ...t) {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), e, ...t);
  }
  SetCountTextNew(e, ...t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e, ...t);
  }
  SetButtonFunction(e) {
    this.Gke = e;
  }
  SetBeforeButtonFunction(e) {
    this.STt = e;
  }
  SetButtonActive(e) {
    this.GetButton(2).RootUIComp.SetUIActive(e);
  }
  RefreshMaxItem(e) {
    this.GetItem(8).SetUIActive(e);
  }
  SetToPayShopFunction() {
    this.Gke = this.RTt;
  }
  RefreshAddButtonActive() {
    var e = ConfigManager_1.ConfigManager.GachaConfig.PrimaryCurrency(),
      t = ConfigManager_1.ConfigManager.GachaConfig.SecondCurrency(),
      i = this.GetButton(2);
    this.ETt !== e && this.ETt !== t
      ? i.RootUIComp.SetUIActive(!1)
      : i.RootUIComp.SetUIActive(!0);
  }
}
exports.CommonCurrencyItem = CommonCurrencyItem;
//# sourceMappingURL=CommonCurrencyItem.js.map
