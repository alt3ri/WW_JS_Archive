"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFollowTrackToFoundation = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbFollowTrackToFoundation {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.$6h = !1),
      (this.X6h = 0),
      (this.Y6h = !1),
      (this.z6h = void 0);
  }
  static Create(t) {
    if (t) return new FbFollowTrackToFoundation(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get FoundationId() {
    return (
      this.$6h ||
        ((this.$6h = !0), (this.X6h = this.FbDataInternal.foundationId())),
      this.X6h
    );
  }
  get FinalOffset() {
    return (
      this.Y6h ||
        ((this.Y6h = !0),
        (this.z6h = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.finalOffset(),
        ))),
      this.z6h
    );
  }
}
exports.FbFollowTrackToFoundation = FbFollowTrackToFoundation;
//# sourceMappingURL=FbFollowTrackToFoundation.js.map
