"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InviteNewbieRewardItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
class InviteNewbieRewardItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [
          0,
          ActivityControllerHolder_1.ActivityControllerHolder
            .ActivityInviteNewbieController.HandleOnRewardClick,
        ],
      ]);
  }
  OnStart() {
    this.GetItem(2)?.SetUIActive(!1);
  }
  RefreshByDataExternal(e, t) {
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(1), e, t);
  }
}
exports.InviteNewbieRewardItem = InviteNewbieRewardItem;
//# sourceMappingURL=InviteNewbieRewardItem.js.map
