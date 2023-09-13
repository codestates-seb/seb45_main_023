import CardList from "../../components/mypage/CardList";
import TopSidebar from "../../components/mypage/TopSidebar";
import BottomSidebar from "../../components/mypage/BottomSidebar";
import BookmarkPagenation from "../../components/mypage/Pagenation";
import { useEffect } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { User, bookmarkInfo } from "../../recoil/mypage";

export default function MyBookmark() {
	const info = useRecoilValue(User);
	const [bookmark, setBookmark] = useRecoilState(bookmarkInfo);
	console.log(bookmark);
	useEffect(() => {
		const getData = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_SERVER_URL}/blogs/my-bookmarks?page=1&size=10&bookmarks=${info.bookmarks[0]}`,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				setBookmark(response.data.data);
			} catch (err) {
				console.log(err);
			}
		};
		getData();
	}, []);
	return (
		<div className="flex justify-center bookshelf-animation">
			<TopSidebar />
			<BottomSidebar />
			<div className="flex flex-col items-center w-[50rem] h-[50rem] mt-[3rem] shadow-xss rounded-t-[2rem] bg-white">
				<CardList start={0} end={6} />
				<div className="shadow-pageCenter">
					<CardList start={6} end={12} />
					<BookmarkPagenation />
				</div>
				<div className="bg-white h-[0.5rem] w-[50rem] border-b-[1px] border-gray-300">
					&nbsp;
				</div>
				<div className="flex bg-white h-[0.75rem] w-[50rem] rounded-[10rem]">
					&nbsp;
				</div>
			</div>
		</div>
	);
}
