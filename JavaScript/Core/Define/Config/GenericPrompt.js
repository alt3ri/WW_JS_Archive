"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GenericPrompt = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class GenericPrompt {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get TipsId() {
    return this.tipsid();
  }
  get TypeId() {
    return this.typeid();
  }
  get TipsText() {
    return this.tipstext();
  }
  get ExtraText() {
    return this.extratext();
  }
  get Duration() {
    return this.duration();
  }
  get Priority() {
    return this.priority();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsGenericPrompt(t, i) {
    return (i || new GenericPrompt()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  tipsid(t) {
    var i = this.J7.__offset(this.z7, 4),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  typeid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  tipstext(t) {
    var i = this.J7.__offset(this.z7, 8),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  extratext(t) {
    var i = this.J7.__offset(this.z7, 10),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  duration() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  priority() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.GenericPrompt = GenericPrompt;
//# sourceMappingURL=GenericPrompt.js.map
