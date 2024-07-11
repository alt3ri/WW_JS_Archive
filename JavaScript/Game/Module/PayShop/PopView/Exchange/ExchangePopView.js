"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExchangePopView = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
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
  LguiResourceManager_1 = require("../../../../Ui/LguiResourceManager"),
  NumberSelectComponent_1 = require("../../../Common/NumberSelect/NumberSelectComponent"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  PayShopItem_1 = require("../../PayShopTab/TabItem/PayShopItem"),
  COLOR = "FED12E";
class ExchangePopView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.i4i = void 0),
      (this.Goods = void 0),
      (this.o4i = !0),
      (this.r4i = void 0),
      (this.ResellTimerId = void 0),
      (this.n4i = 0),
      (this.WGe = void 0),
      (this.bAt = () => {
        this.CloseMe();
      }),
      (this.qAt = () => {
        var e = this.Goods.GetGoodsData();
        this.IsEnoughMoney()
          ? ControllerHolder_1.ControllerHolder.PayShopController.SendRequestPayShopBuy(
              e.Id,
              this.s4i,
            )
          : ((e =
              ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
                e.Price.Id,
              )),
            (e = new LguiUtil_1.TableTextArgNew(e.Name)),
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "ShopResourceNotEnough",
              e,
            ));
      }),
      (this.R3i = () => {
        this.Og();
      }),
      (this.KGe = (e) => {
        var t =
          ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
            "BugCount",
          );
        return new LguiUtil_1.TableTextArgNew(t, e);
      }),
      (this.QGe = (e) => {
        this.SetPrice();
      }),
      (this.Pgi = () => {
        this.CloseMe();
      }),
      (this.SetEndTime = () => {
        var e,
          t = this.Goods.GetCountDownData();
        0 !== t[2] &&
        ((e = this.Goods.GetCountDownData()[1]),
        this.GetText(14).SetUIActive(3 === t[0]),
        3 === t[0]
          ? this.GetText(14).ShowTextNew("DownShopItem")
          : 2 === t[0]
            ? this.GetText(14).ShowTextNew("ReUpShopItem")
            : 1 === t[0] && this.GetText(14).ShowTextNew("DiscountItem"),
        e)
          ? (this.GetItem(15).SetUIActive(!0),
            (this.o4i = !0),
            (t = this.GetText(1)),
            "string" == typeof e
              ? t.SetText(e)
              : LguiUtil_1.LguiUtil.SetLocalText(t, e.TextId, e.TimeValue))
          : (this.GetItem(15).SetUIActive(!1), (this.o4i = !1));
      }),
      (this.P3i = () => {
        this.RemoveResellTimer();
        var e = this.Goods.GetExchangePopViewResellText();
        if (this.Goods.GetIfNeedExtraLimitText())
          (i = this.Goods.GetExtraLimitText()) &&
            (this.GetItem(11).SetUIActive(!0), this.GetText(12).ShowTextNew(i));
        else if (this.Goods.GetPriceData().Enough) {
          var t,
            i = this.Goods.GetCountDownData();
          if (2 !== i[0])
            if (!this.Goods.GetPriceData().Enough)
              return (
                this.GetItem(11).SetUIActive(!0),
                (t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(
                  this.Goods.GetPriceData().CurrencyId,
                )),
                (t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                  t.Name,
                )),
                void LguiUtil_1.LguiUtil.SetLocalText(
                  this.GetText(12),
                  "CurrencyNotEnough",
                  t,
                )
              );
          i[1]
            ? (StringUtils_1.StringUtils.IsEmpty(e)
                ? this.GetItem(11).SetUIActive(!1)
                : (this.GetItem(11).SetUIActive(!0),
                  this.GetText(12).ShowTextNew(e)),
              0 < i[2] &&
                (this.ResellTimerId = TimerSystem_1.RealTimeTimerSystem.Delay(
                  this.P3i,
                  i[2] * CommonDefine_1.MILLIONSECOND_PER_SECOND,
                )))
            : (this.GetItem(11).SetUIActive(!1),
              this.GetText(12).SetUIActive(!1));
        } else
          this.GetItem(11).SetUIActive(!0),
            StringUtils_1.StringUtils.IsEmpty(e)
              ? ((t =
                  ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
                    this.Goods.GetPriceData().CurrencyId,
                  )),
                (i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                  t.Name,
                )),
                LguiUtil_1.LguiUtil.SetLocalText(
                  this.GetText(12),
                  "CurrencyNotEnough",
                  i,
                ))
              : this.GetText(12).ShowTextNew(e);
      });
  }
  get s4i() {
    return this.WGe.GetSelectNumber();
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UITexture],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIButtonComponent],
      [7, UE.UIButtonComponent],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIText],
      [11, UE.UIItem],
      [12, UE.UIText],
      [13, UE.UIItem],
      [14, UE.UIText],
      [15, UE.UIItem],
      [16, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [6, this.bAt],
        [7, this.qAt],
      ]);
  }
  OnBeforeCreate() {
    var e = this.OpenParam;
    this.Goods = e.PayShopGoods;
  }
  async OnCreateAsync() {
    var e = this.OpenParam;
    const t = new CustomPromise_1.CustomPromise();
    LguiResourceManager_1.LguiResourceManager.LoadPrefabByResourceId(
      e.ShopItemResource,
      void 0,
      (e) => {
        (this.i4i = new PayShopItem_1.PayShopItem()),
          this.i4i.CreateThenShowByActor(e),
          t.SetResult(!0);
      },
    ),
      await t.Promise;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PayShopGoodsBuy,
      this.bAt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DiscountShopTimerRefresh,
        this.R3i,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PayShopGoodsBuy,
      this.bAt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DiscountShopTimerRefresh,
        this.R3i,
      );
  }
  OnStart() {
    this.SetMaxCanBuyCount(),
      (this.r4i = this.GetButton(7)
        .GetOwner()
        .GetComponentByClass(UE.UIInteractionGroup.StaticClass())),
      (this.WGe = new NumberSelectComponent_1.NumberSelectComponent(
        this.GetItem(9),
      ));
    var e = {
      MaxNumber: this.n4i,
      GetExchangeTableText: this.KGe,
      ValueChangeFunction: this.QGe,
    };
    this.WGe.Init(e), this.a4i(), this.GetItem(13).SetUIActive(!0);
  }
  a4i() {
    this.WGe.GetIfLimit() &&
      (this.WGe.SetAddReduceButtonActive(!0),
      this.WGe.SetAddReduceButtonInteractive(!1));
  }
  OnBeforeShow() {
    this.GetText(10).SetUIActive(!1),
      this.GetText(16).SetUIActive(!1),
      this.Og(),
      this.SetPriceIcon(),
      this.ITt();
  }
  Og() {
    var e = this.GetItem(2);
    this.i4i.GetRootItem().SetUIParent(e),
      this.i4i.HideExchangePopViewElement(),
      this.i4i.Refresh(this.Goods, !1, 0),
      this.SetEndTime(),
      this.SetInteractionGroup(),
      this.SetNameAndDescribe(),
      this.P3i(),
      this.K3i(),
      this.h4i();
  }
  async ITt() {
    var e = [this.Goods.GetPriceData().CurrencyId],
      t = this.ChildPopView.PopItem,
      e =
        (await t.SetCurrencyItemList(e),
        t.GetCurrencyComponent().GetCurrencyItemList()[0]);
    e.SetBeforeButtonFunction(this.Pgi), e.SetToPayShopFunction();
  }
  OnBeforeDestroy() {
    this.WGe.Destroy(), this.i4i.Destroy(), this.RemoveResellTimer();
  }
  SetMaxCanBuyCount() {
    var e = this.Goods.GetGoodsData(),
      t = e.Price.Id,
      t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t),
      t = Math.trunc(t / e.GetNowPrice()),
      t =
        (e.HasBuyLimit()
          ? (this.n4i = Math.min(e.GetRemainingCount(), t))
          : (this.n4i = t),
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          e.ItemId,
        )),
      i =
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
          e.ItemId,
        );
    t && 1 === i && t.ShowTypes.includes(30) && (this.n4i = 1),
      t.ShowTypes.includes(30) &&
        ((i = ModelManager_1.ModelManager.RoleModel.GetResonantItemRoleId(
          e.ItemId,
        )),
        (t =
          ModelManager_1.ModelManager.RoleModel.GetRoleLeftResonantCountWithInventoryItem(
            i[0],
          )),
        (this.n4i = this.n4i > (t = 0 === t ? 1 : t) ? t : this.n4i));
  }
  SetInteractionGroup() {
    this.Goods.IsLocked() ||
    this.Goods.IsSoldOut() ||
    !this.Goods.IfCanBuy() ||
    !this.Goods.GetPriceData().Enough
      ? this.r4i.SetInteractable(!1)
      : this.r4i.SetInteractable(!0);
  }
  SetPriceIcon() {
    var e = this.Goods.GetGoodsData(),
      t = this.GetTexture(3),
      t = (this.SetItemIcon(t, e.Price.Id), this.GetText(4)),
      e = this.s4i * e.GetNowPrice();
    t.SetText(e.toString());
  }
  SetPrice() {
    var e = this.Goods.GetGoodsData(),
      t = this.GetText(4),
      e = this.s4i * e.GetNowPrice(),
      i = this.IsEnoughMoney();
    t.SetChangeColor(!i, t.changeColor), t.SetText(e.toString());
  }
  SetNameAndDescribe() {
    var e = this.Goods.GetGoodsData(),
      t =
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
          e.ItemId,
        );
    let i = "";
    (i =
      1 === t
        ? ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.ItemId)
            .Introduction
        : ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
            e.ItemId,
          ).AttributesDescription),
      this.GetText(5).ShowTextNew(i);
  }
  IsEnoughMoney() {
    var e = this.Goods.GetGoodsData().GetItemConfig();
    if (e && e.ShowTypes?.includes(30)) {
      (e = ModelManager_1.ModelManager.RoleModel.GetResonantItemRoleId(
        this.Goods.GetGoodsData().ItemId,
      )[0]),
        (e =
          ModelManager_1.ModelManager.RoleModel.GetRoleLeftResonantCountWithInventoryItem(
            e,
          ));
      if (this.s4i > e) return !1;
    }
    var e = this.Goods.GetGoodsData(),
      t = e.Price.Id;
    return (
      ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t) >=
      e.GetNowPrice() * this.s4i
    );
  }
  h4i() {
    var e = this.Goods.GetBuyLimitText(),
      e = this.o4i || !StringUtils_1.StringUtils.IsEmpty(e);
    this.GetItem(8).SetUIActive(e);
  }
  K3i() {
    var e = this.Goods.GetExchangeViewShopTipsText();
    let t = void 0;
    (t = this.o4i ? this.GetText(10) : this.GetText(16)).SetUIActive("" !== e),
      t.SetText(e),
      t?.SetColor(UE.Color.FromHex(COLOR));
  }
  RemoveResellTimer() {
    void 0 !== this.ResellTimerId &&
      (TimerSystem_1.RealTimeTimerSystem.Remove(this.ResellTimerId),
      (this.ResellTimerId = void 0));
  }
}
exports.ExchangePopView = ExchangePopView;
//# sourceMappingURL=ExchangePopView.js.map
