"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventFadeOutScreen = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PlotModel_1 = require("../../Module/Plot/PlotModel"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventFadeOutScreen extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.yDe = () => {
        this.FinishExecute(!0);
      });
  }
  ExecuteNew(e, r) {
    e &&
      ((e = e),
      (ModelManager_1.ModelManager.PlotModel.IsFadeIn = !1),
      1 === ModelManager_1.ModelManager.PlotModel.BlackScreenType &&
      "LevelC" === ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel
        ? EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.PlotViewBgFadeBlackScreen,
            !1,
            this.yDe,
          )
        : ((Global_1.Global.CharacterCameraManager.FadeAmount = 0),
          ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(
            0,
            () => {
              this.FinishExecute(!0),
                (ModelManager_1.ModelManager.LoadingModel.ScreenEffect = 0),
                (ModelManager_1.ModelManager.PlotModel.LastPlotAspect =
                  PlotModel_1.INVALID_NUM),
                (ModelManager_1.ModelManager.PlotModel.LastPlotColor =
                  PlotModel_1.INVALID_NUM);
            },
            e?.Ease?.Duration,
          )));
  }
  ExecuteInGm(e, r) {
    ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(
      0,
      () => {
        this.FinishExecute(!0),
          (ModelManager_1.ModelManager.LoadingModel.ScreenEffect = 0);
      },
      0,
    );
  }
  OnUpdateGuarantee() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RemGuaranteeAction,
      this.Type,
      this.BaseContext,
      { Name: "ActionBlackScreenFadeOut" },
    );
  }
}
exports.LevelEventFadeOutScreen = LevelEventFadeOutScreen;
//# sourceMappingURL=LevelEventFadeOutScreen.js.map
