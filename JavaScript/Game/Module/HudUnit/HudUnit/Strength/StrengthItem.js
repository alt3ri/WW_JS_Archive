"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StrengthItem = void 0);
const UE = require("ue"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  FormationAttributeController_1 = require("../../../Abilities/FormationAttributeController"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  AutoMovingItem_1 = require("./AutoMovingItem"),
  StrengthItemBase_1 = require("./StrengthItemBase"),
  RECOVERY_STRENGTH_BUFF_ID = 91004001,
  PRELOAD_SINGLE_STRENGTH_ITEM_COUNT = 5,
  PRELOAD_SINGLE_TEMPORARY_STRENGTH_ITEM_COUNT = 1,
  TEMPORARY_STRENGTH_LERP_TIME = 300,
  CLOSE_ANIM_TIME = 250,
  FULL_ANIM_TIME = 300,
  TEMP_CLOSE_ANIM_TIME = 330;
class StrengthItem extends StrengthItemBase_1.StrengthItemBase {
  constructor() {
    super(...arguments),
      (this.mii = !0),
      (this.Uni = 0),
      (this.vRl = 0),
      (this.dii = []),
      (this.Cii = []),
      (this.gii = new UE.Rotator(0, 0, 0)),
      (this.vii = 0),
      (this.Mii = 0),
      (this.Eii = 0),
      (this.Sii = 1),
      (this.yii = 0),
      (this.Iii = 0),
      (this.Tii = 0),
      (this.Lii = 0),
      (this.Dii = !1),
      (this.rXt = !1),
      (this.xii = void 0),
      (this.wii = void 0),
      (this.Bii = void 0),
      (this.Mni = 0),
      (this.Eni = 0),
      (this.Sni = 0),
      (this.yni = 0),
      (this.oCc = !1),
      (this.nCc = 1e3),
      (this.sCc = void 0),
      (this.aCc = 0),
      (this.hCc = !1),
      (this.lCc = !1),
      (this._Cc = !1),
      (this.AQe = (t, i, e, s) => {
        s === RECOVERY_STRENGTH_BUFF_ID &&
          t === this.RoleData?.EntityHandle?.Id &&
          this.MRl();
      }),
      (this.cCc = (t) => {
        this.uCc(), this.dCc();
      }),
      (this.Pni = (t, i, e) => {
        this.xni(), this.wni(), this.Bni();
      }),
      (this.bni = (t, i, e) => {
        this.xni(), this.qni();
      }),
      (this.Gni = (t, i) => {
        i ? this.SRl(1) : this.SRl(0);
      }),
      (this.Nni = (t, i) => {
        i ? this.SRl(2) : this.SRl(0);
      }),
      (this.Oni = (t, i) => {
        this.yRl(!i);
      }),
      (this.kni = (t, i) => {
        this.MRl();
      }),
      (this.mCc = (t, i) => {
        this.hCc = i;
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UISprite],
      [8, UE.UISprite],
      [9, UE.UISprite],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIItem],
      [17, UE.UIItem],
      [18, UE.UIItem],
      [19, UE.UIItem],
      [20, UE.UIItem],
      [21, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.sCc = new AutoMovingItem_1.AutoMovingItem()),
      await this.sCc.CreateByActorAsync(this.GetItem(21).GetOwner());
  }
  OnStart() {
    this.RootItem.SetAnchorAlign(2, 2),
      this.RootItem.SetPivot(new UE.Vector2D(0.5, 0.5)),
      this.RootItem.SetAnchorOffset(Vector2D_1.Vector2D.ZeroVector);
    for (let t = 0; t < PRELOAD_SINGLE_STRENGTH_ITEM_COUNT; t++)
      this.bii(0 === t);
    for (let t = 0; t < PRELOAD_SINGLE_TEMPORARY_STRENGTH_ITEM_COUNT; t++)
      this.qii(0 === t);
    (this.yni =
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "LowEndurancePercent",
      ) / CommonDefine_1.RATE_10000),
      (this.Eii = CommonParamById_1.configCommonParamById.GetIntConfig(
        "SingleStrengthValue",
      )),
      (this.Sii = CommonParamById_1.configCommonParamById.GetIntConfig(
        "MaxSingleStrengthItemCount",
      )),
      (this.yii = CommonParamById_1.configCommonParamById.GetIntConfig(
        "SingleTemporaryStrengthValue",
      )),
      (this.Tii = 0),
      (this.Lii = 0),
      (this.lCc = !1),
      this.Lri(),
      this.Qnt(),
      this.xni(),
      this.wni(),
      this.Ani(),
      this.qni(),
      this.uCc(),
      this.dCc(),
      super.OnStart();
  }
  OnBeforeDestroy() {
    (this.Dii = !1),
      (this.rXt = !1),
      this.Gii(),
      this.Nii(),
      this.Oii(),
      super.OnBeforeDestroy();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.CharOnBuffAddUITexture,
      this.AQe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AutoMovingSettingChanged,
        this.cCc,
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
      EventDefine_1.EEventName.CharOnBuffAddUITexture,
      this.AQe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AutoMovingSettingChanged,
        this.cCc,
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
  OnAddEntityEvents() {
    var t;
    this.RoleData &&
      (t = this.RoleData.GameplayTagComponent) &&
      (this.ListenForTagAddOrRemove(t, 334800376, this.Gni),
      this.ListenForTagAddOrRemove(t, -951946659, this.Nni),
      this.ListenForTagAddOrRemove(t, 64400505, this.Oni),
      this.ListenForTagAddOrRemove(t, 778582368, this.kni),
      this.ListenForTagAddOrRemove(t, -69562997, this.mCc));
  }
  OnRefreshRoleData() {
    this.RoleData &&
      (this.ERl(),
      this.IRl(),
      this.Ani(),
      (this.hCc = this.RoleData.GameplayTagComponent?.HasTag(-69562997) ?? !1));
  }
  Tick(t) {
    this.Hii(t), this.dCc();
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
      this.TRl(this.Mni, this.Eni);
  }
  qni() {
    var t = this.Sni - this.Eni;
    this.LRl(this.Eni), this.RRl(t), this.URl(t);
  }
  Bni() {
    var t = this.Mni,
      i = this.Sni;
    return (
      this.Fni()
        ? 0 < this.Vni()
          ? (this.DRl(!0), this.ARl(!0))
          : this.ARl(!1)
        : this.DRl(!1),
      i <= t
        ? 0 === this.Uni
          ? void 0
          : ((this.Uni = 0),
            this.xRl(!1),
            this.PRl(),
            this.fRl(!0),
            void this.wRl())
        : t <= 0
          ? 3 === this.Uni
            ? void 0
            : ((this.Uni = 3), this.xRl(!0), void this.BRl())
          : ((t = t / i > this.yni),
            void (
              this.Uni !== (i = t ? 1 : 2) &&
              ((this.Uni = i),
              this.xRl(!1),
              this.PRl(),
              this.fRl(t),
              (this.lCc = !0),
              this.Lri(),
              this.hga())
            ))
    );
  }
  fRl(t) {
    var i, e;
    this.mii !== t &&
      ((this.mii = t),
      (i = this.GetItem(0)),
      (e = this.GetItem(1)),
      i.IsUIActiveSelf() === t && i.SetUIActive(!t),
      i.IsUIActiveSelf() !== t) &&
      e.SetUIActive(t);
  }
  SRl(t) {
    if (this.vRl !== t) {
      this.vRl = t;
      var i = this.GetItem(4),
        e = this.GetItem(5);
      switch (t) {
        case 0:
          i.IsUIActiveSelf() && i.SetUIActive(!1),
            e.IsUIActiveSelf() && e.SetUIActive(!1);
          break;
        case 1:
          i.IsUIActiveSelf() || i.SetUIActive(!0),
            e.IsUIActiveSelf() && e.SetUIActive(!1);
          break;
        case 2:
          i.IsUIActiveSelf() && i.SetUIActive(!1),
            e.IsUIActiveSelf() || e.SetUIActive(!0);
      }
    }
  }
  yRl(t) {
    var i = this.GetItem(6);
    i.IsUIActiveSelf() === t && i.SetUIActive(!t);
  }
  xRl(t) {
    var i = this.GetItem(2);
    i.IsUIActiveSelf() !== t && i.SetUIActive(t);
  }
  TRl(t, i) {
    this.vii !== t &&
      ((this.vii = t),
      this.GetSprite(8).SetFillAmount(t / i),
      this.GetSprite(7).SetFillAmount(t / i),
      this.kii(i));
  }
  LRl(t) {
    let e = Math.floor(t / this.Eii);
    var s = 360 / (e = e > this.Sii ? this.Sii : e);
    let h = 0;
    for (let i = 0; i < e; i++) {
      let t = this.Fii(i);
      (t = t || this.bii()),
        (this.gii.Yaw = h),
        t.SetUIRelativeRotation(this.gii),
        (h += s);
    }
  }
  kii(t) {
    let i = Math.floor(t / this.Eii);
    i > this.Sii && (i = this.Sii);
    for (let t = 0; t < this.dii.length; t++) {
      var e = this.dii[t],
        s = t < i;
      e.IsUIActiveSelf() !== s && e.SetUIActive(s);
    }
  }
  bii(t = !1) {
    var i = this.GetItem(11),
      e = this.GetItem(10);
    let s = void 0;
    return (
      (s = t
        ? e
        : LguiUtil_1.LguiUtil.DuplicateActor(
            e.GetOwner(),
            i,
          ).GetComponentByClass(UE.UIItem.StaticClass())),
      this.dii.push(s),
      s
    );
  }
  Fii(t) {
    return this.dii[t];
  }
  ERl() {
    this.RoleData?.GameplayTagComponent?.HasTag(334800376)
      ? this.SRl(1)
      : (this.RoleData?.GameplayTagComponent?.HasTag(-951946659) && this.SRl(2),
        this.SRl(0));
  }
  IRl() {
    var t = this.RoleData?.GameplayTagComponent?.HasTag(64400505);
    this.yRl(!t);
  }
  wni() {
    var t, i;
    this.Fni() &&
      ((t = this.Mni - this.Eni), (i = this.Sni - this.Eni), this.bRl(t, i));
  }
  Ani() {
    var t = this.Fni();
    this.ARl(t);
  }
  Fni() {
    var t = this.Eni;
    return !(this.Vni() <= 0 && this.Sni <= t);
  }
  Vni() {
    return this.Mni - this.Eni;
  }
  DRl(t) {
    var i = this.GetItem(3);
    i.IsUIActiveSelf() !== t && i.SetUIActive(t);
  }
  ARl(t) {
    this.Dii !== t &&
      ((this.Dii = t) ? (this.qRl(), this.GRl()) : (this.kRl(), this.ORl()));
  }
  bRl(t, i) {
    this.Mii !== t && ((this.Lii = t / i), (this.Mii = t), this.URl(i));
  }
  RRl(t) {
    let e = Math.floor(t / this.yii);
    var s = 360 / (e = e > this.Sii ? this.Sii : e);
    let h = 0;
    for (let i = 0; i < e; i++) {
      let t = this.Vii(i);
      (t = t || this.qii()),
        (this.gii.Yaw = h),
        t.SetUIRelativeRotation(this.gii),
        (h += s);
    }
  }
  URl(t) {
    let i = Math.floor(t / this.yii);
    i > this.Sii && (i = this.Sii);
    for (let t = 0; t < this.Cii.length; t++) {
      var e = this.Cii[t],
        s = t < i;
      e.IsUIActiveSelf() !== s && e.SetUIActive(s);
    }
  }
  qii(t = !1) {
    var i = this.GetItem(13),
      e = this.GetItem(12);
    let s = void 0;
    return (
      (s = t
        ? e
        : LguiUtil_1.LguiUtil.DuplicateActor(
            e.GetOwner(),
            i,
          ).GetComponentByClass(UE.UIItem.StaticClass())),
      this.Cii.push(s),
      s
    );
  }
  Hii(t) {
    var i;
    this.GetActive() &&
      this.Tii !== this.Lii &&
      ((i = this.GetSprite(9)),
      (this.Iii += t),
      (this.Tii = MathUtils_1.MathUtils.Lerp(
        this.Tii,
        this.Lii,
        this.Iii / TEMPORARY_STRENGTH_LERP_TIME,
      )),
      i.SetFillAmount(this.Tii),
      this.Iii >= TEMPORARY_STRENGTH_LERP_TIME) &&
      (this.Iii = 0);
  }
  Vii(t) {
    return this.Cii[t];
  }
  Qnt() {
    this.InitTweenAnim(14),
      this.InitTweenAnim(15),
      this.InitTweenAnim(16),
      this.InitTweenAnim(17),
      this.InitTweenAnim(18),
      this.InitTweenAnim(19),
      this.InitTweenAnim(20);
  }
  wRl() {
    this.PlayTweenAnim(16),
      this.Nii(),
      (this.wii = TimerSystem_1.TimerSystem.Delay(
        () => {
          (this.wii = void 0),
            this.Wti(),
            this.GetItem(3).IsUIActiveSelf() && this.ORl();
        },
        FULL_ANIM_TIME,
        StrengthItem.Wii,
      )),
      (this.Dii = !1),
      (this.rXt = !1);
  }
  Kii() {
    this.Nii(), this.StopTweenAnim(16);
  }
  Nii() {
    this.wii &&
      (TimerSystem_1.TimerSystem.Remove(this.wii), (this.wii = void 0));
  }
  hga() {
    this.rXt ||
      (this.Kii(), this.Qii(), this.PlayTweenAnim(14), (this.rXt = !0));
  }
  BRl() {
    this.PlayTweenAnim(17);
  }
  PRl() {
    this.StopTweenAnim(17);
  }
  Wti() {
    this.PlayTweenAnim(15),
      this.Gii(),
      (this.xii = TimerSystem_1.TimerSystem.Delay(
        () => {
          (this.xii = void 0), (this.lCc = !1), this.Lri();
        },
        CLOSE_ANIM_TIME,
        StrengthItem.Xii,
      )),
      (this.rXt = !1);
  }
  Qii() {
    this.Gii(), this.StopTweenAnim(15);
  }
  Gii() {
    this.xii &&
      (TimerSystem_1.TimerSystem.Remove(this.xii), (this.xii = void 0));
  }
  GRl() {
    this.PlayTweenAnim(19);
  }
  kRl() {
    this.StopTweenAnim(19);
  }
  ORl() {
    this.PlayTweenAnim(20),
      this.Oii(),
      (this.Bii = TimerSystem_1.TimerSystem.Delay(
        () => {
          (this.Bii = void 0), this.DRl(!1), (this.Dii = !1);
        },
        TEMP_CLOSE_ANIM_TIME,
        StrengthItem.$ii,
      ));
  }
  qRl() {
    this.Oii(), this.StopTweenAnim(20);
  }
  Oii() {
    this.Bii &&
      (TimerSystem_1.TimerSystem.Remove(this.Bii), (this.Bii = void 0));
  }
  MRl() {
    this.PlayTweenAnim(18);
  }
  Lri() {
    this.SetActive(this.lCc || this._Cc);
  }
  uCc() {
    var t =
      ModelManager_1.ModelManager.BattleUiModel.FormationData
        ?.AutoMovingSettingEnable ?? !1;
    this.oCc !== t &&
      (t
        ? (this.nCc = CommonParamById_1.configCommonParamById.GetIntConfig(
            "ConstantSprintProgressAnimTime",
          ))
        : this.sCc?.SetVisible(!1),
      (this.oCc = t),
      (this._Cc = t),
      this.Lri());
  }
  dCc() {
    var t;
    this.oCc &&
      (t = this.RoleData?.EntityHandle?.Entity?.GetComponent(61)) &&
      (this.hCc
        ? this.fCc(2, 1)
        : ((t = t.GetAutoMovingConfig()),
          (t = Math.max(0, t.GetDuration() - t.GetCurrentTime())) > this.nCc
            ? this.fCc(0, 0)
            : ((t = 1 - t / this.nCc), this.fCc(1, t))));
  }
  fCc(t, i = 0) {
    this.sCc &&
      (this.aCc === t
        ? 1 === this.aCc && this.sCc.SetPercent(i)
        : ((this.aCc = t),
          this.sCc.SetVisible(0 !== t),
          this.sCc.SetPercent(i),
          2 === t ? this.sCc.SetChangeColor(!0) : this.sCc.SetChangeColor(!1)));
  }
}
((exports.StrengthItem = StrengthItem).Xii =
  Stats_1.Stat.Create("StrengthCloseAnim")),
  (StrengthItem.Wii = Stats_1.Stat.Create("StrengthFullAnim")),
  (StrengthItem.$ii = Stats_1.Stat.Create("StrengthTempCloseAnim"));
//# sourceMappingURL=StrengthItem.js.map
