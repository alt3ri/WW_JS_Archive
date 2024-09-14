"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestPanel = void 0);
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  GeneralLogicTreeController_1 = require("../../../GeneralLogicTree/GeneralLogicTreeController"),
  MapController_1 = require("../../../Map/Controller/MapController"),
  MarkUiUtils_1 = require("../../../Map/Mark/Misc/MarkUiUtils"),
  QuestController_1 = require("../../../QuestNew/Controller/QuestController"),
  TeleportController_1 = require("../../../Teleport/TeleportController"),
  WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
  WorldMapDefine_1 = require("../../WorldMapDefine"),
  MapTipsActivateTipPanel_1 = require("../Common/MapTipsActivateTipPanel"),
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
      (this.k4a = void 0),
      (this.N4a = void 0),
      (this.eFo = void 0),
      (this.tFo = void 0),
      (this.oza = void 0),
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
        this.uct();
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
    (this.oza = new MapTipsActivateTipPanel_1.MapTipsActivateTipPanel()),
      await this.oza.CreateByActorAsync(this.GetItem(31).GetOwner()),
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
      this.ZAt.SetFunction(this.uct),
      (this.k4a = new ButtonItem_1.ButtonItem(this.GetButton(28).RootUIComp)),
      this.k4a.SetFunction(this.P8e),
      (this.N4a = new ButtonItem_1.ButtonItem(this.GetButton(29).RootUIComp)),
      this.N4a.SetFunction(this.F4a);
  }
  OnBeforeDestroy() {
    for (const t of this.sOe) this.AddChild(t);
    (this.sOe.length = 0),
      this.eFo.Destroy(),
      this.tFo.Clear(),
      this.ZAt.Destroy(),
      this.oza.Destroy(),
      this.k4a.Destroy(),
      this.N4a.Destroy();
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
    var i,
      e = MarkUiUtils_1.MarkUiUtils.IsShowGoto(t);
    this.ZAt.SetActive(!e),
      this.GetItem(14).SetUIActive(!1),
      this.GetItem(32).SetUIActive(e),
      this.oza.SetUiActive(!1),
      e &&
        ((e = this.GetButton(29)),
        (i = TeleportController_1.TeleportController.CheckCanTeleport()),
        (t = MarkUiUtils_1.MarkUiUtils.FindNearbyValidGotoMark(this.Map, t)),
        this.oza.SetUiActive(!i || void 0 === t),
        e.SetSelfInteractive(i && void 0 !== t));
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
  oFo(t, i) {
    var t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t);
    t &&
      ((t =
        GeneralLogicTreeController_1.GeneralLogicTreeController.GetNodeTrackText(
          t.TreeId,
          i,
        )),
      (i = this.tFo.AddItemByKey(QUEST_CONDIGION_KEY)).SetHelpButtonVisible(!1),
      i.SetLeftText(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew("TowerProcess") ??
          "",
      ),
      i.SetRightText(t));
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
    var t, i;
    0 !== this.Z2o
      ? (this.Fno = ModelManager_1.ModelManager.QuestNewModel.IsTrackingQuest(
          this.FRe,
        ))
      : ((t = this.u2o.MarkId),
        (i = ModelManager_1.ModelManager.MapModel.GetCurTrackMark()),
        (this.Fno = !!i && i[1] === t)),
      this.ZAt.SetLocalText(
        this.Fno
          ? "InstanceDungeonEntranceCancelTrack"
          : "InstanceDungeonEntranceTrack",
      ),
      this.k4a.SetLocalText(
        this.Fno
          ? "InstanceDungeonEntranceCancelTrack"
          : "InstanceDungeonEntranceTrack",
      );
  }
}
exports.QuestPanel = QuestPanel;
//# sourceMappingURL=QuestPanel.js.map
