"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventFadeOutScreen = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelLoadingController_1 = require("../../Module/LevelLoading/LevelLoadingController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventFadeOutScreen extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.yDe = () => {
        this.FinishExecute(!0);
      });
  }
  ExecuteNew(e, n) {
    e &&
      ((e = e),
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
            () => {
              this.FinishExecute(!0),
                (ModelManager_1.ModelManager.LoadingModel.ScreenEffect = 0);
            },
            e?.Ease?.Duration,
          )));
  }
  ExecuteInGm(e, n) {
    LevelLoadingController_1.LevelLoadingController.CloseLoading(
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
// # sourceMappingURL=LevelEventFadeOutScreen.js.map
