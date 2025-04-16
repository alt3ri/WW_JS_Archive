"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueWeeklyRoomType = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueWeeklyRoomType {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get RoomType() {
    return this.roomtype();
  }
  get RoomsMusicState() {
    return this.roomsmusicstate();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsRogueWeeklyRoomType(t, e) {
    return (e || new RogueWeeklyRoomType()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  roomtype(t) {
    var e = this.J7.__offset(this.z7, 6),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  roomsmusicstate(t) {
    var e = this.J7.__offset(this.z7, 8),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
}
exports.RogueWeeklyRoomType = RogueWeeklyRoomType;
//# sourceMappingURL=RogueWeeklyRoomType.js.map
