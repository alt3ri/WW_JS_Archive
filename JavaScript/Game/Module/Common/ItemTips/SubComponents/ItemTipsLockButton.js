"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TipsLockButton = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class TipsLockButton extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.zKe = 0),
      (this.yPt = !1),
      (this.DTt = () => !this.Bpt || this.Bpt(this.zKe)),
      (this.L7e = (e, t) => {
        e === this.zKe && ((this.yPt = t), this.IPt());
      }),
      (this.Bpt = void 0),
      (this.TPt = () => {
        ControllerHolder_1.ControllerHolder.InventoryController.ItemLockRequest(
          this.zKe,
          !this.yPt,
        );
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [[0, UE.UIExtendToggle]]),
      (this.BtnBindInfo = [[0, this.TPt]]);
  }
  OnStart() {
    const e = this.GetExtendToggle(0);
    e.CanExecuteChange.Unbind(), e.CanExecuteChange.Bind(this.DTt);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnItemLock,
      this.L7e,
    );
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnItemLock,
      this.L7e,
    );
  }
  Refresh(e, t) {
    this.zKe = e;
    e = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(e);
    this.GetExtendToggle(0).RootUIComp.SetUIActive(e.CanLock()),
      (this.yPt = e.GetIsLock()),
      this.IPt(),
      (this.Bpt = t || void 0);
  }
  IPt() {
    const e = this.yPt ? 0 : 1;
    this.GetExtendToggle(0).SetToggleState(e, !1);
  }
}
exports.TipsLockButton = TipsLockButton;
// # sourceMappingURL=ItemTipsLockButton.js.map
