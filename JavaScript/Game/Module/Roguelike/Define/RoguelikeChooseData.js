"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeChooseData = void 0);
const RogueGainEntry_1 = require("./RogueGainEntry");
class RoguelikeChooseData {
  constructor(t) {
    (this.CostCurrency = []),
      (this.CallBack = void 0),
      (this.Index = t.r5n ?? void 0),
      (this.RoguelikeGainDataType = t.Z4n ?? void 0),
      (this.MaxTime = t.V2s),
      (this.UseTime = t.$2s),
      (this.EventId = t.H2s),
      (this.Layer = t.vHn),
      (this.IsSelect = t.w2s),
      (this.RogueGainEntryList = new Array());
    for (const s of t.j2s)
      this.RogueGainEntryList.push(
        new RogueGainEntry_1.RogueGainEntry(s, this.Index),
      );
    this.CostCurrency = t.W2s;
  }
}
exports.RoguelikeChooseData = RoguelikeChooseData;
//# sourceMappingURL=RoguelikeChooseData.js.map
