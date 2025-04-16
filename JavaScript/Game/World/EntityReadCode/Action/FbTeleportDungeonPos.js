"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTeleportDungeonPos = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbTeleportDungeonPos {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.MMh = !1),
      (this.EMh = 0),
      (this.VVh = !1),
      (this.jVh = void 0);
  }
  static Create(t) {
    if (t) return new FbTeleportDungeonPos(t);
  }
  get DungeonId() {
    return (
      this.MMh ||
        ((this.MMh = !0), (this.EMh = this.FbDataInternal.dungeonId())),
      this.EMh
    );
  }
  get TeleportPos() {
    return (
      this.VVh ||
        ((this.VVh = !0),
        (this.jVh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.teleportPos(),
        ))),
      this.jVh
    );
  }
}
exports.FbTeleportDungeonPos = FbTeleportDungeonPos;
//# sourceMappingURL=FbTeleportDungeonPos.js.map
