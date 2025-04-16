"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GroupFinishDestroy = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  entity_state_js_1 = require("../fb-component/entity-state.js");
class GroupFinishDestroy {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsGroupFinishDestroy(t, s) {
    return (s || new GroupFinishDestroy()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsGroupFinishDestroy(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new GroupFinishDestroy()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  switchSpecifiedStatus(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s
      ? (t || new entity_state_js_1.EntityState()).__init(
          this.bb.__indirect(this.bb_pos + s),
          this.bb,
        )
      : void 0;
  }
  static startGroupFinishDestroy(t) {
    t.startObject(2);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addSwitchSpecifiedStatus(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static endGroupFinishDestroy(t) {
    return t.endObject();
  }
}
exports.GroupFinishDestroy = GroupFinishDestroy;
//# sourceMappingURL=group-finish-destroy.js.map
