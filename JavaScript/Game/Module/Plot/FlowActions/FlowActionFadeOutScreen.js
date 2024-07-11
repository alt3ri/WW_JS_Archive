"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionFadeOutScreen = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController");
const FlowActionBase_1 = require("./FlowActionBase");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class FlowActionFadeOutScreen extends FlowActionBase_1.FlowActionBase {
  constructor() {
    super(...arguments),
      (this.yDe = () => {
        this.FinishExecute(!0);
      });
  }
  OnExecute() {
    ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(!1);
    const e = this.ActionInfo.Params;
    (ModelManager_1.ModelManager.PlotModel.IsFadeIn = !1),
      ModelManager_1.ModelManager.PlotModel.BlackScreenType === 1 &&
      ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelC"
        ? EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.PlotViewBgFadeBlackScreen,
            !1,
            this.yDe,
          )
        : ((Global_1.Global.CharacterCameraManager.FadeAmount = 0),
          LevelLoadingController_1.LevelLoadingController.CloseLoading(
            0,
            this.yDe,
            e?.Ease?.Duration,
          ));
  }
  OnBackgroundExecute() {
    (ModelManager_1.ModelManager.PlotModel.IsFadeIn = !1),
      this.FinishExecute(!0);
  }
}
exports.FlowActionFadeOutScreen = FlowActionFadeOutScreen;
// # sourceMappingURL=FlowActionFadeOutScreen.js.map
