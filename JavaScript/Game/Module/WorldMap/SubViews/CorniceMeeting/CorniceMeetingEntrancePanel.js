"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CorniceMeetingEntrancePanel = void 0);
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ActivityCorniceMeetingController_1 = require("../../../Activity/ActivityContent/CorniceMeeting/ActivityCorniceMeetingController"),
  TipsListView_1 = require("../TipsListView"),
  WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA"),
  WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper"),
  CURRENT_DUNGEON = "CurrentDungeon",
  SCORE_KEY = "score";
class CorniceMeetingEntrancePanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments),
      (this.c2o = void 0),
      (this.OnConfirmBtnClick = () => {
        this.Close(() => {
          var e =
            ConfigManager_1.ConfigManager.ActivityCorniceMeetingConfig?.GetCorniceMeetingChallengeByMarkId(
              this.LayoutContext.MarkItem.MarkId,
            );
          ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.CorniceMeetingChallengeTransRequest(
            e.Id,
          );
        });
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
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout(),
      this.GetItem(32).SetUIActive(!1),
      this.GetVerticalLayout(7).RootUIComp.SetUIActive(!1);
  }
  OnBeforeDestroy() {
    this.c2o.Clear(), super.OnBeforeDestroy();
  }
  OnShowWorldMapSecondaryUi(e) {
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
      this.l_i(),
      this.l3e();
  }
  OnCloseWorldMapSecondaryUi() {
    this.c2o.Clear();
  }
  l3e() {
    var e,
      t,
      i =
        ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData();
    void 0 !== i &&
      void 0 !==
        (e =
          ConfigManager_1.ConfigManager.ActivityCorniceMeetingConfig?.GetCorniceMeetingChallengeByMarkId(
            this.LayoutContext.MarkItem.MarkId,
          )) &&
      void 0 !== (t = i.GetLevelEntryData(e.Id)) &&
      ((i = this.c2o.AddItemByKey(CURRENT_DUNGEON)).SetLeftText(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "CorniceMeetingMarkPanelCurrent",
        ) ?? "",
      ),
      i.SetRightText(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Title) ?? "",
      ),
      i.SetHelpButtonVisible(!1),
      (e = this.c2o.AddItemByKey(SCORE_KEY)).SetHelpButtonVisible(!1),
      e.SetLeftText(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "CorniceMeetingMarkPanelScore",
        ) ?? "",
      ),
      0 === t.MaxScore
        ? e.SetRightText(
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "ActivityCorniceMeetingScoreNoRecord",
            ) ?? "",
          )
        : ((i = t.MaxScore),
          (t = t.GetMaxScoreConfig()),
          (i = StringUtils_1.StringUtils.Format(
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "Text_ItemCost_Text",
            ) ?? "",
            (t < i ? t : i).toString(),
            t.toString(),
          )),
          e.SetRightText(i)));
  }
  l_i() {
    this.ConfirmButton.SetLocalTextNew("Text_TeleportFastMove_Text");
  }
}
exports.CorniceMeetingEntrancePanel = CorniceMeetingEntrancePanel;
//# sourceMappingURL=CorniceMeetingEntrancePanel.js.map
