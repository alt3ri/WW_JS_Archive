"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EavesdropMark = void 0);
const UE = require("ue"),
  ue_1 = require("ue"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  CameraController_1 = require("../../../Camera/CameraController"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Global_1 = require("../../../Global"),
  GlobalData_1 = require("../../../GlobalData"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  UPDATE_TOLERATION = 0.1,
  HEAD_OFFSET = 150,
  NORMAL_START = "Eavesdrop_Start",
  NORMAL_END = "Eavesdrop_Close",
  TAKING_START = "Talk_Start",
  TAKING_LOOP = "Loop",
  TAKING_END = "Talk_Close",
  FOUND = "BeFound_Start",
  normalTag = -1304517334,
  startTakingTag = 570573252,
  endTag = -56767509,
  headName = new ue_1.FName("Bip001Head");
class EavesdropMark extends UiPanelBase_1.UiPanelBase {
  constructor(t, i) {
    super(),
      (this.E$e = void 0),
      (this.v2n = void 0),
      (this.M2n = void 0),
      (this.yen = void 0),
      (this.JZ = void 0),
      (this.S2n = void 0),
      (this.E2n = void 0),
      (this.y2n = void 0),
      (this.SPe = void 0),
      (this.$1t = Rotator_1.Rotator.Create()),
      (this.I2n = 3),
      (this.T2n = 3),
      (this.L2n = (t, i) => {
        i && 0 !== this.I2n && this.PlayChangeToNormalSeq();
      }),
      (this.D2n = (t, i) => {
        i && 0 === this.I2n && this.PlayTakingSeq();
      }),
      (this.A2n = (t, i) => {
        i && 3 !== this.I2n && this.PlayEndSeq();
      }),
      (this.JTt = (t) => {
        if (t === NORMAL_END || t === TAKING_END)
          switch (
            (t === NORMAL_END
              ? this.JZ?.SetUIActive(!1)
              : t === TAKING_END && this.E2n?.SetUIActive(!1),
            this.T2n)
          ) {
            case 1:
              this.E2n?.SetUIActive(!0), this.U2n();
              break;
            case 2:
              this.y2n?.SetUIActive(!0), this.R2n();
              break;
            case 0:
              this.JZ?.SetUIActive(!0), this.x2n();
              break;
            case 3:
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RemoveEavesdropMark,
                this.v2n,
              );
          }
        else t === TAKING_START && this.SPe?.PlaySequencePurely(TAKING_LOOP);
      }),
      GlobalData_1.GlobalData.World &&
        ((this.E$e = t),
        (this.v2n = i),
        (t = EntitySystem_1.EntitySystem.Get(i))) &&
        ((this.M2n = t.GetComponent(188)),
        this.M2n.AddTagAddOrRemoveListener(normalTag, this.L2n),
        this.M2n.AddTagAddOrRemoveListener(startTakingTag, this.D2n),
        this.M2n.AddTagAddOrRemoveListener(endTag, this.A2n));
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  OnStart() {
    (this.JZ = this.GetItem(0)),
      (this.S2n = this.GetText(1)),
      (this.E2n = this.GetItem(2)),
      (this.y2n = this.GetItem(3)),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.SPe?.BindSequenceCloseEvent(this.JTt),
      this.JZ?.SetUIActive(!0),
      this.E2n?.SetUIActive(!1),
      this.y2n?.SetUIActive(!1),
      this.SPe.PlaySequencePurely(NORMAL_START),
      (this.I2n = 0),
      (this.yen = this.E$e.GetComponentByClass(
        UE.SkeletalMeshComponent.StaticClass(),
      )),
      this.T_e(),
      this.P2n(),
      this.Swr(),
      this.RootItem.SetUIRelativeScale3D(
        Vector_1.Vector.Create(0.5, 0.5, 0.5).ToUeVector(!0),
      );
  }
  Update() {
    this.T_e(), this.P2n(), this.Swr();
  }
  T_e() {
    var t = CameraController_1.CameraController.CameraRotator,
      i = t.Yaw + 90,
      t = t.Pitch - 90,
      s = Rotator_1.Rotator.Create(this.RootItem.RelativeRotation);
    (Math.abs(i - this.$1t.Yaw) < UPDATE_TOLERATION &&
      Math.abs(t - this.$1t.Roll) < UPDATE_TOLERATION &&
      s.Equals(this.$1t, UPDATE_TOLERATION)) ||
      ((this.$1t.Yaw = i),
      (this.$1t.Pitch = 0),
      (this.$1t.Roll = t),
      this.RootItem?.SetUIRelativeRotation(this.$1t.ToUeRotator()));
  }
  P2n() {
    var t =
        Global_1.Global.BaseCharacter?.CharacterActorComponent
          ?.ActorLocationProxy,
      i = this.E$e?.K2_GetActorLocation();
    if (t && i)
      return (
        (i = Vector_1.Vector.Create(i).SubtractionEqual(
          Vector_1.Vector.Create(t),
        )),
        this.S2n?.SetText(Math.round(i.Size() / 100).toString() + " 米"),
        i.Size()
      );
    this.S2n?.SetText("");
  }
  Swr() {
    var t = this.yen.GetSocketLocation(headName);
    (t.Z += HEAD_OFFSET), this.RootItem.SetUIRelativeLocation(t);
  }
  PlayFoundSeq() {
    2 !== this.I2n &&
      (0 === this.I2n
        ? (this.SPe?.PlaySequencePurely(NORMAL_END), (this.T2n = 2))
        : 1 === this.I2n &&
          (this.SPe?.PlaySequencePurely(TAKING_END), (this.T2n = 2)));
  }
  R2n() {
    this.SPe?.PlaySequencePurely(FOUND), (this.I2n = 2), (this.T2n = 3);
  }
  x2n() {
    this.SPe?.PlaySequencePurely(NORMAL_START), (this.I2n = 0), (this.T2n = 3);
  }
  PlayEndSeq() {
    3 !== this.I2n &&
      (1 === this.I2n
        ? this.SPe?.PlaySequencePurely(TAKING_END)
        : 0 === this.I2n && this.SPe?.PlaySequencePurely(NORMAL_END),
      (this.I2n = 3));
  }
  PlayTakingSeq() {
    1 !== this.I2n &&
      0 === this.I2n &&
      (this.SPe?.PlaySequencePurely(NORMAL_END), (this.T2n = 1));
  }
  PlayChangeToNormalSeq() {
    0 !== this.I2n &&
      1 === this.I2n &&
      (this.SPe?.PlaySequencePurely(TAKING_END), (this.T2n = 0));
  }
  U2n() {
    this.SPe?.PlaySequencePurely(TAKING_START), (this.I2n = 1), (this.T2n = 3);
  }
  Initialize(t) {
    this.CreateThenShowByResourceIdAsync("UiItem_Eavesdrop", t);
  }
  OnEnd() {}
}
exports.EavesdropMark = EavesdropMark;
//# sourceMappingURL=EavesdropMark.js.map
