"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonExchangeView = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  CommonCurrencyItem_1 = require("../../Common/CommonCurrencyItem"),
  NumberSelectComponent_1 = require("../../Common/NumberSelect/NumberSelectComponent"),
  ItemDefines_1 = require("../../Item/Data/ItemDefines"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ItemExchangeDefine_1 = require("../ItemExchangeDefine");
class CommonExchangeView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.WGe = void 0),
      (this.fqt = void 0),
      (this.yQs = void 0),
      (this.KGe = (e) => {
        var t =
          ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
            "ExChangeCount",
          );
        return new LguiUtil_1.TableTextArgNew(t, e);
      }),
      (this.QGe = (e) => {
        this.bl(e);
      }),
      (this.Pgi = () => {
        this.CloseMe();
      }),
      (this.SetMaxValue = () => {
        this.WGe.SelectMax();
      }),
      (this.m8t = () => {
        var e,
          t = this.xgi();
        t?.ConfirmCallBack &&
          ((e = this.WGe.GetSelectNumber()),
          t?.ConfirmCallBack(t.GetDestItemId(), e)),
          t.ConfirmNoClose || this.CloseMe();
      }),
      (this.wgi = () => {
        var e = this.xgi()?.CancelCallBack;
        e && e(), this.CloseMe();
      });
  }
  xgi() {
    return this.OpenParam.ExchangeData;
  }
  Bgi() {
    return this.xgi().GetDestItemId();
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UITexture],
      [3, UE.UIText],
      [4, UE.UIText],
      [6, UE.UIText],
      [5, UE.UITexture],
      [7, UE.UIButtonComponent],
      [8, UE.UIButtonComponent],
      [9, UE.UIInteractionGroup],
      [10, UE.UIInteractionGroup],
      [11, UE.UIText],
      [12, UE.UIText],
      [13, UE.UIItem],
      [14, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [7, this.wgi],
        [8, this.m8t],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.yQs = this.OpenParam),
      this.xgi().ShowPayGold &&
        ((this.fqt = new CommonCurrencyItem_1.CommonCurrencyItem()),
        await this.fqt.CreateThenShowByResourceIdAsync(
          "UIItem_CommonCurrencyItem",
        ));
  }
  OnStart() {
    this.ChildPopView?.PopItem.OverrideBackBtnCallBack(this.wgi);
    var e = this.xgi();
    LguiUtil_1.LguiUtil.SetLocalText(
      this.GetText(0),
      ItemExchangeDefine_1.EXCHANGE_TITLE,
      e.GetDestName(),
    ),
      this.SetItemIcon(this.GetTexture(1), e.GetSrcItemId()),
      this.SetItemIcon(this.GetTexture(2), e.GetDestItemId()),
      this.SetItemIcon(this.GetTexture(5), e.GetSrcItemId()),
      this.rNe(),
      0 < this.yQs.StartSliderValue &&
        this.WGe?.ChangeValue(this.yQs.StartSliderValue),
      this.bgi();
  }
  OnBeforeShow() {
    var e;
    this.xgi().ShowPayGold &&
      (this.fqt
        ?.GetRootItem()
        .SetUIParent(this.ChildPopView?.PopItem?.GetCostParent()),
      (e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerMoney(
        ItemDefines_1.EItemId.PayGold,
      )),
      this.fqt.RefreshTemp(ItemDefines_1.EItemId.PayGold, e.toString()),
      this.fqt.RefreshAddButtonActive(),
      this.fqt.SetBeforeButtonFunction(this.Pgi),
      this.fqt.SetToPayShopFunction()),
      this.ChildPopView?.PopItem.SetCurrencyItemList(this.yQs.ShowCurrencyList);
  }
  rNe() {
    (this.WGe = new NumberSelectComponent_1.NumberSelectComponent(
      this.GetItem(13),
    )),
      this.WGe.SetLimitMaxValueForce(ItemExchangeDefine_1.EXCHANGE_MAX_COUNT);
    var e = this.yQs.MaxExchangeTime,
      t = {
        MaxNumber: e,
        GetExchangeTableText: this.KGe,
        ValueChangeFunction: this.QGe,
      };
    this.WGe.Init(t),
      this.WGe.SetMaxBtnShowState(!0),
      this.WGe.SetAddReduceButtonActive(!0),
      this.WGe.SetAddReduceButtonInteractive(1 < e);
  }
  bgi() {
    var e = this.yQs.MaxExchangeTime;
    this.GetInteractionGroup(10).SetInteractable(0 < e);
  }
  bl(e) {
    var t = this.xgi(),
      i = this.Bgi(),
      s = this.yQs.GetConsumeCount(i, e),
      i =
        (this.GetText(3).SetText(t.GetSrcName()),
        LguiUtil_1.LguiUtil.SetLocalText(
          this.GetText(11),
          ItemExchangeDefine_1.EXCHANGE_COUNT_DESCRIBE2,
          s,
        ),
        this.yQs.GetGainCount(i, e)),
      t =
        (this.GetText(4).SetText(t.GetDestName()),
        LguiUtil_1.LguiUtil.SetLocalText(
          this.GetText(12),
          ItemExchangeDefine_1.EXCHANGE_COUNT_DESCRIBE2,
          i,
        ),
        this.GetText(6)),
      i = this.yQs.GetConsumeTotalCount(s, e),
      s = (t.SetText(i.toString()), this.yQs.OwnSrcItemNum);
    t.SetChangeColor(s < i, t.changeColor), this.GetItem(14).SetUIActive(s < i);
  }
  OnBeforeDestroy() {
    this.fqt?.Destroy();
  }
}
exports.CommonExchangeView = CommonExchangeView;
//# sourceMappingURL=CommonExchangeView.js.map
