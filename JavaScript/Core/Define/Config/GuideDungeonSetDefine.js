"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuideDungeonSetDefine = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class GuideDungeonSetDefine {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get StrId() {
    return this.strid();
  }
  get DungeonIdList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.dungeonidlistLength(),
      this.dungeonidlist,
      this,
    );
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsGuideDungeonSetDefine(t, i) {
    return (i || new GuideDungeonSetDefine()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  strid(t) {
    var i = this.J7.__offset(this.z7, 4),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  GetDungeonidlistAt(t) {
    return this.dungeonidlist(t);
  }
  dungeonidlist(t) {
    var i = this.J7.__offset(this.z7, 6);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  dungeonidlistLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  dungeonidlistArray() {
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
exports.GuideDungeonSetDefine = GuideDungeonSetDefine;
//# sourceMappingURL=GuideDungeonSetDefine.js.map
