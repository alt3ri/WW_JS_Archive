"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScratchTicketData = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  ActivityData_1 = require("../../../ActivityData"),
  ScratchTicketConditionData_1 = require("./ScratchTicketConditionData"),
  ScratchTicketRoundData_1 = require("./ScratchTicketRoundData");
class ScratchTicketData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments), (this.xol = []), (this.Pol = []), (this.Lo = void 0);
  }
  PhraseEx(t) {
    t = t.HS_;
    void 0 !== t && this.InitData(t);
  }
  NeedSelfControlFirstRedPoint() {
    return !0;
  }
  InitData(t) {
    (this.Lo =
      ConfigManager_1.ConfigManager.ActivityScratchTicketConfig.GetScratchTicketConfig(
        this.Id,
      )),
      void 0 !== this.Lo && (this.wol(t.EM_), this.Bol(t.IM_));
  }
  wol(t) {
    if (!(0 < this.xol.length)) {
      this.xol = [];
      for (const r of t) {
        var i = new ScratchTicketRoundData_1.ScratchTicketRoundData();
        i.Init(r), this.xol.push(i);
      }
      this.xol.sort((t, i) => t.Config.PreRoundId - i.Config.PreRoundId),
        this.UpdateAllRoundState();
    }
  }
  UpdateAllRoundState() {
    for (let t = 0; t < this.xol.length; t++) {
      var i,
        r = this.xol[t];
      0 === t
        ? r.UpdateRoundState(2)
        : ((i = this.xol[t - 1]), r.UpdateRoundState(i.GetRoundState()));
    }
  }
  UpdateCellReward(t, i) {
    t = this.GetRoundDataById(t);
    void 0 !== t &&
      (t.UpdateCellDataReward(i.TM_),
      t.UpdateRemainReward(i.MM_),
      this.UpdateAllRoundState());
  }
  Bol(t) {
    if (!(0 < this.Pol.length)) {
      this.Pol = [];
      for (const r of t) {
        var i = new ScratchTicketConditionData_1.ScratchTicketConditionData();
        i.Init(r), this.Pol.push(i);
      }
    }
  }
  RefreshConditionData(t) {
    for (const r of t) {
      var i = this.qol(r.s5n);
      void 0 !== i && i.RefreshCondition(r);
    }
  }
  GetExDataRedPointShowState() {
    var t = this.GetRemainCount();
    return this.HasRoundInProgress() && 0 < t;
  }
  IsInit() {
    return 0 < this.xol.length;
  }
  qol(t) {
    for (const i of this.Pol) if (i.Id === t) return i;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("ScratchTicket", 58, "ScratchTicketData无法获取条件id", [
        "id",
        t,
      ]);
  }
  GetScratchCardActivityConfig() {
    return this.Lo;
  }
  GetRoundDataById(t) {
    for (const i of this.xol) if (i.Id === t) return i;
  }
  GetFirstProgressRoundDataIndex() {
    var i = this.xol.length;
    if (i <= 0) return -1;
    for (let t = 0; t < i; t++) if (2 !== this.xol[t].GetRoundState()) return t;
    return i - 1;
  }
  GetRoundDataIndex(i) {
    for (let t = 0; t < this.xol.length; t++) if (this.xol[t] === i) return t;
    return -1;
  }
  GetFirstProgressRoundData() {
    var t = this.GetFirstProgressRoundDataIndex();
    if (!(t < 0)) return this.xol[t];
  }
  GetRoundDataList() {
    return this.xol;
  }
  GetConditionDataList() {
    return this.Pol;
  }
  IsAllRoundFinish() {
    for (const t of this.xol) if (2 !== t.GetRoundState()) return !1;
    return !0;
  }
  HasRoundInProgress() {
    for (const t of this.xol) if (1 === t.GetRoundState()) return !0;
    return !1;
  }
  GetRemainCount() {
    var t = this.Lo.ItemId;
    return ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(t);
  }
  GetCostItemId() {
    return this.Lo.ItemId;
  }
}
exports.ScratchTicketData = ScratchTicketData;
//# sourceMappingURL=ScratchTicketData.js.map
