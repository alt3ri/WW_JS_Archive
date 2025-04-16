"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScorePanel = void 0);
const UE = require("ue"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  FarmGoldController_1 = require("../../../Activity/ActivityContent/FarmGold/FarmGoldController"),
  DreamLinkScoreItem_1 = require("../ScoreItem/DreamLinkScoreItem"),
  FarmGoldScoreItem_1 = require("../ScoreItem/FarmGoldScoreItem"),
  LinkScoreItem_1 = require("../ScoreItem/LinkScoreItem"),
  RogueScoreItem_1 = require("../ScoreItem/RogueScoreItem"),
  BattleChildViewPanel_1 = require("./BattleChildViewPanel");
class ScorePanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments),
      (this.dul = []),
      (this.zRl = void 0),
      (this.J3l = void 0),
      (this.Cul = (e, t) => {
        t &&
          (t =
            ConfigManager_1.ConfigManager.BattleScoreConfig.GetBattleScoreConfig(
              e,
            )) &&
          this.JRl(t.Type);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async InitializeAsync() {
    ModelManager_1.ModelManager.BattleLinkModel?.CheckInDreamLink()
      ? (await this.I1l(), await this.iel())
      : ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike() ||
          1 === ModelManager_1.ModelManager.CreatureModel.GetInstanceId() ||
          ModelManager_1.ModelManager.BossRushModel.CheckInBossRush() ||
          ModelManager_1.ModelManager.BabelTowerModel.CheckInBattleBabelTower() ||
          ControllerHolder_1.ControllerHolder.MapRogueController.CheckInMapRogueInstance()
        ? await this.ZRl(!0)
        : FarmGoldController_1.FarmGoldController.CheckInFarmGold()
          ? await this.Z3l()
          : ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue() &&
            (await this.X7_());
  }
  Reset() {
    (this.dul.length = 0),
      (this.zRl = void 0),
      (this.J3l = void 0),
      super.Reset();
  }
  OnBeforeDestroyImplement() {
    (this.dul.length = 0), (this.zRl = void 0), (this.J3l = void 0);
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BattleScoreEnableChanged,
      this.Cul,
    );
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BattleScoreEnableChanged,
      this.Cul,
    );
  }
  JRl(e) {
    6 === e && this.ZRl(!1);
  }
  async ZRl(e = !0) {
    var t;
    this.zRl ||
      ((t = await this.NewDynamicChildViewByResourceId(
        this.RootItem,
        "UiItem_RogueScore",
        RogueScoreItem_1.RogueScoreItem,
      )),
      this.dul.push(t),
      (this.zRl = t),
      e && (await t.HideAsync()));
  }
  async Z3l() {
    var e;
    this.J3l ||
      ((e = await this.NewDynamicChildViewByResourceId(
        this.GetItem(0),
        "UiItem_FarmGoldScore",
        FarmGoldScoreItem_1.FarmGoldScoreItem,
      )),
      this.dul.push(e),
      await (this.J3l = e).ShowAsync(),
      (e.IsScoreEnable = !0));
  }
  async I1l() {
    var e = await this.NewDynamicChildViewByResourceId(
      this.RootItem,
      "UiItem_RogueScoreC",
      DreamLinkScoreItem_1.DreamLinkScoreItem,
    );
    this.dul.push(e), await e.HideAsync();
  }
  async iel() {
    var e = await this.NewDynamicChildViewByResourceId(
      this.RootItem,
      "UiItem_RogueScoreB",
      LinkScoreItem_1.LinkScoreItem,
    );
    this.dul.push(e), await e.HideAsync();
  }
  async X7_() {
    var e = await this.NewDynamicChildViewByResourceId(
      this.RootItem,
      "UiItem_RogueScoreD",
      LinkScoreItem_1.LinkScoreItem,
    );
    this.dul.push(e), await e.ShowAsync(), (e.IsScoreEnable = !0);
  }
  OnShowBattleChildViewPanel(e) {
    if (e) for (const t of this.dul) t.OnShowFirstTime();
  }
  OnTickBattleChildViewPanel(e) {
    ScorePanel.Ult.Start();
    for (const t of this.dul) t.IsScoreEnable && t.OnTick(e);
    ScorePanel.Ult.Stop();
  }
}
(exports.ScorePanel = ScorePanel).Ult = Stats_1.Stat.Create(
  "[BattleView]ScorePanelTick",
);
//# sourceMappingURL=ScorePanel.js.map
