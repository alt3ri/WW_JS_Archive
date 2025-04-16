"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingGridItemShape = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  IntArray_1 = require("./SubType/IntArray");
class FishingGridItemShape {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get FillState() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.fillstateLength(),
      this.fillstate,
      this,
    );
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsFishingGridItemShape(t, i) {
    return (i || new FishingGridItemShape()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetFillstateAt(t, i) {
    return this.fillstate(t);
  }
  fillstate(t, i) {
    var s = this.J7.__offset(this.z7, 6);
    return s
      ? (i || new IntArray_1.IntArray()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  fillstateLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.FishingGridItemShape = FishingGridItemShape;
//# sourceMappingURL=FishingGridItemShape.js.map
