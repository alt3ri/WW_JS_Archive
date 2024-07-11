"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FriendController = exports.FriendItemSt = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ChatController_1 = require("../Chat/ChatController"),
  LoginDefine_1 = require("../Login/Data/LoginDefine"),
  FriendDefine_1 = require("./Data/FriendDefine"),
  FriendData_1 = require("./FriendData"),
  CHECKGAP = 3e4,
  APPLYFRIENDCD = 1e3,
  SERVERREQUESTCD = 2500;
class FriendItemSt {
  constructor() {
    (this.Id = 0), (this.OperationType = 0);
  }
}
exports.FriendItemSt = FriendItemSt;
class FriendController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return this.OnAddEvents(), this.OnRegisterNetEvent(), !0;
  }
  static OnClear() {
    return (
      this.OnRemoveEvents(),
      this.OnUnRegisterNetEvent(),
      this.R6t(),
      (this.U6t = !1),
      !(this.A6t = !1)
    );
  }
  static P3e() {
    this.R6t(),
      (FriendController.P6t = TimerSystem_1.TimerSystem.Forever(
        FriendController.x6t,
        CHECKGAP,
      ));
  }
  static R6t() {
    void 0 !== FriendController.P6t &&
      (TimerSystem_1.TimerSystem.Remove(FriendController.P6t),
      (FriendController.P6t = void 0));
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ChangeModeFinish,
      FriendController.nye,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        FriendController.nye,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLoadingNetDataDone,
        FriendController.Q5e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RedDotStart,
        FriendController.w6t,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.LoadTestFriendsByGm,
        FriendController.B6t,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ChangeModeFinish,
      FriendController.nye,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        FriendController.nye,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLoadingNetDataDone,
        FriendController.Q5e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RedDotStart,
        FriendController.w6t,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.LoadTestFriendsByGm,
        FriendController.B6t,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(3781, FriendController.b6t),
      Net_1.Net.Register(29640, FriendController.q6t),
      Net_1.Net.Register(7162, FriendController.G6t),
      Net_1.Net.Register(2916, FriendController.N6t);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(3781),
      Net_1.Net.UnRegister(29640),
      Net_1.Net.UnRegister(7162),
      Net_1.Net.UnRegister(2916);
  }
  static RequestFriendApplyAddSend(e, r) {
    if (
      0 !== FriendController.O6t &&
      Time_1.Time.Now - FriendController.O6t <= APPLYFRIENDCD
    )
      return;
    this.O6t = Time_1.Time.Now;
    const o = new Protocol_1.Aki.Protocol.Lrs();
    (o.J4n = e),
      (o.NVn = r),
      Net_1.Net.Call(2770, o, (e) => {
        if (
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Friend",
              28,
              "协议接收",
              ["协议id", "9408" + Protocol_1.Aki.Protocol.Rrs.name],
              ["response", e],
            ),
          e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs)
        ) {
          if (
            e.O4n ===
            Protocol_1.Aki.Protocol.O4n.Proto_ErrReceiverApplyListCountMax
          )
            return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "RecipientFriendListFull",
            );
          if (e.O4n === Protocol_1.Aki.Protocol.O4n.Proto_ErrFriendApplySended)
            return (
              ModelManager_1.ModelManager.FriendModel.AddPlayerToApplyFriendList(
                o.J4n,
              ),
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "FriendApplicationSent",
              ),
              void EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.ApplicationSent,
                o.J4n,
              )
            );
          if (
            e.O4n ===
            Protocol_1.Aki.Protocol.O4n.Proto_ErrAlreadyOnFriendApplyList
          )
            return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "FriendApplicationSent",
            );
          if (e.O4n === Protocol_1.Aki.Protocol.O4n.Proto_ErrIsBlockedPlayer)
            return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "IsBlockedPlayer",
            );
          if (e.O4n === Protocol_1.Aki.Protocol.O4n.Proto_ErrYouAreBlocked)
            return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "YouAreBlocked",
            );
          if (
            e.O4n ===
            Protocol_1.Aki.Protocol.O4n.Proto_ErrFriendApplyRequestLimit
          )
            return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "ApplicationTimesLimit",
            );
          if (
            e.O4n === Protocol_1.Aki.Protocol.O4n.Proto_ErrAlreadyOnFriendList
          )
            return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "AlreadyOnFriendList",
            );
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.O4n,
            19773,
          );
        }
        ModelManager_1.ModelManager.FriendModel.AddPlayerToApplyFriendList(
          o.J4n,
        ),
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "FriendApplicationSent",
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ApplicationSent,
            o.J4n,
          );
      });
  }
  static RequestFriendApplyHandle(a, v) {
    const s = new Protocol_1.Aki.Protocol.Drs();
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Friend", 28, "协议接收", ["数据长度", a.length]),
      0 === a.length
        ? (EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.FriendApplicationListUpdate,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshFriendApplicationRedDot,
          ))
        : ((s.IVn = a),
          (s.kVn = v),
          Net_1.Net.Call(24943, s, (e) => {
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Friend", 28, "协议接收", [
                "协议id",
                "9410" + Protocol_1.Aki.Protocol.Ars.name,
              ]);
            let r = FriendController.k6t(e.O4n);
            var o = 1 < s.IVn.length;
            let n = 0;
            if (s.kVn === Protocol_1.Aki.Protocol.E5s.Proto_Approve)
              for (const _ of Object.keys(e.AUs)) {
                var t,
                  l = e.AUs[_];
                l === Protocol_1.Aki.Protocol.O4n.NRs
                  ? (t =
                      ModelManager_1.ModelManager.FriendModel.GetFriendDataInApplicationById(
                        Number(_),
                      )) && ModelManager_1.ModelManager.FriendModel.AddFriend(t)
                  : "" === r && (r = FriendController.k6t(l));
              }
            for (const d of Object.keys(e.AUs)) {
              var i = e.AUs[d];
              i === Protocol_1.Aki.Protocol.O4n.NRs
                ? (n++,
                  ModelManager_1.ModelManager.FriendModel.DeleteFriendApplication(
                    Number(d),
                  ),
                  s.kVn === Protocol_1.Aki.Protocol.E5s.Proto_Approve
                    ? ModelManager_1.ModelManager.FriendModel.AddPlayerToApproveFriendList(
                        Number(d),
                      )
                    : s.kVn === Protocol_1.Aki.Protocol.E5s.Proto_Reject &&
                      ModelManager_1.ModelManager.FriendModel.AddPlayerToRefuseFriendList(
                        Number(d),
                      ))
                : "" === r && (r = FriendController.k6t(i));
            }
            "" === r ||
              (o && 0 !== n) ||
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                r,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.FriendApplicationListUpdate,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RefreshFriendApplicationRedDot,
              ),
              v === Protocol_1.Aki.Protocol.E5s.Proto_Reject
                ? EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.ApplicationHandled,
                    3,
                    a,
                  )
                : v === Protocol_1.Aki.Protocol.E5s.Proto_Approve &&
                  EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.ApplicationHandled,
                    2,
                    a,
                  );
          }));
  }
  static k6t(e) {
    return e !== Protocol_1.Aki.Protocol.O4n.NRs
      ? e === Protocol_1.Aki.Protocol.O4n.Proto_ErrInitiatorFriendListCountMax
        ? "ApplicantFriendListFull"
        : e === Protocol_1.Aki.Protocol.O4n.Proto_ErrFriendListCountMax
          ? "FriendListFull"
          : "FriendApplicationInvalid"
      : "";
  }
  static LocalRemoveApplicationFriend(e) {
    ModelManager_1.ModelManager.FriendModel.DeleteFriendApplication(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.FriendApplicationListUpdate,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshFriendApplicationRedDot,
      );
  }
  static RequestFriendDelete(r) {
    var e = new Protocol_1.Aki.Protocol.wrs();
    (e.J4n = r),
      Net_1.Net.Call(4136, e, (e) => {
        if (
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Friend", 28, "协议接收", [
              "协议id",
              "9414" + Protocol_1.Aki.Protocol.xrs.name,
            ]),
          e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs)
        )
          return e.O4n === Protocol_1.Aki.Protocol.O4n.Proto_ErrNotOnFriendList
            ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "NotOnFriendList",
              ),
              void EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.UpdateFriendViewShow,
              ))
            : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                8910,
              );
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "FriendDeleteSuccess",
        ),
          ModelManager_1.ModelManager.FriendModel.DeleteFriend(r),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.UpdateFriendViewShow,
          );
      });
  }
  static RequestSearchPlayerBasicInfo(e) {
    var r = new Protocol_1.Aki.Protocol.cYn();
    (r.J4n = e),
      Net_1.Net.Call(12774, r, (e) => {
        if (
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Friend", 28, "协议接收", [
              "协议id",
              "5168" + Protocol_1.Aki.Protocol.dYn.name,
            ]),
          e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs)
        )
          return e.O4n === Protocol_1.Aki.Protocol.O4n.Proto_InvalidUserId
            ? void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "InvalidUserId",
              )
            : e.O4n ===
                Protocol_1.Aki.Protocol.O4n.Proto_ErrCanNotGetSelfBasicInfo
              ? void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "CanNotSearchSelf",
                )
              : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.O4n,
                  25009,
                );
        var r = new FriendData_1.FriendData();
        r.SetPlayerBasicInfo(e.FVn),
          ModelManager_1.ModelManager.FriendModel.AddFriendSearchResults(r),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.SearchPlayerInfo,
            r.PlayerId,
          );
      });
  }
  static GetOfflineSection(e) {
    e = TimeUtil_1.TimeUtil.CalculateDayTimeStampGapBetweenNow(e, !1);
    let r = 0,
      o = "FriendOfflineToday";
    return (
      e <= 1
        ? ((r = 0), (o = "FriendOfflineToday"))
        : 1 < e && e <= CommonDefine_1.DAY_PER_WEEK
          ? ((r = 1), (o = "FriendOfflineInWeek"))
          : 1 < e && e <= CommonDefine_1.DAY_PER_MONTH
            ? ((r = 2), (o = "FriendOfflineInMonth"))
            : e > CommonDefine_1.DAY_PER_MONTH &&
              ((r = 3), (o = "FriendOfflineOverMonth")),
      [o, r]
    );
  }
  static CheckRemarkIsValid(e) {
    return void 0 !== e && "" !== e;
  }
  static CreateFriendItemSt(e, r) {
    var o = new Array();
    for (const t of e) {
      var n = new FriendItemSt();
      (n.Id = t), (n.OperationType = r), o.push(n);
    }
    return o;
  }
  static CheckHasAnyApplied(e) {
    var r = ModelManager_1.ModelManager.FriendModel;
    for (const o of e) if (r.HasFriendApplication(o)) return !0;
    return !1;
  }
  static GetSortedFriendListByRules(r, e) {
    var o = new Array();
    for (let e = r.length - 1; 0 <= e; e--) o.push(r[e]);
    return o.sort(e), o;
  }
  static GetSortedBlackOrApplyList(r) {
    var o = new Array();
    for (let e = r.length - 1; 0 <= e; e--) o.push(r[e]);
    return o;
  }
  static RequestFriendRecentlyTeam() {
    var e = Protocol_1.Aki.Protocol.brs.create();
    Net_1.Net.Call(25177, e, (e) => {
      e &&
        (e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
          ? ModelManager_1.ModelManager.FriendModel.InitRecentlyTeamDataByResponse(
              e.UUs,
            )
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              16941,
            ));
    });
  }
  static GetOfflineTimeString(e) {
    return e <= 1
      ? "FriendOfflineToday"
      : 1 < e && e <= CommonDefine_1.DAY_PER_MONTH
        ? "FriendOfflineSomeDay"
        : e > CommonDefine_1.DAY_PER_MONTH
          ? "FriendOfflineOverMonth"
          : "FriendOfflineToday";
  }
}
(exports.FriendController = FriendController),
  ((_a = FriendController).P6t = void 0),
  (FriendController.U6t = !1),
  (FriendController.A6t = !1),
  (FriendController.O6t = 0),
  (FriendController.x6t = () => {
    _a.RequestAllFriend();
  }),
  (FriendController.nye = () => {
    FriendController.U6t
      ? (FriendController.A6t !==
          ModelManager_1.ModelManager.GameModeModel.IsMulti &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Friend", 28, "好友模式改变"),
          FriendController.RequestAllFriend(!0, () => {
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnGetFriendInitData,
            );
          })),
        (FriendController.A6t =
          ModelManager_1.ModelManager.GameModeModel.IsMulti))
      : (FriendController.U6t = !0);
  }),
  (FriendController.Q5e = () => {
    FriendController.RequestAllFriend(!0, () => {
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnGetFriendInitData,
      );
    }),
      _a.P3e();
  }),
  (FriendController.w6t = () => {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RefreshFriendApplicationRedDot,
    );
  }),
  (FriendController.F6t = 0),
  (FriendController.V6t = 0),
  (FriendController.RequestAllFriend = (e = !1, r = void 0) => {
    var o;
    ((TimeUtil_1.TimeUtil.GetServerTime() <= FriendController.F6t ||
      !ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
        LoginDefine_1.ELoginStatus.EnterGameRet,
      )) &&
      !e) ||
      ((o = SERVERREQUESTCD / 1e3),
      e && TimeUtil_1.TimeUtil.GetServerTime() - FriendController.V6t < o
        ? TimerSystem_1.TimerSystem.Delay(() => {
            _a.RequestAllFriend(e, r);
          }, SERVERREQUESTCD)
        : ((o = new Protocol_1.Aki.Protocol.Mrs()),
          (FriendController.F6t =
            TimeUtil_1.TimeUtil.GetServerTime() +
            FriendDefine_1.FRIEND_ALL_UPDATE_INTERVAL_MINUTES *
              CommonDefine_1.SECOND_PER_MINUTE),
          (FriendController.V6t = TimeUtil_1.TimeUtil.GetServerTime()),
          Net_1.Net.IsServerConnected() &&
            Net_1.Net.Call(29196, o, (e) => {
              if (
                (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Friend", 28, "协议接收", [
                    "协议id",
                    "9402" + Protocol_1.Aki.Protocol.Srs.name,
                  ]),
                r?.(),
                void 0 === e)
              )
                Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn("Friend", 28, "RequestAllFriend Null", [
                    "当前登录状态",
                    ModelManager_1.ModelManager.LoginModel.GetLoginStatus(),
                  ]);
              else {
                const o =
                  ModelManager_1.ModelManager.FriendModel.SelectedPlayerId;
                (ModelManager_1.ModelManager.FriendModel.SelectedPlayerId =
                  void 0),
                  e.LUs.forEach((e) => {
                    var r;
                    ModelManager_1.ModelManager.FriendModel.HasFriend(e.FVn.q5n)
                      ? ModelManager_1.ModelManager.FriendModel.GetFriendById(
                          e.FVn.q5n,
                        ).SetFriendDataAttribute(e)
                      : ((r =
                          new FriendData_1.FriendData()).SetFriendDataAttribute(
                          e,
                        ),
                        ModelManager_1.ModelManager.FriendModel.AddFriend(r),
                        o &&
                          o === r.PlayerId &&
                          (ModelManager_1.ModelManager.FriendModel.SelectedPlayerId =
                            r.PlayerId));
                  }),
                  e.RUs.forEach((e) => {
                    var r;
                    ModelManager_1.ModelManager.FriendModel.HasFriendApplication(
                      e.FVn.q5n,
                    )
                      ? ModelManager_1.ModelManager.FriendModel.GetFriendDataInApplicationById(
                          e.FVn.q5n,
                        ).SetPlayerBasicInfo(e.FVn)
                      : ((r =
                          new FriendData_1.FriendApplyData()).InitializeFriendApply(
                          e,
                        ),
                        ModelManager_1.ModelManager.FriendModel.AddFriendApplication(
                          r,
                        ));
                  }),
                  ModelManager_1.ModelManager.FriendModel.LoadLocalFriendApplication();
              }
            })));
  }),
  (FriendController.b6t = (e) => {
    var r;
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Friend", 28, "协议接收", [
        "协议id",
        "9403" + Protocol_1.Aki.Protocol.Ers.name,
      ]),
      ModelManager_1.ModelManager.FriendModel.HasFriend(e.FVn.FVn.q5n)
        ? ModelManager_1.ModelManager.FriendModel.GetFriendById(
            e.FVn.FVn.q5n,
          ).SetFriendDataAttribute(e.FVn)
        : ((r = new FriendData_1.FriendData()).SetFriendDataAttribute(e.FVn),
          ModelManager_1.ModelManager.FriendModel.AddFriend(r)),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FriendAdded);
  }),
  (FriendController.q6t = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Friend", 28, "协议接收", [
        "协议id",
        "9404" + Protocol_1.Aki.Protocol.yrs.name,
      ]);
    e = e.J4n;
    ChatController_1.ChatController.TryActiveDeleteFriendTips(e),
      ModelManager_1.ModelManager.FriendModel.DeleteFriend(e);
  }),
  (FriendController.G6t = (e) => {
    var r;
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Friend",
        28,
        "协议接收",
        ["协议id", "9405" + Protocol_1.Aki.Protocol.Irs.name],
        ["message", e],
      ),
      ModelManager_1.ModelManager.FriendModel.HasFriendApplication(
        e.DUs.FVn.q5n,
      )
        ? ModelManager_1.ModelManager.FriendModel.GetFriendDataInApplicationById(
            e.DUs.FVn.q5n,
          ).SetPlayerBasicInfo(e.DUs.FVn)
        : ((r = new FriendData_1.FriendApplyData()).InitializeFriendApply(
            e.DUs,
          ),
          ModelManager_1.ModelManager.FriendModel.AddFriendApplication(r)),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshFriendApplicationRedDot,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.FriendApplyReceived,
      );
  }),
  (FriendController.N6t = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Friend", 28, "协议接收", [
        "协议id",
        "9406" + Protocol_1.Aki.Protocol.Irs.name,
      ]),
      ModelManager_1.ModelManager.FriendModel.DeleteFriendApplication(e.J4n);
  }),
  (FriendController.RequestFriendRemarkChange = async (e, r) => {
    var o = new Protocol_1.Aki.Protocol.Prs(),
      e = ((o.J4n = e), (o.VVn = r), await Net_1.Net.CallAsync(22010, o));
    return (
      e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
        ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.O4n,
            19773,
          ),
          e.O4n === Protocol_1.Aki.Protocol.O4n.Proto_ErrFriendRemarkLengthLimit
            ? EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.FriendRemarkLengthLimit,
              )
            : e.O4n === Protocol_1.Aki.Protocol.O4n.Proto_ContainsDirtyWord &&
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.FriendRemarkContainsDirtyWord,
              ))
        : (ModelManager_1.ModelManager.FriendModel.IsMyFriend(o.J4n) &&
            (ModelManager_1.ModelManager.FriendModel.GetFriendById(
              o.J4n,
            ).FriendRemark = o.VVn),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.UpdateFriendViewShow,
          )),
      e.O4n
    );
  }),
  (FriendController.RequestBlackList = () => {
    var e = new Protocol_1.Aki.Protocol.GJn();
    Net_1.Net.Call(17728, e, (e) => {
      if (
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Friend", 28, "协议接收", [
            "协议id",
            "9302" + Protocol_1.Aki.Protocol.OJn.name,
          ]),
        e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs)
      )
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.O4n,
          27386,
        );
      else {
        for (const o of e.tLs) {
          var r;
          ModelManager_1.ModelManager.FriendModel.HasBlockedPlayer(o.q5n)
            ? ModelManager_1.ModelManager.FriendModel.GetBlockedPlayerById(
                o.q5n,
              ).InitializeFriendBlackListData(o)
            : ((r =
                new FriendData_1.FriendBlackListData()).InitializeFriendBlackListData(
                o,
              ),
              ModelManager_1.ModelManager.FriendModel.AddToBlackList(r));
        }
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.UpdateBlackListShow,
        );
      }
    });
  }),
  (FriendController.RequestBlockPlayer = (o) => {
    var e = new Protocol_1.Aki.Protocol.kJn();
    (e.J4n = o),
      Net_1.Net.Call(16506, e, (e) => {
        if (
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Friend", 28, "协议接收", [
              "协议id",
              "9304" + Protocol_1.Aki.Protocol.NJn.name,
            ]),
          e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs)
        )
          return e.O4n === Protocol_1.Aki.Protocol.O4n.Proto_ErrIsBlockedPlayer
            ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "IsBlockedPlayer",
              ),
              void EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.UpdateBlackListShow,
              ))
            : e.O4n === Protocol_1.Aki.Protocol.O4n.Proto_ErrBlockListCountMax
              ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "BlackListFull",
                ),
                void EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.UpdateBlackListShow,
                ))
              : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.O4n,
                  17906,
                );
        ModelManager_1.ModelManager.FriendModel.IsMyFriend(o) &&
          ModelManager_1.ModelManager.FriendModel.DeleteFriend(o),
          ModelManager_1.ModelManager.FriendModel.HasFriendApplication(o) &&
            ModelManager_1.ModelManager.FriendModel.DeleteFriendApplication(o);
        var r = new FriendData_1.FriendBlackListData();
        r.InitializeFriendBlackListData(e.FVn),
          ModelManager_1.ModelManager.FriendModel.AddToBlackList(r),
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "BlockedPlayerSucceed",
            r.GetBlockedPlayerData.PlayerName,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.UpdateFriendViewShow,
          );
      });
  }),
  (FriendController.RequestUnBlockPlayer = (r) => {
    var e = new Protocol_1.Aki.Protocol.FJn();
    (e.J4n = r),
      Net_1.Net.Call(25123, e, (e) => {
        if (
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Friend", 28, "协议接收", [
              "协议id",
              "9306" + Protocol_1.Aki.Protocol.VJn.name,
            ]),
          e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs)
        )
          return e.O4n ===
            Protocol_1.Aki.Protocol.O4n.Proto_ErrIsNotBlockedPlayer
            ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "IsNotBlockedPlayer",
              ),
              void EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.UpdateBlackListShow,
              ))
            : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                25091,
              );
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "RemoveFromBlackListSucceeded",
          ModelManager_1.ModelManager.FriendModel.GetBlockedPlayerById(r)
            .GetBlockedPlayerData.PlayerName,
        ),
          ModelManager_1.ModelManager.FriendModel.DeleteBlockedPlayer(r),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.UpdateBlackListShow,
          );
      });
  }),
  (FriendController.FriendListSortHook = (e, r) => {
    (e = ModelManager_1.ModelManager.FriendModel.GetFriendById(e)),
      (r = ModelManager_1.ModelManager.FriendModel.GetFriendById(r));
    return FriendController.H6t(e, r);
  }),
  (FriendController.H6t = (e, r) =>
    e && r
      ? e.PlayerIsOnline !== r.PlayerIsOnline
        ? !e.PlayerIsOnline && r.PlayerIsOnline
          ? 1
          : -1
        : (e.PlayerIsOnline && r.PlayerIsOnline) ||
            FriendController.GetOfflineSection(e.PlayerLastOfflineTime)[1] ===
              FriendController.GetOfflineSection(r.PlayerLastOfflineTime)[1]
          ? e.PlayerLevel === r.PlayerLevel
            ? e.PlayerId - r.PlayerId
            : -(e.PlayerLevel - r.PlayerLevel)
          : -(
              FriendController.GetOfflineSection(e.PlayerLastOfflineTime)[1] -
              FriendController.GetOfflineSection(r.PlayerLastOfflineTime)[1]
            )
      : 1),
  (FriendController.B6t = (r) => {
    ModelManager_1.ModelManager.FriendModel.ClearTestFriendData();
    for (let e = 0; e < r; ++e) {
      var o = new FriendData_1.FriendData(),
        n =
          ((o.PlayerId = e + 1),
          (o.PlayerName = "测试员" + (e + 1)),
          (o.FriendRemark = "仅供展示使用" + (e + 1)),
          (o.PlayerLevel = 1),
          (o.PlayerIsOnline = !0),
          (o.PlayerLastOfflineTime =
            Date.parse(new Date().toString()) /
            CommonDefine_1.MILLIONSECOND_PER_SECOND),
          (o.Debug = !0),
          new FriendData_1.FriendApplyData()),
        t = new FriendData_1.FriendBlackListData();
      (n.ApplyPlayerData = o),
        (n.ApplyCreatedTime = o.PlayerLastOfflineTime + e),
        (n.Fresh = !1),
        (t.GetBlockedPlayerData = o),
        ModelManager_1.ModelManager.FriendModel.AddFriend(o),
        ModelManager_1.ModelManager.FriendModel.AddFriendApplication(n),
        ModelManager_1.ModelManager.FriendModel.AddToBlackList(t),
        ModelManager_1.ModelManager.FriendModel.AddFriendSearchResults(o);
    }
    return (
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.UpdateFriendViewShow,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.UpdateBlackListShow,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.SearchPlayerInfo,
        r,
      ),
      (ModelManager_1.ModelManager.FriendModel.TestDataLoaded = !0)
    );
  });
//# sourceMappingURL=FriendController.js.map
