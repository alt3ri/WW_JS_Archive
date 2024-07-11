"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChatRoomItem = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  PlayerHeadItem_1 = require("../../Common/PlayerHeadItem"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  PrivateChatRoom_1 = require("../PrivateChatRoom"),
  TeamChatRoom_1 = require("../TeamChatRoom"),
  WorldTeamChatRoom_1 = require("../WorldTeamChatRoom");
class ChatRoomItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Eyt = void 0),
      (this.fye = 0),
      (this.pSt = void 0),
      (this.oSt = void 0),
      (this.oft = void 0),
      (this.Syt = (t) => {
        1 === t && this.oft && this.oft(this.Eyt, this.fye);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UISprite],
      [6, UE.UIItem],
      [7, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.Syt]]);
  }
  OnStart() {
    var t = this.GetItem(4);
    this.oSt = new PlayerHeadItem_1.PlayerHeadItem(t.GetOwner());
  }
  OnBeforeDestroy() {
    (this.pSt = void 0), (this.Eyt = void 0), (this.fye = 0);
  }
  Clear() {}
  Refresh(t, i, e) {
    if (
      (this.GetItem(6).SetUIActive(!1),
      this.GetItem(7).SetUIActive(!1),
      this.GetSprite(5).SetIsGray(!1),
      t instanceof PrivateChatRoom_1.PrivateChatRoom)
    ) {
      var s = t.GetTargetPlayerId();
      if (
        ((this.pSt = ModelManager_1.ModelManager.FriendModel.GetFriendById(s)),
        !this.pSt)
      )
        return;
      (this.Eyt = 1), (this.fye = this.pSt.PlayerId), this.RefreshIsOnline(t);
    } else
      t instanceof TeamChatRoom_1.TeamChatRoom
        ? ((this.pSt = void 0),
          (this.Eyt = 2),
          (this.fye = ModelManager_1.ModelManager.PlayerInfoModel.GetId()))
        : t instanceof WorldTeamChatRoom_1.WorldChatRoom &&
          ((this.pSt = void 0),
          (this.Eyt = 3),
          (this.fye = ModelManager_1.ModelManager.PlayerInfoModel.GetId()));
    s = t.GetIsShowRedDot();
    this.GetItem(2)?.SetUIActive(s),
      this.RefreshPlayerTexture(),
      this.K7e(),
      this.RefreshMuteItem(),
      i ? this.SetToggleState(1) : this.SetToggleState(0);
  }
  OnSelected(t) {
    this.SetToggleState(1), this.GetItem(2)?.SetUIActive(!1);
  }
  OnDeselected(t) {
    this.SetToggleState(0);
  }
  RefreshIsOnline(t) {
    var i = this.GetItem(6),
      t = t.IsOnline();
    i.SetUIActive(!t),
      this.GetSprite(5).SetIsGray(!t),
      this.GetItem(7).SetUIActive(t),
      this.oSt.SetIsGray(!t);
  }
  RefreshPlayerTexture() {
    var t,
      i = this.GetSprite(5);
    2 === this.Eyt || 3 === this.Eyt
      ? (i.SetUIActive(!0), this.oSt.SetActive(!1))
      : (i?.SetUIActive(!1),
        (i =
          this.pSt?.PlayerId ??
          ModelManager_1.ModelManager.PlayerInfoModel.GetId())
          ? (t =
              ModelManager_1.ModelManager.ChatModel.GetChatPlayerData(
                i,
              )?.GetPlayerIcon())
            ? this.oSt.RefreshByRoleIdUseCard(t)
            : this.oSt.RefreshByPlayerId(i, !0)
          : this.oSt.SetActive(!1));
  }
  K7e() {
    var t,
      i,
      e = this.GetText(1);
    2 === this.Eyt || 3 === this.Eyt
      ? LguiUtil_1.LguiUtil.SetLocalText(e, "CurrentTeam")
      : ((t = this.pSt.FriendRemark),
        StringUtils_1.StringUtils.IsEmpty(t)
          ? ((i = this.pSt.PlayerName), e.SetText(i))
          : e.SetText(t));
  }
  RefreshMuteItem() {
    var t,
      i = this.GetItem(3);
    this.pSt
      ? ((t = ModelManager_1.ModelManager.ChatModel.IsInMute(
          this.pSt.PlayerId,
        )),
        i.SetUIActive(t))
      : i.SetUIActive(!1);
  }
  BindOnClicked(t) {
    this.oft = t;
  }
  SetToggleState(t) {
    var i = this.GetExtendToggle(0);
    i && i.GetToggleState() !== t && i.SetToggleState(t, !1);
  }
}
exports.ChatRoomItem = ChatRoomItem;
//# sourceMappingURL=PrivateChatFriendItem.js.map
