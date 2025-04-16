"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcUiInteractOnChengXiaoShanShop = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  play_flow_js_1 = require("../fb-action/play-flow.js");
class NpcUiInteractOnChengXiaoShanShop {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsNpcUiInteractOnChengXiaoShanShop(t, i) {
    return (i || new NpcUiInteractOnChengXiaoShanShop()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsNpcUiInteractOnChengXiaoShanShop(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new NpcUiInteractOnChengXiaoShanShop()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  enterMontage(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  standByMontage(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  shopSuccessMontage(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  enterFlow(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i
      ? (t || new play_flow_js_1.PlayFlow()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  shopFailedFlow(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    return i
      ? (t || new play_flow_js_1.PlayFlow()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  shopSuccessFlow(t) {
    var i = this.bb.__offset(this.bb_pos, 16);
    return i
      ? (t || new play_flow_js_1.PlayFlow()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  upgradeSequence(t) {
    var i = this.bb.__offset(this.bb_pos, 18);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  finishDeliverySequence(t) {
    var i = this.bb.__offset(this.bb_pos, 20);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  showNpcWhilePlayingSequence() {
    var t = this.bb.__offset(this.bb_pos, 22);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startNpcUiInteractOnChengXiaoShanShop(t) {
    t.startObject(10);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addEnterMontage(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addStandByMontage(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addShopSuccessMontage(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addEnterFlow(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static addShopFailedFlow(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static addShopSuccessFlow(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static addUpgradeSequence(t, i) {
    t.addFieldOffset(7, i, 0);
  }
  static addFinishDeliverySequence(t, i) {
    t.addFieldOffset(8, i, 0);
  }
  static addShowNpcWhilePlayingSequence(t, i) {
    t.addFieldInt8(9, +i, 0);
  }
  static endNpcUiInteractOnChengXiaoShanShop(t) {
    return t.endObject();
  }
}
exports.NpcUiInteractOnChengXiaoShanShop = NpcUiInteractOnChengXiaoShanShop;
//# sourceMappingURL=npc-ui-interact-on-cheng-xiao-shan-shop.js.map
