"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeModel = void 0);
const Time_1 = require("../../../Core/Common/Time"),
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
  DreamLinkController_1 = require("../DreamLink/DreamLinkController"),
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
      (this.CurDungeonId = void 0),
      (this.Oao = 0),
      (this.SelectSkillId = 0),
      (this.SelectRoleViewShowRoleList = []),
      (this.SelectRoleViewRecommendRoleList = []),
      (this.CurRoomId = void 0),
      (this.CurRoomTypeId = void 0);
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
    var r = this.GetRoguelikeCurrency(e);
    this.Nao.set(e, r + t),
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
    return this.qao.get(e);
  }
  GetSortElementInfoArrayMap(e = void 0) {
    var t,
      r,
      o,
      i = new Map();
    for ([t, r] of this.RogueInfo.ElementDict) 9 !== t && i.set(t, r);
    if (e)
      for (var [n, a] of e) 9 !== n && ((o = i.get(n) ?? 0), i.set(n, o + a));
    var u,
      l,
      s = new Array(),
      g = new Map();
    for ([u, l] of i) {
      var h = new RoguelikeDefine_1.ElementInfo(Number(u), l);
      e && (h.IsPreview = 0 < (e.get(u) ?? 0)),
        s.push(h),
        g.set(h.ElementId, h);
    }
    return s.sort((e, t) => t.Count - e.Count), [s, g];
  }
  CheckInRoguelike() {
    var e = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
    return (
      !(
        (e &&
          e.IsDreamLinkInst(
            ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
          )) ||
        15 !==
          ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
            ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
          )?.InstSubType
      ) && ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
    );
  }
  CheckInRoguelikeOnly() {
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
    if (this.CheckIsGuideDungeonFinish()) {
      var e,
        t,
        r = this.GetRoguelikeCurrency(RoguelikeDefine_1.SKILL_POINT_ID);
      for ([e, t] of this.RoguelikeSkillDataMap)
        if (0 === t)
          if (
            (ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueTalentTreeById(
              e,
            )).Consule[0] <= r
          )
            return !0;
    }
    return !1;
  }
  CheckRoguelikeShopRedDot() {
    var e,
      t =
        ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData()
          ?.SeasonData;
    return (
      !!t &&
      !!(e =
        ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData()) &&
      !(
        !(t =
          ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(
            t.UHn,
          )) ||
        (0 === (e = e.GetRogueActivityState())
          ? !this.CheckIsGuideDungeonFinish() ||
            LocalStorage_1.LocalStorage.GetPlayer(
              LocalStorageDefine_1.ELocalStoragePlayerKey.RoguelikeShopRecord,
            ) ||
            this.pil(t.ShopId) <= 0
          : 1 !== e ||
            ((e =
              LocalStorage_1.LocalStorage.GetPlayer(
                LocalStorageDefine_1.ELocalStoragePlayerKey
                  .RoguelikeShopNextTimeStamp,
              ) ?? 0),
            Time_1.Time.ServerTimeStamp <= e) ||
            (ModelManager_1.ModelManager.InventoryModel?.GetItemCountByConfigId(
              RoguelikeDefine_1.OUTSIDE_CURRENCY_ID,
            ) ?? 0) <= 0 ||
            this.pil(t.ShopId) <= 0)
      )
    );
  }
  HasBlackFlowerExchanged(e) {
    var t = this.GetParamConfigBySeasonId();
    return !!t && t.BlackFlowerInstList.includes(e);
  }
  pil(e) {
    var t = ModelManager_1.ModelManager.PayShopModel.GetPayShopFirstTabId(e);
    return ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(e, t, !1)
      .length;
  }
  GetMapNoteShowState() {
    var e =
      ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData();
    if (!e) return !1;
    if (!e.GetPreGuideQuestFinishState()) return !1;
    e =
      ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData()
        ?.SeasonData;
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
    var e =
      ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData()
        ?.SeasonData;
    return (
      void 0 !== e &&
      !!this.CheckIsGuideDungeonFinish() &&
      ((e =
        ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(
          e.UHn,
        )),
      !!ModelManager_1.ModelManager.AchievementModel.GetCategoryRedPointState(
        e.Achievement,
      ))
    );
  }
  GetNextCanUnlockSkillId() {
    let e = 0;
    for (var [t, r] of this.RoguelikeSkillDataMap) {
      if (0 === r) {
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
      : (e =
            ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData()
              ?.SeasonData)
        ? ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueParamConfig(
            e.UHn,
          )
        : ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueParamConfig();
  }
}
exports.RoguelikeModel = RoguelikeModel;
//# sourceMappingURL=RoguelikeModel.js.map
