"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiNavigationJoystickInput = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  UiNavigationLogic_1 = require("../New/UiNavigationLogic");
class UiNavigationJoystickInput {
  static _d_(i) {
    if (!this.cd_) {
      var t = ModelManager_1.ModelManager.InputDistributeModel.GetAxisValue(
          InputMappingsDefine_1.axisMappings.NavigationTopDown,
        ),
        s = ModelManager_1.ModelManager.InputDistributeModel.GetAxisValue(
          InputMappingsDefine_1.axisMappings.NavigationLeftRight,
        ),
        n = this.Mwo(s),
        a = this.Mwo(t);
      if (!n || !a || this.wut) {
        if (this.wut) {
          this.Ewo(s, t);
          (n = this.Swo(s)), (a = this.Swo(t));
          if (n && a) return (this.wut = !1), this.ywo(), void this.Iwo();
        }
        this.Lwo(s, t),
          this.Dwo(this.fgt, i),
          (this.Rwo = s),
          (this.Uwo = t),
          (this.wut = !0);
      }
    }
  }
  static ud_(i) {
    this.cd_ && this.Dwo(this.dd_, i);
  }
  static Tick(i) {
    this._d_(i), this.ud_(i);
  }
  static Lwo(i, t) {
    var s = this.Mwo(i),
      n = this.Mwo(t);
    (s && n) ||
      (this.cz.Set(s ? 0 : i, n ? 0 : t, 0),
      -143 <= (s = Vector_1.Vector.GetAngleByVector2D(this.cz)) && s < -37
        ? this.Awo(InputMappingsDefine_1.actionMappings.Ui方向下)
        : -37 <= s && s < 37
          ? this.Awo(InputMappingsDefine_1.actionMappings.Ui方向右)
          : 37 <= s && s < 143
            ? this.Awo(InputMappingsDefine_1.actionMappings.Ui方向上)
            : this.Awo(InputMappingsDefine_1.actionMappings.Ui方向左));
  }
  static Mwo(i) {
    return Math.abs(i) < this.Pwo;
  }
  static Swo(i) {
    return Math.abs(i) < this.xwo;
  }
  static Awo(i) {
    i !== this.fgt &&
      ((this.fgt = i),
      (this.wwo = !1),
      (this.Bwo = 0),
      (this.bwo = this.qwo),
      (this.Gwo = 1),
      UiNavigationLogic_1.UiNavigationLogic.ExecuteInputNavigation(
        this.fgt,
        0,
      ));
  }
  static Iwo() {
    var i = this.fgt;
    StringUtils_1.StringUtils.IsBlank(i) ||
      ((this.fgt = ""),
      (this.Bwo = 0),
      (this.Rwo = 0),
      (this.Uwo = 0),
      (this.wwo = !1),
      UiNavigationLogic_1.UiNavigationLogic.ExecuteInputNavigation(i, 1));
  }
  static Dwo(i, t) {
    StringUtils_1.StringUtils.IsBlank(i) ||
      ((this.Bwo += t),
      0 === this.Gwo
        ? this.Bwo > this.Nwo &&
          ((this.Bwo -= this.Nwo),
          (this.bwo = this.Owo),
          (this.Gwo = 1),
          UiNavigationLogic_1.UiNavigationLogic.ExecuteInputNavigation(i, 0))
        : 1 === this.Gwo &&
          this.Bwo > this.bwo &&
          ((this.Bwo -= this.bwo),
          (this.Gwo = 0),
          UiNavigationLogic_1.UiNavigationLogic.ExecuteInputNavigation(i, 1)));
  }
  static Ewo(i, t) {
    let s = 0,
      n = 0;
    (n =
      this.fgt === InputMappingsDefine_1.actionMappings.Ui方向右 ||
      this.fgt === InputMappingsDefine_1.actionMappings.Ui方向上
        ? ((s = this.Rwo - i), this.Uwo - t)
        : ((s = i - this.Rwo), t - this.Uwo)),
      (s > this.kwo || n > this.kwo) && (this.wwo = !0);
  }
  static ywo() {
    if (this.wwo) {
      if (StringUtils_1.StringUtils.IsBlank(this.fgt)) return;
      var i = this.Fwo.get(this.fgt);
      for (const s of this.Vwo) {
        var t = s[0];
        s[1] || t(i);
      }
    }
    for (const n of this.Vwo) this.Vwo.set(n[0], !1);
  }
  static RegisterLeftJoystickFunction(i) {
    this.Vwo.set(i, this.wut);
  }
  static UnRegisterLeftJoystickFunction(i) {
    this.Vwo.delete(i);
  }
  static TriggerActionInputTick(i, t) {
    this.wut ||
      (!StringUtils_1.StringUtils.IsBlank(this.dd_) && this.dd_ !== i) ||
      (0 === t
        ? (UiNavigationLogic_1.UiNavigationLogic.ExecuteInputNavigation(i, 0),
          (this.dd_ = i),
          (this.cd_ = !0),
          (this.Gwo = 1),
          (this.Bwo = 0),
          (this.bwo = this.qwo))
        : (UiNavigationLogic_1.UiNavigationLogic.ExecuteInputNavigation(i, 1),
          (this.dd_ = ""),
          (this.cd_ = !1),
          (this.Gwo = 0)));
  }
  static ResetJoystickActionInput() {
    StringUtils_1.StringUtils.IsBlank(this.dd_) ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("UiNavigation", 10, "ResetJoystickActionInput"),
      UiNavigationLogic_1.UiNavigationLogic.ExecuteInputNavigation(this.dd_, 1),
      (this.dd_ = ""),
      (this.cd_ = !1),
      (this.Gwo = 0));
  }
}
((exports.UiNavigationJoystickInput = UiNavigationJoystickInput).Pwo = 0.7),
  (UiNavigationJoystickInput.xwo = 0.2),
  (UiNavigationJoystickInput.kwo = 0.2),
  (UiNavigationJoystickInput.fgt = ""),
  (UiNavigationJoystickInput.qwo = 500),
  (UiNavigationJoystickInput.Owo = 100),
  (UiNavigationJoystickInput.Nwo = 100),
  (UiNavigationJoystickInput.bwo = 0),
  (UiNavigationJoystickInput.Bwo = 0),
  (UiNavigationJoystickInput.Gwo = void 0),
  (UiNavigationJoystickInput.cz = Vector_1.Vector.Create()),
  (UiNavigationJoystickInput.wut = !1),
  (UiNavigationJoystickInput.dd_ = ""),
  (UiNavigationJoystickInput.cd_ = !1),
  (UiNavigationJoystickInput.Fwo = new Map([
    [InputMappingsDefine_1.actionMappings.Ui方向下, 0],
    [InputMappingsDefine_1.actionMappings.Ui方向右, 3],
    [InputMappingsDefine_1.actionMappings.Ui方向上, 1],
    [InputMappingsDefine_1.actionMappings.Ui方向左, 2],
  ])),
  (UiNavigationJoystickInput.Vwo = new Map()),
  (UiNavigationJoystickInput.Rwo = 0),
  (UiNavigationJoystickInput.Uwo = 0),
  (UiNavigationJoystickInput.wwo = !1);
//# sourceMappingURL=UiNavigationJoystickInput.js.map
