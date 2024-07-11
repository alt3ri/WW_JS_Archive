"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TagContainer = exports.channelDebugName = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
exports.channelDebugName = {
  [1]: "Tag",
  2: "Buff",
  3: "关卡服务器",
  4: "动画",
  5: "玩家编队",
  6: "Frozen",
};
class TagContainer {
  constructor() {
    (this.BKo = new Map()),
      (this.bKo = new Map()),
      (this.qKo = new Map()),
      (this.GKo = new Set()),
      (this.NKo = new Set()),
      (this.OKo = void 0);
  }
  GetAllExactTags() {
    return this.bKo.keys();
  }
  GetAllChannels() {
    return this.BKo.keys();
  }
  BindTsTagContainer(t) {
    if ((this.OKo = t)) {
      for (const a of this.bKo.keys()) {
        var r = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(a);
        r && t.UpdateTagMap(r, this.bKo.get(a) ?? 0);
      }
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Character", 20, "绑定UE Actor并复制Tag", [
          "tags",
          this.bKo,
        ]);
    }
  }
  Clear() {
    return (
      this.bKo.clear(),
      this.BKo.clear(),
      this.qKo.clear(),
      this.GKo.clear(),
      this.NKo.clear(),
      !(this.OKo = void 0)
    );
  }
  ClearObject() {
    return this.Clear();
  }
  kKo(t, r) {
    if (!r) return [];
    const a = this.bKo.get(t) ?? 0,
      s = Math.max(0, a + r);
    r = s - a;
    var i = [];
    if (a === s) return [];
    s <= 0 ? this.bKo.delete(t) : this.bKo.set(t, s);
    let e = GameplayTagUtils_1.GameplayTagUtils.GetParentTag(t);
    for (i.push([t, s, a, !0]); e; ) {
      const a = this.qKo.get(e) ?? 0,
        s = Math.max(0, a + r);
      s <= 0 ? this.qKo.delete(e) : this.qKo.set(e, s),
        i.push([e, s, a, !1]),
        (e = GameplayTagUtils_1.GameplayTagUtils.GetParentTag(e));
    }
    t = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t);
    return t && this.OKo?.UpdateTagMap(t, r), i;
  }
  FKo(t) {
    if (t && !(t.length <= 0))
      for (var [r, a, s, i] of t) {
        if (i)
          for (const e of this.NKo)
            try {
              e(r, a, s);
            } catch (t) {
              t instanceof Error
                ? Log_1.Log.CheckError() &&
                  Log_1.Log.ErrorWithStack(
                    "Character",
                    20,
                    "执行Tag监听回调时出错",
                    t,
                    ["error", t.message],
                  )
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error("Character", 20, "执行Tag监听回调时出错", [
                    "error",
                    t,
                  ]);
            }
        for (const o of this.GKo)
          try {
            o(r, a, s);
          } catch (t) {
            t instanceof Error
              ? Log_1.Log.CheckError() &&
                Log_1.Log.ErrorWithStack(
                  "Character",
                  20,
                  "执行Tag监听回调时出错",
                  t,
                  ["error", t.message],
                )
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error("Character", 20, "执行Tag监听回调时出错", [
                  "error",
                  t,
                ]);
          }
      }
  }
  AddExactTag(t, r) {
    let a = this.BKo.get(t);
    a || this.BKo.set(t, (a = new Map())), a.set(r, (a.get(r) ?? 0) + 1);
    t = this.kKo(r, 1);
    this.FKo(t);
  }
  RemoveTag(t, r) {
    var a = this.BKo.get(t);
    if (a) {
      const o = a.get(r) ?? 0;
      a.delete(r);
      var s = this.kKo(r, -o) ?? [];
      if (0 < this.qKo.get(r)) {
        var i = [];
        for (const n of a.keys())
          GameplayTagUtils_1.GameplayTagUtils.IsChildTag(n, r) && i.push(n);
        for (const h of i) {
          const o = a.get(h) ?? 0;
          a.delete(h);
          var e = this.kKo(h, -o);
          e && s.push(...e);
        }
      }
      0 === a.size && this.BKo.delete(t), this.FKo(s);
    }
  }
  RemoveExactTag(r, a) {
    var s = this.BKo.get(r);
    if (s) {
      var i = s.get(a) ?? 0;
      let t = void 0;
      0 < i && ((t = this.kKo(a, -i)), s.delete(a)),
        0 === s.size && this.BKo.delete(r),
        this.FKo(t);
    }
  }
  UpdateExactTag(t, r, a) {
    let s = this.BKo.get(t);
    if (!s) {
      if (!(0 < a)) return;
      this.BKo.set(t, (s = new Map()));
    }
    var i = s.get(r) ?? 0,
      a = Math.max(0, i + a),
      r = (0 < a ? s.set(r, a) : s.delete(r), this.kKo(r, a - i));
    0 === s.size && this.BKo.delete(t), this.FKo(r);
  }
  ContainsTag(t) {
    return this.bKo.has(t) || this.qKo.has(t);
  }
  ContainsExactTag(t) {
    return this.bKo.has(t);
  }
  GetRowTagCount(t, r) {
    return this.BKo.get(t)?.get(r) ?? 0;
  }
  GetTagCount(t) {
    return (this.bKo.get(t) ?? 0) + (this.qKo.get(t) ?? 0);
  }
  GetExactTagCount(t) {
    return this.bKo.get(t) ?? 0;
  }
  AddAnyTagListener(t) {
    this.GKo.add(t);
  }
  RemoveAnyTagListener(t) {
    this.GKo.delete(t);
  }
  AddAnyExactTagListener(t) {
    this.NKo.add(t);
  }
  RemoveExactAnyTagListener(t) {
    this.NKo.delete(t);
  }
  GetDebugString() {
    var t = "汇总tag:\n";
    return (
      t +
      this.GetExactTagsDebugString() +
      "\n\n父tag:\n" +
      [...this.qKo.entries()]
        .map(
          ([t, r]) =>
            GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t) +
            ` * ${r}
`,
        )
        .sort((t, r) => t.localeCompare(r))
        .join("")
    );
  }
  GetExactTagsDebugString() {
    return [...this.bKo.entries()]
      .map(([t, r]) => {
        let a =
          GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t) + ` x ${r}(`;
        for (const i of this.BKo.keys()) {
          var s = this.BKo.get(i)?.get(t);
          s && (a += exports.channelDebugName[i] + " x " + s);
        }
        return a + ")\n";
      })
      .sort((t, r) => t.localeCompare(r))
      .join("");
  }
}
exports.TagContainer = TagContainer;
//# sourceMappingURL=CharacterTagContainer.js.map
