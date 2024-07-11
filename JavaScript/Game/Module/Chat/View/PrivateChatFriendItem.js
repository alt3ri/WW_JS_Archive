"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChatRoomItem = void 0);
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const PlayerHeadItem_1 = require("../../Common/PlayerHeadItem");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const PrivateChatRoom_1 = require("../PrivateChatRoom");
const TeamChatRoom_1 = require("../TeamChatRoom");
const WorldTeamChatRoom_1 = require("../WorldTeamChatRoom");
class ChatRoomItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.lEt = void 0),
      (this.fye = 0),
      (this.sSt = void 0),
      (this.WMt = void 0),
      (this.Wgt = void 0),
      (this._Et = (t) => {
        t === 1 && this.Wgt && this.Wgt(this.lEt, this.fye);
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
      (this.BtnBindInfo = [[0, this._Et]]);
  }
  OnStart() {
    const t = this.GetItem(4);
    this.WMt = new PlayerHeadItem_1.PlayerHeadItem(t.GetOwner());
  }
  OnBeforeDestroy() {
    (this.sSt = void 0), (this.lEt = void 0), (this.fye = 0);
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
        ((this.sSt = ModelManager_1.ModelManager.FriendModel.GetFriendById(s)),
        !this.sSt)
      )
        return;
      (this.lEt = 1), (this.fye = this.sSt.PlayerId), this.RefreshIsOnline(t);
    } else
      t instanceof TeamChatRoom_1.TeamChatRoom
        ? ((this.sSt = void 0),
          (this.lEt = 2),
          (this.fye = ModelManager_1.ModelManager.PlayerInfoModel.GetId()))
        : t instanceof WorldTeamChatRoom_1.WorldChatRoom &&
          ((this.sSt = void 0),
          (this.lEt = 3),
          (this.fye = ModelManager_1.ModelManager.PlayerInfoModel.GetId()));
    s = t.GetIsShowRedDot();
    this.GetItem(2)?.SetUIActive(s),
      this.RefreshPlayerTexture(),
      this.x9e(),
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
    const i = this.GetItem(6);
    var t = t.IsOnline();
    i.SetUIActive(!t),
      this.GetSprite(5).SetIsGray(!t),
      this.GetItem(7).SetUIActive(t),
      this.WMt.SetIsGray(!t);
  }
  RefreshPlayerTexture() {
    let t;
    let i = this.GetSprite(5);
    this.lEt === 2 || this.lEt === 3
      ? (i.SetUIActive(!0), this.WMt.SetActive(!1))
      : (i?.SetUIActive(!1),
        (i =
          this.sSt?.PlayerId ??
          ModelManager_1.ModelManager.PlayerInfoModel.GetId())
          ? (t =
              ModelManager_1.ModelManager.ChatModel.GetChatPlayerData(
                i,
              )?.GetPlayerIcon())
            ? this.WMt.RefreshByRoleIdUseCard(t)
            : this.WMt.RefreshByPlayerId(i, !0)
          : this.WMt.SetActive(!1));
  }
  x9e() {
    let t;
    let i;
    const e = this.GetText(1);
    this.lEt === 2 || this.lEt === 3
      ? LguiUtil_1.LguiUtil.SetLocalText(e, "CurrentTeam")
      : ((t = this.sSt.FriendRemark),
        StringUtils_1.StringUtils.IsEmpty(t)
          ? ((i = this.sSt.PlayerName), e.SetText(i))
          : e.SetText(t));
  }
  RefreshMuteItem() {
    let t;
    const i = this.GetItem(3);
    this.sSt
      ? ((t = ModelManager_1.ModelManager.ChatModel.IsInMute(
          this.sSt.PlayerId,
        )),
        i.SetUIActive(t))
      : i.SetUIActive(!1);
  }
  BindOnClicked(t) {
    this.Wgt = t;
  }
  SetToggleState(t) {
    const i = this.GetExtendToggle(0);
    i && i.GetToggleState() !== t && i.SetToggleState(t, !1);
  }
}
exports.ChatRoomItem = ChatRoomItem;
// # sourceMappingURL=PrivateChatFriendItem.js.map
