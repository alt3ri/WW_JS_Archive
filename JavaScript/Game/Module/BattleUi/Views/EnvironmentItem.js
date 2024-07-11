"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnvironmentItem = void 0);
const UE = require("ue");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ScreenEffectSystem_1 = require("../../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class EnvironmentItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Art = void 0),
      (this.S0 = 0),
      (this.knt = void 0),
      (this.Snt = 0),
      (this.Fnt = -1),
      (this.dce = !1),
      (this.Vnt = void 0),
      (this.Hnt = void 0),
      (this.jnt = 0),
      (this.Wnt = -1),
      (this.Knt = 0.8);
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
    ];
  }
  OnStart() {
    this.GetSprite(2)?.SetUIActive(!1),
      this.hnt(6),
      this.hnt(7),
      this.hnt(8),
      this.hnt(9),
      this.hnt(10);
  }
  UpdatePropertyId(t) {
    if (t !== this.S0) {
      (this.S0 = t),
        (this.knt =
          ModelManager_1.ModelManager.BattleUiModel.FormationData.GetUiEnvironmentProperty(
            t,
          )),
        (this.Knt = this.knt.WarningPercent);
      var t = this.knt.IconFrame.AssetPathName?.toString();
      const i = this.knt.Icon.AssetPathName?.toString();
      const s = this.knt.IconFull.AssetPathName?.toString();
      const e = this.knt.SceneEffect.ToAssetPathName();
      const h = this.GetSprite(1);
      const r = this.GetSprite(4);
      const n = this.GetSprite(5);
      this.SetSpriteByPath(t, h, !1),
        r?.SetAlpha(0),
        this.SetSpriteByPath(i, r, !1, void 0, () => {
          r?.SetAlpha(1);
        }),
        n?.SetAlpha(0),
        this.SetSpriteByPath(s, n, !1, void 0, () => {
          n?.SetAlpha(1);
        }),
        this.Hnt !== e && (this.Qnt(), (this.Hnt = e), this.Xnt());
    }
  }
  SetPercent(s, e) {
    if (s <= 0 || e <= 0) (this.Snt = 0), this.$nt(!1);
    else if (this.knt) {
      s = Math.min(1, Math.max(0, s / e));
      if (this.Snt !== s) {
        (this.Snt = s), this.$nt(!0);
        let t = 0;
        let i = -1;
        s < this.Knt ? (t = 0) : (i = s < 1 ? ((t = 1), 7) : ((t = 2), 8));
        var e = this.GetSprite(3);
        e.SetFillAmount(s),
          this.Fnt !== t &&
            ((this.Fnt = t),
            (s = this.knt.BgColors).Num() > t &&
              this.GetSprite(0).SetColor(s.Get(t)),
            (s = this.knt.BarColors).Num() > t && e.SetColor(s.Get(t)),
            (e = this.GetSprite(4)),
            (s = this.GetSprite(5)),
            t === 2
              ? (e.SetUIActive(!1), s.SetUIActive(!0))
              : (e.SetUIActive(!0), s.SetUIActive(!1))),
          this.Wnt !== i &&
            (this.Wnt >= 0 && this.Irt(this.Wnt),
            (this.Wnt = i) >= 0
              ? (this.Ert(this.Wnt),
                this.GetSprite(2)?.SetAlpha(0),
                this.GetSprite(2)?.SetUIActive(!0))
              : this.GetSprite(2)?.SetUIActive(!1),
            t === 2) &&
            this.Ert(9),
          this.Ynt();
      }
    }
  }
  $nt(t) {
    t !== this.dce &&
      ((this.dce = t), this.Vnt) &&
      (this.dce
        ? (ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(
            this.Vnt,
          ),
          this.Irt(10),
          this.Ert(6))
        : (ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().EndScreenEffect(
            this.Vnt,
          ),
          this.Irt(6),
          this.Wnt >= 0 &&
            (this.Irt(this.Wnt),
            this.GetSprite(2)?.SetUIActive(!1),
            (this.Wnt = -1)),
          this.Ert(10)));
  }
  Xnt() {
    if (this.Hnt && !(this.Hnt.length <= 0)) {
      let i = !0;
      (this.jnt = ResourceSystem_1.ResourceSystem.LoadAsync(
        this.Hnt,
        UE.EffectScreenPlayData_C,
        (t) => {
          (this.jnt = 0),
            (i = !1),
            (this.Vnt = t),
            this.dce &&
              (ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(
                this.Vnt,
              ),
              this.Ynt());
        },
        102,
      )),
        i || (this.jnt = 0);
    }
  }
  Ynt() {
    this.Vnt &&
      ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().UpdateSEEnvironmentFactor(
        this.Vnt,
        this.Snt,
      );
  }
  Qnt() {
    this.jnt > 0 &&
      (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.jnt),
      (this.jnt = 0)),
      this.Vnt &&
        (ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().EndScreenEffect(
          this.Vnt,
        ),
        (this.Vnt = void 0)),
      (this.Hnt = void 0);
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy(), this.Qnt();
  }
  hnt(t) {
    const i = [];
    const s = this.GetItem(t)
      .GetOwner()
      .K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
    const e = s.Num();
    for (let t = 0; t < e; t++) i.push(s.Get(t));
    this.Art || (this.Art = new Map()), this.Art.set(t, i);
  }
  Ert(t) {
    t = this.Art?.get(t);
    if (t) for (const i of t) i.Play();
  }
  Irt(t) {
    t = this.Art?.get(t);
    if (t) for (const i of t) i.Stop();
  }
}
exports.EnvironmentItem = EnvironmentItem;
// # sourceMappingURL=EnvironmentItem.js.map
