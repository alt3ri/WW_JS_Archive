"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRogueGrid = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class MapRogueGrid extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.BI1 = 0),
      (this.FS1 = !1),
      (this.OnExtendTogglePointerDown = void 0),
      (this.OnExtendToggleStateChanged = void 0),
      (this.OnCanExecuteChangeFunc = void 0),
      (this.OnHoverFunc = void 0),
      (this.OnUnHoverFunc = void 0),
      (this.Ngo = (i) => {
        this.OnExtendTogglePointerDown?.(i, this.Pe);
      }),
      (this.PPt = (i) => {
        this.OnExtendToggleStateChanged?.(i, this.Pe);
      }),
      (this.Lke = () =>
        !this.OnCanExecuteChangeFunc ||
        this.OnCanExecuteChangeFunc(
          this.GetExtendToggle(0).GetToggleState(),
          this.Pe,
        )),
      (this._ui = () => {
        this.OnHoverFunc?.(this.Pe);
      }),
      (this.uui = () => {
        this.OnUnHoverFunc?.(this.Pe);
      }),
      (this.TS1 = !1);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
    ];
  }
  OnStart() {
    var i = this.GetExtendToggle(0);
    i.OnPointDownCallBack.Bind(this.Ngo),
      i.OnStateChange.Add(this.PPt),
      i.CanExecuteChange.Bind(this.Lke),
      i.OnHover.Add(this._ui),
      i.OnUnHover.Add(this.uui);
  }
  OnBeforeDestroy() {}
  SetGridToggleState(i, t = !1) {
    this.Pe.Walkable &&
      ((i = i ? 1 : 0), this.GetExtendToggle(0).SetToggleStateForce(i, t));
  }
  SetToggleMoveEnable(i) {
    this.Pe.Walkable &&
      (this.GetItem(4).SetUIActive(i),
      this.GetItem(5).SetUIActive(i),
      this.GetItem(6).SetUIActive(!i),
      this.GetItem(7).SetUIActive(!i));
  }
  GetPanelEvent() {
    return this.GetItem(3);
  }
  Refresh(i) {
    this.Pe = i;
    var t =
      ConfigManager_1.ConfigManager.MapRogueConfig.GetGridMapTypeConfigById(
        this.Pe.GridTypeId,
      );
    if (t) {
      const U = Array.from(t.GroundPath.keys());
      var s = this.GetSprite(1),
        s =
          (this.SetSpriteByPath(U[i.GroundPathIndex], s, !0),
          0 < t.ExtraPathList.length),
        h = 0 <= this.Pe.ExtraPathIndex,
        e = ((this.TS1 = s || h), this.GetItem(8)),
        r = this.GetSprite(2),
        a =
          (e.SetUIActive(this.TS1 && this.Pe.HasVision), r.GetAnchorOffsetY());
      if (h) {
        const U = Array.from(t.DecorationPath.keys());
        this.SetSpriteByPath(U[i.ExtraPathIndex], r, !0);
      }
      r.SetUIActive(h);
      for (let i = 0; i < t.ExtraPathList.length; i++) {
        var o = LguiUtil_1.LguiUtil.CopyItem(r, e),
          n =
            (this.SetSpriteByPath(t.ExtraPathList[i], o, !0),
            t.ExtraOffsetList.at(i) ?? 0);
        o.SetAnchorOffsetY(a + n), o.SetUIActive(!0);
      }
      this.GetItem(4).SetUIActive(this.Pe.Walkable),
        this.GetItem(5).SetUIActive(this.Pe.Walkable);
    }
  }
  SetVision(i) {
    this.TS1 && this.GetItem(8).SetUIActive(i);
  }
  SetPerspectiveMode(i) {
    if (this.TS1) {
      this.BI1 = Math.max(0, this.BI1 + (i ? 1 : -1));
      var t = 0 < this.BI1;
      if (this.FS1 !== t) {
        var s = (this.FS1 = i) ? 0 : 1,
          h = this.GetItem(8)
            .GetOwner()
            .K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass()),
          e = h.Num();
        for (let i = 0; i < e; i++) {
          var r = h.Get(i);
          r.Stop(), i === s && r.Play();
        }
      }
    }
  }
}
exports.MapRogueGrid = MapRogueGrid;
//# sourceMappingURL=MapRogueGrid.js.map
