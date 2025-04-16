"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CollectComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CollectComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCollectComponent(t, e) {
    return (e || new CollectComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCollectComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CollectComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isDisableOneClickCollection() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startCollectComponent(t) {
    t.startObject(2);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addIsDisableOneClickCollection(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static endCollectComponent(t) {
    return t.endObject();
  }
  static createCollectComponent(t, e, o) {
    return (
      CollectComponent.startCollectComponent(t),
      CollectComponent.addDisabled(t, e),
      CollectComponent.addIsDisableOneClickCollection(t, o),
      CollectComponent.endCollectComponent(t)
    );
  }
}
exports.CollectComponent = CollectComponent;
//# sourceMappingURL=collect-component.js.map
