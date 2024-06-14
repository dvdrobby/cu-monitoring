import { User } from "@prisma/client"

export function ShowProfile({
    data
}: {
    data: User | null
}) {
    return (

        data &&
        (<div className="grid grid-cols-4 gap-4 space-y-6 text-sm justify-start items-center">
            <div className="font-semibold">Username</div>
            <div className="col-span-3">{data.username}</div>
            <div className="font-semibold">Nama</div>
            <div className="col-span-3">{data.name}</div>
            <div className="font-semibold">Email</div>
            <div className="col-span-3">{data.email}</div>
        </div>)

    )
}