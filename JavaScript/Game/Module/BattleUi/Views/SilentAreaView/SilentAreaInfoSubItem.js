"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SilentAreaInfoSubItem = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  PublicUtil_1 = require("../../../../Common/PublicUtil"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  IQuest_1 = require("../../../../World/EntityReadCode/Interface/IQuest");
class SilentAreaInfoSubItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.BO_ = IQuest_1.EInformationViewType.LevelPlay);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
    ];
  }
  SetCurrentShowType(e) {
    this.BO_ = e;
  }
  Initialize(e, t) {
    this.CreateByActorAsync(e).finally(() => {
      this.UpdateItem(t);
    });
  }
  UpdateItem(e) {
    var t = this.Fmt(e.TidTitle);
    this.Qmt(e.TidContent, t ? 32 : 36);
  }
  Fmt(e) {
    var t = this.GetText(0);
    let i = "";
    return (
      (i =
        this.BO_ === IQuest_1.EInformationViewType.LevelPlay
          ? PublicUtil_1.PublicUtil.GetConfigTextByKey(e)
          : MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e)),
      StringUtils_1.StringUtils.IsBlank(i)
        ? (t?.GetParentAsUIItem()?.SetUIActive(!1), !1)
        : (t?.SetText(i), t?.GetParentAsUIItem()?.SetUIActive(!0), !0)
    );
  }
  Qmt(e, t) {
    var i = this.GetText(1);
    let r = "";
    (r =
      this.BO_ === IQuest_1.EInformationViewType.LevelPlay
        ? PublicUtil_1.PublicUtil.GetConfigTextByKey(e)
        : MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e)),
      StringUtils_1.StringUtils.IsBlank(r)
        ? i?.SetUIActive(!1)
        : (i?.SetText(r), i?.SetFontSize(t), i?.SetUIActive(!0));
  }
}
exports.SilentAreaInfoSubItem = SilentAreaInfoSubItem;
//# sourceMappingURL=SilentAreaInfoSubItem.js.map
