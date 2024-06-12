
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.MonsterNearbySensory=void 0;const BaseSensoryInfo_1=require("./BaseSensoryInfo");class MonsterNearbySensory extends BaseSensoryInfo_1.BaseSensoryInfo{constructor(){super(...arguments),this.SensoryInfoType=1,this.CacheEntityList=[],this.LastFindEntities=new Set,this.OnEnterSensoryRange=void 0,this.OnExitSensoryRange=void 0}OnInit(...s){this.SensoryRange=s[0]}OnTick(s){}OnClear(){this.LastFindEntities.clear(),this.CacheEntityList.length=0,this.OnEnterSensoryRange=void 0,this.OnExitSensoryRange=void 0}ClearCacheList(){this.CacheEntityList.length=0}CheckEntity(s){s=s.GetComponent(0);return!!s&&s.IsMonster()&&MonsterNearbySensory.irr.has(s.GetEntityCamp())}EnterRange(s){this.InRange=!0,!this.LastFindEntities.has(s.Id)&&1&this.SensoryInfoType&&!this.OnEnterSensoryRange(s)||(this.CacheEntityList.push(s.Id),this.LastFindEntities.delete(s.Id))}ExitRange(){if(this.InRange=0!==this.CacheEntityList.length,1&this.SensoryInfoType)for(const s of this.LastFindEntities)this.OnExitSensoryRange(s);this.LastFindEntities.clear();for(const t of this.CacheEntityList)this.LastFindEntities.add(t)}}(exports.MonsterNearbySensory=MonsterNearbySensory).irr=new Set([1,3,7]);
//# sourceMappingURL=MonsterNearbySensory.js.map