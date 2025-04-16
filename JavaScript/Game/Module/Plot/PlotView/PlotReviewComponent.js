"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotReviewComponent = void 0);
class PlotReviewComponent {
  constructor(t, s) {
    (this.dce = !1),
      (this._pc = void 0),
      (this.EnableReviewButton = (t) => {
        this.dce !== t && ((this.dce = t), this.cpc.SetUIActive(this.dce));
      }),
      (this.upc = () => {
        this.dce && this.NTt?.();
      }),
      (this._pc = t),
      (this.cpc = t.RootUIComp),
      (this.NTt = s),
      this._pc.OnClickCallBack.Bind(this.upc),
      (this.dce = !1);
  }
  OnClear() {
    (this.dce = !1), (this.NTt = void 0), this._pc?.OnClickCallBack.Unbind();
  }
}
exports.PlotReviewComponent = PlotReviewComponent;
//# sourceMappingURL=PlotReviewComponent.js.map
