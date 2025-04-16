"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckFormationRoleInfoCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_check_formation_role_info_js_1 = require("../fb-condition/union-check-formation-role-info.js");
class CheckFormationRoleInfoCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(o, t) {
    return (this.bb_pos = o), (this.bb = t), this;
  }
  static getRootAsCheckFormationRoleInfoCondition(o, t) {
    return (t || new CheckFormationRoleInfoCondition()).__init(
      o.readInt32(o.position()) + o.position(),
      o,
    );
  }
  static getSizePrefixedRootAsCheckFormationRoleInfoCondition(o, t) {
    return (
      o.setPosition(o.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CheckFormationRoleInfoCondition()).__init(
        o.readInt32(o.position()) + o.position(),
        o,
      )
    );
  }
  type(o) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, o) : void 0;
  }
  optionType() {
    var o = this.bb.__offset(this.bb_pos, 6);
    return o
      ? this.bb.readUint8(this.bb_pos + o)
      : union_check_formation_role_info_js_1.UnionCheckFormationRoleInfo.NONE;
  }
  option(o) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__union(o, this.bb_pos + t) : void 0;
  }
  static startCheckFormationRoleInfoCondition(o) {
    o.startObject(3);
  }
  static addType(o, t) {
    o.addFieldOffset(0, t, 0);
  }
  static addOptionType(o, t) {
    o.addFieldInt8(
      1,
      t,
      union_check_formation_role_info_js_1.UnionCheckFormationRoleInfo.NONE,
    );
  }
  static addOption(o, t) {
    o.addFieldOffset(2, t, 0);
  }
  static endCheckFormationRoleInfoCondition(o) {
    return o.endObject();
  }
  static createCheckFormationRoleInfoCondition(o, t, i, n) {
    return (
      CheckFormationRoleInfoCondition.startCheckFormationRoleInfoCondition(o),
      CheckFormationRoleInfoCondition.addType(o, t),
      CheckFormationRoleInfoCondition.addOptionType(o, i),
      CheckFormationRoleInfoCondition.addOption(o, n),
      CheckFormationRoleInfoCondition.endCheckFormationRoleInfoCondition(o)
    );
  }
}
exports.CheckFormationRoleInfoCondition = CheckFormationRoleInfoCondition;
//# sourceMappingURL=check-formation-role-info-condition.js.map
