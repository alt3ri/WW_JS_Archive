"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AbyssRoute = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class AbyssRoute {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get RouteId() {
    return this.routeid();
  }
  get Floor() {
    return this.floor();
  }
  get MonsterRatio() {
    return this.monsterratio();
  }
  get Desc() {
    return this.desc();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsAbyssRoute(t, s) {
    return (s || new AbyssRoute()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  routeid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  floor() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  monsterratio() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  desc(t) {
    var s = this.J7.__offset(this.z7, 12),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
}
exports.AbyssRoute = AbyssRoute;
//# sourceMappingURL=AbyssRoute.js.map
