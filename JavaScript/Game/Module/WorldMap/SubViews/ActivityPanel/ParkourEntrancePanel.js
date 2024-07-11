"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ParkourEntrancePanel = void 0);
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ParkourChallengeByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/ParkourChallengeByMarkId");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const MapController_1 = require("../../../Map/Controller/MapController");
const WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi");
const WorldMapDefine_1 = require("../../WorldMapDefine");
const TipsListView_1 = require("../TipsListView");
const SCORE_KEY = "score";
const LINE_NUMBER_KEY = "line";
class ParkourEntrancePanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments),
      (this.dko = void 0),
      (this.Cko = void 0),
      (this.$Ut = void 0),
      (this.gko = () => {
        MapController_1.MapController.RequestTrackMapMark(
          this.dko.MarkType,
          this.dko.MarkId,
          !this.dko.IsTracked,
        ),
          this.Close();
      });
  }
  GetResourceId() {
    return "UiView_Huodong_Prefab";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos =
      WorldMapDefine_1.secondaryUiPanelComponentsRegisterInfoA;
  }
  OnStart() {
    (this.Cko = new TipsListView_1.TipsListView()),
      this.Cko.Initialize(this.GetVerticalLayout(5)),
      (this.$Ut = new ButtonItem_1.ButtonItem(this.GetButton(11).RootUIComp)),
      this.$Ut.SetFunction(this.gko);
  }
  OnBeforeDestroy() {
    this.$Ut.Destroy(), this.Cko.Clear();
  }
  OnShowWorldMapSecondaryUi(e) {
    (this.dko = e),
      this.mGe(),
      this.fko(),
      this.Pqe(),
      this.l1i(),
      this.Q2e(),
      this.GetItem(9).SetUIActive(!1),
      this.GetItem(12).SetUIActive(!1),
      this.GetVerticalLayout(7).RootUIComp.SetUIActive(!1);
  }
  OnCloseWorldMapSecondaryUi() {
    this.Cko.Clear();
  }
  mGe() {
    this.SetSpriteByPath(this.dko.IconPath, this.GetSprite(0), !1),
      this.GetText(1).ShowTextNew(this.dko.MarkConfig.MarkTitle);
  }
  fko() {
    const e = this.dko.GetAreaText();
    e && this.GetText(3).SetText(e);
  }
  Q2e() {
    const e =
      ModelManager_1.ModelManager.ActivityRunModel.GetChallengeDataByMarkId(
        this.dko.MarkConfigId,
      );
    var t = ParkourChallengeByMarkId_1.configParkourChallengeByMarkId.GetConfig(
      this.dko.MarkId,
    );
    var i = this.Cko.AddItemByKey(LINE_NUMBER_KEY);
    var t =
      (i.SetLeftText(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CurrentLine") ??
          "",
      ),
      StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew("LineNumber") ?? "",
        t.Id.toString(),
      ));
    var t =
      (i.SetRightText(t),
      i.SetHelpButtonVisible(!1),
      this.Cko.AddItemByKey(SCORE_KEY));
    var i =
      (t.SetHelpButtonVisible(!1),
      StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "Text_ActiveRunMaxPoint_Text",
        ) ?? "",
        "",
      ));
    t.SetLeftText(i),
      e.GetMiniTime() === 0
        ? t.SetRightText(
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "Text_ActivityRunNoPoint_Text",
            ) ?? "",
          )
        : t.SetRightText(e.GetMaxScore().toString());
  }
  Pqe() {
    this.GetText(4).ShowTextNew(this.dko.MarkConfig.MarkDesc);
  }
  l1i() {
    let e = "";
    (e = this.dko.IsTracked
      ? "InstanceDungeonEntranceCancelTrack"
      : "InstanceDungeonEntranceTrack"),
      this.$Ut.SetLocalText(e);
  }
}
exports.ParkourEntrancePanel = ParkourEntrancePanel;
// # sourceMappingURL=ParkourEntrancePanel.js.map
