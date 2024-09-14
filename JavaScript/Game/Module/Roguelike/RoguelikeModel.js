"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  StateRef_1 = require("../../../Core/Utils/Audio/StateRef"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ActivityRogueController_1 = require("../Activity/ActivityContent/RougeActivity/ActivityRogueController"),
  RoguelikeChooseData_1 = require("./Define/RoguelikeChooseData"),
  RoguelikeDefine_1 = require("./Define/RoguelikeDefine");
class RoguelikeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Rao = void 0),
      (this.Uao = 0),
      (this.Aao = void 0),
      (this.Pao = 0),
      (this.xao = 0),
      (this.wao = void 0),
      (this.Bao = new StateRef_1.StateRef("game_rogue_room_type", "none")),
      (this.bao = void 0),
      (this.qao = new Map()),
      (this.Gao = new Map()),
      (this.Nao = new Map()),
      (this.TempCountdown = void 0),
      (this.ShowRewardList = void 0),
      (this.CurrSeasonData = void 0),
      (this.CurDungeonId = void 0),
      (this.Oao = 0),
      (this.SelectSkillId = 0),
      (this.SelectRoleViewShowRoleList = []),
      (this.SelectRoleViewRecommendRoleList = []);
  }
  OnInit() {
    return !0;
  }
  OnClear() {
    return this.qao.clear(), !(this.Rao = void 0);
  }
  get EditFormationRoleList() {
    return this.bao;
  }
  set EditFormationRoleList(e) {
    this.bao = e;
  }
  get CurIndex() {
    return this.Uao;
  }
  set CurIndex(e) {
    this.Uao = e;
  }
  get CurrentRogueGainEntry() {
    return this.Aao;
  }
  set CurrentRogueGainEntry(e) {
    this.Aao = e;
  }
  get RogueInfo() {
    return this.Rao;
  }
  set RogueInfo(e) {
    this.Rao = e;
  }
  get CurRoomCount() {
    return this.Pao;
  }
  set CurRoomCount(e) {
    this.Pao = e;
  }
  get TotalRoomCount() {
    return this.xao;
  }
  set TotalRoomCount(e) {
    this.xao = e;
  }
  get CurRoomType() {
    return this.wao;
  }
  set CurRoomType(e) {
    this.wao = e;
  }
  get CurRoomMusicState() {
    return this.Bao.State;
  }
  set CurRoomMusicState(e) {
    this.Bao.State = e ?? "none";
  }
  get RoguelikeSkillDataMap() {
    return this.Gao;
  }
  get RoguelikeCurrencyDictMap() {
    return this.Nao;
  }
  SetRoguelikeSkillData(e, t) {
    this.Gao.set(e, t);
  }
  SetRoguelikeCurrency(e, t) {
    this.Nao.set(e, t);
  }
  UpdateRoguelikeCurrency(e, t) {
    var o = this.GetRoguelikeCurrency(e);
    this.Nao.set(e, o + t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnPlayerCurrencyChange,
        e,
      );
  }
  GetRoguelikeCurrency(e) {
    return this.Nao.get(e) ?? 0;
  }
  UpdateDescModel(e) {
    (this.Oao = e ? 0 : 1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RoguelikeDataUpdate,
      );
  }
  GetDescModel() {
    return this.Oao;
  }
  SetRoguelikeChooseData(e) {
    for (const t of e)
      this.qao.set(t.c5n, new RoguelikeChooseData_1.RoguelikeChooseData(t));
  }
  GetRoguelikeChooseDataById(e) {
    e = this.qao.get(e);
    return (
      e?.Layer !== this.CurRoomCount &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Roguelike",
          9,
          "肉鸽界面数据异常!",
          ["InstId", ModelManager_1.ModelManager.CreatureModel.GetInstanceId()],
          ["Layer", this.CurRoomCount],
          ["dataLayer", e?.Layer],
        ),
      e
    );
  }
  GetSortElementInfoArrayMap(e = void 0) {
    var t,
      o,
      r,
      i = new Map();
    for ([t, o] of this.RogueInfo.ElementDict) 9 !== t && i.set(t, o);
    if (e)
      for (var [n, a] of e) 9 !== n && ((r = i.get(n) ?? 0), i.set(n, r + a));
    var u,
      s,
      g = new Array(),
      l = new Map();
    for ([u, s] of i) {
      var h = new RoguelikeDefine_1.ElementInfo(Number(u), s);
      e && (h.IsPreview = 0 < (e.get(u) ?? 0)),
        g.push(h),
        l.set(h.ElementId, h);
    }
    return g.sort((e, t) => t.Count - e.Count), [g, l];
  }
  CheckInRoguelike() {
    return (
      15 ===
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
          ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
        )?.InstSubType &&
      ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
    );
  }
  CheckIsGuideDungeon() {
    var e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon,
      t = this.GetParamConfigBySeasonId();
    return !(!t || !e || !t.GuideInstArray) && t.GuideInstArray.includes(e.Id);
  }
  CheckIsGuideDungeonFinish() {
    return (
      ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData()?.GetPreGuideQuestFinishState() ??
      !1
    );
  }
  CheckHasCanUnlockSkill() {
    let o = !1;
    const r = this.GetRoguelikeCurrency(RoguelikeDefine_1.SKILL_POINT_ID);
    return (
      this.RoguelikeSkillDataMap.forEach((e, t) => {
        0 === e &&
          (ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueTalentTreeById(
            t,
          )).Consule[0] <= r &&
          (o = !0);
      }),
      o && this.CheckIsGuideDungeonFinish()
    );
  }
  CheckRoguelikeShopRedDot() {
    var e,
      t,
      o,
      r =
        ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData();
    return (
      !!r &&
      !!(e = ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData) &&
      !!(e =
        ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(
          e.UHn,
        )) &&
      ((r = r.GetRogueActivityState()),
      (t = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabIdList(
        e.ShopId,
      )),
      (e = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(
        e.ShopId,
        t[0],
      )),
      0 === r
        ? !LocalStorage_1.LocalStorage.GetPlayer(
            LocalStorageDefine_1.ELocalStoragePlayerKey.RoguelikeShopRecord,
          ) &&
          this.CheckIsGuideDungeonFinish() &&
          0 < e.length
        : 1 === r &&
          ((t =
            LocalStorage_1.LocalStorage.GetPlayer(
              LocalStorageDefine_1.ELocalStoragePlayerKey
                .RoguelikeShopNextTimeStamp,
            ) ?? 0),
          (r = Time_1.Time.ServerTimeStamp),
          (o =
            ModelManager_1.ModelManager.InventoryModel?.GetItemCountByConfigId(
              RoguelikeDefine_1.OUTSIDE_CURRENCY_ID,
            ) ?? 0),
          t < r) &&
          0 < o &&
          0 < e.length)
    );
  }
  GetMapNoteShowState() {
    if (
      !ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData()
    )
      return !1;
    var e = ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData;
    if (!e) return !1;
    e = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(
      e.UHn,
    );
    if (!e) return !1;
    e = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig?.GetConfig(
      e.InstanceDungeonEntrance,
    );
    if (!e) return !1;
    let t = !1;
    return (
      e.InstanceDungeonList.forEach((e) => {
        !ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(e) &&
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel?.CheckInstanceUnlock(
            e,
          ) &&
          (t = !0);
      }),
      t
    );
  }
  RecordRoguelikeShopRedDot(e) {
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.RoguelikeShopRecord,
      e,
    );
  }
  GetRoguelikeAchievementRedDot() {
    var e = ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData;
    return (
      void 0 !== e &&
      ((e =
        ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(
          e.UHn,
        )),
      ModelManager_1.ModelManager.AchievementModel.GetCategoryRedPointState(
        e.Achievement,
      )) &&
      this.CheckIsGuideDungeonFinish()
    );
  }
  GetNextCanUnlockSkillId() {
    let e = 0;
    for (var [t, o] of this.RoguelikeSkillDataMap) {
      if (0 === o) {
        e = t;
        break;
      }
      0 === e && (e = t);
    }
    return e;
  }
  CheckRogueIsOpen() {
    return (
      ModelManager_1.ModelManager.FunctionModel.IsOpen(110056) &&
      void 0 !==
        ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData() &&
      2 !==
        ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData().GetRogueActivityState()
    );
  }
  GetParamConfigBySeasonId(e = void 0) {
    return e
      ? ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueParamConfig(e)
      : this.CurrSeasonData
        ? ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueParamConfig(
            this.CurrSeasonData.UHn,
          )
        : ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueParamConfig();
  }
}
exports.RoguelikeModel = RoguelikeModel;
//# sourceMappingURL=RoguelikeModel.js.map
