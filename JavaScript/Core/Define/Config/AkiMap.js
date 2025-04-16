"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AkiMap = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class AkiMap {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get MapId() {
    return this.mapid();
  }
  get MapName() {
    return this.mapname();
  }
  get FatherMap() {
    return this.fathermap();
  }
  get GroupMark() {
    return this.groupmark();
  }
  get Floor() {
    return this.floor();
  }
  get SwitchCondition() {
    return this.switchcondition();
  }
  get MapPic3d() {
    return this.mappic3d();
  }
  get MapPic2d() {
    return this.mappic2d();
  }
  get BigMapDefaultScale() {
    return this.bigmapdefaultscale();
  }
  get BigMapMinScale() {
    return this.bigmapminscale();
  }
  get BigMapMaxScale() {
    return this.bigmapmaxscale();
  }
  get LittleMapDefaultScale() {
    return this.littlemapdefaultscale();
  }
  get LimitContent() {
    return this.limitcontent();
  }
  get IsGravityMap() {
    return this.isgravitymap();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsAkiMap(t, i) {
    return (i || new AkiMap()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  mapid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  mapname(t) {
    var i = this.J7.__offset(this.z7, 6),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  fathermap() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  groupmark() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  floor() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  switchcondition(t) {
    var i = this.J7.__offset(this.z7, 14),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  mappic3d(t) {
    var i = this.J7.__offset(this.z7, 16),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  mappic2d(t) {
    var i = this.J7.__offset(this.z7, 18),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  bigmapdefaultscale() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  bigmapminscale() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  bigmapmaxscale() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  littlemapdefaultscale() {
    var t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  limitcontent(t) {
    var i = this.J7.__offset(this.z7, 28),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  isgravitymap() {
    var t = this.J7.__offset(this.z7, 30);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.AkiMap = AkiMap;
//# sourceMappingURL=AkiMap.js.map
