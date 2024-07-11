"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuideTipsView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Global_1 = require("../../../Global"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  UiManager_1 = require("../../../Ui/UiManager"),
  GuideBaseView_1 = require("./GuideBaseView"),
  GuideCountDownItem_1 = require("./GuideCountDownItem"),
  GuideDescribeNew_1 = require("./GuideDescribeNew"),
  GuidePrefabDefine_1 = require("./GuidePrefabDefine");
class GuideTipsView extends GuideBaseView_1.GuideBaseView {
  constructor() {
    super(...arguments),
      (this.Lo = void 0),
      (this.iqt = void 0),
      (this.gZt = !0),
      (this.QVs = void 0),
      (this.fZt = (e) => {
        InputDistributeController_1.InputDistributeController.RefreshInputTag(),
          e &&
            !UiManager_1.UiManager.IsViewShow("GmView") &&
            UiManager_1.UiManager.IsViewShow("BattleView") &&
            this.GuideStepInfo.Config.TimeScale < 1 &&
            (e = Global_1.Global.CharacterController) &&
            ((e.bShowMouseCursor = !1), this.$Vs());
      }),
      (this.mZt = (e, i) => {
        (e &&
          (this.CombineInputMap.set(e, i), !this.IsAllCombineInputPass())) ||
          (this.UnbindInput(this.Lo.InputEnums, this.Lo.InputEnums),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Guide", 54, "tip监听按键完成引导", [
              "最后按键",
              e,
            ]),
          this.DoCloseByFinished());
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
    ];
  }
  OnGuideBaseViewAddEvent() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnShowMouseCursor,
      this.fZt,
    );
  }
  OnGuideBaseViewRemoveEvent() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnShowMouseCursor,
      this.fZt,
    );
  }
  OnGuideBaseViewAfterHide() {
    this.UnbindInput(this.Lo.InputEnums, this.Lo.InputEnums),
      this.UiViewSequence.HasSequenceNameInPlaying("Start") &&
        this.UiViewSequence.StopPrevSequence(!0, !0);
  }
  OnBeforeGuideBaseViewCreate() {
    (this.Lo = this.GuideStepInfo.ViewData.ViewConf),
      this.BindInput(this.Lo.InputEnums, this.Lo.InputEnums, this.mZt);
  }
  OnGuideBaseViewStart() {
    var e = this.GetText(2);
    e.SetUIActive(!1), e.SetUIActive(!0);
    new GuideDescribeNew_1.GuideDescribeNew(e).SetUpText(
      this.Lo.Content,
      ...this.Lo.Button,
    ),
      (0, GuidePrefabDefine_1.setPrefabText)(e, e.GetText());
    var e = this.GetItem(7),
      i = MathCommon_1.MathCommon.Clamp(this.Lo.UseMask / 100, 0, 1);
    e.SetAlpha(i), e.SetRaycastTarget(0 < i);
  }
  OnGuideViewAfterShow() {
    var e = this.GetItem(3);
    this.TotalDuration
      ? ((this.iqt = new GuideCountDownItem_1.GuideCountDownItem(
          this.TotalDuration,
        )),
        this.iqt.Init(e))
      : e.SetUIActive(!1),
      this.BindInput(this.Lo.InputEnums, this.Lo.InputEnums, this.mZt);
  }
  async OnBeforeHideAsync() {
    var e = this.GetItem(3);
    this.UiViewSequence.StopSequenceByKey("Start"),
      e.SetUIActive(!1),
      this.XVs(),
      this.IsFinished &&
        !this.TimeTicker &&
        (this.GetItem(1).SetUIActive(!0),
        this.GetItem(8).SetUIActive(!0),
        await this.PlaySequenceAsync("TipsGuideFinished"));
  }
  OnGuideBaseViewTick(e) {
    var i =
      UiManager_1.UiManager.IsViewShow("BattleView") &&
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(
        0,
      ) &&
      !this.HasConflictView();
    this.IsBusy || i === this.gZt || ((this.gZt = i), this.SetActive(i));
  }
  OnAfterPlayStartSequence() {
    this.Lo.UseLoopAnim
      ? this.UiViewSequence.PlaySequence("AutoLoop1")
      : this.UiViewSequence.StopSequenceByKey("AutoLoop1");
  }
  $Vs() {
    var e = Global_1.Global.CharacterController;
    this.QVs ||
      UE.KuroInputFunctionLibrary.HasInputModeReply(this.QVs) ||
      (this.QVs = UE.KuroInputFunctionLibrary.SetGameOnlyInputMode(
        e,
        "GuideTipsView设置输入模式",
      ));
  }
  XVs() {
    var e;
    this.QVs &&
      ((e = Global_1.Global.CharacterController),
      UE.KuroInputFunctionLibrary.ReplyInputMode(e, this.QVs),
      (this.QVs = void 0));
  }
  OnDurationChange(e) {
    this.iqt && this.iqt.OnDurationChange(e);
  }
}
exports.GuideTipsView = GuideTipsView;
//# sourceMappingURL=GuideTipsView.js.map
