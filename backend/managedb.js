




const influx = require('influx');

var gDBName = "dosisRev1";


const dosisInflux = new influx.InfluxDB({
    hosts: [
      {
        host: 'localhost',
        protocol: 'http',
        options: {
           rejectUnauthorized: false
        }}
    ],
    database: gDBName,
    schema: [
        {
            measurement: 'sensorData',
            fields: {
                reaction : influx.FieldType.STRING,
                module : influx.FieldType.STRING,
                OD: influx.FieldType.FLOAT,
                Temp: influx.FieldType.FLOAT,
                ts: influx.FieldType.INTEGER
            },
            tags:  ['reaction', 'module']
        },
        {
            measurement: 'stateLog',
            fields: {
                reaction : influx.FieldType.STRING,
                module : influx.FieldType.STRING,
                state: influx.FieldType.BOOLEAN,
                swtch : influx.FieldType.STRING,
                level : influx.FieldType.INTEGER,
                limitLow : influx.FieldType.INTEGER,
                limitHi : influx.FieldType.INTEGER,
                ts: influx.FieldType.INTEGER
            },
            tags: ['reaction', 'module']
        }]
});








var command = process.argv[2]
if ( command == 'dropdb' ) {
    //
    dosisInflux.dropDatabase(gDBName)  // drop DB
    //
} else {
    //
    dosisInflux.getDatabaseNames().then(names => {
                                       console.log('My database names are: ' + names.join(', '))
                                       if ( gDBName in names ) {
                                           // beaconstats available
                                       } else {
                                           dosisInflux.createDatabase(gDBName).then(
                                                        param => console.log(param)
                                               )
                                       }
                                   });
}



