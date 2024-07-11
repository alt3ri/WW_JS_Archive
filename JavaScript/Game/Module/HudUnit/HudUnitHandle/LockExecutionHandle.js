"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LockExecutionHandle = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  CameraController_1 = require("../../../Camera/CameraController"),
  TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LockExecutionUnit_1 = require("../HudUnit/LockExecutionUnit"),
  HudUnitHandleBase_1 = require("./HudUnitHandleBase"),
  hitCaseSocket = new UE.FName("HitCase");
class LockExecutionHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments),
      (this.Oii = void 0),
      (this.sDe = void 0),
      (this.aXe = !1),
      (this.dce = !1),
      (this.kii = 0),
      (this.AYe = (t, e) => {
        t ? this.Fii(e) : this.Vii(e);
      }),
      (this.zpe = () => {
        this.sDe && this.nst();
      });
  }
  OnInitialize() {
    this.kii = CommonParamById_1.configCommonParamById.GetIntConfig(
      "LockExecutionShowDistance",
    );
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnEnterOrExitExecutionRange,
      this.AYe,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnEnterOrExitExecutionRange,
      this.AYe,
    );
  }
  Fii(t) {
    this.sDe?.Id !== t &&
      ((t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t))
        ? (this.tXe(), (this.sDe = t), this._o())
        : this.nst());
  }
  Vii(t) {
    this.sDe?.Id === t && this.nst();
  }
  _o() {
    this.eXe(), this.uii();
  }
  nst() {
    this.tXe(), (this.dce = !1), this.Hii(), (this.sDe = void 0);
  }
  eXe() {
    this.sDe &&
      EventSystem_1.EventSystem.AddWithTarget(
        this.sDe,
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      );
  }
  tXe() {
    this.sDe &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.sDe,
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      );
  }
  OnTick(t) {
    super.OnTick(t),
      this.aXe ||
        (this.Oii &&
          (this.jii(), this.dce ? this.Oii.TryShow() : this.Oii.TryHide(!0)));
  }
  jii() {
    var t, e;
    this.sDe?.Valid &&
    (t = this.Wii()) &&
    ((e = CameraController_1.CameraController.CameraLocation),
    !(
      Math.pow(e.X - t.X, 2) + Math.pow(e.Y - t.Y, 2) + Math.pow(e.Z - t.Z, 2) <
      this.kii
    )) &&
    (e = this.ProjectWorldToScreen(t))
      ? ((this.dce = !0), this.Oii.GetRootItem().SetAnchorOffset(e))
      : (this.dce = !1);
  }
  uii() {
    this.Oii
      ? (this.jii(), this.dce ? this.Oii.TryShow() : this.Oii.TryHide(!0))
      : this.fii();
  }
  fii() {
    this.aXe ||
      ((this.aXe = !0),
      this.NewHudUnit(
        LockExecutionUnit_1.LockExecutionUnit,
        "UiItem_PutDeath",
        !1,
      ).then(
        (t) => {
          t &&
            !this.IsDestroyed &&
            ((this.aXe = !1),
            (this.Oii = t),
            this.jii(),
            this.dce ? this.Oii.TryShow() : this.Oii.TryHide(!1));
        },
        () => {},
      ));
  }
  Hii() {
    this.Oii && this.Oii.TryHide(!0);
  }
  Wii() {
    var t = this.sDe.Entity.GetComponent(1).Owner;
    if (t instanceof TsBaseCharacter_1.default)
      return t.Mesh.GetSocketLocation(hitCaseSocket);
  }
}
exports.LockExecutionHandle = LockExecutionHandle;
//# sourceMappingURL=LockExecutionHandle.js.map
