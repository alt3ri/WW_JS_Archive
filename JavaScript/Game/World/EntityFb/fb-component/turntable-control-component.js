"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TurntableControlComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_turntable_controller_js_1 = require("../fb-component/union-turntable-controller.js");
class TurntableControlComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, n) {
    return (this.bb_pos = t), (this.bb = n), this;
  }
  static getRootAsTurntableControlComponent(t, n) {
    return (n || new TurntableControlComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTurntableControlComponent(t, n) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (n || new TurntableControlComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  configType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_turntable_controller_js_1.UnionTurntableController.NONE;
  }
  config(t) {
    var n = this.bb.__offset(this.bb_pos, 8);
    return n ? this.bb.__union(t, this.bb_pos + n) : void 0;
  }
  static startTurntableControlComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, n) {
    t.addFieldInt8(0, +n, 0);
  }
  static addConfigType(t, n) {
    t.addFieldInt8(
      1,
      n,
      union_turntable_controller_js_1.UnionTurntableController.NONE,
    );
  }
  static addConfig(t, n) {
    t.addFieldOffset(2, n, 0);
  }
  static endTurntableControlComponent(t) {
    return t.endObject();
  }
  static createTurntableControlComponent(t, n, o, e) {
    return (
      TurntableControlComponent.startTurntableControlComponent(t),
      TurntableControlComponent.addDisabled(t, n),
      TurntableControlComponent.addConfigType(t, o),
      TurntableControlComponent.addConfig(t, e),
      TurntableControlComponent.endTurntableControlComponent(t)
    );
  }
}
exports.TurntableControlComponent = TurntableControlComponent;
//# sourceMappingURL=turntable-control-component.js.map
