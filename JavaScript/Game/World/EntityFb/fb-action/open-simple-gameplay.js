"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSimpleGameplay = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_ui_game_js_1 = require("../fb-action/union-ui-game.js");
class OpenSimpleGameplay {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, i) {
    return (this.bb_pos = e), (this.bb = i), this;
  }
  static getRootAsOpenSimpleGameplay(e, i) {
    return (i || new OpenSimpleGameplay()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsOpenSimpleGameplay(e, i) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new OpenSimpleGameplay()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  gameplayConfigType() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_ui_game_js_1.UnionUiGame.NONE;
  }
  gameplayConfig(e) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__union(e, this.bb_pos + i) : void 0;
  }
  finishSendSelfEvent(e) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__string(this.bb_pos + i, e) : void 0;
  }
  static startOpenSimpleGameplay(e) {
    e.startObject(3);
  }
  static addGameplayConfigType(e, i) {
    e.addFieldInt8(0, i, union_ui_game_js_1.UnionUiGame.NONE);
  }
  static addGameplayConfig(e, i) {
    e.addFieldOffset(1, i, 0);
  }
  static addFinishSendSelfEvent(e, i) {
    e.addFieldOffset(2, i, 0);
  }
  static endOpenSimpleGameplay(e) {
    return e.endObject();
  }
  static createOpenSimpleGameplay(e, i, t, a) {
    return (
      OpenSimpleGameplay.startOpenSimpleGameplay(e),
      OpenSimpleGameplay.addGameplayConfigType(e, i),
      OpenSimpleGameplay.addGameplayConfig(e, t),
      OpenSimpleGameplay.addFinishSendSelfEvent(e, a),
      OpenSimpleGameplay.endOpenSimpleGameplay(e)
    );
  }
}
exports.OpenSimpleGameplay = OpenSimpleGameplay;
//# sourceMappingURL=open-simple-gameplay.js.map
