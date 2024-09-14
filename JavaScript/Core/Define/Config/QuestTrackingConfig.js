"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestTrackingConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class QuestTrackingConfig {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get PreQuestIds() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.prequestidsLength(),
      this.prequestids,
      this,
    );
  }
  get TrackQuestId() {
    return this.trackquestid();
  }
  get Desc() {
    return this.desc();
  }
  get Priority() {
    return this.priority();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsQuestTrackingConfig(t, s) {
    return (s || new QuestTrackingConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetPrequestidsAt(t) {
    return this.prequestids(t);
  }
  prequestids(t) {
    var s = this.J7.__offset(this.z7, 6);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  prequestidsLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  prequestidsArray() {
    var t = this.J7.__offset(this.z7, 6);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  trackquestid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  desc(t) {
    var s = this.J7.__offset(this.z7, 10);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  priority() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.QuestTrackingConfig = QuestTrackingConfig;
//# sourceMappingURL=QuestTrackingConfig.js.map
