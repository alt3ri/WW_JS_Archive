"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySelectContentBase = void 0);
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class ActivitySelectContentBase extends UiPanelBase_1.UiPanelBase {
  async Init(e) {
    await this.CreateThenShowByActorAsync(e.GetOwner());
  }
  ClearItem() {}
  GetItemSize(e) {
    const t = Vector2D_1.Vector2D.Create();
    return t.Set(this.RootItem.Width, this.RootItem.Height), t.ToUeVector2D();
  }
}
exports.ActivitySelectContentBase = ActivitySelectContentBase;
// # sourceMappingURL=ActivitySelectContentBase.js.map
