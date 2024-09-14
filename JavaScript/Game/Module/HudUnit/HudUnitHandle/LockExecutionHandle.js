"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LockExecutionHandle = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  CameraController_1 = require("../../../Camera/CameraController"),
  TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LockExecutionUnit_1 = require("../HudUnit/LockExecutionUnit"),
  HudUnitUtils_1 = require("../Utils/HudUnitUtils"),
  HudUnitHandleBase_1 = require("./HudUnitHandleBase"),
  hitCaseSocket = new UE.FName("HitCase");
class LockExecutionHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments),
      (this.Nma = new Vector2D_1.Vector2D()),
      (this.koi = void 0),
      (this.sDe = void 0),
      (this.v$e = !1),
      (this.dce = !1),
      (this.Foi = 0),
      (this.VJe = (t, e) => {
        t ? this.Voi(e) : this.Hoi(e);
      }),
      (this.zpe = () => {
        this.sDe && this.fat();
      });
  }
  OnInitialize() {
    this.Foi = CommonParamById_1.configCommonParamById.GetIntConfig(
      "LockExecutionShowDistance",
    );
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnEnterOrExitExecutionRange,
      this.VJe,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnEnterOrExitExecutionRange,
      this.VJe,
    );
  }
  Voi(t) {
    this.sDe?.Id !== t &&
      ((t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t))
        ? (this.m$e(), (this.sDe = t), this._o())
        : this.fat());
  }
  Hoi(t) {
    this.sDe?.Id === t && this.fat();
  }
  _o() {
    this.c$e(), this.uoi();
  }
  fat() {
    this.m$e(), (this.dce = !1), this.joi(), (this.sDe = void 0);
  }
  c$e() {
    this.sDe &&
      EventSystem_1.EventSystem.AddWithTarget(
        this.sDe,
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      );
  }
  m$e() {
    this.sDe &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.sDe,
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      );
  }
  OnTick(t) {
    super.OnTick(t),
      this.v$e ||
        (this.koi &&
          (this.Woi(), this.dce ? this.koi.TryShow() : this.koi.TryHide(!0)));
  }
  Woi() {
    var t, e;
    this.sDe?.Valid &&
    (t = this.Koi()) &&
    ((e = CameraController_1.CameraController.CameraLocation),
    !(
      Math.pow(e.X - t.X, 2) + Math.pow(e.Y - t.Y, 2) + Math.pow(e.Z - t.Z, 2) <
      this.Foi
    )) &&
    HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(t, this.Nma)
      ? ((this.dce = !0),
        this.koi.GetRootItem().SetAnchorOffset(this.Nma.ToUeVector2D(!0)))
      : (this.dce = !1);
  }
  uoi() {
    this.koi
      ? (this.Woi(), this.dce ? this.koi.TryShow() : this.koi.TryHide(!0))
      : this.foi();
  }
  foi() {
    this.v$e ||
      ((this.v$e = !0),
      this.NewHudUnit(
        LockExecutionUnit_1.LockExecutionUnit,
        "UiItem_PutDeath",
        !1,
      ).then(
        (t) => {
          t &&
            !this.IsDestroyed &&
            ((this.v$e = !1),
            (this.koi = t),
            this.Woi(),
            this.dce ? this.koi.TryShow() : this.koi.TryHide(!1));
        },
        () => {},
      ));
  }
  joi() {
    this.koi && this.koi.TryHide(!0);
  }
  Koi() {
    var t = this.sDe.Entity.GetComponent(1).Owner;
    if (t instanceof TsBaseCharacter_1.default)
      return t.Mesh.GetSocketLocation(hitCaseSocket);
  }
}
exports.LockExecutionHandle = LockExecutionHandle;
//# sourceMappingURL=LockExecutionHandle.js.map
