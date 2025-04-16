"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QteCallback = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js");
class QteCallback {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsQteCallback(t, e) {
    return (e || new QteCallback()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsQteCallback(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new QteCallback()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  actions(t, e) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a
      ? (e || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + a) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  actionsLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  sendSelfEvent(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startQteCallback(t) {
    t.startObject(2);
  }
  static addActions(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static createActionsVector(e, a) {
    e.startVector(4, a.length, 4);
    for (let t = a.length - 1; 0 <= t; t--) e.addOffset(a[t]);
    return e.endVector();
  }
  static startActionsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addSendSelfEvent(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endQteCallback(t) {
    return t.endObject();
  }
  static createQteCallback(t, e, a) {
    return (
      QteCallback.startQteCallback(t),
      QteCallback.addActions(t, e),
      QteCallback.addSendSelfEvent(t, a),
      QteCallback.endQteCallback(t)
    );
  }
}
exports.QteCallback = QteCallback;
//# sourceMappingURL=qte-callback.js.map
