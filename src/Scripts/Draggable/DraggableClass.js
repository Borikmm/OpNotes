import { ref, reactive, computed } from 'vue';

const BLOCK_STYLE_VALUES = {
  blockIsDragingColor: "#D33131",
  blockIsMouseEnterColor: "#cb31ff",
};

export class DraggableFunctionalClass {
    constructor(){
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


  start(block, left, right, boxShadowMode) {
    this.block = block;
    this.Left_panel_width = left;
    this.Up_panel_height = right;
    this.block.addEventListener('pointerdown', this.startDragging.bind(this));

    if (boxShadowMode)
    {
      this.block.addEventListener('mouseenter', this.onMouseEnter.bind(this));
      this.block.addEventListener('mouseleave', this.onMouseLeave.bind(this));
      this.block.addEventListener('mousemove', this.onMouseMove.bind(this));
      this.boxShadowMode = true;
    }

  }

  // boxShadow when Enter Mouse
  onMouseEnter(){
    this.changeBoxShadow(`0 5px 25px ${BLOCK_STYLE_VALUES.blockIsMouseEnterColor}`);
  };

  onMouseLeave(){
    this.checkBoxShadow() // Или другой эффект по умолчанию
  };

  onMouseMove(){
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
    if (!this.isDragging.value) {
        this.changeBoxShadow('none');
    }
  };


  changeBoxShadow(newBoxShadow) {
    this.boxShadow.value = newBoxShadow;
  }
  //

  startDragging(event) {
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

    this.changeBoxShadow('none');
  }


}