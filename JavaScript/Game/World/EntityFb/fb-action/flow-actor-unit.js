"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActorUnit = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  actor_initial_state_js_1 = require("../fb-action/actor-initial-state.js");
class FlowActorUnit {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsFlowActorUnit(t, i) {
    return (i || new FlowActorUnit()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFlowActorUnit(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new FlowActorUnit()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  talkerId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isPlayer() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isResetPosition() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  initialState(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i
      ? (t || new actor_initial_state_js_1.ActorInitialState()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  static startFlowActorUnit(t) {
    t.startObject(5);
  }
  static addEntityId(t, i) {
    t.addFieldInt32(0, i, 0);
  }
  static addTalkerId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addIsPlayer(t, i) {
    t.addFieldInt8(2, +i, 0);
  }
  static addIsResetPosition(t, i) {
    t.addFieldInt8(3, +i, 0);
  }
  static addInitialState(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static endFlowActorUnit(t) {
    return t.endObject();
  }
}
exports.FlowActorUnit = FlowActorUnit;
//# sourceMappingURL=flow-actor-unit.js.map
