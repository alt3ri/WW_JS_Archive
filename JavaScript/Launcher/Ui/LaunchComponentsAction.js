"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LaunchComponentsAction = void 0);
const UE = require("ue"),
  HotFixSequencePlayer_1 = require("./HotFix/HotFixSequencePlayer"),
  LaunchUtil_1 = require("./LaunchUtil");
class LaunchComponentsAction {
  constructor() {
    (this.Nyr = !1),
      (this.RootItem = void 0),
      (this.RootActor = void 0),
      (this.LW = void 0),
      (this.ElementMap = new Map()),
      (this.SequencePlayer = void 0);
  }
  OnStart() {}
  OnBeforeDestroy() {}
  SetRootActorLaunchComponentsAction(t) {
    this.Oyr(t), this.kyr(), this.Fyr(), this.OnStart();
  }
  Oyr(t) {
    (this.RootActor = t),
      (this.RootItem = t.GetComponentByClass(UE.UIItem.StaticClass()));
  }
  kyr() {
    this.SequencePlayer = new HotFixSequencePlayer_1.HotFixSequencePlayer(
      this.RootItem,
    );
  }
  Fyr() {
    (this.LW = this.RootActor.GetComponentByClass(
      UE.LGUIComponentsRegistry.StaticClass(),
    )),
      this.LW && (this.LW.TsClassName = this.constructor.name);
  }
  GetElement(t) {
    return this.ElementMap.get(t);
  }
  GetItem(t) {
    t = this.Vyr(t);
    if (t) return t.GetComponentByClass(UE.UIItem.StaticClass());
  }
  GetTexture(t) {
    t = this.Vyr(t);
    if (t) return t.GetComponentByClass(UE.UITexture.StaticClass());
  }
  GetText(t) {
    t = this.Vyr(t);
    if (t) return t.GetComponentByClass(UE.UIText.StaticClass());
  }
  GetButton(t) {
    t = this.Vyr(t);
    if (t) return t.GetComponentByClass(UE.UIButtonComponent.StaticClass());
  }
  Vyr(t) {
    if (!(t >= this.LW.Components.Num())) return this.LW.Components.Get(t);
  }
  SetActive(t) {
    this.RootItem?.IsValid() && this.RootItem.SetUIActive(t);
  }
  AttachElement(t, e) {
    var i = this.Vyr(t);
    if (i)
      return (
        (e = new e()).SetRootActorLaunchComponentsAction(i),
        this.ElementMap.set(t, e),
        e
      );
  }
  async AttachElementAsyncFromPath(t, e, i) {
    const s = new i();
    return (
      await LaunchUtil_1.LaunchUtil.LoadResourceAsync(
        e,
        this.RootActor.GetWorld(),
        this.RootActor.RootComponent,
        (t) => {
          s.SetRootActorLaunchComponentsAction(t);
        },
      ),
      this.ElementMap.set(t, s),
      s
    );
  }
  DestroyTemp() {
    return (
      !this.Nyr &&
      (this.OnBeforeDestroy(), this.Hyr(), this.jyr(), (this.Nyr = !0))
    );
  }
  Hyr() {
    for (var [, t] of this.ElementMap) t.Destroy();
    this.ElementMap.clear();
  }
  jyr() {
    this.SequencePlayer?.ClearSequence();
  }
  Destroy() {
    this.DestroyTemp(),
      this.RootActor &&
        UE.LGUIBPLibrary.DestroyActorWithHierarchy(this.RootActor, !0),
      (this.RootActor = void 0),
      (this.RootItem = void 0);
  }
}
exports.LaunchComponentsAction = LaunchComponentsAction;
//# sourceMappingURL=LaunchComponentsAction.js.map
