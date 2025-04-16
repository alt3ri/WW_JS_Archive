"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SubLevelModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  GlobalData_1 = require("../../GlobalData"),
  GameModePromise_1 = require("../Define/GameModePromise"),
  LoadLevelDefine_1 = require("../Define/LoadLevelDefine");
class SubLevelModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.SW_ = new Map()),
      (this.da = new Map()),
      (this.MW_ = new Map());
  }
  OnLeaveLevel() {
    var e,
      o,
      t = new Array();
    for ([e] of this.SW_) t.push(e);
    for ([o] of this.da) t.push(o);
    for (const l of t) this.RemoveSubLevel(l, !0);
    return !(t.length = 0);
  }
  GetAllPreloadSubLevels() {
    return this.SW_;
  }
  GetAllSubLevels() {
    return this.da;
  }
  GetAllUnloadSubLevels() {
    return this.MW_;
  }
  AddPreloadSubLevel(e) {
    if (this.SW_.has(e))
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "[GameModeModel.AddPreloadSubLevel] 重复添加预加载的Level，因为存在于this.PreloadLevelMap中",
          ["Path", e],
        );
    else {
      var o;
      if (!this.da.has(e))
        return (
          (o = new LoadLevelDefine_1.SubLevel(e, !1)), this.SW_.set(e, o), o
        );
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "[GameModeModel.AddPreloadSubLevel] 重复添加预加载Level，因为存在于SubLevelMap中",
          ["Path", e],
        );
    }
  }
  RemovePreloadSubLevel(e) {
    return this.SW_.delete(e);
  }
  GetPreloadSubLevel(e) {
    return this.SW_.get(e);
  }
  GetPreloadOrLoadedSubLevel(e) {
    var o = this.SW_.get(e);
    return o || this.da.get(e);
  }
  GetSubLevel(e) {
    return this.da.get(e);
  }
  AddSubLevel(e, o) {
    if (!this.da.has(e))
      return (o = new LoadLevelDefine_1.SubLevel(e, o)), this.da.set(e, o), o;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "World",
        3,
        "[GameModeModel.AddSubLevel] 重复添加子关卡。",
        ["Path", e],
      );
  }
  async RemoveSubLevel(e, o = !1) {
    let t = void 0;
    if (
      (this.da.has(e)
        ? ((t = this.da.get(e)), this.da.delete(e))
        : this.SW_.has(e) && ((t = this.SW_.get(e)), this.SW_.delete(e)),
      !t)
    )
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            3,
            "[GameModeModel.RemoveSubLevel]不存在子关卡，删除子关卡失败。",
            ["Path", e],
          ),
        !1
      );
    if (3 === t.LoadType) return !1;
    let l = 0;
    var r = FNameUtil_1.FNameUtil.GetDynamicFName(e),
      a =
        ((t.UnLoadPromise = new GameModePromise_1.GameModePromise()),
        this.MW_.size);
    let i = !1;
    var s,
      d = t.LoadType;
    return (
      o
        ? 1 === t.LoadType
          ? t.UnLoadPromise.SetResult(!0)
          : 2 === t.LoadType
            ? ((l =
                GlobalData_1.GlobalData.GameInstance.场景加载通知器.UnloadStreamLevel(
                  r,
                  !0,
                )),
              (t.UnLoadLinkId = l),
              this.AddUnloadSubLevel(e, t))
            : (t.LoadPromise.SetResult(!1), t.UnLoadPromise.SetResult(!0))
        : 1 === t.LoadType
          ? ((s = this.GetUnloadSubLevel(e)) &&
              (s.UnLoadPromise?.SetResult(!0), (i = !0)),
            this.AddUnloadSubLevel(e, t))
          : 2 === t.LoadType
            ? ((l =
                GlobalData_1.GlobalData.GameInstance.场景加载通知器.UnloadStreamLevel(
                  r,
                  !0,
                )),
              (t.UnLoadLinkId = l),
              this.AddUnloadSubLevel(e, t))
            : (t.LoadPromise.SetResult(!1), t.UnLoadPromise.SetResult(!0)),
      (t.LoadType = 3),
      t.Dispose(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "World",
          3,
          "切换子关卡:卸载子关卡。",
          ["Path", e],
          ["LinkId", l],
          ["需要释放数量(前)", a],
          ["需要释放数量(后)", this.MW_.size],
          ["loadType", d],
          ["foreceRemove", o],
          ["isInUnloadLevel", i],
        ),
      t.UnLoadPromise.Promise
    );
  }
  MovePreloadSubLevelToSubLevel(e) {
    var o = this.GetPreloadSubLevel(e);
    o && (this.RemovePreloadSubLevel(e), this.JEc(o));
  }
  JEc(e) {
    return this.da.has(e.Path)
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            3,
            "[GameModeModel.AddSubLevelInstance] 重复添加子关卡。",
            ["Path", e.Path],
          ),
        !1)
      : ((e.IsPreload = !1), this.da.set(e.Path, e), !0);
  }
  GetUnloadSubLevel(e) {
    return this.MW_.get(e);
  }
  AddUnloadSubLevel(e, o) {
    this.MW_.set(e, o);
  }
  RemoveUnloadSubLevel(e) {
    return this.MW_.delete(e);
  }
}
exports.SubLevelModel = SubLevelModel;
//# sourceMappingURL=SubLevelModel.js.map
