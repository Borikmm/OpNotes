import { ref, reactive, computed } from 'vue';
import { Service } from '../MainServices/Service';

const BLOCK_STYLE_VALUES = {
  blockIsDragingColor: "#D33131",
  blockIsMouseEnterColor: "#cb31ff",
  blockSelectedColor: "green"
};

export class DraggableFunctionalClass {

  constructor (){
    this.DraggingLogic = new DraggingLogic();
    this.blockStyle = this.DraggingLogic.blockStyle;
  }

  start(block, left, right, boxShadowMode) {

    this.DraggingLogic.setter_logic(block, left, right, boxShadowMode);

  }

  stopDragging()
  {
    this.DraggingLogic.stopDragging();
  }
}


class DraggingLogic
{
  constructor(){
    this.DataService = new Service().DataService;
    this.position = reactive({ x: 200, y: 200 });
    this.offset = reactive({ x: 0, y: 0 });
    this.boxShadow = ref('none');
    this.isDragging = ref(false);
    this.blockStyle = computed(() => ({
      transform: `translate(${this.position.x}px, ${this.position.y}px)`,
      boxShadow: this.boxShadow.value,
      transition: this.isDragging.value ? 'transform 0.1s' : 'box-shadow 0.6s ease-in-out',
    }));

    this.animationFrame;
    this.boxShadowMode = false;
  }

  setter_logic(block, left, right, boxShadowMode)
  {

    this.block = block;
    this.Left_panel_width = left;
    this.Up_panel_height = right;

    this.block.addEventListener('pointerdown', this.startDragging.bind(this));
    this.block.addEventListener('dblclick', this.onDblClick.bind(this));

    if (boxShadowMode)
    {
      this.block.addEventListener('mouseenter', this.onMouseEnter.bind(this));
      this.block.addEventListener('mouseleave', this.onMouseLeave.bind(this));
      this.block.addEventListener('mousemove', this.onMouseMove.bind(this));
      this.boxShadowMode = true;
    }
  }

  onDblClick(event){
    // Off click on mainSpaceDiv
    if (!event) var event = window.event;
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();


    if (this.checkIsHaveSelectedBlock()) return;
    this.changeSelectedBlock(this); // Select this block with script


  };

  // boxShadow when Enter Mouse
  onMouseEnter(){
    if (this.checkIsHaveSelectedBlock()) return; // Select this block if dont have selected block
    if (this.DataService.selected_block.value["block_dragging"] != 0) return;


    this.changeBoxShadow(`0 5px 25px ${BLOCK_STYLE_VALUES.blockIsMouseEnterColor}`);
  
  };

  onMouseLeave(){
    if (this.checkIsHaveSelectedBlock()) return;
      
    this.checkBoxShadow()
  };

  onMouseMove(){
    if (this.checkIsHaveSelectedBlock()) return;
    if (this.DataService.selected_block.value["block_dragging"] != 0) return;
    
    if (this.isDragging.value)
      {
        this.changeBoxShadow(`0 5px 25px ${BLOCK_STYLE_VALUES.blockIsDragingColor}`);
      }
      else
      {
        this.changeBoxShadow(`0 5px 25px ${BLOCK_STYLE_VALUES.blockIsMouseEnterColor}`);
      }
};

  checkBoxShadow(){
    if (this.isDragging.value) return;
    
    this.changeBoxShadow('none');
    
  };


  changeBoxShadow(newBoxShadow) {
    try
    {
      this.boxShadow.value = newBoxShadow;
    }
    catch 
    {
      this.boxShadow = newBoxShadow;
    }
  }
  //

  startDragging(event) {
    if (this.checkIsHaveSelectedBlock()) return;



    this.changeDraggingBlock(this); // Select this block with script
    this.change_selected_block_z_index()

    let blockRect = event.currentTarget.getBoundingClientRect();
    this.offset.x = event.clientX - blockRect.left;
    this.offset.y = event.clientY - blockRect.top;
    this.isDragging.value = true;

    window.addEventListener('pointermove', this.onPointerMove.bind(this));
    window.addEventListener('pointerup', this.stopDragging.bind(this));

    if (this.boxShadowMode)
    {
      this.changeBoxShadow(`0 5px 25px ${BLOCK_STYLE_VALUES.blockIsDragingColor}`);
    }
    
  }

  onPointerMove(event) {
    if (this.isDragging.value) {
      this.position.x = event.clientX - this.offset.x - this.Left_panel_width;
      this.position.y = event.clientY - this.offset.y - this.Up_panel_height;

      if (!this.animationFrame) {
        this.animationFrame = requestAnimationFrame(this.updatePosition);
      } 

    }
  }

  updatePosition = () => {
    this.animationFrame = null;
  };

  stopDragging() {

    this.isDragging.value = false;
    window.removeEventListener('pointermove', this.onPointerMove.bind(this));
    window.removeEventListener('pointerup', this.stopDragging.bind(this));

    cancelAnimationFrame(this.animationFrame);
    this.animationFrame = null;

    this.changeDraggingBlock(0);

    if (!this.checkIsHaveSelectedBlock()) this.checkBoxShadow()
  }

  change_selected_block_z_index()
  {
    if (this.DataService.isHaveOldSelectedBlock())
    {
      this.DataService.selected_block.value["old_selected_block"].block.style.zIndex = 10;
    }
    this.DataService.changeOldSelectedBlock(this);

    this.block.style.zIndex = 20;
  }

  changeDraggingBlock(value)
  {
    this.DataService.selected_block.value["block_dragging"] = value;
    
  }
  
  changeSelectedBlock(value)
  {
    if(this.DataService.changeSelectedBlock(value))
    {
      this.changeBoxShadow(`0 5px 25px ${BLOCK_STYLE_VALUES.blockSelectedColor}`);
    }
  }

  checkIsHaveSelectedBlock()
  {
    return this.DataService.isHaveSelectedBlock();
  }
  

}