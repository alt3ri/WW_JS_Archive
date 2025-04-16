"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Spring25InfoView = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem"),
  ButtonItem_1 = require("../../../../Common/Button/ButtonItem"),
  CommonItemSmallItemGrid_1 = require("../../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew"),
  ActivitySpring25Controller_1 = require("../Controller/ActivitySpring25Controller"),
  Spring25Define_1 = require("../Spring25Define");
class Spring25InfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lqe = void 0),
      (this.AZs = void 0),
      (this.ZGl = void 0),
      (this.tFl = void 0),
      (this.iFl = void 0),
      (this.ekl = () => new ContentItem()),
      (this.tkl = () => new ProgressItem()),
      (this.ikl = () => {
        this.CloseMe();
      }),
      (this.rkl = () => {
        ActivitySpring25Controller_1.ActivitySpring25Controller.Instance.HandleOpenSkinPreview();
      }),
      (this.okl = () => {
        ActivitySpring25Controller_1.ActivitySpring25Controller.Instance.HandleRequestRewardSkin();
      }),
      (this.nkl = () => {
        var e = ModelManager_1.ModelManager.Spring25Model.BuildInfoViewData();
        (this.OpenParam = e), this.rFl(e.ContentList);
      }),
      (this.akl = () => {
        var e = ModelManager_1.ModelManager.Spring25Model.BuildInfoViewData();
        (this.OpenParam = e), this.oFl(e.BottomState);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIVerticalLayout],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIHorizontalLayout],
      [7, UE.UIItem],
      [8, UE.UIButtonComponent],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [3, this.rkl],
        [8, this.okl],
      ]);
  }
  async OnBeforeStartAsync() {
    return (
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this.ikl),
      (this.AZs = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(1),
        this.ekl,
      )),
      (this.ZGl = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(6),
        this.tkl,
      )),
      (this.tFl = new UiSequencePlayer_1.UiSequencePlayer(this.GetItem(9))),
      (this.iFl = this.AZs.GetUiAnimController()),
      Promise.resolve()
    );
  }
  OnStart() {
    this.skl();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.Spring25DrawRewardDone,
      this.nkl,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.Spring25SkinRewardDone,
        this.akl,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.Spring25DrawRewardDone,
      this.nkl,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.Spring25SkinRewardDone,
        this.akl,
      );
  }
  skl() {
    var e = this.OpenParam;
    this.lqe.SetTitleByTextIdAndArgNew(e.TitleTextId),
      this.GetText(4)?.SetText(e.CurrentNum),
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(
        this.GetText(5),
        e.TotalNumTextId,
        e.TotalNumTextArg,
      ),
      this.rFl(e.ContentList),
      this.nFl(e.ProgressList),
      this.oFl(e.BottomState);
  }
  oFl(e) {
    this.GetButton(8).RootUIComp.SetUIActive(1 === e || 2 === e),
      this.GetItem(10)?.SetUIActive(e <= 1),
      this.GetItem(11)?.SetUIActive(e <= 1),
      1 === e &&
        (LocalStorage_1.LocalStorage.SetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey
            .Spring25FirstTimeTaskAllDone,
          !1,
        ),
        this.tFl.LitePlayAsync("Switch")),
      this.GetItem(12)?.SetUIActive(3 === e);
  }
  async rFl(e) {
    await this.AZs.RefreshByDataAsync(e), this.iFl.Play("Start");
  }
  async nFl(e) {
    await this.ZGl.RefreshByDataAsync(e),
      await TimerSystem_1.TimerSystem.Wait(
        Spring25Define_1.PROGRESS_BLINK_WAITING_TIME,
      );
    for (var [t, i] of e.entries())
      i.IsBlink && this.ZGl.GetLayoutItemByIndex(t)?.PlayBlinkAsync();
  }
}
exports.Spring25InfoView = Spring25InfoView;
class ContentItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.eZs = void 0),
      (this.JPt = void 0),
      (this.p9t = void 0),
      (this.fva = () =>
        new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
      (this.p9a = () => {
        var e = this.eZs?.TaskId;
        void 0 !== e &&
          ActivitySpring25Controller_1.ActivitySpring25Controller.Instance.RequestSpringSignDrawRewardRequest(
            e,
          );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIScrollViewWithScrollbarComponent],
    ];
  }
  async OnBeforeStartAsync() {
    return (
      this.GetItem(0)?.SetUIActive(!1),
      (this.JPt = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(6),
        this.fva,
      )),
      (this.p9t = new ButtonItem_1.ButtonItem(this.GetItem(1))),
      this.p9t.SetFunction(this.p9a),
      Promise.resolve()
    );
  }
  Refresh(e, t, i) {
    (this.eZs = e),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.NameTextId),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(5),
        e.SubtitleTextId,
        ...e.SubtitleTextArgs,
      ),
      this.JPt.RefreshByData(e.ItemList);
    var r = this.GetText(2);
    void 0 === e.RightTextId
      ? r?.SetUIActive(!1)
      : (r?.SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalTextNew(r, e.RightTextId)),
      this.GetItem(3)?.SetUIActive(e.IsDone),
      this.GetItem(1)?.SetUIActive(e.CanReward);
  }
}
class ProgressItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.ujr = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
    ];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(),
      (this.ujr = new UiSequencePlayer_1.UiSequencePlayer(this.GetRootItem()));
  }
  Refresh(e, t, i) {
    this.GetTexture(0)?.SetUIActive(!e.IsLight),
      this.GetTexture(1)?.SetUIActive(e.IsLight);
  }
  async PlayBlinkAsync() {
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.Spring25FirstDoneTaskIndex,
      this.GridIndex,
    ),
      await this.ujr.LitePlayAsync("Add");
  }
}
//# sourceMappingURL=Spring25InfoView.js.map
