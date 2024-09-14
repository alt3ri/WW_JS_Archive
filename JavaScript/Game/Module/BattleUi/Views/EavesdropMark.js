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
  SneakController_1 = require("../../../World/Controller/SneakController"),
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
      (this.A2n = void 0),
      (this.U2n = void 0),
      (this.yen = void 0),
      (this.JZ = void 0),
      (this.R2n = void 0),
      (this.x2n = void 0),
      (this.P2n = void 0),
      (this.SPe = void 0),
      (this.$1t = Rotator_1.Rotator.Create()),
      (this.B2n = 3),
      (this.w2n = 3),
      (this.zVa = -1),
      (this.b2n = (t, i) => {
        i && 0 !== this.B2n && this.PlayChangeToNormalSeq();
      }),
      (this.q2n = (t, i) => {
        i && 0 === this.B2n && this.PlayTakingSeq();
      }),
      (this.G2n = (t, i) => {
        i && 3 !== this.B2n && this.PlayEndSeq();
      }),
      (this.JTt = (t) => {
        if (t === NORMAL_END || t === TAKING_END)
          switch (
            (t === NORMAL_END
              ? this.JZ?.SetUIActive(!1)
              : t === TAKING_END && this.x2n?.SetUIActive(!1),
            this.w2n)
          ) {
            case 1:
              this.x2n?.SetUIActive(!0), this.O2n();
              break;
            case 2:
              this.P2n?.SetUIActive(!0), this.N2n();
              break;
            case 0:
              this.JZ?.SetUIActive(!0), this.k2n();
              break;
            case 3:
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RemoveEavesdropMark,
                this.A2n,
              );
          }
        else t === TAKING_START && this.SPe?.PlaySequencePurely(TAKING_LOOP);
      }),
      (this.gYe = () => {
        this.SetActive(!0);
      }),
      (this.fYe = () => {
        this.SetActive(!1);
      }),
      GlobalData_1.GlobalData.World &&
        ((this.E$e = t),
        (this.A2n = i),
        (t = EntitySystem_1.EntitySystem.Get(i))) &&
        ((this.U2n = t.GetComponent(190)),
        this.U2n.AddTagAddOrRemoveListener(normalTag, this.b2n),
        this.U2n.AddTagAddOrRemoveListener(startTakingTag, this.q2n),
        this.U2n.AddTagAddOrRemoveListener(endTag, this.G2n));
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
      (this.R2n = this.GetText(1)),
      (this.x2n = this.GetItem(2)),
      (this.P2n = this.GetItem(3)),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.SPe?.BindSequenceCloseEvent(this.JTt),
      this.JZ?.SetUIActive(!0),
      this.x2n?.SetUIActive(!1),
      this.P2n?.SetUIActive(!1),
      this.SPe.PlaySequencePurely(NORMAL_START),
      (this.B2n = 0),
      (this.yen = this.E$e.GetComponentByClass(
        UE.SkeletalMeshComponent.StaticClass(),
      ));
    var t = this.F2n();
    this.T_e(),
      this.Swr(),
      void 0 !== t &&
        SneakController_1.SneakController.IsSneaking &&
        (this.zVa < t && !this.GetActive()
          ? this.SetActive(!0)
          : this.zVa >= t && this.GetActive() && this.SetActive(!1)),
      this.RootItem.SetUIRelativeScale3D(
        Vector_1.Vector.Create(0.5, 0.5, 0.5).ToUeVector(!0),
      );
  }
  Update() {
    var t = this.F2n();
    this.T_e(),
      this.Swr(),
      void 0 !== t &&
        SneakController_1.SneakController.IsSneaking &&
        (this.zVa < t && this.GetActive()
          ? this.SetActive(!1)
          : this.zVa >= t && !this.GetActive() && this.SetActive(!0));
  }
  T_e() {
    var t = CameraController_1.CameraController.CameraRotator,
      i = t.Yaw + 90,
      t = t.Pitch - 90,
      e = Rotator_1.Rotator.Create(this.RootItem.RelativeRotation);
    (Math.abs(i - this.$1t.Yaw) < UPDATE_TOLERATION &&
      Math.abs(t - this.$1t.Roll) < UPDATE_TOLERATION &&
      e.Equals(this.$1t, UPDATE_TOLERATION)) ||
      ((this.$1t.Yaw = i),
      (this.$1t.Pitch = 0),
      (this.$1t.Roll = t),
      this.RootItem?.SetUIRelativeRotation(this.$1t.ToUeRotator()));
  }
  F2n() {
    var t =
        Global_1.Global.BaseCharacter?.CharacterActorComponent
          ?.ActorLocationProxy,
      i = this.E$e?.K2_GetActorLocation();
    if (t && i)
      return (
        (i = Vector_1.Vector.Create(i).SubtractionEqual(
          Vector_1.Vector.Create(t),
        )),
        this.R2n?.SetText(Math.round(i.Size() / 100).toString() + " 米"),
        i.Size()
      );
    this.R2n?.SetText("");
  }
  Swr() {
    var t = this.yen.GetSocketLocation(headName);
    (t.Z += HEAD_OFFSET), this.RootItem.SetUIRelativeLocation(t);
  }
  PlayFoundSeq() {
    2 !== this.B2n &&
      (0 === this.B2n
        ? (this.SPe?.PlaySequencePurely(NORMAL_END), (this.w2n = 2))
        : 1 === this.B2n &&
          (this.SPe?.PlaySequencePurely(TAKING_END), (this.w2n = 2)));
  }
  N2n() {
    this.SPe?.PlaySequencePurely(FOUND), (this.B2n = 2), (this.w2n = 3);
  }
  k2n() {
    this.SPe?.PlaySequencePurely(NORMAL_START), (this.B2n = 0), (this.w2n = 3);
  }
  PlayEndSeq() {
    3 !== this.B2n &&
      (1 === this.B2n
        ? this.SPe?.PlaySequencePurely(TAKING_END)
        : 0 === this.B2n && this.SPe?.PlaySequencePurely(NORMAL_END),
      (this.B2n = 3));
  }
  PlayTakingSeq() {
    1 !== this.B2n &&
      0 === this.B2n &&
      (this.SPe?.PlaySequencePurely(NORMAL_END), (this.w2n = 1));
  }
  PlayChangeToNormalSeq() {
    0 !== this.B2n &&
      1 === this.B2n &&
      (this.SPe?.PlaySequencePurely(TAKING_END), (this.w2n = 0));
  }
  O2n() {
    this.SPe?.PlaySequencePurely(TAKING_START), (this.B2n = 1), (this.w2n = 3);
  }
  Initialize(t, i) {
    this.CreateThenShowByResourceIdAsync("UiItem_Eavesdrop", t),
      (this.zVa = i),
      this.SetActive(SneakController_1.SneakController.IsSneaking),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SneakStart,
        this.gYe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SneakEnd,
        this.fYe,
      );
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.SneakStart,
      this.gYe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SneakEnd,
        this.fYe,
      );
  }
  OnEnd() {}
}
exports.EavesdropMark = EavesdropMark;
//# sourceMappingURL=EavesdropMark.js.map
