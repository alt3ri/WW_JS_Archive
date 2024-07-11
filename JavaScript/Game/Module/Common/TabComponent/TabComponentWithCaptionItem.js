"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TabComponentWithCaptionItem = void 0);
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const LevelSequencePlayer_1 = require("../LevelSequencePlayer");
const TabComponent_1 = require("./TabComponent");
const CommonTabItemBase_1 = require("./TabItem/CommonTabItemBase");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
class TabComponentWithCaptionItem extends UiPanelBase_1.UiPanelBase {
  constructor(t, e, i) {
    super(),
      (this.lqe = void 0),
      (this.BBt = void 0),
      (this.xqe = void 0),
      (this.Gft = void 0),
      (this.NeedCaptionSwitchWithToggle = !0),
      (this.dVe = (t, e) => {
        return this.bBt.ProxyCreate(t, e);
      }),
      (this.pqe = (t) => {
        const e = this.bBt.GetCommonData(t);
        e &&
          this.NeedCaptionSwitchWithToggle &&
          (this.lqe.SetTitleByTitleData(e.GetTitleData()),
          this.lqe.SetTitleIcon(e.GetSmallIcon())),
          this.bBt.ToggleCallBack(t);
      }),
      (this.bBt = e),
      (this.qBt = i),
      this.CreateThenShowByActor(t.GetOwner());
  }
  get TabComponent() {
    return this.BBt;
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
      this.lqe.SetCloseCallBack(this.qBt),
      (this.xqe = this.GetScrollViewWithScrollbar(1)),
      (this.BBt = new TabComponent_1.TabComponent(
        this.xqe.ContentUIItem,
        this.dVe,
        this.pqe,
        void 0,
      )),
      (this.Gft = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.GetRootItem(),
      ));
  }
  SetCloseCallBack(t) {
    this.qBt = t;
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
  CreateTabItemDataByLength(e) {
    const i = new Array();
    for (let t = 0; t < e; t++) {
      const s = new CommonTabItemBase_1.CommonTabItemData();
      (s.Index = t), (s.Data = this.bBt.GetCommonData(t)), i.push(s);
    }
    return i;
  }
  SelectToggleByIndex(t, e = !1) {
    this.TabComponent.SelectToggleByIndex(t, e);
  }
  ShowItem() {
    this.Gft.PlayLevelSequenceByName("Start", !0);
  }
  async ShowItemAsync() {
    const t = new CustomPromise_1.CustomPromise();
    await this.Gft.PlaySequenceAsync("Start", t, !0);
  }
  HideItem() {
    this.Gft.PlayLevelSequenceByName("Close", !0);
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
    this.BBt && (this.BBt.Destroy(), (this.BBt = void 0)),
      this.lqe && (this.lqe.Destroy(), (this.lqe = void 0));
  }
  SetTitle(t) {
    this.lqe?.SetTitle(t);
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
// # sourceMappingURL=TabComponentWithCaptionItem.js.map
