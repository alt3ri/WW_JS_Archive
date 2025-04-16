"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventCommonTip2 = void 0);
const IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  LevelEventLockInputState_1 = require("../LevelEventLockInputState"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  BLOCK_INPUTTAG = "BlockAllInputTag";
class LevelEventCommonTip2 extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.WDe = void 0),
      (this.Zkl = !1),
      (this.Z4l = () => {
        this.FinishExecute(!0);
      });
  }
  ExecuteNew(e, t) {
    e &&
      (e = e.TipOption).Type === IAction_1.ECommonTip2Type.PrepareCountdown &&
      ((this.Zkl = e.IsBlockPlayer ?? !1),
      this.Zkl &&
        (LevelEventLockInputState_1.LevelEventLockInputState.IsLockInput()
          ? (LevelEventLockInputState_1.LevelEventLockInputState.InputTagNames.push(
              BLOCK_INPUTTAG,
            ),
            ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag())
          : (ModelManager_1.ModelManager.InputDistributeModel.SetInputDistributeTag(
              BLOCK_INPUTTAG,
            ),
            LevelEventLockInputState_1.LevelEventLockInputState.Lock([
              BLOCK_INPUTTAG,
            ]))),
      (this.WDe = "LevelGamePlayPrepareCountDown"),
      (e = { CountDownNum: e.CountDownNum, TidText: e.TidCountDownTxt }),
      UiManager_1.UiManager.OpenView(this.WDe, e),
      this.IsAsync
        ? this.FinishExecute(!0)
        : EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.LevelGamePlayPrepareCountDownEnd,
            this.Z4l,
          ));
  }
  OnFinish() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.LevelGamePlayPrepareCountDownEnd,
      this.Z4l,
    ),
      this.Zkl &&
        (LevelEventLockInputState_1.LevelEventLockInputState.Unlock(),
        ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag()),
      (this.Zkl = !1);
  }
}
exports.LevelEventCommonTip2 = LevelEventCommonTip2;
//# sourceMappingURL=LevelEventCommonTip2.js.map
