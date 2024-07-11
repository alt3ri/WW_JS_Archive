"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopGiftItem = void 0);
const UE = require("ue");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../GlobalData");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const LguiResourceManager_1 = require("../../../../Ui/LguiResourceManager");
const HelpController_1 = require("../../../Help/HelpController");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const SOLDOUT_ALPHA = 0.6;
class PayShopGiftItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(i, t = void 0) {
    super(),
      (this.Data = void 0),
      (this.SellTimerId = void 0),
      (this.DiscountTimerId = void 0),
      (this.ToggleFunction = void 0),
      (this.QBt = void 0),
      (this.uFi = !1),
      (this.O3e = 0),
      (this.xIt = void 0),
      (this.x4e = () => {
        this.GetExtendToggle(0).SetToggleState(0, !1),
          this.ToggleFunction(this.Data.GetGoodsId());
      }),
      (this.qni = () => {
        HelpController_1.HelpController.OpenHelpById(this.O3e);
      }),
      (this.i2i = (i) => {
        const t = this.Data.GetGoodsData();
        t.IsDirect() || (t.Price.Id === i && this.SetPrice());
      }),
      (this.cFi = () => {
        (this.DiscountTimerId = void 0),
          this.SetDiscountTime(),
          this.Data.HasDiscount() ||
            (this.SetPrice(),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.GoodsRefreshDiscountTime,
              this.Data.GetGoodsId(),
            ));
      }),
      (this.$Bt = LguiResourceManager_1.LguiResourceManager.InvalidId),
      (this.mFi = i),
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
        [0, this.x4e],
        [13, this.qni],
      ]);
  }
  OnStart() {
    this.GetButton(13).RootUIComp.SetUIActive(!1);
  }
  AddEventListener() {
    this.uFi ||
      ((this.uFi = !0),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlayerCurrencyChange,
        this.i2i,
      ));
  }
  RemoveEventListener() {
    this.uFi &&
      ((this.uFi = !1),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlayerCurrencyChange,
        this.i2i,
      ));
  }
  SetBelongViewName(i) {
    this.xIt = i;
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
      LguiResourceManager_1.LguiResourceManager.CancelLoadPrefab(this.$Bt);
  }
  RefreshState() {
    const i = this.Data.GetItemData();
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
    this.mFi === 1 && (t = i.NewPayShopTexture),
      this.SetTextureByPath(t, this.GetTexture(2));
  }
  SetIcon() {
    const i = this.GetTexture(1);
    this.SetItemIcon(i, this.Data.GetItemData().ItemId, this.xIt);
  }
  SetTips() {
    this.RootItem.SetAlpha(1);
    let i;
    const t = this.GetText(4);
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
    let i;
    const t = this.GetText(7);
    const e = this.GetTexture(5);
    const s = this.GetText(6);
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
    let i;
    const t = this.GetItem(8);
    let e = this.GetText(10);
    let s = this.GetItem(9);
    this.Data.HasDiscount()
      ? (t.SetUIActive(!0),
        (i = this.Data.IsPermanentDiscount()),
        s.SetUIActive(!i),
        (s = this.Data.GetDiscount()),
        e.SetText("-" + s + "%"),
        i ||
          ((e = this.Data.GetDiscountRemainTime()),
          (this.DiscountTimerId = TimerSystem_1.RealTimeTimerSystem.Delay(
            this.cFi,
            e.RemainingTime * CommonDefine_1.MILLIONSECOND_PER_SECOND,
          ))))
      : t.SetUIActive(!1);
  }
  SetSellTime() {
    this.RemoveSellTimer();
    let i;
    let t;
    const e = this.GetItem(12);
    this.Data.IsPermanentSell()
      ? e.SetUIActive(!1)
      : this.Data.InSellTime() &&
        ((i = this.Data.GetEndTimeRemainData()),
        (t = this.GetText(11)),
        e.SetUIActive(!0),
        typeof i === "string"
          ? t.SetText(i)
          : (LguiUtil_1.LguiUtil.SetLocalText(t, i.TextId, i.TimeValue),
            (this.SellTimerId = TimerSystem_1.RealTimeTimerSystem.Delay(() => {
              (this.SellTimerId = void 0), this.SetSellTime();
            }, i.RemainingTime * CommonDefine_1.MILLIONSECOND_PER_SECOND))));
  }
  SetName(i) {
    let t;
    const e = this.GetText(3);
    const s = this.Data.GetGoodsData();
    s.ItemCount > 1
      ? ((t = new LguiUtil_1.TableTextArgNew(i)),
        LguiUtil_1.LguiUtil.SetLocalText(e, "GoodsName", t, s.ItemCount))
      : e.ShowTextNew(i);
  }
  ShowDebugText() {
    GlobalData_1.GlobalData.IsPlayInEditor &&
      (this.QBt
        ? this.QBt?.SetText(this.Data.GetGoodsId().toString())
        : (LguiResourceManager_1.LguiResourceManager.CancelLoadPrefab(this.$Bt),
          (this.$Bt =
            LguiResourceManager_1.LguiResourceManager.LoadPrefabByResourceId(
              "UiItem_DebugText_Prefab",
              this.RootItem,
              (i) => {
                (this.$Bt =
                  LguiResourceManager_1.LguiResourceManager.InvalidId),
                  (this.QBt = i.GetComponentByClass(UE.UIText.StaticClass())),
                  this.QBt?.SetText(this.Data.GetGoodsId().toString());
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
    this.GetButton(13).RootUIComp.SetUIActive(!0), (this.O3e = i);
  }
}
exports.PayShopGiftItem = PayShopGiftItem;
// # sourceMappingURL=PayShopGiftItem.js.map
