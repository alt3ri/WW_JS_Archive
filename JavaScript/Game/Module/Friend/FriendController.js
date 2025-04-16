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
  PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew"),
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
    (this.Id = 0), (this.OperationType = 0), (this.ShowingView = void 0);
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
        EventDefine_1.EEventName.ScenePlayerChanged,
        FriendController.Qze,
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
        EventDefine_1.EEventName.ScenePlayerChanged,
        FriendController.Qze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.LoadTestFriendsByGm,
        FriendController.B6t,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(18181, FriendController.b6t),
      Net_1.Net.Register(26842, FriendController.q6t),
      Net_1.Net.Register(22583, FriendController.G6t),
      Net_1.Net.Register(22920, FriendController.N6t);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(18181),
      Net_1.Net.UnRegister(26842),
      Net_1.Net.UnRegister(22583),
      Net_1.Net.UnRegister(22920);
  }
  static async Fxa(e) {
    if (void 0 === e)
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Friend", 27, "RequestAllFriend Null", [
          "当前登录状态",
          ModelManager_1.ModelManager.LoginModel.GetLoginStatus(),
        ]);
    else {
      var r =
        await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetSdkBlockingUser();
      r && ModelManager_1.ModelManager.KuroSdkModel.OnGetSdkBlockUserMap(r);
      const n = ModelManager_1.ModelManager.FriendModel.SelectedPlayerId;
      ModelManager_1.ModelManager.FriendModel.SelectedPlayerId = void 0;
      (r = e.xUs.map(async (e) => {
        if (ModelManager_1.ModelManager.FriendModel.HasFriend(e.YVn.W5n))
          return ModelManager_1.ModelManager.FriendModel.GetFriendById(
            e.YVn.W5n,
          ).SetFriendDataAttribute(e);
        {
          const r = new FriendData_1.FriendData();
          return r.SetFriendDataAttribute(e).then(() => {
            ModelManager_1.ModelManager.FriendModel.AddFriend(r),
              n &&
                n === r.PlayerId &&
                (ModelManager_1.ModelManager.FriendModel.SelectedPlayerId =
                  r.PlayerId);
          });
        }
      })),
        (r =
          (await Promise.all(r),
          e.bUs.map(async (e) => {
            if (
              ModelManager_1.ModelManager.FriendModel.HasFriendApplication(
                e.YVn.W5n,
              )
            )
              return ModelManager_1.ModelManager.FriendModel.GetFriendDataInApplicationById(
                e.YVn.W5n,
              ).SetPlayerBasicInfo(e.YVn);
            {
              const r = new FriendData_1.FriendApplyData();
              return r.InitializeFriendApply(e).then(() => {
                ModelManager_1.ModelManager.FriendModel.AddFriendApplication(r);
              });
            }
          })));
      await Promise.all(r),
        ModelManager_1.ModelManager.FriendModel.LoadLocalFriendApplication();
    }
  }
  static async Vxa(e) {
    var r;
    ModelManager_1.ModelManager.FriendModel.HasFriend(e.YVn.YVn.W5n)
      ? await ModelManager_1.ModelManager.FriendModel.GetFriendById(
          e.YVn.YVn.W5n,
        ).SetFriendDataAttribute(e.YVn)
      : (await (r = new FriendData_1.FriendData()).SetFriendDataAttribute(
          e.YVn,
        ),
        ModelManager_1.ModelManager.FriendModel.AddFriend(r)),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FriendAdded);
  }
  static async Hxa(e) {
    var r;
    ModelManager_1.ModelManager.FriendModel.HasFriendApplication(e.BUs.YVn.W5n)
      ? await ModelManager_1.ModelManager.FriendModel.GetFriendDataInApplicationById(
          e.BUs.YVn.W5n,
        ).SetPlayerBasicInfo(e.BUs.YVn)
      : (await (r = new FriendData_1.FriendApplyData()).InitializeFriendApply(
          e.BUs,
        ),
        ModelManager_1.ModelManager.FriendModel.AddFriendApplication(r)),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshFriendApplicationRedDot,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.FriendApplyReceived,
      );
  }
  static RequestFriendApplyAddSend(e, r) {
    if (
      0 !== FriendController.O6t &&
      Time_1.Time.Now - FriendController.O6t <= APPLYFRIENDCD
    )
      return;
    this.O6t = Time_1.Time.Now;
    const n = new Protocol_1.Aki.Protocol.xrs();
    (n.s5n = e),
      (n.XVn = r),
      Net_1.Net.Call(21288, n, (e) => {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          if (
            e.Q4n ===
            Protocol_1.Aki.Protocol.Q4n.Proto_ErrReceiverApplyListCountMax
          )
            return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "RecipientFriendListFull",
            );
          if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrFriendApplySended)
            return (
              ModelManager_1.ModelManager.FriendModel.AddPlayerToApplyFriendList(
                n.s5n,
              ),
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "FriendApplicationSent",
              ),
              void EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.ApplicationSent,
                n.s5n,
              )
            );
          if (
            e.Q4n ===
            Protocol_1.Aki.Protocol.Q4n.Proto_ErrAlreadyOnFriendApplyList
          )
            return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "FriendApplicationSent",
            );
          if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrIsBlockedPlayer)
            return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "IsBlockedPlayer",
            );
          if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrYouAreBlocked)
            return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "YouAreBlocked",
            );
          if (
            e.Q4n ===
            Protocol_1.Aki.Protocol.Q4n.Proto_ErrFriendApplyRequestLimit
          )
            return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "ApplicationTimesLimit",
            );
          if (
            e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrAlreadyOnFriendList
          )
            return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "AlreadyOnFriendList",
            );
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            28256,
          );
        }
        ModelManager_1.ModelManager.FriendModel.AddPlayerToApplyFriendList(
          n.s5n,
        ),
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "FriendApplicationSent",
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ApplicationSent,
            n.s5n,
          );
      });
  }
  static RequestFriendApplyHandle(d, s) {
    const v = new Protocol_1.Aki.Protocol.Brs();
    0 === d.length
      ? (EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.FriendApplicationListUpdate,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RefreshFriendApplicationRedDot,
        ))
      : ((v.BVn = d),
        (v.$Vn = s),
        Net_1.Net.Call(16252, v, (e) => {
          let r = FriendController.k6t(e.Q4n);
          var n = 1 < v.BVn.length;
          let o = 0;
          if (v.$Vn === Protocol_1.Aki.Protocol.A6s.Proto_Approve)
            for (const a of Object.keys(e.qUs)) {
              var t,
                l = e.qUs[a];
              l === Protocol_1.Aki.Protocol.Q4n.KRs
                ? (t =
                    ModelManager_1.ModelManager.FriendModel.GetFriendDataInApplicationById(
                      Number(a),
                    )) && ModelManager_1.ModelManager.FriendModel.AddFriend(t)
                : "" === r && (r = FriendController.k6t(l));
            }
          for (const _ of Object.keys(e.qUs)) {
            var i = e.qUs[_];
            i === Protocol_1.Aki.Protocol.Q4n.KRs
              ? (o++,
                ModelManager_1.ModelManager.FriendModel.DeleteFriendApplication(
                  Number(_),
                ),
                v.$Vn === Protocol_1.Aki.Protocol.A6s.Proto_Approve
                  ? ModelManager_1.ModelManager.FriendModel.AddPlayerToApproveFriendList(
                      Number(_),
                    )
                  : v.$Vn === Protocol_1.Aki.Protocol.A6s.Proto_Reject &&
                    ModelManager_1.ModelManager.FriendModel.AddPlayerToRefuseFriendList(
                      Number(_),
                    ))
              : "" === r && (r = FriendController.k6t(i));
          }
          "" === r ||
            (n && 0 !== o) ||
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              r,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.FriendApplicationListUpdate,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RefreshFriendApplicationRedDot,
            ),
            s === Protocol_1.Aki.Protocol.A6s.Proto_Reject
              ? EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.ApplicationHandled,
                  3,
                  d,
                )
              : s === Protocol_1.Aki.Protocol.A6s.Proto_Approve &&
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.ApplicationHandled,
                  2,
                  d,
                );
        }));
  }
  static k6t(e) {
    return e !== Protocol_1.Aki.Protocol.Q4n.KRs
      ? e === Protocol_1.Aki.Protocol.Q4n.Proto_ErrInitiatorFriendListCountMax
        ? "ApplicantFriendListFull"
        : e === Protocol_1.Aki.Protocol.Q4n.Proto_ErrFriendListCountMax
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
    var e = new Protocol_1.Aki.Protocol.krs();
    (e.s5n = r),
      Net_1.Net.Call(18433, e, (e) => {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
          return e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrNotOnFriendList
            ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "NotOnFriendList",
              ),
              void EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.UpdateFriendViewShow,
              ))
            : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                17936,
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
  static async jxa(e) {
    e = e.hLs.map(async (e) => {
      if (ModelManager_1.ModelManager.FriendModel.HasBlockedPlayer(e.W5n))
        return ModelManager_1.ModelManager.FriendModel.GetBlockedPlayerById(
          e.W5n,
        ).InitializeFriendBlackListData(e);
      {
        const r = new FriendData_1.FriendBlackListData();
        return r.InitializeFriendBlackListData(e).then(() => {
          ModelManager_1.ModelManager.FriendModel.AddToBlackList(r);
        });
      }
    });
    await Promise.all(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.UpdateBlackListShow,
      );
  }
  static async Wxa(e, r) {
    ModelManager_1.ModelManager.FriendModel.IsMyFriend(e) &&
      ModelManager_1.ModelManager.FriendModel.DeleteFriend(e),
      ModelManager_1.ModelManager.FriendModel.HasFriendApplication(e) &&
        ModelManager_1.ModelManager.FriendModel.DeleteFriendApplication(e);
    e = new FriendData_1.FriendBlackListData();
    await e.InitializeFriendBlackListData(r.YVn),
      ModelManager_1.ModelManager.FriendModel.AddToBlackList(e),
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
        "BlockedPlayerSucceed",
        e.GetBlockedPlayerData.PlayerName,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.UpdateFriendViewShow,
      );
  }
  static RequestSearchPlayerBasicInfoBySdkId(e) {
    var r = new Protocol_1.Aki.Protocol.Rm_();
    (r.Qxa = e),
      Net_1.Net.Call(20094, r, (e) => {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
          return e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_InvalidUserId
            ? void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "InvalidUserId",
              )
            : e.Q4n ===
                Protocol_1.Aki.Protocol.Q4n.Proto_ErrCanNotGetSelfBasicInfo
              ? void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "CanNotSearchSelf",
                )
              : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.Q4n,
                  29259,
                );
        FriendController.Kxa(e.YVn);
      });
  }
  static RequestSearchPlayerBasicInfo(e) {
    var r = new Protocol_1.Aki.Protocol.pYn();
    (r.s5n = e),
      Net_1.Net.Call(26011, r, (e) => {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
          return e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_InvalidUserId
            ? void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "InvalidUserId",
              )
            : e.Q4n ===
                Protocol_1.Aki.Protocol.Q4n.Proto_ErrCanNotGetSelfBasicInfo
              ? void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "CanNotSearchSelf",
                )
              : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.Q4n,
                  16751,
                );
        FriendController.Kxa(e.YVn);
      });
  }
  static async Kxa(e) {
    var r = new FriendData_1.FriendData(),
      e =
        (await r.SetPlayerBasicInfo(e),
        await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetSdkBlockingUser());
    if (e && e.get(r.GetAccountId())) return;
    ModelManager_1.ModelManager.FriendModel.AddFriendSearchResults(r),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.SearchPlayerInfo,
        r.PlayerId,
      );
  }
  static GetOfflineSection(e) {
    e = TimeUtil_1.TimeUtil.CalculateDayTimeStampGapBetweenNow(e, !1);
    let r = 0,
      n = "FriendOfflineToday";
    return (
      e <= 1
        ? ((r = 0), (n = "FriendOfflineToday"))
        : 1 < e && e <= CommonDefine_1.DAY_PER_WEEK
          ? ((r = 1), (n = "FriendOfflineInWeek"))
          : 1 < e && e <= CommonDefine_1.DAY_PER_MONTH
            ? ((r = 2), (n = "FriendOfflineInMonth"))
            : e > CommonDefine_1.DAY_PER_MONTH &&
              ((r = 3), (n = "FriendOfflineOverMonth")),
      [n, r]
    );
  }
  static CheckRemarkIsValid(e) {
    return void 0 !== e && "" !== e;
  }
  static CreateFriendItemSt(e, r) {
    var n = new Array();
    for (const t of e) {
      var o = new FriendItemSt();
      (o.Id = t), (o.OperationType = r), n.push(o);
    }
    return n;
  }
  static CheckHasAnyApplied(e) {
    var r = ModelManager_1.ModelManager.FriendModel;
    for (const n of e) if (r.HasFriendApplication(n)) return !0;
    return !1;
  }
  static GetSortedFriendListByRules(r, e) {
    var n = new Array();
    for (let e = r.length - 1; 0 <= e; e--) n.push(r[e]);
    return n.sort(e), n;
  }
  static GetSortedBlackOrApplyList(r) {
    var n = new Array();
    for (let e = r.length - 1; 0 <= e; e--) n.push(r[e]);
    return n;
  }
  static RequestFriendRecentlyTeam() {
    var e = Protocol_1.Aki.Protocol.Frs.create();
    Net_1.Net.Call(29016, e, (e) => {
      e &&
        (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
          ? ModelManager_1.ModelManager.FriendModel.InitRecentlyTeamDataByResponse(
              e.OUs,
            )
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              23571,
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
  (FriendController.Qze = () => {
    FriendController.RequestAllFriend(!0);
  }),
  (FriendController.nye = () => {
    FriendController.U6t
      ? (FriendController.A6t !==
          ModelManager_1.ModelManager.GameModeModel.IsMulti &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Friend", 27, "好友模式改变"),
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
    var n;
    ((TimeUtil_1.TimeUtil.GetServerTime() <= FriendController.F6t ||
      !ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
        LoginDefine_1.ELoginStatus.EnterGameRet,
      )) &&
      !e) ||
      ((n = SERVERREQUESTCD / 1e3),
      e && TimeUtil_1.TimeUtil.GetServerTime() - FriendController.V6t < n
        ? TimerSystem_1.TimerSystem.Delay(() => {
            _a.RequestAllFriend(e, r);
          }, SERVERREQUESTCD)
        : ((n = new Protocol_1.Aki.Protocol.Rrs()),
          (FriendController.F6t =
            TimeUtil_1.TimeUtil.GetServerTime() +
            FriendDefine_1.FRIEND_ALL_UPDATE_INTERVAL_MINUTES *
              CommonDefine_1.SECOND_PER_MINUTE),
          (FriendController.V6t = TimeUtil_1.TimeUtil.GetServerTime()),
          Net_1.Net.IsServerConnected() &&
            Net_1.Net.Call(16980, n, (e) => {
              r?.(), FriendController.Fxa(e);
            })));
  }),
  (FriendController.b6t = (e) => {
    FriendController.Vxa(e);
  }),
  (FriendController.q6t = (e) => {
    e = e.s5n;
    ChatController_1.ChatController.TryActiveDeleteFriendTips(e),
      ModelManager_1.ModelManager.FriendModel.DeleteFriend(e);
  }),
  (FriendController.G6t = (e) => {
    _a.Hxa(e);
  }),
  (FriendController.N6t = (e) => {
    ModelManager_1.ModelManager.FriendModel.DeleteFriendApplication(e.s5n);
  }),
  (FriendController.RequestFriendRemarkChange = async (e, r) => {
    var n;
    return e
      ? (((n = new Protocol_1.Aki.Protocol.Grs()).s5n = e),
        (n.JVn = r),
        (e = await Net_1.Net.CallAsync(21085, n)).Q4n !==
        Protocol_1.Aki.Protocol.Q4n.KRs
          ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              28256,
            ),
            e.Q4n ===
            Protocol_1.Aki.Protocol.Q4n.Proto_ErrFriendRemarkLengthLimit
              ? EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.FriendRemarkLengthLimit,
                )
              : e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ContainsDirtyWord &&
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.FriendRemarkContainsDirtyWord,
                ))
          : (ModelManager_1.ModelManager.FriendModel.IsMyFriend(n.s5n) &&
              (ModelManager_1.ModelManager.FriendModel.GetFriendById(
                n.s5n,
              ).FriendRemark = n.JVn),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.UpdateFriendViewShow,
            )),
        e.Q4n)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Friend", 27, "RequestFriendRemarkChange id is null"),
        Protocol_1.Aki.Protocol.Q4n.Proto_ErrFriendApplyNotExists);
  }),
  (FriendController.RequestBlackList = () => {
    var e = new Protocol_1.Aki.Protocol.HJn();
    Net_1.Net.Call(18148, e, (e) => {
      e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
        ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            18832,
          )
        : FriendController.jxa(e);
    });
  }),
  (FriendController.RequestBlockPlayer = (r) => {
    var e = new Protocol_1.Aki.Protocol.WJn();
    (e.s5n = r),
      Net_1.Net.Call(16182, e, (e) => {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
          return e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrIsBlockedPlayer
            ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "IsBlockedPlayer",
              ),
              void EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.UpdateBlackListShow,
              ))
            : e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrBlockListCountMax
              ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "BlackListFull",
                ),
                void EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.UpdateBlackListShow,
                ))
              : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.Q4n,
                  19814,
                );
        FriendController.Wxa(r, e);
      });
  }),
  (FriendController.RequestUnBlockPlayer = (r) => {
    var e = new Protocol_1.Aki.Protocol.QJn();
    (e.s5n = r),
      Net_1.Net.Call(16616, e, (e) => {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
          return e.Q4n ===
            Protocol_1.Aki.Protocol.Q4n.Proto_ErrIsNotBlockedPlayer
            ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "IsNotBlockedPlayer",
              ),
              void EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.UpdateBlackListShow,
              ))
            : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                24698,
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
      var n = new FriendData_1.FriendData(),
        o =
          ((n.PlayerId = e + 1),
          (n.PlayerName = "测试员" + (e + 1)),
          (n.FriendRemark = "仅供展示使用" + (e + 1)),
          (n.PlayerLevel = 1),
          (n.PlayerIsOnline = !0),
          (n.PlayerLastOfflineTime =
            Date.parse(new Date().toString()) /
            CommonDefine_1.MILLIONSECOND_PER_SECOND),
          (n.Debug = !0),
          new FriendData_1.FriendApplyData()),
        t = new FriendData_1.FriendBlackListData();
      (o.ApplyPlayerData = n),
        (o.ApplyCreatedTime = n.PlayerLastOfflineTime + e),
        (o.Fresh = !1),
        (t.GetBlockedPlayerData = n),
        ModelManager_1.ModelManager.FriendModel.AddFriend(n),
        ModelManager_1.ModelManager.FriendModel.AddFriendApplication(o),
        ModelManager_1.ModelManager.FriendModel.AddToBlackList(t),
        ModelManager_1.ModelManager.FriendModel.AddFriendSearchResults(n);
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
