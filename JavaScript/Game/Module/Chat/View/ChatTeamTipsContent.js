"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChatTeamTipsContent = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ChatContentBase_1 = require("./ChatContentBase");
class ChatTeamTipsContent extends ChatContentBase_1.ChatContentBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIText],
    ];
  }
  OnStart() {
    this.bl();
  }
  bl() {
    switch (this.ChatContentData.NoticeType) {
      case Protocol_1.Aki.Protocol.GFs.Proto_EnterTeam:
        var e = this.GetItem(1),
          t = this.GetItem(3),
          i = this.GetText(4),
          r = this.ChatContentData.SenderPlayerName;
        e.SetUIActive(!1),
          t.SetUIActive(!0),
          LguiUtil_1.LguiUtil.SetLocalText(i, "PlayerEnterTeam", r);
        break;
      case Protocol_1.Aki.Protocol.GFs.Proto_ExitTeam:
        (e = this.GetItem(1)),
          (t = this.GetItem(3)),
          (i = this.GetText(2)),
          (r = this.ChatContentData.SenderPlayerName);
        e.SetUIActive(!0),
          t.SetUIActive(!1),
          LguiUtil_1.LguiUtil.SetLocalText(i, "PlayerLeaveTeam", r);
    }
    this.sSt();
  }
  sSt() {
    var e = this.GetText(0),
      t = this.ChatContentData.TimeStamp,
      i = this.ChatContentData.LastTimeStamp,
      r = TimeUtil_1.TimeUtil.GetServerTime();
    t - i < ModelManager_1.ModelManager.ChatModel.ShowTimeDifferent && 0 !== i
      ? e.SetUIActive(!1)
      : ((i = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(t)),
        (t = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(r)),
        i.Day === t.Day
          ? (LguiUtil_1.LguiUtil.SetLocalText(e, "HourText", i.Hour, i.Minute),
            e.SetUIActive(!0))
          : i.Day !== t.Day && i.Year === t.Year
            ? (LguiUtil_1.LguiUtil.SetLocalText(
                e,
                "DayText",
                i.Month,
                i.Day,
                i.Hour,
                i.Minute,
              ),
              e.SetUIActive(!0))
            : i.Year !== t.Year
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
              : e.SetUIActive(!1));
  }
}
exports.ChatTeamTipsContent = ChatTeamTipsContent;
//# sourceMappingURL=ChatTeamTipsContent.js.map
