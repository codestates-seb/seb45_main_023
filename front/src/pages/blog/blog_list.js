import PostLink from "../../components/blog/post_link";
import React, { useState, useEffect } from "react";
import Tag from "../../components/blog/tag";
import BlogHeader from "../../components/blog/blogtitle";
import { NegativeButton } from "../../components/Buttons";
import axios from "axios";
import { useRecoilState } from "recoil";
import { BlogList } from "../../recoil/blog";
import { bookmarkedPostsState } from "../../recoil/blog";
import { useParams, useNavigate } from "react-router-dom";
import BlogPagenation from "../../components/mypage/BlogPagination";
import { userInfo } from "../../recoil/mypage";
import { useRecoilValue } from "recoil";

export default function Bloglist() {
	const [selectedTag, setSelectedTag] = useState([]); // 태그
	const [filteredPosts, setFilteredPosts] = useState([]);
	const [posts, setPosts] = useRecoilState(BlogList);
	const [bookmarkedPosts, setBookmarkedPosts] =
		useRecoilState(bookmarkedPostsState);
	const navigate = useNavigate();
	
	const userinfo = useRecoilValue(userInfo);
  const userId = userinfo.id;
	const {cityId} = useParams();

	const availableTag = [
		"인기글",
		"음식",
		"숙소",
		"교통",
		"쇼핑",
		"관광지",
		"액티비티",
	];

	const toggleTag = (tag) => {
		if (selectedTag.includes(tag)) {
			setSelectedTag(selectedTag.filter((t) => t !== tag));
		} else {
			setSelectedTag([...selectedTag, tag]);
		}
	};

	useEffect(() => {
		// 게시물 목록 get
		const getData = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_TEST_URL}/blogs/cities/${cityId}?page=1&size=10`,
					{
						headers: {
							"Content-Type": "application/json",
							"ngrok-skip-browser-warning": "69420",
						},
					}
				);
				setPosts(response.data.data);
				console.log(posts)
			} catch (error) {
				console.error("게시물 불러오기 실패 : ", error);
			}
		};

		getData();
	}, [cityId, setPosts]);

	useEffect(() => {
		// 태그 filter
		const filtered = posts.filter((post) =>
			selectedTag.every((tag) => post.tags.includes(tag))
		);
		setFilteredPosts(filtered);
	}, [selectedTag]);

	const handleBookmarkToggle = (blog_id) => {
		if (bookmarkedPosts.includes(blog_id)) {
			setBookmarkedPosts(bookmarkedPosts.filter((id) => id !== blog_id));
		} else {
			setBookmarkedPosts([...bookmarkedPosts, blog_id]);
		}
	};

	return (
		<div className="relative">
			<BlogHeader />
			<div className="relative h-[1000px] bg-gray-100 opacity-70 rounded-t-lg shadow-lg mt-[-100px] ml-10 mr-10">
				<div className="tag_list m-10">
					<div className="tag_container pt-10 flex justify-between">
						<div className="tag_left">
							{availableTag.map((tag) => (
								<Tag
									key={tag}
									tagName={tag}
									isSelected={selectedTag.includes(tag)}
									onClick={() => toggleTag(tag)}
								/>
							))}
						</div>
						<div className="tag_right">
							<button className="w-[100px] h-[50px] text-[10px]"
							onClick={() => navigate(`/blogwrite/${userId}/${cityId}`)}
							>
								<NegativeButton text={"글 쓰기"} />
							</button>
						</div>
					</div>
				</div>
				{(selectedTag.length === 0 ? posts : filteredPosts).map(
					(post, index) => (
						<div
							key={index}
							className="w-600 h-300 opacity-1 p-4 border border-DDE7EC rounded-lg shadow-lg m-10"
						>
							<PostLink
								title={post.title}
								body={post.body}
								profile_pic={post.profile_pic}
								nickname={post.member.nickname}
								city_id={post.city_id}
								createdAt={post.createdAt}
								modifiedAt={post.modifiedAt}
								tags={post.tags}
							/>
            <div className="flex items-center justify-between mt-4">
              <button onClick={() => handleBookmarkToggle(post.blog_id)}>
                {bookmarkedPosts.includes(post.blog_id) ? (
                  <img src="/unbookmark.png" alt="unbookmark" width="25" height="25" />
                ) : (
                  <img src="/bookmark.png" alt="bookmark" width="25" height="25" />
                )}
              </button>
            </div>
						</div>
					)
				)}
				<BlogPagenation />
			</div>
		</div>
	);
}
