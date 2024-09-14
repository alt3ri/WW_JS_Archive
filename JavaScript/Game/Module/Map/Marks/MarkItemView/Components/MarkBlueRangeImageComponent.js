"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkBlueRangeImageComponent = void 0);
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  MarkRangeImageComponent_1 = require("./MarkRangeImageComponent");
class MarkBlueRangeImageComponent extends MarkRangeImageComponent_1.MarkRangeImageComponent {
  OnStart() {
    var e =
      ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "T_ProbeAreaMark",
      );
    this.RootItem.SetAnchorOffset(Vector2D_1.Vector2D.ZeroVector),
      this.RootItem.SetUIItemScale(Vector_1.Vector.OneVector),
      this.SetTextureByPath(e, this.RangeImage);
  }
}
exports.MarkBlueRangeImageComponent = MarkBlueRangeImageComponent;
//# sourceMappingURL=MarkBlueRangeImageComponent.js.map
