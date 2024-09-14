"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AffixEntry = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RoguelikeDefine_1 = require("./RoguelikeDefine");
class AffixEntry {
  constructor(e) {
    (this.Id = e.s5n ?? void 0),
      (this.IsUnlock = e.K6n ?? void 0),
      (this.ElementDict = new Map());
    for (const n of Object.keys(e.x2s ?? {})) {
      var r = e.x2s[n] ?? 0;
      r && this.ElementDict.set(Number(n), r);
    }
  }
  GetSortElementInfoArrayByCount(e = !1) {
    var r,
      n,
      o = new Array();
    for ([r, n] of this.ElementDict)
      (e && 9 === r) || o.push(new RoguelikeDefine_1.ElementInfo(r, n));
    return o.sort((e, r) => r.Count - e.Count), o;
  }
  GetAffixDesc() {
    var e = ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueAffixConfig(
      this.Id,
    );
    return 0 === ModelManager_1.ModelManager.RoguelikeModel?.GetDescModel()
      ? (e?.AffixDescSimple ?? "")
      : (e?.AffixDesc ?? "");
  }
}
exports.AffixEntry = AffixEntry;
//# sourceMappingURL=AffixEntry.js.map
