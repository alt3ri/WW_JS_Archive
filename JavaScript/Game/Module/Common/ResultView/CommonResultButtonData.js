"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonResultButtonData = void 0);
class CommonResultButtonData {
  constructor() {
    (this.abt = (t, e) => {}), (this.hbt = () => {}), (this.lbt = (t) => {});
  }
  GetButtonTimerCallBack() {
    return this.abt;
  }
  GetButtonClickCallBack() {
    return this.hbt;
  }
  GetButtonRefreshCallBack() {
    return this.lbt;
  }
  SetTimerCallBack(t) {
    this.abt = t;
  }
  SetClickCallBack(t) {
    this.hbt = t;
  }
  SetRefreshCallBack(t) {
    this.lbt = t;
  }
}
exports.CommonResultButtonData = CommonResultButtonData;
//# sourceMappingURL=CommonResultButtonData.js.map
