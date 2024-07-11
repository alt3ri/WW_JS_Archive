"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InTurnGridAppearAnimation = void 0);
const GridAppearAnimationBase_1 = require("./GridAppearAnimationBase");
class InTurnGridAppearAnimation extends GridAppearAnimationBase_1.GridAppearAnimationBase {
  constructor() {
    super(...arguments),
      (this.iGo = -0),
      (this.oGo = -0),
      (this.rGo = 0),
      (this.nGo = (i, t) => {
        t.SetUIActive(!1);
      }),
      (this.sGo = 1e3);
  }
  OnStart() {
    this.IsInGridAppearAnimation || this.aGo();
  }
  OnEnd() {
    (this.IsInGridAppearAnimation = !1),
      (this.iGo = 0),
      (this.oGo = 0),
      (this.rGo = 0);
  }
  OnInterrupt() {
    super.OnInterrupt(),
      (this.IsInGridAppearAnimation = !1),
      (this.iGo = 0),
      (this.oGo = 0),
      (this.rGo = 0);
  }
  OnUpdate(i) {
    this.IsInGridAppearAnimation && this.hGo(i);
  }
  aGo() {
    (this.GridPreserver.GetGridAnimationInterval() <= 0 &&
      this.GridPreserver.GetGridAnimationStartTime() <= 0) ||
    this.DisplayGridNum <= 0
      ? this.RemoveTimer()
      : (this.GridPreserver.NotifyAnimationStart(),
        (this.IsInGridAppearAnimation = !0),
        (this.iGo = 0),
        (this.oGo = 0),
        (this.HasShowFirstGrid = !1),
        (this.rGo = this.GridPreserver.GetDisplayGridStartIndex()),
        this.GridsForEach(this.nGo));
  }
  lGo() {
    (this.iGo = 0),
      (this.oGo = 0),
      (this.HasShowFirstGrid = !1),
      (this.rGo = this.GridPreserver.GetDisplayGridStartIndex());
  }
  hGo(i) {
    (this.oGo += i / this.sGo),
      (!this.HasShowFirstGrid &&
        this.oGo < this.GridPreserver.GetGridAnimationStartTime()) ||
        (this.HasShowFirstGrid &&
          this.oGo - this.iGo <
            this.GridPreserver.GetGridAnimationInterval()) ||
        ((this.HasShowFirstGrid = !0), (this.iGo = this.oGo), this._Go());
  }
  _Go() {
    var i;
    this.rGo < this.GridPreserver.GetDisplayGridStartIndex() ||
    this.rGo > this.GridPreserver.GetDisplayGridEndIndex()
      ? this.lGo()
      : (i = this.GridPreserver.GetGrid(this.rGo)) && i.IsValid()
        ? (this.ShowGrid(i, this.rGo),
          this.rGo++,
          this.rGo > this.GridPreserver.GetDisplayGridEndIndex() &&
            (this.End(), this.GridPreserver.NotifyAnimationEnd()))
        : this.End();
  }
}
exports.InTurnGridAppearAnimation = InTurnGridAppearAnimation;
//# sourceMappingURL=InTurnGridAppearAnimation.js.map
