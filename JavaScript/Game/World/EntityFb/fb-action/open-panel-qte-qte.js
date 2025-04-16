"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenPanelQteQte = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class OpenPanelQteQte {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsOpenPanelQteQte(e, t) {
    return (t || new OpenPanelQteQte()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsOpenPanelQteQte(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new OpenPanelQteQte()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  id() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startOpenPanelQteQte(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endOpenPanelQteQte(e) {
    return e.endObject();
  }
  static createOpenPanelQteQte(e, t, n) {
    return (
      OpenPanelQteQte.startOpenPanelQteQte(e),
      OpenPanelQteQte.addType(e, t),
      OpenPanelQteQte.addId(e, n),
      OpenPanelQteQte.endOpenPanelQteQte(e)
    );
  }
}
exports.OpenPanelQteQte = OpenPanelQteQte;
//# sourceMappingURL=open-panel-qte-qte.js.map
