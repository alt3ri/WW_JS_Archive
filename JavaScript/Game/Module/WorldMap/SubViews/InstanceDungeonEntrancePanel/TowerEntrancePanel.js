"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerEntrancePanel = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  MapController_1 = require("../../../Map/Controller/MapController"),
  TowerController_1 = require("../../../TowerDetailUi/TowerController"),
  WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
  WorldMapController_1 = require("../../WorldMapController"),
  WorldMapDefine_1 = require("../../WorldMapDefine"),
  RewardItemBar_1 = require("../RewardItemBar"),
  TipsListView_1 = require("../TipsListView"),
  REWARD_ID = 3331,
  TIME_KEY = "time",
  DIFFICULT_KEY = "difficult",
  SCORE_KEY = "score";
class TowerEntrancePanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments),
      (this.u2o = void 0),
      (this.ZAt = void 0),
      (this.U2o = void 0),
      (this.RewardsView = void 0),
      (this.IRe = void 0),
      (this.B2o = 0),
      (this.b2o = 0),
      (this.q2o = () => {
        this.G2o(this.B2o), this.N2o(this.B2o), this.u3e();
      }),
      (this.m2o = () => {
        this.u2o.IsLocked
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Map", 50, "追踪", ["markId", this.u2o.MarkId]),
            MapController_1.MapController.RequestTrackMapMark(
              this.u2o.MarkType,
              this.u2o.MarkId,
              !this.u2o.IsTracked,
            ))
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Map", 50, "追踪", ["markId", this.u2o.MarkId]),
            WorldMapController_1.WorldMapController.TryTeleport(this.u2o)),
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
      (this.U2o = new TipsListView_1.TipsListView()),
      this.U2o.Initialize(this.GetVerticalLayout(5)),
      (this.RewardsView = new RewardItemBar_1.RewardItemBar()),
      this.RewardsView.SetRootActor(this.GetItem(8).GetOwner(), !0),
      (this.ZAt = new ButtonItem_1.ButtonItem(this.GetButton(11).RootUIComp)),
      this.ZAt.SetFunction(this.m2o);
  }
  OnShowWorldMapSecondaryUi(e) {
    (e =
      0 !== (this.u2o = e).MarkConfig.RelativeId
        ? e.MarkConfig.RelativeId
        : ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetEntranceIdByMarkId(
            e.MarkConfigId,
          )),
      (e =
        ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetInstanceDungeonEntranceFlowId(
          e,
        )),
      (this.B2o = e),
      this.u3e(),
      this.mGe(),
      this.jqe(),
      this.N2o(e),
      this.l_i(),
      this.G2o(e),
      (e = this.u2o.GetAreaText());
    e && this.GetText(3).SetText(e),
      this.SetSpriteByPath(this.u2o.IconPath, this.GetSprite(0), !1),
      this.GetItem(9).SetUIActive(!1),
      this.GetItem(12).SetUIActive(!1),
      (this.IRe = TimerSystem_1.TimerSystem.Forever(() => {
        this.q2o();
      }, TimeUtil_1.TimeUtil.InverseMillisecond)),
      (this.b2o =
        MathUtils_1.MathUtils.LongToNumber(
          ModelManager_1.ModelManager.TowerModel.TowerEndTime,
        ) - TimeUtil_1.TimeUtil.GetServerTime());
  }
  mGe() {
    this.GetText(1).SetText(this.u2o.GetTitleText()),
      this.GetText(4).ShowTextNew(this.u2o.GetLocaleDesc());
  }
  jqe() {
    var e,
      t,
      i = [];
    for ([e, t] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
      REWARD_ID,
    )?.DropPreview) {
      var r = [{ IncId: 0, ItemId: e }, t];
      i.push(r);
    }
    void 0 === i || 0 === i.length
      ? this.RewardsView.SetActive(!1)
      : (this.RewardsView.SetActive(!0),
        this.RewardsView.RebuildRewardsByData(i));
  }
  G2o(e) {
    var t = this.U2o.AddItemByKey(DIFFICULT_KEY),
      i = ModelManager_1.ModelManager.TowerModel.GetMaxDifficulty(),
      i =
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
  u3e() {
    var e = ModelManager_1.ModelManager.TowerModel.GetSeasonCountDownData(),
      t = this.U2o.AddItemByKey(TIME_KEY),
      i = StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "Text_ActiveRemainTime_Text",
        ) ?? "",
        "",
      );
    t.SetLeftText(i),
      t.SetRightText(e.CountDownText ?? ""),
      t.SetHelpButtonVisible(!1),
      this.b2o--,
      this.b2o < 2 && TowerController_1.TowerController.RefreshTower();
  }
  N2o(e) {
    var t, i, r;
    4 <= e &&
      ((e = this.U2o.AddItemByKey(SCORE_KEY)),
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
  l_i() {
    let e = "";
    (e = this.u2o.IsLocked
      ? this.u2o.IsTracked
        ? "InstanceDungeonEntranceCancelTrack"
        : "InstanceDungeonEntranceTrack"
      : "TeleportFastMove"),
      this.ZAt.SetLocalText(e);
  }
  OnCloseWorldMapSecondaryUi() {
    this.U2o.Clear(),
      this.IRe &&
        TimerSystem_1.TimerSystem.Has(this.IRe) &&
        TimerSystem_1.TimerSystem.Remove(this.IRe);
  }
  OnBeforeDestroy() {
    this.ZAt.Destroy(), this.RewardsView.Destroy(), this.U2o.Clear();
  }
}
exports.TowerEntrancePanel = TowerEntrancePanel;
//# sourceMappingURL=TowerEntrancePanel.js.map
