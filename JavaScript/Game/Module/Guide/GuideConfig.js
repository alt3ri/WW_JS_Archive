"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuideConfig = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  GuideFocusNewByGuideId_1 = require("../../../Core/Define/ConfigQuery/GuideFocusNewByGuideId"),
  GuideGroupAll_1 = require("../../../Core/Define/ConfigQuery/GuideGroupAll"),
  GuideGroupById_1 = require("../../../Core/Define/ConfigQuery/GuideGroupById"),
  GuideStepAll_1 = require("../../../Core/Define/ConfigQuery/GuideStepAll"),
  GuideStepById_1 = require("../../../Core/Define/ConfigQuery/GuideStepById"),
  GuideTipsByGuideId_1 = require("../../../Core/Define/ConfigQuery/GuideTipsByGuideId"),
  GuideTutorialAll_1 = require("../../../Core/Define/ConfigQuery/GuideTutorialAll"),
  GuideTutorialById_1 = require("../../../Core/Define/ConfigQuery/GuideTutorialById"),
  GuideTutorialPageById_1 = require("../../../Core/Define/ConfigQuery/GuideTutorialPageById"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder");
class GuideConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments), (this.fYt = new UE.Vector(0, 0, 0));
  }
  pYt(e) {
    switch (e) {
      case 1:
        return 2;
      case 2:
        return 0;
    }
  }
  OnInit() {
    return !0;
  }
  GetAllTutorial() {
    return GuideTutorialAll_1.configGuideTutorialAll.GetConfigList();
  }
  GetStep(e) {
    return GuideStepById_1.configGuideStepById.GetConfig(e);
  }
  GetGuideTutorialPage(e) {
    return GuideTutorialPageById_1.configGuideTutorialPageById.GetConfig(e);
  }
  GetGuideTutorialPageIds(e) {
    var e = this.GetGuideTutorial(e),
      r = e.PageReplaceConditionGroupId;
    return 0 < r &&
      ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
        r.toString(),
        void 0,
      )
      ? e.ReplacePageId
      : e.PageId;
  }
  GetGuideTutorial(e) {
    return GuideTutorialById_1.configGuideTutorialById.GetConfig(e);
  }
  GetGuideFocus(e) {
    return GuideFocusNewByGuideId_1.configGuideFocusNewByGuideId.GetConfig(e);
  }
  GetGuideTips(e) {
    return GuideTipsByGuideId_1.configGuideTipsByGuideId.GetConfig(e);
  }
  GetGuideText(e) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? "";
  }
  GetGuideTopMiddleOffset() {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "guide_top_middle_offset",
    );
  }
  GetAllGuides(e) {
    const r = this.pYt(e);
    return GuideStepAll_1.configGuideStepAll
      .GetConfigList()
      .filter((e) => "T" === e.Controller[r]);
  }
  GetAllGroup() {
    return GuideGroupAll_1.configGuideGroupAll.GetConfigList();
  }
  GetGroup(e) {
    return GuideGroupById_1.configGuideGroupById.GetConfig(e);
  }
  GetOrderedStepIdsOfGroup(e, r) {
    const i = [];
    return (
      this.GetGroup(e)?.Step.forEach((e) => {
        "T" === this.GetStep(e).Controller[r] && i.push(e);
      }),
      i
    );
  }
  GetLimitRepeatStepSetOfGroup(e) {
    const r = new Set();
    return (
      this.GetGroup(e)?.LimitRepeat.forEach((e) => {
        r.add(e);
      }),
      r
    );
  }
  GetGuideFocusCenterTextPos() {
    var e = CommonParamById_1.configCommonParamById.GetIntConfig(
      "GuideFocusTextOffsetY",
    );
    return (this.fYt.Z = e), this.fYt;
  }
}
((exports.GuideConfig = GuideConfig).GmMuteTutorial = !1),
  (GuideConfig.TabTag = "tab"),
  (GuideConfig.SlotTag = "slot");
//# sourceMappingURL=GuideConfig.js.map
