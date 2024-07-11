"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuideTutorialTipsView = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  TutorialController_1 = require("../../Tutorial/TutorialController"),
  TutorialDefine_1 = require("../../Tutorial/TutorialDefine"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class GuideTutorialTipsView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.TutorialInfo = void 0),
      (this.vZt = void 0),
      (this.MZt = 0),
      (this.EZt = void 0),
      (this.SZt = (i, e = 1) => {
        e &&
          this.RootItem?.bIsUIActive &&
          !UiManager_1.UiManager.IsViewOpen("LoadingView") &&
          (this.TutorialInfo.ClickToPopState(),
          this.UiViewSequence.PlaySequence("CloseTips", !0));
      }),
      (this.cZt = () => {
        (this.TutorialInfo.TipState = 1),
          UiManager_1.UiManager.CloseView(this.Info.Name, () => {
            ModelManager_1.ModelManager.GuideModel.TryShowTutorial();
          });
      }),
      (this.yZt = () => {
        2 === this.TutorialInfo.TipState
          ? this.CloseMe(() => {
              ModelManager_1.ModelManager.GuideModel.TryShowGuideTutorialView();
            })
          : this.IZt();
      }),
      (this.TZt = () => {
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
      (this.BtnBindInfo = [[2, this.SZt]]);
  }
  async OnCreateAsync() {
    if (((this.TutorialInfo = this.OpenParam), this.TutorialInfo.OwnerStep)) {
      const t = new CustomPromise_1.CustomPromise();
      (this.vZt = this.TutorialInfo.OwnerStep.ViewData.ViewConf),
        (this.MZt = this.TutorialInfo.OwnerStep.Config.Duration);
      var i = this.vZt.TutorialType,
        e = TutorialDefine_1.TutorialUtils.GetTutorialTypeIconPath(i);
      e
        ? ResourceSystem_1.ResourceSystem.LoadAsync(
            e,
            UE.LGUISpriteData_BaseObject,
            (i) => {
              i.IsValid() && (this.EZt = i), t.SetResult(!0);
            },
          )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Guide",
            17,
            `图文教程引导组${this.TutorialInfo.OwnerStep.Id}的教程分类组id不合法，找不到对应图标`,
            ["不合法的分类组Id", i],
          ),
        await t.Promise;
    } else this.IZt();
  }
  OnStart() {
    var i,
      e = this.GetText(0);
    this.vZt
      ? ((i = this.vZt.GroupName),
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, i),
        this.EZt && this.GetSprite(1).SetSprite(this.EZt),
        (e = TutorialDefine_1.TutorialUtils.GetTutorialTypeTxt(
          this.vZt.TutorialType,
        )),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e),
        this.GetSprite(3).SetFillAmount(1),
        this.UiViewSequence.AddSequenceFinishEvent("StartTips", this.cZt),
        this.UiViewSequence.AddSequenceFinishEvent("CloseTips", this.yZt),
        GuideTutorialTipsView.Tla ||
          ((GuideTutorialTipsView.Tla = !0),
          TutorialController_1.TutorialController.OnTutorialTipExistChanged(
            !0,
          )),
        GuideTutorialTipsView.Lla?.Remove(),
        (GuideTutorialTipsView.Lla = void 0))
      : this.WaitToDestroy || this.IZt();
  }
  OnAfterShow() {
    0 === this.TutorialInfo.TipState
      ? this.UiViewSequence.PlaySequence("StartTips")
      : this.UiViewSequence.PlaySequence("StartAtOnce");
  }
  OnBeforeDestroy() {
    0 === this.TutorialInfo.TipState
      ? (GuideTutorialTipsView.Lla = TimerSystem_1.TimerSystem.Delay(
          GuideTutorialTipsView.Dla,
          GuideTutorialTipsView.Ala,
        ))
      : GuideTutorialTipsView.Dla();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.HideHUD, this.TZt),
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShowHUD, this.TZt);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.HideHUD,
      this.TZt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ShowHUD,
        this.TZt,
      );
  }
  OnTick(i) {
    var e;
    this.IsShow &&
      ((e = this.TutorialInfo.Duration / this.MZt),
      this.GetSprite(3)?.SetFillAmount(e),
      this.TutorialInfo.Duration <= 0) &&
      "CloseTips" !== this.UiViewSequence.CurrentSequenceName &&
      (this.UiViewSequence.StopPrevSequence(!1),
      this.UiViewSequence.PlaySequence("CloseTips", !0));
  }
  IZt() {
    UiManager_1.UiManager.CloseView(this.Info.Name, () => {
      TutorialController_1.TutorialController.TryOpenAwardUiViewPending(),
        ModelManager_1.ModelManager.GuideModel.TryShowTutorial();
    });
  }
}
((exports.GuideTutorialTipsView = GuideTutorialTipsView).Tla = !1),
  (GuideTutorialTipsView.Ala = 5e3),
  (GuideTutorialTipsView.Lla = void 0),
  (GuideTutorialTipsView.Dla = () => {
    GuideTutorialTipsView.Tla &&
      (TutorialController_1.TutorialController.OnTutorialTipExistChanged(!1),
      (GuideTutorialTipsView.Tla = !1)),
      GuideTutorialTipsView.Lla?.Remove(),
      (GuideTutorialTipsView.Lla = void 0);
  });
//# sourceMappingURL=GuideTutorialTipsView.js.map
