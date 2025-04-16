"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionRogueSelectRoom =
    exports.unionToUnionRogueSelectRoom =
    exports.UnionRogueSelectRoom =
      void 0);
const rogue_role_select_room_js_1 = require("../fb-action/rogue-role-select-room.js");
var UnionRogueSelectRoom;
function unionToUnionRogueSelectRoom(o, e) {
  switch (UnionRogueSelectRoom[o]) {
    case "NONE":
      return;
    case "RogueRoleSelectRoom":
      return e(new rogue_role_select_room_js_1.RogueRoleSelectRoom());
    default:
      return;
  }
}
function unionListToUnionRogueSelectRoom(o, e, t) {
  switch (UnionRogueSelectRoom[o]) {
    case "NONE":
      return;
    case "RogueRoleSelectRoom":
      return e(t, new rogue_role_select_room_js_1.RogueRoleSelectRoom());
    default:
      return;
  }
}
!(function (o) {
  (o[(o.NONE = 0)] = "NONE"),
    (o[(o.RogueRoleSelectRoom = 1)] = "RogueRoleSelectRoom");
})(
  (UnionRogueSelectRoom =
    exports.UnionRogueSelectRoom || (exports.UnionRogueSelectRoom = {})),
),
  (exports.unionToUnionRogueSelectRoom = unionToUnionRogueSelectRoom),
  (exports.unionListToUnionRogueSelectRoom = unionListToUnionRogueSelectRoom);
//# sourceMappingURL=union-rogue-select-room.js.map
