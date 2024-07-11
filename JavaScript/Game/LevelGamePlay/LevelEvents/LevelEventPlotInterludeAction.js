"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventPlotInterludeAction = void 0);
const UE = require("ue");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils");
const Global_1 = require("../../Global");
const BattleUiDefine_1 = require("../../Module/BattleUi/BattleUiDefine");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const INTERLUDE_DELAY_MILLISECOND = 2e3;
class LevelEventPlotInterludeAction extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.pDe = void 0),
      (this.nx = void 0),
      (this.lRe = void 0),
      (this._Re = void 0),
      (this.uRe = () => {
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
          this.pDe.ActionList,
          LevelGeneralContextDefine_1.GeneralContext.Copy(this.nx),
          () => {
            TimerSystem_1.TimerSystem.Delay(
              this.cRe,
              INTERLUDE_DELAY_MILLISECOND,
            );
          },
        );
      }),
      (this.cRe = () => {
        ObjectUtils_1.ObjectUtils.IsValid(this._Re)
          ? (this._Re.StartCameraFade(
              1,
              0,
              this.pDe.FadeOutTime,
              this.lRe,
              !1,
              !1,
            ),
            TimerSystem_1.TimerSystem.Delay(this.mRe, this.pDe.FadeOutTime))
          : this.FinishExecute(!1);
      }),
      (this.mRe = () => {
        this.FinishExecute(!0);
      });
  }
  ExecuteNew(e, t) {
    e &&
    ((this.pDe = e),
    (this.nx = t),
    (this.lRe = new UE.LinearColor(0, 0, 0, 1)),
    (this._Re = Global_1.Global.CharacterCameraManager),
    ObjectUtils_1.ObjectUtils.IsValid(this._Re))
      ? (this._Re.StartCameraFade(0, 1, this.pDe.FadeInTime, this.lRe, !1, !0),
        TimerSystem_1.TimerSystem.Delay(
          this.uRe,
          this.pDe.FadeInTime * BattleUiDefine_1.SECOND_TO_MILLISECOND,
        ))
      : this.FinishExecute(!1);
  }
  OnReset() {
    (this.pDe = void 0),
      (this.nx = void 0),
      (this.lRe = void 0),
      (this._Re = void 0);
  }
}
exports.LevelEventPlotInterludeAction = LevelEventPlotInterludeAction;
// # sourceMappingURL=LevelEventPlotInterludeAction.js.map
