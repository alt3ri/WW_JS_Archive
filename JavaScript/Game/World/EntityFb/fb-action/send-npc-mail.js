"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SendNpcMail = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SendNpcMail {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSendNpcMail(t, e) {
    return (e || new SendNpcMail()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSendNpcMail(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SendNpcMail()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  mailId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startSendNpcMail(t) {
    t.startObject(1);
  }
  static addMailId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endSendNpcMail(t) {
    return t.endObject();
  }
  static createSendNpcMail(t, e) {
    return (
      SendNpcMail.startSendNpcMail(t),
      SendNpcMail.addMailId(t, e),
      SendNpcMail.endSendNpcMail(t)
    );
  }
}
exports.SendNpcMail = SendNpcMail;
//# sourceMappingURL=send-npc-mail.js.map
