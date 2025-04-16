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
  HelpController_1 = require("../../../Help/HelpController"),
  InstanceDungeonEntranceController_1 = require("../../../InstanceDungeon/InstanceDungeonEntranceController"),
  InstanceTipGrid_1 = require("../../../InstanceDungeon/InstanceTipGrid"),
  MapHelper_1 = require("../../../Map/MapHelper"),
  GenericLayoutAdd_1 = require("../../../Util/GenericLayoutAdd"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  TipsListView_1 = require("../TipsListView"),
  WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA"),
  WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper"),
  HELP_ID = 89,
  POWER_COST_KEY = "power",
  COUNT_LIMMIT_KEY = "countLimit";
class InstanceDungeonEntrancePanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments),
      (this.tli = 0),
      (this.rli = []),
      (this.u2o = void 0),
      (this.U2o = void 0),
      (this.A2o = void 0),
      (this.OnInstanceRefresh = (e, t, i, r) => {
        var n = new TipsListView_1.InstanceDungeonCostTip();
        return n.SetRootActor(t.GetOwner(), !0), { Key: e, Value: n };
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
  OnStart() {
    this.GetVerticalLayout(5)?.RootUIComp.SetUIActive(!0),
      (this.U2o = new GenericLayoutAdd_1.GenericLayoutAdd(
        this.GetVerticalLayout(5),
        this.OnInstanceRefresh,
      )),
      (this.A2o = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(7),
        this.sGe,
      )),
      super.OnStart();
  }
  OnBeforeDestroy() {
    this.U2o.ClearChildren(), super.OnBeforeDestroy();
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout(), this.GetItem(32).SetUIActive(!1);
  }
  OnShowWorldMapSecondaryUi(e) {
    this.u2o = e;
    var t = (this.LayoutContext.MarkItem = e).MarkConfig.RelativeId,
      e = e.MarkConfigId;
    (this.tli =
      0 !== t
        ? t
        : ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetEntranceIdByMarkId(
            e,
          )),
      this.tli
        ? (this.SHe(),
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.InstEntranceDetailRequest(
            this.tli,
          ).finally(() => {
            this.x2o(), this.w2o();
          }),
          WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithFastMoveStyle(
            this.LayoutContext,
          ),
          WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(
            this.LayoutContext,
          ),
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
            16,
            "副本入口弹窗打开错误，副本入口表中找不到对应的地图标记Id！",
            ["MarkId", e],
          );
  }
  GetMaxUnlockInstanceList() {
    let e = new Array(),
      t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
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
          )) < t ||
        (i > t && ((e = []), (t = i)), e.push(n));
    }
    if (0 === e.length)
      for (const a of this.rli) {
        var r =
          ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
            a,
            ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
          );
        r > t || (r < t && ((e = []), (t = r)), e.push(a));
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
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIcon(
        this.LayoutContext,
      ),
      this.GetText(1).ShowTextNew(e.Name),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByConfigMarkItem(
        this.LayoutContext,
      ),
      this.GetItem(9).SetUIActive(!this.u2o.IsFogUnlock),
      this.GetText(10).ShowTextNew("Instance_Dungeon_Rcommand_Text"),
      (e = this.UpdateQuickGoto()),
      this.ConfirmButton.SetActive(!e));
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
    var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
        this.rli[0],
      ),
      i =
        ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(
          t.CustomTypes,
        ),
      [r, i, n, a, o] =
        (this.GetItem(19).SetUIActive(void 0 !== i),
        i &&
          ((i = i.GetNumTxtAndParam()),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(20),
            i[0],
            i[1],
            i[2],
          ),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(40),
            "Double_reward_tips_02",
          )),
        MapHelper_1.MapHelper.GetDoubleRestAndMaxTimes(this.u2o)),
      s =
        (r &&
          (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(20), a, i, n),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(40), o),
          this.GetText(40).SetUIActive(r)),
        this.GetItem(19).SetUIActive(r),
        []);
    for (const _ of this.rli) s.push({ InstanceId: _, IsDouble: r });
    this.A2o.RefreshByData(s);
    var a = t.RewardId,
      i =
        ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardConfig(
          a,
        )?.SharedId;
    i &&
      (this.U2o.AddItemToLayout([COUNT_LIMMIT_KEY]),
      (n = this.U2o.GetLayoutItemByKey(COUNT_LIMMIT_KEY)).SetIconVisible(!1),
      n.SetStarVisible(!1),
      (o = StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "Text_CanReceivedCount_Text",
        ) ?? "",
        "",
      )),
      n.SetLeftText(o),
      (t =
        ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeShareConfig(
          i,
        )),
      (a =
        ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeRewardShareCount(
          i,
        )),
      (i = (o = t.MaxCount) - a),
      n.SetRightText(
        StringUtils_1.StringUtils.Format("{0}/{1}", "" + i, "" + o),
      ),
      n.SetHelpButtonVisible(!1));
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
