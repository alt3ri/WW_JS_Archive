"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardInteractGrid = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract"),
  FishingDefine_1 = require("../../FishingDefine");
class DockyardInteractGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(i) {
    super(),
      (this.DXl = void 0),
      (this.i0o = void 0),
      (this.R$l = void 0),
      (this.P$l = 0),
      (this.U$l = () => {
        var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          FishingDefine_1.EMPTY_SPRITE,
        );
        this.SetSpriteByPath(i, this.i0o, !1), this.i0o.SetUIActive(!0);
      }),
      (this.BXl = () => {
        var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          FishingDefine_1.OUTLINE_SPRITE,
        );
        this.SetSpriteByPath(i, this.i0o, !1), this.i0o.SetUIActive(!0);
      }),
      (this.qXl = () => {
        var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          FishingDefine_1.PREVIEW_ERROR_SPRITE,
        );
        this.SetSpriteByPath(i, this.i0o, !1), this.i0o.SetUIActive(!0);
      }),
      (this.kXl = () => {
        var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          FishingDefine_1.PREVIEW_OCCUPANCY_SPRITE,
        );
        this.SetSpriteByPath(i, this.i0o, !1), this.i0o.SetUIActive(!0);
      }),
      (this.OXl = () => {
        var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          FishingDefine_1.PREVIEW_MATCH_SPRITE,
        );
        this.SetSpriteByPath(i, this.i0o, !1), this.i0o.SetUIActive(!0);
      }),
      (this.GXl = () => {
        var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          FishingDefine_1.MATCH_SPRITE,
        );
        this.SetSpriteByPath(i, this.i0o, !1), this.i0o.SetUIActive(!0);
      }),
      (this.N$l = {
        [0]: void 0,
        1: this.U$l,
        2: this.BXl,
        3: this.qXl,
        4: this.kXl,
        5: this.OXl,
        6: this.GXl,
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
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    (this.i0o = this.GetSprite(0)), this.GetItem(1)?.SetUIActive(!1);
  }
  Refresh(i) {
    (this.DXl = this.R$l.GetInteractGridData(i)),
      (this.ShowType = this.DXl.IsFinish ? 6 : 1);
  }
  RefreshBgSprite(i) {
    i
      ? this.DXl.IsFinish
        ? (this.ShowType = 4)
        : (this.ShowType = 6)
      : (this.ShowType = 3);
  }
  ResetPreviewBg() {
    this.DXl.IsFinish ? (this.ShowType = 6) : (this.ShowType = 1);
  }
  GetTargetItemId() {
    return this.DXl.TargetId;
  }
  get IsFinishInteract() {
    return this.DXl.IsFinish;
  }
  GetKey(i, t) {
    return i;
  }
}
exports.DockyardInteractGrid = DockyardInteractGrid;
//# sourceMappingURL=DockyardInteractGrid.js.map
