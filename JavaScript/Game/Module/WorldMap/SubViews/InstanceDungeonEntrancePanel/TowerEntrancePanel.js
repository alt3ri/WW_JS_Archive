"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerEntrancePanel = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const InstanceDungeonEntranceConfig_1 = require("../../../InstanceDungeon/InstanceDungeonEntranceConfig");
const MapController_1 = require("../../../Map/Controller/MapController");
const TowerController_1 = require("../../../TowerDetailUi/TowerController");
const WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi");
const WorldMapController_1 = require("../../WorldMapController");
const WorldMapDefine_1 = require("../../WorldMapDefine");
const RewardItemBar_1 = require("../RewardItemBar");
const TipsListView_1 = require("../TipsListView");
const REWARD_ID = 3331;
const TIME_KEY = "time";
const DIFFICULT_KEY = "difficult";
const SCORE_KEY = "score";
class TowerEntrancePanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments),
      (this.dko = void 0),
      (this.$Ut = void 0),
      (this.xko = void 0),
      (this.RewardsView = void 0),
      (this.IRe = void 0),
      (this.Gko = 0),
      (this.Nko = 0),
      (this.Oko = () => {
        this.kko(this.Gko), this.Fko(this.Gko), this.$2e();
      }),
      (this.gko = () => {
        this.dko.IsLocked
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Map", 50, "追踪", ["markId", this.dko.MarkId]),
            MapController_1.MapController.RequestTrackMapMark(
              this.dko.MarkType,
              this.dko.MarkId,
              !this.dko.IsTracked,
            ))
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Map", 50, "追踪", ["markId", this.dko.MarkId]),
            WorldMapController_1.WorldMapController.TryTeleport(this.dko)),
          this.Close();
      });
  }
  GetResourceId() {
    return "UiView_Map_Tower_Tip_Prefab";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos =
      WorldMapDefine_1.secondaryUiPanelComponentsRegisterInfoA;
  }
  OnStart() {
    this.RootItem.SetRaycastTarget(!1),
      this.GetItem(14).SetUIActive(!0),
      this.GetVerticalLayout(5).RootUIComp.SetUIActive(!0),
      (this.xko = new TipsListView_1.TipsListView()),
      this.xko.Initialize(this.GetVerticalLayout(5)),
      (this.RewardsView = new RewardItemBar_1.RewardItemBar()),
      this.RewardsView.SetRootActor(this.GetItem(8).GetOwner(), !0),
      (this.$Ut = new ButtonItem_1.ButtonItem(this.GetButton(11).RootUIComp)),
      this.$Ut.SetFunction(this.gko);
  }
  OnShowWorldMapSecondaryUi(e) {
    (e =
      (this.dko = e).MarkConfig.RelativeId !== 0
        ? e.MarkConfig.RelativeId
        : ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetEntranceIdByMarkId(
            e.MarkConfigId,
          )),
      (e =
        ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetInstanceDungeonEntranceFlowId(
          e,
        )),
      (this.Gko = e),
      this.$2e(),
      this.mGe(),
      this.jqe(),
      this.Fko(e),
      this.l1i(),
      this.kko(e),
      (e = this.dko.GetAreaText());
    e && this.GetText(3).SetText(e),
      this.SetSpriteByPath(this.dko.IconPath, this.GetSprite(0), !1),
      this.GetItem(9).SetUIActive(!1),
      this.GetItem(12).SetUIActive(!1),
      (this.IRe = TimerSystem_1.TimerSystem.Forever(() => {
        this.Oko();
      }, TimeUtil_1.TimeUtil.InverseMillisecond)),
      (this.Nko =
        MathUtils_1.MathUtils.LongToNumber(
          ModelManager_1.ModelManager.TowerModel.TowerEndTime,
        ) - TimeUtil_1.TimeUtil.GetServerTime());
  }
  mGe() {
    this.GetText(1).SetText(this.dko.GetTitleText()),
      this.GetText(4).ShowTextNew(this.dko.GetLocaleDesc());
  }
  jqe() {
    let e;
    let t;
    const i = [];
    for ([e, t] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
      REWARD_ID,
    )?.DropPreview) {
      const r = [{ IncId: 0, ItemId: e }, t];
      i.push(r);
    }
    void 0 === i || i.length === 0
      ? this.RewardsView.SetActive(!1)
      : (this.RewardsView.SetActive(!0),
        this.RewardsView.RebuildRewardsByData(i));
  }
  kko(e) {
    const t = this.xko.AddItemByKey(DIFFICULT_KEY);
    var i = ModelManager_1.ModelManager.TowerModel.GetMaxDifficulty();
    var i =
      (t.SetHelpButtonVisible(!1),
      t.SetLeftText(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew("TowerProcess") ??
          "",
      ),
      ConfigManager_1.ConfigManager.TowerClimbConfig.GetNewTowerDifficultTitle(
        i,
      ));
    t.SetRightText(i);
  }
  $2e() {
    const e = ModelManager_1.ModelManager.TowerModel.GetSeasonCountDownData();
    const t = this.xko.AddItemByKey(TIME_KEY);
    const i = StringUtils_1.StringUtils.Format(
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "Text_ActiveRemainTime_Text",
      ) ?? "",
      "",
    );
    t.SetLeftText(i),
      t.SetRightText(e.CountDownText ?? ""),
      t.SetHelpButtonVisible(!1),
      this.Nko--,
      this.Nko < 2 && TowerController_1.TowerController.RefreshTower();
  }
  Fko(e) {
    let t, i, r;
    e >= InstanceDungeonEntranceConfig_1.EInstanceEntranceFlowType.CycleTower &&
      ((e = this.xko.AddItemByKey(SCORE_KEY)),
      (t = (r = ModelManager_1.ModelManager.TowerModel).GetMaxDifficulty()),
      (i = r.GetDifficultyMaxStars(t)),
      (r = r.GetDifficultyAllStars(t)),
      e.SetHelpButtonVisible(!1),
      e.SetLeftText(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew("TowerScore") ?? "",
      ),
      e.SetRightText(i + "/" + r),
      e.SetStarVisible(!0));
  }
  l1i() {
    let e = "";
    (e = this.dko.IsLocked
      ? this.dko.IsTracked
        ? "InstanceDungeonEntranceCancelTrack"
        : "InstanceDungeonEntranceTrack"
      : "TeleportFastMove"),
      this.$Ut.SetLocalText(e);
  }
  OnCloseWorldMapSecondaryUi() {
    this.xko.Clear(),
      this.IRe &&
        TimerSystem_1.TimerSystem.Has(this.IRe) &&
        TimerSystem_1.TimerSystem.Remove(this.IRe);
  }
  OnBeforeDestroy() {
    this.$Ut.Destroy(), this.RewardsView.Destroy(), this.xko.Clear();
  }
}
exports.TowerEntrancePanel = TowerEntrancePanel;
// # sourceMappingURL=TowerEntrancePanel.js.map
