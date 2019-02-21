

function modNameIntIndex(mid) {
    return(parseInt(mid.match(/(\d+)$/)[0], 10));
}


module.exports = class UserReactionsAssets {
            //
    constructor(uid,modMap) {

        this.allModulesActive = {}
        this.allModulesNames = []
        this.moduleSelector = 1;
        this.userId = uid;

        this.reactions = {}

        this._needsUpdate = { "reactions" : true, "measurements" : true, "log" : true }

        this.initializeActiveModules(modMap);

        this.edited = false;
    }

    //

    initializeActiveModules(modMap) {
        if ( modMap === undefined ) {
            this.allModulesActive = {
                'module1' : {},
                'module2' : {},
                'module3' : {},
                'module4' : {},
                'module5' : {}
            }
        } else {
            this.allModulesActive = modMap;
            this.allModulesNames = Object.keys(this.allModulesActive)
        }
    }


    selectModule(modname) {
        //
        console.log(modname)
        //
        if ( this.allModulesActive[modname] == undefined ) {
            return;
        }
        //
        var midI = this.moduleSelector;
        if ( this.allModulesActive[midI] !== undefined ) {
            this.allModulesActive[midI].mod_active = false;
        }
        //
        this.allModulesActive[modname].mod_active = true;
        this.moduleSelector = modname  // modNameIntIndex(modname);
    }

    //

    genModuleList() {
        // this will change into a selection of module assignments meant for different users.
        var moduleList = [];
        //
        this.moduleSelector = this.allModulesNames[0]
        //
        for ( var i = 0; i < 5; i++ ) {
            //
            var mname = this.allModulesNames[i]
            //
            var idx = i + 1;
            var active = ( mname == this.moduleSelector ) ? true : false;
            var modName = mname;
            //
            var mm = this.allModulesActive[modName];
            if ( mm == undefined ) {
                continue;
            }

            if ( mm.mod_name === undefined ) {
                var modTitle = modName.replace('_',' ')
                mm = {
                    "mod_name" : modName,
                    "mod_active" : active,
                    "title" : modTitle,
                    "reactions" : [],
                    "reaction-id" : 0,
                    "moduleState" : {
                        "SensorOnOff": false,
                        "Air": false,
                        "Lamp": false,
                        "Heater": false,
                        "water": false,
                        "inoculum": false,
                        "mixer": false,
                        "extraction": false,
                        "forward" : false,
                        "backwards" : false
                    },
                    "parameters" : {
                        "SensorOnOff" : { "ctrlValue" : 5 },
                        "Air" : { "start" : 0, "stop" : 0 },
                        "Lamp" : { "start" : 0, "stop" : 0, "level" : 0 },
                        "Heater" : { "start" : 0, "stop" : 0, "level" : 0 },
                        "water" : { "material-rate" : 0, "material-amount" : 0, "level" : 0 },
                        "inoculum" : { "material-rate" : 0, "material-amount" : 0, "level" : 0 },
                        "mixer" : { "material-rate" : 0, "material-amount" : 0, "level" : 0 },
                        "extraction" : { "material-rate" : 0, "material-amount" : 0, "level" : 0 },
                        "forward" : { "level" : 0 },
                        "backwards" : { "level" : 0 },
                    },
                    "limits" : {
                        "Heater" : {
                            "HIGH" : false,
                            "LOW"  : true,
                            "Sensor" : "temperature",
                            "HIGH-value" : 100,
                            "LOW-value"  : 0,
                            "active" : false
                        }
                    }

                };
                this.allModulesActive[modName] = mm;
            }
            //
            moduleList.push(mm);
        }
        //
        return(moduleList)
    }

    getModule(mid) {
        var mod = this.allModulesActive[mid];
        return(mod);
    }

    needsUpdate(dataSetId) {
        return( this._needsUpdate[dataSetId] || this.edited );
    }

    setEdited(state) {
        this.edited = state;
    }

    setUpdated(dataSetId) {
        this._needsUpdate[dataSetId] = false;
    }

    updateReaction(reactObj,fields) {
        //
        var usersReaction = this.reactions[reactObj.id];
        var module = this.allModulesActive[reactObj.module];
        //
        if ( module ) {
            //
            if ( usersReaction == undefined ) {
                usersReaction = {};
                this.reactions[reactObj.id] = usersReaction;
                module.reactions.push(usersReaction);
            }
            //
            fields.forEach(field => {
                               usersReaction[field] = reactObj[field];
                           })
        }
        //
    }


    deleteReaction(reactionId) {
        delete this.reactions[reactionId];
        delete gReactionsToUser[reactionId]

        for ( var mm in this.allModulesActive ) {
            var modObj = this.allModulesActive[mm];
            var newReactions = modObj.reactions.filter(robj => {
                                                           // -- -- -- -- -- --
                                                           return ( robj.id != reactionId)
                                                       });
            modObj.reactions = newReactions;
        }
    }

    activeReactions() {
        var allActiveReactions = {}
        for ( var rkey in this.reactions ) {
            var react = this.reactions[rkey]
            if ( react.active ) {
                var module = this.allModulesActive[react.module];
                allActiveReactions[rkey] = { "state" : module.moduleState, "levels" :  module.parameters, "limits" : module.limits }
            }
        }
        return(allActiveReactions);
    }

    //
    setReactionActivity(id,isActive) {
        var usersReaction = this.reactions[id]
        usersReaction.active = isActive;
    }

}

