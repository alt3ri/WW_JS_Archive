"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StrengthHandle = void 0);
const Stats_1 = require("../../../../Core/Common/Stats"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  FormationAttributeController_1 = require("../../Abilities/FormationAttributeController"),
  StrengthUnit_1 = require("../HudUnit/StrengthUnit"),
  HudUnitHandleBase_1 = require("./HudUnitHandleBase"),
  RECOVERY_STRENGTH_BUFF_ID = 91004001;
class StrengthHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments),
      (this.vni = void 0),
      (this.Mni = 0),
      (this.Eni = 0),
      (this.Sni = 0),
      (this.yni = 0),
      (this.Ini = void 0),
      (this.Tni = void 0),
      (this.Lni = void 0),
      (this.Dni = void 0),
      (this.Rni = 0),
      (this.Uni = 0),
      (this.X9e = void 0),
      (this.xie = () => {
        var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
        this.m$e(this.X9e),
          this.c$e(t),
          this.vni &&
            (this.vni.RefreshEntity(t),
            this.vni.RefreshBuffState(),
            this.vni.RefreshEnableState(),
            this.Ani());
      }),
      (this.zpe = (t, i) => {
        this.m$e(i);
      }),
      (this.AQe = (t, i, e, s) => {
        s === RECOVERY_STRENGTH_BUFF_ID &&
          t === this.Rni &&
          this.vni &&
          this.vni.PlayPickUpAnim();
      }),
      (this.Pni = (t, i, e) => {
        this.vni && (this.xni(), this.wni(), this.Bni());
      }),
      (this.bni = (t, i, e) => {
        this.xni(), this.qni();
      }),
      (this.Gni = (t, i) => {
        i ? this.vni.SetBuff(1) : this.vni.SetBuff(0);
      }),
      (this.Nni = (t, i) => {
        i ? this.vni.SetBuff(2) : this.vni.SetBuff(0);
      }),
      (this.Oni = (t, i) => {
        this.vni.SetEnable(!i);
      }),
      (this.kni = (t, i) => {
        this.vni.PlayPickUpAnim();
      });
  }
  OnInitialize() {
    super.OnInitialize(),
      (this.yni =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "LowEndurancePercent",
        ) / CommonDefine_1.RATE_10000),
      this.NewHudUnit(StrengthUnit_1.StrengthUnit, "UiItem_Endurance").then(
        (t) => {
          this.vni = t;
          t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
          t &&
            (this.c$e(t),
            this.vni.RefreshEntity(t),
            this.vni.RefreshBuffState(),
            this.vni.RefreshEnableState(),
            this.xni(),
            this.wni(),
            this.Ani(),
            this.qni()),
            this.vni.SetVisible(!1);
        },
        () => {},
      );
  }
  OnDestroyed() {
    super.OnDestroyed(),
      (this.vni = void 0),
      (this.Mni = void 0),
      (this.Eni = void 0),
      (this.Sni = void 0);
  }
  OnShowHud() {}
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick,
      this.xie,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharOnBuffAddUITexture,
        this.AQe,
      ),
      FormationAttributeController_1.FormationAttributeController.AddValueListener(
        1,
        this.Pni,
      ),
      FormationAttributeController_1.FormationAttributeController.AddMaxListener(
        1,
        this.bni,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick,
      this.xie,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharOnBuffAddUITexture,
        this.AQe,
      ),
      FormationAttributeController_1.FormationAttributeController.RemoveValueListener(
        1,
        this.Pni,
      ),
      FormationAttributeController_1.FormationAttributeController.RemoveMaxListener(
        1,
        this.bni,
      );
  }
  c$e(t) {
    var i;
    t &&
      ((i = t.EntityHandle.Id), this.Rni !== i) &&
      ((this.Rni = i),
      (this.X9e = t.EntityHandle),
      (i = t.GameplayTagComponent),
      (this.Tni = i.ListenForTagAddOrRemove(
        334800376,
        this.Gni,
        StrengthHandle.SYe,
      )),
      (this.Ini = i.ListenForTagAddOrRemove(
        -951946659,
        this.Nni,
        StrengthHandle.SYe,
      )),
      (this.Lni = i.ListenForTagAddOrRemove(
        64400505,
        this.Oni,
        StrengthHandle.SYe,
      )),
      (this.Dni = i.ListenForTagAddOrRemove(
        778582368,
        this.kni,
        StrengthHandle.SYe,
      )));
  }
  m$e(t) {
    t?.Valid &&
      this.Rni === t.Id &&
      (this.Tni.EndTask(),
      this.Ini.EndTask(),
      this.Lni.EndTask(),
      this.Dni.EndTask(),
      (this.Ini = void 0),
      (this.Ini = void 0),
      (this.Lni = void 0),
      (this.Dni = void 0),
      (this.Rni = void 0),
      (this.X9e = void 0),
      this.vni) &&
      this.vni.RefreshEntity(void 0);
  }
  xni() {
    (this.Mni =
      FormationAttributeController_1.FormationAttributeController.GetValue(1)),
      (this.Eni =
        FormationAttributeController_1.FormationAttributeController.GetBaseMax(
          1,
        )),
      (this.Sni =
        FormationAttributeController_1.FormationAttributeController.GetMax(1)),
      this.vni.SetStrengthPercent(this.Mni, this.Eni);
  }
  wni() {
    var t, i;
    this.Fni() &&
      ((t = this.Mni - this.Eni),
      (i = this.Sni - this.Eni),
      this.vni.SetTemporaryStrengthPercent(t, i));
  }
  Ani() {
    var t = this.Fni();
    this.vni.PlayTemporaryAnim(t);
  }
  Fni() {
    var t = this.Eni;
    return !(this.Vni() <= 0 && this.Sni <= t);
  }
  Vni() {
    return this.Mni - this.Eni;
  }
  qni() {
    var t = this.Sni - this.Eni;
    this.vni.RefreshSingleStrengthItemRotation(this.Eni),
      this.vni.RefreshSingleTemporaryStrengthItemRotation(t),
      this.vni.RefreshSingleTemporaryStrengthItemVisible(t);
  }
  Bni() {
    var t = this.Mni,
      i = this.Sni;
    return (
      this.Fni()
        ? 0 < this.Vni()
          ? (this.vni.SetTemporaryVisible(!0), this.vni.PlayTemporaryAnim(!0))
          : this.vni.PlayTemporaryAnim(!1)
        : this.vni.SetTemporaryVisible(!1),
      i <= t
        ? 0 === this.Uni
          ? void 0
          : ((this.Uni = 0),
            this.vni.SetNone(!1),
            this.vni.StopNoneAnim(),
            this.vni.SetNormal(!0),
            void this.vni.PlayFullAnim())
        : t <= 0
          ? 3 === this.Uni
            ? void 0
            : ((this.Uni = 3),
              this.vni.SetNone(!0),
              void this.vni.PlayNoneAnim())
          : ((t = t / i > this.yni),
            void (
              this.Uni !== (i = t ? 1 : 2) &&
              ((this.Uni = i),
              this.vni.SetNone(!1),
              this.vni.StopNoneAnim(),
              this.vni.SetNormal(t),
              this.vni.SetVisible(!0),
              this.vni.PlayStartAnim())
            ))
    );
  }
}
((exports.StrengthHandle = StrengthHandle).kQe = void 0),
  (StrengthHandle.SYe = void 0);
//# sourceMappingURL=StrengthHandle.js.map
