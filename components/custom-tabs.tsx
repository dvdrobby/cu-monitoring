import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

type CustomTabsProps = {
    tabs: {
        id: number,
        name: string,
        data: JSON
    }[],
    children?: React.ReactNode
}

export const CustomTabs: React.FC<CustomTabsProps> = ({
    tabs
}) => {
    return (
        <Tabs defaultValue={tabs[0].name}>
            <div className="flex items-center">
                <TabsList>
                    {
                        tabs.map((tab) => {
                            return <TabsTrigger key={tab.id} value={tab.name}>{tab.name}</TabsTrigger>
                        }
                        )
                    }
                </TabsList>
            </div>

            {
                tabs.map((tab) => {
                    return (
                        <TabsContent key={tab.id} value={tab.name}>

                        </TabsContent>
                    )
                })
            }
        </Tabs>
    )
}