"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPreChildQuest = void 0);
const FbChildQuestCondition_1 = require("./FbChildQuestCondition");
class FbPreChildQuest {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this._ch = !1),
      (this.cch = void 0),
      (this.ZJh = !1),
      (this.eZh = void 0);
  }
  static Create(t) {
    if (t) return new FbPreChildQuest(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Compare() {
    return (
      this._ch || ((this._ch = !0), (this.cch = this.FbDataInternal.compare())),
      this.cch
    );
  }
  get PreChildQuest() {
    return (
      this.ZJh ||
        ((this.ZJh = !0),
        (this.eZh = FbChildQuestCondition_1.FbChildQuestCondition.Create(
          this.FbDataInternal.preChildQuest(),
        ))),
      this.eZh
    );
  }
}
exports.FbPreChildQuest = FbPreChildQuest;
//# sourceMappingURL=FbPreChildQuest.js.map
