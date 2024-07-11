"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleViewCameraComponent = void 0);
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  HotKeyComponent_1 = require("./HotKeyComponent");
class BattleViewCameraComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor(t) {
    super(t),
      (this.Yda = !1),
      (this.RZe = (t, e) => {
        (this.Yda = 0 === e), this.SetVisibleMode(2, this.Yda);
      }),
      InputDistributeController_1.InputDistributeController.BindAction(
        InputMappingsDefine_1.actionMappings.组合主键,
        this.RZe,
      );
  }
  OnClear() {
    InputDistributeController_1.InputDistributeController.UnBindAction(
      InputMappingsDefine_1.actionMappings.组合主键,
      this.RZe,
    );
  }
  OnRefreshSelfHotKeyState(t) {
    this.SetVisibleMode(2, this.Yda);
  }
}
exports.BattleViewCameraComponent = BattleViewCameraComponent;
//# sourceMappingURL=BattleViewCameraComponent.js.map
