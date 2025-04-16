"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LiuLiDaoLingView = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  InputEnums_1 = require("../../../Input/InputEnums"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  LiuLiDaoLingSkillItem_1 = require("./LiuLiDaoLingSkillItem");
class LiuLiDaoLingView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.det = []),
      (this.Hvc = (i) => {
        for (let e = 0; e < this.det.length; e++)
          e !== i && this.det[e].Press(!1);
      }),
      (this.bMe = (e, i) => {
        if (Info_1.Info.IsInGamepad()) {
          var t = 0 === i;
          switch (e) {
            case InputMappingsDefine_1.actionMappings.Ui方向左:
              this.det[0].Press(t);
              break;
            case InputMappingsDefine_1.actionMappings.Ui方向右:
              this.det[1].Press(t);
              break;
            case InputMappingsDefine_1.actionMappings.Ui方向上:
              this.det[2].Press(t);
              break;
            case InputMappingsDefine_1.actionMappings.Ui方向下:
              this.det[3].Press(t);
          }
        }
      }),
      (this.Etl = (e, i) => {
        2 === e && this.$vc();
      }),
      (this.Fc_ = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ChallengeAgain,
          InputMappingsDefine_1.actionMappings.重新挑战,
        );
      }),
      (this.I5t = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ChallengeAgain,
          InputMappingsDefine_1.actionMappings.玩法放弃,
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
      [7, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [5, this.Fc_],
        [6, this.I5t],
      ]);
  }
  async OnBeforeStartAsync() {
    await this.NewAllSkillItems(), this.Cet();
  }
  async NewAllSkillItems() {
    Info_1.Info.IsInTouch() || this.GetItem(0).SetUIActive(!1);
    var e = [
      this.GetItem(1).GetOwner(),
      this.GetItem(2).GetOwner(),
      this.GetItem(3).GetOwner(),
      this.GetItem(4).GetOwner(),
    ];
    await Promise.all(e.map(async (e, i) => this.fet(e, i)));
  }
  async fet(e, i) {
    var t = new LiuLiDaoLingSkillItem_1.LiuLiDaoLingSkillItem();
    return await t.CreateThenShowByActorAsync(e, i), this.det.push(t), t;
  }
  Cet() {
    this.det[0].RefreshByMoveType(
      0,
      InputEnums_1.EInputAxis.MoveRight,
      -1,
      this.Hvc,
    ),
      this.det[1].RefreshByMoveType(
        1,
        InputEnums_1.EInputAxis.MoveRight,
        1,
        this.Hvc,
      ),
      this.det[2].RefreshByMoveType(
        2,
        InputEnums_1.EInputAxis.MoveForward,
        1,
        this.Hvc,
      ),
      this.det[3].RefreshByMoveType(
        3,
        InputEnums_1.EInputAxis.MoveForward,
        -1,
        this.Hvc,
      );
  }
  OnAddEventListener() {
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindActions(
      [
        InputMappingsDefine_1.actionMappings.Ui方向上,
        InputMappingsDefine_1.actionMappings.Ui方向下,
        InputMappingsDefine_1.actionMappings.Ui方向左,
        InputMappingsDefine_1.actionMappings.Ui方向右,
      ],
      this.bMe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.InputControllerMainTypeChange,
        this.Etl,
      );
  }
  OnRemoveEventListener() {
    this.$vc(),
      ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindActions(
        [
          InputMappingsDefine_1.actionMappings.Ui方向上,
          InputMappingsDefine_1.actionMappings.Ui方向下,
          InputMappingsDefine_1.actionMappings.Ui方向左,
          InputMappingsDefine_1.actionMappings.Ui方向右,
        ],
        this.bMe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.InputControllerMainTypeChange,
        this.Etl,
      );
  }
  OnBeforeDestroy() {
    for (const e of this.det) e.Destroy();
    this.det.length = 0;
  }
  $vc() {
    for (const e of this.det) e.Press(!1);
  }
  OnTick(e) {
    for (const i of this.det) i.Tick(e);
  }
}
exports.LiuLiDaoLingView = LiuLiDaoLingView;
//# sourceMappingURL=LiuLiDaoLingView.js.map
