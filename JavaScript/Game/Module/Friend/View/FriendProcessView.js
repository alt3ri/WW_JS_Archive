"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FriendProcessView = void 0);
const UE = require("ue"),
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
      (this.H6t = void 0),
      (this.j6t = void 0),
      (this.W6t = void 0),
      (this.K6t = void 0),
      (this.Q6t = void 0),
      (this.X6t = void 0),
      (this.$6t = void 0),
      (this.Y6t = void 0),
      (this.g6t = void 0),
      (this.J6t = (e, i, t) => {
        i = new PersonalOptionItem_1.PersonalOptionItem(i);
        return (
          i.Refresh(e, !1, t),
          1 === e
            ? (this.j6t = i)
            : 2 === e
              ? (this.W6t = i)
              : 3 === e
                ? (this.K6t = i)
                : 4 === e
                  ? (this.Q6t = i)
                  : 5 === e
                    ? (this.X6t = i)
                    : 12 === e
                      ? (this.$6t = i)
                      : 13 === e && (this.Y6t = i),
          { Key: t, Value: i }
        );
      }),
      (this.z6t = () => {
        var e = ModelManager_1.ModelManager.FriendModel.CachePlayerData;
        ModelManager_1.ModelManager.FriendModel.HasBlockedPlayer(e.PlayerId)
          ? this.K6t.GetRootItem().SetUIActive(!1)
          : this.K6t.GetRootItem().SetUIActive(!0);
      }),
      (this.yEt = (e) => {
        this.j6t.GetRootItem().SetUIActive(!1),
          this.W6t.GetRootItem().SetUIActive(!1);
        var i = ModelManager_1.ModelManager.FriendModel.ShowingView;
        ("FriendView" !== i && "FriendSearchView" !== i) ||
          (e ===
            (i =
              ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance())
              ?.PlayerId &&
            (ModelManager_1.ModelManager.ChatModel.IsInMute(i.PlayerId)
              ? this.j6t
              : this.W6t
            )
              .GetRootItem()
              .SetUIActive(!0)),
          this.RefreshMute();
      }),
      (this.Z6t = () => {
        var e =
          ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance();
        e &&
          (UiManager_1.UiManager.CloseView("FriendProcessView"),
          UiManager_1.UiManager.IsViewShow("FriendSearchView") &&
            UiManager_1.UiManager.CloseView("FriendSearchView"),
          ChatController_1.ChatController.OpenFriendChat(e.PlayerId));
      }),
      (this.e8t = () => {
        ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance()
          ? this.t8t()
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
    ]),
      (this.BtnBindInfo = [[6, this.Z6t]]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UpdateFriendViewShow,
      this.e8t,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAddMutePlayer,
        this.yEt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRemoveMutePlayer,
        this.yEt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UpdateBlackListShow,
        this.z6t,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UpdateFriendViewShow,
      this.e8t,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAddMutePlayer,
        this.yEt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRemoveMutePlayer,
        this.yEt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UpdateBlackListShow,
        this.z6t,
      );
  }
  OnStart() {
    (this.g6t = new PlayerHeadItem_1.PlayerHeadItem(
      this.GetItem(0).GetOwner(),
    )),
      this.GetText(4).SetText(""),
      this.i8t();
    var e = ModelManager_1.ModelManager.FriendModel,
      i = e.GetSelectedPlayerOrItemInstance();
    (e.CachePlayerData = i), this.t8t();
  }
  i8t() {
    this.H6t && this.H6t.ClearChildren(),
      (this.H6t = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetGridLayout(9),
        this.J6t,
      )),
      this.H6t.RebuildLayoutByDataNew(this.o8t());
  }
  o8t() {
    var e = [];
    for (const i of ConfigManager_1.ConfigManager.FriendConfig.GetProcessViewFunctionList())
      (12 === i && !ModelManager_1.ModelManager.FunctionModel.IsOpen(10060)) ||
        e.push(i);
    return e;
  }
  t8t() {
    var e = ModelManager_1.ModelManager.FriendModel.CachePlayerData;
    this.w6t(),
      this.g6t.RefreshByHeadPhotoId(e.PlayerHeadPhoto),
      this.GetText(5).SetText(e.PlayerLevel.toString()),
      this.yEt(e.PlayerId);
  }
  RefreshMute() {
    var e =
        ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance(),
      e = ModelManager_1.ModelManager.ChatModel.IsInMute(e.PlayerId);
    this.GetItem(8).SetUIActive(e);
  }
  C4e() {
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
  r8t() {
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
  w6t() {
    var e = ModelManager_1.ModelManager.FriendModel,
      i = e.FilterState,
      t = e.ShowingView;
    this.C4e(),
      this.r8t(),
      this.Y6t.GetRootItem().SetUIActive(
        e.IsMyFriend(e.GetSelectedPlayerOrItemInstance().PlayerId),
      ),
      this.W6t.GetRootItem().SetUIActive(
        (("FriendView" === t || "FriendSearchView" === t) && 1 === i) ||
          2 === i,
      ),
      this.X6t.GetRootItem().SetUIActive(!0),
      ("FriendView" !== t &&
        "FriendSearchView" !== t &&
        "FriendBlackListView" !== t) ||
        this.z6t(),
      this.Q6t.GetRootItem().SetUIActive(
        e.IsMyFriend(e.GetSelectedPlayerOrItemInstance().PlayerId),
      ),
      this.GetButton(6).RootUIComp.SetUIActive(
        e.IsMyFriend(e.GetSelectedPlayerOrItemInstance().PlayerId),
      ),
      this.$6t?.SetActive(!0);
  }
  OnBeforeDestroy() {
    this.H6t && (this.H6t.ClearChildren(), (this.H6t = void 0));
  }
}
exports.FriendProcessView = FriendProcessView;
//# sourceMappingURL=FriendProcessView.js.map
