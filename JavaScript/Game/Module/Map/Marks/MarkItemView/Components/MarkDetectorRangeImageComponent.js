"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkDetectorRangeImageComponent = void 0);
const UE = require("ue"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class MarkDetectorRangeImageComponent extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  OnStart() {
    var e =
      ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "T_ProbeArea",
      );
    this.RootItem.SetAnchorOffset(Vector2D_1.Vector2D.ZeroVector),
      this.RootItem.SetUIItemScale(Vector_1.Vector.OneVector),
      this.SetTextureByPath(e, this.RangeImage);
  }
  get RangeImage() {
    return this.GetTexture(0);
  }
}
exports.MarkDetectorRangeImageComponent = MarkDetectorRangeImageComponent;
//# sourceMappingURL=MarkDetectorRangeImageComponent.js.map
