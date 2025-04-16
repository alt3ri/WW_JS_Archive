"use strict";
var HackManagementComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, n) {
      var o,
        r = arguments.length,
        s =
          r < 3
            ? e
            : null === n
              ? (n = Object.getOwnPropertyDescriptor(e, i))
              : n;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(t, e, i, n);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (o = t[a]) &&
            (s = (r < 3 ? o(s) : 3 < r ? o(e, i, s) : o(e, i)) || s);
      return 3 < r && s && Object.defineProperty(e, i, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HackManagementComponent = void 0);
const Time_1 = require("../../../../../Core/Common/Time"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  NUM_TAG_ID = 586736149,
  NUM_IS_EMPTY_TAG_ID = -1725495138,
  HACKING_TAG_ID = 1545618306,
  TIP_TEXT_ID = "ClientErrorCode_0_Text",
  SHOW_TIP_INTERVAL = 1e3;
let HackManagementComponent =
  (HackManagementComponent_1 = class HackManagementComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Lo = void 0),
        (this.EIe = void 0),
        (this.Lie = void 0),
        (this.U2_ = 0),
        (this.D2_ = []),
        (this.B2_ = !1),
        (this.k2_ = 0),
        (this.q2_ = (t, e) => {
          var i = Time_1.Time.Now - this.k2_;
          e &&
            this.B2_ &&
            i > SHOW_TIP_INTERVAL &&
            ((this.k2_ = Time_1.Time.Now),
            (e =
              MultiTextLang_1.configMultiTextLang.GetLocalTextNew(TIP_TEXT_ID)),
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
              9,
              void 0,
              void 0,
              [e],
            ));
        });
    }
    OnInitData(t) {
      t = t.GetParam(HackManagementComponent_1)[0];
      return (this.Lo = t), (this.U2_ = this.Lo.MaxHackingCount), !0;
    }
    OnStart() {
      if (
        ((this.EIe = this.Entity.GetComponent(0)), this.EIe?.PbHackingEntities)
      )
        for (const i of this.EIe.PbHackingEntities) {
          var t = MathUtils_1.MathUtils.LongToNumber(i),
            t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
          t && t.Entity?.Valid && this.D2_.push(t.Entity);
        }
      (this.Lie = this.Entity.GetComponent(203)), this.Lie?.AddTag(NUM_TAG_ID);
      var e = this.GetRemainingHackNumber();
      return (
        1 < e && this.Lie?.TagContainer.UpdateExactTag(1, NUM_TAG_ID, e - 1),
        this.Lie?.AddTagAddOrRemoveListener(NUM_IS_EMPTY_TAG_ID, (t, e) => {
          TimerSystem_1.TimerSystem.Delay(() => {
            this.B2_ = e;
          }, 100);
        }),
        this.Lie?.AddTagAddOrRemoveListener(HACKING_TAG_ID, this.q2_),
        !0
      );
    }
    CanHack() {
      return this.D2_.length < this.U2_;
    }
    AddHackEntity(t) {
      this.D2_.push(t),
        this.Lie?.TagContainer.UpdateExactTag(1, NUM_TAG_ID, -1);
    }
    RemoveHackEntity(t) {
      t = this.D2_.indexOf(t);
      -1 !== t &&
        (this.D2_.splice(t, 1),
        this.Lie?.TagContainer.UpdateExactTag(1, NUM_TAG_ID, 1));
    }
    GetRemainingHackNumber() {
      return Math.max(0, this.U2_ - this.D2_.length);
    }
  });
(HackManagementComponent = HackManagementComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(274)],
    HackManagementComponent,
  )),
  (exports.HackManagementComponent = HackManagementComponent);
//# sourceMappingURL=HackManagementComponent.js.map
