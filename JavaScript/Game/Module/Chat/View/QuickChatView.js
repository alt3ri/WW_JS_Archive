"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuickChatView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ChatController_1 = require("../ChatController"),
  PrivateChatRoom_1 = require("../PrivateChatRoom"),
  TeamChatRoom_1 = require("../TeamChatRoom"),
  WorldTeamChatRoom_1 = require("../WorldTeamChatRoom"),
  QuickChatText_1 = require("./QuickChatText");
class QuickChatView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.ChatInputMaxNum = 0),
      (this.mEt = []),
      (this.dEt = (e) => {
        var t = ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom();
        if (t) {
          if (t instanceof PrivateChatRoom_1.PrivateChatRoom) {
            t = t.GetTargetPlayerId();
            if (!t)
              return void (
                Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn("Chat", 5, "私聊对象玩家Id不存在", [
                  "targetPlayerId",
                  t,
                ])
              );
          }
          this.ISt(e, Protocol_1.Aki.Protocol.U3n.nMs), this.CloseMe();
        } else
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Chat", 5, "当前没有加入任何一个聊天室");
      }),
      (this.CEt = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[1, this.CEt]]);
  }
  OnStart() {
    (this.ChatInputMaxNum =
      CommonParamById_1.configCommonParamById.GetIntConfig("chat_character")),
      this.GetButton(1)?.RootUIComp.SetUIActive(!0),
      this.gEt();
  }
  gEt() {
    var e =
      ConfigManager_1.ConfigManager.ChatConfig.GetAllQuickChatConfigList();
    if (e) {
      var t = this.GetItem(3),
        r = this.GetItem(2),
        o = t.GetOwner();
      for (const l of e) {
        var i = LguiUtil_1.LguiUtil.DuplicateActor(o, r),
          i = new QuickChatText_1.QuickChatText(i),
          a = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            l.QuickChatContent,
          );
        i.Refresh(a),
          i.BindOnClicked(this.dEt),
          i.SetActive(!0),
          this.mEt.push(i);
      }
      t.SetUIActive(!1);
    }
  }
  ISt(e, t) {
    var r, o;
    StringUtils_1.StringUtils.IsEmpty(e)
      ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "InputChatContent",
        )
      : e.length > this.ChatInputMaxNum
        ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "ReachInputMaxNum",
            this.ChatInputMaxNum,
          )
        : (r = ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom())
          ? ((o = r.GetLastTimeStamp()),
            TimeUtil_1.TimeUtil.GetServerTime() - o <
            r.ChatCd / TimeUtil_1.TimeUtil.InverseMillisecond
              ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "ChatCdText",
                )
              : r instanceof PrivateChatRoom_1.PrivateChatRoom
                ? (o = r.GetTargetPlayerId())
                  ? ModelManager_1.ModelManager.FriendModel.HasBlockedPlayer(o)
                    ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                        "ChatRefuseText",
                      )
                    : ChatController_1.ChatController.PrivateChatRequest(
                        t,
                        e,
                        o,
                      )
                  : Log_1.Log.CheckWarn() &&
                    Log_1.Log.Warn("Chat", 8, "私聊对象玩家Id不存在", [
                      "targetPlayerId",
                      o,
                    ])
                : r instanceof TeamChatRoom_1.TeamChatRoom
                  ? ChatController_1.ChatController.ChannelChatRequest(
                      t,
                      e,
                      Protocol_1.Aki.Protocol.kGs.Proto_MatchTeam,
                    )
                  : r instanceof WorldTeamChatRoom_1.WorldChatRoom &&
                    ChatController_1.ChatController.ChannelChatRequest(
                      t,
                      e,
                      Protocol_1.Aki.Protocol.kGs.Proto_WorldTeam,
                    ))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Chat", 8, "当前没有加入任何一个聊天室");
  }
  OnBeforeDestroy() {
    this.fEt();
  }
  fEt() {
    for (const e of this.mEt) e.Destroy();
  }
}
exports.QuickChatView = QuickChatView;
//# sourceMappingURL=QuickChatView.js.map
