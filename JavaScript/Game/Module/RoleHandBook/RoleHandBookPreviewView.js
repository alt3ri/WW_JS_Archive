"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleHandBookPreviewView = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const RolePreviewDescribeTabView_1 = require("../Gacha/PreviewView/RolePreviewDescribeTabView");
const LguiUtil_1 = require("../Util/LguiUtil");
class RoleHandBookPreviewView extends RolePreviewDescribeTabView_1.RolePreviewDescribeTabView {
  SetCharacterVoiceInfo() {
    const e =
      ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleInstance().GetRoleConfig();
    this.CharacterVoiceTitleText.SetUIActive(!0),
      this.CharacterVoiceNameText.SetUIActive(!0),
      LguiUtil_1.LguiUtil.SetLocalText(
        this.CharacterVoiceTitleText,
        "CharacterVoice",
      ),
      this.CharacterVoiceNameText.ShowTextNew(e.CharacterVoice);
  }
  SetAttributeInfo() {
    var e =
      ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleInstance().GetRoleConfig()
        .ElementId;
    var e = ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(e);
    this.AttributeIconTexture.SetUIActive(!0),
      this.AttributeText.SetUIActive(!0),
      this.SetTextureByPath(e.Icon, this.AttributeIconTexture),
      this.AttributeText.ShowTextNew(e.Name);
  }
}
exports.RoleHandBookPreviewView = RoleHandBookPreviewView;
// # sourceMappingURL=RoleHandBookPreviewView.js.map
