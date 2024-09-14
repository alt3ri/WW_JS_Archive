"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChatRowItem = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  BattleChildView_1 = require("./BattleChildView/BattleChildView");
class ChatRowItem extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments), (this.jst = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIHorizontalLayout],
      [4, UE.UIText],
      [3, UE.UIText],
      [1, UE.UISprite],
      [2, UE.UISprite],
    ];
  }
  Initialize(t) {
    super.Initialize(), (this.jst = t);
    var i = this.GetText(4),
      e = this.GetSprite(1),
      r = this.GetSprite(2),
      a = this.GetText(3),
      o = ModelManager_1.ModelManager.FriendModel,
      l = ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
      _ = t.SenderPlayerId,
      T = t.TargetPlayerId,
      u = t.Content;
    let g = void 0;
    if (1 === t.ContentChatRoomType) {
      if (!T) return;
      o = o.GetFriendById(T);
      if (!o) return;
      (g = `<color=#e5d5a1>[${(g = o.PlayerName)}]</color>`),
        LguiUtil_1.LguiUtil.SetLocalTextNew(a, "Text_FriendTag_Text"),
        e?.SetUIActive(!0),
        r?.SetUIActive(!1);
    } else {
      T =
        ModelManager_1.ModelManager.OnlineModel?.GetCurrentTeamListById(
          _,
        )?.PlayerNumber;
      (g = `<color=#aadcef>[${T}P][${(g = t.SenderPlayerName)}]</color>`),
        LguiUtil_1.LguiUtil.SetLocalTextNew(a, "Text_TeamTag_Text"),
        e?.SetUIActive(!1),
        r?.SetUIActive(!0);
    }
    if (
      (t.ContentType === Protocol_1.Aki.Protocol.p8n.DIs &&
        (1 === t.ContentChatRoomType
          ? l === _
            ? LguiUtil_1.LguiUtil.SetLocalTextNew(
                i,
                "Text_TalkToFriendWithOutTag_Text",
                g,
                u,
              )
            : LguiUtil_1.LguiUtil.SetLocalTextNew(
                i,
                "Text_FriendTalkToMeExpressionWithOutTag_Text",
                g,
                u,
              )
          : LguiUtil_1.LguiUtil.SetLocalTextNew(
              i,
              "Text_TeamTalkWithoutTag_Text",
              g,
              u,
            ),
        i.SetUIActive(!0),
        (i.bBestFit = !1)),
      t.ContentType === Protocol_1.Aki.Protocol.p8n.Proto_Emoji)
    ) {
      (o = Number(t.Content)),
        (T = ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(o));
      let e = "";
      if (T) {
        a = T.ExpressionTexturePath;
        if (!a) return;
        e = `<texture=${a},0.3/>`;
      }
      1 === t.ContentChatRoomType
        ? l === _
          ? LguiUtil_1.LguiUtil.SetLocalTextNew(
              i,
              "Text_TalkToFriendWithOutTag_Text",
              g,
              e,
            )
          : LguiUtil_1.LguiUtil.SetLocalTextNew(
              i,
              "Text_FriendTalkToMeExpressionWithOutTag_Text",
              g,
              e,
            )
        : LguiUtil_1.LguiUtil.SetLocalTextNew(
            i,
            "Text_TeamTalkWithoutTag_Text",
            g,
            e,
          ),
        i.SetUIActive(!0),
        this.GetHorizontalLayout(0)?.SetAlign(6);
    }
  }
  Reset() {
    super.Reset();
  }
  GetChatRowData() {
    return this.jst;
  }
}
exports.ChatRowItem = ChatRowItem;
//# sourceMappingURL=ChatRowItem.js.map
