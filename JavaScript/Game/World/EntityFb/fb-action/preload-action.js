"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PreloadAction = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_preload_object_type_config_js_1 = require("../fb-action/union-preload-object-type-config.js");
class PreloadAction {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsPreloadAction(t, e) {
    return (e || new PreloadAction()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPreloadAction(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new PreloadAction()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  preloadObjectTypeType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_preload_object_type_config_js_1.UnionPreloadObjectTypeConfig.NONE;
  }
  preloadObjectType(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startPreloadAction(t) {
    t.startObject(2);
  }
  static addPreloadObjectTypeType(t, e) {
    t.addFieldInt8(
      0,
      e,
      union_preload_object_type_config_js_1.UnionPreloadObjectTypeConfig.NONE,
    );
  }
  static addPreloadObjectType(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endPreloadAction(t) {
    return t.endObject();
  }
  static createPreloadAction(t, e, o) {
    return (
      PreloadAction.startPreloadAction(t),
      PreloadAction.addPreloadObjectTypeType(t, e),
      PreloadAction.addPreloadObjectType(t, o),
      PreloadAction.endPreloadAction(t)
    );
  }
}
exports.PreloadAction = PreloadAction;
//# sourceMappingURL=preload-action.js.map
