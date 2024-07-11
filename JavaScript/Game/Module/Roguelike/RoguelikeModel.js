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
  AdventureDefine_1 = require("../AdventureGuide/AdventureDefine"),
  RoguelikeChooseData_1 = require("./Define/RoguelikeChooseData"),
  RoguelikeDefine_1 = require("./Define/RoguelikeDefine");
class RoguelikeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.xso = void 0),
      (this.wso = 0),
      (this.Bso = void 0),
      (this.bso = 0),
      (this.qso = 0),
      (this.Gso = void 0),
      (this.Nso = new StateRef_1.StateRef("game_rogue_room_type", "none")),
      (this.Oso = void 0),
      (this.kso = new Map()),
      (this.Fso = new Map()),
      (this.Vso = new Map()),
      (this.TempCountdown = void 0),
      (this.ShowRewardList = void 0),
      (this.CurrSeasonData = void 0),
      (this.CurDungeonId = void 0),
      (this.Hso = 0),
      (this.SelectSkillId = 0);
  }
  OnInit() {
    return !0;
  }
  OnClear() {
    return this.kso.clear(), !(this.xso = void 0);
  }
  get EditFormationRoleList() {
    return this.Oso;
  }
  set EditFormationRoleList(e) {
    this.Oso = e;
  }
  get CurIndex() {
    return this.wso;
  }
  set CurIndex(e) {
    this.wso = e;
  }
  get CurrentRogueGainEntry() {
    return this.Bso;
  }
  set CurrentRogueGainEntry(e) {
    this.Bso = e;
  }
  get RogueInfo() {
    return this.xso;
  }
  set RogueInfo(e) {
    this.xso = e;
  }
  get CurRoomCount() {
    return this.bso;
  }
  set CurRoomCount(e) {
    this.bso = e;
  }
  get TotalRoomCount() {
    return this.qso;
  }
  set TotalRoomCount(e) {
    this.qso = e;
  }
  get CurRoomType() {
    return this.Gso;
  }
  set CurRoomType(e) {
    this.Gso = e;
  }
  get CurRoomMusicState() {
    return this.Nso.State;
  }
  set CurRoomMusicState(e) {
    this.Nso.State = e ?? "none";
  }
  get RoguelikeSkillDataMap() {
    return this.Fso;
  }
  get RoguelikeCurrencyDictMap() {
    return this.Vso;
  }
  SetRoguelikeSkillData(e, t) {
    this.Fso.set(e, t);
  }
  SetRoguelikeCurrency(e, t) {
    this.Vso.set(e, t);
  }
  UpdateRoguelikeCurrency(e, t) {
    var o = this.GetRoguelikeCurrency(e);
    this.Vso.set(e, o + t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnPlayerCurrencyChange,
        e,
      );
  }
  GetRoguelikeCurrency(e) {
    return this.Vso.get(e) ?? 0;
  }
  UpdateDescModel(e) {
    (this.Hso = e ? 0 : 1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RoguelikeDataUpdate,
      );
  }
  GetDescModel() {
    return this.Hso;
  }
  SetRoguelikeChooseData(e) {
    for (const t of e)
      this.kso.set(t.Akn, new RoguelikeChooseData_1.RoguelikeChooseData(t));
  }
  GetRoguelikeChooseDataById(e) {
    return this.kso.get(e);
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
      l = new Array(),
      g = new Map();
    for ([u, s] of i) {
      var h = new RoguelikeDefine_1.ElementInfo(Number(u), s);
      e && (h.IsPreview = 0 < (e.get(u) ?? 0)),
        l.push(h),
        g.set(h.ElementId, h);
    }
    return l.sort((e, t) => t.Count - e.Count), [l, g];
  }
  CheckInRoguelike() {
    return (
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
        ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
      )?.InstSubType === AdventureDefine_1.EDungeonSubType.Roguelike &&
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
          e.F8n,
        )) &&
      ((r = r.GetRogueActivityState()),
      ActivityRogueController_1.ActivityRogueController.RefreshActivityRedDot(),
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
  GetRoguelikeAchievementRedDot() {
    var e = ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData;
    return (
      void 0 !== e &&
      ((e =
        ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(
          e.F8n,
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
            this.CurrSeasonData.F8n,
          )
        : ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueParamConfig();
  }
}
exports.RoguelikeModel = RoguelikeModel;
//# sourceMappingURL=RoguelikeModel.js.map
