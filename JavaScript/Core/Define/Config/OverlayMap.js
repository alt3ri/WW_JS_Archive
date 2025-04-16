"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OverlayMap = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class OverlayMap {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get OverlayMapId() {
    return this.overlaymapid();
  }
  get MapId() {
    return this.mapid();
  }
  get GravityFlip() {
    return this.gravityflip();
  }
  get MapAddress() {
    return this.mapaddress();
  }
  get MapPos() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.mapposLength(),
      this.mappos,
      this,
    );
  }
  get Rotation() {
    return this.rotation();
  }
  get WidthHeight() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.widthheightLength(),
      this.widthheight,
      this,
    );
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsOverlayMap(t, i) {
    return (i || new OverlayMap()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  overlaymapid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  mapid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  gravityflip() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  mapaddress(t) {
    var i = this.J7.__offset(this.z7, 10),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  GetMapposAt(t) {
    return this.mappos(t);
  }
  mappos(t) {
    var i = this.J7.__offset(this.z7, 12);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  mapposLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  mapposArray() {
    var t = this.J7.__offset(this.z7, 12);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  rotation() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetWidthheightAt(t) {
    return this.widthheight(t);
  }
  widthheight(t) {
    var i = this.J7.__offset(this.z7, 16);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  widthheightLength() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  widthheightArray() {
    var t = this.J7.__offset(this.z7, 16);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
}
exports.OverlayMap = OverlayMap;
//# sourceMappingURL=OverlayMap.js.map
