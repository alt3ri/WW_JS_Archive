"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FloatViewQueue = void 0);
const UiManager_1 = require("../../UiManager");
class FloatViewQueue {
  constructor() {
    this.vcr = new Array();
  }
  Push(e, t, r) {
    this.vcr.push({ ViewBase: e, Priority: t, OnlyShowInMain: r }),
      this.vcr.sort((e, t) => t.Priority - e.Priority);
  }
  Pop(r) {
    for (let e = 0, t = this.vcr.length; e < t; ++e) {
      var i = this.vcr[e];
      if (!i.OnlyShowInMain || r) return this.Mcr(i), i;
    }
  }
  Mcr(e) {
    e = this.vcr.indexOf(e);
    return !(e < 0 || (this.vcr.splice(e, 1), 0));
  }
  Delete(r, i) {
    for (let e = 0, t = this.vcr.length; e < t; ++e) {
      var s = this.vcr[e];
      if (!(s.ViewBase.Info.Name !== r || (i && s.ViewBase.GetViewId() !== i)))
        return (
          this.Mcr(s),
          UiManager_1.UiManager.RemoveView(s.ViewBase.GetViewId()),
          !0
        );
    }
    return !1;
  }
  Has(r) {
    for (let e = 0, t = this.vcr.length; e < t; ++e)
      if (this.vcr[e].ViewBase.Info.Name === r) return !0;
    return !1;
  }
  Clear() {
    for (let e = this.vcr.length - 1; 0 <= e; --e) {
      var t = this.vcr[e].ViewBase;
      t.Info.IsPermanent ||
        (this.vcr.pop(), UiManager_1.UiManager.RemoveView(t.GetViewId()));
    }
  }
  get Size() {
    return this.vcr.length;
  }
}
exports.FloatViewQueue = FloatViewQueue;
//# sourceMappingURL=FloatQueue.js.map
