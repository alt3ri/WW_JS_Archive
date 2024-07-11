"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ServerMarkItem = void 0);
const Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ServerMarkItemView_1 = require("../MarkItemView/ServerMarkItemView"),
  MarkItem_1 = require("./MarkItem");
class ServerMarkItem extends MarkItem_1.MarkItem {
  constructor(e, t, r, i) {
    super(t, r, i, e.TrackSource ?? 1),
      (this.MinShowScale = 0),
      (this.MaxShowScale = 0),
      (this.ServerMarkInfo = void 0),
      12 === (this.ServerMarkInfo = e).MarkType || 9 === e.MarkType
        ? (this.ShowPriority = 0)
        : ((t = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(
            e.MarkConfigId,
          )),
          (this.ShowPriority = t ? t.ShowPriority : 0));
  }
  get MarkId() {
    return this.ServerMarkInfo?.MarkId;
  }
  get MarkType() {
    return 0;
  }
  get ConfigId() {
    return this.ServerMarkInfo.MarkConfigId;
  }
  get TrackPosition() {
    return this.ServerMarkInfo.TrackTarget instanceof Vector_1.Vector ||
      this.ServerMarkInfo.TrackTarget instanceof Vector2D_1.Vector2D
      ? this.ServerMarkInfo.TrackTarget
      : Vector_1.Vector.ZeroVectorProxy;
  }
  OnCreateView() {
    this.InnerView = new ServerMarkItemView_1.ServerMarkItemView(this);
  }
  CheckInShowRange(e) {
    return (
      !!this.IsIgnoreScaleShow ||
      this.MinShowScale === this.MaxShowScale ||
      (this.MinShowScale < e && this.MaxShowScale > e)
    );
  }
  OnAfterSetConfigId(e) {
    e &&
      (e.ShowRange &&
        ((this.MinShowScale = e.ShowRange[0] ?? 0),
        (this.MaxShowScale = e.ShowRange[1] ?? 0)),
      (this.IconPath = e.MarkPic),
      this.InnerView?.OnIconPathChanged(this.IconPath),
      e.ShowPriority && (this.ShowPriority = e.ShowPriority),
      (this.ConfigScale = e.Scale ?? 1));
  }
  CheckCanShowView() {
    var e = this.GetCurrentMapShowScale(),
      e = this.CheckInShowRange(e) || this.IsTracked;
    return (
      this.IsCanShowViewIntermediately !== e &&
        (this.NeedPlayShowOrHideSeq = e ? "ShowView" : "HideView"),
      e
    );
  }
  Initialize() {}
}
exports.ServerMarkItem = ServerMarkItem;
//# sourceMappingURL=ServerMarkItem.js.map
