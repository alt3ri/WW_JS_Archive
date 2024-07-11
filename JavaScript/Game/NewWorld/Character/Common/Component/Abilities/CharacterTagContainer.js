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
    (this.PQo = new Map()),
      (this.xQo = new Map()),
      (this.wQo = new Map()),
      (this.BQo = new Set()),
      (this.bQo = new Set()),
      (this.qQo = void 0);
  }
  GetAllExactTags() {
    return this.xQo.keys();
  }
  GetAllChannels() {
    return this.PQo.keys();
  }
  BindTsTagContainer(t) {
    if ((this.qQo = t)) {
      for (const a of this.xQo.keys()) {
        var r = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(a);
        r && t.UpdateTagMap(r, this.xQo.get(a) ?? 0);
      }
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Character", 20, "绑定UE Actor并复制Tag", [
          "tags",
          this.xQo,
        ]);
    }
  }
  Clear() {
    return (
      this.xQo.clear(),
      this.PQo.clear(),
      this.wQo.clear(),
      this.BQo.clear(),
      this.bQo.clear(),
      !(this.qQo = void 0)
    );
  }
  ClearObject() {
    return this.Clear();
  }
  GQo(t, r) {
    if (!r) return [];
    const a = this.xQo.get(t) ?? 0,
      s = Math.max(0, a + r);
    r = s - a;
    var i = [];
    if (a === s) return [];
    s <= 0 ? this.xQo.delete(t) : this.xQo.set(t, s);
    let e = GameplayTagUtils_1.GameplayTagUtils.GetParentTag(t);
    for (i.push([t, s, a, !0]); e; ) {
      const a = this.wQo.get(e) ?? 0,
        s = Math.max(0, a + r);
      s <= 0 ? this.wQo.delete(e) : this.wQo.set(e, s),
        i.push([e, s, a, !1]),
        (e = GameplayTagUtils_1.GameplayTagUtils.GetParentTag(e));
    }
    t = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t);
    return t && this.qQo?.UpdateTagMap(t, r), i;
  }
  NQo(t) {
    if (t && !(t.length <= 0))
      for (var [r, a, s, i] of t) {
        if (i)
          for (const e of this.bQo)
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
        for (const o of this.BQo)
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
    let a = this.PQo.get(t);
    a || this.PQo.set(t, (a = new Map())), a.set(r, (a.get(r) ?? 0) + 1);
    t = this.GQo(r, 1);
    this.NQo(t);
  }
  RemoveTag(t, r) {
    var a = this.PQo.get(t);
    if (a) {
      const o = a.get(r) ?? 0;
      a.delete(r);
      var s = this.GQo(r, -o) ?? [];
      if (0 < this.wQo.get(r)) {
        var i = [];
        for (const n of a.keys())
          GameplayTagUtils_1.GameplayTagUtils.IsChildTag(n, r) && i.push(n);
        for (const h of i) {
          const o = a.get(h) ?? 0;
          a.delete(h);
          var e = this.GQo(h, -o);
          e && s.push(...e);
        }
      }
      0 === a.size && this.PQo.delete(t), this.NQo(s);
    }
  }
  RemoveExactTag(r, a) {
    var s = this.PQo.get(r);
    if (s) {
      var i = s.get(a) ?? 0;
      let t = void 0;
      0 < i && ((t = this.GQo(a, -i)), s.delete(a)),
        0 === s.size && this.PQo.delete(r),
        this.NQo(t);
    }
  }
  UpdateExactTag(t, r, a) {
    let s = this.PQo.get(t);
    if (!s) {
      if (!(0 < a)) return;
      this.PQo.set(t, (s = new Map()));
    }
    var i = s.get(r) ?? 0,
      a = Math.max(0, i + a),
      r = (0 < a ? s.set(r, a) : s.delete(r), this.GQo(r, a - i));
    0 === s.size && this.PQo.delete(t), this.NQo(r);
  }
  ContainsTag(t) {
    return this.xQo.has(t) || this.wQo.has(t);
  }
  ContainsExactTag(t) {
    return this.xQo.has(t);
  }
  GetRowTagCount(t, r) {
    return this.PQo.get(t)?.get(r) ?? 0;
  }
  GetTagCount(t) {
    return (this.xQo.get(t) ?? 0) + (this.wQo.get(t) ?? 0);
  }
  GetExactTagCount(t) {
    return this.xQo.get(t) ?? 0;
  }
  AddAnyTagListener(t) {
    this.BQo.add(t);
  }
  RemoveAnyTagListener(t) {
    this.BQo.delete(t);
  }
  AddAnyExactTagListener(t) {
    this.bQo.add(t);
  }
  RemoveExactAnyTagListener(t) {
    this.bQo.delete(t);
  }
  GetDebugString() {
    var t = "汇总tag:\n";
    return (
      t +
      this.GetExactTagsDebugString() +
      "\n\n父tag:\n" +
      [...this.wQo.entries()]
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
    return [...this.xQo.entries()]
      .map(([t, r]) => {
        let a =
          GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t) + ` x ${r}(`;
        for (const i of this.PQo.keys()) {
          var s = this.PQo.get(i)?.get(t);
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
