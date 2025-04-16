"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BvbStartBattleData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbStartBattleData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsBvbStartBattleData(t, a) {
    return (a || new BvbStartBattleData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBvbStartBattleData(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new BvbStartBattleData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  static startBvbStartBattleData(t) {
    t.startObject(1);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static endBvbStartBattleData(t) {
    return t.endObject();
  }
  static createBvbStartBattleData(t, a) {
    return (
      BvbStartBattleData.startBvbStartBattleData(t),
      BvbStartBattleData.addType(t, a),
      BvbStartBattleData.endBvbStartBattleData(t)
    );
  }
}
exports.BvbStartBattleData = BvbStartBattleData;
//# sourceMappingURL=bvb-start-battle-data.js.map
