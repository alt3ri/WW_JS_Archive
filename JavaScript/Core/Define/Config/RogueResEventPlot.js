"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueResEventPlot = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueResEventPlot {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get PlotId() {
    return this.plotid();
  }
  get Title() {
    return this.title();
  }
  get BgResource() {
    return this.bgresource();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsRogueResEventPlot(t, e) {
    return (e || new RogueResEventPlot()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  plotid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  title(t) {
    var e = this.J7.__offset(this.z7, 6),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  bgresource() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.RogueResEventPlot = RogueResEventPlot;
//# sourceMappingURL=RogueResEventPlot.js.map
