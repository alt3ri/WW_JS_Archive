"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRemovePreloadResourcePhantomCharacter = void 0);
const UnionDelayRemoveConfigHelper_1 = require("./UnionDelayRemoveConfigHelper");
class FbRemovePreloadResourcePhantomCharacter {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.tgh = !1),
      (this.FFe = 0),
      (this.OSh = !1),
      (this.FSh = void 0);
  }
  static Create(e) {
    if (e) return new FbRemovePreloadResourcePhantomCharacter(e);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Id() {
    return (
      this.tgh || ((this.tgh = !0), (this.FFe = this.FbDataInternal.id())),
      this.FFe
    );
  }
  get DelayReMove() {
    var e, t;
    return (
      !this.OSh &&
        ((this.OSh = !0),
        (e = this.FbDataInternal.delayReMoveType()),
        (t =
          UnionDelayRemoveConfigHelper_1.UnionDelayRemoveConfigHelper.GetUnionDelayRemoveConfigObject(
            e,
          ))) &&
        (this.FSh =
          UnionDelayRemoveConfigHelper_1.UnionDelayRemoveConfigHelper.ReadUnionDelayRemoveConfig(
            e,
            this.FbDataInternal.delayReMove(t),
          )),
      this.FSh
    );
  }
}
exports.FbRemovePreloadResourcePhantomCharacter =
  FbRemovePreloadResourcePhantomCharacter;
//# sourceMappingURL=FbRemovePreloadResourcePhantomCharacter.js.map
