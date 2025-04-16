"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRogueRoleSelectRoom = void 0);
class FbRogueRoleSelectRoom {
  constructor(e) {
    (this.FbDataInternal = e), (this.u_h = !1), (this.f8o = void 0);
  }
  static Create(e) {
    if (e) return new FbRogueRoleSelectRoom(e);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
}
exports.FbRogueRoleSelectRoom = FbRogueRoleSelectRoom;
//# sourceMappingURL=FbRogueRoleSelectRoom.js.map
