"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PreOpenDetection = void 0);
class PreOpenDetection {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get SoundAreaType() {
    return this.soundareatype();
  }
  get DetectionId() {
    return this.detectionid();
  }
  get ConditionGroup() {
    return this.conditiongroup();
  }
  get TeleportEntityId() {
    return this.teleportentityid();
  }
  get DungeonEntranceId() {
    return this.dungeonentranceid();
  }
  get InstanceID() {
    return this.instanceid();
  }
  get Spoiler() {
    return this.spoiler();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsPreOpenDetection(t, e) {
    return (e || new PreOpenDetection()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  soundareatype() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  detectionid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  conditiongroup() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  teleportentityid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  dungeonentranceid() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  instanceid() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  spoiler() {
    var t = this.J7.__offset(this.z7, 18);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.PreOpenDetection = PreOpenDetection;
//# sourceMappingURL=PreOpenDetection.js.map
