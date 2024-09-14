"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneGameplayPanel = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  DropPackageById_1 = require("../../../../../Core/Define/ConfigQuery/DropPackageById"),
  ExchangeRewardById_1 = require("../../../../../Core/Define/ConfigQuery/ExchangeRewardById"),
  MapMarkByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/MapMarkByMarkId"),
  MapMarkPhantomGroupByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/MapMarkPhantomGroupByMarkId"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ActivityDoubleRewardController_1 = require("../../../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  HelpController_1 = require("../../../Help/HelpController"),
  ItemDefines_1 = require("../../../Item/Data/ItemDefines"),
  LevelPlay_1 = require("../../../LevelPlay/LevelPlay"),
  MapController_1 = require("../../../Map/Controller/MapController"),
  MarkUiUtils_1 = require("../../../Map/Mark/Misc/MarkUiUtils"),
  TeleportController_1 = require("../../../Teleport/TeleportController"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
  WorldMapDefine_1 = require("../../WorldMapDefine"),
  MapTipsActivateTipPanel_1 = require("../Common/MapTipsActivateTipPanel"),
  TipsListView_1 = require("../TipsListView"),
  SceneGameplayTipGrid_1 = require("./SceneGameplayTipGrid"),
  HELP_ID = 88,
  POWER_COST_KEY = "power",
  REBORN_TIME_KEY = "reborn",
  REWARD_SHARE_COUNT = "reward",
  TARGET_ITEM_SHOW_TYPE = 41;
class SceneGameplayPanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments),
      (this.Ymt = void 0),
      (this.u2o = void 0),
      (this.O2o = void 0),
      (this.k2o = void 0),
      (this.F2o = void 0),
      (this.V2o = void 0),
      (this.IRe = void 0),
      (this.U2o = void 0),
      (this.ZAt = void 0),
      (this.rFo = void 0),
      (this.nFo = !1),
      (this.k4a = void 0),
      (this.N4a = void 0),
      (this.oza = void 0),
      (this.mji = () => {
        HelpController_1.HelpController.OpenHelpById(HELP_ID);
      }),
      (this.m2o = () => {
        var i = this.u2o.IsTracked;
        MapController_1.MapController.RequestTrackMapMark(
          this.u2o.MarkType,
          this.u2o.MarkId,
          !i,
        ),
          this.Close();
      }),
      (this.UOe = () => {
        var i = ModelManager_1.ModelManager.MapModel.IsLevelPlayOccupied(
          this.Ymt.Id,
        );
        i.IsOccupied &&
          ((i =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              i.QuestId,
            )),
          UiManager_1.UiManager.OpenView("QuestView", i.TreeConfigId));
      }),
      (this.sFo = () => {
        ModelManager_1.ModelManager.CalabashModel.OnlyShowBattleFettersTab = !0;
        var i =
          MapMarkPhantomGroupByMarkId_1.configMapMarkPhantomGroupByMarkId.GetConfig(
            this.u2o.MarkId,
          );
        (ModelManager_1.ModelManager.CalabashModel.OnlyShowPhantomFetterGroupIdList =
          i.ShowRange),
          UiManager_1.UiManager.OpenView("CalabashRootView");
      }),
      (this.aFo = () => {
        UiManager_1.UiManager.OpenView(
          "SilentAreaRewardPreviewPopView",
          this.Ymt.RewardId,
        );
      }),
      (this.F4a = () => {
        var i = MarkUiUtils_1.MarkUiUtils.FindNearbyValidGotoMark(
          this.Map,
          this.u2o,
        );
        i &&
          MarkUiUtils_1.MarkUiUtils.QuickGotoTeleport(this.u2o, i, () => {
            this.Close();
          });
      }),
      (this.P8e = () => {
        var i = this.u2o;
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Map",
            64,
            "[地图系统]SceneGameplayPanel->追踪标记",
            ["markId", i.MarkId],
            ["IsTracked", i.IsTracked],
          ),
          MapController_1.MapController.RequestTrackMapMark(
            i.MarkType,
            i.MarkId,
            !i.IsTracked,
          ),
          this.Close();
      });
  }
  GetResourceId() {
    return "UiView_InstanceEntranceTip_Prefab_2";
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos =
      WorldMapDefine_1.secondaryUiPanelComponentsRegisterInfoA),
      (this.BtnBindInfo = [
        [15, this.UOe],
        [18, this.sFo],
      ]);
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
      (this.U2o = new TipsListView_1.TipsListView()),
      this.U2o.Initialize(this.GetVerticalLayout(5)),
      (this.ZAt = new ButtonItem_1.ButtonItem(this.GetButton(11).RootUIComp)),
      this.ZAt.SetActive(!0),
      this.ZAt.SetFunction(this.m2o),
      (this.k4a = new ButtonItem_1.ButtonItem(this.GetButton(28).RootUIComp)),
      this.k4a.SetFunction(this.P8e),
      (this.N4a = new ButtonItem_1.ButtonItem(this.GetButton(29).RootUIComp)),
      this.N4a.SetFunction(this.F4a);
  }
  OnBeforeDestroy() {
    this.U2o.Clear(),
      this.ZAt.Destroy(),
      this.k4a.Destroy(),
      this.N4a.Destroy(),
      (this.rFo = void 0),
      this.O2o && (this.AddChild(this.O2o), (this.O2o = void 0)),
      this.k2o && (this.AddChild(this.k2o), (this.k2o = void 0)),
      (this.F2o = void 0),
      (this.V2o = void 0),
      this.cG(),
      (ModelManager_1.ModelManager.CalabashModel.OnlyShowBattleFettersTab = !1);
  }
  OnShowWorldMapSecondaryUi(i) {
    i
      ? ((this.u2o = i),
        this.SetSpriteByPath(this.u2o.IconPath, this.GetSprite(0), !1),
        (this.Ymt = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(
          i.MarkConfig.RelativeId,
        )),
        this.Ymt ||
          ((this.Ymt = new LevelPlay_1.LevelPlayInfo(i.MarkConfig.RelativeId)),
          this.Ymt.InitConfig()),
        (this.IRe = void 0),
        (this.nFo =
          1 === this.u2o?.MarkConfig?.RelativeSubType ||
          2 === this.u2o?.MarkConfig?.RelativeSubType),
        this.SHe(),
        this.l_i(),
        this.hFo())
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "SceneGameplay",
          18,
          "玩法弹窗打开错误，地图标记不存在",
        );
  }
  OnCloseWorldMapSecondaryUi() {
    this.U2o.Clear(),
      this.IRe &&
        (TimerSystem_1.TimerSystem.Remove(this.IRe), (this.IRe = void 0)),
      (this.rFo = void 0),
      (ModelManager_1.ModelManager.CalabashModel.OnlyShowBattleFettersTab = !1);
  }
  SHe() {
    (this.F2o = ExchangeRewardById_1.configExchangeRewardById.GetConfig(
      this.Ymt.RewardId,
    )),
      (this.V2o = this.Ymt.FirstRewardId
        ? ExchangeRewardById_1.configExchangeRewardById.GetConfig(
            this.Ymt.FirstRewardId,
          )
        : void 0);
    var i,
      e,
      t = this.u2o.MarkConfigId,
      r = MapMarkByMarkId_1.configMapMarkByMarkId.GetConfig(t);
    r
      ? ((e = (i = this.u2o.IsRelativeFunctionOpen())
          ? r.MarkTitle
          : "UnknownPlace"),
        this.GetText(1).ShowTextNew(e),
        (e = i ? r.MarkDesc : "UnknownPlaceContent"),
        this.GetText(4).ShowTextNew(e),
        this.lFo(),
        this.GetItem(14).SetUIActive(!0),
        this.GetItem(26).SetUIActive(!1),
        this.GetVerticalLayout(5).RootUIComp.SetUIActive(!0),
        this.GetItem(25).SetUIActive(!1),
        this.GetItem(9).SetUIActive(!1),
        this.GetItem(12).SetUIActive(!1),
        this.GetItem(8).SetUIActive(!1),
        (i = this.u2o.GetAreaText()) && this.GetText(3).SetText(i),
        this.GetButton(18).RootUIComp?.SetUIActive(
          1 === this.u2o.MarkConfig.RelativeSubType,
        ),
        (e =
          !(r = ModelManager_1.ModelManager.MapModel.IsLevelPlayOccupied(
            this.Ymt.Id,
          )).IsOccupied && MarkUiUtils_1.MarkUiUtils.IsShowGoto(this.u2o)),
        r.IsOccupied ? this.ZAt.SetActive(!1) : this.ZAt.SetActive(!e),
        this.GetItem(32).SetUIActive(e),
        this.oza.SetUiActive(!1),
        e &&
          ((i = this.GetButton(29)),
          (r = TeleportController_1.TeleportController.CheckCanTeleport()),
          (e = MarkUiUtils_1.MarkUiUtils.FindNearbyValidGotoMark(
            this.Map,
            this.u2o,
          )),
          this.oza.SetUiActive(!r || void 0 === e),
          i.SetSelfInteractive(r && void 0 !== e)),
        this.InitRewards(),
        this.W2o())
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("SceneGameplay", 18, "缺少标记配置", ["MarkId", t]);
  }
  lFo() {
    let i = 0;
    0 <
      (i = this.F2o?.Cost.has(ItemDefines_1.EItemId.Power)
        ? this.F2o.Cost.get(ItemDefines_1.EItemId.Power)
        : i) &&
      ((r = this.U2o.AddItemByKey(POWER_COST_KEY)).SetIconByItemId(
        ItemDefines_1.EItemId.Power,
      ),
      r.SetClickHelpFunc(this.mji),
      r.SetLeftText(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CostStamina") ??
          "",
      ),
      r.SetRightText("x" + i.toString())),
      (this.rFo = this.U2o.AddItemByKey(REBORN_TIME_KEY)),
      this.rFo?.SetLeftText(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "LastTimeToRefresh",
        ) ?? "",
      ),
      this.rFo?.SetHelpButtonVisible(!1),
      this.rFo?.SetActive(!1);
    var e,
      t,
      r = this.F2o.SharedId;
    0 < r &&
      0 <
        (e =
          ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetShareMaxCount(
            this.F2o.SharedId,
          )) &&
      ((r =
        ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeRewardShareCount(
          r,
        )),
      (t = this.U2o.AddItemByKey(REWARD_SHARE_COUNT)).SetLeftText(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "RemainingCollectTimes",
        ) ?? "",
      ),
      t.SetRightText(
        StringUtils_1.StringUtils.Format(
          "{0}/{1}",
          (e - r).toString(),
          e.toString(),
        ),
      ),
      t.SetHelpButtonVisible(!1));
  }
  W2o() {
    var i = ModelManager_1.ModelManager.MapModel.IsLevelPlayOccupied(
      this.Ymt.Id,
    );
    this.GetItem(12).SetUIActive(i.IsOccupied),
      i.IsOccupied &&
        ((i = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
          i.QuestId,
        )),
        (i = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
          i.TreeConfigId,
        )),
        (i = StringUtils_1.StringUtils.Format(
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "Quest_Require_Note",
          ) ?? "",
          i.Name,
        )),
        this.GetText(13).SetText(i)),
      this.GetItem(17).SetUIActive(1 === this.u2o.MarkConfig.RelativeSubType);
  }
  InitRewards() {
    let i = !1;
    1 === this.u2o.MarkConfig.RelativeSubType &&
      ((e =
        ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(
          [3],
          !1,
        )),
      (i = void 0 !== e),
      e) &&
      ((e = e.GetNumTxtAndParam()),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(20), e[0], e[1], e[2])),
      this.GetItem(19).SetUIActive(i),
      this.O2o ||
        ((e = this.GetItem(8).GetOwner()),
        (t = this.GetVerticalLayout(7).RootUIComp),
        (this.k2o = new SceneGameplayTipGrid_1.SceneGameplayTipGrid()),
        this.k2o.Initialize(LguiUtil_1.LguiUtil.DuplicateActor(e, t)),
        (this.O2o = new SceneGameplayTipGrid_1.SceneGameplayTipGrid()),
        this.O2o.Initialize(LguiUtil_1.LguiUtil.DuplicateActor(e, t)),
        (this.O2o.OnClickPreviewCall = this.aFo));
    var e = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
      t =
        (this.k2o?.SetBtnPreviewVisible(!1),
        this.O2o.SetBtnPreviewVisible(this.nFo),
        this.Ymt.IsFirstPass);
    t
      ? this.K2o(this.k2o, void 0, 0, "")
      : this.K2o(this.k2o, this.V2o, e, "FirstReward"),
      this.K2o(this.O2o, this.F2o, e, "ProbReward", i);
  }
  K2o(i, r, s, e, a = !1) {
    if (r) {
      var h = r.PreviewReward;
      let t = void 0;
      if (h.has(s)) t = h.get(s).MapIntInt;
      else
        for (let i = s - 1; 0 <= i; i--)
          if (h.has(i)) {
            t = h.get(i).MapIntInt;
            break;
          }
      if (!t) {
        var o = r.RewardId;
        let e = 0;
        if (o.has(s)) e = o.get(s);
        else
          for (let i = s - 1; 0 <= i; i--)
            if (o.has(i)) {
              e = o.get(i);
              break;
            }
        e &&
          0 < e &&
          ((M = DropPackageById_1.configDropPackageById.GetConfig(e))
            ? (t = M.DropPreview)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneGameplay",
                18,
                "兑换奖励表配置的掉落ID读取不到掉落奖励",
                ["兑换奖励ID", r.Id],
              ));
      }
      if (1 === this.u2o.MarkConfig.RelativeSubType) {
        var n,
          _,
          l,
          M = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel(),
          d =
            ConfigManager_1.ConfigManager.CalabashConfig?.GetCalabashConfigByLevel(
              M,
            ),
          p = [];
        for ([n] of t)
          this._Fo(n) &&
            ((_ =
              ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
                n,
              )),
            (l = d.QualityDropWeight.get(_.QualityId) ?? 0),
            _.ShowTypes.includes(TARGET_ITEM_SHOW_TYPE)) &&
            l <= 0 &&
            _ &&
            p.push(n);
        p.forEach((i) => {
          t.delete(i);
        });
      }
      t
        ? (i.Refresh(t, e, !1, !1, a), i.SetActive(!0))
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "SceneGameplay",
              18,
              "读取不到奖励配置",
              ["兑换奖励ID", r.Id],
              ["WorldLevel", s],
            ),
          i.SetActive(!1));
    } else i.SetActive(!1);
  }
  _Fo(i) {
    i =
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
        i,
      );
    return 7 === i || 0 === i;
  }
  l_i() {
    let i = "";
    (i = this.u2o.IsTracked
      ? "InstanceDungeonEntranceCancelTrack"
      : "InstanceDungeonEntranceTrack"),
      this.ZAt.SetLocalText(i),
      this.k4a.SetLocalText(i);
  }
  hFo() {
    var e = TimeUtil_1.TimeUtil.GetServerTime(),
      t = this.Ymt.RefreshTime;
    if (t < e) this.cG();
    else {
      t = t - e;
      let i = void 0;
      (i =
        t < TimeUtil_1.TimeUtil.Minute
          ? "" +
            Math.floor(t) +
            ConfigManager_1.ConfigManager.TextConfig.GetTextById("Second")
          : t < TimeUtil_1.TimeUtil.Hour
            ? "" +
              Math.floor(t / TimeUtil_1.TimeUtil.Minute) +
              ConfigManager_1.ConfigManager.TextConfig.GetTextById("Minute")
            : "" +
              Math.floor(t / TimeUtil_1.TimeUtil.Hour) +
              ConfigManager_1.ConfigManager.TextConfig.GetTextById("Hour")),
        this.rFo?.SetRightText(i),
        void 0 === this.IRe && this.tGo();
    }
  }
  tGo() {
    this.rFo?.SetActive(!0),
      (this.IRe = TimerSystem_1.TimerSystem.Forever(() => {
        this.hFo();
      }, TimeUtil_1.TimeUtil.InverseMillisecond));
  }
  cG() {
    void 0 !== this.IRe &&
      TimerSystem_1.TimerSystem.Has(this.IRe) &&
      (TimerSystem_1.TimerSystem.Remove(this.IRe),
      (this.IRe = void 0),
      this.rFo?.SetActive(!1));
  }
}
exports.SceneGameplayPanel = SceneGameplayPanel;
//# sourceMappingURL=SceneGameplayPanel.js.map
