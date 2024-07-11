"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FriendController = exports.FriendItemSt = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ChatController_1 = require("../Chat/ChatController");
const LoginDefine_1 = require("../Login/Data/LoginDefine");
const FriendDefine_1 = require("./Data/FriendDefine");
const FriendData_1 = require("./FriendData");
const CHECKGAP = 3e4;
const APPLYFRIENDCD = 1e3;
const SERVERREQUESTCD = 2500;
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
      this.RVt(),
      (this.UVt = !1),
      !(this.AVt = !1)
    );
  }
  static CFe() {
    this.RVt(),
      (FriendController.PVt = TimerSystem_1.TimerSystem.Forever(
        FriendController.xVt,
        CHECKGAP,
      ));
  }
  static RVt() {
    void 0 !== FriendController.PVt &&
      (TimerSystem_1.TimerSystem.Remove(FriendController.PVt),
      (FriendController.PVt = void 0));
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
        FriendController.w4e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RedDotStart,
        FriendController.wVt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.LoadTestFriendsByGm,
        FriendController.BVt,
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
        FriendController.w4e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RedDotStart,
        FriendController.wVt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.LoadTestFriendsByGm,
        FriendController.BVt,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(25119, FriendController.bVt),
      Net_1.Net.Register(13950, FriendController.qVt),
      Net_1.Net.Register(27961, FriendController.GVt),
      Net_1.Net.Register(13975, FriendController.NVt);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(25119),
      Net_1.Net.UnRegister(13950),
      Net_1.Net.UnRegister(27961),
      Net_1.Net.UnRegister(13975);
  }
  static RequestFriendApplyAddSend(e, r) {
    if (
      FriendController.OVt !== 0 &&
      Time_1.Time.Now - FriendController.OVt <= APPLYFRIENDCD
    )
      return;
    this.OVt = Time_1.Time.Now;
    const o = new Protocol_1.Aki.Protocol.wZn();
    (o.Ekn = e),
      (o.n5n = r),
      Net_1.Net.Call(17750, o, (e) => {
        if (
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Friend", 28, "协议接收", [
              "协议id",
              "9408" + Protocol_1.Aki.Protocol.xZn.name,
            ]),
          e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
        ) {
          if (
            e.lkn ===
            Protocol_1.Aki.Protocol.lkn.Proto_ErrReceiverApplyListCountMax
          )
            return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "RecipientFriendListFull",
            );
          if (e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ErrFriendApplySended)
            return (
              ModelManager_1.ModelManager.FriendModel.AddPlayerToApplyFriendList(
                o.Ekn,
              ),
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "FriendApplicationSent",
              ),
              void EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.ApplicationSent,
                o.Ekn,
              )
            );
          if (
            e.lkn ===
            Protocol_1.Aki.Protocol.lkn.Proto_ErrAlreadyOnFriendApplyList
          )
            return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "FriendApplicationSent",
            );
          if (e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ErrIsBlockedPlayer)
            return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "IsBlockedPlayer",
            );
          if (e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ErrYouAreBlocked)
            return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "YouAreBlocked",
            );
          if (
            e.lkn ===
            Protocol_1.Aki.Protocol.lkn.Proto_ErrFriendApplyRequestLimit
          )
            return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "ApplicationTimesLimit",
            );
          if (
            e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ErrAlreadyOnFriendList
          )
            return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "AlreadyOnFriendList",
            );
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.lkn,
            27691,
          );
        }
        ModelManager_1.ModelManager.FriendModel.AddPlayerToApplyFriendList(
          o.Ekn,
        ),
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "FriendApplicationSent",
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ApplicationSent,
            o.Ekn,
          );
      });
  }
  static RequestFriendApplyHandle(a, v) {
    const C = new Protocol_1.Aki.Protocol.bZn();
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Friend", 28, "协议接收", ["数据长度", a.length]),
      a.length === 0
        ? (EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.FriendApplicationListUpdate,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshFriendApplicationRedDot,
          ))
        : ((C.j4n = a),
          (C.s5n = v),
          Net_1.Net.Call(23056, C, (e) => {
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Friend", 28, "协议接收", [
                "协议id",
                "9410" + Protocol_1.Aki.Protocol.BZn.name,
              ]);
            let r = FriendController.kVt(e.lkn);
            const o = C.j4n.length > 1;
            let n = 0;
            if (C.s5n === Protocol_1.Aki.Protocol.xks.Proto_Approve)
              for (const _ of Object.keys(e._Rs)) {
                var t;
                const l = e._Rs[_];
                l === Protocol_1.Aki.Protocol.lkn.Sys
                  ? (t =
                      ModelManager_1.ModelManager.FriendModel.GetFriendDataInApplicationById(
                        Number(_),
                      )) && ModelManager_1.ModelManager.FriendModel.AddFriend(t)
                  : r === "" && (r = FriendController.kVt(l));
              }
            for (const d of Object.keys(e._Rs)) {
              const i = e._Rs[d];
              i === Protocol_1.Aki.Protocol.lkn.Sys
                ? (n++,
                  ModelManager_1.ModelManager.FriendModel.DeleteFriendApplication(
                    Number(d),
                  ),
                  C.s5n === Protocol_1.Aki.Protocol.xks.Proto_Approve
                    ? ModelManager_1.ModelManager.FriendModel.AddPlayerToApproveFriendList(
                        Number(d),
                      )
                    : C.s5n === Protocol_1.Aki.Protocol.xks.Proto_Reject &&
                      ModelManager_1.ModelManager.FriendModel.AddPlayerToRefuseFriendList(
                        Number(d),
                      ))
                : r === "" && (r = FriendController.kVt(i));
            }
            r === "" ||
              (o && n !== 0) ||
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                r,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.FriendApplicationListUpdate,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RefreshFriendApplicationRedDot,
              ),
              v === Protocol_1.Aki.Protocol.xks.Proto_Reject
                ? EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.ApplicationHandled,
                    3,
                    a,
                  )
                : v === Protocol_1.Aki.Protocol.xks.Proto_Approve &&
                  EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.ApplicationHandled,
                    2,
                    a,
                  );
          }));
  }
  static kVt(e) {
    return e !== Protocol_1.Aki.Protocol.lkn.Sys
      ? e === Protocol_1.Aki.Protocol.lkn.Proto_ErrInitiatorFriendListCountMax
        ? "ApplicantFriendListFull"
        : e === Protocol_1.Aki.Protocol.lkn.Proto_ErrFriendListCountMax
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
    const e = new Protocol_1.Aki.Protocol.OZn();
    (e.Ekn = r),
      Net_1.Net.Call(6370, e, (e) => {
        if (
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Friend", 28, "协议接收", [
              "协议id",
              "9414" + Protocol_1.Aki.Protocol.kZn.name,
            ]),
          e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
        )
          return e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ErrNotOnFriendList
            ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "NotOnFriendList",
              ),
              void EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.UpdateFriendViewShow,
              ))
            : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.lkn,
                18642,
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
    const r = new Protocol_1.Aki.Protocol.vWn();
    (r.Ekn = e),
      Net_1.Net.Call(9045, r, (e) => {
        if (
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Friend", 28, "协议接收", [
              "协议id",
              "5168" + Protocol_1.Aki.Protocol.pWn.name,
            ]),
          e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
        )
          return e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_InvalidUserId
            ? void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "InvalidUserId",
              )
            : e.lkn ===
                Protocol_1.Aki.Protocol.lkn.Proto_ErrCanNotGetSelfBasicInfo
              ? void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "CanNotSearchSelf",
                )
              : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.lkn,
                  7919,
                );
        const r = new FriendData_1.FriendData();
        r.SetPlayerBasicInfo(e.a5n),
          ModelManager_1.ModelManager.FriendModel.AddFriendSearchResults(r),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.SearchPlayerInfo,
            r.PlayerId,
          );
      });
  }
  static GetOfflineSection(e) {
    e = TimeUtil_1.TimeUtil.CalculateDayTimeStampGapBetweenNow(e, !1);
    let r = 0;
    let o = "FriendOfflineToday";
    return (
      e <= 1
        ? ((r = 0), (o = "FriendOfflineToday"))
        : e > 1 && e <= CommonDefine_1.DAY_PER_WEEK
          ? ((r = 1), (o = "FriendOfflineInWeek"))
          : e > 1 && e <= CommonDefine_1.DAY_PER_MONTH
            ? ((r = 2), (o = "FriendOfflineInMonth"))
            : e > CommonDefine_1.DAY_PER_MONTH &&
              ((r = 3), (o = "FriendOfflineOverMonth")),
      [o, r]
    );
  }
  static CheckRemarkIsValid(e) {
    return void 0 !== e && e !== "";
  }
  static CreateFriendItemSt(e, r) {
    const o = new Array();
    for (const t of e) {
      const n = new FriendItemSt();
      (n.Id = t), (n.OperationType = r), o.push(n);
    }
    return o;
  }
  static GetSortedFriendListByRules(r, e) {
    const o = new Array();
    for (let e = r.length - 1; e >= 0; e--) o.push(r[e]);
    return o.sort(e), o;
  }
  static GetSortedBlackOrApplyList(r) {
    const o = new Array();
    for (let e = r.length - 1; e >= 0; e--) o.push(r[e]);
    return o;
  }
  static RequestFriendRecentlyTeam() {
    const e = Protocol_1.Aki.Protocol.NZn.create();
    Net_1.Net.Call(7695, e, (e) => {
      e &&
        (e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
          ? ModelManager_1.ModelManager.FriendModel.InitRecentlyTeamDataByResponse(
              e.cRs,
            )
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.lkn,
              20003,
            ));
    });
  }
  static GetOfflineTimeString(e) {
    return e <= 1
      ? "FriendOfflineToday"
      : e > 1 && e <= CommonDefine_1.DAY_PER_MONTH
        ? "FriendOfflineSomeDay"
        : e > CommonDefine_1.DAY_PER_MONTH
          ? "FriendOfflineOverMonth"
          : "FriendOfflineToday";
  }
}
(exports.FriendController = FriendController),
  ((_a = FriendController).PVt = void 0),
  (FriendController.UVt = !1),
  (FriendController.AVt = !1),
  (FriendController.OVt = 0),
  (FriendController.xVt = () => {
    _a.RequestAllFriend();
  }),
  (FriendController.nye = () => {
    FriendController.UVt
      ? (FriendController.AVt !==
          ModelManager_1.ModelManager.GameModeModel.IsMulti &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Friend", 28, "好友模式改变"),
          FriendController.RequestAllFriend(!0, () => {
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnGetFriendInitData,
            );
          })),
        (FriendController.AVt =
          ModelManager_1.ModelManager.GameModeModel.IsMulti))
      : (FriendController.UVt = !0);
  }),
  (FriendController.w4e = () => {
    FriendController.RequestAllFriend(!0, () => {
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnGetFriendInitData,
      );
    }),
      _a.CFe();
  }),
  (FriendController.wVt = () => {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RefreshFriendApplicationRedDot,
    );
  }),
  (FriendController.FVt = 0),
  (FriendController.VVt = 0),
  (FriendController.RequestAllFriend = (e = !1, r = void 0) => {
    let o;
    ((TimeUtil_1.TimeUtil.GetServerTime() <= FriendController.FVt ||
      !ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
        LoginDefine_1.ELoginStatus.EnterGameRet,
      )) &&
      !e) ||
      ((o = SERVERREQUESTCD / 1e3),
      e && TimeUtil_1.TimeUtil.GetServerTime() - FriendController.VVt < o
        ? TimerSystem_1.TimerSystem.Delay(() => {
            _a.RequestAllFriend(e, r);
          }, SERVERREQUESTCD)
        : ((o = new Protocol_1.Aki.Protocol.LZn()),
          (FriendController.FVt =
            TimeUtil_1.TimeUtil.GetServerTime() +
            FriendDefine_1.FRIEND_ALL_UPDATE_INTERVAL_MINUTES *
              CommonDefine_1.SECOND_PER_MINUTE),
          (FriendController.VVt = TimeUtil_1.TimeUtil.GetServerTime()),
          Net_1.Net.IsServerConnected() &&
            Net_1.Net.Call(12605, o, (e) => {
              if (
                (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Friend", 28, "协议接收", [
                    "协议id",
                    "9402" + Protocol_1.Aki.Protocol.RZn.name,
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
                  e.aRs.forEach((e) => {
                    let r;
                    ModelManager_1.ModelManager.FriendModel.HasFriend(e.a5n.aFn)
                      ? ModelManager_1.ModelManager.FriendModel.GetFriendById(
                          e.a5n.aFn,
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
                  e.hRs.forEach((e) => {
                    let r;
                    ModelManager_1.ModelManager.FriendModel.HasFriendApplication(
                      e.a5n.aFn,
                    )
                      ? ModelManager_1.ModelManager.FriendModel.GetFriendDataInApplicationById(
                          e.a5n.aFn,
                        ).SetPlayerBasicInfo(e.a5n)
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
  (FriendController.bVt = (e) => {
    let r;
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Friend", 28, "协议接收", [
        "协议id",
        "9403" + Protocol_1.Aki.Protocol.DZn.name,
      ]),
      ModelManager_1.ModelManager.FriendModel.HasFriend(e.a5n.a5n.aFn)
        ? ModelManager_1.ModelManager.FriendModel.GetFriendById(
            e.a5n.a5n.aFn,
          ).SetFriendDataAttribute(e.a5n)
        : ((r = new FriendData_1.FriendData()).SetFriendDataAttribute(e.a5n),
          ModelManager_1.ModelManager.FriendModel.AddFriend(r));
  }),
  (FriendController.qVt = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Friend", 28, "协议接收", [
        "协议id",
        "9404" + Protocol_1.Aki.Protocol.AZn.name,
      ]);
    e = e.Ekn;
    ChatController_1.ChatController.TryActiveDeleteFriendTips(e),
      ModelManager_1.ModelManager.FriendModel.DeleteFriend(e);
  }),
  (FriendController.GVt = (e) => {
    let r;
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Friend", 28, "协议接收", [
        "协议id",
        "9405" + Protocol_1.Aki.Protocol.PZn.name,
      ]),
      ModelManager_1.ModelManager.FriendModel.HasFriendApplication(
        e.lRs.a5n.aFn,
      )
        ? ModelManager_1.ModelManager.FriendModel.GetFriendDataInApplicationById(
            e.lRs.a5n.aFn,
          ).SetPlayerBasicInfo(e.lRs.a5n)
        : ((r = new FriendData_1.FriendApplyData()).InitializeFriendApply(
            e.lRs,
          ),
          ModelManager_1.ModelManager.FriendModel.AddFriendApplication(r)),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshFriendApplicationRedDot,
      );
  }),
  (FriendController.NVt = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Friend", 28, "协议接收", [
        "协议id",
        "9406" + Protocol_1.Aki.Protocol.PZn.name,
      ]),
      ModelManager_1.ModelManager.FriendModel.DeleteFriendApplication(e.Ekn);
  }),
  (FriendController.RequestFriendRemarkChange = async (e, r) => {
    const o = new Protocol_1.Aki.Protocol.qZn();
    var e = ((o.Ekn = e), (o.h5n = r), await Net_1.Net.CallAsync(18736, o));
    return (
      e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
        ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.lkn,
            27691,
          ),
          e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ErrFriendRemarkLengthLimit
            ? EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.FriendRemarkLengthLimit,
              )
            : e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ContainsDirtyWord &&
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.FriendRemarkContainsDirtyWord,
              ))
        : (ModelManager_1.ModelManager.FriendModel.IsMyFriend(o.Ekn) &&
            (ModelManager_1.ModelManager.FriendModel.GetFriendById(
              o.Ekn,
            ).FriendRemark = o.h5n),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.UpdateFriendViewShow,
          )),
      e.lkn
    );
  }),
  (FriendController.RequestBlackList = () => {
    const e = new Protocol_1.Aki.Protocol.$Kn();
    Net_1.Net.Call(2749, e, (e) => {
      if (
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Friend", 28, "协议接收", [
            "协议id",
            "9302" + Protocol_1.Aki.Protocol.HKn.name,
          ]),
        e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
      )
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.lkn,
          27145,
        );
      else {
        for (const o of e.qSs) {
          var r;
          ModelManager_1.ModelManager.FriendModel.HasBlockedPlayer(o.aFn)
            ? ModelManager_1.ModelManager.FriendModel.GetBlockedPlayerById(
                o.aFn,
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
    const e = new Protocol_1.Aki.Protocol.jKn();
    (e.Ekn = o),
      Net_1.Net.Call(13931, e, (e) => {
        if (
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Friend", 28, "协议接收", [
              "协议id",
              "9304" + Protocol_1.Aki.Protocol.WKn.name,
            ]),
          e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
        )
          return e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ErrIsBlockedPlayer
            ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "IsBlockedPlayer",
              ),
              void EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.UpdateBlackListShow,
              ))
            : e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ErrBlockListCountMax
              ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "BlackListFull",
                ),
                void EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.UpdateBlackListShow,
                ))
              : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.lkn,
                  21617,
                );
        ModelManager_1.ModelManager.FriendModel.IsMyFriend(o) &&
          ModelManager_1.ModelManager.FriendModel.DeleteFriend(o),
          ModelManager_1.ModelManager.FriendModel.HasFriendApplication(o) &&
            ModelManager_1.ModelManager.FriendModel.DeleteFriendApplication(o);
        const r = new FriendData_1.FriendBlackListData();
        r.InitializeFriendBlackListData(e.a5n),
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
    const e = new Protocol_1.Aki.Protocol.KKn();
    (e.Ekn = r),
      Net_1.Net.Call(21738, e, (e) => {
        if (
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Friend", 28, "协议接收", [
              "协议id",
              "9306" + Protocol_1.Aki.Protocol.QKn.name,
            ]),
          e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
        )
          return e.lkn ===
            Protocol_1.Aki.Protocol.lkn.Proto_ErrIsNotBlockedPlayer
            ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "IsNotBlockedPlayer",
              ),
              void EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.UpdateBlackListShow,
              ))
            : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.lkn,
                9444,
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
    return FriendController.HVt(e, r);
  }),
  (FriendController.HVt = (e, r) =>
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
  (FriendController.BVt = (r) => {
    ModelManager_1.ModelManager.FriendModel.ClearTestFriendData();
    for (let e = 0; e < r; ++e) {
      const o = new FriendData_1.FriendData();
      const n =
        ((o.PlayerId = e + 1),
        (o.PlayerName = "测试员" + (e + 1)),
        (o.FriendRemark = "仅供展示使用" + (e + 1)),
        (o.PlayerLevel = 1),
        (o.PlayerIsOnline = !0),
        (o.PlayerLastOfflineTime =
          Date.parse(new Date().toString()) /
          CommonDefine_1.MILLIONSECOND_PER_SECOND),
        (o.Debug = !0),
        new FriendData_1.FriendApplyData());
      const t = new FriendData_1.FriendBlackListData();
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
// # sourceMappingURL=FriendController.js.map
