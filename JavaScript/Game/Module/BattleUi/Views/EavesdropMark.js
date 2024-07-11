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
      (this.lXe = void 0),
      (this.Cqn = void 0),
      (this.gqn = void 0),
      (this.Ken = void 0),
      (this.JZ = void 0),
      (this.fqn = void 0),
      (this.pqn = void 0),
      (this.vqn = void 0),
      (this.EPe = void 0),
      (this.Glt = Rotator_1.Rotator.Create()),
      (this.Mqn = 3),
      (this.Sqn = 3),
      (this.Eqn = (t, i) => {
        i && 0 !== this.Mqn && this.PlayChangeToNormalSeq();
      }),
      (this.yqn = (t, i) => {
        i && 0 === this.Mqn && this.PlayTakingSeq();
      }),
      (this.Iqn = (t, i) => {
        i && 3 !== this.Mqn && this.PlayEndSeq();
      }),
      (this.KIt = (t) => {
        if (t === NORMAL_END || t === TAKING_END)
          switch (
            (t === NORMAL_END
              ? this.JZ?.SetUIActive(!1)
              : t === TAKING_END && this.pqn?.SetUIActive(!1),
            this.Sqn)
          ) {
            case 1:
              this.pqn?.SetUIActive(!0), this.Tqn();
              break;
            case 2:
              this.vqn?.SetUIActive(!0), this.Lqn();
              break;
            case 0:
              this.JZ?.SetUIActive(!0), this.Dqn();
              break;
            case 3:
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RemoveEavesdropMark,
                this.Cqn,
              );
          }
        else t === TAKING_START && this.EPe?.PlaySequencePurely(TAKING_LOOP);
      }),
      GlobalData_1.GlobalData.World &&
        ((this.lXe = t),
        (this.Cqn = i),
        (t = EntitySystem_1.EntitySystem.Get(i))) &&
        ((this.gqn = t.GetComponent(185)),
        this.gqn.AddTagAddOrRemoveListener(normalTag, this.Eqn),
        this.gqn.AddTagAddOrRemoveListener(startTakingTag, this.yqn),
        this.gqn.AddTagAddOrRemoveListener(endTag, this.Iqn));
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
      (this.fqn = this.GetText(1)),
      (this.pqn = this.GetItem(2)),
      (this.vqn = this.GetItem(3)),
      (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.EPe?.BindSequenceCloseEvent(this.KIt),
      this.JZ?.SetUIActive(!0),
      this.pqn?.SetUIActive(!1),
      this.vqn?.SetUIActive(!1),
      this.EPe.PlaySequencePurely(NORMAL_START),
      (this.Mqn = 0),
      (this.Ken = this.lXe.GetComponentByClass(
        UE.SkeletalMeshComponent.StaticClass(),
      )),
      this.T_e(),
      this.Aqn(),
      this.Kwr(),
      this.RootItem.SetUIRelativeScale3D(
        Vector_1.Vector.Create(0.5, 0.5, 0.5).ToUeVector(!0),
      );
  }
  Update() {
    this.T_e(), this.Aqn(), this.Kwr();
  }
  T_e() {
    var t = CameraController_1.CameraController.CameraRotator,
      i = t.Yaw + 90,
      t = t.Pitch - 90,
      s = Rotator_1.Rotator.Create(this.RootItem.RelativeRotation);
    (Math.abs(i - this.Glt.Yaw) < UPDATE_TOLERATION &&
      Math.abs(t - this.Glt.Roll) < UPDATE_TOLERATION &&
      s.Equals(this.Glt, UPDATE_TOLERATION)) ||
      ((this.Glt.Yaw = i),
      (this.Glt.Pitch = 0),
      (this.Glt.Roll = t),
      this.RootItem?.SetUIRelativeRotation(this.Glt.ToUeRotator()));
  }
  Aqn() {
    var t =
        Global_1.Global.BaseCharacter?.CharacterActorComponent
          ?.ActorLocationProxy,
      i = this.lXe?.K2_GetActorLocation();
    if (t && i)
      return (
        (i = Vector_1.Vector.Create(i).SubtractionEqual(
          Vector_1.Vector.Create(t),
        )),
        this.fqn?.SetText(Math.round(i.Size() / 100).toString() + " 米"),
        i.Size()
      );
    this.fqn?.SetText("");
  }
  Kwr() {
    var t = this.Ken.GetSocketLocation(headName);
    (t.Z += HEAD_OFFSET), this.RootItem.SetUIRelativeLocation(t);
  }
  PlayFoundSeq() {
    2 !== this.Mqn &&
      (0 === this.Mqn
        ? (this.EPe?.PlaySequencePurely(NORMAL_END), (this.Sqn = 2))
        : 1 === this.Mqn &&
          (this.EPe?.PlaySequencePurely(TAKING_END), (this.Sqn = 2)));
  }
  Lqn() {
    this.EPe?.PlaySequencePurely(FOUND), (this.Mqn = 2), (this.Sqn = 3);
  }
  Dqn() {
    this.EPe?.PlaySequencePurely(NORMAL_START), (this.Mqn = 0), (this.Sqn = 3);
  }
  PlayEndSeq() {
    3 !== this.Mqn &&
      (1 === this.Mqn
        ? this.EPe?.PlaySequencePurely(TAKING_END)
        : 0 === this.Mqn && this.EPe?.PlaySequencePurely(NORMAL_END),
      (this.Mqn = 3));
  }
  PlayTakingSeq() {
    1 !== this.Mqn &&
      0 === this.Mqn &&
      (this.EPe?.PlaySequencePurely(NORMAL_END), (this.Sqn = 1));
  }
  PlayChangeToNormalSeq() {
    0 !== this.Mqn &&
      1 === this.Mqn &&
      (this.EPe?.PlaySequencePurely(TAKING_END), (this.Sqn = 0));
  }
  Tqn() {
    this.EPe?.PlaySequencePurely(TAKING_START), (this.Mqn = 1), (this.Sqn = 3);
  }
  Initialize(t) {
    this.CreateThenShowByResourceIdAsync("UiItem_Eavesdrop", t);
  }
  OnEnd() {}
}
exports.EavesdropMark = EavesdropMark;
//# sourceMappingURL=EavesdropMark.js.map
