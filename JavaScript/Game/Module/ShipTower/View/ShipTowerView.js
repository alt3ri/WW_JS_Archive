"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../RedDot/RedDotController"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  LoadAsyncPromise_1 = require("../../UiComponent/LoadAsyncPromise"),
  ShipTowerDefine_1 = require("../ShipTowerDefine"),
  ShipTowerStageItemBase_1 = require("./ShipTowerStageItemBase"),
  stageTypeMap = new Map([
    [0, ShipTowerStageItemBase_1.ShipTowerStageItemOneTime],
    [1, ShipTowerStageItemBase_1.ShipTowerStageItemRefresh],
    [2, ShipTowerStageItemBase_1.ShipTowerStageItemEndless],
  ]),
  MASK_LAYER_TAG = "ShipTower.CheckNeedShowView";
class ShipTowerView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.OpenParam = void 0),
      (this.zJa = void 0),
      (this.UiScrollViewStage = void 0),
      (this.Z9_ = void 0),
      (this.rH_ = []),
      (this.Ra_ = 0.001),
      (this.e$_ = 0),
      (this.t$_ = 0),
      (this.Ua_ = void 0),
      (this.Da_ = 0),
      (this.OA_ = new Map()),
      (this.hpt = []),
      (this.sma = void 0),
      (this.UiCureChangeArea = void 0),
      (this.ChangeAreaScrollDuration = 0),
      (this.UiCureFlipPage = void 0),
      (this.UiCureScrollTo = void 0),
      (this.FlipPageDistanceThreshold = 0),
      (this.FlipPageScrollDuration = 0),
      (this.FlipPageIntervalDistance = 0),
      (this.i$_ = void 0),
      (this.r$_ = void 0),
      (this.o$_ = void 0),
      (this.n$_ = void 0),
      (this.s$_ = 0),
      (this.a$_ = 0),
      (this.h$_ = 0),
      (this.l$_ = 0),
      (this._$_ = new UE.Rotator(0, 0, 0)),
      (this.c$_ = new UE.Rotator(0, 0, 0)),
      (this.u$_ = new UE.Rotator(0, 0, 0)),
      (this.GW_ = !1),
      (this.FW_ = !0),
      (this.bzt = !1),
      (this.pKe = () => (
        (this.bzt = !0),
        Log_1.Log.CheckDebug() && Log_1.Log.Debug("ShipTower", 69, "拖动开始"),
        !0
      )),
      (this.SKe = () => (
        (this.bzt = !1),
        Log_1.Log.CheckDebug() && Log_1.Log.Debug("ShipTower", 69, "拖动结束"),
        !0
      )),
      (this.Xtc = (t) => {
        this.Ytc(!1);
      }),
      (this.Ba_ = () => {
        ModelManager_1.ModelManager.ShipTowerModel.OpenViewBuff({
          OperationType: 0,
        });
      }),
      (this.R2e = () => {
        ModelManager_1.ModelManager.ShipTowerModel.OpenViewReward();
      }),
      (this.fq_ = () => {
        ModelManager_1.ModelManager.ShipTowerModel.OpenViewRecord();
      }),
      (this.ka_ = () => {
        if (!this.NW_()) {
          for (const t of this.Ua_)
            if (t.OutIndex + 1 < this.Da_) return void this.VW_(t.OutIndex);
          this.VW_(0);
        }
      }),
      (this.Oa_ = () => {
        if (!this.jW_()) {
          for (const t of this.Ua_)
            if (t.OutIndex > this.Da_) return void this.VW_(t.OutIndex);
          this.VW_(this.Ua_[this.Ua_.length - 1].OutIndex);
        }
      }),
      (this.HW_ = () => {
        TimerSystem_1.TimerSystem.Next(() => {
          this.IsDestroyOrDestroying ||
            (this.ScrollTweenerEnd(),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Temp", 69, "Tweener滚动完成"));
        });
      }),
      (this.Ga_ = (t) => {
        var i,
          e,
          t = t.Y;
        t !== this.Ra_ &&
          ((this.Ra_ = t),
          (e =
            (i = this.UiScrollViewStage.ContentUIItem.GetAnchorOffsetY() ?? 0) -
            this.t$_),
          (this.t$_ = i),
          this.Fa_(i),
          this.d$_(i),
          this.UpdateGearScroll(e),
          this.UpdateCompassPercent(t),
          Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug(
            "ShipTower",
            69,
            "关卡列表滚动",
            ["比例[0-1]", t],
            ["增值", e],
            ["位置", i],
            ["顶部关卡索引", this.Da_],
            [
              "调试状态",
              ModelManager_1.ModelManager.ShipTowerModel.DebugParallaxSub,
            ],
          );
      }),
      (this.$W_ = () => {
        var t =
          ModelManager_1.ModelManager.ShipTowerModel.IsExistFirstGetBuff();
        this.GetItem(28)?.SetUIActive(t);
      }),
      (this.gq_ = () => {
        var t =
          ModelManager_1.ModelManager.ShipTowerModel.IsEndlessRecordOpen();
        this.GetButton(2)?.RootUIComp.SetUIActive(t);
      }),
      (this.kOe = () => {
        this.VG_(),
          ModelManager_1.ModelManager.ShipTowerModel.TimeIsOver() &&
            (this.jm(),
            ModelManager_1.ModelManager.ShipTowerModel?.CheckIsNeedShowConfirmSeasonUpdate());
      }),
      (this.Usa = () => {
        this.OpenParam?.IsFromInstanceDungeon
          ? ModelManager_1.ModelManager.ShipTowerModel.OpenConfirmBackWorld()
          : this.CloseMe();
      }),
      (this.BA_ = () => {
        this.jG_();
      }),
      (this.a9_ = (t) => {
        this.OA_.get(t)?.UpdateData();
      }),
      (this._ti = () => {
        ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(
          ShipTowerDefine_1.SHIP_TOWER_HELP_ID,
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIItem],
      [17, UE.UIItem],
      [18, UE.UIItem],
      [19, UE.UIText],
      [20, UE.UIItem],
      [21, UE.UIScrollViewWithScrollbarComponent],
      [22, UE.UIButtonComponent],
      [23, UE.UIItem],
      [24, UE.UIItem],
      [26, UE.UISprite],
      [25, UE.UISprite],
      [27, UE.UISprite],
      [28, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [1, this.Ba_],
        [2, this.fq_],
        [5, this.ka_],
        [6, this.Oa_],
        [22, this.R2e],
      ]);
  }
  Es_() {
    this.OpenParam?.IsOpenCover ||
      ModelManager_1.ModelManager.ShipTowerModel.ClearChallengeStageData(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("ShipTower", 69, "", ["DataParam", this.OpenParam]);
  }
  async nH_() {
    this.OpenParam?.IsFromInstanceDungeon ||
      (await ModelManager_1.ModelManager.ShipTowerModel.OpenWelcomeView());
  }
  async OnCreateAsync() {
    (this.UiCureChangeArea = await this.SAo(
      ShipTowerDefine_1.shipTowerCurveRes.ChangeArea,
    )),
      (this.UiCureFlipPage = await this.SAo(
        ShipTowerDefine_1.shipTowerCurveRes.FlipPage,
      )),
      (this.UiCureScrollTo = this.UiCureChangeArea);
  }
  async SAo(t) {
    t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    return new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat).Promise;
  }
  async OnBeforeStartAsync() {
    this.Es_(),
      await this.nH_(),
      await ModelManager_1.ModelManager.ShipTowerModel.CheckInitProto(),
      (this.zJa = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.zJa.SetCloseCallBack(this.Usa),
      this.zJa.SetHelpBtnActive(!0),
      this.zJa.SetHelpCallBack(this._ti),
      await this.Na_();
  }
  OnStart() {
    (this.i$_ = this.GetItem(24)),
      (this.r$_ = this.GetSprite(26)),
      (this.o$_ = this.GetSprite(25)),
      (this.n$_ = this.GetSprite(27)),
      (this.UiScrollViewStage = this.GetScrollViewWithScrollbar(21)),
      this.m$_(),
      this.f$_(),
      this.g$_(),
      this.C$_(),
      (this.UiScrollViewStage.ScrollToEaseType = 28),
      this.UiScrollViewStage.OnScrollValueChange.Bind(this.Ga_),
      this.UiScrollViewStage.OnPointerBeginDragCallBack.Bind(this.pKe),
      this.UiScrollViewStage.OnPointerEndDragCallBack.Bind(this.SKe),
      (this.e$_ = this.UiScrollViewStage.ContentUIItem.GetAnchorOffsetY() ?? 0),
      (this.t$_ = this.e$_),
      (this.Z9_ = this.GetItem(20)),
      (this.Ua_ =
        ConfigManager_1.ConfigManager.ShipTowerConfig.GetAllShowStageCfg()),
      this.sH_(),
      this.Fa_(this.e$_),
      this.bA_(),
      this.InitCurStageItemPos();
  }
  InitCurStageItemPos() {
    var t,
      i,
      e = this.WW_();
    e &&
      (this.v$_(0, !1),
      (e =
        (e = this.GetItem(7 + e.OrderIndex - 1)).GetStretchTop() +
        e.GetHeight() / 2),
      (t = this.UiScrollViewStage.RootUIComp.GetHeight()),
      (i = this.UiScrollViewStage.ContentUIItem.GetHeight()),
      (i = Math.max(0, Math.min(i - t, e - t / 2))),
      this.UiScrollViewStage.SetScrollValue(new UE.Vector2D(0, i)));
  }
  WW_() {
    return void 0 !== this.OpenParam?.StageId
      ? ModelManager_1.ModelManager.ShipTowerModel.GetStageDataById(
          this.OpenParam.StageId,
        )
      : ModelManager_1.ModelManager.ShipTowerModel.GetNextChallengeStageData();
  }
  sH_() {
    for (let t = 0; t < this.Z9_.UIChildren.Num(); t++) {
      var i = this.Z9_.UIChildren.Get(t),
        e = this.p$_(i);
      this.rH_.push({
        Item: i,
        InitPosY: i.GetAnchorOffsetY() ?? 0,
        ParallaxSub: e,
      });
    }
  }
  p$_(t, i = 1, e = 1) {
    (t = t.GetDisplayName().split("#")), (t = Number(t[i]));
    return isNaN(t) ? e : t / 100;
  }
  m$_() {
    var t = this.UiScrollViewStage.RootUIComp;
    (this.FlipPageScrollDuration = this.p$_(t, 1, 0.2)),
      (this.FlipPageDistanceThreshold = this.p$_(t, 2, 300)),
      (this.FlipPageIntervalDistance = this.p$_(t, 3, 2));
  }
  f$_() {
    this.ChangeAreaScrollDuration = this.p$_(this.i$_);
  }
  g$_() {
    (this.s$_ = this.p$_(this.r$_, 1, 300)),
      (this.a$_ = this.p$_(this.o$_, 1, 600));
  }
  C$_() {
    (this.h$_ = this.p$_(this.n$_, 1, -45)),
      (this.l$_ = this.p$_(this.n$_, 2, 45));
  }
  bA_() {
    var t =
        this.OpenParam?.StageId ??
        ModelManager_1.ModelManager.ShipTowerModel.TowerStageDataList[0].Id,
      i = this.OpenParam?.ApplyTeamEditStageId,
      e = this.OpenParam?.IsOpenStageDesc,
      s = this.OpenParam?.IsOpenCover;
    e &&
      ModelManager_1.ModelManager.ShipTowerModel.OpenViewDesc(
        { StageId: t, ApplyTeamEditStageId: i, IsOpenCover: s },
        () => {
          this.h9_();
        },
      );
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ShipTowerRewardReceive,
      this.BA_,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ShipTowerSureResetStage,
        this.a9_,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ShipTowerStageUpdate,
        this.a9_,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ShipTowerSureCoverChallenge,
        this.a9_,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ShipTowerBuffNewUpdate,
        this.$W_,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ShipTowerEndlessRecordUpdate,
        this.gq_,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OpenView,
        this.Xtc,
      ),
      RedDotController_1.RedDotController.BindRedDot(
        "ShipTowerReward",
        this.GetItem(23),
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ShipTowerRewardReceive,
      this.BA_,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ShipTowerSureResetStage,
        this.a9_,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ShipTowerStageUpdate,
        this.a9_,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ShipTowerSureCoverChallenge,
        this.a9_,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ShipTowerBuffNewUpdate,
        this.$W_,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ShipTowerEndlessRecordUpdate,
        this.gq_,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OpenView,
        this.Xtc,
      ),
      RedDotController_1.RedDotController.UnBindRedDot("ShipTowerReward");
  }
  OnBeforeShow() {
    this.Slo();
    (this.sma = TimerSystem_1.RealTimeTimerSystem.Forever(this.kOe, 500)),
      ModelManager_1.ModelManager.ShipTowerModel.CloseWelcomeView();
  }
  OnAfterPlayStartSequence() {
    this.OpenParam?.IsOpenStageDesc || this.h9_();
  }
  async h9_() {
    this.Ytc(!0),
      await this.ztc().finally(() => {
        this.Ytc(!1);
      });
  }
  async ztc() {
    await ModelManager_1.ModelManager.ShipTowerModel.CheckIsNeedShowSeasonReview(),
      await ModelManager_1.ModelManager.ShipTowerModel.CheckShowGetBuff();
  }
  Ytc(t) {
    UiLayer_1.UiLayer.SetShowMaskLayer(MASK_LAYER_TAG, t);
  }
  OnAfterHide() {
    this.jm();
  }
  OnBeforeDestroy() {
    this.UiScrollViewStage.OnScrollValueChange.Unbind(),
      this.UiScrollViewStage.OnPointerBeginDragCallBack.Unbind(),
      this.UiScrollViewStage.OnPointerEndDragCallBack.Unbind(),
      this.QW_();
  }
  OnAfterDestroy() {}
  async Na_() {
    0 ===
      ModelManager_1.ModelManager.ShipTowerModel.TowerStageDataList.length &&
      ModelManager_1.ModelManager.ShipTowerModel.CreateDefaultStageDataList();
    var t = ModelManager_1.ModelManager.ShipTowerModel.TowerStageDataList;
    let s = 7;
    await Promise.all(
      t.map(async (t) => {
        var i = this.GetItem(s++),
          e = new (stageTypeMap.get(t.StageType))();
        await e.Init(i, t), this.OA_.set(t.Id, e), this.hpt.push(e);
      }),
    );
  }
  NW_() {
    return this.Ra_ <= 0.05;
  }
  jW_() {
    return 0.95 <= this.Ra_;
  }
  VW_(t) {
    this.FW_ &&
      (ModelManager_1.ModelManager.ShipTowerModel.DebugParallaxSub &&
        this.f$_(),
      (this.UiScrollViewStage.ScrollToDuration = this.ChangeAreaScrollDuration),
      (this.UiCureScrollTo = this.UiCureChangeArea),
      this.v$_(t));
  }
  ScrollToIndexFlipPage(t, i = !0) {
    (this.UiScrollViewStage.ScrollToDuration = this.FlipPageScrollDuration),
      (this.UiCureScrollTo = this.UiCureFlipPage),
      i ? this.v$_(t) : this.KW_(t);
  }
  XW_(t) {
    return MathCommon_1.MathCommon.Clamp(7 + t, 7, 18);
  }
  v$_(t, i = !0) {
    var e = this.XW_(t),
      s = this.GetItem(e),
      h = (0, puerts_1.$ref)(
        new UE.Vector2D(this.UiScrollViewStage.ContentUIItem.RelativeLocation),
      );
    this.UiScrollViewStage.StopMovement(),
      this.UiScrollViewStage.ScrollToTop(h, s, i),
      this.UiScrollViewStage.Tweener?.SetCurveFloat(this.UiCureScrollTo),
      i && (this.ScrollTweenerStart(), this.YW_()),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "ShipTower",
          69,
          "关卡滚动到顶部",
          ["第几艘", t + 1],
          ["组件索引", e],
        );
  }
  KW_(t, i = !0) {
    var e = this.XW_(t),
      s = this.GetItem(e),
      h = (0, puerts_1.$ref)(
        new UE.Vector2D(this.UiScrollViewStage.ContentUIItem.RelativeLocation),
      );
    this.UiScrollViewStage.StopMovement(),
      this.UiScrollViewStage.ScrollToBottom(h, s, i),
      this.UiScrollViewStage.Tweener?.SetCurveFloat(this.UiCureScrollTo),
      i && (this.ScrollTweenerStart(), this.YW_()),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "ShipTower",
          69,
          "关卡滚动到底部",
          ["第几艘", t + 1],
          ["组件索引", e],
        );
  }
  ScrollTweenerStart() {
    (this.FW_ = !1),
      this.UiScrollViewStage.SetRayCastTargetForScrollView(!1),
      this.zW_(!1);
  }
  zW_(i) {
    this.hpt.forEach((t) => {
      t.SetClickEnable(i);
    });
  }
  ScrollTweenerEnd() {
    (this.FW_ = !0),
      this.UiScrollViewStage.SetRayCastTargetForScrollView(!0),
      this.zW_(!0);
  }
  YW_() {
    this.GW_ ||
      (this.UiScrollViewStage.Tweener &&
        ((this.GW_ = !0),
        this.UiScrollViewStage.Tweener.OnCompleteCallBack.Bind(this.HW_)));
  }
  QW_() {
    (this.GW_ = !1),
      this.UiScrollViewStage.Tweener?.OnCompleteCallBack.Unbind();
  }
  d$_(s) {
    const h = ModelManager_1.ModelManager.ShipTowerModel.DebugParallaxSub;
    this.rH_.forEach((t) => {
      var i = h ? this.p$_(t.Item) : t.ParallaxSub,
        e = t.InitPosY + (s - this.e$_) * i;
      t.Item.SetAnchorOffsetY(e),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "ShipTower",
            69,
            "更新视差节点位置",
            ["节点名", t.Item.GetDisplayName()],
            ["位置", e],
            ["相对比例", i],
          );
    });
  }
  UpdateGearScroll(t) {
    ModelManager_1.ModelManager.ShipTowerModel.DebugParallaxSub && this.g$_();
    var i = (t / this.s$_) * 360,
      e = (t / this.a$_) * 360;
    (this.c$_.Yaw = this.c$_.Yaw + i),
      (this.u$_.Yaw = this.u$_.Yaw - e),
      this.r$_.SetUIRelativeRotation(this.c$_),
      this.o$_.SetUIRelativeRotation(this.u$_),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "ShipTower",
          69,
          "更新齿轮滚动",
          ["增值", t],
          ["齿轮角度", i],
          ["大齿轮角度", e],
          ["齿轮长度", this.s$_],
          ["大齿轮长度", this.a$_],
        );
  }
  UpdateCompassPercent(t) {
    ModelManager_1.ModelManager.ShipTowerModel.DebugParallaxSub && this.C$_();
    var i = this.l$_ - this.h$_,
      e = t * i + this.h$_;
    (this._$_.Yaw = e),
      this.n$_.SetUIRelativeRotation(this._$_),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "ShipTower",
          69,
          "更新指南针进度",
          ["比例[0-1]", t],
          ["总角度", i],
          ["当前角度", e],
          ["开始角度", this.h$_],
          ["结束角度", this.l$_],
        );
  }
  Fa_(i) {
    let e = this.Da_;
    for (let t = 7; t <= 18; t++) {
      var s = this.GetItem(t),
        h = s.GetHeight(),
        s = s.GetStretchTop() + h;
      if (((e = t - 7 + 1), i <= s)) break;
    }
    if (this.Da_ !== e) {
      this.Da_ = e;
      for (const t of this.Ua_)
        if (t.OutIndex >= this.Da_) {
          this.GetText(19).ShowTextNew(t.Name);
          break;
        }
    }
  }
  CheckFlipPage(i) {
    var e = this.t$_;
    if (this.FW_ && !(this.Ra_ <= 0 || 1 <= this.Ra_ || this.bzt)) {
      var t = ModelManager_1.ModelManager.ShipTowerModel.DebugParallaxSub;
      if ((t && this.m$_(), !(Math.abs(i) > this.FlipPageIntervalDistance))) {
        var s = this.UiScrollViewStage.RootUIComp.GetHeight();
        for (let t = 0; t < this.Ua_.length; t++) {
          var h = this.Ua_[t - 1],
            r = this.Ua_[t];
          if (h && h.OutIndex + 1 === r.OutIndex)
            return void this.JW_(h.OutIndex - 1, h.OutIndex, s, 0 < i);
          if (this.ZW_(r.OutIndex, e)) return;
          if (this.eQ_(r.OutIndex - 1, e + s)) return;
        }
      }
    }
  }
  JW_(t, i, e, s) {
    var h = this.t$_,
      r = h + e,
      a = this.GetStageItemPosY(t, !1),
      o = this.GetStageItemPosY(i);
    if (!(r < a + 0.5 * this.FlipPageDistanceThreshold)) {
      if (!(r < o))
        return (a = this.UiScrollViewStage.ContentUIItem.GetHeight()) <= o + e
          ? a - e - h < 0.5 * this.FlipPageDistanceThreshold
            ? void this.ScrollToIndexFlipPage(i, !0)
            : void this.ScrollToIndexFlipPage(s ? i : t, s)
          : void (
              h > o + 0.5 * this.FlipPageDistanceThreshold ||
              this.ScrollToIndexFlipPage(i)
            );
      this.ScrollToIndexFlipPage(s ? i : t, s);
    }
  }
  ZW_(t, i) {
    var e = this.GetStageItemPosY(t),
      s = this.FlipPageDistanceThreshold,
      i = i - e;
    return (
      -s < i &&
      i < s &&
      (0.5 * -s < i
        ? this.ScrollToIndexFlipPage(t, !0)
        : this.ScrollToIndexFlipPage(t - 1, !1),
      !0)
    );
  }
  eQ_(t, i) {
    i -= this.GetStageItemPosY(t, !1);
    return (
      i > -this.FlipPageDistanceThreshold &&
      i < this.FlipPageDistanceThreshold &&
      (i < 0.5 * this.FlipPageDistanceThreshold
        ? this.ScrollToIndexFlipPage(t, !1)
        : this.ScrollToIndexFlipPage(t + 1, !0),
      !0)
    );
  }
  GetStageItemPosY(t, i = !0) {
    var t = this.XW_(t),
      t = this.GetItem(t),
      e = t.GetStretchTop();
    return i ? e : e + t.GetHeight();
  }
  Slo() {
    this.gq_(), this.jG_(), this.$W_();
  }
  jG_() {
    var t = ModelManager_1.ModelManager.ShipTowerModel.GetRewardProgressText(),
      t =
        ModelManager_1.ModelManager.ShipTowerModel.GetCurrentStageSeasonName() +
        `(${t})`;
    this.GetText(3).SetText(t), this.VG_();
  }
  VG_() {
    var t = ModelManager_1.ModelManager.ShipTowerModel.GetRewardCountDownDesc();
    this.GetText(4)?.SetText(t);
  }
  jm() {
    TimerSystem_1.RealTimeTimerSystem.Has(this.sma) &&
      (TimerSystem_1.RealTimeTimerSystem.Remove(this.sma), (this.sma = void 0));
  }
}
exports.ShipTowerView = ShipTowerView;
//# sourceMappingURL=ShipTowerView.js.map
