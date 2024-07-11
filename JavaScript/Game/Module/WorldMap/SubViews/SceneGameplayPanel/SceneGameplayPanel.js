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
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
  WorldMapDefine_1 = require("../../WorldMapDefine"),
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
      (this.mji = () => {
        HelpController_1.HelpController.OpenHelpById(HELP_ID);
      }),
      (this.m2o = () => {
        var e = this.u2o.IsTracked;
        MapController_1.MapController.RequestTrackMapMark(
          this.u2o.MarkType,
          this.u2o.MarkId,
          !e,
        ),
          this.Close();
      }),
      (this.UOe = () => {
        var e = ModelManager_1.ModelManager.MapModel.IsLevelPlayOccupied(
          this.Ymt.Id,
        );
        e.IsOccupied &&
          ((e =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              e.QuestId,
            )),
          UiManager_1.UiManager.OpenView("QuestView", e.TreeConfigId));
      }),
      (this.sFo = () => {
        ModelManager_1.ModelManager.CalabashModel.OnlyShowBattleFettersTab = !0;
        var e =
          MapMarkPhantomGroupByMarkId_1.configMapMarkPhantomGroupByMarkId.GetConfig(
            this.u2o.MarkId,
          );
        (ModelManager_1.ModelManager.CalabashModel.OnlyShowPhantomFetterGroupIdList =
          e.ShowRange),
          UiManager_1.UiManager.OpenView("CalabashRootView");
      }),
      (this.aFo = () => {
        UiManager_1.UiManager.OpenView(
          "SilentAreaRewardPreviewPopView",
          this.Ymt.RewardId,
        );
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
  OnStart() {
    this.RootItem.SetRaycastTarget(!1),
      (this.U2o = new TipsListView_1.TipsListView()),
      this.U2o.Initialize(this.GetVerticalLayout(5)),
      (this.ZAt = new ButtonItem_1.ButtonItem(this.GetButton(11).RootUIComp)),
      this.ZAt.SetFunction(this.m2o),
      this.GetItem(14).SetUIActive(!0),
      this.GetVerticalLayout(5)?.RootUIComp?.SetUIActive(!0);
  }
  OnBeforeDestroy() {
    this.U2o.Clear(),
      this.ZAt.Destroy(),
      (this.rFo = void 0),
      this.O2o && (this.AddChild(this.O2o), (this.O2o = void 0)),
      this.k2o && (this.AddChild(this.k2o), (this.k2o = void 0)),
      (this.F2o = void 0),
      (this.V2o = void 0),
      this.cG(),
      (ModelManager_1.ModelManager.CalabashModel.OnlyShowBattleFettersTab = !1);
  }
  OnShowWorldMapSecondaryUi(e) {
    e
      ? ((this.u2o = e),
        this.SetSpriteByPath(this.u2o.IconPath, this.GetSprite(0), !1),
        (this.Ymt = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(
          e.MarkConfig.RelativeId,
        )),
        this.Ymt ||
          ((this.Ymt = new LevelPlay_1.LevelPlayInfo(e.MarkConfig.RelativeId)),
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
    var e,
      i,
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
        this.GetItem(9).SetUIActive(!1),
        this.GetItem(12).SetUIActive(!1),
        this.GetItem(8).SetUIActive(!1),
        (i = this.u2o.GetAreaText()) && this.GetText(3).SetText(i),
        this.GetButton(18).RootUIComp?.SetUIActive(
          1 === this.u2o.MarkConfig.RelativeSubType,
        ),
        this.InitRewards(),
        this.W2o())
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("SceneGameplay", 18, "缺少标记配置", ["MarkId", t]);
  }
  lFo() {
    let e = 0;
    0 <
      (e = this.F2o?.Cost.has(ItemDefines_1.EItemId.Power)
        ? this.F2o.Cost.get(ItemDefines_1.EItemId.Power)
        : e) &&
      ((r = this.U2o.AddItemByKey(POWER_COST_KEY)).SetIconByItemId(
        ItemDefines_1.EItemId.Power,
      ),
      r.SetClickHelpFunc(this.mji),
      r.SetLeftText(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CostStamina") ??
          "",
      ),
      r.SetRightText("x" + e.toString())),
      (this.rFo = this.U2o.AddItemByKey(REBORN_TIME_KEY)),
      this.rFo?.SetLeftText(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "LastTimeToRefresh",
        ) ?? "",
      ),
      this.rFo?.SetHelpButtonVisible(!1),
      this.rFo?.SetActive(!1);
    var i,
      t,
      r = this.F2o.SharedId;
    0 < r &&
      0 <
        (i =
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
          (i - r).toString(),
          i.toString(),
        ),
      ),
      t.SetHelpButtonVisible(!1));
  }
  W2o() {
    var e = ModelManager_1.ModelManager.MapModel.IsLevelPlayOccupied(
      this.Ymt.Id,
    );
    this.ZAt.SetActive(!e.IsOccupied),
      this.GetItem(12).SetUIActive(e.IsOccupied),
      e.IsOccupied &&
        ((e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
          e.QuestId,
        )),
        (e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
          e.TreeConfigId,
        )),
        (e = StringUtils_1.StringUtils.Format(
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "Quest_Require_Note",
          ) ?? "",
          e.Name,
        )),
        this.GetText(13).SetText(e)),
      this.GetItem(17).SetUIActive(1 === this.u2o.MarkConfig.RelativeSubType);
  }
  InitRewards() {
    let e = !1;
    1 === this.u2o.MarkConfig.RelativeSubType &&
      ((i =
        ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(
          [3],
          !1,
        )),
      (e = void 0 !== i),
      i) &&
      ((i = i.GetNumTxtAndParam()),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(20), i[0], i[1], i[2])),
      this.GetItem(19).SetUIActive(e),
      this.O2o ||
        ((i = this.GetItem(8).GetOwner()),
        (t = this.GetVerticalLayout(7).RootUIComp),
        (this.k2o = new SceneGameplayTipGrid_1.SceneGameplayTipGrid()),
        this.k2o.Initialize(LguiUtil_1.LguiUtil.DuplicateActor(i, t)),
        (this.O2o = new SceneGameplayTipGrid_1.SceneGameplayTipGrid()),
        this.O2o.Initialize(LguiUtil_1.LguiUtil.DuplicateActor(i, t)),
        (this.O2o.OnClickPreviewCall = this.aFo));
    var i = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
      t =
        (this.k2o?.SetBtnPreviewVisible(!1),
        this.O2o.SetBtnPreviewVisible(this.nFo),
        this.Ymt.IsFirstPass);
    t
      ? this.K2o(this.k2o, void 0, 0, "")
      : this.K2o(this.k2o, this.V2o, i, "FirstReward"),
      this.K2o(this.O2o, this.F2o, i, "ProbReward", e);
  }
  K2o(e, r, a, i, s = !1) {
    if (r) {
      var o = r.PreviewReward;
      let t = void 0;
      if (o.has(a)) t = o.get(a).MapIntInt;
      else
        for (let e = a - 1; 0 <= e; e--)
          if (o.has(e)) {
            t = o.get(e).MapIntInt;
            break;
          }
      if (!t) {
        var n = r.RewardId;
        let i = 0;
        if (n.has(a)) i = n.get(a);
        else
          for (let e = a - 1; 0 <= e; e--)
            if (n.has(e)) {
              i = n.get(e);
              break;
            }
        i &&
          0 < i &&
          ((d = DropPackageById_1.configDropPackageById.GetConfig(i))
            ? (t = d.DropPreview)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneGameplay",
                18,
                "兑换奖励表配置的掉落ID读取不到掉落奖励",
                ["兑换奖励ID", r.Id],
              ));
      }
      if (1 === this.u2o.MarkConfig.RelativeSubType) {
        var h,
          _,
          l,
          d = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel(),
          M =
            ConfigManager_1.ConfigManager.CalabashConfig?.GetCalabashConfigByLevel(
              d,
            ),
          g = [];
        for ([h] of t)
          this._Fo(h) &&
            ((_ =
              ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
                h,
              )),
            (l = M.QualityDropWeight.get(_.QualityId) ?? 0),
            _.ShowTypes.includes(TARGET_ITEM_SHOW_TYPE)) &&
            l <= 0 &&
            _ &&
            g.push(h);
        g.forEach((e) => {
          t.delete(e);
        });
      }
      t
        ? (e.Refresh(t, i, !1, !1, s), e.SetActive(!0))
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "SceneGameplay",
              18,
              "读取不到奖励配置",
              ["兑换奖励ID", r.Id],
              ["WorldLevel", a],
            ),
          e.SetActive(!1));
    } else e.SetActive(!1);
  }
  _Fo(e) {
    e =
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
        e,
      );
    return 7 === e || 0 === e;
  }
  l_i() {
    let e = "";
    (e = this.u2o.IsTracked
      ? "InstanceDungeonEntranceCancelTrack"
      : "InstanceDungeonEntranceTrack"),
      this.ZAt.SetLocalText(e);
  }
  hFo() {
    var i = TimeUtil_1.TimeUtil.GetServerTime(),
      t = this.Ymt.RefreshTime;
    if (t < i) this.cG();
    else {
      t = t - i;
      let e = void 0;
      (e =
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
        this.rFo?.SetRightText(e),
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
