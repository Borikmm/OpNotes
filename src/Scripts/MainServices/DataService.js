import { ref} from 'vue'


export class DataService
{
    constructor(app)
    {
        this.app = app
    }


    createNewVariables()
    {
        this.globalVariables = [];

        const blocks_list = ref([])
        const up_panel_height = ref(0)
        const left_panel_width = ref(0)
        const old_selected_block = ref(0)
        
        this.app.provide('GlobalBlocksList', blocks_list)
        this.app.provide('Up_panel_height', up_panel_height)
        this.app.provide('Left_panel_width', left_panel_width)
        this.app.provide('Old_selected_block', old_selected_block)

        this.globalVariables.push(
            blocks_list, 
            up_panel_height,
            left_panel_width,
            old_selected_block
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