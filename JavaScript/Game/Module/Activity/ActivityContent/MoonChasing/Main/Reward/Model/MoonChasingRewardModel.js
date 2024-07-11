"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MoonChasingRewardModel = void 0);
const CommonParamById_1 = require("../../../../../../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../../../../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../../../../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../../Common/Event/EventSystem"),
  LocalStorageDefine_1 = require("../../../../../../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../../Manager/ModelManager"),
  RewardTargetData_1 = require("./RewardTargetData"),
  SPECIAL_TYPE = 5;
class MoonChasingRewardModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.eOn = new Map()),
      (this.NQ = new Map()),
      (this.TargetTotalCount = 0),
      (this.TargetGetCount = 0),
      (this.SortTaskData = (e, t) =>
        e.Status === t.Status ? e.TaskId - t.TaskId : e.Status - t.Status);
  }
  tOn(e) {
    var t =
      ConfigManager_1.ConfigManager.MoonChasingRewardConfig.GetRewardTargetById(
        e.Id,
      );
    let a = this.eOn.get(t.Type);
    a || ((a = []), this.eOn.set(t.Type, a)), a.push(e);
  }
  SetAllRewardTargetData(e) {
    for (const t of e) this.SetRewardTargetData(t);
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RefreshRewardTargetData,
    );
  }
  SetRewardTargetData(e) {
    let t = this.NQ.get(e.J4n);
    t ||
      ((t = new RewardTargetData_1.RewardTargetData(e.J4n)),
      this.tOn(t),
      this.SIa(t),
      this.NQ.set(e.J4n, t)),
      (t.Current = e.iMs),
      (t.Target = e.b6n),
      (t.Status = e.w6n);
  }
  SIa(e) {
    var e = e.GetRewardList(),
      t = ConfigManager_1.ConfigManager.BusinessConfig.GetTokenItemId();
    for (const a of e) a[0].ItemId === t && (this.TargetTotalCount += a[1]);
  }
  TakenRewardTargetData(e) {
    var t = this.NQ.get(e);
    t &&
      ((t.Current = t.Target),
      (t.Status = Protocol_1.Aki.Protocol.G8s.Proto_TrackMoonTargetTaken),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.TakenRewardTargetData,
        e,
      ));
  }
  GetTaskDataById(e) {
    e = this.NQ.get(e);
    if (e) return e.ConvertToTaskData();
  }
  GetTaskDataByTabId(e) {
    e = this.eOn.get(e);
    if (!e) return [];
    var t = [];
    for (const a of e) t.push(a.ConvertToTaskData());
    return t;
  }
  GetTaskDataRedDotStateByTabId(e) {
    for (const t of this.GetTaskDataByTabId(e)) if (t.IsFinished) return !0;
    return !1;
  }
  GetAllTaskDataRedDotState(e) {
    for (const t of this.GetRewardTargetTabList())
      if (this.GetTaskDataRedDotStateByTabId(t.Id)) return !0;
    return !!e && (this.GetSpecialTaskData()?.IsFinished ?? !1);
  }
  GetSpecialTaskData() {
    return this.GetTaskDataByTabId(SPECIAL_TYPE)[0];
  }
  GetRewardTargetTabList() {
    var e = [];
    for (const t of ConfigManager_1.ConfigManager.MoonChasingRewardConfig.GetAllRewardTargetTypeList())
      t.Id !== SPECIAL_TYPE && e.push(t);
    return e;
  }
  GetShopDataList() {
    return ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(205);
  }
  GetTokenItemCount() {
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetTokenItemId();
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e);
  }
  GetShopRedDotState() {
    let e = !0;
    for (const a of this.GetShopDataList())
      if ((e && !a.IsSoldOut() && (e = !1), this.CheckShopItemCheckFlag(a)))
        return !0;
    var t = CommonParamById_1.configCommonParamById.GetIntConfig(
      "MoonChasingShopTipsValue",
    );
    return !!(t && !e && this.GetTokenItemCount() >= t);
  }
  CheckShopItemRedDotState(e) {
    return !(
      e.IsSoldOut() ||
      e.IsLocked() ||
      !e.IfCanBuy() ||
      ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
        LocalStorageDefine_1.ELocalStoragePlayerKey.MoonChasingShopItemUnlock,
        e.GetGoodsId(),
      )
    );
  }
  ReadShopItemUnlockFlag(e) {
    return (
      !!this.CheckShopItemRedDotState(e) &&
      (ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
        LocalStorageDefine_1.ELocalStoragePlayerKey.MoonChasingShopItemUnlock,
        e.GetGoodsId(),
      ),
      this.SaveShopRedDot(),
      !0)
    );
  }
  SaveShopRedDot() {
    ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
      LocalStorageDefine_1.ELocalStoragePlayerKey.MoonChasingShopItemUnlock,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.MoonChasingRefreshRewardRedDot,
      );
  }
  CheckShopItemCheckFlag(e) {
    return !(
      e.IsSoldOut() ||
      e.IsLocked() ||
      !e.IfCanBuy() ||
      ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
        LocalStorageDefine_1.ELocalStoragePlayerKey.MoonChasingShopItemChecked,
        e.GetGoodsId(),
      )
    );
  }
  ReadShopItemCheckFlag(e) {
    for (const t of e)
      this.CheckShopItemCheckFlag(t) &&
        ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
          LocalStorageDefine_1.ELocalStoragePlayerKey
            .MoonChasingShopItemChecked,
          t.GetGoodsId(),
        );
    return (
      ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
        LocalStorageDefine_1.ELocalStoragePlayerKey.MoonChasingShopItemChecked,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.MoonChasingRefreshRewardRedDot,
      ),
      !0
    );
  }
}
exports.MoonChasingRewardModel = MoonChasingRewardModel;
//# sourceMappingURL=MoonChasingRewardModel.js.map
