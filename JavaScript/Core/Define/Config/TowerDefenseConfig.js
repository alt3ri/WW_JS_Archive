"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDefenseConfig = void 0);
class TowerDefenseConfig {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ShowDifferent() {
    return this.showdifferent();
  }
  get ActivityType() {
    return this.activitytype();
  }
  get EntranceId() {
    return this.entranceid();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsTowerDefenseConfig(t, e) {
    return (e || new TowerDefenseConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  showdifferent() {
    var t = this.J7.__offset(this.z7, 6);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  activitytype() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  entranceid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.TowerDefenseConfig = TowerDefenseConfig;
//# sourceMappingURL=TowerDefenseConfig.js.map
