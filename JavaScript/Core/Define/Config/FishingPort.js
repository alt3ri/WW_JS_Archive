"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingPort = void 0);
class FishingPort {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get EntityConfigId() {
    return this.entityconfigid();
  }
  get NpcEntityConfigId() {
    return this.npcentityconfigid();
  }
  get UnlockCondition() {
    return this.unlockcondition();
  }
  get SceneConfigId() {
    return this.sceneconfigid();
  }
  get SailingPoint() {
    return this.sailingpoint();
  }
  get AshorePoint() {
    return this.ashorepoint();
  }
  get MarkId() {
    return this.markid();
  }
  get ShopId() {
    return this.shopid();
  }
  get EnterRange() {
    return this.enterrange();
  }
  get LeaveRange() {
    return this.leaverange();
  }
  get RangeCenter() {
    return this.rangecenter();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsFishingPort(t, i) {
    return (i || new FishingPort()).__init(
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
  npcentityconfigid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  unlockcondition() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  sceneconfigid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 8;
  }
  sailingpoint() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  ashorepoint() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  markid() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  shopid() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  enterrange() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  leaverange() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  rangecenter() {
    var t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.FishingPort = FishingPort;
//# sourceMappingURL=FishingPort.js.map
