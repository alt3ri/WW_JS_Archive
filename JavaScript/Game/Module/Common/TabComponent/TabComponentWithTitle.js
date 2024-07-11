"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TabComponentWithTitle = void 0);
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const CommonTabTitle_1 = require("./CommonTabTitle");
const TabComponent_1 = require("./TabComponent");
const CommonTabItemBase_1 = require("./TabItem/CommonTabItemBase");
class TabComponentWithTitle extends UiPanelBase_1.UiPanelBase {
  constructor(t, e) {
    super(),
      (this.TabTitle = void 0),
      (this.cpt = void 0),
      (this.xqe = void 0),
      (this.pqe = (t) => {
        const e = this.bBt.GetCommonData(t);
        e &&
          (this.TabTitle.UpdateIcon(e.GetSmallIcon()),
          this.TabTitle.UpdateTitle(e.GetTitleData())),
          this.bBt.ToggleCallBack(t);
      }),
      (this.dVe = (t, e) => {
        return this.bBt.ProxyCreate(t, e);
      }),
      (this.bBt = e),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIScrollViewWithScrollbarComponent],
    ];
  }
  OnStart() {
    (this.xqe = this.GetScrollViewWithScrollbar(1)),
      (this.cpt = new TabComponent_1.TabComponent(
        this.xqe.ContentUIItem,
        this.dVe,
        this.pqe,
        void 0,
      )),
      (this.TabTitle = new CommonTabTitle_1.CommonTabTitle(this.GetItem(0)));
  }
  OnBeforeDestroy() {
    this.cpt && (this.cpt.Destroy(), (this.cpt = void 0)),
      this.TabTitle && (this.TabTitle.Destroy(), (this.TabTitle = void 0));
  }
  RefreshTabItem(e, t) {
    const s = new Array();
    for (let t = 0; t < e; t++) {
      const i = new CommonTabItemBase_1.CommonTabItemData();
      (i.Index = t), (i.Data = this.bBt.GetCommonData(t)), s.push(i);
    }
    this.cpt.RefreshTabItem(s, t);
  }
  async RefreshTabItemAsync(e) {
    const s = new Array();
    for (let t = 0; t < e; t++) {
      const i = new CommonTabItemBase_1.CommonTabItemData();
      (i.Index = t), (i.Data = this.bBt.GetCommonData(t)), s.push(i);
    }
    await this.RefreshTabItemByDataAsync(s);
  }
  async RefreshTabItemByDataAsync(t) {
    await this.cpt.RefreshTabItemAsync(t);
  }
  SelectToggleByIndex(t, e = !1) {
    this.cpt.SelectToggleByIndex(t, e);
  }
  GetSelectedIndex() {
    return this.cpt.GetSelectedIndex();
  }
  ScrollToToggleByIndex(t) {
    t = this.cpt.GetTabItemByIndex(t);
    this.xqe.ScrollTo(t.GetRootItem());
  }
  GetTabItemByIndex(t) {
    return this.cpt.GetTabItemByIndex(t);
  }
  GetTabItemMap() {
    return this.cpt.GetTabItemMap();
  }
  GetTabComponentData(t) {
    return this.bBt.GetCommonData(t);
  }
  GetTabComponent() {
    return this.cpt;
  }
  SetCanChange(t) {
    this.cpt.SetCanChange(t);
  }
}
exports.TabComponentWithTitle = TabComponentWithTitle;
// # sourceMappingURL=TabComponentWithTitle.js.map
