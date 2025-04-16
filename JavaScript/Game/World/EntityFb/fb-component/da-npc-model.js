"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DaNpcModel = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DaNpcModel {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsDaNpcModel(t, e) {
    return (e || new DaNpcModel()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsDaNpcModel(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new DaNpcModel()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  da(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startDaNpcModel(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addDa(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endDaNpcModel(t) {
    return t.endObject();
  }
  static createDaNpcModel(t, e, s) {
    return (
      DaNpcModel.startDaNpcModel(t),
      DaNpcModel.addType(t, e),
      DaNpcModel.addDa(t, s),
      DaNpcModel.endDaNpcModel(t)
    );
  }
}
exports.DaNpcModel = DaNpcModel;
//# sourceMappingURL=da-npc-model.js.map
