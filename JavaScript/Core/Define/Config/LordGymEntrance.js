"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LordGymEntrance = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class LordGymEntrance {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get MarkId() {
    return this.markid();
  }
  get LordGymList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.lordgymlistLength(),
      this.lordgymlist,
      this,
    );
  }
  get EntranceTitle() {
    return this.entrancetitle();
  }
  get EntranceDescription() {
    return this.entrancedescription();
  }
  get MeshId() {
    return this.meshid();
  }
  get Zoom() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.zoomLength(),
      this.zoom,
      this,
    );
  }
  get Location() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.locationLength(),
      this.location,
      this,
    );
  }
  get Rotator() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.rotatorLength(),
      this.rotator,
      this,
    );
  }
  get LordChangeMaterialController() {
    return this.lordchangematerialcontroller();
  }
  get LordIdleMaterialController() {
    return this.lordidlematerialcontroller();
  }
  get StandAnim() {
    return this.standanim();
  }
  get IsDebug() {
    return this.isdebug();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsLordGymEntrance(t, i) {
    return (i || new LordGymEntrance()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  markid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetLordgymlistAt(t) {
    return this.lordgymlist(t);
  }
  lordgymlist(t) {
    var i = this.J7.__offset(this.z7, 8);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  lordgymlistLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  lordgymlistArray() {
    var t = this.J7.__offset(this.z7, 8);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  entrancetitle(t) {
    var i = this.J7.__offset(this.z7, 10),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  entrancedescription(t) {
    var i = this.J7.__offset(this.z7, 12),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  meshid() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetZoomAt(t) {
    return this.zoom(t);
  }
  zoom(t) {
    var i = this.J7.__offset(this.z7, 16);
    return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  zoomLength() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  zoomArray() {
    var t = this.J7.__offset(this.z7, 16);
    return t
      ? new Float32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetLocationAt(t) {
    return this.location(t);
  }
  location(t) {
    var i = this.J7.__offset(this.z7, 18);
    return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  locationLength() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  locationArray() {
    var t = this.J7.__offset(this.z7, 18);
    return t
      ? new Float32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetRotatorAt(t) {
    return this.rotator(t);
  }
  rotator(t) {
    var i = this.J7.__offset(this.z7, 20);
    return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  rotatorLength() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  rotatorArray() {
    var t = this.J7.__offset(this.z7, 20);
    return t
      ? new Float32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  lordchangematerialcontroller(t) {
    var i = this.J7.__offset(this.z7, 22),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  lordidlematerialcontroller(t) {
    var i = this.J7.__offset(this.z7, 24),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  standanim(t) {
    var i = this.J7.__offset(this.z7, 26),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  isdebug() {
    var t = this.J7.__offset(this.z7, 28);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.LordGymEntrance = LordGymEntrance;
//# sourceMappingURL=LordGymEntrance.js.map
