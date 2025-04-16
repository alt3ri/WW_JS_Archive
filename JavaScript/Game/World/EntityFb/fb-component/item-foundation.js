"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemFoundation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  adsort_transform_js_1 = require("../fb-component/adsort-transform.js"),
  entity_match_js_1 = require("../fb-component/entity-match.js"),
  item_change_adsorbate_state_js_1 = require("../fb-component/item-change-adsorbate-state.js");
class ItemFoundation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsItemFoundation(t, s) {
    return (s || new ItemFoundation()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsItemFoundation(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new ItemFoundation()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  adsorptionPoint(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s
      ? (t || new adsort_transform_js_1.AdsortTransform()).__init(
          this.bb.__indirect(this.bb_pos + s),
          this.bb,
        )
      : void 0;
  }
  adsorptionMatch(t) {
    var s = this.bb.__offset(this.bb_pos, 8);
    return s
      ? (t || new entity_match_js_1.EntityMatch()).__init(
          this.bb.__indirect(this.bb_pos + s),
          this.bb,
        )
      : void 0;
  }
  activeMatch(t) {
    var s = this.bb.__offset(this.bb_pos, 10);
    return s
      ? (t || new entity_match_js_1.EntityMatch()).__init(
          this.bb.__indirect(this.bb_pos + s),
          this.bb,
        )
      : void 0;
  }
  isSilent() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isDestroy() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  changeAdsorbateState(t) {
    var s = this.bb.__offset(this.bb_pos, 16);
    return s
      ? (
          t || new item_change_adsorbate_state_js_1.ItemChangeAdsorbateState()
        ).__init(this.bb.__indirect(this.bb_pos + s), this.bb)
      : void 0;
  }
  static startItemFoundation(t) {
    t.startObject(7);
  }
  static addDisabled(t, s) {
    t.addFieldInt8(0, +s, 0);
  }
  static addAdsorptionPoint(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static addAdsorptionMatch(t, s) {
    t.addFieldOffset(2, s, 0);
  }
  static addActiveMatch(t, s) {
    t.addFieldOffset(3, s, 0);
  }
  static addIsSilent(t, s) {
    t.addFieldInt8(4, +s, 0);
  }
  static addIsDestroy(t, s) {
    t.addFieldInt8(5, +s, 0);
  }
  static addChangeAdsorbateState(t, s) {
    t.addFieldOffset(6, s, 0);
  }
  static endItemFoundation(t) {
    return t.endObject();
  }
}
exports.ItemFoundation = ItemFoundation;
//# sourceMappingURL=item-foundation.js.map
