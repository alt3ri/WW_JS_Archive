"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CorniceMeetingEntrancePanel = void 0);
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ActivityCorniceMeetingController_1 = require("../../../Activity/ActivityContent/CorniceMeeting/ActivityCorniceMeetingController"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
  WorldMapDefine_1 = require("../../WorldMapDefine"),
  MapTipsActivateTipPanel_1 = require("../Common/MapTipsActivateTipPanel"),
  TipsListView_1 = require("../TipsListView"),
  CURRENT_DUNGEON = "CurrentDungeon",
  SCORE_KEY = "score";
class CorniceMeetingEntrancePanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments),
      (this.u2o = void 0),
      (this.c2o = void 0),
      (this.ZAt = void 0),
      (this.oza = void 0),
      (this.m2o = () => {
        this.Close(() => {
          var t =
            ConfigManager_1.ConfigManager.ActivityCorniceMeetingConfig?.GetCorniceMeetingChallengeByMarkId(
              this.u2o.MarkId,
            );
          ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.CorniceMeetingChallengeTransRequest(
            t.Id,
          );
        });
      });
  }
  GetResourceId() {
    return "UiView_Huodong_Prefab";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos =
      WorldMapDefine_1.secondaryUiPanelComponentsRegisterInfoA;
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(),
      (this.oza = new MapTipsActivateTipPanel_1.MapTipsActivateTipPanel()),
      await this.oza.CreateByActorAsync(this.GetItem(31).GetOwner());
  }
  OnStart() {
    (this.c2o = new TipsListView_1.TipsListView()),
      this.c2o.Initialize(this.GetVerticalLayout(5)),
      (this.ZAt = new ButtonItem_1.ButtonItem(this.GetButton(11).RootUIComp)),
      this.ZAt.SetActive(!0),
      this.ZAt.SetFunction(this.m2o),
      this.GetItem(25).SetUIActive(!1),
      this.GetItem(32).SetUIActive(!1),
      this.oza.SetUiActive(!1),
      this.GetItem(14).SetUIActive(!0),
      this.GetItem(26).SetUIActive(!1),
      this.GetVerticalLayout(5).RootUIComp.SetUIActive(!0);
  }
  OnBeforeDestroy() {
    this.oza.Destroy(), this.ZAt.Destroy(), this.c2o.Clear();
  }
  OnShowWorldMapSecondaryUi(t) {
    (this.u2o = t),
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
    var t = this.u2o.GetAreaText();
    t && this.GetText(3).SetText(t);
  }
  l3e() {
    var t,
      e,
      i =
        ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData();
    void 0 !== i &&
      void 0 !==
        (e =
          ConfigManager_1.ConfigManager.ActivityCorniceMeetingConfig?.GetCorniceMeetingChallengeByMarkId(
            this.u2o.MarkId,
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
        : ((i = StringUtils_1.StringUtils.Format(
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "Text_ItemCost_Text",
            ) ?? "",
            t.MaxScore.toString(),
            t.GetMaxScoreConfig().toString(),
          )),
          e.SetRightText(i)));
  }
  Pqe() {
    this.GetText(4).ShowTextNew(this.u2o.MarkConfig.MarkDesc);
  }
  l_i() {
    this.ZAt.SetLocalTextNew("PrefabTextItem_3545661317_Text");
  }
}
exports.CorniceMeetingEntrancePanel = CorniceMeetingEntrancePanel;
//# sourceMappingURL=CorniceMeetingEntrancePanel.js.map
