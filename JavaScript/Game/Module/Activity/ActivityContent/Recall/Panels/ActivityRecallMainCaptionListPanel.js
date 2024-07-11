"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallMainCaptionListPanel = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  TabComponent_1 = require("../../../../Common/TabComponent/TabComponent"),
  ActivityRecallMainTabTitlePanel_1 = require("./ActivityRecallMainTabTitlePanel");
class ActivityRecallMainCaptionListPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.TabTitle = void 0),
      (this.Nbt = void 0),
      (this.Ivt = void 0),
      (this.xqe = void 0),
      (this.pqe = (t) => {
        var i = this.Nbt.GetCommonData(t);
        i &&
          (this.TabTitle.UpdateIcon(i.GetSmallIcon()),
          this.TabTitle.UpdateTitle(i.GetTitleData())),
          this.Nbt.ToggleCallBack(t);
      }),
      (this.R6e = (t, i) => {
        return this.Nbt.ProxyCreate(t, i);
      });
  }
  Init(t) {
    this.Nbt = t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var t = this.GetItem(0).GetOwner();
    (this.TabTitle =
      new ActivityRecallMainTabTitlePanel_1.ActivityRecallMainTabTitlePanel()),
      await this.TabTitle.CreateThenShowByActorAsync(t);
  }
  OnStart() {
    (this.xqe = this.GetScrollViewWithScrollbar(1)),
      (this.Ivt = new TabComponent_1.TabComponent(
        this.xqe.ContentUIItem,
        this.R6e,
        this.pqe,
        void 0,
      ));
  }
  OnBeforeDestroy() {
    this.Ivt && (this.Ivt.Destroy(), (this.Ivt = void 0)),
      this.TabTitle && (this.TabTitle.Destroy(), (this.TabTitle = void 0));
  }
  async RefreshTabItemByDataAsync(t) {
    await this.Ivt.RefreshTabItemAsync(t);
  }
  SelectToggleByIndex(t, i = !1, e = !0) {
    this.Ivt.SelectToggleByIndex(t, i, e);
  }
  GetTabItemMap() {
    return this.Ivt.GetTabItemMap();
  }
  GetTabComponentData(t) {
    return this.Nbt.GetCommonData(t);
  }
  SetPnlListUiActive(t) {
    this.GetItem(2).SetUIActive(t);
  }
  UpdateTitle(t, i) {
    t && this.TabTitle.UpdateIcon(t), i && this.TabTitle.UpdateTitle(i);
  }
}
exports.ActivityRecallMainCaptionListPanel = ActivityRecallMainCaptionListPanel;
//# sourceMappingURL=ActivityRecallMainCaptionListPanel.js.map
