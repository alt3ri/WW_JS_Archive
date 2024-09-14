"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TsHotPatchPanelConfig = void 0);
const UE = require("ue"),
  InputDevice_1 = require("../InputDevice/InputDevice"),
  HotPatchEventSystem_1 = require("./HotPatchEventSystem"),
  HotPatchInputDefine_1 = require("./HotPatchInputDefine"),
  HotPatchInputManager_1 = require("./HotPatchInputManager");
class TsHotPatchPanelConfig extends UE.LGUIBehaviour {
  constructor() {
    super(...arguments),
      (this.ActionMap = new UE.TMap()),
      (this.AxisMap = new UE.TMap()),
      (this.InputAction = void 0),
      (this.InputAxis = void 0),
      (this.RegisterActionMap = void 0),
      (this.RegisterAxisMap = void 0),
      (this.TextureList = void 0);
  }
  AwakeBP() {
    (this.InputAction = (t, i) => {
      for (const e of this.RegisterActionMap.get(i))
        e.IsUIActiveInHierarchy() &&
          HotPatchEventSystem_1.HotPatchEventSystem.SimulationPointerDownUp(
            e,
            t,
          );
    }),
      (this.InputAxis = (t, i) => {
        for (const e of this.RegisterAxisMap.get(i))
          e.RootUIComp.IsUIActiveInHierarchy() &&
            e.SetVelocity(t * HotPatchInputDefine_1.SCROLLBAR_INTERVAL);
      });
  }
  OnEnableBP() {
    this.RegisterTextureMap(),
      HotPatchInputManager_1.HotPatchInputManager.InsertPanelConfig(this);
  }
  OnDisableBP() {
    HotPatchInputManager_1.HotPatchInputManager.RemovePanelConfig(this),
      this.UnRegisterTextureMap();
  }
  RegisterTextureMap() {
    this.TextureList = [];
    for (let t = 0, i = this.ActionMap.Num(); t < i; ++t) {
      var e = this.ActionMap.GetKey(t),
        e = this.ActionMap.Get(e);
      e &&
        e.TextureActor &&
        e.TextureActor.UITexture &&
        this.TextureList.push([e.ActionName, e.TextureActor.UITexture]);
    }
  }
  UnRegisterTextureMap() {
    this.TextureList = [];
  }
  RegisterAction() {
    this.RegisterActionMap = new Map();
    for (let t = 0, i = this.ActionMap.Num(); t < i; ++t) {
      var e = this.ActionMap.GetKey(t),
        s = this.ActionMap.Get(e);
      if (s) {
        e = e.GetComponentByClass(UE.UIItem.StaticClass());
        if (e) {
          let t = this.RegisterActionMap.get(s.ActionName);
          t ||
            ((t = []),
            this.RegisterActionMap.set(s.ActionName, t),
            HotPatchInputManager_1.HotPatchInputManager.RegisterInputAction(
              s.ActionName,
              this.InputAction,
            )),
            t.push(e);
        }
      }
    }
  }
  RegisterAxis() {
    this.RegisterAxisMap = new Map();
    for (let t = 0, i = this.AxisMap.Num(); t < i; ++t) {
      var e = this.AxisMap.GetKey(t),
        s = this.AxisMap.Get(e);
      if (s) {
        e = e.GetComponentByClass(
          UE.UIScrollViewWithScrollbarComponent.StaticClass(),
        );
        if (e) {
          let t = this.RegisterAxisMap.get(s);
          t ||
            ((t = []),
            this.RegisterAxisMap.set(s, t),
            HotPatchInputManager_1.HotPatchInputManager.RegisterInputAxis(
              s,
              this.InputAxis,
            )),
            t.push(e);
        }
      }
    }
  }
  UnRegisterAction() {
    if (this.RegisterActionMap) {
      for (const t of this.RegisterActionMap.keys())
        HotPatchInputManager_1.HotPatchInputManager.UnRegisterInputAction(
          t,
          this.InputAction,
        );
      this.RegisterActionMap.clear();
    }
  }
  UnRegisterAxis() {
    if (this.RegisterAxisMap) {
      for (const t of this.RegisterAxisMap.keys())
        HotPatchInputManager_1.HotPatchInputManager.UnRegisterInputAxis(
          t,
          this.InputAxis,
        );
      this.RegisterAxisMap.clear();
    }
  }
  RegisterActionAndAxis() {
    this.RegisterAction(), this.RegisterAxis();
  }
  UnRegisterActionAndAxis() {
    this.UnRegisterAction(), this.UnRegisterAxis();
  }
  RefreshTexture() {
    for (const i of this.TextureList) {
      var t;
      InputDevice_1.InputDevice.IsInGamepad()
        ? (t =
            HotPatchInputManager_1.HotPatchInputManager.GetTextureByActionName(
              i[0],
            )) &&
          (i[1].SetUIActive(!0), i[1].SetTexture(t), i[1].SetSizeFromTexture())
        : i[1].SetUIActive(!1);
    }
  }
  HideTexture() {
    for (const t of this.TextureList) t[1].SetUIActive(!1);
  }
}
(exports.TsHotPatchPanelConfig = TsHotPatchPanelConfig),
  (exports.default = TsHotPatchPanelConfig);
//# sourceMappingURL=TsHotPatchPanelConfig.js.map
