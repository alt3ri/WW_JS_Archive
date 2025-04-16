"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSideEnergyHandle = exports.RoleSideEnergyBarInfo = void 0);
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RoleSideEnergyUnit_1 = require("../HudUnit/RoleSideEnergyUnit"),
  HudUnitUtils_1 = require("../Utils/HudUnitUtils"),
  HudUnitHandleBase_1 = require("./HudUnitHandleBase"),
  roleSideEnergyUnitClassMap = new Map([
    ["UiItem_LupaEmerge", RoleSideEnergyUnit_1.RoleSideEnergyUnit],
  ]);
class RoleSideEnergyBarInfo {
  constructor() {
    (this.EntityId = 0),
      (this.BuffCueConfig = void 0),
      (this.RoleSideEnergyUnit = void 0);
  }
}
exports.RoleSideEnergyBarInfo = RoleSideEnergyBarInfo;
class RoleSideEnergyHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments),
      (this.Wst = void 0),
      (this.E0 = 0),
      (this.mic = new Map()),
      (this.fic = !1),
      (this.jma = new Vector2D_1.Vector2D()),
      (this.gic = !1),
      (this.Cic = (e, t, i, s) => {
        this.E0 === e && (i ? this.vic(t, s) : this.yic(s));
      }),
      (this.xie = () => {
        this.bl(), this.Sic();
      }),
      (this.zpe = (e) => {
        for (var [t, i] of this.mic) i.RoleSideEnergyUnit && this.yic(t);
      });
  }
  OnInitialize() {
    super.OnInitialize(), this.bl();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.CharOnBuffAddRoleSideEnergyBar,
      this.Cic,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick,
        this.xie,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiRemoveRoleData,
        this.zpe,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.CharOnBuffAddRoleSideEnergyBar,
      this.Cic,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick,
        this.xie,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiRemoveRoleData,
        this.zpe,
      );
  }
  Sic() {
    for (const e of this.mic.values())
      e.RoleSideEnergyUnit &&
        e.RoleSideEnergyUnit.SetVisible(e.EntityId === this.E0);
  }
  bl() {
    var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    e !== this.Wst &&
      (e?.EntityHandle?.Valid
        ? ((this.Wst = e), (this.E0 = e.EntityHandle.Entity?.Id ?? 0))
        : ((this.Wst = void 0), (this.E0 = 0)),
      this.Mic());
  }
  Mic() {
    if (this.Wst)
      for (const t of this.Wst.EntityHandle.Entity.GetComponent(
        21,
      ).GetAllCurrentCueRef()) {
        var e = t.CueConfig;
        20 === e.CueType && this.vic(e, t.ActiveHandleId);
      }
  }
  vic(t, i) {
    if (!this.mic.has(i)) {
      const s = new RoleSideEnergyBarInfo();
      (s.EntityId = this.E0), (s.BuffCueConfig = t), this.mic.set(i, s);
      let e = roleSideEnergyUnitClassMap.get(t.Path);
      (e = e || RoleSideEnergyUnit_1.RoleSideEnergyUnit),
        this.NewHudUnit(e, t.Path).then(
          (e) => {
            var t;
            e &&
              (s.BuffCueConfig &&
              (t = ModelManager_1.ModelManager.BattleUiModel?.GetRoleData(
                s.EntityId,
              ))
                ? ((s.RoleSideEnergyUnit = e).InitInfo(s.BuffCueConfig, t),
                  e.SetVisible(s.EntityId === this.E0))
                : this.DestroyHudUnit(e));
          },
          () => {},
        );
    }
  }
  yic(e) {
    var t = this.mic.get(e);
    t &&
      (this.mic.delete(e), (t.BuffCueConfig = void 0), t.RoleSideEnergyUnit) &&
      (this.DestroyHudUnit(t.RoleSideEnergyUnit),
      (t.RoleSideEnergyUnit = void 0));
  }
  OnTick(e) {
    this.fic = !1;
    for (const t of this.mic.values())
      t.RoleSideEnergyUnit &&
        t.EntityId === this.E0 &&
        (this.fic || (this.Eic(), (this.fic = !0)), this.gic) &&
        t.RoleSideEnergyUnit.RefreshTargetPosition(e, this.jma);
  }
  Eic() {
    this.gic = !1;
    var e = this.Wst?.EntityHandle?.Entity?.GetComponent(3);
    e &&
      e.Actor?.IsValid() &&
      ((e = e.ActorLocation),
      (this.gic = HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(
        e,
        this.jma,
      )));
  }
}
exports.RoleSideEnergyHandle = RoleSideEnergyHandle;
//# sourceMappingURL=RoleSideEnergyHandle.js.map
