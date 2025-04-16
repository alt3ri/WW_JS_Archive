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
  LguiUtil_1 = require("../Util/LguiUtil"),
  Log_1 = require("../../../Core/Common/Log");
class CommonCurrencyItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ItemId = 0),
      (this.SkipAutoAddEvent = !1),
      (this._Y_ = void 0),
      (this.STt = void 0),
      (this.cX_ = void 0),
      (this.ije = () => {
        this.STt?.(), this._Y_?.(this.ItemId);
      }),
      (this.yTt = () => {
        (this.cX_ && !this.cX_(this.ItemId)) ||
          ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
            this.ItemId,
          );
      }),
      (this.ITt = () => {
        this.RefreshCountText();
      }),
      (this.TTt = (t) => {
        for (const e of t)
          if (this.ItemId === e.s5n) return void this.RefreshCountText();
      }),
      (this.LTt = (t) => {
        t.includes(this.ItemId) && this.RefreshCountText();
      }),
      (this.DTt = (t, e, i) => {
        this.ItemId === t.s5n && this.RefreshCountText();
      }),
      (this.RTt = (t) => {
        t === ConfigManager_1.ConfigManager.GachaConfig.PrimaryCurrency()
          ? ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopViewToRecharge()
          : t === ConfigManager_1.ConfigManager.GachaConfig.SecondCurrency() &&
            ControllerHolder_1.ControllerHolder.ItemExchangeController.OpenExchangeViewByItemId(
              t,
            );
      });
  }
  set ButtonFunction(t) {
    t !== this._Y_ &&
      Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("WeeklyRogue", 34, "Test"),
      (this._Y_ = t);
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
    const t = this.GetTexture(0);
    t.SetUIActive(!1),
      this.SetItemIcon(this.GetTexture(0), this.ItemId, void 0, () => {
        this.ATt(), t.SetUIActive(!0);
      });
  }
  ATt() {
    var t = this.GetUiTextureTransitionComponent(4);
    t && t.SetAllStateTexture(this.GetTexture(0).GetTexture());
  }
  RefreshTemp(t, e) {
    this.ShowWithoutText(t), this.RefreshCountText(e);
  }
  ShowWithoutText(t) {
    (this.ItemId = t), this.UTt();
  }
  RefreshCountText(t) {
    var e = this.GetText(1),
      t =
        t ??
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          this.ItemId,
        );
    e?.SetText(t.toString());
  }
  SetCountText(t, ...e) {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), t, ...e);
  }
  SetCountTextNew(t, ...e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t, ...e);
  }
  SetButtonFunction(t) {
    this.ButtonFunction = t;
  }
  SetBeforeButtonFunction(t) {
    this.STt = t;
  }
  SetTextureClickCheckFunction(t) {
    this.cX_ = t;
  }
  SetButtonActive(t) {
    this.GetButton(2).RootUIComp.SetUIActive(t);
  }
  RefreshMaxItem(t) {
    this.GetItem(8).SetUIActive(t);
  }
  SetToPayShopFunction() {
    this.ButtonFunction = this.RTt;
  }
  RefreshAddButtonActive() {
    var t = ConfigManager_1.ConfigManager.GachaConfig.PrimaryCurrency(),
      e = ConfigManager_1.ConfigManager.GachaConfig.SecondCurrency(),
      i = this.GetButton(2);
    this.ItemId !== t && this.ItemId !== e
      ? i.RootUIComp.SetUIActive(!1)
      : i.RootUIComp.SetUIActive(!0);
  }
}
exports.CommonCurrencyItem = CommonCurrencyItem;
//# sourceMappingURL=CommonCurrencyItem.js.map
