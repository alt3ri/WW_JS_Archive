"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuildingLevelUpViewController = void 0);
const MathUtils_1 = require("../../../../../../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../../../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../../../../Ui/UiManager"),
  MoonChasingController_1 = require("../../MoonChasingController"),
  ADD_STEP = 800,
  REDUCE_STEP = 800;
class BuildingLevelUpViewController {
  constructor() {
    (this.Yzt = void 0),
      (this.jio = void 0),
      (this.z7s = !1),
      (this.CRn = 0),
      (this.UnlockPress = () => {
        var i = this.Yzt.UiViewSequence;
        i.HasSequenceNameInPlaying("Press")
          ? i.ChangePlaybackDirection("Press")
          : (this.Yzt.UiViewSequence.PlaySequence("Press"),
            this.Yzt.PlayBuildingLoopSequence(!0)),
          (this.z7s = !0);
      }),
      (this.UnlockRelease = () => {
        var i = this.Yzt.UiViewSequence;
        i.HasSequenceNameInPlaying("Press") &&
          i.ChangePlaybackDirection("Press"),
          (this.z7s = !1);
      }),
      (this.CloseSelf = () => {
        var i;
        this.jio.IsLevelUp
          ? void 0 ===
            (i =
              ModelManager_1.ModelManager.MoonChasingBuildingModel.GetPopularityUpData())
            ? this.Yzt.CloseMe()
            : (UiManager_1.UiManager.OpenView(
                "BusinessTipsPopularityUpView",
                i,
                () => {
                  this.Yzt.CloseMe();
                },
              ),
              ModelManager_1.ModelManager.MoonChasingBuildingModel.SetPopularityUpData(
                void 0,
              ))
          : MoonChasingController_1.MoonChasingController.BuildingBuildFlowRequest(
              this.jio.BuildingId,
              (i) => {
                i
                  ? ((this.Yzt.UiViewSequence.CloseSequenceName = "Close2"),
                    UiManager_1.UiManager.ResetToBattleView())
                  : this.Yzt.CloseMe();
              },
            );
      });
  }
  RegisterView(i) {
    (this.Yzt = i), (this.jio = i.OpenParam);
  }
  Start() {
    this.jio.IsLevelUp
      ? (this.Yzt.InitLevelUp(this.jio.BuildingId),
        this.Yzt.ShowLevelUp(),
        this.Yzt.FinishLevelUp(this.jio.BuildingId),
        (this.Yzt.UiViewSequence.StartSequenceName = "LevelUp"))
      : (this.Yzt.InitUnlock(this.jio.BuildingId),
        (this.Yzt.UiViewSequence.StartSequenceName = "Build"));
  }
  Tick(i) {
    this.jio.IsLevelUp ||
      1 <= this.CRn ||
      (this.z7s
        ? (this.CRn = MathUtils_1.MathUtils.Clamp(
            this.CRn + i / ADD_STEP,
            0,
            1,
          ))
        : (this.CRn = MathUtils_1.MathUtils.Clamp(
            this.CRn - i / REDUCE_STEP,
            0,
            1,
          )),
      this.Yzt.SetFillAmount(this.CRn),
      1 <= this.CRn &&
        (this.Yzt.ShowUnlock(),
        this.Yzt.FinishUnlock(this.jio.BuildingId),
        this.Yzt.UiViewSequence.StopPrevSequence(!1, !0),
        this.Yzt.UiViewSequence.PlaySequence("Select"),
        this.Yzt.PlayBuildingLoopSequence(!1)),
      this.CRn <= 0 && this.Yzt.PlayBuildingLoopSequence(!1));
  }
}
exports.BuildingLevelUpViewController = BuildingLevelUpViewController;
//# sourceMappingURL=BuildingLevelUpViewController.js.map
