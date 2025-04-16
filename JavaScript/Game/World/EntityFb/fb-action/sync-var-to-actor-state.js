"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SyncVarToActorState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SyncVarToActorState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsSyncVarToActorState(t, r) {
    return (r || new SyncVarToActorState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSyncVarToActorState(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new SyncVarToActorState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  varName(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  stateKey(t) {
    var r = this.bb.__offset(this.bb_pos, 6);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  static startSyncVarToActorState(t) {
    t.startObject(2);
  }
  static addVarName(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addStateKey(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static endSyncVarToActorState(t) {
    return t.endObject();
  }
  static createSyncVarToActorState(t, r, a) {
    return (
      SyncVarToActorState.startSyncVarToActorState(t),
      SyncVarToActorState.addVarName(t, r),
      SyncVarToActorState.addStateKey(t, a),
      SyncVarToActorState.endSyncVarToActorState(t)
    );
  }
}
exports.SyncVarToActorState = SyncVarToActorState;
//# sourceMappingURL=sync-var-to-actor-state.js.map
