"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TermExplanationController = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Pool_1 = require("../../../Core/Container/Pool"),
  TermById_1 = require("../../../Core/Define/ConfigQuery/TermById"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  UiManager_1 = require("../../Ui/UiManager"),
  TermExplanationDefine_1 = require("./TermExplanationDefine"),
  POOL_CAPACITY = 5;
class TermTextRegistryHandle {
  constructor() {
    (this.FFe = 0),
      (this.pi1 = void 0),
      (this.l7 = !0),
      (this.f8o = 0),
      (this.ViewId = 0),
      (this.AttachDir = 0),
      (this.AttachItem = void 0),
      (this.OnDisableClick = void 0),
      (this.Offset = [0, 0]),
      (this.NeedHighlight = !0),
      (this.LastText = "");
  }
  get Id() {
    return this.FFe;
  }
  get UiText() {
    return this.pi1;
  }
  get Enable() {
    return this.l7;
  }
  get Type() {
    return this.f8o;
  }
  SetEnable(t) {
    this.l7 = t;
  }
  SetUiText(t) {
    this.pi1 = t;
  }
  SetType(t) {
    this.f8o = t;
  }
  Clear() {
    this.UiText?.GetOwner()?.OnDestroyed?.Clear(),
      this.UiText?.IsValid() && this.UiText.OnHyperLinkClickCallBack.Unbind(),
      this.SetEnable(!0),
      this.SetUiText(void 0),
      this.SetType(0),
      (this.OnDisableClick = void 0),
      (this.ViewId = 0),
      (this.AttachDir = 0),
      (this.AttachItem = void 0),
      (this.Offset = [0, 0]),
      (this.NeedHighlight = !0);
  }
}
class TermExplanationController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnTermExplanationViewClosed,
        this.Mm1,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnTermExplanationViewBeforeStart,
        this.w01,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ResetToBattleView,
        this.Gto,
      ),
      !0
    );
  }
  static OnClear() {
    for (var [, t] of this.vi1.entries()) this.yi1.Put(t);
    return (
      (this.Si1 = 0),
      (this.A01 = void 0),
      this.vi1.clear(),
      this.yi1.Clear(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnTermExplanationViewClosed,
        this.Mm1,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnTermExplanationViewBeforeStart,
        this.w01,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ResetToBattleView,
        this.Gto,
      ),
      !0
    );
  }
  static OnTick(t) {
    let e = !1;
    for (var [, i] of this.vi1.entries())
      i.UiText &&
        i.UiText.IsValid() &&
        i.UiText.IsUIActiveInHierarchy() &&
        i.LastText !== i.UiText.text &&
        ((i.LastText = i.UiText.text), (e = !0));
    e &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnTermExplanationRegisteredTextContentChange,
      );
  }
  static RegisterTextHyperlink(t, e, i = 0, r, n, a) {
    if (this.Mi1(t))
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "TermExplanation",
            74,
            "术语解释文本控件注册失败: 控件重复注册",
          ),
        0
      );
    const o = this.yi1.Get() ?? this.yi1.Create();
    o.SetUiText(t),
      o.SetType(e),
      (o.OnDisableClick = n),
      (o.AttachDir = i),
      (o.AttachItem = r ?? t),
      a && (o.Offset = a),
      this.vi1.set(++this.Si1, o);
    return (
      t.OnHyperLinkClickCallBack.Bind((t) => this.Ei1(o, t)),
      (t.bEnableHyperLinksHighlight = !0),
      (t.HyperLinksHoverColor = UE.Color.FromHex(
        TermExplanationDefine_1.DEFAULT_HYPERLINK_HOVER_COLOR_HEX,
      )),
      t.GetOwner().OnDestroyed.Add(() => {
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("TermExplanation", 74, "存在文本控件销毁前未解注册!"),
          this.UnRegisterTextHyperlink(t);
      }),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnTermExplanationRegisteredTextContentChange,
      ),
      this.Si1
    );
  }
  static UnRegisterTextHyperlink(t) {
    t = this.Mi1(t);
    t
      ? this.UnRegisterTextHyperlinkById(t)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("TermExplanation", 74, "解注册失败: 未注册的text控件");
  }
  static UnRegisterTextHyperlinkById(t) {
    var e = this.vi1.get(t);
    e
      ? (e.Clear(), this.vi1.delete(t), this.yi1.Put(e))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("TermExplanation", 74, "解注册失败: 不存在此id", [
          "id",
          t,
        ]);
  }
  static SetEnableHyperLink(t, e) {
    t = this.Mi1(t);
    t
      ? this.SetEnableHyperLinkById(t, e)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "TermExplanation",
          74,
          "设置启禁用失败: 未注册的text控件",
        );
  }
  static SetEnableHyperLinkById(t, e) {
    var i = this.vi1.get(t);
    i
      ? i.SetEnable(e)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("TermExplanation", 74, "设置启禁用失败: 不存在此id", [
          "id",
          t,
        ]);
  }
  static OpenTermExplanationView(t) {
    var e,
      i = this.Mi1(t);
    return i
      ? (e = this.vi1.get(i))
        ? 0 === (t = this.Ii1(t.text)).length
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "TermExplanation",
                74,
                "术语解释打开失败: 文本中无超链接",
                ["id", i],
              ),
            !1)
          : this.Ei1(e, t[0])
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "TermExplanation",
              74,
              "术语解释打开失败: 不存在此id",
              ["id", i],
            ),
          !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "TermExplanation",
            74,
            "术语解释打开失败: 未注册的text控件",
          ),
        !1);
  }
  static OpenTermExplanationViewDirectly() {
    var t,
      e,
      i,
      r = [];
    let n = void 0;
    for ([, t] of this.vi1.entries()) {
      var a = this.Ii1(t.UiText.text);
      for (const o of a) r.push(o);
      0 < a.length && !n && (n = t);
    }
    (n.NeedHighlight = !1),
      (this.A01 = n),
      0 === r.length
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "TermExplanation",
            74,
            "术语解释打开失败: 当前文本中无超链接",
          )
        : ((e = { HyperLinkList: r }),
          (i = this.Ti1[n.Type]),
          UiManager_1.UiManager.OpenView(i, e));
  }
  static HasAnyTermInCurrentTexts() {
    for (var [, t] of this.vi1.entries())
      if (t.UiText && t.UiText.IsValid() && t.UiText.IsUIActiveInHierarchy())
        if (0 < this.Ii1(t.UiText.text).length) return !0;
    return !1;
  }
  static IsUiTextRegistered(t) {
    return 0 !== this.Mi1(t);
  }
  static Mi1(t) {
    for (var [e, i] of this.vi1.entries()) if (i.UiText === t) return e;
    return 0;
  }
  static Ei1(t, e) {
    var i, r;
    return (
      t.Enable
        ? void 0 === (i = Number(e)) || isNaN(i)
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "TermExplanation",
              74,
              "术语解释打开失败: 超链接id无法转换为数字id",
              ["Id", e],
            )
          : TermById_1.configTermById.GetConfig(i)
            ? ((t.NeedHighlight = !0),
              (this.A01 = t),
              (i = this.Ti1[t.Type]),
              (r = {
                HyperLinkList: this.Ii1(t.UiText.text),
                FocusedHyperLink: e,
              }),
              UiManager_1.UiManager.OpenView(i, r),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnTermExplanationViewOpening,
                t.Type,
              ))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "TermExplanation",
                74,
                "术语解释打开失败: 该文本未在表s.术语中注册",
                ["文本", e],
              )
        : t.OnDisableClick && t.OnDisableClick(),
      !0
    );
  }
  static Ii1(t, e = !0) {
    var i = [];
    for (const r of Array.from(t.matchAll(/href\s*=\s*(["']?)([^"'\s>]+)\1/gi)))
      r[2] && i.push(r[2]);
    return e ? Array.from(new Set(i)) : i;
  }
  static bi1(t) {
    0 !== t.AttachDir &&
      (1 === t.Type ? this.Li1(t) : 0 === t.Type && this.Ri1(t), this.Ru1(t));
  }
  static Li1(t) {
    var e,
      i,
      r,
      n = UiManager_1.UiManager.GetView(t.ViewId);
    n &&
      (1 !== t.AttachDir && 2 !== t.AttachDir
        ? Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "TermExplanation",
            74,
            "界面吸附失败: 吸附方向与界面类型不匹配",
          )
        : ((e = 1 === t.AttachDir ? -1 : 1),
          (i = (n = n.GetTipItem()).GetLGUISpaceAbsolutePosition()),
          (r = (t = t.AttachItem).GetLGUISpaceAbsolutePosition().X),
          (r += (0.5 - t.GetPivot().X) * t.Width),
          n.SetLGUISpaceAbsolutePosition(
            new UE.Vector(r + e * ((t.Width + n.Width) / 2), i.Y, i.Z),
          )));
  }
  static Ri1(t) {
    var e,
      i,
      r,
      n,
      a = UiManager_1.UiManager.GetView(t.ViewId);
    a &&
      (3 !== t.AttachDir && 4 !== t.AttachDir
        ? Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "TermExplanation",
            74,
            "界面吸附失败: 吸附方向与界面类型不匹配",
          )
        : ((e = 3 === t.AttachDir ? 1 : -1),
          (r = (i = (a =
            a.GetTipItem()).GetParentAsUIItem()).GetLGUISpaceAbsolutePosition()),
          (n = (t = t.AttachItem).GetLGUISpaceAbsolutePosition().Y),
          (n += (0.5 - t.GetPivot().Y) * t.Height),
          i.SetLGUISpaceAbsolutePosition(
            new UE.Vector(r.X, n + e * ((t.Height + a.Height) / 2), r.Z),
          )));
  }
  static Ru1(t) {
    var e,
      i = UiManager_1.UiManager.GetView(t.ViewId);
    i &&
      ((e = (i = i.GetTipItem()).GetLGUISpaceAbsolutePosition()),
      i.SetLGUISpaceAbsolutePosition(
        new UE.Vector(e.X + t.Offset[0], e.Y + t.Offset[1], e.Z),
      ));
  }
}
(exports.TermExplanationController = TermExplanationController),
  ((_a = TermExplanationController).IsTickEvenPausedInternal = !0),
  (TermExplanationController.Si1 = 0),
  (TermExplanationController.A01 = void 0),
  (TermExplanationController.Ti1 = {
    [0]: "TermExplanationCenterView",
    1: "TermExplanationSideView",
  }),
  (TermExplanationController.vi1 = new Map()),
  (TermExplanationController.yi1 = new Pool_1.Pool(
    POOL_CAPACITY,
    () => new TermTextRegistryHandle(),
    (t) => {
      t.Clear();
    },
  )),
  (TermExplanationController.Mm1 = () => {
    for (var [, t] of _a.vi1.entries())
      t.UiText &&
        t.UiText.IsValid() &&
        (t.UiText.SetHyperLinksHoverSpiteActive(!1),
        t.UiText.SetEnableHyperLinksHighlight(!0));
  }),
  (TermExplanationController.w01 = (t) => {
    _a.A01 &&
      ((_a.A01.ViewId = t),
      _a.A01.NeedHighlight &&
        (_a.A01.UiText?.SetEnableHyperLinksHighlight(!1),
        _a.A01.UiText?.SetHyperLinksHoverSpiteActive(!0)),
      _a.bi1(_a.A01));
  }),
  (TermExplanationController.Gto = () => {
    UiManager_1.UiManager.CloseView("TermExplanationSideView");
  });
//# sourceMappingURL=TermExplanationController.js.map
