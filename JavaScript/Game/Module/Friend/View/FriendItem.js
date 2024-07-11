"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FriendItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  BackgroundCardById_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardById"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ChatController_1 = require("../../Chat/ChatController"),
  ButtonAndSpriteItem_1 = require("../../Common/Button/ButtonAndSpriteItem"),
  ButtonAndTextItem_1 = require("../../Common/Button/ButtonAndTextItem"),
  PlayerHeadItem_1 = require("../../Common/PlayerHeadItem"),
  OnlineController_1 = require("../../Online/OnlineController"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  FriendController_1 = require("../FriendController"),
  FriendModel_1 = require("../FriendModel");
class FunctionButtonInfo {
  constructor(e, t, i) {
    (this.SpritePath = e), (this.StateFunc = t), (this.CallBack = i);
  }
}
class FriendItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(e, t) {
    super(),
      (this.m8t = void 0),
      (this.d8t = void 0),
      (this.FriendInstanceId = 0),
      (this.BelongView = void 0),
      (this.C8t = void 0),
      (this.g8t = void 0),
      (this.Het = []),
      (this.A8t = []),
      (this.sOt = () => {
        this.f8t().PlayerIsOnline &&
          this.p8t() &&
          OnlineController_1.OnlineController.ApplyJoinWorldRequest(
            this.f8t().PlayerId,
            Protocol_1.Aki.Protocol.H8s.Proto_LobbyJoin,
          );
      }),
      (this.v8t = () =>
        ModelManager_1.ModelManager.FriendModel.IsMyFriend(
          this.f8t().PlayerId,
        )),
      (this.M8t = () => "FriendBlackListView" === this.BelongView),
      (this.E8t = () =>
        (2 === ModelManager_1.ModelManager.FriendModel.FilterState &&
          "FriendView" === this.BelongView) ||
        !(
          "FriendSearchView" !== this.BelongView ||
          !ModelManager_1.ModelManager.FriendModel.HasFriendApplication(
            this.f8t().PlayerId,
          )
        )),
      (this.S8t = () =>
        !ModelManager_1.ModelManager.FriendModel.IsMyFriend(
          this.f8t().PlayerId,
        ) &&
        !ModelManager_1.ModelManager.FriendModel.HasFriendApplication(
          this.f8t().PlayerId,
        ) &&
        ("FriendSearchView" === this.BelongView ||
          (3 === ModelManager_1.ModelManager.FriendModel.FilterState &&
            "FriendView" === this.BelongView))),
      (this.y8t = () =>
        (2 === ModelManager_1.ModelManager.FriendModel.FilterState &&
          "FriendView" === this.BelongView) ||
        !(
          "FriendSearchView" !== this.BelongView ||
          !ModelManager_1.ModelManager.FriendModel.HasFriendApplication(
            this.f8t().PlayerId,
          )
        )),
      (this.I8t = () => {
        var e;
        ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance(
          this.FriendInstanceId,
        )?.Debug ||
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Friend", 28, "点击拒绝添加好友"),
          (e = this.f8t())
            ? ((this.C8t = []),
              this.C8t.push(e.PlayerId),
              FriendController_1.FriendController.RequestFriendApplyHandle(
                this.C8t,
                Protocol_1.Aki.Protocol.E5s.Proto_Reject,
              ))
            : (FriendController_1.FriendController.LocalRemoveApplicationFriend(
                this.FriendInstanceId,
              ),
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "FriendRequestOutOfDate",
              )));
      }),
      (this.T8t = () => {
        var e,
          t = this.f8t();
        ModelManager_1.ModelManager.FriendModel.HasFriend(this.FriendInstanceId)
          ? (FriendController_1.FriendController.LocalRemoveApplicationFriend(
              this.FriendInstanceId,
            ),
            t &&
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.ApplicationHandled,
                2,
                [t.PlayerId],
              ))
          : ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance(
              this.FriendInstanceId,
            )?.Debug ||
            (t
              ? ((e =
                  ModelManager_1.ModelManager.FriendModel.GetFriendListCount()),
                ConfigManager_1.ConfigManager.FriendConfig.GetFriendLimitByViewType(
                  1,
                ) <
                e + 1
                  ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                      "FriendListFull",
                    )
                  : ((this.C8t = []),
                    this.C8t.push(t.PlayerId),
                    FriendController_1.FriendController.RequestFriendApplyHandle(
                      this.C8t,
                      Protocol_1.Aki.Protocol.E5s.Proto_Approve,
                    )))
              : (FriendController_1.FriendController.LocalRemoveApplicationFriend(
                  this.FriendInstanceId,
                ),
                ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "FriendRequestOutOfDate",
                )));
      }),
      (this.L8t = () => {
        if (
          !ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance(
            this.FriendInstanceId,
          )?.Debug
        ) {
          let e = Protocol_1.Aki.Protocol.S5s.Proto_Search;
          "FriendView" === this.BelongView &&
            3 === ModelManager_1.ModelManager.FriendModel.FilterState &&
            (e = Protocol_1.Aki.Protocol.S5s.Proto_RecentlyTeam);
          var t,
            i = this.f8t();
          i &&
            ((t = ModelManager_1.ModelManager.FriendModel.GetFriendListCount()),
            ConfigManager_1.ConfigManager.FriendConfig.GetFriendLimitByViewType(
              1,
            ) <
            t + 1
              ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "FriendListFull",
                )
              : FriendController_1.FriendController.RequestFriendApplyAddSend(
                  i.PlayerId,
                  e,
                ));
        }
      }),
      (this.D8t = () => {
        var e;
        ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance(
          this.FriendInstanceId,
        )?.Debug ||
          ((e = this.f8t())
            ? FriendController_1.FriendController.RequestUnBlockPlayer(
                e.PlayerId,
              )
            : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "IsNotBlockedPlayer",
              ));
      }),
      (this.Ize = () => {
        var e = this.f8t();
        e && ChatController_1.ChatController.OpenFriendChat(e.PlayerId);
      }),
      (this.R8t = () => {
        ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance(
          this.FriendInstanceId,
        )?.Debug ||
          (this.f8t()
            ? ((ModelManager_1.ModelManager.FriendModel.SelectedPlayerId =
                this.FriendInstanceId),
              (ModelManager_1.ModelManager.FriendModel.ShowingView =
                this.BelongView),
              UiManager_1.UiManager.OpenView("FriendProcessView"))
            : (this.U8t(),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.UpdateFriendViewShow,
              )));
      }),
      (this.BelongView = e),
      (ModelManager_1.ModelManager.FriendModel.ShowingView = this.BelongView),
      t && this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UISprite],
      [5, UE.UIText],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UITexture],
      [9, UE.UIText],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIButtonComponent],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[12, this.R8t]]);
  }
  OnStart() {
    (this.m8t = new ButtonAndTextItem_1.ButtonAndTextItem(this.GetItem(11))),
      (this.d8t = new TeamItem(this.GetItem(10))),
      this.m8t.BindCallback(this.sOt),
      (this.g8t = new PlayerHeadItem_1.PlayerHeadItem(
        this.GetItem(0).GetOwner(),
      ));
    var t = [],
      i =
        (t.push(this.GetItem(6)),
        t.push(this.GetItem(7)),
        t.push(this.GetItem(14)),
        t.push(this.GetItem(15)),
        t.push(this.GetItem(16)),
        t.length);
    for (let e = 0; e < i; e++)
      this.Het.push(new ButtonAndSpriteItem_1.ButtonAndSpriteItem(t[e]));
    this.A8t.push(
      new FunctionButtonInfo("SP_RefuseFriend", this.E8t, this.I8t),
    ),
      this.A8t.push(
        new FunctionButtonInfo("SP_RemoveFriend", this.M8t, this.D8t),
      ),
      this.A8t.push(new FunctionButtonInfo("SP_AddFriend", this.S8t, this.L8t)),
      this.A8t.push(
        new FunctionButtonInfo("SP_AgreeFriend", this.y8t, this.T8t),
      ),
      this.A8t.push(
        new FunctionButtonInfo("SP_ChatFriend", this.v8t, this.Ize),
      );
  }
  Refresh(e, t, i) {
    this.Xqe(e.Id),
      1 === e.OperationType
        ? this.P8t()
        : (2 !== e.OperationType && 3 !== e.OperationType) || this.x8t();
  }
  RefreshMute() {
    var e = ModelManager_1.ModelManager.ChatModel.IsInMute(this.f8t().PlayerId);
    this.GetItem(1).SetUIActive(e);
  }
  Xqe(e) {
    this.FriendInstanceId = e;
    e = this.f8t();
    this.w8t(),
      e &&
        (this.g8t.RefreshByHeadPhotoId(e.PlayerHeadPhoto),
        this.GetText(3).SetText("Lv." + e.PlayerLevel.toString())),
      this.B8t();
  }
  w8t() {
    this.RefreshMute(),
      this._Ge(),
      this.P5e(),
      this.b8t(),
      this.q8t(),
      this.x8t(),
      this.G8t(),
      this.N8t(),
      this.O8t();
  }
  N8t() {
    this.GetText(9).SetText(this.f8t().Signature),
      this.GetItem(13).SetUIActive(0 < this.f8t().Signature.length);
  }
  O8t() {
    var e = this.f8t().CurCard;
    0 < e &&
      ((e = BackgroundCardById_1.configBackgroundCardById.GetConfig(e)),
      this.SetTextureByPath(e.LongCardPath, this.GetTexture(8)));
  }
  G8t() {
    3 !== ModelManager_1.ModelManager.FriendModel.FilterState
      ? this.d8t.SetActive(!1)
      : (this.d8t.SetActive(!0), this.d8t.RefreshView(this.f8t()));
  }
  k8t(e, t) {
    return (
      !!t.StateFunc() &&
      (e.RefreshSprite(t.SpritePath), e.BindCallback(t.CallBack), !0)
    );
  }
  x8t() {
    for (let e = 0; e < this.Het.length; e++) {
      var t = this.Het[e],
        i = this.A8t[e],
        i = (this.k8t(t, i), i.StateFunc());
      t.GetRootItem().SetUIActive(i);
    }
  }
  q8t() {
    let e = !1;
    "FriendView" !== this.BelongView ||
      (1 !== ModelManager_1.ModelManager.FriendModel.FilterState &&
        3 !== ModelManager_1.ModelManager.FriendModel.FilterState) ||
      (e = !0),
      this.m8t.SetActive(e),
      e && this.F8t();
  }
  F8t() {
    this.m8t.RefreshEnable(
      this.f8t().PlayerIsOnline &&
        this.p8t() &&
        ModelManager_1.ModelManager.FunctionModel.IsOpen(10021),
    );
  }
  b8t() {
    ModelManager_1.ModelManager.FunctionModel.IsOpen(10021)
      ? this.f8t().PlayerIsOnline
        ? this.p8t()
          ? this.m8t.RefreshText("FriendApplyJoin")
          : this.m8t.RefreshText(
              "ApplyBtnDisable",
              this.f8t().WorldLevel -
                ModelManager_1.ModelManager.OnlineModel.EnterDiff,
            )
        : this.m8t.RefreshText("OfflineText")
      : this.m8t.RefreshText("FriendOnlineDisable");
  }
  p8t() {
    return ModelManager_1.ModelManager.OnlineModel.CanJoinOtherWorld(
      ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel,
      this.f8t().WorldLevel,
    );
  }
  P5e() {
    var e = this.GetText(2);
    FriendController_1.FriendController.CheckRemarkIsValid(
      this.f8t()?.FriendRemark ?? "",
    )
      ? e.SetText(`(${this.f8t().FriendRemark})`)
      : e.SetText(this.f8t()?.PlayerName ?? "");
  }
  _Ge() {}
  B8t() {
    var e,
      t = this.f8t().PlayerIsOnline,
      i = this.GetText(5);
    "FriendBlackListView" === this.BelongView
      ? i.SetText("")
      : t
        ? LguiUtil_1.LguiUtil.SetLocalText(i, "FriendOnline")
        : 0 === (e = this.f8t()).PlayerLastOfflineTime
          ? i.SetText("")
          : ((e = FriendModel_1.FriendModel.GetOfflineStrAndGap(
              e.PlayerLastOfflineTime,
            )),
            LguiUtil_1.LguiUtil.SetLocalText(i, e[0], e[1])),
      (this.GetText(2).useChangeColor = !t),
      (this.GetText(3).useChangeColor = !t),
      (i.useChangeColor = !t),
      this.V8t();
  }
  V8t() {
    var e,
      t = this.GetSprite(4);
    let i = !0,
      r = void 0;
    "FriendBlackListView" === this.BelongView
      ? (i = !1)
      : (r = this.f8t().PlayerIsOnline
          ? "SP_FriendOnline"
          : "SP_FriendOffline"),
      t.SetUIActive(i),
      r &&
        ((e =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(r)),
        this.SetSpriteByPath(e, t, !1));
  }
  f8t() {
    return ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance(
      this.FriendInstanceId,
    );
  }
  U8t() {
    var e = ModelManager_1.ModelManager.FriendModel.FilterState;
    1 === e
      ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "FriendDeleteEach",
        )
      : 2 === e &&
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "FriendRequestOutOfDate",
        );
  }
  P8t() {
    ModelManager_1.ModelManager.FriendModel.CurrentApplyFriendListHasPlayer(
      this.FriendInstanceId,
    ) && this.x8t();
  }
}
exports.FriendItem = FriendItem;
class TeamItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(), this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  RefreshView(e) {
    this.GetItem(1).SetUIActive(!1),
      this.GetItem(2).SetUIActive(!1),
      2 <= e.TeamMemberCount && this.GetItem(1).SetUIActive(!0),
      3 <= e.TeamMemberCount && this.GetItem(2).SetUIActive(!0);
  }
}
//# sourceMappingURL=FriendItem.js.map
