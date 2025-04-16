"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaGalChoice = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class CiacconaGalChoice {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Content() {
    return this.content();
  }
  get RequiredInspiration() {
    return this.requiredinspiration();
  }
  get UnlockCondition() {
    return this.unlockcondition();
  }
  get ToStep() {
    return this.tostep();
  }
  get CorrSubEnding() {
    return this.corrsubending();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsCiacconaGalChoice(t, i) {
    return (i || new CiacconaGalChoice()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  content(t) {
    var i = this.J7.__offset(this.z7, 6),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  requiredinspiration() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  unlockcondition() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  tostep() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  corrsubending() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.CiacconaGalChoice = CiacconaGalChoice;
//# sourceMappingURL=CiacconaGalChoice.js.map
