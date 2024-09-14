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
      (this.yQa = !1),
      (this.EQa = !1),
      (this.IQa = !1),
      (this.TQa = 0),
      (this.Dut = (t) => {
        this.ActionName && this.ActionName === t && this.LQa(this.AQa());
      }),
      (this.DQa = (t, e) => {
        this.IQa &&
          this.yQa &&
          (e < -this.TQa || e > this.TQa) &&
          ((this.EQa = !0),
          this.OnInputAction(this.ActionName, 0),
          (this.EQa = !1),
          (this.yQa = !1));
      }),
      (this.RQa = (t, e) => {
        (this.yQa = 0 === e), this.OnInputAction(t, e);
      });
  }
  Bind() {
    this.AU(),
      InputDistributeController_1.InputDistributeController.BindAction(
        this.ActionName,
        this.RQa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnActionKeyChanged,
        this.Dut,
      );
  }
  UnBind() {
    InputDistributeController_1.InputDistributeController.UnBindAction(
      this.ActionName,
      this.RQa,
    ),
      this.IQa &&
        InputDistributeController_1.InputDistributeController.UnBindAxes(
          [
            InputMappingsDefine_1.axisMappings.LookUp,
            InputMappingsDefine_1.axisMappings.Turn,
          ],
          this.DQa,
        ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActionKeyChanged,
        this.Dut,
      );
  }
  AU() {
    (this.TQa =
      CommonParamById_1.configCommonParamById.GetFloatConfig(
        "Roulette_Gamepad_Open_DeadLimit",
      ) ?? 0),
      this.LQa(this.AQa());
  }
  AQa() {
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
  LQa(t) {
    t !== this.IQa &&
      (t
        ? InputDistributeController_1.InputDistributeController.BindAxes(
            [
              InputMappingsDefine_1.axisMappings.LookUp,
              InputMappingsDefine_1.axisMappings.Turn,
            ],
            this.DQa,
          )
        : InputDistributeController_1.InputDistributeController.UnBindAxes(
            [
              InputMappingsDefine_1.axisMappings.LookUp,
              InputMappingsDefine_1.axisMappings.Turn,
            ],
            this.DQa,
          ),
      (this.IQa = t));
  }
  SpecialConditionCheck() {
    return !Info_1.Info.IsInGamepad() || !this.IQa || this.EQa;
  }
}
exports.ViewHotKeyHandleRoulette = ViewHotKeyHandleRoulette;
//# sourceMappingURL=ViewHotKeyHandleRoulette.js.map
