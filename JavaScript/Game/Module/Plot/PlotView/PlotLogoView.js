"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotLogoView = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class PlotLogoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), (this.wk = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  async OnCreateAsync() {
    const s = new CustomPromise_1.CustomPromise();
    var e =
      ConfigManager_1.ConfigManager.UiResourceConfig.GetLogoPathByLanguage(
        "PlotLogo",
      );
    return (
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Texture, (e) => {
        ObjectUtils_1.ObjectUtils.IsValid(e) && ((this.wk = e), s.SetResult());
      }),
      s.Promise
    );
  }
  OnBeforeShow() {
    this.wk && this.GetTexture(0)?.SetTexture(this.wk);
  }
}
exports.PlotLogoView = PlotLogoView;
//# sourceMappingURL=PlotLogoView.js.map
