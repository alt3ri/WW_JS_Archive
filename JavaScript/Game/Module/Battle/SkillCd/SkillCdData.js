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
      (this.ServerGroupSkillCd = new Map());
  }
  GenerateCdShareGroupId(t) {
    return 0 === t ? (this.sQe++, this.sQe) : t;
  }
  Tick(t) {
    for (const i of this.GroupSkillCdInfoMap.values()) i.Tick(t);
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
  InitSkillCdCommon(t, i, e, o, r, l, s, a) {
    let n = void 0;
    s
      ? (n = this.AllShareSkillCdData)
      : ((h = t.Id),
        (f = void 0),
        (n = this.EntitySkillCdMap.get(h)) ||
          ((n =
            t.GetComponent(0).IsRole() &&
            ((_ = t.GetComponent(0).GetPbDataId()),
            (f = this.OffRoleSkillCdMap.get(_)))
              ? (this.OffRoleSkillCdMap.delete(_), f)
              : new SkillCdData()),
          this.EntitySkillCdMap.set(h, n)));
    var h,
      f,
      _ = n.SkillId2GroupIdMap.get(i);
    if (_) {
      const d = n.GroupSkillCdInfoMap.get(_),
        C = d.SkillCdInfoMap.get(i);
      return (C.SkillCd = e), d.EntityIds.add(t.Id), d;
    }
    0 !== l &&
      l < MIN_SHARE_GROUP_ID &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error("Battle", 18, "自定义的冷却组不能小于1000", [
        "skillId",
        i,
      ]),
      (_ = n.GenerateCdShareGroupId(l));
    let d = n.GroupSkillCdInfoMap.get(_);
    if (!d) {
      ((d = new GroupSkillCdInfo_1.GroupSkillCdInfo()).GroupId = _),
        (d.CurMaxCd = 0),
        (d.CurRemainingCd = 0),
        (d.CurRemainingDelayCd = 0),
        (d.MaxCount = r),
        (d.LimitCount = r),
        (d.RemainingCount = r);
      for (let t = a.Num() - 1; 0 <= t; t--) d.CdTags.push(a.Get(t).TagId);
      0 !== l
        ? this.aQe(n.ServerGroupSkillCd, l, d, i)
        : this.aQe(n.ServerSkillCd, i, d, i),
        n.GroupSkillCdInfoMap.set(_, d);
    }
    const C = new GroupSkillCdInfo_1.SkillCdInfo();
    return (
      (C.SkillId = i),
      (C.SkillCd = e),
      (C.CdDelay = o),
      (C.IsShareAllCdSkill = s),
      r !== d.MaxCount &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Battle",
          18,
          "同一个冷却组的技能，可使用次数配置不一致",
          ["skillId", C.SkillId],
        ),
      d.SkillCdInfoMap.set(i, C),
      n.SkillId2GroupIdMap.set(i, _),
      d.EntityIds.add(t.Id),
      d
    );
  }
  aQe(t, i, e, o) {
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
    if (t.Pqs) {
      var i = t.Pqs.Dqs;
      i && this.hQe(this.AllShareSkillCdData, i);
      for (const e of t.Pqs.Aqs)
        if (e.Rqs) {
          let t = this.nQe(e.Lqs);
          t || ((t = new SkillCdData()), this.OffRoleSkillCdMap.set(e.Lqs, t)),
            this.hQe(t, e.Rqs);
        }
    }
  }
  hQe(t, i) {
    var e = Time_1.Time.ServerTimeStamp;
    for (const r of i.Iqs)
      this.lQe(r, e, t.ServerSkillCd, r.X4n), this._Qe(t, r, 0);
    for (const l of i.Tqs) {
      var o = l.yqs;
      o && (this.lQe(o, e, t.ServerGroupSkillCd, l.Eqs), this._Qe(t, o, l.Eqs));
    }
  }
  _Qe(t, i, e = 0) {
    var o = t.SkillId2GroupIdMap.get(i.X4n);
    return (
      !!o &&
      !!(o = t.GroupSkillCdInfoMap.get(o)) &&
      (0 !== e
        ? this.aQe(t.ServerSkillCd, e, o, i.X4n)
        : this.aQe(t.ServerSkillCd, i.X4n, o, i.X4n),
      !0)
    );
  }
  lQe(t, i, e, o) {
    var r = [];
    for (const s of t.Sqs) {
      var l = MathUtils_1.MathUtils.LongToNumber(s);
      i < l && r.push(l);
    }
    0 < r.length && (1 < r.length && r.sort((t, i) => t - i), e.set(o, r));
  }
  nQe(t) {
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
