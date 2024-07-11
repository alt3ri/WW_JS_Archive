"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NavigationScrollbarData = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  UiNavigationViewManager_1 = require("./UiNavigationViewManager");
class NavigationScrollbarData {
  constructor() {
    (this.Wwo = []),
      (this.Kwo = void 0),
      (this.Qwo = void 0),
      (this.Xwo = void 0);
  }
  $wo() {
    if (!this.Kwo?.IsListenerActive()) {
      let i = void 0;
      for (const t of this.Wwo)
        if (t.IsListenerActive()) {
          i = t;
          break;
        }
      this.Ywo(i);
    }
  }
  Ywo(i) {
    this.Kwo && (this.Kwo.IsFocusScrollbar = !1),
      i && (i.IsFocusScrollbar = !0),
      (this.Xwo = this.Kwo),
      (this.Kwo = i),
      (this.Qwo = i?.GetBehaviorComponent()),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("UiNavigation", 11, "设置当前的滚动区域对象", [
          "名字",
          i?.RootUIComp.displayName,
        ]);
  }
  AddScrollbar(r) {
    this.Wwo = [];
    for (let i = 0, t = r.Num(); i < t; ++i) {
      var s = r.Get(i).ListenerList;
      for (let i = 0, t = s.Num(); i < t; ++i) {
        var e = s.Get(i);
        this.Wwo.push(e);
      }
    }
    this.Wwo.sort((i, t) => i.ScrollbarIndex - t.ScrollbarIndex), this.$wo();
  }
  DeleteScrollbar(i) {
    var r = i.ListenerList;
    if (r) {
      for (let i = 0, t = r.Num(); i < t; ++i) {
        var s = r.Get(i),
          e = this.Wwo.indexOf(s);
        this.Wwo.splice(e, 1), this.Kwo === s && this.Ywo(void 0);
      }
      this.$wo();
    }
  }
  ResumeLastListener() {
    this.Xwo?.IsValid() && this.Xwo.IsListenerActive()
      ? this.Ywo(this.Xwo)
      : this.$wo();
  }
  GetCurrentListener() {
    return this.Kwo;
  }
  GetCurrentScrollbar() {
    return this.Qwo;
  }
  HasActiveScrollbarList() {
    return 1 < this.Wwo.filter((i) => i.IsListenerActive()).length;
  }
  FindNextScrollbar() {
    if (this.Kwo) {
      var t = this.Wwo.length;
      if (1 === t) return void this.Ywo(void 0);
      var r = this.Wwo.indexOf(this.Kwo);
      let i = r + 1 < t ? r + 1 : 0;
      for (; r !== i; ) {
        if (this.Wwo[i].IsListenerActive()) {
          this.Ywo(this.Wwo[i]);
          break;
        }
        i = i + 1 < t ? i + 1 : 0;
      }
    } else this.$wo();
    UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey();
  }
  FindPrevScrollbar() {
    if (this.Kwo) {
      var t = this.Wwo.length;
      if (1 === t) return;
      var r = this.Wwo.indexOf(this.Kwo);
      let i = 0 <= r - 1 ? r - 1 : t - 1;
      for (; r !== i; ) {
        if (this.Wwo[i].IsListenerActive()) {
          this.Ywo(this.Wwo[i]);
          break;
        }
        i = 0 <= i - 1 ? i - 1 : t - 1;
      }
    } else this.$wo();
    UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey();
  }
  TryFindScrollbar() {
    this.$wo();
  }
}
exports.NavigationScrollbarData = NavigationScrollbarData;
//# sourceMappingURL=NavigationScrollbarData.js.map
