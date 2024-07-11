"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FriendItem = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const BackgroundCardById_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ChatController_1 = require("../../Chat/ChatController");
const ButtonAndSpriteItem_1 = require("../../Common/Button/ButtonAndSpriteItem");
const ButtonAndTextItem_1 = require("../../Common/Button/ButtonAndTextItem");
const PlayerHeadItem_1 = require("../../Common/PlayerHeadItem");
const OnlineController_1 = require("../../Online/OnlineController");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const FriendController_1 = require("../FriendController");
const FriendModel_1 = require("../FriendModel");
const MAX_BUTTON_COUNT = 2;
const MAX_BUTTON_INFO_COUNT = 5;
class FunctionButtonInfo {
  constructor(e, t, i) {
    (this.SpritePath = e), (this.StateFunc = t), (this.CallBack = i);
  }
}
class FriendItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(e, t) {
    super(),
      (this.m6t = void 0),
      (this.d6t = void 0),
      (this.FriendInstanceId = 0),
      (this.C6t = void 0),
      (this.g6t = void 0),
      (this.nNt = () => {
        this.f6t().PlayerIsOnline &&
          this.p6t() &&
          OnlineController_1.OnlineController.ApplyJoinWorldRequest(
            this.f6t().PlayerId,
            Protocol_1.Aki.Protocol.z3s.Proto_LobbyJoin,
          );
      }),
      (this.v6t = () =>
        ModelManager_1.ModelManager.FriendModel.IsMyFriend(
          this.f6t().PlayerId,
        )),
      (this.M6t = () => this.BelongView === "FriendBlackListView"),
      (this.S6t = () =>
        (ModelManager_1.ModelManager.FriendModel.FilterState === 2 &&
          this.BelongView === "FriendView") ||
        !(
          this.BelongView !== "FriendSearchView" ||
          !ModelManager_1.ModelManager.FriendModel.HasFriendApplication(
            this.f6t().PlayerId,
          )
        )),
      (this.E6t = () =>
        !ModelManager_1.ModelManager.FriendModel.IsMyFriend(
          this.f6t().PlayerId,
        ) &&
        !ModelManager_1.ModelManager.FriendModel.HasFriendApplication(
          this.f6t().PlayerId,
        ) &&
        (this.BelongView === "FriendSearchView" ||
          (ModelManager_1.ModelManager.FriendModel.FilterState === 3 &&
            this.BelongView === "FriendView"))),
      (this.y6t = () =>
        (ModelManager_1.ModelManager.FriendModel.FilterState === 2 &&
          this.BelongView === "FriendView") ||
        !(
          this.BelongView !== "FriendSearchView" ||
          !ModelManager_1.ModelManager.FriendModel.HasFriendApplication(
            this.f6t().PlayerId,
          )
        )),
      (this.I6t = () => {
        let e;
        ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance(
          this.FriendInstanceId,
        )?.Debug ||
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Friend", 28, "点击拒绝添加好友"),
          (e = this.f6t())
            ? ((this.C6t = []),
              this.C6t.push(e.PlayerId),
              FriendController_1.FriendController.RequestFriendApplyHandle(
                this.C6t,
                Protocol_1.Aki.Protocol.xks.Proto_Reject,
              ))
            : (FriendController_1.FriendController.LocalRemoveApplicationFriend(
                this.FriendInstanceId,
              ),
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "FriendRequestOutOfDate",
              )));
      }),
      (this.T6t = () => {
        let e, t;
        ModelManager_1.ModelManager.FriendModel.HasFriend(this.FriendInstanceId)
          ? FriendController_1.FriendController.LocalRemoveApplicationFriend(
              this.FriendInstanceId,
            )
          : ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance(
              this.FriendInstanceId,
            )?.Debug ||
            ((e = this.f6t())
              ? ((t =
                  ModelManager_1.ModelManager.FriendModel.GetFriendListCount()),
                ConfigManager_1.ConfigManager.FriendConfig.GetFriendLimitByViewType(
                  1,
                ) <
                t + 1
                  ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                      "FriendListFull",
                    )
                  : ((this.C6t = []),
                    this.C6t.push(e.PlayerId),
                    FriendController_1.FriendController.RequestFriendApplyHandle(
                      this.C6t,
                      Protocol_1.Aki.Protocol.xks.Proto_Approve,
                    )))
              : (FriendController_1.FriendController.LocalRemoveApplicationFriend(
                  this.FriendInstanceId,
                ),
                ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "FriendRequestOutOfDate",
                )));
      }),
      (this.L6t = () => {
        if (
          !ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance(
            this.FriendInstanceId,
          )?.Debug
        ) {
          let e = Protocol_1.Aki.Protocol.wks.Proto_Search;
          this.BelongView === "FriendView" &&
            ModelManager_1.ModelManager.FriendModel.FilterState === 3 &&
            (e = Protocol_1.Aki.Protocol.wks.Proto_RecentlyTeam);
          let t;
          const i = this.f6t();
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
      (this.D6t = () => {
        let e;
        ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance(
          this.FriendInstanceId,
        )?.Debug ||
          ((e = this.f6t())
            ? FriendController_1.FriendController.RequestUnBlockPlayer(
                e.PlayerId,
              )
            : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "IsNotBlockedPlayer",
              ));
      }),
      (this.cJe = () => {
        const e = this.f6t();
        e && ChatController_1.ChatController.OpenFriendChat(e.PlayerId);
      }),
      (this.R6t = () => {
        ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance(
          this.FriendInstanceId,
        )?.Debug ||
          (this.f6t()
            ? ((ModelManager_1.ModelManager.FriendModel.SelectedPlayerId =
                this.FriendInstanceId),
              (ModelManager_1.ModelManager.FriendModel.ShowingView =
                this.BelongView),
              UiManager_1.UiManager.OpenView("FriendProcessView"))
            : (this.U6t(),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.UpdateFriendViewShow,
              )));
      }),
      (this.BelongView = e),
      (ModelManager_1.ModelManager.FriendModel.ShowingView = this.BelongView),
      (this.LZe = new Array(MAX_BUTTON_COUNT)),
      (this.A6t = new Array(MAX_BUTTON_INFO_COUNT)),
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
    ]),
      (this.BtnBindInfo = [[12, this.R6t]]);
  }
  OnStart() {
    (this.m6t = new ButtonAndTextItem_1.ButtonAndTextItem(this.GetItem(11))),
      (this.d6t = new TeamItem(this.GetItem(10))),
      this.m6t.BindCallback(this.nNt),
      (this.g6t = new PlayerHeadItem_1.PlayerHeadItem(
        this.GetItem(0).GetOwner(),
      )),
      (this.LZe[0] = new ButtonAndSpriteItem_1.ButtonAndSpriteItem(
        this.GetItem(7),
      )),
      (this.LZe[1] = new ButtonAndSpriteItem_1.ButtonAndSpriteItem(
        this.GetItem(6),
      )),
      (this.A6t[0] = new FunctionButtonInfo(
        "SP_RefuseFriend",
        this.S6t,
        this.I6t,
      )),
      (this.A6t[1] = new FunctionButtonInfo(
        "SP_RemoveFriend",
        this.M6t,
        this.D6t,
      )),
      (this.A6t[2] = new FunctionButtonInfo(
        "SP_AddFriend",
        this.E6t,
        this.L6t,
      )),
      (this.A6t[3] = new FunctionButtonInfo(
        "SP_AgreeFriend",
        this.y6t,
        this.T6t,
      )),
      (this.A6t[4] = new FunctionButtonInfo(
        "SP_ChatFriend",
        this.v6t,
        this.cJe,
      ));
  }
  Refresh(e, t, i) {
    this.Xqe(e.Id),
      e.OperationType === 1
        ? this.P6t()
        : (e.OperationType !== 2 && e.OperationType !== 3) || this.x6t();
  }
  RefreshMute() {
    const e = ModelManager_1.ModelManager.ChatModel.IsInMute(
      this.f6t().PlayerId,
    );
    this.GetItem(1).SetUIActive(e);
  }
  Xqe(e) {
    this.FriendInstanceId = e;
    e = this.f6t();
    this.w6t(),
      e &&
        (this.g6t.RefreshByHeadPhotoId(e.PlayerHeadPhoto),
        this.GetText(3).SetText("Lv." + e.PlayerLevel.toString())),
      this.B6t();
  }
  w6t() {
    this.RefreshMute(),
      this._Ge(),
      this.C4e(),
      this.b6t(),
      this.q6t(),
      this.x6t(),
      this.G6t(),
      this.N6t(),
      this.O6t();
  }
  N6t() {
    this.GetText(9).SetText(this.f6t().Signature),
      this.GetItem(13).SetUIActive(this.f6t().Signature.length > 0);
  }
  O6t() {
    let e = this.f6t().CurCard;
    e > 0 &&
      ((e = BackgroundCardById_1.configBackgroundCardById.GetConfig(e)),
      this.SetTextureByPath(e.LongCardPath, this.GetTexture(8)));
  }
  G6t() {
    ModelManager_1.ModelManager.FriendModel.FilterState !== 3
      ? this.d6t.SetActive(!1)
      : (this.d6t.SetActive(!0), this.d6t.RefreshView(this.f6t()));
  }
  k6t(e, t) {
    return (
      !!t.StateFunc() &&
      (e.GetRootItem().SetUIActive(!0),
      e.RefreshSprite(t.SpritePath),
      e.BindCallback(t.CallBack),
      !0)
    );
  }
  x6t() {
    let t = 0;
    let i, r;
    for (let e = 0; e < this.A6t.length && !(t >= MAX_BUTTON_COUNT); e++)
      (i = this.LZe[t]), (r = this.A6t[e]), this.k6t(i, r) && (t += 1);
    for (; t < this.LZe.length; t++) this.LZe[t].GetRootItem().SetUIActive(!1);
  }
  q6t() {
    let e = !1;
    this.BelongView !== "FriendView" ||
      (ModelManager_1.ModelManager.FriendModel.FilterState !== 1 &&
        ModelManager_1.ModelManager.FriendModel.FilterState !== 3) ||
      (e = !0),
      this.m6t.SetActive(e),
      e && this.F6t();
  }
  F6t() {
    this.m6t.RefreshEnable(
      this.f6t().PlayerIsOnline &&
        this.p6t() &&
        ModelManager_1.ModelManager.FunctionModel.IsOpen(10021),
    );
  }
  b6t() {
    ModelManager_1.ModelManager.FunctionModel.IsOpen(10021)
      ? this.f6t().PlayerIsOnline
        ? this.p6t()
          ? this.m6t.RefreshText("FriendApplyJoin")
          : this.m6t.RefreshText(
              "ApplyBtnDisable",
              this.f6t().WorldLevel -
                ModelManager_1.ModelManager.OnlineModel.EnterDiff,
            )
        : this.m6t.RefreshText("OfflineText")
      : this.m6t.RefreshText("FriendOnlineDisable");
  }
  p6t() {
    return ModelManager_1.ModelManager.OnlineModel.CanJoinOtherWorld(
      ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel,
      this.f6t().WorldLevel,
    );
  }
  C4e() {
    const e = this.GetText(2);
    FriendController_1.FriendController.CheckRemarkIsValid(
      this.f6t()?.FriendRemark ?? "",
    )
      ? e.SetText(`(${this.f6t().FriendRemark})`)
      : e.SetText(this.f6t()?.PlayerName ?? "");
  }
  _Ge() {}
  B6t() {
    let e;
    const t = this.f6t().PlayerIsOnline;
    const i = this.GetText(5);
    this.BelongView === "FriendBlackListView"
      ? i.SetText("")
      : t
        ? LguiUtil_1.LguiUtil.SetLocalText(i, "FriendOnline")
        : (e = this.f6t()).PlayerLastOfflineTime === 0
          ? i.SetText("")
          : ((e = FriendModel_1.FriendModel.GetOfflineStrAndGap(
              e.PlayerLastOfflineTime,
            )),
            LguiUtil_1.LguiUtil.SetLocalText(i, e[0], e[1])),
      (this.GetText(2).useChangeColor = !t),
      (this.GetText(3).useChangeColor = !t),
      (i.useChangeColor = !t),
      this.V6t();
  }
  V6t() {
    let e;
    const t = this.GetSprite(4);
    let i = !0;
    let r = void 0;
    this.BelongView === "FriendBlackListView"
      ? (i = !1)
      : (r = this.f6t().PlayerIsOnline
          ? "SP_FriendOnline"
          : "SP_FriendOffline"),
      t.SetUIActive(i),
      r &&
        ((e =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(r)),
        this.SetSpriteByPath(e, t, !1));
  }
  f6t() {
    return ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance(
      this.FriendInstanceId,
    );
  }
  U6t() {
    const e = ModelManager_1.ModelManager.FriendModel.FilterState;
    e === 1
      ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "FriendDeleteEach",
        )
      : e === 2 &&
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "FriendRequestOutOfDate",
        );
  }
  P6t() {
    ModelManager_1.ModelManager.FriendModel.CurrentApplyFriendListHasPlayer(
      this.FriendInstanceId,
    ) && this.x6t();
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
      e.TeamMemberCount >= 2 && this.GetItem(1).SetUIActive(!0),
      e.TeamMemberCount >= 3 && this.GetItem(2).SetUIActive(!0);
  }
}
// # sourceMappingURL=FriendItem.js.map
