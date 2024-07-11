"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MoonChasingBusinessModel = void 0);
const ModelBase_1 = require("../../../../../../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../../Manager/ModelManager"),
  BusinessDefine_1 = require("../BusinessDefine"),
  CharacterData_1 = require("./CharacterData"),
  DelegationData_1 = require("./DelegationData"),
  EditTeamData_1 = require("./EditTeamData");
class MoonChasingBusinessModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Qke = new Map()),
      (this.Xke = new Map()),
      (this.$ke = void 0),
      (this.Tna = []),
      (this.Lna = !1),
      (this.NSa = (e, t) => {
        var a, r;
        return e.IsOwn !== t.IsOwn
          ? e.IsOwn
            ? -1
            : 1
          : e.Level !== t.Level
            ? e.Level > t.Level
              ? -1
              : 1
            : (a = e.GetAllCharacterValue()) !== (r = t.GetAllCharacterValue())
              ? r < a
                ? -1
                : 1
              : (r = 1 === e.GetTeamDataUnLockState()) !=
                  (1 === t.GetTeamDataUnLockState())
                ? r
                  ? -1
                  : 1
                : e.Id < t.Id
                  ? -1
                  : 1;
      });
  }
  get IsInDelegate() {
    return this.Lna;
  }
  OnInit() {
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleAll();
    if (e)
      for (const a of e) {
        var t = new EditTeamData_1.EditTeamData(
          a.Id,
          a.Type,
          a.UnLockCondition,
        );
        this.Xke.set(a.Id, t);
      }
    return !0;
  }
  SetAllDelegationData(e) {
    for (const t of e) this.SetDelegationData(t);
  }
  SetDelegationData(e) {
    var t = new DelegationData_1.DelegationData(e.N6n, e.bGs, e.xGs);
    this.Qke.set(e.N6n, t);
  }
  ReplaceDelegationData(e, t) {
    e !== t.N6n &&
      (this.Qke.delete(e),
      this.SetDelegationData(t),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshDelegate));
  }
  ConditionUnlockDelegationData(e) {
    this.SetDelegationData(e);
  }
  GetDelegationData(e) {
    return this.Qke.get(e);
  }
  GetDelegationDataList() {
    var e = Array.from(this.Qke.values());
    return (
      e.sort((e, t) => {
        var a, r;
        return e.IsVisible !== t.IsVisible
          ? e.IsVisible
            ? -1
            : 1
          : ((a =
              ConfigManager_1.ConfigManager.BusinessConfig.GetDelegationConfig(
                e.Id,
              )),
            (r =
              ConfigManager_1.ConfigManager.BusinessConfig.GetDelegationConfig(
                t.Id,
              )),
            a.Star !== r.Star
              ? a.Star < r.Star
                ? -1
                : 1
              : e.BestEvaluateLevel !== t.BestEvaluateLevel
                ? e.BestEvaluateLevel < t.BestEvaluateLevel
                  ? -1
                  : 1
                : e.Id < t.Id
                  ? -1
                  : 1);
      }),
      e
    );
  }
  SetAllEditTeamData(e) {
    for (const t of e) this.SetEditTeamData(t);
  }
  SetEditTeamData(e) {
    var t = this.Xke.get(e.DGs.O6n);
    t && ((t.IsOwn = !0), t.SetCharacterDataList(e.DGs));
  }
  DeepCopyEditTeamData(e) {
    var t = new EditTeamData_1.EditTeamData(e.Id, e.Type, e.UnLockCondition);
    return t.SetCharacterDataByEditTeamData(e), t;
  }
  ConditionUnlockEditTeamData(e) {
    this.SetEditTeamData(e),
      this.Tna.push(e.DGs.O6n),
      ModelManager_1.ModelManager.MoonChasingModel.SaveRoleIdUnlockFlag(
        e.DGs.O6n,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ConditionUnlockRole,
      );
  }
  PopUnlockRoleId() {
    return this.Tna.shift();
  }
  IsUnlockRoleIdEmpty() {
    return 0 === this.Tna.length;
  }
  GetHelpEditTeamDataList(e = !1) {
    var t = [];
    for (const a of this.Xke.values())
      !this.Uaa(a.Type) || (0 !== a.Type && !e) || t.push(a);
    return t.sort(this.NSa), t;
  }
  GetUnlockHelpEditTeamDataList(e = !1) {
    var t = [];
    for (const a of this.Xke.values())
      this.Uaa(a.Type) && (0 === a.Type || e) && a.IsOwn && t.push(a);
    return t.sort(this.NSa), t;
  }
  GetPlayerRoleId() {
    for (const e of this.Xke.values())
      if (this.Uaa(e.Type) && 0 !== e.Type) return e.Id;
    return 0;
  }
  Uaa(e) {
    var t = ModelManager_1.ModelManager.PlayerInfoModel;
    return !(
      (1 === e && 1 !== t.GetPlayerGender()) ||
      (2 === e && 0 !== t.GetPlayerGender())
    );
  }
  GetOwnEditTeamDataList() {
    var e = [];
    for (const t of this.Xke.values()) this.Uaa(t.Type) && t.IsOwn && e.push(t);
    return (
      e.sort((e, t) => {
        var a, r;
        return e.Level !== t.Level
          ? e.Level > t.Level
            ? -1
            : 1
          : (a = e.GetAllCharacterValue()) !== (r = t.GetAllCharacterValue())
            ? r < a
              ? -1
              : 1
            : e.Id < t.Id
              ? -1
              : 1;
      }),
      e
    );
  }
  GetEditTeamDataById(e) {
    return this.Xke.get(e);
  }
  SetResultData(e) {
    (this.$ke = e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.SetDelegationResultData,
      );
  }
  GetResultData() {
    return this.$ke;
  }
  Yke(t) {
    var a = [];
    for (let e = 1; e <= BusinessDefine_1.CHARACTER_MAX; ++e) {
      var r = new CharacterData_1.CharacterData(e);
      r.SetUseScoreName(t), a.push(r);
    }
    return a;
  }
  GetCharacterValueListByRoleIds(e, t) {
    var a = this.Yke(t);
    for (const i of e) {
      var r = this.Xke.get(i).GetCharacterDataList();
      for (let e = 0; e < BusinessDefine_1.CHARACTER_MAX; ++e) {
        var n = a[e];
        n.SetCurrentValue(n.CurrentValue + r[e].CurrentValue);
      }
    }
    return a;
  }
  GetInvestData(e) {
    var t = this.GetResultData(),
      t = ConfigManager_1.ConfigManager.BusinessConfig.GetDelegationConfig(
        t.EntrustId,
      ),
      a = Array.from(t.IdeaSuccRatio);
    let r = 0;
    r =
      e >= a[1][0]
        ? a[1][1] / 10
        : (((a[1][1] - a[0][1]) / (a[1][0] - a[0][0])) * e + a[0][1]) / 10;
    a = ((t.IdeaSuccMul[0] / 1e3) * e) / (t.IdeaSuccMul[1] / 1e3 + e);
    return {
      SuccessProbability: Math.floor(r),
      Ratio: Math.floor(100 * (1 + a)),
    };
  }
  GetCurrentPopularityConfig() {
    var e = ModelManager_1.ModelManager.MoonChasingModel.GetPopularityValue();
    return this.GetPopularityConfigByValue(e);
  }
  GetLastPopularityConfig() {
    let e = void 0;
    var t = ConfigManager_1.ConfigManager.BusinessConfig.GetPopularityAll(),
      a = ModelManager_1.ModelManager.MoonChasingModel.GetPopularityValue();
    for (const r of t) {
      if (r.PopularityValue > a) break;
      e = r;
    }
    return e;
  }
  GetPopularityConfigByValue(e) {
    var t = ConfigManager_1.ConfigManager.BusinessConfig.GetPopularityAll();
    for (const a of t) if (a.PopularityValue > e) return a;
    return t[t.length - 1];
  }
  SetIsInDelegate(e) {
    (this.Lna = e) ||
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ConditionUnlockRole,
      );
  }
}
exports.MoonChasingBusinessModel = MoonChasingBusinessModel;
//# sourceMappingURL=MoonChasingBusinessModel.js.map
