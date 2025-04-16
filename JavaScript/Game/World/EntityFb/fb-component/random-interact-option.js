"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RandomInteractOption = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  interact_option_js_1 = require("../fb-action/interact-option.js");
class RandomInteractOption {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsRandomInteractOption(t, i) {
    return (i || new RandomInteractOption()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsRandomInteractOption(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new RandomInteractOption()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  weight() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  option(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (t || new interact_option_js_1.InteractOption()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  static startRandomInteractOption(t) {
    t.startObject(2);
  }
  static addWeight(t, i) {
    t.addFieldInt32(0, i, 0);
  }
  static addOption(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endRandomInteractOption(t) {
    return t.endObject();
  }
}
exports.RandomInteractOption = RandomInteractOption;
//# sourceMappingURL=random-interact-option.js.map
