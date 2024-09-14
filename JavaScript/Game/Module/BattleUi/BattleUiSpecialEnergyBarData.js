"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiSpecialEnergyBarData =
    exports.SpecialEnergyBarInfo =
    exports.SpecialEnergyBarKeyInfo =
      void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  GlobalData_1 = require("../../GlobalData");
class SpecialEnergyBarKeyInfo {
  constructor() {
    (this.Action = 0), (this.ActionType = 0);
  }
}
exports.SpecialEnergyBarKeyInfo = SpecialEnergyBarKeyInfo;
class SpecialEnergyBarInfo {
  constructor() {
    (this.Id = 0),
      (this.PrefabType = 0),
      (this.SlotNum = 0),
      (this.ExtraFloatParams = []),
      (this.PrefabPath = ""),
      (this.AttributeId = 0),
      (this.MaxAttributeId = 0),
      (this.BuffId = 0n),
      (this.KeyEnableTagId = 0),
      (this.TagEnergyBarIdMap = void 0),
      (this.EffectColor = void 0),
      (this.OtherEffectColorList = []),
      (this.PointColor = void 0),
      (this.IconPath = void 0),
      (this.EnableIconPath = void 0),
      (this.FrontIconPath = void 0),
      (this.NiagaraPathList = []),
      (this.KeyEnableNiagaraIndex = 0),
      (this.KeyType = 0),
      (this.DisableKeyOnPercent = 0),
      (this.KeyInfoList = []);
  }
  Init(t, i) {
    (this.Id = t),
      (this.PrefabType = i.PrefabType),
      (this.SlotNum = i.SlotNum),
      this.C$e(i.ExtraFloatParams, this.ExtraFloatParams),
      (this.PrefabPath = i.PrefabPath.ToAssetPathName()),
      (this.AttributeId = i.AttributeId),
      (this.MaxAttributeId = i.MaxAttributeId),
      (this.BuffId = i.BuffId),
      (this.TagEnergyBarIdMap = this.g$e(i.TagEnergyBarIdMap)),
      i.EffectColor
        ? ((t = i.EffectColor.split("#")),
          (this.EffectColor = t.shift()),
          (this.OtherEffectColorList = t))
        : (this.EffectColor = void 0),
      (this.PointColor = StringUtils_1.StringUtils.IsEmpty(i.PointColor)
        ? void 0
        : i.PointColor),
      (this.IconPath = i.IconPath.ToAssetPathName()),
      (this.EnableIconPath = i.EnableIconPath.ToAssetPathName()),
      (this.FrontIconPath = i.FrontIconPath.ToAssetPathName()),
      this.ANn(i.NiagaraList, this.NiagaraPathList),
      (this.KeyEnableNiagaraIndex = i.KeyEnableNiagaraIndex),
      this.KeyEnableNiagaraIndex >= this.NiagaraPathList.length &&
        ((this.KeyEnableNiagaraIndex = -1), Log_1.Log.CheckError()) &&
        Log_1.Log.Error(
          "Battle",
          18,
          "能量条配置错误, 可用时粒子特效索引超出粒子数组长度",
          ["", i.Name],
          ["索引", this.KeyEnableNiagaraIndex],
          ["数组长度", this.NiagaraPathList.length],
        ),
      (this.KeyType = i.KeyType),
      (this.DisableKeyOnPercent = i.DisableKeyOnPercent / 100),
      i.KeyEnableTag && i.KeyEnableTag?.TagName !== StringUtils_1.NONE_STRING
        ? (this.KeyEnableTagId = i.KeyEnableTag.TagId)
        : (this.KeyEnableTagId = 0),
      this.f$e(i.KeyInfoList);
  }
  f$e(i) {
    if (2 === Info_1.Info.OperationType) {
      var s = i.Num();
      for (let t = 0; t < s; t++) {
        var e = i.Get(t),
          r = new SpecialEnergyBarKeyInfo();
        (r.Action = e.Action),
          (r.ActionType = e.ActionType),
          this.KeyInfoList.push(r);
      }
    }
  }
  g$e(i) {
    var s = new Map(),
      e = i.Num();
    if (!(e <= 0))
      for (let t = 0; t < e; t++) {
        var r = i.GetKey(t),
          a = i.Get(r);
        s.set(r.TagId, a);
      }
    return s;
  }
  C$e(i, s) {
    var e = i.Num();
    if (!(e <= 0))
      for (let t = 0; t < e; t++) {
        var r = i.Get(t);
        s.push(r);
      }
  }
  ANn(i, s) {
    var e = i.Num();
    if (!(e <= 0))
      for (let t = 0; t < e; t++) {
        var r = i.Get(t);
        s.push(r.ToAssetPathName());
      }
  }
}
exports.SpecialEnergyBarInfo = SpecialEnergyBarInfo;
class BattleUiSpecialEnergyBarData {
  constructor() {
    (this.IsOpenLog = !1),
      (this.IsSpecialEnergyBarEditorModeOpen = !1),
      (this.p$e = void 0),
      (this.EnvironmentPropertyList = []),
      (this.SpecialEnergyBarInfoMap = new Map()),
      (this.gU = !1),
      (this.v$e = !1);
  }
  Init() {}
  async Preload() {
    this.v$e = !0;
    const i = new CustomPromise_1.CustomPromise();
    var t = CommonParamById_1.configCommonParamById.GetStringConfig(
      "SpecialEnergyBarInfoPath",
    );
    return (
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.DataTable, (t) => {
        this.v$e && (this.p$e = t) && ((this.gU = !0), i.SetResult(!0));
      }),
      i.Promise
    );
  }
  OnLeaveLevel() {
    (this.gU = !1),
      (this.v$e = !1),
      (this.p$e = void 0),
      (this.EnvironmentPropertyList.length = 0),
      this.SpecialEnergyBarInfoMap.clear();
  }
  Clear() {}
  GetSpecialEnergyBarInfo(i) {
    if (this.gU) {
      let t = this.SpecialEnergyBarInfoMap.get(i);
      var s;
      return (
        t ||
          ((s = DataTableUtil_1.DataTableUtil.GetDataTableRow(
            this.p$e,
            i.toString(),
          )),
          (t = new SpecialEnergyBarInfo()).Init(i, s),
          GlobalData_1.GlobalData.IsPlayInEditor) ||
          this.SpecialEnergyBarInfoMap.set(i, t),
        t
      );
    }
  }
}
exports.BattleUiSpecialEnergyBarData = BattleUiSpecialEnergyBarData;
//# sourceMappingURL=BattleUiSpecialEnergyBarData.js.map
