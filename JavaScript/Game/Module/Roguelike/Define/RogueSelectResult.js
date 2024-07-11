"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueSelectResult = void 0);
class RogueSelectResult {
  constructor(t, e, s, i = !1) {
    (this.IsShowCommon = !1),
      (this.CallBack = void 0),
      (this.NewRogueGainEntry = t),
      (this.OldRogueGainEntry = e),
      (this.SelectRogueGainEntry = s),
      (this.IsShowCommon = i);
  }
  GetNewUnlockAffixEntry() {
    var e = new Set(),
      s = this.NewRogueGainEntry.AffixEntryList,
      i = this.OldRogueGainEntry.AffixEntryList;
    for (let t = 0; t < s.length && t < i.length; t++) {
      var o = s[t],
        r = i[t];
      o.IsUnlock && !r.IsUnlock && e.add(o.Id);
    }
    return e;
  }
}
exports.RogueSelectResult = RogueSelectResult;
//# sourceMappingURL=RogueSelectResult.js.map
