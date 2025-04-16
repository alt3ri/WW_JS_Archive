"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, o, t, n) {
    var r,
      i = arguments.length,
      l =
        i < 3
          ? o
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(o, t))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      l = Reflect.decorate(e, o, t, n);
    else
      for (var p = e.length - 1; 0 <= p; p--)
        (r = e[p]) && (l = (i < 3 ? r(l) : 3 < i ? r(o, t, l) : r(o, t)) || l);
    return 3 < i && l && Object.defineProperty(o, t, l), l;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingBoatInputComponent = void 0);
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ConfirmBoxDefine_1 = require("../../../Module/ConfirmBox/ConfirmBoxDefine"),
  PhotographController_1 = require("../../../Module/Photograph/PhotographController"),
  GongduolaInputComponent_1 = require("../Gongduola/GongduolaInputComponent");
let FishingBoatInputComponent = class FishingBoatInputComponent extends GongduolaInputComponent_1.GongduolaInputComponent {
  ExecuteSprint(e) {}
  ExecuteSkill(e) {
    this.WZo(e.IntValue);
  }
  WZo(e) {
    210012 === e
      ? PhotographController_1.PhotographController.PhotographFastScreenShot()
      : this.Entity.GetComponent(38).BeginSkill(e, {
          Reason: "FishingBoatInputComponent.ExecuteSkill",
        });
  }
  ExecuteSkillWithConfirmBox(e, o, t) {
    o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(o);
    0 < t && o.ItemIdMap.set(t, 1),
      o.FunctionMap.set(2, () => {
        this.WZo(e);
      }),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        o,
      );
  }
};
(FishingBoatInputComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(244)],
  FishingBoatInputComponent,
)),
  (exports.FishingBoatInputComponent = FishingBoatInputComponent);
//# sourceMappingURL=FishingBoatInputComponent.js.map
