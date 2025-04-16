"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConnectorEffectConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ConnectorEffectConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsConnectorEffectConfig(t, e) {
    return (e || new ConnectorEffectConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsConnectorEffectConfig(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ConnectorEffectConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  effectPath(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  startPoint(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  endPoint(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startConnectorEffectConfig(t) {
    t.startObject(3);
  }
  static addEffectPath(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addStartPoint(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addEndPoint(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endConnectorEffectConfig(t) {
    return t.endObject();
  }
  static createConnectorEffectConfig(t, e, n, o) {
    return (
      ConnectorEffectConfig.startConnectorEffectConfig(t),
      ConnectorEffectConfig.addEffectPath(t, e),
      ConnectorEffectConfig.addStartPoint(t, n),
      ConnectorEffectConfig.addEndPoint(t, o),
      ConnectorEffectConfig.endConnectorEffectConfig(t)
    );
  }
}
exports.ConnectorEffectConfig = ConnectorEffectConfig;
//# sourceMappingURL=connector-effect-config.js.map
