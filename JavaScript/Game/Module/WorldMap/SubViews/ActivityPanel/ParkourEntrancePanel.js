"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ParkourEntrancePanel = void 0);
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ParkourChallengeByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/ParkourChallengeByMarkId"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  MapController_1 = require("../../../Map/Controller/MapController"),
  WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
  WorldMapDefine_1 = require("../../WorldMapDefine"),
  TipsListView_1 = require("../TipsListView"),
  SCORE_KEY = "score",
  LINE_NUMBER_KEY = "line";
class ParkourEntrancePanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments),
      (this.u2o = void 0),
      (this.c2o = void 0),
      (this.ZAt = void 0),
      (this.m2o = () => {
        MapController_1.MapController.RequestTrackMapMark(
          this.u2o.MarkType,
          this.u2o.MarkId,
          !this.u2o.IsTracked,
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
    (this.c2o = new TipsListView_1.TipsListView()),
      this.c2o.Initialize(this.GetVerticalLayout(5)),
      (this.ZAt = new ButtonItem_1.ButtonItem(this.GetButton(11).RootUIComp)),
      this.ZAt.SetFunction(this.m2o);
  }
  OnBeforeDestroy() {
    this.ZAt.Destroy(), this.c2o.Clear();
  }
  OnShowWorldMapSecondaryUi(e) {
    (this.u2o = e),
      this.mGe(),
      this.d2o(),
      this.Pqe(),
      this.l_i(),
      this.l3e(),
      this.GetItem(9).SetUIActive(!1),
      this.GetItem(12).SetUIActive(!1),
      this.GetVerticalLayout(7).RootUIComp.SetUIActive(!1);
  }
  OnCloseWorldMapSecondaryUi() {
    this.c2o.Clear();
  }
  mGe() {
    this.SetSpriteByPath(this.u2o.IconPath, this.GetSprite(0), !1),
      this.GetText(1).ShowTextNew(this.u2o.MarkConfig.MarkTitle);
  }
  d2o() {
    var e = this.u2o.GetAreaText();
    e && this.GetText(3).SetText(e);
  }
  l3e() {
    var e =
        ModelManager_1.ModelManager.ActivityRunModel.GetChallengeDataByMarkId(
          this.u2o.MarkConfigId,
        ),
      t = ParkourChallengeByMarkId_1.configParkourChallengeByMarkId.GetConfig(
        this.u2o.MarkId,
      ),
      i = this.c2o.AddItemByKey(LINE_NUMBER_KEY),
      t =
        (i.SetLeftText(
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CurrentLine") ??
            "",
        ),
        StringUtils_1.StringUtils.Format(
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew("LineNumber") ??
            "",
          t.Id.toString(),
        )),
      t =
        (i.SetRightText(t),
        i.SetHelpButtonVisible(!1),
        this.c2o.AddItemByKey(SCORE_KEY)),
      i =
        (t.SetHelpButtonVisible(!1),
        StringUtils_1.StringUtils.Format(
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "Text_ActiveRunMaxPoint_Text",
          ) ?? "",
          "",
        ));
    t.SetLeftText(i),
      0 === e.GetMiniTime()
        ? t.SetRightText(
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "Text_ActivityRunNoPoint_Text",
            ) ?? "",
          )
        : t.SetRightText(e.GetMaxScore().toString());
  }
  Pqe() {
    this.GetText(4).ShowTextNew(this.u2o.MarkConfig.MarkDesc);
  }
  l_i() {
    let e = "";
    (e = this.u2o.IsTracked
      ? "InstanceDungeonEntranceCancelTrack"
      : "InstanceDungeonEntranceTrack"),
      this.ZAt.SetLocalText(e);
  }
}
exports.ParkourEntrancePanel = ParkourEntrancePanel;
//# sourceMappingURL=ParkourEntrancePanel.js.map
