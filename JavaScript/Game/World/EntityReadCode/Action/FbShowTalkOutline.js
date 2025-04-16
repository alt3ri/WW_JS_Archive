"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbShowTalkOutline = void 0);
class FbShowTalkOutline {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.CCh = !1),
      (this.gCh = 0),
      (this.lph = !1),
      (this._ph = void 0),
      (this.vCh = !1),
      (this.yCh = void 0);
  }
  static Create(t) {
    if (t) return new FbShowTalkOutline(t);
  }
  get TextId() {
    return (
      this.CCh || ((this.CCh = !0), (this.gCh = this.FbDataInternal.textId())),
      this.gCh
    );
  }
  get TidOutline() {
    return (
      this.lph ||
        ((this.lph = !0), (this._ph = this.FbDataInternal.tidOutline())),
      this._ph
    );
  }
  get PlotLineKey() {
    return (
      this.vCh ||
        ((this.vCh = !0), (this.yCh = this.FbDataInternal.plotLineKey())),
      this.yCh
    );
  }
}
exports.FbShowTalkOutline = FbShowTalkOutline;
//# sourceMappingURL=FbShowTalkOutline.js.map
