"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapTravelMainView = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById"),
  PropRewardConfById_1 = require("../../../../../../Core/Define/ConfigQuery/PropRewardConfById"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem"),
  LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer"),
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  ActivitySmallItemGrid_1 = require("../../UniversalComponents/ActivitySmallItemGrid"),
  ActivityButtonItem_1 = require("../../UniversalComponents/Functional/ActivityButtonItem"),
  ActivityFunctionalTypeA_1 = require("../../UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityMapTravelController_1 = require("../ActivityMapTravelController"),
  MapTravelSubViewButton_1 = require("./Component/MapTravelSubViewButton"),
  MapTravelSubViewPhantomCollect_1 = require("./Component/MapTravelSubViewPhantomCollect"),
  MapTravelSubViewPhantomQuest_1 = require("./Component/MapTravelSubViewPhantomQuest"),
  MapTravelSubViewSoarChallenge_1 = require("./Component/MapTravelSubViewSoarChallenge"),
  MapTravelSubViewTravelTask_1 = require("./Component/MapTravelSubViewTravelTask"),
  SPINE_PLAY_TIME_SCALE = 1.5,
  openTweenGroupDefine = [0, -1, -1, 1],
  closeTweenGroupDefine = [1, -1, 0, -1],
  SPINE_LAYER_WIDTH = 2520;
class MapTravelMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Otl = void 0),
      (this.xVl = void 0),
      (this.RVl = void 0),
      (this.wVl = void 0),
      (this.PVl = void 0),
      (this.UVl = void 0),
      (this.DVl = new Map()),
      (this.SubViewProxyMap = new Map()),
      (this.ActivityBaseData = void 0),
      (this.BVl = 0),
      (this.qVl = -1),
      (this.Cjl = !1),
      (this.gjl = 0),
      (this.Y5l = new UE.Rotator(0, 0, 0)),
      (this.BgOffset = 0),
      (this.BgScale = 1),
      (this.BgLocation = void 0),
      (this.kVl = () => {
        0 === this.BVl ? this.CloseMe() : this.GVl();
      }),
      (this.$An = (t) => {
        "LevelChange" === t && this._Vl(this.qVl);
      }),
      (this.OVl = () => {
        (this.qVl = this.qVl - 1),
          this.UiViewSequence.PlaySequence("SwitchLeft", !0);
      }),
      (this.FVl = () => {
        (this.qVl = this.qVl + 1),
          this.UiViewSequence.PlaySequence("SwitchRight", !0);
      }),
      (this.NVl = () => {
        ActivityMapTravelController_1.ActivityMapTravelController.RequestMapTravelLevelUp(
          (t) => {
            this.Cjl = t;
          },
        );
      }),
      (this.dvt = (t) => {
        0 === this.BVl &&
          ("CommonRewardView" === t && (0 < this.gjl ? this.fjl() : this.VVl()),
          "RoleLevelUpSuccessAttributeView" === t) &&
          this.VVl();
      }),
      (this.OnOpenSubView = (t) => {
        this.jVl(t);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UITexture],
      [3, UE.UIText],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
      [6, UE.UIItem],
      [7, UE.UIMultiTemplateLayout],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIText],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIItem],
      [17, UE.UIItem],
      [18, UE.UIItem],
      [19, UE.UITexture],
      [20, UE.UIItem],
      [21, UE.UIItem],
      [22, UE.SpineSkeletonAnimationComponent],
      [23, UE.UIItem],
      [24, UE.UIItem],
      [25, UE.UIItem],
      [26, UE.UIItem],
      [27, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [4, this.OVl],
        [5, this.FVl],
      ]);
  }
  async OnBeforeStartAsync() {
    var t;
    (this.ActivityBaseData = this.OpenParam),
      this.ActivityBaseData &&
        ((t = []),
        (this.Otl = new PopupCaptionItem_1.PopupCaptionItem()),
        t.push(this.Otl.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())),
        this.Otl.SetCloseCallBack(this.kVl),
        (this.xVl = new LevelSequencePlayer_1.LevelSequencePlayer(
          this.GetItem(0),
        )),
        (this.wVl =
          new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock()),
        t.push(this.wVl.CreateByActorAsync(this.GetItem(13).GetOwner())),
        (this.PVl =
          new ActivityFunctionalTypeA_1.FunctionalPanelConditionActivate()),
        t.push(this.PVl.CreateByActorAsync(this.GetItem(12).GetOwner())),
        (this.UVl = new ActivityButtonItem_1.ActivityButtonItem()),
        t.push(this.UVl.CreateByActorAsync(this.GetItem(11).GetOwner())),
        this.UVl.SetFunction(this.NVl),
        t.push(this.HVl()),
        (this.RVl = new GenericLayout_1.GenericLayout(
          this.GetMultiTemplateLayout(7),
          () => new ActivitySmallItemGrid_1.ActivitySmallItemGrid(),
        )),
        await Promise.all(t));
  }
  async HVl() {
    var t,
      i,
      e = [];
    for ([t, i] of [
      [1, 14],
      [2, 15],
      [3, 16],
      [4, 17],
    ]) {
      var s = new MapTravelSubViewButton_1.MapTravelSubViewButton(t);
      e.push(s.CreateThenShowByActorAsync(this.GetItem(i).GetOwner())),
        this.DVl.set(t, s),
        s.SetFunction(this.OnOpenSubView);
    }
    await Promise.all(e);
  }
  OnStart() {
    this.UVl.SetRedDotVisible(!0),
      (this.qVl = this.ActivityBaseData.TravelLevel);
    var t = this.ActivityBaseData.GetActivityConfig(),
      t =
        (this.Otl.SetTitleByTextIdAndArgNew(t.TabName.get(0)),
        this.GetSpine(22).SetTimeScale(SPINE_PLAY_TIME_SCALE),
        this.GetItem(25)),
      i = this.GetItem(27),
      e = i.K2_GetComponentLocation(),
      s =
        ((this.BgOffset = Math.abs(t.K2_GetComponentLocation().X - e.X)),
        SPINE_LAYER_WIDTH);
    (this.BgScale = ((this.BgOffset + s) / s) * i.K2_GetComponentScale().X),
      (this.BgLocation = this.GetItem(27).K2_GetComponentLocation()),
      (this.BgLocation = new UE.Vector(
        t.K2_GetComponentLocation().X,
        e.Y,
        t.K2_GetComponentLocation().Z,
      ));
  }
  OnBeforeShow() {
    this.D5e();
  }
  OnBeforeDestroy() {
    (this.Y5l = void 0), (this.BgLocation = void 0);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
      this.$An,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.dvt,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
      this.$An,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.dvt,
      );
  }
  D5e() {
    this._Vl(this.qVl), this.WVl();
  }
  _Vl(t) {
    var i = t < this.ActivityBaseData.TravelLevel,
      e =
        (t < this.ActivityBaseData.TravelLevel
          ? this.QVl(t)
          : t === this.ActivityBaseData.TravelLevel
            ? this.KVl(t)
            : this.$Vl(t),
        this.ActivityBaseData.TravelLevelData.get(t)),
      e =
        ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetLevelExpConfig(
          e.Id,
        ),
      s =
        (this.GetText(1).SetText(t.toString()),
        (this.gjl = 0),
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "FlyStrengthItemId",
        )),
      h = [];
    for (const a of 0 < e.RewardDropId
      ? ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(
          e.RewardDropId,
        )
      : []) {
      var r = { Item: a, HasClaimed: i };
      h.push(r), a[0].ItemId === s && this.gjl++;
    }
    this.RVl.RefreshByData(h),
      this.GetItem(6).SetUIActive(0 < h.length),
      this.GetItem(9).SetUIActive(
        !StringUtils_1.StringUtils.IsEmpty(e.TipsLock),
      ),
      StringUtils_1.StringUtils.IsEmpty(e.TipsLock) ||
        ((e = i ? e.TipsDone : e.TipsLock),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), e)),
      this.GetButton(4).RootUIComp.SetUIActive(0 < t),
      this.GetButton(5).RootUIComp.SetUIActive(
        t < this.ActivityBaseData.MaxTravelLevel,
      );
  }
  XVl(t, i) {
    this.z5l(t / i),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(3),
        "MapTravelExpYellow_Text",
        t,
        i,
      ),
      this.GetText(3).SetUIActive(!0);
  }
  z5l(t) {
    var t = MathUtils_1.MathUtils.Clamp(t, 0, 1),
      i = (this.GetTexture(2).SetFillAmount(t), 360 * (1 - t));
    (this.Y5l.Yaw = i),
      this.GetItem(24).SetUIActive(0.5 < t),
      this.GetItem(23).SetUIRelativeRotation(this.Y5l),
      this.GetItem(24).SetUIRelativeRotation(this.Y5l);
  }
  QVl(t) {
    var t = this.ActivityBaseData.TravelLevelData.get(t),
      i = t.TargetExp,
      t = t.TargetExp;
    this.XVl(i, t),
      this.wVl.SetUiActive(!1),
      this.PVl.SetUiActive(!0),
      this.UVl.SetUiActive(!1),
      this.PVl.SetTextByTextId("MapTravelReward_Get");
  }
  KVl(t) {
    var t = this.ActivityBaseData.MaxTravelLevel === t,
      i = !t && this.ActivityBaseData.CanTravelLevelUp(),
      e = this.ActivityBaseData.GetCurrentExp(),
      s = this.ActivityBaseData.GetCurrentTargetExp();
    t
      ? (this.z5l(1),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(3),
          "MapTravelLevelMaxYellow_Text",
        ),
        this.GetText(3).SetUIActive(!0))
      : this.XVl(e, s),
      this.wVl.SetUiActive(!t && !i),
      this.wVl.SetTextByTextId("PrefabTextItem_2462272635_Text"),
      this.PVl.SetUiActive(t),
      this.UVl.SetUiActive(i),
      t && this.PVl.SetTextByTextId("MapTravelLv_Max"),
      i && this.UiViewSequence.PlaySequence("PreLevelUp");
  }
  $Vl(t) {
    var i = this.ActivityBaseData.TravelLevelData.get(t),
      t = this.ActivityBaseData.MaxTravelLevel === t,
      i = t ? i.AccumulateExp : i.TargetExp;
    t ? (this.z5l(0), this.GetText(3).SetUIActive(!1)) : this.XVl(0, i),
      this.wVl.SetUiActive(!0),
      this.wVl.SetTextByTextId("MapTravelLevelOverUp_Text"),
      this.PVl.SetUiActive(!1),
      this.UVl.SetUiActive(!1);
  }
  VVl() {
    this.Cjl &&
      (this.UiViewSequence.PlaySequence("LevelUp", !1),
      (this.qVl = this.qVl + 1),
      this._Vl(this.qVl),
      this.WVl());
  }
  fjl() {
    var i =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "FlyStrengthItemId",
        ),
      i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(i);
    if (i && i.Parameters) {
      let t = 0;
      for (var [, e] of i.Parameters) {
        t = e;
        break;
      }
      if (0 !== t) {
        i = PropRewardConfById_1.configPropRewardConfById.GetConfig(t);
        if (i) {
          let t = 0;
          for (const s of i.Props)
            if (10 === s.Id) {
              t = s.Value;
              break;
            }
          0 !== t &&
            ((t *= this.gjl),
            ActivityMapTravelController_1.ActivityMapTravelController.OpenSoarStrengthView(
              t,
            ));
        }
      }
    }
  }
  WVl() {
    var t,
      i,
      e = this.ActivityBaseData.GetActivityConfig();
    for ([t, i] of this.DVl.entries()) {
      var [s, h] = this.ActivityBaseData.GetTypeProgress(t),
        r = Math.ceil((s / h) * 100),
        r =
          (i.SetProgressText(r + "%"),
          i.SetProgressTextChangeColor(s !== h),
          i.SetNameTextId(e.TabName.get(t)),
          this.ActivityBaseData.GetTypeRedDotState(t)),
        a = this.ActivityBaseData.GetTypeNewState(t);
      i.SetItemNew(!r && a), i.RefreshRedDot(r), i.SetItemDone(s === h);
    }
  }
  async YVl(t) {
    var i = this.SubViewProxyMap.get(t);
    if (!i) {
      var e = this.GetItem(18);
      switch (t) {
        case 1:
          var s = new MapTravelSubViewTravelTask_1.MapTravelSubViewTravelTask(
              this.ActivityBaseData,
            ),
            s =
              (await s.CreateByResourceIdAsync("UiItem_TravelMapTask", e),
              { Type: t, SpineSkinName: "Green", UiProxy: s });
          return this.SubViewProxyMap.set(t, s), s;
        case 2:
          (s = new MapTravelSubViewPhantomQuest_1.MapTravelSubViewQuest(
            this.ActivityBaseData,
          )),
            (s =
              (await s.CreateByResourceIdAsync(
                "UiItem_TravelMapPhantomTask",
                e,
              ),
              { Type: t, SpineSkinName: "Blue", UiProxy: s }));
          return this.SubViewProxyMap.set(t, s), s;
        case 3:
          (s =
            new MapTravelSubViewPhantomCollect_1.MapTravelSubViewPhantomCollect(
              this.ActivityBaseData,
            )),
            (s =
              (await s.CreateByResourceIdAsync(
                "UiItem_TravelMapPhantomCollect",
                e,
              ),
              { Type: t, SpineSkinName: "Grey", UiProxy: s }));
          return this.SubViewProxyMap.set(t, s), s;
        case 4:
          (s =
            new MapTravelSubViewSoarChallenge_1.MapTravelSubViewSoarChallenge(
              this.ActivityBaseData,
            )),
            (s =
              (await s.CreateByResourceIdAsync(
                "UiItem_TravelMapSoarChallenge",
                e,
              ),
              { Type: t, SpineSkinName: "Orange", UiProxy: s }));
          return this.SubViewProxyMap.set(t, s), s;
      }
    }
    return i;
  }
  async jVl(t) {
    this.BVl = t;
    const i = await this.YVl(t);
    if (i) {
      const e = this.ActivityBaseData.GetActivityConfig();
      this.SetTextureShowUntilLoaded(e.TabIcon.get(t), this.GetTexture(19));
      this.G1a(t, !0),
        this.GetSpine(22).SetSkin(i.SpineSkinName),
        this.GetSpine(22)
          .SetAnimation(0, "AniOpen", !1)
          .AnimationComplete.Add(() => {
            this.Otl.SetTitleByTextIdAndArgNew(e.TabName.get(t)),
              this.xVl.PlayLevelSequenceByName("Start", !1),
              i.UiProxy.SetActive(!0),
              i.UiProxy.PlayStartSequence();
          }),
        this.xVl.PlayLevelSequenceByName("Close"),
        this.UiViewSequence.PlaySequence("AniOpen", !0);
    }
  }
  async GVl() {
    var t = this.BVl;
    const i = await this.YVl(t);
    i &&
      (i.UiProxy.NeedDestroySelf && this.SubViewProxyMap.delete(t),
      this.D5e(),
      i.UiProxy.PlayCloseSequence().finally(() => {
        i.UiProxy.SetActive(!1);
      }),
      this.G1a(t, !1),
      this.GetSpine(22).SetSkin(i.SpineSkinName),
      this.GetSpine(22)
        .SetAnimation(0, "AniClose", !1)
        .AnimationComplete.Add(() => {
          var t = this.ActivityBaseData.GetActivityConfig();
          this.Otl.SetTitleByTextIdAndArgNew(t.TabName.get(0)),
            this.xVl.PlayLevelSequenceByName("Start", !1),
            i.UiProxy.NeedDestroySelf && i.UiProxy.Destroy();
        }),
      this.xVl.PlayLevelSequenceByName("Close"),
      this.UiViewSequence.PlaySequence("AniClose", !0),
      (this.BVl = 0));
  }
  G1a(i, e) {
    var s = (e ? this.GetItem(20) : this.GetItem(21))
        .GetOwner()
        .K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass()),
      h = s.Num(),
      r = e ? openTweenGroupDefine : closeTweenGroupDefine;
    for (let t = 0; t < h; t++) {
      var a = s.Get(t);
      switch (r[t]) {
        case 1:
          var n = a.GetPlayTween(),
            o = this.DVl.get(i).GetIconItem().K2_GetComponentLocation();
          e
            ? (this.LWl(n, o, !0), this.LWl(n, this.BgLocation, !1))
            : (this.LWl(n, this.BgLocation, !0), this.LWl(n, o, !1));
          break;
        case 0:
          n = a.GetPlayTween();
          this.LWl(
            n,
            new UE.Vector(this.BgScale, this.BgScale, this.BgScale),
            !e,
          );
      }
      a.Stop(), a.Play();
    }
  }
  LWl(t, i, e) {
    e ? (t.from = i) : (t.to = i);
  }
}
exports.MapTravelMainView = MapTravelMainView;
//# sourceMappingURL=MapTravelMainView.js.map
