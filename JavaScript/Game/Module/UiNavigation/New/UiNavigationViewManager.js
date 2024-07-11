"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiNavigationViewManager = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const TickSystem_1 = require("../../../../Core/Tick/TickSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiNavigationDefine_1 = require("./UiNavigationDefine");
const UiNavigationGlobalData_1 = require("./UiNavigationGlobalData");
const UiNavigationLogic_1 = require("./UiNavigationLogic");
const UiNavigationViewHandle_1 = require("./UiNavigationViewHandle");
class UiNavigationViewManager {
  static Initialize() {
    this.dde(), this.agt();
  }
  static Clear() {
    this.Cde(), this._gt();
  }
  static agt() {
    this.Xje = TickSystem_1.TickSystem.Add(
      UiNavigationViewManager.Tick,
      "UiNavigationViewManager",
      3,
      !0,
    ).Id;
  }
  static _gt() {
    this.Xje !== TickSystem_1.TickSystem.InvalidId &&
      TickSystem_1.TickSystem.Remove(this.Xje);
  }
  static dde() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.NavigationViewCreate,
      this.GBo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NavigationViewDestroy,
        this.NBo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ResetNavigationListener,
        this.OBo,
      );
  }
  static Cde() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.NavigationViewCreate,
      this.GBo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NavigationViewDestroy,
        this.NBo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ResetNavigationListener,
        this.OBo,
      );
  }
  static kBo(a, e) {
    if (e.ViewName !== UiNavigationDefine_1.POP_TAG)
      UiNavigationViewManager.FBo(a, e);
    else {
      const t = UE.LGUIBPLibrary.GetComponentsInChildren(
        e.GetOwner(),
        UE.TsUiNavigationPanelConfig_C.StaticClass(),
        !1,
      );
      if (t.Num() <= 0) UiNavigationViewManager.FBo(a, e);
      else
        for (let i = t.Num() - 1; i >= 0; --i) {
          const n = t.Get(i);
          if (n.Independent && n.ViewName === UiNavigationDefine_1.POP_TAG) {
            UiNavigationViewManager.VBo(n)
              ? UiNavigationViewManager.FBo(a, e)
              : UiNavigationViewManager.HBo.set([a, e], n);
            break;
          }
        }
    }
  }
  static jBo(i, a) {
    const e = new UiNavigationViewHandle_1.UiNavigationViewHandle(i, a);
    e.AddPanelConfig(i, a), this.WBo.set(i, e), this.uBo.set(i, e);
  }
  static VBo(i) {
    for (const a of this.WBo.values()) if (a.MainPanel === i) return !0;
    return !1;
  }
  static KBo(i, a) {
    let e = void 0;
    for (const t of this.WBo.values()) t.ViewName === a.ViewName && (e = t);
    e && (e.AddPanelConfig(i, a), this.uBo.set(i, e));
  }
  static FBo(i, a) {
    UiNavigationGlobalData_1.UiNavigationGlobalData.NeedCalculateCurrentPanel
      ? this.QBo.set(i, a)
      : this.KBo(i, a);
  }
  static XBo(i) {
    const a = this.uBo.get(i);
    return !!a && (this.uBo.delete(i), a.DeletePanelConfig(i), i === a.TagId);
  }
  static $Bo(i) {
    const a = this.WBo.get(i);
    if (a) {
      this.WBo.delete(i);
      for (const e of a.GetPanelConfigMap().keys()) this.uBo.delete(e);
      return a.ClearPanelConfig(), !0;
    }
    return !1;
  }
  static YBo(i) {
    this.JBo
      ? this.JBo.TagId === i &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiNavigation",
            11,
            "当前导航面板销毁,将导航对象置为空",
          ),
        UiNavigationLogic_1.UiNavigationLogic.UpdateNavigationListener(void 0),
        (this.JBo = void 0))
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiNavigation",
            11,
            "当前导航面板不存在,将导航对象置为空",
          ),
        UiNavigationLogic_1.UiNavigationLogic.UpdateNavigationListener(void 0));
  }
  static MarkCalculateCurrentPanelDirty() {
    UiNavigationGlobalData_1.UiNavigationGlobalData.NeedCalculateCurrentPanel =
      !0;
  }
  static zBo() {
    UiNavigationGlobalData_1.UiNavigationGlobalData.NeedCalculateCurrentPanel &&
      ((UiNavigationGlobalData_1.UiNavigationGlobalData.NeedCalculateCurrentPanel =
        !1),
      this.ZBo());
  }
  static ebo(i, a) {
    (i = i.GetDepth()), (a = a.GetDepth());
    return i !== -1 && a !== -1;
  }
  static ZBo() {
    if (this.WBo.size <= 0)
      (this.JBo = void 0),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiNavigation",
            11,
            "当前没有导航面板,将导航对象置为空",
          ),
        UiNavigationLogic_1.UiNavigationLogic.UpdateNavigationListener(void 0);
    else {
      let i = void 0;
      let a = !0;
      for (const e of this.WBo.values())
        if (e.GetIsActive() && e.GetIsUsable())
          if (i) {
            if (!this.ebo(e, i)) {
              a = !1;
              break;
            }
            e.GetDepth() > i.GetDepth() && (i = e);
          } else i = e;
      a
        ? this.JBo !== i &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("UiNavigation", 11, "查找当前导航界面句柄", [
              "名字",
              i?.ViewName,
            ]),
          this.JBo?.SetIsInController(!1),
          i?.SetIsInController(!0),
          i?.ResetStateIfNullFocus(),
          (this.JBo = i))
        : this.MarkCalculateCurrentPanelDirty();
    }
  }
  static tbo() {
    this.JBo && this.JBo.FindDefaultNavigation();
  }
  static ibo() {
    UiNavigationGlobalData_1.UiNavigationGlobalData.NeedRefreshCurrentPanel &&
      ((UiNavigationGlobalData_1.UiNavigationGlobalData.NeedRefreshCurrentPanel =
        !1),
      this.JBo) &&
      (this.JBo.HasAnyPanelActive()
        ? this.JBo.FindAddPanelConfigNavigation()
        : this.MarkCalculateCurrentPanelDirty());
  }
  static obo() {
    if (!(this.QBo.size <= 0)) {
      for (const [i, a] of this.QBo) this.KBo(i, a);
      this.QBo.clear();
    }
  }
  static rbo() {
    if (!(this.HBo.size <= 0) && this.JBo) {
      let i;
      let a;
      const e = [];
      for ([i, a] of this.HBo)
        a === this.JBo.MainPanel && (e.push(i), this.FBo(i[0], i[1]));
      for (const t of e) this.HBo.delete(t);
    }
  }
  static nbo() {
    this.JBo && this.JBo.TickViewHandle();
  }
  static GetCurrentViewHandle() {
    return this.JBo;
  }
  static RefreshCurrentHotKey() {
    this.JBo && this.JBo.MarkRefreshHotKeyDirty();
  }
  static RefreshCurrentHotKeyTextId() {
    this.JBo && this.JBo.MarkRefreshHotKeyTextIdDirty();
  }
}
(exports.UiNavigationViewManager = UiNavigationViewManager),
  ((_a = UiNavigationViewManager).JBo = void 0),
  (UiNavigationViewManager.WBo = new Map()),
  (UiNavigationViewManager.uBo = new Map()),
  (UiNavigationViewManager.QBo = new Map()),
  (UiNavigationViewManager.HBo = new Map()),
  (UiNavigationViewManager.Xje = TickSystem_1.TickSystem.InvalidId),
  (UiNavigationViewManager.Tick = () => {
    UiNavigationViewManager.ibo(),
      UiNavigationViewManager.nbo(),
      UiNavigationViewManager.zBo(),
      UiNavigationViewManager.obo(),
      UiNavigationViewManager.rbo(),
      UiNavigationViewManager.tbo();
  }),
  (UiNavigationViewManager.GBo = (i, a) => {
    a = a.GetComponentByClass(UE.TsUiNavigationPanelConfig_C.StaticClass());
    a &&
      (ModelManager_1.ModelManager.PlatformModel.IsMobile()
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("UiNavigation", 11, "移动端出现PC配置", [
            "ViewName",
            a.ViewName,
          ])
        : a.Independent
          ? (UiNavigationViewManager.jBo(i, a),
            UiNavigationViewManager.MarkCalculateCurrentPanelDirty())
          : _a.kBo(i, a));
  }),
  (UiNavigationViewManager.NBo = (i, a) => {
    a &&
      UiNavigationViewManager.XBo(i) &&
      (UiNavigationViewManager.$Bo(i),
      UiNavigationViewManager.YBo(i),
      UiNavigationViewManager.MarkCalculateCurrentPanelDirty());
  }),
  (UiNavigationViewManager.OBo = () => {
    _a.JBo &&
      (_a.JBo.ResetNavigationListener(),
      ModelManager_1.ModelManager.UiNavigationModel.MarkMoveInstantly());
  });
// # sourceMappingURL=UiNavigationViewManager.js.map
