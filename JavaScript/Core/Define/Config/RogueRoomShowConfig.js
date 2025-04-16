"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueRoomShowConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueRoomShowConfig {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get BehaviorTree() {
    return this.behaviortree();
  }
  get Icon() {
    return this.icon();
  }
  get Name() {
    return this.name();
  }
  get Desc() {
    return this.desc();
  }
  get BuffPoolId() {
    return this.buffpoolid();
  }
  get BuffId() {
    return this.buffid();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsRogueRoomShowConfig(t, i) {
    return (i || new RogueRoomShowConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  behaviortree() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  icon(t) {
    var i = this.J7.__offset(this.z7, 6),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 8),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  desc(t) {
    var i = this.J7.__offset(this.z7, 10),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  buffpoolid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  buffid() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.RogueRoomShowConfig = RogueRoomShowConfig;
//# sourceMappingURL=RogueRoomShowConfig.js.map
