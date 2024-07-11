"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestPanel = void 0);
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  GeneralLogicTreeController_1 = require("../../../GeneralLogicTree/GeneralLogicTreeController"),
  MapController_1 = require("../../../Map/Controller/MapController"),
  QuestController_1 = require("../../../QuestNew/Controller/QuestController"),
  WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
  WorldMapDefine_1 = require("../../WorldMapDefine"),
  RewardItemBar_1 = require("../RewardItemBar"),
  TipsListView_1 = require("../TipsListView"),
  QUEST_CONDIGION_KEY = "questCondition";
class QuestPanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments),
      (this.sOe = void 0),
      (this.Wno = void 0),
      (this.Fno = !1),
      (this.FRe = 0),
      (this.Z2o = 0),
      (this.u2o = void 0),
      (this.ZAt = void 0),
      (this.eFo = void 0),
      (this.tFo = void 0),
      (this.uct = () => {
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
          : (MapController_1.MapController.RequestTrackMapMark(
              12,
              this.u2o.MarkId,
              !this.Fno,
            ),
            (this.Fno = !this.Fno),
            this.Zno(),
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
    (this.eFo = new RewardItemBar_1.RewardItemBar()),
      (this.eFo.SkipDestroyActor = !0),
      await Promise.all([
        super.OnBeforeStartAsync(),
        this.eFo.CreateThenShowByActorAsync(this.GetItem(8).GetOwner(), !0),
      ]);
  }
  OnStart() {
    this.RootItem.SetRaycastTarget(!1),
      (this.Wno = []),
      (this.sOe = []),
      (this.tFo = new TipsListView_1.TipsListView()),
      this.tFo.Initialize(this.GetVerticalLayout(5)),
      (this.ZAt = new ButtonItem_1.ButtonItem(this.GetButton(11).RootUIComp)),
      this.ZAt.SetFunction(this.uct);
  }
  OnBeforeDestroy() {
    for (const t of this.sOe) this.AddChild(t);
    (this.sOe.length = 0), this.eFo.Destroy(), this.tFo.Clear();
  }
  OnShowWorldMapSecondaryUi(t) {
    (this.FRe = t.TreeConfigId),
      (this.Z2o = t.NodeId),
      (this.u2o = t),
      this.iFo(),
      this.Zno(),
      this.GetItem(2)?.SetUIActive(!1),
      this.SetSpriteByPath(this.u2o.IconPath, this.GetSprite(0), !1),
      this.GetItem(9).SetUIActive(!1),
      this.GetItem(12).SetUIActive(!1);
  }
  OnCloseWorldMapSecondaryUi() {
    this.tFo.Clear();
  }
  iFo() {
    var t = ModelManager_1.ModelManager.QuestNewModel;
    this.GetText(1).SetText(t.GetQuestName(this.FRe)),
      this.GetText(4).SetText(t.GetQuestDetails(this.FRe)),
      0 === this.Z2o
        ? this.eFo.SetActive(!1)
        : (this.eFo.SetActive(!0), this.oFo(this.FRe, this.Z2o), this.rso());
  }
  oFo(t, e) {
    var t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t);
    t &&
      ((t =
        GeneralLogicTreeController_1.GeneralLogicTreeController.GetNodeTrackText(
          t.TreeId,
          e,
        )),
      (e = this.tFo.AddItemByKey(QUEST_CONDIGION_KEY)).SetHelpButtonVisible(!1),
      e.SetLeftText(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew("TowerProcess") ??
          "",
      ),
      e.SetRightText(t));
  }
  rso() {
    this.Wno.length = 0;
    var t =
      ModelManager_1.ModelManager.QuestNewModel.GetDisplayRewardCommonInfo(
        this.FRe,
      );
    t
      ? ((this.Wno = t),
        this.GetVerticalLayout(7).RootUIComp.SetUIActive(!0),
        this.eFo.RebuildRewardsByData(this.Wno))
      : this.GetVerticalLayout(7).RootUIComp.SetUIActive(!1);
  }
  Zno() {
    var t, e;
    0 !== this.Z2o
      ? (this.Fno = ModelManager_1.ModelManager.QuestNewModel.IsTrackingQuest(
          this.FRe,
        ))
      : ((t = this.u2o.MarkId),
        (e = ModelManager_1.ModelManager.MapModel.GetCurTrackMark()),
        (this.Fno = !!e && e[1] === t)),
      this.ZAt.SetLocalText(
        this.Fno
          ? "InstanceDungeonEntranceCancelTrack"
          : "InstanceDungeonEntranceTrack",
      );
  }
}
exports.QuestPanel = QuestPanel;
//# sourceMappingURL=QuestPanel.js.map
