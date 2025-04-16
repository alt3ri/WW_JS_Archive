"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionChooseMainPanelHandle = void 0);
const UiNavigationGlobalData_1 = require("../UiNavigationGlobalData"),
  SpecialPanelHandleBase_1 = require("./SpecialPanelHandleBase");
class VisionChooseMainPanelHandle extends SpecialPanelHandleBase_1.SpecialPanelHandleBase {
  constructor() {
    super(...arguments),
      (this.O8a = void 0),
      (this.IsFindChangeListenerList = !1);
  }
  get ChangeListenerList() {
    var i;
    return (
      this.O8a ||
        ((this.O8a = [...this.DefaultNavigationListener]),
        2 <= this.O8a.length &&
          ((i = this.O8a[0]), (this.O8a[0] = this.O8a[1]), (this.O8a[1] = i))),
      this.O8a
    );
  }
  OnGetSuitableNavigationListenerList(i) {
    return this.IsFindChangeListenerList
      ? this.ChangeListenerList
      : i
        ? UiNavigationGlobalData_1.UiNavigationGlobalData
            .VisionReplaceViewFindDefault
          ? (i = this.C8a(this.DefaultNavigationListener[0]))
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
  C8a(e) {
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
