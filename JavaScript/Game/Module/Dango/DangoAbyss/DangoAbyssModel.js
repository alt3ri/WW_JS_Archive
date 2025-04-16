"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssModel = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  AttributeModel_1 = require("../../Attribute/AttributeModel"),
  ItemDefine_1 = require("../../Item/ItemDefine"),
  AttrListScrollData_1 = require("../../RoleUi/View/ViewData/AttrListScrollData"),
  DangoAbyssData_1 = require("./DangoAbyssData"),
  DangoAbyssDefine_1 = require("./DangoAbyssDefine");
class DangoAbyssModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.LeaveFromAbyssWorld = !1),
      (this.wfc = !1),
      (this.CurrentSelectEntranceId = 0),
      (this.CurrentSelectChallengeId = 0),
      (this.A_r = 0),
      (this.Rfc = 0),
      (this.Afc = 0),
      (this.Pfc = 0),
      (this.xfc = 0),
      (this.BFe = 1),
      (this.xVc = 0),
      (this.Ufc = void 0),
      (this.Dfc = void 0),
      (this.Bfc = void 0),
      (this.FormationIndex2DangoIdMapCache = new Map()),
      (this.ou1 = void 0),
      (this.xte = 0),
      (this.HFe = 0),
      (this.tRc = new Map()),
      (this.mL1 = !1);
  }
  OnLeaveLevel() {
    return !(this.mL1 = !1);
  }
  OnAbyssChallengeResultNotify(e) {
    (this.Bfc = new DangoAbyssData_1.AbyssChallengeResultData()),
      this.Bfc.Phrase(e.j7n),
      (this.mL1 = !0);
  }
  GetChallengeRankInfo() {
    return (
      this.Ufc || (this.Ufc = new DangoAbyssData_1.AbyssRankChallengeInfo()),
      this.Ufc
    );
  }
  OnAnonymousNameStateChange(e, t) {
    this.GetChallengeRankInfo().SetIsOpenAnonymousName(e, t);
  }
  GetChallengeAnonymousNameState(e) {
    return this.GetChallengeRankInfo().GetAnonymousNameMode(e);
  }
  CheckPayShopRedDot() {
    for (const e of this.GetPayShopGoods()) if (e.GetIfNeedRemind()) return !0;
    return !1;
  }
  GetPayShopGoods() {
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetOpenShopId();
    return ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(e);
  }
  OnAbyssChallegenRankUpdate(e) {
    this.GetChallengeRankInfo().OnChallengeRankInfoUpdate(e);
  }
  OnAbyssChallengeSelfRankUpdate(e) {
    this.GetChallengeRankInfo().OnSelfRankInfoUpdate(e);
  }
  OnAbyssLikeNotify(e) {
    var t;
    this.Bfc
      ? (t = this.Bfc.GetPlayerInfoByPlayerId(e.W5n))
        ? t.SetLikeCount(e.Knc)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Activity", 27, "没有找到玩家数据")
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Activity", 27, "没有结算数据但是收到了喜欢通知");
  }
  GetPlayerLikeCount(e) {
    return this.Bfc && (e = this.Bfc.GetPlayerInfoByPlayerId(e))
      ? e.GetLikeCount()
      : 0;
  }
  OnAbyssFormationRoleSelectUpdateNotify(e) {
    (this.Dfc = new DangoAbyssData_1.AbyssFormationInfo()), this.Dfc.Phrase(e);
  }
  GetCurrentOpenAbyssActivityData() {
    for (const e of ModelManager_1.ModelManager.ActivityModel.GetAllActivityMap())
      if (e[1].Type === Protocol_1.Aki.Protocol.uks.Proto_Abyss) return e[1];
  }
  GetDangoAbyssRoleData(e) {
    var t = this.GetCurrentOpenAbyssActivityData();
    if (t) return t.GetRoleDataById(e);
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启");
  }
  GetAbyssUnLockState(e) {
    var t = this.GetCurrentOpenAbyssActivityData();
    return t
      ? t.GetAbyssChallengeDataById(e).GetIfUnlock()
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启"),
        !1);
  }
  GetAbyssMaxProgress(e) {
    var t = this.GetCurrentOpenAbyssActivityData();
    return t
      ? t.GetAbyssChallengeDataById(e).GetMaxProgress()
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启"),
        0);
  }
  GetAbyssTimeLimitState(e) {
    var t = this.GetCurrentOpenAbyssActivityData();
    return t
      ? t.GetAbyssChallengeDataById(e).GetOverUnlockTime()
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启"),
        !1);
  }
  GetAbyssConditionFinishState(e) {
    var t = this.GetCurrentOpenAbyssActivityData();
    return t
      ? t.GetAbyssChallengeDataById(e).GetConditionFinishState()
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启"),
        !1);
  }
  GetAbyssUnlockTimeText(e) {
    var t = this.GetCurrentOpenAbyssActivityData();
    return t
      ? t.GetAbyssChallengeDataById(e).GetLeftTimeText()
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启"),
        "");
  }
  GetAbyssPreChallengeFinishState(e) {
    var t = this.GetCurrentOpenAbyssActivityData();
    return t
      ? t.GetPreChallengeFinishState(e)
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启"),
        !1);
  }
  CheckIsSelf(e) {
    return ModelManager_1.ModelManager.PlayerInfoModel.GetId() === e;
  }
  CheckInAbyss() {
    return (
      33 ===
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
          ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
        )?.InstSubType &&
      ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
    );
  }
  CheckInAbyssEditFormationState() {
    var e =
      ModelManager_1.ModelManager.EditBattleTeamModel.GetCurrentDungeonConfig;
    return !!e && 33 === e.InstSubType;
  }
  CheckAllDangoReady() {
    var t = ModelManager_1.ModelManager.EditBattleTeamModel.GetAllRoleSlotData,
      r = t.length;
    for (let e = 0; e < r; e++) {
      var a = t[e].GetRoleData?.PlayerId;
      if (
        0 !== a &&
        void 0 !== a &&
        a === ModelManager_1.ModelManager.PlayerInfoModel.GetId()
      ) {
        var n = t[e].GetRoleConfigId,
          a = this.GetRoleOwnerData(a, n);
        if (!(a && 0 < a.DangoId)) return !1;
      }
    }
    return !0;
  }
  CheckIsInMatch() {
    return (
      0 !==
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState()
    );
  }
  PhraseRoomInfo(e) {
    (this.A_r = e.rsc),
      (this.Rfc = e.osc),
      (this.Pfc = e.ssc),
      (this.Afc = e.asc),
      (this.xfc = e.Vy_),
      (this.xVc = e.ENc),
      (this.BFe = e.e8n),
      (this.ou1 = e.COc),
      (this.xte = e.tBs),
      (this.HFe = e.ec1);
  }
  GetRoleSelectDangoMap() {
    return this.ou1 ?? {};
  }
  GetAbyssLayer() {
    return this.A_r;
  }
  GetMaxLayer() {
    return this.Rfc;
  }
  GetCurrentAbyssCompletePercentage() {
    return this.A_r / this.Rfc;
  }
  GetCurrentRoomId() {
    return this.xfc;
  }
  GetGainBoxCount() {
    return this.Afc;
  }
  GetMaxBoxCount() {
    return this.Pfc;
  }
  GetInAbyssFlow() {
    return this.wfc;
  }
  SetInAbyssFlow(e) {
    this.wfc = e;
  }
  GetPluginShowAttributeList(e) {
    const t = new Array();
    e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoItemById(e);
    return e
      ? (e.Prop.forEach((e) => {
          t.push(
            new AttrListScrollData_1.AttrListScrollData(
              e.Id,
              e.Value,
              0,
              0,
              e.IsRatio,
              0,
            ),
          );
        }),
        t)
      : [];
  }
  GetPluginShowTagDataList(e) {
    var t,
      r,
      a = new Array(),
      e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoItemById(e);
    if (!e) return [];
    for ([t, r] of e.AddTag) {
      var n = new DangoAbyssDefine_1.DangoAbyssTagData();
      (n.TagId = t), (n.Value = r), a.push(n);
    }
    return a;
  }
  GetDangoItemConfig(e) {
    return ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e);
  }
  GetDangoItemBelongId(e) {
    return (
      this.GetCurrentOpenAbyssActivityData()
        ?.GetPluginItemInfoById(e)
        ?.GetBelongRole() ?? 0
    );
  }
  GetDangoBelongRoleId(e, t) {
    var r, a;
    let n = 0;
    for ([r, a] of this.iRc(e))
      if (a.DangoId === t) {
        n = r;
        break;
      }
    return n;
  }
  GetDangoItemLockState(e) {
    var t = this.GetCurrentOpenAbyssActivityData();
    return !!t && (t.GetPluginItemInfoById(e)?.GetIsLock() ?? !1);
  }
  iRc(e) {
    return this.tRc.has(e) || this.tRc.set(e, new Map()), this.tRc.get(e);
  }
  GetPlayerRoleCfgOwnerData(e, t) {
    if (0 !== t)
      return (
        this.tRc.has(e) || this.tRc.set(e, new Map()),
        (e = this.tRc.get(e)).has(t) ||
          e.set(t, new DangoAbyssData_1.AbyssDangoOwnerData()),
        e.get(t)
      );
  }
  rRc(e, t) {
    var r = this.GetRoleOwnerData(e, t);
    r && ((r.PlayerId = e), (r.RoleCfgId = t), (r.DangoId = 0));
  }
  GetRoleOwnerData(e, t) {
    return this.GetPlayerRoleCfgOwnerData(e, t);
  }
  RefreshOwnerListByMatchTeamInfo(e) {
    if (e)
      for (const n of e.TRs) {
        var t = n.W5n;
        for (const o of n.J6n) {
          this.rRc(t, o.Q6n);
          var r = this.GetRoleOwnerData(t, o.Q6n),
            a = o.Q6n;
          r &&
            ((r.PlayerId = t),
            (r.RoleCfgId = a),
            (r.DangoId = o.uAc?.mAc?.J6n?.s5n ?? 0),
            (r.DangoLevel = o.uAc?.mAc?.J6n?.F6n ?? 0),
            (r.DangoEquipIds = o.uAc?.mAc?.J6n?.Xnc ?? []));
        }
      }
  }
  CacheDangoSelect(e, t, r) {
    var a = new Map(),
      n = this.iRc(e);
    let o = 0;
    if (0 !== r) {
      var i,
        s,
        g = this.GetRoleOwnerData(e, t)?.DangoId;
      for ([i, s] of n)
        if (s.DangoId === r && s.RoleCfgId !== t) {
          (s.DangoId = 0), (s.PlayerId = e), (o = i);
          break;
        }
      const l = this.GetPlayerRoleCfgOwnerData(e, o);
      l && (l.DangoId = g ?? 0);
    }
    const l = this.GetPlayerRoleCfgOwnerData(e, t);
    l && ((l.DangoId = r), (l.PlayerId = e));
    n = [];
    return (
      n.push(t),
      0 !== o && n.push(o),
      a.set(e, [t, o]),
      this.RefreshOwnDataAfterChange(e),
      a
    );
  }
  GetInstanceProgress() {
    return Math.min(this.HFe / this.xte, 1);
  }
  GetInstanceReviveTipTips() {
    return (
      "" + ModelManager_1.ModelManager.DeadReviveModel.CurrentShareReviveTimes
    );
  }
  GetInstanceFloorProgressText() {
    return (
      (
        100 *
        ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentAbyssCompletePercentage()
      ).toFixed(2) + "%"
    );
  }
  GetInstanceFloorText() {
    return this.GetAbyssLayer() + "/" + this.GetMaxLayer();
  }
  GetInstanceFloorDetailProgressText() {
    return this.GetInstanceFloorText();
  }
  GetCurrentChallengeId() {
    return this.BFe;
  }
  GetCurrentAbyssFullTime() {
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(
      this.BFe,
    ).TotalTime;
  }
  GetCurrentAbyssTotalScore() {
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(
      this.BFe,
    ).TotalScore;
  }
  GetCurrentAbyssTreasureMap() {
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(
      this.BFe,
    ).RewardTime;
  }
  GetCurrentAbyssName() {
    var e, t;
    return 0 !== this.BFe &&
      ((e =
        ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(
          this.BFe,
        ).Title),
      (t =
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew("DangoInfoName")))
      ? StringUtils_1.StringUtils.Format(
          t,
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e),
        )
      : "";
  }
  GetCurrentRouteDesc() {
    var e;
    return 0 === this.xVc
      ? ""
      : ((e =
          ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssRouteByRouteIdAndFloorId(
            this.xVc,
            this.A_r,
          ).Desc),
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e));
  }
  GetInstanceRemainTimeText() {
    var e =
      ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo().Tree.GetChallengeRemainTime();
    return TimeUtil_1.TimeUtil.GetTimeDataFormat(Math.ceil(e));
  }
  GetOpenShopId() {
    var e = this.GetCurrentOpenAbyssActivityData()?.Id ?? 0;
    return 0 < e
      ? ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssActivityData(e)
          .ShopId
      : 0;
  }
  RefreshOwnDataAfterChange(e) {
    var t, r;
    for ([t, r] of this.iRc(e)) this.nu1(t, r);
  }
  nu1(t, r) {
    var a = ModelManager_1.ModelManager.EditBattleTeamModel.GetAllRoleSlotData;
    if (r.PlayerId === ModelManager_1.ModelManager.PlayerInfoModel.GetId()) {
      var n = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(
        r.DangoId,
      );
      if (n) {
        let e = !1;
        for (const o of a)
          if (o.GetRoleConfigId === t) {
            e = !0;
            break;
          }
        e
          ? ((r.DangoLevel = n.GetLevel()),
            (r.DangoEquipIds = n.GetEquipItems()))
          : this.iRc(r.PlayerId).delete(t);
      }
    }
  }
  GetMatchDangoRoleOwnData(r, e) {
    var t = new Protocol_1.Aki.Protocol.vOc();
    const a = {};
    return (
      e.forEach((e) => {
        var t = this.GetRoleOwnerData(r, e);
        a[e.toString()] = t?.DangoId ?? 0;
      }),
      (t.COc = a),
      t
    );
  }
  GetAllDangoList() {
    var e = this.GetCurrentOpenAbyssActivityData();
    return e ? e.GetAllDangoList() : [];
  }
  GetPluginItemInfoById(e) {
    var t = this.GetCurrentOpenAbyssActivityData();
    if (t) return t.GetPluginItemInfoById(e);
  }
  GetPluginItemConfigByIncId(e) {
    return this.GetPluginItemInfoById(e)?.GetConfig();
  }
  GetPluginItemListByType(e) {
    var t = this.GetAllPluginItemList(),
      r = new Array();
    for (const a of t) a.GetConfig().SlotType === e && r.push(a);
    return r;
  }
  GetAllPluginItemList() {
    var e = this.GetCurrentOpenAbyssActivityData();
    return e ? e.GetPluginItemInfoAll() : [];
  }
  InitCacheDangoOwnerMap() {
    this.tRc.clear();
    for (const [r, a] of this.GetCacheDangoOwnerMap())
      a.forEach((e, t) => {
        0 === e.DangoId ||
          this.GetDangoAbyssRoleData(e.DangoId).GetIfLock() ||
          this.tRc.set(r, a);
      });
  }
  GetCacheDangoOwnerMap() {
    return (
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.AbyssDangoFormationSelect,
      ) ?? new Map()
    );
  }
  SaveCacheDangoOwnerMap() {
    var e,
      t,
      r = new Map();
    for ([e, t] of this.tRc)
      if (e === ModelManager_1.ModelManager.PlayerInfoModel.GetId()) {
        var a,
          n,
          o = new Map();
        for ([a, n] of t) o.set(a, n);
        r.set(e, o);
      }
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.AbyssDangoFormationSelect,
      r,
    );
  }
  CheckInDangoAbyssInstance() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    return (
      0 !== e &&
      33 ===
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
          ?.InstSubType
    );
  }
  CheckIfInSmallWorldInstance() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    return (
      0 !== e &&
      12 ===
        (e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e))
          ?.InstSubType &&
      1 === e?.WorldDungeonSubType
    );
  }
  GetDangoAbyssItemTipsConfirmState(e) {
    var t, r;
    return !e.IncId ||
      e.DangoId < 0 ||
      e.SlotIndex < 0 ||
      ((t = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(
        e.IncId,
      ).GetConfig()),
      (r = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetSlotTypeByIndex(
        e.SlotIndex,
      )),
      t.SlotType !== r)
      ? 0
      : 0 !==
            (r =
              ModelManager_1.ModelManager.DangoAbyssModel.GetDangoItemBelongId(
                e.IncId,
              )) &&
          e.DangoId !== r &&
          1 === t.SlotType
        ? 1
        : this.iR1(e);
  }
  iR1(e) {
    var t = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(
        e.IncId,
      ),
      r = t.GetConfig();
    const a = t.GetBelongRole();
    var r = 2 === r.SlotType && 0 < a,
      n = t.GetRoleId(),
      o = this.GetPluginItemIncIdBySlotIndex(e.DangoId, e.SlotIndex);
    if (0 < n && n !== e.DangoId) {
      const a = t.GetBelongRole();
      return a === e.DangoId && r ? 8 : 2;
    }
    return 0 < n && n === e.DangoId
      ? 0 < o && o === e.IncId
        ? 3
        : 0 < o && o !== e.IncId
          ? 4
          : 5
      : r
        ? this.rR1(e)
        : 0 === n
          ? 0 < o
            ? 6
            : 7
          : 0;
  }
  rR1(e) {
    var t,
      r = this.GetPluginItemIncIdBySlotIndex(e.DangoId, e.SlotIndex);
    return ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(
      e.IncId,
    ).GetBelongRole() === e.DangoId
      ? 8
      : ((t = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(
          e.DangoId,
        ).GetEquipItems()),
        (t = this.LC1(t, e.IncId))[0]
          ? t[1] === e.SlotIndex
            ? 6
            : 9
          : 0 < r
            ? 6
            : 7);
  }
  LC1(t, e) {
    var r =
      ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(
        e,
      ).GetBelongRole();
    for (let e = 0; e < t.length; e++) {
      var a = t[e];
      if (!(a <= 0)) {
        var a =
            ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(
              a,
            ),
          n = a.GetBelongRole();
        if (2 === a.GetConfig().SlotType && 0 < n && n === r) return [!0, e];
      }
    }
    return [!1, -1];
  }
  fFc(t, r, e) {
    let a = -1;
    var n = t[e];
    for (let e = 0; e < t.length; e++) t[e] === r && (a = e);
    return (t[e] = r), (t[a] = n), t;
  }
  GetDangoAbyssItemNewEquip(e, t) {
    let r = [
      ...ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(
        e.DangoId,
      ).GetEquipPluginIdList(),
    ];
    var a = e.SlotIndex;
    return (
      2 === t || 6 === t || 7 === t
        ? (r[a] = e.IncId)
        : 4 === t || 5 === t
          ? (r = this.fFc(r, e.IncId, a))
          : 3 === t
            ? (r[a] = 0)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Activity",
                75,
                "非法的插件装备状态",
                ["dangoId", e.DangoId],
                ["state", t],
              ),
      r
    );
  }
  GetPluginItemIncIdBySlotIndex(e, t) {
    return (
      ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(e)
        .GetPluginSlotData(t)
        ?.GetIncId() ?? 0
    );
  }
  GetSlotUnlockLevel(e, t) {
    var e = this.GetDangoAbyssRoleData(e),
      r = this.MVc(t);
    for (const a of e.GetLevelGroupConfigs())
      if (a.PluginNum === r) return a.Level;
    return -1;
  }
  MVc(e) {
    return e || DangoAbyssDefine_1.SLOT_COUNT;
  }
  GetSlotLockState(e, t) {
    var e = this.GetDangoAbyssRoleData(e);
    return (
      !(e && !e.GetIfLock()) ||
      ((e = e.GetLevelConfig()), (t = this.MVc(t)), e.PluginNum < t)
    );
  }
  GetPluginItemQualityIcon(e) {
    e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoItemById(e);
    if (!e) return "";
    var t = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityById(
      e.QualityId,
    );
    if (!t) return "";
    let r = t.AbyssItemBg;
    switch (e.SlotType) {
      case 1:
        r = t.AbyssCoreItemBg;
        break;
      case 2:
        r = t.AbyssPassiveItemBg;
    }
    return r;
  }
  IsPluginHasValidTag(e, t) {
    t = this.GetPluginItemConfigByIncId(t.GetUniqueId()).AddTag;
    if (0 < t.size) for (const r of t.keys()) if (this.wC1(e, r, 1)) return !0;
    return !1;
  }
  wC1(e, t, r) {
    var a =
        ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoPluginPropDescById(
          t,
        ),
      e = this.GetDangoAbyssRoleData(e);
    return (
      !(!a || !e) &&
      ((a = a.AddType),
      (e = e.GetConfig().TagList),
      5 === a || 4 === a
        ? 2 !== r
        : !(!e.includes(t) || 2 === r) || (!e.includes(t) && 2 === r))
    );
  }
  AC1(e, t) {
    for (var [r, a] of t) e.has(r) ? e.set(r, e.get(r) + a) : e.set(r, a);
    return e;
  }
  GetDangoTagData(e, t) {
    var r,
      a = this.GetDangoAbyssRoleData(e),
      n = a.GetConfig(),
      a = a.GetEquipItems(),
      n = n.TagList;
    let o = new Map();
    if (0 < n.length && 2 !== t) for (const u of n) o.set(u, 0);
    for (const h of a)
      h <= 0 ||
        (0 < (r = this.GetPluginItemConfigByIncId(h).AddTag).size &&
          (o = this.AC1(o, r)));
    var i,
      s,
      g,
      l = new Array();
    for ([i, s] of o)
      this.wC1(e, i, t) &&
        (((g = new DangoAbyssDefine_1.DangoAbyssTagData()).TagId = i),
        (g.Value = s),
        l.push(g));
    return (
      l.sort((e, t) => {
        e =
          ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoPluginPropDescById(
            e.TagId,
          );
        return (
          ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoPluginPropDescById(
            t.TagId,
          ).AddType - e.AddType
        );
      }),
      l
    );
  }
  GetFormatAttributeValueByTagId(e, t, r) {
    t =
      ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoPluginPropDescById(
        t,
      );
    if (!t) return "";
    if (r || !t.TextFormat || !t.MaxTextFormat)
      return this.GetFormatAttributeValueByAddType(e, t.AddType);
    let a = t.TextFormat,
      n = (e > t.MaxValue && (a = t.MaxTextFormat), e.toString()),
      o = t.MaxValue.toString();
    1 === t.AddType
      ? ((n = AttributeModel_1.TipsDataTool.GetPropRatioValue(
          e,
          !1,
        ).toString()),
        (o = AttributeModel_1.TipsDataTool.GetPropRatioValue(
          t.MaxValue,
          !1,
        ).toString()))
      : 2 === t.AddType &&
        ((n = AttributeModel_1.TipsDataTool.GetPropRatioValue(
          e,
          !0,
        ).toString()),
        (o = AttributeModel_1.TipsDataTool.GetPropRatioValue(
          t.MaxValue,
          !0,
        ).toString()));
    r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(a);
    return r ? StringUtils_1.StringUtils.Format(r, n, o) : "";
  }
  GetSlotSwitchTypeByData(e, t) {
    return t && e !== t
      ? ((e = e?.GetIncId() ?? 0),
        (t = t?.GetIncId() ?? 0),
        e <= 0 && 0 < t
          ? 3
          : 0 < e && t <= 0
            ? 1
            : 0 < e && 0 < t && e !== t
              ? 2
              : 0)
      : 0;
  }
  GetFormatAttributeValueByAddType(e, t) {
    switch (t) {
      case 1:
        return (
          "+" +
          AttributeModel_1.TipsDataTool.GetPropRatioValue(e, !1).toString()
        );
      case 2:
        return `+${AttributeModel_1.TipsDataTool.GetPropRatioValue(e, !0).toString()}%`;
      case 3:
        return `+${e.toString()}s`;
      case 4:
        return "Lv." + e.toString();
      case 5:
        var r = this.GetDangoAbyssRoleData(e);
        return r && r.GetConfig()
          ? ((r = r.GetConfig().Name),
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r) ?? "id" + e)
          : "id" + e;
      default:
        return e.toString();
    }
  }
  GetDangoAddPropData(e) {
    var t = [];
    for (const r of this.GetDangoAbyssRoleData(e).GetEquipItems())
      if (!(r <= 0))
        for (const a of this.GetPluginItemConfigByIncId(r).Prop) t.push(a);
    return t;
  }
  GetDangoBaseProp(e) {
    return this.GetDangoAbyssRoleData(e).GetLevelConfig().Prop;
  }
  GetDangoShowAttributeList(e) {
    const o = new Array();
    var t = this.GetDangoBaseProp(e),
      e = this.GetDangoAddPropData(e);
    return (
      t.forEach((e) => {
        var t = AttributeModel_1.TipsDataTool.GetPropRatioValue(
          e.Value,
          e.IsRatio,
        );
        o.push(
          new AttrListScrollData_1.AttrListScrollData(
            e.Id,
            t,
            0,
            0,
            e.IsRatio,
            0,
          ),
        );
      }),
      e.forEach((e, t) => {
        let r = !1;
        var a = AttributeModel_1.TipsDataTool.GetPropRatioValue(
          e.Value,
          e.IsRatio,
        );
        for (const n of o)
          n.Id === e.Id &&
            n.IsRatio === e.IsRatio &&
            ((n.AddValue += a), (r = !0));
        r ||
          o.push(
            new AttrListScrollData_1.AttrListScrollData(
              e.Id,
              0,
              a,
              0,
              e.IsRatio,
              0,
            ),
          );
      }),
      o
    );
  }
  ie1(e) {
    e = this.GetDangoAddPropData(e);
    const n = new Array();
    return (
      e.forEach((e, t) => {
        let r = !1;
        for (const a of n)
          a.Id === e.Id &&
            a.IsRatio === e.IsRatio &&
            ((a.AddValue += e.Value), (r = !0));
        r ||
          n.push(
            new AttrListScrollData_1.AttrListScrollData(
              e.Id,
              0,
              e.Value,
              0,
              e.IsRatio,
              0,
            ),
          );
      }),
      n
    );
  }
  GetEquipViewAttributeDataById(e) {
    var t = new DangoAbyssDefine_1.EquipViewAttributeData(),
      r = ((t.IsValid = !0), this.ie1(e)),
      a = this.GetDangoTagData(e, 1);
    let n = [];
    if (0 < r.length + a.length) {
      n = [t];
      for (const l of a) {
        var o = new DangoAbyssDefine_1.EquipViewAttributeData();
        (o.IsValid = !0), (o.Tag = l), n.push(o);
      }
      for (const u of r) {
        var i = new DangoAbyssDefine_1.EquipViewAttributeData();
        (i.IsValid = !0), (i.Attribute = u), n.push(i);
      }
    }
    (t = new DangoAbyssDefine_1.EquipViewAttributeData()),
      (t.IsValid = !1),
      (a = this.GetDangoTagData(e, 2));
    let s = [];
    if (0 < a.length) {
      s = [t];
      for (const h of a) {
        var g = new DangoAbyssDefine_1.EquipViewAttributeData();
        (g.IsValid = !1), (g.Tag = h), s.push(g);
      }
    }
    return s.concat(n);
  }
  JE1(e, t, r, a) {
    for (const i of e) {
      var n = i.Tag?.TagId,
        o = i.Attribute?.Id;
      if (!a && o === t) return i.Attribute?.AddValue === r;
      if (a && n === t) return i.Tag?.Value === r;
    }
    return !1;
  }
  SetEquipViewAttributeType(a, e) {
    for (const o of e)
      if (((o.IsChange = !1), o.Attribute || o.Tag)) {
        let e = 0,
          t = !1,
          r = 0;
        o.Attribute
          ? ((e = o.Attribute.Id), (t = !1), (r = o.Attribute.AddValue))
          : o.Tag && ((e = o.Tag.TagId), (t = !0), (r = o.Tag.Value));
        var n = this.JE1(a, e, r, t);
        o.IsChange = !n;
      }
    return e;
  }
  GetSlotTypeTextIdBySlotIndex(e) {
    e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetSlotTypeByIndex(e);
    return DangoAbyssDefine_1.textSlotType.get(e);
  }
  GetPluginItemListBySlotIndex(e) {
    e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetSlotTypeByIndex(e);
    return ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemListByType(
      e,
    );
  }
  GetIfSlotTypeChange(e, t) {
    return (
      e < 0 ||
      ConfigManager_1.ConfigManager.DangoAbyssConfig.GetSlotTypeByIndex(e) !==
        ConfigManager_1.ConfigManager.DangoAbyssConfig.GetSlotTypeByIndex(t)
    );
  }
  GetPluginItemPackageCapacity() {
    var e =
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(
        9,
      ).PackageId;
    return ConfigManager_1.ConfigManager.InventoryConfig.GetPackageConfig(e)
      .PackageCapacity;
  }
  SaveFormationSelectRole(e, t) {
    var r =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.AbyssSelectRole,
      ) ?? new Map();
    r.set(e, t),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.AbyssSelectRole,
        r,
      );
  }
  GetFormationSelectRoleList(e) {
    return (
      (
        LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.AbyssSelectRole,
        ) ?? new Map()
      ).get(e) ?? []
    );
  }
  GetDangoIfLock(e) {
    e = this.GetDangoAbyssRoleData(e);
    return !e || e.GetIfLock();
  }
  GetDangoDevelopRedDot() {
    return this.GetDangoNewRedDot() || this.GetDangoLevelUpRedDot(!0);
  }
  GetDangoRoleRedDot(e) {
    return (
      this.GetDangoNewRedDotById(e) || this.GetDangoLevelUpRedDotById(e, !0)
    );
  }
  GetDangoFormationNewRedDot() {
    for (const e of this.GetAllDangoList())
      if (this.GetDangoFormationNewRoleRedDot(e.GetId())) return !0;
    return !1;
  }
  GetDangoFormationNewRoleRedDot(e) {
    return this.GetDangoFormationNewRedDotById(e);
  }
  GetDangoNewRedDot() {
    for (const e of this.GetAllDangoList())
      if (this.GetDangoNewRedDotById(e.GetId())) return !0;
    return !1;
  }
  GetDangoNewRedDotById(e) {
    return !(!this.GetDangoAbyssRoleData(e) || !this.GetDangoIfNew(e));
  }
  GetDangoFormationNewRedDotById(e) {
    return !(!this.GetDangoAbyssRoleData(e) || !this.GetDangoFormationIfNew(e));
  }
  SetDangoHasCheck(e) {
    this.SetDangoIfNew(e, !1), this.SetDangoLevelCheck(e);
  }
  SetDangoIfNew(e, t) {
    var r = this.GetDangoAbyssRoleData(e);
    r &&
      !r.GetIfLock() &&
      ((r =
        LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.AbyssDangoRoleNew,
        ) ?? new Map()).set(e, t),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.AbyssDangoRoleNew,
        r,
      ));
  }
  GetDangoIfNew(e) {
    var t = this.GetDangoAbyssRoleData(e);
    return (
      !(!t || t.GetIfLock()) &&
      ((
        LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.AbyssDangoRoleNew,
        ) ?? new Map()
      ).get(e) ??
        !1)
    );
  }
  SetDangoFormationIfNew(e, t) {
    var r;
    this.GetDangoAbyssRoleData(e) &&
      ((r =
        LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.AbyssDangoFormationNew,
        ) ?? new Map()).set(e, t),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.AbyssDangoFormationNew,
        r,
      )),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshAbyssDangoRedDot,
        e,
      );
  }
  GetDangoFormationIfNew(e) {
    return (
      !!this.GetDangoAbyssRoleData(e) &&
      ((
        LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.AbyssDangoFormationNew,
        ) ?? new Map()
      ).get(e) ??
        !1)
    );
  }
  SetDangoLevelCheck(e) {
    var t = this.GetDangoAbyssRoleData(e),
      r = this.GetDangoLevelUpRedDotById(e, !1);
    t &&
      r &&
      ((r = t.GetLevel() + 1),
      (t =
        LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.AbyssDangoLevelCheck,
        ) ?? new Map()).set(e, r),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.AbyssDangoLevelCheck,
        t,
      ));
  }
  GetDangoLastCheckLevel(e) {
    return (
      (
        LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.AbyssDangoLevelCheck,
        ) ?? new Map()
      ).get(e) ?? 1
    );
  }
  GetDangoLevelUpRedDot(e) {
    for (const t of this.GetAllDangoList())
      if (this.GetDangoLevelUpRedDotById(t.GetId(), e)) return !0;
    return !1;
  }
  GetDangoLevelUpRedDotById(e, t) {
    var r,
      a,
      n = this.GetDangoAbyssRoleData(e);
    return !(
      !n ||
      n.GetIfLock() ||
      ((r = n.GetIfCanLevelUp()), (a = n.GetIfLevelUpEnough()), !r) ||
      !a ||
      (t && !(this.GetDangoLastCheckLevel(e) < n.GetLevel() + 1))
    );
  }
  GetRecoverySelectionCountMap(e) {
    var t = new Map();
    for (const a of e) {
      var r = this.GetPluginItemConfigByIncId(a.IncId);
      r && ((r = r.QualityId), t.has(r) ? t.set(r, t.get(r) + 1) : t.set(r, 1));
    }
    return t;
  }
  GetRecoveryTimesCountMap(e) {
    const r = new Map();
    return (
      e.forEach((e, t) => {
        e = Math.floor(e / DangoAbyssDefine_1.RECOVERY_NEEDS_COUNT);
        r.set(t, e);
      }),
      r
    );
  }
  GetRecoveryTimesCountAll(e) {
    let r = 0;
    return (
      e.forEach((e, t) => {
        r += Math.floor(e / DangoAbyssDefine_1.RECOVERY_NEEDS_COUNT);
      }),
      r
    );
  }
  GetRecoveryRewardItemMap(e) {
    const n = new Map();
    return (
      e.forEach((e, t) => {
        var r, a;
        if (0 < e)
          for ([
            r,
            a,
          ] of ConfigManager_1.ConfigManager.DangoAbyssConfig.GetRecoveryRewardByQualityId(
            t,
          ))
            n.has(r) ? n.set(r, n.get(r) + e * a) : n.set(r, e * a);
      }),
      n
    );
  }
  GetRecoveryAvailable() {
    var e =
        this.GetCurrentOpenAbyssActivityData().GetCurrentLastFinishChallengeId(),
      e =
        ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(e);
    return !!e && e.AbyssSynthesisEntr;
  }
  GetRankOpen() {
    var e =
        this.GetCurrentOpenAbyssActivityData().GetCurrentLastFinishChallengeId(),
      e =
        ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(e);
    return !!e && e.AbyssRank;
  }
  GetMainHonorRank(e) {
    if (0 === e.length) return 0;
    var t,
      r = e[0].Id,
      a = e[0].Count;
    let n = 3;
    for ([
      t,
    ] of ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssSettleById(r)
      .Title)
      a >= t && n--;
    return (n = Math.max(0, Math.min(2, n)));
  }
  GetPluginItemTipsData(e, t, r, a) {
    (a = { DangoId: a ?? -1, SlotIndex: r ?? -1 }),
      (r = new ItemDefine_1.ItemTipsParam());
    return (r.ItemId = e), (r.ItemUid = t), (r.ExtraParam = a), r;
  }
  GetSkillDescByDangoId(e) {
    var e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoRoleById(e);
    return e
      ? ((e = e.PhantomItemId),
        (e =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(
            e,
          )),
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillDescStringBySkillIdAndQuality(
          e.SkillId,
        ))
      : "";
  }
  GetDangoUpAvailable() {
    var e =
        this.GetCurrentOpenAbyssActivityData().GetCurrentLastFinishChallengeId(),
      e =
        ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(e);
    return !!e && e.AbyssDevelopEntr;
  }
  GetShopAvailable() {
    var e =
        this.GetCurrentOpenAbyssActivityData().GetCurrentLastFinishChallengeId(),
      e =
        ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(e);
    return !!e && e.AbyssStoreEntr;
  }
  GetRewardInfoById(e) {
    var t = this.GetCurrentOpenAbyssActivityData();
    if (t) return t.GetRewardInfoById(e);
  }
  IsChallengeFinish() {
    return this.mL1;
  }
}
exports.DangoAbyssModel = DangoAbyssModel;
//# sourceMappingURL=DangoAbyssModel.js.map
