"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActorStateComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ActorStateComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsActorStateComponent(t, e) {
    return (e || new ActorStateComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsActorStateComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ActorStateComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  initState(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startActorStateComponent(t) {
    t.startObject(2);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addInitState(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endActorStateComponent(t) {
    return t.endObject();
  }
  static createActorStateComponent(t, e, o) {
    return (
      ActorStateComponent.startActorStateComponent(t),
      ActorStateComponent.addDisabled(t, e),
      ActorStateComponent.addInitState(t, o),
      ActorStateComponent.endActorStateComponent(t)
    );
  }
}
exports.ActorStateComponent = ActorStateComponent;
//# sourceMappingURL=actor-state-component.js.map
