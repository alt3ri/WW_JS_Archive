"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FunctionViewPanelHandle = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiNavigationNewController_1 = require("../UiNavigationNewController");
const SpecialPanelHandleBase_1 = require("./SpecialPanelHandleBase");
class FunctionViewPanelHandle extends SpecialPanelHandleBase_1.SpecialPanelHandleBase {
  constructor() {
    super(...arguments),
      (this.Zxo = new Set()),
      (this.ewo = new Map()),
      (this.two = new Set()),
      (this.iwo = 1);
  }
  OnDefaultNavigationListenerList(e) {}
  OnGetLoopOrLayoutListener(e) {
    return e;
  }
  AddNavigationListener(e) {
    let i;
    this.two.add(e),
      this.Zxo.has(e.LayoutActor) ||
        ((i = (i = e.LayoutActor.GetUIItem().GetParentAsUIItem())
          .GetParentAsUIItem()
          .UIChildren.FindIndex(i)),
        this.Zxo.add(e.LayoutActor),
        this.ewo.set(i, e),
        i === 1 && this.owo(i, e));
  }
  owo(e, i) {
    (this.iwo = e),
      this.SetNavigationGroupDefaultListener(i),
      (this.DefaultNavigationListener = []),
      this.DefaultNavigationListener.push(i);
  }
  rwo(e) {
    let i;
    const t = this.ewo.get(e);
    t &&
      ((i =
        UiNavigationNewController_1.UiNavigationNewController.GetCurrentNavigationFocusListener()) &&
      this.two.has(i)
        ? (this.owo(e, t),
          UiNavigationNewController_1.UiNavigationNewController.MarkViewHandleRefreshNavigationDirty(),
          ModelManager_1.ModelManager.UiNavigationModel.SetCursorActiveDelayTime(
            350,
          ))
        : this.owo(e, t));
  }
  FindNextFocusListener() {
    this.rwo(this.iwo + 1);
  }
  FindPrevFocusListener() {
    this.rwo(this.iwo - 1);
  }
}
exports.FunctionViewPanelHandle = FunctionViewPanelHandle;
// # sourceMappingURL=FunctionViewPanelHandle.js.map
