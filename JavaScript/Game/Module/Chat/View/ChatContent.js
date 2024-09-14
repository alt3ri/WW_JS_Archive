"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChatContent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  PlayerHeadItem_1 = require("../../Common/PlayerHeadItem"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ChatContentBase_1 = require("./ChatContentBase");
class ChatContent extends ChatContentBase_1.ChatContentBase {
  constructor() {
    super(...arguments),
      (this.oSt = void 0),
      (this.SPe = void 0),
      (this.rSt = () => {
        this.nSt(), this.K7e(), this.LOn();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UITexture],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UITexture],
      [9, UE.UIText],
    ];
  }
  OnStart() {
    var e = this.GetItem(0);
    (this.oSt = new PlayerHeadItem_1.PlayerHeadItem(e.GetOwner())),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.bl(),
      this.Ore();
  }
  OnBeforeDestroy() {
    (this.oSt = void 0), this.kre();
  }
  Ore() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnChatPlayerInfoChanged,
      this.rSt,
    );
  }
  kre() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnChatPlayerInfoChanged,
      this.rSt,
    );
  }
  bl() {
    this.nSt(), this.Dke(), this.K7e(), this.sSt(), this.LOn(), this.qxa();
  }
  nSt() {
    var e = ModelManager_1.ModelManager.PersonalModel,
      t = this.ChatContentData.SenderPlayerId,
      i = e.GetPersonalInfoData();
    i && i.PlayerId === t
      ? this.oSt.RefreshByRoleIdUseCard(e.GetHeadPhotoId())
      : (i = ModelManager_1.ModelManager.ChatModel.GetChatPlayerData(t)) &&
        ((e = i?.GetPlayerIcon())
          ? this.oSt.RefreshByRoleIdUseCard(e)
          : this.oSt.RefreshByPlayerId(t, !0));
  }
  Dke() {
    var e,
      t,
      i,
      r = this.GetItem(5);
    const s = this.GetItem(3);
    this.ChatContentData.ContentType === Protocol_1.Aki.Protocol.p8n.DIs &&
      ((e = this.GetText(1)),
      (t = this.ChatContentData.Content),
      e.SetText(t),
      r.SetUIActive(!0),
      s.SetUIActive(!1)),
      this.ChatContentData.ContentType ===
        Protocol_1.Aki.Protocol.p8n.Proto_Emoji &&
        ((e = this.GetTexture(4)),
        (t = Number(this.ChatContentData.Content)),
        ((i = ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(t))
          ? ((i = i.ExpressionTexturePath),
            this.SetTextureByPath(i, e, void 0, (e) => {
              s.SetUIActive(e);
            }),
            r)
          : (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("Chat", 8, "表情表找不到对应的Id", [
                "expressionId",
                t,
              ]),
            r.SetUIActive(!1),
            s)
        ).SetUIActive(!1));
  }
  qxa() {
    if (
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()
    ) {
      let e = this.ChatContentData.PsOnlineId;
      var i = ModelManager_1.ModelManager.PersonalModel,
        r = this.ChatContentData.SenderPlayerId,
        s = i.GetPersonalInfoData();
      let t = void 0;
      s && s.PlayerId === r
        ? (t = i.GetPsnUserId())
        : (s = ModelManager_1.ModelManager.FriendModel.GetFriendById(r)) &&
          ((t = s.GetSdkUserId()), (e = s.GetSdkOnlineId()));
      i = "" !== t || (void 0 !== e && "" !== e);
      this.GetTexture(8)?.SetUIActive(i),
        this.GetItem(7)?.SetUIActive(i),
        this.GetText(9)?.SetUIActive(i),
        i && this.GetText(9)?.SetText(e);
    } else
      this.GetTexture(8)?.SetUIActive(!1),
        this.GetText(9)?.SetUIActive(!1),
        this.GetItem(7)?.SetUIActive(!1);
  }
  K7e() {
    var e = this.ChatContentData.SenderPlayerId,
      t = this.GetText(6),
      i = this.ChatContentData.ChatRoomType;
    if (2 === i || 3 === i) {
      i = ModelManager_1.ModelManager.PersonalModel.GetPersonalInfoData();
      if (i && i.PlayerId === e) t.SetText(i.Name);
      else {
        i = ModelManager_1.ModelManager.FriendModel.GetFriendById(e);
        if (i) {
          var r = i.FriendRemark;
          StringUtils_1.StringUtils.IsEmpty(r)
            ? t.SetText(i.PlayerName)
            : t.SetText(r);
        } else {
          i = ModelManager_1.ModelManager.ChatModel.GetChatPlayerData(e);
          if (!i) return void t.SetUIActive(!1);
          t.SetText(i.GetPlayerName());
        }
      }
      t.SetUIActive(!0);
    } else t.SetUIActive(!1);
  }
  sSt() {
    var e = this.GetText(2),
      t = this.ChatContentData.TimeStamp,
      i = this.ChatContentData.LastTimeStamp,
      r = TimeUtil_1.TimeUtil.GetServerTime();
    t - i < ModelManager_1.ModelManager.ChatModel.ShowTimeDifferent && 0 !== i
      ? e.SetUIActive(!1)
      : ((i = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(t)),
        (t = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(r)),
        i.Year === t.Year && i.Month === t.Month && i.Day === t.Day
          ? (LguiUtil_1.LguiUtil.SetLocalText(e, "HourText", i.Hour, i.Minute),
            e.SetUIActive(!0))
          : (i.Month === t.Month && i.Day === t.Day) || i.Year !== t.Year
            ? i.Year !== t.Year
              ? (LguiUtil_1.LguiUtil.SetLocalText(
                  e,
                  "YearText",
                  i.Year,
                  i.Month,
                  i.Day,
                  i.Hour,
                  i.Minute,
                ),
                e.SetUIActive(!0))
              : e.SetUIActive(!1)
            : (LguiUtil_1.LguiUtil.SetLocalText(
                e,
                "DayText",
                i.Month,
                i.Day,
                i.Hour,
                i.Minute,
              ),
              e.SetUIActive(!0)));
  }
  LOn() {
    this.SPe?.PlayLevelSequenceByName("Start");
  }
}
exports.ChatContent = ChatContent;
//# sourceMappingURL=ChatContent.js.map
