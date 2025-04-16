"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkDetectorRangeImageComponent = void 0);
const UE = require("ue"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  MarkPanelBase_1 = require("../MarkPanelBase");
class MarkDetectorRangeImageComponent extends MarkPanelBase_1.MarkPanelBase {
  constructor() {
    super(...arguments), (this.KRi = new UE.VectorDouble());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    var e =
      ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "T_ProbeArea",
      );
    await this.SetTextureAsync(e, this.RangeImage);
  }
  OnStart() {
    this.RootItem.SetAnchorOffset(Vector2D_1.Vector2D.ZeroVector),
      this.RootItem.SetUIItemScale(Vector_1.Vector.OneVector);
  }
  OnBeforeShow() {
    this.GetRootItem().D_SetRelativeScale3D(this.KRi);
  }
  get RangeImage() {
    return this.GetTexture(0);
  }
  SetRangeScale(e, t, r) {
    this.KRi.Set(e, t, r),
      this.IsShowOrShowing && this.GetRootItem().D_SetRelativeScale3D(this.KRi);
  }
}
exports.MarkDetectorRangeImageComponent = MarkDetectorRangeImageComponent;
//# sourceMappingURL=MarkDetectorRangeImageComponent.js.map
