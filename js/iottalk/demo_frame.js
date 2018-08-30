﻿/*
 * Source code from IoTtalk (https://farm.iottalk.tw/)
 * Modified by Li-Xian Chen (b0543017@ems.niu.edu.tw)
 */
$(function(){
    var ENDPOINT = 'http://125.227.141.116:9999';
    var device_id = 'static_tano_demo_control';

    dfs = {
        'idf_list':["sprinkling", "lamp", "drip"],
        'odf_list':["chartAltitude", "chartAtmosphericPressur", "chartHumidity", "chartLightSensor", "chartMoisture", "chartTemperatures"],			
    }

    var profile = {
        'dm_name': 'Tano_Demo_Control',
        'd_name': device_id,
        'df_list': dfs['idf_list'].concat(dfs['odf_list']),
        'is_sim':false,
    }; 

    function check_registerion_state(mac_addr){
        csmapi.pull(mac_addr, 'profile', state_check);
    }

    function state_check(data, exception=null){
        if (exception){
            if (String(exception.responseText).indexOf('mac_addr not found') != -1){
                console.log('Device is not existed. Try to register.');
                console.log('device_id =', device_id);
                csmapi.register(device_id, profile, regisration_state);
            }
            else{
                console.log('Error occurred!');
                console.log('Response:', exception.responseText);
                console.log('Status:', exception.statusText);
                console.log('Endpoint =', _ENDPOINT);
            }
        }
        else{
            console.log('Device is existed. Continue.');
            if (profile['df_list'].length > data['df_list'].length){
                console.log('Required number of Switches larger than that in the server. Re-register.');
                csmapi.register(device_id, profile, regisration_state);
            }
        }
    }

    function regisration_state(state){
        if (state)  console.log('Register successfully.');
        else console.log('Register failed.');
    }

    function load_switch_state(mac_addr){
        for(var i = 0; i < dfs["idf_list"].length; i++) {
            csmapi.pull(mac_addr, dfs["idf_list"][i], update_switch_state);
        }
    }

    function update_switch_state(data, exception, df_name){
        if(data.length <= 0) {
            $("#"+df_name).prop("checked", false);
        } else {
            var val = data[0][1][0];
            $("#"+df_name).prop("checked", (val > 0));
        }
    }

    function routinePull() {
        for(var i = 0; i < dfs["odf_list"].length; i++) {
            csmapi.pull(device_id, dfs["odf_list"][i], function(arr, exception, df_name){
                if(!exception) {
                    var evt = $.Event('iotTalkUpdate');
                    evt.df_name = df_name;
                    evt.dataArr = arr;
                    $(window).trigger(evt);
                }
            });
        }
    }

    csmapi.set_endpoint(ENDPOINT);
    check_registerion_state(device_id);
    load_switch_state(device_id);
    setInterval(routinePull, 1000);
});

$(function () {
    console.log('IoT Talk JS has been successfully loaded.');
});