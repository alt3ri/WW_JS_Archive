"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuideTipsView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const UiManager_1 = require("../../../Ui/UiManager");
const GuideBaseView_1 = require("./GuideBaseView");
const GuideCountDownItem_1 = require("./GuideCountDownItem");
const GuideDescribeNew_1 = require("./GuideDescribeNew");
const GuidePrefabDefine_1 = require("./GuidePrefabDefine");
class GuideTipsView extends GuideBaseView_1.GuideBaseView {
  constructor() {
    super(...arguments),
      (this.Lo = void 0),
      (this.ZBt = void 0),
      (this.gzt = !0),
      (this.a4s = void 0),
      (this.fzt = (e) => {
        InputDistributeController_1.InputDistributeController.RefreshInputTag(),
          e &&
            !UiManager_1.UiManager.IsViewShow("GmView") &&
            UiManager_1.UiManager.IsViewShow("BattleView") &&
            this.GuideStepInfo.Config.TimeScale < 1 &&
            (e = Global_1.Global.CharacterController) &&
            ((e.bShowMouseCursor = !1), this.h4s());
      }),
      (this.mzt = (e, i) => {
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
      this.fzt,
    );
  }
  OnGuideBaseViewRemoveEvent() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnShowMouseCursor,
      this.fzt,
    );
  }
  OnGuideBaseViewAfterHide() {
    this.UnbindInput(this.Lo.InputEnums, this.Lo.InputEnums),
      this.UiViewSequence.HasSequenceNameInPlaying("Start") &&
        this.UiViewSequence.StopPrevSequence(!0, !0);
  }
  OnBeforeGuideBaseViewCreate() {
    (this.Lo = this.GuideStepInfo.ViewData.ViewConf),
      this.BindInput(this.Lo.InputEnums, this.Lo.InputEnums, this.mzt);
  }
  OnGuideBaseViewStart() {
    var e = this.GetText(2);
    e.SetUIActive(!1), e.SetUIActive(!0);
    new GuideDescribeNew_1.GuideDescribeNew(e).SetUpText(
      this.Lo.Content,
      ...this.Lo.Button,
    ),
      (0, GuidePrefabDefine_1.setPrefabText)(e, e.GetText());
    var e = this.GetItem(7);
    const i = MathCommon_1.MathCommon.Clamp(this.Lo.UseMask / 100, 0, 1);
    e.SetAlpha(i), e.SetRaycastTarget(i > 0);
  }
  OnGuideViewAfterShow() {
    const e = this.GetItem(3);
    this.TotalDuration
      ? ((this.ZBt = new GuideCountDownItem_1.GuideCountDownItem(
          this.TotalDuration,
        )),
        this.ZBt.Init(e))
      : e.SetUIActive(!1),
      this.BindInput(this.Lo.InputEnums, this.Lo.InputEnums, this.mzt);
  }
  async OnBeforeHideAsync() {
    const e = this.GetItem(3);
    this.UiViewSequence.StopSequenceByKey("Start"),
      e.SetUIActive(!1),
      this.l4s(),
      this.IsFinished &&
        !this.TimeTicker &&
        (this.GetItem(1).SetUIActive(!0),
        this.GetItem(8).SetUIActive(!0),
        await this.PlaySequenceAsync("TipsGuideFinished"));
  }
  OnGuideBaseViewTick(e) {
    const i =
      UiManager_1.UiManager.IsViewShow("BattleView") &&
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(
        0,
      ) &&
      !this.HasConflictView();
    this.IsBusy || i === this.gzt || ((this.gzt = i), this.SetActive(i));
  }
  OnAfterPlayStartSequence() {
    this.Lo.UseLoopAnim
      ? this.UiViewSequence.PlaySequence("AutoLoop1")
      : this.UiViewSequence.StopSequenceByKey("AutoLoop1");
  }
  h4s() {
    const e = Global_1.Global.CharacterController;
    this.a4s ||
      UE.KuroInputFunctionLibrary.HasInputModeReply(this.a4s) ||
      (this.a4s = UE.KuroInputFunctionLibrary.SetGameOnlyInputMode(
        e,
        "GuideTipsView设置输入模式",
      ));
  }
  l4s() {
    let e;
    this.a4s &&
      ((e = Global_1.Global.CharacterController),
      UE.KuroInputFunctionLibrary.ReplyInputMode(e, this.a4s),
      (this.a4s = void 0));
  }
  OnDurationChange(e) {
    this.ZBt && this.ZBt.OnDurationChange(e);
  }
}
exports.GuideTipsView = GuideTipsView;
// # sourceMappingURL=GuideTipsView.js.map
