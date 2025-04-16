"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DisableAlertAreaQuestCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DisableAlertAreaQuestCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsDisableAlertAreaQuestCondition(t, e) {
    return (e || new DisableAlertAreaQuestCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsDisableAlertAreaQuestCondition(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new DisableAlertAreaQuestCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  relatedQuestId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startDisableAlertAreaQuestCondition(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addRelatedQuestId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endDisableAlertAreaQuestCondition(t) {
    return t.endObject();
  }
  static createDisableAlertAreaQuestCondition(t, e, i) {
    return (
      DisableAlertAreaQuestCondition.startDisableAlertAreaQuestCondition(t),
      DisableAlertAreaQuestCondition.addType(t, e),
      DisableAlertAreaQuestCondition.addRelatedQuestId(t, i),
      DisableAlertAreaQuestCondition.endDisableAlertAreaQuestCondition(t)
    );
  }
}
exports.DisableAlertAreaQuestCondition = DisableAlertAreaQuestCondition;
//# sourceMappingURL=disable-alert-area-quest-condition.js.map
