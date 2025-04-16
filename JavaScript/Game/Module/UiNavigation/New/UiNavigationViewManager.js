"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiNavigationViewManager = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  TickSystem_1 = require("../../../../Core/Tick/TickSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiNavigationDefine_1 = require("./UiNavigationDefine"),
  UiNavigationGlobalData_1 = require("./UiNavigationGlobalData"),
  UiNavigationLogic_1 = require("./UiNavigationLogic"),
  UiNavigationViewHandle_1 = require("./UiNavigationViewHandle");
class UiNavigationViewManager {
  static Initialize() {
    this.dde(), this.v0t();
  }
  static Clear() {
    this.Cde(), this.S0t();
  }
  static v0t() {
    (this.s4_ = TickSystem_1.TickSystem.Add(
      UiNavigationViewManager.a4_,
      "UiNavigationViewManager",
      0,
      !0,
    ).Id),
      (this.h4_ = TickSystem_1.TickSystem.Add(
        UiNavigationViewManager.l4_,
        "UiNavigationViewManager",
        3,
        !0,
      ).Id);
  }
  static S0t() {
    this.s4_ !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.s4_),
      (this.s4_ = TickSystem_1.TickSystem.InvalidId)),
      this.h4_ !== TickSystem_1.TickSystem.InvalidId &&
        (TickSystem_1.TickSystem.Remove(this.h4_),
        (this.h4_ = TickSystem_1.TickSystem.InvalidId));
  }
  static dde() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.NavigationViewCreate,
      this.Bbo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NavigationViewDestroy,
        this.bbo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ResetNavigationListener,
        this.qbo,
      );
  }
  static Cde() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.NavigationViewCreate,
      this.Bbo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NavigationViewDestroy,
        this.bbo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ResetNavigationListener,
        this.qbo,
      );
  }
  static Gbo(a, t) {
    if (t.ViewName !== UiNavigationDefine_1.POP_TAG)
      UiNavigationViewManager.Nbo(a, t);
    else {
      var i,
        e = UE.LGUIBPLibrary.GetComponentsInChildren(
          t.GetOwner(),
          UE.TsUiNavigationPanelConfig_C.StaticClass(),
          !1,
        );
      if (e.Num() <= 0)
        return 0 < UiNavigationViewManager.kbo.size
          ? void (
              (i =
                UiNavigationLogic_1.UiNavigationLogic.FindUiNavigationPanelConfig(
                  t.GetOwner(),
                )) && UiNavigationViewManager.kbo.set([a, t], i)
            )
          : void (
              UiNavigationViewManager.Nbo(a, t) ||
              ((i =
                UiNavigationLogic_1.UiNavigationLogic.FindUiNavigationPanelConfig(
                  t.GetOwner(),
                )) &&
                UiNavigationViewManager.kbo.set([a, t], i))
            );
      for (let i = e.Num() - 1; 0 <= i; --i) {
        var n = e.Get(i);
        if (n.Independent && n.ViewName === UiNavigationDefine_1.POP_TAG) {
          UiNavigationViewManager.Obo(n)
            ? UiNavigationViewManager.Nbo(a, t)
            : UiNavigationViewManager.kbo.set([a, t], n);
          break;
        }
      }
    }
  }
  static Fbo(i, a) {
    var t = new UiNavigationViewHandle_1.UiNavigationViewHandle(i, a);
    t.AddPanelConfig(i, a), this.Vbo.set(i, t), this.hbo.set(i, t);
  }
  static Obo(i) {
    for (const a of this.Vbo.values()) if (a.MainPanel === i) return !0;
    return !1;
  }
  static Hbo(i, a) {
    let t = void 0;
    for (const e of this.Vbo.values()) e.ViewName === a.ViewName && (t = e);
    return !!t && (t.AddPanelConfig(i, a), this.hbo.set(i, t), !0);
  }
  static Nbo(i, a) {
    return UiNavigationGlobalData_1.UiNavigationGlobalData
      .NeedCalculateCurrentPanel
      ? (this.jbo.set(i, a), !0)
      : this.Hbo(i, a);
  }
  static Wbo(i) {
    var a = this.hbo.get(i);
    return !!a && (this.hbo.delete(i), a.DeletePanelConfig(i), i === a.TagId);
  }
  static Kbo(i) {
    var a = this.Vbo.get(i);
    if (a) {
      this.Vbo.delete(i);
      for (const t of a.GetPanelConfigMap().keys()) this.hbo.delete(t);
      return a.ClearPanelConfig(), !0;
    }
    return !1;
  }
  static Qbo(i) {
    this.Xbo
      ? this.Xbo.TagId === i &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiNavigation",
            10,
            "当前导航面板销毁,将导航对象置为空",
          ),
        UiNavigationLogic_1.UiNavigationLogic.UpdateNavigationListener(void 0),
        (this.Xbo = void 0))
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiNavigation",
            10,
            "当前导航面板不存在,将导航对象置为空",
          ),
        UiNavigationLogic_1.UiNavigationLogic.UpdateNavigationListener(void 0));
  }
  static MarkCalculateCurrentPanelDirty() {
    UiNavigationGlobalData_1.UiNavigationGlobalData.NeedCalculateCurrentPanel =
      !0;
  }
  static $bo() {
    UiNavigationGlobalData_1.UiNavigationGlobalData.NeedCalculateCurrentPanel &&
      ((UiNavigationGlobalData_1.UiNavigationGlobalData.NeedCalculateCurrentPanel =
        !1),
      this.Ybo());
  }
  static Jbo(i, a) {
    (i = i.GetDepth()), (a = a.GetDepth());
    return -1 !== i && -1 !== a;
  }
  static Ybo() {
    if (this.Vbo.size <= 0)
      (this.Xbo = void 0),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiNavigation",
            10,
            "当前没有导航面板,将导航对象置为空",
          ),
        UiNavigationLogic_1.UiNavigationLogic.UpdateNavigationListener(void 0);
    else {
      let i = void 0,
        a = !0;
      for (const t of this.Vbo.values())
        if (t.GetIsActive() && t.GetIsUsable())
          if (i) {
            if (!this.Jbo(t, i)) {
              a = !1;
              break;
            }
            t.GetDepth() > i.GetDepth() ? (i = t) : t.SetIsInController(!1);
          } else i = t;
      a
        ? this.Xbo !== i &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("UiNavigation", 10, "查找当前导航界面句柄", [
              "名字",
              i?.ViewName,
            ]),
          this.Xbo?.SetIsInController(!1),
          this.Xbo?.CanOverridePositionByGamepad(!1),
          i?.SetIsInController(!0),
          i?.CanOverridePositionByGamepad(!0),
          i?.ResetStateIfNullFocus(),
          (this.Xbo = i))
        : this.MarkCalculateCurrentPanelDirty();
    }
  }
  static zbo() {
    this.Xbo && this.Xbo.FindDefaultNavigation();
  }
  static Zbo() {
    UiNavigationGlobalData_1.UiNavigationGlobalData.NeedRefreshCurrentPanel &&
      ((UiNavigationGlobalData_1.UiNavigationGlobalData.NeedRefreshCurrentPanel =
        !1),
      this.Xbo) &&
      (this.Xbo.HasAnyPanelActive()
        ? this.Xbo.FindAddPanelConfigNavigation()
        : this.MarkCalculateCurrentPanelDirty());
  }
  static eqo() {
    if (!(this.jbo.size <= 0)) {
      for (var [i, a] of this.jbo) this.Hbo(i, a);
      this.jbo.clear();
    }
  }
  static tqo() {
    if (!(this.kbo.size <= 0) && this.Xbo) {
      var i,
        a,
        t = [];
      for ([i, a] of this.kbo)
        a === this.Xbo.MainPanel && (t.push(i), this.Nbo(i[0], i[1]));
      for (const e of t) this.kbo.delete(e);
    }
  }
  static iqo(i) {
    this.Xbo && this.Xbo.TickViewHandle(i);
  }
  static GetCurrentViewHandle() {
    return this.Xbo;
  }
  static RefreshCurrentHotKey() {
    this.Xbo && this.Xbo.MarkRefreshHotKeyDirty();
  }
  static RefreshCurrentHotKeyTextId() {
    this.Xbo && this.Xbo.MarkRefreshHotKeyTextIdDirty();
  }
}
(exports.UiNavigationViewManager = UiNavigationViewManager),
  ((_a = UiNavigationViewManager).Xbo = void 0),
  (UiNavigationViewManager.Vbo = new Map()),
  (UiNavigationViewManager.hbo = new Map()),
  (UiNavigationViewManager.jbo = new Map()),
  (UiNavigationViewManager.kbo = new Map()),
  (UiNavigationViewManager.s4_ = TickSystem_1.TickSystem.InvalidId),
  (UiNavigationViewManager.h4_ = TickSystem_1.TickSystem.InvalidId),
  (UiNavigationViewManager.a4_ = () => {
    UiNavigationViewManager.zbo();
  }),
  (UiNavigationViewManager.l4_ = (i) => {
    UiNavigationViewManager.Zbo(),
      UiNavigationViewManager.iqo(i),
      UiNavigationViewManager.$bo(),
      UiNavigationViewManager.eqo(),
      UiNavigationViewManager.tqo();
  }),
  (UiNavigationViewManager.Bbo = (i, a) => {
    a = a.GetComponentByClass(UE.TsUiNavigationPanelConfig_C.StaticClass());
    a &&
      (Info_1.Info.IsInTouch()
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("UiNavigation", 10, "移动端出现PC配置", [
            "ViewName",
            a.ViewName,
          ])
        : a.Independent
          ? (UiNavigationViewManager.Fbo(i, a),
            UiNavigationViewManager.MarkCalculateCurrentPanelDirty())
          : _a.Gbo(i, a));
  }),
  (UiNavigationViewManager.bbo = (i, a) => {
    a &&
      UiNavigationViewManager.Wbo(i) &&
      (UiNavigationViewManager.Kbo(i),
      UiNavigationViewManager.Qbo(i),
      UiNavigationViewManager.MarkCalculateCurrentPanelDirty());
  }),
  (UiNavigationViewManager.qbo = () => {
    _a.Xbo &&
      (_a.Xbo.ResetNavigationListener(),
      ModelManager_1.ModelManager.UiNavigationModel.MarkMoveInstantly());
  });
//# sourceMappingURL=UiNavigationViewManager.js.map
