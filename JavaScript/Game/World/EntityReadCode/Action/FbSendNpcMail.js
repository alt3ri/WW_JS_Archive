"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSendNpcMail = void 0);
class FbSendNpcMail {
  constructor(t) {
    (this.FbDataInternal = t), (this.Imh = !1), (this.Tmh = 0);
  }
  static Create(t) {
    if (t) return new FbSendNpcMail(t);
  }
  get MailId() {
    return (
      this.Imh || ((this.Imh = !0), (this.Tmh = this.FbDataInternal.mailId())),
      this.Tmh
    );
  }
}
exports.FbSendNpcMail = FbSendNpcMail;
//# sourceMappingURL=FbSendNpcMail.js.map
