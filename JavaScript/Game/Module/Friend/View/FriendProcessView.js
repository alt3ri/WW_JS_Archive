"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FriendProcessView = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ChatController_1 = require("../../Chat/ChatController");
const PlayerHeadItem_1 = require("../../Common/PlayerHeadItem");
const PersonalOptionItem_1 = require("../../Personal/View/PersonalOptionItem");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../Util/LguiUtil");
const FriendController_1 = require("../FriendController");
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
          e === 1
            ? (this.j6t = i)
            : e === 2
              ? (this.W6t = i)
              : e === 3
                ? (this.K6t = i)
                : e === 4
                  ? (this.Q6t = i)
                  : e === 5
                    ? (this.X6t = i)
                    : e === 12
                      ? (this.$6t = i)
                      : e === 13 && (this.Y6t = i),
          { Key: t, Value: i }
        );
      }),
      (this.z6t = () => {
        const e = ModelManager_1.ModelManager.FriendModel.CachePlayerData;
        ModelManager_1.ModelManager.FriendModel.HasBlockedPlayer(e.PlayerId)
          ? this.K6t.GetRootItem().SetUIActive(!1)
          : this.K6t.GetRootItem().SetUIActive(!0);
      }),
      (this.yEt = (e) => {
        this.j6t.GetRootItem().SetUIActive(!1),
          this.W6t.GetRootItem().SetUIActive(!1);
        let i = ModelManager_1.ModelManager.FriendModel.ShowingView;
        (i !== "FriendView" && i !== "FriendSearchView") ||
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
        const e =
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
    const e = ModelManager_1.ModelManager.FriendModel;
    const i = e.GetSelectedPlayerOrItemInstance();
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
    const e = [];
    for (const i of ConfigManager_1.ConfigManager.FriendConfig.GetProcessViewFunctionList())
      (i === 12 && !ModelManager_1.ModelManager.FunctionModel.IsOpen(10060)) ||
        e.push(i);
    return e;
  }
  t8t() {
    const e = ModelManager_1.ModelManager.FriendModel.CachePlayerData;
    this.w6t(),
      this.g6t.RefreshByHeadPhotoId(e.PlayerHeadPhoto),
      this.GetText(5).SetText(e.PlayerLevel.toString()),
      this.yEt(e.PlayerId);
  }
  RefreshMute() {
    var e =
      ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance();
    var e = ModelManager_1.ModelManager.ChatModel.IsInMute(e.PlayerId);
    this.GetItem(8).SetUIActive(e);
  }
  C4e() {
    const e = ModelManager_1.ModelManager.FriendModel;
    const i = this.GetText(2);
    FriendController_1.FriendController.CheckRemarkIsValid(
      e.GetSelectedPlayerOrItemInstance().FriendRemark,
    )
      ? (i.SetText(`(${e.GetSelectedPlayerOrItemInstance().FriendRemark})`),
        (i.useChangeColor = !0))
      : (i.SetText(e.GetSelectedPlayerOrItemInstance().PlayerName),
        (i.useChangeColor = !1));
  }
  r8t() {
    const e = ModelManager_1.ModelManager.FriendModel;
    const i = e.GetSelectedPlayerOrItemInstance()?.Signature;
    const t = this.GetText(11);
    i && i !== ""
      ? t.SetText(i)
      : e.GetSelectedPlayerOrItemInstance()?.PlayerId !==
          ModelManager_1.ModelManager.FunctionModel.PlayerId
        ? t?.SetText("")
        : LguiUtil_1.LguiUtil.SetLocalText(t, "EmptySign");
  }
  w6t() {
    const e = ModelManager_1.ModelManager.FriendModel;
    const i = e.FilterState;
    const t = e.ShowingView;
    this.C4e(),
      this.r8t(),
      this.Y6t.GetRootItem().SetUIActive(
        e.IsMyFriend(e.GetSelectedPlayerOrItemInstance().PlayerId),
      ),
      this.W6t.GetRootItem().SetUIActive(
        ((t === "FriendView" || t === "FriendSearchView") && i === 1) ||
          i === 2,
      ),
      this.X6t.GetRootItem().SetUIActive(!0),
      (t !== "FriendView" &&
        t !== "FriendSearchView" &&
        t !== "FriendBlackListView") ||
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
// # sourceMappingURL=FriendProcessView.js.map
