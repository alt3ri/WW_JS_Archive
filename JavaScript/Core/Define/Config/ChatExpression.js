"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChatExpression = void 0);
class ChatExpression {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get GroupId() {
    return this.groupid();
  }
  get Name() {
    return this.name();
  }
  get ExpressionTexturePath() {
    return this.expressiontexturepath();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsChatExpression(t, s) {
    return (s || new ChatExpression()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  groupid() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  name(t) {
    const s = this.J7.__offset(this.z7, 8);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  expressiontexturepath(t) {
    const s = this.J7.__offset(this.z7, 10);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
}
exports.ChatExpression = ChatExpression;
// # sourceMappingURL=ChatExpression.js.map
