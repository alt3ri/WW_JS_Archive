"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SilentAreaInfoSubItem = void 0);
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class SilentAreaInfoSubItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
    ];
  }
  Initialize(e, t) {
    this.CreateByActorAsync(e).finally(() => {
      this.UpdateItem(t);
    });
  }
  UpdateItem(e) {
    const t = this.Uct(e.TidTitle);
    this.bct(e.TidContent, t ? 32 : 36);
  }
  Uct(e) {
    const t = this.GetText(0);
    var e = PublicUtil_1.PublicUtil.GetConfigTextByKey(e);
    return StringUtils_1.StringUtils.IsBlank(e)
      ? (t?.GetParentAsUIItem()?.SetUIActive(!1), !1)
      : (t?.SetText(e), t?.GetParentAsUIItem()?.SetUIActive(!0), !0);
  }
  bct(e, t) {
    const i = this.GetText(1);
    var e = PublicUtil_1.PublicUtil.GetConfigTextByKey(e);
    StringUtils_1.StringUtils.IsBlank(e)
      ? i?.SetUIActive(!1)
      : (i?.SetText(e), i?.SetFontSize(t), i?.SetUIActive(!0));
  }
}
exports.SilentAreaInfoSubItem = SilentAreaInfoSubItem;
// # sourceMappingURL=SilentAreaInfoSubItem.js.map
