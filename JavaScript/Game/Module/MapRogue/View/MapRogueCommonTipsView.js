"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRogueCommonTipsView = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class MapRogueCommonTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), (this.Xr1 = 0);
  }
  OnAfterShow() {
    this.CloseMe(() => {
      ModelManager_1.ModelManager.MapRogueModel.ExecuteOpData(this.Xr1);
    });
  }
  OnStart() {
    this.Xr1 = this.OpenParam;
  }
  OnBeforeShow() {}
}
exports.MapRogueCommonTipsView = MapRogueCommonTipsView;
//# sourceMappingURL=MapRogueCommonTipsView.js.map
