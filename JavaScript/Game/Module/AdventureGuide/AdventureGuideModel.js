"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdventureGuideModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  MonsterDetectionFilterAll_1 = require("../../../Core/Define/ConfigQuery/MonsterDetectionFilterAll"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  IEntity_1 = require("../../../UniverseEditor/Interface/IEntity"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  AdventureDefine_1 = require("./AdventureDefine"),
  AdventureGuideController_1 = require("./AdventureGuideController"),
  ENERGYCOST_ID = 5;
class AdventureGuideModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.a5e = new Map()),
      (this.CurrentGuideTabName = void 0),
      (this.h5e = new Map()),
      (this.l5e = 0),
      (this._5e = 0),
      (this.u5e = 0),
      (this.c5e = 0),
      (this.m5e = 0),
      (this.d5e = 0),
      (this.C5e = void 0),
      (this.g5e = 0),
      (this.f5e = 0),
      (this.p5e = 0),
      (this.v5e = 0),
      (this.M5e = 0),
      (this.S5e = 0),
      (this.E5e = !1),
      (this.CurrentMonsterId = 0),
      (this.CurrentSilentId = 0),
      (this.y5e = new Map()),
      (this.I5e = new Map()),
      (this.T5e = new Map()),
      (this.AllMonsterDetectionRecord = new Map()),
      (this.AllDungeonDetectionRecord = new Map()),
      (this.AllSilentAreaDetectionRecord = new Map()),
      (this.L5e = 0),
      (this.D5e = 0),
      (this.R5e = new Map()),
      (this.TypeUnLockMap = new Map()),
      (this.GuideTypeUnLockMap = new Map()),
      (this.U5e = void 0),
      (this.A5e = new Array());
  }
  UpdateSilentFirstAwards(e, t = !1) {
    t
      ? this.a5e.set(e, Protocol_1.Aki.Protocol.GBs.qms)
      : this.a5e.set(e, Protocol_1.Aki.Protocol.GBs.Proto_IsFinish),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.SilentRewardReceived,
        e,
      );
  }
  OnLeaveLevel() {
    return (
      ControllerHolder_1.ControllerHolder.AdventureGuideController.CancelDetectingRequest(),
      !0
    );
  }
  GetSilentFirstAwardById(e) {
    return this.a5e.get(e);
  }
  CheckCanGetFirstAward() {
    for (const e of this.a5e.values())
      if (e === Protocol_1.Aki.Protocol.GBs.Proto_IsFinish) return !0;
    return !1;
  }
  CheckCanGetFirstAwardById(e) {
    e = this.a5e.get(e);
    return !!e && e === Protocol_1.Aki.Protocol.GBs.Proto_IsFinish;
  }
  CheckCanGetFirstAwardByTypeId(e) {
    for (const r of this.a5e) {
      var t = this.GetSilentAreaDetectData(r[0]);
      if (
        t.Conf.Secondary === e &&
        r[1] === Protocol_1.Aki.Protocol.GBs.Proto_IsFinish
      )
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
    return this.D5e;
  }
  GetNowChapter() {
    return this.L5e;
  }
  GetIsFromManualDetect() {
    return this.E5e;
  }
  SetFromManualDetect(e) {
    this.E5e = e;
  }
  SetNowChapter(e) {
    this.L5e = e;
  }
  SetReceivedChapter(e) {
    this.D5e = e;
  }
  SetTaskById(e, t, r) {
    var i = this.GetTaskRecordById(e);
    i
      ? ((i.Status = t), (i.Progress = r))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("AdventureGuide", 5, "开拓任务id不存在", ["Id", e]);
  }
  GetDetectingMonsterMarkId() {
    return this.c5e;
  }
  GetDetectingDungeonMarkId() {
    return this.m5e;
  }
  GetDetectingSilentAreaMarkId() {
    return this.d5e;
  }
  GetDetectingSlientAreaMarkType() {
    return this.C5e;
  }
  GetCurDetectingMonsterConfId() {
    return this.l5e;
  }
  GetCurDetectingDungeonConfId() {
    return this._5e;
  }
  GetCurDetectingSilentAreaConfId() {
    return this.u5e;
  }
  GetMonsterDetectData(e) {
    return this.AllMonsterDetectionRecord.get(e);
  }
  GetDetectingMonsterId() {
    return this.g5e;
  }
  SetDetectingMonsterId(e) {
    this.g5e = e;
  }
  SetDetectingDungeonId(e) {
    this.f5e = e;
  }
  GetDetectingDungeonId() {
    return this.f5e;
  }
  SetDetectingSilentAreaId(e) {
    this.p5e = e;
  }
  GetDetectingSilentAreaId() {
    return this.p5e;
  }
  GetPendingMonsterConfId() {
    return this.v5e;
  }
  GetPendingDungeonConfId() {
    return this.M5e;
  }
  GetPendingSilentAreaConfId() {
    return this.S5e;
  }
  GetChapterProgress(e) {
    var e = this.h5e.get(e),
      t = { Received: 0, Total: e.length };
    for (const r of e)
      r.Status >= Protocol_1.Aki.Protocol.bBs.Proto_Received && t.Received++;
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
            Log_1.Log.Warn("AdventureGuide", 10, "玩法关联实体丢失", [
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
  GetCanShowDungeonRecordsByType(e, t) {
    var r = new Array(),
      e = this.R5e.get(e);
    if (e)
      for (const i of e)
        (t && i.DungeonDetectionRecord.Conf.MatType !== t) ||
          i.IsLock ||
          r.push(i);
    return r;
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
    for (var [, e] of this.h5e)
      for (const t of e)
        if (t.Status !== Protocol_1.Aki.Protocol.bBs.Proto_Received) return !1;
    return !0;
  }
  SetCurDetectingMonsterConfId(e) {
    0 !== this.l5e &&
      (this.AllMonsterDetectionRecord.get(this.l5e).IsTargeting = !1);
    var t = this.AllMonsterDetectionRecord.get(e);
    void 0 !== t && (t.IsTargeting = !0), (this.l5e = e);
  }
  SetDetectingMonsterRefreshTime(e, t) {
    this.AllMonsterDetectionRecord.get(e).RefreshTime = t;
  }
  SetCurDetectingDungeonConfId(e) {
    0 !== this._5e &&
      (this.AllDungeonDetectionRecord.get(this._5e).IsTargeting = !1);
    var t = this.AllDungeonDetectionRecord.get(e);
    void 0 !== t && (t.IsTargeting = !0), (this._5e = e);
  }
  SetCurDetectingMonsterMarkId(e) {
    this.c5e = e;
  }
  SetDetectingDungeonMarkId(e) {
    this.m5e = e;
  }
  SetDetectingSilentAreaMarkId(e, t) {
    (this.d5e = e), (this.C5e = t);
  }
  SetCurDetectingSilentAreaConfId(e) {
    var t = this.AllSilentAreaDetectionRecord.get(this.u5e),
      t =
        (0 !== this.u5e && t && (t.IsTargeting = !1),
        this.AllSilentAreaDetectionRecord.get(e));
    t && (t.IsTargeting = !0), (this.u5e = e);
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
      let e = this.R5e.get(n.Secondary);
      e || ((e = []), this.R5e.set(n.Secondary, e));
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
      let e = this.R5e.get(o.Secondary);
      e || ((e = []), this.R5e.set(o.Secondary, e));
      r = new AdventureDefine_1.SoundAreaDetectionRecord(1, void 0, r);
      e.push(r);
    }
    for ([e] of this.R5e)
      ConfigManager_1.ConfigManager.AdventureModuleConfig?.GetSecondaryGuideDataConf(
        e,
      )?.ConditionGroupId || this.TypeUnLockMap.set(e, !0);
    ControllerHolder_1.ControllerHolder.AdventureGuideController.GetDetectionLabelInfoRequest();
  }
  UpdateByAdventureManualResponse(e) {
    if (e.Kms !== Protocol_1.Aki.Protocol.lkn.Sys)
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        e.Kms,
        28834,
      );
    else {
      (this.L5e = e.ggs.hgs), (this.D5e = e.ggs.lgs);
      for (const i of e.ggs.ags) this.P5e(i);
      for (const n of e.fgs) this.x5e(n);
      if (
        (this.HandleMonsterDetectLockStatus(e.pgs),
        this.a5e.clear(),
        0 !== e.Sgs.size)
      )
        for (const o of Object.keys(e.Sgs)) {
          var t = e.Sgs[o],
            r = Number(o);
          this.a5e.set(r, t),
            t === Protocol_1.Aki.Protocol.GBs.Proto_IsFinish &&
              ControllerHolder_1.ControllerHolder.AdventureGuideController.EmitRedDotFirstAwardEvent(
                r,
              );
        }
    }
  }
  HandleMonsterDetectLockStatus(e) {
    for (const n of e.dgs) {
      var t = this.GetMonsterDetectData(n);
      void 0 !== t && (t.IsLock = !1);
    }
    for (const o of e.mgs) {
      var r = this.GetSoundAreaDetectData(o);
      void 0 !== r && (r.IsLock = !1);
    }
    for (const s of e.Cgs) {
      var i = this.GetSilentAreaDetectData(s);
      void 0 !== i && (i.IsLock = !1);
    }
  }
  P5e(t) {
    var r =
      ConfigManager_1.ConfigManager.AdventureModuleConfig.GetAdventureTaskConfig(
        t.Ekn,
      );
    if (r) {
      var i = r.ChapterId,
        n = this.h5e.get(i);
      let e = void 0;
      void 0 === n ? ((e = new Array()), this.h5e.set(i, e)) : (e = n);
      i = e.find((e) => e.AdventureTaskBase.Id === t.Ekn);
      void 0 !== i
        ? ((i.Progress = t.sgs), (i.Status = t.ckn))
        : e.push(new AdventureDefine_1.AdventureTaskRecord(r, t.ckn));
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("AdventureGuide", 5, "找不到id为的开拓任务", [
          "task.Proto_Id",
          t.Ekn,
        ]);
  }
  x5e(t) {
    switch (t.Ikn) {
      case Protocol_1.Aki.Protocol.d3n.Proto_NormalMonster:
        var r = this.AllMonsterDetectionRecord.get(t.C3n);
        void 0 !== r
          ? r.RefreshTime > t.cgs && (r.RefreshTime = t.cgs)
          : ((r =
              ConfigManager_1.ConfigManager.AdventureModuleConfig.GetMonsterDetectionConfById(
                t.C3n,
              )),
            this.AllMonsterDetectionRecord.set(
              t.C3n,
              new AdventureDefine_1.MonsterDetectionRecord(
                r,
                0 === r.LockCon,
                t.cgs,
              ),
            ));
        break;
      case Protocol_1.Aki.Protocol.d3n.Proto_Dungeon:
        r = this.AllDungeonDetectionRecord.get(t.C3n);
        if (void 0 !== r) r.RefreshTime > t.cgs && (r.RefreshTime = t.cgs);
        else {
          var r =
              ConfigManager_1.ConfigManager.AdventureModuleConfig.GetDungeonDetectionConfById(
                t.C3n,
              ),
            i = new AdventureDefine_1.DungeonDetectionRecord(
              r,
              0 === r.LockCon,
              t.cgs,
            );
          this.AllDungeonDetectionRecord.set(t.C3n, i);
          let e = this.R5e.get(r.Secondary);
          e || ((e = []), this.R5e.set(r.Secondary, e));
          r = new AdventureDefine_1.SoundAreaDetectionRecord(0, i);
          e.push(r);
        }
        break;
      case Protocol_1.Aki.Protocol.d3n.Proto_SilentArea:
        i = this.AllSilentAreaDetectionRecord.get(t.C3n);
        if (void 0 !== i) i.RefreshTime > t.cgs && (i.RefreshTime = t.cgs);
        else {
          (r =
            ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSilentAreaDetectionConfById(
              t.C3n,
            )),
            (i = new AdventureDefine_1.SilentAreaDetectionRecord(
              r,
              0 === r.LockCon,
              t.cgs,
            ));
          this.AllSilentAreaDetectionRecord.set(t.C3n, i),
            this.UpdateDetectSilentAreas(i);
          let e = this.R5e.get(i.Conf.Secondary);
          e || ((e = []), this.R5e.set(i.Conf.Secondary, e));
          r = new AdventureDefine_1.SoundAreaDetectionRecord(1, void 0, i);
          e.push(r);
        }
    }
  }
  GetChapterTasks(e) {
    return this.h5e.get(e);
  }
  SortChapterTasks(e) {
    var t = this.h5e.get(e);
    return (
      t.sort((e, t) => {
        var r =
            e.Status < Protocol_1.Aki.Protocol.bBs.Proto_Received
              ? e.Status
              : -e.Status,
          i =
            t.Status < Protocol_1.Aki.Protocol.bBs.Proto_Received
              ? t.Status
              : -t.Status;
        return r !== i
          ? i - r
          : e.AdventureTaskBase.Id - t.AdventureTaskBase.Id;
      }),
      this.h5e.set(e, t),
      t
    );
  }
  GetTaskRecordById(e, t) {
    let r = void 0;
    if (0 !== t && void 0 !== t) {
      for (const i of (r = this.h5e.get(t)))
        if (i.AdventureTaskBase.Id === e) return i;
    } else
      for (const n of this.h5e.keys())
        for (const o of (r = this.h5e.get(n)))
          if (o.AdventureTaskBase.Id === e) return o;
  }
  InitAdventureTaskConfig() {
    for (const r of ConfigManager_1.ConfigManager.AdventureModuleConfig.GetAllAdventureTaskConfig()) {
      var t = r.ChapterId;
      let e = void 0;
      void 0 === this.h5e.get(t)
        ? ((e = new Array()), this.h5e.set(t, e))
        : (e = this.h5e.get(t)),
        e.push(
          new AdventureDefine_1.AdventureTaskRecord(
            r,
            Protocol_1.Aki.Protocol.bBs.Proto_UnFinish,
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
      Log_1.Log.Warn("AdventureGuide", 10, "未找到实体配置", ["type ", e]);
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
          ["怪物id", e[0].Ekn],
          ["探测id", e[0].C3n],
          ["RefreshTime", e[0].cgs],
        ),
        t !== this.GetCurDetectingMonsterConfId() &&
          (this.y5e.clear(), (this.v5e = t));
      for (const i of e) {
        var r = ModelManager_1.ModelManager.CreatureModel.GetEntityData(i.Ekn)
            .Transform.Pos,
          r = {
            Id: i.Ekn,
            RefreshTime: i.cgs,
            PositionX: r.X,
            PositionY: r.Y,
            PositionZ: r.Z,
          };
        this.y5e.set(i.Ekn, r);
      }
    }
  }
  UpdatePendingDungeonList(e, t) {
    t !== this.GetCurDetectingDungeonConfId() &&
      (this.I5e.clear(), (this.M5e = t));
    for (const i of e) {
      var r;
      i.ugs
        ? ((r =
            ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(
              i.Ekn,
            )),
          (r = ModelManager_1.ModelManager.CreatureModel.GetEntityData(
            r.TeleportEntityConfigId,
          )) &&
            ((r = {
              Id: i.Ekn,
              RefreshTime: i.cgs,
              PositionX: r.Transform.Pos.X ?? 0,
              PositionY: r.Transform.Pos.Y ?? 0,
              PositionZ: r.Transform.Pos.Z ?? 0,
            }),
            this.I5e.set(i.Ekn, r)))
        : this.I5e.delete(i.Ekn);
    }
  }
  UpdatePendingSilentAreaList(e, t) {
    t !== this.GetCurDetectingSilentAreaConfId() &&
      (this.T5e.clear(), (this.S5e = t));
    for (const i of e) {
      var r;
      i.ugs
        ? void 0 !==
            (r = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(
              i.Ekn,
            )) &&
          ((r = ModelManager_1.ModelManager.CreatureModel.GetEntityData(
            r.LevelPlayEntityId,
          ).Transform.Pos),
          (r = {
            Id: i.Ekn,
            RefreshTime: i.cgs,
            PositionX: r.X,
            PositionY: r.Y,
            PositionZ: r.Z,
          }),
          this.T5e.set(i.Ekn, r))
        : this.T5e.delete(i.Ekn);
    }
  }
  GetMonsterPendingList() {
    return this.y5e;
  }
  GetDungeonPendingList() {
    return this.I5e;
  }
  GetSilentAreaPendingList() {
    return this.T5e;
  }
  IsTaskOfChapter(e, t) {
    return this.GetTaskRecordById(e).AdventureTaskBase.ChapterId === t;
  }
  CleanCurTrackingMonster() {
    var e = this.GetMonsterDetectData(this.l5e);
    e && (e.IsTargeting = !1),
      this.SetCurDetectingMonsterConfId(0),
      this.SetCurDetectingMonsterMarkId(0),
      this.SetDetectingMonsterId(0);
  }
  CleanCurTrackingDungeon() {
    var e = this.GetSoundAreaDetectData(this._5e);
    e && (e.IsTargeting = !1),
      this.SetCurDetectingDungeonConfId(0),
      this.SetDetectingDungeonMarkId(0),
      this.SetDetectingDungeonId(0);
  }
  CleanCurTrackingSilentArea() {
    var e = this.GetSilentAreaDetectData(this.u5e);
    e && (e.IsTargeting = !1),
      this.SetCurDetectingSilentAreaConfId(0),
      this.SetDetectingSilentAreaMarkId(0),
      this.SetDetectingSilentAreaId(0);
  }
  GetAllCulledMonsters() {
    var e;
    return (
      this.U5e ||
        ((e =
          MonsterDetectionFilterAll_1.configMonsterDetectionFilterAll.GetConfigList()),
        (this.U5e = e ? new Set(e.map((e) => e.EntityConfigId)) : new Set())),
      this.U5e
    );
  }
  CheckTargetDungeonTypeCanShow(e) {
    return this.TypeUnLockMap.get(e);
  }
  GetAllCanShowDungeonTypeList() {
    let e = void 0;
    e = "NewSoundAreaView" === this.CurrentGuideTabName ? 3 : 2;
    var t,
      r,
      i = new Array();
    for ([t, r] of this.R5e) {
      var n = r[0];
      (0 === n.Type && n.DungeonDetectionRecord.Conf.GuideId !== e) ||
        (1 === n.Type && n.SilentAreaDetectionRecord.Conf.GuideId !== e) ||
        (this.CheckTargetDungeonTypeCanShow(t) && i.push(t));
    }
    return i.sort(
      (e, t) =>
        ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataConf(
          e,
        ).SortNumber -
        ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataConf(
          t,
        ).SortNumber,
    );
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
    for (var [r, i] of this.R5e) {
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
    return this.A5e;
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
          this.A5e.push({
            IsShow: !1,
            DangerType: i,
            SilentAreaDetectionData: a,
            SilentAreaTitleData: void 0,
          });
      }
    }
  }
  UpdateDetectSilentAreas(e) {
    for (const t of this.A5e)
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
      for (const o of this.A5e) this.B5e(e, o, i);
    } else if (void 0 !== r) {
      var n = this.GetSilentAreaDetectData(r);
      if (n) for (const s of this.A5e) this.B5e(e, s, n.Conf.Secondary);
    } else for (const a of this.A5e) this.B5e(e, a, void 0);
  }
  B5e(e, t, r) {
    e.push(t);
  }
}
exports.AdventureGuideModel = AdventureGuideModel;
//# sourceMappingURL=AdventureGuideModel.js.map
