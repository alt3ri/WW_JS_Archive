"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonInfoItem = void 0);
const ue_1 = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  ActivityMowingController_1 = require("../../Activity/ActivityContent/Mowing/ActivityMowingController"),
  RoguelikeBlackFlowerItem_1 = require("../../Roguelike/View/RoguelikeBlackFlowerItem"),
  TowerDefenceController_1 = require("../../TowerDefence/TowerDefenceController"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  InstanceDungeonEntranceRewardItem_1 = require("../InstanceDungeonEntranceRewardItem"),
  InstanceDungeonEntranceTowerDefenceItem_1 = require("../InstanceDungeonEntranceTowerDefenceItem"),
  InstanceDungeonBottomTipItem_1 = require("./InstanceDungeonBottomTipItem"),
  InstanceDungeonBuffItem_1 = require("./InstanceDungeonBuffItem"),
  InstanceDungeonCostItem_1 = require("./InstanceDungeonCostItem"),
  InstanceDungeonDescWidelyItem_1 = require("./InstanceDungeonDescWidelyItem"),
  InstanceDungeonLockItem_1 = require("./InstanceDungeonLockItem"),
  InstanceDungeonMatchingItem_1 = require("./InstanceDungeonMatchingItem"),
  InstanceDungeonMowingDropDownItem_1 = require("./InstanceDungeonMowingDropDownItem"),
  InstanceDungeonPicItem_1 = require("./InstanceDungeonPicItem"),
  InstanceDungeonRankTimeItem_1 = require("./InstanceDungeonRankTimeItem"),
  InstanceDungeonRecommendLevelItem_1 = require("./InstanceDungeonRecommendLevelItem"),
  InstanceDungeonRightTitleItem_1 = require("./InstanceDungeonRightTitleItem"),
  InstanceDungeonScoreListItem_1 = require("./InstanceDungeonScoreListItem"),
  InstanceDungeonStartButtonItem_1 = require("./InstanceDungeonStartButtonItem"),
  InstanceDungeonTitleWidelyItem_1 = require("./InstanceDungeonTitleWidelyItem");
class InstanceDungeonInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.NUe = 0),
      (this.Qth = void 0),
      (this.Kth = void 0),
      (this.jzs = void 0),
      (this.$th = void 0),
      (this.Xth = void 0),
      (this.gli = void 0),
      (this.Yth = void 0),
      (this.zth = void 0),
      (this.Jth = void 0),
      (this.Zth = void 0),
      (this.ygl = void 0),
      (this.eD_ = void 0),
      (this.tD_ = void 0),
      (this.iD_ = void 0),
      (this.j3_ = void 0),
      (this.H3_ = void 0),
      (this.$3_ = void 0),
      (this.W3_ = void 0),
      (this.SCc = void 0),
      (this.ct_ = []),
      (this.R$l = void 0),
      (this.rD_ = () =>
        new InstanceDungeonBottomTipItem_1.InstanceDungeonBottomTipItem()),
      (this.vMl = () => {
        var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
          this.NUe,
        );
        t && this.iih(t.InstSubType);
      });
  }
  OnRegisterComponent() {
    (this.R$l = this.OpenParam),
      (this.ComponentRegisterInfos = [
        [0, ue_1.UIItem],
        [1, ue_1.UIItem],
        [2, ue_1.UIItem],
        [3, ue_1.UIItem],
        [4, ue_1.UIVerticalLayout],
      ]);
  }
  async OnBeforeStartAsync() {
    var t = [];
    (this.Qth =
      new InstanceDungeonRightTitleItem_1.InstanceDungeonRightTitleItem()),
      t.push(
        this.Qth.CreateByResourceIdAsync(
          "UiItem_InstanceDungeon_RightTitle",
          this.GetItem(0),
        ),
      ),
      (this.zth =
        new InstanceDungeonStartButtonItem_1.InstanceDungeonStartButtonItem()),
      t.push(
        this.zth.CreateByResourceIdAsync(
          "UiItem_InstanceDungeon_StartButton",
          this.GetItem(2),
        ),
      ),
      (this.Jth =
        new InstanceDungeonMatchingItem_1.InstanceDungeonMatchingItem()),
      t.push(
        this.Jth.CreateByResourceIdAsync(
          "UiItem_InstanceDungeon_MatchingItem",
          this.GetItem(2),
        ),
      ),
      (this.Zth = new InstanceDungeonLockItem_1.InstanceDungeonLockItem()),
      t.push(
        this.Zth.CreateByResourceIdAsync(
          "UiItem_InstanceDungeon_Lock",
          this.GetItem(2),
        ),
      ),
      await Promise.all(t);
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRefreshInstancedRecommendLevel,
      this.vMl,
    );
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRefreshInstancedRecommendLevel,
      this.vMl,
    );
  }
  InitButton(t, e, n) {
    (this.zth.OnClickBtnSoloCallBack = t),
      (this.zth.OnClickBtnMultipleCallBack = e),
      (this.zth.OnClickBtnTeamCallBack = n);
  }
  async RefreshItem(t) {
    this.NUe = t;
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t);
    if (e) {
      ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.CheckRightTitleAvailableByInstanceId(
        t,
      ) && this.Qth.RefreshItem(e.MapName, e.DungeonDesc, e.RecommendElement),
        this.zth.RefreshItem(e.OnlineType),
        this.Egl(e),
        this.eih(e.MonsterTips, 0 < e.MonsterPreview.length),
        this.tih(e.InstSubType),
        this.oD_(e.InstSubType),
        this.MCc(t),
        this.iih(e.InstSubType),
        this.rih(),
        this.nD_(e.InstSubType),
        this.UpdateInstanceDungeonLockItemAndCostItem(),
        this.oih(e.InstSubType),
        this.Q3_(t),
        this.K3_(t),
        this.X3_(t),
        this.Y3_(t);
      for (const n of this.ct_) await n();
      this.ct_ = [];
    }
  }
  eih(t, e) {
    "" !== t || e
      ? this.Kth
        ? (this.Kth?.SetActive(!0), this.Kth?.RefreshItem(t, e))
        : ((this.Kth = new InstanceDungeonBuffItem_1.InstanceDungeonBuffItem()),
          this.ct_.push(async () =>
            this.Kth.CreateThenShowByResourceIdAsync(
              "UiItem_InstanceDungeon_Buff",
              this.GetItem(0),
            ).then(() => {
              this.Kth?.RefreshItem(t, e);
            }),
          ))
      : this.Kth?.SetActive(!1);
  }
  tih(t) {
    if (21 === t) {
      const e =
        TowerDefenceController_1.TowerDefenseController.BuildPhantomForInstanceDungeonEntranceData(
          this.NUe,
        );
      this.jzs
        ? (this.jzs.SetActive(!0), this.jzs.RefreshItem(e))
        : ((this.jzs =
            new InstanceDungeonEntranceTowerDefenceItem_1.InstanceDungeonEntranceTowerDefenceItem()),
          this.ct_.push(async () =>
            this.jzs
              .CreateThenShowByResourceIdAsync(
                "UiItem_InstanceDungeon_Reward",
                this.GetItem(0),
              )
              .then(() => {
                this.jzs.RefreshItem(e);
              }),
          ));
    } else this.jzs?.SetActive(!1);
  }
  oD_(t) {
    22 === t || !this.eD_
      ? this.eD_
        ? this.eD_.SetUIActive(!0)
        : this.ct_.push(async () => {
            var t = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
              "UiItem_InstanceDungeon_Rline",
              this.GetItem(1),
            );
            (this.eD_ = t.GetComponentByClass(ue_1.UIItem.StaticClass())),
              this.eD_.SetUIActive(!0);
          })
      : this.eD_.SetUIActive(!1);
  }
  iih(e) {
    if (21 === e || 19 === e || 22 === e) {
      let t = { TextId: "RecommendLevel", Level: 0 };
      21 === e
        ? (t =
            TowerDefenceController_1.TowerDefenseController.BuildRecommendLevelForInstanceDungeonEntranceData(
              this.NUe,
            ))
        : 22 === e
          ? ((e =
              ModelManager_1.ModelManager.MowingRiskModel.BuildInstanceRecommendDataByInstanceId(
                this.NUe,
              )),
            (t.TextId = e.TextId),
            (t.Level = e.RecommendLevel))
          : ((e =
              ActivityMowingController_1.ActivityMowingController.GetMowingActivityData()?.GetLevelDiffRecommendLevel(
                this.NUe,
              )),
            (t.Level = e ?? 0)),
        this.$th
          ? (this.$th.SetActive(!0), this.$th.RefreshItem(t))
          : ((this.$th =
              new InstanceDungeonRecommendLevelItem_1.InstanceDungeonRecommendLevelItem()),
            this.ct_.push(async () =>
              this.$th
                .CreateThenShowByResourceIdAsync(
                  "UiItem_InstanceDungeon_RecommenLevel",
                  this.GetItem(1),
                )
                .then(() => {
                  this.$th.RefreshItem(t);
                }),
            ));
    } else this.$th?.SetActive(!1);
  }
  nih() {
    var t =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(
        this.NUe,
      );
    if (!t || t <= 0) this.Xth?.SetUiActive(!1);
    else {
      const e =
        ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeNormalConsume(
          this.NUe,
        );
      this.Xth
        ? (this.Xth.SetActive(!0), this.Xth.RefreshItem(e[0]))
        : ((this.Xth = new InstanceDungeonCostItem_1.InstanceDungeonCostItem()),
          this.ct_.push(async () =>
            this.Xth.CreateThenShowByResourceIdAsync(
              "UiItem_InstanceDungeon_Cost",
              this.GetItem(1),
            ).then(() => {
              this.Xth.RefreshItem(e[0]);
            }),
          ));
    }
  }
  rih() {
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstanceDungeonReward(
      this.NUe,
    )[0].length <= 0
      ? this.gli?.SetActive(!1)
      : this.gli
        ? (this.gli.SetActive(!0), this.gli.RefreshItem(this.NUe))
        : ((this.gli =
            new InstanceDungeonEntranceRewardItem_1.InstanceDungeonEntranceRewardItem()),
          this.ct_.push(async () =>
            this.gli
              .CreateThenShowByResourceIdAsync(
                "UiItem_InstanceDungeon_Reward",
                this.GetItem(1),
              )
              .then(() => {
                this.gli.RefreshItem(this.NUe);
              }),
          ));
  }
  nD_(t) {
    let e = void 0;
    var n, i;
    22 === t &&
      ((e = []),
      (n = (t =
        ModelManager_1.ModelManager
          .MowingRiskModel).GetRiskHarvestInstConfigByInstanceId(this.NUe)),
      (i = {
        TextId: "riskofrain_total_num",
        TextArgs: [t.GetMaxScoreByInstanceId(this.NUe).toString()],
      }),
      e.push(i),
      n.Accumulate ||
        ((i = {
          TextId: "riskofrain_ratio_num",
          TextArgs: [t.GetMonsterRatioByInstanceId(this.NUe).toString()],
        }),
        e.push(i))),
      e && 0 !== e.length
        ? (this.GetVerticalLayout(4).RootUIComp.SetUIActive(!0),
          this.ct_.push(async () =>
            this.sD_().then(async () => {
              this.aD_(), await this.iD_?.RefreshByDataAsync(e ?? []);
            }),
          ))
        : this.GetVerticalLayout(4).RootUIComp.SetUIActive(!1);
  }
  async sD_() {
    this.tD_ ||
      ((this.tD_ =
        new InstanceDungeonBottomTipItem_1.InstanceDungeonBottomTipItem()),
      await this.tD_.CreateByResourceIdAsync(
        "UiItem_InstanceDungeon_Rtips",
        this.GetVerticalLayout(4).RootUIComp,
      ));
  }
  aD_() {
    var t;
    this.iD_ ||
      ((t = this.GetVerticalLayout(4)),
      (this.iD_ = new GenericLayout_1.GenericLayout(t, this.rD_)));
  }
  oih(t) {
    var t = 19 === t,
      e =
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(
          this.NUe,
        );
    t && e
      ? this.Yth
        ? (this.Yth.SetActive(!0), this.Yth.RefreshItem(this.NUe))
        : ((this.Yth =
            new InstanceDungeonMowingDropDownItem_1.InstanceDungeonMowingDropDownItem()),
          this.ct_.push(
            async () => (
              (this.Yth.SkipDestroyActor = !0),
              this.Yth.CreateThenShowByResourceIdAsync(
                "UiItem_InstanceDungeon_DropItem",
                this.GetItem(1),
              ).then(() => {
                this.Yth.RefreshItem(this.NUe), this.AddChild(this.Yth);
              })
            ),
          ))
      : this.Yth?.SetActive(!1);
  }
  SetMatchingItemActive(t) {
    var e =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(
        this.NUe,
      );
    this.zth?.SetActive(!t && e), this.Jth?.SetActive(t);
  }
  UpdateInstanceDungeonLockItemAndCostItem() {
    var t =
        1 ===
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState(),
      e = (this.Xth?.SetActive(!1), this.R$l.CheckInstanceUnlock(this.NUe));
    e
      ? (this.nih(),
        this.zth.SetActive(!t),
        this.Zth.SetActive(!1),
        this.Jth?.SetActive(t))
      : ((e = this.R$l.GetUnlockConditionTextId(this.NUe)) &&
          this.Zth.RefreshItem(e),
        this.zth.SetActive(!1),
        this.Zth.SetActive(!0),
        this.Jth?.SetActive(!1));
  }
  Egl(t) {
    var t = 15 === t.InstSubType,
      e = ModelManager_1.ModelManager.RoguelikeModel.HasBlackFlowerExchanged(
        this.NUe,
      );
    t && e
      ? this.ygl
        ? this.ygl.SetActive(!0)
        : ((this.ygl =
            new RoguelikeBlackFlowerItem_1.RoguelikeBlackFlowerInstanceItem()),
          this.ct_.push(async () =>
            this.ygl
              .CreateThenShowByResourceIdAsync(
                "UiItem_CheckpointsRReward",
                this.GetItem(3),
              )
              .then(() => {
                this.ygl?.GetRootItem().SetHierarchyIndex(0);
              }),
          ))
      : this.ygl?.SetActive(!1);
  }
  K3_(t) {
    const e =
      ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.GetPictureItemDataGetter(
        t,
      );
    e
      ? this.j3_
        ? (this.j3_.SetUiActive(!0), this.j3_.RefreshItem(e()))
        : ((this.j3_ = new InstanceDungeonPicItem_1.InstanceDungeonPicItem()),
          this.ct_.push(async () =>
            this.j3_
              ?.CreateThenShowByResourceIdAsync(
                "UiItem_CheckpointsRPic",
                this.GetItem(0),
              )
              .then(() => {
                this.j3_?.SetUiActive(!0), this.j3_?.RefreshItem(e());
              }),
          ))
      : this.j3_?.SetUiActive(!1);
  }
  X3_(t) {
    const e =
      ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.GetDescWidelyItemDataGetter(
        t,
      );
    e
      ? this.H3_
        ? (this.H3_.SetUiActive(!0), this.H3_.RefreshItem(e()))
        : ((this.H3_ =
            new InstanceDungeonDescWidelyItem_1.InstanceDungeonDescWidelyItem()),
          this.ct_.push(async () =>
            this.H3_?.CreateThenShowByResourceIdAsync(
              "UiItem_CheckpointsRText",
              this.GetItem(0),
            ).then(() => {
              this.H3_?.SetUiActive(!0), this.H3_?.RefreshItem(e());
            }),
          ))
      : this.H3_?.SetUiActive(!1);
  }
  Q3_(t) {
    const e =
      ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.GetTitleWidelyItemDataGetter(
        t,
      );
    e
      ? this.$3_
        ? (this.$3_.SetUiActive(!0), this.$3_.RefreshItem(e()))
        : ((this.$3_ =
            new InstanceDungeonTitleWidelyItem_1.InstanceDungeonTitleWidelyItem()),
          this.ct_.push(async () =>
            this.$3_
              ?.CreateThenShowByResourceIdAsync(
                "UiItem_CheckpointsRTitleA",
                this.GetItem(0),
              )
              .then(() => {
                this.$3_?.SetUiActive(!0), this.$3_?.RefreshItem(e());
              }),
          ))
      : this.$3_?.SetUiActive(!1);
  }
  Y3_(t) {
    const e =
      ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.GetScoreListItemDataGetter(
        t,
      );
    e
      ? this.W3_
        ? (this.W3_.SetUiActive(!0), this.W3_.RefreshItem(e()))
        : ((this.W3_ =
            new InstanceDungeonScoreListItem_1.InstanceDungeonScoreListItem()),
          this.ct_.push(async () => {
            await this.W3_?.CreateThenShowByResourceIdAsync(
              "UiItem_CheckpointsRRaceScore",
              this.GetItem(1),
            ).then(() => {
              this.W3_?.SetUiActive(!0), this.W3_?.RefreshItem(e());
            });
          }))
      : this.W3_?.SetUiActive(!1);
  }
  MCc(t) {
    this.R$l.RankItemModel
      ? (this.R$l.RankItemModel.RefreshInstance(t),
        this.SCc
          ? (this.SCc.SetUiActive(!0), this.SCc.Refresh())
          : ((this.SCc =
              new InstanceDungeonRankTimeItem_1.InstanceDungeonRankTimeItem()),
            (this.SCc.OpenParam = this.R$l.RankItemModel),
            this.ct_.push(async () => {
              await this.SCc?.CreateThenShowByResourceIdAsync(
                "UiItem_CheckpointsRInfoTitle",
                this.GetItem(1),
              ).then(() => {
                this.SCc?.SetUiActive(!0), this.SCc?.Refresh();
              });
            })))
      : this.SCc?.SetUiActive(!1);
  }
  SetLockText(t) {
    this.Zth.SetActive(!0), this.Zth.SetLockText(t);
  }
}
exports.InstanceDungeonInfoItem = InstanceDungeonInfoItem;
//# sourceMappingURL=InstanceDungeonInfoItem.js.map
