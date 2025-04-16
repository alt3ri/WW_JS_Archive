"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelPlayReportModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IVar_1 = require("../../../UniverseEditor/Interface/IVar"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  MapUtil_1 = require("../Map/MapUtil");
class LevelPlayReportModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.gLl = new Map()),
      (this.pLl = new Map()),
      (this.fLl = new Map()),
      (this.cWl = new Map()),
      (this.Ox_ = new Map()),
      (this.wf1 = new Map());
  }
  HasRequestDetail(e, t) {
    e = this.vLl(e, t);
    return this.gLl.get(e) ?? !1;
  }
  SetRequestDetailFlag(e, t) {
    e = this.vLl(e, t);
    this.gLl.set(e, !0);
  }
  ResetDetailRequestFlag() {
    this.gLl.clear();
  }
  vLl(e, t) {
    return MapUtil_1.MapUtil.GetGamePlayKey(e, t);
  }
  UpdateSimpleReportMsg(e) {
    this.pLl.clear(),
      e.forEach((e) => {
        var t = this.vLl(e.r6n, e._ps);
        this.pLl.set(t, e);
      }),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.LevelPlayReportSimpleUpdate,
      );
  }
  GetSimpleReportMsgMap() {
    return this.pLl;
  }
  UpdateLevelPlayStateMsg(e, t) {
    for (const v of e) {
      var r = v.r6n;
      for (const M of v.Uxs) {
        var a = this.vLl(r, M);
        this.cWl.delete(a), this.Ox_.delete(a), this.wf1.delete(a);
      }
    }
    for (const p of t) {
      var i = p.qb_,
        s = p.Ob_,
        o = p.X4_;
      for (const u of new Set(
        Array.from(
          Object.keys(i).concat(Object.keys(s)).concat(Object.keys(o)),
        ),
      )) {
        var n = Number(u),
          l = !!o[n] ? 5 : i[n],
          h = this.vLl(p.r6n, n);
        void 0 !== l && this.cWl.set(h, l),
          void 0 !== s[n] && this.Ox_.set(h, s[n]),
          void 0 !== o[n] ? this.wf1.set(h, o[n]) : this.wf1.delete(h);
      }
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.LevelPlayStateDetailUpdate,
    );
  }
  GetLevelPlayHideReason(e, t) {
    (e = this.vLl(e, t)), (t = this.wf1.get(e));
    if (void 0 !== t)
      return ModelManager_1.ModelManager.MapModel.ParseHideReason(t);
  }
  GetLevelPlayStateMsgMap() {
    return this.cWl;
  }
  IsCommonLevelPlayComplete(e, t) {
    var r = this.vLl(e, t);
    return (
      3 === (this.cWl.get(r) ?? 0) ||
      (!((this.Ox_.get(r) ?? 0) <= 0) &&
        1 ===
          ConfigManager_1.ConfigManager.MapConfig.GetMapMarkByRelativeId(t, e)
            ?.HistoryState)
    );
  }
  IsCommonLevelPlayHide(e, t) {
    e = this.vLl(e, t);
    return 5 === (this.cWl.get(e) ?? 0);
  }
  IsCommonLevelPlayDiscover(e, t) {
    return (
      !!this.IsCommonLevelPlayComplete(e, t) ||
      ((e = this.vLl(e, t)), 0 < (this.cWl.get(e) ?? 0))
    );
  }
  GetSimpleReportMsg(e, t) {
    e = this.vLl(e, t);
    return this.pLl.get(e);
  }
  UpdateDetailReportMsg(e, t, r) {
    var a = this.vLl(e, t);
    this.fLl.set(a, r),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.LevelPlayReportDetailUpdate,
        e,
        t,
      );
  }
  GetVar(e, t, r) {
    (e = this.vLl(e, t)), (t = this.fLl.get(e));
    if (void 0 !== t) {
      var a = t[r];
      if (void 0 !== a) {
        let e = void 0;
        switch ((0, IVar_1.getVarTypeByIndex)(a.iTs)) {
          case "Boolean":
            e = a.rTs;
            break;
          case "Float":
            e = a.sTs;
            break;
          case "Int":
            e = MathUtils_1.MathUtils.LongToNumber(a.oTs);
            break;
          case "String":
            e = a.nTs;
            break;
          default:
            e = void 0;
        }
        return e;
      }
    }
  }
  IsLevelPlayReportComplete(e, t) {
    let r = 1;
    for (const a of ConfigManager_1.ConfigManager.LevelPlayReportConfig.GetLevelPlayReportConfig(
      t,
    )?.Vars ?? [])
      this.GetVar(e, t, a) || (r = 0);
    return 1 === r;
  }
  HaveLevelPlayReportRewardCanGet(e, t) {
    var r =
        ConfigManager_1.ConfigManager.LevelPlayReportConfig.GetLevelPlayReportConfig(
          t,
        ),
      a = this.GetSimpleReportMsg(e, t)?.Fb_ ?? 0;
    let i = 0;
    for (const s of r.Vars) this.GetVar(e, t, s) && (i += 1);
    return a < i;
  }
  GetLevelPlayReportTarget(e, t) {
    var r = { States: [], ConditionTxtIds: [], GetBoxNum: 0 };
    for (const o of ConfigManager_1.ConfigManager.LevelPlayReportConfig.GetLevelPlayReportConfig(
      t,
    )?.Vars ?? [])
      this.GetVar(e, t, o) ? r.States.push(1) : r.States.push(0);
    var a =
        ConfigManager_1.ConfigManager.WorldMapConfig.GetPunishReportConfig(t),
      i = a?.CondDescription1 ?? "",
      s = a?.CondDescription2 ?? "",
      a = a?.CondDescription3 ?? "",
      i =
        (r.ConditionTxtIds.push(i),
        r.ConditionTxtIds.push(s),
        r.ConditionTxtIds.push(a),
        this.GetSimpleReportMsg(e, t));
    return (r.GetBoxNum = i?.Fb_ ?? 0), r;
  }
}
exports.LevelPlayReportModel = LevelPlayReportModel;
//# sourceMappingURL=LevelPlayReportModel.js.map
