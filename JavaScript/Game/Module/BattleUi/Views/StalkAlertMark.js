"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StalkAlertMark = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioController_1 = require("../../../../Core/Audio/AudioController"),
  Log_1 = require("../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  AiAlertClass_1 = require("../../../AI/Controller/AiAlertClass"),
  Global_1 = require("../../../Global"),
  GlobalData_1 = require("../../../GlobalData"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  ActorUtils_1 = require("../../../Utils/ActorUtils"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  GeneralLogicTreeUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeUtil"),
  EntityHeadIconItem_1 = require("./EntityHeadIconItem"),
  CENTER_Y = 62.5,
  MAX_A = 1176,
  MARGIN_A = 1008,
  MAX_B = 712.5,
  MARGIN_B = 495,
  center = Vector2D_1.Vector2D.Create(0, CENTER_Y),
  ADD_AUDIO_ID = "play_ui_fb_warn";
class StalkAlertMark extends EntityHeadIconItem_1.EntityHeadIconItem {
  constructor(t, i) {
    super(),
      (this.lXe = void 0),
      (this.Vmt = void 0),
      (this.Hmt = void 0),
      (this.jmt = void 0),
      (this._Xe = (0, puerts_1.$ref)(void 0)),
      (this.p$e = Vector2D_1.Vector2D.Create()),
      (this.g$e = (0, puerts_1.$ref)(0)),
      (this.v$e = Vector2D_1.Vector2D.Create()),
      (this.pXe = Vector2D_1.Vector2D.Create(1, -1)),
      (this.Wmt = Vector_1.Vector.Create()),
      (this.Kmt = Vector_1.Vector.Create()),
      (this.Qmt = Vector_1.Vector.Create()),
      (this.C$e = Vector_1.Vector.Create()),
      (this.Xmt = (0, puerts_1.$ref)(0)),
      (this.$mt = !1),
      (this.EPe = void 0),
      (this.bre = void 0),
      (this.uXe = 0),
      (this.cXe = 0),
      (this.Ymt = 0),
      (this.Jmt = void 0),
      (this.y$e = (t) => {
        var i = 7.776280778151;
        return (
          367.327774667328 /
            (1 + Math.pow(t / 537.430940553175, 1.11393060779131)) +
          i
        );
      }),
      GlobalData_1.GlobalData.World &&
        (this.CreateThenShowByResourceIdAsync("UiItem_Alert", t),
        (this.lXe = i),
        (t = UiLayer_1.UiLayer.UiRootItem),
        (this.uXe = Math.min(MAX_A, ((t?.GetWidth() ?? 0) - MARGIN_A) / 2)),
        (this.cXe = Math.min(MAX_B, ((t?.GetHeight() ?? 0) - MARGIN_B) / 2)));
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    (this.Vmt = this.GetSprite(0)),
      (this.Hmt = this.GetSprite(1)),
      (this.jmt = this.GetItem(2)),
      (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.SetActive(!1);
  }
  Update() {
    GlobalData_1.GlobalData.World &&
      this.RootItem &&
      (this.I$e(), this.$mt || this.LXe(), super.Update());
  }
  I$e() {
    var t,
      i,
      e,
      s = UiLayer_1.UiLayer.UiRootItem,
      r = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
    r &&
      ((e = Global_1.Global.CharacterController),
      this.Wmt.DeepCopy(this.lXe.K2_GetActorLocation()),
      (t = UE.GameplayStatics.ProjectWorldToScreen(
        e,
        this.Wmt.ToUeVector(),
        this._Xe,
      )) ||
        (this.Wmt.Subtraction(r, this.Kmt),
        (i = Global_1.Global.CharacterCameraManager),
        Rotator_1.Rotator.Create(i.GetCameraRotation()).Vector(this.Qmt),
        (i = UE.KismetMathLibrary.ProjectVectorOnToVector(
          this.Kmt.ToUeVector(),
          this.Qmt.ToUeVector(),
        ).op_Multiply(2)),
        this.C$e.Set(i.X, i.Y, i.Z),
        this.Kmt.SubtractionEqual(this.C$e),
        r.Addition(this.Kmt, this.Wmt),
        UE.GameplayStatics.ProjectWorldToScreen(
          e,
          this.Wmt.ToUeVector(),
          this._Xe,
        )),
      (i = (0, puerts_1.$unref)(this._Xe)),
      e.GetViewportSize(this.g$e, this.Xmt),
      (e = (0, puerts_1.$unref)(this.g$e)),
      this.p$e.Set(i.X, i.Y),
      this.v$e.Set(0.5 * s.GetWidth(), 0.5 * s.GetHeight()),
      this.p$e
        .MultiplyEqual(s.GetWidth() / e)
        .SubtractionEqual(this.v$e)
        .MultiplyEqual(this.pXe),
      (i = this.PXe(this.p$e, t)),
      (s = this.p$e.AdditionEqual(center)),
      i &&
        ((e = Vector_1.Vector.Distance(r, this.Wmt)),
        s.AdditionEqual(Vector2D_1.Vector2D.Create(0, this.y$e(e)))),
      this.RootItem.SetAnchorOffset(s.ToUeVector2D()),
      this.jmt?.SetUIActive(!i),
      this.jmt?.SetUIRelativeRotation(
        new UE.Rotator(0, (180 * Math.atan2(s.Y, s.X)) / Math.PI, 0),
      ));
  }
  PXe(t, i) {
    var e = t.X,
      s = t.Y,
      r = this.uXe,
      h = this.cXe;
    return (
      !!(i && (e * e) / (r * r) + (s * s) / (h * h) <= 1) ||
      ((i = (r * h) / Math.sqrt(h * h * e * e + r * r * s * s)),
      t.MultiplyEqual(i),
      !1)
    );
  }
  LXe() {
    var t = this.AiComponent?.AiController.AiAlert.AlertValue ?? 0;
    this.Vmt.SetFillAmount(
      MathUtils_1.MathUtils.Clamp(t, 0, AiAlertClass_1.MAX_ALERT) /
        AiAlertClass_1.MAX_ALERT,
    ),
      0 === this.Ymt &&
        0 < t &&
        (void 0 === this.Jmt &&
          (this.Jmt =
            ConfigManager_1.ConfigManager.AudioConfig?.GetAudioPath(
              ADD_AUDIO_ID,
            )?.Path),
        this.Jmt) &&
        AudioController_1.AudioController.PostEvent(this.Jmt, void 0),
      (this.Ymt = t);
  }
  SetAlertIcon(t) {
    ResourceSystem_1.ResourceSystem.LoadAsync(
      t,
      UE.LGUISpriteData_BaseObject,
      (t) => {
        t &&
          t.IsValid() &&
          this &&
          this.RootItem?.IsValid() &&
          this.Hmt?.IsValid() &&
          this.Hmt.SetSprite(t);
      },
    );
  }
  StopUpdateAlertValue() {
    this.$mt = !0;
  }
  ActivateAlertEffect() {
    this.EPe?.PlaySequencePurely("Show"), this.I$e();
  }
  CheckShowUiCondition() {
    var t;
    return this.AiComponent
      ? ((t =
          this.lXe.WasRecentlyRenderedOnScreen() ||
          this.AiComponent.AiController.AiAlert.CheckInAlertRange() ||
          0 < this.AiComponent.AiController.AiAlert.AlertValue) &&
          !this.GetActive() &&
          (this.SetActive(!0), this.EPe?.PlaySequencePurely("Start")),
        !t && this.GetActive() && this.SetActive(!1),
        t)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("AI", 43, "警戒NPC不能正常获取AiComponent"),
        !1);
  }
  get AiComponent() {
    var t;
    return (
      this.bre ||
        ((t = ActorUtils_1.ActorUtils.GetEntityByActor(this.lXe)),
        (this.bre = t.Entity.GetComponent(38))),
      this.bre
    );
  }
}
exports.StalkAlertMark = StalkAlertMark;
//# sourceMappingURL=StalkAlertMark.js.map
