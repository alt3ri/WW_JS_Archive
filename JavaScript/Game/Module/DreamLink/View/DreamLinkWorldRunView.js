"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DreamLinkWorldRunView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  DreamLinkController_1 = require("../DreamLinkController"),
  DreamLinkScoreRewardItem_1 = require("./DreamLinkScoreRewardItem"),
  DreamLinkWorldRunTaskItem_1 = require("./DreamLinkWorldRunTaskItem"),
  LAYOUT_ANIMATION_START = "InturnAnimation";
class DreamLinkWorldRunView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.boh = void 0),
      (this.lqe = void 0),
      (this.qsi = void 0),
      (this.qoh = void 0),
      (this.VOe = () =>
        new DreamLinkWorldRunTaskItem_1.DreamLinkWorldRunTaskItem()),
      (this.$An = (e) => {
        LAYOUT_ANIMATION_START === e && this.Ooh();
      }),
      (this.Ooh = () => {
        this.boh &&
          this.qoh.RefreshByData(
            this.boh.GetDreamLinkRunTaskDataList(),
            void 0,
            !0,
          );
      }),
      (this.AMo = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.SpineSkeletonAnimationComponent],
      [4, UE.SpineSkeletonAnimationComponent],
      [5, UE.SpineSkeletonAnimationComponent],
    ];
  }
  async OnBeforeStartAsync() {
    var e;
    (this.boh =
      DreamLinkController_1.DreamLinkController.GetCurrentActivityData()),
      this.boh &&
        ((e = []),
        (this.qsi = new DreamLinkScoreRewardItem_1.DreamLinkScoreRewardItem(
          this.boh,
        )),
        e.push(this.qsi.CreateByActorAsync(this.GetItem(2).GetOwner())),
        this.AddChild(this.qsi),
        await Promise.all(e));
  }
  OnStart() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(1))),
      this.lqe.SetCloseCallBack(this.AMo),
      (this.qoh = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(0),
        this.VOe,
      )),
      this.RAr();
  }
  OnBeforeShow() {}
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.DreamLinkRewardRefresh,
      this.Ooh,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
        this.$An,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.DreamLinkRewardRefresh,
      this.Ooh,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
        this.$An,
      );
  }
  OnTick(e) {
    if (this.qoh)
      for (const i of this.qoh.GetScrollItemList()) i.RefreshLockText();
  }
  RAr() {
    this.GetSpine(3).SetAnimation(0, "idle", !0),
      this.GetSpine(4).SetAnimation(0, "idle", !0);
    var e =
      0 === ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender()
        ? "nvzhu"
        : "nanzhu";
    this.GetSpine(5).SetAnimation(0, e, !0);
  }
}
exports.DreamLinkWorldRunView = DreamLinkWorldRunView;
//# sourceMappingURL=DreamLinkWorldRunView.js.map
