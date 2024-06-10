// Ваш файл Draggable.js

import { inject } from 'vue'; // импортируем функцию inject из Vue
import { DraggableFunctionalClass } from './DraggableClass.js';

export function getDraggable(){
    let draggable = new DraggableFunctionalClass();
    return draggable;
}

export function startDraggable(draggable, block, boxShadowMode){
    const Left_panel_width = inject('Left_panel_width').value;
    const Up_panel_height = inject('Up_panel_height').value;
    draggable.start(block, Left_panel_width, Up_panel_height, boxShadowMode);
    return draggable;
}


