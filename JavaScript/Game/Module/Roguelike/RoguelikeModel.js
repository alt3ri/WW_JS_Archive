"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeModel = void 0);
const Time_1 = require("../../../Core/Common/Time");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const StateRef_1 = require("../../../Core/Utils/Audio/StateRef");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ActivityRogueController_1 = require("../Activity/ActivityContent/RougeActivity/ActivityRogueController");
const AdventureDefine_1 = require("../AdventureGuide/AdventureDefine");
const RoguelikeChooseData_1 = require("./Define/RoguelikeChooseData");
const RoguelikeDefine_1 = require("./Define/RoguelikeDefine");
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
    const o = this.GetRoguelikeCurrency(e);
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
    let t;
    let o;
    let r;
    const i = new Map();
    for ([t, o] of this.RogueInfo.ElementDict) t !== 9 && i.set(t, o);
    if (e)
      for (const [n, a] of e) n !== 9 && ((r = i.get(n) ?? 0), i.set(n, r + a));
    let u;
    let s;
    const l = new Array();
    const g = new Map();
    for ([u, s] of i) {
      const h = new RoguelikeDefine_1.ElementInfo(Number(u), s);
      e && (h.IsPreview = (e.get(u) ?? 0) > 0),
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
    const e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon;
    const t = this.GetParamConfigBySeasonId();
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
        e === 0 &&
          (ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueTalentTreeById(
            t,
          )).Consule[0] <= r &&
          (o = !0);
      }),
      o && this.CheckIsGuideDungeonFinish()
    );
  }
  CheckRoguelikeShopRedDot() {
    let e;
    let t;
    let o;
    let r =
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
      r === 0
        ? !LocalStorage_1.LocalStorage.GetPlayer(
            LocalStorageDefine_1.ELocalStoragePlayerKey.RoguelikeShopRecord,
          ) &&
          this.CheckIsGuideDungeonFinish() &&
          e.length > 0
        : r === 1 &&
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
          o > 0 &&
          e.length > 0)
    );
  }
  GetRoguelikeAchievementRedDot() {
    let e = ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData;
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
    for (const [t, o] of this.RoguelikeSkillDataMap) {
      if (o === 0) {
        e = t;
        break;
      }
      e === 0 && (e = t);
    }
    return e;
  }
  CheckRogueIsOpen() {
    return (
      ModelManager_1.ModelManager.FunctionModel.IsOpen(110056) &&
      void 0 !==
        ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData() &&
      ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData().GetRogueActivityState() !==
        2
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
// # sourceMappingURL=RoguelikeModel.js.map
