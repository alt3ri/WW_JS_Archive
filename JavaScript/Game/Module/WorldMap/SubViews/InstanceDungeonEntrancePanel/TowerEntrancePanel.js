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
  MarkUiUtils_1 = require("../../../Map/Mark/Misc/MarkUiUtils"),
  TeleportController_1 = require("../../../Teleport/TeleportController"),
  TowerController_1 = require("../../../TowerDetailUi/TowerController"),
  WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
  WorldMapController_1 = require("../../WorldMapController"),
  WorldMapDefine_1 = require("../../WorldMapDefine"),
  MapTipsActivateTipPanel_1 = require("../Common/MapTipsActivateTipPanel"),
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
      (this.oza = void 0),
      (this.IRe = void 0),
      (this.B2o = 0),
      (this.b2o = 0),
      (this.k4a = void 0),
      (this.N4a = void 0),
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
      }),
      (this.F4a = () => {
        var t = MarkUiUtils_1.MarkUiUtils.FindNearbyValidGotoMark(
          this.Map,
          this.u2o,
        );
        t &&
          MarkUiUtils_1.MarkUiUtils.QuickGotoTeleport(this.u2o, t, () => {
            this.Close();
          });
      }),
      (this.P8e = () => {
        var t = this.u2o;
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Map",
            64,
            "[地图系统]TowerEntrancePanel->追踪标记",
            ["markId", t.MarkId],
            ["IsTracked", t.IsTracked],
          ),
          MapController_1.MapController.RequestTrackMapMark(
            t.MarkType,
            t.MarkId,
            !t.IsTracked,
          ),
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
  async OnBeforeStartAsync() {
    return (
      (this.oza = new MapTipsActivateTipPanel_1.MapTipsActivateTipPanel()),
      await this.oza.CreateByActorAsync(this.GetItem(31).GetOwner()),
      super.OnBeforeStartAsync()
    );
  }
  OnStart() {
    this.RootItem.SetRaycastTarget(!1),
      this.GetVerticalLayout(5).RootUIComp.SetUIActive(!0),
      (this.U2o = new TipsListView_1.TipsListView()),
      this.U2o.Initialize(this.GetVerticalLayout(5)),
      (this.RewardsView = new RewardItemBar_1.RewardItemBar()),
      this.RewardsView.SetRootActor(this.GetItem(8).GetOwner(), !0),
      (this.ZAt = new ButtonItem_1.ButtonItem(this.GetButton(11).RootUIComp)),
      this.ZAt.SetActive(!0),
      this.ZAt.SetFunction(this.m2o),
      (this.k4a = new ButtonItem_1.ButtonItem(this.GetButton(28).RootUIComp)),
      this.k4a.SetFunction(this.P8e),
      (this.N4a = new ButtonItem_1.ButtonItem(this.GetButton(29).RootUIComp)),
      this.N4a.SetFunction(this.F4a);
  }
  OnShowWorldMapSecondaryUi(t) {
    var i,
      e,
      t =
        0 !== (this.u2o = t).MarkConfig.RelativeId
          ? t.MarkConfig.RelativeId
          : ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetEntranceIdByMarkId(
              t.MarkConfigId,
            ),
      t =
        ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetInstanceDungeonEntranceFlowId(
          t,
        ),
      t =
        ((this.B2o = t),
        this.u3e(),
        this.mGe(),
        this.jqe(),
        this.N2o(t),
        this.l_i(),
        this.G2o(t),
        this.u2o.GetAreaText()),
      t =
        (t && this.GetText(3).SetText(t),
        this.SetSpriteByPath(this.u2o.IconPath, this.GetSprite(0), !1),
        this.GetItem(9).SetUIActive(!1),
        this.GetItem(12).SetUIActive(!1),
        this.GetItem(14).SetUIActive(!0),
        this.GetItem(26).SetUIActive(!1),
        this.GetVerticalLayout(5).RootUIComp.SetUIActive(!0),
        this.GetItem(25).SetUIActive(!1),
        this.GetItem(32).SetUIActive(!1),
        MarkUiUtils_1.MarkUiUtils.IsShowGoto(this.u2o));
    this.ZAt.SetActive(!t),
      this.GetItem(32).SetUIActive(t),
      this.oza.SetUiActive(!1),
      t &&
        ((t = this.GetButton(29)),
        (i = TeleportController_1.TeleportController.CheckCanTeleport()),
        (e = MarkUiUtils_1.MarkUiUtils.FindNearbyValidGotoMark(
          this.Map,
          this.u2o,
        )),
        this.oza.SetUiActive(!i || void 0 === e),
        t.SetSelfInteractive(i && void 0 !== e)),
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
    var t,
      i,
      e = [];
    for ([t, i] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
      REWARD_ID,
    )?.DropPreview) {
      var r = [{ IncId: 0, ItemId: t }, i];
      e.push(r);
    }
    void 0 === e || 0 === e.length
      ? this.RewardsView.SetActive(!1)
      : (this.RewardsView.SetActive(!0),
        this.RewardsView.RebuildRewardsByData(e));
  }
  G2o(t) {
    var i = this.U2o.AddItemByKey(DIFFICULT_KEY),
      e = ModelManager_1.ModelManager.TowerModel.GetMaxDifficulty(),
      e =
        (i.SetHelpButtonVisible(!1),
        i.SetLeftText(
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew("TowerProcess") ??
            "",
        ),
        ConfigManager_1.ConfigManager.TowerClimbConfig.GetNewTowerDifficultTitle(
          e,
        ));
    i.SetRightText(e);
  }
  u3e() {
    var t = ModelManager_1.ModelManager.TowerModel.GetSeasonCountDownData(),
      i = this.U2o.AddItemByKey(TIME_KEY),
      e = StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "Text_ActiveRemainTime_Text",
        ) ?? "",
        "",
      );
    i.SetLeftText(e),
      i.SetRightText(t.CountDownText ?? ""),
      i.SetHelpButtonVisible(!1),
      this.b2o--,
      this.b2o < 2 && TowerController_1.TowerController.RefreshTower();
  }
  N2o(t) {
    var i, e, r;
    4 <= t &&
      ((t = this.U2o.AddItemByKey(SCORE_KEY)),
      (i = (r = ModelManager_1.ModelManager.TowerModel).GetMaxDifficulty()),
      (e = r.GetDifficultyMaxStars(i)),
      (r = r.GetDifficultyAllStars(i)),
      t.SetHelpButtonVisible(!1),
      t.SetLeftText(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew("TowerScore") ?? "",
      ),
      t.SetRightText(e + "/" + r),
      t.SetStarVisible(!0));
  }
  l_i() {
    let t = "";
    (t = this.u2o.IsLocked
      ? this.u2o.IsTracked
        ? "InstanceDungeonEntranceCancelTrack"
        : "InstanceDungeonEntranceTrack"
      : "TeleportFastMove"),
      this.ZAt.SetLocalText(t),
      this.k4a.SetLocalText(t);
  }
  OnCloseWorldMapSecondaryUi() {
    this.U2o.Clear(),
      this.IRe &&
        TimerSystem_1.TimerSystem.Has(this.IRe) &&
        TimerSystem_1.TimerSystem.Remove(this.IRe);
  }
  OnBeforeDestroy() {
    this.ZAt.Destroy(),
      this.k4a.Destroy(),
      this.N4a.Destroy(),
      this.RewardsView.Destroy(),
      this.oza.Destroy(),
      this.U2o.Clear();
  }
}
exports.TowerEntrancePanel = TowerEntrancePanel;
//# sourceMappingURL=TowerEntrancePanel.js.map
