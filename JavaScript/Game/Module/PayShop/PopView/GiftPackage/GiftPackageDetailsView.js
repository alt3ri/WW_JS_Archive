"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GiftPackageDetailsView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  ItemDefines_1 = require("../../../Item/Data/ItemDefines"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  PayShopItem_1 = require("../../PayShopTab/TabItem/PayShopItem"),
  GiftPackageMonthlyCardItem_1 = require("./GiftPackageMonthlyCardItem"),
  GiftPackageSupplyPackItem_1 = require("./GiftPackageSupplyPackItem");
class GiftPackageDetailsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.i4i = void 0),
      (this.Data = void 0),
      (this.Goods = void 0),
      (this.GoodsData = void 0),
      (this.ResellTimerId = void 0),
      (this.l4i = ItemDefines_1.EItemFunctionType.ManualOpenGift),
      (this._4i = void 0),
      (this.xe = void 0),
      (this.bAt = () => {
        this.CloseMe();
      }),
      (this.qAt = () => {
        var e;
        this.IsEnoughMoney() && this.GoodsData.IfPayGift()
          ? (ControllerHolder_1.ControllerHolder.PayGiftController.SendPayGiftRequest(
              this.GoodsData.Id,
            ),
            this.CloseMe())
          : this.IsEnoughMoney() && !this.GoodsData.IfPayGift()
            ? (ControllerHolder_1.ControllerHolder.PayShopController.SendRequestPayShopBuy(
                this.GoodsData.Id,
              ),
              this.CloseMe())
            : ((e =
                ConfigManager_1.ConfigManager.GachaConfig.PrimaryCurrency()),
              this.GoodsData.Price.Id === e
                ? (ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowFirstCurrencyConfirm(),
                  this.CloseMe())
                : ((e =
                    ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
                      this.GoodsData.Price.Id,
                    )),
                  (e = new LguiUtil_1.TableTextArgNew(e.Name)),
                  ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                    "ShopResourceNotEnough",
                    e,
                  )));
      }),
      (this.Pgi = () => {
        this.CloseMe();
      }),
      (this.P3i = () => {
        this.RemoveResellTimer();
        var e,
          i = this.Goods.GetExchangePopViewResellText();
        this.Goods.GetIfNeedExtraLimitText()
          ? (e = this.Goods.GetExtraLimitText()) &&
            (this.GetItem(7).SetUIActive(!0), this.GetText(8).ShowTextNew(e))
          : this.Goods.GetPriceData().Enough
            ? 2 !== (e = this.Goods.GetCountDownData())[0]
              ? (this.GetItem(7).SetUIActive(!1),
                this.GetText(8).SetUIActive(!1))
              : (this.GetItem(7).SetUIActive(!0),
                StringUtils_1.StringUtils.IsEmpty(i) ||
                  this.GetText(8).ShowTextNew(i),
                (this.ResellTimerId = TimerSystem_1.RealTimeTimerSystem.Delay(
                  this.P3i,
                  e[2] * CommonDefine_1.MILLIONSECOND_PER_SECOND,
                )))
            : StringUtils_1.StringUtils.IsEmpty(i)
              ? (this.GetItem(7).SetUIActive(!0),
                (e =
                  ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
                    this.Goods.GetPriceData().CurrencyId,
                  )) &&
                  ((e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                    e.Name,
                  )),
                  LguiUtil_1.LguiUtil.SetLocalText(
                    this.GetText(8),
                    "CurrencyNotEnough",
                    e,
                  )))
              : this.GetText(8).ShowTextNew(i);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
      [6, UE.UIInteractionGroup],
      [8, UE.UIText],
      [7, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [4, this.bAt],
        [5, this.qAt],
      ]);
  }
  OnBeforeCreate() {
    var e,
      i,
      t = this.OpenParam,
      s =
        ((this.Goods = t.PayShopGoods),
        (this.GoodsData = this.Goods.GetGoodsData()),
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          this.GoodsData.ItemId,
        ));
    this.xe = void 0;
    for ([e, i] of s.Parameters) {
      var r = ItemDefines_1.EItemFunctionType[e];
      if (!StringUtils_1.StringUtils.IsEmpty(r)) {
        (this.l4i = e), (this.xe = i);
        break;
      }
    }
    this.xe ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Config",
          44,
          "检查道具ID的参数（Parameters）字段 是否 表示为正确的指向道具id的参数",
          ["道具ID", this.GoodsData.ItemId],
        )),
      (this.i4i = new PayShopItem_1.PayShopItem()),
      this.i4i.SetRootActorLoadInfo(t.ShopItemResource),
      this.AddChild(this.i4i);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PayShopGoodsBuy,
      this.bAt,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PayShopGoodsBuy,
      this.bAt,
    );
  }
  OnStart() {
    var e;
    this.xe &&
      ((e = this.GetItem(1)),
      this.l4i === ItemDefines_1.EItemFunctionType.AutoOpenMonthCard
        ? (this._4i =
            new GiftPackageMonthlyCardItem_1.GiftPackageMonthlyCardItem(
              this.xe,
              e,
            ))
        : (this.l4i !== ItemDefines_1.EItemFunctionType.AutoOpenGift &&
            this.l4i !== ItemDefines_1.EItemFunctionType.ManualOpenGift) ||
          (this._4i = new GiftPackageSupplyPackItem_1.GiftPackageSupplyPackItem(
            this.xe,
            e,
            this.Goods,
          )),
      this.i4i.GetRootItem().SetUIParent(this.GetItem(0), !1));
  }
  OnBeforeShow() {
    this.i4i.HidePackageViewElement(),
      this.BGn(),
      this.i4i.Refresh(this.Goods, !1, 0),
      this.SetInteractionGroup(),
      this.P3i(),
      this.ITt();
  }
  BGn() {
    var e = ConfigManager_1.ConfigManager.PayShopConfig.GetMonthCardShopId();
    this.Goods?.GetGoodsId() === e && this.i4i.SetLeftTimeTextShowState(!0);
  }
  async ITt() {
    var e;
    this.Goods.IsDirect() ||
      (0 !== this.GoodsData.GetNowPrice() &&
        (0 < this.Goods.GetPriceData().CurrencyId &&
          ((e = new Array()).push(this.Goods.GetPriceData().CurrencyId),
          await this.ChildPopView?.PopItem.SetCurrencyItemList(e)),
        this.ChildPopView?.PopItem.GetCurrencyComponent()
          .GetCurrencyItemList()
          .forEach((e) => {
            e.SetBeforeButtonFunction(this.Pgi), e.SetToPayShopFunction();
          })));
  }
  OnBeforeDestroy() {
    this._4i && this._4i.Destroy(), this.RemoveResellTimer();
  }
  RemoveResellTimer() {
    void 0 !== this.ResellTimerId &&
      (TimerSystem_1.RealTimeTimerSystem.Remove(this.ResellTimerId),
      (this.ResellTimerId = void 0));
  }
  IsEnoughMoney() {
    var e;
    return (
      !!this.GoodsData.IsDirect() ||
      ((e = this.GoodsData.Price.Id),
      ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e) >=
        this.GoodsData.GetNowPrice())
    );
  }
  SetInteractionGroup() {
    var e = this.GetInteractionGroup(6);
    this.Goods.IsLocked() ||
    this.Goods.IsSoldOut() ||
    !this.Goods.IfCanBuy() ||
    !this.Goods.GetPriceData().Enough
      ? e.SetInteractable(!1)
      : e.SetInteractable(!0);
  }
}
exports.GiftPackageDetailsView = GiftPackageDetailsView;
//# sourceMappingURL=GiftPackageDetailsView.js.map
