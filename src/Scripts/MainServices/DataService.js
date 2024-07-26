import { ref} from 'vue'
import { Service } from './Service';

export class DataService
{
    constructor(app)
    {
        this.app = app
        this.ToogleMenusService = new Service().ToogleMenusService;
    }

    isHaveSelectedBlock()
    {
        return this.selected_block.value["selected_block"] != 0;
    }

    isHaveOldSelectedBlock()
    {
        return this.selected_block.value["old_selected_block"] != 0;
    }


    changeSelectedBlock(block)
    {
        // If block == 0, unselect block
        if (block == 0 && this.isHaveSelectedBlock())
        {
            this.unselectBlock();
            return false;
        }

        this.selected_block.value["selected_block"] = block;
        this.ToogleMenusService.SelectMenu("PropertiesPanel");

        return true;
    }

    unselectBlock()
    {
        this.selected_block.value["selected_block"].changeBoxShadow('none');
        this.selected_block.value["selected_block"] = 0;
        this.ToogleMenusService.SelectMenu("ToolsPanel");
    }

    changeOldSelectedBlock(value)
    {
      this.selected_block.value["old_selected_block"] = value;
    }


    createNewVariables()
    {
        this.globalVariables = [];

        this.blocks_list = ref([])
        this.up_panel_height = ref(0)
        this.left_panel_width = ref(0)

        this.selected_block = ref({
            "selected_block": 0,
            "block_dragging": 0,
            'old_selected_block': 0
        })
        
        this.app.provide('GlobalBlocksList', this.blocks_list)
        this.app.provide('Up_panel_height', this.up_panel_height)
        this.app.provide('Left_panel_width', this.left_panel_width)
        this.app.provide('Selected_block', this.selected_block)

        

        this.globalVariables.push(
            this.blocks_list, 
            this.up_panel_height,
            this.left_panel_width,
            this.selected_block
        );



    }


    getGlobalVariables()
    {
        if(typeof this.globalVariables == "undefined")
        {
            this.createNewVariables();
        }
        return this.globalVariables;
    }
}