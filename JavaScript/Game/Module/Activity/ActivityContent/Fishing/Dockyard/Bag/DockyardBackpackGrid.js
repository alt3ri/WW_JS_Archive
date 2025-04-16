"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardBackpackGrid = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  UiSequencePlayer_1 = require("../../../../../../Ui/Base/UiSequencePlayer"),
  GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract"),
  FishingDefine_1 = require("../../FishingDefine");
class DockyardBackpackGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(i) {
    super(),
      (this.x$l = void 0),
      (this.A$l = void 0),
      (this.R$l = void 0),
      (this.P$l = 0),
      (this.i0o = void 0),
      (this.kzl = void 0),
      (this.$pt = void 0),
      (this.Yx_ = void 0),
      (this.w$l = () => {
        var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          FishingDefine_1.DISABLE_SPRITE,
        );
        this.SetSpriteByPath(i, this.i0o, !1), this.i0o.SetUIActive(!0);
      }),
      (this.U$l = () => {
        var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          FishingDefine_1.EMPTY_SPRITE,
        );
        this.SetSpriteByPath(i, this.i0o, !1), this.i0o.SetUIActive(!0);
      }),
      (this.D$l = () => {
        var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          FishingDefine_1.PREVIEW_SPRITE,
        );
        this.SetSpriteByPath(i, this.i0o, !1), this.i0o.SetUIActive(!0);
      }),
      (this.B$l = () => {
        var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          FishingDefine_1.SINGLE_OCCUPANCY_SPRITE,
        );
        this.SetSpriteByPath(i, this.i0o, !1), this.i0o.SetUIActive(!0);
      }),
      (this.q$l = () => {
        var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          FishingDefine_1.MULTI_OCCUPANCY_SPRITE,
        );
        this.SetSpriteByPath(i, this.i0o, !1), this.i0o.SetUIActive(!0);
      }),
      (this.k$l = () => {
        var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          FishingDefine_1.PROHIBIT_SPRITE,
        );
        this.SetSpriteByPath(i, this.i0o, !1), this.i0o.SetUIActive(!0);
      }),
      (this.O$l = () => {
        var i = this.R$l.GetPreviewBackpackData(this.A$l),
          i = this.R$l.BackpackData.GetItemBlockData(i),
          i =
            ConfigManager_1.ConfigManager.FishingConfig.GetFishingQualityConfig(
              i.Data.Quality,
            );
        this.SetSpriteByPath(i.GridSprite, this.i0o, !1),
          this.i0o.SetUIActive(!0);
      }),
      (this.N$l = {
        [0]: void 0,
        1: this.w$l,
        2: this.U$l,
        3: this.D$l,
        4: this.B$l,
        5: this.q$l,
        6: this.k$l,
        7: this.O$l,
      }),
      (this.R$l = i);
  }
  set ShowType(i) {
    this.P$l !== i && ((this.P$l = i), this.N$l[i]());
  }
  get ShowType() {
    return this.P$l;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UISprite],
    ];
  }
  OnStart() {
    (this.i0o = this.GetSprite(0)),
      (this.kzl = this.GetSprite(1)),
      (this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.kzl)),
      (this.Yx_ = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem)),
      this.SetSpriteMaskActive(!1);
  }
  OnBeforeDestroy() {
    this.$pt.Clear(), this.Yx_.Clear();
  }
  G$l() {
    this.kzl.SetColor(UE.Color.FromHex("#DAC8AC")),
      this.kzl.SetUIActive(!0),
      this.$pt.IsSequenceInPlaying("Activate") ||
        this.$pt.PlaySequencePurely("Activate");
  }
  F$l() {
    this.kzl.SetColor(UE.Color.FromHex("#F88D99")),
      this.kzl.SetUIActive(!0),
      this.$pt.IsSequenceInPlaying("Activate") ||
        this.$pt.PlaySequencePurely("Activate");
  }
  BJl() {
    this.kzl.SetUIActive(this.x$l.IsQuicklySell),
      this.$pt.StopSequenceByKey("Activate", !0, !0),
      this.x$l.IsQuicklySell && this.kzl.SetColor(UE.Color.FromHex("#FFFFFF"));
  }
  InDisable() {
    return !this.x$l.IsValid;
  }
  IsQuicklySell() {
    return this.x$l.IsQuicklySell;
  }
  Refresh(i) {
    (this.A$l = i),
      (this.x$l = this.R$l.BackpackData.GetBackpackGridData(i)),
      this.kzl.SetUIActive(this.x$l.IsQuicklySell),
      (this.ShowType = this.InDisable() ? 1 : 2);
  }
  RefreshPreview(i, t) {
    this.InDisable()
      ? (this.ShowType = 6)
      : (this.R$l.IsInSelectState && this.SetSpriteMaskActive(!1),
        3 === t
          ? (this.R$l.SetPreviewBackpackData(this.A$l, i), (this.ShowType = 3))
          : 7 === t
            ? (this.R$l.SetPreviewBackpackData(this.A$l, i),
              (this.ShowType = 7))
            : (this.ShowType = t));
  }
  RefreshQuicklySell(i) {
    1 === i ? this.G$l() : 2 === i ? this.F$l() : 0 === i && this.BJl();
  }
  ResetQuicklySell() {
    this.RefreshQuicklySell(0);
  }
  ResetPreviewBgForce() {
    this.InDisable()
      ? (this.ShowType = 1)
      : (this.R$l.SetPreviewBackpackData(
          this.A$l,
          FishingDefine_1.UNVALID_ITEM_BLOCK_ID,
        ),
        (this.ShowType = 2));
  }
  ResetPreviewBg(i) {
    var t;
    this.InDisable()
      ? (this.ShowType = 1)
      : (t = this.R$l.GetPreviewBackpackData(this.A$l)) === i ||
          t === FishingDefine_1.UNVALID_ITEM_BLOCK_ID
        ? (this.R$l.SetPreviewBackpackData(
            this.A$l,
            FishingDefine_1.UNVALID_ITEM_BLOCK_ID,
          ),
          (this.ShowType = 2),
          this.SetSpriteMaskActive(!1))
        : ((this.ShowType = 7),
          this.SetSpriteMaskActive(this.R$l.IsInSelectState));
  }
  SetItemBlockId(i) {
    this.R$l.SetPreviewBackpackData(this.A$l, i);
  }
  GetItemBlockId() {
    return this.R$l.GetPreviewBackpackData(this.A$l);
  }
  GetKey(i, t) {
    return i;
  }
  SetSpriteMaskActive(i) {
    this.GetSprite(2).SetUIActive(i);
  }
  PlaySequence(i) {
    this.Yx_.StopPrevSequence(!1, !0), this.Yx_.PlaySequencePurely(i);
  }
}
exports.DockyardBackpackGrid = DockyardBackpackGrid;
//# sourceMappingURL=DockyardBackpackGrid.js.map
