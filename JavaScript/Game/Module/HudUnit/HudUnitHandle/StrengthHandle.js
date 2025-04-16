"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StrengthHandle = void 0);
const Stats_1 = require("../../../../Core/Common/Stats"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  StrengthUnit_1 = require("../HudUnit/StrengthUnit"),
  HudUnitHandleBase_1 = require("./HudUnitHandleBase");
class StrengthHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments),
      (this.vni = void 0),
      (this.Rni = 0),
      (this.X9e = void 0),
      (this.ldt = []),
      (this.xie = () => {
        StrengthHandle.kQe.Start();
        var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
        this.X9e ? this.HDr(this.X9e) : this.vni.SetVisible(!0),
          this.c$e(t),
          this.vni && (this.vni.RefreshRoleData(t), this.zAl(t)),
          StrengthHandle.kQe.Stop();
      }),
      (this.zpe = (t, e) => {
        this.HDr(e);
      }),
      (this.CRl = (t, e) => {
        this.vni &&
          (e && this.vni.AddStrengthItem(2, 1), this.vni.SwapPlace(e));
      }),
      (this.VQ_ = (t, e) => {
        this.vni && this.vni.SetVisible(!e, 1);
      });
  }
  OnInitialize() {
    super.OnInitialize(),
      this.NewHudUnit(StrengthUnit_1.StrengthUnit, "UiItem_PhysicalBar").then(
        (t) => {
          (this.vni = t),
            this.vni &&
              ((t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData())
                ? (this.c$e(t),
                  this.vni.RefreshRoleData(t),
                  t.GameplayTagComponent?.HasTag(-2027866845) &&
                    this.vni?.AddStrengthItem(2, 1))
                : this.vni.SetVisible(!1));
        },
        () => {},
      );
  }
  OnDestroyed() {
    (this.vni = void 0), this.X9e && this.HDr(this.X9e), super.OnDestroyed();
  }
  OnShowHud() {}
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick,
      this.xie,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick,
      this.xie,
    ),
      EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
  }
  HDr(t) {
    this.m$e(t), (this.Rni = 0), (this.X9e = void 0);
  }
  c$e(t) {
    var e;
    t &&
      ((e = t.EntityHandle.Id), this.Rni !== e) &&
      ((this.Rni = e),
      (this.X9e = t.EntityHandle),
      EventSystem_1.EventSystem.AddWithTargetUseHoldKey(
        this,
        t.EntityHandle,
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      (e = t.GameplayTagComponent)) &&
      (this.mdt(e, -2027866845, this.CRl),
      this.mdt(e, -689911122, this.VQ_, !0));
  }
  m$e(t) {
    if (t?.Valid && this.Rni === t.Id) {
      EventSystem_1.EventSystem.RemoveWithTargetUseKey(
        this,
        t,
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      );
      for (const e of this.ldt) e.EndTask();
      this.ldt.length = 0;
    }
  }
  mdt(t, e, i, s = !1) {
    s && t.HasTag(e) && i(e, !0);
    s = t.ListenForTagAddOrRemove(e, i, StrengthHandle.SYe);
    s && this.ldt.push(s);
  }
  zAl(t) {
    this.vni &&
      (t = t?.GameplayTagComponent) &&
      ((t = t.HasTag(-2027866845)) && this.vni.AddStrengthItem(2, 1),
      this.vni.SwapPlace(t));
  }
}
((exports.StrengthHandle = StrengthHandle).kQe = Stats_1.Stat.Create(
  "[ChangeRole]StrengthHandle",
)),
  (StrengthHandle.SYe = Stats_1.Stat.Create("[StrengthHandle]ListenTag"));
//# sourceMappingURL=StrengthHandle.js.map
