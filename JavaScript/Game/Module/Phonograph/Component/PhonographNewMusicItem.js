"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhonographNewMusicItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class PhonographNewMusicItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  Refresh(e, r, i) {
    e = ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicById(e);
    e && LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Title);
  }
}
exports.PhonographNewMusicItem = PhonographNewMusicItem;
//# sourceMappingURL=PhonographNewMusicItem.js.map
