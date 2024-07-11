"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattlePassModel = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringBuilder_1 = require("../../../../Core/Utils/StringBuilder");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const WeaponTrialData_1 = require("../../Weapon/Data/WeaponTrialData");
const BattlePassController_1 = require("./BattlePassController");
const BattlePassRewardGridItem_1 = require("./BattlePassTabView/BattlePassRewardGridItem");
const BattlePassTaskLoopItem_1 = require("./BattlePassTabView/BattlePassTaskLoopItem");
const GIFT_ID = 301;
class BattlePassModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.IsRequiringViewData = !1),
      (this.IOi = !1),
      (this.IncreasedLevelToShow = 0),
      (this.TOi = void 0),
      (this.LOi = 0),
      (this.DOi = !0),
      (this.TVs = !1),
      (this.ROi = 0),
      (this.UOi = 0),
      (this.AOi = GIFT_ID),
      (this.POi = 0),
      (this.xOi = 0),
      (this.RewardDataList = []),
      (this.BattlePassId = 0),
      (this.UQ = 0),
      (this.StageLevelList = []),
      (this.wOi = 0),
      (this.BOi = 0),
      (this.bOi = 0),
      (this.qOi = Protocol_1.Aki.Protocol.B2s.Proto_NoPaid),
      (this.GOi = 0),
      (this.NOi = 0),
      (this.OOi = 0),
      (this.kOi = 0),
      (this.BattlePassTaskMap = new Map());
  }
  GetInTimeRange() {
    return this.IOi;
  }
  SetInTimeRange(t) {
    this.IOi = t;
  }
  GetDayEndTime() {
    return this.POi;
  }
  GetWeekEndTime() {
    return this.xOi;
  }
  GetGiftId() {
    return this.AOi;
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
    return this.DOi;
  }
  set HadEnter(t) {
    this.DOi !== t &&
      ((this.DOi = t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattlePassHadEnterUpdate,
      ));
  }
  GetWeaponDataList() {
    if (!this.TOi) {
      this.TOi = [];
      for (const e of CommonParamById_1.configCommonParamById.GetIntArrayConfig(
        "BattlePassUnlockWeapons",
      )) {
        const t = new WeaponTrialData_1.WeaponTrialData();
        t.SetTrialId(e), this.TOi.push(t);
      }
    }
    return this.TOi;
  }
  GetRewardData(t) {
    const e = this.RewardDataList[t - 1];
    if (e) return e;
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn("Temp", 11, "战令奖励数据 没有这个等级的", ["level", t]);
  }
  set PayButtonRedDotState(t) {
    this.TVs !== t &&
      ((this.TVs = t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattlePassHadEnterUpdate,
      ));
  }
  get PayButtonRedDotState() {
    return this.TVs;
  }
  GetMaxLevel() {
    return this.UQ;
  }
  IsLevelMax() {
    return this.wOi >= this.UQ;
  }
  IsWeekMax() {
    return this.WeekExp >= this.OOi;
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
    var t = this.BattlePassId;
    const e =
      ((this.RewardDataList.length = 0),
      ConfigManager_1.ConfigManager.BattlePassConfig.GetBattlePassData(t));
    var t =
      ((this.UQ = e.LevelLimit),
      ConfigManager_1.ConfigManager.BattlePassConfig.GetAllRewardData(t));
    for (const l of t)
      if (!(l.Level > this.UQ)) {
        var a;
        var r;
        var s;
        var i;
        const o = new BattlePassRewardGridItem_1.BattlePassRewardData(l.Level);
        for ([a, r] of l.FreeReward) {
          const n = new BattlePassRewardGridItem_1.BattlePassRewardItem(a, r);
          this.BattlePassLevel >= l.Level && (n.ItemType = 1),
            o.FreeRewardItem.push(n);
        }
        for ([s, i] of l.PayReward) {
          const h = new BattlePassRewardGridItem_1.BattlePassRewardItem(s, i);
          this.BattlePassLevel >= l.Level &&
            this.qOi !== Protocol_1.Aki.Protocol.B2s.Proto_NoPaid &&
            (h.ItemType = 1),
            o.PayRewardItem.push(h);
        }
        l.IsMilestone && this.StageLevelList.push(l.Level),
          this.RewardDataList.push(o);
      }
    (this.OOi = e.WeekExpLimit), (this.kOi = e.LevelUpExp), this.FOi();
  }
  FOi() {
    (this.UOi = this.kOi * (this.UQ - this.wOi) - this.LevelExp),
      (this.ROi = this.OOi - this.WeekExp);
  }
  VOi(t) {
    let e = 0;
    let a = 0;
    for (const s of t) {
      const r = this.GetTaskData(s);
      (e += r.Exp), (a += r.UpdateType === 0 ? 0 : r.Exp);
    }
    return [e, a];
  }
  TryRequestTaskList(t) {
    var [e, a] = this.VOi(t);
    var e = e - Math.max(0, a - this.ROi);
    this.IsLevelMax() || e > this.UOi
      ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "BattlePassExpMax",
        ),
        BattlePassController_1.BattlePassController.RequestBattlePassTaskTake(
          t,
        ))
      : a > this.ROi
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
    if (void 0 !== t && t.length !== 0)
      for (const e of t) this.TakeReward(e.Ikn, e.r3n, e.G3n);
  }
  UpdateRewardDataWithTargetLevel(e) {
    for (let t = 1; t <= e; t++) this.HOi(t);
  }
  HOi(t, e = !1) {
    t = this.RewardDataList[t - 1];
    if (t) {
      for (const a of t.FreeRewardItem)
        (a.ItemType !== 0 && !e) || (a.ItemType = 1);
      if (this.PayType !== Protocol_1.Aki.Protocol.B2s.Proto_NoPaid)
        for (const r of t.PayRewardItem)
          (r.ItemType !== 0 && !e) || (r.ItemType = 1);
    }
  }
  TakeReward(t, e, a) {
    e = this.GetRewardData(e);
    let r = void 0;
    (r =
      t === Protocol_1.Aki.Protocol.b2s.Proto_Free
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
    this.wOi = t;
  }
  get BattlePassLevel() {
    return this.wOi;
  }
  set WeekExp(t) {
    this.BOi = t;
  }
  get WeekExp() {
    return this.BOi;
  }
  set LevelExp(t) {
    this.bOi = t;
  }
  get LevelExp() {
    return this.bOi;
  }
  set PayType(t) {
    this.qOi = t;
  }
  get PayType() {
    return this.qOi;
  }
  GetBattlePassStartTime() {
    return this.GOi;
  }
  GetBattlePassEndTime() {
    return this.NOi;
  }
  InBattlePassInWarningTime() {
    return TimeUtil_1.TimeUtil.GetServerTime() > this.LOi;
  }
  jOi(t) {
    this.GOi = Number(MathUtils_1.MathUtils.LongToBigInt(t));
  }
  WOi(t) {
    (this.NOi = Number(MathUtils_1.MathUtils.LongToBigInt(t))),
      (this.LOi =
        this.NOi -
        3600 *
          CommonParamById_1.configCommonParamById.GetIntConfig(
            "BattlePassSettleBugTime",
          ));
  }
  SetDayEndTime(t) {
    this.POi = Number(MathUtils_1.MathUtils.LongToBigInt(t));
  }
  SetWeekEndTime(t) {
    this.xOi = Number(MathUtils_1.MathUtils.LongToBigInt(t));
  }
  GetMaxWeekExp() {
    return this.OOi;
  }
  GetMaxLevelExp() {
    return this.kOi;
  }
  GetPassPayBtnKey() {
    switch (this.qOi) {
      case Protocol_1.Aki.Protocol.B2s.Proto_NoPaid:
        return "Text_BattlePassBuyButton1_Text";
      case Protocol_1.Aki.Protocol.B2s.Proto_Paid:
        return "Text_BattlePassBuyButton2_Text";
      case Protocol_1.Aki.Protocol.B2s.Proto_Advanced:
        return "Text_BattlePassBuyButton3_Text";
      default:
        return "";
    }
  }
  OnInit() {
    return (
      (this.DOi = !0),
      (this.TVs = LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.BattlePassPayButton,
        !0,
      )),
      !0
    );
  }
  OnClear() {
    return (
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.BattlePassPayButton,
        this.TVs,
      ),
      !0
    );
  }
  GetBattlePassRemainTime() {
    return TimeUtil_1.TimeUtil.CalculateHourGapBetweenNow(this.NOi, !0);
  }
  GetBattlePassRemainTimeSecond() {
    const t =
      TimeUtil_1.TimeUtil.GetServerTimeStamp() /
      TimeUtil_1.TimeUtil.InverseMillisecond;
    return this.NOi - t;
  }
  GetTargetLevelRewardList(e, t) {
    t.length = 0;
    let a;
    const r = this.wOi;
    const s = new Map();
    for (let t = r + 1; t <= e; t++) {
      const i = this.GetRewardData(t);
      if (i)
        for (const h of this.qOi === Protocol_1.Aki.Protocol.B2s.Proto_NoPaid
          ? i.FreeRewardItem
          : i.FreeRewardItem.concat(i.PayRewardItem)) {
          const o = h.Item[0].ItemId;
          const n = h.Item[1];
          s.has(o)
            ? (s.get(o)[1] += n)
            : s.set(o, [{ IncId: 0, ItemId: o }, n]);
        }
    }
    for ([, a] of s) t.push(a);
    t.sort((t, e) => {
      const a = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
        t[0].ItemId,
      ).QualityId;
      const r = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
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
    for (const [, a] of this.BattlePassTaskMap) a.UpdateType === t && e.push(a);
    e.sort((t, e) =>
      t.TaskState === 3 || e.TaskState === 2
        ? -1
        : t.TaskState === 2 || e.TaskState === 3
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
    let t;
    let e;
    const a = [];
    for ([t, e] of this.BattlePassTaskMap) e.TaskState === 3 && a.push(t);
    return a;
  }
  CheckHasRewardWaitTake() {
    for (const t of this.RewardDataList) {
      for (const e of t.FreeRewardItem) if (e.ItemType === 1) return !0;
      for (const a of t.PayRewardItem) if (a.ItemType === 1) return !0;
    }
    return !1;
  }
  CheckHasTaskWaitTake() {
    if (this.UQ !== this.BattlePassLevel)
      for (const [, t] of this.BattlePassTaskMap)
        if (t.TaskState === 3) return !0;
    return !1;
  }
  CheckHasTaskWaitTakeWithType(t) {
    if (this.wOi !== this.UQ)
      for (const [, e] of this.BattlePassTaskMap)
        if (t === e.UpdateType && e.TaskState === 3) return !0;
    return !1;
  }
  AddTaskDataFromProtocol(t) {
    let e;
    let a;
    const r =
      CommonParamById_1.configCommonParamById.GetIntConfig("BattlePassExp");
    const s = this.BattlePassTaskMap;
    const i = new BattlePassTaskLoopItem_1.BattlePassTaskData();
    const o =
      ((i.TaskId = t.Ekn),
      ConfigManager_1.ConfigManager.BattlePassConfig.GetBattlePassTask(t.Ekn));
    for ([e, a] of o.TaskReward) {
      const n = [{ IncId: 0, ItemId: e }, a];
      e === r && (i.Exp += a), i.RewardItemList.push(n);
    }
    (i.CurrentProgress = t.k0s ?? 0),
      (i.TargetProgress = t.s3n ?? 0),
      (i.UpdateType = o.UpdateType),
      t.$0s
        ? t.H0s
          ? (i.TaskState = 2)
          : (i.TaskState = 3)
        : (i.TaskState = 1),
      s.set(t.Ekn, i);
  }
  SetDataFromBattlePassResponse(t) {
    const e = t.wfs;
    (this.IOi = e.Lfs ?? !1),
      this.IOi &&
        ((this.HadEnter = e.Ufs),
        (this.BattlePassId = e.Ekn),
        (this.PayType = e.Dfs),
        (this.BattlePassLevel = e.r3n),
        (this.LevelExp = e.k3n),
        (this.WeekExp = e.Rfs),
        this.WOi(e.jCs),
        this.jOi(e.HCs),
        this.InitBattlePassConfigData(),
        this.UpdateBattlePassRewardDataFromResponse(t.wfs.Afs ?? void 0),
        e.Ufs || (this.PayButtonRedDotState = !0),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ReceiveBattlePassDataEvent,
        ));
  }
  UpdateTaskDataFromBattlePassTaskTakeResponse(t) {
    const e = this.BattlePassTaskMap;
    for (const r of t) {
      const a = e.get(r);
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
      this.FOi(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ReceiveBattlePassDataEvent,
      );
  }
  UpdateRewardDataFromBattlePassTakeAllRewardResponse(t) {
    for (const e of t.Afs) this.TakeReward(e.Ikn, e.r3n, e.G3n);
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.ReceiveBattlePassDataEvent,
    );
  }
  UpdateRewardDataFormFreeToPay() {
    for (let t = 1; t <= this.wOi; t++) {
      const e = this.GetRewardData(t);
      if (e) for (const a of e.PayRewardItem) a.ItemType = 1;
    }
  }
  GetBattlePassIconPath() {
    const t = ConfigManager_1.ConfigManager.BattlePassConfig.GetBattlePassData(
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
    if (t === 0)
      for (const a of this.RewardDataList) a.IsThisType(2) && (t = a.Level);
    return (t = t === 0 ? 1 : t);
  }
  GetHighBattlePassOriginalPrice() {
    var t = this.GetPrimaryBattlePassGoodsId();
    var e = CommonParamById_1.configCommonParamById.GetIntConfig(
      "AdvancedWithoutActive",
    );
    var t =
      ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopDirectGoods(
        t,
      ).PayId;
    var t = ConfigManager_1.ConfigManager.PayItemConfig.GetPayConf(t).Amount;
    var e =
      ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopDirectGoods(
        e,
      ).PayId;
    const a = ConfigManager_1.ConfigManager.PayItemConfig.GetPayConf(e).Amount;
    const r = new StringBuilder_1.StringBuilder();
    var e = ConfigManager_1.ConfigManager.PayItemConfig.GetPayShow(e);
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
            Protocol_1.Aki.Protocol.B2s.Proto_NoPaid
            ? 151
            : ModelManager_1.ModelManager.BattlePassModel.InBattlePassInWarningTime()
              ? 152
              : 153
          : ModelManager_1.ModelManager.BattlePassModel.PayType ===
              Protocol_1.Aki.Protocol.B2s.Proto_Advanced
            ? 155
            : ModelManager_1.ModelManager.BattlePassModel.PayType ===
                Protocol_1.Aki.Protocol.B2s.Proto_Paid
              ? 154
              : ModelManager_1.ModelManager.BattlePassModel.InBattlePassInWarningTime()
                ? 159
                : 156
        : 150
      : 149;
  }
}
exports.BattlePassModel = BattlePassModel;
// # sourceMappingURL=BattlePassModel.js.map
