"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LiuLiDaoLingSkillItem = void 0);
const UE = require("ue"),
  InputController_1 = require("../../../Input/InputController"),
  InputEnums_1 = require("../../../Input/InputEnums"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class LiuLiDaoLingSkillItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Xy = 0),
      (this.wut = !1),
      (this.$ct = InputEnums_1.EInputAxis.None),
      (this.jce = 0),
      (this.rTt = void 0),
      (this.Oc_ = () => {
        (this.wut = !0),
          InputController_1.InputController.InputAxis(this.$ct, this.jce),
          this.rTt?.(this.Xy);
      }),
      (this.Gc_ = () => {
        (this.wut = !1),
          InputController_1.InputController.InputAxis(this.$ct, 0);
      });
  }
  RefreshByMoveType(t, s, i, e) {
    (this.Xy = t), (this.$ct = s), (this.jce = i), (this.rTt = e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent]];
  }
  OnAfterShow() {
    super.OnAfterShow();
    var t = this.GetButton(0);
    t.OnPointDownCallBack.Bind(this.Oc_),
      t.OnPointUpCallBack.Bind(this.Gc_),
      t.OnPointCancelCallBack.Bind(this.Gc_);
  }
  OnBeforeHide() {
    super.OnBeforeHide(), (this.wut = !1);
    var t = this.GetButton(0);
    t.OnPointDownCallBack.Unbind(),
      t.OnPointUpCallBack.Unbind(),
      t.OnPointCancelCallBack.Unbind();
  }
  Tick(t) {
    this.wut && InputController_1.InputController.InputAxis(this.$ct, this.jce);
  }
  Press(t) {
    t !== this.wut && (t ? this.Oc_() : this.Gc_());
  }
}
exports.LiuLiDaoLingSkillItem = LiuLiDaoLingSkillItem;
//# sourceMappingURL=LiuLiDaoLingSkillItem.js.map
