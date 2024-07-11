"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PowerView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase"),
  MediumItemGrid_1 = require("../Common/MediumItemGrid/MediumItemGrid"),
  ItemDefines_1 = require("../Item/Data/ItemDefines"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  GenericScrollView_1 = require("../Util/ScrollView/GenericScrollView"),
  PowerController_1 = require("./PowerController"),
  COUN_NOT_ENOUGH_COLOR = "9D2437FF",
  WHITECOLOR = "FFFFFFFF";
class PowerView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.Soo = void 0),
      (this.yoo = void 0),
      (this.Ioo = void 0),
      (this.Too = void 0),
      (this.roo = void 0),
      (this.Doo = 0),
      (this.Roo = 0),
      (this.OFt = void 0),
      (this.Aoo = -1),
      (this.bAt = () => {
        this.CloseMe();
      }),
      (this.qAt = () => {
        var e;
        1 === this.Ioo.Type
          ? (this.CloseMe(), PowerController_1.PowerController.OpenPowerView())
          : 2 === this.Ioo.Type
            ? ModelManager_1.ModelManager.PowerModel.PowerCount +
                this.Too.RenewValue >
              this.Roo
              ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                  "PowerBound",
                )
              : 0 === this.Too.RemainCount &&
                  this.Too.ItemId !== ItemDefines_1.EItemId.OverPower
                ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
                    MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                      "Text_PowerDescribe_Astrite_Not",
                    ),
                  )
                : this.Too.CostValue > this.Too.StackValue
                  ? ((e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                      this.Too.ItemName,
                    )),
                    (e = StringUtils_1.StringUtils.Format(
                      MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                        "PowerPropsCannotExchange",
                      ),
                      e,
                    )),
                    ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
                      e,
                    ))
                  : PowerController_1.PowerController.ExchangePower(this.Too, 1)
            : this.CloseMe();
      }),
      (this.xoo = (e) => {
        var t = e.Data,
          e = e.MediumItemGrid;
        this.OFt?.SetSelected(!1), (this.OFt = e), (this.Too = t), this.woo(t);
      }),
      (this.pqt = () => {
        var e = ModelManager_1.ModelManager.PowerModel.PowerCount / this.Doo;
        this.GetSlider(14).SetValue(e),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "PowerModule",
              50,
              `补充时打印体力${ModelManager_1.ModelManager.PowerModel.PowerCount}/` +
                this.Doo,
            ),
          (this.roo = this.LQs()),
          this.Soo.RefreshByData(this.roo);
      }),
      (this.Boo = () => {
        this.yoo?.SetBottomText(
          ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerMoney(
            ItemDefines_1.EItemId.BlackCard,
          ).toString(),
        );
      }),
      (this.xdi = (e, t) => {
        e &&
          t &&
          (this.Soo &&
            this.Too?.ItemId !== ItemDefines_1.EItemId.OverPower &&
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "PowerBuySucceed",
              this.Too.RenewValue,
            ),
          (this.roo = this.LQs()),
          this.Soo.RefreshByData(this.roo));
      }),
      (this.qoo = () => {
        (this.roo = this.LQs()), this.Soo.RefreshByData(this.roo);
      }),
      (this.Esi = (e, t, i) => {
        var s = new MediumItemGrid_1.MediumItemGrid(),
          t =
            (s.Initialize(t.GetOwner()),
            {
              Data: e,
              Type: 4,
              ItemConfigId: e.ItemId,
              BottomText: e.StackValue.toString(),
            });
        return (
          s.Apply(t),
          s.BindOnExtendToggleClicked(this.xoo),
          e.CostValue > e.StackValue || 0 === e.RemainCount
            ? s.SetBottomTextColor(COUN_NOT_ENOUGH_COLOR)
            : s.SetBottomTextColor(WHITECOLOR),
          e.ItemId === ItemDefines_1.EItemId.BlackCard && (this.yoo = s),
          { Key: i, Value: s }
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIScrollViewWithScrollbarComponent],
      [8, UE.UIText],
      [9, UE.UIVerticalLayout],
      [10, UE.UIText],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIButtonComponent],
      [14, UE.UISliderComponent],
      [15, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.bAt],
        [2, this.qAt],
      ]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnPowerChanged,
      this.pqt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BoughtItem,
        this.xdi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnGoodUnlock,
        this.qoo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlayerCurrencyChange,
        this.Boo,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnPowerChanged,
      this.pqt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BoughtItem,
        this.xdi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnGoodUnlock,
        this.qoo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlayerCurrencyChange,
        this.Boo,
      );
  }
  OnBeforeShow() {
    this.ITt();
  }
  async ITt() {
    var e = this.ChildPopView.PopItem;
    let t = [ItemDefines_1.EItemId.BlackCard];
    (t = ModelManager_1.ModelManager.FunctionModel.IsOpen(10066)
      ? [
          ItemDefines_1.EItemId.OverPower,
          ItemDefines_1.EItemId.Power,
          ItemDefines_1.EItemId.BlackCard,
        ]
      : [ItemDefines_1.EItemId.Power, ItemDefines_1.EItemId.BlackCard]),
      e.GetCostParent()?.SetUIActive(!1),
      await e.SetCurrencyItemList(t);
    var i = e.GetCurrencyComponent()?.GetCurrencyItemList();
    if (i)
      for (let e = 0; e < i.length; e++)
        t[e] === ItemDefines_1.EItemId.BlackCard
          ? (i[e].SetButtonActive(!0), i[e].SetToPayShopFunction())
          : (t[e], ItemDefines_1.EItemId.Power, i[e].SetButtonActive(!1));
    return e.GetCostParent()?.SetUIActive(!0), Promise.resolve();
  }
  OnStart() {
    var e;
    this.GetItem(11).SetUIActive(!1),
      this.GetButton(13).RootUIComp.SetUIActive(!1),
      PowerController_1.PowerController.SendUpdatePowerRequest([
        ItemDefines_1.EItemId.Power,
        ItemDefines_1.EItemId.OverPower,
      ]),
      (this.Doo =
        ConfigManager_1.ConfigManager.PowerConfig.GetPowerNaturalLimit()),
      (this.Roo =
        ConfigManager_1.ConfigManager.PowerConfig.GetPowerChargeLimit()),
      (this.Ioo = ModelManager_1.ModelManager.PowerModel.ConfirmBoxData),
      this.Noo(),
      (this.Soo = new GenericScrollView_1.GenericScrollView(
        this.GetScrollViewWithScrollbar(7),
        this.Esi,
      )),
      (this.roo = this.LQs()),
      this.Soo.RefreshByData(this.roo),
      (this.Aoo = 0) ===
      ModelManager_1.ModelManager.PowerModel.GetPowerDataById(
        ItemDefines_1.EItemId.OverPower,
      ).GetCurrentPower()
        ? ((e =
            ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
              10800,
            )),
          (this.Aoo =
            0 === e
              ? this.roo.findIndex(
                  (e) => e.ItemId === ItemDefines_1.EItemId.BlackCard,
                )
              : this.roo.findIndex((e) => 10800 === e.ItemId)))
        : (this.Aoo = this.roo.findIndex(
            (e) => e.ItemId === ItemDefines_1.EItemId.OverPower,
          )),
      (this.Too = this.roo[this.Aoo]),
      (this.OFt = this.Soo.GetScrollItemList()[this.Aoo]),
      this.OFt.SetSelected(!0),
      this.woo(this.Too);
  }
  LQs() {
    var e = [];
    for (const t of ModelManager_1.ModelManager.PowerModel.PowerItemInfoList)
      (t.StackValue <= 0 && t.IsHideWhenZero) || e.push(t);
    return e;
  }
  OnBeforeDestroy() {
    this.Soo && (this.Soo.ClearChildren(), (this.Soo = void 0)),
      ModelManager_1.ModelManager.PowerModel.ClearConfirmBoxData();
  }
  OnTick(e) {
    this.DQs(), this.AQs(this.Too?.ItemId);
  }
  PYt(e, t) {
    this.GetText(5).SetText(e), this.GetText(4).SetText(t);
  }
  Noo() {
    switch (this.Ioo.Type) {
      case 2:
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(6), "PowerTitle"),
          LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "PowerCancel"),
          LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "PowerConfirm");
        break;
      case 0:
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(6), "PowerGetReward"),
          LguiUtil_1.LguiUtil.SetLocalText(this.GetText(10), "PowerRewardCost"),
          LguiUtil_1.LguiUtil.SetLocalText(
            this.GetText(3),
            "PowerCostAndReward",
          ),
          LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "PowerCancel"),
          this.GetVerticalLayout(9).GetRootComponent().SetUIActive(!1);
        break;
      case 1:
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(6), "PowerGetReward"),
          LguiUtil_1.LguiUtil.SetLocalText(
            this.GetText(10),
            "PowerRewardCostFail",
          ),
          LguiUtil_1.LguiUtil.SetLocalText(
            this.GetText(3),
            "PowerCostAndReward",
          ),
          LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "PowerCancel"),
          this.GetVerticalLayout(9).GetRootComponent().SetUIActive(!1);
    }
  }
  woo(e) {
    this.Wbe(e), this.RQs(e.ItemId);
  }
  Wbe(e) {
    var t, i, s;
    e.ItemId !== ItemDefines_1.EItemId.OverPower
      ? ((t =
          e.ItemId === ItemDefines_1.EItemId.BlackCard
            ? "Text_PowerDescribe_Astrite_Text"
            : "Text_PowerDescribe_Text"),
        (i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.ItemName)),
        (s = e.RemainCount < 0 ? 0 : e.RemainCount),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(8),
          t,
          e.CostValue,
          i,
          e.RenewValue,
          s,
        ))
      : LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "GetOverPower");
  }
  RQs(e) {
    this.AQs(e);
  }
  AQs(e) {
    e &&
      (this.PQs(),
      (e = ModelManager_1.ModelManager.PowerModel.GetPowerDataById(
        ItemDefines_1.EItemId.Power,
      )),
      this.GetItem(11).SetUIActive(0 === e.GetPowerRecoveryMode()));
  }
  DQs() {
    var e = this.Too?.ItemId;
    (e !== ItemDefines_1.EItemId.Power &&
      e !== ItemDefines_1.EItemId.OverPower &&
      10800 !== e) ||
      ((e = ModelManager_1.ModelManager.PowerModel.GetPowerDataById(
        ItemDefines_1.EItemId.Power,
      )),
      this.PYt(e.GetFullRecoverText(), e.GetNextTimerRecoverText()));
  }
  PQs() {
    var e = ModelManager_1.ModelManager.PowerModel.GetPowerDataById(
      ItemDefines_1.EItemId.Power,
    );
    this.GetItem(15).SetUIActive(e.CheckPowerIfMax());
  }
}
exports.PowerView = PowerView;
//# sourceMappingURL=PowerView.js.map
