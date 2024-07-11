"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleViewCameraComponent = void 0);
const Global_1 = require("../../../Global");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const HotKeyComponent_1 = require("./HotKeyComponent");
class BattleViewCameraComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor(t) {
    super(t),
      (this.sbo = !1),
      (this.abo = void 0),
      (this.gze = (t, e) => {
        this.sbo = e === 0;
        e = Global_1.Global.BaseCharacter;
        if (e) {
          e = e.CharacterActorComponent.Entity;
          if (e) {
            e = e.GetComponent(185);
            if (e)
              return e.HasTag(-1315735076)
                ? this.abo
                  ? void 0
                  : void (this.abo = e.ListenForTagAddOrRemove(
                      -1315735076,
                      (t, e) => {
                        e ||
                          (this.SetVisibleMode(2, this.sbo),
                          this.abo.EndTask(),
                          (this.abo = void 0));
                      },
                    ))
                : void this.SetVisibleMode(2, this.sbo);
          }
        }
      }),
      InputDistributeController_1.InputDistributeController.BindAction(
        InputMappingsDefine_1.actionMappings.组合主键,
        this.gze,
      );
  }
  OnClear() {
    InputDistributeController_1.InputDistributeController.UnBindAction(
      InputMappingsDefine_1.actionMappings.组合主键,
      this.gze,
    );
  }
  OnRefreshSelfHotKeyState(t) {
    this.SetVisibleMode(2, this.sbo);
  }
}
exports.BattleViewCameraComponent = BattleViewCameraComponent;
// # sourceMappingURL=BattleViewCameraComponent.js.map
