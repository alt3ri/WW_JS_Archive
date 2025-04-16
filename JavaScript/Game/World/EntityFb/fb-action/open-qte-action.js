"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenQteAction = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_open_qte_config_js_1 = require("../fb-action/union-open-qte-config.js");
class OpenQteAction {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsOpenQteAction(t, e) {
    return (e || new OpenQteAction()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsOpenQteAction(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new OpenQteAction()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  configType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_open_qte_config_js_1.UnionOpenQteConfig.NONE;
  }
  config(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startOpenQteAction(t) {
    t.startObject(2);
  }
  static addConfigType(t, e) {
    t.addFieldInt8(0, e, union_open_qte_config_js_1.UnionOpenQteConfig.NONE);
  }
  static addConfig(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endOpenQteAction(t) {
    return t.endObject();
  }
  static createOpenQteAction(t, e, n) {
    return (
      OpenQteAction.startOpenQteAction(t),
      OpenQteAction.addConfigType(t, e),
      OpenQteAction.addConfig(t, n),
      OpenQteAction.endOpenQteAction(t)
    );
  }
}
exports.OpenQteAction = OpenQteAction;
//# sourceMappingURL=open-qte-action.js.map
