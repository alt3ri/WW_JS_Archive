"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDefenseModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  DropPackageById_1 = require("../../../Core/Define/ConfigQuery/DropPackageById"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  TowerDefenceInstanceById_1 = require("../../../Core/Define/ConfigQuery/TowerDefenceInstanceById"),
  TowerDefencePhantomAll_1 = require("../../../Core/Define/ConfigQuery/TowerDefencePhantomAll"),
  TowerDefenceRewardAll_1 = require("../../../Core/Define/ConfigQuery/TowerDefenceRewardAll"),
  TowerDefenceRewardById_1 = require("../../../Core/Define/ConfigQuery/TowerDefenceRewardById"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ActivityData_1 = require("../Activity/ActivityData"),
  TowerDefenceController_1 = require("./TowerDefenceController"),
  TowerDefenceDefine_1 = require("./TowerDefenceDefine"),
  TowerDefenceInstanceByInstanceId_1 = require("../../../Core/Define/ConfigQuery/TowerDefenceInstanceByInstanceId"),
  TowerDefencePhantomById_1 = require("../../../Core/Define/ConfigQuery/TowerDefencePhantomById"),
  TowerDefencePhantomLevelByGroupId_1 = require("../../../Core/Define/ConfigQuery/TowerDefencePhantomLevelByGroupId"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  EditFormationDefine_1 = require("../EditFormation/EditFormationDefine");
class TowerDefenseModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.fZs = new Map()),
      (this.IsUiFlowOpen = !1),
      (this.IsPhantomViewOpened = !1),
      (this.AOa = void 0),
      (this.pZs = []),
      (this.PhantomMessageCache = new ParsedTowerDefenseMsg()),
      (this.CurrentSelfPhantomIdInUiTemp = TowerDefenceDefine_1.DEFAULT_ID),
      (this.PhantomOwnerDataList = []),
      (this.RoleCfgId2PhantomIdMapCache = new Map()),
      (this.DelayedEndNotify = void 0),
      (this.TimerCacheInBattle = new Set()),
      (this.vZs = (e, t) => e.Id - t.Id);
  }
  get IsEnterInActivityClicked() {
    if (void 0 === this.AOa) {
      let e = LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.TowerDefenseEntered,
      );
      void 0 === e &&
        (LocalStorage_1.LocalStorage.SetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.TowerDefenseEntered,
          !1,
        ),
        (e = !1)),
        (this.AOa = e);
    }
    return this.AOa;
  }
  set IsEnterInActivityClicked(e) {
    this.AOa !== e &&
      ((this.AOa = e),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.TowerDefenseEntered,
        e,
      ));
  }
  get PhantomConfigCache() {
    return this.fZs;
  }
  get SortedPhantomConfigCache() {
    return this.pZs;
  }
  OnInit() {
    return (
      this.yCa(),
      this.ResetCurrentPhantomIdInUiTempToFirstAvailable(),
      this.ResetPhantomOwnerDataList(),
      !0
    );
  }
  OnLeaveLevel() {
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "TowerDefense",
          65,
          "标记真正的离开场景时机，用于还原数据",
        ),
      this.PhantomMessageCache.OwnPhantomInBattleDataCache.clear(),
      !0
    );
  }
  yCa() {
    for (const n of TowerDefencePhantomAll_1.configTowerDefencePhantomAll.GetConfigList()) {
      var e = [],
        t =
          TowerDefencePhantomLevelByGroupId_1.configTowerDefencePhantomLevelByGroupId.GetConfigList(
            n.SkillGroup,
          );
      if (void 0 !== t) {
        for (const o of t) {
          var r = {
            Name: o.Title,
            Description: o.Description,
            ExpThreshold: o.ExpLevel,
          };
          e.push(r);
        }
        t = {
          Id: n.Id,
          PhantomItemId: n.PhantomItemId,
          ActivityId: n.ActivityId,
          PhantomNameTextId: n.PhantomName,
          PhantomTypeTextId: n.TypeTextId,
          TypeIconPath:
            ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(
              n.TypeIcon,
            ) ?? "",
          MarkResourceId: n.MarkHex,
          SkillDataList: e,
          MaxLevel: e.length,
        };
        this.fZs.set(n.Id, t), this.pZs.push(t);
      }
    }
    this.pZs.sort(this.vZs);
  }
  GetCurrentPhantomIdInBattle() {
    var e =
        TowerDefenceController_1.TowerDefenseController.GetCurrentSceneTeamItem(),
      t = e.GetPlayerId(),
      e = e.GetConfigId,
      r = this.GetOwnerData(t, e);
    return r
      ? (r.PhantomId <= 0 &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "TowerDefense",
            65,
            "塔防战斗中获取声骸ID失败：未赋值声骸",
            ["PlayerID", t],
            ["RoleCfgID", e],
            ["Owner Data", r],
          ),
        r.PhantomId)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "TowerDefense",
            65,
            "塔防战斗中获取声骸ID失败：未获取OwnerData",
            ["PlayerID", t],
            ["RoleCfgID", e],
            ["Owner Data", r],
          ),
        TowerDefenceDefine_1.DEFAULT_ID);
  }
  SZs(e) {
    var t = this.fZs.get(e);
    return t
      ? t.SkillDataList
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("TowerDefense", 65, "未能获得塔防声骸技能配置", [
            "TowerDefensePhantomId",
            e,
          ]),
        []);
  }
  GetCurrentPhantomSkillCfgListInBattle() {
    var e = this.GetCurrentPhantomIdInBattle();
    return this.SZs(e);
  }
  GetCurrentPhantomSkillDescriptionArgsInBattle() {
    var e = this.GetCurrentPhantomIdInBattle();
    return TowerDefenceController_1.TowerDefenseController.GetPhantomSkillDescriptionArgsByPhantomId(
      e,
    );
  }
  GetCurrentPhantomLevelInBattle() {
    var e = this.GetCurrentPhantomIdInBattle(),
      e = this.PhantomMessageCache.OwnPhantomInBattleDataCache.get(e);
    return e ? e.F6n : 1;
  }
  GetCurrentPhantomExpPairInBattle() {
    var e = this.GetCurrentPhantomIdInBattle(),
      t = this.PhantomMessageCache.OwnPhantomInBattleDataCache.get(e),
      r = { Exp: 0, Threshold: 0 };
    if (t) {
      var n = this.fZs.get(t.s5n);
      if (!n)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "TowerDefense",
              65,
              "战斗中声骸ID，协议与配置不匹配，以协议ID找不到配置数据",
              ["协议声骸ID", t.s5n],
            ),
          r
        );
      var o = t.F6n;
      let e = 0;
      1 < o &&
        (e =
          (n.MaxLevel === t.F6n
            ? n.SkillDataList[o - 2]
            : n.SkillDataList[o - 1]
          ).ExpThreshold ?? 0),
        (r.Exp = n.MaxLevel === t.F6n ? e : t.U8n),
        (r.Threshold = e);
    } else {
      o = this.fZs.get(e);
      if (!o) return r;
      (r.Exp = 0), (r.Threshold = o.SkillDataList[0].ExpThreshold ?? 0);
    }
    return r;
  }
  GetCurrentPhantomNameTextId() {
    var e = this.GetCurrentPhantomIdInBattle(),
      e = TowerDefencePhantomById_1.configTowerDefencePhantomById.GetConfig(e);
    return e ? e.PhantomName : "";
  }
  GetCurrentPhantomSkillCfgTemp() {
    return this.SZs(this.CurrentSelfPhantomIdInUiTemp);
  }
  GetOrCreateParsedTowerDefenseMsg() {
    return (
      this.PhantomMessageCache ||
        (this.PhantomMessageCache = new ParsedTowerDefenseMsg()),
      this.PhantomMessageCache
    );
  }
  GetProtocolPhantomIdList(e) {
    if (
      TowerDefenceController_1.TowerDefenseController.CheckInUiFlow() ||
      TowerDefenceController_1.TowerDefenseController.CheckInInstanceDungeon()
    ) {
      var t = [],
        r = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
      for (const o of e) {
        var n = this.GetOwnerData(r, o);
        t.push(n.PhantomId);
      }
      return t;
    }
  }
  GetPreviewRewardData() {
    var e = [];
    for (const T of TowerDefenceRewardAll_1.configTowerDefenceRewardAll.GetConfigList())
      if (T.ActivityId === this.PhantomMessageCache.Id) {
        var t,
          r,
          n = [];
        for ([t, r] of DropPackageById_1.configDropPackageById.GetConfig(
          T.RewardId,
        ).DropPreview)
          n.push([{ ItemId: t, IncId: 0 }, r]);
        var o = this.PhantomMessageCache.GetScoreRewardStateById(T.Id),
          o = {
            NameText: "",
            NameTextId: "ConditionGroup_12100402_HintText",
            NameTextArgs: [T.Score.toString()],
            RewardList: n,
            RewardState: o,
            RewardButtonText: this.Vea(o),
            RewardButtonRedDot: 1 === o,
            ClickFunction: () => {
              TowerDefenceController_1.TowerDefenseController.RequestScoreReward(
                T.Id,
              );
            },
          };
        e.push(o);
      }
    var i = [],
      a = [];
    for (const w of this.PhantomMessageCache.StageListCache) {
      var s,
        f,
        c = [],
        h = TowerDefenceInstanceById_1.configTowerDefenceInstanceById.GetConfig(
          w.Id,
        ),
        D = h.InstanceId,
        D = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(D),
        D = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(D.MapName),
        l = h.RewardId;
      for ([s, f] of DropPackageById_1.configDropPackageById.GetConfig(l)
        .DropPreview)
        c.push([{ ItemId: s, IncId: 0 }, f]);
      (l = this.PhantomMessageCache.GetPassRewardStateById(w.Id)),
        (D = {
          NameText: "",
          NameTextId: h.IsDifficult
            ? "TowerDefenceclear"
            : "ConditionGroup_12100401_HintText",
          NameTextArgs: h.IsDifficult ? [D] : [D, h.RewardScore.toString()],
          RewardList: c,
          RewardState: l,
          RewardButtonText: this.Vea(l),
          RewardButtonRedDot: 1 === l,
          ClickFunction: () => {
            TowerDefenceController_1.TowerDefenseController.RequestInstanceReward(
              w.Id,
            );
          },
        });
      (h.IsDifficult ? a : i).push(D);
    }
    var d = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "TowerDefenceFullPoint",
      ),
      d = d
        ? StringUtils_1.StringUtils.Format(
            d,
            this.PhantomMessageCache.TotalScore.toString(),
          )
        : "";
    return {
      DataPageList: [
        {
          TabName: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "TowerDefenceLevelRewardText",
          ),
          TabTips: d,
          DataList: i,
        },
        {
          TabName: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "TowerDefenceScoreRewardText",
          ),
          TabTips: d,
          DataList: e,
        },
        {
          TabName: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "PrefabTextItem_1347286118_Text",
          ),
          TabTips: d,
          DataList: a,
        },
      ],
    };
  }
  Vea(e) {
    switch (e) {
      case 2:
      case 1:
        return (
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "TowerDefence_Getbt1",
          ) ?? ""
        );
      case 0:
        return (
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "TowerDefence_Getbt3",
          ) ?? ""
        );
      default:
        return "";
    }
  }
  ResetCurrentPhantomIdInUiTempToFirstAvailable() {
    for (const t of this.pZs)
      if (t.ActivityId === this.PhantomMessageCache.Id) {
        let e = !1;
        for (const r of this.PhantomOwnerDataList)
          if (r.PhantomId === t.Id) {
            e = !0;
            break;
          }
        if (!e) return void (this.CurrentSelfPhantomIdInUiTemp = t.Id);
      }
    this.CurrentSelfPhantomIdInUiTemp = TowerDefenceDefine_1.DEFAULT_ID;
  }
  ResetPhantomOwnerDataList() {
    for (
      let e = (this.PhantomOwnerDataList.length = 0);
      e < EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM;
      e++
    )
      this.PhantomOwnerDataList.push({
        PlayerId: ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
        IsSelf: !0,
        RoleCfgId: TowerDefenceDefine_1.DEFAULT_ID,
        PhantomId: TowerDefenceDefine_1.DEFAULT_ID,
      });
  }
  ResetPhantomOwnerDataByIndex(e) {
    (this.PhantomOwnerDataList[e].PlayerId =
      ModelManager_1.ModelManager.PlayerInfoModel.GetId()),
      (this.PhantomOwnerDataList[e].IsSelf = !0),
      (this.PhantomOwnerDataList[e].RoleCfgId =
        TowerDefenceDefine_1.DEFAULT_ID),
      (this.PhantomOwnerDataList[e].PhantomId =
        TowerDefenceDefine_1.DEFAULT_ID);
  }
  ResetAllCache() {
    this.CurrentSelfPhantomIdInUiTemp = TowerDefenceDefine_1.DEFAULT_ID;
    for (let e = 0; e < this.PhantomOwnerDataList.length; e++)
      this.ResetPhantomOwnerDataByIndex(e);
    this.RoleCfgId2PhantomIdMapCache.clear();
  }
  ResetTimerCacheInBattle() {
    for (const e of this.TimerCacheInBattle) e.Remove();
    this.TimerCacheInBattle.clear();
  }
  TryAddTimerInBattle(e) {
    e && this.TimerCacheInBattle.add(e);
  }
  TryRemoveTimerInBattle(e) {
    e && (e.Remove(), this.TimerCacheInBattle.delete(e));
  }
  CheckHasReward() {
    return this.CheckHasPassReward() || this.CheckHasScoreReward();
  }
  CheckHasScoreReward() {
    var e = TowerDefenceRewardAll_1.configTowerDefenceRewardAll.GetConfigList(),
      t = this.PhantomMessageCache;
    for (const r of e)
      if (t.TotalScore >= r.Score && !t.ScoreRewardCache.has(r.Id)) return !0;
    return !1;
  }
  CheckHasPassReward() {
    for (const t of this.PhantomMessageCache.StageListCache) {
      var e =
        TowerDefenceInstanceById_1.configTowerDefenceInstanceById.GetConfig(
          t.Id,
        );
      if (void 0 === e) return !1;
      if (e.IsDifficult) {
        if (t.Passed && !t.Rewarded) return !0;
      } else if (t.RecordOverThreshold && !t.Rewarded) return !0;
    }
    return !1;
  }
  CheckHasNewStage() {
    var e = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    for (const t of this.PhantomMessageCache.StageListCache)
      if (t.UnlockTime < e && !t.Passed) return !0;
    return !1;
  }
  CheckPhantomAvailableInActivityByActivityId(e) {
    return e === this.PhantomMessageCache.Id;
  }
  CheckCurrentActivityIsSecondEdition() {
    return 101900001 === this.PhantomMessageCache.Id;
  }
  CheckPhantomIsOccupied(e) {
    for (const t of this.PhantomOwnerDataList)
      if (t.PhantomId !== TowerDefenceDefine_1.DEFAULT_ID && t.PhantomId === e)
        return !0;
    return !1;
  }
  GetOwnerData(e, t) {
    for (const r of this.PhantomOwnerDataList)
      if (r.PlayerId === e && r.RoleCfgId === t) return r;
  }
  GetOwnerDataListByPlayerId(e) {
    var t = [];
    for (const r of this.PhantomOwnerDataList) r.PlayerId === e && t.push(r);
    return t;
  }
}
exports.TowerDefenseModel = TowerDefenseModel;
class ParsedTowerDefenseMsg extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments),
      (this.ScoreRewardCache = new Map()),
      (this.StageListCache = []),
      (this.StageMapCache = new Map()),
      (this.OwnPhantomInBattleDataCache = new Map()),
      (this.OwnPhantomInBattleNewLevelUpFlagCache = new Map()),
      (this.TotalScore = 0);
  }
  PhraseEx(e) {
    var t = e.pzs;
    t
      ? this.ParseTowerDefenseActivityData(t)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "TowerDefense",
          65,
          "塔防数据为空，请确认活动协议类型是否正确",
          ["ActivityId", e.s5n],
          ["ActivityType", e.h5n],
        );
  }
  GetExDataRedPointShowState() {
    return (
      TowerDefenceController_1.TowerDefenseController.CheckHasNewStage() ||
      TowerDefenceController_1.TowerDefenseController.CheckHasReward()
    );
  }
  ParseTowerDefenseActivityData(e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("TowerDefense", 65, "解析塔防活动数据", ["data", e]),
      this.ScoreRewardCache.clear(),
      (this.TotalScore = 0);
    for (const r of e.Szs) {
      var t =
        TowerDefenceRewardById_1.configTowerDefenceRewardById.GetConfig(r);
      this.ScoreRewardCache.set(r, t);
    }
    this.ParseTowerDefenseInstanceDataList(e.Mzs), (this.TotalScore = e.Wma);
  }
  ParseTowerDefenseInstanceDataList(e, t = !0) {
    if (
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "TowerDefense",
          65,
          "解析塔防关卡数据",
          ["dataList", e],
          ["是否全量更新", t],
        ),
      t)
    ) {
      (this.TotalScore = 0),
        (this.StageListCache.length = 0),
        this.StageMapCache.clear();
      for (const i of e) {
        var r =
          TowerDefenceInstanceById_1.configTowerDefenceInstanceById.GetConfig(
            i.s5n,
          );
        r
          ? ((r = {
              Meta: i,
              Id: i.s5n,
              UnlockTime: MathUtils_1.MathUtils.LongToNumber(i.yzs),
              Passed: i.Ezs,
              PassTime: i.Qxs,
              Rewarded: i.mLs,
              Record: i.tBs,
              RecordOverThreshold: i.tBs >= r.RewardScore,
            }),
            this.StageListCache.push(r),
            this.StageMapCache.set(i.s5n, r))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "TowerDefense",
              65,
              "塔防副本协议数据与配置不匹配，协议ID：" + i.s5n,
            );
      }
    } else {
      for (const a of e)
        if (!this.StageMapCache.has(a.s5n))
          return void (
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "TowerDefense",
              65,
              "塔防关卡协议存量更新时，出现未缓存的数据，本条协议不更新",
              ["协议数据", e],
            )
          );
      for (const s of e) {
        var n =
            TowerDefenceInstanceById_1.configTowerDefenceInstanceById.GetConfig(
              s.s5n,
            ),
          o = this.StageMapCache.get(s.s5n);
        (o.Meta = s),
          (o.Id = s.s5n),
          (o.UnlockTime = MathUtils_1.MathUtils.LongToNumber(s.yzs)),
          (o.Passed = s.Ezs),
          (o.PassTime = s.Qxs),
          (o.Rewarded = s.mLs),
          (o.Record = s.tBs),
          (o.RecordOverThreshold = s.tBs >= n.RewardScore);
      }
    }
  }
  ParseTowerDefenseOwnPhantomDataList(e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("TowerDefense", 65, "解析塔防声骸数据", ["infoList", e]);
    for (const r of e) {
      var t = this.OwnPhantomInBattleDataCache.get(r.s5n);
      t &&
        r.F6n > t.F6n &&
        this.OwnPhantomInBattleNewLevelUpFlagCache.set(r.s5n, !0),
        this.OwnPhantomInBattleDataCache.set(r.s5n, r);
    }
  }
  GetScoreRewardStateById(e) {
    var t = TowerDefenceRewardById_1.configTowerDefenceRewardById.GetConfig(e);
    return this.TotalScore < t.Score ? 0 : this.ScoreRewardCache.has(e) ? 2 : 1;
  }
  GetPassRewardStateById(e) {
    var t =
      TowerDefenceInstanceById_1.configTowerDefenceInstanceById.GetConfig(e);
    return void 0 === t
      ? 0
      : ((e = this.StageMapCache.get(e)),
        t.IsDifficult
          ? e.Passed
            ? e.Rewarded
              ? 2
              : 1
            : 0
          : e.RecordOverThreshold
            ? e.Rewarded
              ? 2
              : 1
            : 0);
  }
  UpdateByScoreRewardRequest(e) {
    this.ScoreRewardCache.set(
      e,
      TowerDefenceRewardById_1.configTowerDefenceRewardById.GetConfig(e),
    );
  }
  UpdateByInstanceRewardRequest(e) {
    e = this.StageMapCache.get(e);
    (e.Rewarded = !0), (e.Meta.mLs = !0);
  }
  IsStageUnLocked(e) {
    e =
      TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(
        e,
      );
    return !!e && this.IsStageUnlockedByTowerDefenseInstanceId(e.Id);
  }
  IsStageUnlockedByTowerDefenseInstanceId(e) {
    var t = TimeUtil_1.TimeUtil.GetServerTimeStamp(),
      r = this.StageMapCache.get(e);
    return r
      ? r.UnlockTime < t
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "TowerDefense",
            65,
            "塔防关卡协议数据丢失",
            ["TowerDefenseInstanceId", e],
            ["关卡协议缓存", this.StageMapCache],
          ),
        !1);
  }
  GetSuitableInstanceId() {
    let e = 0;
    for (const t of this.StageListCache)
      if (
        this.IsStageUnlockedByTowerDefenseInstanceId(t.Id) &&
        ((e =
          TowerDefenceInstanceById_1.configTowerDefenceInstanceById.GetConfig(
            t.Id,
          )?.InstanceId ?? 0),
        0 === t.Record)
      )
        break;
    return e;
  }
}
//# sourceMappingURL=TowerDefenceModel.js.map
