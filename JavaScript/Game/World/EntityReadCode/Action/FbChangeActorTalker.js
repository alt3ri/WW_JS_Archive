"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbChangeActorTalker = void 0);
class FbChangeActorTalker {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.xfh = !1),
      (this.Y_i = 0),
      (this.FTh = !1),
      (this.NTh = 0);
  }
  static Create(t) {
    if (t) return new FbChangeActorTalker(t);
  }
  get ActorIndex() {
    return (
      this.xfh ||
        ((this.xfh = !0), (this.Y_i = this.FbDataInternal.actorIndex())),
      this.Y_i
    );
  }
  get Talker() {
    return (
      this.FTh || ((this.FTh = !0), (this.NTh = this.FbDataInternal.talker())),
      this.NTh
    );
  }
}
exports.FbChangeActorTalker = FbChangeActorTalker;
//# sourceMappingURL=FbChangeActorTalker.js.map
