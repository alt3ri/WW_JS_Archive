"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AffixEntry = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RoguelikeDefine_1 = require("./RoguelikeDefine");
class AffixEntry {
  constructor(e) {
    (this.Id = e.Ekn ?? void 0),
      (this.IsUnlock = e.m3n ?? void 0),
      (this.ElementDict = new Map());
    for (const n of Object.keys(e.aws ?? {})) {
      const r = e.aws[n] ?? 0;
      r && this.ElementDict.set(Number(n), r);
    }
  }
  GetSortElementInfoArrayByCount(e = !1) {
    let r;
    let n;
    const o = new Array();
    for ([r, n] of this.ElementDict)
      (e && r === 9) || o.push(new RoguelikeDefine_1.ElementInfo(r, n));
    return o.sort((e, r) => r.Count - e.Count), o;
  }
  GetAffixDesc() {
    const e =
      ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueAffixConfig(
        this.Id,
      );
    return ModelManager_1.ModelManager.RoguelikeModel?.GetDescModel() === 0
      ? e?.AffixDescSimple ?? ""
      : e?.AffixDesc ?? "";
  }
}
exports.AffixEntry = AffixEntry;
// # sourceMappingURL=AffixEntry.js.map
