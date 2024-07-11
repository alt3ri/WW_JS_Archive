"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldPassiveSkillCdData = exports.PassiveSkillCdData = void 0);
const Time_1 = require("../../../../Core/Common/Time"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  PassiveSkillCdInfo_1 = require("./PassiveSkillCdInfo");
class PassiveSkillCdData {
  constructor() {
    (this.SkillCdInfoMap = new Map()), (this.ServerSkillCd = new Map());
  }
  Tick(i) {
    for (const t of this.SkillCdInfoMap.values()) t.Tick(i);
  }
  Clear() {
    this.SkillCdInfoMap.clear();
  }
}
exports.PassiveSkillCdData = PassiveSkillCdData;
class WorldPassiveSkillCdData {
  constructor() {
    (this.EntitySkillCdMap = new Map()),
      (this.AllShareSkillCdData = new PassiveSkillCdData()),
      (this.OffRoleSkillCdMap = new Map());
  }
  Clear() {
    this.EntitySkillCdMap.clear(),
      this.AllShareSkillCdData.Clear(),
      this.OffRoleSkillCdMap.clear();
  }
  InitPassiveSkillCd(i, t) {
    return this.InitSkillCdCommon(i, t.Id, t.CDTime, t.IsShareAllCdSkill);
  }
  InitSkillCdCommon(i, t, s, e) {
    let o = void 0;
    var a, l, r;
    e
      ? (o = this.AllShareSkillCdData)
      : ((a = i.Id),
        (r = void 0),
        (o = this.EntitySkillCdMap.get(a)) ||
          ((o =
            i.GetComponent(0).IsRole() &&
            ((l = i.GetComponent(0).GetPbDataId()),
            (r = this.OffRoleSkillCdMap.get(l)))
              ? (this.OffRoleSkillCdMap.delete(l), r)
              : new PassiveSkillCdData()),
          this.EntitySkillCdMap.set(a, o)));
    let n = o.SkillCdInfoMap.get(t);
    return (
      n ||
        (((n = new PassiveSkillCdInfo_1.PassiveSkillCdInfo()).SkillId = t),
        (n.SkillCd = s),
        (n.IsShareAllCdSkill = e),
        (n.CurMaxCd = 0),
        (n.CurRemainingCd = 0),
        (l = o.ServerSkillCd.get(t)) &&
          ((r = Time_1.Time.ServerTimeStamp) < l &&
            (n.CurRemainingCd = (l - r) * TimeUtil_1.TimeUtil.Millisecond),
          o.ServerSkillCd.delete(t)),
        o.SkillCdInfoMap.set(t, n)),
      n.EntityIds.add(i.Id),
      n
    );
  }
  RemoveEntity(i) {
    var t = i.Id,
      s = this.EntitySkillCdMap.get(t);
    if (s && (this.EntitySkillCdMap.delete(t), i.GetComponent(0).IsRole())) {
      i = i.GetComponent(0).GetPbDataId();
      for (const e of s.SkillCdInfoMap.values()) e.EntityIds.clear();
      this.OffRoleSkillCdMap.set(i, s);
    }
    for (const o of this.AllShareSkillCdData.SkillCdInfoMap.values())
      o.EntityIds.delete(t);
  }
  Tick(i) {
    for (const t of this.EntitySkillCdMap.values()) t.Tick(i);
    this.AllShareSkillCdData.Tick(i);
    for (const s of this.OffRoleSkillCdMap.values()) s.Tick(i);
  }
  HandlePassiveSkillNotify(i) {
    var t = Time_1.Time.ServerTimeStamp;
    for (const a of i.OBs) {
      let i = this.nQe(a.O6n);
      i ||
        ((i = new PassiveSkillCdData()), this.OffRoleSkillCdMap.set(a.O6n, i));
      for (const l of a.GBs) {
        var s,
          e,
          o = MathUtils_1.MathUtils.LongToNumber(l.qBs);
        o <= t ||
          ((s = MathUtils_1.MathUtils.LongToBigInt(l.X4n)),
          (e = i.SkillCdInfoMap.get(s))
            ? (e.CurRemainingCd = (o - t) * TimeUtil_1.TimeUtil.Millisecond)
            : i.ServerSkillCd.set(s, o));
      }
    }
  }
  nQe(i) {
    const t = this.OffRoleSkillCdMap.get(i);
    if (t) return t;
    for (const [e, t] of this.EntitySkillCdMap) {
      var s = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e);
      if (s?.Valid) {
        s = s.Entity;
        if (!t)
          if (s.GetComponent(0).IsRole())
            if (s.GetComponent(0).GetPbDataId() === i) return t;
      }
    }
  }
}
exports.WorldPassiveSkillCdData = WorldPassiveSkillCdData;
//# sourceMappingURL=PassiveSkillCdData.js.map
