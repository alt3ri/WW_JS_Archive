"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ServerMarkItemView = void 0);
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
  MarkItemView_1 = require("./MarkItemView");
class ServerMarkItemView extends MarkItemView_1.MarkItemView {
  constructor(e) {
    super(e);
  }
  OnInitialize() {
    super.OnInitialize(),
      this.RootItem.SetAnchorOffset(
        Vector2D_1.Vector2D.Create(
          this.Holder.UiPosition.X,
          this.Holder.UiPosition.Y,
        ).ToUeVector2D(!0),
      );
  }
}
exports.ServerMarkItemView = ServerMarkItemView;
//# sourceMappingURL=ServerMarkItemView.js.map
