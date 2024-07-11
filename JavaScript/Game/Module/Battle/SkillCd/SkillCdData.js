"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldSkillCdData = exports.SkillCdData = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  MultiSkillData_1 = require("../../../NewWorld/Character/Common/Component/Skill/MultiSkillData"),
  GroupSkillCdInfo_1 = require("./GroupSkillCdInfo"),
  MIN_SHARE_GROUP_ID = 1e3;
class SkillCdData {
  constructor() {
    (this.SkillId2GroupIdMap = new Map()),
      (this.GroupSkillCdInfoMap = new Map()),
      (this.XWe = 0),
      (this.ServerSkillCd = new Map()),
      (this.ServerGroupSkillCd = new Map());
  }
  GenerateCdShareGroupId(t) {
    return 0 === t ? (this.XWe++, this.XWe) : t;
  }
  Tick(t) {
    for (const i of this.GroupSkillCdInfoMap.values()) i.Tick(t);
  }
  Clear() {
    this.SkillId2GroupIdMap.clear(),
      this.GroupSkillCdInfoMap.clear(),
      (this.XWe = 0);
  }
}
exports.SkillCdData = SkillCdData;
class WorldSkillCdData {
  constructor() {
    (this.EntitySkillCdMap = new Map()),
      (this.AllShareSkillCdData = new SkillCdData()),
      (this.OffRoleSkillCdMap = new Map()),
      (this.MultiSkillMap = new Map());
  }
  Clear() {
    this.EntitySkillCdMap.clear(),
      this.AllShareSkillCdData.Clear(),
      this.OffRoleSkillCdMap.clear(),
      this.MultiSkillMap.clear();
  }
  InitSkillCd(t, i, e) {
    e = e.CooldownConfig;
    return this.InitSkillCdCommon(
      t,
      i,
      e.CdTime,
      e.CdDelay,
      e.MaxCount,
      e.ShareGroupId,
      e.IsShareAllCdSkill,
    );
  }
  InitSkillCdCommon(t, i, e, o, r, l, s) {
    let a = void 0;
    s
      ? (a = this.AllShareSkillCdData)
      : ((n = t.Id),
        (h = void 0),
        (a = this.EntitySkillCdMap.get(n)) ||
          ((a =
            t.GetComponent(0).IsRole() &&
            ((f = t.GetComponent(0).GetPbDataId()),
            (h = this.OffRoleSkillCdMap.get(f)))
              ? (this.OffRoleSkillCdMap.delete(f), h)
              : new SkillCdData()),
          this.EntitySkillCdMap.set(n, a)));
    var n,
      h,
      f = a.SkillId2GroupIdMap.get(i);
    if (f) {
      const _ = a.GroupSkillCdInfoMap.get(f),
        d = _.SkillCdInfoMap.get(i);
      return (d.SkillCd = e), _.EntityIds.add(t.Id), _;
    }
    0 !== l &&
      l < MIN_SHARE_GROUP_ID &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error("Battle", 18, "自定义的冷却组不能小于1000", [
        "skillId",
        i,
      ]),
      (f = a.GenerateCdShareGroupId(l));
    let _ = a.GroupSkillCdInfoMap.get(f);
    _ ||
      (((_ = new GroupSkillCdInfo_1.GroupSkillCdInfo()).GroupId = f),
      (_.CurMaxCd = 0),
      (_.CurRemainingCd = 0),
      (_.CurRemainingDelayCd = 0),
      (_.MaxCount = r),
      (_.LimitCount = r),
      (_.RemainingCount = r),
      0 !== l
        ? this.$We(a.ServerGroupSkillCd, l, _, i)
        : this.$We(a.ServerSkillCd, i, _, i),
      a.GroupSkillCdInfoMap.set(f, _));
    const d = new GroupSkillCdInfo_1.SkillCdInfo();
    return (
      (d.SkillId = i),
      (d.SkillCd = e),
      (d.CdDelay = o),
      (d.IsShareAllCdSkill = s),
      r !== _.MaxCount &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Battle",
          18,
          "同一个冷却组的技能，可使用次数配置不一致",
          ["skillId", d.SkillId],
        ),
      _.SkillCdInfoMap.set(i, d),
      a.SkillId2GroupIdMap.set(i, f),
      _.EntityIds.add(t.Id),
      _
    );
  }
  $We(t, i, e, o) {
    var r = t.get(i);
    if (r) {
      if (0 < r.length) {
        var l = Time_1.Time.ServerTimeStamp;
        let t = 0,
          i = 0;
        for (const s of r)
          s <= l ||
            (1 === ++t
              ? ((e.CurRemainingCd = (s - l) * TimeUtil_1.TimeUtil.Millisecond),
                (e.CurMaxCd = e.CurRemainingCd))
              : (e.SkillIdQueue.Push(o),
                e.CdQueue.Push((s - i) * TimeUtil_1.TimeUtil.Millisecond)),
            (i = s));
        e.RemainingCount -= t;
      }
      t.delete(i);
    }
  }
  InitMultiSkill(t) {
    var i = this.MultiSkillMap.get(t);
    return (
      i
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 18, "重复初始化多段技能", ["entityId", t])
        : ((i = new MultiSkillData_1.MultiSkillData()),
          this.MultiSkillMap.set(t, i)),
      i
    );
  }
  RemoveEntity(t) {
    var i = t.Id,
      e = this.EntitySkillCdMap.get(i);
    if (e && (this.EntitySkillCdMap.delete(i), t.GetComponent(0).IsRole())) {
      t = t.GetComponent(0).GetPbDataId();
      for (const o of e.GroupSkillCdInfoMap.values()) o.EntityIds.clear();
      this.OffRoleSkillCdMap.set(t, e);
    }
    for (const r of this.AllShareSkillCdData.GroupSkillCdInfoMap.values())
      r.EntityIds.delete(i);
    this.RemoveMultiSkill(i);
  }
  RemoveMultiSkill(t) {
    this.MultiSkillMap.has(t) && this.MultiSkillMap.delete(t);
  }
  Tick(t) {
    for (const i of this.EntitySkillCdMap.values()) i.Tick(t);
    this.AllShareSkillCdData.Tick(t);
    for (const e of this.OffRoleSkillCdMap.values()) e.Tick(t);
    for (const o of this.MultiSkillMap.values()) o.OnTick(t);
  }
  HandlePlayerSkillInfoPbNotify(t) {
    if (t.uxs) {
      var i = t.uxs.lxs;
      i && this.YWe(this.AllShareSkillCdData, i);
      for (const e of t.uxs._xs)
        if (e.hxs) {
          let t = this.QWe(e.axs);
          t || ((t = new SkillCdData()), this.OffRoleSkillCdMap.set(e.axs, t)),
            this.YWe(t, e.hxs);
        }
    }
  }
  YWe(t, i) {
    var e = Time_1.Time.ServerTimeStamp;
    for (const r of i.nxs)
      this.JWe(r, e, t.ServerSkillCd, r.vkn), this.zWe(t, r, 0);
    for (const l of i.sxs) {
      var o = l.oxs;
      o && (this.JWe(o, e, t.ServerGroupSkillCd, l.rxs), this.zWe(t, o, l.rxs));
    }
  }
  zWe(t, i, e = 0) {
    var o = t.SkillId2GroupIdMap.get(i.vkn);
    return (
      !!o &&
      !!(o = t.GroupSkillCdInfoMap.get(o)) &&
      (0 !== e
        ? this.$We(t.ServerSkillCd, e, o, i.vkn)
        : this.$We(t.ServerSkillCd, i.vkn, o, i.vkn),
      !0)
    );
  }
  JWe(t, i, e, o) {
    var r = [];
    for (const s of t.ixs) {
      var l = MathUtils_1.MathUtils.LongToNumber(s);
      i < l && r.push(l);
    }
    0 < r.length && (1 < r.length && r.sort((t, i) => t - i), e.set(o, r));
  }
  QWe(t) {
    const i = this.OffRoleSkillCdMap.get(t);
    if (i) return i;
    for (const [o, i] of this.EntitySkillCdMap) {
      var e = ModelManager_1.ModelManager.CharacterModel?.GetHandle(o);
      if (e?.Valid) {
        e = e.Entity;
        if (!i)
          if (e.GetComponent(0).IsRole())
            if (e.GetComponent(0).GetPbDataId() === t) return i;
      }
    }
  }
}
exports.WorldSkillCdData = WorldSkillCdData;
//# sourceMappingURL=SkillCdData.js.map
