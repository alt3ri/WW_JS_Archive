"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TabComponentWithCaptionItem = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  LevelSequencePlayer_1 = require("../LevelSequencePlayer"),
  TabComponent_1 = require("./TabComponent"),
  CommonTabItemBase_1 = require("./TabItem/CommonTabItemBase");
class TabComponentWithCaptionItem extends UiPanelBase_1.UiPanelBase {
  constructor(t, e, i) {
    super(),
      (this.lqe = void 0),
      (this.Gbt = void 0),
      (this.xqe = void 0),
      (this.$pt = void 0),
      (this.NeedCaptionSwitchWithToggle = !0),
      (this.R6e = (t, e) => {
        return this.Nbt.ProxyCreate(t, e);
      }),
      (this.pqe = (t) => {
        var e = this.Nbt.GetCommonData(t);
        e &&
          this.NeedCaptionSwitchWithToggle &&
          (this.lqe.SetTitleByTitleData(e.GetTitleData()),
          this.lqe.SetTitleIcon(e.GetSmallIcon())),
          this.Nbt.ToggleCallBack(t);
      }),
      (this.Nbt = e),
      (this.Obt = i),
      this.CreateThenShowByActor(t.GetOwner());
  }
  get TabComponent() {
    return this.Gbt;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this.Obt),
      (this.xqe = this.GetScrollViewWithScrollbar(1)),
      (this.Gbt = new TabComponent_1.TabComponent(
        this.xqe.Content.GetUIItem(),
        this.R6e,
        this.pqe,
        void 0,
      )),
      (this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.GetRootItem(),
      ));
  }
  SetCloseCallBack(t) {
    this.Obt = t;
  }
  RefreshTabItem(t, e) {
    this.TabComponent.RefreshTabItem(t, e);
  }
  async RefreshTabItemAsync(t, e = !0) {
    await this.TabComponent.RefreshTabItemAsync(t, e);
  }
  RefreshTabItemByLength(t, e) {
    t = this.CreateTabItemDataByLength(t);
    this.RefreshTabItem(t, e);
  }
  async RefreshTabItemByLengthAsync(t) {
    t = this.CreateTabItemDataByLength(t);
    await this.RefreshTabItemAsync(t);
  }
  async CreatePopupToggleTab(t) {
    await this.lqe.CreateToggleTab(t);
  }
  GetCaptionToggleState() {
    return this.lqe.GetToggleState();
  }
  SetPopupToggleName(t) {
    this.lqe?.SetToggleName(t);
  }
  SetPopupToggleVisible(t) {
    this.lqe?.SetToggleVisible(t);
  }
  CreateTabItemDataByLength(e) {
    var i = new Array();
    for (let t = 0; t < e; t++) {
      var s = new CommonTabItemBase_1.CommonTabItemData();
      (s.Index = t), (s.Data = this.Nbt.GetCommonData(t)), i.push(s);
    }
    return i;
  }
  SelectToggleByIndex(t, e = !1) {
    this.TabComponent.SelectToggleByIndex(t, e);
  }
  ShowItem() {
    this.$pt.PlayLevelSequenceByName("Start", !0);
  }
  async ShowItemAsync() {
    var t = new CustomPromise_1.CustomPromise();
    await this.$pt.PlaySequenceAsync("Start", t, !0);
  }
  HideItem() {
    this.$pt.PlayLevelSequenceByName("Close", !0);
  }
  GetSelectedIndex() {
    return this.TabComponent.GetSelectedIndex();
  }
  ScrollToToggleByIndex(t) {
    t = this.TabComponent.GetTabItemByIndex(t);
    this.xqe.ScrollTo(t.GetRootItem());
  }
  GetTabItemByIndex(t) {
    return this.TabComponent.GetTabItemByIndex(t);
  }
  GetTabItemMap() {
    return this.TabComponent.GetTabItemMap();
  }
  GetTabComponent() {
    return this.TabComponent;
  }
  SetCanChange(t) {
    this.TabComponent.SetCanChange(t);
  }
  SetTabRootActive(t) {
    this.GetItem(2).SetUIActive(t);
  }
  SetRootActive(t) {
    this.GetItem(2).SetUIActive(t), this.lqe?.SetUiActive(t);
  }
  async SetCurrencyItemList(t) {
    await this.lqe.SetCurrencyItemList(t);
  }
  GetCurrencyItemList() {
    return this.lqe.GetCurrencyItemList();
  }
  SetHelpButtonShowState(t) {
    this.lqe.SetHelpBtnActive(t);
  }
  SetHelpButtonCallBack(t) {
    this.lqe.SetHelpCallBack(t);
  }
  SetCloseBtnRaycast(t) {
    this.lqe.SetCloseBtnRaycast(t);
  }
  SetCloseBtnShowState(t) {
    this.lqe.SetCloseBtnShowState(t);
  }
  OnBeforeDestroy() {
    this.Gbt && (this.Gbt.Destroy(), (this.Gbt = void 0)),
      this.lqe && (this.lqe.Destroy(), (this.lqe = void 0));
  }
  SetTitle(t) {
    this.lqe?.SetTitle(t);
  }
  SetTitleByTextIdAndArgNew(t, ...e) {
    this.lqe?.SetTitleByTextIdAndArgNew(t, e);
  }
  SetTitleIcon(t) {
    this.lqe.SetTitleIcon(t);
  }
  SetTitleIconVisible(t) {
    this.lqe?.SetTitleIconVisible(t);
  }
  SetScrollViewVisible(t) {
    this.GetScrollViewWithScrollbar(1).RootUIComp.SetUIActive(t);
  }
  DestroyOverride() {
    return !0;
  }
}
exports.TabComponentWithCaptionItem = TabComponentWithCaptionItem;
//# sourceMappingURL=TabComponentWithCaptionItem.js.map
