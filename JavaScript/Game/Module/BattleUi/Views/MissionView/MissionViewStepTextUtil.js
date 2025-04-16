"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MissionViewStepTextUtil = void 0);
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  PublicUtil_1 = require("../../../../Common/PublicUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GeneralLogicTreeController_1 = require("../../../GeneralLogicTree/GeneralLogicTreeController");
class MissionViewStepTextUtil {
  static GetStepTextByConfig(e, t) {
    switch (t.ShowSource) {
      case 0:
        return GeneralLogicTreeController_1.GeneralLogicTreeController.GetTitleText(
          e,
          t.TidTitle,
          t.QuestScheduleType,
          t.UsePreStateText ?? !1,
        );
      case 1:
        return MissionViewStepTextUtil.QU_(t);
      case 2:
        return MissionViewStepTextUtil.ib1(t);
    }
    return "";
  }
  static QU_(e) {
    var t = PublicUtil_1.PublicUtil.GetConfigTextByKey(e.TidTitle),
      r = ModelManager_1.ModelManager.DockyardModel.GetItemCountByItemId(
        e.ProgressTargetId,
      ),
      e = MissionViewStepTextUtil.GetEntrustProgressTotalCount(
        e.ProgressTargetId,
      ),
      r = r < e ? r : e;
    return t.replace("{0}", e.toString()) + `(${r}/${e})`;
  }
  static ib1(e) {
    return ConfigManager_1.ConfigManager.TextConfig.GetTextById(e.TidTitle);
  }
  static GetEntrustProgressTotalCount(e) {
    var t = ModelManager_1.ModelManager.FishingQuestModel.CurrentTraceEntrust;
    return !t ||
      2 ===
        (t = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(t))
          .EntrustType
      ? 0
      : (t.EntrustTarget.get(e) ?? 0);
  }
  static CheckStepTextSame(e, t) {
    return e?.TidTitle === t?.TidTitle;
  }
  static CheckTextEqual(t, r) {
    if (t !== r) {
      if (!t || !r) return !1;
      if (
        !MissionViewStepTextUtil.CheckStepTextSame(
          t.MainStepText,
          r.MainStepText,
        )
      )
        return !1;
      if (t.SubStepTexts !== r.SubStepTexts) {
        if (!t.SubStepTexts || !r.SubStepTexts) return !1;
        if (t.SubStepTexts?.length !== r.SubStepTexts?.length) return !1;
        for (let e = 0; e < t.SubStepTexts.length; e++) {
          var i = t.SubStepTexts[e];
          if (!MissionViewStepTextUtil.CheckStepTextSame(i, r.SubStepTexts[e]))
            return !1;
        }
      }
    }
    return !0;
  }
  static CheckShowConfigEmpty(e) {
    if (e.TitleTextKey) {
      var t = PublicUtil_1.PublicUtil.GetConfigTextByKey(e.TitleTextKey);
      if (!StringUtils_1.StringUtils.IsBlank(t)) return !1;
    }
    if (e.MainStepText) {
      t = PublicUtil_1.PublicUtil.GetConfigTextByKey(e.MainStepText.TidTitle);
      if (!StringUtils_1.StringUtils.IsBlank(t)) return !1;
    }
    if (e.SubStepTexts)
      for (const i of e.SubStepTexts) {
        var r = PublicUtil_1.PublicUtil.GetConfigTextByKey(i.TidTitle);
        if (!StringUtils_1.StringUtils.IsBlank(r)) return !1;
      }
    return !0;
  }
}
exports.MissionViewStepTextUtil = MissionViewStepTextUtil;
//# sourceMappingURL=MissionViewStepTextUtil.js.map
