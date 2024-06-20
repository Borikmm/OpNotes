

export class ToogleMenusService
{
    constructor()
    {
        this.Menu_now = "ToolsPanel";
    }

    SetterService(Panel_dict)
    {
        this.Panel_dict = Panel_dict;
    }

    SelectMenu(name_menu)
    {
        this.UnselectMenuAction(this.Menu_now);

        setTimeout(()=>{
            this.SelectMenuAction(name_menu)
        },500);
    }

    SelectMenuAction(name_menu)
    {
        this.Menu_now = name_menu;
        this.Panel_dict[name_menu].value.style.transform = "translateX(0px)";
    }

    UnselectMenuAction(name_menu)
    {
        this.Panel_dict[name_menu].value.style.transform = "translateX(-100px)";
    }

}