import { AddLogsheet } from "@/components/add-logsheet";
import { CustomOptionField } from "@/components/custom-option-field";
import { LogsheetTable } from "@/components/logsheet-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Page() {

    return (
        <Tabs defaultValue="add-logsheet">
            <div className="flex items-center">
                <TabsList>
                    <TabsTrigger value="logsheet">Daftar Logsheet</TabsTrigger>
                    <TabsTrigger value="add-logsheet">Tambah Logsheet</TabsTrigger>
                    <TabsTrigger value="custom-field">Custom Fields</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="logsheet">
                <LogsheetTable data={[]} />
            </TabsContent>
            <TabsContent value="add-logsheet">
                <AddLogsheet />
            </TabsContent>
            <TabsContent value="custom-field">
                <CustomOptionField />
            </TabsContent>
        </Tabs>
    )
}