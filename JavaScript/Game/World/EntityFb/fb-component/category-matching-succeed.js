"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CategoryMatchingSucceed = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  entity_state_js_1 = require("../fb-component/entity-state.js"),
  item_change_adsorbate_state_js_1 = require("../fb-component/item-change-adsorbate-state.js");
class CategoryMatchingSucceed {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCategoryMatchingSucceed(t, e) {
    return (e || new CategoryMatchingSucceed()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCategoryMatchingSucceed(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CategoryMatchingSucceed()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  isSilent() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isDestroy() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  syncAdsorbatePerformance() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  changeSelfState(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  changeSelfStateAfterDischarged(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  changeItemState(t) {
    var e = this.bb.__offset(this.bb_pos, 14);
    return e
      ? (t || new entity_state_js_1.EntityState()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  changeItemStateAfterDischarged(t) {
    var e = this.bb.__offset(this.bb_pos, 16);
    return e
      ? (t || new entity_state_js_1.EntityState()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  changeAdsorbateState(t) {
    var e = this.bb.__offset(this.bb_pos, 18);
    return e
      ? (
          t || new item_change_adsorbate_state_js_1.ItemChangeAdsorbateState()
        ).__init(this.bb.__indirect(this.bb_pos + e), this.bb)
      : void 0;
  }
  dischargeSequence(t) {
    var e = this.bb.__offset(this.bb_pos, 20);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startCategoryMatchingSucceed(t) {
    t.startObject(9);
  }
  static addIsSilent(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addIsDestroy(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static addSyncAdsorbatePerformance(t, e) {
    t.addFieldInt8(2, +e, 0);
  }
  static addChangeSelfState(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addChangeSelfStateAfterDischarged(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static addChangeItemState(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static addChangeItemStateAfterDischarged(t, e) {
    t.addFieldOffset(6, e, 0);
  }
  static addChangeAdsorbateState(t, e) {
    t.addFieldOffset(7, e, 0);
  }
  static addDischargeSequence(t, e) {
    t.addFieldOffset(8, e, 0);
  }
  static endCategoryMatchingSucceed(t) {
    return t.endObject();
  }
}
exports.CategoryMatchingSucceed = CategoryMatchingSucceed;
//# sourceMappingURL=category-matching-succeed.js.map
