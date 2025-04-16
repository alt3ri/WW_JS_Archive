"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckMoonBuildingState = void 0);
class FbCheckMoonBuildingState {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.CJh = !1),
      (this.gJh = 0),
      (this.fJh = !1),
      (this.pJh = !1);
  }
  static Create(t) {
    if (t) return new FbCheckMoonBuildingState(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get BuildingId() {
    return (
      this.CJh ||
        ((this.CJh = !0), (this.gJh = this.FbDataInternal.buildingId())),
      this.gJh
    );
  }
  get IsBuilt() {
    return (
      this.fJh || ((this.fJh = !0), (this.pJh = this.FbDataInternal.isBuilt())),
      this.pJh
    );
  }
}
exports.FbCheckMoonBuildingState = FbCheckMoonBuildingState;
//# sourceMappingURL=FbCheckMoonBuildingState.js.map
