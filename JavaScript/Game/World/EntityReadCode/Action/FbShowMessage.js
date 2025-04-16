"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbShowMessage = void 0);
class FbShowMessage {
  constructor(s) {
    (this.FbDataInternal = s), (this.Euh = !1), (this.Iuh = void 0);
  }
  static Create(s) {
    if (s) return new FbShowMessage(s);
  }
  get Content() {
    return (
      this.Euh || ((this.Euh = !0), (this.Iuh = this.FbDataInternal.content())),
      this.Iuh
    );
  }
}
exports.FbShowMessage = FbShowMessage;
//# sourceMappingURL=FbShowMessage.js.map
