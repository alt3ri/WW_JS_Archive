"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckJigsawInfo = void 0);
const ICondition_1 = require("../../../UniverseEditor/Interface/ICondition");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckJigsawInfo extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e) {
    if (!e) return !1;
    const r = e;
    let a = !1;
    switch (r.JigsawCondition.Type) {
      case ICondition_1.ECheckJigsawInfoType.CheckJigsawItemPlaceIndex:
        a = this.r9s(r.JigsawCondition);
        break;
      case ICondition_1.ECheckJigsawInfoType.CheckJigsawItemMove:
        a = this.o9s(r.JigsawCondition);
    }
    return r.JigsawCondition.Compare === "Eq" ? a : !a;
  }
  r9s(e) {
    let r;
    var a = e.FoundationEntityId;
    var a =
      ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
        a,
      )?.Entity?.GetComponent(121);
    return (
      !!a &&
      ((r = e.ItemEntityId),
      !!(r =
        ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
          r,
        )?.Entity?.GetComponent(122))) &&
      !!a.GetAllItemOnBase().includes(r) &&
      ((a = a.GetPutItemIndex(r)),
      (r = e.PlaceIndex),
      a.Col === r.ColumnIndex) &&
      a.Row === r.RowIndex
    );
  }
  o9s(e) {
    var e = e.ItemEntityId;
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
    return (
      !!e?.Entity?.GetComponent(139) &&
      !!(e = e?.Entity?.GetComponent(113)) &&
      e.IsMoving
    );
  }
}
exports.LevelConditionCheckJigsawInfo = LevelConditionCheckJigsawInfo;
// # sourceMappingURL=LevelConditionsCheckJigsawInfo.js.map
