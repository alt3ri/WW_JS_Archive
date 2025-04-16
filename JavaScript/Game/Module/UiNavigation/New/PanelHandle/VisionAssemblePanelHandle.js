"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionAssemblePanelHandle = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiNavigationNewController_1 = require("../UiNavigationNewController"),
  SpecialPanelHandleBase_1 = require("./SpecialPanelHandleBase");
class VisionAssemblePanelHandle extends SpecialPanelHandleBase_1.SpecialPanelHandleBase {
  constructor() {
    super(...arguments),
      (this.u6_ = void 0),
      (this.IsInCompare = !1),
      (this.wbo = (e) => {
        UiNavigationNewController_1.UiNavigationNewController.MarkViewHandleRefreshNavigationDirty(),
          e &&
            ModelManager_1.ModelManager.UiNavigationModel.MarkMoveInstantly();
      });
  }
  OnInit() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnVisionAssembleNavigationRefresh,
      this.wbo,
    );
  }
  OnClear() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnVisionAssembleNavigationRefresh,
      this.wbo,
    );
  }
  OnGetSuitableNavigationListenerList(e) {
    if (e) return super.OnGetSuitableNavigationListenerList(e);
    if (!this.u6_) {
      this.u6_ = [];
      for (const n of this.DefaultNavigationListener)
        n.IsScrollOrLayoutActor() && this.u6_.push(n);
    }
    return this.u6_;
  }
}
exports.VisionAssemblePanelHandle = VisionAssemblePanelHandle;
//# sourceMappingURL=VisionAssemblePanelHandle.js.map
