"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TrackedMarkForTower = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  Global_1 = require("../../../Global"),
  GlobalData_1 = require("../../../GlobalData"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  CharacterAttributeTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  TrackedMark_1 = require("./TrackedMark"),
  SUB_SCALE = 0.8,
  CENTER_Y = 62.5,
  center = Vector2D_1.Vector2D.Create(0, CENTER_Y),
  RAD_2_DEG = 180 / Math.PI;
class TrackedMarkForTower extends TrackedMark_1.TrackedMark {
  constructor() {
    super(...arguments),
      (this.$te = void 0),
      (this.Cra = void 0),
      (this.Hnt = new Map()),
      (this.gra = Number.MAX_VALUE),
      (this.fra = () => {
        this.Cra?.Kill(), (this.Cra = void 0), this.Gnt(5);
      }),
      (this.pra = (t) => {
        this.GetSprite(2).SetFillAmount(t), this.GetSprite(3).SetFillAmount(t);
      });
  }
  Initialize(t) {
    this.CreateThenShowByResourceIdAsync("UiItem_TowerBar", t, !0);
  }
  OnUiShow() {
    this.IsSubTrack
      ? this.RootItem?.SetRelativeScale3D(
          new UE.Vector(SUB_SCALE, SUB_SCALE, SUB_SCALE),
        )
      : this.RootItem?.SetRelativeScale3D(new UE.Vector(1, 1, 1)),
      this.Gnt(6),
      this.bnt(4);
  }
  OnUiHide() {
    this.Gnt(4), this.bnt(6);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIItem],
      [2, UE.UISprite],
      [3, UE.UISprite],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
    ];
  }
  OnStart() {
    (this.DirectionComp = this.GetItem(1)),
      this.DirectionComp.SetUIActive(
        !this.IsInTrackRange && !this.IsForceHideDirection,
      ),
      this.Qnt();
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy(),
      (this.$te = void 0),
      this.fra(),
      this.Gnt(4),
      this.Gnt(5),
      this.Gnt(6),
      this.Hnt.clear();
  }
  Update(t) {
    GlobalData_1.GlobalData.World
      ? UiLayer_1.UiLayer.UiRootItem
        ? this.RootItem &&
          ((this.CurShowTime += t / CommonDefine_1.MILLIONSECOND_PER_SECOND),
          this.RootItem.SetUIActive(!0),
          this.UpdatePositionAndRotation(t),
          this.vra())
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Map",
            50,
            "【疑难杂症】标记固定在屏幕中心，RootItem为空",
          )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Map",
          50,
          "【疑难杂症】标记固定在屏幕中心，GameWorld为空",
        );
  }
  UpdatePositionAndRotation(t) {
    var i,
      e = Global_1.Global.CharacterController,
      s = this.TempTrackPosition.ToUeVector(),
      r = UE.GameplayStatics.ProjectWorldToScreen(e, s, this.ScreenPositionRef),
      s =
        (r ||
          (((s = (i =
            ModelManager_1.ModelManager.CameraModel
              .CameraTransform).InverseTransformPositionNoScale(s)).X = -s.X),
          (i = i.TransformPositionNoScale(s)),
          UE.GameplayStatics.ProjectWorldToScreen(
            e,
            i,
            this.ScreenPositionRef,
          )),
        (0, puerts_1.$unref)(this.ScreenPositionRef));
    this.ScreenPosition.Set(s.X, s.Y),
      (this.LastScreenPosition.Equals(this.ScreenPosition, 1) &&
        !this.NiagaraNeedActivateNextTick) ||
        (this.LastScreenPosition.DeepCopy(this.ScreenPosition),
        (e = ModelManager_1.ModelManager.BattleUiModel),
        Info_1.Info.IsInTouch() || e.UpdateViewPortSize(),
        this.ScreenPosition.MultiplyEqual(e.ScreenPositionScale)
          .AdditionEqual(e.ScreenPositionOffset)
          .MultiplyEqual(this.PointTransport),
        (this.InRange = this.ClampToEllipse(this.ScreenPosition, r)),
        (i = this.ScreenPosition.AdditionEqual(center)),
        this.RootItem.SetAnchorOffset(i.ToUeVector2D()),
        this.InRange || this.IsInTrackRange || this.IsForceHideDirection
          ? this.DirectionComp.SetUIActive(!1)
          : (this.TempRotator.Reset(),
            (this.TempRotator.Yaw =
              Math.atan2(this.ScreenPosition.Y, this.ScreenPosition.X) *
                RAD_2_DEG -
              90),
            this.DirectionComp.SetUIRelativeRotation(
              this.TempRotator.ToUeRotator(),
            ),
            this.DirectionComp.SetUIActive(!0)));
  }
  vra() {
    if (!this.$te) {
      var t = this.TrackTarget,
        t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
      if (!t) return;
      t = t.Entity;
      if (!t) return;
      if (((this.$te = t.GetComponent(158)), !this.$te)) return;
    }
    var i,
      e,
      t = this.$te.GetCurrentValue(
        CharacterAttributeTypes_1.EAttributeId.Proto_Life,
      );
    t >= this.gra ||
      ((i =
        t /
        this.$te.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.e5n)),
      this.GetSprite(0).SetFillAmount(i),
      this.bnt(5),
      (e = this.GetSprite(3).GetFillAmount()),
      this.fra(),
      this.Mra(e, i),
      (this.gra = t));
  }
  Qnt() {
    this.Est(4), this.Est(5), this.Est(6);
  }
  Est(t) {
    var i = [],
      e = this.GetItem(t)
        .GetOwner()
        .K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass()),
      s = e.Num();
    for (let t = 0; t < s; t++) i.push(e.Get(t));
    this.Hnt.set(t, i);
  }
  bnt(t) {
    t = this.Hnt.get(t);
    if (t) for (const i of t) i.Play();
  }
  Gnt(t) {
    t = this.Hnt.get(t);
    if (t) for (const i of t) i.Stop();
  }
  Mra(t, i) {
    (this.Cra = UE.LTweenBPLibrary.FloatTo(
      this.RootActor,
      (0, puerts_1.toManualReleaseDelegate)(this.pra),
      t,
      i,
    )),
      this.Cra.OnCompleteCallBack.Bind(this.fra);
  }
}
exports.TrackedMarkForTower = TrackedMarkForTower;
//# sourceMappingURL=TrackedMarkForTower.js.map
