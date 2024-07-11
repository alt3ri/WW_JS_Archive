"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChatView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  InputKeyDisplayData_1 = require("../../../InputSettings/InputKeyDisplayData"),
  InputSettings_1 = require("../../../InputSettings/InputSettings"),
  InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  UiManager_1 = require("../../../Ui/UiManager"),
  FriendController_1 = require("../../Friend/FriendController"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  ChatController_1 = require("../ChatController"),
  ChatDefine_1 = require("../ChatDefine"),
  PrivateChatRoom_1 = require("../PrivateChatRoom"),
  TeamChatRoom_1 = require("../TeamChatRoom"),
  WorldTeamChatRoom_1 = require("../WorldTeamChatRoom"),
  ChatContent_1 = require("./ChatContent"),
  ChatTeamTipsContent_1 = require("./ChatTeamTipsContent"),
  PrivateChatFriendItem_1 = require("./PrivateChatFriendItem");
class ChatView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.TSt = []),
      (this.LSt = !1),
      (this.sze = void 0),
      (this.DSt = void 0),
      (this.RSt = void 0),
      (this.USt = []),
      (this.ChatInputMaxNum = 0),
      (this.ASt = !1),
      (this.PSt = !1),
      (this.xSt = void 0),
      (this.XPn = new InputKeyDisplayData_1.InputKeyDisplayData()),
      (this.cHe = () => this.wSt()),
      (this.BSt = (t) => {}),
      (this.bSt = (t) => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Chat", 8, "当聊天文本提交时", ["content", t]),
          this.qSt(t, Protocol_1.Aki.Protocol.l8n.SIs);
      }),
      (this.GSt = () => {}),
      (this.NSt = (t) => !0),
      (this.OSt = (t) => (
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "ReachInputMaxNum",
          this.ChatInputMaxNum,
        ),
        !0
      )),
      (this.kSt = (t) => {
        var e;
        0 <= t.Y
          ? (this.LSt = !0)
          : this.LSt &&
            !ChatController_1.ChatController.IsInRequestHistory &&
            ((this.LSt = !1),
            (e = (t =
              ModelManager_1.ModelManager
                .ChatModel).GetJoinedChatRoom()) instanceof
              PrivateChatRoom_1.PrivateChatRoom) &&
            t.RequestPrivateRoomLocalHistory(e);
      }),
      (this.FSt = (t, e) => {
        this.ASt &&
          0 === e &&
          !(e = this.GetInputText(2)).IsInputActive() &&
          e.ActivateInputText();
      }),
      (this.VSt = (t) => {}),
      (this.HSt = (t) => {
        var e = ModelManager_1.ModelManager.ChatModel.GetAllSortedChatRoom(),
          i =
            (this.jSt(e),
            ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom());
        i &&
          (this.WSt(i, e), i.GetUniqueId() === t.GetUniqueId()) &&
          (i instanceof PrivateChatRoom_1.PrivateChatRoom
            ? this.KSt(i)
            : this.QSt(i),
          this.XSt(!0));
      }),
      (this.$St = (t, e) => {
        var i,
          s = ModelManager_1.ModelManager.ChatModel,
          r = s.GetJoinedChatRoom();
        r &&
          ((i = r.GetUniqueId()),
          (t = t.GetUniqueId()),
          (s = s.GetAllSortedChatRoom()),
          this.jSt(s),
          this.WSt(r, s),
          i === t) &&
          this.YSt(e, (t) => {
            this.XSt(!0), this.JSt(ChatDefine_1.CHAT_SCROLL_DELAY);
          });
      }),
      (this.Uze = () => {
        this.xSt.SetScrollProgress(1), (this.PSt = !1);
      }),
      (this.zSt = (t) => {
        var e;
        ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom().GetUniqueId() ===
          t.GetUniqueId() &&
          ((e = ModelManager_1.ModelManager.ChatModel.GetAllSortedChatRoom()),
          t instanceof PrivateChatRoom_1.PrivateChatRoom
            ? (this.KSt(t), this.WSt(t, e))
            : (t instanceof TeamChatRoom_1.TeamChatRoom ||
                t instanceof WorldTeamChatRoom_1.WorldChatRoom) &&
              (this.QSt(t), this.WSt(t, e)),
          this.XSt(!0));
      }),
      (this.ZSt = (t) => {
        var e;
        t instanceof PrivateChatRoom_1.PrivateChatRoom &&
          ((this.PSt = !1),
          (e = ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom())
            ? e.GetUniqueId() === t.GetUniqueId() && (this.eyt(t), this.XSt(!0))
            : ((e =
                ModelManager_1.ModelManager.ChatModel.GetAllSortedChatRoom()),
              this.jSt(e),
              this.tyt(t)));
      }),
      (this.iyt = (t) => {
        var e = ModelManager_1.ModelManager.ChatModel.GetAllSortedChatRoom(),
          e = (this.jSt(e), this.oyt(e));
        e ? (1 === e.ChatRoomType ? this.KSt(e) : this.QSt(e)) : this.XSt(!1);
      }),
      (this.r7e = (t) => {
        var e = ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom();
        if (e) {
          if (e instanceof PrivateChatRoom_1.PrivateChatRoom) {
            e = e.GetTargetPlayerId();
            if (!e)
              return void (
                Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn("Chat", 8, "私聊对象玩家Id不存在", [
                  "targetPlayerId",
                  e,
                ])
              );
          }
          this.qSt(t.toString(), Protocol_1.Aki.Protocol.l8n.Proto_Emoji);
        } else
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Chat", 8, "当前没有加入任何一个聊天室");
      }),
      (this.ryt = () => {
        UiManager_1.UiManager.OpenView("SelectedFriendChatView");
      }),
      (this.nyt = () => {
        UiManager_1.UiManager.OpenView("ChatExpressionView");
      }),
      (this.syt = () => {
        UiManager_1.UiManager.OpenView("QuickChatView");
      }),
      (this.ayt = () => {
        var t = this.GetInputText(2).GetText();
        this.qSt(t, Protocol_1.Aki.Protocol.l8n.SIs);
      }),
      (this.hyt = () => {
        var t = ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom();
        t &&
          this.GetButton(8)
            .GetOwner()
            .GetComponentByClass(UE.UIItem.StaticClass()) &&
          t instanceof PrivateChatRoom_1.PrivateChatRoom &&
          ((t = t.GetTargetPlayerId()),
          UiManager_1.UiManager.OpenView("ChatOption", t));
      }),
      (this.lyt = () => {
        UiManager_1.UiManager.CloseView("ChatView");
      }),
      (this._yt = () => {
        var t = ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom();
        t &&
          t instanceof PrivateChatRoom_1.PrivateChatRoom &&
          ((t = t.GetTargetPlayerId()),
          ModelManager_1.ModelManager.FriendModel.ClearFriendSearchResults(),
          FriendController_1.FriendController.RequestSearchPlayerBasicInfo(t));
      }),
      (this.uyt = (t) => {
        t = ModelManager_1.ModelManager.ChatModel.GetPrivateChatRoom(t);
        t && (this.cyt(t), this.K7e(t));
      }),
      (this.MSt = (t) => {
        var t = ModelManager_1.ModelManager.ChatModel.GetPrivateChatRoom(t);
        !t ||
          (t = this.USt.indexOf(t)) < 0 ||
          this.RSt.UnsafeGetGridProxy(t)?.RefreshMuteItem();
      }),
      (this.rSt = (t) => {
        var t = ModelManager_1.ModelManager.ChatModel.GetPrivateChatRoom(t);
        !t ||
          (t = this.USt.indexOf(t)) < 0 ||
          this.RSt.UnsafeGetGridProxy(t)?.RefreshPlayerTexture();
      }),
      (this.XBo = () => {
        this.$Pn();
      }),
      (this.myt = (t, e) => {
        var i = ModelManager_1.ModelManager.ChatModel;
        let s = void 0;
        switch (t) {
          case 1:
            if (!ModelManager_1.ModelManager.FriendModel.GetFriendById(e))
              return;
            (s = i.GetPrivateChatRoom(e)) instanceof
              PrivateChatRoom_1.PrivateChatRoom && this.tyt(s);
            break;
          case 2:
            (s = i.GetTeamChatRoom()), this.dyt();
            break;
          case 3:
            (s = i.GetWorldChatRoom()), this.Cyt();
        }
        s && this.WSt(s, this.USt),
          this.GetItem(11)
            .GetOwner()
            .GetComponentByClass(UE.UIInturnAnimController.StaticClass())
            .Play();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UITextInputComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
      [17, UE.UIItem],
      [7, UE.UIText],
      [6, UE.UIText],
      [8, UE.UIButtonComponent],
      [9, UE.UIButtonComponent],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIScrollViewWithScrollbarComponent],
      [15, UE.UILoopScrollViewComponent],
      [16, UE.UIButtonComponent],
      [18, UE.UIText],
      [19, UE.UIItem],
      [20, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.ryt],
        [1, this.nyt],
        [3, this.syt],
        [4, this.ayt],
        [8, this.hyt],
        [9, this.lyt],
        [16, this.lyt],
      ]);
  }
  OnStart() {
    (this.xSt = this.GetScrollViewWithScrollbar(14)),
      (this.ChatInputMaxNum =
        CommonParamById_1.configCommonParamById.GetIntConfig("chat_character")),
      (this.GetInputText(2).MaxInput = this.ChatInputMaxNum),
      this.GetItem(10).SetUIActive(!1);
    var t = this.GetItem(10).GetOwner(),
      t =
        ((this.RSt = new LoopScrollView_1.LoopScrollView(
          this.GetLoopScrollViewComponent(15),
          t,
          this.cHe,
        )),
        ModelManager_1.ModelManager.ChatModel),
      e = t.GetAllSortedChatRoom();
    this.jSt(e);
    let i = t.GetJoinedChatRoom();
    (i = i || this.oyt(e)) instanceof PrivateChatRoom_1.PrivateChatRoom
      ? this.KSt(i)
      : this.QSt(i),
      this.XSt(void 0 !== i),
      this.gyt(),
      this.$Pn(),
      this.Ore();
  }
  OnBeforeDestroy() {
    this.fyt(),
      this.xze(),
      this.pyt(),
      ModelManager_1.ModelManager.ChatModel.LeaveCurrentChatRoom(),
      this.kre(),
      this.RSt.ClearGridProxies(),
      (this.RSt = void 0),
      (this.USt.length = 0),
      (this.PSt = !1),
      (this.xSt = void 0);
  }
  OnTick(t) {
    this.PSt && this.xSt.SetScrollProgress(1);
  }
  Ore() {
    var t = this.GetInputText(2);
    t.OnTextChange.Bind(this.BSt),
      t.OnTextSubmit.Bind(this.bSt),
      t.OnInputActivateDelegate.Bind(this.GSt),
      t.OnCheckTextInputDelegate.Bind(this.NSt),
      t.OnTextClip.Bind(this.OSt),
      this.xSt.OnScrollValueChange.Bind(this.kSt),
      InputDistributeController_1.InputDistributeController.BindAction(
        InputMappingsDefine_1.actionMappings.激活聊天,
        this.FSt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCreatePrivateChatRoom,
        this.VSt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnJoinChatRoom,
        this.zSt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAddHistoryChatContentCompleted,
        this.ZSt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnOpenChatRoom,
        this.HSt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAddChatContent,
        this.$St,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRemovePrivateChatRoom,
        this.iyt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnClosePrivateChatRoom,
        this.iyt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSelectExpression,
        this.r7e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SearchPlayerInfo,
        this.uyt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAddMutePlayer,
        this.MSt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRemoveMutePlayer,
        this.MSt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChatPlayerInfoChanged,
        this.rSt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.InputControllerChange,
        this.XBo,
      );
  }
  kre() {
    var t = this.GetInputText(2);
    t.OnTextChange.Unbind(),
      t.OnTextSubmit.Unbind(),
      t.OnInputActivateDelegate.Unbind(),
      t.OnCheckTextInputDelegate.Unbind(),
      this.xSt.OnScrollValueChange.Unbind(),
      InputDistributeController_1.InputDistributeController.UnBindAction(
        InputMappingsDefine_1.actionMappings.激活聊天,
        this.FSt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCreatePrivateChatRoom,
        this.VSt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnJoinChatRoom,
        this.zSt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAddHistoryChatContentCompleted,
        this.ZSt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnOpenChatRoom,
        this.HSt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAddChatContent,
        this.$St,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRemovePrivateChatRoom,
        this.iyt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnClosePrivateChatRoom,
        this.iyt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSelectExpression,
        this.r7e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SearchPlayerInfo,
        this.uyt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAddMutePlayer,
        this.MSt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRemoveMutePlayer,
        this.MSt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChatPlayerInfoChanged,
        this.rSt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.InputControllerChange,
        this.XBo,
      );
  }
  JSt(t) {
    (this.PSt = !0),
      this.xze(),
      (this.sze = TimerSystem_1.TimerSystem.Delay(this.Uze, t));
  }
  xze() {
    TimerSystem_1.TimerSystem.Has(this.sze) &&
      TimerSystem_1.TimerSystem.Remove(this.sze);
  }
  $Pn() {
    var e = this.GetText(18);
    if (
      InputSettingsManager_1.InputSettingsManager.GetActionKeyDisplayData(
        this.XPn,
        InputMappingsDefine_1.actionMappings.激活聊天,
      )
    ) {
      var i = this.XPn.GetDisplayKeyNameList();
      if (i) {
        let t = "";
        for (const r of i) {
          var s = InputSettings_1.InputSettings.GetKeyIconPath(r);
          t += `<texture=${s}>`;
        }
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, "SendChatText", t);
      } else
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          e,
          "PrefabTextItem_1493640674_Text",
        );
    } else
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, "PrefabTextItem_1493640674_Text");
  }
  qSt(t, e) {
    if (StringUtils_1.StringUtils.IsEmpty(t))
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "InputChatContent",
      );
    else if (t.length > this.ChatInputMaxNum)
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "ReachInputMaxNum",
        this.ChatInputMaxNum,
      );
    else {
      var i = ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom();
      if (i) {
        var s = i.GetLastTimeStamp();
        if (
          TimeUtil_1.TimeUtil.GetServerTime() - s <
          i.ChatCd / TimeUtil_1.TimeUtil.InverseMillisecond
        )
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "ChatCdText",
          );
        else {
          if (i instanceof PrivateChatRoom_1.PrivateChatRoom) {
            s = i.GetTargetPlayerId();
            if (!s)
              return void (
                Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn("Chat", 8, "私聊对象玩家Id不存在", [
                  "targetPlayerId",
                  s,
                ])
              );
            if (ModelManager_1.ModelManager.FriendModel.HasBlockedPlayer(s))
              return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "ChatRefuseText",
              );
            ChatController_1.ChatController.PrivateChatRequest(e, t, s);
          } else
            i instanceof TeamChatRoom_1.TeamChatRoom
              ? ChatController_1.ChatController.ChannelChatRequest(
                  e,
                  t,
                  Protocol_1.Aki.Protocol.DFs.Proto_MatchTeam,
                )
              : i instanceof WorldTeamChatRoom_1.WorldChatRoom &&
                ChatController_1.ChatController.ChannelChatRequest(
                  e,
                  t,
                  Protocol_1.Aki.Protocol.DFs.Proto_WorldTeam,
                );
          this.GetInputText(2).SetText("", !1);
        }
      } else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Chat", 8, "当前没有加入任何一个聊天室");
    }
  }
  XSt(t) {
    var e = this.GetItem(12),
      i = this.GetItem(13);
    e.SetUIActive(t), i.SetUIActive(!t), (this.ASt = t);
  }
  vyt(t) {
    this.GetButton(8).GetOwner().GetUIItem()?.SetUIActive(t);
  }
  KSt(t) {
    var e;
    t &&
      t.CanChat() &&
      ((e = ModelManager_1.ModelManager.ChatModel.GetAllSortedChatRoom()),
      this.cyt(t, !0),
      this.K7e(t),
      this.WSt(t, e),
      this.eyt(t),
      this.vyt(!0),
      this.XSt(!0));
  }
  QSt(t) {
    var e;
    t &&
      ((e = ModelManager_1.ModelManager.ChatModel.GetAllSortedChatRoom()),
      this.WSt(t, e),
      this.eyt(t),
      this.cyt(void 0, !1),
      this.K7e(void 0, !0),
      this.vyt(!1),
      this.XSt(!0));
  }
  eyt(t) {
    this.fyt();
    t = t.GetChatContentList();
    this.Myt(t);
  }
  Myt(e, i = 0) {
    var t = e[i];
    t
      ? this.YSt(t, (t) => {
          i >= e.length
            ? this.JSt(ChatDefine_1.FIRST_CHAT_SCROLL_DELAY)
            : this.Myt(e, i + 1);
        })
      : this.JSt(ChatDefine_1.FIRST_CHAT_SCROLL_DELAY);
  }
  YSt(t, e) {
    var i = this.GetItem(11);
    let s = void 0;
    return (
      (s =
        t.NoticeType === Protocol_1.Aki.Protocol.PFs.Proto_EnterTeam ||
        t.NoticeType === Protocol_1.Aki.Protocol.PFs.Proto_ExitTeam
          ? new ChatTeamTipsContent_1.ChatTeamTipsContent(
              ChatDefine_1.TEAM_CONTENT_RESOURCE_ID,
              i,
              t,
              e,
            )
          : t.IsOwnSend()
            ? new ChatContent_1.ChatContent(
                ChatDefine_1.OWN_CHAT_CONTENT_RESOURCE_ID,
                i,
                t,
                e,
              )
            : new ChatContent_1.ChatContent(
                ChatDefine_1.CHAT_CONTENT_RESOURCE_ID,
                i,
                t,
                e,
              )),
      this.TSt.push(s),
      s
    );
  }
  fyt() {
    for (const t of this.TSt) t.Destroy();
    this.TSt.length = 0;
  }
  WSt(t, e) {
    !t || (e = e.indexOf(t)) < 0 || this.RSt.SelectGridProxy(e);
  }
  cyt(t, e = !0) {
    var i = this.GetItem(5),
      s = this.GetItem(17);
    e
      ? (i.SetUIActive(!1),
        s.SetUIActive(!1),
        !t ||
          (e = this.USt.indexOf(t)) < 0 ||
          this.RSt.UnsafeGetGridProxy(e)?.RefreshIsOnline(t))
      : (i.SetUIActive(!1), s.SetUIActive(!1));
  }
  K7e(t, e = !1) {
    var i = this.GetText(7),
      s = this.GetText(6);
    e
      ? (LguiUtil_1.LguiUtil.SetLocalText(i, "CurrentTeam"), s.SetUIActive(!1))
      : ((e = t.GetPlayerName()),
        (t = t.GetPlayerRemarks()),
        s.SetUIActive(!1),
        t
          ? (i.SetText(t), i?.SetColor(ChatDefine_1.playerMarkNameColor))
          : (i.SetText(e), i.SetColor(ChatDefine_1.playerRealNameColor)));
  }
  gyt() {
    this.pyt();
    var t = ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom();
    t &&
      t instanceof PrivateChatRoom_1.PrivateChatRoom &&
      (this.DSt = TimerSystem_1.TimerSystem.Forever(
        this._yt,
        ChatDefine_1.REFRESH_PLAYER_INFO_TIME_DOWN,
      ));
  }
  pyt() {
    TimerSystem_1.TimerSystem.Has(this.DSt) &&
      (TimerSystem_1.TimerSystem.Remove(this.DSt), (this.DSt = void 0));
  }
  jSt(t) {
    (this.USt = t), this.RSt?.RefreshByData(t);
  }
  wSt() {
    var t = new PrivateChatFriendItem_1.ChatRoomItem();
    return t.BindOnClicked(this.myt), t;
  }
  tyt(t) {
    var e,
      i = ModelManager_1.ModelManager.ChatModel,
      s = t.GetTargetPlayerId();
    !s ||
      !t.CanChat() ||
      ((e = i.GetJoinedChatRoom()) instanceof
        PrivateChatRoom_1.PrivateChatRoom &&
        e.GetTargetPlayerId() === s) ||
      i.JoinChatRoom(t);
  }
  dyt() {
    var t = ModelManager_1.ModelManager.ChatModel,
      e = t.GetTeamChatRoom();
    e
      ? t.JoinChatRoom(e)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Chat", 5, "加入队伍聊天室失败，聊天室未初始化");
  }
  Cyt() {
    var t = ModelManager_1.ModelManager.ChatModel,
      e = t.GetWorldChatRoom();
    e
      ? t.JoinChatRoom(e)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Chat", 5, "加入世界聊天室失败，聊天室未初始化");
  }
  oyt(t) {
    for (const e of t)
      if (e instanceof PrivateChatRoom_1.PrivateChatRoom) {
        if (e.CanChat()) return this.tyt(e), e;
      } else {
        if (e instanceof TeamChatRoom_1.TeamChatRoom) return this.dyt(), e;
        if (e instanceof WorldTeamChatRoom_1.WorldChatRoom)
          return this.Cyt(), e;
      }
  }
}
exports.ChatView = ChatView;
//# sourceMappingURL=ChatView.js.map
