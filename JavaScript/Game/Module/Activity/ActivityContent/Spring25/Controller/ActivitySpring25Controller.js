"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySpring25Controller = void 0);
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  HelpController_1 = require("../../../../Help/HelpController"),
  ActivityControllerBase_1 = require("../../../ActivityControllerBase"),
  ActivityManager_1 = require("../../../ActivityManager"),
  Spring25Define_1 = require("../Spring25Define"),
  ActivitySpring25SubView_1 = require("../View/ActivitySpring25SubView");
var Proto_ActivityType = Protocol_1.Aki.Protocol.uks,
  Proto_SpringSignDrawRoleRequest = Protocol_1.Aki.Protocol.qp_,
  Proto_SpringSignDrawRewardRequest = Protocol_1.Aki.Protocol.Qp_,
  Proto_SpringSignSkinRewardRequest = Protocol_1.Aki.Protocol._0_,
  Proto_ErrorCode = Protocol_1.Aki.Protocol.Q4n,
  Proto_SpringSignPhotoRewardRequest = Protocol_1.Aki.Protocol.xv_;
const LocalStorage_1 = require("../../../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine");
class ActivitySpring25Controller extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.OCl = void 0),
      (this.NCl = () => {
        this.OCl?.SetResult();
      });
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_SpringAGuide";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySpring25SubView_1.ActivitySpring25SubView();
  }
  OnCreateActivityData(e) {
    return ModelManager_1.ModelManager.Spring25Model.ActivityData;
  }
  OnGetIsOpeningActivityRelativeView() {
    return (
      UiManager_1.UiManager.IsViewOpen("Spring25MainView") ||
      UiManager_1.UiManager.IsViewOpen("Spring25InfoView") ||
      UiManager_1.UiManager.IsViewOpen("Spring25DialogueView") ||
      UiManager_1.UiManager.IsViewOpen("Spring25EnvelopeView") ||
      UiManager_1.UiManager.IsViewOpen("Spring25LetterListView")
    );
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnCloseRewardView,
      this.NCl,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnCloseRewardView,
      this.NCl,
    );
  }
  static get Instance() {
    return ActivityManager_1.ActivityManager.GetActivityController(
      Proto_ActivityType.Proto_SprintSign,
    );
  }
  async RequestSpringSignDrawRoleRequest() {
    var e,
      r = Proto_SpringSignDrawRoleRequest.create(),
      r = await Net_1.Net.CallAsync(18625, r);
    return (
      void 0 !== r &&
      (r.Q4n !== Proto_ErrorCode.KRs
        ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            r.Q4n,
            27395,
          ),
          !1)
        : ((e =
            ModelManager_1.ModelManager
              .Spring25Model).SyncSpringSignDrawRoleResponse(r),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.Spring25InviteDone,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            e.CurrentActivityId,
          ),
          !0))
    );
  }
  async RequestSpringSignDrawRewardRequest(e) {
    var r = Proto_SpringSignDrawRewardRequest.create(),
      r = ((r.s5n = e), await Net_1.Net.CallAsync(15315, r));
    void 0 !== r &&
      (r.Q4n !== Proto_ErrorCode.KRs
        ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            r.Q4n,
            23214,
          )
        : ((r =
            ModelManager_1.ModelManager
              .Spring25Model).SyncSpringSignDrawRewardResponse(e),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.Spring25DrawRewardDone,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            r.CurrentActivityId,
          )));
  }
  async J2l() {
    var e = ModelManager_1.ModelManager.Spring25Model,
      r = Proto_SpringSignSkinRewardRequest.create(),
      r = await Net_1.Net.CallAsync(28663, r);
    void 0 !== r &&
      (r.Q4n !== Proto_ErrorCode.KRs
        ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            r.Q4n,
            15551,
          )
        : (e.SyncSpringSignSkinRewardResponse(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.Spring25SkinRewardDone,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            e.CurrentActivityId,
          )));
  }
  async gWl() {
    var e = Proto_SpringSignPhotoRewardRequest.create(),
      e = await Net_1.Net.CallAsync(20635, e);
    void 0 !== e &&
      e.Q4n !== Proto_ErrorCode.KRs &&
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        e.Q4n,
        15751,
      );
  }
  HandleConfirmClickInActivitySubView() {
    var e = ModelManager_1.ModelManager.Spring25Model;
    UiManager_1.UiManager.OpenView("Spring25MainView", e.BuildMainViewData());
  }
  async HandleInviteClickInMainView() {
    var e = ModelManager_1.ModelManager.Spring25Model;
    e.IsAllInvited
      ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
          Spring25Define_1.ALL_CHARACTER_INVITED,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.Spring25UnlockAnimDone,
        ))
      : e.IsInviteAvailableExternal
        ? await this.RequestSpringSignDrawRoleRequest()
        : (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
            Spring25Define_1.REMAIN_CHANCE_NOT_ENOUGH,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.Spring25UnlockAnimDone,
          ));
  }
  HandleGiftClickInMainView() {
    var e = ModelManager_1.ModelManager.Spring25Model;
    UiManager_1.UiManager.OpenView("Spring25InfoView", e.BuildInfoViewData());
  }
  HandleLetterClickInMainView() {
    var e = ModelManager_1.ModelManager.Spring25Model;
    e.IsLetterListViewAvailable
      ? (e.InitLetterSignIdForLetterListView(),
        UiManager_1.UiManager.OpenView(
          "Spring25LetterListView",
          e.BuildLetterListViewData(),
        ))
      : ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
          Spring25Define_1.NO_LETTER_TIPS_TEXT_ID,
        );
  }
  HandleResetCurrentSignId() {
    ModelManager_1.ModelManager.Spring25Model.ResetCurrentSignId();
  }
  HandleOpenOpeningDialogViewInMainView() {
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.Spring25FirstEnter,
      !1,
    );
    var e =
      ModelManager_1.ModelManager.Spring25Model.BuildStartDialogueViewData();
    UiManager_1.UiManager.OpenView("Spring25DialogueView", e);
  }
  HandleLetterClickInLetterListView(e) {
    ModelManager_1.ModelManager.Spring25Model.TrySetCurrentLetterSignId(e);
  }
  HandleHelpClick() {
    var e = ModelManager_1.ModelManager.Spring25Model.HelpId;
    HelpController_1.HelpController.OpenHelpById(e);
  }
  HandleConfirmClickInDialogueView() {
    var e = ModelManager_1.ModelManager.Spring25Model;
    UiManager_1.UiManager.CloseView("Spring25DialogueView"),
      e.NeedOpenEnvelopeView &&
        UiManager_1.UiManager.OpenView(
          "Spring25EnvelopeView",
          e.BuildEnvelopeViewData(),
        );
  }
  HandleOpenSkinPreview() {
    var e = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(
      Spring25Define_1.SANHUA_SKIN_ITEM_ID,
    );
    e &&
      ControllerHolder_1.ControllerHolder.SkinController.OpenBuyRoleSkinPreviewDetailViewByRoleSkinData(
        [e],
      );
  }
  HandleRequestRewardSkin() {
    ModelManager_1.ModelManager.Spring25Model.IsSkinRewarded || this.J2l();
  }
  HandleWhenUnlockAnimEnd() {
    var e = ModelManager_1.ModelManager.Spring25Model.BuildDialogueViewData();
    void 0 !== e && UiManager_1.UiManager.OpenView("Spring25DialogueView", e);
  }
  async HandleTryOpenShareViewAsync() {
    var e = ModelManager_1.ModelManager.Spring25Model;
    e.IsAllInvited &&
      void 0 === this.OCl &&
      ((this.OCl = new CustomPromise_1.CustomPromise()),
      await this.gWl(),
      await this.OCl.Promise,
      (this.OCl = void 0),
      (e = {
        ScreenShot: !1,
        PrepareFullScreenShot: !1,
        IsHiddenBattleView: !1,
        Spring25Data: { PhotoPath: e.SharePhotoPath },
        RoleSkinData: void 0,
        HandBookPhotoData: void 0,
        GachaData: void 0,
        FragmentMemory: void 0,
      }),
      UiManager_1.UiManager.OpenView("PhotoSaveView", e));
  }
}
exports.ActivitySpring25Controller = ActivitySpring25Controller;
//# sourceMappingURL=ActivitySpring25Controller.js.map
