"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PickInteractComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_pick_interaction_js_1 = require("../fb-component/union-pick-interaction.js");
class PickInteractComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsPickInteractComponent(t, e) {
    return (e || new PickInteractComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPickInteractComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new PickInteractComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  pickInteractTypeType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_pick_interaction_js_1.UnionPickInteraction.NONE;
  }
  pickInteractType(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startPickInteractComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addPickInteractTypeType(t, e) {
    t.addFieldInt8(1, e, union_pick_interaction_js_1.UnionPickInteraction.NONE);
  }
  static addPickInteractType(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endPickInteractComponent(t) {
    return t.endObject();
  }
  static createPickInteractComponent(t, e, n, i) {
    return (
      PickInteractComponent.startPickInteractComponent(t),
      PickInteractComponent.addDisabled(t, e),
      PickInteractComponent.addPickInteractTypeType(t, n),
      PickInteractComponent.addPickInteractType(t, i),
      PickInteractComponent.endPickInteractComponent(t)
    );
  }
}
exports.PickInteractComponent = PickInteractComponent;
//# sourceMappingURL=pick-interact-component.js.map
