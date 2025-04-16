"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPostAkEvent = void 0);
const UnionPostAkEventHelper_1 = require("./UnionPostAkEventHelper");
class FbPostAkEvent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.BEh = !1),
      (this.qEh = void 0),
      (this.pDc = !1),
      (this.vDc = !1);
  }
  static Create(t) {
    if (t) return new FbPostAkEvent(t);
  }
  get EventConfig() {
    var t, e;
    return (
      !this.BEh &&
        ((this.BEh = !0),
        (t = this.FbDataInternal.eventConfigType()),
        (e =
          UnionPostAkEventHelper_1.UnionPostAkEventHelper.GetUnionPostAkEventObject(
            t,
          ))) &&
        (this.qEh =
          UnionPostAkEventHelper_1.UnionPostAkEventHelper.ReadUnionPostAkEvent(
            t,
            this.FbDataInternal.eventConfig(e),
          )),
      this.qEh
    );
  }
  get PersistWhenExitDungeon() {
    return (
      this.pDc ||
        ((this.pDc = !0),
        (this.vDc = this.FbDataInternal.persistWhenExitDungeon())),
      this.vDc
    );
  }
}
exports.FbPostAkEvent = FbPostAkEvent;
//# sourceMappingURL=FbPostAkEvent.js.map
