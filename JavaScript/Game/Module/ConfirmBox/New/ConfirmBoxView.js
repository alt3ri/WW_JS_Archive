"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConfirmBoxView = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  CommonCurrencyItem_1 = require("../../Common/CommonCurrencyItem"),
  CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
  ItemDefines_1 = require("../../Item/Data/ItemDefines"),
  PowerController_1 = require("../../Power/PowerController"),
  GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
  ConfirmBoxButton_1 = require("./ConfirmBoxButton");
class ConfirmBoxView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.ButtonList = []),
      (this.PropScrollView = void 0),
      (this.Config = void 0),
      (this.ConfirmBoxData = void 0),
      (this.SelectedIndex = -1),
      (this.ButtonComponentList = new Array()),
      (this.dbt = void 0),
      (this.Cbt = () => {
        var t, i;
        this.dbt &&
          ((t = ModelManager_1.ModelManager.PowerModel.PowerCount),
          (i =
            ConfigManager_1.ConfigManager.PowerConfig.GetPowerNaturalLimit()),
          this.dbt.RefreshTemp(ItemDefines_1.EItemId.Power, t + "/" + i));
      }),
      (this.OnClose = () => {
        this.ConfirmBoxButtonClick();
      }),
      (this.JGe = (t, i, e) => {
        var s = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
        return (
          s.Initialize(i.GetOwner()),
          s.RefreshByConfigId(t[0], t[1]),
          { Key: e, Value: s }
        );
      }),
      (this.ToggleFunction = void 0),
      (this.x4e = (t) => {
        this.ToggleFunction && this.ToggleFunction(t);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIScrollViewWithScrollbarComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
      [6, UE.UIExtendToggle],
      [7, UE.UIText],
      [8, UE.UIItem],
      [9, UE.UIText],
    ]),
      (this.BtnBindInfo = [[6, this.x4e]]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnPowerChanged,
      this.Cbt,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnPowerChanged,
      this.Cbt,
    );
  }
  ConfirmBoxButtonClick() {
    this.CloseMe(this.ConfirmBoxData.GetCloseFunction());
  }
  gbt() {
    -1 === this.SelectedIndex &&
      (1 === this.Config.ButtonText.length ||
      this.ConfirmBoxData.IsEscViewTriggerCallBack
        ? (this.SelectedIndex = 1)
        : (this.SelectedIndex = 0));
  }
  async OnBeforeStartAsync() {
    this.ButtonComponentList.push(this.GetButton(4)),
      this.ButtonComponentList.push(this.GetButton(5)),
      (this.PropScrollView = new GenericScrollView_1.GenericScrollView(
        this.GetScrollViewWithScrollbar(3),
        this.JGe,
      ));
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
    this.GetText(0).SetText(i);
    let e = ConfigManager_1.ConfigManager.ConfirmBoxConfig.GetContent(
      this.Config.Content,
    );
    t.TextArgs && (e = StringUtils_1.StringUtils.Format(e, ...t.TextArgs)),
      this.GetText(1).SetText(e),
      this.GetItem(8).SetUIActive(!StringUtils_1.StringUtils.IsEmpty(t.Tip)),
      t.Tip && this.GetText(9).SetText(t.Tip),
      await this.InitButton(),
      this.InitPropItem(),
      this.fbt(),
      this.ConfirmBoxData.ShowPowerItem &&
        ((this.dbt = new CommonCurrencyItem_1.CommonCurrencyItem()),
        await this.dbt.CreateThenShowByResourceIdAsync(
          "UIItem_CommonCurrencyItem",
        ));
  }
  OnStart() {
    var t = this.OpenParam.AttachView?.GetRootItem();
    t &&
      this.ChildPopView.GetPopViewOriginalActor()
        .GetComponentByClass(UE.UIItem.StaticClass())
        .SetUIParent(t);
  }
  OnBeforeShow() {
    var t, i;
    this.ChildPopView?.SetBackBtnShowState(this.Config.NeedClose),
      this.ChildPopView?.PopItem.SetMaskResponsibleState(
        this.Config.NeedMaskClose,
      ),
      this.ChildPopView?.PopItem.OverrideBackBtnCallBack(this.OnClose),
      this.ConfirmBoxData.ShowPowerItem &&
        (this.dbt
          ?.GetRootItem()
          .SetUIParent(this.ChildPopView?.PopItem?.GetCostParent()),
        (t = ModelManager_1.ModelManager.PowerModel.PowerCount),
        (i = ConfigManager_1.ConfigManager.PowerConfig.GetPowerNaturalLimit()),
        this.dbt.RefreshTemp(ItemDefines_1.EItemId.Power, t + "/" + i),
        this.dbt?.SetButtonFunction(() => {
          PowerController_1.PowerController.OpenPowerView();
        }));
  }
  OnAfterShow() {
    this.ConfirmBoxData.GetAfterShowFunction()?.();
  }
  OnBeforePlayCloseSequence() {
    this.ConfirmBoxData?.BeforePlayCloseFunction?.();
  }
  async InitButton() {
    var t = this.GetItem(2),
      i = this.Config.ButtonText.length;
    if ((t.SetUIActive(0 < i), 0 !== i)) {
      var e = [];
      for (let t = 0, i = this.ButtonComponentList.length; t < i; ++t) {
        var s = this.ButtonComponentList[t];
        e.push(
          this.k2e(s.RootUIComp, t, () => {
            (this.SelectedIndex = t + 1), this.ConfirmBoxButtonClick();
          }),
        );
      }
      this.ButtonList = await Promise.all(e);
    }
  }
  async k2e(t, i, e) {
    var s = new ConfirmBoxButton_1.ConfirmBoxButton();
    return (
      await s.CreateByActorAsync(t.GetOwner()),
      this.Config.ButtonText.length > i &&
        (s.SetClickFunction(e),
        i + 1 === this.Config.DelayButtonIndex && 0 < this.Config.DelayTime
          ? s.SetTimer(
              this.Config.ButtonText[i],
              this.Config.DelayTime,
              this.ConfirmBoxData.CanClickDuringTimer,
            )
          : s.SetText(this.Config.ButtonText[i])),
      this.ConfirmBoxData.InteractionMap.has(i) &&
        ((t = this.ConfirmBoxData.InteractionMap.get(i)), s.SetBtnCanClick(t)),
      this.Config.ButtonText.length >= i + 1 && (await s.ShowAsync()),
      s
    );
  }
  uBt() {
    for (let t = 0, i = this.ButtonList.length; t < i; ++t)
      this.ButtonList[t].Destroy();
    this.ButtonList = [];
  }
  InitPropItem() {
    var t = this.GetScrollViewWithScrollbar(3),
      i = this.ConfirmBoxData.ItemIdMap.size;
    if ((t.RootUIComp.SetUIActive(0 < i), 0 !== i)) {
      const e = [];
      this.ConfirmBoxData.ItemIdMap.forEach((t, i) => {
        e.push([i, t]);
      }),
        this.PropScrollView.RefreshByData(e);
    }
  }
  fbt() {
    var t = this.OpenParam;
    this.GetExtendToggle(6).RootUIComp.SetUIActive(t.HasToggle),
      (this.ToggleFunction = void 0),
      t.HasToggle &&
        (this.GetText(7).SetText(t.ToggleText),
        (this.ToggleFunction = t.GetToggleFunction()));
  }
  OnBeforeDestroy() {
    this.uBt(), this.PropScrollView?.ClearChildren(), this.gbt();
    var t = this.ConfirmBoxData?.FunctionMap.get(this.SelectedIndex);
    t && t(), this.ConfirmBoxData?.DestroyFunction?.();
  }
}
exports.ConfirmBoxView = ConfirmBoxView;
//# sourceMappingURL=ConfirmBoxView.js.map
