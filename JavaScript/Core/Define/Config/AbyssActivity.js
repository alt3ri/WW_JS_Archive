"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AbyssActivity = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class AbyssActivity {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get ActivityId() {
    return this.activityid();
  }
  get DangoList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.dangolistLength(),
      this.dangolist,
      this,
    );
  }
  get ShopId() {
    return this.shopid();
  }
  get MarkId() {
    return this.markid();
  }
  get SceneActor() {
    return this.sceneactor();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsAbyssActivity(t, s) {
    return (s || new AbyssActivity()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetDangolistAt(t) {
    return this.dangolist(t);
  }
  dangolist(t) {
    var s = this.J7.__offset(this.z7, 6);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  dangolistLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  dangolistArray() {
    var t = this.J7.__offset(this.z7, 6);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  shopid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  markid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  sceneactor(t) {
    var s = this.J7.__offset(this.z7, 12),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
}
exports.AbyssActivity = AbyssActivity;
//# sourceMappingURL=AbyssActivity.js.map
