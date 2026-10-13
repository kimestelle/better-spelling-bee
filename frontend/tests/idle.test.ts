import test from 'node:test';
import assert from 'node:assert/strict';
import { startIdleFlapping } from '../src/game/idle';
test('one random duck flaps every 2 seconds, rests after 400ms, and timers clean up',t=>{
 t.mock.timers.enable({apis:['setInterval','setTimeout']});
 const states:(number|null)[]=[];
 let random=.1;
 const stop=startIdleFlapping(7,index=>states.push(index),()=>true,()=>random);
 t.mock.timers.tick(1999);assert.deepEqual(states,[]);
 t.mock.timers.tick(1);assert.deepEqual(states,[0]);
 t.mock.timers.tick(400);assert.deepEqual(states,[0,null]);
 random=.8;t.mock.timers.tick(1600);assert.deepEqual(states,[0,null,5]);
 stop();t.mock.timers.tick(6000);assert.deepEqual(states,[0,null,5]);
});
test('idle flap pauses during dragging without restarting its clock',t=>{
 t.mock.timers.enable({apis:['setInterval','setTimeout']});
 const states:(number|null)[]=[];let dragging=true;
 const stop=startIdleFlapping(7,index=>states.push(index),()=>!dragging,()=>.5);
 t.mock.timers.tick(2000);assert.deepEqual(states,[]);
 dragging=false;t.mock.timers.tick(2000);assert.deepEqual(states,[3]);stop();
});
