"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAIComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  level_aistate_js_1 = require("../fb-component/level-aistate.js");
class LevelAIComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsLevelAIComponent(t, e) {
    return (e || new LevelAIComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsLevelAIComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new LevelAIComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  states(t, e) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s
      ? (e || new level_aistate_js_1.LevelAIState()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  statesLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  btTreeAsset(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startLevelAIComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addStates(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createStatesVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) e.addOffset(s[t]);
    return e.endVector();
  }
  static startStatesVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addBtTreeAsset(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endLevelAIComponent(t) {
    return t.endObject();
  }
  static createLevelAIComponent(t, e, s, i) {
    return (
      LevelAIComponent.startLevelAIComponent(t),
      LevelAIComponent.addDisabled(t, e),
      LevelAIComponent.addStates(t, s),
      LevelAIComponent.addBtTreeAsset(t, i),
      LevelAIComponent.endLevelAIComponent(t)
    );
  }
}
exports.LevelAIComponent = LevelAIComponent;
//# sourceMappingURL=level-aicomponent.js.map
