"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbClientSetPlayerPos = void 0);
const UnionClientTeleportConfigHelper_1 = require("./UnionClientTeleportConfigHelper");
class FbClientSetPlayerPos {
  constructor(e) {
    (this.FbDataInternal = e), (this.E0h = !1), (this.I0h = void 0);
  }
  static Create(e) {
    if (e) return new FbClientSetPlayerPos(e);
  }
  get TelePortConfig() {
    var e, t;
    return (
      !this.E0h &&
        ((this.E0h = !0),
        (e = this.FbDataInternal.telePortConfigType()),
        (t =
          UnionClientTeleportConfigHelper_1.UnionClientTeleportConfigHelper.GetUnionClientTeleportConfigObject(
            e,
          ))) &&
        (this.I0h =
          UnionClientTeleportConfigHelper_1.UnionClientTeleportConfigHelper.ReadUnionClientTeleportConfig(
            e,
            this.FbDataInternal.telePortConfig(t),
          )),
      this.I0h
    );
  }
}
exports.FbClientSetPlayerPos = FbClientSetPlayerPos;
//# sourceMappingURL=FbClientSetPlayerPos.js.map
