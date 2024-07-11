"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonTabData = void 0);
class CommonTabData {
  constructor(t, s) {
    (this.UBt = t), (this.ABt = s), (this.PBt = "");
  }
  SetSmallIcon(t) {
    this.PBt = t;
  }
  GetSmallIcon() {
    return this.PBt || this.GetIcon();
  }
  GetIcon() {
    return this.UBt;
  }
  GetTitleData() {
    return this.ABt;
  }
}
exports.CommonTabData = CommonTabData;
//# sourceMappingURL=CommonTabData.js.map
