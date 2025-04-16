"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoMonopolyDice = void 0);
class DangoMonopolyDice {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get DiceNum() {
    return this.dicenum();
  }
  __init(t, o) {
    return (this.z7 = t), (this.J7 = o), this;
  }
  static getRootAsDangoMonopolyDice(t, o) {
    return (o || new DangoMonopolyDice()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  dicenum() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.DangoMonopolyDice = DangoMonopolyDice;
//# sourceMappingURL=DangoMonopolyDice.js.map
