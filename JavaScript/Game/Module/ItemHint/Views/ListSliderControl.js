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
      (this.hgi = 0),
      (this.FinishPlayStart = () => {
        (this.hgi = 2), this.PlayHalfway();
      }),
      (this.FinishPlayHalfway = () => {}),
      (this.FinishPlayEnd = () => {
        this.hgi = 4;
      });
  }
  get AddShowTime() {
    return this.AddShowTimeInternal;
  }
  set AddShowTime(t) {
    this.AddShowTimeInternal = t;
  }
  get Status() {
    return this.hgi;
  }
  set Status(t) {
    this.hgi = t;
  }
  async AsyncLoadUiResource() {}
  InitData() {}
  Play() {
    (this.hgi = 1), (this.AddShowTime = 0), this.PlayStart();
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
    (this.lgi = void 0),
      (this._gi = void 0),
      (this.eGe = void 0),
      (this.ugi = void 0),
      (this.cgi = 0),
      (this.mgi = new Array()),
      (this.dgi = new Array()),
      (this.Cgi = 0),
      (this.ggi = 0),
      (this.fgi = void 0),
      (this.pgi = 0),
      (this.vgi = 0),
      (this.Mgi = 0),
      (this.Sgi = !1),
      (this.Egi = 0),
      (this.ygi = 0),
      (this.IsFinish = !1),
      (this.xNt = void 0),
      (this.rgi = void 0),
      (this.sgi = void 0),
      (this.Igi = void 0),
      (this.Tgi = void 0),
      (this.hn = 0),
      (this.lgi = t),
      (this.ugi = i),
      (this.cgi = this.ugi.GetHeight()),
      this.ugi.SetUIActive(!1),
      (this._gi = this.ugi.GetParentAsUIItem()),
      (this.Sgi = this._gi.IsUIActiveInHierarchy()),
      (this.eGe = this._gi
        .GetOwner()
        .GetComponentByClass(UE.UIVerticalLayout.StaticClass())),
      void 0 === s
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "ItemHint",
            9,
            "ListSliderControl错误, getMaxCount回调不能为undefined",
          )
        : ((this.xNt = s),
          (this.rgi = h),
          (this.sgi = e),
          (this.Igi = o),
          (this.fgi = r),
          (this.pgi = 0),
          (this.Cgi =
            n ?? ConfigManager_1.ConfigManager.RewardConfig.GetShowTime()),
          (this.ggi =
            a ?? ConfigManager_1.ConfigManager.RewardConfig.GetSliderTime()),
          (this.ygi = s()));
  }
  DisEnableParentLayout() {
    this._gi
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
    if ((this.Lgi(), this.Dgi(), this.Sgi)) {
      if (this.mgi.length <= 0 && !this.rgi())
        return this.IsFinish
          ? void 0
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "ItemHint",
                11,
                "[ListSliderControl::Tick]已播放完毕,执行结束回调",
              ),
            (this.IsFinish = !0),
            void this.Igi());
      this.IsFinish && (this.IsFinish = !1);
      let t = h,
        i = (t > TimerSystem_1.MIN_TIME && (t = TimerSystem_1.MIN_TIME), 0),
        s = 0;
      for (const e of this.mgi)
        this.Rgi(e, i),
          this.SliderItemTick(e, t, i),
          i++,
          (0 !== this.fgi || e.Status < 3) && s++;
      if ((this.Ugi(t), this.Agi(), !(s > this.ygi))) {
        if (
          (this.Egi !== s && ((this.Egi = s), this.Pgi()),
          1 === this.hn &&
            this.vgi > LOAD_LIMIT_TIME &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "ItemHint",
                11,
                "[ListSliderControl::Tick]异步加载格子时间过长,重置状态",
              ),
            (this.Tgi.Status = 5),
            (this.Tgi = void 0),
            (this.hn = 0),
            (this.vgi = 0)),
          !this.rgi())
        )
          return 1 === this.hn
            ? void (this.vgi += t)
            : void (
                2 === this.hn &&
                (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "ItemHint",
                    11,
                    "[ListSliderControl::Tick]检查不到下个对象,执行缓存对象逻辑,到None",
                  ),
                this.Tgi.SetActive(!0),
                this.Tgi.Play(),
                (this.Tgi = void 0),
                (this.hn = 0),
                (this.vgi = 0))
              );
        h = this.sgi();
        this.vgi >= h &&
          2 === this.hn &&
          (this.Tgi &&
            (this.Tgi.SetActive(!0), this.Tgi.Play(), (this.Tgi = void 0)),
          (this.vgi = 0),
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
            this.xgi().then((t) => {
              (this.Tgi = t),
                this.Tgi.AsyncLoadUiResource().then(
                  () => {
                    this.Tgi &&
                      (this.Tgi.InitData(),
                      this.Tgi.SetActive(!1),
                      (this.hn = 2),
                      Log_1.Log.CheckInfo()) &&
                      Log_1.Log.Info(
                        "ItemHint",
                        11,
                        "[ListSliderControl::Tick]资源开始完成,到Loaded",
                      );
                  },
                  () => {
                    (this.Tgi.Status = 5),
                      (this.Tgi = void 0),
                      (this.hn = 0),
                      (this.vgi = 0),
                      Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info(
                          "ItemHint",
                          11,
                          "[ListSliderControl::Tick]异步加载格子失败,到None",
                        );
                  },
                );
            })),
          (this.vgi += t);
      }
    }
  }
  Lgi() {
    var t = this._gi.IsUIActiveInHierarchy();
    if (t !== this.Sgi) {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("ItemHint", 9, "滑动状态变化", ["activeStatus", t]),
        (this.Sgi = t);
      for (const i of this.mgi) i.ActiveStatusChange(t);
    }
  }
  Dgi() {
    var t = this.xNt();
    if (
      t !== this.ygi &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "ItemHint",
          11,
          "[ListSliderControl::Tick]最大数量发生变化",
        ),
      (this.ygi = t),
      0 === this.sgi())
    )
      for (const i of this.mgi) i.AddShowTime = 0;
  }
  Rgi(t, i) {
    (t = t.GetRootItem()),
      (i =
        -this.Mgi -
        this.eGe.Padding.Top -
        0.5 * this.cgi -
        (i + this.pgi) * (this.cgi + this.eGe.Spacing));
    t.SetAnchorOffsetY(i);
  }
  SliderItemTick(t, i, s) {
    t.Tick(i),
      2 === t.Status && (t.AddShowTime += i),
      (0 !== this.fgi && 0 !== s) ||
        (4 === t.Status
          ? (t.Status = 5)
          : 2 === t.Status &&
            t.AddShowTime >= this.Cgi &&
            ((t.Status = 3), t.PlayEnd(), 0 === this.fgi) &&
            (this.pgi--, this.wgi()));
  }
  async xgi() {
    let t = void 0;
    var i;
    return (
      0 < this.dgi.length
        ? (t = this.dgi.shift())
        : ((i = LguiUtil_1.LguiUtil.CopyItem(this.ugi, this._gi)),
          await (t = new this.lgi()).CreateByActorAsync(i.GetOwner())),
      this.mgi.push(t),
      t
    );
  }
  Ugi(t) {
    this.Mgi <= 0 ||
      ((this.Mgi -= (this.cgi / this.ggi) * t), 0 < this.Mgi) ||
      (this.Mgi = 0);
  }
  Agi() {
    for (var t = this.mgi; !(t.length <= 0); ) {
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
        this.dgi.push(i),
        1 === this.fgi ? this.wgi() : 0 === this.fgi && this.pgi++;
    }
  }
  wgi() {
    this.Mgi += this.cgi + this.eGe.Spacing;
  }
  DestroyMe() {
    this.eGe && this.eGe.SetEnable(!0);
    for (const t of this.mgi) t.Destroy();
    this.mgi = void 0;
    for (const i of this.dgi) i.Destroy();
    this.dgi = void 0;
  }
  Pgi() {
    this._gi.SetHeight(this.Egi * this.cgi);
  }
}
exports.ListSliderControl = ListSliderControl;
//# sourceMappingURL=ListSliderControl.js.map
