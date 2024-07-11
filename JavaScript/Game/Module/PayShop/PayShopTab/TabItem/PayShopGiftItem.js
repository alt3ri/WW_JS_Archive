"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopGiftItem = void 0);
const UE = require("ue"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../../GlobalData"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  LguiResourceManager_1 = require("../../../../Ui/LguiResourceManager"),
  HelpController_1 = require("../../../Help/HelpController"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  SOLDOUT_ALPHA = 0.6;
class PayShopGiftItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(i, t = void 0) {
    super(),
      (this.Data = void 0),
      (this.SellTimerId = void 0),
      (this.DiscountTimerId = void 0),
      (this.ToggleFunction = void 0),
      (this.Ybt = void 0),
      (this.u3i = !1),
      (this.t5e = 0),
      (this.GTt = void 0),
      (this.Bke = () => {
        this.GetExtendToggle(0).SetToggleState(0, !1),
          this.ToggleFunction(this.Data.GetGoodsId());
      }),
      (this.Gsi = () => {
        HelpController_1.HelpController.OpenHelpById(this.t5e);
      }),
      (this.iFi = (i) => {
        var t = this.Data.GetGoodsData();
        t.IsDirect() || (t.Price.Id === i && this.SetPrice());
      }),
      (this.c3i = () => {
        (this.DiscountTimerId = void 0),
          this.SetDiscountTime(),
          this.Data.HasDiscount() ||
            (this.SetPrice(),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.GoodsRefreshDiscountTime,
              this.Data.GetGoodsId(),
            ));
      }),
      (this.zbt = LguiResourceManager_1.LguiResourceManager.InvalidId),
      (this.m3i = i),
      t && this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UITexture],
      [2, UE.UITexture],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UITexture],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIText],
      [11, UE.UIText],
      [12, UE.UIItem],
      [13, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [0, this.Bke],
        [13, this.Gsi],
      ]);
  }
  OnStart() {
    this.GetButton(13).RootUIComp.SetUIActive(!1);
  }
  AddEventListener() {
    this.u3i ||
      ((this.u3i = !0),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlayerCurrencyChange,
        this.iFi,
      ));
  }
  RemoveEventListener() {
    this.u3i &&
      ((this.u3i = !1),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlayerCurrencyChange,
        this.iFi,
      ));
  }
  SetBelongViewName(i) {
    this.GTt = i;
  }
  Refresh(i) {
    this.AddEventListener(), this.RefreshGiftItem(i);
  }
  RefreshGiftItem(i) {
    (this.Data = i), this.RefreshState();
  }
  Clear() {
    this.RemoveEventListener(),
      this.RemoveSellTimer(),
      this.RemoveDiscountTimer();
  }
  OnBeforeDestroy() {
    this.RemoveEventListener(),
      this.RemoveSellTimer(),
      this.RemoveDiscountTimer(),
      LguiResourceManager_1.LguiResourceManager.CancelLoadPrefab(this.zbt);
  }
  RefreshState() {
    var i = this.Data.GetItemData();
    this.SetQuality(i.Quality),
      this.SetIcon(),
      this.SetTips(),
      this.SetPrice(),
      this.SetDiscountTime(),
      this.SetSellTime(),
      this.SetName(i.Name),
      this.ShowDebugText();
  }
  SetQuality(i) {
    i = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(i);
    let t = i.PayShopTexture;
    1 === this.m3i && (t = i.NewPayShopTexture),
      this.SetTextureByPath(t, this.GetTexture(2));
  }
  SetIcon() {
    var i = this.GetTexture(1);
    this.SetItemIcon(i, this.Data.GetItemData().ItemId, this.GTt);
  }
  SetTips() {
    this.RootItem.SetAlpha(1);
    var i,
      t = this.GetText(4);
    this.Data.IsLocked()
      ? ((i = this.Data.GetConditionTextId()),
        LguiUtil_1.LguiUtil.SetLocalTextNew(t, i),
        t.SetUIActive(!0),
        this.RootItem.SetAlpha(SOLDOUT_ALPHA))
      : this.Data.IsLimitGoods()
        ? (t.SetUIActive(!0),
          this.Data.IsSoldOut()
            ? (LguiUtil_1.LguiUtil.SetLocalText(t, "SoldoutText"),
              this.RootItem.SetAlpha(SOLDOUT_ALPHA))
            : ((i = this.Data.GetRemainingData()),
              LguiUtil_1.LguiUtil.SetLocalText(t, i.TextId, i.Count)))
        : t.SetUIActive(!1);
  }
  SetPrice() {
    var i,
      t = this.GetText(7),
      e = this.GetTexture(5),
      s = this.GetText(6);
    this.Data.IsDirect()
      ? (t.SetUIActive(!1),
        e.SetUIActive(!1),
        (i = this.Data.GetDirectPriceText()),
        s.SetText(i))
      : (e.SetUIActive(!0),
        (i = this.Data.GetPriceData()).OriginalPrice
          ? (t.SetUIActive(!0),
            t.SetText(`<s>${i.OriginalPrice.toString()}</s>`))
          : t.SetUIActive(!1),
        s.SetText(i.NowPrice.toString()),
        s.SetChangeColor(i.OwnNumber() < i.NowPrice, s.changeColor),
        this.SetItemIcon(e, i.CurrencyId));
  }
  SetDiscountTime() {
    this.RemoveDiscountTimer();
    var i,
      t = this.GetItem(8),
      e = this.GetText(10),
      s = this.GetItem(9);
    this.Data.HasDiscount()
      ? (t.SetUIActive(!0),
        (i = this.Data.IsPermanentDiscount()),
        s.SetUIActive(!i),
        (s = this.Data.GetDiscount()),
        e.SetText("-" + s + "%"),
        i ||
          ((e = this.Data.GetDiscountRemainTime()),
          (this.DiscountTimerId = TimerSystem_1.RealTimeTimerSystem.Delay(
            this.c3i,
            e.RemainingTime * CommonDefine_1.MILLIONSECOND_PER_SECOND,
          ))))
      : t.SetUIActive(!1);
  }
  SetSellTime() {
    this.RemoveSellTimer();
    var i,
      t,
      e = this.GetItem(12);
    this.Data.IsPermanentSell()
      ? e.SetUIActive(!1)
      : this.Data.InSellTime() &&
        ((i = this.Data.GetEndTimeRemainData()),
        (t = this.GetText(11)),
        e.SetUIActive(!0),
        "string" == typeof i
          ? t.SetText(i)
          : (LguiUtil_1.LguiUtil.SetLocalText(t, i.TextId, i.TimeValue),
            (this.SellTimerId = TimerSystem_1.RealTimeTimerSystem.Delay(() => {
              (this.SellTimerId = void 0), this.SetSellTime();
            }, i.RemainingTime * CommonDefine_1.MILLIONSECOND_PER_SECOND))));
  }
  SetName(i) {
    var t,
      e = this.GetText(3),
      s = this.Data.GetGoodsData();
    1 < s.ItemCount
      ? ((t = new LguiUtil_1.TableTextArgNew(i)),
        LguiUtil_1.LguiUtil.SetLocalText(e, "GoodsName", t, s.ItemCount))
      : e.ShowTextNew(i);
  }
  ShowDebugText() {
    GlobalData_1.GlobalData.IsPlayInEditor &&
      (this.Ybt
        ? this.Ybt?.SetText(this.Data.GetGoodsId().toString())
        : (LguiResourceManager_1.LguiResourceManager.CancelLoadPrefab(this.zbt),
          (this.zbt =
            LguiResourceManager_1.LguiResourceManager.LoadPrefabByResourceId(
              "UiItem_DebugText_Prefab",
              this.RootItem,
              (i) => {
                (this.zbt =
                  LguiResourceManager_1.LguiResourceManager.InvalidId),
                  (this.Ybt = i.GetComponentByClass(UE.UIText.StaticClass())),
                  this.Ybt?.SetText(this.Data.GetGoodsId().toString());
              },
            ))));
  }
  RemoveSellTimer() {
    void 0 !== this.SellTimerId &&
      (TimerSystem_1.RealTimeTimerSystem.Remove(this.SellTimerId),
      (this.SellTimerId = void 0));
  }
  RemoveDiscountTimer() {
    void 0 !== this.DiscountTimerId &&
      (TimerSystem_1.RealTimeTimerSystem.Remove(this.DiscountTimerId),
      (this.DiscountTimerId = void 0));
  }
  SetToggleFunction(i) {
    this.ToggleFunction = i;
  }
  SetTipsIdAndShowTipsButton(i) {
    this.GetButton(13).RootUIComp.SetUIActive(!0), (this.t5e = i);
  }
}
exports.PayShopGiftItem = PayShopGiftItem;
//# sourceMappingURL=PayShopGiftItem.js.map
