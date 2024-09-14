"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PopupCaptionItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  CommonCurrencyItemListComponent_1 = require("../../Module/Common/CommonCurrencyItemListComponent"),
  LguiUtil_1 = require("../../Module/Util/LguiUtil"),
  UiPanelBase_1 = require("../Base/UiPanelBase"),
  PopupCaptionToggleItem_1 = require("./PopupCaptionToggleItem");
class PopupCaptionItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.ucr = void 0),
      (this.S1a = void 0),
      (this.OnClickCloseBtnCall = () => {}),
      (this.OnClickHelpBtnCall = () => {}),
      (this.Jvt = () => {
        this.OnClickCloseBtnCall && this.OnClickCloseBtnCall();
      }),
      (this.pcr = () => {
        this.OnClickHelpBtnCall && this.OnClickHelpBtnCall();
      }),
      void 0 !== t && this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [3, this.Jvt],
        [2, this.pcr],
      ]);
  }
  SetCloseBtnActive(t) {
    this.GetButton(3).RootUIComp.SetUIActive(t);
  }
  SetHelpBtnActive(t) {
    this.GetButton(2).RootUIComp.SetUIActive(t);
  }
  SetCloseCallBack(t) {
    this.OnClickCloseBtnCall = t;
  }
  SetHelpCallBack(t) {
    this.OnClickHelpBtnCall = t;
  }
  SetCloseBtnRaycast(t) {
    this.GetButton(3).RootUIComp.SetRaycastTarget(t);
  }
  SetCloseBtnShowState(t) {
    this.GetButton(3).RootUIComp.SetUIActive(t);
  }
  SetTitle(t) {
    this.GetText(1).SetText(t);
  }
  SetTitleByTextIdAndArg(t, ...e) {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), t, e);
  }
  SetTitleByTextIdAndArgNew(t, ...e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t, e);
  }
  SetTitleByTitleData(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.TextId, t.Args);
  }
  SetTitleLocalText(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t);
  }
  async SetTitleIconByResourceId(t) {
    t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    await this.SetSpriteAsync(t, this.GetSprite(0), !1);
  }
  SetTitleIcon(t) {
    this.SetSpriteByPath(t, this.GetSprite(0), !1);
  }
  SetTitleTextActive(t) {
    this.GetText(1).SetUIActive(t);
  }
  SetTitleIconVisible(t) {
    this.GetSprite(0).SetUIActive(t);
  }
  SetCurrencyItemVisible(t) {
    this.GetItem(4).SetUIActive(t);
  }
  async SetCurrencyItemList(t) {
    this.ucr ||
      (this.ucr =
        new CommonCurrencyItemListComponent_1.CommonCurrencyItemListComponent(
          this.GetItem(4),
        )),
      await this.ucr.SetCurrencyItemList(t);
  }
  GetCurrencyItemList() {
    return this.ucr?.GetCurrencyItemList();
  }
  async CreateToggleTab(t) {
    (this.S1a = new PopupCaptionToggleItem_1.PopupCaptionToggleItem()),
      await this.S1a.CreateByResourceIdAsync("TogTabCName", this.GetItem(5)),
      this.S1a.SetClickToggleCallback(t);
  }
  SetToggleName(t) {
    this.S1a?.SetNameText(t);
  }
  SetToggleVisible(t) {
    this.S1a?.SetUiActive(t);
  }
  GetToggleState() {
    return void 0 === this.S1a ? 0 : this.S1a.GetToggleState();
  }
  GetCostContent() {
    return this.GetItem(4);
  }
}
exports.PopupCaptionItem = PopupCaptionItem;
//# sourceMappingURL=PopupCaptionItem.js.map
