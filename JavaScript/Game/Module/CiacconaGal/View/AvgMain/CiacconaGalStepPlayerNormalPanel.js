"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaGalStepPlayerNormalPanel = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  CiacconaGalDefine_1 = require("../../CiacconaGalDefine"),
  CiacconaGalUtils_1 = require("../../CiacconaGalUtils"),
  CiacconaGalStepItemContainer_1 = require("./CiacconaGalStepItemContainer");
class CiacconaGalStepPlayerNormalPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.xqe = void 0),
      (this.kbc = void 0),
      (this.h4c = void 0),
      (this.wS1 = void 0),
      (this.Obc = () => {
        return new CiacconaGalStepItemContainer_1.CiacconaGalStepItemContainer();
      }),
      (this.J11 = (e) => {
        e &&
          void 0 === e.dragComponent &&
          ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.OnClick();
      }),
      (this.zy1 = () => {
        this.kbc?.ContentUIItem.SetBubbleUpToParent(!1);
      }),
      (this.Jy1 = () => {
        this.kbc?.ContentUIItem.SetBubbleUpToParent(!0);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIVerticalLayout],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    (this.kbc = this.GetScrollViewWithScrollbar(0)),
      (this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.kbc,
        this.Obc,
      )),
      this.kbc.OnScrollViewDownUpCallback.Bind(this.J11);
  }
  async OnBeforeStartAsync() {
    (this.h4c = new CiacconaGalFinishBtnItem()),
      await this.h4c.CreateByActorAsync(this.GetItem(2).GetOwner()),
      this.h4c.SetLocalText(CiacconaGalDefine_1.TEXT_CIACCONA_FINISH_AVG);
  }
  OnBeforeDestroy() {
    this.kbc?.OnScrollViewDownUpCallback.Unbind(),
      this.kbc?.Tweener?.OnStartCallBack.Unbind(),
      this.kbc?.Tweener?.OnCompleteCallBack.Unbind(),
      this.wS1 &&
        TimerSystem_1.TimerSystem.Has(this.wS1) &&
        (TimerSystem_1.TimerSystem.Remove(this.wS1), (this.wS1 = void 0));
  }
  Refresh() {
    this.qbc();
  }
  async qbc() {
    const t = ModelManager_1.ModelManager.CiacconaGalModel.GetCurStepDataList();
    await this.xqe.RefreshByDataAsync(t),
      this.wS1 &&
        TimerSystem_1.TimerSystem.Has(this.wS1) &&
        (TimerSystem_1.TimerSystem.Remove(this.wS1), (this.wS1 = void 0)),
      (this.wS1 = TimerSystem_1.TimerSystem.Delay(() => {
        var e = (0, puerts_1.$ref)(
            new UE.Vector2D(this.kbc.ContentUIItem.RelativeLocation),
          ),
          i = this.xqe.GetItemByIndex(t.length - 1);
        i &&
          i.IsValid() &&
          (this.kbc.ScrollToBottom(e, i, !0),
          this.kbc.Tweener?.OnStartCallBack.Unbind(),
          this.kbc.Tweener?.OnCompleteCallBack.Unbind(),
          this.kbc.Tweener?.OnStartCallBack.Bind(this.zy1),
          this.kbc.Tweener?.OnCompleteCallBack.Bind(this.Jy1));
      }, CiacconaGalDefine_1.DELAY_SHOW_FOR_TEXT_ANIM + 100));
    var e =
        ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer
          .CurHandlingStepId,
      e = ModelManager_1.ModelManager.CiacconaGalModel.GetStepDataById(e);
    this.h4c.SetActive(
      3 === e.Type &&
        5 ===
          ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.GetCurState(),
    );
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (0 !== e.length) {
      var i = e[0];
      if ("ChoicesSelect" === i || "FirstChoice" === i)
        for (const r of this.xqe.GetScrollItemList()) {
          var t = r.GetGuideUiItemAndUiItemForShowEx(e);
          if (t) return t;
        }
    }
  }
}
exports.CiacconaGalStepPlayerNormalPanel = CiacconaGalStepPlayerNormalPanel;
class CiacconaGalFinishBtnItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.mRo = !1),
      (this.LM1 = void 0),
      (this.ZDc = () => {
        var e;
        this.mRo &&
          ((e =
            ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer
              .CurHandlingStepId),
          (e =
            ModelManager_1.ModelManager.CiacconaGalModel.GetStepDataById(
              e,
            ).SubEndingId),
          ModelManager_1.ModelManager.CiacconaGalModel.GetSubEndingDataById(
            e,
          ).ClientSetFinished(!0),
          ControllerHolder_1.ControllerHolder.CiacconaGalController.ExitAvg());
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIExtendToggleTextureTransition],
    ]),
      (this.BtnBindInfo = [[0, this.ZDc]]);
  }
  async OnBeforeStartAsync() {
    await this.SetExtendToggleTextureTransitionByPath(
      ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "T_PlotReasoningIcon03",
      ),
      this.GetUiExtendToggleTextureTransition(2),
    );
  }
  OnAfterShow() {
    this.mRo = !1;
    var e =
      CiacconaGalUtils_1.CiacconaGalUtils.GetAvgChoiceProtectingTime() *
      TimeUtil_1.TimeUtil.InverseMillisecond;
    this.LM1 = TimerSystem_1.TimerSystem.Delay(() => {
      this.mRo = !0;
    }, e);
  }
  OnBeforeDestroy() {
    this.LM1 &&
      TimerSystem_1.TimerSystem.Has(this.LM1) &&
      (TimerSystem_1.TimerSystem.Remove(this.LM1), (this.LM1 = void 0));
  }
  SetLocalText(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e);
  }
}
//# sourceMappingURL=CiacconaGalStepPlayerNormalPanel.js.map
