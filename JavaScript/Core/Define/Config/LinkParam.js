"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LinkParam = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class LinkParam {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get InstSubTypeList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.instsubtypelistLength(),
      this.instsubtypelist,
      this,
    );
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsLinkParam(t, s) {
    return (s || new LinkParam()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetInstsubtypelistAt(t) {
    return this.instsubtypelist(t);
  }
  instsubtypelist(t) {
    var s = this.J7.__offset(this.z7, 6);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  instsubtypelistLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  instsubtypelistArray() {
    var t = this.J7.__offset(this.z7, 6);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
}
exports.LinkParam = LinkParam;
//# sourceMappingURL=LinkParam.js.map
