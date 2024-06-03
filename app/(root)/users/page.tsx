import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
} from "@/components/ui/tabs"
import AddUser from "@/components/add-user"
import { UserTable } from "@/components/user-table"
import { FilterButton } from "@/components/filter-btn"
import { getAllUsers } from "@/utils/cek-user"

export default async function UserPage() {
    const FilterList = [
        "Name A-Z",
        "Last Active"
    ]

    const users = await getAllUsers()

    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="all">Users</TabsTrigger>
                        <TabsTrigger value="add-user">Tambah User</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="ml-auto flex items-center gap-2" >
                        <FilterButton
                            contents={FilterList}
                            isChecked="Name"
                        />
                    </TabsContent>
                </div>
                <TabsContent value="all">
                    <UserTable data={users} />
                </TabsContent>
                <TabsContent value="add-user">
                    <AddUser />
                </TabsContent>
            </Tabs>
        </main>
    )
}