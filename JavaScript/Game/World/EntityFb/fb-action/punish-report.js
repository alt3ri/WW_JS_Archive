"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PunishReport = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PunishReport {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsPunishReport(t, s) {
    return (s || new PunishReport()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPunishReport(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new PunishReport()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  mainText(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  subText(t) {
    var s = this.bb.__offset(this.bb_pos, 8);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  static startPunishReport(t) {
    t.startObject(3);
  }
  static addType(t, s) {
    t.addFieldInt8(0, s, 0);
  }
  static addMainText(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static addSubText(t, s) {
    t.addFieldOffset(2, s, 0);
  }
  static endPunishReport(t) {
    return t.endObject();
  }
  static createPunishReport(t, s, e, i) {
    return (
      PunishReport.startPunishReport(t),
      PunishReport.addType(t, s),
      PunishReport.addMainText(t, e),
      PunishReport.addSubText(t, i),
      PunishReport.endPunishReport(t)
    );
  }
}
exports.PunishReport = PunishReport;
//# sourceMappingURL=punish-report.js.map
