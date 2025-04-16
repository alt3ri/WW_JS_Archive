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
      (this.sQe = 0),
      (this.ServerSkillCd = new Map()),
      (this.ServerGroupSkillCd = new Map()),
      (this.NeedTick = !0);
  }
  GenerateCdShareGroupId(t) {
    return 0 === t ? (this.sQe++, this.sQe) : t;
  }
  Clear() {
    this.SkillId2GroupIdMap.clear(),
      this.GroupSkillCdInfoMap.clear(),
      (this.sQe = 0);
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
      e.CdTags,
    );
  }
  InitSkillCdCommon(t, i, e, r, l, o, s, a) {
    let n = void 0;
    s
      ? (n = this.AllShareSkillCdData)
      : ((h = t.Id),
        (_ = void 0),
        (n = this.EntitySkillCdMap.get(h)) ||
          (((n =
            t.GetComponent(0).IsRole() &&
            ((d = t.GetComponent(0).GetPbDataId()),
            (_ = this.OffRoleSkillCdMap.get(d)))
              ? (this.OffRoleSkillCdMap.delete(d), _)
              : new SkillCdData()).NeedTick = !0),
          this.EntitySkillCdMap.set(h, n)));
    var h,
      _,
      d = n.SkillId2GroupIdMap.get(i);
    if (d) {
      const f = n.GroupSkillCdInfoMap.get(d),
        C = f.SkillCdInfoMap.get(i);
      return (C.SkillCd = e), f.EntityIds.add(t.Id), f;
    }
    0 !== o &&
      o < MIN_SHARE_GROUP_ID &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error("Battle", 17, "自定义的冷却组不能小于1000", [
        "skillId",
        i,
      ]),
      (d = n.GenerateCdShareGroupId(o));
    let f = n.GroupSkillCdInfoMap.get(d);
    if (!f) {
      ((f = new GroupSkillCdInfo_1.GroupSkillCdInfo()).GroupId = d),
        (f.CurMaxCd = 0),
        (f.ConfigMaxCount = l),
        (f.LimitCountModify = l),
        (f.LimitCountAdd = 0),
        (f.LimitCount = l),
        (f.RemainingCount = l);
      for (let t = a.Num() - 1; 0 <= t; t--) f.CdTags.push(a.Get(t).TagId);
      0 !== o
        ? this.aQe(n.ServerGroupSkillCd, o, f, i)
        : this.aQe(n.ServerSkillCd, i, f, i),
        n.GroupSkillCdInfoMap.set(d, f);
    }
    const C = new GroupSkillCdInfo_1.SkillCdInfo();
    return (
      (C.SkillId = i),
      (C.SkillCd = e),
      (C.CdDelay = r),
      (C.IsShareAllCdSkill = s),
      l !== f.ConfigMaxCount &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Battle",
          17,
          "同一个冷却组的技能，可使用次数配置不一致",
          ["skillId", C.SkillId],
        ),
      f.SkillCdInfoMap.set(i, C),
      n.SkillId2GroupIdMap.set(i, d),
      f.EntityIds.add(t.Id),
      f
    );
  }
  aQe(t, i, e, r) {
    var l = t.get(i);
    if (l) {
      if (0 < l.length) {
        var o = Time_1.Time.ServerTimeStamp;
        let t = 0,
          i = 0;
        for (const s of l)
          s <= o ||
            (1 === ++t
              ? e.StartSkillCdTimer(
                  r,
                  (s - o) * TimeUtil_1.TimeUtil.Millisecond,
                )
              : (e.SkillIdQueue.Push(r),
                e.CdQueue.Push((s - i) * TimeUtil_1.TimeUtil.Millisecond)),
            (i = s));
        (e.RemainingCount -= t), e.OnCountChanged();
      }
      t.delete(i);
    }
  }
  InitMultiSkill(t) {
    var i = this.MultiSkillMap.get(t);
    return (
      i
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 17, "重复初始化多段技能", ["entityId", t])
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
      for (const r of e.GroupSkillCdInfoMap.values()) r.EntityIds.clear();
      this.OffRoleSkillCdMap.set(t, e);
    }
    for (const l of this.AllShareSkillCdData.GroupSkillCdInfoMap.values())
      l.EntityIds.delete(i);
    this.RemoveMultiSkill(i);
  }
  RemoveMultiSkill(t) {
    this.MultiSkillMap.has(t) && this.MultiSkillMap.delete(t);
  }
  HandlePlayerSkillInfoPbNotify(t) {
    if (t.Gqs) {
      var i = t.Gqs.Bqs;
      i && this.hQe(this.AllShareSkillCdData, i);
      for (const e of t.Gqs.qqs)
        if (e.bqs) {
          let t = this.nQe(e.xqs);
          t || ((t = new SkillCdData()), this.OffRoleSkillCdMap.set(e.xqs, t)),
            this.hQe(t, e.bqs);
        }
    }
  }
  hQe(t, i) {
    var e = Time_1.Time.ServerTimeStamp;
    for (const l of i.Uqs)
      this.lQe(l, e, t.ServerSkillCd, l.r5n), this._Qe(t, l, 0);
    for (const o of i.wqs) {
      var r = o.Pqs;
      r && (this.lQe(r, e, t.ServerGroupSkillCd, o.Aqs), this._Qe(t, r, o.Aqs));
    }
  }
  _Qe(t, i, e = 0) {
    var r = t.SkillId2GroupIdMap.get(i.r5n);
    return (
      !!r &&
      !!(r = t.GroupSkillCdInfoMap.get(r)) &&
      (0 !== e
        ? this.aQe(t.ServerSkillCd, e, r, i.r5n)
        : this.aQe(t.ServerSkillCd, i.r5n, r, i.r5n),
      !0)
    );
  }
  lQe(t, i, e, r) {
    var l = [];
    for (const s of t.Dqs) {
      var o = MathUtils_1.MathUtils.LongToNumber(s);
      i < o && l.push(o);
    }
    0 < l.length && (1 < l.length && l.sort((t, i) => t - i), e.set(r, l));
  }
  nQe(t) {
    const i = this.OffRoleSkillCdMap.get(t);
    if (i) return i;
    for (const [r, i] of this.EntitySkillCdMap) {
      var e = ModelManager_1.ModelManager.CharacterModel?.GetHandle(r);
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
