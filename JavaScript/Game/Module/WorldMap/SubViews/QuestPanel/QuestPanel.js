"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestPanel = void 0);
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const GeneralLogicTreeController_1 = require("../../../GeneralLogicTree/GeneralLogicTreeController");
const MapController_1 = require("../../../Map/Controller/MapController");
const QuestController_1 = require("../../../QuestNew/Controller/QuestController");
const WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi");
const WorldMapDefine_1 = require("../../WorldMapDefine");
const RewardItemBar_1 = require("../RewardItemBar");
const TipsListView_1 = require("../TipsListView");
const QUEST_CONDIGION_KEY = "questCondition";
class QuestPanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments),
      (this.sOe = void 0),
      (this.$ro = void 0),
      (this.Wro = !1),
      (this.FRe = 0),
      (this.i2o = 0),
      (this.dko = void 0),
      (this.$Ut = void 0),
      (this.o2o = void 0),
      (this.r2o = void 0),
      (this.$_t = () => {
        this.i2o !== 0
          ? QuestController_1.QuestNewController.RequestTrackQuest(
              this.FRe,
              !this.Wro,
              1,
              0,
              () => {
                this.ono(), this.Close();
              },
            )
          : (MapController_1.MapController.RequestTrackMapMark(
              12,
              this.dko.MarkId,
              !this.Wro,
            ),
            (this.Wro = !this.Wro),
            this.ono(),
            this.Close());
      });
  }
  GetResourceId() {
    return "UiView_Task_Prefab";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos =
      WorldMapDefine_1.secondaryUiPanelComponentsRegisterInfoA;
  }
  async OnBeforeStartAsync() {
    (this.o2o = new RewardItemBar_1.RewardItemBar()),
      (this.o2o.SkipDestroyActor = !0),
      await Promise.all([
        super.OnBeforeStartAsync(),
        this.o2o.CreateThenShowByActorAsync(this.GetItem(8).GetOwner(), !0),
      ]);
  }
  OnStart() {
    this.RootItem.SetRaycastTarget(!1),
      (this.$ro = []),
      (this.sOe = []),
      (this.r2o = new TipsListView_1.TipsListView()),
      this.r2o.Initialize(this.GetVerticalLayout(5)),
      (this.$Ut = new ButtonItem_1.ButtonItem(this.GetButton(11).RootUIComp)),
      this.$Ut.SetFunction(this.$_t);
  }
  OnBeforeDestroy() {
    for (const t of this.sOe) this.AddChild(t);
    (this.sOe.length = 0), this.o2o.Destroy(), this.r2o.Clear();
  }
  OnShowWorldMapSecondaryUi(t) {
    (this.FRe = t.TreeConfigId),
      (this.i2o = t.NodeId),
      (this.dko = t),
      this.n2o(),
      this.ono(),
      this.GetItem(2)?.SetUIActive(!1),
      this.SetSpriteByPath(this.dko.IconPath, this.GetSprite(0), !1),
      this.GetItem(9).SetUIActive(!1),
      this.GetItem(12).SetUIActive(!1);
  }
  OnCloseWorldMapSecondaryUi() {
    this.r2o.Clear();
  }
  n2o() {
    const t = ModelManager_1.ModelManager.QuestNewModel;
    this.GetText(1).SetText(t.GetQuestName(this.FRe)),
      this.GetText(4).SetText(t.GetQuestDetails(this.FRe)),
      this.i2o === 0
        ? this.o2o.SetActive(!1)
        : (this.o2o.SetActive(!0), this.s2o(this.FRe, this.i2o), this.hno());
  }
  s2o(t, e) {
    var t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t);
    t &&
      ((t =
        GeneralLogicTreeController_1.GeneralLogicTreeController.GetNodeTrackText(
          t.TreeId,
          e,
        )),
      (e = this.r2o.AddItemByKey(QUEST_CONDIGION_KEY)).SetHelpButtonVisible(!1),
      e.SetLeftText(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew("TowerProcess") ??
          "",
      ),
      e.SetRightText(t));
  }
  hno() {
    this.$ro.length = 0;
    const t =
      ModelManager_1.ModelManager.QuestNewModel.GetDisplayRewardCommonInfo(
        this.FRe,
      );
    t
      ? ((this.$ro = t),
        this.GetVerticalLayout(7).RootUIComp.SetUIActive(!0),
        this.o2o.RebuildRewardsByData(this.$ro))
      : this.GetVerticalLayout(7).RootUIComp.SetUIActive(!1);
  }
  ono() {
    let t, e;
    this.i2o !== 0
      ? (this.Wro = ModelManager_1.ModelManager.QuestNewModel.IsTrackingQuest(
          this.FRe,
        ))
      : ((t = this.dko.MarkId),
        (e = ModelManager_1.ModelManager.MapModel.GetCurTrackMark()),
        (this.Wro = !!e && e[1] === t)),
      this.$Ut.SetLocalText(
        this.Wro
          ? "InstanceDungeonEntranceCancelTrack"
          : "InstanceDungeonEntranceTrack",
      );
  }
}
exports.QuestPanel = QuestPanel;
// # sourceMappingURL=QuestPanel.js.map
