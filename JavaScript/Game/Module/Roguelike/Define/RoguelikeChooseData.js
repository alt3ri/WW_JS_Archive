"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeChooseData = void 0);
const RogueGainEntry_1 = require("./RogueGainEntry");
class RoguelikeChooseData {
  constructor(t) {
    (this.CostCurrency = []),
      (this.Index = t.Akn ?? void 0),
      (this.RoguelikeGainDataType = t.Ikn ?? void 0),
      (this.MaxTime = t.yws),
      (this.UseTime = t.Iws),
      (this.EventId = t.Tws),
      (this.Layer = t.k8n),
      (this.IsSelect = t.dws),
      (this.RogueGainEntryList = new Array());
    for (const s of t.Lws)
      this.RogueGainEntryList.push(
        new RogueGainEntry_1.RogueGainEntry(s, this.Index),
      );
    this.CostCurrency = t.Rws;
  }
}
exports.RoguelikeChooseData = RoguelikeChooseData;
// # sourceMappingURL=RoguelikeChooseData.js.map
