"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NavigationVisionAssembleToggle = void 0);
const ModelManager_1 = require("../../../../../Manager/ModelManager"),
  NavigationToggle_1 = require("../NavigationToggle");
class NavigationVisionAssembleToggle extends NavigationToggle_1.NavigationToggle {
  OnFindLoopScrollViewNavigationComponent(o, e) {
    var t = this.Listener.LoopScrollViewGridIndex,
      i = ModelManager_1.ModelManager.VisionEquipGroupModel.FilterDataLength,
      r = 0 < o.X;
    return -1 === t
      ? 0 === i
        ? void 0
        : r
          ? this.r4_()
          : this.o4_()
      : r || 0 !== t
        ? r && t === i - 1
          ? this.PanelHandle.IsInCompare
            ? this.r4_()
            : this.n4_()
          : super.OnFindLoopScrollViewNavigationComponent(o, e)
        : this.PanelHandle.IsInCompare
          ? this.o4_()
          : this.n4_();
  }
  n4_() {
    return this.Listener.GetNavigationGroup()?.ActiveListenerList[0].GetSelectableComponent();
  }
  r4_() {
    for (const o of this.Listener.GetNavigationGroup().ActiveListenerList)
      if (o.HasLoopScrollView()) {
        o.ScrollView.ScrollToGridIndex(0);
        break;
      }
    for (const e of this.Listener.GetNavigationGroup().ActiveListenerList)
      if (0 === e.LoopScrollViewGridIndex) return e.GetSelectableComponent();
  }
  o4_() {
    var o = ModelManager_1.ModelManager.VisionEquipGroupModel.FilterDataLength;
    for (const e of this.Listener.GetNavigationGroup().ActiveListenerList)
      if (e.HasLoopScrollView()) {
        e.ScrollView.ScrollToGridIndex(o - 1);
        break;
      }
    for (const t of this.Listener.GetNavigationGroup().ActiveListenerList)
      if (t.LoopScrollViewGridIndex === o - 1)
        return t.GetSelectableComponent();
  }
}
exports.NavigationVisionAssembleToggle = NavigationVisionAssembleToggle;
//# sourceMappingURL=NavigationVisionAssembleToggle.js.map
