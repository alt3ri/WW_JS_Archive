"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlyStrengthItem = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  FormationAttributeController_1 = require("../../../Abilities/FormationAttributeController"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  StrengthItemBase_1 = require("./StrengthItemBase"),
  CLOSE_ANIM_TIME = 250,
  PRELOAD_SINGLE_STRENGTH_ITEM_COUNT = 3;
class FlyStrengthItem extends StrengthItemBase_1.StrengthItemBase {
  constructor() {
    super(...arguments),
      (this.mii = !0),
      (this.uRl = !0),
      (this.cRl = !1),
      (this._3a = !1),
      (this.Rjt = !1),
      (this.yni = 0),
      (this.Eii = 0),
      (this.Sii = 1),
      (this.mRl = 0.1),
      (this.dii = []),
      (this.Mni = 0),
      (this.Sni = 0),
      (this.dRl = 0),
      (this.gii = new UE.Rotator(0, 0, 0)),
      (this.xii = void 0),
      (this.uAl = void 0),
      (this.Pni = (t, i, s) => {
        this.xni();
      }),
      (this.bni = (t, i, s) => {
        this.xni();
      }),
      (this.CRl = (t, i) => {
        this.cRl !== i && ((this.cRl = i), this.Lri());
      }),
      (this.jGa = (t, i) => {
        this._3a !== i && ((this._3a = i), this.gRl());
      }),
      (this.YAl = (t, i) => {
        this.Rjt !== i && ((this.Rjt = i), this.wke());
      });
  }
  GetResourceId() {
    return "UiItem_EnergyFly";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
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
    for (let t = 0; t < PRELOAD_SINGLE_STRENGTH_ITEM_COUNT; t++)
      this.bii(0 === t);
    (this.yni =
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "LowEndurancePercent",
      ) / CommonDefine_1.RATE_10000),
      (this.Eii = CommonParamById_1.configCommonParamById.GetIntConfig(
        "FlySingleStrengthValue",
      )),
      (this.Sii = CommonParamById_1.configCommonParamById.GetIntConfig(
        "FlyMaxSingleStrengthItemCount",
      )),
      (this.mRl =
        CommonParamById_1.configCommonParamById.GetIntConfig("FlyTailSpeed") *
        TimeUtil_1.TimeUtil.Millisecond),
      this.InitTweenAnim(7),
      this.InitTweenAnim(8),
      super.OnStart(),
      this.xni(!0);
  }
  OnAfterShow() {
    super.OnAfterShow(), this.StopTweenAnim(8), this.PlayTweenAnim(7);
  }
  async OnBeforeHideAsync() {
    this.StopTweenAnim(7),
      this.PlayTweenAnim(8),
      this.uAl
        ? Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("HudUnit", 17, "重复隐藏翱翔体力条")
        : (this.Gii(),
          (this.uAl = new CustomPromise_1.CustomPromise()),
          (this.xii = TimerSystem_1.TimerSystem.Delay(
            () => {
              (this.xii = void 0),
                this.uAl && (this.uAl.SetResult(), (this.uAl = void 0));
            },
            CLOSE_ANIM_TIME,
            FlyStrengthItem.Xii,
          )),
          await this.uAl.Promise);
  }
  OnBeforeDestroy() {
    this.Gii(), super.OnBeforeDestroy();
  }
  Tick(t) {
    !this.GetUiVisible() ||
      this.dRl <= this.Mni ||
      ((this.dRl -= t * this.mRl), this.pRl());
  }
  OnAddEvents() {
    FormationAttributeController_1.FormationAttributeController.AddValueListener(
      10,
      this.Pni,
    ),
      FormationAttributeController_1.FormationAttributeController.AddMaxListener(
        10,
        this.bni,
      );
  }
  OnRemoveEvents() {
    FormationAttributeController_1.FormationAttributeController.RemoveValueListener(
      10,
      this.Pni,
    ),
      FormationAttributeController_1.FormationAttributeController.RemoveMaxListener(
        10,
        this.bni,
      );
  }
  OnAddEntityEvents() {
    var t;
    this.RoleData &&
      (t = this.RoleData.GameplayTagComponent) &&
      (this.ListenForTagAddOrRemove(t, -2027866845, this.CRl),
      this.ListenForTagAddOrRemove(t, -54528961, this.jGa),
      this.ListenForTagAddOrRemove(t, 1745099302, this.YAl));
  }
  OnRefreshRoleData() {
    this.RoleData &&
      ((this.cRl =
        this.RoleData?.GameplayTagComponent?.HasTag(-2027866845) ?? !1),
      (this._3a = this.RoleData?.GameplayTagComponent?.HasTag(-54528961) ?? !1),
      (this.Rjt =
        this.RoleData?.GameplayTagComponent?.HasTag(1745099302) ?? !1),
      this.gRl(),
      this.wke(),
      this.Lri());
  }
  bii(t = !1) {
    var i = this.GetItem(3),
      s = this.GetItem(4);
    let e = void 0;
    return (
      (e = t
        ? s
        : LguiUtil_1.LguiUtil.DuplicateActor(
            s.GetOwner(),
            i,
          ).GetComponentByClass(UE.UIItem.StaticClass())),
      this.dii.push(e),
      e
    );
  }
  xni(t = !1) {
    var i =
        FormationAttributeController_1.FormationAttributeController.GetValue(
          10,
        ),
      s =
        FormationAttributeController_1.FormationAttributeController.GetMax(10);
    let e = i !== this.Mni;
    e && (this.Mni = i),
      s !== this.Sni && ((e = !0), (this.Sni = s), this.kii(s)),
      e && this.GetSprite(1).SetFillAmount(i / s),
      this.Bni(t);
  }
  kii(t) {
    let i = Math.floor(t / this.Eii);
    i > this.Sii && (i = this.Sii);
    for (let t = 0; t < this.dii.length; t++) {
      var s = this.dii[t],
        e = t < i;
      s.IsUIActiveSelf() !== e && s.SetUIActive(e);
    }
    this.qni();
  }
  qni() {
    let t = Math.floor(this.Sni / this.Eii);
    var s = 360 / (t = t > this.Sii ? this.Sii : t);
    let e = 0;
    for (let i = 0; i < t; i++) {
      let t = this.dii[i];
      (t = t || this.bii()),
        (this.gii.Yaw = e),
        t.SetUIRelativeRotation(this.gii),
        (e += s);
    }
  }
  Bni(t = !1) {
    var i = this.Mni,
      s = this.Sni,
      e = i / s > this.yni,
      e = (this.fRl(e, t), s <= i);
    (this.uRl === e && !t) || ((this.uRl = e), this.Lri());
  }
  fRl(t, i = !1) {
    (this.mii === t && !i) ||
      ((this.mii = t),
      (i = this.GetSprite(1)).SetChangeColor(!t, i.changeColor),
      (i = this.GetSprite(2)).SetChangeColor(!t, i.changeColor));
  }
  Lri() {
    var t = this.cRl || !this.uRl;
    this.SetActive(t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("HudUnit", 17, "翱翔体力条显隐", ["visible", t]);
  }
  gRl() {
    var t = this.GetSprite(0),
      i = this.GetItem(5);
    this._3a
      ? (0 === this.dRl && (this.dRl = this.Mni),
        this.pRl(),
        t.SetUIActive(!0),
        i.SetUIActive(!0))
      : ((this.dRl = 0), t.SetUIActive(!1), i.SetUIActive(!1));
  }
  pRl() {
    var t = this.GetSprite(0),
      i = this.GetItem(5);
    t.SetFillAmount(this.dRl / this.Sni),
      (this.gii.Yaw = (this.Mni / this.Sni) * 360),
      i.SetUIRelativeRotation(this.gii);
  }
  wke() {
    this.GetItem(6)?.SetUIActive(this.Rjt);
  }
  Gii() {
    this.xii &&
      (TimerSystem_1.TimerSystem.Remove(this.xii), (this.xii = void 0)),
      this.uAl && (this.uAl.SetResult(), (this.uAl = void 0));
  }
}
(exports.FlyStrengthItem = FlyStrengthItem).Xii =
  Stats_1.Stat.Create("StrengthCloseAnim");
//# sourceMappingURL=FlyStrengthItem.js.map
