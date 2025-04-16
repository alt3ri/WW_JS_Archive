"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AttachTargetComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_attach_target_js_1 = require("../fb-component/union-attach-target.js");
class AttachTargetComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsAttachTargetComponent(t, e) {
    return (e || new AttachTargetComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsAttachTargetComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new AttachTargetComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  attachTargetType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_attach_target_js_1.UnionAttachTarget.NONE;
  }
  attachTarget(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  posRule(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  rotRule(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startAttachTargetComponent(t) {
    t.startObject(5);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addAttachTargetType(t, e) {
    t.addFieldInt8(1, e, union_attach_target_js_1.UnionAttachTarget.NONE);
  }
  static addAttachTarget(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addPosRule(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addRotRule(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static endAttachTargetComponent(t) {
    return t.endObject();
  }
  static createAttachTargetComponent(t, e, a, r, s, n) {
    return (
      AttachTargetComponent.startAttachTargetComponent(t),
      AttachTargetComponent.addDisabled(t, e),
      AttachTargetComponent.addAttachTargetType(t, a),
      AttachTargetComponent.addAttachTarget(t, r),
      AttachTargetComponent.addPosRule(t, s),
      AttachTargetComponent.addRotRule(t, n),
      AttachTargetComponent.endAttachTargetComponent(t)
    );
  }
}
exports.AttachTargetComponent = AttachTargetComponent;
//# sourceMappingURL=attach-target-component.js.map
