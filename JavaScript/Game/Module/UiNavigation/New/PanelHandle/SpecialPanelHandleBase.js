"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialPanelHandleBase = void 0);
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const UiNavigationNewController_1 = require("../UiNavigationNewController");
class SpecialPanelHandleBase {
  constructor(t) {
    (this.DefaultNavigationListener = []),
      (this._wo = new Set()),
      (this.Ffo = new Map()),
      (this.S9 = "Default"),
      (this.S9 = t);
  }
  SetNavigationGroupDefaultListener(t) {
    const e = this.GetNavigationGroup(t.GroupName);
    e
      ? e.DefaultListener || (e.DefaultListener = t)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiNavigation",
          11,
          "找不到导航组信息",
          ["导航组名字", t.GroupName],
          ["导航监听对象", t.RootUIComp.displayName],
        );
  }
  GetNavigationGroup(t) {
    if (!StringUtils_1.StringUtils.IsEmpty(t)) return this.Ffo.get(t);
  }
  SetGroupMap(t) {
    this.Ffo = t;
  }
  AddListener(t) {
    this._wo.add(t);
  }
  DeleteListener(t) {
    this._wo.delete(t);
  }
  GetListenerListByTag(t) {
    const e = [];
    for (const i of this._wo) i.TagArray.Contains(t) && e.push(i);
    return e;
  }
  SetDefaultNavigationListenerList(t) {
    this.OnDefaultNavigationListenerList(t);
  }
  ReplaceDefaultNavigationListener(t, e) {
    this.DefaultNavigationListener.length <= e
      ? this.DefaultNavigationListener.push(t)
      : (this.DefaultNavigationListener[e] = t),
      this.SetNavigationGroupDefaultListener(t);
  }
  GetSuitableNavigationListenerList(t) {
    return this.OnGetSuitableNavigationListenerList(t);
  }
  NotifyFindResult(t) {
    this.OnNotifyFindResult(t);
  }
  GetLoopOrLayoutListener(t) {
    return this.OnGetLoopOrLayoutListener(t);
  }
  ResetGroupConfigMemory() {
    for (const t of this.Ffo.values())
      t.SelectableMemory && (t.LastSelectListener = void 0);
  }
  OnGetSuitableNavigationListenerList(t) {
    return this.DefaultNavigationListener;
  }
  OnDefaultNavigationListenerList(i) {
    const r = [];
    for (let t = 0, e = i.Num(); t < e; ++t) {
      const s = i
        .Get(t)
        ?.GetComponentByClass(
          UE.TsUiNavigationBehaviorListener_C.StaticClass(),
        );
      r.push(s), s && this.SetNavigationGroupDefaultListener(s);
    }
    this.DefaultNavigationListener = r;
  }
  OnGetLoopOrLayoutListener(t) {
    t = this.GetNavigationGroup(t.GroupName);
    return UiNavigationNewController_1.UiNavigationNewController.FindLoopOrDynListener(
      t,
    );
  }
  OnNotifyFindResult(t) {}
  Clear() {
    this.OnClear(), this.Ffo.clear(), this._wo?.clear();
  }
  GetType() {
    return this.S9;
  }
  OnClear() {}
}
exports.SpecialPanelHandleBase = SpecialPanelHandleBase;
// # sourceMappingURL=SpecialPanelHandleBase.js.map
