"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneGameplayPanel = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
const DropPackageById_1 = require("../../../../../Core/Define/ConfigQuery/DropPackageById");
const ExchangeRewardById_1 = require("../../../../../Core/Define/ConfigQuery/ExchangeRewardById");
const MapMarkByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/MapMarkByMarkId");
const MapMarkPhantomGroupByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/MapMarkPhantomGroupByMarkId");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityDoubleRewardController_1 = require("../../../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const HelpController_1 = require("../../../Help/HelpController");
const ItemDefines_1 = require("../../../Item/Data/ItemDefines");
const LevelPlay_1 = require("../../../LevelPlay/LevelPlay");
const MapController_1 = require("../../../Map/Controller/MapController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi");
const WorldMapDefine_1 = require("../../WorldMapDefine");
const TipsListView_1 = require("../TipsListView");
const SceneGameplayTipGrid_1 = require("./SceneGameplayTipGrid");
const POWER_DISCOUNT_HELP_ID = 26;
const POWER_COST_KEY = "power";
const REBORN_TIME_KEY = "reborn";
const REWARD_SHARE_COUNT = "reward";
const TARGET_ITEM_SHOW_TYPE = 41;
class SceneGameplayPanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments),
      (this.Nct = void 0),
      (this.dko = void 0),
      (this.Vko = void 0),
      (this.Hko = void 0),
      (this.jko = void 0),
      (this.Wko = void 0),
      (this.IRe = void 0),
      (this.xko = void 0),
      (this.$Ut = void 0),
      (this.a2o = void 0),
      (this.h2o = !1),
      (this.CHi = () => {
        HelpController_1.HelpController.OpenHelpById(POWER_DISCOUNT_HELP_ID);
      }),
      (this.gko = () => {
        const e = this.dko.IsTracked;
        MapController_1.MapController.RequestTrackMapMark(
          this.dko.MarkType,
          this.dko.MarkId,
          !e,
        ),
          this.Close();
      }),
      (this.UOe = () => {
        let e = ModelManager_1.ModelManager.MapModel.IsLevelPlayOccupied(
          this.Nct.Id,
        );
        e.IsOccupied &&
          ((e =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              e.QuestId,
            )),
          UiManager_1.UiManager.OpenView("QuestView", e.TreeConfigId));
      }),
      (this.l2o = () => {
        ModelManager_1.ModelManager.CalabashModel.OnlyShowBattleFettersTab = !0;
        const e =
          MapMarkPhantomGroupByMarkId_1.configMapMarkPhantomGroupByMarkId.GetConfig(
            this.dko.MarkId,
          );
        (ModelManager_1.ModelManager.CalabashModel.OnlyShowPhantomFetterGroupIdList =
          e.ShowRange),
          UiManager_1.UiManager.OpenView("CalabashRootView");
      }),
      (this._2o = () => {
        UiManager_1.UiManager.OpenView(
          "SilentAreaRewardPreviewPopView",
          this.Nct.RewardId,
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
        [18, this.l2o],
      ]);
  }
  OnStart() {
    this.RootItem.SetRaycastTarget(!1),
      (this.xko = new TipsListView_1.TipsListView()),
      this.xko.Initialize(this.GetVerticalLayout(5)),
      (this.$Ut = new ButtonItem_1.ButtonItem(this.GetButton(11).RootUIComp)),
      this.$Ut.SetFunction(this.gko),
      this.GetItem(14).SetUIActive(!0),
      this.GetVerticalLayout(5)?.RootUIComp?.SetUIActive(!0);
  }
  OnBeforeDestroy() {
    this.xko.Clear(),
      this.$Ut.Destroy(),
      (this.a2o = void 0),
      this.Vko && (this.AddChild(this.Vko), (this.Vko = void 0)),
      this.Hko && (this.AddChild(this.Hko), (this.Hko = void 0)),
      (this.jko = void 0),
      (this.Wko = void 0),
      this.cG(),
      (ModelManager_1.ModelManager.CalabashModel.OnlyShowBattleFettersTab = !1);
  }
  OnShowWorldMapSecondaryUi(e) {
    e
      ? ((this.dko = e),
        this.SetSpriteByPath(this.dko.IconPath, this.GetSprite(0), !1),
        (this.Nct = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(
          e.MarkConfig.RelativeId,
        )),
        this.Nct ||
          ((this.Nct = new LevelPlay_1.LevelPlayInfo(e.MarkConfig.RelativeId)),
          this.Nct.InitConfig()),
        (this.IRe = void 0),
        (this.h2o =
          this.dko?.MarkConfig?.RelativeSubType === 1 ||
          this.dko?.MarkConfig?.RelativeSubType === 2),
        this.h7e(),
        this.l1i(),
        this.u2o())
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "SceneGameplay",
          18,
          "玩法弹窗打开错误，地图标记不存在",
        );
  }
  OnCloseWorldMapSecondaryUi() {
    this.xko.Clear(),
      this.IRe &&
        (TimerSystem_1.TimerSystem.Remove(this.IRe), (this.IRe = void 0)),
      (this.a2o = void 0),
      (ModelManager_1.ModelManager.CalabashModel.OnlyShowBattleFettersTab = !1);
  }
  h7e() {
    (this.jko = ExchangeRewardById_1.configExchangeRewardById.GetConfig(
      this.Nct.RewardId,
    )),
      (this.Wko = this.Nct.FirstRewardId
        ? ExchangeRewardById_1.configExchangeRewardById.GetConfig(
            this.Nct.FirstRewardId,
          )
        : void 0);
    let e;
    let i;
    const t = this.dko.MarkConfigId;
    const r = MapMarkByMarkId_1.configMapMarkByMarkId.GetConfig(t);
    r
      ? ((e = (i = this.dko.IsRelativeFunctionOpen())
          ? r.MarkTitle
          : "UnknownPlace"),
        this.GetText(1).ShowTextNew(e),
        (e = i ? r.MarkDesc : "UnknownPlaceContent"),
        this.GetText(4).ShowTextNew(e),
        this.c2o(),
        this.GetItem(9).SetUIActive(!1),
        this.GetItem(12).SetUIActive(!1),
        this.GetItem(8).SetUIActive(!1),
        (i = this.dko.GetAreaText()) && this.GetText(3).SetText(i),
        this.GetButton(18).RootUIComp?.SetUIActive(
          this.dko.MarkConfig.RelativeSubType === 1,
        ),
        this.InitRewards(),
        this.Xko())
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("SceneGameplay", 18, "缺少标记配置", ["MarkId", t]);
  }
  c2o() {
    let e = 0;
    (e = this.jko?.Cost.has(ItemDefines_1.EItemId.Power)
      ? this.jko.Cost.get(ItemDefines_1.EItemId.Power)
      : e) > 0 &&
      ((r = this.xko.AddItemByKey(POWER_COST_KEY)).SetIconByItemId(
        ItemDefines_1.EItemId.Power,
      ),
      r.SetHelpButtonVisible(!1),
      r.SetClickHelpFunc(this.CHi),
      r.SetLeftText(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CostStamina") ??
          "",
      ),
      r.SetRightText("x" + e.toString())),
      (this.a2o = this.xko.AddItemByKey(REBORN_TIME_KEY)),
      this.a2o?.SetLeftText(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "LastTimeToRefresh",
        ) ?? "",
      ),
      this.a2o?.SetHelpButtonVisible(!1),
      this.a2o?.SetActive(!1);
    let i;
    let t;
    var r = this.jko.SharedId;
    r > 0 &&
      (i = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetShareMaxCount(
        this.jko.SharedId,
      )) > 0 &&
      ((r =
        ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeRewardShareCount(
          r,
        )),
      (t = this.xko.AddItemByKey(REWARD_SHARE_COUNT)).SetLeftText(
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
  Xko() {
    let e = ModelManager_1.ModelManager.MapModel.IsLevelPlayOccupied(
      this.Nct.Id,
    );
    this.$Ut.SetActive(!e.IsOccupied),
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
      this.GetItem(17).SetUIActive(this.dko.MarkConfig.RelativeSubType === 1);
  }
  InitRewards() {
    let e = !1;
    this.dko.MarkConfig.RelativeSubType === 1 &&
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
      this.Vko ||
        ((i = this.GetItem(8).GetOwner()),
        (t = this.GetVerticalLayout(7).RootUIComp),
        (this.Hko = new SceneGameplayTipGrid_1.SceneGameplayTipGrid()),
        this.Hko.Initialize(LguiUtil_1.LguiUtil.DuplicateActor(i, t)),
        (this.Vko = new SceneGameplayTipGrid_1.SceneGameplayTipGrid()),
        this.Vko.Initialize(LguiUtil_1.LguiUtil.DuplicateActor(i, t)),
        (this.Vko.OnClickPreviewCall = this._2o));
    var i = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
    var t =
      (this.Hko?.SetBtnPreviewVisible(!1),
      this.Vko.SetBtnPreviewVisible(this.h2o),
      this.Nct.IsFirstPass);
    t
      ? this.$ko(this.Hko, void 0, 0, "")
      : this.$ko(this.Hko, this.Wko, i, "FirstReward"),
      this.$ko(this.Vko, this.jko, i, "ProbReward", e);
  }
  $ko(e, r, a, i, s = !1) {
    if (r) {
      const o = r.PreviewReward;
      let t = void 0;
      if (o.has(a)) t = o.get(a).MapIntInt;
      else
        for (let e = a - 1; e >= 0; e--)
          if (o.has(e)) {
            t = o.get(e).MapIntInt;
            break;
          }
      if (!t) {
        const n = r.RewardId;
        let i = 0;
        if (n.has(a)) i = n.get(a);
        else
          for (let e = a - 1; e >= 0; e--)
            if (n.has(e)) {
              i = n.get(e);
              break;
            }
        i &&
          i > 0 &&
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
      if (this.dko.MarkConfig.RelativeSubType === 1) {
        let h;
        let _;
        let l;
        var d = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel();
        const M =
          ConfigManager_1.ConfigManager.CalabashConfig?.GetCalabashConfigByLevel(
            d,
          );
        const g = [];
        for ([h] of t)
          this.m2o(h) &&
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
  m2o(e) {
    e =
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
        e,
      );
    return e === 7 || e === 0;
  }
  l1i() {
    let e = "";
    (e = this.dko.IsTracked
      ? "InstanceDungeonEntranceCancelTrack"
      : "InstanceDungeonEntranceTrack"),
      this.$Ut.SetLocalText(e);
  }
  u2o() {
    const i = TimeUtil_1.TimeUtil.GetServerTime();
    let t = this.Nct.RefreshTime;
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
        this.a2o?.SetRightText(e),
        void 0 === this.IRe && this.rqo();
    }
  }
  rqo() {
    this.a2o?.SetActive(!0),
      (this.IRe = TimerSystem_1.TimerSystem.Forever(() => {
        this.u2o();
      }, TimeUtil_1.TimeUtil.InverseMillisecond));
  }
  cG() {
    void 0 !== this.IRe &&
      TimerSystem_1.TimerSystem.Has(this.IRe) &&
      (TimerSystem_1.TimerSystem.Remove(this.IRe),
      (this.IRe = void 0),
      this.a2o?.SetActive(!1));
  }
}
exports.SceneGameplayPanel = SceneGameplayPanel;
// # sourceMappingURL=SceneGameplayPanel.js.map
