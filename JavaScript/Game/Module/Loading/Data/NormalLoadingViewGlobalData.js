"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NormalLoadingViewGlobalData = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
class NormalLoadingViewGlobalData {
  static CreateFirstProgressPromise() {
    this.vvi = new CustomPromise_1.CustomPromise();
  }
  static FinishFirstProgressPromise() {
    this.vvi.SetResult(void 0), (this.vvi = void 0);
  }
  static get FirstProgressPromise() {
    return this.vvi;
  }
  static get FinishPromise() {
    return this.Mvi;
  }
  static CreateFinishPromisePromise() {
    this.Mvi = new CustomPromise_1.CustomPromise();
  }
  static FinishEndPromise() {
    this.Mvi.SetResult(void 0), (this.Mvi = void 0);
  }
  static get IsNotifyCloseView() {
    return this.Evi;
  }
  static ResetNotifyCloseView() {
    this.Evi = !1;
  }
}
((exports.NormalLoadingViewGlobalData = NormalLoadingViewGlobalData).vvi =
  void 0),
  (NormalLoadingViewGlobalData.Mvi = void 0),
  (NormalLoadingViewGlobalData.Evi = !1);
//# sourceMappingURL=NormalLoadingViewGlobalData.js.map
