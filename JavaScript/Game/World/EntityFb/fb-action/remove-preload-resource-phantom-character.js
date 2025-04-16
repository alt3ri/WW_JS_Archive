"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RemovePreloadResourcePhantomCharacter = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_delay_remove_config_js_1 = require("../fb-action/union-delay-remove-config.js");
class RemovePreloadResourcePhantomCharacter {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, r) {
    return (this.bb_pos = e), (this.bb = r), this;
  }
  static getRootAsRemovePreloadResourcePhantomCharacter(e, r) {
    return (r || new RemovePreloadResourcePhantomCharacter()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsRemovePreloadResourcePhantomCharacter(e, r) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new RemovePreloadResourcePhantomCharacter()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, e) : void 0;
  }
  id() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  delayReMoveType() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_delay_remove_config_js_1.UnionDelayRemoveConfig.NONE;
  }
  delayReMove(e) {
    var r = this.bb.__offset(this.bb_pos, 10);
    return r ? this.bb.__union(e, this.bb_pos + r) : void 0;
  }
  static startRemovePreloadResourcePhantomCharacter(e) {
    e.startObject(4);
  }
  static addType(e, r) {
    e.addFieldOffset(0, r, 0);
  }
  static addId(e, r) {
    e.addFieldInt32(1, r, 0);
  }
  static addDelayReMoveType(e, r) {
    e.addFieldInt8(
      2,
      r,
      union_delay_remove_config_js_1.UnionDelayRemoveConfig.NONE,
    );
  }
  static addDelayReMove(e, r) {
    e.addFieldOffset(3, r, 0);
  }
  static endRemovePreloadResourcePhantomCharacter(e) {
    return e.endObject();
  }
  static createRemovePreloadResourcePhantomCharacter(e, r, t, a, o) {
    return (
      RemovePreloadResourcePhantomCharacter.startRemovePreloadResourcePhantomCharacter(
        e,
      ),
      RemovePreloadResourcePhantomCharacter.addType(e, r),
      RemovePreloadResourcePhantomCharacter.addId(e, t),
      RemovePreloadResourcePhantomCharacter.addDelayReMoveType(e, a),
      RemovePreloadResourcePhantomCharacter.addDelayReMove(e, o),
      RemovePreloadResourcePhantomCharacter.endRemovePreloadResourcePhantomCharacter(
        e,
      )
    );
  }
}
exports.RemovePreloadResourcePhantomCharacter =
  RemovePreloadResourcePhantomCharacter;
//# sourceMappingURL=remove-preload-resource-phantom-character.js.map
