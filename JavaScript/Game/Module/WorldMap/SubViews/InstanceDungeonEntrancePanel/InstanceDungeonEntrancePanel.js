"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonEntrancePanel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityDoubleRewardController_1 = require("../../../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  HelpController_1 = require("../../../Help/HelpController"),
  InstanceDungeonEntranceController_1 = require("../../../InstanceDungeon/InstanceDungeonEntranceController"),
  InstanceTipGrid_1 = require("../../../InstanceDungeon/InstanceTipGrid"),
  MapController_1 = require("../../../Map/Controller/MapController"),
  MarkUiUtils_1 = require("../../../Map/Mark/Misc/MarkUiUtils"),
  TeleportController_1 = require("../../../Teleport/TeleportController"),
  GenericLayoutAdd_1 = require("../../../Util/GenericLayoutAdd"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
  WorldMapController_1 = require("../../WorldMapController"),
  WorldMapDefine_1 = require("../../WorldMapDefine"),
  MapTipsActivateTipPanel_1 = require("../Common/MapTipsActivateTipPanel"),
  TipsListView_1 = require("../TipsListView"),
  HELP_ID = 89,
  POWER_COST_KEY = "power",
  COUNT_LIMMIT_KEY = "countLimit";
class InstanceDungeonEntrancePanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments),
      (this.tli = 0),
      (this.rli = []),
      (this.u2o = void 0),
      (this.U2o = void 0),
      (this.A2o = void 0),
      (this.ZAt = void 0),
      (this.k4a = void 0),
      (this.N4a = void 0),
      (this.oza = void 0),
      (this.OnInstanceRefresh = (t, e, i, r) => {
        var n = new TipsListView_1.InstanceDungeonCostTip();
        return n.SetRootActor(e.GetOwner(), !0), { Key: t, Value: n };
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
      (this.mji = () => {
        HelpController_1.HelpController.OpenHelpById(HELP_ID);
      }),
      (this.sGe = () => {
        return new InstanceTipGrid_1.InstanceTipGrid();
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
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Map",
            64,
            "[地图系统]InstanceDungeonEntrancePanel->追踪标记",
            ["markId", t.MarkId],
            ["IsTracked", t.IsTracked],
          ),
          MapController_1.MapController.RequestTrackMapMark(
            t.MarkType,
            t.MarkId,
            !t.IsTracked,
          ),
          this.l_i(),
          this.Close();
      });
  }
  get P2o() {
    return this.tli
      ? ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(
          this.tli,
        )
      : void 0;
  }
  GetResourceId() {
    return "UiView_InstanceEntranceTip_Prefab";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos =
      WorldMapDefine_1.secondaryUiPanelComponentsRegisterInfoA;
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(),
      (this.oza = new MapTipsActivateTipPanel_1.MapTipsActivateTipPanel()),
      await this.oza.CreateByActorAsync(this.GetItem(31).GetOwner());
  }
  OnStart() {
    this.RootItem.SetRaycastTarget(!1),
      (this.ZAt = new ButtonItem_1.ButtonItem(this.GetButton(11).RootUIComp)),
      this.ZAt.SetFunction(this.m2o),
      (this.k4a = new ButtonItem_1.ButtonItem(this.GetButton(28).RootUIComp)),
      this.k4a.SetFunction(this.P8e),
      (this.N4a = new ButtonItem_1.ButtonItem(this.GetButton(29).RootUIComp)),
      this.N4a.SetFunction(this.F4a),
      this.GetVerticalLayout(5)?.RootUIComp.SetUIActive(!0),
      (this.U2o = new GenericLayoutAdd_1.GenericLayoutAdd(
        this.GetVerticalLayout(5),
        this.OnInstanceRefresh,
      )),
      (this.A2o = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(7),
        this.sGe,
      )),
      this.GetItem(25).SetUIActive(!1),
      this.GetItem(32).SetUIActive(!1),
      this.oza.SetUiActive(!1);
  }
  OnBeforeDestroy() {
    this.U2o.ClearChildren(),
      this.ZAt.Destroy(),
      this.k4a.Destroy(),
      this.N4a.Destroy(),
      this.oza.Destroy();
  }
  OnShowWorldMapSecondaryUi(t) {
    var e;
    t
      ? ((this.u2o = t),
        (this.tli =
          0 !== t.MarkConfig.RelativeId
            ? t.MarkConfig.RelativeId
            : ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetEntranceIdByMarkId(
                t.MarkConfigId,
              )),
        this.tli
          ? (this.SHe(),
            InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.InstEntranceDetailRequest(
              this.tli,
            ).finally(() => {
              this.x2o(), this.w2o();
            }),
            this.l_i(),
            (e = this.P2o.UnLockCondition) &&
              !ModelManager_1.ModelManager.FunctionModel.IsOpen(e) &&
              ((e =
                ConfigManager_1.ConfigManager.FunctionConfig.GetFunctionCondition(
                  e,
                )),
              (e =
                ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(
                  e.OpenConditionId,
                )),
              LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.HintText)))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "InstanceDungeon",
              17,
              "副本入口弹窗打开错误，副本入口表中找不到对应的地图标价Id！",
              ["MarkId", t.MarkConfigId],
            ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "InstanceDungeon",
          50,
          "副本入口弹窗打开错误，地图标记不存在",
        );
  }
  GetMaxUnlockInstanceList() {
    let t = new Array(),
      e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
        this.rli[0],
        ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
      );
    for (const n of this.rli) {
      var i;
      !ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(
        n,
      ) ||
        (i =
          ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
            n,
            ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
          )) < e ||
        (i > e && ((t = []), (e = i)), t.push(n));
    }
    if (0 === t.length)
      for (const s of this.rli) {
        var r =
          ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
            s,
            ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
          );
        r > e || (r < e && ((t = []), (e = r)), t.push(s));
      }
    return (
      t.sort(
        (t, e) =>
          (ModelManager_1.ModelManager.ExchangeRewardModel.GetInstanceDungeonIfCanExchange(
            t,
          )
            ? 0
            : 1) -
          (ModelManager_1.ModelManager.ExchangeRewardModel.GetInstanceDungeonIfCanExchange(
            e,
          )
            ? 0
            : 1),
      ),
      t
    );
  }
  SHe() {
    var t,
      e,
      i = this.P2o;
    i &&
      (this.GetText(4).ShowTextNew(i.Description),
      this.SetSpriteByPath(this.u2o.IconPath, this.GetSprite(0), !1),
      this.GetText(1).ShowTextNew(i.Name),
      (i = this.u2o.GetAreaText()) && this.GetText(3).SetText(i),
      this.GetItem(9).SetUIActive(!this.u2o.IsFogUnlock),
      this.GetText(10).ShowTextNew("Instance_Dungeon_Rcommand_Text"),
      this.GetItem(12).SetUIActive(!1),
      this.GetItem(8).SetUIActive(!1),
      this.GetItem(26).SetUIActive(!1),
      (i = MarkUiUtils_1.MarkUiUtils.IsShowGoto(this.u2o)),
      this.ZAt.SetActive(!i),
      this.GetItem(14).SetUIActive(!1),
      this.GetItem(32).SetUIActive(i),
      this.oza.SetUiActive(!1),
      i) &&
      ((i = this.GetButton(29)),
      (t = TeleportController_1.TeleportController.CheckCanTeleport()),
      (e = MarkUiUtils_1.MarkUiUtils.FindNearbyValidGotoMark(
        this.Map,
        this.u2o,
      )),
      this.oza.SetUiActive(!t || void 0 === e),
      i.SetSelfInteractive(t && void 0 !== e));
  }
  x2o() {
    this.rli.length = 0;
    var t,
      e =
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetSortedByTitleEntranceInstanceIdList(
          this.tli,
        );
    for ([t] of Array.from(e).sort((t, e) => t[1] - e[1])) this.rli.push(t);
    this.rli = this.GetMaxUnlockInstanceList();
    var i,
      e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
        this.rli[0],
      ),
      r =
        ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(
          e.CustomTypes,
        ),
      r =
        (this.GetItem(19).SetUIActive(void 0 !== r),
        r &&
          ((r = r.GetNumTxtAndParam()),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(20),
            r[0],
            r[1],
            r[2],
          )),
        this.A2o.RefreshByData(this.rli),
        e.RewardId),
      e =
        ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardConfig(
          r,
        )?.SharedId;
    e &&
      (this.U2o.AddItemToLayout([COUNT_LIMMIT_KEY]),
      (r = this.U2o.GetLayoutItemByKey(COUNT_LIMMIT_KEY)).SetIconVisible(!1),
      r.SetStarVisible(!1),
      (i = StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "Text_CanReceivedCount_Text",
        ) ?? "",
        "",
      )),
      r.SetLeftText(i),
      (i =
        ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeShareConfig(
          e,
        )),
      (e =
        ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeRewardShareCount(
          e,
        )),
      (e = (i = i.MaxCount) - e),
      r.SetRightText(
        StringUtils_1.StringUtils.Format("{0}/{1}", "" + e, "" + i),
      ),
      r.SetHelpButtonVisible(!1));
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
  w2o() {
    var t,
      e,
      i =
        ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeNormalConsume(
          this.rli[0],
        );
    i &&
      i[0] &&
      (this.U2o.AddItemToLayout([POWER_COST_KEY]),
      (t = this.U2o.GetLayoutItemByKey(POWER_COST_KEY)).SetStarVisible(!1),
      (e = i[0][0].ItemId),
      t.SetIconByItemId(e),
      t.SetLeftText(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CostStamina") ??
          "",
      ),
      t.SetHelpButtonVisible(!0),
      t.SetRightText(i[0][1].toString()),
      t.SetClickHelpFunc(this.mji));
  }
  OnCloseWorldMapSecondaryUi() {
    this?.U2o?.ClearChildren();
  }
  GetGuideFocusUiItem() {
    return this.GetButton(11)
      .GetOwner()
      .GetComponentByClass(UE.UIItem.StaticClass());
  }
}
exports.InstanceDungeonEntrancePanel = InstanceDungeonEntrancePanel;
//# sourceMappingURL=InstanceDungeonEntrancePanel.js.map
