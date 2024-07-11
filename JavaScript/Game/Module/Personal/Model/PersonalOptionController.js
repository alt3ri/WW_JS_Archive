"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalOptionController = void 0);
const UE = require("ue"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ChatController_1 = require("../../Chat/ChatController"),
  CommonInputViewController_1 = require("../../Common/InputView/Controller/CommonInputViewController"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  FriendController_1 = require("../../Friend/FriendController"),
  ReportController_1 = require("../../Report/ReportController"),
  PersonalDefine_1 = require("./PersonalDefine");
class PersonalOptionController extends UiControllerBase_1.UiControllerBase {
  static InitOptionMap() {
    this.v5i.set(1, this.M5i),
      this.v5i.set(2, this.M5i),
      this.v5i.set(3, this.E5i),
      this.v5i.set(4, this.qHe),
      this.v5i.set(5, this.S5i),
      this.v5i.set(11, this.z7t),
      this.v5i.set(6, this.y5i),
      this.v5i.set(7, this.I5i),
      this.v5i.set(8, this.W0),
      this.v5i.set(9, this.T5i),
      this.v5i.set(10, this.L5i),
      this.v5i.set(12, this.D5i),
      this.v5i.set(13, this.R5i);
  }
  static GetOptionFunc(e) {
    return 0 === this.v5i.size && this.InitOptionMap(), this.v5i.get(e);
  }
  static U5i() {
    var e = new PersonalDefine_1.PersonalInfoData(),
      r =
        ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance();
    return (
      r
        ? ((e.RoleShowList = r.RoleShowList),
          (e.CardShowList = r.CardShowList),
          (e.CurCardId = r.CurCard),
          (e.Birthday = r.Birthday),
          (e.IsBirthdayDisplay = r.IsBirthdayDisplay),
          (e.CardDataList = r.CardUnlockList),
          (e.Signature = r.Signature),
          (e.HeadPhotoId = r.PlayerHeadPhoto),
          (e.IsOtherData = !0),
          (e.Name = r.PlayerName),
          (e.PlayerId = r.PlayerId),
          (e.Level = r.PlayerLevel),
          (e.WorldLevel = r.WorldLevel))
        : ((r =
            ModelManager_1.ModelManager.OnlineModel.CachePlayerData
              .PlayerDetails),
          (e.RoleShowList = r.dSs),
          (e.CardShowList = r.mSs),
          (e.CurCardId = r.CSs ?? void 0),
          (e.Birthday = r.jVn ?? 0),
          (e.IsBirthdayDisplay = r.gSs ?? !1),
          (e.CardDataList =
            ModelManager_1.ModelManager.OnlineModel.CachePlayerData.CardUnlockList),
          (e.Signature = r.HVn ?? ""),
          (e.HeadPhotoId = r.sSs ?? void 0),
          (e.IsOtherData = !0),
          (e.Name = r.w8n ?? ""),
          (e.PlayerId = r.q5n ?? 0),
          (e.Level = r.P6n ?? 0),
          (e.WorldLevel = r.nSs ?? 0)),
      e
    );
  }
}
((exports.PersonalOptionController = PersonalOptionController).v5i = new Map()),
  (PersonalOptionController.M5i = () => {
    var e = (
      UiManager_1.UiManager.IsViewOpen("OnlineProcessView")
        ? ModelManager_1.ModelManager.OnlineModel
        : ModelManager_1.ModelManager.FriendModel
    ).CachePlayerData;
    ModelManager_1.ModelManager.ChatModel.IsInMute(e.PlayerId)
      ? ChatController_1.ChatController.ChatMutePlayerRequest(e.PlayerId, !1)
      : ChatController_1.ChatController.ChatMutePlayerRequest(e.PlayerId, !0);
  }),
  (PersonalOptionController.S5i = () => {
    var e = (
      UiManager_1.UiManager.IsViewOpen("OnlineProcessView")
        ? ModelManager_1.ModelManager.OnlineModel
        : ModelManager_1.ModelManager.FriendModel
    ).CachePlayerData;
    ReportController_1.ReportController.OpenReportView(e, 2);
  }),
  (PersonalOptionController.qHe = () => {
    var e = ModelManager_1.ModelManager.FriendModel;
    const r = (
      UiManager_1.UiManager.IsViewOpen("OnlineProcessView")
        ? ModelManager_1.ModelManager.OnlineModel
        : e
    ).CachePlayerData;
    e.HasFriend(r.PlayerId) ||
      (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
        "NotOnFriendList",
      ),
      UiManager_1.UiManager.CloseView("FriendProcessView"));
    e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(56);
    e.SetTextArgs(r.PlayerName),
      e.FunctionMap.set(2, () => {
        FriendController_1.FriendController.RequestFriendDelete(r.PlayerId);
      }),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        e,
      );
  }),
  (PersonalOptionController.E5i = () => {
    const e = ModelManager_1.ModelManager.FriendModel.CachePlayerData;
    var r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(57);
    r.SetTextArgs(e.PlayerName),
      r.FunctionMap.set(2, () => {
        FriendController_1.FriendController.RequestBlockPlayer(e.PlayerId);
      }),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        r,
      );
  }),
  (PersonalOptionController.z7t = () => {
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
      "CopiedMyUid",
    ),
      UE.LGUIBPLibrary.ClipBoardCopy(
        ModelManager_1.ModelManager.PlayerInfoModel.GetId().toString(),
      );
  }),
  (PersonalOptionController.y5i = () => {
    UiManager_1.UiManager.OpenView("PersonalEditView", 0);
  }),
  (PersonalOptionController.I5i = () => {
    UiManager_1.UiManager.OpenView("PersonalEditView", 1);
  }),
  (PersonalOptionController.W0 = () => {
    CommonInputViewController_1.CommonInputViewController.OpenSetRoleNameInputView();
  }),
  (PersonalOptionController.T5i = () => {
    CommonInputViewController_1.CommonInputViewController.OpenPersonalSignInputView();
  }),
  (PersonalOptionController.L5i = () => {
    UiManager_1.UiManager.OpenView("PersonalBirthView");
  }),
  (PersonalOptionController.D5i = () => {
    const e = PersonalOptionController.U5i();
    UiManager_1.UiManager.IsViewOpen("FriendProcessView")
      ? UiManager_1.UiManager.CloseViewAsync("FriendProcessView").then(
          () => {
            UiManager_1.UiManager.OpenView("PersonalRootView", e);
          },
          () => {},
        )
      : UiManager_1.UiManager.IsViewOpen("OnlineProcessView")
        ? UiManager_1.UiManager.CloseViewAsync("OnlineProcessView").then(
            () => {
              UiManager_1.UiManager.OpenView("PersonalRootView", e);
            },
            () => {},
          )
        : UiManager_1.UiManager.OpenView("PersonalRootView", e);
  }),
  (PersonalOptionController.R5i = () => {
    CommonInputViewController_1.CommonInputViewController.OpenSetPlayerRemarkNameInputView();
  });
//# sourceMappingURL=PersonalOptionController.js.map
