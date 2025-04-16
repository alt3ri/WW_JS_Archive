"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRogueFloatTipsView = void 0);
const UE = require("ue"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class MapRogueFloatTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), (this.Data = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    (this.Data = this.OpenParam),
      this.Data &&
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          this.Data.TextId,
          ...this.Data.TextParam,
        );
  }
  OnAfterShow() {
    this.CloseMe(() => {
      this.Data?.FinishCallback?.();
    });
  }
}
exports.MapRogueFloatTipsView = MapRogueFloatTipsView;
//# sourceMappingURL=MapRogueFloatTipsView.js.map
