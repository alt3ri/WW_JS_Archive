"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AbyssRoleLevel = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  ConfigPropValue_1 = require("./SubType/ConfigPropValue"),
  DicIntInt_1 = require("./SubType/DicIntInt");
class AbyssRoleLevel {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Level() {
    return this.level();
  }
  get GroupId() {
    return this.groupid();
  }
  get Consume() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.consumeLength(),
      this.consumeKey,
      this.consumeValue,
      this,
    );
  }
  consumeKey(t) {
    return this.consume(t)?.key();
  }
  consumeValue(t) {
    return this.consume(t)?.value();
  }
  get Prop() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.propLength(),
      this.prop,
      this,
    );
  }
  get PluginNum() {
    return this.pluginnum();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsAbyssRoleLevel(t, s) {
    return (s || new AbyssRoleLevel()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  level() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  groupid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetConsumeAt(t, s) {
    return this.consume(t);
  }
  consume(t, s) {
    var e = this.J7.__offset(this.z7, 10);
    return e
      ? (s || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + e) + 4 * t),
          this.J7,
        )
      : null;
  }
  consumeLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetPropAt(t, s) {
    return this.prop(t);
  }
  prop(t, s) {
    var e = this.J7.__offset(this.z7, 12);
    return e
      ? (s || new ConfigPropValue_1.ConfigPropValue()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + e) + 4 * t),
          this.J7,
        )
      : null;
  }
  propLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  pluginnum() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.AbyssRoleLevel = AbyssRoleLevel;
//# sourceMappingURL=AbyssRoleLevel.js.map
