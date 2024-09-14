"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleInputModel = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  InputController_1 = require("../../../Input/InputController"),
  InputEnums_1 = require("../../../Input/InputEnums"),
  VisibleStateUtil_1 = require("../../BattleUi/VisibleStateUtil");
class BattleInputModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.Waa = []), (this.EQe = []);
  }
  OnInit() {
    this.Waa.length = 0;
    for (let t = (this.EQe.length = 0); t < 16; t++)
      this.Waa.push(0), this.EQe.push(0);
    return !0;
  }
  GetInputEnable(t) {
    return 0 === this.Waa[t];
  }
  GetInputVisible(t) {
    return 0 === this.EQe[t];
  }
  SetInputEnable(t, e, n) {
    var i = this.Waa[t],
      e =
        (!e &&
          0 === i &&
          InputController_1.InputController.IsKeyDown(t) &&
          (InputController_1.InputController.InputAction(t, 2),
          Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug(
            "Battle",
            18,
            "禁用输入时，该输入已按下，立即执行放开操作",
            ["action", t],
          ),
        VisibleStateUtil_1.VisibleStateUtil.SetVisible(i, e, n));
    i !== (this.Waa[t] = e) && this.Qaa(t, 0 === e);
  }
  SetInputVisible(t, e, n) {
    var i = this.EQe[t],
      e = VisibleStateUtil_1.VisibleStateUtil.SetVisible(i, e, n);
    i !== (this.EQe[t] = e) && this.fXe(t, 0 === e);
  }
  SetAllInputEnable(e, n) {
    var i = InputEnums_1.EInputAction.MaxCount;
    for (let t = 0; t < i; t++) this.SetInputEnable(t, e, n);
  }
  SetAllInputVisible(e, n) {
    var i = InputEnums_1.EInputAction.MaxCount;
    for (let t = 0; t < i; t++) this.SetInputVisible(t, e, n);
  }
  Qaa(t, e) {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.BattleInputEnableChanged,
      t,
      e,
    );
  }
  fXe(t, e) {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.BattleInputVisibleChanged,
      t,
      e,
    );
  }
}
exports.BattleInputModel = BattleInputModel;
//# sourceMappingURL=BattleInputModel.js.map
