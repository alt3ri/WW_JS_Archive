"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillButtonIndexData = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
class SkillButtonIndexData {
  constructor() {
    (this.IsNormalButtonTypeList = !1),
      (this.ButtonTypeList = []),
      (this.ButtonIndexConfig = void 0),
      (this.ButtonIndexConfigId = -1),
      (this.ButtonIndexIsDesktop = !1),
      (this.ButtonIndexTagIdList = []),
      (this.ButtonIndexTagIdSet = new Set()),
      (this.ButtonIndexTypeList = []),
      (this.ButtonTypeTagMap = new Map());
  }
  RefreshSkillButtonIndex(t) {
    this.IsNormalButtonTypeList = !1;
    var i,
      s,
      h = t.Entity.GetComponent(203);
    let o = 0;
    for (const e of this.ButtonIndexTagIdList) {
      let t = !0;
      for (const a of e)
        if (!h.HasTag(a)) {
          t = !1;
          break;
        }
      if (t) return void (this.ButtonTypeList = this.ButtonIndexTypeList[o]);
      o++;
    }
    for ([i, s] of this.ButtonTypeTagMap)
      if (h.HasTag(i)) return void (this.ButtonTypeList = s);
    (this.ButtonTypeList = this.ButtonIndexIsDesktop
      ? this.ButtonIndexConfig.DesktopButtonTypeList
      : this.ButtonIndexConfig.PadButtonTypeList),
      (this.IsNormalButtonTypeList = !0);
  }
  RefreshSkillButtonIndexByTag(t, i) {
    !this.IsNormalButtonTypeList ||
    ((this.IsNormalButtonTypeList = !1), this.ButtonIndexTagIdSet.has(i))
      ? this.RefreshSkillButtonIndex(t)
      : (i = this.ButtonTypeTagMap.get(i))
        ? (this.ButtonTypeList = i)
        : ((this.ButtonTypeList = this.ButtonIndexIsDesktop
            ? this.ButtonIndexConfig.DesktopButtonTypeList
            : this.ButtonIndexConfig.PadButtonTypeList),
          (this.IsNormalButtonTypeList = !0));
  }
  UpdateSkillButtonIndexConfig(t, i) {
    if (
      (this.ButtonIndexConfigId !== t?.Id || this.ButtonIndexIsDesktop !== i) &&
      ((this.ButtonIndexConfig = t),
      (this.ButtonIndexConfigId = this.ButtonIndexConfig?.Id ?? -1),
      (this.ButtonIndexIsDesktop = i),
      (this.ButtonIndexTagIdList.length = 0),
      this.ButtonIndexTagIdSet.clear(),
      (this.ButtonIndexTypeList.length = 0),
      t)
    ) {
      for (const a of t.TagList) {
        var s = [];
        for (const r of a.ArrayString) {
          var h = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(r);
          h
            ? (s.push(h), this.ButtonIndexTagIdSet.add(h))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Battle",
                17,
                "技能按钮索引配置了不存在的Tag",
                ["tag", r],
                ["Id", this.ButtonIndexConfigId],
              );
        }
        if (0 === s.length) {
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Battle",
              17,
              "技能按钮索引组合Tag出现空元素，请确认改数组最后一个元素后面没有逗号",
              ["Id", this.ButtonIndexConfigId],
            );
          break;
        }
        this.ButtonIndexTagIdList.push(s);
      }
      var o, e;
      for (const n of i ? t.TagDesktopButtonTypeList : t.TagPadButtonTypeList)
        this.ButtonIndexTypeList.push(n.ArrayInt);
      this.ButtonIndexTagIdList.length !== this.ButtonIndexTypeList.length &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Battle",
          17,
          "技能按钮索引组合Tag和按钮索引数组的数量不匹配",
          ["Id", this.ButtonIndexConfigId],
          ["TagLength", this.ButtonIndexTagIdList.length],
          ["ButtonLength", this.ButtonIndexTypeList.length],
        ),
        this.ButtonTypeTagMap.clear();
      for ([o, e] of i ? t.DesktopButtonTypeMap : t.PadButtonTypeMap)
        this.ButtonTypeTagMap.set(o, e.ArrayInt);
    }
  }
}
exports.SkillButtonIndexData = SkillButtonIndexData;
//# sourceMappingURL=SkillButtonIndexData.js.map
