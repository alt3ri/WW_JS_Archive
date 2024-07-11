"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonTabData = void 0);
class CommonTabData {
  constructor(t, s) {
    (this.xbt = t), (this.wbt = s), (this.Bbt = "");
  }
  SetSmallIcon(t) {
    this.Bbt = t;
  }
  GetSmallIcon() {
    return this.Bbt || this.GetIcon();
  }
  GetIcon() {
    return this.xbt;
  }
  GetTitleData() {
    return this.wbt;
  }
}
exports.CommonTabData = CommonTabData;
//# sourceMappingURL=CommonTabData.js.map
