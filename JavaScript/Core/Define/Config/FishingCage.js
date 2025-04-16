"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingCage = void 0);
class FishingCage {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get EntityConfigId() {
    return this.entityconfigid();
  }
  get SceneConfigId() {
    return this.sceneconfigid();
  }
  get UnlockCondition() {
    return this.unlockcondition();
  }
  get CountLimit() {
    return this.countlimit();
  }
  get RefreshTime() {
    return this.refreshtime();
  }
  get OutputGroupId() {
    return this.outputgroupid();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsFishingCage(t, i) {
    return (i || new FishingCage()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  entityconfigid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  sceneconfigid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 8;
  }
  unlockcondition() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  countlimit() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  refreshtime() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  outputgroupid() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.FishingCage = FishingCage;
//# sourceMappingURL=FishingCage.js.map
