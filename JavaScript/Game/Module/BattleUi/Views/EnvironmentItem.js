"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnvironmentItem = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ScreenEffectSystem_1 = require("../../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class EnvironmentItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.EMa = []),
      (this.Hnt = void 0),
      (this.zst = void 0),
      (this.Bst = 0),
      (this.Zst = -1),
      (this.dce = !1),
      (this.eat = void 0),
      (this.tat = void 0),
      (this.iat = 0),
      (this.oat = -1),
      (this.rat = 0.8),
      (this.qte = 0),
      (this.BY = 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UISprite],
      [4, UE.UISprite],
      [5, UE.UISprite],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UISprite],
    ];
  }
  InitPropertyId(t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 18, "初始化环境叙事球", ["propertyId", t]),
      (this.zst =
        ModelManager_1.ModelManager.BattleUiModel.FormationData.GetUiEnvironmentProperty(
          t,
        )),
      (this.rat = this.zst.WarningPercent);
  }
  async OnCreateAsync() {
    var t, s, i, e;
    this.zst &&
      ((t = this.zst.IconFrame.AssetPathName.toString()),
      (s = this.zst.Icon.AssetPathName.toString()),
      (i = this.zst.IconFull.AssetPathName.toString()),
      (e = []).push(this.yMa(t, 0)),
      e.push(this.yMa(s, 1)),
      e.push(this.yMa(i, 2)),
      await Promise.all(e));
  }
  async yMa(t, s) {
    const i = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(
      t,
      UE.LGUISpriteData_BaseObject,
      (t) => {
        t.IsValid() && (this.EMa[s] = t), i.SetResult(!0);
      },
    ),
      await i.Promise;
  }
  OnStart() {
    this.IMa(1, 0), this.IMa(4, 1), this.IMa(5, 2), (this.EMa.length = 0);
    var t,
      s = this.zst?.SceneEffect.ToAssetPathName(),
      s =
        (this.tat !== s && (this.nat(), (this.tat = s), this.sat()),
        this.GetSprite(2)),
      i = this.GetSprite(11);
    this.zst &&
      2 <= (t = this.zst.Colors).Num() &&
      (s.SetColor(t.Get(0)), i.SetColor(t.Get(1))),
      s.SetUIActive(!1),
      this.Est(6),
      this.Est(7),
      this.Est(8),
      this.Est(9),
      this.Est(10);
  }
  IMa(t, s) {
    (t = this.GetSprite(t)), (s = this.EMa[s]);
    s && t?.SetSprite(s, !1);
  }
  OnBeforeShow() {
    this.TMa(this.qte, this.BY);
  }
  SetPercent(t, s) {
    (this.qte = t), (this.BY = s), this.IsShowOrShowing && this.TMa(t, s);
  }
  TMa(i, e) {
    if (i <= 0 || e <= 0) (this.Bst = 0), this.aat(!1);
    else if (this.zst) {
      i = Math.min(1, Math.max(0, i / e));
      if (this.Bst !== i) {
        (this.Bst = i), this.aat(!0);
        let t = 0,
          s = -1;
        i < this.rat ? (t = 0) : (s = i < 1 ? ((t = 1), 7) : ((t = 2), 8));
        var e = this.GetSprite(3);
        e.SetFillAmount(i),
          this.Zst !== t &&
            ((this.Zst = t),
            (i = this.zst.BgColors).Num() > t &&
              this.GetSprite(0).SetColor(i.Get(t)),
            (i = this.zst.BarColors).Num() > t && e.SetColor(i.Get(t)),
            (e = this.GetSprite(4)),
            (i = this.GetSprite(5)),
            2 === t
              ? (e.SetUIActive(!1), i.SetUIActive(!0))
              : (e.SetUIActive(!0), i.SetUIActive(!1))),
          this.oat !== s &&
            (0 <= this.oat && this.Gnt(this.oat),
            0 <= (this.oat = s)
              ? (this.bnt(this.oat),
                this.GetSprite(2)?.SetAlpha(0),
                this.GetSprite(2)?.SetUIActive(!0))
              : this.GetSprite(2)?.SetUIActive(!1),
            2 === t) &&
            this.bnt(9),
          this.hat();
      }
    }
  }
  aat(t) {
    t !== this.dce &&
      ((this.dce = t), this.eat) &&
      (this.dce
        ? (ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(
            this.eat,
          ),
          this.Gnt(10),
          this.bnt(6))
        : (ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().EndScreenEffect(
            this.eat,
          ),
          this.Gnt(6),
          0 <= this.oat &&
            (this.Gnt(this.oat),
            this.GetSprite(2)?.SetUIActive(!1),
            (this.oat = -1)),
          this.bnt(10)));
  }
  sat() {
    if (this.tat && !(this.tat.length <= 0)) {
      let s = !0;
      (this.iat = ResourceSystem_1.ResourceSystem.LoadAsync(
        this.tat,
        UE.EffectScreenPlayData_C,
        (t) => {
          (this.iat = 0),
            (s = !1),
            (this.eat = t),
            this.dce &&
              (ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(
                this.eat,
              ),
              this.hat());
        },
        102,
      )),
        s || (this.iat = 0);
    }
  }
  hat() {
    this.eat &&
      ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().UpdateSEEnvironmentFactor(
        this.eat,
        this.Bst,
      );
  }
  nat() {
    0 < this.iat &&
      (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.iat),
      (this.iat = 0)),
      this.eat &&
        (ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().EndScreenEffect(
          this.eat,
        ),
        (this.eat = void 0)),
      (this.tat = void 0);
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy(), this.nat();
  }
  Est(t) {
    var s = [],
      i = this.GetItem(t)
        .GetOwner()
        .K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass()),
      e = i.Num();
    for (let t = 0; t < e; t++) s.push(i.Get(t));
    this.Hnt || (this.Hnt = new Map()), this.Hnt.set(t, s);
  }
  bnt(t) {
    t = this.Hnt?.get(t);
    if (t) for (const s of t) s.Play();
  }
  Gnt(t) {
    t = this.Hnt?.get(t);
    if (t) for (const s of t) s.Stop();
  }
}
exports.EnvironmentItem = EnvironmentItem;
//# sourceMappingURL=EnvironmentItem.js.map
