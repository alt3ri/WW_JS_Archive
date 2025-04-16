"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LordGymPanel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  DropPackageById_1 = require("../../../../../Core/Define/ConfigQuery/DropPackageById"),
  ExchangeRewardById_1 = require("../../../../../Core/Define/ConfigQuery/ExchangeRewardById"),
  LordGymEntranceGroupByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/LordGymEntranceGroupByMarkId"),
  LordGymEntranceSetByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/LordGymEntranceSetByMarkId"),
  MonsterInfoById_1 = require("../../../../../Core/Define/ConfigQuery/MonsterInfoById"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  LevelPlay_1 = require("../../../LevelPlay/LevelPlay"),
  MarkUiUtils_1 = require("../../../Map/Mark/Misc/MarkUiUtils"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  WorldMapController_1 = require("../../WorldMapController"),
  SceneGameplayTipGrid_1 = require("../SceneGameplayPanel/SceneGameplayTipGrid"),
  WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA"),
  WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper"),
  LordGymDifficultyStateItem_1 = require("./LordGymDifficultyStateItem");
class LordGymPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments),
      (this.lql = !1),
      (this.Ymt = void 0),
      (this.u2o = void 0),
      (this.O2o = void 0),
      (this.k2o = void 0),
      (this.F2o = void 0),
      (this.V2o = void 0),
      (this.IRe = void 0),
      (this.H2o = void 0),
      (this.j2o = !1),
      (this.OnCreateDifficultyItem = () => new DifficultyItem()),
      (this.OnDetailBtnClick = () => {
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
  OnStart() {
    (this.H2o = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(16),
      this.OnCreateDifficultyItem,
    )),
      this.H2o.SetActive(!0),
      super.OnStart();
  }
  OnBeforeDestroy() {
    this.H2o.ClearChildren(),
      this.O2o && (this.AddChild(this.O2o), (this.O2o = void 0)),
      this.k2o && (this.AddChild(this.k2o), (this.k2o = void 0)),
      (this.F2o = void 0),
      (this.V2o = void 0),
      super.OnBeforeDestroy();
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout(),
      this.GetVerticalLayout(5).RootUIComp.SetUIActive(!1),
      this.GetVerticalLayout(16).RootUIComp.SetUIActive(!0),
      this.GetItem(32).SetUIActive(!1);
  }
  OnShowWorldMapSecondaryUi(e) {
    (this.lql = e.IsNewLordGym()),
      (this.u2o = e),
      (this.LayoutContext.MarkItem = e),
      (this.Ymt = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(
        e.MarkConfig.RelativeId,
      )),
      this.Ymt ||
        ((this.Ymt = new LevelPlay_1.LevelPlayInfo(e.MarkConfig.RelativeId)),
        this.Ymt.InitConfig()),
      (this.IRe = void 0),
      this.SHe(),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithFastMoveStyle(
        this.LayoutContext,
      ),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(
        this.LayoutContext,
      );
  }
  OnCloseWorldMapSecondaryUi() {
    this.IRe &&
      (TimerSystem_1.TimerSystem.Remove(this.IRe), (this.IRe = void 0));
  }
  SHe() {
    var e = this.u2o.MarkConfigId;
    if (ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e)) {
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(
        this.LayoutContext,
      ),
        WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIconAndTitle(
          this.LayoutContext,
        ),
        WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateDesc(
          this.LayoutContext,
        ),
        WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByConfigMarkItem(
          this.LayoutContext,
        );
      var r =
          LordGymEntranceGroupByMarkId_1.configLordGymEntranceGroupByMarkId.GetConfigList(
            this.u2o.MarkId,
          ),
        i = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(
          this.Ymt.Id,
        )?.LevelPlayRewardConfig;
      if (this.lql) {
        var t =
            LordGymEntranceSetByMarkId_1.configLordGymEntranceSetByMarkId.GetConfig(
              this.u2o.MarkId,
            ),
          a = r.length,
          o = new Array(a);
        for (let e = 0; e < a; e++) {
          var s = r[e].LordGymList,
            n = s.length,
            d = new Array(n);
          let i = "";
          for (let r = 0; r < n; r++) {
            var l = s[r],
              h =
                (0 === r &&
                  ((h =
                    ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(
                      l,
                    ).MonsterList),
                  (h = MonsterInfoById_1.configMonsterInfoById.GetConfig(h[0])),
                  (i = h.Name)),
                ModelManager_1.ModelManager.LordGymModel.GetLordGymIsUnLock(l)),
              y =
                ModelManager_1.ModelManager.LordGymModel.GetLordGymIsFinish(l),
              l = ModelManager_1.ModelManager.LordGymModel.GetLastGymFinish(l);
            let e = 0;
            y ? (e = 2) : l && h && (e = 1), (d[r] = e);
          }
          var _ = { NameTextId: i, StateList: d };
          o[e] = _;
        }
        this.H2o.RefreshByData(o),
          (this.F2o = ExchangeRewardById_1.configExchangeRewardById.GetConfig(
            t.PreviewRewardId,
          ));
      } else {
        var t = r[0],
          M =
            ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymEntranceLordList(
              t.Id,
            ),
          t =
            ModelManager_1.ModelManager.LordGymModel.GetMaxDifficultyLordGymEntranceCanFight(
              t.Id,
            ) ?? 1,
          i =
            ((this.F2o =
              ExchangeRewardById_1.configExchangeRewardById.GetConfig(
                i.RewardConfig[t - 1].RewardId,
              )),
            (this.V2o = this.Ymt.FirstRewardId
              ? ExchangeRewardById_1.configExchangeRewardById.GetConfig(
                  this.Ymt.FirstRewardId,
                )
              : void 0),
            M[t - 1]),
          u =
            ((this.j2o =
              ModelManager_1.ModelManager.LordGymModel.GetLordGymIsFinish(i)),
            M.length),
          g = new Array(u);
        for (let r = 0; r < u; r++) {
          var c = M[r],
            p = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(c),
            L = ModelManager_1.ModelManager.LordGymModel.GetLordGymIsUnLock(c),
            f = ModelManager_1.ModelManager.LordGymModel.GetLordGymIsFinish(c),
            c = ModelManager_1.ModelManager.LordGymModel.GetLastGymFinish(c);
          let e = 0;
          f ? (e = 2) : c && L && (e = 1);
          f = {
            NameTextId: "LordGymDifficulty",
            NameTextArg: [p.Difficulty],
            StateList: [e],
          };
          g[r] = f;
        }
        this.H2o.RefreshByData(g);
      }
      this.xHl(), this.InitRewards(), this.W2o();
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("SceneGameplay", 17, "缺少标记配置", ["MarkId", e]);
  }
  xHl() {
    let e = !1,
      r = !1,
      i = !1;
    var t;
    this.lql
      ? ((t =
          ModelManager_1.ModelManager.MapModel.GetMarkExtraShowState(
            this.u2o.MarkId,
          ).ShowFlag !== Protocol_1.Aki.Protocol.U5s.Proto_ShowDisable),
        (i = t),
        (e = MarkUiUtils_1.MarkUiUtils.IsShowGoto(this.u2o)),
        (r = !e))
      : ((t = ModelManager_1.ModelManager.MapModel.IsLevelPlayOccupied(
          this.Ymt.Id,
        )),
        (e = !t.IsOccupied)),
      this.ConfirmButton.SetActive(r),
      this.ConfirmButton.SetEnableClick(i),
      this.UpdateQuickGotoActive(e);
  }
  W2o() {
    var e = ModelManager_1.ModelManager.MapModel.IsLevelPlayOccupied(
      this.Ymt.Id,
    );
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
      ((r = this.GetItem(8).GetOwner()),
      (e = this.GetVerticalLayout(7).RootUIComp),
      (this.k2o = new SceneGameplayTipGrid_1.SceneGameplayTipGrid()),
      this.k2o.Initialize(LguiUtil_1.LguiUtil.DuplicateActor(r, e)),
      (this.O2o = new SceneGameplayTipGrid_1.SceneGameplayTipGrid()),
      this.O2o.Initialize(LguiUtil_1.LguiUtil.DuplicateActor(r, e)));
    var e,
      r = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
    this.lql
      ? this.K2o(this.O2o, this.F2o, r, "NewLordGymPassReward", !1)
      : (this.Ymt.IsFirstPass
          ? this.K2o(this.k2o, void 0, 0, "", this.j2o)
          : this.K2o(this.k2o, this.V2o, r, "FirstPassReward"),
        this.K2o(this.O2o, this.F2o, r, "FirstPassReward", this.j2o));
  }
  K2o(e, t, a, r, o = !1) {
    if (t) {
      var s = t.PreviewReward;
      let i = void 0;
      if (s.has(a)) i = s.get(a).MapIntInt;
      else
        for (let e = a - 1; 0 <= e; e--)
          if (s.has(e)) {
            i = s.get(e).MapIntInt;
            break;
          }
      if (!i) {
        var n,
          d = t.RewardId;
        let r = 0;
        if (d.has(a)) r = d.get(a);
        else
          for (let e = a - 1; 0 <= e; e--)
            if (d.has(e)) {
              r = d.get(e);
              break;
            }
        r &&
          0 < r &&
          ((n = DropPackageById_1.configDropPackageById.GetConfig(r))
            ? (i = n.DropPreview)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneGameplay",
                17,
                "兑换奖励表配置的掉落ID读取不到掉落奖励",
                ["兑换奖励ID", t.Id],
              ));
      }
      i
        ? (e.Refresh(i, r, !0, o), e.SetActive(!0))
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "SceneGameplay",
              17,
              "读取不到奖励配置",
              ["兑换奖励ID", t.Id],
              ["WorldLevel", a],
            ),
          e.SetActive(!1));
    } else e.SetActive(!1);
  }
  HandleTeleportAndTrack() {
    var e = this.LayoutContext.MarkItem;
    !e.IsLocked && this.lql
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Map",
            43,
            "[地图系统]CommonGamePlayPanel->传送",
            ["markId", e.MarkId],
            ["IsTracked", e.IsTracked],
          ),
        WorldMapController_1.WorldMapController.TryTeleport(e.MarkConfigId))
      : this.HandleTrack();
  }
}
exports.LordGymPanel = LordGymPanel;
class DifficultyItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.hql = void 0),
      (this._ql = () =>
        new LordGymDifficultyStateItem_1.LordGymDifficultyStateItem());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIHorizontalLayout],
      [5, UE.UIItem],
    ];
  }
  OnStart() {
    this.GetItem(2)?.SetUIActive(!1),
      (this.hql = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(4),
        this._ql,
        this.GetItem(5).GetOwner(),
      ));
  }
  Refresh(e, r, i) {
    e.NameTextArg
      ? LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          e.NameTextId,
          ...e.NameTextArg,
        )
      : LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.NameTextId),
      this.hql?.RefreshByData(e.StateList);
  }
  GetKey(e, r) {
    return this.GridIndex;
  }
}
//# sourceMappingURL=LordGymPanel.js.map
