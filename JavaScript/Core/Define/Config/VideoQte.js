"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VideoQte = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class VideoQte {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get CgName() {
    return this.cgname();
  }
  get QteId() {
    return this.qteid();
  }
  get ShowMoment() {
    return this.showmoment();
  }
  get ShowMomentEn() {
    return this.showmomenten();
  }
  get ShowMomentKo() {
    return this.showmomentko();
  }
  get ShowMomentJa() {
    return this.showmomentja();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsVideoQte(t, e) {
    return (e || new VideoQte()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  cgname(t) {
    var e = this.J7.__offset(this.z7, 6),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  qteid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  showmoment() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  showmomenten() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  showmomentko() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  showmomentja() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.VideoQte = VideoQte;
//# sourceMappingURL=VideoQte.js.map
