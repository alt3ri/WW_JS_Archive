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
  GenericLayoutAdd_1 = require("../../../Util/GenericLayoutAdd"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
  WorldMapController_1 = require("../../WorldMapController"),
  WorldMapDefine_1 = require("../../WorldMapDefine"),
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
      (this.OnInstanceRefresh = (e, t, i, n) => {
        var r = new TipsListView_1.InstanceDungeonCostTip();
        return r.SetRootActor(t.GetOwner(), !0), { Key: e, Value: r };
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
  OnStart() {
    this.RootItem.SetRaycastTarget(!1),
      (this.ZAt = new ButtonItem_1.ButtonItem(this.GetButton(11).RootUIComp)),
      this.ZAt.SetFunction(this.m2o),
      this.GetItem(14)?.SetUIActive(!0),
      this.GetVerticalLayout(5)?.RootUIComp.SetUIActive(!0),
      (this.U2o = new GenericLayoutAdd_1.GenericLayoutAdd(
        this.GetVerticalLayout(5),
        this.OnInstanceRefresh,
      )),
      (this.A2o = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(7),
        this.sGe,
      ));
  }
  OnBeforeDestroy() {
    this.U2o.ClearChildren(), this.ZAt.Destroy();
  }
  OnShowWorldMapSecondaryUi(e) {
    var t;
    e
      ? ((this.u2o = e),
        (this.tli =
          0 !== e.MarkConfig.RelativeId
            ? e.MarkConfig.RelativeId
            : ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetEntranceIdByMarkId(
                e.MarkConfigId,
              )),
        this.tli
          ? (this.SHe(),
            InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.InstEntranceDetailRequest(
              this.tli,
            ).finally(() => {
              this.x2o(), this.w2o();
            }),
            this.l_i(),
            (t = this.P2o.UnLockCondition) &&
              !ModelManager_1.ModelManager.FunctionModel.IsOpen(t) &&
              ((t =
                ConfigManager_1.ConfigManager.FunctionConfig.GetFunctionCondition(
                  t,
                )),
              (t =
                ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(
                  t.OpenConditionId,
                )),
              LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t.HintText)))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "InstanceDungeon",
              17,
              "副本入口弹窗打开错误，副本入口表中找不到对应的地图标价Id！",
              ["MarkId", e.MarkConfigId],
            ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "InstanceDungeon",
          50,
          "副本入口弹窗打开错误，地图标记不存在",
        );
  }
  GetMaxUnlockInstanceList() {
    let e = new Array(),
      t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
        this.rli[0],
        ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
      );
    for (const r of this.rli) {
      var i;
      !ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(
        r,
      ) ||
        (i =
          ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
            r,
            ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
          )) < t ||
        (i > t && ((e = []), (t = i)), e.push(r));
    }
    if (0 === e.length)
      for (const o of this.rli) {
        var n =
          ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
            o,
            ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
          );
        n > t || (n < t && ((e = []), (t = n)), e.push(o));
      }
    return (
      e.sort(
        (e, t) =>
          (ModelManager_1.ModelManager.ExchangeRewardModel.GetInstanceDungeonIfCanExchange(
            e,
          )
            ? 0
            : 1) -
          (ModelManager_1.ModelManager.ExchangeRewardModel.GetInstanceDungeonIfCanExchange(
            t,
          )
            ? 0
            : 1),
      ),
      e
    );
  }
  SHe() {
    var e = this.P2o;
    e &&
      (this.GetText(4).ShowTextNew(e.Description),
      this.SetSpriteByPath(this.u2o.IconPath, this.GetSprite(0), !1),
      this.GetText(1).ShowTextNew(e.Name),
      (e = this.u2o.GetAreaText()) && this.GetText(3).SetText(e),
      this.GetItem(9).SetUIActive(!this.u2o.IsFogUnlock),
      this.GetText(10).ShowTextNew("Instance_Dungeon_Rcommand_Text"),
      this.GetItem(12).SetUIActive(!1),
      this.GetItem(8).SetUIActive(!1));
  }
  x2o() {
    this.rli.length = 0;
    var e,
      t =
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetSortedByTitleEntranceInstanceIdList(
          this.tli,
        );
    for ([e] of Array.from(t).sort((e, t) => e[1] - t[1])) this.rli.push(e);
    this.rli = this.GetMaxUnlockInstanceList();
    var i,
      t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
        this.rli[0],
      ),
      n =
        ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(
          t.CustomTypes,
        ),
      n =
        (this.GetItem(19).SetUIActive(void 0 !== n),
        n &&
          ((n = n.GetNumTxtAndParam()),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(20),
            n[0],
            n[1],
            n[2],
          )),
        this.A2o.RefreshByData(this.rli),
        t.RewardId),
      t =
        ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardConfig(
          n,
        )?.SharedId;
    t &&
      (this.U2o.AddItemToLayout([COUNT_LIMMIT_KEY]),
      (n = this.U2o.GetLayoutItemByKey(COUNT_LIMMIT_KEY)).SetIconVisible(!1),
      n.SetStarVisible(!1),
      (i = StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "Text_CanReceivedCount_Text",
        ) ?? "",
        "",
      )),
      n.SetLeftText(i),
      (i =
        ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeShareConfig(
          t,
        )),
      (t =
        ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeRewardShareCount(
          t,
        )),
      (t = (i = i.MaxCount) - t),
      n.SetRightText(
        StringUtils_1.StringUtils.Format("{0}/{1}", "" + t, "" + i),
      ),
      n.SetHelpButtonVisible(!1));
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
  w2o() {
    var e,
      t,
      i =
        ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeNormalConsume(
          this.rli[0],
        );
    i &&
      i[0] &&
      (this.U2o.AddItemToLayout([POWER_COST_KEY]),
      (e = this.U2o.GetLayoutItemByKey(POWER_COST_KEY)).SetStarVisible(!1),
      (t = i[0][0].ItemId),
      e.SetIconByItemId(t),
      e.SetLeftText(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CostStamina") ??
          "",
      ),
      e.SetHelpButtonVisible(!0),
      e.SetRightText(i[0][1].toString()),
      e.SetClickHelpFunc(this.mji));
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
