"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeChooseData = void 0);
const RogueGainEntry_1 = require("./RogueGainEntry");
class RoguelikeChooseData {
  constructor(t) {
    (this.CostCurrency = []),
      (this.CallBack = void 0),
      (this.Index = t.c5n ?? void 0),
      (this.RoguelikeGainDataType = t.h5n ?? void 0),
      (this.MaxTime = t.X2s),
      (this.UseTime = t.Y2s),
      (this.EventId = t.J2s),
      (this.Layer = t.AHn),
      (this.IsSelect = t.k2s),
      (this.RogueGainEntryList = new Array());
    for (const s of t.z2s)
      this.RogueGainEntryList.push(
        new RogueGainEntry_1.RogueGainEntry(s, this.Index),
      );
    this.CostCurrency = t.Z2s;
  }
}
exports.RoguelikeChooseData = RoguelikeChooseData;
//# sourceMappingURL=RoguelikeChooseData.js.map
