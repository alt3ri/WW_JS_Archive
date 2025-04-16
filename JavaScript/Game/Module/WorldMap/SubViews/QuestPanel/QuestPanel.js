"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestPanel = void 0);
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GeneralLogicTreeController_1 = require("../../../GeneralLogicTree/GeneralLogicTreeController"),
  MapController_1 = require("../../../Map/Controller/MapController"),
  QuestController_1 = require("../../../QuestNew/Controller/QuestController"),
  RewardItemBar_1 = require("../RewardItemBar"),
  TipsListView_1 = require("../TipsListView"),
  WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA"),
  WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper"),
  QUEST_CONDIGION_KEY = "questCondition";
class QuestPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments),
      (this.sOe = void 0),
      (this.Wno = void 0),
      (this.Fno = !1),
      (this.FRe = 0),
      (this.Z2o = 0),
      (this.u2o = void 0),
      (this.eFo = void 0),
      (this.tFo = void 0),
      (this.OnTrackBtnClick = () => {
        this.CheckAndShowCrossMapTips(this.u2o),
          0 !== this.Z2o
            ? QuestController_1.QuestNewController.RequestTrackQuest(
                this.FRe,
                !this.Fno,
                1,
                0,
                () => {
                  this.Zno(), this.Close();
                },
              )
            : (MapController_1.MapController.RequestTrackMapMark({
                MarkType: 12,
                MarkId: this.u2o.MarkId,
                Track: !this.Fno,
              }),
              (this.Fno = !this.Fno),
              this.Close());
      });
  }
  GetResourceId() {
    return "UiView_Task_Prefab";
  }
  async OnBeforeStartAsync() {
    (this.eFo = new RewardItemBar_1.RewardItemBar()),
      (this.eFo.SkipDestroyActor = !0),
      await Promise.all([
        super.OnBeforeStartAsync(),
        this.eFo.CreateThenShowByActorAsync(this.GetItem(8).GetOwner(), !0),
      ]);
  }
  OnStart() {
    (this.Wno = []),
      (this.sOe = []),
      (this.tFo = new TipsListView_1.TipsListView()),
      this.tFo.Initialize(this.GetVerticalLayout(5)),
      super.OnStart();
  }
  OnBeforeDestroy() {
    for (const e of this.sOe) this.AddChild(e);
    (this.sOe.length = 0),
      this.eFo.Destroy(),
      this.tFo.Clear(),
      super.OnBeforeDestroy();
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout(),
      this.GetItem(2).SetUIActive(!1),
      this.GetItem(14).SetUIActive(!1);
  }
  OnShowWorldMapSecondaryUi(e) {
    (this.FRe = e.TreeConfigId),
      (this.Z2o = e.NodeId),
      (this.u2o = e),
      (this.LayoutContext.MarkItem = e),
      this.iFo(),
      this.Zno(),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIcon(
        this.LayoutContext,
      );
    e = this.UpdateQuickGoto();
    this.ConfirmButton.SetActive(!e);
  }
  OnCloseWorldMapSecondaryUi() {
    this.tFo?.Clear();
  }
  GetGuideFocusUiItem() {
    var e = this.GetButton(29)?.GetRootComponent();
    if (void 0 !== e) return e;
  }
  iFo() {
    var e = ModelManager_1.ModelManager.QuestNewModel;
    this.GetText(1).SetText(e.GetQuestName(this.FRe)),
      this.GetText(4).SetText(e.GetQuestDetails(this.FRe)),
      0 === this.Z2o
        ? this.eFo.SetActive(!1)
        : (this.eFo.SetActive(!0), this.oFo(this.FRe, this.Z2o), this.rso());
  }
  oFo(e, t) {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
    e &&
      ((e =
        GeneralLogicTreeController_1.GeneralLogicTreeController.GetNodeTrackText(
          e.TreeId,
          t,
        )),
      (t = this.tFo.AddItemByKey(QUEST_CONDIGION_KEY)).SetHelpButtonVisible(!1),
      t.SetLeftText(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew("TowerProcess") ??
          "",
      ),
      t.SetRightText(e));
  }
  rso() {
    this.Wno.length = 0;
    var e =
      ModelManager_1.ModelManager.QuestNewModel.GetDisplayRewardCommonInfo(
        this.FRe,
      );
    e
      ? ((this.Wno = e),
        this.GetVerticalLayout(7).RootUIComp.SetUIActive(!0),
        this.eFo.RebuildRewardsByData(this.Wno))
      : this.GetVerticalLayout(7).RootUIComp.SetUIActive(!1);
  }
  Zno() {
    var e, t;
    0 !== this.Z2o
      ? (this.Fno = ModelManager_1.ModelManager.QuestNewModel.IsTrackingQuest(
          this.FRe,
        ))
      : ((e = this.u2o.MarkId),
        (t = ModelManager_1.ModelManager.MapModel.GetCurTrackMark()),
        (this.Fno = !!t && t.MarkId === e)),
      this.ConfirmButton.SetLocalText(
        this.Fno
          ? "InstanceDungeonEntranceCancelTrack"
          : "InstanceDungeonEntranceTrack",
      ),
      this.TrackBtn.SetLocalText(
        this.Fno
          ? "InstanceDungeonEntranceCancelTrack"
          : "InstanceDungeonEntranceTrack",
      );
  }
}
exports.QuestPanel = QuestPanel;
//# sourceMappingURL=QuestPanel.js.map
