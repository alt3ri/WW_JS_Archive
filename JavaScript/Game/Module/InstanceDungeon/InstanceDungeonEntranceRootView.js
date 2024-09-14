"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonEntranceRootView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase"),
  CommonTabComponentData_1 = require("../Common/TabComponent/CommonTabComponentData"),
  TabComponentWithCaptionItem_1 = require("../Common/TabComponent/TabComponentWithCaptionItem"),
  CommonTabItem_1 = require("../Common/TabComponent/TabItem/CommonTabItem"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  HelpController_1 = require("../Help/HelpController"),
  RoleController_1 = require("../RoleUi/RoleController"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  DynScrollView_1 = require("../Util/ScrollView/DynScrollView"),
  InstanceDungeonData_1 = require("./Define/InstanceDungeonData"),
  InstanceDetectDynamicItem_1 = require("./InstanceDetectDynamicItem"),
  InstanceDetectItem_1 = require("./InstanceDetectItem"),
  InstanceDungeonEntranceController_1 = require("./InstanceDungeonEntranceController"),
  CLICK_INSTANCE_BEGIN_BUTTON_CD = 500;
class InstanceDungeonEntranceRootView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.tli = 0),
      (this.Ghi = 0),
      (this.vXa = !1),
      (this.ili = 0),
      (this.dli = 0),
      (this.KFa = 0),
      (this.rli = []),
      (this.nli = new Map()),
      (this.sli = new Map()),
      (this.lli = void 0),
      (this._li = void 0),
      (this.c8a = void 0),
      (this.JZa = 2e3),
      (this.Cli = void 0),
      (this.m8a = void 0),
      (this.lqe = void 0),
      (this.Lli = (t, e, i) => {
        var n = new InstanceDetectItem_1.InstanceDetectItem();
        return (
          n.BindClickInstanceCallback(this.Dli),
          n.BindClickSeriesCallback(this.Rli),
          n.BindCanExecuteChange(this.Lke),
          n.BindSubtitleTextIdGetter(
            InstanceDungeonEntranceController_1
              .InstanceDungeonEntranceController
              .GetInstanceSubtitleTextIdByInstanceId,
          ),
          n.BindSubtitleArgsGetter(
            InstanceDungeonEntranceController_1
              .InstanceDungeonEntranceController
              .GetInstanceSubtitleArgsByInstanceId,
          ),
          n
        );
      }),
      (this.Dli = (t, e, i = void 0) => {
        (this.NUe = t),
          i &&
            (this.c8a && (this.c8a.IsSelect = !1),
            (this.c8a = i),
            (this.c8a.IsSelect = !0)),
          (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId =
            this.NUe),
          this._li && this._li !== e && this._li.SetToggleState(0, !0),
          (this._li = e),
          this.uHa(),
          this.d8a(),
          this.UiViewSequence.PlaySequence("Xz");
      }),
      (this.Rli = (t, e, i) => {
        this.lli && this.lli !== e && this.lli.SetToggleState(0, !0),
          (this.lli = e),
          (this.ili = i ? t : -1),
          (this.NUe = i ? this.nli.get(t)[0] : this.NUe);
        e = this.Uli();
        this.Cli?.RefreshByData(e), this.Cli?.BindLateUpdate(this.Cai);
      }),
      (this.Lke = (t) => this.NUe !== t),
      (this.Cai = () => {
        var t =
          (this.dli - 1) / (this.nli.size + (this.sli.get(this.ili) ?? 0));
        this.GetUIDynScrollViewComponent(0).SetScrollProgress(t),
          this.Cli?.UnBindLateUpdate();
      }),
      (this.fqe = (t, e) => new CommonTabItem_1.CommonTabItem()),
      (this.pqe = (t) => {}),
      (this.yqe = (t) => {}),
      (this.Awe = () => {
        this.CloseMe();
      }),
      (this.C8a = () => {
        if (this.$Fa()) {
          this.KFa =
            TimeUtil_1.TimeUtil.GetServerTimeStamp() +
            CLICK_INSTANCE_BEGIN_BUTTON_CD;
          const i = this.NUe;
          if (i)
            if (
              ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceCanChallenge(
                i,
              )
            )
              if (RoleController_1.RoleController.IsInRoleTrial())
                ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "TrialRoleDungeonsLimit",
                );
              else {
                ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter =
                  !1;
                const n = ModelManager_1.ModelManager.PowerModel.IsPowerEnough(
                  ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(
                    this.NUe,
                  ),
                );
                var t, e;
                ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceLevelTooLow(
                  this.NUe,
                )
                  ? ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                      200,
                    )).FunctionMap.set(2, () => {
                      n
                        ? ((ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId =
                            i),
                          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.ContinueEntranceFlow())
                        : this.Bsa();
                    }),
                    t.FunctionMap.set(1, () => {
                      this.Bli();
                    }),
                    (e =
                      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetUnlockCondition(
                        i,
                      )),
                    t.SetTextArgs(e[1].toString()),
                    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                      t,
                    ))
                  : n
                    ? ((ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId =
                        i),
                      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.ContinueEntranceFlow())
                    : this.Bsa();
              }
            else
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "InstanceDungeonLackChallengeTimes",
              );
          else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "InstanceDungeon",
                17,
                "副本入口界面点击挑战错误，当前未选择副本",
              );
        }
      }),
      (this.ZZa = () => {
        this.Qli(), this.d8a();
      }),
      (this.eeh = () => {
        if (this.Cli)
          for (let t = 0; t < this.Cli.GetScrollItemCount(); t++)
            this.Cli?.GetScrollItemFromIndex(t)?.UpdateSelf();
        this.m8a?.RefreshOnTick && this.m8a.RefreshOnTick();
      }),
      (this.Bli = () => {
        this.UiViewSequence.StopSequenceByKey("Popup"),
          this.UiViewSequence.PlaySequencePurely("Popup", !1, !0);
      });
  }
  get NUe() {
    return this.Ghi;
  }
  set NUe(t) {
    var e, i;
    0 === this.Ghi
      ? (this.vXa = !0)
      : ((e = (i =
          ConfigManager_1.ConfigManager.InstanceDungeonConfig).GetConfig(
          this.Ghi,
        )),
        (i = i.GetConfig(t)),
        e && i && (this.vXa = e.BannerPath !== i.BannerPath)),
      (this.Ghi = t);
  }
  get MXa() {
    return this.vXa;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIDynScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UITexture],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    this.Fq(), this.o1i(), this.g8a(), await this.f8a(), await this.p8a();
  }
  OnStart() {
    this.Qli(), this.d8a();
  }
  OnBeforeShow() {
    this.uHa();
  }
  OnAfterShow() {
    (!this.rli || this.rli.length <= 0) && this.GetItem(2).SetUIActive(!1);
  }
  OnBeforeDestroy() {
    this.v8a(), this.M8a();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnClickEnterInstanceSingle,
      this.C8a,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnNeedRefreshByProtocol,
        this.ZZa,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnClickEnterInstanceSingle,
      this.C8a,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnNeedRefreshByProtocol,
        this.ZZa,
      );
  }
  OnTick(t) {
    (this.JZa -= t), 0 < this.JZa || (this.eeh(), (this.JZa = 2e3));
  }
  Fq() {
    var e, i, t;
    this.tli =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId;
    for ([
      e,
      i,
    ] of ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetSortedByTitleEntranceInstanceIdList(
      this.tli,
    )) {
      let t = this.nli.get(i);
      t || ((t = []), this.nli.set(i, t)), t.push(e);
    }
    for ([, t] of this.nli) for (const n of t) this.rli.push(n);
  }
  M8a() {
    (this.rli.length = 0), this.nli.clear(), this.sli.clear();
  }
  v8a() {
    this.Cli?.ClearChildren(), (this.Cli = void 0);
  }
  g8a() {
    var t = new CommonTabComponentData_1.CommonTabComponentData(
        this.fqe,
        this.pqe,
        this.yqe,
      ),
      e = this.GetItem(6);
    (this.lqe = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
      e,
      t,
      this.Awe,
    )),
      this.lqe.SetTabRootActive(!1);
    const i =
      ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(
        this.tli,
      );
    this.lqe.SetTitleByTextIdAndArgNew(i.Name),
      this.lqe.SetTitleIcon(i.TitleSprite),
      this.lqe.SetHelpButtonCallBack(() => {
        HelpController_1.HelpController.OpenHelpById(i.HelpButtonId);
      });
  }
  async f8a() {
    var t = new DynScrollView_1.DynamicScrollView(
      this.GetUIDynScrollViewComponent(0),
      this.GetItem(1),
      new InstanceDetectDynamicItem_1.InstanceDetectDynamicItem(),
      this.Lli,
    );
    await t.Init(), (this.Cli = t);
  }
  async p8a() {
    var t =
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.CreateInstanceSubViewByType(
        this.tli,
      );
    void 0 !== t &&
      (await t.CreateThenShowByResourceIdAsync(t.ResourceId, this.GetItem(5)),
      (this.m8a = t));
  }
  uHa() {
    var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
      this.NUe,
    );
    t &&
      this.MXa &&
      (this.SetTextureByPath(t.BannerPath, this.GetTexture(3)),
      this.UiViewSequence?.StopSequenceByKey("Switch"),
      this.UiViewSequence?.PlaySequence("Switch"));
  }
  Qli() {
    var t = this.Uli();
    this.Cli?.RefreshByData(t),
      this.Cli?.BindLateUpdate(() => {
        var t = this.Cli?.GetScrollItemCount();
        void 0 !== t &&
          (this.dli + 1 < t || this.Cli?.ScrollToItemIndex(this.dli),
          this.Cli?.UnBindLateUpdate());
      });
  }
  d8a() {
    this.m8a?.RefreshExternalAsync();
  }
  Uli() {
    this.dli = 0;
    var t = [];
    let e = -1;
    this.o1i();
    var i,
      n,
      s = 1 === this.sli.size;
    let o = !1;
    for ([i, n] of this.nli) {
      var r = i === this.ili,
        a = 1 === this.sli.get(i);
      for (const _ of n) {
        if ((e !== i && !s) || (e !== i && s && a)) {
          var h = new InstanceDungeonData_1.InstanceDetectionDynamicData();
          if (
            ((h.InstanceSeriesTitle = i),
            (h.InstanceGirdId = _),
            (h.IsSelect = r),
            (h.IsOnlyOneGrid = a),
            (e = i),
            t.push(h),
            o || this.dli++,
            s && a)
          )
            break;
        }
        !r ||
          a ||
          (((h =
            new InstanceDungeonData_1.InstanceDetectionDynamicData()).InstanceGirdId =
            _),
          (h.IsSelect = _ === (this.NUe ?? 0)),
          (h.IsShow = r),
          t.push(h),
          (o = !!h.IsSelect || o)) ||
          this.dli++;
      }
    }
    return t;
  }
  o1i() {
    let t = 0,
      e = 0,
      i = 0;
    this.sli.clear();
    var n,
      s,
      o,
      r,
      a,
      h = !!this.NUe;
    for ([n, s] of this.nli)
      if (((e = e || n), this.sli.set(n, s.length), !h))
        for (const _ of s)
          (this.ili && n !== this.ili) ||
            ((t = t || _),
            (o =
              ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(
                _,
              )) &&
              _ > this.NUe &&
              ((r =
                ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(
                  _,
                )),
              (a =
                ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
                  _,
                  ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
                )),
              o) &&
              !r &&
              a > i &&
              ((this.NUe = _), (this.ili = n), (i = a)));
    this.NUe || (this.NUe = t),
      this.ili || (this.ili = e),
      (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId =
        this.NUe);
  }
  $Fa() {
    return !(
      this.KFa > TimeUtil_1.TimeUtil.GetServerTimeStamp() &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "InstanceDungeon",
          5,
          "不允许短时间内触发多次进入副本的按钮",
        ),
      1)
    );
  }
  Bsa() {
    const t = this.NUe;
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(35);
    e.FunctionMap.set(2, () => {
      this.Bli(),
        (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId =
          t),
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.ContinueEntranceFlow();
    }),
      e.FunctionMap.set(1, () => {
        this.Bli();
      }),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        e,
      );
  }
}
exports.InstanceDungeonEntranceRootView = InstanceDungeonEntranceRootView;
//# sourceMappingURL=InstanceDungeonEntranceRootView.js.map
