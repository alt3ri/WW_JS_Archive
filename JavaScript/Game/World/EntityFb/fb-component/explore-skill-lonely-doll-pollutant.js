"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreSkillLonelyDollPollutant = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ExploreSkillLonelyDollPollutant {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(l, t) {
    return (this.bb_pos = l), (this.bb = t), this;
  }
  static getRootAsExploreSkillLonelyDollPollutant(l, t) {
    return (t || new ExploreSkillLonelyDollPollutant()).__init(
      l.readInt32(l.position()) + l.position(),
      l,
    );
  }
  static getSizePrefixedRootAsExploreSkillLonelyDollPollutant(l, t) {
    return (
      l.setPosition(l.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new ExploreSkillLonelyDollPollutant()).__init(
        l.readInt32(l.position()) + l.position(),
        l,
      )
    );
  }
  type(l) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, l) : void 0;
  }
  static startExploreSkillLonelyDollPollutant(l) {
    l.startObject(1);
  }
  static addType(l, t) {
    l.addFieldOffset(0, t, 0);
  }
  static endExploreSkillLonelyDollPollutant(l) {
    return l.endObject();
  }
  static createExploreSkillLonelyDollPollutant(l, t) {
    return (
      ExploreSkillLonelyDollPollutant.startExploreSkillLonelyDollPollutant(l),
      ExploreSkillLonelyDollPollutant.addType(l, t),
      ExploreSkillLonelyDollPollutant.endExploreSkillLonelyDollPollutant(l)
    );
  }
}
exports.ExploreSkillLonelyDollPollutant = ExploreSkillLonelyDollPollutant;
//# sourceMappingURL=explore-skill-lonely-doll-pollutant.js.map
