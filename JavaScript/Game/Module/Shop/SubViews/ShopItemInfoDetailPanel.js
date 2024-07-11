"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShopItemInfoDetailPanel = void 0);
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const AttributeItem_1 = require("../../Common/AttributeItem");
const NumberSelectComponent_1 = require("../../Common/NumberSelect/NumberSelectComponent");
const CommonTipsComponentsUtil_1 = require("../../Common/Tips/CommonTipsComponentsUtil");
const TipsWeaponItem_1 = require("../../Common/Tips/TipsWeaponItem");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const soldOutColor = UE.Color.FromHex("FFFFFFFF");
const coinNotEnoughColor = UE.Color.FromHex("9D2437FF");
const SECONDS_PER_DAY = 86400;
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
        i === "CloseEvent"
          ? this.SetActive(!1)
          : i === "SleEvent" &&
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.CloseItemInfo,
            );
      }),
      (this.Pvo = () => {
        let t, i;
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
      this.Dvo.SingleBuyPrice * this.t6;
    const i = this.GetText(6);
    var t =
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
    const t = this.GetItem(10);
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
    var i = { MaxNumber: this.n3i, ValueChangeFunction: this.QGe };
    var i =
      (this.WGe.Init(i),
      this.WGe.SetAddReduceButtonActive(!0),
      this.WGe.SetAddReduceButtonInteractive(this.n3i >= this.s3i),
      this.WGe.SetReduceButtonInteractive(this.s3i > 1),
      ModelManager_1.ModelManager.ShopModel.OpenItemInfo);
    let e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
      t.ItemId,
      !0,
    );
    var s =
      (LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(0),
        "GoodsName",
        new LguiUtil_1.TableTextArgNew(e.Name),
        i.StackSize,
      ),
      e.AttributesDescription);
    var s = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(s);
    var h = e.TypeDescription;
    var h = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(h);
    var s = s.replace(/<.*?>/g, "");
    var h = this.CommonTipsData?.Type ?? h;
    var h =
      (this.GetText(1).SetText(h),
      this.GetText(2).SetText(s),
      this.SetItemIcon(this.GetTexture(5), t.CurrencyId),
      e.ItemType === 6e4 || e.ItemType === 60002 || e.ItemType === 60003);
    var h =
      (this.GetText(16).SetUIActive(!h),
      h ||
        ((s = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          t.ItemId,
        )),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(16),
          "Text_Have_Text",
          s,
        )),
      this.GetText(23).SetText(`<s>${i.GetOriginalPrice() * this.s3i}</s>`),
      this.GetText(23).SetUIActive(i.GetOriginalPrice() !== -1),
      this.GetItem(24).SetUIActive(i.EndTime !== 0),
      i.EndTime !== 0 &&
        ((e = i.EndTime - TimeUtil_1.TimeUtil.GetServerTime()),
        (h = Math.trunc(e / SECONDS_PER_DAY)) > 0
          ? LguiUtil_1.LguiUtil.SetLocalText(
              this.GetText(25),
              "ShopItemLimitTime1",
              h,
            )
          : h === 0
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
    );
    var t = Math.trunc(t / this.Dvo.SingleBuyPrice);
    return this.Dvo.BuyLimit > 0
      ? Math.min(this.Dvo.BuyLimit - this.Dvo.BoughtCount, t)
      : t;
  }
  UpdateItemTips(t) {
    this.CloseUiItem(),
      t === 2
        ? (this.SetWeaponTips(), this.jlo())
        : this.GetItem(22).SetUIActive(!0);
    const i = this.GetText(18);
    this.CommonTipsData?.LevelText
      ? (i.SetUIActive(!0), t !== 2 && i.SetText(this.CommonTipsData.LevelText))
      : i.SetUIActive(!1);
  }
  CloseUiItem() {
    this.GetVerticalLayout(20).GetRootComponent().SetUIActive(!1),
      this.GetItem(17).SetUIActive(!1);
  }
  UpdateLockState(t) {
    const i = t.IsInteractive();
    this.GetItem(9).SetUIActive(i),
      this.GetItem(10).SetUIActive(i),
      this.GetItem(11).SetUIActive(t.IsLock || t.IsSoldOut()),
      this.GetItem(12).SetUIActive(t.IsLock),
      this.GetItem(8).SetUIActive(!1),
      t.IsLock
        ? typeof t.LockText === "number"
          ? t.LockText > 0 &&
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
            t.BuyLimit > 0 &&
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
    const t = this.CommonTipsData;
    var i = t.ConfigId;
    var i =
      ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(i);
    const e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
      t.BgDescription,
    );
    this.Rvo.UpdateItem(i, t.ResonanceLevel, e);
  }
  GetParams() {
    return this.Dvo?.ParamData;
  }
}
exports.ShopItemInfoDetailPanel = ShopItemInfoDetailPanel;
// # sourceMappingURL=ShopItemInfoDetailPanel.js.map
