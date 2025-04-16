"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRogueSelectRoom = void 0);
const UnionRogueSelectRoomHelper_1 = require("./UnionRogueSelectRoomHelper");
class FbRogueSelectRoom {
  constructor(e) {
    (this.FbDataInternal = e), (this.bSh = !1), (this.TAe = void 0);
  }
  static Create(e) {
    if (e) return new FbRogueSelectRoom(e);
  }
  get Config() {
    var e, o;
    return (
      !this.bSh &&
        ((this.bSh = !0),
        (e = this.FbDataInternal.configType()),
        (o =
          UnionRogueSelectRoomHelper_1.UnionRogueSelectRoomHelper.GetUnionRogueSelectRoomObject(
            e,
          ))) &&
        (this.TAe =
          UnionRogueSelectRoomHelper_1.UnionRogueSelectRoomHelper.ReadUnionRogueSelectRoom(
            e,
            this.FbDataInternal.config(o),
          )),
      this.TAe
    );
  }
}
exports.FbRogueSelectRoom = FbRogueSelectRoom;
//# sourceMappingURL=FbRogueSelectRoom.js.map
