"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AlertAreaConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class AlertAreaConfig {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Description() {
    return this.description();
  }
  get CreatorId() {
    return this.creatorid();
  }
  get MinValue() {
    return this.minvalue();
  }
  get MaxValue() {
    return this.maxvalue();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsAlertAreaConfig(t, i) {
    return (i || new AlertAreaConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  description(t) {
    var i = this.J7.__offset(this.z7, 6),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  creatorid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  minvalue() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readFloat32(this.z7 + t) : 0;
  }
  maxvalue() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readFloat32(this.z7 + t) : 100;
  }
}
exports.AlertAreaConfig = AlertAreaConfig;
//# sourceMappingURL=AlertAreaConfig.js.map
