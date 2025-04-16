"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ClientTriggerComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  trigger_match_config_js_1 = require("../fb-component/trigger-match-config.js"),
  triggered_config_js_1 = require("../fb-component/triggered-config.js");
class ClientTriggerComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsClientTriggerComponent(t, i) {
    return (i || new ClientTriggerComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsClientTriggerComponent(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new ClientTriggerComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  triggerMatch(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (t || new trigger_match_config_js_1.TriggerMatchConfig()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  onTriggerEnter(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i
      ? (t || new triggered_config_js_1.TriggeredConfig()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  onTriggerExit(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i
      ? (t || new triggered_config_js_1.TriggeredConfig()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  static startClientTriggerComponent(t) {
    t.startObject(4);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addTriggerMatch(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addOnTriggerEnter(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addOnTriggerExit(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static endClientTriggerComponent(t) {
    return t.endObject();
  }
}
exports.ClientTriggerComponent = ClientTriggerComponent;
//# sourceMappingURL=client-trigger-component.js.map
