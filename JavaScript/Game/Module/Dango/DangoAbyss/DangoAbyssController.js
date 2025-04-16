"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssController = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  AsyncTask_1 = require("../../../World/Task/AsyncTask"),
  TaskSystem_1 = require("../../../World/Task/TaskSystem"),
  DangoAbyssActivityController_1 = require("../../Activity/ActivityContent/DangoAbyss/DangoAbyssActivityController"),
  DangoAbyssActivityData_1 = require("../../Activity/ActivityContent/DangoAbyss/DangoAbyssActivityData"),
  SolarSpeedDefine_1 = require("../../Activity/ActivityContent/SolarisSpeed/SolarSpeedDefine"),
  AbyssDangoRolePanel_1 = require("../../Activity/ActivityContent/SolarisSpeed/View/AbyssDangoRolePanel"),
  InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController"),
  ItemRewardController_1 = require("../../ItemReward/ItemRewardController"),
  ItemRewardDefine_1 = require("../../ItemReward/ItemRewardDefine"),
  RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData"),
  LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  DangoAbyssActorManager_1 = require("./DangoAbyssActorManager"),
  DangoAbyssData_1 = require("./DangoAbyssData"),
  DangoAbyssDefine_1 = require("./DangoAbyssDefine"),
  DangoAbyssCommonRewardView_1 = require("./View/DangoAbyssCommonRewardView"),
  DangoAbyssEntranceView_1 = require("./View/DangoAbyssEntranceView"),
  DangoAbyssRankView_1 = require("./View/DangoAbyssRankView"),
  DangoAbyssTimeLimitRewardView_1 = require("./View/DangoAbyssTimeLimitRewardView");
class DangoAbyssController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
      DangoAbyssController.sZs,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAbyssDangoSelect,
        DangoAbyssController.eGc,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnActivityOpen,
        DangoAbyssController.Hc1,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
        DangoAbyssController.zs1,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        DangoAbyssController.p5a,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ShowBadDangoTip,
        DangoAbyssController.aC1,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
      DangoAbyssController.sZs,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAbyssDangoSelect,
        DangoAbyssController.eGc,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActivityOpen,
        DangoAbyssController.Hc1,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
        DangoAbyssController.zs1,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        DangoAbyssController.p5a,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ShowBadDangoTip,
        DangoAbyssController.aC1,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(19584, this.ofc),
      Net_1.Net.Register(19938, this.nfc),
      Net_1.Net.Register(25472, this.sfc),
      Net_1.Net.Register(16881, this.afc),
      Net_1.Net.Register(26962, this.hfc),
      Net_1.Net.Register(19586, this.nuc);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(19584),
      Net_1.Net.UnRegister(19938),
      Net_1.Net.UnRegister(25472),
      Net_1.Net.UnRegister(16881),
      Net_1.Net.UnRegister(26962),
      Net_1.Net.UnRegister(19586);
  }
  static OpenAbyssSelectViewByActivityId(e) {
    var a = new DangoAbyssData_1.DangoAbyssInsSelectViewData(),
      n =
        DangoAbyssActivityController_1.DangoAbyssActivityController.GetAbyssChallengeByActivityId(
          e,
        );
    (a.AbyssDataList = n),
      (a.ActivityData =
        ModelManager_1.ModelManager.ActivityModel.GetActivityById(e)),
      UiManager_1.UiManager.OpenView("DangoAbyssInsSelectView", a);
  }
  static OpenAbyssRankView(e = 0) {
    var a = this.EDc(),
      n = new DangoAbyssRankView_1.DangoAbyssRankData();
    (n.OpenChallengeId = e),
      (n.DangoAbyssData =
        DangoAbyssActivityController_1.DangoAbyssActivityController.GetAbyssChallengeRankListByActivityId(
          a,
        )),
      UiManager_1.UiManager.OpenView("DangoAbyssRankView", n);
  }
  static OpenGetDangoView(e) {
    const t = new Array();
    e.forEach((e, a) => {
      var n =
          ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(
            a,
          ).GetName(),
        a = {
          DangoId: a,
          DangoLevel: e,
          UnlockTitle:
            ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(
              "Text_GetNewDango",
              "Text_GetNewDango",
            ),
          UnlockSubTitle: "",
          UnlockWutheringWaveTitleSpritePath:
            ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
              "SP_TuanziUnlockTxt",
            ),
          DetailName:
            ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(n, n),
          DetailDialog: "",
        };
      t.push(a);
    });
    e = { DataList: t, ShowTime: 1e3 };
    UiManager_1.UiManager.OpenView("DangoAbyssGetDangoView", e);
  }
  static OpenAbyssLimitRewardView(e = !0) {
    let a = "DangoAbyssTimeLimitRewardView";
    e || (a = "DangoAbyssTimeLimitRewardActivityView");
    var e = new DangoAbyssTimeLimitRewardView_1.DangoAbyssTimeLimitViewData(),
      n = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.EDc());
    (e.Data = n), UiManager_1.UiManager.OpenView(a, e);
  }
  static OpenAbyssRewardView(e = !0) {
    let a = "DangoAbyssCommonRewardView";
    e || (a = "DangoAbyssCommonRewardActivityView");
    var e = new DangoAbyssCommonRewardView_1.DangoAbyssRewardViewData(),
      n = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.EDc());
    (e.Data = n), UiManager_1.UiManager.OpenView(a, e);
  }
  static OpenAbyssEntranceViewByActivityId(a) {
    UiManager_1.UiManager.NormalResetToView("BattleView", () => {
      var e = new DangoAbyssEntranceView_1.DangoAbyssEntraceViewData();
      (e.ActivityId = a),
        UiManager_1.UiManager.OpenView("DangoAbyssEntranceView", e);
    });
  }
  static EDc() {
    for (const e of ModelManager_1.ModelManager.ActivityModel.GetAllActivityMap().values())
      if (e instanceof DangoAbyssActivityData_1.DangoAbyssActivityData)
        return e.Id;
    return 0;
  }
  static async OpenCurrentActivityAbyssEntranceAsync() {
    var e = this.EDc();
    if (0 === e) return !1;
    const a = new CustomPromise_1.CustomPromise();
    UiManager_1.UiManager.NormalResetToView("BattleView", () => {
      a.SetResult(!0);
    }),
      await a.Promise;
    var n = new DangoAbyssEntranceView_1.DangoAbyssEntraceViewData(),
      e =
        ((n.ActivityId = e),
        await UiManager_1.UiManager.OpenViewAsync("DangoAbyssEntranceView", n));
    return !!e;
  }
  static OpenCurrentActivityAbyssEntrance() {
    var e = this.EDc();
    return 0 !== e && (this.OpenAbyssEntranceViewByActivityId(e), !0);
  }
  static async lfc() {
    var e = Protocol_1.Aki.Protocol.Goc.create(),
      e = await Net_1.Net.CallAsync(29301, e);
    (e && e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error("Activity", 27, "团子深渊进入下个房间失败"));
  }
  static UWa(a) {
    return [
      a.fL_.filter((e) => !a.mL_.includes(e)),
      a.mL_.filter((e) => !a.fL_.includes(e)),
    ];
  }
  static eRc(e) {
    var a = {
        ButtonTextId: "ConfirmBox_217_ButtonText_0",
        DescriptionTextId: void 0,
        IsTimeDownCloseView: !1,
        IsClickedCloseView: !0,
        OnClickedCallback: function () {
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
        },
      },
      n = ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentChallengeId(),
      n =
        !ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(n)
          .IfStoryChallenge,
      t = [];
    t.push(a),
      n &&
        t.push({
          ButtonTextId: "ConfirmBox_133_ButtonText_1",
          IsTimeDownCloseView: !1,
          IsClickedCloseView: !1,
          OnClickedCallback: function () {
            var e, a;
            ModelManager_1.ModelManager.GameModeModel.IsMulti
              ? ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.SettleViewButtonSuccessOnMultiCallBack(
                  0,
                )
              : ((e = {
                  fsc: ModelManager_1.ModelManager.DangoAbyssModel.GetRoleSelectDangoMap(),
                }),
                ((a = new Protocol_1.Aki.Protocol.$ah()).Qsc = e),
                ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.RestartInstanceDungeon(
                  a,
                ));
          },
          DescriptionTextId: void 0,
        });
    const o = [];
    e.j7n.gws.forEach((e) => {
      e = new RewardItemData_1.RewardItemData(e.s5n, e.m9n, void 0);
      o.push(e);
    });
    (a = ModelManager_1.ModelManager.DangoAbyssModel.GetInstanceProgress()),
      (n = { RewardItemData: o, Progress: a }),
      (e = {
        ConfigId: ItemRewardDefine_1.ABYSS_SUCCESS,
        IsSuccess: !0,
        ButtonInfoList: t,
        DangoAbyssSuccessData: n,
        IsBagFull: !1,
      });
    ModelManager_1.ModelManager.ItemRewardModel.ClearCurrentRewardData(),
      ItemRewardController_1.ItemRewardController.OpenExploreRewardViewNew(e);
  }
  static AbyssLikePlayer(e) {
    var a = new Protocol_1.Aki.Protocol.Boc();
    (a.W5n = e),
      Net_1.Net.Call(20591, a, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            24902,
          );
      });
  }
  static async RequestAbyssRankList(e) {
    var a = new Protocol_1.Aki.Protocol.Yoc(),
      e = ((a.s5n = e), await Net_1.Net.CallAsync(24580, a));
    e.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrAbyssRankListCd &&
      (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          15550,
        ),
      ModelManager_1.ModelManager.DangoAbyssModel.OnAbyssChallegenRankUpdate(
        e,
      ));
  }
  static async RequestAbyssSelfRank(e) {
    var a = new Protocol_1.Aki.Protocol.rnc(),
      e = ((a.s5n = e), await Net_1.Net.CallAsync(18555, a));
    ModelManager_1.ModelManager.DangoAbyssModel.OnAbyssChallengeSelfRankUpdate(
      e,
    );
  }
  static async RequestSetAbyssShowName(e, a) {
    var n = new Protocol_1.Aki.Protocol.Joc(),
      n = ((n.e8n = e), (n.csc = a), await Net_1.Net.CallAsync(17279, n));
    return (
      !!n &&
      (n.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
        ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            n.Q4n,
            20806,
          ),
          !1)
        : (ModelManager_1.ModelManager.DangoAbyssModel.OnAnonymousNameStateChange(
            e,
            a,
          ),
          !0))
    );
  }
  static StartAbyssChallenge(e) {
    e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(e);
    (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId =
      e.InstEntranceId),
      (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId =
        e.InstId),
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.EnterEntrance(
        e.InstEntranceId,
      ).finally(void 0);
  }
  static CR1() {
    this.pR1 &&
      ModelManager_1.ModelManager.DangoAbyssModel.CheckInDangoAbyssInstance() &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Activity", 27, "显示缓存的结算数据"),
      this.sfc(this.pR1)),
      (this.pR1 = void 0);
  }
  static Hbc() {
    var e;
    33 ===
      ModelManager_1.ModelManager.EditBattleTeamModel.GetCurrentDungeonConfig
        .InstSubType &&
      ModelManager_1.ModelManager.DangoAbyssModel.CheckIsInMatch() &&
      ((e =
        ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo()),
      ModelManager_1.ModelManager.DangoAbyssModel.RefreshOwnerListByMatchTeamInfo(
        e,
      ));
  }
  static InitAbyssDangoObserver(e) {
    DangoAbyssActorManager_1.DangoAbyssActorManager.InitIndexDangoSkeletalObserverHandle(
      e,
    );
  }
  static RefreshAbyssDangoAnimation(e, a, n) {
    DangoAbyssActorManager_1.DangoAbyssActorManager.RefreshSkeletalObserverAnimation(
      e,
      a,
      n,
    );
  }
  static RefreshAbyssDangoModel(e, a, n, t) {
    let o = void 0,
      r = 0,
      s = "";
    a === DangoAbyssDefine_1.BADDANGOID
      ? ((o =
          ConfigManager_1.ConfigManager.DangoAbyssConfig.GetBadDangoTransform()),
        (r =
          ConfigManager_1.ConfigManager.DangoAbyssConfig.GetBadDangoMeshId()),
        (s =
          ConfigManager_1.ConfigManager.DangoAbyssConfig.GetBadDangoStandAni()))
      : ((l = (i =
          ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(
            a,
          )).GetPhantomId()),
        (o =
          ModelManager_1.ModelManager.PhantomBattleModel.GetMeshTransform(l)),
        (s = ModelManager_1.ModelManager.PhantomBattleModel.GetStandAnim(l)),
        (r = i.GetMeshId()));
    var i,
      l = {
        DangoId: a,
        MeshId: r,
        DangoPointCase: n,
        Transform: o,
        StandAnimationName: s,
      };
    DangoAbyssActorManager_1.DangoAbyssActorManager.RefreshDangoSkeletalObserverHandle(
      e,
      l,
      t,
    );
  }
  static DestroyAbyssDangoObserver(e) {
    DangoAbyssActorManager_1.DangoAbyssActorManager.DestroyDangoSkeletalObserverHandle(
      e,
    );
  }
  static RequestQuitChallenge() {
    var e = new Protocol_1.Aki.Protocol.Poc();
    Net_1.Net.Call(23271, e, (e) => {
      e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          23632,
        );
    });
  }
  static RequestChallengeUnlock(e) {
    var a = new Protocol_1.Aki.Protocol.Roc();
    (a.e8n = e),
      Net_1.Net.Call(28526, a, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            29684,
          );
      });
  }
}
(exports.DangoAbyssController = DangoAbyssController),
  ((_a = DangoAbyssController).pR1 = void 0),
  (DangoAbyssController.ofc = (r) => {
    var e = new AsyncTask_1.AsyncTask(
      "RoguelikeSubLevelChangeTask",
      async () => {
        ModelManager_1.ModelManager.SubLevelLoadingModel.ScreenEffect = 1;
        const [a, n] = _a.UWa(r);
        if (0 === a.length && 0 === n.length)
          await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
            17,
            3,
          );
        else {
          var e = Vector_1.Vector.Create(r.iPs, r.rPs, r.gqs),
            t = new UE.Rotator(0, r.fqs, 0);
          await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
            17,
            3,
          );
          const o = new CustomPromise_1.CustomPromise();
          ControllerHolder_1.ControllerHolder.SubLevelController.ChangeSubLevel(
            a,
            n,
            0,
            e,
            t,
            (e) => {
              e
                ? o.SetResult(!0)
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Activity",
                    27,
                    "团子深渊子关卡加载失败",
                    ["unloads", a],
                    ["newLoads", n],
                  );
            },
          ),
            await o.Promise;
        }
        return (
          await _a.lfc(),
          await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
            17,
            1,
          ),
          !0
        );
      },
    );
    TaskSystem_1.TaskSystem.AddTask(e), TaskSystem_1.TaskSystem.Run();
  }),
  (DangoAbyssController.nfc = (e) => {
    ModelManager_1.ModelManager.DangoAbyssModel.PhraseRoomInfo(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAbyssRoomInfoUpdate,
      );
  }),
  (DangoAbyssController.sfc = (a) => {
    if (ModelManager_1.ModelManager.GameModeModel.Loading)
      (_a.pR1 = a),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Activity", 27, "当前处于loading状态，缓存结算数据");
    else {
      var e = ModelManager_1.ModelManager.GameModeModel.IsMulti;
      if (
        (ModelManager_1.ModelManager.DangoAbyssModel.OnAbyssChallengeResultNotify(
          a,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnAbyssChallengeResult,
        ),
        e)
      ) {
        var n = [],
          t = a.j7n.TRs.length;
        for (let e = 0; e < t; e++) {
          var o = a.j7n.TRs[e],
            r = o.W5n,
            s =
              ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(r),
            i = s?.PlayerTitleId ?? 0,
            l = s?.PlayerTitleStarLevel ?? 0,
            _ = s?.Sex ?? 0,
            g = s?.IsSelf ?? !1;
          const d = [];
          var y = [];
          for (const v of o.dUs) {
            var D = { Id: v.esc?.h5n ?? 0, Count: v.esc?.e5n ?? 0 };
            y.push(D),
              v.tsc.forEach((e) => {
                e = { Id: e.h5n, Count: e.e5n };
                d.push(e);
              });
          }
          var c =
              ModelManager_1.ModelManager.DangoAbyssModel.GetMainHonorRank(y),
            r = {
              Rank: 0,
              PlayerId: r,
              IsAddButtonAvailable:
                !g && !ModelManager_1.ModelManager.FriendModel.IsMyFriend(r),
              IsSelf: g,
              BgPath: SolarSpeedDefine_1.rankBgPathMap[c],
              MedalColorHex: SolarSpeedDefine_1.medalColorHex[c],
              FxColorHex: SolarSpeedDefine_1.fxColorHex[c],
              PlayerIndexIconPath: (g
                ? SolarSpeedDefine_1.playerIndexSelfIconMap
                : SolarSpeedDefine_1.playerIndexIconMap)[e],
              NameText: s?.PlayerName ?? "",
              IconData: {
                IconPath:
                  void 0 === s
                    ? ""
                    : ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(
                        s.HeadId,
                        !1,
                      ).GetRoleHeadIconCircle(),
              },
              LikeCount: o.Knc,
              SubDescData: d,
              MainDescData: y,
              AvatarTexturePath: SolarSpeedDefine_1.avatarPattern[c],
              LineTexturePath: SolarSpeedDefine_1.linePattern[c],
              BgTexturePath: SolarSpeedDefine_1.bgPattern[c],
              PlayerTitle: i,
              PlayerTitleStarLevel: l,
              Sex: _,
            };
          n.push(r);
        }
        e = {
          TitleId: "DangoAbyssMultiEndTitle",
          RoleDataList: n,
          PanelType: AbyssDangoRolePanel_1.AbyssDangoRolePanel,
          ConfirmClick: () => {
            _a.eRc(a);
          },
        };
        UiManager_1.UiManager.OpenView("SolarSpeedResultView", e);
      } else _a.eRc(a);
    }
  }),
  (DangoAbyssController.afc = (e) => {
    ModelManager_1.ModelManager.DangoAbyssModel.OnAbyssLikeNotify(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAbyssLikeChange,
        e.W5n,
      );
  }),
  (DangoAbyssController.hfc = (e) => {
    ModelManager_1.ModelManager.DangoAbyssModel.OnAbyssFormationRoleSelectUpdateNotify(
      e,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAbyssFormationUpdate,
      );
  }),
  (DangoAbyssController.aC1 = (e) => {
    e = new LguiUtil_1.TableTextArgNew(e);
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
      30,
      e,
    );
  }),
  (DangoAbyssController.zs1 = () => {
    ModelManager_1.ModelManager.DangoAbyssModel.CheckInAbyss() &&
      _a.RequestQuitChallenge();
  }),
  (DangoAbyssController.p5a = () => {
    _a.CR1();
    var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    0 !== e &&
      1 ===
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
          ?.WorldDungeonSubType &&
      0 !== (e = _a.EDc()) &&
      ((e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e)),
      ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(
        e.GetCurrentLastFinishChallengeId(),
      )
        .SmallWorldShowSceneItem.split(",")
        .forEach((e) => {
          e = UE.KuroCollectActorComponent.GetActorWithTag(
            FNameUtil_1.FNameUtil.GetDynamicFName(e),
            1,
          );
          e?.IsValid() && e.SetActorHiddenInGame(!1);
        }));
  }),
  (DangoAbyssController.Hc1 = () => {
    var e = _a.EDc();
    0 !== e &&
      (e =
        ModelManager_1.ModelManager.ActivityModel.GetActivityById(
          e,
        )).GetActivityTipNeedShowState() &&
      (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
        28,
      ),
      e.CacheActivityTipShowState());
  }),
  (DangoAbyssController.eGc = (a) => {
    var e =
      ModelManager_1.ModelManager.EditBattleTeamModel.GetCurrentDungeonConfig;
    e &&
      33 === e.InstSubType &&
      (ModelManager_1.ModelManager.DangoAbyssModel.CheckIsInMatch()
        ? InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.MatchChangeRoleRequest(
            ModelManager_1.ModelManager.EditBattleTeamModel
              .GetOwnRoleConfigIdList[0],
          ).then((e) => {
            e &&
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RefreshFormationDango,
                a,
              );
          })
        : EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshFormationDango,
            a,
          ));
  }),
  (DangoAbyssController.sZs = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("TowerDefense", 27, "当队伍选人变化时", ["Reason", e]);
    e = ModelManager_1.ModelManager.EditBattleTeamModel.GetCurrentDungeonConfig;
    e &&
      33 === e.InstSubType &&
      ModelManager_1.ModelManager.DangoAbyssModel.CheckIsInMatch() &&
      _a.Hbc();
  }),
  (DangoAbyssController.nuc = (e) => {
    var a = _a.EDc(),
      a = ModelManager_1.ModelManager.ActivityModel.GetActivityById(a);
    a
      ? (a.OnUpdateUnlockChallengeIdList(e),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnAbyssUnlockChallengeStateUpdate,
        ))
      : Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启");
  });
//# sourceMappingURL=DangoAbyssController.js.map
