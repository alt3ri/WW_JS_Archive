"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LordGymPanel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  DropPackageById_1 = require("../../../../../Core/Define/ConfigQuery/DropPackageById"),
  ExchangeRewardById_1 = require("../../../../../Core/Define/ConfigQuery/ExchangeRewardById"),
  MapMarkByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/MapMarkByMarkId"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  LevelPlay_1 = require("../../../LevelPlay/LevelPlay"),
  MapController_1 = require("../../../Map/Controller/MapController"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
  WorldMapDefine_1 = require("../../WorldMapDefine"),
  SceneGameplayTipGrid_1 = require("../SceneGameplayPanel/SceneGameplayTipGrid");
class LordGymPanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments),
      (this.Ymt = void 0),
      (this.u2o = void 0),
      (this.O2o = void 0),
      (this.k2o = void 0),
      (this.F2o = void 0),
      (this.V2o = void 0),
      (this.IRe = void 0),
      (this.H2o = void 0),
      (this.ZAt = void 0),
      (this.j2o = !1),
      (this.OnCreateDifficultyItem = () => new DifficultyItem()),
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
      });
  }
  GetResourceId() {
    return "UiView_InstanceEntranceTip_Prefab_2";
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos =
      WorldMapDefine_1.secondaryUiPanelComponentsRegisterInfoA),
      (this.BtnBindInfo = [[15, this.UOe]]);
  }
  OnStart() {
    this.RootItem.SetRaycastTarget(!1),
      this.GetItem(14).SetUIActive(!0),
      (this.H2o = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(16),
        this.OnCreateDifficultyItem,
      )),
      this.H2o.SetActive(!0),
      (this.ZAt = new ButtonItem_1.ButtonItem(this.GetButton(11).RootUIComp)),
      this.ZAt.SetFunction(this.m2o);
  }
  OnBeforeDestroy() {
    this.H2o.ClearChildren(),
      this.AddChild(this.ZAt),
      this.O2o && (this.AddChild(this.O2o), (this.O2o = void 0)),
      this.k2o && (this.AddChild(this.k2o), (this.k2o = void 0)),
      (this.F2o = void 0),
      (this.V2o = void 0);
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
        this.SHe(),
        this.l_i())
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "SceneGameplay",
          18,
          "玩法弹窗打开错误，地图标记不存在",
        );
  }
  OnCloseWorldMapSecondaryUi() {
    this.IRe &&
      (TimerSystem_1.TimerSystem.Remove(this.IRe), (this.IRe = void 0));
  }
  SHe() {
    var e,
      i,
      t = this.u2o.MarkConfigId,
      r = MapMarkByMarkId_1.configMapMarkByMarkId.GetConfig(t);
    r
      ? (this.GetText(1).ShowTextNew(r.MarkTitle),
        this.GetText(4).ShowTextNew(r.MarkDesc),
        (r = this.u2o.GetAreaText()) && this.GetText(3).SetText(r),
        (r =
          ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfigByMarkId(
            this.u2o.MarkId,
          )),
        (e =
          ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceLordList(
            r.Id,
          )),
        (i = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(
          this.Ymt.Id,
        )?.LevelPlayRewardConfig),
        (r =
          ModelManager_1.ModelManager.LordGymModel.GetMaxDifficultyLordGymEntranceCanFight(
            r.Id,
          ) ?? 1),
        (this.F2o = ExchangeRewardById_1.configExchangeRewardById.GetConfig(
          i.RewardConfig[r - 1].RewardId,
        )),
        (this.V2o = this.Ymt.FirstRewardId
          ? ExchangeRewardById_1.configExchangeRewardById.GetConfig(
              this.Ymt.FirstRewardId,
            )
          : void 0),
        (i = e[r - 1]),
        (this.j2o =
          ModelManager_1.ModelManager.LordGymModel.GetLordGymIsFinish(i)),
        this.H2o.RefreshByData(e),
        this.GetItem(9).SetUIActive(!1),
        this.GetItem(12).SetUIActive(!1),
        this.GetItem(8).SetUIActive(!1),
        this.InitRewards(),
        this.W2o())
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("SceneGameplay", 18, "缺少标记配置", ["MarkId", t]);
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
        this.GetText(13).SetText(e));
  }
  InitRewards() {
    this.O2o ||
      ((i = this.GetItem(8).GetOwner()),
      (e = this.GetVerticalLayout(7).RootUIComp),
      (this.k2o = new SceneGameplayTipGrid_1.SceneGameplayTipGrid()),
      this.k2o.Initialize(LguiUtil_1.LguiUtil.DuplicateActor(i, e)),
      (this.O2o = new SceneGameplayTipGrid_1.SceneGameplayTipGrid()),
      this.O2o.Initialize(LguiUtil_1.LguiUtil.DuplicateActor(i, e)));
    var e,
      i = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
    this.Ymt.IsFirstPass
      ? this.K2o(this.k2o, void 0, 0, "", this.j2o)
      : this.K2o(this.k2o, this.V2o, i, "FirstPassReward"),
      this.K2o(this.O2o, this.F2o, i, "FirstPassReward", this.j2o);
  }
  K2o(e, r, a, i, s = !1) {
    if (r) {
      var n = r.PreviewReward;
      let t = void 0;
      if (n.has(a)) t = n.get(a).MapIntInt;
      else
        for (let e = a - 1; 0 <= e; e--)
          if (n.has(e)) {
            t = n.get(e).MapIntInt;
            break;
          }
      if (!t) {
        var o,
          h = r.RewardId;
        let i = 0;
        if (h.has(a)) i = h.get(a);
        else
          for (let e = a - 1; 0 <= e; e--)
            if (h.has(e)) {
              i = h.get(e);
              break;
            }
        i &&
          0 < i &&
          ((o = DropPackageById_1.configDropPackageById.GetConfig(i))
            ? (t = o.DropPreview)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneGameplay",
                18,
                "兑换奖励表配置的掉落ID读取不到掉落奖励",
                ["兑换奖励ID", r.Id],
              ));
      }
      t
        ? (e.Refresh(t, i, !0, s), e.SetActive(!0))
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
  l_i() {
    let e = "";
    (e = this.u2o.IsTracked
      ? "InstanceDungeonEntranceCancelTrack"
      : "InstanceDungeonEntranceTrack"),
      this.ZAt.SetLocalText(e);
  }
}
exports.LordGymPanel = LordGymPanel;
class DifficultyItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UISprite],
    ];
  }
  Refresh(e, i, t) {
    var r = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(e),
      r =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          "LordGymDifficulty",
          r.Difficulty,
        ),
        ModelManager_1.ModelManager.LordGymModel.GetLordGymIsUnLock(e)),
      a = ModelManager_1.ModelManager.LordGymModel.GetLordGymIsFinish(e),
      e = ModelManager_1.ModelManager.LordGymModel.GetLastGymFinish(e);
    this.GetSprite(3)?.SetUIActive(a),
      this.GetSprite(2)?.SetUIActive(e && r && !a),
      this.GetSprite(1)?.SetUIActive(!e || !r);
  }
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, i) {
    return this.GridIndex;
  }
}
//# sourceMappingURL=LordGymPanel.js.map
