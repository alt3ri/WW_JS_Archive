"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GamePlayScan = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  Vector_1 = require("./SubType/Vector");
class GamePlayScan {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get UId() {
    return this.uid();
  }
  get IconPath() {
    return this.iconpath();
  }
  get Interval() {
    return this.interval();
  }
  get Offset() {
    return this.offset();
  }
  get ResourcePath() {
    return this.resourcepath();
  }
  get Color() {
    return this.color();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsGamePlayScan(t, e) {
    return (e || new GamePlayScan()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  uid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  iconpath(t) {
    var e = this.J7.__offset(this.z7, 6),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  interval() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readFloat32(this.z7 + t) : 8;
  }
  offset(t) {
    var e = this.J7.__offset(this.z7, 10);
    return e
      ? (t || new Vector_1.Vector()).__init(
          this.J7.__indirect(this.z7 + e),
          this.J7,
        )
      : null;
  }
  resourcepath(t) {
    var e = this.J7.__offset(this.z7, 12),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  color() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.GamePlayScan = GamePlayScan;
//# sourceMappingURL=GamePlayScan.js.map
