"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeInfo = void 0);
const RogueGainEntry_1 = require("./RogueGainEntry");
class RoguelikeInfo {
  constructor(t) {
    (this.PhantomEntry = void 0),
      (this.SpecialEntryList = []),
      (this.RoleEntry = new RogueGainEntry_1.RogueGainEntry(t.H2s)),
      t.j2s && (this.PhantomEntry = new RogueGainEntry_1.RogueGainEntry(t.j2s)),
      (this.BuffEntryList = new Array());
    for (const o of t.W2s)
      this.BuffEntryList.push(new RogueGainEntry_1.RogueGainEntry(o));
    this.ElementDict = new Map();
    for (const n of Object.keys(t.x2s ?? {})) {
      var e = t.x2s[n] ?? 0;
      e && this.ElementDict.set(Number(n), e);
    }
    this.SpecialEntryList = [];
    for (const r of t.K2s)
      this.SpecialEntryList.push(new RogueGainEntry_1.RogueGainEntry(r));
  }
  GetIsUnlock(t) {
    for (var [e, o] of t.ElementDict)
      if ((this.ElementDict.get(e) ?? 0) < o) return !1;
    return !0;
  }
}
exports.RoguelikeInfo = RoguelikeInfo;
//# sourceMappingURL=RoguelikeInfo.js.map
