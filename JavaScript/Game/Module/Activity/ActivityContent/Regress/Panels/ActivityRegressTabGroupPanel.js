"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressTabGroupPanel = void 0);
const TabComponent_1 = require("../../../../Common/TabComponent/TabComponent"),
  ActivityRegressTabSwitchItemPanel_1 = require("./ActivityRegressTabSwitchItemPanel");
class ActivityRegressTabGroupPanel {
  constructor(t, s, e) {
    (this.TabLayout = t),
      (this.TabItem = s),
      (this.TabCallBack = e),
      (this._He = void 0),
      (this.Gda = void 0),
      (this.fqe = (t, s) => {
        return new ActivityRegressTabSwitchItemPanel_1.ActivityRegressTabSwitchItemPanel();
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
  RefreshByData(t, s) {
    0 < (this.Gda = t).length && this.CHe(s);
  }
  CHe(t) {
    var s = this.Gda.length;
    const i = t;
    this._He.RefreshTabItemByLength(s, () => {
      var t, s;
      for ([t, s] of this._He.GetTabItemMap()) {
        var e = this.Gda[t];
        s.UpdateView(e);
      }
      this._He.SelectToggleByIndex(i);
    });
  }
  Destroy() {
    this._He.Destroy();
  }
}
exports.ActivityRegressTabGroupPanel = ActivityRegressTabGroupPanel;
//# sourceMappingURL=ActivityRegressTabGroupPanel.js.map
