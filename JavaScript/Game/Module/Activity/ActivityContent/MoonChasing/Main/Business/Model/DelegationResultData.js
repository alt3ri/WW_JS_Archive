"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DelegationResultData = void 0);
const Protocol_1 = require("../../../../../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../../Manager/ModelManager");
class DelegationResultData {
  constructor(t) {
    (this.EntrustId = t),
      (this.IsTriggerEvent = !1),
      (this.TriggerEventRoleId = 0),
      (this.Hke = 0),
      (this.Gold = 0),
      (this.BaseGold = 0),
      (this.CostGold = 0),
      (this.OriginGold = 0),
      (this.Wish = 0),
      (this.BaseWish = 0),
      (this.Ratio = 0),
      (this.IsInvestSuccess = !1),
      (this.IsBest = !1),
      (this.jke = new Map()),
      (this.tDa = []),
      (this.Wke = []),
      (this.Kke = []),
      (this.LastPopularity = 0);
  }
  SetRoleResultData(t, e) {
    for (const i of e) {
      var s = [],
        s =
          (s.push(i.GGs),
          s.push(i.OGs),
          s.push(i.kGs),
          {
            SuccessResult: Protocol_1.Aki.Protocol.moh.Proto_Normal,
            CharacterValueList: s,
          });
      this.jke.set(i.Q6n, s);
    }
    for (const a of t) this.jke.get(a.Q6n).SuccessResult = a.j7n;
  }
  SaveInvestProperData(t) {
    let e = 0,
      s = 0,
      i = 0;
    for (const a of t) (e += a.GGs), (s += a.OGs), (i += a.kGs);
    this.tDa.push(e), this.tDa.push(s), this.tDa.push(i);
  }
  UseInvestProperData() {
    this.Kke[0].SetCurrentValue(this.tDa[0]),
      this.Kke[1].SetCurrentValue(this.tDa[1]),
      this.Kke[2].SetCurrentValue(this.tDa[2]);
  }
  SetRoleIdList(t) {
    this.Wke = t;
  }
  GetRoleIdList() {
    return this.Wke;
  }
  GetRoleResultDataById(t) {
    return this.jke.get(t);
  }
  SetResultCharacterList(t) {
    this.Kke = t;
  }
  GetResultCharacterList() {
    return this.Kke;
  }
  SetEvaluationLevel(t) {
    this.Hke > t || (this.Hke = t);
  }
  get EvaluationLevel() {
    return this.Hke;
  }
  GetRoleDialog() {
    var t =
        ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustFinishDialogByIdAndLevel(
          this.EntrustId,
          this.EvaluationLevel,
        ),
      e =
        ModelManager_1.ModelManager.MoonChasingModel.GetPopularityValue() -
        this.LastPopularity,
      s = 1 === ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    return 0 < e
      ? s
        ? t.UpDialog
        : t.UpDialogGirl
      : s
        ? t.UnchangedDialog
        : t.UnchangedDialogGirl;
  }
}
exports.DelegationResultData = DelegationResultData;
//# sourceMappingURL=DelegationResultData.js.map
