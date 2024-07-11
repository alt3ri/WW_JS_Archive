"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonEntrancePanel = void 0);
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityDoubleRewardController_1 = require("../../../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const HelpController_1 = require("../../../Help/HelpController");
const ExchangeRewardModel_1 = require("../../../InstanceDungeon/ExchangeReward/ExchangeRewardModel");
const InstanceDungeonEntranceController_1 = require("../../../InstanceDungeon/InstanceDungeonEntranceController");
const InstanceTipGrid_1 = require("../../../InstanceDungeon/InstanceTipGrid");
const MapController_1 = require("../../../Map/Controller/MapController");
const GenericLayoutAdd_1 = require("../../../Util/GenericLayoutAdd");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi");
const WorldMapController_1 = require("../../WorldMapController");
const WorldMapDefine_1 = require("../../WorldMapDefine");
const TipsListView_1 = require("../TipsListView");
const POWER_COST_KEY = "power";
const COUNT_LIMMIT_KEY = "countLimit";
class InstanceDungeonEntrancePanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments),
      (this.thi = 0),
      (this.rhi = []),
      (this.dko = void 0),
      (this.xko = void 0),
      (this.wko = void 0),
      (this.$Ut = void 0),
      (this.OnInstanceRefresh = (e, t, i, n) => {
        const r = new TipsListView_1.InstanceDungeonCostTip();
        return r.SetRootActor(t.GetOwner(), !0), { Key: e, Value: r };
      }),
      (this.gko = () => {
        this.dko.IsLocked
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Map", 50, "追踪", ["markId", this.dko.MarkId]),
            MapController_1.MapController.RequestTrackMapMark(
              this.dko.MarkType,
              this.dko.MarkId,
              !this.dko.IsTracked,
            ))
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Map", 50, "追踪", ["markId", this.dko.MarkId]),
            WorldMapController_1.WorldMapController.TryTeleport(this.dko)),
          this.Close();
      }),
      (this.CHi = () => {
        HelpController_1.HelpController.OpenHelpById(
          ExchangeRewardModel_1.POWER_DISCOUNT_HELP_ID,
        );
      }),
      (this.sGe = () => {
        return new InstanceTipGrid_1.InstanceTipGrid();
      });
  }
  get Bko() {
    return this.thi
      ? ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(
          this.thi,
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
      (this.$Ut = new ButtonItem_1.ButtonItem(this.GetButton(11).RootUIComp)),
      this.$Ut.SetFunction(this.gko),
      this.GetItem(14)?.SetUIActive(!0),
      this.GetVerticalLayout(5)?.RootUIComp.SetUIActive(!0),
      (this.xko = new GenericLayoutAdd_1.GenericLayoutAdd(
        this.GetVerticalLayout(5),
        this.OnInstanceRefresh,
      )),
      (this.wko = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(7),
        this.sGe,
      ));
  }
  OnBeforeDestroy() {
    this.xko.ClearChildren(), this.$Ut.Destroy();
  }
  OnShowWorldMapSecondaryUi(e) {
    let t;
    e
      ? ((this.dko = e),
        (this.thi =
          e.MarkConfig.RelativeId !== 0
            ? e.MarkConfig.RelativeId
            : ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetEntranceIdByMarkId(
                e.MarkConfigId,
              )),
        this.thi
          ? (this.h7e(),
            InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.InstEntranceDetailRequest(
              this.thi,
            ).finally(() => {
              this.bko(), this.qko();
            }),
            this.l1i(),
            (t = this.Bko.UnLockCondition) &&
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
    let e = new Array();
    let t =
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
        this.rhi[0],
        ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
      );
    for (const r of this.rhi) {
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
    if (e.length === 0)
      for (const o of this.rhi) {
        const n =
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
  h7e() {
    let e = this.Bko;
    e &&
      (this.GetText(4).ShowTextNew(e.Description),
      this.SetSpriteByPath(this.dko.IconPath, this.GetSprite(0), !1),
      this.GetText(1).ShowTextNew(e.Name),
      (e = this.dko.GetAreaText()) && this.GetText(3).SetText(e),
      this.GetItem(9).SetUIActive(!this.dko.IsFogUnlock),
      this.GetText(10).ShowTextNew("Instance_Dungeon_Rcommand_Text"),
      this.GetItem(12).SetUIActive(!1),
      this.GetItem(8).SetUIActive(!1));
  }
  bko() {
    this.rhi.length = 0;
    let e;
    var t =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetSortedByTitleEntranceInstanceIdList(
        this.thi,
      );
    for ([e] of Array.from(t).sort((e, t) => e[1] - t[1])) this.rhi.push(e);
    this.rhi = this.GetMaxUnlockInstanceList();
    let i;
    var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
      this.rhi[0],
    );
    var n =
      ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(
        t.CustomTypes,
      );
    var n =
      (this.GetItem(19).SetUIActive(void 0 !== n),
      n &&
        ((n = n.GetNumTxtAndParam()),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(20),
          n[0],
          n[1],
          n[2],
        )),
      this.wko.RefreshByData(this.rhi),
      t.RewardId);
    var t =
      ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardConfig(
        n,
      )?.SharedId;
    t &&
      (this.xko.AddItemToLayout([COUNT_LIMMIT_KEY]),
      (n = this.xko.GetLayoutItemByKey(COUNT_LIMMIT_KEY)).SetIconVisible(!1),
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
  l1i() {
    let e = "";
    (e = this.dko.IsLocked
      ? this.dko.IsTracked
        ? "InstanceDungeonEntranceCancelTrack"
        : "InstanceDungeonEntranceTrack"
      : "TeleportFastMove"),
      this.$Ut.SetLocalText(e);
  }
  qko() {
    let e;
    let t;
    const i =
      ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeNormalConsume(
        this.rhi[0],
      );
    i &&
      i[0] &&
      (this.xko.AddItemToLayout([POWER_COST_KEY]),
      (e = this.xko.GetLayoutItemByKey(POWER_COST_KEY)).SetStarVisible(!1),
      (t = i[0][0].ItemId),
      e.SetIconByItemId(t),
      e.SetLeftText(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CostStamina") ??
          "",
      ),
      e.SetHelpButtonVisible(!0),
      e.SetRightText(i[0][1].toString()),
      e.SetClickHelpFunc(this.CHi));
  }
  OnCloseWorldMapSecondaryUi() {
    this?.xko?.ClearChildren();
  }
  GetGuideFocusUiItem() {
    return this.GetButton(11)
      .GetOwner()
      .GetComponentByClass(UE.UIItem.StaticClass());
  }
}
exports.InstanceDungeonEntrancePanel = InstanceDungeonEntrancePanel;
// # sourceMappingURL=InstanceDungeonEntrancePanel.js.map
