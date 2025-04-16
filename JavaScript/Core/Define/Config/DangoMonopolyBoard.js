"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoMonopolyBoard = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class DangoMonopolyBoard {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get BoardId() {
    return this.boardid();
  }
  get BoardGroupId() {
    return this.boardgroupid();
  }
  get ItemId() {
    return this.itemid();
  }
  get ItemNum() {
    return this.itemnum();
  }
  get GridGroupId() {
    return this.gridgroupid();
  }
  get UnlockDay() {
    return this.unlockday();
  }
  get FinishTitle() {
    return this.finishtitle();
  }
  get FinishDesc() {
    return this.finishdesc();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsDangoMonopolyBoard(t, i) {
    return (i || new DangoMonopolyBoard()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  boardid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  boardgroupid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  itemid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  itemnum() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  gridgroupid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  unlockday() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  finishtitle(t) {
    var i = this.J7.__offset(this.z7, 16),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  finishdesc(t) {
    var i = this.J7.__offset(this.z7, 18),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
}
exports.DangoMonopolyBoard = DangoMonopolyBoard;
//# sourceMappingURL=DangoMonopolyBoard.js.map
