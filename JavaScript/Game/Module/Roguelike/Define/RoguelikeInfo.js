"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeInfo = void 0);
const RogueGainEntry_1 = require("./RogueGainEntry");
class RoguelikeInfo {
  constructor(t) {
    (this.PhantomEntry = void 0),
      (this.SpecialEntryList = []),
      (this.RoleEntry = new RogueGainEntry_1.RogueGainEntry(t.vws)),
      t.pws && (this.PhantomEntry = new RogueGainEntry_1.RogueGainEntry(t.pws)),
      (this.BuffEntryList = new Array());
    for (const o of t.Mws)
      this.BuffEntryList.push(new RogueGainEntry_1.RogueGainEntry(o));
    this.ElementDict = new Map();
    for (const n of Object.keys(t.aws ?? {})) {
      const e = t.aws[n] ?? 0;
      e && this.ElementDict.set(Number(n), e);
    }
    this.SpecialEntryList = [];
    for (const r of t.Sws)
      this.SpecialEntryList.push(new RogueGainEntry_1.RogueGainEntry(r));
  }
  GetIsUnlock(t) {
    for (const [e, o] of t.ElementDict)
      if ((this.ElementDict.get(e) ?? 0) < o) return !1;
    return !0;
  }
}
exports.RoguelikeInfo = RoguelikeInfo;
// # sourceMappingURL=RoguelikeInfo.js.map
