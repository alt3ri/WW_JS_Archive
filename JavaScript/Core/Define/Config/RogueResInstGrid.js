"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueResInstGrid = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueResInstGrid {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get SubLevelArray() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.sublevelarrayLength(),
      this.sublevelarray,
      this,
    );
  }
  get Title() {
    return this.title();
  }
  get MapScaleMin() {
    return this.mapscalemin();
  }
  get MapScaleMax() {
    return this.mapscalemax();
  }
  get MapInitScale() {
    return this.mapinitscale();
  }
  get MapHeight() {
    return this.mapheight();
  }
  get MapWidth() {
    return this.mapwidth();
  }
  get MapBackground() {
    return this.mapbackground();
  }
  get MapMusicState() {
    return this.mapmusicstate();
  }
  get LoseTitle() {
    return this.losetitle();
  }
  get LoseDesc() {
    return this.losedesc();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsRogueResInstGrid(t, s) {
    return (s || new RogueResInstGrid()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetSublevelarrayAt(t) {
    return this.sublevelarray(t);
  }
  sublevelarray(t, s) {
    var i = this.J7.__offset(this.z7, 6),
      i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  sublevelarrayLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  title(t) {
    var s = this.J7.__offset(this.z7, 8),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  mapscalemin() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 1e3;
  }
  mapscalemax() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 2e3;
  }
  mapinitscale() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 1e3;
  }
  mapheight() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 6e3;
  }
  mapwidth() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 6e3;
  }
  mapbackground(t) {
    var s = this.J7.__offset(this.z7, 20),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  mapmusicstate(t) {
    var s = this.J7.__offset(this.z7, 22),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  losetitle(t) {
    var s = this.J7.__offset(this.z7, 24),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  losedesc(t) {
    var s = this.J7.__offset(this.z7, 26),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
}
exports.RogueResInstGrid = RogueResInstGrid;
//# sourceMappingURL=RogueResInstGrid.js.map
