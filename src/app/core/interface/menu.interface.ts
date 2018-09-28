export interface MenuInterface {
    // 菜单名称
    name: string;
    // 顶部菜单的key
    top_menu_key?: string;
    // 菜单链接
    url: string;
    // 菜单图标，默认没有
    icon?: string;
    // 是否选中，默认为false
    is_selected?: boolean;
    // 是否展开二级菜单，默认为false，
    is_open?: boolean;
    // 子菜单（可选）
    sub_menu?: Array<MenuInterface>;
    // 子页面url，不出现在侧边栏的url。
    sub_pages_url?: string[];
}