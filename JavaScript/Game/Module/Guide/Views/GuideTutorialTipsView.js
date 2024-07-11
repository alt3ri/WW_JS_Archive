"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuideTutorialTipsView = void 0);
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const TutorialController_1 = require("../../Tutorial/TutorialController");
const TutorialDefine_1 = require("../../Tutorial/TutorialDefine");
const LguiUtil_1 = require("../../Util/LguiUtil");
class GuideTutorialTipsView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.TutorialInfo = void 0),
      (this.vzt = void 0),
      (this.Mzt = 0),
      (this.Szt = void 0),
      (this.Ezt = (e, i = 1) => {
        i &&
          this.RootItem?.bIsUIActive &&
          !UiManager_1.UiManager.IsViewOpen("LoadingView") &&
          (this.TutorialInfo.ClickToPopState(),
          this.UiViewSequence.PlaySequence("CloseTips", !0));
      }),
      (this.czt = () => {
        (this.TutorialInfo.TipState = 1),
          UiManager_1.UiManager.CloseView(this.Info.Name, () => {
            ModelManager_1.ModelManager.GuideModel.TryShowTutorial();
          });
      }),
      (this.yzt = () => {
        this.TutorialInfo.TipState === 2
          ? this.CloseMe(() => {
              ModelManager_1.ModelManager.GuideModel.TryShowGuideTutorialView();
            })
          : this.Izt();
      }),
      (this.Tzt = () => {
        this.SetActive(UiManager_1.UiManager.IsViewShow("BattleView"));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UISprite],
      [2, UE.UIButtonComponent],
      [3, UE.UISprite],
      [4, UE.UIText],
    ]),
      (this.BtnBindInfo = [[2, this.Ezt]]);
  }
  async OnCreateAsync() {
    if (((this.TutorialInfo = this.OpenParam), this.TutorialInfo.OwnerStep)) {
      const t = new CustomPromise_1.CustomPromise();
      (this.vzt = this.TutorialInfo.OwnerStep.ViewData.ViewConf),
        (this.Mzt = this.TutorialInfo.OwnerStep.Config.Duration);
      const e = this.vzt.TutorialType;
      const i = TutorialDefine_1.TutorialUtils.GetTutorialTypeIconPath(e);
      i
        ? ResourceSystem_1.ResourceSystem.LoadAsync(
            i,
            UE.LGUISpriteData_BaseObject,
            (e) => {
              e.IsValid() && (this.Szt = e), t.SetResult(!0);
            },
          )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Guide",
            17,
            `图文教程引导组${this.TutorialInfo.OwnerStep.Id}的教程分类组id不合法，找不到对应图标`,
            ["不合法的分类组Id", e],
          ),
        await t.Promise;
    } else this.Izt();
  }
  OnStart() {
    let e;
    let i = this.GetText(0);
    this.vzt
      ? ((e = this.vzt.GroupName),
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, e),
        this.Szt && this.GetSprite(1).SetSprite(this.Szt),
        (i = TutorialDefine_1.TutorialUtils.GetTutorialTypeTxt(
          this.vzt.TutorialType,
        )),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i),
        this.GetSprite(3).SetFillAmount(1),
        this.UiViewSequence.AddSequenceFinishEvent("StartTips", this.czt),
        this.UiViewSequence.AddSequenceFinishEvent("CloseTips", this.yzt),
        TutorialController_1.TutorialController.OnTutorialTipExistChanged(!0))
      : this.WaitToDestroy || this.Izt();
  }
  OnAfterShow() {
    this.TutorialInfo.TipState === 0
      ? this.UiViewSequence.PlaySequence("StartTips")
      : this.UiViewSequence.PlaySequence("StartAtOnce");
  }
  OnBeforeDestroy() {
    TutorialController_1.TutorialController.OnTutorialTipExistChanged(!1);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.HideHUD, this.Tzt),
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShowHUD, this.Tzt);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.HideHUD,
      this.Tzt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ShowHUD,
        this.Tzt,
      );
  }
  OnTick(e) {
    let i;
    this.IsShow &&
      ((i = this.TutorialInfo.Duration / this.Mzt),
      this.GetSprite(3)?.SetFillAmount(i),
      this.TutorialInfo.Duration <= 0) &&
      this.UiViewSequence.CurrentSequenceName !== "CloseTips" &&
      (this.UiViewSequence.StopPrevSequence(!1),
      this.UiViewSequence.PlaySequence("CloseTips", !0));
  }
  Izt() {
    UiManager_1.UiManager.CloseView(this.Info.Name, () => {
      TutorialController_1.TutorialController.TryOpenAwardUiViewPending(),
        ModelManager_1.ModelManager.GuideModel.TryShowTutorial();
    });
  }
}
exports.GuideTutorialTipsView = GuideTutorialTipsView;
// # sourceMappingURL=GuideTutorialTipsView.js.map
