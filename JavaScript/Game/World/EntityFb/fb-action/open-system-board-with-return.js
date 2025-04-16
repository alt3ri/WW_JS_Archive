"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemBoardWithReturn = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_open_system_board_with_return_js_1 = require("../fb-action/union-open-system-board-with-return.js");
class OpenSystemBoardWithReturn {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsOpenSystemBoardWithReturn(t, e) {
    return (e || new OpenSystemBoardWithReturn()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsOpenSystemBoardWithReturn(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new OpenSystemBoardWithReturn()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  systemTypeType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_open_system_board_with_return_js_1.UnionOpenSystemBoardWithReturn
          .NONE;
  }
  systemType(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startOpenSystemBoardWithReturn(t) {
    t.startObject(2);
  }
  static addSystemTypeType(t, e) {
    t.addFieldInt8(
      0,
      e,
      union_open_system_board_with_return_js_1.UnionOpenSystemBoardWithReturn
        .NONE,
    );
  }
  static addSystemType(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endOpenSystemBoardWithReturn(t) {
    return t.endObject();
  }
  static createOpenSystemBoardWithReturn(t, e, r) {
    return (
      OpenSystemBoardWithReturn.startOpenSystemBoardWithReturn(t),
      OpenSystemBoardWithReturn.addSystemTypeType(t, e),
      OpenSystemBoardWithReturn.addSystemType(t, r),
      OpenSystemBoardWithReturn.endOpenSystemBoardWithReturn(t)
    );
  }
}
exports.OpenSystemBoardWithReturn = OpenSystemBoardWithReturn;
//# sourceMappingURL=open-system-board-with-return.js.map
