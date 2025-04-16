"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSceneBulletGroup = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbSceneBulletGroup {
  constructor(t) {
    (this.FbDataInternal = t),
      (this._vh = !1),
      (this.cvh = void 0),
      (this.p0h = !1),
      (this.nXs = 0),
      (this.M_h = !1),
      (this.E_h = void 0),
      (this.Kdh = !1),
      (this.$dh = void 0);
  }
  static Create(t) {
    if (t) return new FbSceneBulletGroup(t);
  }
  get EntityState() {
    return (
      this._vh ||
        ((this._vh = !0), (this.cvh = this.FbDataInternal.entityState())),
      this.cvh
    );
  }
  get BulletId() {
    return (
      this.p0h ||
        ((this.p0h = !0), (this.nXs = Number(this.FbDataInternal.bulletId()))),
      this.nXs
    );
  }
  get Range() {
    return (
      this.M_h ||
        ((this.M_h = !0),
        (this.E_h = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.range(),
        ))),
      this.E_h
    );
  }
  get Offset() {
    return (
      this.Kdh ||
        ((this.Kdh = !0),
        (this.$dh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.offset(),
        ))),
      this.$dh
    );
  }
}
exports.FbSceneBulletGroup = FbSceneBulletGroup;
//# sourceMappingURL=FbSceneBulletGroup.js.map
