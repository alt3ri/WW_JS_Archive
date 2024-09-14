"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OnlineProcessView = void 0);
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
  GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
class OnlineProcessView extends UiViewBase_1.UiViewBase {
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
      (this.J8t = (e, t, i) => {
        t = new PersonalOptionItem_1.PersonalOptionItem(t);
        return (
          t.Refresh(e, !1, i),
          1 === e
            ? (this.j8t = t)
            : 2 === e
              ? (this.W8t = t)
              : 3 === e
                ? (this.K8t = t)
                : 4 === e
                  ? (this.Q8t = t)
                  : 5 === e
                    ? (this.X8t = t)
                    : 12 === e
                      ? (this.$8t = t)
                      : 13 === e && (this.Y8t = t),
          { Key: i, Value: t }
        );
      }),
      (this.Byt = (e) => {
        this.j8t.GetRootItem().SetUIActive(!1),
          this.W8t.GetRootItem().SetUIActive(!1);
        var t = ModelManager_1.ModelManager.OnlineModel.CachePlayerData;
        e === t?.PlayerId &&
          ModelManager_1.ModelManager.ChatModel.IsInMute(t.PlayerId),
          this.RefreshMute();
      }),
      (this.Z8t = () => {
        UiManager_1.UiManager.CloseView("OnlineProcessView"),
          ChatController_1.ChatController.OpenFriendChat(
            ModelManager_1.ModelManager.OnlineModel.CachePlayerData.PlayerId,
          );
      }),
      (this.e9t = () => {
        ModelManager_1.ModelManager.OnlineModel.CachePlayerData
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
  OnStart() {
    (this.g8t = new PlayerHeadItem_1.PlayerHeadItem(
      this.GetItem(0).GetOwner(),
    )),
      this.GetText(4).SetText(""),
      this.i9t(),
      this.t9t();
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
      );
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
    for (const t of ConfigManager_1.ConfigManager.FriendConfig.GetProcessViewFunctionList())
      (12 === t && !ModelManager_1.ModelManager.FunctionModel.IsOpen(10060)) ||
        e.push(t);
    return e;
  }
  t9t() {
    var e = ModelManager_1.ModelManager.OnlineModel.CachePlayerData;
    (ModelManager_1.ModelManager.FriendModel.SelectedPlayerId = e.PlayerId),
      ModelManager_1.ModelManager.FriendModel.SetCurrentOperationPlayerId(
        e.PlayerId,
      ),
      this.w8t(),
      this.g8t.RefreshByHeadPhotoId(e.HeadId),
      this.GetText(5).SetText(e.Level.toString()),
      this.Byt(e.PlayerId);
  }
  RefreshMute() {
    var e = ModelManager_1.ModelManager.OnlineModel.CachePlayerData,
      e = ModelManager_1.ModelManager.ChatModel.IsInMute(e.PlayerId);
    this.GetItem(8).SetUIActive(e);
  }
  P5e() {
    var e = ModelManager_1.ModelManager.OnlineModel.CachePlayerData,
      t = ModelManager_1.ModelManager.FriendModel.IsMyFriend(e.PlayerId),
      i = this.GetText(2);
    t &&
    void 0 !==
      (t = ModelManager_1.ModelManager.FriendModel.GetFriendById(
        e.PlayerId,
      )?.FriendRemark) &&
    "" !== t
      ? (i.SetText(`(${t})`), (i.useChangeColor = !0))
      : (i.SetText(e?.Name), (i.useChangeColor = !1));
  }
  r9t() {
    var e = ModelManager_1.ModelManager.OnlineModel.CachePlayerData?.Signature,
      t = this.GetText(11);
    e && "" !== e ? t.SetText(e) : t.SetText("");
  }
  qxa() {
    var e;
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()
      ? ((e =
          "" !==
          ModelManager_1.ModelManager.OnlineModel.CachePlayerData?.PlayerDetails
            .$xa),
        this.GetItem(12)?.SetUIActive(e),
        e &&
          ((e =
            ModelManager_1.ModelManager.OnlineModel.CachePlayerData
              .PlayerDetails.Vxa),
          this.GetText(13)?.SetText(e)))
      : this.GetItem(12)?.SetUIActive(!1);
  }
  w8t() {
    var e = ModelManager_1.ModelManager.OnlineModel.CachePlayerData,
      e =
        (this.P5e(),
        this.r9t(),
        this.qxa(),
        ModelManager_1.ModelManager.FriendModel.IsMyFriend(e.PlayerId));
    this.Y8t.GetRootItem().SetUIActive(e),
      this.W8t.GetRootItem().SetUIActive(!1),
      this.X8t.GetRootItem().SetUIActive(!0),
      this.K8t.GetRootItem().SetUIActive(!1),
      this.Q8t.GetRootItem().SetUIActive(e),
      this.GetButton(6).RootUIComp.SetUIActive(e),
      this.$8t?.SetActive(!0);
  }
  OnBeforeDestroy() {
    this.H8t && (this.H8t.ClearChildren(), (this.H8t = void 0));
  }
}
exports.OnlineProcessView = OnlineProcessView;
//# sourceMappingURL=OnlineProcessView.js.map
