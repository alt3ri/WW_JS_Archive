"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Cursor = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  UiLayerType_1 = require("../../../Ui/Define/UiLayerType"),
  LguiResourceManager_1 = require("../../../Ui/LguiResourceManager"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  SPEED = 0.05,
  ALLOW_MOVE_TICK_LIMIT = 1e3;
class Cursor {
  constructor() {
    (this.Bxo = void 0),
      (this.bxo = void 0),
      (this.qxo = void 0),
      (this.Gxo = void 0),
      (this.Nxo = void 0),
      (this.Oxo = LguiResourceManager_1.LguiResourceManager.InvalidId),
      (this.kxo = 0),
      (this.Fxo = !1),
      (this.Vxo = !0),
      (this.Hxo = !1),
      (this.IsMoveInstantly = !1),
      (this.jxo = 0),
      (this.Wxo = void 0),
      (this.Kxo = !1),
      (this.Qxo = 0);
  }
  Xxo() {
    (this.Bxo && this.Bxo.IsValid()) ||
      (this.Oxo === LguiResourceManager_1.LguiResourceManager.InvalidId &&
        (this.Oxo =
          LguiResourceManager_1.LguiResourceManager.LoadPrefabByResourceId(
            "UiItem_Cursor_Prefab",
            UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pool),
            (i) => {
              (this.Oxo = LguiResourceManager_1.LguiResourceManager.InvalidId),
                LguiUtil_1.LguiUtil.SetActorIsPermanent(i, !0, !0),
                (this.Bxo = i.GetComponentByClass(UE.UIItem.StaticClass())),
                (this.bxo = this.Bxo.UIChildren.Get(0)),
                this.bxo.SetUIActive(!1);
            },
          )));
  }
  RefreshUseItem() {
    var i;
    (this.qxo && this.qxo.IsValid()) ||
      (this.Xxo(),
      this.Bxo?.IsValid() &&
        (this.bxo?.IsValid()
          ? (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("UiNavigation", 11, "拷贝一份新的光标"),
            (this.qxo = LguiUtil_1.LguiUtil.CopyItem(this.bxo, this.Bxo)),
            LguiUtil_1.LguiUtil.SetActorIsPermanent(
              this.qxo.GetOwner(),
              !0,
              !0,
            ),
            this.qxo.SetUIParent(
              UiLayer_1.UiLayer.GetLayerRootUiItem(
                UiLayerType_1.ELayerType.Float,
              ),
            ),
            (this.Kxo = this.qxo.IsUIActiveSelf()),
            (i = void 0 !== this.Gxo),
            this.$xo(i),
            Cursor.kRe.Set(0, 0, 0))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("UiNavigation", 11, "光标原始节点出现问题")));
  }
  Yxo() {
    var i = this.Gxo.K2_GetComponentLocation();
    Cursor.Jxo.Set(i.X + Cursor.zxo, 0, i.Z + Cursor.Zxo),
      Cursor.ewo.DeepCopy(Cursor.Jxo),
      Cursor.kRe.DeepCopy(Cursor.Jxo),
      this.qxo
        .GetOwner()
        .K2_SetActorLocation(Cursor.Jxo.ToUeVector(), !1, void 0, !1);
  }
  SetFollowItem(i) {
    (this.Nxo = i),
      (this.Gxo = i?.RootUIComp),
      (this.kxo = 0),
      (this.jxo = 0),
      (Cursor.C2n = 0),
      (Cursor.g2n = 0),
      i
        ? ((this.Fxo = !0),
          (this.Vxo = i.Cursor.Switch),
          this.two(),
          this.$xo(!0),
          this.iwo())
        : this.$xo(!1);
  }
  RepeatMove() {
    (this.Fxo = !0), (this.jxo = 0);
  }
  two() {
    var i,
      t,
      s,
      r,
      e = this.Gxo.GetWidth(),
      h = this.Gxo.GetHeight();
    (Cursor.C2n === e && Cursor.g2n === h) ||
      ((i = this.Gxo.GetPivot()),
      (r = this.Nxo.GetCursorOffset()),
      (t = this.Nxo.GetBoundOffset()),
      (s = r.X - MathUtils_1.MathUtils.Clamp(i.X, 0, 1)),
      (r = r.Y - MathUtils_1.MathUtils.Clamp(i.Y, 0, 1)),
      (Cursor.zxo = s * e + t.X),
      (Cursor.Zxo = r * h + t.Y),
      (Cursor.C2n = e),
      (Cursor.g2n = h));
  }
  SetIsUseMouse(i) {
    var t;
    this.Hxo !== i &&
      ((this.Hxo = i),
      (t = !!this.Gxo && this.Gxo.bIsUIActive),
      this.$xo(t),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info("UiNavigation", 11, "[InputChange]使用鼠标标记发生变更!", [
        "使用鼠标",
        i,
      ]);
  }
  iwo() {
    this.IsMoveInstantly && ((this.IsMoveInstantly = !1), this.Yxo());
  }
  owo() {
    return !(
      !UiManager_1.UiManager.IsInited ||
      (this.RefreshUseItem(), !this.Bxo) ||
      !this.Gxo?.IsValid() ||
      (this.Nxo
        ? !this.Fxo
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("UiNavigation", 11, "光标, 找不到导航对象"),
          1))
    );
  }
  rwo() {
    var i = this.Gxo.K2_GetComponentLocation(),
      t = this.Gxo.K2_GetComponentScale();
    Cursor.Jxo.Set(i.X + Cursor.zxo * t.X, 0, i.Z + Cursor.Zxo * t.Z),
      Vector_1.Vector.Lerp(Cursor.kRe, Cursor.Jxo, this.kxo, Cursor.ewo),
      (this.kxo += SPEED),
      Vector_1.Vector.PointsAreSame(Cursor.ewo, Cursor.Jxo) &&
        (Cursor.ewo.DeepCopy(Cursor.Jxo), this.nwo()),
      Cursor.kRe.DeepCopy(Cursor.ewo),
      this.qxo
        .GetOwner()
        .K2_SetActorLocation(Cursor.ewo.ToUeVector(), !1, void 0, !1),
      this.two();
  }
  Tick(i) {
    this.owo() && (this.rwo(), this.swo(i));
  }
  Clear() {
    LguiResourceManager_1.LguiResourceManager.CancelLoadPrefab(this.Oxo),
      this.Bxo?.IsValid() && ActorSystem_1.ActorSystem.Put(this.Bxo.GetOwner()),
      this.qxo?.IsValid() && ActorSystem_1.ActorSystem.Put(this.qxo.GetOwner()),
      this.awo(),
      (this.Oxo = LguiResourceManager_1.LguiResourceManager.InvalidId),
      (this.Qxo = 0),
      (this.Bxo = void 0),
      (this.bxo = void 0),
      (this.qxo = void 0),
      (this.Gxo = void 0),
      (this.Nxo = void 0),
      (this.Fxo = !1),
      (this.kxo = 0);
  }
  nwo() {
    this.jxo <= 0 && (this.jxo = ALLOW_MOVE_TICK_LIMIT);
  }
  swo(i) {
    this.jxo <= 0 || ((this.jxo -= i), this.jxo <= 0 && (this.Fxo = !1));
  }
  $xo(i) {
    this.qxo &&
      this.qxo.IsValid() &&
      ((i = i && this.Vxo && !this.Hxo), this.Kxo !== i) &&
      (this.awo(), (this.Kxo = i) ? this.hwo() : this.lwo(i));
  }
  lwo(i) {
    this.qxo.SetUIActive(i),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("UiNavigation", 11, "[InputChange]鼠标显隐发生变更!", [
          "active",
          this.Kxo,
        ]);
  }
  hwo() {
    0 === this.Qxo
      ? this.lwo(!0)
      : (this.lwo(!1),
        (this.Wxo = TimerSystem_1.TimerSystem.Delay(() => {
          (this.Wxo = void 0), this.lwo(!0);
        }, this.Qxo)),
        (this.Qxo = 0));
  }
  awo() {
    this.Wxo &&
      (TimerSystem_1.TimerSystem.Remove(this.Wxo), (this.Wxo = void 0));
  }
  SetCursorActiveDelayTime(i) {
    this.Qxo = i;
  }
}
((exports.Cursor = Cursor).kRe = Vector_1.Vector.Create()),
  (Cursor.Jxo = Vector_1.Vector.Create()),
  (Cursor.zxo = 0),
  (Cursor.Zxo = 0),
  (Cursor.ewo = Vector_1.Vector.Create()),
  (Cursor.C2n = 0),
  (Cursor.g2n = 0);
//# sourceMappingURL=CursorData.js.map
