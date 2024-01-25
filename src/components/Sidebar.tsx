export type MenuItemProps = {
    icon: JSX.Element;
    label: string;
    onMouseClick: () => void;
    selected?: boolean;
}

export type SideBarProps = {
    headerContent?: React.ReactNode;
    items: MenuItemProps[]
    selectedKey?: string;
}

export function MenuItem({
    icon,
    label,
    selected,
    onMouseClick,
}: MenuItemProps) {
    return (
        <div
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${selected ? "text-green-700 bg-green-100" : "text-black"} hover:text-green-700`}
            onClick={onMouseClick}
        >
            {icon}
            <span>{label}</span>
        </div>
    );
}

export function SideBar({
    items,
    headerContent,
}: SideBarProps) {
    return (
        <div className="hidden border-r bg-white lg:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                {/* Sidebar Header */}
                <div className="flex h-[60px] items-center border-b px-6">
                    {headerContent}
                </div>

                {/* Sidebar Navigation */}
                <nav className="grid items-start px-4 text-sm font-medium">
                    {
                        items.map(item => (
                            <MenuItem 
                                icon={item.icon} 
                                label={item.label} 
                                onMouseClick={item.onMouseClick} 
                                selected={item.selected}     
                            />
                        ))
                    }
                </nav>
            </div>
        </div>
    )
}