import { ToSmallButton } from "../../Buttons"
import { LogOutButton } from "../LogOutButton"

export default function MypageHeaderBtn () {
    return (
        <section className="flex gap-[10px] absolute top-0 right-0 mt-4 mr-10 z-10-">
            <ToSmallButton linkName='mainpage' Size='sm' iconName='mainpage' colorName='orange' title='mainpage'/>
            <ToSmallButton linkName="blog" Size="sm" iconName="blog" colorName="purple" title="blog" />
            <LogOutButton />
        </section>

    )
}

