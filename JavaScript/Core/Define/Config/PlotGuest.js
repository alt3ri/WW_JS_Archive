"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotGuest = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class PlotGuest {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get GuestID() {
    return this.guestid();
  }
  get HeadIconPath() {
    return this.headiconpath();
  }
  get Name() {
    return this.name();
  }
  get SpeakerID() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.speakeridLength(),
      this.speakerid,
      this,
    );
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsPlotGuest(t, s) {
    return (s || new PlotGuest()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  guestid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  headiconpath(t) {
    var s = this.J7.__offset(this.z7, 6),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  name(t) {
    var s = this.J7.__offset(this.z7, 8),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  GetSpeakeridAt(t) {
    return this.speakerid(t);
  }
  speakerid(t) {
    var s = this.J7.__offset(this.z7, 10);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  speakeridLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  speakeridArray() {
    var t = this.J7.__offset(this.z7, 10);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
}
exports.PlotGuest = PlotGuest;
//# sourceMappingURL=PlotGuest.js.map
