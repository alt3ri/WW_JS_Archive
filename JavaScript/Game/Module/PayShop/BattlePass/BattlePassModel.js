"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattlePassModel = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringBuilder_1 = require("../../../../Core/Utils/StringBuilder"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  WeaponTrialData_1 = require("../../Weapon/Data/WeaponTrialData"),
  BattlePassController_1 = require("./BattlePassController"),
  BattlePassRewardGridItem_1 = require("./BattlePassTabView/BattlePassRewardGridItem"),
  BattlePassTaskLoopItem_1 = require("./BattlePassTabView/BattlePassTaskLoopItem"),
  GIFT_ID = 301;
class BattlePassModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.IsRequiringViewData = !1),
      (this.Lki = !1),
      (this.IncreasedLevelToShow = 0),
      (this.Dki = void 0),
      (this.Rki = 0),
      (this.Uki = !0),
      (this.MZs = void 0),
      (this.Aki = 0),
      (this.Pki = 0),
      (this.xki = GIFT_ID),
      (this.wki = 0),
      (this.Bki = 0),
      (this.RewardDataList = []),
      (this.BattlePassId = 0),
      (this.UQ = 0),
      (this.StageLevelList = []),
      (this.bki = 0),
      (this.qki = 0),
      (this.Gki = 0),
      (this.Nki = Protocol_1.Aki.Protocol.yNs.Proto_NoPaid),
      (this.Oki = 0),
      (this.kki = 0),
      (this.Fki = 0),
      (this.Vki = 0),
      (this.BattlePassTaskMap = new Map());
  }
  GetInTimeRange() {
    return this.Lki;
  }
  SetInTimeRange(t) {
    this.Lki = t;
  }
  GetDayEndTime() {
    return this.wki;
  }
  GetWeekEndTime() {
    return this.Bki;
  }
  GetGiftId() {
    return this.xki;
  }
  get PrimaryItemId() {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "PrimaryGiftItem",
    )[0];
  }
  get AdvanceItemId() {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "AdvancedGiftItem",
    )[0];
  }
  get HadEnter() {
    return this.Uki;
  }
  set HadEnter(t) {
    this.Uki !== t &&
      ((this.Uki = t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattlePassHadEnterUpdate,
      ));
  }
  GetWeaponDataList() {
    if (!this.Dki) {
      this.Dki = [];
      for (const e of CommonParamById_1.configCommonParamById.GetIntArrayConfig(
        "BattlePassUnlockWeapons",
      )) {
        var t = new WeaponTrialData_1.WeaponTrialData();
        t.SetTrialId(e), this.Dki.push(t);
      }
    }
    return this.Dki;
  }
  GetRewardData(t) {
    var e = this.RewardDataList[t - 1];
    if (e) return e;
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn("Temp", 11, "战令奖励数据 没有这个等级的", ["level", t]);
  }
  set PayButtonRedDotState(t) {
    this.MZs !== t &&
      ((this.MZs = t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattlePassHadEnterUpdate,
      ),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.BattlePassPayButton,
        this.MZs,
      ));
  }
  get PayButtonRedDotState() {
    return (
      void 0 === this.MZs &&
        (this.MZs =
          LocalStorage_1.LocalStorage.GetPlayer(
            LocalStorageDefine_1.ELocalStoragePlayerKey.BattlePassPayButton,
            !0,
          ) ?? !0),
      this.MZs
    );
  }
  GetMaxLevel() {
    return this.UQ;
  }
  IsLevelMax() {
    return this.bki >= this.UQ;
  }
  IsWeekMax() {
    return this.WeekExp >= this.Fki;
  }
  GetNextStageLevel(t) {
    if (void 0 === t) return 0;
    let e = 0;
    for (const a of this.StageLevelList)
      if (!(a <= t)) {
        e = a;
        break;
      }
    return e;
  }
  InitBattlePassConfigData() {
    var t = this.BattlePassId,
      e =
        ((this.RewardDataList.length = 0),
        ConfigManager_1.ConfigManager.BattlePassConfig.GetBattlePassData(t)),
      t =
        ((this.UQ = e.LevelLimit),
        ConfigManager_1.ConfigManager.BattlePassConfig.GetAllRewardData(t));
    for (const l of t)
      if (!(l.Level > this.UQ)) {
        var a,
          r,
          s,
          i,
          o = new BattlePassRewardGridItem_1.BattlePassRewardData(l.Level);
        for ([a, r] of l.FreeReward) {
          var n = new BattlePassRewardGridItem_1.BattlePassRewardItem(a, r);
          this.BattlePassLevel >= l.Level && (n.ItemType = 1),
            o.FreeRewardItem.push(n);
        }
        for ([s, i] of l.PayReward) {
          var h = new BattlePassRewardGridItem_1.BattlePassRewardItem(s, i);
          this.BattlePassLevel >= l.Level &&
            this.Nki !== Protocol_1.Aki.Protocol.yNs.Proto_NoPaid &&
            (h.ItemType = 1),
            o.PayRewardItem.push(h);
        }
        l.IsMilestone && this.StageLevelList.push(l.Level),
          this.RewardDataList.push(o);
      }
    (this.Fki = e.WeekExpLimit), (this.Vki = e.LevelUpExp), this.Hki();
  }
  Hki() {
    (this.Pki = this.Vki * (this.UQ - this.bki) - this.LevelExp),
      (this.Aki = this.Fki - this.WeekExp);
  }
  jki(t) {
    let e = 0,
      a = 0;
    for (const s of t) {
      var r = this.GetTaskData(s);
      (e += r.Exp), (a += 0 === r.UpdateType ? 0 : r.Exp);
    }
    return [e, a];
  }
  TryRequestTaskList(t) {
    var [e, a] = this.jki(t),
      e = e - Math.max(0, a - this.Aki);
    this.IsLevelMax() || e > this.Pki
      ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "BattlePassExpMax",
        ),
        BattlePassController_1.BattlePassController.RequestBattlePassTaskTake(
          t,
        ))
      : a > this.Aki
        ? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
            this.IsWeekMax() ? 91 : 178,
          )).FunctionMap.set(2, () => {
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "BattlePassWeeklyExpMax",
            ),
              BattlePassController_1.BattlePassController.RequestBattlePassTaskTake(
                t,
              );
          }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            e,
          ))
        : BattlePassController_1.BattlePassController.RequestBattlePassTaskTake(
            t,
          );
  }
  UpdateBattlePassRewardDataFromResponse(t) {
    if (void 0 !== t && 0 !== t.length)
      for (const e of t) this.TakeReward(e.Z4n, e.P6n, e.f8n);
  }
  UpdateRewardDataWithTargetLevel(e) {
    for (let t = 1; t <= e; t++) this.Wki(t);
  }
  Wki(t, e = !1) {
    t = this.RewardDataList[t - 1];
    if (t) {
      for (const a of t.FreeRewardItem)
        (0 !== a.ItemType && !e) || (a.ItemType = 1);
      if (this.PayType !== Protocol_1.Aki.Protocol.yNs.Proto_NoPaid)
        for (const r of t.PayRewardItem)
          (0 !== r.ItemType && !e) || (r.ItemType = 1);
    }
  }
  TakeReward(t, e, a) {
    e = this.GetRewardData(e);
    let r = void 0;
    (r =
      t === Protocol_1.Aki.Protocol.ENs.Proto_Free
        ? e.GetFreeRewardItem(a)
        : e.GetPayRewardItem(a)).ItemType = 2;
  }
  OnResponseTakeReward(t, e, a, r) {
    this.TakeReward(t, e, a),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.GetBattlePassRewardEvent,
        r,
      );
  }
  set BattlePassLevel(t) {
    this.bki = t;
  }
  get BattlePassLevel() {
    return this.bki;
  }
  set WeekExp(t) {
    this.qki = t;
  }
  get WeekExp() {
    return this.qki;
  }
  set LevelExp(t) {
    this.Gki = t;
  }
  get LevelExp() {
    return this.Gki;
  }
  set PayType(t) {
    this.Nki = t;
  }
  get PayType() {
    return this.Nki;
  }
  GetBattlePassStartTime() {
    return this.Oki;
  }
  GetBattlePassEndTime() {
    return this.kki;
  }
  InBattlePassInWarningTime() {
    return TimeUtil_1.TimeUtil.GetServerTime() > this.Rki;
  }
  Kki(t) {
    this.Oki = Number(MathUtils_1.MathUtils.LongToBigInt(t));
  }
  Qki(t) {
    (this.kki = Number(MathUtils_1.MathUtils.LongToBigInt(t))),
      (this.Rki =
        this.kki -
        3600 *
          CommonParamById_1.configCommonParamById.GetIntConfig(
            "BattlePassSettleBugTime",
          ));
  }
  SetDayEndTime(t) {
    this.wki = Number(MathUtils_1.MathUtils.LongToBigInt(t));
  }
  SetWeekEndTime(t) {
    this.Bki = Number(MathUtils_1.MathUtils.LongToBigInt(t));
  }
  GetMaxWeekExp() {
    return this.Fki;
  }
  GetMaxLevelExp() {
    return this.Vki;
  }
  GetPassPayBtnKey() {
    switch (this.Nki) {
      case Protocol_1.Aki.Protocol.yNs.Proto_NoPaid:
        return "Text_BattlePassBuyButton1_Text";
      case Protocol_1.Aki.Protocol.yNs.Proto_Paid:
        return "Text_BattlePassBuyButton2_Text";
      case Protocol_1.Aki.Protocol.yNs.Proto_Advanced:
        return "Text_BattlePassBuyButton3_Text";
      default:
        return "";
    }
  }
  OnInit() {
    return (this.Uki = !0);
  }
  GetBattlePassRemainTime() {
    return TimeUtil_1.TimeUtil.CalculateHourGapBetweenNow(this.kki, !0);
  }
  GetBattlePassRemainTimeSecond() {
    var t =
      TimeUtil_1.TimeUtil.GetServerTimeStamp() /
      TimeUtil_1.TimeUtil.InverseMillisecond;
    return this.kki - t;
  }
  GetTargetLevelRewardList(e, t) {
    t.length = 0;
    var a,
      r = this.bki,
      s = new Map();
    for (let t = r + 1; t <= e; t++) {
      var i = this.GetRewardData(t);
      if (i)
        for (const h of this.Nki === Protocol_1.Aki.Protocol.yNs.Proto_NoPaid
          ? i.FreeRewardItem
          : i.FreeRewardItem.concat(i.PayRewardItem)) {
          var o = h.Item[0].ItemId,
            n = h.Item[1];
          s.has(o)
            ? (s.get(o)[1] += n)
            : s.set(o, [{ IncId: 0, ItemId: o }, n]);
        }
    }
    for ([, a] of s) t.push(a);
    t.sort((t, e) => {
      var a = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
          t[0].ItemId,
        ).QualityId,
        r = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
          e[0].ItemId,
        ).QualityId;
      return a === r ? t[1] - e[1] : r - a;
    });
  }
  GetTaskData(t) {
    return this.BattlePassTaskMap.get(t);
  }
  GetTaskList(t, e) {
    e.length = 0;
    for (var [, a] of this.BattlePassTaskMap) a.UpdateType === t && e.push(a);
    e.sort((t, e) =>
      3 === t.TaskState || 2 === e.TaskState
        ? -1
        : 2 === t.TaskState || 3 === e.TaskState
          ? 1
          : 0,
    );
  }
  GetTaskTypeList() {
    return [1, 2, 0];
  }
  GetPrimaryBattlePassGoodsId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "PrimaryBattlePassShopId",
    );
  }
  GetHighBattlePassGoodsId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "AdvancedWithActive",
    );
  }
  GetSupplyBattlePassGoodsId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "AdvancedWithoutActive",
    );
  }
  GetAllFinishedTask() {
    var t,
      e,
      a = [];
    for ([t, e] of this.BattlePassTaskMap) 3 === e.TaskState && a.push(t);
    return a;
  }
  CheckHasRewardWaitTake() {
    for (const t of this.RewardDataList) {
      for (const e of t.FreeRewardItem) if (1 === e.ItemType) return !0;
      for (const a of t.PayRewardItem) if (1 === a.ItemType) return !0;
    }
    return !1;
  }
  CheckHasTaskWaitTake() {
    if (this.UQ !== this.BattlePassLevel)
      for (var [, t] of this.BattlePassTaskMap)
        if (3 === t.TaskState) return !0;
    return !1;
  }
  CheckHasTaskWaitTakeWithType(t) {
    if (this.bki !== this.UQ)
      for (var [, e] of this.BattlePassTaskMap)
        if (t === e.UpdateType && 3 === e.TaskState) return !0;
    return !1;
  }
  AddTaskDataFromProtocol(t) {
    var e,
      a,
      r = CommonParamById_1.configCommonParamById.GetIntConfig("BattlePassExp"),
      s = this.BattlePassTaskMap,
      i = new BattlePassTaskLoopItem_1.BattlePassTaskData(),
      o =
        ((i.TaskId = t.J4n),
        ConfigManager_1.ConfigManager.BattlePassConfig.GetBattlePassTask(
          t.J4n,
        ));
    for ([e, a] of o.TaskReward) {
      var n = [{ IncId: 0, ItemId: e }, a];
      e === r && (i.Exp += a), i.RewardItemList.push(n);
    }
    (i.CurrentProgress = t.iMs ?? 0),
      (i.TargetProgress = t.b6n ?? 0),
      (i.UpdateType = o.UpdateType),
      t.sMs
        ? t.aMs
          ? (i.TaskState = 2)
          : (i.TaskState = 3)
        : (i.TaskState = 1),
      s.set(t.J4n, i);
  }
  SetDataFromBattlePassResponse(t) {
    var e = t.XSs;
    (this.Lki = e.$Ss ?? !1),
      this.Lki &&
        ((this.HadEnter = e.QSs),
        (this.BattlePassId = e.J4n),
        (this.PayType = e.jSs),
        (this.BattlePassLevel = e.P6n),
        (this.LevelExp = e.M8n),
        (this.WeekExp = e.HSs),
        this.Qki(e.sps),
        this.Kki(e.nps),
        this.InitBattlePassConfigData(),
        this.UpdateBattlePassRewardDataFromResponse(t.XSs.WSs ?? void 0),
        e.QSs || (this.PayButtonRedDotState = !0),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ReceiveBattlePassDataEvent,
        ));
  }
  UpdateTaskDataFromBattlePassTaskTakeResponse(t) {
    var e = this.BattlePassTaskMap;
    for (const r of t) {
      var a = e.get(r);
      a && (a.TaskState = 2);
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.UpdateBattlePassTaskEvent,
    );
  }
  UpdateExpDataFromBattlePassExpUpdateNotify(t, e, a) {
    this.UpdateRewardDataWithTargetLevel(t),
      t > this.BattlePassLevel &&
        ((this.IncreasedLevelToShow = t - this.BattlePassLevel),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnBattlePassLevelUpEvent,
        )),
      (this.BattlePassLevel = t),
      (this.LevelExp = e),
      (this.WeekExp = a),
      this.Hki(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ReceiveBattlePassDataEvent,
      );
  }
  UpdateRewardDataFromBattlePassTakeAllRewardResponse(t) {
    for (const e of t.WSs) this.TakeReward(e.Z4n, e.P6n, e.f8n);
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.ReceiveBattlePassDataEvent,
    );
  }
  UpdateRewardDataFormFreeToPay() {
    for (let t = 1; t <= this.bki; t++) {
      var e = this.GetRewardData(t);
      if (e) for (const a of e.PayRewardItem) a.ItemType = 1;
    }
  }
  GetBattlePassIconPath() {
    var t = ConfigManager_1.ConfigManager.BattlePassConfig.GetBattlePassData(
      this.BattlePassId,
    );
    if (t) return t.ExclusiveRewardPath;
  }
  GetCurrentShowLevel() {
    let t = 0;
    for (const e of this.RewardDataList)
      if (e.IsThisType(1)) {
        t = e.Level;
        break;
      }
    if (0 === t)
      for (const a of this.RewardDataList) a.IsThisType(2) && (t = a.Level);
    return (t = 0 === t ? 1 : t);
  }
  GetHighBattlePassOriginalPrice() {
    var t = this.GetPrimaryBattlePassGoodsId(),
      e = CommonParamById_1.configCommonParamById.GetIntConfig(
        "AdvancedWithoutActive",
      ),
      t =
        ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopDirectGoods(
          t,
        ).PayId,
      t = ConfigManager_1.ConfigManager.PayItemConfig.GetPayConf(t).Amount,
      e =
        ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopDirectGoods(
          e,
        ).PayId,
      a = ConfigManager_1.ConfigManager.PayItemConfig.GetPayConf(e).Amount,
      r = new StringBuilder_1.StringBuilder(),
      e = ConfigManager_1.ConfigManager.PayItemConfig.GetPayShow(e);
    return (
      r.Append(
        ConfigManager_1.ConfigManager.PayItemConfig.GetPayShowCurrency(),
      ),
      r.Append(t + a),
      e
    );
  }
  GetBattlePassItemConfirmId(t) {
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(10040)
      ? this.GetInTimeRange()
        ? t === this.PrimaryItemId
          ? ModelManager_1.ModelManager.BattlePassModel.PayType !==
            Protocol_1.Aki.Protocol.yNs.Proto_NoPaid
            ? 151
            : ModelManager_1.ModelManager.BattlePassModel.InBattlePassInWarningTime()
              ? 152
              : 153
          : ModelManager_1.ModelManager.BattlePassModel.PayType ===
              Protocol_1.Aki.Protocol.yNs.Proto_Advanced
            ? 155
            : ModelManager_1.ModelManager.BattlePassModel.PayType ===
                Protocol_1.Aki.Protocol.yNs.Proto_Paid
              ? 154
              : ModelManager_1.ModelManager.BattlePassModel.InBattlePassInWarningTime()
                ? 159
                : 156
        : 150
      : 149;
  }
}
exports.BattlePassModel = BattlePassModel;
//# sourceMappingURL=BattlePassModel.js.map
