"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapExploreToolModel = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
class MapExploreToolModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.BUi = new Map()),
      (this.bUi = new Map()),
      (this.qUi = new Map()),
      (this.GUi = new Map()),
      (this.NUi = !1),
      (this.OUi = new Map()),
      (this.kUi = (e) => {
        switch (e.MarkType) {
          case 15:
            var o =
              ModelManager_1.ModelManager.MapModel?.GetMarkCountByType(
                e.MarkType,
              ) ?? 0;
            this.SetToolPlaceNum(1010, o, !0);
            break;
          case 17:
            o =
              ModelManager_1.ModelManager.MapModel?.GetMarkCountByType(
                e.MarkType,
              ) ?? 0;
            this.SetToolPlaceNum(1012, o, !0);
        }
      }),
      (this.FUi = (e, o) => {
        switch (e) {
          case 15:
            var t =
              ModelManager_1.ModelManager.MapModel?.GetMarkCountByType(e) ?? 0;
            this.SetToolPlaceNum(1010, t, !1);
            break;
          case 17:
            t =
              ModelManager_1.ModelManager.MapModel?.GetMarkCountByType(e) ?? 0;
            this.SetToolPlaceNum(1012, t, !1);
        }
      });
  }
  OnInit() {
    return (
      this.BUi.set(210015, 1010),
      this.BUi.set(210016, 1011),
      this.BUi.set(210017, 1012),
      this.bUi.set(
        1010,
        new Map([
          [
            Protocol_1.Aki.Protocol.lkn.Proto_ErrPlayerNotInBigWorld,
            "ExplorePositionError",
          ],
          [Protocol_1.Aki.Protocol.lkn.Proto_ErrInFighting, "ExploreFighting"],
          [Protocol_1.Aki.Protocol.lkn.Proto_ErrNotHostPlayer, "OnylHostUse"],
          [
            Protocol_1.Aki.Protocol.lkn.Proto_ErrConsumeNotEnough,
            "ExploreTeleporterItemLack",
          ],
        ]),
      ),
      this.bUi.set(
        1011,
        new Map([
          [
            Protocol_1.Aki.Protocol.lkn.Proto_ErrPlayerNotInBigWorld,
            "ExplorePositionError",
          ],
          [Protocol_1.Aki.Protocol.lkn.Proto_ErrInFighting, "ExploreFighting"],
          [Protocol_1.Aki.Protocol.lkn.Proto_ErrNotHostPlayer, "OnylHostUse"],
          [
            Protocol_1.Aki.Protocol.lkn.Proto_ErrNotHaveCountryAccess,
            "ExploreUnauthorized",
          ],
          [
            Protocol_1.Aki.Protocol.lkn.Proto_ErrSkillIsEffect,
            "ExploreActivating",
          ],
          [
            Protocol_1.Aki.Protocol.lkn.Proto_ErrNoSoundBox,
            "ExploreShengXiaCollectAll",
          ],
          [
            Protocol_1.Aki.Protocol.lkn.Proto_ErrConsumeNotEnough,
            "ExploreShengXiaItemLack",
          ],
        ]),
      ),
      this.bUi.set(
        1012,
        new Map([
          [
            Protocol_1.Aki.Protocol.lkn.Proto_ErrPlayerNotInBigWorld,
            "ExplorePositionError",
          ],
          [Protocol_1.Aki.Protocol.lkn.Proto_ErrInFighting, "ExploreFighting"],
          [Protocol_1.Aki.Protocol.lkn.Proto_ErrNotHostPlayer, "OnylHostUse"],
          [
            Protocol_1.Aki.Protocol.lkn.Proto_ErrNotHaveCountryAccess,
            "ExploreUnauthorized",
          ],
        ]),
      ),
      this.qUi.set(
        1011,
        new Set([
          Protocol_1.Aki.Protocol.lkn.Sys,
          Protocol_1.Aki.Protocol.lkn.Proto_ErrSkillIsEffect,
        ]),
      ),
      this.qUi.set(
        1012,
        new Set([
          Protocol_1.Aki.Protocol.lkn.Sys,
          Protocol_1.Aki.Protocol.lkn.Proto_ErrTreasureBoxAllActive,
        ]),
      ),
      this.qUi.set(1010, new Set([Protocol_1.Aki.Protocol.lkn.Sys])),
      this.GUi.set(
        1011,
        new Set([Protocol_1.Aki.Protocol.lkn.Proto_ExploreToolNotConfirm]),
      ),
      this.GUi.set(
        1012,
        new Set([
          Protocol_1.Aki.Protocol.lkn.Proto_ExploreToolNotConfirm,
          Protocol_1.Aki.Protocol.lkn.Proto_ErrTreasureBoxAllActive,
        ]),
      ),
      this.GUi.set(
        1010,
        new Set([Protocol_1.Aki.Protocol.lkn.Proto_ExploreToolNotConfirm]),
      ),
      (this.NUi = !1),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CreateMapMark,
        this.kUi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveMapMark,
        this.FUi,
      ),
      !0
    );
  }
  OnClear() {
    return (
      this.BUi.clear(),
      this.bUi.clear(),
      this.qUi.clear(),
      this.OUi.clear(),
      (this.NUi = !1),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CreateMapMark,
        this.kUi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveMapMark,
        this.FUi,
      ),
      !0
    );
  }
  OnLeaveLevel() {
    return !(this.NUi = !1);
  }
  OnChangeMode() {
    return !0;
  }
  GetPhantomSkillIdBySkillId(e) {
    return this.BUi.get(e);
  }
  GetRespTipsId(e, o) {
    return this.bUi.get(e.PhantomSkillId)?.get(o.Kms);
  }
  GetRespConfirmBoxId(e, o) {
    if (this.IsRespMeanCheckPass(e, o))
      switch (e.PhantomSkillId) {
        case 1010:
          return this.IsToolReachPlaceLimit(e.PhantomSkillId) ? 142 : 141;
        case 1011:
          return 139;
        case 1012:
          return this.IsToolReachPlaceLimit(e.PhantomSkillId) ? 140 : void 0;
      }
  }
  IsRespMeanSuccess(e, o) {
    return this.qUi.get(e.PhantomSkillId)?.has(o.Kms) ?? !1;
  }
  IsRespMeanCheckPass(e, o) {
    return this.GUi.get(e.PhantomSkillId)?.has(o.Kms) ?? !1;
  }
  SetCharExploreSkillBusy(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Phantom",
        40,
        "[MapExploreTool] 设置CharExploreSkillBusy",
        ["OldVal", this.NUi],
        ["NewVal", e],
      ),
      (this.NUi = e);
  }
  GetCharExploreSkillBusy() {
    return this.NUi ?? !1;
  }
  GetToolPlaceLimit(e) {
    switch (e) {
      case 1010:
        return ConfigManager_1.ConfigManager.RouletteConfig?.GetTempTeleporterPlaceLimit();
      case 1012:
        return ConfigManager_1.ConfigManager.RouletteConfig?.GetTreasureBoxDetectorPlaceLimit();
    }
  }
  IsToolHasPlaceLimit(e) {
    return void 0 !== this.GetToolPlaceLimit(e);
  }
  IsToolReachPlaceLimit(e) {
    const o = this.GetToolPlaceLimit(e);
    return void 0 !== o && !!((e = this.GetToolPlaceNum(e)) && o <= e);
  }
  GetToolPlaceNum(e) {
    return this.OUi.get(e);
  }
  SetToolPlaceNum(e, o, t) {
    o !== this.OUi.get(e) &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Phantom",
          40,
          "[MapExploreTool] 设置ToolPlaceNum",
          ["PhantomSkillId", e],
          ["PlaceNum", o],
        ),
      this.OUi.set(e, o),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnMapExploreToolPlaceNumUpdated,
        e,
        o,
      ));
  }
}
exports.MapExploreToolModel = MapExploreToolModel;
// # sourceMappingURL=MapExploreToolModel.js.map
