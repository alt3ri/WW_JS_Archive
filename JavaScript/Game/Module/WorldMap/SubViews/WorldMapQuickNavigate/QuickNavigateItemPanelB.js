"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuickNavigateItemPanelB = void 0);
const UE = require("ue"),
  StateByStateId_1 = require("../../../../../Core/Define/ConfigQuery/StateByStateId"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class QuickNavigateItemPanelB extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.hKa = void 0),
      (this.kqe = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.WorldMapFirstNavigateSelect,
          this.hKa,
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.kqe]]);
  }
  RefreshByData(e) {
    var t = (this.hKa = e).StateId,
      t = StateByStateId_1.configStateByStateId.GetConfig(t),
      i = this.GetText(1),
      i =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(i, t.StateName),
        this.GetExtendToggle(0));
    e.IsSelected ? i.SetToggleState(1) : i.SetToggleState(0);
  }
}
exports.QuickNavigateItemPanelB = QuickNavigateItemPanelB;
//# sourceMappingURL=QuickNavigateItemPanelB.js.map
