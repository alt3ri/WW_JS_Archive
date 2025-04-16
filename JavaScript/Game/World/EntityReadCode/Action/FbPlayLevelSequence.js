"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPlayLevelSequence = void 0);
const FbEaseData_1 = require("./FbEaseData"),
  UnionLevelSequenceTransitionHelper_1 = require("./UnionLevelSequenceTransitionHelper");
class FbPlayLevelSequence {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.Ybh = !1),
      (this.zbh = void 0),
      (this.Jbh = !1),
      (this.Zbh = !1),
      (this.eLh = !1),
      (this.tLh = void 0),
      (this.iLh = !1),
      (this.rLh = void 0),
      (this.oLh = !1),
      (this.nLh = void 0),
      (this.sLh = !1),
      (this.aLh = void 0),
      (this.F4h = !1),
      (this.DTo = 0),
      (this.qxc = !1),
      (this.Gxc = void 0);
  }
  static Create(e) {
    if (e) return new FbPlayLevelSequence(e);
  }
  get LevelSequencePath() {
    return (
      this.Ybh ||
        ((this.Ybh = !0), (this.zbh = this.FbDataInternal.levelSequencePath())),
      this.zbh
    );
  }
  get KeepUI() {
    return (
      this.Jbh || ((this.Jbh = !0), (this.Zbh = this.FbDataInternal.keepUi())),
      this.Zbh
    );
  }
  get Mark() {
    return (
      this.eLh || ((this.eLh = !0), (this.tLh = this.FbDataInternal.mark())),
      this.tLh
    );
  }
  get PlayMode() {
    return (
      this.iLh ||
        ((this.iLh = !0), (this.rLh = this.FbDataInternal.playMode())),
      this.rLh
    );
  }
  get Intro() {
    var e, t;
    return (
      !this.oLh &&
        ((this.oLh = !0),
        (e = this.FbDataInternal.introType()),
        (t =
          UnionLevelSequenceTransitionHelper_1.UnionLevelSequenceTransitionHelper.GetUnionLevelSequenceTransitionObject(
            e,
          ))) &&
        (this.nLh =
          UnionLevelSequenceTransitionHelper_1.UnionLevelSequenceTransitionHelper.ReadUnionLevelSequenceTransition(
            e,
            this.FbDataInternal.intro(t),
          )),
      this.nLh
    );
  }
  get Outro() {
    var e, t;
    return (
      !this.sLh &&
        ((this.sLh = !0),
        (e = this.FbDataInternal.outroType()),
        (t =
          UnionLevelSequenceTransitionHelper_1.UnionLevelSequenceTransitionHelper.GetUnionLevelSequenceTransitionObject(
            e,
          ))) &&
        (this.aLh =
          UnionLevelSequenceTransitionHelper_1.UnionLevelSequenceTransitionHelper.ReadUnionLevelSequenceTransition(
            e,
            this.FbDataInternal.outro(t),
          )),
      this.aLh
    );
  }
  get Rate() {
    return (
      this.F4h || ((this.F4h = !0), (this.DTo = this.FbDataInternal.rate())),
      this.DTo
    );
  }
  get RateEase() {
    return (
      this.qxc ||
        ((this.qxc = !0),
        (this.Gxc = FbEaseData_1.FbEaseData.Create(
          this.FbDataInternal.rateEase(),
        ))),
      this.Gxc
    );
  }
}
exports.FbPlayLevelSequence = FbPlayLevelSequence;
//# sourceMappingURL=FbPlayLevelSequence.js.map
