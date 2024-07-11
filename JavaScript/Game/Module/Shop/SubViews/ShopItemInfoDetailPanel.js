"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShopItemInfoDetailPanel = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  AttributeItem_1 = require("../../Common/AttributeItem"),
  NumberSelectComponent_1 = require("../../Common/NumberSelect/NumberSelectComponent"),
  CommonTipsComponentsUtil_1 = require("../../Common/Tips/CommonTipsComponentsUtil"),
  TipsWeaponItem_1 = require("../../Common/Tips/TipsWeaponItem"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  soldOutColor = UE.Color.FromHex("FFFFFFFF"),
  coinNotEnoughColor = UE.Color.FromHex("9D2437FF"),
  SECONDS_PER_DAY = 86400;
class ShopItemInfoDetailPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Dvo = void 0),
      (this.CommonTipsData = void 0),
      (this.t6 = 0),
      (this.Rvo = void 0),
      (this.AttributeVertical = void 0),
      (this.Uvo = void 0),
      (this.Avo = void 0),
      (this.WGe = void 0),
      (this.n3i = 0),
      (this.QGe = (t) => {
        this.s3i = t;
      }),
      (this.hPe = () => new AttributeItem_1.AttributeItem()),
      (this.lut = (t, i) => {
        "CloseEvent" === i
          ? this.SetActive(!1)
          : "SleEvent" === i &&
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.CloseItemInfo,
            );
      }),
      (this.Pvo = () => {
        var t, i;
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          this.Dvo.CurrencyId,
        ) <
        this.Dvo.SingleBuyPrice * this.t6
          ? ((i = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
              "ShopResourceNotEnough",
            )),
            (t =
              ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
                this.Dvo.CurrencyId,
              )),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnSubmitItemFail,
            ),
            t &&
              ((t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                t.Name,
              )),
              (i = StringUtils_1.StringUtils.Format(i, t)),
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
                i,
              )))
          : this.Dvo.BuySuccessFunction(
              this.Dvo.ItemId,
              this.s3i,
              this.Dvo.CurrencyId,
              this.Dvo.ParamData,
            );
      }),
      (this.xvo = () => {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          this.Dvo.CurrencyId,
        );
      });
  }
  get s3i() {
    return this.t6;
  }
  set s3i(t) {
    this.t6 = Math.max(1, Math.min(t, this.n3i));
    var t =
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          this.Dvo.CurrencyId,
        ) >=
        this.Dvo.SingleBuyPrice * this.t6,
      i = this.GetText(6),
      t =
        (i.SetColor(t ? this.Avo : coinNotEnoughColor),
        i.SetText("" + this.Dvo.SingleBuyPrice * this.t6),
        ModelManager_1.ModelManager.ShopModel.OpenItemInfo);
    this.GetText(23).SetText(`<s>${t.GetOriginalPrice() * this.t6}</s>`),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(27),
        "Text_ItemSelectShopQuantityTip_text",
        this.t6,
      );
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UITexture],
      [6, UE.UIText],
      [7, UE.UIButtonComponent],
      [9, UE.UIItem],
      [8, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIText],
      [14, UE.UIItem],
      [15, UE.UIButtonComponent],
      [16, UE.UIText],
      [17, UE.UIItem],
      [18, UE.UIText],
      [19, UE.UIItem],
      [20, UE.UIVerticalLayout],
      [21, UE.UIScrollViewWithScrollbarComponent],
      [22, UE.UIItem],
      [23, UE.UIText],
      [24, UE.UIItem],
      [25, UE.UIText],
      [26, UE.UIItem],
      [27, UE.UIText],
      [28, UE.UIItem],
      [29, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [7, this.Pvo],
        [15, this.xvo],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.Rvo = new TipsWeaponItem_1.TipsWeaponItem()),
      await this.Rvo.CreateThenShowByActorAsync(this.GetItem(17).GetOwner());
  }
  OnStart() {
    this.RootActor.OnSequencePlayEvent.Bind(this.lut),
      (this.Avo = this.GetText(6).GetColor()),
      (this.AttributeVertical = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(20),
        this.hPe,
      )),
      this.GetButton(15)?.RootUIComp.SetUIActive(!0);
    var t = this.GetItem(10);
    (this.WGe = new NumberSelectComponent_1.NumberSelectComponent(t)),
      this.WGe.SetNumberSelectTipsVisible(!1),
      (this.Uvo = this.GetButton(7)
        .GetOwner()
        .GetComponentByClass(UE.UIInteractionGroup.StaticClass())),
      this.GetItem(28).SetUIActive(!1),
      this.GetItem(29).SetUIActive(!1);
  }
  jlo() {
    this.AttributeVertical.RefreshByData(this.CommonTipsData.AttributeList);
  }
  OnBeforeDestroy() {
    this.RootActor.OnSequencePlayEvent.Unbind(),
      this.Rvo && (this.Rvo.Destroy(), (this.Rvo = void 0));
  }
  UpdatePanel(t) {
    (this.Dvo = t || this.Dvo),
      (this.CommonTipsData =
        CommonTipsComponentsUtil_1.CommonTipsComponentUtil.GetTipsDataByItemId(
          t.ItemId,
        )),
      (this.n3i = this.GetMaxCanBuyCount()),
      (this.s3i = 1);
    var i = { MaxNumber: this.n3i, ValueChangeFunction: this.QGe },
      i =
        (this.WGe.Init(i),
        this.WGe.SetAddReduceButtonActive(!0),
        this.WGe.SetAddReduceButtonInteractive(this.n3i >= this.s3i),
        this.WGe.SetReduceButtonInteractive(1 < this.s3i),
        ModelManager_1.ModelManager.ShopModel.OpenItemInfo),
      e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
        t.ItemId,
        !0,
      ),
      s =
        (LguiUtil_1.LguiUtil.SetLocalText(
          this.GetText(0),
          "GoodsName",
          new LguiUtil_1.TableTextArgNew(e.Name),
          i.StackSize,
        ),
        e.AttributesDescription),
      s = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(s),
      h = e.TypeDescription,
      h = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(h),
      s = s.replace(/<.*?>/g, ""),
      h = this.CommonTipsData?.Type ?? h,
      h =
        (this.GetText(1).SetText(h),
        this.GetText(2).SetText(s),
        this.SetItemIcon(this.GetTexture(5), t.CurrencyId),
        6e4 === e.ItemType || 60002 === e.ItemType || 60003 === e.ItemType),
      h =
        (this.GetText(16).SetUIActive(!h),
        h ||
          ((s =
            ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
              t.ItemId,
            )),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(16),
            "Text_Have_Text",
            s,
          )),
        this.GetText(23).SetText(`<s>${i.GetOriginalPrice() * this.s3i}</s>`),
        this.GetText(23).SetUIActive(-1 !== i.GetOriginalPrice()),
        this.GetItem(24).SetUIActive(0 !== i.EndTime),
        0 !== i.EndTime &&
          ((e = i.EndTime - TimeUtil_1.TimeUtil.GetServerTime()),
          0 < (h = Math.trunc(e / SECONDS_PER_DAY))
            ? LguiUtil_1.LguiUtil.SetLocalText(
                this.GetText(25),
                "ShopItemLimitTime1",
                h,
              )
            : 0 === h
              ? ((s = Math.trunc(e / 3600)),
                (i = Math.trunc(e / 60) % 60),
                LguiUtil_1.LguiUtil.SetLocalText(
                  this.GetText(25),
                  "ShopItemLimitTime2",
                  s,
                  i,
                ))
              : LguiUtil_1.LguiUtil.SetLocalText(
                  this.GetText(25),
                  "ShopItemLimitTimeOut",
                )),
        this.UpdateLockState(t),
        this.Uvo.SetInteractable(!0),
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
          t.ItemId,
        ));
    this.UpdateItemTips(h);
  }
  GetMaxCanBuyCount() {
    var t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
        this.Dvo.CurrencyId,
      ),
      t = Math.trunc(t / this.Dvo.SingleBuyPrice);
    return 0 < this.Dvo.BuyLimit
      ? Math.min(this.Dvo.BuyLimit - this.Dvo.BoughtCount, t)
      : t;
  }
  UpdateItemTips(t) {
    this.CloseUiItem(),
      2 === t
        ? (this.SetWeaponTips(), this.jlo())
        : this.GetItem(22).SetUIActive(!0);
    var i = this.GetText(18);
    this.CommonTipsData?.LevelText
      ? (i.SetUIActive(!0), 2 !== t && i.SetText(this.CommonTipsData.LevelText))
      : i.SetUIActive(!1);
  }
  CloseUiItem() {
    this.GetVerticalLayout(20).GetRootComponent().SetUIActive(!1),
      this.GetItem(17).SetUIActive(!1);
  }
  UpdateLockState(t) {
    var i = t.IsInteractive();
    this.GetItem(9).SetUIActive(i),
      this.GetItem(10).SetUIActive(i),
      this.GetItem(11).SetUIActive(t.IsLock || t.IsSoldOut()),
      this.GetItem(12).SetUIActive(t.IsLock),
      this.GetItem(8).SetUIActive(!1),
      t.IsLock
        ? "number" == typeof t.LockText
          ? 0 < t.LockText &&
            LguiUtil_1.LguiUtil.SetLocalText(
              this.GetText(13),
              "ShopFixed",
              t.LockText,
            )
          : LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), t.LockText)
        : t.IsSoldOut()
          ? (this.GetItem(11).SetColor(soldOutColor),
            LguiUtil_1.LguiUtil.SetLocalText(
              this.GetText(13),
              "ShopItemSoldOut",
            ),
            this.GetItem(14).SetUIActive(!0),
            this.GetItem(26).SetUIActive(!1))
          : (this.GetItem(26).SetUIActive(!0),
            0 < t.BuyLimit &&
              (this.GetItem(8).SetUIActive(!0),
              LguiUtil_1.LguiUtil.SetLocalText(
                this.GetText(4),
                "ShopItemLimitCount",
                t.BuyLimit - t.BoughtCount,
                t.BuyLimit,
              )));
  }
  SetWeaponTips() {
    this.GetItem(17).SetUIActive(!0);
    this.GetVerticalLayout(20).GetRootComponent().SetUIActive(!0);
    var t = this.CommonTipsData,
      i = t.ConfigId,
      i = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(i),
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.BgDescription);
    this.Rvo.UpdateItem(i, t.ResonanceLevel, e);
  }
  GetParams() {
    return this.Dvo?.ParamData;
  }
}
exports.ShopItemInfoDetailPanel = ShopItemInfoDetailPanel;
//# sourceMappingURL=ShopItemInfoDetailPanel.js.map
