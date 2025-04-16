"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FuncMenuReplace = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class FuncMenuReplace {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get InstSubType() {
    return this.instsubtype();
  }
  get FuncMenuIdList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.funcmenuidlistLength(),
      this.funcmenuidlist,
      this,
    );
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsFuncMenuReplace(t, s) {
    return (s || new FuncMenuReplace()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  instsubtype() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetFuncmenuidlistAt(t) {
    return this.funcmenuidlist(t);
  }
  funcmenuidlist(t) {
    var s = this.J7.__offset(this.z7, 8);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  funcmenuidlistLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  funcmenuidlistArray() {
    var t = this.J7.__offset(this.z7, 8);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
}
exports.FuncMenuReplace = FuncMenuReplace;
//# sourceMappingURL=FuncMenuReplace.js.map
