"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuickChatView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ChatController_1 = require("../ChatController");
const PrivateChatRoom_1 = require("../PrivateChatRoom");
const TeamChatRoom_1 = require("../TeamChatRoom");
const WorldTeamChatRoom_1 = require("../WorldTeamChatRoom");
const QuickChatText_1 = require("./QuickChatText");
class QuickChatView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.ChatInputMaxNum = 0),
      (this.mEt = []),
      (this.dEt = (e) => {
        let t = ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom();
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
    const e =
      ConfigManager_1.ConfigManager.ChatConfig.GetAllQuickChatConfigList();
    if (e) {
      const t = this.GetItem(3);
      const r = this.GetItem(2);
      const o = t.GetOwner();
      for (const l of e) {
        var i = LguiUtil_1.LguiUtil.DuplicateActor(o, r);
        var i = new QuickChatText_1.QuickChatText(i);
        const a = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
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
    let r, o;
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
// # sourceMappingURL=QuickChatView.js.map
