"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DarkCoastDelivery = void 0);
class DarkCoastDelivery {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Icon() {
    return this.icon();
  }
  get LevelTexture() {
    return this.leveltexture();
  }
  get LevelIcon() {
    return this.levelicon();
  }
  get LevelSelectIcon() {
    return this.levelselecticon();
  }
  get TipIcon() {
    return this.tipicon();
  }
  get TipLockIcon() {
    return this.tiplockicon();
  }
  get TipName() {
    return this.tipname();
  }
  get TipDesc() {
    return this.tipdesc();
  }
  get RewardCount() {
    return this.rewardcount();
  }
  get UnlockCondition() {
    return this.unlockcondition();
  }
  get VisionTexture() {
    return this.visiontexture();
  }
  get JumpId() {
    return this.jumpid();
  }
  get LevelPlayId() {
    return this.levelplayid();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsDarkCoastDelivery(t, i) {
    return (i || new DarkCoastDelivery()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  icon(t) {
    var i = this.J7.__offset(this.z7, 6);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  leveltexture(t) {
    var i = this.J7.__offset(this.z7, 8);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  levelicon(t) {
    var i = this.J7.__offset(this.z7, 10);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  levelselecticon(t) {
    var i = this.J7.__offset(this.z7, 12);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  tipicon(t) {
    var i = this.J7.__offset(this.z7, 14);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  tiplockicon(t) {
    var i = this.J7.__offset(this.z7, 16);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  tipname(t) {
    var i = this.J7.__offset(this.z7, 18);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  tipdesc(t) {
    var i = this.J7.__offset(this.z7, 20);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  rewardcount() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  unlockcondition(t) {
    var i = this.J7.__offset(this.z7, 24);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  visiontexture(t) {
    var i = this.J7.__offset(this.z7, 26);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  jumpid() {
    var t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  levelplayid() {
    var t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.DarkCoastDelivery = DarkCoastDelivery;
//# sourceMappingURL=DarkCoastDelivery.js.map
