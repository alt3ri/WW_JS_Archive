"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldPassiveSkillCdData = exports.PassiveSkillCdData = void 0);
const Time_1 = require("../../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  PassiveSkillCdInfo_1 = require("./PassiveSkillCdInfo");
class PassiveSkillCdData {
  constructor() {
    (this.SkillCdInfoMap = new Map()), (this.ServerSkillCd = new Map());
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
  InitPassiveSkillCd(i, s) {
    let e = s.CdThreshold;
    return (
      e < 0 &&
        (e =
          CommonParamById_1.configCommonParamById.GetFloatConfig(
            "PassiveSkillCdThreshold",
          ) ?? 0),
      this.InitSkillCdCommon(i, s.Id, s.CDTime, s.IsShareAllCdSkill, e)
    );
  }
  InitSkillCdCommon(i, s, e, t, a) {
    let o = void 0;
    var r, l, n;
    t
      ? (o = this.AllShareSkillCdData)
      : ((r = i.Id),
        (n = void 0),
        (o = this.EntitySkillCdMap.get(r)) ||
          ((o =
            i.GetComponent(0).IsRole() &&
            ((l = i.GetComponent(0).GetPbDataId()),
            (n = this.OffRoleSkillCdMap.get(l)))
              ? (this.OffRoleSkillCdMap.delete(l), n)
              : new PassiveSkillCdData()),
          this.EntitySkillCdMap.set(r, o)));
    let d = o.SkillCdInfoMap.get(s);
    return (
      d ||
        (((d = new PassiveSkillCdInfo_1.PassiveSkillCdInfo()).SkillId = s),
        (d.SkillCd = e),
        void 0 !== a && (d.Threshold = a),
        (d.IsShareAllCdSkill = t),
        (d.CurMaxCd = 0),
        (l = o.ServerSkillCd.get(s)) &&
          ((n = Time_1.Time.ServerTimeStamp) < l &&
            (d.SkillCdFinishStamp = Time_1.Time.FlowTime + (l - n)),
          o.ServerSkillCd.delete(s)),
        o.SkillCdInfoMap.set(s, d)),
      d.EntityIds.add(i.Id),
      d
    );
  }
  RemoveEntity(i) {
    var s = i.Id,
      e = this.EntitySkillCdMap.get(s);
    if (e && (this.EntitySkillCdMap.delete(s), i.GetComponent(0).IsRole())) {
      i = i.GetComponent(0).GetPbDataId();
      for (const t of e.SkillCdInfoMap.values()) t.EntityIds.clear();
      this.OffRoleSkillCdMap.set(i, e);
    }
    for (const a of this.AllShareSkillCdData.SkillCdInfoMap.values())
      a.EntityIds.delete(s);
  }
  HandlePassiveSkillNotify(i) {
    var s = Time_1.Time.ServerTimeStamp;
    for (const o of i.jBs) {
      let i = this.nQe(o.Q6n);
      i ||
        ((i = new PassiveSkillCdData()), this.OffRoleSkillCdMap.set(o.Q6n, i));
      for (const r of o.HBs) {
        var e,
          t,
          a = MathUtils_1.MathUtils.LongToNumber(r.$Bs);
        a <= s ||
          ((e = MathUtils_1.MathUtils.LongToNumber(r.r5n)),
          (t = i.SkillCdInfoMap.get(e))
            ? (t.SkillCdFinishStamp = Time_1.Time.FlowTime + (a - s))
            : i.ServerSkillCd.set(e, a));
      }
    }
  }
  nQe(i) {
    const s = this.OffRoleSkillCdMap.get(i);
    if (s) return s;
    for (const [t, s] of this.EntitySkillCdMap) {
      var e = ModelManager_1.ModelManager.CharacterModel?.GetHandle(t);
      if (e?.Valid) {
        e = e.Entity;
        if (!s)
          if (e.GetComponent(0).IsRole())
            if (e.GetComponent(0).GetPbDataId() === i) return s;
      }
    }
  }
}
exports.WorldPassiveSkillCdData = WorldPassiveSkillCdData;
//# sourceMappingURL=PassiveSkillCdData.js.map
