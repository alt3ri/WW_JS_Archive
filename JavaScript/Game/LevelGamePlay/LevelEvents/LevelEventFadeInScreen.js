"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventFadeInScreen = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelLoadingController_1 = require("../../Module/LevelLoading/LevelLoadingController"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventFadeInScreen extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.SDe = !1),
      (this.yDe = () => {
        this.FinishExecute(!0);
      });
  }
  ExecuteNew(t, n) {
    if (t) {
      let e = void 0;
      if (
        (t.KeepFadeAfterTreeEnd && (this.SDe = t.KeepFadeAfterTreeEnd),
        !this.SDe &&
          n &&
          6 === n.Type &&
          (n = n) &&
          n.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay &&
          ((e = n.TreeConfigId), Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info("BlackScreen", 46, "玩法内开启黑幕：", [
            "treeId",
            n.TreeConfigId,
          ]),
        (ModelManager_1.ModelManager.PlotModel.IsFadeIn = !0),
        ModelManager_1.ModelManager.CameraModel?.FightCamera?.LogicComponent?.ExitCameraHook(
          !1,
        ),
        "LevelC" ===
          ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel &&
        void 0 !== t.TypeOverride
          ? (ModelManager_1.ModelManager.PlotModel.BlackScreenType = 1)
          : (ModelManager_1.ModelManager.PlotModel.BlackScreenType = 0),
        0 === ModelManager_1.ModelManager.PlotModel.BlackScreenType)
      ) {
        switch (t.ScreenType) {
          case IAction_1.EFadeInScreenShowType.White:
            ModelManager_1.ModelManager.LoadingModel.ScreenEffect = 2;
            break;
          case IAction_1.EFadeInScreenShowType.Black:
            ModelManager_1.ModelManager.LoadingModel.ScreenEffect = 1;
        }
        LevelLoadingController_1.LevelLoadingController.OpenLoading(
          0,
          3,
          () => {
            this.FinishExecute(!0);
          },
          t?.Ease?.Duration,
          t.ScreenType,
          !0,
          !0,
          e,
        );
      } else
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.PlotViewBgFadeBlackScreen,
          !0,
          this.yDe,
        );
    }
  }
  ExecuteInGm(e, t) {
    this.FinishExecute(!0);
  }
  OnUpdateGuarantee() {
    var e;
    this.SDe
      ? ((e = { Name: "ActionBlackScreenFadeOut" }),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RemGuaranteeAction,
          this.Type,
          this.BaseContext,
          e,
        ))
      : ((e = { Name: "ActionBlackScreenFadeOut" }),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.AddGuaranteeAction,
          this.Type,
          this.BaseContext,
          e,
        ));
  }
  OnReset() {
    this.SDe = !1;
  }
}
exports.LevelEventFadeInScreen = LevelEventFadeInScreen;
//# sourceMappingURL=LevelEventFadeInScreen.js.map
