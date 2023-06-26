/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createType('sleep_event_type', ['go_to_sleep', 'wake_up', 'nap']);
  
    pgm.createTable('sleep_data', {
      id: 'id',
      event_timestamp: { type: 'timestamp', notNull: true },
      event_type: { type: 'sleep_event_type', notNull: true },
      duration: 'interval',
      notes: 'text'
    });
    
    pgm.createSequence('sleep_data_id_seq', { 
      type: 'integer', 
      increment: 1, 
      start: 1, 
      maxvalue: null, 
      minvalue: null, 
      cache: 1, 
      cycle: false
    });
    
    pgm.alterSequence('sleep_data_id_seq', {owner: 'sleep_data.id'});
    pgm.alterTable('sleep_data', {
      columns: {
        id: {
          default: pgm.func("nextval('public.sleep_data_id_seq'::regclass)")
        }
      }
    });
    
    pgm.addConstraint('sleep_data', 'sleep_data_pkey', {
      primaryKey: 'id'
    });
  }
  
  exports.down = (pgm) => {
    pgm.dropConstraint('sleep_data', 'sleep_data_pkey');
    pgm.dropTable('sleep_data');
    pgm.dropType('sleep_event_type');
    pgm.dropSequence('sleep_data_id_seq');
  }
  