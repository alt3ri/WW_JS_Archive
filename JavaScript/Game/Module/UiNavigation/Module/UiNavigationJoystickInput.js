"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiNavigationJoystickInput = void 0);
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const UiNavigationLogic_1 = require("../New/UiNavigationLogic");
class UiNavigationJoystickInput {
  static Tick(i) {
    const t = ModelManager_1.ModelManager.InputDistributeModel.GetAxisValue(
      InputMappingsDefine_1.axisMappings.NavigationTopDown,
    );
    const s = ModelManager_1.ModelManager.InputDistributeModel.GetAxisValue(
      InputMappingsDefine_1.axisMappings.NavigationLeftRight,
    );
    let n = this.yxo(s);
    let a = this.yxo(t);
    if (!n || !a || this.f_t) {
      if (this.f_t) {
        this.Ixo(s, t);
        (n = this.Txo(s)), (a = this.Txo(t));
        if (n && a) return (this.f_t = !1), this.Lxo(), void this.Dxo();
      }
      this.Rxo(s, t),
        this.Uxo(i),
        (this.Axo = s),
        (this.Pxo = t),
        (this.f_t = !0);
    }
  }
  static Rxo(i, t) {
    this.cz.Set(i, t, 0);
    i = Vector_1.Vector.GetAngleByVector2D(this.cz);
    i >= -143 && i < -37
      ? this.xxo(InputMappingsDefine_1.actionMappings.Ui方向下)
      : i >= -37 && i < 37
        ? this.xxo(InputMappingsDefine_1.actionMappings.Ui方向右)
        : i >= 37 && i < 143
          ? this.xxo(InputMappingsDefine_1.actionMappings.Ui方向上)
          : this.xxo(InputMappingsDefine_1.actionMappings.Ui方向左);
  }
  static yxo(i) {
    return Math.abs(i) < this.wxo;
  }
  static Txo(i) {
    return Math.abs(i) < this.Bxo;
  }
  static xxo(i) {
    i !== this.nCt &&
      ((this.nCt = i),
      (this.bxo = !1),
      (this.qxo = 0),
      (this.Gxo = this.Nxo),
      (this.Oxo = 1),
      UiNavigationLogic_1.UiNavigationLogic.ExecuteInputNavigation(
        this.nCt,
        0,
      ));
  }
  static Dxo() {
    const i = this.nCt;
    StringUtils_1.StringUtils.IsBlank(i) ||
      ((this.nCt = ""),
      (this.qxo = 0),
      (this.Axo = 0),
      (this.Pxo = 0),
      (this.bxo = !1),
      UiNavigationLogic_1.UiNavigationLogic.ExecuteInputNavigation(i, 1));
  }
  static Uxo(i) {
    StringUtils_1.StringUtils.IsBlank(this.nCt) ||
      ((this.qxo += i),
      this.Oxo === 0
        ? this.qxo > this.kxo &&
          ((this.qxo -= this.kxo),
          (this.Gxo = this.Fxo),
          (this.Oxo = 1),
          UiNavigationLogic_1.UiNavigationLogic.ExecuteInputNavigation(
            this.nCt,
            0,
          ))
        : this.Oxo === 1 &&
          this.qxo > this.Gxo &&
          ((this.qxo -= this.Gxo),
          (this.Oxo = 0),
          UiNavigationLogic_1.UiNavigationLogic.ExecuteInputNavigation(
            this.nCt,
            1,
          )));
  }
  static Ixo(i, t) {
    let s = 0;
    let n = 0;
    (n =
      this.nCt === InputMappingsDefine_1.actionMappings.Ui方向右 ||
      this.nCt === InputMappingsDefine_1.actionMappings.Ui方向上
        ? ((s = this.Axo - i), this.Pxo - t)
        : ((s = i - this.Axo), t - this.Pxo)),
      (s > this.Vxo || n > this.Vxo) && (this.bxo = !0);
  }
  static Lxo() {
    if (this.bxo) {
      if (StringUtils_1.StringUtils.IsBlank(this.nCt)) return;
      const i = this.Hxo.get(this.nCt);
      for (const s of this.jxo) {
        const t = s[0];
        s[1] || t(i);
      }
    }
    for (const n of this.jxo) this.jxo.set(n[0], !1);
  }
  static RegisterLeftJoystickFunction(i) {
    this.jxo.set(i, this.f_t);
  }
  static UnRegisterLeftJoystickFunction(i) {
    this.jxo.delete(i);
  }
}
((exports.UiNavigationJoystickInput = UiNavigationJoystickInput).wxo = 0.6),
  (UiNavigationJoystickInput.Bxo = 0.2),
  (UiNavigationJoystickInput.Vxo = 0.3),
  (UiNavigationJoystickInput.nCt = ""),
  (UiNavigationJoystickInput.Nxo = 500),
  (UiNavigationJoystickInput.Fxo = 100),
  (UiNavigationJoystickInput.kxo = 100),
  (UiNavigationJoystickInput.Gxo = 0),
  (UiNavigationJoystickInput.qxo = 0),
  (UiNavigationJoystickInput.Oxo = void 0),
  (UiNavigationJoystickInput.cz = Vector_1.Vector.Create()),
  (UiNavigationJoystickInput.f_t = !1),
  (UiNavigationJoystickInput.Hxo = new Map([
    [InputMappingsDefine_1.actionMappings.Ui方向下, 0],
    [InputMappingsDefine_1.actionMappings.Ui方向右, 3],
    [InputMappingsDefine_1.actionMappings.Ui方向上, 1],
    [InputMappingsDefine_1.actionMappings.Ui方向左, 2],
  ])),
  (UiNavigationJoystickInput.jxo = new Map()),
  (UiNavigationJoystickInput.Axo = 0),
  (UiNavigationJoystickInput.Pxo = 0),
  (UiNavigationJoystickInput.bxo = !1);
// # sourceMappingURL=UiNavigationJoystickInput.js.map
