"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ViewHotKeyHandleRoulette = void 0);
const Info_1 = require("../../../../Core/Common/Info"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager"),
  InputDistributeController_1 = require("../../InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../InputDistribute/InputMappingsDefine"),
  ViewHotKeyHandle_1 = require("../ViewHotKeyHandle");
class ViewHotKeyHandleRoulette extends ViewHotKeyHandle_1.ViewHotKeyHandle {
  constructor() {
    super(...arguments),
      (this.KXa = !1),
      (this.$Xa = !1),
      (this.XXa = !1),
      (this.YXa = 0),
      (this.Dut = (t) => {
        this.ActionName && this.ActionName === t && this.zXa(this.JXa());
      }),
      (this.ZXa = (t, e) => {
        this.XXa &&
          this.KXa &&
          (e < -this.YXa || e > this.YXa) &&
          ((this.$Xa = !0),
          this.OnInputAction(this.ActionName, 0),
          (this.$Xa = !1),
          (this.KXa = !1));
      }),
      (this.eYa = (t, e) => {
        (this.KXa = 0 === e), this.OnInputAction(t, e);
      });
  }
  Bind() {
    this.AU(),
      InputDistributeController_1.InputDistributeController.BindAction(
        this.ActionName,
        this.eYa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnActionKeyChanged,
        this.Dut,
      );
  }
  UnBind() {
    InputDistributeController_1.InputDistributeController.UnBindAction(
      this.ActionName,
      this.eYa,
    ),
      this.XXa &&
        InputDistributeController_1.InputDistributeController.UnBindAxes(
          [
            InputMappingsDefine_1.axisMappings.LookUp,
            InputMappingsDefine_1.axisMappings.Turn,
          ],
          this.ZXa,
        ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActionKeyChanged,
        this.Dut,
      );
  }
  AU() {
    (this.YXa =
      CommonParamById_1.configCommonParamById.GetFloatConfig(
        "Roulette_Gamepad_Open_DeadLimit",
      ) ?? 0),
      this.zXa(this.JXa());
  }
  JXa() {
    var t;
    return (
      !!this.ActionName &&
      !!(t = InputSettingsManager_1.InputSettingsManager.GetActionBinding(
        this.ActionName,
      )) &&
      (t.GetGamepadKeyNameList((t = [])), 1 === t.length) &&
      InputSettingsManager_1.InputSettingsManager.IsCombinationAxisMainKey(t[0])
    );
  }
  zXa(t) {
    t !== this.XXa &&
      (t
        ? InputDistributeController_1.InputDistributeController.BindAxes(
            [
              InputMappingsDefine_1.axisMappings.LookUp,
              InputMappingsDefine_1.axisMappings.Turn,
            ],
            this.ZXa,
          )
        : InputDistributeController_1.InputDistributeController.UnBindAxes(
            [
              InputMappingsDefine_1.axisMappings.LookUp,
              InputMappingsDefine_1.axisMappings.Turn,
            ],
            this.ZXa,
          ),
      (this.XXa = t));
  }
  SpecialConditionCheck() {
    return !Info_1.Info.IsInGamepad() || !this.XXa || this.$Xa;
  }
}
exports.ViewHotKeyHandleRoulette = ViewHotKeyHandleRoulette;
//# sourceMappingURL=ViewHotKeyHandleRoulette.js.map
