"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayTagUtils = void 0);
const UE = require("ue"),
  GameplayTagDefine_1 = require("../../Game/Define/GameplayTagDefine"),
  Log_1 = require("../Common/Log"),
  Stats_1 = require("../Common/Stats");
class GameplayTagUtils {
  static GetTagIdByName(a) {
    GameplayTagUtils.MJ.Start();
    (a = UE.GASBPLibrary.FnvHash(a)),
      (a = GameplayTagDefine_1.TagId2UglyTagIdMap.get(a) ?? a);
    return GameplayTagUtils.MJ.Stop(), a;
  }
  static GetNameByTagId(a) {
    return GameplayTagUtils.GetGameplayTagById(a)?.OriginalTagName;
  }
  static GetGameplayTagByName(a) {
    a = GameplayTagUtils.GetTagIdByName(a);
    return GameplayTagUtils.GetGameplayTagById(a);
  }
  static GetGameplayTagById(a) {
    let t = this.qJ.get(a);
    if (
      (t ||
        ((t = UE.GASBPLibrary.GetGameplayTagFromTagHash(a)), this.qJ.set(a, t)),
      t)
    )
      return t;
    GameplayTagUtils.GJ.has(a) ||
      (GameplayTagUtils.GJ.add(a),
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Game",
          36,
          "TagId对应的GameplayTag不存在，请检查GameplayTag设置",
          ["TagId", a],
        ));
  }
  static GetParentTag(a) {
    return GameplayTagDefine_1.ParentTagIdMap.get(a);
  }
  static IsChildTag(a, t) {
    return (
      a === t ||
      ((a = this.GetNameByTagId(a)),
      (t = this.GetNameByTagId(t)),
      !(!a || !t || a.length <= t.length) &&
        a.startsWith(t) &&
        "." === a[t.length])
    );
  }
  static Contains(a, t) {
    if (a) for (const e of a) if (GameplayTagUtils.IsChildTag(t, e)) return !0;
    return !1;
  }
  static ContainsExact(a, t) {
    if (a) for (const e of a) if (e === t) return !0;
    return !1;
  }
  static HasAll(a, t) {
    if (t) for (const e of t) if (!this.Contains(a, e)) return !1;
    return !0;
  }
  static HasAny(a, t) {
    if (t) for (const e of t) if (this.Contains(a, e)) return !0;
    return !1;
  }
  static ConvertFromUeContainer(t) {
    if (!t) return [];
    var e = [],
      i = t.GameplayTags.Num();
    for (let a = 0; a < i; a++) e.push(t.GameplayTags.Get(a).TagId);
    return e;
  }
}
((exports.GameplayTagUtils = GameplayTagUtils).GJ = new Set()),
  (GameplayTagUtils.MJ = Stats_1.Stat.Create("GameplayTagUtils.FnvHash")),
  (GameplayTagUtils.qJ = new Map());
//# sourceMappingURL=GameplayTagUtils.js.map
