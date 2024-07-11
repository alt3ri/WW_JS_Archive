"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExchangePopView = void 0);
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const LguiResourceManager_1 = require("../../../../Ui/LguiResourceManager");
const NumberSelectComponent_1 = require("../../../Common/NumberSelect/NumberSelectComponent");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const PayShopItem_1 = require("../../PayShopTab/TabItem/PayShopItem");
const COLOR = "FED12E";
class ExchangePopView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.i3i = void 0),
      (this.Goods = void 0),
      (this.o3i = !0),
      (this.r3i = void 0),
      (this.ResellTimerId = void 0),
      (this.n3i = 0),
      (this.WGe = void 0),
      (this.PUt = () => {
        this.CloseMe();
      }),
      (this.xUt = () => {
        let e = this.Goods.GetGoodsData();
        this.IsEnoughMoney()
          ? ControllerHolder_1.ControllerHolder.PayShopController.SendRequestPayShopBuy(
              e.Id,
              this.s3i,
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
      (this.RFi = () => {
        this.Og();
      }),
      (this.KGe = (e) => {
        const t =
          ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
            "BugCount",
          );
        return new LguiUtil_1.TableTextArgNew(t, e);
      }),
      (this.QGe = (e) => {
        this.SetPrice();
      }),
      (this.PCi = () => {
        this.CloseMe();
      }),
      (this.SetEndTime = () => {
        let e;
        let t = this.Goods.GetCountDownData();
        t[2] !== 0 &&
        ((e = this.Goods.GetCountDownData()[1]),
        this.GetText(14).SetUIActive(t[0] === 3),
        t[0] === 3
          ? this.GetText(14).ShowTextNew("DownShopItem")
          : t[0] === 2
            ? this.GetText(14).ShowTextNew("ReUpShopItem")
            : t[0] === 1 && this.GetText(14).ShowTextNew("DiscountItem"),
        e)
          ? (this.GetItem(15).SetUIActive(!0),
            (this.o3i = !0),
            (t = this.GetText(1)),
            typeof e === "string"
              ? t.SetText(e)
              : LguiUtil_1.LguiUtil.SetLocalText(t, e.TextId, e.TimeValue))
          : (this.GetItem(15).SetUIActive(!1), (this.o3i = !1));
      }),
      (this.PFi = () => {
        this.RemoveResellTimer();
        const e = this.Goods.GetExchangePopViewResellText();
        if (this.Goods.GetIfNeedExtraLimitText())
          (i = this.Goods.GetExtraLimitText()) &&
            (this.GetItem(11).SetUIActive(!0), this.GetText(12).ShowTextNew(i));
        else if (this.Goods.GetPriceData().Enough) {
          var t;
          var i = this.Goods.GetCountDownData();
          if (i[0] !== 2)
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
              i[2] > 0 &&
                (this.ResellTimerId = TimerSystem_1.RealTimeTimerSystem.Delay(
                  this.PFi,
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
  get s3i() {
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
        [6, this.PUt],
        [7, this.xUt],
      ]);
  }
  OnBeforeCreate() {
    const e = this.OpenParam;
    this.Goods = e.PayShopGoods;
  }
  async OnCreateAsync() {
    const e = this.OpenParam;
    const t = new CustomPromise_1.CustomPromise();
    LguiResourceManager_1.LguiResourceManager.LoadPrefabByResourceId(
      e.ShopItemResource,
      void 0,
      (e) => {
        (this.i3i = new PayShopItem_1.PayShopItem()),
          this.i3i.CreateThenShowByActor(e),
          t.SetResult(!0);
      },
    ),
      await t.Promise;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PayShopGoodsBuy,
      this.PUt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DiscountShopTimerRefresh,
        this.RFi,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PayShopGoodsBuy,
      this.PUt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DiscountShopTimerRefresh,
        this.RFi,
      );
  }
  OnStart() {
    this.SetMaxCanBuyCount(),
      (this.r3i = this.GetButton(7)
        .GetOwner()
        .GetComponentByClass(UE.UIInteractionGroup.StaticClass())),
      (this.WGe = new NumberSelectComponent_1.NumberSelectComponent(
        this.GetItem(9),
      ));
    const e = {
      MaxNumber: this.n3i,
      GetExchangeTableText: this.KGe,
      ValueChangeFunction: this.QGe,
    };
    this.WGe.Init(e), this.a3i(), this.GetItem(13).SetUIActive(!0);
  }
  a3i() {
    this.WGe.GetIfLimit() &&
      (this.WGe.SetAddReduceButtonActive(!0),
      this.WGe.SetAddReduceButtonInteractive(!1));
  }
  OnBeforeShow() {
    this.GetText(10).SetUIActive(!1),
      this.GetText(16).SetUIActive(!1),
      this.Og(),
      this.SetPriceIcon(),
      this.vIt();
  }
  Og() {
    const e = this.GetItem(2);
    this.i3i.GetRootItem().SetUIParent(e),
      this.i3i.HideExchangePopViewElement(),
      this.i3i.Refresh(this.Goods, !1, 0),
      this.SetEndTime(),
      this.SetInteractionGroup(),
      this.SetNameAndDescribe(),
      this.PFi(),
      this.KFi(),
      this.h3i();
  }
  async vIt() {
    var e = [this.Goods.GetPriceData().CurrencyId];
    const t = this.ChildPopView.PopItem;
    var e =
      (await t.SetCurrencyItemList(e),
      t.GetCurrencyComponent().GetCurrencyItemList()[0]);
    e.SetBeforeButtonFunction(this.PCi), e.SetToPayShopFunction();
  }
  OnBeforeDestroy() {
    this.WGe.Destroy(), this.i3i.Destroy(), this.RemoveResellTimer();
  }
  SetMaxCanBuyCount() {
    const e = this.Goods.GetGoodsData();
    var t = e.Price.Id;
    var t =
      ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t);
    var t = Math.trunc(t / e.GetNowPrice());
    var t =
      (e.HasBuyLimit()
        ? (this.n3i = Math.min(e.GetRemainingCount(), t))
        : (this.n3i = t),
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
        e.ItemId,
      ));
    let i =
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
        e.ItemId,
      );
    t && i === 1 && t.ShowTypes.includes(30) && (this.n3i = 1),
      t.ShowTypes.includes(30) &&
        ((i = ModelManager_1.ModelManager.RoleModel.GetResonantItemRoleId(
          e.ItemId,
        )),
        (t =
          ModelManager_1.ModelManager.RoleModel.GetRoleLeftResonantCountWithInventoryItem(
            i[0],
          )),
        (this.n3i = this.n3i > (t = t === 0 ? 1 : t) ? t : this.n3i));
  }
  SetInteractionGroup() {
    this.Goods.IsLocked() ||
    this.Goods.IsSoldOut() ||
    !this.Goods.IfCanBuy() ||
    !this.Goods.GetPriceData().Enough
      ? this.r3i.SetInteractable(!1)
      : this.r3i.SetInteractable(!0);
  }
  SetPriceIcon() {
    var e = this.Goods.GetGoodsData();
    var t = this.GetTexture(3);
    var t = (this.SetItemIcon(t, e.Price.Id), this.GetText(4));
    var e = this.s3i * e.GetNowPrice();
    t.SetText(e.toString());
  }
  SetPrice() {
    var e = this.Goods.GetGoodsData();
    const t = this.GetText(4);
    var e = this.s3i * e.GetNowPrice();
    const i = this.IsEnoughMoney();
    t.SetChangeColor(!i, t.changeColor), t.SetText(e.toString());
  }
  SetNameAndDescribe() {
    const e = this.Goods.GetGoodsData();
    const t =
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
        e.ItemId,
      );
    let i = "";
    (i =
      t === 1
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
      if (this.s3i > e) return !1;
    }
    var e = this.Goods.GetGoodsData();
    const t = e.Price.Id;
    return (
      ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t) >=
      e.GetNowPrice() * this.s3i
    );
  }
  h3i() {
    var e = this.Goods.GetBuyLimitText();
    var e = this.o3i || !StringUtils_1.StringUtils.IsEmpty(e);
    this.GetItem(8).SetUIActive(e);
  }
  KFi() {
    const e = this.Goods.GetExchangeViewShopTipsText();
    let t = void 0;
    (t = this.o3i ? this.GetText(10) : this.GetText(16)).SetUIActive(e !== ""),
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
// # sourceMappingURL=ExchangePopView.js.map
