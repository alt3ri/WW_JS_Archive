"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FriendProcessView = void 0);
const UE = require("ue"),
  PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ChatController_1 = require("../../Chat/ChatController"),
  PlayerHeadItem_1 = require("../../Common/PlayerHeadItem"),
  PersonalOptionItem_1 = require("../../Personal/View/PersonalOptionItem"),
  GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  FriendController_1 = require("../FriendController");
class FriendProcessView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.H8t = void 0),
      (this.j8t = void 0),
      (this.W8t = void 0),
      (this.K8t = void 0),
      (this.Q8t = void 0),
      (this.X8t = void 0),
      (this.$8t = void 0),
      (this.Y8t = void 0),
      (this.g8t = void 0),
      (this.J8t = (e, i, t) => {
        i = new PersonalOptionItem_1.PersonalOptionItem(i);
        return (
          i.Refresh(e, !1, t),
          1 === e
            ? (this.j8t = i)
            : 2 === e
              ? (this.W8t = i)
              : 3 === e
                ? (this.K8t = i)
                : 4 === e
                  ? (this.Q8t = i)
                  : 5 === e
                    ? (this.X8t = i)
                    : 12 === e
                      ? (this.$8t = i)
                      : 13 === e && (this.Y8t = i),
          { Key: t, Value: i }
        );
      }),
      (this.z8t = () => {
        var e = ModelManager_1.ModelManager.FriendModel.CachePlayerData;
        ModelManager_1.ModelManager.FriendModel.HasBlockedPlayer(e.PlayerId)
          ? this.K8t.GetRootItem().SetUIActive(!1)
          : this.K8t.GetRootItem().SetUIActive(!0);
      }),
      (this.Byt = (e) => {
        this.j8t.GetRootItem().SetUIActive(!1),
          this.W8t.GetRootItem().SetUIActive(!1);
        var i = ModelManager_1.ModelManager.FriendModel.ShowingView;
        ("FriendView" !== i && "FriendSearchView" !== i) ||
          (e ===
            (i =
              ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance())
              ?.PlayerId &&
            (ModelManager_1.ModelManager.ChatModel.IsInMute(i.PlayerId)
              ? this.j8t
              : this.W8t
            )
              .GetRootItem()
              .SetUIActive(!0)),
          this.RefreshMute();
      }),
      (this.Z8t = () => {
        var e =
          ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance();
        e &&
          (UiManager_1.UiManager.CloseView("FriendProcessView"),
          UiManager_1.UiManager.IsViewShow("FriendSearchView") &&
            UiManager_1.UiManager.CloseView("FriendSearchView"),
          ChatController_1.ChatController.OpenFriendChat(e.PlayerId));
      }),
      (this.e9t = () => {
        ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance()
          ? this.t9t()
          : this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UISprite],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIButtonComponent],
      [7, UE.UIText],
      [8, UE.UIItem],
      [9, UE.UIGridLayout],
      [11, UE.UIText],
      [12, UE.UIItem],
      [13, UE.UIText],
    ]),
      (this.BtnBindInfo = [[6, this.Z8t]]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UpdateFriendViewShow,
      this.e9t,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAddMutePlayer,
        this.Byt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRemoveMutePlayer,
        this.Byt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UpdateBlackListShow,
        this.z8t,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UpdateFriendViewShow,
      this.e9t,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAddMutePlayer,
        this.Byt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRemoveMutePlayer,
        this.Byt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UpdateBlackListShow,
        this.z8t,
      );
  }
  OnStart() {
    (this.g8t = new PlayerHeadItem_1.PlayerHeadItem(
      this.GetItem(0).GetOwner(),
    )),
      this.GetText(4).SetText(""),
      this.i9t();
    var e = ModelManager_1.ModelManager.FriendModel,
      i = e.GetSelectedPlayerOrItemInstance();
    (e.CachePlayerData = i), this.t9t();
  }
  i9t() {
    this.H8t && this.H8t.ClearChildren(),
      (this.H8t = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetGridLayout(9),
        this.J8t,
      )),
      this.H8t.RebuildLayoutByDataNew(this.o9t());
  }
  o9t() {
    var e = [];
    for (const i of ConfigManager_1.ConfigManager.FriendConfig.GetProcessViewFunctionList())
      (12 === i && !ModelManager_1.ModelManager.FunctionModel.IsOpen(10060)) ||
        e.push(i);
    return e;
  }
  t9t() {
    var e = ModelManager_1.ModelManager.FriendModel.CachePlayerData;
    this.w8t(),
      this.g8t.RefreshByHeadPhotoId(e.PlayerHeadPhoto),
      this.GetText(5).SetText(e.PlayerLevel.toString()),
      this.Byt(e.PlayerId);
  }
  RefreshMute() {
    var e =
        ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance(),
      e = ModelManager_1.ModelManager.ChatModel.IsInMute(e.PlayerId);
    this.GetItem(8).SetUIActive(e);
  }
  P5e() {
    var e = ModelManager_1.ModelManager.FriendModel,
      i = this.GetText(2);
    FriendController_1.FriendController.CheckRemarkIsValid(
      e.GetSelectedPlayerOrItemInstance().FriendRemark,
    )
      ? (i.SetText(`(${e.GetSelectedPlayerOrItemInstance().FriendRemark})`),
        (i.useChangeColor = !0))
      : (i.SetText(e.GetSelectedPlayerOrItemInstance().PlayerName),
        (i.useChangeColor = !1));
  }
  qxa() {
    var e;
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()
      ? ((e =
          "" !==
          ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance().GetSdkUserId()),
        this.GetItem(12)?.SetUIActive(e),
        e &&
          ((e =
            ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance().GetSdkOnlineId()),
          this.GetText(13)?.SetText(e)))
      : this.GetItem(12)?.SetUIActive(!1);
  }
  r9t() {
    var e = ModelManager_1.ModelManager.FriendModel,
      i = e.GetSelectedPlayerOrItemInstance()?.Signature,
      t = this.GetText(11);
    i && "" !== i
      ? t.SetText(i)
      : e.GetSelectedPlayerOrItemInstance()?.PlayerId !==
          ModelManager_1.ModelManager.FunctionModel.PlayerId
        ? t?.SetText("")
        : LguiUtil_1.LguiUtil.SetLocalText(t, "EmptySign");
  }
  w8t() {
    var e = ModelManager_1.ModelManager.FriendModel,
      i = e.FilterState,
      t = e.ShowingView;
    this.P5e(),
      this.r9t(),
      this.qxa(),
      this.Y8t.GetRootItem().SetUIActive(
        e.IsMyFriend(e.GetSelectedPlayerOrItemInstance().PlayerId),
      ),
      this.W8t.GetRootItem().SetUIActive(
        (("FriendView" === t || "FriendSearchView" === t) && 1 === i) ||
          2 === i,
      ),
      this.X8t.GetRootItem().SetUIActive(!0),
      ("FriendView" !== t &&
        "FriendSearchView" !== t &&
        "FriendBlackListView" !== t) ||
        this.z8t(),
      this.Q8t.GetRootItem().SetUIActive(
        e.IsMyFriend(e.GetSelectedPlayerOrItemInstance().PlayerId),
      ),
      this.GetButton(6).RootUIComp.SetUIActive(
        e.IsMyFriend(e.GetSelectedPlayerOrItemInstance().PlayerId),
      ),
      this.$8t?.SetActive(!0);
  }
  OnBeforeDestroy() {
    this.H8t && (this.H8t.ClearChildren(), (this.H8t = void 0));
  }
}
exports.FriendProcessView = FriendProcessView;
//# sourceMappingURL=FriendProcessView.js.map
