"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SeamlessTravelModel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase");
class SeamlessTravelModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.svo = !1),
      (this.avo = !1),
      (this.hvo = void 0),
      (this.lvo = void 0),
      (this._vo = void 0),
      (this.uvo = void 0),
      (this.cvo = []),
      (this.mvo = 0),
      (this.dvo = void 0);
  }
  get IsSeamlessTravel() {
    return this.svo;
  }
  set IsSeamlessTravel(e) {
    this.avo &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error("SeamlessTravel", 30, "无缝加载中，禁止修改是否无缝加载"),
      (this.svo = e);
  }
  get InSeamlessTraveling() {
    return this.avo;
  }
  set InSeamlessTraveling(e) {
    this.avo = e;
  }
  get SeamlessTravelController() {
    return this.hvo;
  }
  set SeamlessTravelController(e) {
    this.hvo = e;
  }
  get SeamlessTravelPlayer() {
    return this.lvo;
  }
  set SeamlessTravelPlayer(e) {
    this.lvo = e;
  }
  get SeamlessTravelCamera() {
    return this._vo;
  }
  set SeamlessTravelCamera(e) {
    this._vo = e;
  }
  get SeamlessTravelPlayerEntity() {
    return this.uvo;
  }
  set SeamlessTravelPlayerEntity(e) {
    this.uvo = e;
  }
  get SeamlessTravelEffectHandle() {
    return this.mvo;
  }
  set SeamlessTravelEffectHandle(e) {
    this.mvo = e;
  }
  get SeamlessTravelEffectPromise() {
    return this.dvo;
  }
  set SeamlessTravelEffectPromise(e) {
    this.dvo = e;
  }
  OnClear() {
    return this.ClearSeamlessTravelActor(), !0;
  }
  AddSeamlessTravelActor(e) {
    return e?.IsValid()
      ? (this.cvo.push(e),
        UE.KuroStaticLibrary.SetActorPermanent(e, !0, !1),
        !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SeamlessTravel",
            30,
            "[AddSeamlessTravelActor] Actor Invalid",
          ),
        !1);
  }
  RemoveSeamlessTravelActor(e) {
    var s;
    return e?.IsValid()
      ? (0 <= (s = this.cvo.indexOf(e)) && this.cvo.splice(s, 1),
        UE.KuroStaticLibrary.SetActorPermanent(e, !1, !1),
        !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SeamlessTravel",
            30,
            "[RemoveSeamlessTravelActor] Actor Invalid",
          ),
        !1);
  }
  IsSeamlessTravelActor(e) {
    return e?.IsValid()
      ? 0 <= this.cvo.indexOf(e)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SeamlessTravel",
            30,
            "[IsSeamlessTravelActor] Actor Invalid",
          ),
        !1);
  }
  ClearSeamlessTravelActor() {
    for (const e of this.cvo)
      e?.IsValid() && UE.KuroStaticLibrary.SetActorPermanent(e, !1, !1);
    this.cvo.length = 0;
  }
}
exports.SeamlessTravelModel = SeamlessTravelModel;
//# sourceMappingURL=SeamlessTravelModel.js.map
