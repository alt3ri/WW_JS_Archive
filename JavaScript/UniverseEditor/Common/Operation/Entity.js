"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.foldAllComponents =
    exports.checkIsAllComponentsFolded =
    exports.getEntityAoiDistZ =
    exports.getEntityAoiDistZByBaseInfo =
    exports.checkPosInEntityAoi =
    exports.getEntityAoiDistXy =
    exports.getEntityAoiDistXyByBaseInfo =
    exports.AOI_METRIC_SCALE =
    exports.getLevelIdAndEntityIdByJsonPath =
    exports.getLevelIdByEntityUid =
    exports.getIdByEntityUid =
    exports.decompressEntityData =
    exports.compressEntityData =
    exports.formatEntityData =
    exports.getEntityDesc =
    exports.getEntityMainType =
    exports.loadEntityTemplateConfig =
    exports.isEntityTypeContainsComponent =
    exports.entityComponentMap =
    exports.getComponentsTypeByEntityType =
    exports.entityConfig =
      void 0);
const IComponent_1 = require("../../Interface/IComponent"),
  IEntity_1 = require("../../Interface/IEntity"),
  IGlobal_1 = require("../../Interface/IGlobal"),
  Init_1 = require("../../Interface/Init"),
  IUtil_1 = require("../../Interface/IUtil"),
  File_1 = require("../Misc/File"),
  Util_1 = require("../Misc/Util"),
  SegmentIdGenerator_1 = require("./SegmentIdGenerator");
function getComponentsTypeByEntityType(t) {
  return exports.entityConfig.ComponentsByEntity[t] || [];
}
function createEntityComponentMap() {
  const e = new Map();
  return (
    ((0, Init_1.isUe5)()
      ? IEntity_1.entityTypesUe5
      : IEntity_1.entityTypesAki
    ).forEach((t) => {
      e.set(t, new Set(exports.entityConfig.ComponentsByEntity[t]));
    }),
    e
  );
}
function isEntityTypeContainsComponent(t, e) {
  return !!exports.entityComponentMap.get(t)?.has(e);
}
function loadEntityTemplateConfig() {
  var t = (0, File_1.getProjectPath)(IGlobal_1.globalConfig.TemplateConfigPath);
  return (0, Util_1.readJsonObj)(t);
}
function getEntityMainType(t) {
  return (0, IComponent_1.getComponent)(t.ComponentsData, "BaseInfoComponent")
    ?.Category.MainType;
}
function getEntityDesc(t) {
  return (
    `${t.Name}-${t.Id} ` + (0, SegmentIdGenerator_1.getCreaterDescById)(t.Id)
  );
}
function formatEntityData(t) {
  return {
    ObjType: t.ObjType,
    EdPlannedBranch: t.EdPlannedBranch,
    BlueprintType: t.BlueprintType,
    Name: t.Name,
    Id: t.Id,
    InSleep: t.InSleep,
    IsHidden: t.IsHidden,
    IsClientHidden: t.IsClientHidden,
    IsAlwaysLoad: t.IsAlwaysLoad,
    Transform: t.Transform,
    EdWpPath: t.EdWpPath,
    ComponentsData: t.ComponentsData,
    EdEntityTip: t.EdEntityTip,
    Children: t.Children,
    Reference: t.Reference,
  };
}
function compressEntityData(t, e) {
  return void 0 === e
    ? t
    : ((e = (0, IUtil_1.createDiff)(
        t.ComponentsData,
        e.ComponentsData,
        IUtil_1.entityDataIgnoreFunc,
      )),
      formatEntityData({
        ObjType: t.ObjType,
        EdPlannedBranch: t.EdPlannedBranch,
        BlueprintType: t.BlueprintType,
        Name: t.Name,
        Id: t.Id,
        InSleep: t.InSleep,
        IsHidden: t.IsHidden,
        IsClientHidden: t.IsClientHidden,
        IsAlwaysLoad: t.IsAlwaysLoad,
        Transform: t.Transform,
        EdWpPath: t.EdWpPath,
        ComponentsData: e,
        EdEntityTip: t.EdEntityTip,
        Children: t.Children,
        Reference: t.Reference,
      }));
}
function decompressEntityData(t, e) {
  return void 0 === e
    ? t
    : ((e = (0, IUtil_1.applyDiff)(
        t.ComponentsData,
        e.ComponentsData,
        IUtil_1.entityDataIgnoreFunc,
      )),
      formatEntityData({
        ObjType: t.ObjType,
        EdPlannedBranch: t.EdPlannedBranch,
        BlueprintType: t.BlueprintType,
        Name: t.Name,
        Id: t.Id,
        InSleep: t.InSleep,
        IsHidden: t.IsHidden,
        IsClientHidden: t.IsClientHidden,
        IsAlwaysLoad: t.IsAlwaysLoad,
        Transform: t.Transform,
        EdWpPath: t.EdWpPath,
        ComponentsData: e,
        EdEntityTip: t.EdEntityTip,
        Children: t.Children,
        Reference: t.Reference,
        AreaId: t.AreaId,
      }));
}
(exports.entityConfig = {
  ComponentsByEntity: (0, Init_1.isUe5)()
    ? IEntity_1.componentsByEntityUe5
    : IEntity_1.componentsByEntityAki,
}),
  (exports.getComponentsTypeByEntityType = getComponentsTypeByEntityType),
  (exports.entityComponentMap = createEntityComponentMap()),
  (exports.isEntityTypeContainsComponent = isEntityTypeContainsComponent),
  (exports.loadEntityTemplateConfig = loadEntityTemplateConfig),
  (exports.getEntityMainType = getEntityMainType),
  (exports.getEntityDesc = getEntityDesc),
  (exports.formatEntityData = formatEntityData),
  (exports.compressEntityData = compressEntityData),
  (exports.decompressEntityData = decompressEntityData);
const entityIdByUid = new Map();
function getIdByEntityUid(t) {
  var e;
  return entityIdByUid.has(t)
    ? entityIdByUid.get(t)
    : ((e = t.split("_")), (e = parseInt(e[2])), entityIdByUid.set(t, e), e);
}
exports.getIdByEntityUid = getIdByEntityUid;
const levelIdByUid = new Map();
function getLevelIdByEntityUid(t) {
  var e;
  return levelIdByUid.has(t)
    ? levelIdByUid.get(t)
    : ((e = t.split("_")), (e = parseInt(e[1])), levelIdByUid.set(t, e), e);
}
function getLevelIdAndEntityIdByJsonPath(t) {
  (t = t.replace(/\\/g, "/")),
    (t = /\S+\/(?<LevelId>\d+)\/\S+\/(?<EntityId>\d+)_\S+.json/.exec(t));
  return t && t.groups
    ? [
        (0, Util_1.parseIntSafe)(t.groups.LevelId),
        (0, Util_1.parseIntSafe)(t.groups.EntityId),
      ]
    : [-1, -1];
}
function getEntityAoiDistXyByBaseInfo(t) {
  let e = t?.AoiLayer ?? 0;
  return (
    4 === e && (e = 0),
    IComponent_1.aoiXyLayerValues[e] / exports.AOI_METRIC_SCALE
  );
}
function getEntityAoiDistXy(t) {
  return getEntityAoiDistXyByBaseInfo(
    (0, IComponent_1.getComponent)(t.ComponentsData, "BaseInfoComponent"),
  );
}
function checkPosInEntityAoi(t, e) {
  var n = (0, IComponent_1.getComponent)(e.ComponentsData, "BaseInfoComponent");
  if (!n) return !1;
  var o = n.AoiLayer ?? 0,
    o = IComponent_1.aoiXyLayerValues[o],
    i = n.AoiZRadius ?? 0;
  let r = IComponent_1.aoizLayerValues[i],
    s = r;
  n.CustomAoiZRadius &&
    ((r = n.CustomAoiZRadius.Up ?? 0), (s = n.CustomAoiZRadius.Down ?? 0));
  var i = e.Transform.Pos.X ?? 0,
    n = e.Transform.Pos.Y ?? 0,
    e = e.Transform.Pos.Z ?? 0,
    p = t.Pos.X ?? 0,
    a = t.Pos.Y ?? 0,
    t = t.Pos.Z ?? 0,
    i = Math.sqrt(Math.pow(i - p, 2) + Math.pow(n - a, 2)),
    p = Math.abs(e - t),
    n = !(-1 !== r) || (e <= t && p <= r) || (t < e && p <= s);
  return i <= o && n;
}
function getEntityAoiDistZByBaseInfo(t) {
  var e, n;
  return t
    ? t.CustomAoiZRadius
      ? [
          t.CustomAoiZRadius.Up
            ? t.CustomAoiZRadius.Up / exports.AOI_METRIC_SCALE
            : -1,
          t.CustomAoiZRadius.Down
            ? t.CustomAoiZRadius.Down / exports.AOI_METRIC_SCALE
            : -1,
        ]
      : 0 !== (e = t?.AoiZRadius || 0)
        ? [(n = IComponent_1.aoizLayerValues[e] / exports.AOI_METRIC_SCALE), n]
        : 0 === e
          ? [(n = getEntityAoiDistXyByBaseInfo(t)), n / 2]
          : [0, 0]
    : [0, 0];
}
function getEntityAoiDistZ(t) {
  var e = (0, IComponent_1.getComponent)(t.ComponentsData, "BaseInfoComponent");
  return void 0 === t.EdWpPath ? [-1, -1] : getEntityAoiDistZByBaseInfo(e);
}
function checkIsAllComponentsFolded(t, e, n) {
  let o = !1;
  for (const r of e) {
    var i = t.ComponentsData[r];
    if (i && (!n || !i.EdIsLocked)) {
      i = i._folded;
      if (void 0 !== i) {
        if (!i) {
          o = !1;
          break;
        }
        o = !0;
      }
    }
  }
  return o;
}
function foldAllComponents(t, e, n) {
  const o = t.ComponentsData;
  return (
    e.forEach((t) => {
      t = o[t];
      t && (t._folded = n);
    }),
    o
  );
}
(exports.getLevelIdByEntityUid = getLevelIdByEntityUid),
  (exports.getLevelIdAndEntityIdByJsonPath = getLevelIdAndEntityIdByJsonPath),
  (exports.AOI_METRIC_SCALE = 100),
  (exports.getEntityAoiDistXyByBaseInfo = getEntityAoiDistXyByBaseInfo),
  (exports.getEntityAoiDistXy = getEntityAoiDistXy),
  (exports.checkPosInEntityAoi = checkPosInEntityAoi),
  (exports.getEntityAoiDistZByBaseInfo = getEntityAoiDistZByBaseInfo),
  (exports.getEntityAoiDistZ = getEntityAoiDistZ),
  (exports.checkIsAllComponentsFolded = checkIsAllComponentsFolded),
  (exports.foldAllComponents = foldAllComponents);
//# sourceMappingURL=Entity.js.map
