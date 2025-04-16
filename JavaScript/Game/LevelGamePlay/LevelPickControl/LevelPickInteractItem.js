"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelPickInteractItem = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Vector2D_1 = require("../../../Core/Utils/Math/Vector2D"),
  Global_1 = require("../../Global");
class LevelPickInteractItem {
  constructor() {
    (this.nGa = Vector2D_1.Vector2D.Create()),
      (this.sGa = Vector2D_1.Vector2D.Create()),
      (this.OQt = void 0),
      (this.Zqe = void 0),
      (this.aGa = void 0);
  }
  get IsValid() {
    return !this.nGa.Equals(this.sGa);
  }
  Init(t, e, i = void 0) {
    this.RefreshBox(t), (this.Zqe = e), (this.aGa = i);
  }
  RefreshBox(t) {
    var e, i;
    UE.KuroLevelPlayLibrary.GetActorScreenBoundingBox(
      Global_1.Global.CharacterController,
      t,
      LevelPickInteractItem.hGa,
      LevelPickInteractItem.lGa,
    )
      ? ((e = (0, puerts_1.$unref)(LevelPickInteractItem.hGa)),
        (i = (0, puerts_1.$unref)(LevelPickInteractItem.lGa)),
        (this.nGa.X = e.X),
        (this.nGa.Y = e.Y),
        (this.sGa.X = i.X),
        (this.sGa.Y = i.Y),
        (this.OQt = t))
      : ((this.nGa.X = 0),
        (this.nGa.Y = 0),
        (this.sGa.X = 0),
        (this.sGa.Y = 0));
  }
  CheckInside(t) {
    return (
      t.X > this.nGa.X &&
      t.Y > this.nGa.Y &&
      t.X < this.sGa.X &&
      t.Y < this.sGa.Y
    );
  }
  OnPick() {
    this.OQt
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Interaction", 36, "Pick Item", [
            "actorName",
            this.OQt?.GetName(),
          ]),
        this.aGa && this.aGa(this.OQt))
      : Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Interaction",
          36,
          "[LevelPick]Owner is undefined when pick",
        );
  }
  OnClick() {
    this.OQt
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Interaction", 36, "Click Item", [
            "actorName",
            this.OQt?.GetName(),
          ]),
        this.Zqe && this.Zqe(this.OQt))
      : Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Interaction",
          36,
          "[LevelPick]Owner is undefined when click",
        );
  }
}
((exports.LevelPickInteractItem = LevelPickInteractItem).hGa = (0,
puerts_1.$ref)(void 0)),
  (LevelPickInteractItem.lGa = (0, puerts_1.$ref)(void 0));
//# sourceMappingURL=LevelPickInteractItem.js.map
