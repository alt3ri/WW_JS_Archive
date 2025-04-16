"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdventureGuideModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  MonsterDetectionFilterAll_1 = require("../../../Core/Define/ConfigQuery/MonsterDetectionFilterAll"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  IEntity_1 = require("../../../UniverseEditor/Interface/IEntity"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ActivityDoubleRewardController_1 = require("../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
  AdventureDefine_1 = require("./AdventureDefine"),
  AdventureGuideController_1 = require("./AdventureGuideController"),
  ENERGYCOST_ID = 5;
class AdventureGuideModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.P4l = !1),
      (this.EVe = new Map()),
      (this.U4l = new Map()),
      (this.eql = new Map()),
      (this.CurrentGuideTabName = void 0),
      (this.SVe = new Map()),
      (this.yVe = 0),
      (this.IVe = 0),
      (this.TVe = 0),
      (this.LVe = 0),
      (this.DVe = 0),
      (this.RVe = 0),
      (this.UVe = void 0),
      (this.AVe = 0),
      (this.PVe = 0),
      (this.xVe = 0),
      (this.wVe = 0),
      (this.BVe = 0),
      (this.bVe = 0),
      (this.qVe = !1),
      (this.CurrentMonsterId = 0),
      (this.CurrentSilentId = 0),
      (this.DetectionRedDotRecord = void 0),
      (this.GVe = new Map()),
      (this.NVe = new Map()),
      (this.OVe = new Map()),
      (this.AllMonsterDetectionRecord = new Map()),
      (this.AllDungeonDetectionRecord = new Map()),
      (this.AllSilentAreaDetectionRecord = new Map()),
      (this.kVe = 0),
      (this.FVe = 0),
      (this.CurrentShowLevel = 1),
      (this.VVe = new Map()),
      (this.TypeUnLockMap = new Map()),
      (this.GuideTypeUnLockMap = new Map()),
      (this.HVe = void 0),
      (this.jVe = new Array()),
      (this.tql = new Set([0, 1]));
  }
  get HasInitData() {
    return this.P4l;
  }
  UpdateSilentFirstAwards(e, t = !1) {
    t
      ? this.EVe.set(e, Protocol_1.Aki.Protocol.wks.ovs)
      : this.EVe.set(e, Protocol_1.Aki.Protocol.wks.CM_),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.SilentRewardReceived,
        e,
      );
  }
  OnLeaveLevel() {
    return !0;
  }
  GetSilentFirstAwardById(e) {
    return this.EVe.get(e);
  }
  CheckCanGetFirstAward() {
    for (const e of this.EVe.values())
      if (e === Protocol_1.Aki.Protocol.wks.CM_) return !0;
    return !1;
  }
  CheckCanGetFirstAwardById(e) {
    e = this.EVe.get(e);
    return !!e && e === Protocol_1.Aki.Protocol.wks.CM_;
  }
  CheckCanGetFirstAwardByTypeId(e) {
    for (const r of this.EVe) {
      var t = this.GetSilentAreaDetectData(r[0]);
      if (t.Conf.Secondary === e && r[1] === Protocol_1.Aki.Protocol.wks.CM_)
        return !0;
    }
    return !1;
  }
  GetAdventureGuideTabList() {
    var t =
        ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
          "AdventureGuideView",
        ),
      r = t.length,
      i = [];
    let n = -1;
    var o = this.GetAllTaskFinish();
    for (let e = 0; e < r; e++) {
      var s = t[e];
      o && "AdventureTargetView" === s.ChildViewName
        ? (n = e)
        : this.GetIsTabViewHaveData(s.ChildViewName) &&
          ModelManager_1.ModelManager.FunctionModel.IsOpen(s.FunctionId) &&
          i.push(s);
    }
    return -1 !== n && i.push(t[n]), i;
  }
  GetReceivedChapter() {
    return this.FVe;
  }
  GetNowChapter() {
    return this.kVe;
  }
  GetIsFromManualDetect() {
    return this.qVe;
  }
  SetFromManualDetect(e) {
    this.qVe = e;
  }
  SetNowChapter(e) {
    this.kVe = e;
  }
  SetReceivedChapter(e) {
    this.FVe = e;
  }
  SetTaskById(e, t, r) {
    var i = this.GetTaskRecordById(e);
    i
      ? ((i.Status = t), (i.Progress = r))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("AdventureGuide", 5, "开拓任务id不存在", ["Id", e]);
  }
  GetDetectingMonsterMarkId() {
    return this.LVe;
  }
  GetDetectingDungeonMarkId() {
    return this.DVe;
  }
  GetDetectingSilentAreaMarkId() {
    return this.RVe;
  }
  GetDetectingSlientAreaMarkType() {
    return this.UVe;
  }
  GetCurDetectingMonsterConfId() {
    return this.yVe;
  }
  GetCurDetectingDungeonConfId() {
    return this.IVe;
  }
  GetCurDetectingSilentAreaConfId() {
    return this.TVe;
  }
  GetMonsterDetectData(e) {
    return this.AllMonsterDetectionRecord.get(e);
  }
  GetDetectingMonsterId() {
    return this.AVe;
  }
  SetDetectingMonsterId(e) {
    this.AVe = e;
  }
  SetDetectingDungeonId(e) {
    this.PVe = e;
  }
  GetDetectingDungeonId() {
    return this.PVe;
  }
  SetDetectingSilentAreaId(e) {
    this.xVe = e;
  }
  GetDetectingSilentAreaId() {
    return this.xVe;
  }
  GetPendingMonsterConfId() {
    return this.wVe;
  }
  GetPendingDungeonConfId() {
    return this.BVe;
  }
  GetPendingSilentAreaConfId() {
    return this.bVe;
  }
  GetChapterProgress(e) {
    var e = this.SVe.get(e),
      t = { Received: 0, Total: e.length };
    for (const r of e)
      r.Status >= Protocol_1.Aki.Protocol.Aks.Proto_Received && t.Received++;
    return t;
  }
  GetLevelOfLevelPlay(e) {
    e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(e);
    if (void 0 === e) return 0;
    let t = 0;
    if (e.ReferenceAllEntity)
      for (const n of e.ReferenceAllEntity) {
        var r,
          i = ModelManager_1.ModelManager.CreatureModel.GetEntityData(n);
        void 0 === i
          ? Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("AdventureGuide", 9, "玩法关联实体丢失", [
              "entity ",
              n,
            ])
          : ((r = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(
              i.BlueprintType,
            )),
            (i = (0, IEntity_1.decompressEntityData)(i, r)),
            (r = (0, IComponent_1.getComponent)(
              i.ComponentsData,
              "AttributeComponent",
            )).Level > t && (t = r.Level));
      }
    return t;
  }
  GetCostOfLevelPlay(e) {
    var e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(e);
    return void 0 === e ||
      "None" === (e = e.LevelPlayRewardConfig).Type ||
      "Variable" === e.Type
      ? 0
      : ConfigManager_1.ConfigManager.LevelPlayConfig.GetExchangeRewardInfo(
          e.RewardId,
        ).Cost.get(ENERGYCOST_ID);
  }
  GetPlayLevelPosition(e) {
    (e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(e)),
      (e = ModelManager_1.ModelManager.CreatureModel.GetEntityData(
        e.LevelPlayEntityId,
      ));
    return Vector_1.Vector.Create(
      e.Transform.Pos.X,
      e.Transform.Pos.Y,
      e.Transform.Pos.Z,
    );
  }
  GetSilentAreaDetectData(e) {
    return this.AllSilentAreaDetectionRecord.get(e);
  }
  GetSoundAreaDetectData(e) {
    return this.AllDungeonDetectionRecord.get(e);
  }
  GetAllDetectMonsters() {
    return this.AllMonsterDetectionRecord;
  }
  GetAllDetectDungeons() {
    return this.AllDungeonDetectionRecord;
  }
  GetDungeonRecordsForRedDot(e, t) {
    var r = new Array(),
      e = this.VVe.get(e);
    if (e)
      for (const i of e)
        (t && i.DungeonDetectionRecord.Conf.MatType !== t) ||
          this.IsDetectionPreOpen(i) ||
          i.IsLock ||
          r.push(i);
    return r;
  }
  GetCanShowDungeonRecordsByType(e, t, r = !0) {
    var i = new Array(),
      n = this.VVe.get(e);
    if (n) {
      for (const o of n)
        (t && o.DungeonDetectionRecord.Conf.MatType !== t) ||
          (!this.IsDetectionPreOpen(o) && o.IsLock) ||
          i.push(o);
      r &&
        (6 === e || 62 === e
          ? i.sort((e, t) => {
              (e = e.Conf.SubDungeonId), (t = t.Conf.SubDungeonId);
              return (
                (ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(
                  e,
                )
                  ? 1
                  : 0) -
                (ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(
                  t,
                )
                  ? 1
                  : 0)
              );
            })
          : i.sort((e, t) => {
              var r = this.IsDetectionPreOpen(e) ? 1 : 0,
                i = this.IsDetectionPreOpen(t) ? 1 : 0;
              return r != i
                ? i - r
                : (i = this.IsDetectionNewContentOpen(e) ? 1 : 0) !=
                    (r = this.IsDetectionNewContentOpen(t) ? 1 : 0)
                  ? r - i
                  : (r = e.Conf.SortId) !== (i = t.Conf.SortId)
                    ? i - r
                    : e.Conf.Id - t.Conf.Id;
            }));
    }
    return i;
  }
  GetAllDetectSilentAreas() {
    return this.AllSilentAreaDetectionRecord;
  }
  GetDungeonDetectRecordByEntryId(e) {
    for (const r of this.AllDungeonDetectionRecord.keys()) {
      var t = this.AllDungeonDetectionRecord.get(r);
      if (t.Conf.DungeonId === e) return t;
    }
  }
  GetAllTaskFinish() {
    for (var [, e] of this.SVe)
      for (const t of e)
        if (t.Status !== Protocol_1.Aki.Protocol.Aks.Proto_Received) return !1;
    return !0;
  }
  SetCurDetectingMonsterConfId(e) {
    0 !== this.yVe &&
      (this.AllMonsterDetectionRecord.get(this.yVe).IsTargeting = !1);
    var t = this.AllMonsterDetectionRecord.get(e);
    void 0 !== t && (t.IsTargeting = !0), (this.yVe = e);
  }
  SetDetectingMonsterRefreshTime(e, t) {
    this.AllMonsterDetectionRecord.get(e).RefreshTime = t;
  }
  SetCurDetectingDungeonConfId(e) {
    0 !== this.IVe &&
      (this.AllDungeonDetectionRecord.get(this.IVe).IsTargeting = !1);
    var t = this.AllDungeonDetectionRecord.get(e);
    void 0 !== t && (t.IsTargeting = !0), (this.IVe = e);
  }
  SetCurDetectingMonsterMarkId(e) {
    this.LVe = e;
  }
  SetDetectingDungeonMarkId(e) {
    this.DVe = e;
  }
  SetDetectingSilentAreaMarkId(e, t) {
    (this.RVe = e), (this.UVe = t);
  }
  SetCurDetectingSilentAreaConfId(e) {
    var t = this.AllSilentAreaDetectionRecord.get(this.TVe),
      t =
        (0 !== this.TVe && t && (t.IsTargeting = !1),
        this.AllSilentAreaDetectionRecord.get(e));
    t && (t.IsTargeting = !0), (this.TVe = e);
  }
  GetSilentAreaConfVaild(e) {
    return !!this.AllSilentAreaDetectionRecord.get(e);
  }
  OnInit() {
    return this.InitAdventureTaskConfig(), !0;
  }
  InitDetectionData() {
    var e;
    for (const i of ConfigManager_1.ConfigManager.AdventureModuleConfig.GetAllMonsterDetection())
      this.AllMonsterDetectionRecord.set(
        i.Id,
        new AdventureDefine_1.MonsterDetectionRecord(i, 0 !== i.LockCon, 0),
      );
    for (const n of ConfigManager_1.ConfigManager.AdventureModuleConfig.GetAllDungeonDetection()) {
      var t = new AdventureDefine_1.DungeonDetectionRecord(
        n,
        0 !== n.LockCon,
        0,
      );
      this.AllDungeonDetectionRecord.set(n.Id, t);
      let e = this.VVe.get(n.Secondary);
      e || ((e = []), this.VVe.set(n.Secondary, e));
      t = new AdventureDefine_1.SoundAreaDetectionRecord(0, t);
      e.push(t);
    }
    for (const o of ConfigManager_1.ConfigManager.AdventureModuleConfig.GetAllSilentAreaDetection()) {
      var r = new AdventureDefine_1.SilentAreaDetectionRecord(
        o,
        0 !== o.LockCon,
        0,
      );
      this.AllSilentAreaDetectionRecord.set(o.Id, r);
      let e = this.VVe.get(o.Secondary);
      e || ((e = []), this.VVe.set(o.Secondary, e));
      r = new AdventureDefine_1.SoundAreaDetectionRecord(1, void 0, r);
      e.push(r);
    }
    for ([e] of this.VVe)
      ConfigManager_1.ConfigManager.AdventureModuleConfig?.GetSecondaryGuideDataConf(
        e,
      )?.ConditionGroupId || this.TypeUnLockMap.set(e, !0);
    ControllerHolder_1.ControllerHolder.AdventureGuideController.GetDetectionLabelInfoRequest();
  }
  UpdateByAdventureManualResponse(e) {
    if (e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs)
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        e.Cvs,
        16733,
      );
    else {
      (this.P4l = !0), (this.kVe = e.NMs.wMs), (this.FVe = e.NMs.xMs);
      for (const i of e.NMs.UMs) this.WVe(i);
      for (const n of e.FMs) this.KVe(n);
      if (
        (this.HandleMonsterDetectLockStatus(e.$Ms),
        this.FullUpdateDetectionPreOpenData(1, e.wE_),
        this.FullUpdateDetectionPreOpenData(0, e.LE_),
        this.UpdateDetectionServerConfig(0, e.bE_),
        this.UpdateDetectionServerConfig(1, e.TE_),
        this.EVe.clear(),
        0 !== e.jMs.size)
      )
        for (const o of Object.keys(e.jMs)) {
          var t = e.jMs[o],
            r = Number(o);
          this.EVe.set(r, t),
            t === Protocol_1.Aki.Protocol.wks.CM_ &&
              ControllerHolder_1.ControllerHolder.AdventureGuideController.EmitRedDotFirstAwardEvent(
                r,
              );
        }
    }
  }
  FullUpdateDetectionPreOpenData(e, t) {
    var r = this.U4l.get(e) ?? new Map();
    this.U4l.set(e, r), r.clear();
    for (const i of t) r.set(i.RE_, i);
  }
  UpdateDetectionServerConfig(e, t) {
    var r = this.eql.get(e) ?? new Map();
    this.eql.set(e, r), r.clear();
    for (const i of t) r.set(i.s5n, i);
  }
  HandleMonsterDetectLockStatus(e) {
    let t = !1,
      r = !1;
    for (const s of e.GMs) {
      var i = this.GetMonsterDetectData(s);
      void 0 !== i && (i.IsLock = !1);
    }
    for (const a of e.OMs) {
      var n = this.GetSoundAreaDetectData(a);
      void 0 !== n && ((n.IsLock = !1), (r = !0));
    }
    for (const h of e.kMs) {
      var o = this.GetSilentAreaDetectData(h);
      void 0 !== o && ((o.IsLock = !1), (t = !0));
    }
    t &&
      ControllerHolder_1.ControllerHolder.AdventureGuideController.UpdateAdventureNewSoundAreaTabRedDot(),
      r &&
        ControllerHolder_1.ControllerHolder.AdventureGuideController.UpdateAdventureNewChallengeTabRedDot();
  }
  WVe(t) {
    var r =
      ConfigManager_1.ConfigManager.AdventureModuleConfig.GetAdventureTaskConfig(
        t.s5n,
      );
    if (r) {
      var i = r.ChapterId,
        n = this.SVe.get(i);
      let e = void 0;
      void 0 === n ? ((e = new Array()), this.SVe.set(i, e)) : (e = n);
      i = e.find((e) => e.AdventureTaskBase.Id === t.s5n);
      void 0 !== i
        ? ((i.Progress = t.PMs), (i.Status = t.Y4n))
        : e.push(new AdventureDefine_1.AdventureTaskRecord(r, t.Y4n));
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("AdventureGuide", 5, "找不到id为的开拓任务", [
          "task.Proto_Id",
          t.s5n,
        ]);
  }
  KVe(t) {
    switch (t.h5n) {
      case Protocol_1.Aki.Protocol.r8n.Proto_NormalMonster:
        var r = this.AllMonsterDetectionRecord.get(t.o8n);
        void 0 !== r
          ? r.RefreshTime > t.qMs && (r.RefreshTime = t.qMs)
          : ((r =
              ConfigManager_1.ConfigManager.AdventureModuleConfig.GetMonsterDetectionConfById(
                t.o8n,
              )),
            this.AllMonsterDetectionRecord.set(
              t.o8n,
              new AdventureDefine_1.MonsterDetectionRecord(
                r,
                0 === r.LockCon,
                t.qMs,
              ),
            ));
        break;
      case Protocol_1.Aki.Protocol.r8n.Proto_Dungeon:
        r = this.AllDungeonDetectionRecord.get(t.o8n);
        if (void 0 !== r) r.RefreshTime > t.qMs && (r.RefreshTime = t.qMs);
        else {
          var r =
              ConfigManager_1.ConfigManager.AdventureModuleConfig.GetDungeonDetectionConfById(
                t.o8n,
              ),
            i = new AdventureDefine_1.DungeonDetectionRecord(
              r,
              0 === r.LockCon,
              t.qMs,
            );
          this.AllDungeonDetectionRecord.set(t.o8n, i);
          let e = this.VVe.get(r.Secondary);
          e || ((e = []), this.VVe.set(r.Secondary, e));
          r = new AdventureDefine_1.SoundAreaDetectionRecord(0, i);
          e.push(r);
        }
        break;
      case Protocol_1.Aki.Protocol.r8n.Proto_SilentArea:
        i = this.AllSilentAreaDetectionRecord.get(t.o8n);
        if (void 0 !== i) i.RefreshTime > t.qMs && (i.RefreshTime = t.qMs);
        else {
          (r =
            ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSilentAreaDetectionConfById(
              t.o8n,
            )),
            (i = new AdventureDefine_1.SilentAreaDetectionRecord(
              r,
              0 === r.LockCon,
              t.qMs,
            ));
          this.AllSilentAreaDetectionRecord.set(t.o8n, i),
            this.UpdateDetectSilentAreas(i);
          let e = this.VVe.get(i.Conf.Secondary);
          e || ((e = []), this.VVe.set(i.Conf.Secondary, e));
          r = new AdventureDefine_1.SoundAreaDetectionRecord(1, void 0, i);
          e.push(r);
        }
    }
  }
  GetChapterTasks(e) {
    return this.SVe.get(e);
  }
  SortChapterTasks(e) {
    var t = this.SVe.get(e);
    return (
      t.sort((e, t) => {
        var r =
            e.Status < Protocol_1.Aki.Protocol.Aks.Proto_Received
              ? e.Status
              : -e.Status,
          i =
            t.Status < Protocol_1.Aki.Protocol.Aks.Proto_Received
              ? t.Status
              : -t.Status;
        return r !== i
          ? i - r
          : e.AdventureTaskBase.Id - t.AdventureTaskBase.Id;
      }),
      this.SVe.set(e, t),
      t
    );
  }
  GetTaskRecordById(e, t) {
    let r = void 0;
    if (0 !== t && void 0 !== t) {
      for (const i of (r = this.SVe.get(t)))
        if (i.AdventureTaskBase.Id === e) return i;
    } else
      for (const n of this.SVe.keys())
        for (const o of (r = this.SVe.get(n)))
          if (o.AdventureTaskBase.Id === e) return o;
  }
  InitAdventureTaskConfig() {
    for (const r of ConfigManager_1.ConfigManager.AdventureModuleConfig.GetAllAdventureTaskConfig()) {
      var t = r.ChapterId;
      let e = void 0;
      void 0 === this.SVe.get(t)
        ? ((e = new Array()), this.SVe.set(t, e))
        : (e = this.SVe.get(t)),
        e.push(
          new AdventureDefine_1.AdventureTaskRecord(
            r,
            Protocol_1.Aki.Protocol.Aks.Proto_UnFinish,
          ),
        );
    }
  }
  GetMaxLevelOfBlueprintType(e) {
    var t =
      ModelManager_1.ModelManager.CreatureModel.GetAllEntityIdOfBlueprintType(
        e,
      );
    let r = 0;
    0 === t.length &&
      Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn("AdventureGuide", 9, "未找到实体配置", ["type ", e]);
    for (const n of t) {
      var i = ModelManager_1.ModelManager.CreatureModel.GetEntityData(n);
      void 0 !== i?.ComponentsData &&
        (i = (0, IComponent_1.getComponent)(
          i.ComponentsData,
          "AttributeComponent",
        )).Level > r &&
        (r = i.Level);
    }
    return r;
  }
  GetSilentAreaLevel(e) {
    e = ModelManager_1.ModelManager.CreatureModel.GetEntityData(e);
    if (void 0 !== e?.ComponentsData)
      return (0, IComponent_1.getComponent)(
        e.ComponentsData,
        "AttributeComponent",
      ).Level;
  }
  UpdatePendingMonsterList(e, t) {
    if (0 !== e.length) {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "AdventureGuide",
          5,
          "更新怪物探测信息",
          ["怪物id", e[0].s5n],
          ["探测id", e[0].o8n],
          ["RefreshTime", e[0].qMs],
        ),
        t !== this.GetCurDetectingMonsterConfId() &&
          (this.GVe.clear(), (this.wVe = t));
      for (const i of e) {
        var r = ModelManager_1.ModelManager.CreatureModel.GetEntityData(
            i.s5n,
            i.w7n,
          ).Transform.Pos,
          r = {
            Id: i.s5n,
            RefreshTime: i.qMs,
            MapId: i.w7n,
            PositionX: r.X,
            PositionY: r.Y,
            PositionZ: r.Z,
          };
        this.GVe.set(i.s5n, r);
      }
    }
  }
  UpdatePendingDungeonList(e, t) {
    t !== this.GetCurDetectingDungeonConfId() &&
      (this.NVe.clear(), (this.BVe = t));
    for (const i of e) {
      var r;
      i.BMs
        ? ((r =
            ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(
              i.s5n,
            )),
          (r = ModelManager_1.ModelManager.CreatureModel.GetEntityData(
            r.TeleportEntityConfigId,
            i.w7n,
          )) &&
            ((r = {
              Id: i.s5n,
              RefreshTime: i.qMs,
              MapId: i.w7n,
              PositionX: r.Transform.Pos.X ?? 0,
              PositionY: r.Transform.Pos.Y ?? 0,
              PositionZ: r.Transform.Pos.Z ?? 0,
            }),
            this.NVe.set(i.s5n, r)))
        : this.NVe.delete(i.s5n);
    }
  }
  UpdatePendingSilentAreaList(e, t) {
    t !== this.GetCurDetectingSilentAreaConfId() &&
      (this.OVe.clear(), (this.bVe = t));
    for (const i of e) {
      var r;
      i.BMs
        ? void 0 !==
            (r = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(
              i.s5n,
            )) &&
          ((r = ModelManager_1.ModelManager.CreatureModel.GetEntityData(
            r.LevelPlayEntityId,
            i.w7n,
          ).Transform.Pos),
          (r = {
            Id: i.s5n,
            RefreshTime: i.qMs,
            MapId: i.w7n,
            PositionX: r.X,
            PositionY: r.Y,
            PositionZ: r.Z,
          }),
          this.OVe.set(i.s5n, r))
        : this.OVe.delete(i.s5n);
    }
  }
  GetMonsterPendingList() {
    return this.GVe;
  }
  GetDungeonPendingList() {
    return this.NVe;
  }
  GetSilentAreaPendingList() {
    return this.OVe;
  }
  IsTaskOfChapter(e, t) {
    return this.GetTaskRecordById(e).AdventureTaskBase.ChapterId === t;
  }
  CleanCurTrackingMonster() {
    var e = this.GetMonsterDetectData(this.yVe);
    e && (e.IsTargeting = !1),
      this.SetCurDetectingMonsterConfId(0),
      this.SetCurDetectingMonsterMarkId(0),
      this.SetDetectingMonsterId(0);
  }
  CleanCurTrackingDungeon() {
    var e = this.GetSoundAreaDetectData(this.IVe);
    e && (e.IsTargeting = !1),
      this.SetCurDetectingDungeonConfId(0),
      this.SetDetectingDungeonMarkId(0),
      this.SetDetectingDungeonId(0);
  }
  CleanCurTrackingSilentArea() {
    var e = this.GetSilentAreaDetectData(this.TVe);
    e && (e.IsTargeting = !1),
      this.SetCurDetectingSilentAreaConfId(0),
      this.SetDetectingSilentAreaMarkId(0),
      this.SetDetectingSilentAreaId(0);
  }
  GetAllCulledMonsters() {
    var e;
    return (
      this.HVe ||
        ((e =
          MonsterDetectionFilterAll_1.configMonsterDetectionFilterAll.GetConfigList()),
        (this.HVe = e ? new Set(e.map((e) => e.EntityConfigId)) : new Set())),
      this.HVe
    );
  }
  CheckTargetDungeonTypeCanShow(e) {
    return this.TypeUnLockMap.get(e);
  }
  GetAllCanShowDungeonTypeList(e, t = !0) {
    let r = void 0;
    var i,
      n,
      e = e || this.CurrentGuideTabName,
      o = ((r = "NewSoundAreaView" === e ? 3 : 2), new Array());
    for ([i, n] of this.VVe) {
      var s = n[0];
      (0 === s.Type && s.DungeonDetectionRecord.Conf.GuideId !== r) ||
        (1 === s.Type && s.SilentAreaDetectionRecord.Conf.GuideId !== r) ||
        (this.CheckTargetDungeonTypeCanShow(i) && o.push(i));
    }
    return t
      ? o.sort(
          (e, t) =>
            ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataConf(
              e,
            ).SortNumber -
            ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataConf(
              t,
            ).SortNumber,
        )
      : o;
  }
  GetIsTabViewHaveData(e) {
    let t = void 0;
    if (
      ("NewSoundAreaView" === e
        ? (t = 3)
        : "DisposableChallengeView" === e && (t = 2),
      !t)
    )
      return !0;
    for (var [r, i] of this.VVe) {
      i = i[0];
      if (
        !(
          (0 === i.Type && i.DungeonDetectionRecord.Conf.GuideId !== t) ||
          (1 === i.Type && i.SilentAreaDetectionRecord.Conf.GuideId !== t)
        ) &&
        this.CheckTargetDungeonTypeCanShow(r)
      )
        return !0;
    }
    return !1;
  }
  get DetectionSilentAreasDataList() {
    return this.jVe;
  }
  InitAllDetectSilentAreasList() {
    var e = new Map();
    for (const n of this.AllSilentAreaDetectionRecord.values()) {
      var t = e.get(n.Conf.Secondary);
      t ? t.push(n) : ((t = new Array()).push(n), e.set(n.Conf.Secondary, t));
    }
    for (const o of e.values())
      o.sort(AdventureGuideController_1.silentAreasSortFunc);
    for (const s of Array.from(e.keys()).sort((e, t) => t - e)) {
      var r = e.get(s);
      if (0 !== r.length) {
        var i = r[0].Conf.DangerType;
        for (const a of r)
          this.jVe.push({
            IsShow: !1,
            DangerType: i,
            SilentAreaDetectionData: a,
            SilentAreaTitleData: void 0,
          });
      }
    }
  }
  UpdateDetectSilentAreas(e) {
    for (const t of this.jVe)
      if (
        t.SilentAreaDetectionData &&
        t.SilentAreaDetectionData.Conf.Id === e.Conf.Id
      ) {
        t.SilentAreaDetectionData = e;
        break;
      }
  }
  GetShowSilentAreasList(e, t, r) {
    if (void 0 !== t) {
      var i = t;
      for (const o of this.jVe) this.XVe(e, o, i);
    } else if (void 0 !== r) {
      var n = this.GetSilentAreaDetectData(r);
      if (n) for (const s of this.jVe) this.XVe(e, s, n.Conf.Secondary);
    } else for (const a of this.jVe) this.XVe(e, a, void 0);
  }
  XVe(e, t, r) {
    e.push(t);
  }
  CheckShowDoubleRewardRedDot() {
    var e;
    return (
      !!ActivityDoubleRewardController_1.ActivityDoubleRewardController.HasAnyDoubleRewardActivityShowing() &&
      (!(e = LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey
          .RedDotAdventureNewSoundAreaTabLastUpdateTime,
      )) ||
        e < TimeUtil_1.TimeUtil.GetCurrentCrossDayStamp())
    );
  }
  CheckRedDotAdventureNewSoundAreaTab() {
    if (this.CheckShowDoubleRewardRedDot()) return !0;
    for (const e of this.GetAllCanShowDungeonTypeList("NewSoundAreaView", !1))
      if (this.CheckRedDotSecondary(e)) return !0;
    return !1;
  }
  CheckRedDotChallengeTab() {
    for (const e of this.GetAllCanShowDungeonTypeList(
      "DisposableChallengeView",
      !1,
    ))
      if (this.CheckRedDotSecondary(e)) return !0;
    return !1;
  }
  CheckRedDotSecondary(e) {
    for (const t of this.GetDungeonRecordsForRedDot(e, void 0))
      if (this.CheckRedDotDetectionItemByRecord(t)) return !0;
    return !1;
  }
  CheckRedDotDetectionItemByRecord(e) {
    var t = e.Conf;
    return !(
      !t ||
      !t.LockCon ||
      e.IsLock ||
      !0 === this.DetectionRedDotRecord?.get(t.Id) ||
      this.IsDetectionFinished(e)
    );
  }
  IsDetectionFinished(e) {
    var t = e.Conf.Secondary;
    return 61 === t
      ? ModelManager_1.ModelManager.LordGymModel.GetGymEntranceAllFinish(
          e.Conf.AdditionalId,
        )
      : (6 === t || 62 === t) &&
          ((t = e.Conf.SubDungeonId),
          ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(t));
  }
  RecordAllDetectionBySecondary(e) {
    for (const t of this.GetDungeonRecordsForRedDot(e, void 0))
      this.CheckRedDotDetectionItemByRecord(t) && this.RecordDetection(t);
  }
  RecordDetection(e) {
    e = e.Conf.Id;
    this.DetectionRedDotRecord &&
      !this.DetectionRedDotRecord.has(e) &&
      (this.DetectionRedDotRecord.set(e, !0),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.DetectionRedDotRecord,
        this.DetectionRedDotRecord,
      ));
  }
  IsDetectionTypeAllowPreOpen(e) {
    return this.tql.has(e);
  }
  IsDetectionPreOpen(e) {
    if (!this.IsDetectionTypeAllowPreOpen(e.Type)) return !1;
    var t = this.GetPreOpenDetectionConf(e.Conf.Id, e.Type, e.Conf.PreOpenId);
    if (void 0 === t) return !1;
    var r = t.ConditionGroup;
    let i = !0;
    0 < r &&
      (i =
        !ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
          r.toString(),
          void 0,
        ));
    var r = this.U4l.get(e.Type)?.get(t.Id);
    let n = !1;
    return (
      r &&
        ((e = MathUtils_1.MathUtils.LongToNumber(r.AE_)),
        (t = MathUtils_1.MathUtils.LongToNumber(r.PE_)),
        e <= (r = TimeUtil_1.TimeUtil.GetServerTimeStamp())) &&
        r <= t &&
        (n = !0),
      i && n
    );
  }
  IsDetectionNewContentOpen(e) {
    var t,
      e = this.eql.get(e.Type)?.get(e.Conf.Id);
    let r = !1;
    return (r =
      e &&
      ((t = MathUtils_1.MathUtils.LongToNumber(e.xE_)),
      (e = MathUtils_1.MathUtils.LongToNumber(e.UE_)),
      t <= (t = TimeUtil_1.TimeUtil.GetServerTimeStamp())) &&
      t <= e
        ? !0
        : r);
  }
  GetPreOpenDetectionConf(e, t, r) {
    var e =
        ConfigManager_1.ConfigManager.AdventureModuleConfig.GetPreOpenDetectionConfList(
          e,
          t,
          r,
        ),
      i = this.U4l.get(t);
    for (const n of e) if (i?.get(n.Id)) return n;
  }
}
exports.AdventureGuideModel = AdventureGuideModel;
//# sourceMappingURL=AdventureGuideModel.js.map
