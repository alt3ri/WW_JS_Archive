"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueGainEntry = void 0);
const AffixEntry_1 = require("./AffixEntry"),
  RoguelikeDefine_1 = require("./RoguelikeDefine");
class RogueGainEntry {
  constructor(i, t = void 0) {
    (this.RoguelikeGainDataType = void 0),
      (this.ConfigId = void 0),
      (this.ElementDict = void 0),
      (this.AffixEntryList = void 0),
      (this.OriginalPrice = 0),
      (this.CurrentPrice = 0),
      (this.Index = void 0),
      (this.ShopItemCoinId = 0),
      (this.IsSell = void 0),
      (this.IsSelect = !1),
      (this.IsNew = !1),
      (this.Discounted = 0),
      (this.Cost = 0),
      (this.BindId = 0),
      (this.RestCount = 0),
      (this.IsValid = !1),
      (this.BindId = t),
      (this.RoguelikeGainDataType = i.Z4n),
      (this.ConfigId = i._9n ?? void 0),
      (this.Index = i.r5n ?? void 0),
      (this.IsSell = i.U2s ?? void 0),
      (this.ElementDict = new Map()),
      (this.IsSelect = i.w2s),
      (this.IsNew = i.sws),
      (this.Cost = i.x2s),
      (this.RestCount = i.b2s),
      (this.IsValid = i.vTs);
    for (const e of Object.keys(i.L2s ?? {})) {
      var s = i.L2s[e] ?? 0;
      s && this.ElementDict.set(Number(e), s);
    }
    if (i.A2s) {
      this.AffixEntryList = new Array();
      for (const h of i.A2s)
        this.AffixEntryList.push(new AffixEntry_1.AffixEntry(h));
      if (i.P2s) {
        for (const o of Object.keys(i.P2s.R2s ?? {}))
          (this.ShopItemCoinId = Number(o)),
            (this.OriginalPrice = i.P2s.R2s[o]);
        (this.CurrentPrice =
          this.OriginalPrice -
          Math.floor(this.OriginalPrice * i.P2s.D2s * 0.01)),
          (this.Discounted = i.P2s.D2s);
      }
    }
  }
  GetSortElementInfoArrayByCount(i = !1) {
    var t,
      s,
      e = new Array();
    for ([t, s] of this.ElementDict)
      (i && 9 === t) || e.push(new RoguelikeDefine_1.ElementInfo(t, s));
    return e.sort((i, t) => t.Count - i.Count), e;
  }
  IsDiscounted() {
    return this.CurrentPrice !== this.OriginalPrice;
  }
}
exports.RogueGainEntry = RogueGainEntry;
//# sourceMappingURL=RogueGainEntry.js.map
