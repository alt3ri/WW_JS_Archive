"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ListSliderControl = exports.SliderItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LOAD_LIMIT_TIME = 2e3;
class SliderItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.AddShowTimeInternal = 0),
      (this.h0i = 0),
      (this.FinishPlayStart = () => {
        (this.h0i = 2), this.PlayHalfway();
      }),
      (this.FinishPlayHalfway = () => {}),
      (this.FinishPlayEnd = () => {
        this.h0i = 4;
      });
  }
  get AddShowTime() {
    return this.AddShowTimeInternal;
  }
  set AddShowTime(t) {
    this.AddShowTimeInternal = t;
  }
  get Status() {
    return this.h0i;
  }
  set Status(t) {
    this.h0i = t;
  }
  async AsyncLoadUiResource() {}
  InitData() {}
  Play() {
    (this.h0i = 1), (this.AddShowTime = 0), this.PlayStart();
  }
  PlayStart() {}
  PlayHalfway() {}
  PlayEnd() {}
  Tick(t) {
    this.OnTick(t);
  }
  ActiveStatusChange(t) {
    this.OnActiveStatusChange(t);
  }
  OnActiveStatusChange(t) {}
  OnTick(t) {}
  ShowTimeIsEnough(t) {
    return this.AddShowTime >= t;
  }
}
exports.SliderItem = SliderItem;
class ListSliderControl {
  constructor(t, i, s, h, e, o, r = 1, n = void 0, a = void 0) {
    (this.l0i = void 0),
      (this._0i = void 0),
      (this.eGe = void 0),
      (this.u0i = void 0),
      (this.c0i = 0),
      (this.m0i = new Array()),
      (this.d0i = new Array()),
      (this.C0i = 0),
      (this.g0i = 0),
      (this.f0i = void 0),
      (this.p0i = 0),
      (this.v0i = 0),
      (this.M0i = 0),
      (this.E0i = !1),
      (this.S0i = 0),
      (this.y0i = 0),
      (this.IsFinish = !1),
      (this.wOt = void 0),
      (this.r0i = void 0),
      (this.s0i = void 0),
      (this.I0i = void 0),
      (this.T0i = void 0),
      (this.hn = 0),
      (this.l0i = t),
      (this.u0i = i),
      (this.c0i = this.u0i.GetHeight()),
      this.u0i.SetUIActive(!1),
      (this._0i = this.u0i.GetParentAsUIItem()),
      (this.E0i = this._0i.IsUIActiveInHierarchy()),
      (this.eGe = this._0i
        .GetOwner()
        .GetComponentByClass(UE.UIVerticalLayout.StaticClass())),
      void 0 === s
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "ItemHint",
            9,
            "ListSliderControl错误, getMaxCount回调不能为undefined",
          )
        : ((this.wOt = s),
          (this.r0i = h),
          (this.s0i = e),
          (this.I0i = o),
          (this.f0i = r),
          (this.p0i = 0),
          (this.C0i =
            n ?? ConfigManager_1.ConfigManager.RewardConfig.GetShowTime()),
          (this.g0i =
            a ?? ConfigManager_1.ConfigManager.RewardConfig.GetSliderTime()),
          (this.y0i = s()));
  }
  DisEnableParentLayout() {
    this._0i
      ? this.eGe
        ? this.eGe.SetEnable(!1)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "ItemHint",
            9,
            "ListSliderControl错误, 父节点不包含UIVerticalLayout组件",
          )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "ItemHint",
          9,
          "ListSliderControl错误, ParentUiItem为undefined",
        );
  }
  Tick(h) {
    if ((this.L0i(), this.D0i(), this.E0i)) {
      if (this.m0i.length <= 0 && !this.r0i())
        return this.IsFinish
          ? void 0
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "ItemHint",
                11,
                "[ListSliderControl::Tick]已播放完毕,执行结束回调",
              ),
            (this.IsFinish = !0),
            void this.I0i());
      this.IsFinish && (this.IsFinish = !1);
      let t = h,
        i = (t > TimerSystem_1.MIN_TIME && (t = TimerSystem_1.MIN_TIME), 0),
        s = 0;
      for (const e of this.m0i)
        this.R0i(e, i),
          this.SliderItemTick(e, t, i),
          i++,
          (0 !== this.f0i || e.Status < 3) && s++;
      if ((this.U0i(t), this.A0i(), !(s > this.y0i))) {
        if (
          (this.S0i !== s && ((this.S0i = s), this.P0i()),
          1 === this.hn &&
            this.v0i > LOAD_LIMIT_TIME &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "ItemHint",
                11,
                "[ListSliderControl::Tick]异步加载格子时间过长,重置状态",
              ),
            (this.T0i.Status = 5),
            (this.T0i = void 0),
            (this.hn = 0),
            (this.v0i = 0)),
          !this.r0i())
        )
          return 1 === this.hn
            ? void (this.v0i += t)
            : void (
                2 === this.hn &&
                (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "ItemHint",
                    11,
                    "[ListSliderControl::Tick]检查不到下个对象,执行缓存对象逻辑,到None",
                  ),
                this.T0i.SetActive(!0),
                this.T0i.Play(),
                (this.T0i = void 0),
                (this.hn = 0),
                (this.v0i = 0))
              );
        h = this.s0i();
        this.v0i >= h &&
          2 === this.hn &&
          (this.T0i &&
            (this.T0i.SetActive(!0), this.T0i.Play(), (this.T0i = void 0)),
          (this.v0i = 0),
          (this.hn = 0),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info(
            "ItemHint",
            11,
            "[ListSliderControl::Tick]资源使用完成,到None",
          ),
          0 === this.hn &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "ItemHint",
                11,
                "[ListSliderControl::Tick]资源正在加载中,到Loading",
              ),
            (this.hn = 1),
            this.x0i().then((t) => {
              (this.T0i = t),
                this.T0i.AsyncLoadUiResource().then(
                  () => {
                    this.T0i &&
                      (this.T0i.InitData(),
                      this.T0i.SetActive(!1),
                      (this.hn = 2),
                      Log_1.Log.CheckInfo()) &&
                      Log_1.Log.Info(
                        "ItemHint",
                        11,
                        "[ListSliderControl::Tick]资源开始完成,到Loaded",
                      );
                  },
                  () => {
                    (this.T0i.Status = 5),
                      (this.T0i = void 0),
                      (this.hn = 0),
                      (this.v0i = 0),
                      Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info(
                          "ItemHint",
                          11,
                          "[ListSliderControl::Tick]异步加载格子失败,到None",
                        );
                  },
                );
            })),
          (this.v0i += t);
      }
    }
  }
  L0i() {
    var t = this._0i.IsUIActiveInHierarchy();
    if (t !== this.E0i) {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("ItemHint", 9, "滑动状态变化", ["activeStatus", t]),
        (this.E0i = t);
      for (const i of this.m0i) i.ActiveStatusChange(t);
    }
  }
  D0i() {
    var t = this.wOt();
    if (
      t !== this.y0i &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "ItemHint",
          11,
          "[ListSliderControl::Tick]最大数量发生变化",
        ),
      (this.y0i = t),
      0 === this.s0i())
    )
      for (const i of this.m0i) i.AddShowTime = 0;
  }
  R0i(t, i) {
    (t = t.GetRootItem()),
      (i =
        -this.M0i -
        this.eGe.Padding.Top -
        0.5 * this.c0i -
        (i + this.p0i) * (this.c0i + this.eGe.Spacing));
    t.SetAnchorOffsetY(i);
  }
  SliderItemTick(t, i, s) {
    t.Tick(i),
      2 === t.Status && (t.AddShowTime += i),
      (0 !== this.f0i && 0 !== s) ||
        (4 === t.Status
          ? (t.Status = 5)
          : 2 === t.Status &&
            t.AddShowTime >= this.C0i &&
            ((t.Status = 3), t.PlayEnd(), 0 === this.f0i) &&
            (this.p0i--, this.w0i()));
  }
  async x0i() {
    let t = void 0;
    var i;
    return (
      0 < this.d0i.length
        ? (t = this.d0i.shift())
        : ((i = LguiUtil_1.LguiUtil.CopyItem(this.u0i, this._0i)),
          await (t = new this.l0i()).CreateByActorAsync(i.GetOwner())),
      this.m0i.push(t),
      t
    );
  }
  U0i(t) {
    this.M0i <= 0 ||
      ((this.M0i -= (this.c0i / this.g0i) * t), 0 < this.M0i) ||
      (this.M0i = 0);
  }
  A0i() {
    for (var t = this.m0i; !(t.length <= 0); ) {
      var i = t[0];
      if (5 !== i.Status) return;
      (i.Status = 0),
        t.shift(),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "ItemHint",
            11,
            "[ListSliderControl::RecycleItem]对象进行回收",
            ["当前剩余数量", t.length],
          ),
        i.SetActive(!1),
        this.d0i.push(i),
        1 === this.f0i ? this.w0i() : 0 === this.f0i && this.p0i++;
    }
  }
  w0i() {
    this.M0i += this.c0i + this.eGe.Spacing;
  }
  DestroyMe() {
    this.eGe && this.eGe.SetEnable(!0);
    for (const t of this.m0i) t.Destroy();
    this.m0i = void 0;
    for (const i of this.d0i) i.Destroy();
    this.d0i = void 0;
  }
  P0i() {
    this._0i.SetHeight(this.S0i * this.c0i);
  }
}
exports.ListSliderControl = ListSliderControl;
//# sourceMappingURL=ListSliderControl.js.map
