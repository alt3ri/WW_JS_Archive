"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ClientConditionListenerComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  client_condition_listener_js_1 = require("../fb-component/client-condition-listener.js");
class ClientConditionListenerComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsClientConditionListenerComponent(t, e) {
    return (e || new ClientConditionListenerComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsClientConditionListenerComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ClientConditionListenerComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  listeners(t, e) {
    var n = this.bb.__offset(this.bb_pos, 6);
    return n
      ? (
          e || new client_condition_listener_js_1.ClientConditionListener()
        ).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  listenersLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startClientConditionListenerComponent(t) {
    t.startObject(2);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addListeners(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createListenersVector(e, n) {
    e.startVector(4, n.length, 4);
    for (let t = n.length - 1; 0 <= t; t--) e.addOffset(n[t]);
    return e.endVector();
  }
  static startListenersVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endClientConditionListenerComponent(t) {
    return t.endObject();
  }
  static createClientConditionListenerComponent(t, e, n) {
    return (
      ClientConditionListenerComponent.startClientConditionListenerComponent(t),
      ClientConditionListenerComponent.addDisabled(t, e),
      ClientConditionListenerComponent.addListeners(t, n),
      ClientConditionListenerComponent.endClientConditionListenerComponent(t)
    );
  }
}
exports.ClientConditionListenerComponent = ClientConditionListenerComponent;
//# sourceMappingURL=client-condition-listener-component.js.map
