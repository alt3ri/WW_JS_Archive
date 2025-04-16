"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionRogueSelectRoomHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbRogueRoleSelectRoom_1 = require("./FbRogueRoleSelectRoom");
class UnionRogueSelectRoomHelper {
  static GetUnionRogueSelectRoomObject(e) {
    if (e === fb_action_1.UnionRogueSelectRoom.RogueRoleSelectRoom)
      return new fb_action_1.RogueRoleSelectRoom();
  }
  static ReadUnionRogueSelectRoom(e, o) {
    return void 0 !== o &&
      e === fb_action_1.UnionRogueSelectRoom.RogueRoleSelectRoom
      ? FbRogueRoleSelectRoom_1.FbRogueRoleSelectRoom.Create(o)
      : void 0;
  }
}
exports.UnionRogueSelectRoomHelper = UnionRogueSelectRoomHelper;
//# sourceMappingURL=UnionRogueSelectRoomHelper.js.map
