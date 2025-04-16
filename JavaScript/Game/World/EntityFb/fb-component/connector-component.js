"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConnectorComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_connector_logic_js_1 = require("../fb-component/union-connector-logic.js");
class ConnectorComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsConnectorComponent(t, o) {
    return (o || new ConnectorComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsConnectorComponent(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new ConnectorComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  logicTypeType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_connector_logic_js_1.UnionConnectorLogic.NONE;
  }
  logicType(t) {
    var o = this.bb.__offset(this.bb_pos, 8);
    return o ? this.bb.__union(t, this.bb_pos + o) : void 0;
  }
  static startConnectorComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, o) {
    t.addFieldInt8(0, +o, 0);
  }
  static addLogicTypeType(t, o) {
    t.addFieldInt8(1, o, union_connector_logic_js_1.UnionConnectorLogic.NONE);
  }
  static addLogicType(t, o) {
    t.addFieldOffset(2, o, 0);
  }
  static endConnectorComponent(t) {
    return t.endObject();
  }
  static createConnectorComponent(t, o, n, e) {
    return (
      ConnectorComponent.startConnectorComponent(t),
      ConnectorComponent.addDisabled(t, o),
      ConnectorComponent.addLogicTypeType(t, n),
      ConnectorComponent.addLogicType(t, e),
      ConnectorComponent.endConnectorComponent(t)
    );
  }
}
exports.ConnectorComponent = ConnectorComponent;
//# sourceMappingURL=connector-component.js.map
