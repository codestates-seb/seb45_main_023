import React, { useState, useEffect, useRef } from "react";
import Tag from "../../components/blog/tag";
import BlogHeader from "../../components/blog/blogtitle";
import { NegativeButton } from "../../components/Buttons";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

// Toast 에디터
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

export default function BlogWrite() {
	const navigate = useNavigate();
	const { cityId, member_id } = useParams();
	const editorRef = useRef();
	const MarkDownClick = () => {
		setBlogContent(editorRef.current.getInstance().getMarkdown());
	};
	const blog_id = 1;

	const [selectedTag, setSelectedTag] = useState([]); // 태그
	// const [locationName, setLocationName] = useState('Jeju'); // 지역 이름 : 서버 연결 시 초기값 '' 지정하기

	const availableTag = [
		"인기글",
		"음식",
		"숙소",
		"교통",
		"쇼핑",
		"관광지",
		"액티비티",
	];

	const [blogTitle, setBlogTitle] = useState("");
	const [blogContent, setBlogContent] = useState("");

	const toggleTag = (tag) => {
		if (selectedTag.includes(tag)) {
			setSelectedTag(selectedTag.filter((t) => t !== tag));
		} else {
			setSelectedTag([...selectedTag, tag]);
		}
	};

	const handleSave = async () => {
		MarkDownClick();
		const postData = {
			title: blogTitle,
			body: blogContent,
			tags: selectedTag,
		};

		try {
			const response = await axios.post(
				`${process.env.REACT_APP_SERVER_URL}/blogs/${member_id}/${cityId}`,
				postData,
				{
					headers: {
						"Content-Type": "application/json",
						"ngrok-skip-browser-warning": "69420",
					},
				}
			);

			console.log("게시물 글쓰기 성공:", response.data);
			console.log(cityId);
			console.log("title : " + blogTitle);
			console.log("content : " + blogContent);
			console.log(selectedTag);
			navigate(`/blogdetail/${response.data.id}`);
		} catch (error) {
			console.error("게시물 글쓰기 실패:", error);
		}
		// navigate(`/blogdetail`);
	};

	return (
		<div className="relative">
			<BlogHeader />
			<div className="relative h-[800px] bg-gray-100 opacity-70 rounded-t-lg shadow-lg mt-[-100px] ml-10 mr-10">
				<div className="write_list m-10">
					<div className="title_container">
						<h1 className="text-xl font-bold pt-10">Title</h1>
						<div className="title">
							<input
								type="text"
								placeholder="글 제목을 입력하세요"
								className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
								value={blogTitle}
								onChange={(e) => setBlogTitle(e.target.value)}
							/>
						</div>
						<h1 className="text-xl font-bold pt-10">Content</h1>
						<div>
							<Editor
								initialValue="이미지와 내용을 작성해주세요."
								ref={editorRef}
								previewStyle="vertical" // 미리보기 스타일 지정
								height="300px" // 에디터 창 높이
								initialEditType="markdown" // 초기 입력모드 설정(디폴트 markdown)
								hideModeSwitch={true}
								toolbarItems={[
									// 툴바 옵션 설정
									["heading", "bold", "italic", "strike"],
									["hr", "quote"],
									["ul", "ol", "task", "indent", "outdent"],
									["table", "image", "link"],
									["code", "codeblock"],
								]}
								hooks={{
									addImageBlobHook: async (blob, callback) => {
										try {
											// 에디터에 업로드한 이미지를 formData 객체에 저장
											const formData = new FormData();
											formData.append("image", blob);

											const response = await fetch(
												`${process.env.REACT_APP_SERVER_URL}/blogs/${blog_id}/upload-images`,
												{
													method: "POST",
													headers: {
														"ngrok-skip-browser-warning": "69420",
													},
													body: formData,
												}
											);

											const filename = await response.json();
											console.log("서버에 저장된 파일명 : ", filename);
											console.log(blob);
											console.log(filename);

											const getResponse = await fetch(
												`${process.env.REACT_APP_SERVER_URL}/blogs/print-image?name=${filename.name}`,
												{
													method: "GET",
													headers: {
														"ngrok-skip-browser-warning": "69420",
													},
												}
											);

											const imageUrl = await getResponse.json();
											callback(imageUrl.path, "image alt attribute");
										} catch (error) {
											console.error("업로드 실패 : ", error);
										}
									},
								}}
								useCommandShortcut={true} // 키보드 입력 컨트롤 방지
								value={blogContent}
								onChange={MarkDownClick}
							></Editor>
						</div>

						<h1 className="text-xl font-bold pt-10">Tag</h1>
						<div className="tag_list">
							<div className="tag_container pt-3 flex justify-between">
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
									<button
										className="w-[100px] h-[50px] text-[10px]"
										onClick={handleSave}
									>
										<NegativeButton text={"글 쓰기"} />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
