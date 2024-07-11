"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueSelectResult = void 0);
class RogueSelectResult {
  constructor(t, e, s, r = !1) {
    (this.IsShowCommon = !1),
      (this.NewRogueGainEntry = t),
      (this.OldRogueGainEntry = e),
      (this.SelectRogueGainEntry = s),
      (this.IsShowCommon = r);
  }
  GetNewUnlockAffixEntry() {
    const e = new Set();
    const s = this.NewRogueGainEntry.AffixEntryList;
    const r = this.OldRogueGainEntry.AffixEntryList;
    for (let t = 0; t < s.length && t < r.length; t++) {
      const o = s[t];
      const i = r[t];
      o.IsUnlock && !i.IsUnlock && e.add(o.Id);
    }
    return e;
  }
}
exports.RogueSelectResult = RogueSelectResult;
// # sourceMappingURL=RogueSelectResult.js.map
