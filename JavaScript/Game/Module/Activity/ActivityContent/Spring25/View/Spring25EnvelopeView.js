"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Spring25EnvelopeView = void 0);
const UE = require("ue"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  ActivitySpring25Controller_1 = require("../Controller/ActivitySpring25Controller");
class Spring25EnvelopeView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.JGl = () => {
        ActivitySpring25Controller_1.ActivitySpring25Controller.Instance.HandleResetCurrentSignId(),
          this.CloseMe();
      }),
      (this.zGl = () => {
        ActivitySpring25Controller_1.ActivitySpring25Controller.Instance.HandleResetCurrentSignId(),
          this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [1, this.JGl],
        [2, this.zGl],
      ]);
  }
  OnStart() {
    var i = this.OpenParam;
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(0), i.InfoTextId),
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(3), i.TitleTextId);
  }
}
exports.Spring25EnvelopeView = Spring25EnvelopeView;
//# sourceMappingURL=Spring25EnvelopeView.js.map
