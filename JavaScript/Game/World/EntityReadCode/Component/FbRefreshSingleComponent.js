"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRefreshSingleComponent = void 0);
class FbRefreshSingleComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.xBh = !1),
      (this.RBh = 0),
      (this.wBh = !1),
      (this.PBh = !1),
      (this.Iph = !1),
      (this.Tph = void 0);
  }
  static Create(t) {
    if (t) return new FbRefreshSingleComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get RefreshInterval() {
    return (
      this.xBh ||
        ((this.xBh = !0), (this.RBh = this.FbDataInternal.refreshInterval())),
      this.RBh
    );
  }
  get DelayRefresh() {
    return (
      this.wBh ||
        ((this.wBh = !0), (this.PBh = this.FbDataInternal.delayRefresh())),
      this.PBh
    );
  }
  get TemplateGuid() {
    return (
      this.Iph ||
        ((this.Iph = !0), (this.Tph = this.FbDataInternal.templateGuid())),
      this.Tph
    );
  }
}
exports.FbRefreshSingleComponent = FbRefreshSingleComponent;
//# sourceMappingURL=FbRefreshSingleComponent.js.map
