"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AbyssRoleSlot = void 0);
class AbyssRoleSlot {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get SlotType() {
    return this.slottype();
  }
  get Index() {
    return this.index();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsAbyssRoleSlot(t, s) {
    return (s || new AbyssRoleSlot()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  slottype() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  index() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.AbyssRoleSlot = AbyssRoleSlot;
//# sourceMappingURL=AbyssRoleSlot.js.map
