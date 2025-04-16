"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Spring25Model = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  SettleRewardByActivityId_1 = require("../../../../../../Core/Define/ConfigQuery/SettleRewardByActivityId"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../../../../Core/Framework/ModelBase"),
  LocalStorage_1 = require("../../../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  Spring25Define_1 = require("../Spring25Define"),
  Spring25ConfigContext_1 = require("./Spring25ConfigContext"),
  Spring25ProtocolContext_1 = require("./Spring25ProtocolContext"),
  Spring25UiContext_1 = require("./Spring25UiContext");
var Proto_ActivityTaskState = Protocol_1.Aki.Protocol.I$s;
class Spring25Model extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.UVa = void 0),
      (this.xVa = void 0),
      (this.PVa = void 0);
  }
  OnInit() {
    return (
      (this.UVa = new Spring25ConfigContext_1.Spring25ConfigContext(this)),
      (this.xVa = new Spring25ProtocolContext_1.Spring25ProtocolContext(this)),
      (this.PVa = new Spring25UiContext_1.Spring25UiContext(this)),
      !0
    );
  }
  OnClear() {
    return this.UVa.Dispose(), this.xVa.Dispose(), this.PVa.Dispose(), !0;
  }
  get ActivityData() {
    return this.xVa;
  }
  get CurrentActivityId() {
    return this.xVa.Id;
  }
  get IsLetterListViewAvailable() {
    return 0 < this.xVa.InvitedCount;
  }
  get IsInviteAvailableExternal() {
    return this.xVa.IsInviteAvailable;
  }
  get IsAllInvited() {
    return this.UVa.SignCount === this.xVa.InvitedCount;
  }
  get HelpId() {
    return this.xVa.GetHelpId();
  }
  get IsSkinRewarded() {
    return this.xVa.IsSkinRewarded;
  }
  get NeedOpenEnvelopeView() {
    return void 0 !== this.PVa.CurrentSignId;
  }
  get HasNewLetter() {
    var t = LocalStorage_1.LocalStorage.GetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.Spring25FirstLetterClick,
    );
    if (void 0 !== t) for (var [, e] of t) if (!e) return !0;
    return !1;
  }
  get HasAnyRewardExternal() {
    return this.xVa.HasAnyReward;
  }
  get HasRedDot() {
    return this.HasAnyRewardExternal || this.IsInviteAvailableExternal;
  }
  get BottomStateInInfoView() {
    return this.IsSkinRewarded
      ? 3
      : this.UVa.TaskCount === this.xVa.FinishTaskCount
        ? void 0 ===
          LocalStorage_1.LocalStorage.GetPlayer(
            LocalStorageDefine_1.ELocalStoragePlayerKey
              .Spring25FirstTimeTaskAllDone,
          )
          ? 1
          : 2
        : 0;
  }
  get SharePhotoPath() {
    var t = SettleRewardByActivityId_1.configSettleRewardByActivityId.GetConfig(
      this.CurrentActivityId,
    );
    return (
      (1 === ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender()
        ? t?.MalePhotoPath
        : t?.FemalePhotoPath) ?? ""
    );
  }
  get NeedStartDialog() {
    return (
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.Spring25FirstEnter,
        !0,
      ) && 0 === this.xVa.InvitedCount
    );
  }
  IsLetterNewBySignId(t) {
    var e = LocalStorage_1.LocalStorage.GetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.Spring25FirstLetterClick,
    );
    return void 0 !== e && void 0 !== (e = e.get(t)) && !e;
  }
  SetLetterClickedBySignId(t, e) {
    let i = LocalStorage_1.LocalStorage.GetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.Spring25FirstLetterClick,
    );
    (i = void 0 === i ? new Map() : i).set(t, e),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.Spring25FirstLetterClick,
        i,
      );
  }
  SyncSpringSignDrawRoleResponse(t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Spring25", 64, "同步邀请角色数据", ["response", t]);
    var e,
      i,
      t = t.WL_,
      r = ((this.PVa.CurrentSignId = t), this.xVa),
      a = this.UVa;
    r.InvitedRoleSet.add(t), (r.CanInvite = !1);
    for ([e, i] of r.TaskCache) {
      var o = a.GetTaskThresholdByTaskId(e);
      i.H6n === Proto_ActivityTaskState.Proto_ActivityTaskRunning &&
        r.InvitedCount >= o &&
        (i.H6n = Proto_ActivityTaskState.Proto_ActivityTaskFinish);
    }
    this.SetLetterClickedBySignId(t, !1);
  }
  SyncSpringSignDrawRewardResponse(t) {
    this.xVa.SyncTaskStateByTaskId(t);
  }
  SyncSpringSignSkinRewardResponse() {
    this.xVa.SyncSkinReward();
  }
  ResetCurrentSignId() {
    this.PVa.CurrentSignId = void 0;
  }
  TrySetCurrentLetterSignId(t) {
    t !== this.PVa.CurrentLetterSignId && (this.PVa.CurrentLetterSignId = t);
  }
  InitLetterSignIdForLetterListView() {
    let t = void 0;
    for (const e of this.xVa.InvitedRoleSet) (void 0 === t || t > e) && (t = e);
    this.PVa.CurrentLetterSignId = t;
  }
  BuildActivitySubViewData() {
    return {
      ProgressTextId: Spring25Define_1.PROGRESS_TEXT_ID_IN_SUBVIEW,
      RewardTextId: Spring25Define_1.REWARD_TITLE_TEXT_ID_IN_SUBVIEW,
      ButtonTextId: Spring25Define_1.BUTTON_TEXT_ID_IN_SUBVIEW,
      Current: this.xVa.InvitedCount.toString(),
      TotalTextId: Spring25Define_1.FUNCTION_AND_NUMBER_TEXT_ID,
      TotalTextArg: this.UVa.TaskCount.toString(),
      IsMale:
        1 === ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender(),
      NeedStartDialog: this.NeedStartDialog,
    };
  }
  BuildMainViewData(t = !1) {
    var e,
      i = new Map(),
      r = this.UVa,
      a = this.xVa,
      o = this.PVa;
    let n = void 0;
    for ([e] of r.SignCfgMap) {
      var s = r.GetResourceTypeBySignId(e);
      void 0 !== s &&
        (i.set(s, a.IsRoleInvitedById(e)),
        o.CurrentSignId !== e || t || (n = s));
    }
    return {
      TitleTextId: a.LocalConfig?.Title ?? "",
      InviteRemainCount: a.SignCountRemain.toString(),
      CharacterInvitedMap: i,
      NewRoleType: n,
    };
  }
  BuildDialogueViewData() {
    var t,
      e = this.PVa.CurrentSignId;
    if (void 0 !== e)
      return (
        (t = this.I3l(e)),
        (e = this.Z2l(e)),
        {
          IsOpening: !1,
          LeftSpineData: t[0],
          RightSpineData: t[1],
          ChatDataList: e,
        }
      );
  }
  BuildStartDialogueViewData() {
    var t = this.T3l(),
      e = this.L3l();
    return {
      IsOpening: !0,
      LeftSpineData: t[0],
      RightSpineData: t[1],
      ChatDataList: e,
    };
  }
  BuildInfoViewData() {
    var t = this.xVa.InvitedCount,
      e = this.UVa.TaskCount;
    return {
      TitleTextId: this.xVa.LocalConfig?.Title ?? "",
      CurrentNum: t.toString(),
      TotalNumTextId: Spring25Define_1.FUNCTION_AND_NUMBER_TEXT_ID,
      TotalNumTextArg: e.toString(),
      BottomState: this.BottomStateInInfoView,
      ContentList: this.VGl(),
      ProgressList: this.HGl(),
    };
  }
  BuildLetterListViewData() {
    let t = void 0,
      e = void 0;
    var i = this.PVa.CurrentLetterSignId,
      i =
        (void 0 !== i &&
          ((t = this.UVa.GetLetterContentTextIdBySignId(i)),
          (e = this.UVa.GetLetterTitleTextIdBySignId(i))),
        { TabDataList: this.jGl(), InfoTextId: t, TitleTextId: e });
    return i;
  }
  BuildEnvelopeViewData() {
    var t = this.PVa.CurrentSignId;
    return {
      TitleTextId:
        void 0 === t ? void 0 : this.UVa.GetLetterTitleTextIdBySignId(t),
      InfoTextId:
        void 0 === t ? void 0 : this.UVa.GetLetterContentTextIdBySignId(t),
    };
  }
  VGl() {
    var t,
      e = [],
      i = this.UVa,
      r = this.xVa;
    for ([, t] of i.TaskCfgMap) {
      var a = t.Id,
        o = r.GetTaskStateByTaskId(a),
        a = {
          TaskId: a,
          State: o,
          ItemList: r.GetTaskRewardPreviewByTaskId(a),
          NameTextId: i.GetTaskNameTextIdByTaskId(a) ?? "",
          SubtitleTextId: "Text_ItemRecycleChosen_text",
          SubtitleTextArgs: [
            o < Proto_ActivityTaskState.Proto_ActivityTaskFinish ? "0" : "1",
            "1",
          ],
          IsDone: o === Proto_ActivityTaskState.Proto_ActivityTaskTaken,
          CanReward: o === Proto_ActivityTaskState.Proto_ActivityTaskFinish,
          RightTextId:
            o === Proto_ActivityTaskState.Proto_ActivityTaskRunning
              ? "Text_NotFinished_Text"
              : void 0,
        };
      e.push(a);
    }
    return (
      e.sort((t, e) =>
        t.State === e.State
          ? t.TaskId - e.TaskId
          : t.State === Proto_ActivityTaskState.Proto_ActivityTaskFinish ||
              (e.State !== Proto_ActivityTaskState.Proto_ActivityTaskFinish &&
                t.State === Proto_ActivityTaskState.Proto_ActivityTaskRunning)
            ? -1
            : 1,
      ),
      e
    );
  }
  HGl() {
    var t,
      e = [];
    let i = -1;
    for (let t = 0; t < this.UVa.TaskCount; t++) {
      var r = t < this.xVa.InvitedCount,
        r = (r && (i = t), { IsLight: r, IsBlink: !1 });
      e.push(r);
    }
    return (
      -1 !== i &&
        LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey
            .Spring25FirstDoneTaskIndex,
          -1,
        ) < i &&
        (((t = e[i]).IsBlink = !0), (e[i] = t)),
      e
    );
  }
  jGl() {
    var t = this.UVa,
      e = this.PVa,
      i = [];
    for (const o of this.xVa.InvitedRoleSet) i.push(o);
    i.sort((t, e) => t - e);
    var r = [];
    for (const n of i) {
      var a = {
        SignId: n,
        IsChosen: n === e.CurrentLetterSignId,
        IsNew: this.IsLetterNewBySignId(n),
        TexturePath: t.GetLetterIconBySignId(n),
        DescriptionTextId: t.GetLetterTabTextIdBySignId(n),
      };
      r.push(a);
    }
    return r;
  }
  A3l(t) {
    var e = [];
    if (void 0 !== t) {
      var i = t.ContentList,
        r = t.PosList,
        a = t.AnimNameList;
      for (let t = 0; t < i.length; t++) {
        var o = { ContentTextId: i[t], Position: r[t], SpineAnimName: a[t] };
        e.push(o);
      }
    }
    return e;
  }
  x3l(t) {
    return [
      {
        AtlasPath: t?.LeftSpineAtlas,
        SkeletonDataPath: t?.LeftSpineSkeletonData,
      },
      {
        AtlasPath: t?.RightSpineAtlas,
        SkeletonDataPath: t?.RightSpineSkeletonData,
      },
    ];
  }
  Z2l(t) {
    t = this.UVa.GetChatConfigBySignId(
      t,
      ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() ?? 1,
    );
    return this.A3l(t);
  }
  L3l() {
    var t = this.UVa.StartChatCfgByGender(
      ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() ?? 1,
    );
    return this.A3l(t);
  }
  I3l(t) {
    t = this.UVa.GetChatConfigBySignId(
      t,
      ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() ?? 1,
    );
    return this.x3l(t);
  }
  T3l() {
    var t = this.UVa.StartChatCfgByGender(
      ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() ?? 1,
    );
    return this.x3l(t);
  }
}
exports.Spring25Model = Spring25Model;
//# sourceMappingURL=Spring25Model.js.map
