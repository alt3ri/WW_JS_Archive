"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FunctionMenu = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class FunctionMenu {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get FunctionId() {
    return this.functionid();
  }
  get SortIndex() {
    return this.sortindex();
  }
  get FunctionName() {
    return this.functionname();
  }
  get FunctionIcon() {
    return this.functionicon();
  }
  get JumpView() {
    return this.jumpview();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsFunctionMenu(t, i) {
    return (i || new FunctionMenu()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  functionid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  sortindex() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  functionname(t) {
    var i = this.J7.__offset(this.z7, 8),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  functionicon(t) {
    var i = this.J7.__offset(this.z7, 10),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  jumpview(t) {
    var i = this.J7.__offset(this.z7, 12),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
}
exports.FunctionMenu = FunctionMenu;
//# sourceMappingURL=FunctionMenu.js.map
