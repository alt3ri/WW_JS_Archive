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
    var e = new Set(),
      s = this.NewRogueGainEntry.AffixEntryList,
      r = this.OldRogueGainEntry.AffixEntryList;
    for (let t = 0; t < s.length && t < r.length; t++) {
      var o = s[t],
        i = r[t];
      o.IsUnlock && !i.IsUnlock && e.add(o.Id);
    }
    return e;
  }
}
exports.RogueSelectResult = RogueSelectResult;
//# sourceMappingURL=RogueSelectResult.js.map
