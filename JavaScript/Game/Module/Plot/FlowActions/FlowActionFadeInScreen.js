"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionFadeInScreen = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController");
const FlowActionBase_1 = require("./FlowActionBase");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class FlowActionFadeInScreen extends FlowActionBase_1.FlowActionBase {
  constructor() {
    super(...arguments),
      (this.yDe = () => {
        this.FinishExecute(!0);
      });
  }
  OnExecute() {
    ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(!1);
    const e = this.ActionInfo.Params;
    (ModelManager_1.ModelManager.PlotModel.IsFadeIn = !0),
      (ModelManager_1.ModelManager.PlotModel.BlackScreenType = 1),
      ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelC" &&
      void 0 !== e.TypeOverride
        ? (ModelManager_1.ModelManager.PlotModel.BlackScreenType = 1)
        : (ModelManager_1.ModelManager.PlotModel.BlackScreenType = 0),
      ModelManager_1.ModelManager.PlotModel.BlackScreenType === 0
        ? LevelLoadingController_1.LevelLoadingController.OpenLoading(
            0,
            3,
            this.yDe,
            e?.Ease?.Duration,
            e?.ScreenType
              ? e.ScreenType
              : LevelLoadingController_1.LevelLoadingController.CameraFade.ColorSearch(),
          )
        : EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.PlotViewBgFadeBlackScreen,
            !0,
            this.yDe,
          );
  }
  OnBackgroundExecute() {
    (ModelManager_1.ModelManager.PlotModel.IsFadeIn = !0),
      this.FinishExecute(!0);
  }
}
exports.FlowActionFadeInScreen = FlowActionFadeInScreen;
// # sourceMappingURL=FlowActionFadeInScreen.js.map
