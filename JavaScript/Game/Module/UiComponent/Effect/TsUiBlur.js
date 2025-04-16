"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TsUiBlur = void 0);
const UE = require("ue"),
  GlobalData_1 = require("../../../GlobalData");
class TsUiBlur extends UE.LGUIBehaviour {
  constructor() {
    super(...arguments),
      (this.OverrideItem = void 0),
      (this.EnableUiBlur = !0),
      (this.ApplyItem = void 0);
  }
  Constructor() {}
  GetUiBlurComponent() {
    return void 0 === this.OverrideItem
      ? this.ApplyItem
      : this.OverrideItem.RootComponent;
  }
  SetGlobalBlurUiItem() {
    var t;
    this.ApplyItem &&
      ((t = this.GetUiBlurComponent()),
      UE.LGUIBPLibrary.SetGlobalBlurUIItem(t, this.ApplyItem.GetWorld()));
  }
  ResetGlobalBlurUiItem() {
    UE.LGUIBPLibrary.ResetGlobalBlurUIItem(
      GlobalData_1.GlobalData.GameInstance.GetWorld(),
    );
  }
  SetEnableUiBlur(t) {
    (this.EnableUiBlur = t)
      ? this.SetGlobalBlurUiItem()
      : this.ResetGlobalBlurUiItem();
  }
}
(exports.TsUiBlur = TsUiBlur), (exports.default = TsUiBlur);
//# sourceMappingURL=TsUiBlur.js.map
