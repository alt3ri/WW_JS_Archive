"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LeisureInteract = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_leisure_interact_option_js_1 = require("../fb-action/union-leisure-interact-option.js");
class LeisureInteract {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsLeisureInteract(t, e) {
    return (e || new LeisureInteract()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsLeisureInteract(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new LeisureInteract()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  optionType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_leisure_interact_option_js_1.UnionLeisureInteractOption.NONE;
  }
  option(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  sceneEntity() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startLeisureInteract(t) {
    t.startObject(3);
  }
  static addOptionType(t, e) {
    t.addFieldInt8(
      0,
      e,
      union_leisure_interact_option_js_1.UnionLeisureInteractOption.NONE,
    );
  }
  static addOption(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addSceneEntity(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static endLeisureInteract(t) {
    return t.endObject();
  }
  static createLeisureInteract(t, e, i, r) {
    return (
      LeisureInteract.startLeisureInteract(t),
      LeisureInteract.addOptionType(t, e),
      LeisureInteract.addOption(t, i),
      LeisureInteract.addSceneEntity(t, r),
      LeisureInteract.endLeisureInteract(t)
    );
  }
}
exports.LeisureInteract = LeisureInteract;
//# sourceMappingURL=leisure-interact.js.map
