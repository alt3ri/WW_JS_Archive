"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkBlueRangeImageComponent = void 0);
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  MarkRangeImageComponent_1 = require("./MarkRangeImageComponent");
class MarkBlueRangeImageComponent extends MarkRangeImageComponent_1.MarkRangeImageComponent {
  async OnBeforeStartAsync() {
    var e =
      ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "T_ProbeAreaMark",
      );
    await this.SetTextureAsync(e, this.RangeImage);
  }
  OnStart() {
    this.RootItem.SetAnchorOffset(Vector2D_1.Vector2D.ZeroVector),
      this.RootItem.SetUIItemScale(Vector_1.Vector.OneVector),
      this.RangeSprite?.SetUIActive(!1),
      this.RangeImage?.SetUIActive(!0);
  }
}
exports.MarkBlueRangeImageComponent = MarkBlueRangeImageComponent;
//# sourceMappingURL=MarkBlueRangeImageComponent.js.map
