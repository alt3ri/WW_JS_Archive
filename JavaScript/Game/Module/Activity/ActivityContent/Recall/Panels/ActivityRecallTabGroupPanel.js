"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallTabGroupPanel = void 0);
const TabComponent_1 = require("../../../../Common/TabComponent/TabComponent"),
  ActivityRecallTabSwitchItemPanel_1 = require("./ActivityRecallTabSwitchItemPanel");
class ActivityRecallTabGroupPanel {
  constructor(t, i, e) {
    (this.TabLayout = t),
      (this.TabItem = i),
      (this.TabCallBack = e),
      (this._He = void 0),
      (this.Ida = void 0),
      (this.fqe = (t, i) => {
        return new ActivityRecallTabSwitchItemPanel_1.ActivityRecallTabSwitchItemPanel();
      }),
      (this.pqe = (t) => {
        this.TabCallBack?.(t);
      });
  }
  Init() {
    this._He = new TabComponent_1.TabComponent(
      this.TabLayout.GetRootComponent(),
      this.fqe,
      this.pqe,
      this.TabItem,
    );
  }
  RefreshByData(t, i) {
    0 < (this.Ida = t).length && this.CHe(i);
  }
  CHe(t) {
    var i = this.Ida.length;
    const s = t;
    this._He.RefreshTabItemByLength(i, () => {
      var t, i;
      for ([t, i] of this._He.GetTabItemMap()) {
        var e = this.Ida[t];
        i.UpdateView(e);
      }
      this._He.SelectToggleByIndex(s);
    });
  }
  Destroy() {
    this._He.Destroy();
  }
}
exports.ActivityRecallTabGroupPanel = ActivityRecallTabGroupPanel;
//# sourceMappingURL=ActivityRecallTabGroupPanel.js.map
