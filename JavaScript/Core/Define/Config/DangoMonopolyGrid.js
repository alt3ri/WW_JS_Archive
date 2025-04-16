"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoMonopolyGrid = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class DangoMonopolyGrid {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get GridId() {
    return this.gridid();
  }
  get GridGroupId() {
    return this.gridgroupid();
  }
  get GridInfo() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.gridinfoLength(),
      this.gridinfo,
      this,
    );
  }
  get AddPropertyId() {
    return this.addpropertyid();
  }
  get RemovePropertyId() {
    return this.removepropertyid();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsDangoMonopolyGrid(t, i) {
    return (i || new DangoMonopolyGrid()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  gridid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  gridgroupid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetGridinfoAt(t) {
    return this.gridinfo(t);
  }
  gridinfo(t) {
    var i = this.J7.__offset(this.z7, 10);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  gridinfoLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  gridinfoArray() {
    var t = this.J7.__offset(this.z7, 10);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  addpropertyid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  removepropertyid() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.DangoMonopolyGrid = DangoMonopolyGrid;
//# sourceMappingURL=DangoMonopolyGrid.js.map
