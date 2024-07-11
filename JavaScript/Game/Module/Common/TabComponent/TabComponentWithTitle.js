"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TabComponentWithTitle = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  CommonTabTitle_1 = require("./CommonTabTitle"),
  TabComponent_1 = require("./TabComponent"),
  CommonTabItemBase_1 = require("./TabItem/CommonTabItemBase");
class TabComponentWithTitle extends UiPanelBase_1.UiPanelBase {
  constructor(t, e) {
    super(),
      (this.TabTitle = void 0),
      (this.Ivt = void 0),
      (this.xqe = void 0),
      (this.pqe = (t) => {
        var e = this.Nbt.GetCommonData(t);
        e &&
          (this.TabTitle.UpdateIcon(e.GetSmallIcon()),
          this.TabTitle.UpdateTitle(e.GetTitleData())),
          this.Nbt.ToggleCallBack(t);
      }),
      (this.R6e = (t, e) => {
        return this.Nbt.ProxyCreate(t, e);
      }),
      (this.Nbt = e),
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
      (this.Ivt = new TabComponent_1.TabComponent(
        this.xqe.ContentUIItem,
        this.R6e,
        this.pqe,
        void 0,
      )),
      (this.TabTitle = new CommonTabTitle_1.CommonTabTitle(this.GetItem(0)));
  }
  OnBeforeDestroy() {
    this.Ivt && (this.Ivt.Destroy(), (this.Ivt = void 0)),
      this.TabTitle && (this.TabTitle.Destroy(), (this.TabTitle = void 0));
  }
  RefreshTabItem(e, t) {
    var s = new Array();
    for (let t = 0; t < e; t++) {
      var i = new CommonTabItemBase_1.CommonTabItemData();
      (i.Index = t), (i.Data = this.Nbt.GetCommonData(t)), s.push(i);
    }
    this.Ivt.RefreshTabItem(s, t);
  }
  async RefreshTabItemAsync(e) {
    var s = new Array();
    for (let t = 0; t < e; t++) {
      var i = new CommonTabItemBase_1.CommonTabItemData();
      (i.Index = t), (i.Data = this.Nbt.GetCommonData(t)), s.push(i);
    }
    await this.RefreshTabItemByDataAsync(s);
  }
  async RefreshTabItemByDataAsync(t) {
    await this.Ivt.RefreshTabItemAsync(t);
  }
  SelectToggleByIndex(t, e = !1) {
    this.Ivt.SelectToggleByIndex(t, e);
  }
  GetSelectedIndex() {
    return this.Ivt.GetSelectedIndex();
  }
  ScrollToToggleByIndex(t) {
    t = this.Ivt.GetTabItemByIndex(t);
    this.xqe.ScrollTo(t.GetRootItem());
  }
  GetTabItemByIndex(t) {
    return this.Ivt.GetTabItemByIndex(t);
  }
  GetTabItemMap() {
    return this.Ivt.GetTabItemMap();
  }
  GetTabComponentData(t) {
    return this.Nbt.GetCommonData(t);
  }
  GetTabComponent() {
    return this.Ivt;
  }
  SetCanChange(t) {
    this.Ivt.SetCanChange(t);
  }
}
exports.TabComponentWithTitle = TabComponentWithTitle;
//# sourceMappingURL=TabComponentWithTitle.js.map
