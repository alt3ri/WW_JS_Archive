"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueResEndingView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../Ui/UiManager"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  RogueEndingCollectionItem_1 = require("./RogueEndingCollectionItem"),
  RogueOutButtonItem_1 = require("./RogueOutButtonItem"),
  ROTATION_PARAM = 9,
  REDDOT_TOLERANCE = 0.1;
class RogueResEndingView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lqe = void 0),
      (this.Bn1 = void 0),
      (this.$l1 = void 0),
      (this.Z5c = 0),
      (this.Dn1 = []),
      (this.Wl1 = []),
      (this.qn1 = []),
      (this.Ql1 = !1),
      (this.Fn1 = () => {
        var t = new RogueEndingCollectionItem_1.RogueEndingCollectionItem();
        return (t.OnItemClickCall = this.jbe), t;
      }),
      (this._5e = () => {
        this.CloseMe();
      }),
      (this.jbe = (t) => {
        var e =
          ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingIsUnlock(
            t,
          );
        e
          ? (e &&
              !ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheEndingOpen(
                t,
              ) &&
              ModelManager_1.ModelManager.ActivityPermanentRogueModel.SetCacheEndingOpen(
                t,
              ),
            UiManager_1.UiManager.OpenView("RogueResEndingSubView", t))
          : ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
              "Rogue_End_S1_Lock",
            );
      }),
      (this.I5c = () => {
        UiManager_1.UiManager.OpenView(
          "ActivityRewardPopUpView",
          ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingAwardViewData(
            this.Z5c,
          ),
        );
      }),
      (this.V5c = () => {}),
      (this.qLn = () => {
        var e = this.Wl1.length;
        for (let t = e - 1; 0 <= t; t--) {
          var i = this.$l1.GetItemByIndex(this.Wl1[t]);
          if (1 === this.$l1.IsItemInViewport(i, REDDOT_TOLERANCE)) {
            const s = this.$l1.GetItemByIndex(this.Wl1[t]);
            return void this.$l1.ScrollTo(s);
          }
        }
        const s = this.$l1.GetItemByIndex(this.Wl1[e - 1]);
        this.$l1.ScrollTo(s);
      }),
      (this.GLn = () => {
        var e = this.Wl1.length;
        for (let t = 0; t <= e - 2; t++) {
          var i = this.$l1.GetItemByIndex(this.Wl1[t]);
          if (2 === this.$l1.IsItemInViewport(i, REDDOT_TOLERANCE)) {
            const s = this.$l1.GetItemByIndex(this.Wl1[t]);
            return void this.$l1.ScrollTo(s);
          }
        }
        const s = this.$l1.GetItemByIndex(this.Wl1[e - 1]);
        this.$l1.ScrollTo(s);
      }),
      (this.qgt = (t) => {
        this.GetScrollViewWithScrollbar(8)?.SetScrollProgress(1 - t),
          (this.Ql1 = !0);
      }),
      (this.Kl1 = (t) => {
        var t = t.X,
          e = this.GetSlider(5);
        this.Ql1 || e?.SetValue(1 - t, !1), (this.Ql1 = !1), this.Xl1();
      }),
      (this.Yl1 = () => {
        for (let t = (this.Wl1.length = 0); t < this.Dn1.length; t++) {
          var e = this.Dn1[t];
          ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingIsUnlock(
            e,
          ) &&
            !ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheEndingOpen(
              e,
            ) &&
            this.Wl1.push(t);
        }
        this.Xl1();
      }),
      (this.zl1 = (t) => {
        var t = this.Dn1.indexOf(t);
        -1 !== t && ((t = this.$l1.GetItemByIndex(t)), this.$l1.ScrollTo(t));
      }),
      (this.lL1 = (t) => {
        this.Jl1();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIHorizontalLayout],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UISliderComponent],
      [6, UE.UIButtonComponent],
      [7, UE.UIButtonComponent],
      [8, UE.UIScrollViewWithScrollbarComponent],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [6, this.qLn],
        [7, this.GLn],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetHelpBtnActive(!1),
      this.lqe.SetHelpBtnActive(!1),
      this.lqe.SetCloseCallBack(this._5e),
      this.GetText(1)?.SetUIActive(!1),
      (this.Bn1 = new RogueOutButtonItem_1.RogueButtonItemA()),
      this.Bn1.SetOnClickCall(this.I5c),
      await this.Bn1.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()),
      (this.$l1 = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(8),
        this.Fn1,
      ));
  }
  OnStart() {
    this.Z5c = this.OpenParam;
  }
  OnBeforeShow() {
    var t =
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingAwardCount(
          this.Z5c,
        ),
      t =
        (this.Bn1.SetNum(t[0] + "/" + t[1]),
        this.Bn1?.BindRedDot("RogueResEnding"),
        (this.Dn1 =
          ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingListBySeasonId(
            this.Z5c,
          )),
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingCount(
          this.Z5c,
        ));
    this.GetItem(9)?.SetUIActive(0 === t[0]),
      this.GetItem(10)?.SetUIActive(0 !== t[0]),
      this.GetItem(11)?.SetUIActive(0 !== t[0]);
  }
  OnBeforeHide() {
    this.Bn1?.UnBindRedDot();
  }
  OnBeforeDestroy() {
    (this.lqe = void 0), (this.Bn1 = void 0);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PermanentRogueRewardUpdate,
      this.V5c,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RogueResEndingRedDotUpdate,
        this.Yl1,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RogueResEndingSwitch,
        this.zl1,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
        this.lL1,
      ),
      this.GetSlider(5).OnValueChangeCb.Bind(this.qgt),
      this.GetScrollViewWithScrollbar(8).OnScrollValueChange.Bind(this.Kl1);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PermanentRogueRewardUpdate,
      this.V5c,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RogueResEndingRedDotUpdate,
        this.Yl1,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RogueResEndingSwitch,
        this.zl1,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
        this.lL1,
      ),
      this.GetSlider(5).OnValueChangeCb.Unbind(),
      this.GetScrollViewWithScrollbar(8).OnScrollValueChange.Unbind();
  }
  Jl1() {
    for (let t = 0; t < this.Dn1.length; t++) {
      var e = {
        ConfigId: this.Dn1[t],
        Index: t + 1,
        IsSubView: !1,
        IsUnlock:
          ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingIsUnlock(
            this.Dn1[t],
          ),
        Rotation: t % 2 == 0 ? ROTATION_PARAM : -1 * ROTATION_PARAM,
      };
      this.qn1.push(e);
    }
    this.$l1?.RefreshByData(this.qn1, this.Yl1, !0);
  }
  Xl1() {
    var t, e;
    0 === this.Wl1.length
      ? (this.GetButton(6)?.RootUIComp.SetUIActive(!1),
        this.GetButton(7)?.RootUIComp.SetUIActive(!1))
      : ((e = this.$l1.GetItemByIndex(this.Wl1[0])),
        (t = this.$l1.GetItemByIndex(this.Wl1[this.Wl1.length - 1])),
        (e = this.$l1.IsItemInViewport(e, REDDOT_TOLERANCE)),
        this.GetButton(6)?.RootUIComp.SetUIActive(1 === e),
        (e = this.$l1.IsItemInViewport(t, REDDOT_TOLERANCE)),
        this.GetButton(7)?.RootUIComp.SetUIActive(2 === e));
  }
}
exports.RogueResEndingView = RogueResEndingView;
//# sourceMappingURL=RogueEndingCollectionView.js.map
