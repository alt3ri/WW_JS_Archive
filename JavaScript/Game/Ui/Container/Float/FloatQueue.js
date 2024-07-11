"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FloatViewQueue = void 0);
const UiManager_1 = require("../../UiManager");
class FloatViewQueue {
  constructor() {
    this.Eur = new Array();
  }
  Push(e, t, r) {
    this.Eur.push({ ViewBase: e, Priority: t, OnlyShowInMain: r }),
      this.Eur.sort((e, t) => t.Priority - e.Priority);
  }
  Pop(r) {
    for (let e = 0, t = this.Eur.length; e < t; ++e) {
      var i = this.Eur[e];
      if (!i.OnlyShowInMain || r) return this.yur(i), i;
    }
  }
  yur(e) {
    e = this.Eur.indexOf(e);
    return !(e < 0 || (this.Eur.splice(e, 1), 0));
  }
  Delete(r, i) {
    for (let e = 0, t = this.Eur.length; e < t; ++e) {
      var s = this.Eur[e];
      if (!(s.ViewBase.Info.Name !== r || (i && s.ViewBase.GetViewId() !== i)))
        return (
          this.yur(s),
          UiManager_1.UiManager.RemoveView(s.ViewBase.GetViewId()),
          !0
        );
    }
    return !1;
  }
  Has(r) {
    for (let e = 0, t = this.Eur.length; e < t; ++e)
      if (this.Eur[e].ViewBase.Info.Name === r) return !0;
    return !1;
  }
  Clear() {
    for (let e = this.Eur.length - 1; 0 <= e; --e) {
      var t = this.Eur[e].ViewBase;
      t.Info.IsPermanent ||
        (this.Eur.pop(), UiManager_1.UiManager.RemoveView(t.GetViewId()));
    }
  }
  get Size() {
    return this.Eur.length;
  }
}
exports.FloatViewQueue = FloatViewQueue;
//# sourceMappingURL=FloatQueue.js.map
