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
      (this.Wish = 0),
      (this.BaseWish = 0),
      (this.Ratio = 0),
      (this.IsInvestSuccess = !1),
      (this.IsBest = !1),
      (this.jke = new Map()),
      (this.Rya = []),
      (this.Wke = []),
      (this.Kke = []),
      (this.LastPopularity = 0);
  }
  SetRoleResultData(t, e) {
    for (const i of e) {
      var s = [],
        s =
          (s.push(i.PGs),
          s.push(i.UGs),
          s.push(i.wGs),
          {
            SuccessResult: Protocol_1.Aki.Protocol.IRa.Proto_Normal,
            CharacterValueList: s,
          });
      this.jke.set(i.O6n, s);
    }
    for (const r of t) this.jke.get(r.O6n).SuccessResult = r.b7n;
  }
  SaveInvestProperData(t) {
    let e = 0,
      s = 0,
      i = 0;
    for (const r of t) (e += r.PGs), (s += r.UGs), (i += r.wGs);
    this.Rya.push(e), this.Rya.push(s), this.Rya.push(i);
  }
  UseInvestProperData() {
    this.Kke[0].SetCurrentValue(this.Rya[0]),
      this.Kke[1].SetCurrentValue(this.Rya[1]),
      this.Kke[2].SetCurrentValue(this.Rya[2]);
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
      );
    return 0 <
      ModelManager_1.ModelManager.MoonChasingModel.GetPopularityValue() -
        this.LastPopularity
      ? t.UpDialog
      : t.UnchangedDialog;
  }
}
exports.DelegationResultData = DelegationResultData;
//# sourceMappingURL=DelegationResultData.js.map
