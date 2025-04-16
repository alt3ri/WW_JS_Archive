"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbClientTpRelativeEntityPos = void 0);
class FbClientTpRelativeEntityPos {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.svh = !1),
      (this.avh = 0),
      (this.hvh = !1),
      (this.lvh = 0);
  }
  static Create(t) {
    if (t) return new FbClientTpRelativeEntityPos(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get SourcePosEntityId() {
    return (
      this.svh ||
        ((this.svh = !0), (this.avh = this.FbDataInternal.sourcePosEntityId())),
      this.avh
    );
  }
  get TargetPosEntityId() {
    return (
      this.hvh ||
        ((this.hvh = !0), (this.lvh = this.FbDataInternal.targetPosEntityId())),
      this.lvh
    );
  }
}
exports.FbClientTpRelativeEntityPos = FbClientTpRelativeEntityPos;
//# sourceMappingURL=FbClientTpRelativeEntityPos.js.map
