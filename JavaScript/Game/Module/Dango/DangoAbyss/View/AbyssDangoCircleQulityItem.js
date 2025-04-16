"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AbyssDangoCircleQualityItem = exports.DangoCircleQualityData =
    void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class DangoCircleQualityData {
  constructor() {
    this.PluginIdMap = new Map();
  }
}
exports.DangoCircleQualityData = DangoCircleQualityData;
class AbyssDangoCircleQualityItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.lDc = new Map()), (this._Dc = []);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UISprite],
      [4, UE.UISprite],
      [5, UE.UISprite],
      [6, UE.UISprite],
      [7, UE.UISprite],
      [8, UE.UISprite],
    ];
  }
  OnStart() {
    this._Dc.push(this.GetSprite(0)),
      this.lDc.set(0, this.GetSprite(0)),
      this._Dc.push(this.GetSprite(2)),
      this.lDc.set(1, this.GetSprite(2)),
      this._Dc.push(this.GetSprite(1)),
      this.lDc.set(2, this.GetSprite(1));
    for (let t = 0; t < 6; t++) {
      var e = this.GetSprite(8 - t);
      this._Dc.push(e), this.lDc.set(t + 3, e);
    }
    this._Dc.forEach((t) => {
      t.SetUIActive(!1);
    });
  }
  RefreshData(t) {
    for (var [e, s] of t.PluginIdMap) 0 === e ? this.cDc(s) : this.uDc(e, s);
  }
  cDc(t) {
    0 === t
      ? this.lDc.get(0).SetUIActive(!1)
      : (this.lDc.get(0).SetUIActive(!0),
        (t =
          ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(t)),
        this.SetSpriteByPath(t.GetFormationCoreBgPath(), this.lDc.get(0), !1));
  }
  uDc(t, e) {
    t = this.lDc.get(t);
    t &&
      (0 === e
        ? t.SetUIActive(!1)
        : (t.SetUIActive(!0),
          (e =
            ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(
              e,
            )),
          this.SetSpriteByPath(e.GetFormationBgPath(), t, !1),
          (e = e.GetFormationBgColor()),
          (e = UE.Color.FromHex(e)),
          t.SetColor(e)));
  }
}
exports.AbyssDangoCircleQualityItem = AbyssDangoCircleQualityItem;
//# sourceMappingURL=AbyssDangoCircleQulityItem.js.map
