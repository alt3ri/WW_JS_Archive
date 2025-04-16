"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsConfirmBoxView = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  ItemDefines_1 = require("../../Item/Data/ItemDefines"),
  PowerController_1 = require("../../Power/PowerController"),
  PowerCurrencyItem_1 = require("../../Power/SubViews/PowerCurrencyItem"),
  ConfirmBoxButton_1 = require("./ConfirmBoxButton");
class RacingBetsConfirmBoxView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.ButtonList = []),
      (this.Config = void 0),
      (this.ConfirmBoxData = void 0),
      (this.SelectedIndex = -1),
      (this.ButtonComponentList = new Array()),
      (this.NXs = void 0),
      (this.fea = void 0),
      (this.OnClose = () => {
        (this.SelectedIndex = -1), this.ConfirmBoxButtonClick();
      }),
      (this.lyt = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIButtonComponent],
      [7, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.lyt],
        [6, this.lyt],
      ]);
  }
  async OnBeforeStartAsync() {
    this.GetText(4).SetText(""),
      this.ButtonComponentList.push(this.GetButton(1)),
      this.ButtonComponentList.push(this.GetButton(2));
    var t = this.OpenParam,
      i =
        ((this.ConfirmBoxData = t),
        (this.Config =
          ConfigManager_1.ConfigManager.ConfirmBoxConfig.GetConfirmBoxConfig(
            t.ConfigId,
          )),
        StringUtils_1.StringUtils.IsBlank(t.GetTitle())
          ? ConfigManager_1.ConfigManager.ConfirmBoxConfig.GetTitle(
              this.Config.Title,
            )
          : t.GetTitle());
    this.GetText(5).SetText(i);
    let s = ConfigManager_1.ConfigManager.ConfirmBoxConfig.GetContent(
      this.Config.Content,
    );
    t.TextArgs && (s = StringUtils_1.StringUtils.Format(s, ...t.TextArgs)),
      this.GetText(3).SetText(s),
      await this.InitButton(),
      this.ConfirmBoxData.ShowPowerItem &&
        ((this.fea = new PowerCurrencyItem_1.PowerCurrencyItem()),
        await this.fea.CreateThenShowByResourceIdAsync(
          "UIItem_CommonCurrencyItem",
        ),
        this.fea.ShowWithoutText(ItemDefines_1.EItemId.OverPower),
        this.fea.RefreshAddButtonActive(),
        this.fea.SetActive(
          ModelManager_1.ModelManager.FunctionModel.IsOpen(10066),
        ),
        (this.NXs = new PowerCurrencyItem_1.PowerCurrencyItem()),
        await this.NXs.CreateThenShowByResourceIdAsync(
          "UIItem_CommonCurrencyItem",
        ));
  }
  OnStart() {
    var t = this.OpenParam.AttachView?.GetRootItem();
    t &&
      this.ChildPopView?.GetPopViewOriginalActor()
        .GetComponentByClass(UE.UIItem.StaticClass())
        ?.SetUIParent(t);
  }
  OnBeforeShow() {
    this.ChildPopView?.SetBackBtnShowState(this.Config.NeedClose),
      this.ChildPopView?.PopItem.SetMaskResponsibleState(
        this.Config.NeedMaskClose,
      ),
      this.ChildPopView?.PopItem.OverrideBackBtnCallBack(this.OnClose),
      this.ConfirmBoxData.ShowPowerItem &&
        (this.fea
          ?.GetOriginalItem()
          ?.SetUIParent(this.ChildPopView?.PopItem?.GetCostParent()),
        this.NXs?.GetOriginalItem()?.SetUIParent(
          this.ChildPopView?.PopItem?.GetCostParent(),
        ),
        this.NXs.ShowWithoutText(ItemDefines_1.EItemId.Power),
        this.NXs?.SetButtonFunction(() => {
          PowerController_1.PowerController.OpenPowerView();
        }));
  }
  OnAfterShow() {
    this.ConfirmBoxData.GetAfterShowFunction()?.();
  }
  OnBeforeHide() {
    this.LastHide && this.ConfirmBoxData?.BeforePlayCloseFunction?.();
  }
  OnBeforeDestroy() {
    this.dbt(), this.vqt();
    var t = this.ConfirmBoxData?.FunctionMap.get(this.SelectedIndex);
    t && t(),
      this.ConfirmBoxData?.DestroyFunction?.(),
      this.NXs?.Destroy(),
      this.fea?.Destroy();
  }
  ConfirmBoxButtonClick() {
    var t = this.ConfirmBoxData?.CanExecuteCloseFunc;
    t && !t(this.SelectedIndex)
      ? (t = this.ConfirmBoxData?.FunctionMap.get(this.SelectedIndex)) && t()
      : this.CloseMe(this.ConfirmBoxData.GetCloseFunction());
  }
  vqt() {
    -1 === this.SelectedIndex &&
      (1 === this.Config.ButtonText.length ||
      this.ConfirmBoxData.IsEscViewTriggerCallBack
        ? (this.SelectedIndex = 1)
        : (this.SelectedIndex = 0));
  }
  async InitButton() {
    var t = 0 < this.Config.ButtonText.length;
    if ((this.GetItem(7).SetUIActive(t), t)) {
      var s = [];
      for (let t = 0, i = this.ButtonComponentList.length; t < i; ++t) {
        var e = this.ButtonComponentList[t];
        s.push(
          this.i3e(e.RootUIComp, t, () => {
            (this.SelectedIndex = t + 1), this.ConfirmBoxButtonClick();
          }),
        );
      }
      this.ButtonList = await Promise.all(s);
    }
  }
  async i3e(t, i, s) {
    var e = new ConfirmBoxButton_1.ConfirmBoxButton();
    return (
      await e.CreateByActorAsync(t.GetOwner()),
      this.Config.ButtonText.length > i &&
        (e.SetClickFunction(s),
        i + 1 === this.Config.DelayButtonIndex && 0 < this.Config.DelayTime
          ? e.SetTimer(
              this.Config.ButtonText[i],
              this.Config.DelayTime,
              this.ConfirmBoxData.CanClickDuringTimer,
            )
          : ((t = this.ConfirmBoxData.GetBtnText(i)),
            StringUtils_1.StringUtils.IsBlank(t)
              ? e.SetTextById(this.Config.ButtonText[i])
              : e.SetText(t))),
      this.ConfirmBoxData.InteractionMap.has(i) &&
        ((s = this.ConfirmBoxData.InteractionMap.get(i)), e.SetBtnCanClick(s)),
      this.Config.ButtonText.length >= i + 1 && (await e.ShowAsync()),
      e
    );
  }
  dbt() {
    for (let t = 0, i = this.ButtonList.length; t < i; ++t)
      this.ButtonList[t].Destroy();
    this.ButtonList = [];
  }
}
exports.RacingBetsConfirmBoxView = RacingBetsConfirmBoxView;
//# sourceMappingURL=RacingBetsConfirmBoxView.js.map
