"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapStreamingComponent = void 0);
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  MapComponent_1 = require("../../../Map/Base/MapComponent");
class WorldMapStreamingComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments),
      (this.Z__ = new Set()),
      (this.e1_ = new Map()),
      (this.t1_ = Vector2D_1.Vector2D.Create());
  }
  get ComponentType() {
    return 8;
  }
  get NYa() {
    var t = this.Parent;
    if (void 0 !== t) return t;
    this.LogError(63, "[地图系统]->二级界面组件没有附加到容器下！");
  }
  OnUpdate() {
    for (const t of this.Z__) this.HandleStreamingUpdate(t);
  }
  OnRemove() {
    this.Z__.clear(), this.e1_.clear();
  }
  Bind(t) {
    this.Z__.add(t);
  }
  Unbind(t) {
    this.Z__.delete(t), this.e1_.delete(t);
  }
  BindAll(t) {
    for (const e of t) this.Bind(e);
  }
  HandleStreamingUpdate(t) {
    var e = this.IsInStreamingRange(t),
      n = this.e1_.get(t);
    return (
      (void 0 !== e && e === n) ||
        (this.e1_.set(t, e), (t.IsVisible = e) ? t.OnLoad() : t.OnUnload()),
      e
    );
  }
  IsInStreamingRange(t) {
    var e, n, r, o;
    return (
      !t.IsStreaming ||
      ((n = this.NYa.MoveComponent),
      (e = this.NYa.OutOfViewPortSize),
      (n = n.MapUiPosition),
      (o = t.GetUiPosition()),
      (r = ModelManager_1.ModelManager.WorldMapModel.MapScale),
      this.t1_.Set(o.X * r + n.X, o.Y * r + n.Y),
      (o = t.GetPreloadThreshold()),
      Math.abs(this.t1_.X) <= e.X + o.X && Math.abs(this.t1_.Y) <= e.Y + o.Y)
    );
  }
}
exports.WorldMapStreamingComponent = WorldMapStreamingComponent;
//# sourceMappingURL=WorldMapStreamingComponent.js.map
