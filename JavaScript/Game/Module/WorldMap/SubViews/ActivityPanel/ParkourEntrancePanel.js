"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ParkourEntrancePanel = void 0);
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ParkourChallengeByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/ParkourChallengeByMarkId"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  TipsListView_1 = require("../TipsListView"),
  WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA"),
  WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper"),
  SCORE_KEY = "score",
  LINE_NUMBER_KEY = "line";
class ParkourEntrancePanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments),
      (this.u2o = void 0),
      (this.c2o = void 0),
      (this.OnConfirmBtnClick = () => {
        this.HandleTrack();
      });
  }
  GetResourceId() {
    return "UiView_Huodong_Prefab";
  }
  OnStart() {
    (this.c2o = new TipsListView_1.TipsListView()),
      this.c2o.Initialize(this.GetVerticalLayout(5)),
      super.OnStart();
  }
  OnBeforeDestroy() {
    this.c2o.Clear(), super.OnBeforeDestroy();
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout(),
      this.GetItem(14).SetUIActive(!1),
      this.GetVerticalLayout(7).RootUIComp.SetUIActive(!1);
  }
  OnShowWorldMapSecondaryUi(e) {
    (this.u2o = e),
      (this.LayoutContext.MarkItem = e),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIconAndTitle(
        this.LayoutContext,
      ),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByConfigMarkItem(
        this.LayoutContext,
      ),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateDesc(
        this.LayoutContext,
      ),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithTrackStyle(
        this.LayoutContext,
      ),
      this.l3e();
  }
  OnCloseWorldMapSecondaryUi() {
    this.c2o.Clear();
  }
  l3e() {
    var e =
        ModelManager_1.ModelManager.ActivityRunModel.GetChallengeDataByMarkId(
          this.u2o.MarkConfigId,
        ),
      r = ParkourChallengeByMarkId_1.configParkourChallengeByMarkId.GetConfig(
        this.u2o.MarkId,
      ),
      t = this.c2o.AddItemByKey(LINE_NUMBER_KEY),
      r =
        (t.SetLeftText(
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CurrentLine") ??
            "",
        ),
        StringUtils_1.StringUtils.Format(
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew("LineNumber") ??
            "",
          r.Id.toString(),
        )),
      r =
        (t.SetRightText(r),
        t.SetHelpButtonVisible(!1),
        this.c2o.AddItemByKey(SCORE_KEY)),
      t =
        (r.SetHelpButtonVisible(!1),
        StringUtils_1.StringUtils.Format(
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "Text_ActiveRunMaxPoint_Text",
          ) ?? "",
          "",
        ));
    r.SetLeftText(t),
      0 === e.GetMiniTime()
        ? r.SetRightText(
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "Text_ActivityRunNoPoint_Text",
            ) ?? "",
          )
        : r.SetRightText(e.GetMaxScore().toString());
  }
}
exports.ParkourEntrancePanel = ParkourEntrancePanel;
//# sourceMappingURL=ParkourEntrancePanel.js.map
