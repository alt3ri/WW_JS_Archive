"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UidView = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate");
const LguiUtil_1 = require("../Util/LguiUtil");
class UidView extends UiViewBase_1.UiViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    let e = "";
    FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient.Check() &&
      (e =
        " " +
        ConfigManager_1.ConfigManager.TextConfig.GetTextById("BetaVersionTip")),
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(0),
        "FriendMyUid",
        "" + ModelManager_1.ModelManager.FunctionModel.PlayerId.toString() + e,
      );
  }
}
exports.UidView = UidView;
// # sourceMappingURL=UidView.js.map
