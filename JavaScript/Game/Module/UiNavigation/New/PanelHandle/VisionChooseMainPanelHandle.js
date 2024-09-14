"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionChooseMainPanelHandle = void 0);
const UiNavigationGlobalData_1 = require("../UiNavigationGlobalData"),
  SpecialPanelHandleBase_1 = require("./SpecialPanelHandleBase");
class VisionChooseMainPanelHandle extends SpecialPanelHandleBase_1.SpecialPanelHandleBase {
  constructor() {
    super(...arguments),
      (this.Z4a = void 0),
      (this.IsFindChangeListenerList = !1);
  }
  get ChangeListenerList() {
    var i;
    return (
      this.Z4a ||
        ((this.Z4a = [...this.DefaultNavigationListener]),
        2 <= this.Z4a.length &&
          ((i = this.Z4a[0]), (this.Z4a[0] = this.Z4a[1]), (this.Z4a[1] = i))),
      this.Z4a
    );
  }
  OnGetSuitableNavigationListenerList(i) {
    return this.IsFindChangeListenerList
      ? this.ChangeListenerList
      : i
        ? UiNavigationGlobalData_1.UiNavigationGlobalData
            .VisionReplaceViewFindDefault
          ? (i = this.q4a(this.DefaultNavigationListener[0]))
            ? [i]
            : this.DefaultNavigationListener
          : this.ChangeListenerList
        : this.DefaultNavigationListener;
  }
  OnNotifyFindResult(i) {
    i.IsInLoopingProcess() ||
      ((UiNavigationGlobalData_1.UiNavigationGlobalData.VisionReplaceViewFindDefault =
        !0),
      (this.IsFindChangeListenerList = !1));
  }
  q4a(e) {
    let a = void 0;
    var s = this.GetNavigationGroup(e.GroupName);
    for (let i = 0, t = s.ListenerList.length; i < t; ++i) {
      const e = s.ListenerList[i];
      if ((!a && e.IsCanFocus() && (a = e), e.IsInScrollOrLayoutCanFocus()))
        return e;
    }
    return a;
  }
}
exports.VisionChooseMainPanelHandle = VisionChooseMainPanelHandle;
//# sourceMappingURL=VisionChooseMainPanelHandle.js.map
