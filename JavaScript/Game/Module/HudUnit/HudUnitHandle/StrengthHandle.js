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
      (this.vri = void 0),
      (this.Mri = 0),
      (this.Sri = 0),
      (this.Eri = 0),
      (this.yri = 0),
      (this.Iri = void 0),
      (this.Tri = void 0),
      (this.Lri = void 0),
      (this.Dri = void 0),
      (this.Rri = 0),
      (this.Uri = 0),
      (this.B8e = void 0),
      (this.xie = () => {
        var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
        this.tXe(this.B8e),
          this.eXe(t),
          this.vri &&
            (this.vri.RefreshEntity(t),
            this.vri.RefreshBuffState(),
            this.vri.RefreshEnableState(),
            this.Ari());
      }),
      (this.zpe = (t, i) => {
        this.tXe(i);
      }),
      (this.pKe = (t, i, e, s) => {
        s === RECOVERY_STRENGTH_BUFF_ID &&
          t === this.Rri &&
          this.vri &&
          this.vri.PlayPickUpAnim();
      }),
      (this.Pri = (t, i, e) => {
        this.vri && (this.xri(), this.wri(), this.Bri());
      }),
      (this.bri = (t, i, e) => {
        this.xri(), this.qri();
      }),
      (this.Gri = (t, i) => {
        i ? this.vri.SetBuff(1) : this.vri.SetBuff(0);
      }),
      (this.Nri = (t, i) => {
        i ? this.vri.SetBuff(2) : this.vri.SetBuff(0);
      }),
      (this.Ori = (t, i) => {
        this.vri.SetEnable(!i);
      }),
      (this.kri = (t, i) => {
        this.vri.PlayPickUpAnim();
      });
  }
  OnInitialize() {
    super.OnInitialize(),
      (this.yri =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "LowEndurancePercent",
        ) / CommonDefine_1.RATE_10000),
      this.NewHudUnit(StrengthUnit_1.StrengthUnit, "UiItem_Endurance").then(
        (t) => {
          this.vri = t;
          t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
          t &&
            (this.eXe(t),
            this.vri.RefreshEntity(t),
            this.vri.RefreshBuffState(),
            this.vri.RefreshEnableState(),
            this.xri(),
            this.wri(),
            this.Ari(),
            this.qri()),
            this.vri.SetVisible(!1);
        },
        () => {},
      );
  }
  OnDestroyed() {
    super.OnDestroyed(),
      (this.vri = void 0),
      (this.Mri = void 0),
      (this.Sri = void 0),
      (this.Eri = void 0);
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
        this.pKe,
      ),
      FormationAttributeController_1.FormationAttributeController.AddValueListener(
        1,
        this.Pri,
      ),
      FormationAttributeController_1.FormationAttributeController.AddMaxListener(
        1,
        this.bri,
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
        this.pKe,
      ),
      FormationAttributeController_1.FormationAttributeController.RemoveValueListener(
        1,
        this.Pri,
      ),
      FormationAttributeController_1.FormationAttributeController.RemoveMaxListener(
        1,
        this.bri,
      );
  }
  eXe(t) {
    var i;
    t &&
      ((i = t.EntityHandle.Id), this.Rri !== i) &&
      ((this.Rri = i),
      (this.B8e = t.EntityHandle),
      (i = t.GameplayTagComponent),
      (this.Tri = i.ListenForTagAddOrRemove(
        334800376,
        this.Gri,
        StrengthHandle._$e,
      )),
      (this.Iri = i.ListenForTagAddOrRemove(
        -951946659,
        this.Nri,
        StrengthHandle._$e,
      )),
      (this.Lri = i.ListenForTagAddOrRemove(
        64400505,
        this.Ori,
        StrengthHandle._$e,
      )),
      (this.Dri = i.ListenForTagAddOrRemove(
        778582368,
        this.kri,
        StrengthHandle._$e,
      )));
  }
  tXe(t) {
    t?.Valid &&
      this.Rri === t.Id &&
      (this.Tri.EndTask(),
      this.Iri.EndTask(),
      this.Lri.EndTask(),
      this.Dri.EndTask(),
      (this.Iri = void 0),
      (this.Iri = void 0),
      (this.Lri = void 0),
      (this.Dri = void 0),
      (this.Rri = void 0),
      (this.B8e = void 0),
      this.vri) &&
      this.vri.RefreshEntity(void 0);
  }
  xri() {
    (this.Mri =
      FormationAttributeController_1.FormationAttributeController.GetValue(1)),
      (this.Sri =
        FormationAttributeController_1.FormationAttributeController.GetBaseMax(
          1,
        )),
      (this.Eri =
        FormationAttributeController_1.FormationAttributeController.GetMax(1)),
      this.vri.SetStrengthPercent(this.Mri, this.Sri);
  }
  wri() {
    var t, i;
    this.Fri() &&
      ((t = this.Mri - this.Sri),
      (i = this.Eri - this.Sri),
      this.vri.SetTemporaryStrengthPercent(t, i));
  }
  Ari() {
    var t = this.Fri();
    this.vri.PlayTemporaryAnim(t);
  }
  Fri() {
    var t = this.Sri;
    return !(this.Vri() <= 0 && this.Eri <= t);
  }
  Vri() {
    return this.Mri - this.Sri;
  }
  qri() {
    var t = this.Eri - this.Sri;
    this.vri.RefreshSingleStrengthItemRotation(this.Sri),
      this.vri.RefreshSingleTemporaryStrengthItemRotation(t),
      this.vri.RefreshSingleTemporaryStrengthItemVisible(t);
  }
  Bri() {
    var t = this.Mri,
      i = this.Eri;
    return (
      this.Fri()
        ? 0 < this.Vri()
          ? (this.vri.SetTemporaryVisible(!0), this.vri.PlayTemporaryAnim(!0))
          : this.vri.PlayTemporaryAnim(!1)
        : this.vri.SetTemporaryVisible(!1),
      i <= t
        ? 0 === this.Uri
          ? void 0
          : ((this.Uri = 0),
            this.vri.SetNone(!1),
            this.vri.StopNoneAnim(),
            this.vri.SetNormal(!0),
            void this.vri.PlayFullAnim())
        : t <= 0
          ? 3 === this.Uri
            ? void 0
            : ((this.Uri = 3),
              this.vri.SetNone(!0),
              void this.vri.PlayNoneAnim())
          : ((t = t / i > this.yri),
            void (
              this.Uri !== (i = t ? 1 : 2) &&
              ((this.Uri = i),
              this.vri.SetNone(!1),
              this.vri.StopNoneAnim(),
              this.vri.SetNormal(t),
              this.vri.SetVisible(!0),
              this.vri.PlayStartAnim())
            ))
    );
  }
}
((exports.StrengthHandle = StrengthHandle).RKe = void 0),
  (StrengthHandle._$e = void 0);
//# sourceMappingURL=StrengthHandle.js.map
