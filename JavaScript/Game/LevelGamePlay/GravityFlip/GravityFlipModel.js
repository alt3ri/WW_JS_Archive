"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GravityFlipModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  UiManager_1 = require("../../Ui/UiManager");
class GravityFlipModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.GravityFlipEntity = void 0),
      (this.GravityFlipComp = void 0),
      (this.CacheCorrectDirection =
        Protocol_1.Aki.Protocol.AY_.Proto_GravityDown),
      (this.CurrentGravityDirection = 0),
      (this.ValidGravityDirections = []),
      (this.ViewCallBackCache = void 0),
      (this.zYe = () => {
        var e;
        this.GravityFlipComp?.IsInteracting &&
          ((e = { SelectCallback: this.ViewCallBackCache }),
          UiManager_1.UiManager.OpenView("GravityFlipView", e));
      });
  }
  OnInit() {
    return !0;
  }
  OnClear() {
    return !0;
  }
  InitGravityFlipParams(e) {
    (this.GravityFlipComp = e),
      (this.GravityFlipEntity = e.Entity),
      (this.ValidGravityDirections = []),
      (this.CurrentGravityDirection = e.CurGravityDirection);
    var t = e.GetGravityFlipDirection();
    if (!t || t.length <= 0)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "SceneItem",
          31,
          "[GravityFlipModel] 未找到重力方向配置",
          ["PbDataId", e.Entity.GetComponent(0)?.GetPbDataId()],
        );
    else {
      for (const r of t)
        switch (r.Type) {
          case 1:
            this.ValidGravityDirections.push(180);
            break;
          case 2:
            this.ValidGravityDirections.push(0);
            break;
          case 3:
            this.ValidGravityDirections.push(90);
            break;
          case 4:
            this.ValidGravityDirections.push(270);
        }
      this.GravityFlipComp.OnEnterInteract(),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.ChangeModeFinish,
          this.zYe,
        );
    }
  }
  NeedChangeGravity() {
    return (
      this.GravityFlipComp.CurGravityDirection !== this.CurrentGravityDirection
    );
  }
  get GravityFlipEntityCreatureDataId() {
    return this.GravityFlipEntity?.GetComponent(0)?.GetCreatureDataId() ?? -1;
  }
  xY_(e) {
    switch (e) {
      case 180:
        return Protocol_1.Aki.Protocol.AY_.Proto_GravityUp;
      case 0:
        return Protocol_1.Aki.Protocol.AY_.Proto_GravityDown;
      case 90:
        return Protocol_1.Aki.Protocol.AY_.Proto_GravityLeft;
      case 270:
        return Protocol_1.Aki.Protocol.AY_.Proto_GravityRight;
    }
    return Protocol_1.Aki.Protocol.AY_.Proto_GravityDown;
  }
  get CurGravityFlipType() {
    return this.xY_(this.CurrentGravityDirection);
  }
  get TargetDirection() {
    var e = this.GravityFlipEntity?.GetComponent(203);
    return !e || 1 !== e.GetTagCount(-1377409745)
      ? -1
      : e.HasTag(1937741205)
        ? 180
        : e.HasTag(590629922)
          ? 0
          : e.HasTag(-231334097)
            ? 90
            : e.HasTag(-584695776)
              ? 270
              : -1;
  }
}
exports.GravityFlipModel = GravityFlipModel;
//# sourceMappingURL=GravityFlipModel.js.map
